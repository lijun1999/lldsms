import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Editpw from '../components/Editpw.vue'
import Design from '../components/design/Design.vue'
import Sysinfo from '../components/design/Sysinfo.vue'
import Timeline from '../components/design/Timeline.vue'
import Chart from '../components/design/Chart.vue'
import Admin from '../components/admin/Admin.vue'
import Userlist from '../components/admin/Userlist.vue'
import Eqlist from '../components/admin/Eqlist.vue'
import Eqlb from '../components/admin/Eqlb.vue'
import Repair from '../components/admin/Repair.vue'
import Eqlend from '../components/admin/Eqlend.vue'
import Eqback from '../components/admin/Eqback.vue'
import User from '../components/user/User.vue'
import Eqsel from '../components/user/Eqsel.vue'
import Myeq from '../components/user/Myeq.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/admin',
    component: Admin,
    redirect: '/admin/design',
    children: [
      {
        path: '/admin/design',
        component: Design,
        redirect: '/admin/sysinfo',
        children: [
          { path: '/admin/sysinfo', component: Sysinfo },
          { path: '/admin/timeline', component: Timeline },
          { path: '/admin/chart', component: Chart }
        ]
      },
      { path: '/admin/userlist', component: Userlist },
      { path: '/admin/eqlist', component: Eqlist },
      {
        path: '/admin/eqlb',
        component: Eqlb,
        redirect: '/admin/eqlend',
        children: [
          { path: '/admin/eqlend', component: Eqlend },
          { path: '/admin/eqback', component: Eqback }
        ]
      },
      { path: '/admin/repair', component: Repair },
      { path: '/admin/editpw', component: Editpw }
    ]
  },
  {
    path: '/user',
    component: User,
    redirect: '/user/design',
    children: [
      {
        path: '/user/design',
        component: Design,
        redirect: '/user/sysinfo',
        children: [
          { path: '/user/sysinfo', component: Sysinfo },
          { path: '/user/timeline', component: Timeline },
          { path: '/user/chart', component: Chart }
        ]
      },
      { path: '/user/eqsel', component: Eqsel },
      { path: '/user/myeq', component: Myeq },
      { path: '/user/editpw', component: Editpw }
    ]
  }
]

const router = new VueRouter({
  routes
})

//  挂在路由导航守卫
router.beforeEach((to, from, next) => {
  //  to将要访问的路径
  //  from 从哪个路径跳转来
  //  next 放行函数
  //  next() 放行  next('/login) 强制跳转
  if (to.path === '/login') return next()
  //获取token
  const tokenStr = window.sessionStorage.getItem('utype')
  if (!tokenStr) {
    return next('/login')
  }
  next()
})

export default router
