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
          {{ totalTransaction }}
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
import { useStatisticStore } from '@/stores/statistic'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const statisticSummaryStore = useStatisticStore()
const { fetchStatisticSummary } = statisticSummaryStore
const { totalProducts, totalTransaction, totalRevenue } = storeToRefs(statisticSummaryStore)

onMounted(async () => {
  await fetchStatisticSummary()
})
</script>
