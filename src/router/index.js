import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const Index = () => import("@/views/index.vue")
const Login = () => import("@/views/Login.vue")
const Editpw = () => import("@/views/Editpw.vue")
const Design = () => import("@/views/design/Design.vue")
const Sysinfo = () => import("@/views/design/Sysinfo.vue")
const Timeline = () => import("@/views/design/Timeline.vue")
const Chart = () => import("@/views/design/Chart.vue")
const EChart = () => import("@/views/design/echart.vue")
const Admin = () => import("@/views/admin/Admin.vue")
const Userlist = () => import("@/views/admin/Userlist.vue")
const Eqlist = () => import("@/views/admin/Eqlist.vue")
const Eqlb = () => import("@/views/admin/Eqlb.vue")
const Repair = () => import("@/views/admin/Repair.vue")
const Eqlend = () => import("@/views/admin/Eqlend.vue")
const Eqback = () => import("@/views/admin/Eqback.vue")
const User = () => import("@/views/user/User.vue")
const Eqsel = () => import("@/views/user/Eqsel.vue")
const Myeq = () => import("@/views/user/Myeq.vue")


Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/index' },
  {
    path: '/index',
    component: Index,
    meta: {
      title: '首页'
    }
  },
  {
    path: '/login',
    component: Login,
    meta: {
      title: '登录'
    }
  },
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
      {
        path: '/admin/sysinfo',
        component: Sysinfo,
        meta: {
          title: '简介'
        }
      }]
    },
    {
      path: '/admin/userlist',
      component: Userlist,
      meta: {
        title: '用户列表'
      }
    },
    {
      path: '/admin/eqlist',
      component: Eqlist,
      meta: {
        title: '设备列表'
      }
    },
    {
      path: '/admin/eqlb',
      component: Eqlb,
      redirect: '/admin/eqlend',
      children: [
      {
        path: '/admin/eqlend',
        component: Eqlend,
        meta: {
          title: '设备借出'
        }
      },
      {
        path: '/admin/eqback',
        component: Eqback,
        meta: {
          title: '设备归还'
        }
      }]
    },
    {
      path: '/admin/repair',
      component: Repair,
      meta: {
        title: '设备报修'
      }
    }]
  },
  {
    path: '/editpw',
    component: Editpw,
    meta: {
      title: '修改密码'
    }
  },
  {
    path: '/echart',
    component: EChart,
    meta: {
      title: '数据图表'
    }
  },
  {
    path: '/timeline',
    component: Timeline,
    meta: {
      title: '时间线'
    }
  },
  {
    path: '/chart',
    component: Chart,
    meta: {
      title: '图表'
    }
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
      {
        path: '/user/sysinfo',
        component: Sysinfo,
        meta: {
          title: '简介'
        }
      },
      {
        path: '/user/timeline',
        component: Timeline,
        meta: {
          title: '时间线'
        }
      },
      {
        path: '/user/chart',
        component: Chart,
        meta: {
          title: '图表'
        }
      }]
    },
    {
      path: '/user/eqsel',
      component: Eqsel,
      meta: {
        title: '设备查询'
      }
    },
    {
      path: '/user/myeq',
      component: Myeq,
      meta: {
        title: '已借设备'
      }
    },
    {
      path: '/user/editpw',
      component: Editpw,
      meta: {
        title: '修改密码'
      }
    }]
  }
]

const router = new VueRouter({
  // mode: "history",
  routes
})

//  挂在路由导航守卫
router.beforeEach((to, from, next) => {
  // 开启进度条
  NProgress.start();
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  //  to将要访问的路径
  //  from 从哪个路径跳转来
  //  next 放行函数
  //  next() 放行  next('/login) 强制跳转
  if (to.path === '/login' || from.path === '/login' || to.path === '/index' || from.path === '/index') { return next() }
  //获取token
  const tokenStr = window.localStorage.getItem('token')
  if (!tokenStr) {
    return next('/login')
  }
  next()
})

router.afterEach(() => {
  // 关闭进度条
  NProgress.done()
})
export default router
