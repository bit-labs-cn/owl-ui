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
import { useRenderIcon } from "@bit-labs.cn/owl-ui/components/ReIcon/src/hooks";
import { ref, reactive, onMounted, onBeforeUnmount, computed, watch } from "vue";
import { useTranslationLang } from "@bit-labs.cn/owl-ui/layout/hooks/useTranslationLang";
import { useDataThemeChange } from "@bit-labs.cn/owl-ui/layout/hooks/useDataThemeChange";
import { useGlobal } from "@pureadmin/utils";
import loginFormCard from "@bit-labs.cn/owl-ui/assets/login/login_form.png";
import loginBgJpg from "@bit-labs.cn/owl-ui/assets/login/login_bg1.jpg";
import LoginCardFlat from "./LoginCardFlat.vue";

import dayIcon from "@bit-labs.cn/owl-ui/assets/svg/day.svg?component";
import darkIcon from "@bit-labs.cn/owl-ui/assets/svg/dark.svg?component";
import globalization from "@bit-labs.cn/owl-ui/assets/svg/globalization.svg?component";
import Lock from "@iconify-icons/ri/lock-fill";
import Check from "@iconify-icons/ep/check";
import User from "@iconify-icons/ri/user-3-fill";
import LayoutGridLine from "@iconify-icons/ri/layout-grid-line";

type LoginUiVariant = NonNullable<ResponsiveStorage["layout"]["loginUiVariant"]>;

/** 登录页「分栏 / 经典 / 渐变卡片」切换：暂时隐藏，需要时改为 true */
const showLoginUiSwitcher = false;

defineOptions({
  name: "Login"
});
const router = useRouter();
const loading = ref(false);
const ruleFormRef = ref<FormInstance>();
const cardFlatRef = ref<InstanceType<typeof LoginCardFlat> | null>(null);
const rememberMe = ref(false);

const { initStorage } = useLayout();
initStorage();

const { $storage } = useGlobal<GlobalPropertiesApi>();

const { t } = useI18n();
const { dataTheme, overallStyle, dataThemeChange } = useDataThemeChange();
dataThemeChange(overallStyle.value);
const { title, getDropdownItemStyle, getDropdownItemClass } = useNav();
const { locale, translationCh, translationEn } = useTranslationLang();

function readLoginUiVariant(): LoginUiVariant {
  const v = $storage.layout?.loginUiVariant;
  if (v === "classic" || v === "brand" || v === "cardFlat") return v;
  return "cardFlat";
}

const loginUiVariant = ref<LoginUiVariant>(readLoginUiVariant());

watch(loginUiVariant, v => {
  if (!$storage.layout) return;
  $storage.layout = { ...$storage.layout, loginUiVariant: v };
});

const loginUiSegmentedOptions = computed(() => [
  { label: t("login.pureLoginUiBrand"), value: "brand" },
  { label: t("login.pureLoginUiClassic"), value: "classic" },
  { label: t("login.pureLoginUiCardFlat"), value: "cardFlat" }
]);

const ruleForm = reactive({
  username: "",
  password: ""
});

