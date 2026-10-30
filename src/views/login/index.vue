<script setup lang="ts">
import { useI18n } from "vue-i18n";
import Motion from "./utils/motion";
import { useRouter } from "vue-router";
import { message } from "@bit-labs.cn/owl-ui/utils/message";
import { loginRules } from "./utils/rule";
import { useNav } from "@bit-labs.cn/owl-ui/layout/hooks/useNav";
import type { FormInstance } from "element-plus";
import { $t, transformI18n } from "@bit-labs.cn/owl-ui/plugins/i18n";
import { useLayout } from "@bit-labs.cn/owl-ui/layout/hooks/useLayout";
import { useUserStoreHook } from "@bit-labs.cn/owl-ui/store/modules/user";
import { initRouter, getTopMenu } from "@bit-labs.cn/owl-ui/router/utils";
import { defaultBg, defaultAvatar, defaultIllustration } from "./utils/static";
import { getLoginCustomization } from "@bit-labs.cn/owl-ui/subsystem/registry";
import { useRenderIcon } from "@bit-labs.cn/owl-ui/components/ReIcon/src/hooks";
import {
  ref,
  reactive,
  toRaw,
  computed,
  onMounted,
  onBeforeUnmount
} from "vue";
import { useTranslationLang } from "@bit-labs.cn/owl-ui/layout/hooks/useTranslationLang";
import { useDataThemeChange } from "@bit-labs.cn/owl-ui/layout/hooks/useDataThemeChange";
import { getDeviceId } from "@bit-labs.cn/owl-ui/utils/device";
import {
  userAPI,
  type LoginCaptchaAnswer,
  type OAuthProvider
} from "@bit-labs.cn/owl-ui/api/user";
import CaptchaDialog from "./components/CaptchaDialog.vue";

import dayIcon from "@bit-labs.cn/owl-ui/assets/svg/day.svg?component";
import darkIcon from "@bit-labs.cn/owl-ui/assets/svg/dark.svg?component";
import globalization from "@bit-labs.cn/owl-ui/assets/svg/globalization.svg?component";
import Lock from "@iconify-icons/ri/lock-fill";
import Check from "@iconify-icons/ep/check";
import User from "@iconify-icons/ri/user-3-fill";
import Github from "@iconify-icons/ri/github-fill";
import Google from "@iconify-icons/ri/google-fill";
import Gitee from "@iconify-icons/ri/git-branch-fill";
import Owl from "@iconify-icons/ri/shield-keyhole-fill";

const usernamePrefixIcon = useRenderIcon(User);
const passwordPrefixIcon = useRenderIcon(Lock);

defineOptions({
  name: "Login"
});
const router = useRouter();
const loading = ref(false);
const ruleFormRef = ref<FormInstance>();

const { initStorage } = useLayout();
initStorage();

const { t } = useI18n();
const { dataTheme, overallStyle, dataThemeChange } = useDataThemeChange();
dataThemeChange(overallStyle.value);
const { title, getDropdownItemStyle, getDropdownItemClass } = useNav();
const { locale, translationCh, translationEn } = useTranslationLang();

const loginCustom = getLoginCustomization();
const custom = loginCustom ?? {};
/** 子系统声明了 `login.bg` 时启用全屏背景登录布局 */
const isBrandPanel = computed(() => Boolean(loginCustom?.bg));
const bg = custom.bg ?? defaultBg;
const loginTitle = computed(() => custom.title ?? title.value);
const loginSubtitle = custom.subtitle ?? "";
const loginPageClass = computed(() =>
  isBrandPanel.value ? "login-page login-page--brand-panel" : "login-page"
);

/** brand 登录页与大屏一致：1920×1080 设计稿整体缩放，避免 4K 上表单过小 */
const DESIGN_WIDTH = 1920;
const DESIGN_HEIGHT = 1080;
const scaleX = ref(1);
const scaleY = ref(1);

const brandCanvasStyle = computed(() => ({
  transform: `scale(${scaleX.value}, ${scaleY.value})`,
  width: `${DESIGN_WIDTH}px`,
  height: `${DESIGN_HEIGHT}px`
}));

function updateBrandScale() {
  if (!isBrandPanel.value) return;
  scaleX.value = window.innerWidth / DESIGN_WIDTH;
  scaleY.value = window.innerHeight / DESIGN_HEIGHT;
}

