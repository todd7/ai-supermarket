import { createRouter, createWebHistory } from 'vue-router'

const adminRoutes = [
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

const adminRouter = createRouter({
  history: createWebHistory(),
  routes: adminRoutes
})

// 路由守卫
adminRouter.beforeEach((to, from, next) => {
  const requiresAuth = to.meta.requiresAuth !== false
  const isLoggedIn = localStorage.getItem('adminToken')

  if (requiresAuth && !isLoggedIn) {
    next('/admin/login')
  } else {
    next()
  }
})

export default adminRouter