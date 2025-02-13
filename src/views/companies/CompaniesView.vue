<script lang="ts" setup>
import { fetchCompanies } from '@/api/fetchCompanies'
import { computed, onMounted, ref } from 'vue'
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
const letters= ref<string[]>([])
onMounted(() => {
  for(let i = 65; i <= 90; i++) {
    letters.value.push(String.fromCharCode(i))
  }
})
const calcCountByLetter = (letter: string) => {
  return companies.value.filter((company: Company) => company.name[0] == letter).length
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

  <div class="flex flex-row">
    <div>
      <table
        class="w-2/3 border-collapse border-spacing-2 border border-green-600"
      >
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
            <td class="text-center border-green-300">{{ t.id
              }}</td>
            <td class="text-center border-green-300">{{ t.name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <ul>
        <li class="kkk" v-for="letter in letters" :key="letter">
          {{ letter }} - {{ calcCountByLetter(letter) }}
        </li>
      </ul>
      {{ letters }}
    </div>
  </div>


</template>

<style scoped></style>
