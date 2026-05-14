<script setup lang="ts">
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import type { FormInstance } from "element-plus";
import { transformI18n, $t } from "@bit-labs.cn/owl-ui/plugins/i18n";
import { loginRules } from "./utils/rule";
import EyeLine from "@iconify-icons/ri/eye-line";
import EyeOffLine from "@iconify-icons/ri/eye-off-line";
import WifiLine from "@iconify-icons/ri/wifi-line";
import syslogo from "@bit-labs.cn/owl-ui/assets/login/syslogo.png";
import loginLeftBg from "@bit-labs.cn/owl-ui/assets/login/login_left_bg.png";
import UserLine from "@iconify-icons/ri/user-line";
import LockLine from "@iconify-icons/ri/lock-line";

defineOptions({ name: "LoginCardFlat" });

const props = defineProps<{
  form: { username: string; password: string };
  rememberMe: boolean;
  loading: boolean;
}>();

const emit = defineEmits<{
  (e: "update:rememberMe", v: boolean): void;
  (e: "request-login"): void;
}>();

const { t } = useI18n();
const formRef = ref<FormInstance>();
const pwdVisible = ref(false);

const remember = computed({
  get: () => props.rememberMe,
  set: v => emit("update:rememberMe", v)
});

defineExpose({
  getFormInstance: () => formRef.value
});

function onSubmit(e: Event) {
  e.preventDefault();
  emit("request-login");
}

function togglePwd() {
  pwdVisible.value = !pwdVisible.value;
}
</script>

<template>
  <div class="login-card-flat-root">
    <div class="left-panel" :style="{ backgroundImage: `url(${loginLeftBg})` }">
      <div class="orb orb-1" />
      <div class="orb orb-2" />
      <div class="orb orb-3" />
      <div class="tech-grid" />
      <div class="glow-line line-1" />
      <div class="glow-line line-2" />
      <div class="brand-content">
        <div class="brand-logo">
          <img
            :src="syslogo"
            class="brand-logo__mark brand-logo__mark--img"
            alt="logo"
          />
          {{ t("login.pureLoginCardFlatBrandName") }}
        </div>
        <h1 class="brand-title">
          {{ t("login.pureLoginCardFlatBrandTitleLine1") }}<br />
          <span class="highlight">{{
            t("login.pureLoginCardFlatBrandTitleHighlight")
          }}</span>{{ t("login.pureLoginCardFlatBrandTitleSuffix") }}
        </h1>
        <div class="brand-slogan">
          <IconifyIconOffline
            :icon="WifiLine"
            class="brand-slogan__mark"
            aria-hidden="true"
          />
          {{ t("login.pureLoginSubtitle") }}
        </div>
        <p class="brand-desc">
          {{ t("login.pureLoginCardFlatBrandDesc") }}
        </p>
      </div>
    </div>

    <div class="right-panel">
      <div class="login-card">
        <div class="login-header">
          <h2>{{ t("login.pureLoginCardFlatWelcomeTitle") }}</h2>
          <p>{{ t("login.pureLoginCardFlatWelcomeSub") }}</p>
        </div>

        <el-form
          ref="formRef"
          class="login-card-flat-form"
          :model="form"
          :rules="loginRules"
          @submit.prevent="onSubmit"
        >
          <div class="form-group">
            <label for="login-card-flat-username">{{
              t("login.pureLoginCardFlatAccountLabel")
            }}</label>
            <el-form-item
              class="form-group-item"
              :rules="[
                {
                  required: true,
                  message: transformI18n($t('login.pureUsernameReg')),
                  trigger: 'blur'
                }
              ]"
              prop="username"
            >
              <div class="input-wrapper">
                <input
                  id="login-card-flat-username"
                  v-model="form.username"
                  type="text"
                  class="form-input"
                  autocomplete="username"
                  :placeholder="t('login.pureLoginCardFlatUsernamePh')"
                />
                <IconifyIconOffline
                  :icon="UserLine"
                  class="input-icon"
                  aria-hidden="true"
                />
              </div>
            </el-form-item>
          </div>

          <div class="form-group">
            <label for="login-card-flat-password">{{
              t("login.pureLoginCardFlatPasswordLabel")
            }}</label>
            <el-form-item class="form-group-item" prop="password">
              <div class="input-wrapper input-wrapper--has-toggle">
                <input
                  id="login-card-flat-password"
                  v-model="form.password"
                  :type="pwdVisible ? 'text' : 'password'"
                  class="form-input"
                  autocomplete="current-password"
                  :placeholder="t('login.pureLoginCardFlatPasswordPh')"
                />
                <IconifyIconOffline
                  :icon="LockLine"
                  class="input-icon"
                  aria-hidden="true"
                />
                <button
                  type="button"
                  class="toggle-password"
                  :aria-label="t('login.pureLoginCardFlatTogglePwd')"
                  @click="togglePwd"
                >
                  <IconifyIconOffline
                    :icon="pwdVisible ? EyeOffLine : EyeLine"
                    class="toggle-password__icon"
                  />
                </button>
              </div>
            </el-form-item>
          </div>

          <div class="form-options">
            <label class="checkbox-wrapper">
              <input v-model="remember" type="checkbox" />
              {{ t("login.pureLoginRemember") }}
            </label>
            <a href="javascript:void(0)" class="forgot-link" @click.prevent>{{
              t("login.pureLoginCardFlatForgotSuffix")
            }}</a>
          </div>

          <button
            type="submit"
            class="btn-login"
            :class="{ loading: loading }"
          >
            <span class="btn-text">{{ t("login.pureLoginCardFlatBtn") }}</span>
            <div class="spinner" />
          </button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
