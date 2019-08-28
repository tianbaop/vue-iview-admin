
import axios from 'axios'
import {Message} from 'iview'
import {globalConfig} from '../../public/config'
import store from "../store/store.js";
axios.defaults.timeout = globalConfig.AXIOS_TIMEOUT;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
axios.defaults.baseURL =globalConfig.baseURL;
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // 携带token
    const token = store.state.ms_users.token
    if (token) {
        config.headers.Authorization = token
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (err) {
    // 对响应错误做点什么
    switch (err.response.status) {
    case 401: // 判断后台返回的token值是否失效
        Message.error({
            content: "登录信息过期,即将跳转登录界面",
            duration: 10,
            closable: true
        });
        // router.replace({ path: '/' });
        setTimeout(() => {
            window.location.href = '/login'
        }, 1000);
        break
    case 404:
        // err.request.responseURL + err.message
        Message.error({
            content:"请求接口地址错误"+ err.response.request.responseURL,
            duration: 10,
            closable: true
        });
        // err.message = err.message;
        err.details = err.response.data.error.details;
        break
    case 500:
        Message.error({
            content:err.response.data.message,
            duration: 10,
            closable: true
        });
        break
    case 502:
        Message.error({
            content:"接口异常",
            duration: 10,
            closable: true
        });
        break
    default:
    }
    return Promise.reject(err);
});
export default {
    posts(url, params) {
        return new Promise((resolve, reject) => {
            axios.post(url, params)
                .then(response => {
                    resolve(response.data);
                }, err => {
                    reject(err);
                })
                ["catch"]((error) => {
                    reject(error)
                })
        })
    },
    gets(url, params) {
        return new Promise((resolve, reject) => {
            axios.get(url, { 'params': params })
                .then(response => {
                    resolve(response.data);
                }, err => {
                    reject(err);
                })
                ["catch"]((error) => {
                    reject(error)
                })
        })
    },
    deletes(url, params) {
        return new Promise((resolve, reject) => {
            axios["delete"](url, { 'params': params })
                .then(response => {
                    resolve(response.data);
                }, err => {
                    reject(err);
                })
                ["catch"] ((error) => {
                    reject(error)
                })
        })
    },
    puts(url, params) {
        return new Promise((resolve, reject) => {
            axios.put(url, params)
                .then(response => {
                    resolve(response.data);
                }, err => {
                    reject(err);
                })
                ["catch"]((error) => {
                    reject(error)
                })
        })
    },
    logins(url, params) {//登录
        var instance = axios.create({
            baseURL: globalConfig.baseURL
        });
        instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        
        // 添加响应拦截器
        instance.interceptors.response.use(function (response) {
            // 对响应数据做点什么
            return response;
        }, function (err) {
            // 对响应错误做点什么
            switch (err.response.status) {
            case 500:
                Message.error({
                    content:err.response.data.message,
                    duration: 10,
                    closable: true
                });
                break
            case 502:
                Message.error({
                    content:"接口异常",
                    duration: 10,
                    closable: true
                });
                break
            }
            return Promise.reject(err);
        });
        return new Promise((resolve, reject) => {
            // var dataParams = new FormData()
            // for (const i in params) {
            //     dataParams.append(i,params[i])
            // }
            instance.post(url, params)
                .then(response => {
                    resolve(response.data);
                }, err => {
                    reject(err);
                })
                ["catch"]((error) => {
                    reject(error)
                })
        })
    },
    loadImg(url, params) { //上传图片
        var dataParams = new FormData()
        for (const i in params) {
            dataParams.append(i,params[i])
        }
        var instance = axios.create({
            baseURL: globalConfig.baseURL
        });
        instance.defaults.headers.post['Content-Type'] = 'multipart/form-data';
        // console.log(axios.defaults.headers)
        return new Promise((resolve, reject) => {
            instance.post(url, dataParams)
                .then(response => {
                    resolve(response.data);
                }, err => {
                    reject(err);
                })
                ["catch"]((error) => {
                    reject(error)
                })
        })
    }

}