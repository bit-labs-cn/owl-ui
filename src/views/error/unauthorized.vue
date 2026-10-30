<script setup lang="ts">
import { useRouter } from "vue-router";
import { useUserStoreHook } from "@bit-labs.cn/owl-ui/store/modules/user";
import hero from "@bit-labs.cn/owl-ui/assets/status/unauthorized-hero.jpg";

defineOptions({
  name: "Unauthorized"
});

const router = useRouter();

const goHome = () => {
  router.push("/");
};

const relogin = () => {
  useUserStoreHook().logOut();
};
</script>

<template>
  <div class="unauthorized">
    <div class="unauthorized__glow unauthorized__glow--left" />
    <div class="unauthorized__glow unauthorized__glow--right" />
    <div class="unauthorized__stage">
      <img class="unauthorized__hero" :src="hero" alt="" />
      <div class="unauthorized__copy">
        <div class="unauthorized__badge" aria-hidden="true">
          <svg viewBox="0 0 48 48" fill="none">
            <path
              d="M24 8.5 12.5 13.4v9.6c0 8 5.2 15.2 11.5 17.6 6.3-2.4 11.5-9.6 11.5-17.6v-9.6L24 8.5Z"
              stroke="currentColor"
              stroke-width="2.2"
              stroke-linejoin="round"
            />
            <path
              d="M19.2 23.2 22.4 26.4 29.2 19.2"
              stroke="currentColor"
              stroke-width="2.2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <h1>系统未授权</h1>
        <p class="unauthorized__desc">
          您当前的账号没有访问该系统的权限，<br />
          请联系管理员进行授权，或确认您已登录正确的账号。
        </p>
        <div class="unauthorized__actions">
          <button type="button" class="unauthorized__btn unauthorized__btn--primary" @click="goHome">
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path
                d="M3.5 8.8 10 3.5l6.5 5.3V16a1 1 0 0 1-1 1h-4.2v-4.2H8.7V17H4.5a1 1 0 0 1-1-1V8.8Z"
                fill="currentColor"
              />
            </svg>
            返回首页
          </button>
          <button type="button" class="unauthorized__btn" @click="relogin">
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path
                d="M15.2 7.2A5.8 5.8 0 0 0 4.6 8.4"
                fill="none"
                stroke="currentColor"
                stroke-width="1.6"
                stroke-linecap="round"
              />
              <path
                d="M4.8 12.8a5.8 5.8 0 0 0 10.6-1.2"
                fill="none"
                stroke="currentColor"
                stroke-width="1.6"
                stroke-linecap="round"
              />
              <path d="M14.2 4.6v3.2h-3.2" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M5.8 15.4v-3.2h3.2" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            重新登录
          </button>
        </div>
        <p class="unauthorized__hint">
          <span aria-hidden="true">i</span>
          如有疑问，请联系系统管理员或技术支持。
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.unauthorized {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  overflow: hidden;
  padding: 48px 40px;
  background:
    radial-gradient(circle at 12% 18%, rgba(255, 255, 255, 0.9), transparent 28%),
    radial-gradient(circle at 88% 78%, rgba(186, 210, 255, 0.45), transparent 32%),
    linear-gradient(180deg, #f7f9ff 0%, #eef3fc 48%, #e7eefb 100%);
}

.unauthorized__glow {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}

.unauthorized__glow--left {
  top: -120px;
  left: -80px;
  width: 420px;
  height: 420px;
  background: rgba(255, 255, 255, 0.7);
  filter: blur(8px);
}

.unauthorized__glow--right {
  right: -140px;
  bottom: -160px;
  width: 560px;
  height: 360px;
  background: rgba(176, 204, 255, 0.35);
  transform: rotate(-18deg);
  filter: blur(6px);
}

.unauthorized__stage {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 72px;
  width: min(1120px, 100%);
}

.unauthorized__hero {
  width: min(520px, 48vw);
  height: auto;
  object-fit: contain;
  user-select: none;
}

.unauthorized__copy {
  width: 420px;
  max-width: 100%;
  text-align: left;
}

.unauthorized__badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  margin: 0 0 20px;
  color: #3b6cff;
  background: rgba(255, 255, 255, 0.86);
  border-radius: 50%;
  box-shadow: 0 10px 28px rgba(79, 124, 255, 0.12);
}

.unauthorized__badge svg {
  width: 34px;
  height: 34px;
}

h1 {
  margin: 0 0 12px;
  font-size: 32px;
  font-weight: 700;
  line-height: 1.3;
  color: #1e2b5a;
}

.unauthorized__desc {
  margin: 0 0 28px;
  font-size: 15px;
  line-height: 1.8;
  color: #8b95ab;
}

.unauthorized__actions {
  display: flex;
  gap: 16px;
}

.unauthorized__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 46px;
  padding: 0 28px;
  border: 1px solid #e6ebf5;
  border-radius: 8px;
  background: #fff;
  color: #4b5568;
  font-size: 15px;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(30, 64, 175, 0.04);
}

.unauthorized__btn svg {
  width: 16px;
  height: 16px;
}

.unauthorized__btn--primary {
  border-color: transparent;
  background: #3d6bff;
  color: #fff;
  box-shadow: 0 10px 22px rgba(61, 107, 255, 0.28);
}

.unauthorized__btn--primary:hover {
  background: #325ff2;
}

.unauthorized__btn:hover {
  border-color: #d5ddec;
}

.unauthorized__hint {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 6px;
  margin: 18px 0 0;
  font-size: 13px;
  line-height: 1.5;
  color: #a0a8ba;
}

.unauthorized__hint span {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #5b8def;
  color: #fff;
  font-size: 11px;
  font-style: italic;
  font-weight: 700;
  line-height: 1;
}

@media (max-width: 960px) {
  .unauthorized__stage {
    flex-direction: column;
    gap: 12px;
  }

  .unauthorized__hero {
    width: min(420px, 86vw);
  }

  .unauthorized__copy {
    width: min(420px, 100%);
  }

  h1 {
    font-size: 28px;
  }

  .unauthorized__actions {
    flex-wrap: wrap;
  }
}
</style>
