import { createApp } from "vue";
import "@unocss/reset/normalize.css";
import "xe-utils";
import "uno.css";
import "@/styles/index.scss";
import App from "./App.vue";
import router from "./routes/index";
import useTable from "./hooks/vxe-table/index";

createApp(App).use(router).use(useTable).mount("#app");