/* 与 login.html 内联样式一比一对应（:root + 各区块） */
.login-card-flat-root {
  --primary-color: #00f2fe;
  --primary-deep: #4facfe;
  --primary-gradient: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  --bg-light: #f4f7f9;
  --glass-bg: rgba(255, 255, 255, 0.65);
  --glass-border: rgba(255, 255, 255, 0.9);
  --text-main: #1e293b;
  --text-muted: #64748b;
  --input-bg: #f8fafc;
  --input-border: #e2e8f0;
  --input-focus-border: #4facfe;
  --shadow-soft: 0 10px 40px 10px rgba(79, 172, 254, 0.1);
  --shadow-card: 0 20px 60px rgba(0, 0, 0, 0.05);
  --field-input-min-h: 52px;
  --field-icon-size: 18px;
  --field-pad-left: 50px;
  --field-pad-right: 16px;
  --field-pad-y: 15px;
  --field-toggle-reserve: 48px;

  width: 100vw;
  max-width: 100%;
  height: 100vh;
  height: 100dvh;
  margin: 0;
  box-sizing: border-box;
  font-family:
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    "Helvetica Neue",
    Arial,
    sans-serif;
  background: var(--bg-light);
  display: flex;
  overflow: hidden;
  color: var(--text-main);
}

.login-card-flat-root *,
.login-card-flat-root *::before,
.login-card-flat-root *::after {
  box-sizing: border-box;
}

.left-panel {
  flex: 1.5;
  position: relative;
  background-color: #f0f6fa;
  background-repeat: no-repeat;
  background-position: center bottom;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding: 4rem;
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.8;
  animation: float 12s infinite ease-in-out;
}

.orb-1 {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, #4facfe 0%, transparent 70%);
  top: -150px;
  left: -150px;
  animation-delay: 0s;
}

.orb-2 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, #00f2fe 0%, transparent 70%);
  bottom: -100px;
  right: -100px;
  animation-delay: -4s;
}

.orb-3 {
  width: 350px;
  height: 350px;
  background: radial-gradient(circle, #a78bfa 0%, transparent 70%);
  top: 40%;
  left: 40%;
  opacity: 0.4;
  animation-delay: -8s;
}

@keyframes float {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(40px, -60px) scale(1.1);
  }
  66% {
    transform: translate(-30px, 30px) scale(0.95);
  }
}

