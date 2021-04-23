<template>
  <div class="LoginForm">
    <h1>{{ store.state.counter }}</h1>
    <button @click="store.methods.increaseCounter">+</button>
    <button @click="store.methods.decreaseCounter">-</button>
    <section class="form">
      <input
        v-model="state.infoLogin.email"
        class="username"
        type="text"
        placeholder="username"
      />
      <input
        v-model="state.infoLogin.password"
        class="password"
        type="password"
        placeholder="password"
      />
      <button @click="login()">login</button>
    </section>
    <p>{{ state.infoLogin.email }}</p>
    <p>{{ state.infoLogin.password }}</p>
    <article class="">
      <button @click="cars()">car</button>
    </article>
    <h1>cars</h1>

    <p v-for="car in state.arrayCars" :key="car.id">
      {{ car.make }}
    </p>
  </div>
</template>

<script lang="ts">
import axios from "axios";

import { defineComponent, inject, reactive } from "vue";
import { carsTypes } from "../types";
import { useRouter, useRoute } from "vue-router";
export default defineComponent({
  name: "LoginForm",
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

    const cars = async () => {
      const options = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      const res = await axios.get(`${api}/users`, options);
      console.log("data", res);
      state.arrayCars.push(res.data);
    };
    const login = async () => {
      
      const res = await axios.post(`${api}/login`, state.infoLogin);
      console.log(res.data.success);
      if (res.data.success == true) {
        
        router.push("/home");
      }
    };

    return {
      store,
      cars,
      state,
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
