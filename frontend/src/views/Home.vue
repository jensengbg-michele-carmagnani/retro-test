<template>
  <section>
    <h1>welcome to piktro</h1>
    
    <button @click="SignOut">Sign out</button>
  </section>
</template>

<script>
import { defineComponent, inject } from "vue";
import { useRouter, useRoute } from "vue-router";
import firebase from "firebase";

export default defineComponent({
  setup() {
    const store = inject("store");
    const router = useRouter();
    const route = useRoute();

    const SignOut = () => {
      firebase
        .auth()
        .signOut()
        .then(() => {
          alert("Sign-out successful.");
          router.replace("/");
        })
        .catch((error) => {
          console.error(error);
        });
    };

    return {
      SignOut,
      store
    };
  },
});
</script>

<style></style>
