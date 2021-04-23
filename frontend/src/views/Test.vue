<template>
  <div class="sign-up">
    <h1>Sign up</h1>
    <input
      v-model="state.newUser.email"
      class="username"
      type="text"
      placeholder="username"
    />
    <input
      v-model="state.newUser.password"
      class="password"
      type="password"
      placeholder="password"
    />
    <button @click="create()"> Create</button>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent, reactive } from "vue";
 import { useRouter } from "vue-router";
export default defineComponent({
  setup() {
    const state = reactive({
      newUser: {
        email: "",
        password: "",
        name:"",
        lastName:""
      },
    });
    const api = "http://localhost:3000"
    const router = useRouter()
//    create user 
    const create = async () => {
      const res = await axios.post(`${api}/createUser`, state.newUser);
      console.log(res.data);
      if (res.data.success == true) {
        router.push("/home");
      } else{
        alert(res.data.message);
      }
    };
    return {
      state,
       create,
    };
  },
});
</script>

<style>
.sign-up {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
}
input {
  margin: 1rem;
}
</style>
