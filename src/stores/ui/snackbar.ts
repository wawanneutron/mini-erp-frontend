import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { SnackbarPosition, SnackbarType, SnackbarOption } from '@/types/ui/snackbar'

export const useSnackbarStore = defineStore('snackbar', () => {
  const isShowSnackbar = ref<boolean>(false)
  const message = ref<string>('')
  const type = ref<SnackbarType>('success')
  const position = ref<SnackbarPosition>('top-center')
  const duration = ref<number>(3000)

  const showSnackbar = (option: SnackbarOption) => {
    message.value = option.message
    type.value = option.type
    position.value = option.position ?? 'top-center'
    duration.value = option.duration ?? 3000
    isShowSnackbar.value = true
  }

  const hideSnackbar = () => {
    isShowSnackbar.value = false
  }

  return {
    type,
    message,
    position,
    duration,
    isShowSnackbar,
    showSnackbar,
    hideSnackbar,
  }
})
