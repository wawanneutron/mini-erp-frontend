import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { ApiResponse } from '@/types'
import api from '@/api/axios'
import { useSnackbarStore } from './ui/snackbar'

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

  const snackbarStore = useSnackbarStore()
  const { showSnackbar } = snackbarStore

  const fetchReportTransaction = async (start_date: string, end_date: string) => {
    loading.value = true
    error.value = ''

    try {
      const res = await api.get<ApiResponse<ReportData>>('/reports', {
        params: { start_date, end_date },
      })

      transactions.value = res.data.data

      showSnackbar({
        message: res.data.message,
        type: 'success',
      })
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to fetch report'

      showSnackbar({
        message: error.value,
        type: 'error',
      })
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
