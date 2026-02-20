<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white p-6 rounded-2xl shadow">
        <p class="text-gray-500">Total Products</p>
        <h2 class="text-3xl font-bold mt-2">
          {{ totalProducts }}
        </h2>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow">
        <p class="text-gray-500">Total Transactions</p>
        <h2 class="text-3xl font-bold mt-2">
          {{ totalTransactions }}
        </h2>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow">
        <p class="text-gray-500">Total Revenue</p>
        <h2 class="text-3xl font-bold mt-2">Rp {{ totalRevenue.toLocaleString() }}</h2>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useProductStore } from '@/stores/product'
import { useTransactionStore } from '@/stores/transaction'
import { storeToRefs } from 'pinia'

const productStore = useProductStore()
const transactionStore = useTransactionStore()

const { fetchProducts } = productStore
const { fetchTransactions } = transactionStore

const { products } = storeToRefs(productStore)
const { transactions } = storeToRefs(transactionStore)

const totalProducts = computed(() => products.value.length)

const totalTransactions = computed(() => transactions.value.length)

const totalRevenue = computed(() =>
  transactions.value.reduce((sum: number, trx: any) => sum + Number(trx.total || 0), 0),
)

onMounted(async () => {
  await fetchTransactions()
  await fetchProducts()
})
</script>
