<script setup lang="ts">
import BaseSnackbar from './components/base/Snackbar.vue'
import { useSnackbarStore } from './stores/ui/snackbar'
import { storeToRefs } from 'pinia'

const snackbarStore = useSnackbarStore()
const { isShowSnackbar, type, message, position, duration } = storeToRefs(snackbarStore)
</script>

<template>
  <router-view />
  <BaseSnackbar
    v-model="isShowSnackbar"
    :message="message"
    :type="type"
    :position="position"
    :duration="duration"
  />
</template>

<style scoped></style>
