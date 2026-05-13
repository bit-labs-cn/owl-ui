import type { Component } from "vue";
import bg from "@bit-labs.cn/owl-ui/assets/login/bg.png";
import avatar from "@bit-labs.cn/owl-ui/assets/login/avatar.svg?component";
import illustration from "@bit-labs.cn/owl-ui/assets/login/illustration.svg?component";
import illustrationDeep from "@bit-labs.cn/owl-ui/assets/login/illustration-deep.svg?component";
import illustrationHud from "@bit-labs.cn/owl-ui/assets/login/illustration-hud.svg?component";
import illustrationAmber from "@bit-labs.cn/owl-ui/assets/login/illustration-amber.svg?component";

export type LoginIllustrationTheme = "deepSpace" | "hudGrid" | "amberCorp";

const illustrationByTheme: Record<LoginIllustrationTheme, Component> = {
  deepSpace: illustrationDeep,
  hudGrid: illustrationHud,
  amberCorp: illustrationAmber
};

/** 按登录背景主题切换左侧行业插画 */
export function getLoginIllustration(theme: LoginIllustrationTheme) {
  return illustrationByTheme[theme] ?? illustration;
}

export { bg, avatar, illustration };
