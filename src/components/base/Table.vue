<template>
  <div class="overflow-x-auto bg-white rounded-xl shadow">
    <table class="min-w-full text-sm text-left">
      <thead class="bg-gray-100 text-gray-700 uppercase text-xs tracking-wider">
        <tr>
          <th v-for="col in columns" :key="col.key" class="px-6 py-3">
            {{ col.label }}
          </th>
        </tr>
      </thead>

      <tbody class="divide-y divide-gray-200">
        <tr v-if="!items.length">
          <td :colspan="columns.length" class="px-6 py-10 text-center text-gray-500">
            No data available
          </td>
        </tr>

        <tr v-for="item in items" :key="item.id" class="hover:bg-gray-50 transition">
          <td v-for="col in columns" :key="col.key" class="px-6 py-4 text-gray-700">
            <slot :name="col.key" :item="item">
              {{ item[col.key] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
interface Column {
  key: string
  label: string
}

defineProps<{
  columns: Column[]
  items: any[]
}>()
</script>
