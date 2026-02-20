import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import DashboardLayout from '@/layouts/DashboardLayout.vue'
import DashboardHome from '@/pages/Home.vue'
import ProductView from '@/pages/Products.vue'
import Transactions from '@/pages/Transactions.vue'
import LoginPage from '@/pages/Login.vue'
import ReportsPage from '@/pages/Reports.vue'

const routes = [
  {
    path: '/',
    component: LoginPage,
  },
  {
    path: '/dashboard',
    component: DashboardLayout,
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: DashboardHome,
      },
      {
        path: '/dashboard/products',
        name: 'Products',
        component: ProductView,
      },
      {
        path: '/dashboard/transactions',
        name: 'Transaction',
        component: Transactions,
      },
      {
        path: '/dashboard/reports',
        name: 'Reports',
        component: ReportsPage,
      },
    ],
  },
]
const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()

  if (!auth.token && to.path !== '/') {
    return next('/')
  }

  if (to.meta.role && auth.user?.role !== to.meta.role) {
    return next('/')
  }

  next()
})

export default router
