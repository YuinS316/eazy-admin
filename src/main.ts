import { createApp } from "vue";
// import "uno.css";
import "./styles/index.scss";
// import App from "./App.vue";
import Provider from "./Provider.vue";
import { router } from "./router";
import MaterialComponentRegister from "./material-components";
import PiniaRegister from "./store";
import { EventEmitter } from "@/utils/eventEmit";

window.$eventBus = new EventEmitter();
const app = createApp(Provider);

//  物料组件库全局注册
app.use(PiniaRegister).use(MaterialComponentRegister).use(router).mount("#app");
