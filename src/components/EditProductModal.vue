<template>
  <BaseModal v-model="model">
    <template #header>
      <h3 class="text-lg font-semibold">Edit Product</h3>
    </template>

    <div class="space-y-4">
      <div>
        <label class="block text-sm text-gray-600 mb-1"> Product Name </label>
        <input
          v-model="form.name"
          type="text"
          class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-gray-900"
        />
      </div>

      <div>
        <label class="block text-sm text-gray-600 mb-1"> Price </label>
        <input
          v-model="form.price"
          type="number"
          class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-gray-900"
        />
      </div>
    </div>

    <template #footer>
      <button @click="close" class="px-4 py-2 border rounded-lg">Cancel</button>

      <button @click="submit" class="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800">
        Save
      </button>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
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
  (e: 'updated'): void
}>()

const model = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const form = ref({
  id: 0,
  name: '',
  price: 0,
})

watch(
  () => props.product,
  (newVal) => {
    if (newVal) {
      form.value = {
        id: newVal.id,
        name: newVal.name,
        price: Number(newVal.price),
      }
    }
  },
  { immediate: true },
)

const close = () => {
  model.value = false
}

const submit = async () => {
  await productStore.updateProduct(form.value.id, {
    name: form.value.name,
    price: form.value.price,
  })

  emit('updated')
  close()
}
</script>
