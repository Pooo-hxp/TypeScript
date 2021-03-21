import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Welcome from '@/components/Welcome'
import Users from '@/components/user/Users'
// 权限目录下各组件
import Rights from '@/components/power/Rights'
import Roles from '@/components/power/Roles'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/', redirect: '/login'
    },
    { path: '/login', component: Login },
    {
      path: '/home', component: Home, redirect: '/welcome',
      children: [
        { path: '/welcome', component: Welcome },
        { path: '/users', component: Users },
        { path: '/rights', component: Rights },
        { path: '/roles', component: Roles },
      ]
    },
  ]
})
//-挂载路由守卫
router.beforeEach((to, from, next) => {
  /**
   * to 指访问路径
   * from 指路由来源
   * next函数指放行，进入to指向的组件
   */
  if (to.path === '/login') return next();
  //-拿到token,若没有这指，代表未登录，转向登录页
  let getToken = window.sessionStorage.getItem('token')
  if (!getToken) return next('/login')
  next();
})
export default router;