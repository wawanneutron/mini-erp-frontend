import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/api/axios'
import { useRouter } from 'vue-router'

interface User {
  id: number
  name: string
  email: string
  role: string
}

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
      const res = await api.post('/login', { email, password })

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
    const res = await api.get('/me')
    user.value = res.data
  }

  const logout = async () => {
    loading.value = true
    error.value = ''

    try {
      await api.post('/logout')
      localStorage.removeItem('token')
      token.value = ''
      user.value = null
      router.push('/')
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
