import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
let routes=[
    {
        path: '/',
        name: 'index',
        component: () => import('@/views/home/index.vue'),
        redirect: "/home",
        children:[
            {
                path: '/home',
                name: 'home',
                component: () => import('@/views/home/Home.vue')
            },
            {
                path: '/menuManagement',
                name: 'menuManagement',
                component: () => import('@/views/systemManagement/menuManagement/menuManagement'),
                redirect: "/menuManagement/menuManagementList/default",
                children:[
                    {
                        path: '/menuManagement/menuManagementList/default',
                        component: resolve => require(['@/views/systemManagement/menuManagement/menuManagementList'], resolve),
                        meta: {}
                    },
                    {
                        path: '/menuManagement/menuManagementDetail/default',
                        component: resolve => require(['@/views/systemManagement/menuManagement/menuManagementDetail'], resolve),
                        meta: {}
                    },
                    {
                        path: '/menuManagement/menuManagementModify/:id',
                        component: resolve => require(['@/views/systemManagement/menuManagement/menuManagementModify'], resolve),
                        meta: {}
                    }
                ]
            }
            
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/login.vue')
    }
]
export default new Router({
    mode: 'history',
    scrollBehavior (to, from, savedPosition) {//切换路由时的滚动
        return { x: 0, y: 0 }
    },
    routes: routes
})
