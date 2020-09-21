import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


//获取原型对象上的push函数
const originalPush = Router.prototype.push
//修改原型对象中的push方法
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: () => import('@/pages/Home/Home')
    },
    {
      path: '/login',
      component: () => import('@/pages/Login/Login')
    },
    {
      path: '/menu',
      component: () => import('@/pages/Menu/Menu')
    },
    {
      path: '/menu/add',
      component: () => import('@/pages/Menu/Menuadd')
    },
    {
      path: '/menu/edit',
      component: () => import('@/pages/Menu/Menuadd')
    },
    {
      path: '/role',
      component: () => import('@/pages/Role/Role')
    },
    {
      path: '/role/add',
      component: () => import('@/pages/Role/Roleadd')
    },
    {
      path: '/role/edit',
      component: () => import('@/pages/Role/Roleadd')
    },
    {
      path: '/user',
      component: () => import('@/pages/User/User')
    },
    {
      path: '/user/add',
      component: () => import('@/pages/User/Useradd')
    },
    {
      path: '/user/edit',
      component: () => import('@/pages/User/Useradd')
    },
    {
      path: '/category',
      component: () => import('@/pages/Category/Category')
    },
    {
      path: '/category/add',
      component: () => import('@/pages/Category/Categoryadd')
    },
    {
      path: '/category/edit',
      component: () => import('@/pages/Category/Categoryadd')
    },
    {
      path: '/specs',
      component: () => import('@/pages/Specs/Specs')
    },
    {
      path: '/specs/add',
      component: () => import('@/pages/Specs/Specsadd')
    },
    {
      path: '/specs/edit',
      component: () => import('@/pages/Specs/Specsadd')
    }
  ]
})
