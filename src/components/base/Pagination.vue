<template>
  <div class="flex items-center justify-between mt-6">
    <div class="text-sm text-gray-600">
      Page
      <span class="font-semibold text-gray-800">
        {{ meta.current_page }}
      </span>
      of
      <span class="font-semibold text-gray-800">
        {{ meta.last_page }}
      </span>
    </div>

    <div class="flex items-center gap-2">
      <button
        class="px-3 py-1.5 text-sm rounded-lg border transition disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
        :disabled="meta.current_page === 1"
        @click="$emit('change', meta.current_page - 1)"
      >
        Prev
      </button>

      <button
        v-for="page in pages"
        :key="page"
        @click="$emit('change', page)"
        class="px-3 py-1.5 text-sm rounded-lg transition"
        :class="[
          page === meta.current_page ? 'bg-gray-900 text-white' : 'border hover:bg-gray-100',
        ]"
      >
        {{ page }}
      </button>

      <button
        class="px-3 py-1.5 text-sm rounded-lg border transition disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
        :disabled="meta.current_page === meta.last_page"
        @click="$emit('change', meta.current_page + 1)"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { PaginationMeta } from '@/types'

const props = defineProps<{
  meta: PaginationMeta
}>()

defineEmits<{
  (e: 'change', page: number): void
}>()

const pages = computed<number[]>(() => {
  const current = props.meta.current_page
  const last = props.meta.last_page
  const max = 5

  let start = current - Math.floor(max / 2)
  let end = current + Math.floor(max / 2)

  if (start < 1) {
    start = 1
    end = Math.min(max, last)
  }

  if (end > last) {
    end = last
    start = Math.max(1, last - max + 1)
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
})
</script>
