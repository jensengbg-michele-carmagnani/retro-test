<template>
  <div class="login-form">
    <h1>User logins</h1>
    <input
      v-model="infoLogin.email"
      class="username"
      type="email"
      placeholder="email"
    />
    <input
      v-model="infoLogin.password"
      class="password"
      type="password"
      placeholder="password"
    />
    <button @click="login()">login</button>
    <section class="google-login">
      <p>Sign in with goole</p>
      <img
        @click="Login"
        src="../assets/google-logo64.png"
        alt="Google login"
      />
    </section>
    <router-link to="/createuser">Need an account ? </router-link>

    <p>{{ infoLogin.email }}</p>
    <p>{{ infoLogin.password }}</p>
  </div>
</template>

<script lang="ts">
import axios from "axios";

import { defineComponent, inject, reactive, ref, toRefs } from "vue";
import { carsTypes, infoUser } from "../types";
import { useRouter } from "vue-router";
import firebase from "firebase";
import { googleLogin } from "../modules/login";
export default defineComponent({
  name: "LoginForm",
  // reactive object available for the table
  setup() {
    const state = reactive({
      arrayCars: [] as carsTypes[],
      infoLogin: {
        email: "",
        password: "",
      },
      results: {} as infoUser,
    });
    const store = inject("store");
    const router = useRouter();
    const api = "http://localhost:3000";
    const Login = () => {
      googleLogin();
    };
    // api for the login
    const login = async () => {
      const res = await axios.post(`${api}/login`, state.infoLogin);
      console.log(res.data.success);
      // check if pwd and email are correct
      if (res.data.success == true) {
        sessionStorage.setItem("piktroToken", res.data.token);
        router.push("/home");
      } else {
        alert("Password or username wrong!");
      }
    };

    //to make available the object
    return {
      store,
      ...toRefs(state),
      Login,
      login,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
}
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
  text-align: center;
}
.google-login {
  cursor: pointer;
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
  text-decoration: none;
  font-size: 20px;
}
</style>
