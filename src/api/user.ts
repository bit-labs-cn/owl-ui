import { http } from "@bit-labs.cn/owl-ui/utils/http";

export type LoginCaptchaAnswer = {
  captchaId: string;
  x?: number;
  y?: number;
  angle?: number;
  points?: Array<{ index: number; x: number; y: number }>;
};

export type CaptchaConfig = {
  enabled: boolean;
  type: string;
  mode: string;
};

export type CaptchaConfigResult = {
  success: boolean;
  data: CaptchaConfig;
};

export type CaptchaGenerateData = SlideCaptchaData & {
  captchaId: string;
  masterImage: string;
  thumbImage?: string;
  tileImage?: string;
};

export type LoginParams = {
  username: string;
  password: string;
  deviceId?: string;
  captcha?: LoginCaptchaAnswer;
};

export type UserResult = {
  success: boolean;
  data: {
    /** 头像 */
    avatar?: string;
    /** 用户名 */
    username?: string;
    /** 昵称 */
    nickname?: string;
    /** 当前登录用户的角色 */
    roles?: Array<string>;
    /** 按钮级别权限 */
    permissions?: Array<string>;
    /** 是否需要验证码 */
    needCaptcha?: boolean;
    /** 验证码类型 */
    captchaType?: string;
    /** `token` */
    accessToken?: string;
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refreshToken?: string;
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires?: Date;
  };
};

export type SlideCaptchaData = {
  captchaId: string;
  masterImage: string;
  tileImage: string;
  tileY: number;
  tileWidth: number;
  tileHeight: number;
};

export type CaptchaGenerateResult = {
  success: boolean;
  data: CaptchaGenerateData;
};

export type RefreshTokenResult = {
  success: boolean;
  data: {
    /** `token` */
    accessToken: string;
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refreshToken: string;
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date;
  };
};

export type UserInfo = {
  /** 头像 */
  avatar: string;
  /** 用户名 */
  username: string;
  /** 昵称 */
  nickname: string;
  /** 邮箱 */
  email: string;
  /** 联系电话 */
  phone: string;
  /** 简介 */
  description: string;
};

export type UserInfoResult = {
  success: boolean;
  data: UserInfo;
};

export type UserPermissionsResult = {
  success: boolean;
  data: Array<string>;
};

class UserAPI {
  /** 登录 */
  login = (data?: LoginParams) => {
    return http.request<UserResult>(
      "post",
      "/api/v1/users/login",
      { data },
      { silentMessage: true }
    );
  };
  /** 获取验证码配置（captcha.yaml） */
  getCaptchaConfig = () => {
    return http.request<CaptchaConfigResult>(
      "get",
      "/api/v1/captcha/config",
      {},
      { silentMessage: true }
    );
  };
  /** 生成验证码（type 省略时使用服务端 captcha.yaml 配置） */
  generateCaptcha = (type?: string) => {
    return http.request<CaptchaGenerateResult>(
      "post",
      "/api/v1/captcha/generate",
      { data: type ? { type } : {} },
      { silentMessage: true }
    );
  };
  /** 刷新 token */
  refreshTokenApi = (data?: object) => {
    return http.request<RefreshTokenResult>("post", "/refresh-token", {
      data
    }, { silentMessage: true });
  };
  /** 获取当前用户路由菜单（动态路由） */
  getAsyncRoutes = () => {
    return http.request<Result>("get", "/api/v1/users/me/menus", {}, { silentMessage: true });
  };
  /** 获取当前用户权限（按钮级） */
  getMyPermissions = () => {
    return http.request<UserPermissionsResult>("get", "/api/v1/users/me/permissions", {}, { silentMessage: true });
  };
  /** 获取个人信息 */
  getMine = (data?: object) => {
    return http.request<UserInfoResult>("get", "/mine", { data }, { silentMessage: true });
  };
  /** 获取个人安全日志 */
  getMineLogs = (data?: object) => {
    return http.request<ResultTable>("get", "/mine-logs", { data }, { silentMessage: true });
  };
}

export const userAPI = new UserAPI();
