<template>
  <div class="form">
    <h1>Sign up</h1>
  
    <div class="sign-up">
      <input
        v-model="newUser.email"
        class="username"
        type="text"
        placeholder="email"
      />
      <input
        v-model="newUser.password"
        class="password"
        type="password"
        placeholder="password"
      />
      <button @click="create()">Create new user</button>
          <router-link to="/">Alredy have an account?</router-link>
    </div>
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
.form {
  background-image: url("../assets/dots.svg");
}
.sign-up {
 background-color: #61AEDB;
   display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
  padding:2rem; 
  min-width: 50%;
  border-radius: 10px;
}
button {
  width: 3rem;
  height: 3rem;
  margin: 2rem;
  min-width: 75%;
  text-align: center;
}
.form {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
}
h1{
  margin-bottom: 0;
}
.password,
.username {
  margin: 0.5rem;
  text-align: center;
  min-width: 70%;
  padding: .7rem;
  border: 1px white solid;
  border-radius: 10px 0;
}
a {
  color: #000000b4;
  text-decoration: none;
}
</style>
