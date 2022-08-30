import { createApp } from "vue";
import "uno.css";
import App from "./App.vue";
import router from './routes/index';

createApp(App).use(router).mount("#app");