const loginRootStyle = computed(() => {
  const style: Record<string, string> = {};
  if (custom.primaryColor) {
    style["--el-color-primary"] = custom.primaryColor;
    style["--login-accent-end"] = custom.primaryColor;
  }
  if (isBrandPanel.value && custom.loginFormWidth) {
    style["--login-form-width"] = custom.loginFormWidth;
  }
  return Object.keys(style).length ? style : undefined;
});

const REMEMBER_USERNAME_KEY = "owl-login-remember-username";

const accountLabel = computed(
  () => custom.accountLabel ?? (isBrandPanel.value ? "账号" : "")
);
const passwordLabel = computed(
  () => custom.passwordLabel ?? (isBrandPanel.value ? "密码" : "")
);
const usernamePlaceholder = computed(() =>
  isBrandPanel.value ? "请输入用户名" : t("login.pureUsername")
);
const passwordPlaceholder = computed(() =>
  isBrandPanel.value ? "请输入密码" : t("login.purePassword")
);

const rememberMe = ref(false);
const oauthProviders = ref<OAuthProvider[]>([]);
const oauthLoading = ref(false);
const oauthState = ref("");
let oauthPopup: Window | null = null;
const captchaVisible = ref(false);
const captchaType = ref("");
const captchaDialogRef = ref<InstanceType<typeof CaptchaDialog>>();

const ruleForm = reactive({
  username: "",
  password: ""
});

const finishLogin = async () => {
  await initRouter();
  const topMenu = getTopMenu(true);
  if (!topMenu?.path) {
    await router.replace("/unauthorized");
    return;
  }
  await router.push(topMenu.path);
  message(t("login.pureLoginSuccess"), { type: "success" });
};

const submitLogin = async (captcha?: LoginCaptchaAnswer) => {
  const res = await useUserStoreHook().loginByUsername({
    username: ruleForm.username,
    password: ruleForm.password,
    deviceId: getDeviceId(),
    captcha
  });
  if (res?.success && res.data?.needCaptcha) {
    captchaType.value = res.data.captchaType ?? "";
    if (!captchaVisible.value) {
      captchaVisible.value = true;
    }
    return false;
  }
  if (res?.success && res.data?.accessToken) {
    captchaVisible.value = false;
    await finishLogin();
    return true;
  }
  return false;
};

const onLogin = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid) => {
    if (!valid) return;
    loading.value = true;
    if (isBrandPanel.value) {
      if (rememberMe.value) {
        localStorage.setItem(REMEMBER_USERNAME_KEY, ruleForm.username);
      } else {
        localStorage.removeItem(REMEMBER_USERNAME_KEY);
      }
    }
    try {
      await submitLogin();
    } finally {
      loading.value = false;
    }
  });
};

const onCaptchaConfirm = async (captcha: LoginCaptchaAnswer) => {
  loading.value = true;
  try {
    const ok = await submitLogin(captcha);
    if (!ok && captchaVisible.value) {
      await captchaDialogRef.value?.refresh?.();
    }
  } catch {
    await captchaDialogRef.value?.refresh?.();
  } finally {
    loading.value = false;
  }
};

const oauthIcon = (provider: string) => {
  if (provider === "github") return Github;
  if (provider === "google") return Google;
  if (provider === "gitee") return Gitee;
  if (provider === "owl") return Owl;
  return null;
};

const loadOAuthProviders = async () => {
  try {
    const res = await userAPI.getOAuthProviders();
    oauthProviders.value = (res?.data ?? []).filter(
      item => item?.provider && item?.name
    );
  } catch {
    oauthProviders.value = [];
  }
};

const onOAuthMessage = (event: MessageEvent) => {
  const data = event.data;
  if (!data || data.source !== "owl-oauth") return;
  if (!oauthState.value || data.state !== oauthState.value) return;
  if (typeof data.token !== "string" || !data.token) return;
  oauthState.value = "";
  oauthPopup?.close();
  oauthPopup = null;
  void completeOAuthLogin(data.token);
};

