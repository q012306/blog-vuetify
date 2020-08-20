import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
Vue.use(VueRouter)

  const routes = [
    {
      // home页面并不需要被访问，只是作为其它组件的父组件
      path: '/',
      component: Home,
      redirect: '/index',
      children: [
        {
          path: '/index',
          name: 'Articles',
          component: () => import('../components/articles/Articles.vue')
        },
        {
          path: '/article',
          name: 'ArticleDetails',
          component: () => import('../components/articles/ArticleDetails.vue')
        },
        {
          path: '/admin/article-management',
          name: 'ArticleManagement',
          component: () => import('../components/articles/ArticleManagement.vue'),
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/admin/article-editor',
          name: 'ArticleEditor',
          component: () => import('../components/articles/ArticleEditor.vue'),
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/about',
          name: 'About',
          component: () => import('../components/about/about.vue'),
        },
        {
          path: '/friends',
          name: 'Friends',
          component: () => import('../components/friends/friends.vue'),
        },
        {
          path: '/admin/linkpagemanagement',
          name: 'LinkPage',
          component: () => import('../components/LinkPages/LinkPageManagement.vue'),
        },
        
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../views/register.vue')
    },
    {
      path: '*',
      name: 'Errorpage',
      component: () => import('../views/Errorpage.vue')
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