const onLogin = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      loading.value = true;
      useUserStoreHook()
        .loginByUsername({
          username: ruleForm.username,
          password: ruleForm.password
        })
        .then(res => {
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

function onkeypress({ code }: KeyboardEvent) {
  if (!["Enter", "NumpadEnter"].includes(code)) return;
  if (loginUiVariant.value === "cardFlat") {
    onLogin(cardFlatRef.value?.getFormInstance());
  } else {
    onLogin(ruleFormRef.value);
  }
}

onMounted(() => {
  window.document.addEventListener("keypress", onkeypress);
});

onBeforeUnmount(() => {
  window.document.removeEventListener("keypress", onkeypress);
});
</script>

<template>
  <div
    class="login-page select-none relative min-h-screen"
    :class="{
      'login-page--classic': loginUiVariant === 'classic',
      'login-page--cardflat': loginUiVariant === 'cardFlat'
    }"
  >
    <div
      v-if="loginUiVariant !== 'cardFlat'"
      class="login-fullbg login-fullbg--jpgBg"
      aria-hidden="true"
    >
      <img class="login-fullbg__photo" :src="loginBgJpg" alt="" />
    </div>

    <div class="login-toolbar-wrap login-toolbar-wrap--subtle fixed right-3 top-3 z-[2000]">
      <div
        class="login-toolbar-shell flex flex-row-reverse items-center gap-2 rounded-full border border-white/10 bg-black/15 px-2 py-1 backdrop-blur-md"
      >
        <div
          v-if="showLoginUiSwitcher"
          class="login-toolbar-variant flex items-center gap-1.5 shrink-0"
        >
          <IconifyIconOffline
            :icon="LayoutGridLine"
            class="login-toolbar-variant__icon text-white/[0.82] w-[18px] h-[18px]"
          />
          <el-segmented
            v-model="loginUiVariant"
            size="small"
            class="login-ui-segmented"
            :options="loginUiSegmentedOptions"
          />
        </div>

        <el-switch
          v-model="dataTheme"
          inline-prompt
          :active-icon="dayIcon"
          :inactive-icon="darkIcon"
          @change="dataThemeChange"
        />

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
    </div>

    <div v-if="loginUiVariant === 'brand'" class="login-container">
      <div class="login-cardPlate">
        <img
          class="login-cardPlate__img"
          :src="loginFormCard"
          alt=""
          width="1024"
          height="556"
          draggable="false"
        />
        <div class="login-cardPlate__form">
          <Motion>
            <p class="login-cardPlate__welcome">
              {{ t("login.pureLoginWelcome") }}
            </p>
          </Motion>
          <Motion :delay="20">
            <h1 class="login-cardPlate__title outline-none">{{ title }}</h1>
          </Motion>
          <Motion :delay="40">
            <p class="login-cardPlate__subtitle">
              {{ t("login.pureLoginSubtitle") }}
            </p>
          </Motion>

          <el-form
            ref="ruleFormRef"
            class="login-cardPlate__form-inner"
            :model="ruleForm"
            :rules="loginRules"
            size="large"
          >
            <Motion :delay="100">
              <el-form-item
                :rules="[
                  {
                    required: true,
                    message: transformI18n($t('login.pureUsernameReg')),
                    trigger: 'blur'
                  }
                ]"
                prop="username"
              >
                <el-input
                  v-model="ruleForm.username"
                  clearable
                  :placeholder="t('login.pureUsername')"
                  :prefix-icon="useRenderIcon(User)"
                />
              </el-form-item>
            </Motion>

            <Motion :delay="150">
              <el-form-item prop="password">
                <el-input
                  v-model="ruleForm.password"
                  clearable
                  show-password
                  :placeholder="t('login.purePassword')"
                  :prefix-icon="useRenderIcon(Lock)"
                />
              </el-form-item>
            </Motion>

            <Motion :delay="200">
              <div class="login-cardPlate__meta">
                <el-checkbox v-model="rememberMe" size="default">
                  {{ t("login.pureLoginRemember") }}
                </el-checkbox>
              </div>
            </Motion>

            <Motion :delay="250">
              <el-button
                class="login-cardPlate__submit w-full"
                size="large"
                type="primary"
                :loading="loading"
                @click="onLogin(ruleFormRef)"
              >
                {{ t("login.pureLogin") }}
              </el-button>
            </Motion>
          </el-form>
        </div>
      </div>
    </div>

    <div v-else-if="loginUiVariant === 'classic'" class="login-container login-container--classic">
      <div class="login-classic">
        <header class="login-classic__masthead">
          <h1 class="login-classic__welcome">{{ t("login.pureLoginWelcome") }}</h1>
          <p class="login-classic__system">{{ title }}</p>
        </header>

        <el-form
          ref="ruleFormRef"
          class="login-classic__form"
          :model="ruleForm"
          :rules="loginRules"
          label-position="left"
          label-width="68px"
          size="large"
          hide-required-asterisk
        >
          <el-form-item
            class="login-classic__row"
            :rules="[
              {
                required: true,
                message: transformI18n($t('login.pureUsernameReg')),
                trigger: 'blur'
              }
            ]"
            prop="username"
          >
            <template #label>
              <span class="login-classic__label-justify">{{
                t("login.pureLoginClassicUser")
              }}</span>
            </template>
            <el-input
              v-model="ruleForm.username"
              clearable
              :placeholder="t('login.pureLoginClassicUserPh')"
            />
          </el-form-item>
          <el-form-item class="login-classic__row login-classic__row--password" prop="password">
            <template #label>
              <span class="login-classic__label-justify">{{
                t("login.pureLoginClassicPwd")
              }}</span>
            </template>
            <el-input
              v-model="ruleForm.password"
              clearable
              show-password
              :placeholder="t('login.pureLoginClassicPwdPh')"
            />
          </el-form-item>
          <el-form-item
            class="login-classic__row login-classic__row--ghost-label login-classic__row--remember"
          >
            <template #label>
              <span class="login-classic__label-ghost" aria-hidden="true" />
            </template>
            <el-checkbox v-model="rememberMe">{{
              t("login.pureLoginClassicRememberPwd")
            }}</el-checkbox>
          </el-form-item>
          <el-form-item
            class="login-classic__row--submit login-classic__row--fullbleed"
          >
            <el-button
              class="login-cardPlate__submit login-classic__submit w-full"
              size="large"
              type="primary"
              :loading="loading"
              @click="onLogin(ruleFormRef)"
            >
              {{ t("login.pureLogin") }}
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <LoginCardFlat
      v-else-if="loginUiVariant === 'cardFlat'"
      ref="cardFlatRef"
      :form="ruleForm"
      v-model:remember-me="rememberMe"
      :loading="loading"
      @request-login="() => onLogin(cardFlatRef?.getFormInstance())"
    />
  </div>
