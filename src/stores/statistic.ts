import api from '@/api/axios'
import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Statistic } from '@/types/statistic'
import type { ApiResponse } from '@/types'

export const useStatisticStore = defineStore('statistic', () => {
  const totalProducts = ref<number>(0)
  const totalTransaction = ref<number>(0)
  const totalRevenue = ref<number>(0)

  const loading = ref<boolean>(false)
  const error = ref<string>('')

  const fetchStatisticSummary = async () => {
    loading.value = true
    error.value = ''

    try {
      const res = await api.get<ApiResponse<Statistic>>('/statistics')
      const { total_products, total_transactions, total_revenue } = res.data.data

      totalProducts.value = total_products
      totalTransaction.value = total_transactions
      totalRevenue.value = Number(total_revenue)
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to fetch statistic summary data'
    } finally {
      loading.value = false
    }
  }

  return {
    error,
    loading,
    totalRevenue,
    totalProducts,
    totalTransaction,
    fetchStatisticSummary,
  }
})
