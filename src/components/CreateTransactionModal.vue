<template>
  <BaseModal v-model="model">
    <template #header>
      <h3 class="text-lg font-semibold">Create Transaction</h3>
    </template>

    <div class="space-y-4">
      <div class="flex items-center gap-2">
        <input
          type="checkbox"
          :checked="isAllSelected"
          @change="toggleSelectAll"
          class="w-4 h-4 accent-gray-900 cursor-pointer"
        />
        <span class="text-sm">Select All</span>
      </div>

      <div class="max-h-80 overflow-y-auto border rounded-lg">
        <div
          v-for="product in products"
          :key="product.id"
          class="flex items-center justify-between px-4 py-3 border-b hover:bg-gray-50"
        >
          <div class="flex items-center gap-3">
            <input
              type="checkbox"
              :value="product.id"
              v-model="selectedIds"
              class="w-4 h-4 accent-gray-900 cursor-pointer"
            />

            <div>
              <p class="font-medium">{{ product.name }}</p>
              <p class="text-sm text-gray-500">Rp {{ formatCurrency(product.price) }}</p>
            </div>
          </div>

          <input
            v-if="selectedIds.includes(product.id)"
            type="number"
            min="1"
            v-model.number="quantities[product.id]"
            class="w-20 border rounded px-2 py-1 text-sm"
          />
        </div>
      </div>

      <BasePagination v-if="pagination" :meta="pagination" @change="changePage" />
    </div>

    <template #footer>
      <button @click="close" class="px-4 py-2 border rounded-lg">Cancel</button>

      <button @click="submit" class="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800">
        Create
      </button>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import BaseModal from '@/components/base/Modal.vue'
import BasePagination from '@/components/base/Pagination.vue'
import { useProductStore } from '@/stores/product'
import { useTransactionStore } from '@/stores/transaction'
import type { Product } from '@/types/product'
import { storeToRefs } from 'pinia'

const productStore = useProductStore()
const { fetchProducts } = productStore
const { products, pagination } = storeToRefs(productStore)

const transactionStore = useTransactionStore()

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits(['update:modelValue', 'created'])

const model = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const selectedIds = ref<number[]>([])
const quantities = ref<Record<number, number>>({})

const isAllSelected = computed(() => {
  return products.value.length > 0 && selectedIds.value.length === products.value.length
})

const toggleSelectAll = () => {
  if (isAllSelected.value) {
    selectedIds.value = []
  } else {
    selectedIds.value = products.value.map((p) => p.id)
    products.value.forEach((p) => {
      quantities.value[p.id] = 1
    })
  }
}

const submit = async () => {
  const items = selectedIds.value.map((id) => ({
    product_id: id,
    qty: quantities.value[id] || 1,
  }))

  if (!items.length) return

  await transactionStore.createTransaction({ items })

  emit('created')
  model.value = false
  selectedIds.value = []
  quantities.value = {}
}

const changePage = async (page: number) => {
  await fetchProducts(page)
}

const close = () => {
  model.value = false
}

const formatCurrency = (value: number | string) => {
  return Number(value).toLocaleString('id-ID')
}

onMounted(async () => {
  await fetchProducts()
})
</script>