const completeOAuthLogin = async (token: string) => {
  oauthLoading.value = true;
  try {
    await useUserStoreHook().loginByToken(token);
    await finishLogin();
  } catch {
    message("第三方登录失败，请重试", { type: "error" });
  } finally {
    oauthLoading.value = false;
  }
};

const onOAuthLogin = (item: OAuthProvider) => {
  if (oauthLoading.value) return;
  const state =
    crypto.randomUUID?.() ??
    `${Date.now().toString(16)}-${Math.random().toString(16).slice(2)}`;
  oauthState.value = state;
  const url = `/oauth2/${encodeURIComponent(item.provider)}/login?state=${encodeURIComponent(state)}`;
  const margin = 48;
  const width = Math.min(
    960,
    Math.max(720, window.screen.availWidth - margin * 2)
  );
  const height = Math.min(
    800,
    Math.max(680, window.screen.availHeight - margin * 2)
  );
  const originLeft =
    "availLeft" in window.screen ? Number(window.screen.availLeft) : 0;
  const originTop =
    "availTop" in window.screen ? Number(window.screen.availTop) : 0;
  const left = Math.round(originLeft + (window.screen.availWidth - width) / 2);
  const top = Math.round(originTop + (window.screen.availHeight - height) / 2);
  oauthPopup?.close();
  oauthPopup = window.open(
    url,
    "owl-oauth-login",
    `popup=yes,width=${width},height=${height},left=${left},top=${top},screenX=${left},screenY=${top}`
  );
  if (!oauthPopup) {
    oauthState.value = "";
    message("浏览器拦截了登录窗口，请允许弹窗后重试", { type: "warning" });
  }
};

/** 使用公共函数，避免`removeEventListener`失效 */
function onkeypress({ code }: KeyboardEvent) {
  if (["Enter", "NumpadEnter"].includes(code)) {
    onLogin(ruleFormRef.value);
  }
}

onMounted(() => {
  window.document.addEventListener("keypress", onkeypress);
  window.addEventListener("message", onOAuthMessage);
  void loadOAuthProviders();
  if (isBrandPanel.value) {
    updateBrandScale();
    window.addEventListener("resize", updateBrandScale);
    const saved = localStorage.getItem(REMEMBER_USERNAME_KEY);
    if (saved) {
      ruleForm.username = saved;
      rememberMe.value = true;
    }
  }
});

onBeforeUnmount(() => {
  window.document.removeEventListener("keypress", onkeypress);
  window.removeEventListener("message", onOAuthMessage);
  window.removeEventListener("resize", updateBrandScale);
  oauthPopup?.close();
});
</script>

