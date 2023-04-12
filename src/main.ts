import { createApp } from "vue";
// import "uno.css";
import App from "./App.vue";
import { router } from "./router";
import MaterialComponentRegister from "./material-components";
import PiniaRegister from "./store";

const app = createApp(App);

//  物料组件库全局注册
app.use(PiniaRegister).use(MaterialComponentRegister).use(router).mount("#app");
