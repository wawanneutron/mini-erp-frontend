<template>
  <BaseModal v-model="model">
    <template #header>
      <h3 class="text-lg font-semibold text-red-600">Delete Product</h3>
    </template>

    <div class="space-y-3">
      <p class="text-gray-700">Apakah anda yakin ingin menghapus?</p>
      <div class="bg-gray-100 p-4 rounded-lg">
        <p class="font-semibold">
          {{ product?.name }}
        </p>
        <p class="text-sm text-gray-500">Rp {{ formatCurrency(product?.price || 0) }}</p>
      </div>
    </div>

    <template #footer>
      <button @click="close" class="px-4 py-2 border rounded-lg" :disabled="productStore.loading">
        Cancel
      </button>

      <button
        @click="submit"
        :disabled="productStore.loading"
        class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50"
      >
        <span v-if="productStore.loading">Deleting...</span>
        <span v-else>Delete</span>
      </button>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import BaseModal from '@/components/base/Modal.vue'
import { useProductStore } from '@/stores/product'
import type { Product } from '@/types/product'

const productStore = useProductStore()

const props = defineProps<{
  modelValue: boolean
  product: Product | null
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'deleted'): void
}>()

const model = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const close = () => {
  if (!productStore.loading) {
    model.value = false
  }
}

const submit = async () => {
  if (!props.product) return

  await productStore.deleteProduct(props.product.id)
  emit('deleted')
  model.value = false
}

const formatCurrency = (value: number | string) => {
  return Number(value).toLocaleString('id-ID')
}
</script>
