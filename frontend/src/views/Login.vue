<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <LoginForm />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LoginForm from "../components/LoginForm.vue"; // @ is an alias to /src

export default defineComponent({
  name: "Home",
  components: {
    LoginForm,
  },
  
});


</script>
