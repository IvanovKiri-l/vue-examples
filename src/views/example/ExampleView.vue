<script setup lang="ts">
import { ref } from 'vue'
// import { useToast } from 'primevue/usetoast'
// const toast = useToast()
// interface ExampleView {
//   userdata: string
//
// }
import { z } from 'zod';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { useToast } from "primevue/usetoast";
import Form from '@primevue/forms'

const username = ref('');
const email = ref('')
const password = ref('')


const toast = useToast();
const initialValues = ref({
  username: '',
  email: '',
  password: ''
});





const resolver = ref(zodResolver(
  z.object({
    username: z.string().min(6, { message: 'Username is required.' }),
    email: z.string().min(15, { message: 'Email is required.' }).email({ message: 'Invalid email address.' }),
    // password: z.string().min(8, { message: 'Password is required.' }).password({ message: 'Invalid password.' })
  })
));

const onFormSubmit = ({ valid }) => {
  if (valid) {
    toast.add({ severity: 'success', summary: 'Успешно!', life: 3000 });
  }
};








const handleSubmit = () => {
  fetch('https://yandex.ru', {
    method: 'POST',
    body: JSON.stringify({username: username.value, email: email.value, password: password.value})
  })
}

</script>

<template>
  <Form  v-slot="$form" :resolver="resolver" :initialValues="initialValues" @submit="onFormSubmit" >

    <div class="border-x-green-500 color-danger-500 flex flex-col gap-8 justify-center items-center mt-11">

      <!--    <label for="floating" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"></label>-->
      <InputText name="username" type="text" v-model="username" placeholder="Имя пользователя" />
      <Message v-if="$form.username?.invalid" severity="error" size="small" variant="simple">{{ $form.username.error?.message }}</Message>
      <InputText name="email" type="text" v-model="email" placeholder="Электронная почта"  />
      <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">{{ $form.email.error?.message }}</Message>
      <Password type="text" v-model="password" placeholder="Пароль" fluid />
      <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">{{ $form.password.error?.message }}</Message>
      <Button @click="handleSubmit" type="submit" icon="pi pi-check" iconPos="right" label="Подтвердить" severity="secondary" />
      <!--    <p>{{username}} {{email}} {{password}}</p>-->
    </div>
  </Form>



</template>

<style scoped>

</style>
