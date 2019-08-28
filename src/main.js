import Vue from 'vue'
import config from '../public/config'
Vue.prototype.$config = config;
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import axios from './axios/index'
import i18n from '@/lang'
import iView from 'iview';
// 处理路由问题
import Router from 'vue-router'
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return routerPush.call(this, location)["catch"](error=> error)
}
// 处理路由问题

import less from 'less'
Vue.use(less)
// import 'iview/dist/styles/iview.css';
import 'style/iviewTheme.less'
Vue.locale = () => {};
Vue.use(iView, {//iView全局配置
    i18n: (key, value) => i18n.t(key, value),
    transfer: true,//所有带浮层的组件，是否将浮层放置在 body 内，默认为不设置，详见各组件默认的 transfer 值。可选值为 true 或 false。
    size: 'large',//所有带有 size 属性的组件的尺寸，默认为不设置，详见各组件默认的 size 值。可选值为 default、small 或 large。
    select: {
        arrow: 'md-arrow-dropdown',//Select 下拉箭头图标
        arrowSize: 20//Select 下拉箭头尺寸
    }
});
Vue.config.productionTip = false
Vue.prototype.$axios = axios;
new Vue({
    router,
    store,
    i18n,
    axios,
    render: h => h(App)
}).$mount('#app')