<template>
  <div :class="['select-none', loginPageClass]" :style="loginRootStyle">
    <div
      :class="{ 'login-scale-viewport': isBrandPanel }"
    >
      <div
        :class="{ 'login-scale-canvas': isBrandPanel }"
        :style="isBrandPanel ? brandCanvasStyle : undefined"
      >
        <img :src="bg" class="wave" decoding="async" fetchpriority="high" />
        <div class="flex-c absolute right-5 top-3">
          <!-- 主题 -->
          <el-switch
            v-model="dataTheme"
            inline-prompt
            :active-icon="dayIcon"
            :inactive-icon="darkIcon"
            @change="dataThemeChange"
          />
          <!-- 国际化 -->
          <el-dropdown trigger="click">
            <globalization
              class="hover:text-primary hover:!bg-[transparent] w-[20px] h-[20px] ml-1.5 cursor-pointer outline-none duration-300"
            />
            <template #dropdown>
              <el-dropdown-menu class="translation">
                <el-dropdown-item
                  :style="getDropdownItemStyle(locale, 'zh')"
                  :class="['dark:!text-white', getDropdownItemClass(locale, 'zh')]"
                  @click="translationCh"
                >
                  <IconifyIconOffline
                    v-show="locale === 'zh'"
                    class="check-zh"
                    :icon="Check"
                  />
                  简体中文
                </el-dropdown-item>
                <el-dropdown-item
                  :style="getDropdownItemStyle(locale, 'en')"
                  :class="['dark:!text-white', getDropdownItemClass(locale, 'en')]"
                  @click="translationEn"
                >
                  <span v-show="locale === 'en'" class="check-en">
                    <IconifyIconOffline :icon="Check" />
                  </span>
                  English
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <div
          class="login-container"
          :class="{ 'login-container--brand-panel': isBrandPanel }"
        >
          <div v-if="!isBrandPanel" class="img">
            <component :is="toRaw(defaultIllustration)" />
          </div>
          <div class="login-box">
            <div class="login-form">
              <component
                v-if="!isBrandPanel"
                :is="toRaw(defaultAvatar)"
                class="avatar"
              />
              <component :is="isBrandPanel ? 'div' : Motion">
                <h2 class="outline-none">{{ loginTitle }}</h2>
                <p v-if="loginSubtitle" class="login-subtitle">
                  {{ loginSubtitle }}
                </p>
              </component>

              <el-form
                ref="ruleFormRef"
                :model="ruleForm"
                :rules="loginRules"
                :size="isBrandPanel ? 'large' : 'large'"
                :label-position="isBrandPanel ? 'top' : undefined"
                :class="{ 'login-form-fields': isBrandPanel }"
              >
                <component :is="isBrandPanel ? 'div' : Motion" :delay="100">
                  <el-form-item
                    :label="isBrandPanel ? accountLabel : undefined"
                    :rules="[
                      {
                        required: true,
                        message: transformI18n($t('login.pureUsernameReg')),
                        trigger: 'blur'
                      }
                    ]"
                    prop="username"
                    :class="{ 'login-field-item': isBrandPanel }"
                  >
                    <el-input
                      v-model="ruleForm.username"
                      clearable
                      :placeholder="usernamePlaceholder"
                      :prefix-icon="usernamePrefixIcon"
                    />
                  </el-form-item>
                </component>

                <component :is="isBrandPanel ? 'div' : Motion" :delay="150">
                  <el-form-item
                    :label="isBrandPanel ? passwordLabel : undefined"
                    prop="password"
                    :class="{ 'login-field-item': isBrandPanel }"
                  >
                    <el-input
                      v-model="ruleForm.password"
                      clearable
                      show-password
                      :placeholder="passwordPlaceholder"
                      :prefix-icon="passwordPrefixIcon"
                    />
                  </el-form-item>
                </component>

                <div v-if="isBrandPanel" class="login-form-options">
                  <el-checkbox v-model="rememberMe" label="记住我" />
                  <a class="login-forgot-link" href="javascript:void(0)"
                    >忘记密码？</a
                  >
                </div>

                <component :is="isBrandPanel ? 'div' : Motion" :delay="250">
                  <el-button
                    class="w-full login-submit-btn"
                    :class="{
                      'mt-4': !isBrandPanel,
                      'login-submit-btn--brand': isBrandPanel
                    }"
                    :size="isBrandPanel ? 'large' : 'default'"
                    type="primary"
                    :loading="loading"
                    @click="onLogin(ruleFormRef)"
                  >
                    {{ t("login.pureLogin") }}
                  </el-button>
                </component>
              </el-form>
              <div v-if="oauthProviders.length" class="oauth-login">
                <div class="oauth-login__divider"><span>其他方式</span></div>
                <div class="oauth-login__list">
                  <button
                    v-for="item in oauthProviders"
                    :key="item.provider"
                    type="button"
                    class="oauth-login__btn"
                    :class="'oauth-login__btn--' + item.provider"
                    :title="item.name"
                    :aria-label="item.name"
                    :disabled="oauthLoading"
                    @click="onOAuthLogin(item)"
                  >
                    <IconifyIconOffline
                      v-if="oauthIcon(item.provider)"
                      :icon="oauthIcon(item.provider)"
                    />
                    <span v-else>{{ item.name.slice(0, 1) }}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <CaptchaDialog
      ref="captchaDialogRef"
      v-model:visible="captchaVisible"
      :captcha-type="captchaType"
      @confirm="onCaptchaConfirm"
    />
  </div>
</template>

<style lang="scss">
@import url("@bit-labs.cn/owl-ui/style/login.css");
</style>

<style lang="scss" scoped>
:deep(.el-input-group__append, .el-input-group__prepend) {
  padding: 0;
}

.translation {
  ::v-deep(.el-dropdown-menu__item) {
    padding: 5px 40px;
  }

  .check-zh {
    position: absolute;
    left: 20px;
  }

  .check-en {
    position: absolute;
    left: 20px;
  }
}

