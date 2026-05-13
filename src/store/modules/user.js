import { defineStore } from "pinia";
import { store, router, resetRouter, routerArrays, storageLocal } from "../utils";
import { userAPI } from "@bit-labs.cn/owl-ui/api/user";
import { useMultiTagsStoreHook } from "./multiTags";
import { setToken, removeToken, userKey } from "@bit-labs.cn/owl-ui/utils/auth";
const PERMISSIONS_CACHE_KEY = "user-permissions-cache";
const ACCESS_TOKEN_KEY = "access-token";
const PERMISSIONS_CACHE_TTL = 24 * 60 * 60 * 1000;
function getCachedPermissions() {
    const permissionsCache = storageLocal().getItem(PERMISSIONS_CACHE_KEY);
    if (!permissionsCache) {
        return storageLocal().getItem(userKey)?.permissions ?? [];
    }
    if (permissionsCache.expiresAt <= Date.now()) {
        storageLocal().removeItem(PERMISSIONS_CACHE_KEY);
        return [];
    }
    return permissionsCache.permissions;
}
function isPermissionsCacheValid() {
    const permissionsCache = storageLocal().getItem(PERMISSIONS_CACHE_KEY);
    return !!permissionsCache && permissionsCache.expiresAt > Date.now();
}
export const useUserStore = defineStore({
    id: "pure-user",
    state: () => ({
        // 头像
        avatar: storageLocal().getItem(userKey)?.avatar ?? "",
        // 用户名
        username: storageLocal().getItem(userKey)?.username ?? "",
        // 昵称
        nickname: storageLocal().getItem(userKey)?.nickname ?? "",
        // 页面级别权限
        roles: storageLocal().getItem(userKey)?.roles ?? [],
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
        SET_AVATAR(avatar) {
            this.avatar = avatar;
        },
        /** 存储用户名 */
        SET_USERNAME(username) {
            this.username = username;
        },
        /** 存储昵称 */
        SET_NICKNAME(nickname) {
            this.nickname = nickname;
        },
        /** 存储角色 */
        SET_ROLES(roles) {
            this.roles = roles;
        },
        /** 存储按钮级别权限 */
        SET_PERMS(permissions) {
            this.permissions = permissions;
        },
        /** 拉取并缓存权限（1天） */
        async fetchAndCachePermissions() {
            try {
                const permissionsRes = await userAPI.getMyPermissions();
                if (!permissionsRes?.success)
                    return;
                const permissions = permissionsRes.data ?? [];
                this.SET_PERMS(permissions);
                storageLocal().setItem(PERMISSIONS_CACHE_KEY, {
                    permissions,
                    expiresAt: Date.now() + PERMISSIONS_CACHE_TTL
                });
                const userInfo = storageLocal().getItem(userKey);
                if (userInfo) {
                    storageLocal().setItem(userKey, {
                        ...userInfo,
                        permissions
                    });
                }
            }
            catch {
                // 权限接口异常时不阻断登录流程
            }
        },
        /** 缓存过期时自动刷新权限 */
        async ensurePermissionsFresh() {
            if (isPermissionsCacheValid())
                return;
            await this.fetchAndCachePermissions();
        },
        /** 存储前端生成的验证码 */
        SET_VERIFYCODE(verifyCode) {
            this.verifyCode = verifyCode;
        },
        /** 存储登录页面显示哪个组件 */
        SET_CURRENTPAGE(value) {
            this.currentPage = value;
        },
        /** 存储是否勾选了登录页的免登录 */
        SET_ISREMEMBERED(bool) {
            this.isRemembered = bool;
        },
        /** 设置登录页的免登录存储几天 */
        SET_LOGINDAY(value) {
            this.loginDay = Number(value);
        },
        /** 登入 */
        async loginByUsername(data) {
            return new Promise((resolve, reject) => {
                userAPI
                    .login(data)
                    .then(async (data) => {
                    if (data?.success) {
                        setToken(data.data);
                        localStorage.setItem(ACCESS_TOKEN_KEY, data.data?.accessToken);
                        await this.fetchAndCachePermissions();
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
            removeToken();
            useMultiTagsStoreHook().handleTags("equal", [...routerArrays]);
            resetRouter();
            router.push("/login");
        },
        /** 刷新`token` */
        async handRefreshToken(data) {
            return new Promise((resolve, reject) => {
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
//# sourceMappingURL=user.js.map