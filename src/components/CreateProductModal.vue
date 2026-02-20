<template>
  <BaseModal v-model="model">
    <template #header>
      <h3 class="text-lg font-semibold">Add Product</h3>
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
          v-model.number="form.price"
          type="number"
          min="0"
          class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-gray-900"
        />
      </div>

      <p v-if="error" class="text-sm text-red-500">
        {{ error }}
      </p>
    </div>

    <template #footer>
      <button @click="close" class="px-4 py-2 border rounded-lg" :disabled="loading">Cancel</button>

      <button
        @click="submit"
        :disabled="loading"
        class="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50"
      >
        <span v-if="loading">Saving...</span>
        <span v-else>Save</span>
      </button>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseModal from '@/components/base/Modal.vue'
import { useProductStore } from '@/stores/product'

const productStore = useProductStore()

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits(['update:modelValue', 'created'])

const model = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const form = ref({
  name: '',
  price: 0,
})

const loading = ref(false)
const error = ref('')

const close = () => {
  if (!loading.value) {
    model.value = false
  }
}

const submit = async () => {
  if (!form.value.name || form.value.price <= 0) {
    error.value = 'Name and valid price are required'
    return
  }

  loading.value = true
  error.value = ''

  try {
    await productStore.createProduct(form.value)

    emit('created')
    model.value = false

    form.value = { name: '', price: 0 }
  } catch (err: any) {
    error.value = err.message || 'Failed to create product'
  } finally {
    loading.value = false
  }
}
</script>
