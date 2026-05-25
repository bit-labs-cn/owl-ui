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

import dayIcon from "@bit-labs.cn/owl-ui/assets/svg/day.svg?component";
import darkIcon from "@bit-labs.cn/owl-ui/assets/svg/dark.svg?component";
import globalization from "@bit-labs.cn/owl-ui/assets/svg/globalization.svg?component";
import Lock from "@iconify-icons/ri/lock-fill";
import Check from "@iconify-icons/ep/check";
import User from "@iconify-icons/ri/user-3-fill";

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

const ruleForm = reactive({
  username: "admin",
  password: "123qwe"
});

const onLogin = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      loading.value = true;
      if (isBrandPanel.value) {
        if (rememberMe.value) {
          localStorage.setItem(REMEMBER_USERNAME_KEY, ruleForm.username);
        } else {
          localStorage.removeItem(REMEMBER_USERNAME_KEY);
        }
      }
      useUserStoreHook()
        .loginByUsername({
          username: ruleForm.username,
          password: ruleForm.password
        })
        .then(res => {
          // 获取后端路由
          return initRouter().then(() => {
            router.push(getTopMenu(true).path).then(() => {
              message(t("login.pureLoginSuccess"), { type: "success" });
            });
          });
        })
        .finally(() => (loading.value = false));
    }
  });
};

/** 使用公共函数，避免`removeEventListener`失效 */
function onkeypress({ code }: KeyboardEvent) {
  if (["Enter", "NumpadEnter"].includes(code)) {
    onLogin(ruleFormRef.value);
  }
}

onMounted(() => {
  window.document.addEventListener("keypress", onkeypress);
  if (isBrandPanel.value) {
    const saved = localStorage.getItem(REMEMBER_USERNAME_KEY);
    if (saved) {
      ruleForm.username = saved;
      rememberMe.value = true;
    }
  }
});

onBeforeUnmount(() => {
  window.document.removeEventListener("keypress", onkeypress);
});
</script>

<template>
  <div :class="['select-none', loginPageClass]" :style="loginRootStyle">
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
        </div>
      </div>
    </div>
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
</style>
