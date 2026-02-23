import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/api/axios'
import type { Transaction } from '@/types/transaction'
import type { ApiResponse, PaginatedResponse, PaginationMeta } from '@/types'
import { useSnackbarStore } from './ui/snackbar'

export const useTransactionStore = defineStore('transaction', () => {
  const transactions = ref<Transaction[]>([])
  const pagination = ref<PaginationMeta | null>(null)

  const loading = ref(false)
  const error = ref<string>('')

  const snackbarStore = useSnackbarStore()
  const { showSnackbar } = snackbarStore

  const fetchTransactions = async (page: number = 1) => {
    loading.value = true
    error.value = ''

    try {
      const res = await api.get<PaginatedResponse<Transaction>>('/transactions', {
        params: {
          page,
          per_page: 10,
        },
      })

      transactions.value = res.data.data
      pagination.value = res.data.meta
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to fetch transactions'
    } finally {
      loading.value = false
    }
  }

  const createTransaction = async (payload: { items: { product_id: number; qty: number }[] }) => {
    loading.value = true
    error.value = ''

    try {
      const res = await api.post<ApiResponse<Transaction>>('/transactions', payload)

      showSnackbar({
        message: res.data.message,
        type: 'success',
      })

      return res.data
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Create transaction failed'

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
    pagination,
    loading,
    error,
    fetchTransactions,
    createTransaction,
  }
})
