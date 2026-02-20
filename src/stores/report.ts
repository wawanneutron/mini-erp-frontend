import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { ApiResponse } from '@/types'
import api from '@/api/axios'

interface ReportData {
  total_transactions: number
  total_revenue: number
  start_date: string
  end_date: string
}

export const useReportStore = defineStore('report', () => {
  const transactions = ref<ReportData | null>(null)
  const loading = ref(false)
  const error = ref<string>('')

  const fetchReportTransaction = async (start_date: string, end_date: string) => {
    loading.value = true
    error.value = ''

    try {
      const res = await api.get<ApiResponse<ReportData>>('/reports', {
        params: { start_date, end_date },
      })

      transactions.value = res.data.data
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to fetch report'
    } finally {
      loading.value = false
    }
  }

  return {
    transactions,
    loading,
    error,
    fetchReportTransaction,
  }
})
