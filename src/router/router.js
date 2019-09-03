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
            {//菜单管理
                path: '/menuManagement',
                name: 'menuManagement',
                component: () => import('@/views/systemManagement/menuManagement/menuManagement'),
                redirect: "/menuManagement/menuManagementList/:id",
                children:[
                    {
                        path: '/menuManagement/menuManagementList/:id',
                        component: resolve => require(['@/views/systemManagement/menuManagement/menuManagementList'], resolve),
                        meta: {}
                    },
                    {
                        path: '/menuManagement/menuManagementDetail/:id',
                        component: resolve => require(['@/views/systemManagement/menuManagement/menuManagementDetail'], resolve),
                        meta: {}
                    },
                    {
                        path: '/menuManagement/menuManagementModify/:id',
                        component: resolve => require(['@/views/systemManagement/menuManagement/menuManagementModify'], resolve),
                        meta: {}
                    }
                ]
            },
            {//账号管理
                path: '/roleManagement',
                name: 'roleManagement',
                component: () => import('@/views/accountManagement/roleManagement/roleManagement'),
                redirect: "/roleManagement/roleManagementList/:id",
                children:[
                    {
                        path: '/roleManagement/roleManagementList/:id',
                        component: resolve => require(['@/views/accountManagement/roleManagement/roleManagementList'], resolve),
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
