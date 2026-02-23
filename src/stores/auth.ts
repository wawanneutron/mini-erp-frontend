import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/api/axios'
import { useRouter } from 'vue-router'
import type { AuthLogin, User } from '@/types/auth'
import { useSnackbarStore } from './ui/snackbar'
import type { ApiResponse } from '@/types'

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()
  const user = ref<User | null>(null)
  const token = ref<string>(localStorage.getItem('token') || '')
  const loading = ref<boolean>(false)
  const error = ref<string>('')

  const snackbarStore = useSnackbarStore()
  const { showSnackbar } = snackbarStore

  const login = async (email: string, password: string) => {
    loading.value = true
    error.value = ''

    try {
      const res = await api.post<ApiResponse<AuthLogin>>('/login', { email, password })

      token.value = res.data.data.token
      localStorage.setItem('token', token.value)

      router.push('/dashboard')
      showSnackbar({
        message: res.data.message,
        type: 'success',
      })
      await fetchUser()
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Login failed'
      showSnackbar({
        message: error.value,
        type: 'error',
        duration: 5000,
      })
    } finally {
      loading.value = false
    }
  }

  const fetchUser = async () => {
    const res = await api.get<User>('/me')
    user.value = res.data
  }

  const logout = async () => {
    loading.value = true
    error.value = ''

    try {
      const res = await api.post<ApiResponse<any>>('/logout')
      localStorage.removeItem('token')
      token.value = ''
      user.value = null

      showSnackbar({
        message: res.data.message,
        type: 'success',
      })
      router.push('/')
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Logout failed'
      showSnackbar({
        message: error.value,
        type: 'error',
      })
    } finally {
      loading.value = false
    }
  }

  return {
    user,
    token,
    loading,
    error,
    login,
    fetchUser,
    logout,
  }
})
