import { defineStore } from "pinia";
import {
  type userType,
  store,
  router,
  resetRouter,
  routerArrays,
  storageLocal
} from "../utils";
import { type UserResult, type RefreshTokenResult, userAPI } from "@bit-labs.cn/owl-ui/api/user";
import { useMultiTagsStoreHook } from "./multiTags";
import { type DataInfo, setToken, removeToken, userKey } from "@bit-labs.cn/owl-ui/utils/auth";

const PERMISSIONS_CACHE_KEY = "user-permissions-cache";
const ACCESS_TOKEN_KEY = "access-token";
const PERMISSIONS_CACHE_TTL = 24 * 60 * 60 * 1000;

type PermissionsCache = {
  permissions: Array<string>;
  expiresAt: number;
};

function getCachedPermissions(): Array<string> {
  const permissionsCache = storageLocal().getItem<PermissionsCache>(PERMISSIONS_CACHE_KEY);
  if (!permissionsCache) {
    return storageLocal().getItem<DataInfo<number>>(userKey)?.permissions ?? [];
  }
  if (permissionsCache.expiresAt <= Date.now()) {
    storageLocal().removeItem(PERMISSIONS_CACHE_KEY);
    return [];
  }
  return permissionsCache.permissions;
}

function accessTokenExpires(token: string): Date {
  try {
    const payload = token.split(".")[1];
    if (!payload) throw new Error("empty");
    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(
      normalized.length + ((4 - (normalized.length % 4)) % 4),
      "="
    );
    const json = JSON.parse(atob(padded));
    if (typeof json.exp === "number") return new Date(json.exp * 1000);
  } catch {
    // 令牌没有标准过期时间时，按两小时处理。
  }
  return new Date(Date.now() + 2 * 60 * 60 * 1000);
}

function isPermissionsCacheValid(): boolean {
  const permissionsCache = storageLocal().getItem<PermissionsCache>(PERMISSIONS_CACHE_KEY);
  return !!permissionsCache && permissionsCache.expiresAt > Date.now();
}

