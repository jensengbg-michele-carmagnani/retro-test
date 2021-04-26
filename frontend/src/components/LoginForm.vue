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
      <button @click="Login()">login</button>
      <section class="google-login">
        <p>Sign in with goole</p>
        <img
          @click="Login"
          src="../assets/google-logo64.png"
          alt="Google login"
        />
      </section>
      <router-link to="/createuser">Create user</router-link>
    </section>
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
      results: {} as infoUser
      
    });
    const store = inject("store");
    const router = useRouter();
    const api = "http://localhost:3000";
    const Login = () => {
      
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope("https://www.googleapis.com/auth/contacts.readonly"),
        provider.addScope("");
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          let user = result.user;
          //store.state.infoUser = user
          console.log(JSON.stringify(user));
          alert(
            JSON.stringify(`Username is : ${user?.displayName}
                             email is : ${user?.email}`)
          );
          router.replace("/home");
        })
        .catch((error) => {
          alert(error.message);
        });
        
    };
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
}
</style>
