<template>
  <div id="nav">
    <img class="piktroimg" src="./assets/piktrologo.svg">
  </div>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, provide, onBeforeMount } from "vue";
import { useRouter, useRoute } from "vue-router";
import firebase from "firebase";
import store from "./store";
import axios from "axios";

export default defineComponent({
  setup() {
    provide("store", store);
    const router = useRouter();
    const route = useRoute();
    onBeforeMount(async () => {
      const token = sessionStorage.getItem("piktroToken");
      if (token) {
        console.log('token')
        const API = "http://localhost:3000";
        const verifiedToken = await axios.get(`${API}/isLoggedin`, {
          headers: {
            authorization: `Bearer ${sessionStorage.getItem("piktroToken")}`,
          },
        }
        );
        if (verifiedToken) router.replace('/home')
      } else {
        firebase.auth().onAuthStateChanged((user) => {
          if (!user) {
            router.replace("/");
          } else if (route.path == "/" || route.path == "/createuser") {
            router.replace("/home");
          }
        });
      }
    });
  },
});
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-family: 'Open Sans', sans-serif;
}

#nav {
  padding: 30px;
  display: flex;
}
.piktroimg {
  max-width: 25%;
}

#nav a {
  font-weight: bold;
  color: #000000;
}

#nav a.router-link-exact-active {
  color: #000000;
}
</style>
