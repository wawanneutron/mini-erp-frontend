<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold text-gray-800">Report</h2>
    </div>

    <div class="bg-white p-6 rounded-xl shadow flex flex-wrap gap-4 items-end">
      <div>
        <label class="block text-sm text-gray-600 mb-1">Start Date</label>
        <input
          type="date"
          v-model="startDate"
          class="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800"
        />
      </div>

      <div>
        <label class="block text-sm text-gray-600 mb-1">End Date</label>
        <input
          type="date"
          v-model="endDate"
          class="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800"
        />
      </div>

      <button
        @click="fetchReport"
        class="bg-gray-900 text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition"
      >
        Generate
      </button>
    </div>

    <div class="grid md:grid-cols-2 gap-6">
      <div class="bg-white p-6 rounded-xl shadow">
        <p class="text-gray-500 text-sm">Total Transactions</p>
        <h3 class="text-2xl font-bold text-gray-800">
          {{ transactions?.total_transactions ?? 0 }}
        </h3>
      </div>

      <div class="bg-white p-6 rounded-xl shadow">
        <p class="text-gray-500 text-sm">Total Revenue</p>
        <h3 class="text-2xl font-bold text-gray-800">
          Rp {{ formatCurrency(transactions?.total_revenue ?? 0) }}
        </h3>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useReportStore } from '@/stores/report'
import BaseTable from '@/components/base/Table.vue'
import { storeToRefs } from 'pinia'

const reportStore = useReportStore()
const { fetchReportTransaction } = reportStore
const { transactions, error, loading } = storeToRefs(reportStore)

const startDate = ref('')
const endDate = ref('')

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'user_id', label: 'User ID' },
  { key: 'total', label: 'Total' },
  { key: 'created_at', label: 'Date' },
]

const fetchReport = async () => {
  await fetchReportTransaction(startDate.value, endDate.value)
}

const formatCurrency = (value: number) => {
  return Number(value).toLocaleString('id-ID')
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('id-ID')
}
</script>
