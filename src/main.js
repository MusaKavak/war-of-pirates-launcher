import { createApp } from "vue";
import "./styles.css";
import App from "./App.vue";
import router from "./utils/router";
import i18n from "./utils/i18n";

createApp(App)
    .use(router)
    .use(i18n)
    .mount("#app");
