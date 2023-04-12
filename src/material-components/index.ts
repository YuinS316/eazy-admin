import type { App } from "vue";

const componentFiles = import.meta.glob("./*/index.vue", {
  import: "default",
  eager: true
});

export default {
  install(app: App) {
    for (const path in componentFiles) {
      let name = "";
      const componentName = (componentFiles[path] as any).name;
      if (!componentName) {
        let reg = /material-components\/(\w+)\/index.vue/;
        const filePath = (componentFiles[path] as any).__file;
        let res = reg.exec(filePath);
        name = res![1];
      } else {
        name = componentName;
      }
      app.component(name, componentFiles[path] as any);
    }
  }
};
