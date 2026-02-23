<template>
  <transition name="fade">
    <div
      v-if="modelValue"
      :class="[
        'fixed px-4 py-3 rounded-lg shadow-lg text-white z-50 min-w-62.5',
        typeClass,
        positionClass,
      ]"
    >
      <div class="flex justify-between items-center gap-4">
        <span>{{ message }}</span>
        <button @click="onClose" class="opacity-80 hover:opacity-100">✕</button>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { useSnackbarStore } from '@/stores/ui/snackbar'
import type { SnackbarOption } from '@/types/ui/snackbar'
import { storeToRefs } from 'pinia'
import { computed, watch } from 'vue'

interface PropsSnackbar extends SnackbarOption {
  modelValue: boolean
}

const props = withDefaults(defineProps<PropsSnackbar>(), {
  type: 'success',
  position: 'top-right',
  duration: 3000,
} as PropsSnackbar)

const snackbarStore = useSnackbarStore()
const { message } = storeToRefs(snackbarStore)
const { hideSnackbar } = snackbarStore

const typeClass = computed(() => {
  switch (props.type) {
    case 'success':
      return 'bg-green-500'
    case 'error':
      return 'bg-red-500'
    case 'warning':
      return 'bg-yellow-500'
    case 'info':
      return 'bg-blue-500'
    default:
      return 'bg-gray-500'
  }
})

const positionClass = computed(() => {
  switch (props.position) {
    case 'top-right':
      return 'top-5 right-5'
    case 'top-left':
      return 'top-5 left-5'
    case 'bottom-right':
      return 'bottom-5 right-5'
    case 'bottom-left':
      return 'bottom-5 left-5'
    case 'top-center':
      return 'top-5 left-1/2 -translate-x-1/2'
    case 'bottom-center':
      return 'bottom-5 left-1/2 -translate-x-1/2'
    default:
      return 'top-5 right-5'
  }
})

const onClose = () => hideSnackbar()

watch(
  () => props.modelValue,
  (isActive) => {
    if (isActive) {
      setTimeout(() => {
        onClose()
      }, props.duration)
    }
  },
)
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
