import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue')
    },
    {
      path: '/templates',
      name: 'templates',
      component: () => import('../views/Templates.vue')
    },
    {
      path: '/template/:id',
      name: 'templateDetail',
      component: () => import('../views/TemplateDetail.vue')
    },
    {
      path: '/deployment',
      name: 'deployment',
      component: () => import('../views/DeploymentService.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../views/Cart.vue')
    },
    {
      path: '/orders',
      name: 'orders',
      component: () => import('../views/Orders.vue')
    },
    {
      path: '/faq',
      name: 'faq',
      component: () => import('../views/Faq.vue')
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: () => import('../views/PrivacyPolicy.vue')
    },
    {
      path: '/terms',
      name: 'terms',
      component: () => import('../views/TermsOfService.vue')
    },
    {
      path: '/payment-result',
      name: 'paymentResult',
      component: () => import('../views/PaymentResult.vue')
    },
    {
      path: '/user-center',
      name: 'userCenter',
      component: () => import('../views/UserCenter.vue')
    },
    {
      path: '/user-center/orders',
      name: 'userOrders',
      component: () => import('../views/UserOrders.vue')
    },
    {
      path: '/user-center/collections',
      name: 'userCollections',
      component: () => import('../views/UserCollections.vue')
    },
    {
      path: '/user-center/downloads',
      name: 'userDownloads',
      component: () => import('../views/UserDownloads.vue')
    },
    {
      path: '/user-center/settings',
      name: 'userSettings',
      component: () => import('../views/UserSettings.vue')
    },
    {
      path: '/user-center/support',
      name: 'userSupport',
      component: () => import('../views/UserSupport.vue')
    },
    // 后台管理系统路由
    {
      path: '/admin/login',
      name: 'AdminLogin',
      component: () => import('../views/admin/Login.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/admin',
      name: 'AdminLayout',
      component: () => import('../views/admin/Layout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: 'dashboard',
          name: 'AdminDashboard',
          component: () => import('../views/admin/Dashboard.vue')
        },
        {
          path: 'templates',
          name: 'AdminTemplates',
          component: () => import('../views/admin/TemplateList.vue')
        },
        {
          path: 'templates/create',
          name: 'AdminTemplateCreate',
          component: () => import('../views/admin/TemplateForm.vue')
        },
        {
          path: 'templates/edit/:id',
          name: 'AdminTemplateEdit',
          component: () => import('../views/admin/TemplateForm.vue')
        },
        {
          path: 'categories',
          name: 'AdminCategories',
          component: () => import('../views/admin/CategoryList.vue')
        },
        {
          path: 'orders',
          name: 'AdminOrders',
          component: () => import('../views/admin/OrderList.vue')
        },
        {
          path: 'orders/:id',
          name: 'AdminOrderDetail',
          component: () => import('../views/admin/OrderDetail.vue')
        },
        {
          path: 'users',
          name: 'AdminUsers',
          component: () => import('../views/admin/UserList.vue')
        },
        {
          path: 'users/:id',
          name: 'AdminUserDetail',
          component: () => import('../views/admin/UserDetail.vue')
        },
        {
          path: 'banners',
          name: 'AdminBanners',
          component: () => import('../views/admin/BannerList.vue')
        },
        {
          path: 'faqs',
          name: 'AdminFaqs',
          component: () => import('../views/admin/FaqList.vue')
        },
        {
          path: 'agreements',
          name: 'AdminAgreements',
          component: () => import('../views/admin/AgreementList.vue')
        },
        {
          path: 'settings',
          name: 'AdminSettings',
          component: () => import('../views/admin/SiteSettings.vue')
        },
        {
          path: 'system',
          name: 'AdminSystem',
          component: () => import('../views/admin/SystemSettings.vue')
        },
        {
          path: 'profile',
          name: 'AdminProfile',
          component: () => import('../views/admin/Profile.vue')
        }
      ]
    }
  ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const requiresAuth = to.meta.requiresAuth !== false
  const isLoggedIn = localStorage.getItem('adminToken')

  if (requiresAuth && !isLoggedIn) {
    next('/admin/login')
  } else {
    next()
  }
})

export default router