</template>

<style scoped>
@import url("@bit-labs.cn/owl-ui/style/login.css");
</style>

<style src="./login-bg-themes.css"></style>

<style lang="scss" scoped>
.login-cardPlate {
  --login-card-radius: 22px;
  position: relative;
  width: min(1024px, 96vw);
  line-height: 0;
  background: transparent;
  isolation: isolate;
  /* 勿在父级用 overflow:hidden + 圆角 包透明 PNG，易触发 WebKit/Chromium 圆角外黑边合成 bug */
  overflow: visible;
}

.login-cardPlate__img {
  display: block;
  width: 100%;
  height: auto;
  vertical-align: top;
  user-select: none;
  border-radius: var(--login-card-radius);
  transform: translateZ(0);
}

.login-cardPlate__form {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
  box-sizing: border-box;
  width: 52%;
  max-width: 32rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: clamp(1.75rem, 6.5vh, 3rem) 5% clamp(1.5rem, 5vh, 2.5rem) 7.5%;
  text-align: center;
  background: transparent;
}

.login-cardPlate__welcome {
  margin: 0 0 1.125rem;
  padding: 0.5rem 0 0.625rem;
  font-size: clamp(0.9375rem, 1.22vw, 1.0625rem);
  font-weight: 700;
  letter-spacing: 0.08em;
  line-height: 1.5;
  color: #475569;
}

.login-cardPlate__title {
  margin: 0 0 0.625rem;
  font-size: clamp(calc(0.9375rem + 4px), calc(1.28vw + 4px), calc(1.125rem + 4px));
  font-weight: 700;
  line-height: 1.45;
  color: #1f2937;
}

.login-cardPlate__subtitle {
  margin: 0 0 1.5rem;
  font-size: 0.75rem;
  line-height: 1.55;
  color: #8c8c8c;
}

.login-cardPlate__form-inner {
  text-align: left;
}

