<template>
  <Transition name="fade">
    <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="close" />

      <div class="relative bg-white w-full max-w-lg mx-4 rounded-2xl shadow-2xl animate-scale">
        <div v-if="$slots.header" class="px-6 py-4 border-b flex justify-between items-center">
          <slot name="header" />

          <button @click="close" class="text-gray-400 hover:text-gray-700 transition">✕</button>
        </div>

        <div class="p-6">
          <slot />
        </div>

        <div
          v-if="$slots.footer"
          class="px-6 py-4 border-t bg-gray-50 rounded-b-2xl flex justify-end gap-3"
        >
          <slot name="footer" />
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { watch, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const close = () => {
  emit('update:modelValue', false)
}

const handleEsc = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    close()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleEsc)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleEsc)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.animate-scale {
  animation: scaleIn 0.2s ease;
}

@keyframes scaleIn {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
