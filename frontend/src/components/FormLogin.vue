<template>
  <div>
      <form @submit.prevent="onSubmit">
          <div>
              <label>Username</label>
              <input type="text" required v-model="form.username">
          </div>
          <div>
              <label>Password</label>
              <input type="password" v-model="form.password" required>
          </div>
          <div>
              {{ userStore.state.error }}
          </div>
          <button type="submit">Login</button>
      </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import userStore from '../store/user'
export default defineComponent({
    name: 'FormLogin',
    setup() {
        const form = reactive({
            username: '',
            password: ''
        })
        const onSubmit = () => {
            userStore.login(form.username, form.password)
            form.username = ''
            form.password = ''
        }
        return { form, userStore, onSubmit }
    }

})
</script>

<style>

</style>