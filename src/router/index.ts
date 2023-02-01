import {
  createRouter,
  createWebHashHistory,
  Router,
  RouteRecordRaw
} from 'vue-router'

import Layout from '/@/layout/index.vue'
import type { AppRouteRecordRaw } from '/@/router/types'

// 配置路由信息
export const constantRoutes: AppRouteRecordRaw[] = [
  {
    path : '/redirect',
    name : 'Redirect',
    component : Layout,
    meta : {
      title : 'Redirect',
      hidden : true
    },
    children : [
      {
        path : '/redirect/:path(.*)',
        name : 'Redirect',
        component : () => import( '/@/views/redirect/index.vue' ),
        meta : {
          title : 'Redirect',
          hidden : true
        }
      }
    ]
  },

  {
    path : '/login',
    name : 'Login',
    component : () => import( '/@/views/login/index.vue' ),
    meta : {
      hidden : true,
      title : '登录'
    }
  },
  {
    path : '/404',
    name : 'Error404',
    component : () => import( '/@/views/error/404.vue' ),
    meta : {
      hidden : true,
      title : '404'
    }
  },
  {
    path : '/401',
    name : 'Error401',
    component : () => import( '/@/views/error/401.vue' ),
    meta : {
      hidden : true,
      title : '401'
    }
  },
  {
    path : '/500',
    name : 'Error500',
    component : () => import( '/@/views/error/500.vue' ),
    meta : {
      hidden : true,
      title : '500'
    }
  }
]

export const asyncRoutes: AppRouteRecordRaw[] = [
  {
    path : '/',
    name : 'Dashboard',
    component : Layout,
    redirect : '/dashboard',
    meta : {
      title : '主页'
    },
    children : [
      {
        path : 'dashboard',
        name : 'Dashboard',
        component : () => import( '/@/views/dashboard/index.vue' ),
        meta : {
          title : '主页',
          icon : 'dashboard',
          noCache : true,
          affix : true
        }
      }
    ]
  },
  {
    path : '/icon',
    name : 'Icon',
    component : Layout,
    meta : {
      title : '图标'
    },
    children : [
      {
        path : 'index',
        component : () => import( '/@/views/icons/index.vue' ),
        name : 'Icons',
        meta : { title : '图标', icon : 'image', noCache : true }
      }
    ]
  },
  {
    path : '/:pathMatch(.*)',
    redirect : '/404',
    name : 'Redirect404',
    meta : {
      title : '404',
      hidden : true
    }
  }
]

const router: Router = createRouter( {
  history : createWebHashHistory( './' ),
  routes : constantRoutes.concat( asyncRoutes ) as unknown as RouteRecordRaw[],
  scrollBehavior : () => ( { left : 0, top : 0 } )
} )

export function resetRouter() {
  const WHITE_NAME_LIST = ['Login']
  router.getRoutes().forEach( route => {
    const { name } = route
    if ( name && !WHITE_NAME_LIST.includes( <string>name ) ) {
      router.hasRoute( name ) && router.removeRoute( name )
    }
  } )
}

export default router