.tech-grid {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
    linear-gradient(rgba(79, 172, 254, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(79, 172, 254, 0.05) 1px, transparent 1px);
  background-size: 40px 40px;
  z-index: 1;
}

.brand-content {
  position: relative;
  z-index: 10;
  text-align: left;
  max-width: 600px;
  align-self: flex-start;
  margin-left: 6%
}

.brand-logo {
  font-size: 2.2rem;
  font-weight: 800;
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 2rem;
  letter-spacing: -0.02em;
  display: flex;
  align-items: center;
  gap: 14px;
}

.brand-logo__mark {
  flex-shrink: 0;
  width: 3.2rem;
  height: 3.2rem;
  color: #4facfe;
  -webkit-text-fill-color: #4facfe;
  filter: drop-shadow(0 4px 10px rgba(79, 172, 254, 0.4));
}

.brand-logo__mark--img {
  object-fit: contain;
  color: unset;
  -webkit-text-fill-color: unset;
  filter: drop-shadow(0 4px 10px rgba(79, 172, 254, 0.4));
}

.brand-title {
  font-size: 3.2rem;
  font-weight: 800;
  line-height: 1.2;
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: #0f172a;
  letter-spacing: -0.02em;
}

.brand-title .highlight {
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.brand-slogan {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 1.1rem;
  color: var(--primary-deep);
  font-weight: 600;
  margin-bottom: 2rem;
  padding: 8px 16px;
  background: rgba(79, 172, 254, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(79, 172, 254, 0.2);
}

.brand-slogan__mark {
  flex-shrink: 0;
  width: 1em;
  height: 1em;
  color: inherit;
}

.brand-slogan__mark :deep(svg) {
  width: 100%;
  height: 100%;
}

.brand-desc {
  font-size: 1.1rem;
  color: var(--text-muted);
  line-height: 1.8;
  font-weight: 400;
  margin: 0;
}

.glow-line {
  position: absolute;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--primary-color),
    transparent
  );
  opacity: 0.6;
  z-index: 2;
}

.line-1 {
  top: 20%;
  left: 5%;
  width: 300px;
  transform: rotate(-15deg);
  animation: lineMove 8s infinite alternate;
}

.line-2 {
  bottom: 30%;
  right: 10%;
  width: 400px;
  transform: rotate(15deg);
  animation: lineMove 10s infinite alternate-reverse;
}

@keyframes lineMove {
  0% {
    opacity: 0.2;
    transform: translateX(0) rotate(-15deg);
  }
  100% {
    opacity: 0.8;
    transform: translateX(50px) rotate(-15deg);
  }
}

.right-panel {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to right top, rgba(234, 255, 255, 0.58) 0%, transparent 60%);
    
  position: relative;
}

.login-card {
  width: 100%;
  max-width: 440px;
  padding: 3.5rem;
  background: var(--glass-bg);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border: 1px solid var(--glass-border);
  border-radius: 24px;
  box-shadow: var(--shadow-card), var(--shadow-soft);
  margin-right: 8%;
  position: relative;
  overflow: hidden;
  z-index: 10;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.login-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 30px 70px rgba(0, 0, 0, 0.08), 0 10px 30px rgba(79, 172, 254, 0.15);
}

.login-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--primary-gradient);
  opacity: 0.8;
}

.login-header {
  margin-bottom: 3rem;
  text-align: center;
}

.login-header h2 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #0f172a;
}

.login-header p {
  color: var(--text-muted);
  font-size: 0.95rem;
}

.login-card-flat-form {
  display: block;
  width: 100%;
}

.login-card-flat-form :deep(.el-form-item) {
  margin-bottom: 0;
}

.login-card-flat-form :deep(.el-form-item__content) {
  display: block;
  width: 100%;
}

.form-group {
  margin-bottom: 1.8rem;
  position: relative;
}

.form-group label {
  display: block;
  font-size: 0.875rem;
  color: #334155;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.form-group-item :deep(.el-form-item__error) {
  padding-top: 6px;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: stretch;
  width: 100%;
}

