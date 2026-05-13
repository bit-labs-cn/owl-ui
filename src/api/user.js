import { http } from "@bit-labs.cn/owl-ui/utils/http";
class UserAPI {
    /** 登录 */
    login = (data) => {
        return http.request("post", "/api/v1/users/login", {
            data
        });
    };
    /** 刷新 token */
    refreshTokenApi = (data) => {
        return http.request("post", "/refresh-token", {
            data
        }, { silentMessage: true });
    };
    /** 获取当前用户路由菜单（动态路由） */
    getAsyncRoutes = () => {
        return http.request("get", "/api/v1/users/me/menus", {}, { silentMessage: true });
    };
    /** 获取当前用户权限（按钮级） */
    getMyPermissions = () => {
        return http.request("get", "/api/v1/users/me/permissions", {}, { silentMessage: true });
    };
    /** 获取个人信息 */
    getMine = (data) => {
        return http.request("get", "/mine", { data }, { silentMessage: true });
    };
    /** 获取个人安全日志 */
    getMineLogs = (data) => {
        return http.request("get", "/mine-logs", { data }, { silentMessage: true });
    };
}
export const userAPI = new UserAPI();
//# sourceMappingURL=user.js.map