export const useUserStore = defineStore({
  id: "pure-user",
  state: (): userType => ({
    // 头像
    avatar: storageLocal().getItem<DataInfo<number>>(userKey)?.avatar ?? "",
    // 用户名
    username: storageLocal().getItem<DataInfo<number>>(userKey)?.username ?? "",
    // 昵称
    nickname: storageLocal().getItem<DataInfo<number>>(userKey)?.nickname ?? "",
    // 页面级别权限
    roles: storageLocal().getItem<DataInfo<number>>(userKey)?.roles ?? [],
    // 按钮级别权限
    permissions: getCachedPermissions(),
    // 前端生成的验证码（按实际需求替换）
    verifyCode: "",
    // 判断登录页面显示哪个组件（0：登录（默认）、1：手机登录、2：二维码登录、3：注册、4：忘记密码）
    currentPage: 0,
    // 是否勾选了登录页的免登录
    isRemembered: false,
    // 登录页的免登录存储几天，默认7天
    loginDay: 7
  }),
  actions: {
    /** 存储头像 */
    SET_AVATAR(avatar: string) {
      this.avatar = avatar;
    },
    /** 存储用户名 */
    SET_USERNAME(username: string) {
      this.username = username;
    },
    /** 存储昵称 */
    SET_NICKNAME(nickname: string) {
      this.nickname = nickname;
    },
    /** 存储角色 */
    SET_ROLES(roles: Array<string>) {
      this.roles = roles;
    },
    /** 存储按钮级别权限 */
    SET_PERMS(permissions: Array<string>) {
      this.permissions = permissions;
    },
    /** 拉取并缓存权限（1天） */
    async fetchAndCachePermissions() {
      try {
        const permissionsRes = await userAPI.getMyPermissions();
        if (!permissionsRes?.success) return;
        const permissions = permissionsRes.data ?? [];
        this.SET_PERMS(permissions);
        storageLocal().setItem(PERMISSIONS_CACHE_KEY, {
          permissions,
          expiresAt: Date.now() + PERMISSIONS_CACHE_TTL
        });
        const userInfo = storageLocal().getItem<DataInfo<number>>(userKey);
        if (userInfo) {
          storageLocal().setItem(userKey, {
            ...userInfo,
            permissions
          });
        }
      } catch {
        // 权限接口异常时不阻断登录流程
      }
    },
    /** 拉取当前用户信息（含头像）并写入 store / localStorage */
    async fetchAndCacheUserInfo() {
      try {
        const meRes = await userAPI.getMe();
        if (!meRes?.success || !meRes.data) return;
        const { avatar, username, nickname } = meRes.data;
        if (avatar !== undefined) this.SET_AVATAR(avatar ?? "");
        if (username) this.SET_USERNAME(username);
        if (nickname !== undefined) this.SET_NICKNAME(nickname ?? "");
        const userInfo = storageLocal().getItem<DataInfo<number>>(userKey);
        if (userInfo) {
          storageLocal().setItem(userKey, {
            ...userInfo,
            avatar: avatar ?? userInfo.avatar ?? "",
            username: username ?? userInfo.username ?? "",
            nickname: nickname ?? userInfo.nickname ?? ""
          });
        }
      } catch {
        // 用户信息接口异常时不阻断登录流程
      }
    },
    /** 缓存过期时自动刷新权限 */
    async ensurePermissionsFresh() {
      if (isPermissionsCacheValid()) return;
      await this.fetchAndCachePermissions();
    },
    /** 存储前端生成的验证码 */
    SET_VERIFYCODE(verifyCode: string) {
      this.verifyCode = verifyCode;
    },
    /** 存储登录页面显示哪个组件 */
    SET_CURRENTPAGE(value: number) {
      this.currentPage = value;
    },
    /** 存储是否勾选了登录页的免登录 */
    SET_ISREMEMBERED(bool: boolean) {
      this.isRemembered = bool;
    },
    /** 设置登录页的免登录存储几天 */
    SET_LOGINDAY(value: number) {
      this.loginDay = Number(value);
    },
    /** 用第三方登录拿到的访问令牌建立本地会话 */
    async loginByToken(accessToken: string) {
      setToken({
        accessToken,
        refreshToken: "",
        expires: accessTokenExpires(accessToken)
      });
      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
      await this.fetchAndCachePermissions();
      await this.fetchAndCacheUserInfo();
    },
    /** 登入 */
    async loginByUsername(data) {
      return new Promise<UserResult>((resolve, reject) => {
        userAPI
          .login(data)
          .then(async data => {
            if (data?.success && data.data?.needCaptcha) {
              resolve(data);
              return;
            }
            if (data?.success && data.data?.accessToken) {
              setToken(data.data);
              localStorage.setItem(ACCESS_TOKEN_KEY, data.data.accessToken);
              await this.fetchAndCachePermissions();
              await this.fetchAndCacheUserInfo();
            }
            resolve(data);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    /** 前端登出（不调用接口） */
    logOut() {
      this.username = "";
      this.roles = [];
      this.permissions = [];
      storageLocal().removeItem(PERMISSIONS_CACHE_KEY);
      storageLocal().removeItem(ACCESS_TOKEN_KEY);
      storageLocal().removeItem("async-routes");
      removeToken();
      useMultiTagsStoreHook().handleTags("equal", [...routerArrays]);
      resetRouter();
      router.push("/login");
    },
    /** 刷新`token` */
    async handRefreshToken(data) {
      return new Promise<RefreshTokenResult>((resolve, reject) => {
        userAPI
          .refreshTokenApi(data)
          .then(data => {
            if (data) {
              setToken(data.data);
              resolve(data);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
});

export function useUserStoreHook() {
  return useUserStore(store);
}