.input-icon {
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--field-icon-size);
  height: var(--field-icon-size);
  color: #94a3b8;
  transition: color 0.3s ease;
  pointer-events: none;
}

.input-icon :deep(svg) {
  width: 100%;
  height: 100%;
  display: block;
}

.form-input {
  box-sizing: border-box;
  width: 100%;
  min-height: var(--field-input-min-h);
  padding: var(--field-pad-y) var(--field-pad-right) var(--field-pad-y)
    var(--field-pad-left);
  background: var(--input-bg);
  border: 1.5px solid var(--input-border);
  border-radius: 14px;
  color: var(--text-main);
  font-size: 1rem;
  line-height: 1.35;
  outline: none;
  transition: all 0.3s ease;
}

.input-wrapper--has-toggle .form-input {
  padding-right: var(--field-toggle-reserve);
}

.form-input::placeholder {
  color: #cbd5e1;
}

.form-input:focus {
  border-color: var(--input-focus-border);
  background: #ffffff;
  box-shadow: 0 0 0 4px rgba(79, 172, 254, 0.15);
}

.form-input:focus ~ .input-icon {
  color: var(--primary-deep);
}

.toggle-password {
  position: absolute;
  right: 18px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  width: 36px;
  height: 36px;
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  font-size: 1rem;
  transition: color 0.3s;
  padding: 0;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toggle-password:hover {
  color: var(--primary-deep);
}

.toggle-password__icon {
  width: var(--field-icon-size);
  height: var(--field-icon-size);
  display: flex;
  align-items: center;
  justify-content: center;
}

.toggle-password__icon :deep(svg) {
  width: 100%;
  height: 100%;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
  font-size: 0.875rem;
}

.checkbox-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: var(--text-muted);
  user-select: none;
}

.checkbox-wrapper input[type="checkbox"] {
  appearance: none;
  width: 18px;
  height: 18px;
  border: 1.5px solid #cbd5e1;
  border-radius: 5px;
  background: #fff;
  cursor: pointer;
  position: relative;
  transition: all 0.2s;
}

.checkbox-wrapper input[type="checkbox"]:checked {
  background: var(--primary-deep);
  border-color: var(--primary-deep);
}

.checkbox-wrapper input[type="checkbox"]:checked::after {
  content: "✓";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 11px;
  font-weight: bold;
}

.forgot-link {
  color: var(--primary-deep);
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s;
}

.forgot-link:hover {
  color: #0f172a;
}

.btn-login {
  width: 100%;
  padding: 17px;
  border: none;
  border-radius: 14px;
  background: var(--primary-gradient);
  color: white;
  font-size: 1.05rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 20px rgba(79, 172, 254, 0.3);
  position: relative;
  overflow: hidden;
  letter-spacing: 1px;
}

.btn-login:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(79, 172, 254, 0.45);
}

.btn-login:active {
  transform: translateY(0);
}

.btn-login::after {
  content: "";
  position: absolute;
  top: -50%;
  left: -60%;
  width: 40%;
  height: 200%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.4),
    transparent
  );
  transform: skewX(-25deg);
  animation: btnShine 3s infinite ease-in-out;
}

@keyframes btnShine {
  0% {
    left: -60%;
  }
  20% {
    left: 120%;
  }
  100% {
    left: 120%;
  }
}

.btn-login.loading {
  pointer-events: none;
  opacity: 0.9;
}

.btn-login.loading .btn-text {
  display: none;
}

.btn-login .spinner {
  display: none;
  width: 22px;
  height: 22px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 0.8s linear infinite;
  margin: 0 auto;
}

.btn-login.loading .spinner {
  display: block;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 1024px) {
  .left-panel {
    display: none;
  }

  .right-panel {
    flex: 1;
    background: linear-gradient(135deg, #e0f7fa 0%, #f4f7f9 100%);
  }

  .login-card {
    margin-right: 0;
  }
}
</style>
