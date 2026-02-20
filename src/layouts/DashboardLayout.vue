<template>
  <div class="min-h-screen flex bg-gray-100">
    <aside class="w-64 bg-gray-900 text-white flex flex-col justify-between">
      <div>
        <div class="p-6 border-b border-gray-800">
          <h2 class="text-2xl font-bold">Mini ERP</h2>
          <p class="text-sm">Dashboard</p>
        </div>

        <nav class="p-4 space-y-2">
          <RouterLink
            to="/dashboard"
            class="block px-4 py-2 rounded-lg hover:bg-gray-800 transition"
            exact-active-class="bg-gray-800"
          >
            Dashboard
          </RouterLink>

          <RouterLink
            to="/dashboard/products"
            class="block px-4 py-2 rounded-lg hover:bg-gray-800 transition"
            active-class="bg-gray-800"
          >
            Products
          </RouterLink>

          <RouterLink
            to="/dashboard/transactions"
            class="block px-4 py-2 rounded-lg hover:bg-gray-800 transition"
            active-class="bg-gray-800"
          >
            Transactions
          </RouterLink>

          <RouterLink
            to="/dashboard/reports"
            class="block px-4 py-2 rounded-lg hover:bg-gray-800 transition"
            active-class="bg-gray-800"
          >
            Reports
          </RouterLink>
        </nav>
      </div>

      <div class="p-4 border-t border-gray-800">
        <button
          @click="logout"
          class="w-full bg-gray-700 hover:bg-gray-400 hover:text-gray-900 py-2 rounded-lg transition"
        >
          Logout
        </button>
      </div>
    </aside>

    <div class="flex-1 flex flex-col">
      <header class="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 class="text-xl font-semibold">
          {{ pageTitle }}
        </h1>

        <div class="text-sm text-gray-600">
          {{ authStore.user?.name }}
        </div>
      </header>

      <main class="p-6 flex-1 overflow-y-auto">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

const logout = () => {
  authStore.logout()
  router.push('/')
}

const pageTitle = computed(() => {
  return route.name?.toString() || 'Dashboard'
})
</script>
