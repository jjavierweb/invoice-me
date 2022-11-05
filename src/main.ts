import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

// import firebase
import { auth } from "./firebase/config";
import { onAuthStateChanged } from "firebase/auth";

import "@/assets/css/main.css";

let app: any;
/*
Check that firebase checks for authentication
before we mount the app if it does not exists
already
*/
onAuthStateChanged(auth, () => {
  if (!app) {
    app = createApp(App).use(router).use(createPinia()).mount("#app");
  }
});
