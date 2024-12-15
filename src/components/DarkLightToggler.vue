<script lang="ts" setup>
import { useStorage } from '@vueuse/core'
import { computed } from 'vue'

const isDark = useStorage('isDark', true)

// @Todo добавить темную тему
const handleToggle = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('app-dark')
}
const icon = computed(() => (isDark.value ? 'pi pi-sun' : 'pi pi-moon'))
</script>

<template>
  <Button :icon="icon" rounded @click="handleToggle" />
</template>

<style scoped></style>
