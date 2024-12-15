<script lang="ts" setup>
import { fetchCompanies } from '@/api/fetchCompanies'
import { computed, ref } from 'vue'
import { useToast } from 'primevue/usetoast'

const toast = useToast()

interface Company {
  id: number
  name: string
}

const loading = ref(false)

const companies = ref<Company[]>([])

const sortedCompanies = computed(() => {
  return companies?.value?.sort((a: Company, b: Company) =>
    a.name.localeCompare(b.name),
  )
})

const handleFetchCompanies = () => {
  loading.value = true
  fetchCompanies().then(res => {
    companies.value = res.data
    console.log(companies.value)
    loading.value = false
    toast.add({
      severity: 'info',
      summary: 'Успех',
      detail: 'Данные успешно загружены!',
      life: 3000,
    })
  })
}
</script>

<template>
  <Button
    :loading="loading"
    class="mb-4"
    icon="pi pi-search"
    label="Найти"
    severity="info"
    @click="handleFetchCompanies"
  />
  <table class="w-2/3 border-collapse border-spacing-2 border border-green-600">
    <thead>
      <tr>
        <th class="border border-green-600">Индекс</th>
        <th class="border border-x-red-500">Айдишка</th>
        <th class="border border-blue-400">Название компании</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(t, i) in sortedCompanies" v-bind:key="i">
        <td class="text-center border-green-300">{{ i }}</td>
        <td class="text-center border-green-300">{{ t.id }}</td>
        <td class="text-center border-green-300">{{ t.name }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped></style>
