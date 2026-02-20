import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/api/axios'
import type { Product } from '@/types/product'
import type { PaginatedResponse, PaginationMeta } from '@/types'

export const useProductStore = defineStore('product', () => {
  const products = ref<Product[]>([])
  const pagination = ref<PaginationMeta | null>(null)
  const selectedProduct = ref<Product | null>(null)
  const loading = ref(false)
  const error = ref<string>('')

  const fetchProducts = async (page: number = 1) => {
    loading.value = true
    error.value = ''

    try {
      const res = await api.get<PaginatedResponse<Product>>('/products', {
        params: {
          page,
          per_page: 5,
        },
      })

      products.value = res.data.data
      pagination.value = res.data.meta
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to fetch products'
    } finally {
      loading.value = false
    }
  }

  const fetchDetail = async (id: number) => {
    loading.value = true
    error.value = ''

    try {
      const res = await api.get<Product>(`/products/${id}`)
      selectedProduct.value = res.data
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to fetch detail'
    } finally {
      loading.value = false
    }
  }

  const createProduct = async (payload: { name: string; price: number }) => {
    loading.value = true
    error.value = ''

    try {
      const res = await api.post<Product>('/products', payload)
      products.value.unshift(res.data)
      return res.data
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Create failed'
    } finally {
      loading.value = false
    }
  }

  const updateProduct = async (id: number, payload: { name: string; price: number }) => {
    loading.value = true
    error.value = ''

    try {
      const res = await api.put<Product>(`/products/${id}`, payload)

      const index = products.value.findIndex((p) => p.id === id)
      if (index !== -1) {
        products.value[index] = res.data
      }

      return res.data
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Update failed'
    } finally {
      loading.value = false
    }
  }

  const deleteProduct = async (id: number) => {
    loading.value = true
    error.value = ''

    try {
      await api.delete(`/products/${id}`)
      products.value = products.value.filter((p) => p.id !== id)
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Delete failed'
    } finally {
      loading.value = false
    }
  }

  return {
    products,
    pagination,
    selectedProduct,
    loading,
    error,
    fetchProducts,
    fetchDetail,
    createProduct,
    updateProduct,
    deleteProduct,
  }
})
