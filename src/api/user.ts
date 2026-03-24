import { http } from "@bit-labs.cn/owl-ui/utils/http";

export type UserResult = {
  success: boolean;
  data: {
    /** 头像 */
    avatar: string;
    /** 用户名 */
    username: string;
    /** 昵称 */
    nickname: string;
    /** 当前登录用户的角色 */
    roles: Array<string>;
    /** 按钮级别权限 */
    permissions: Array<string>;
    /** `token` */
    accessToken: string;
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refreshToken: string;
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date;
  };
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
  login = (data?: object) => {
    return http.request<UserResult>("post", "/api/v1/users/login", {
      data
    });
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
