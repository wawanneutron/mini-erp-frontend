<template>
  <BaseModal v-model="model">
    <template #header>
      <h3 class="text-lg font-semibold">Logout</h3>
    </template>

    <div>
      <p class="text-gray-700">Apakah anda yakin ingin mengakhiri sesi ini?</p>
    </div>

    <template #footer>
      <button @click="close" class="px-4 py-2 border rounded-lg">Cancle</button>
      <button
        @click="handleLogout"
        class="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 transition"
      >
        <span v-if="loading">Loading...</span>
        <span v-else>Logout</span>
      </button>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import BaseModal from '@/components/base/Modal.vue'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const authStore = useAuthStore()
const { logout } = authStore
const { loading } = storeToRefs(authStore)

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const model = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const close = () => {
  if (!loading.value) model.value = false
}

const handleLogout = async () => {
  await logout()
  close()
}
</script>

<style scoped></style>
