<template>
  <div class="LoginForm">
    <h1>{{ store.state.counter }}</h1>
    <button @click="store.methods.increaseCounter">+</button>
    <button @click="store.methods.decreaseCounter">-</button>
    <section class="form">
      <h1>User logins</h1>
      <input
        v-model="infoLogin.email"
        class="username"
        type="text"
        placeholder="username"
      />
      <input
        v-model="infoLogin.password"
        class="password"
        type="password"
        placeholder="password"
      />
      <button @click="login()">login</button>
    </section>
    <p>{{ infoLogin.email }}</p>
    <p>{{ infoLogin.password }}</p>
  </div>
</template>

<script lang="ts">
import axios from "axios";

import { defineComponent, inject, reactive, toRefs } from "vue";
import { carsTypes } from "../types";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "LoginForm",
  // reactive object available for the table
  setup() {
    const store = inject("store");
    const state = reactive({
      arrayCars: [] as carsTypes[],
      infoLogin: {
        email: "",
        password: "",
      },
    });
    const router = useRouter();
    const api = "http://localhost:3000";

    // api for the login
    const login = async () => {
      const res = await axios.post(`${api}/login`, state.infoLogin);
      console.log(res.data.success);
      // check if pwd and email are correct
      if (res.data.success == true) {
        router.push("/home");
      } else {
        alert("Password or username wrong!");
      }
    };
    // to make available the object
    return {
      store,
      ...toRefs(state),
      login,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
button {
  width: 3rem;
  height: 3rem;
  margin: 2rem;
  text-align: center;
}
.form {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
}
.password,
.username {
  margin: 0.5rem;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
