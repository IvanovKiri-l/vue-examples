<script lang="ts" setup>
import { ref } from 'vue'
import { fetchTradeDays } from '@/api/fetchTradeDays.ts'
import { useToast } from 'primevue/usetoast'

const toast = useToast()
interface TradeDays {
  date: string
  count: number
}

const loading = ref(false)
const trades = ref<TradeDays[]>([])

const handleFetchTradeDays = () => {
  loading.value = true
  fetchTradeDays().then(res => {
    trades.value = res
    console.log(trades.value)
    loading.value = false
    toast.add({ severity: 'info', summary: 'Успех', detail: 'Данные успешно загружены!', life: 3000 });
  })
}
</script>

<template>
  <Button
    :loading="loading"
    icon="pi pi-search"
    label="Найти"
    severity="info"
    @click="handleFetchTradeDays"
    class="mb-4"
  />

  <table class="w-2/3 border-collapse border border-slate-500">
    <thead>
      <tr class="">
        <th class="border border-slate-600">#</th>
        <th class="border border-slate-600">Дата</th>
        <th class="border border-slate-600">Кол-во лотов</th>
      </tr>
    </thead>
    <tbody style="">
      <tr v-for="(t, i) in trades" v-bind:key="i">
        <td class="text-center border border-slate-700 mt-4">{{ i }}</td>
        <td class="text-center border border-slate-700">{{ t.date }}</td>
        <td class="text-center border border-slate-700">{{ t.count }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped></style>
