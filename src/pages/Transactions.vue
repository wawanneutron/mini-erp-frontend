<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold text-gray-800">Transactions</h2>

      <button
        @click="isCreateOpen = true"
        class="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
      >
        + Create Transaction
      </button>
    </div>

    <BaseTable :columns="columns" :items="transactions">
      <template #total="{ item }"> Rp {{ formatCurrency(item.total) }} </template>

      <template #user="{ item }">
        {{ item.user?.name }}
      </template>

      <template #created_at="{ item }">
        {{ formatDateTime(item.created_at) }}
      </template>

      <template #action="{ item }">
        <button class="cursor-pointer hover:text-gray-500" @click="openDetail(item)">Detail</button>
      </template>
    </BaseTable>

    <BasePagination v-if="pagination" :meta="pagination" @change="fetchPage" />
    <CreateTransactionModal v-model="isCreateOpen" @created="fetchTransactions" />
    <TransactionDetailModal v-model="isDetailOpen" :transaction="selectedTransaction" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTransactionStore } from '@/stores/transaction'
import BaseTable from '@/components/base/Table.vue'
import BasePagination from '@/components/base/Pagination.vue'
import CreateTransactionModal from '@/components/CreateTransactionModal.vue'
import TransactionDetailModal from '@/components/TransactionDetailModal.vue'
import { storeToRefs } from 'pinia'
import type { Transaction } from '@/types/transaction'
import { formatDateTime } from '@/utils/date'

const transactionStore = useTransactionStore()
const { fetchTransactions } = transactionStore
const { transactions, pagination } = storeToRefs(transactionStore)

const router = useRouter()
const isCreateOpen = ref(false)
const isDetailOpen = ref(false)
const selectedTransaction = ref<Transaction | null>(null)

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'user_id', label: 'User Id' },
  { key: 'tenant_id', label: 'Tenant Id' },
  { key: 'total', label: 'Total' },
  { key: 'created_at', label: 'Date' },
  { key: 'action', label: 'Action' },
]

const openDetail = (item: Transaction) => {
  selectedTransaction.value = item
  isDetailOpen.value = true
}

const fetchPage = async (page: number) => {
  await fetchTransactions(page)
}

const goToDetail = (id: number) => {
  router.push(`/dashboard/transactions/${id}`)
}

const formatCurrency = (value: number | string) => {
  return Number(value).toLocaleString('id-ID')
}

onMounted(async () => {
  await fetchTransactions()
})
</script>