.login-subtitle {
  margin: 8px 0 0;
  font-size: 14px;
  font-weight: normal;
  color: var(--el-text-color-secondary);
  text-align: center;
}

.login-page--brand-panel .login-subtitle {
  margin: 0 0 40px;
  font-size: 15px;
  line-height: 1.65;
  text-align: center;
  color: #64748b;
}

.login-page--brand-panel .login-form h2 {
  text-align: center;
}

.login-page--brand-panel :deep(.login-form-fields) {
  width: 100%;
}

.login-page--brand-panel :deep(.login-form-fields .login-field-item) {
  display: block;
  width: 100%;
  margin-bottom: 28px;
}

.login-page--brand-panel
  :deep(.login-form-fields .login-field-item .el-form-item__content) {
  width: 100%;
}

.login-page--brand-panel :deep(.login-form-fields .el-input) {
  width: 100%;
}

.login-page--brand-panel
  :deep(.login-form-fields .login-field-item .el-form-item__label) {
  margin-bottom: 10px;
  padding: 0;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.4;
  color: #0f172a;
}

.login-page--brand-panel :deep(.el-input__wrapper) {
  min-height: 54px;
  padding: 8px 16px;
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.92);
  box-shadow: 0 2px 12px rgba(15, 23, 42, 0.06);
  transition: box-shadow 0.15s ease;
}

.login-page--brand-panel :deep(.el-input__wrapper.is-focus) {
  background-color: #fff;
  box-shadow:
    0 2px 12px rgba(15, 23, 42, 0.08),
    0 0 0 1px var(--el-color-primary) inset;
}

.login-page--brand-panel :deep(.el-input .el-input__suffix) {
  width: 36px;
  flex-shrink: 0;
}

.login-page--brand-panel :deep(.el-input__inner) {
  font-size: 16px;
}

.login-page--brand-panel :deep(.el-input__inner::placeholder) {
  color: #94a3b8;
}

.login-form-options {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 4px 0 28px;
}

.login-form-options :deep(.el-checkbox__label) {
  font-size: 14px;
  color: #475569;
}

.login-forgot-link {
  font-size: 14px;
  color: var(--el-color-primary);
  text-decoration: none;
}

.login-forgot-link:hover {
  opacity: 0.85;
}

.login-page--brand-panel .login-submit-btn--brand {
  height: 54px;
  margin-top: 0;
  font-size: 17px;
  font-weight: 600;
  border: none;
  border-radius: 12px;
  background: linear-gradient(
    90deg,
    var(--el-color-primary) 0%,
    var(--login-accent-end, #22d3ee) 100%
  ) !important;
  box-shadow: 0 10px 24px
    color-mix(in srgb, var(--el-color-primary) 35%, transparent);
}

.login-page--brand-panel .login-submit-btn--brand:hover,
.login-page--brand-panel .login-submit-btn--brand:focus {
  background: linear-gradient(
    90deg,
    var(--el-color-primary) 0%,
    var(--login-accent-end, #22d3ee) 100%
  ) !important;
  opacity: 0.92;
}

.oauth-login {
  margin-top: 28px;
}

.oauth-login__divider {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  color: #94a3b8;
  font-size: 13px;
  line-height: 1;
}

.oauth-login__divider::before,
.oauth-login__divider::after {
  content: "";
  flex: 1;
  height: 1px;
  background: #e2e8f0;
}

.oauth-login__list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
}

.oauth-login__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  line-height: 1;
  cursor: pointer;
  box-shadow: 0 6px 16px rgba(15, 23, 42, 0.12);
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease;
}

.oauth-login__btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(15, 23, 42, 0.16);
}

.oauth-login__btn:disabled {
  cursor: wait;
  opacity: 0.7;
}

.oauth-login__btn :deep(svg) {
  width: 22px;
  height: 22px;
}

.oauth-login__btn--github {
  background: #24292f;
}

.oauth-login__btn--google {
  color: #4285f4;
  background: #fff;
  box-shadow:
    0 6px 16px rgba(15, 23, 42, 0.08),
    0 0 0 1px #e2e8f0;
}

.oauth-login__btn--gitee {
  background: #c71d23;
}

.oauth-login__btn--owl {
  background: var(--el-color-primary);
}
</style>
