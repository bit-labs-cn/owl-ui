import Axios from "axios";
import { stringify } from "qs";
import NProgress from "../progress";
import { getToken, formatToken } from "@bit-labs.cn/owl-ui/utils/auth";
import { useUserStoreHook } from "@bit-labs.cn/owl-ui/store/modules/user";
import { message } from "@bit-labs.cn/owl-ui/utils/message";
// 相关配置请参考：www.axios-js.com/zh-cn/docs/#axios-request-config-1
const defaultConfig = {
    // API 基础地址（由消费方 .env 中的 VITE_BASE_URL 注入）
    baseURL: import.meta.env.VITE_BASE_URL ?? "",
    // 请求超时时间
    timeout: 10000,
    headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest"
    },
    // 数组格式参数序列化（https://github.com/axios/axios/issues/5142）
    paramsSerializer: {
        serialize: stringify
    }
};
class PureHttp {
    constructor() {
        this.httpInterceptorsRequest();
        this.httpInterceptorsResponse();
    }
    /** `token`过期后，暂存待执行的请求 */
    static requests = [];
    /** 防止重复刷新`token` */
    static isRefreshing = false;
    /** 初始化配置对象 */
    static initConfig = {};
    /** 保存当前`Axios`实例对象 */
    static axiosInstance = Axios.create(defaultConfig);
    /** 重连原始请求 */
    static retryOriginalRequest(config) {
        return new Promise(resolve => {
            PureHttp.requests.push((token) => {
                config.headers["Authorization"] = formatToken(token);
                resolve(config);
            });
        });
    }
    /** 请求拦截 */
    httpInterceptorsRequest() {
        PureHttp.axiosInstance.interceptors.request.use(async (config) => {
            // 开启进度条动画
            NProgress.start();
            // 优先判断post/get等方法是否传入回调，否则执行初始化设置等回调
            if (typeof config.beforeRequestCallback === "function") {
                config.beforeRequestCallback(config);
                return config;
            }
            if (PureHttp.initConfig.beforeRequestCallback) {
                PureHttp.initConfig.beforeRequestCallback(config);
                return config;
            }
            /** 请求白名单，放置一些不需要`token`的接口（通过设置请求白名单，防止`token`过期后再请求造成的死循环问题） */
            const whiteList = ["/refresh-token", "/login"];
            return whiteList.some(url => config.url.endsWith(url))
                ? config
                : new Promise(resolve => {
                    const data = getToken();
                    if (data) {
                        const now = new Date().getTime();
                        const expired = parseInt(data.expires) - now <= 0;
                        if (expired) {
                            if (!PureHttp.isRefreshing) {
                                PureHttp.isRefreshing = true;
                                // token过期刷新
                                useUserStoreHook()
                                    .handRefreshToken({ refreshToken: data.refreshToken })
                                    .then(res => {
                                    const token = res.data.accessToken;
                                    config.headers["Authorization"] = formatToken(token);
                                    PureHttp.requests.forEach(cb => cb(token));
                                    PureHttp.requests = [];
                                })
                                    .finally(() => {
                                    PureHttp.isRefreshing = false;
                                });
                            }
                            resolve(PureHttp.retryOriginalRequest(config));
                        }
                        else {
                            config.headers["Authorization"] = formatToken(data.accessToken);
                            resolve(config);
                        }
                    }
                    else {
                        resolve(config);
                    }
                });
        }, error => {
            return Promise.reject(error);
        });
    }
    /** 响应拦截 */
    httpInterceptorsResponse() {
        const instance = PureHttp.axiosInstance;
        instance.interceptors.response.use((response) => {
            const $config = response.config;
            // 关闭进度条动画
            NProgress.done();
            // 优先判断post/get等方法是否传入回调，否则执行初始化设置等回调
            if (typeof $config.beforeResponseCallback === "function") {
                $config.beforeResponseCallback(response);
                return response.data;
            }
            if (PureHttp.initConfig.beforeResponseCallback) {
                PureHttp.initConfig.beforeResponseCallback(response);
                return response.data;
            }
            const data = response.data;
            const silentMessage = $config.silentMessage;
            if (data && data.success === false) {
                if (!silentMessage) {
                    message(data.msg || "操作失败", { type: "error" });
                }
                return Promise.reject(data);
            }
            if (data?.msg && !silentMessage) {
                message(data.msg, { type: "success" });
            }
            return response.data;
        }, (error) => {
            const $error = error;
            $error.isCancelRequest = Axios.isCancel($error);
            // 关闭进度条动画
            NProgress.done();
            // 所有的响应异常 区分来源为取消请求/非取消请求
            const silentMessage = $error.config?.silentMessage;
            if (!$error.isCancelRequest && !silentMessage) {
                const status = $error.response?.status;
                const data = $error.response?.data;
                message(data?.msg || getDefaultErrorMessage(status), {
                    type: "error"
                });
            }
            return Promise.reject($error);
        });
    }
    /** 通用请求工具函数 */
    request(method, url, param, axiosConfig) {
        const config = {
            method,
            url,
            ...param,
            ...axiosConfig
        };
        // 单独处理自定义请求/响应回调
        return new Promise((resolve, reject) => {
            PureHttp.axiosInstance
                .request(config)
                .then((response) => {
                resolve(response);
            })
                .catch(error => {
                reject(error);
            });
        });
    }
    /** 单独抽离的`post`工具函数 */
    post(url, params, config) {
        return this.request("post", url, params, config);
    }
    /** 单独抽离的`get`工具函数 */
    get(url, params, config) {
        return this.request("get", url, params, config);
    }
}
export const http = new PureHttp();
function getDefaultErrorMessage(status) {
    switch (status) {
        case 400:
            return "请求参数有误";
        case 401:
            return "未登录或登录已过期";
        case 403:
            return "没有操作权限";
        case 404:
            return "请求的资源不存在";
        case 500:
            return "服务器内部错误";
        default:
            return "网络异常，请稍后重试";
    }
}
//# sourceMappingURL=index.js.map