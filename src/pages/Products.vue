<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold text-gray-800">Products</h2>

      <button
        @click="isCreateOpen = true"
        class="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
      >
        + Add Product
      </button>
    </div>

    <BaseTable :columns="columns" :items="products">
      <template #price="{ item }"> Rp {{ Number(item.price).toLocaleString() }} </template>

      <template #actions="{ item }">
        <div class="flex items-center gap-x-4">
          <button class="cursor-pointer hover:text-gray-500" @click="openEdit(item)">Edit</button>
          <button class="cursor-pointer hover:text-gray-500" @click="openDelete(item)">
            Delete
          </button>
        </div>
      </template>
    </BaseTable>

    <BasePagination v-if="pagination" :meta="pagination" @change="changePage" />

    <CreateProductModal v-model="isCreateOpen" @created="fetchProducts" />
    <EditProductModal v-model="isEditOpen" :product="selectedProduct" @updated="fetchProducts" />
    <DeleteProductModal
      v-model="isDeleteOpen"
      :product="selectedProduct"
      @deleted="fetchProducts"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useProductStore } from '@/stores/product'
import BaseTable from '@/components/base/Table.vue'
import BasePagination from '@/components/base/Pagination.vue'
import CreateProductModal from '@/components/CreateProductModal.vue'
import EditProductModal from '@/components/EditProductModal.vue'
import DeleteProductModal from '@/components/DeleteProductModal.vue'
import { storeToRefs } from 'pinia'
import type { Product } from '@/types/product'

const productStore = useProductStore()
const { fetchProducts } = productStore
const { products, pagination } = storeToRefs(productStore)

const isCreateOpen = ref(false)

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
  { key: 'price', label: 'Price' },
  { key: 'actions', label: 'Actions' },
]

const changePage = async (page: number) => {
  await fetchProducts(page)
}

const isEditOpen = ref(false)
const isDeleteOpen = ref(false)
const selectedProduct = ref<Product | null>(null)

const openEdit = (product: Product) => {
  selectedProduct.value = product
  isEditOpen.value = true
}

const openDelete = (product: Product) => {
  selectedProduct.value = product
  isDeleteOpen.value = true
}

onMounted(async () => {
  await fetchProducts()
})
</script>
