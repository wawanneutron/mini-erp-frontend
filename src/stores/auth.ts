import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/api/axios'
import { useRouter } from 'vue-router'
import type { AuthLogin, User } from '@/types/auth'

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()
  const user = ref<User | null>(null)
  const token = ref<string>(localStorage.getItem('token') || '')
  const loading = ref<boolean>(false)
  const error = ref<string>('')

  const login = async (email: string, password: string) => {
    loading.value = true
    error.value = ''

    try {
      const res = await api.post<AuthLogin>('/login', { email, password })

      token.value = res.data.token
      localStorage.setItem('token', token.value)

      router.push('/dashboard')
      await fetchUser()
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Login failed'
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
      const resp = await api.post<{ message: string }>('/logout')
      localStorage.removeItem('token')
      token.value = ''
      user.value = null
      router.push('/')

      return resp.data.message
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Logout failed'
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
