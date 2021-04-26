<template>
  <div class="sign-up">
    <h1>Sign up</h1>
    <input
      v-model="newUser.email"
      class="username"
      type="text"
      placeholder="username"
    />
    <input
      v-model="newUser.password"
      class="password"
      type="password"
      placeholder="password"
    />
    <button @click="create()">Create</button>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  // reactive obj for data
  setup() {
    const state = reactive({
      newUser: {
        email: "",
        password: "",
        name: "",
        lastName: "",
      },
    });
    const api = "http://localhost:3000";
    const router = useRouter();

    // Api for createUser
    const create = async () => {
      const res = await axios.post(`${api}/createUser`, state.newUser);
      console.log(res.data);
      if (res.data.success == true) {
        router.push("/");
      } else {
        alert(res.data.message);
      }
    };
    return {
      ...toRefs(state),
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
