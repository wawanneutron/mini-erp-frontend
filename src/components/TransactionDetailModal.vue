<template>
  <BaseModal v-model="model">
    <template #header>
      <div>
        <h3 class="text-lg font-semibold">Transaction #{{ transaction?.id }}</h3>
        <p class="text-sm text-gray-500">
          {{ formatDate(transaction?.created_at || '') }}
        </p>
      </div>
    </template>

    <div v-if="transaction" class="space-y-4">
      <div class="bg-gray-100 p-4 rounded-xl">
        <p class="text-sm text-gray-600">Total</p>
        <p class="text-xl font-bold">Rp {{ formatCurrency(transaction.total) }}</p>
      </div>

      <div class="max-h-80 overflow-y-auto border rounded-lg">
        <table class="min-w-full text-sm">
          <thead class="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th class="px-4 py-3 text-left">Product</th>
              <th class="px-4 py-3 text-center">Qty</th>
              <th class="px-4 py-3 text-right">Price</th>
              <th class="px-4 py-3 text-right">Subtotal</th>
            </tr>
          </thead>

          <tbody class="divide-y">
            <tr v-for="item in transaction.items" :key="item.id" class="hover:bg-gray-50">
              <td class="px-4 py-3">
                <div>
                  <p class="font-medium">
                    {{ item.product?.name || 'Product Deleted' }}
                  </p>
                  <p class="text-xs text-gray-400">Product ID: {{ item.product_id }}</p>
                </div>
              </td>

              <td class="px-4 py-3 text-center">
                {{ item.qty }}
              </td>

              <td class="px-4 py-3 text-right">
                Rp {{ formatCurrency(item.price_at_transaction) }}
              </td>

              <td class="px-4 py-3 text-right font-semibold">
                Rp {{ formatCurrency(item.subtotal) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <template #footer>
      <button @click="model = false" class="px-4 py-2 border rounded-lg">Close</button>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseModal from '@/components/base/Modal.vue'
import type { Transaction } from '@/types/transaction'

const props = defineProps<{
  modelValue: boolean
  transaction: Transaction | null
}>()

const emit = defineEmits(['update:modelValue'])

const model = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const transaction = computed(() => props.transaction)

const formatCurrency = (value: number | string) => {
  return Number(value).toLocaleString('id-ID')
}

const formatDate = (date: string) => {
  if (!date) return ''
  return new Date(date).toLocaleString('id-ID')
}
</script>