:deep(.login-cardPlate__form-inner .el-form-item) {
  margin-bottom: 1.05rem;
}

:deep(.login-cardPlate__form-inner .el-input__wrapper) {
  min-height: 48px;
  padding-left: 14px;
  padding-right: 14px;
  border-radius: 999px;
  background: #f5f5f5;
  box-shadow: 0 0 0 1px #e8e8e8 inset;
  transition:
    background-color 0.2s ease,
    box-shadow 0.2s ease;
}

:deep(.login-cardPlate__form-inner .el-input__wrapper:hover) {
  box-shadow: 0 0 0 1px #d9d9d9 inset;
}

:deep(.login-cardPlate__form-inner .el-input__wrapper.is-focus) {
  background: #ffffff;
  box-shadow:
    0 0 0 1px #1890ff inset,
    0 0 0 3px rgba(24, 144, 255, 0.12);
}

:deep(.login-cardPlate__form-inner .el-input__inner) {
  color: #262626;
  font-size: 0.9375rem;
}

:deep(.login-cardPlate__form-inner .el-input__inner::placeholder) {
  color: #bfbfbf;
}

:deep(.login-cardPlate__form-inner .el-input__prefix),
:deep(.login-cardPlate__form-inner .el-input__suffix) {
  color: #8c8c8c;
}

:deep(.login-cardPlate__form-inner .el-input__prefix-inner > :first-child),
:deep(.login-cardPlate__form-inner .el-input__suffix-inner > :first-child) {
  font-size: 18px;
  color: #8c8c8c;
}

:deep(.login-cardPlate__form-inner .el-input__prefix-inner svg),
:deep(.login-cardPlate__form-inner .el-input__suffix-inner svg) {
  width: 1.125rem;
  height: 1.125rem;
  color: #8c8c8c;
}

.login-cardPlate__meta {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 0.15rem;
  margin-bottom: 0.35rem;
  font-size: 0.8125rem;
}

:deep(.login-cardPlate__meta .el-checkbox__label) {
  color: #8c8c8c;
  font-weight: 400;
}

:deep(.login-cardPlate__meta .el-checkbox__inner) {
  width: 16px;
  height: 16px;
  border-radius: 3px;
  border-color: #d9d9d9;
}

:deep(.login-cardPlate__meta .el-checkbox__input.is-checked .el-checkbox__inner) {
  background-color: #1890ff;
  border-color: #1890ff;
}

:deep(.login-cardPlate__meta .el-checkbox__input.is-checked .el-checkbox__inner::after) {
  border-color: #fff;
}

