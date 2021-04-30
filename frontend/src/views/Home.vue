<template>
  <section>
    <article>
      <img src="../assets/use.svg" alt="">
    </article>
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
      const token = sessionStorage.getItem("piktroToken");
      try {
        if (token) {
          sessionStorage.clear();
          router.replace("/");
        } else {
          firebase
            .auth()
            .signOut()
            .then(() => {
              alert("Sign-out successful.");
              router.replace("/");
            });
        }
      } catch (error) {
        console.log(error);
      }
    };

    return {
      SignOut,
      store,
    };
  },
});
</script>

<style></style>
