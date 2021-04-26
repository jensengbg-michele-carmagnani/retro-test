import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import firebase from "firebase"

//For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOennzV6vGLOHyFtaMmr7WHWfe_28a5jI",
  authDomain: "piktro-e1be7.firebaseapp.com",
  projectId: "piktro-e1be7",
  storageBucket: "piktro-e1be7.appspot.com",
  messagingSenderId: "132305377198",
  appId: "1:132305377198:web:dfa308c0cb00b8e8459a3f",
  measurementId: "G-LZGJSKMGC2"
};
firebase.initializeApp(firebaseConfig)
createApp(App).use(router).mount("#app");