.login-cardPlate__submit.el-button--primary {
  --el-button-bg-color: transparent;
  --el-button-border-color: transparent;
  --el-button-hover-bg-color: transparent;
  --el-button-hover-border-color: transparent;
  --el-button-active-bg-color: transparent;
  --el-button-active-border-color: transparent;
  margin-top: 1.125rem;
  min-height: 56px;
  height: 56px;
  padding: 0 1.5rem;
  font-size: 1.0625rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: #ffffff !important;
  border-radius: 999px;
  border: none !important;
  background: linear-gradient(90deg, #1866e4 0%, #00a0ff 100%) !important;
  box-shadow: 0 4px 18px rgba(24, 120, 220, 0.45);
}

.login-cardPlate__submit.el-button--primary:hover,
.login-cardPlate__submit.el-button--primary:focus {
  background: linear-gradient(90deg, #2a7aef 0%, #1eb2ff 100%) !important;
  box-shadow: 0 6px 22px rgba(24, 130, 230, 0.5);
}

.login-cardPlate__submit.el-button--primary:active {
  background: linear-gradient(90deg, #1456c8 0%, #0090ea 100%) !important;
  box-shadow: 0 3px 12px rgba(20, 86, 200, 0.45);
}

.login-cardPlate__submit.el-button--primary:focus-visible {
  box-shadow:
    0 4px 18px rgba(24, 120, 220, 0.45),
    0 0 0 3px rgba(0, 160, 255, 0.25);
}

@media (max-width: 900px) {
  .login-container--classic {
    justify-content: center;
    padding: 1rem calc(1rem + 150px) 1rem 1rem;
  }

  .login-classic {
    width: 100%;
    max-width: 320px;
    min-height: auto;
  }

  .login-cardPlate {
    --login-card-radius: 16px;
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .login-cardPlate__img {
    width: 100%;
    flex-shrink: 0;
  }

  .login-cardPlate__form {
    position: relative;
    width: 100%;
    max-width: none;
    padding: 1.75rem 1.35rem 1.5rem;
    background: #ffffff;
    justify-content: flex-start;
  }
}

.login-container--classic {
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: clamp(1rem, 4vh, 2.5rem) calc(clamp(1.25rem, 5vw, 4rem) + 150px)
    clamp(1rem, 4vh, 2.5rem) 1.25rem;
  box-sizing: border-box;
}

.login-classic {
  --login-classic-label-w: 68px;
  --login-classic-field-gap: 0px;
  --login-classic-row-h: 40px;
  width: min(100%, 360px);
  box-sizing: border-box;
  min-height: 31.5rem;
  padding: 2.35rem 1.65rem 2.4rem;
  border-radius: 16px;
  border: 1px solid rgba(15, 23, 42, 0.06);
  background: rgba(255, 255, 255, 0.93);
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.75) inset,
    0 14px 40px rgba(15, 23, 42, 0.1);
  backdrop-filter: blur(10px);
  text-align: left;
}

.login-classic__masthead {
  width: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.login-classic__welcome {
  margin: 0 0 0.65rem;
  font-size: clamp(1.4rem, 2.25vw, 1.8rem);
  font-weight: 700;
  color: #0f172a;
  text-align: left;
  letter-spacing: 0.03em;
  line-height: 1.25;
}

.login-classic__system {
  margin: 0 0 1.85rem;
  font-size: clamp(0.9375rem, 1.2vw, 1.0625rem);
  font-weight: 600;
  line-height: 1.55;
  color: #334155;
  letter-spacing: 0.02em;
  text-align: left;
}

:deep(.login-classic__form.el-form) {
  width: 100%;
  margin: 0;
  padding: 0;
}

/* 标签列固定为较窄宽度 + 零列间距，让输入框紧贴标签栏（与 EP label-width 一致） */
:deep(.login-classic__form .el-form-item.login-classic__row) {
  display: grid !important;
  grid-template-columns: var(--login-classic-label-w) minmax(0, 1fr);
  column-gap: var(--login-classic-field-gap);
  align-items: center;
  margin-bottom: 1.85rem;
}

:deep(.login-classic__form .login-classic__row--password) {
  margin-bottom: 1rem !important;
}

:deep(.login-classic__form .login-classic__row--remember) {
  margin-top: -0.4rem;
  margin-bottom: 1.65rem !important;
}

:deep(.login-classic__form .login-classic__row .el-form-item__label-wrap) {
  display: flex !important;
  align-items: center !important;
  justify-content: flex-start;
  width: 100% !important;
  max-width: 100% !important;
  min-width: 0;
  float: none !important;
}

:deep(.login-classic__form .login-classic__row .el-form-item__label) {
  display: flex !important;
  align-items: center !important;
  justify-content: flex-start;
  width: 100% !important;
  max-width: 100% !important;
  height: var(--login-classic-row-h) !important;
  min-height: var(--login-classic-row-h) !important;
  max-height: var(--login-classic-row-h) !important;
  padding: 0 !important;
  margin: 0 !important;
  line-height: var(--login-classic-row-h) !important;
  float: none !important;
  box-sizing: border-box !important;
  color: #475569;
  font-weight: 600;
}

:deep(.login-classic__form .login-classic__row .el-form-item__content) {
  display: flex !important;
  align-items: center !important;
  margin-left: 0 !important;
  min-height: var(--login-classic-row-h);
  line-height: 1;
}

.login-classic__label-justify {
  display: block;
  width: 100%;
  margin: 0;
  padding: 0;
  text-align: justify;
  text-align-last: justify;
  line-height: 1.2;
  white-space: nowrap;
}

.login-classic__label-justify::after {
  content: "";
  display: inline-block;
  width: 100%;
  height: 0;
  line-height: 0;
  font-size: 0;
  overflow: hidden;
  vertical-align: top;
}

/* 登录按钮：与「标签列+输入列」同宽通栏（参考图整行对齐） */
:deep(.login-classic__form .login-classic__row--fullbleed) {
  display: block !important;
  margin-bottom: 0 !important;
  margin-top: 0.25rem;
}

:deep(.login-classic__form .login-classic__row--fullbleed .el-form-item__label-wrap) {
  display: none !important;
}

:deep(.login-classic__form .login-classic__row--fullbleed .el-form-item__content) {
  display: block !important;
  width: 100% !important;
  max-width: 100% !important;
  margin-left: 0 !important;
  min-height: 0 !important;
}

:deep(.login-classic__form .login-classic__row--fullbleed .login-classic__submit) {
  margin-top: calc(2rem + 15px) !important;
  min-height: 51px !important;
  height: 51px !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}

.login-classic__label-ghost {
  display: block;
  width: 100%;
  height: 0;
  margin: 0;
  padding: 0;
  overflow: hidden;
  opacity: 0;
  pointer-events: none;
}

:deep(.login-classic__form .el-input) {
  width: 100%;
}

:deep(.login-classic__form .el-input__wrapper) {
  border-radius: 8px;
  background: #fff;
  min-height: var(--login-classic-row-h);
  height: var(--login-classic-row-h);
  box-sizing: border-box;
  align-items: center;
  box-shadow: 0 0 0 1px #e2e8f0 inset;
  transition:
    box-shadow 0.2s ease,
    background-color 0.2s ease;
}

:deep(.login-classic__form .el-input__wrapper:hover) {
  box-shadow: 0 0 0 1px #cbd5e1 inset;
}

:deep(.login-classic__form .el-input__wrapper.is-focus) {
  background: #fff;
  box-shadow:
    0 0 0 1px #3b82f6 inset,
    0 0 0 3px rgba(59, 130, 246, 0.18);
}

:deep(.login-classic__form .el-input__inner) {
  line-height: 1.25;
  height: auto;
  vertical-align: middle;
}

.login-classic__submit {
  display: block;
  width: 100%;
  max-width: 100%;
}

.login-ui-segmented {
  :deep(.el-segmented__group) {
    background: rgba(15, 23, 42, 0.32);
    box-shadow:
      inset 0 0 0 1px rgba(255, 255, 255, 0.14),
      inset 0 1px 0 rgba(255, 255, 255, 0.08);
    align-items: stretch;
  }

  /* 选中滑块：描边用 inset，避免外扩 box-shadow 导致看起来比未选高一截 */
  :deep(.el-segmented__item-selected) {
    box-sizing: border-box !important;
    top: 0 !important;
    bottom: 0 !important;
    height: 100% !important;
    background: #ffffff !important;
    box-shadow: inset 0 0 0 2px var(--el-color-primary, #409eff) !important;
  }

  :deep(.el-segmented__item) {
    box-sizing: border-box;
    color: rgba(255, 255, 255, 0.9) !important;
    padding-inline: 12px;
    font-size: 12px;
    font-weight: 500;
  }

  :deep(.el-segmented__item.is-selected) {
    color: #0f172a !important;
    font-weight: 700;
  }

  :deep(.el-segmented__item:not(.is-selected):not(.is-disabled):hover) {
    color: #ffffff !important;
  }
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

/* 右上角亮暗 / 语言：弱化存在感 */
.login-toolbar-wrap--subtle {
  opacity: 0.72;
  transition: opacity 0.2s ease;
}

.login-toolbar-wrap--subtle:hover {
  opacity: 0.95;
}
</style>
