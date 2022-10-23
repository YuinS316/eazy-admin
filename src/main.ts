import { createApp } from "vue";
import "virtual:svg-icons-register";
import "@unocss/reset/normalize.css";
import "xe-utils";
import "uno.css";
import "@/styles/index.scss";
import App from "./App.vue";
import router from "./routes/index";
import store from "./store/index";
import useTable from "./hooks/vxe-table/index";
import useMdEditor from "./hooks/v-md-editor";

createApp(App)
  .use(store)
  .use(router)
  .use(useTable)
  .use(useMdEditor)
  .mount("#app");
