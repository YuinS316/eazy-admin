import type { App } from "vue";

//  注册物料组件
const registeMaterialComponents = (app: App) => {
  const componentFiles = import.meta.glob("./*/index.vue", {
    import: "default",
    eager: true
  });

  for (const path in componentFiles) {
    let name = "";
    const componentName = (componentFiles[path] as any).name;
    if (!componentName) {
      //  物料组件所在的文件名正则
      let materialReg = /material-components\/(\w+)\/index.vue/;
      const filePath = (componentFiles[path] as any).__file;
      if (materialReg.test(filePath)) {
        let res = materialReg.exec(filePath);
        name = res![1];
      } else {
        throw new Error("自动注册失败");
      }
    } else {
      name = componentName;
    }
    app.component(name, componentFiles[path] as any);
  }
};

//  注册物料组件对应的属性设置
const registeMaterialComponentAttrs = (app: App) => {
  const componentAttrFiles = import.meta.glob("./*/attr.vue", {
    import: "default",
    eager: true
  });

  for (const path in componentAttrFiles) {
    let name = "";
    const componentName = (componentAttrFiles[path] as any).name;
    if (!componentName) {
      //  物料所对应的属性设置所在的文件名正则
      let materialAttrReg = /material-components\/(\w+)\/attr.vue/;

      const filePath = (componentAttrFiles[path] as any).__file;
      if (materialAttrReg.test(filePath)) {
        let res = materialAttrReg.exec(filePath);
        name = res![1] + "Attr";
      } else {
        throw new Error("自动注册失败");
      }
    } else {
      name = componentName;
    }
    app.component(name, componentAttrFiles[path] as any);
  }
};

export default {
  install(app: App) {
    registeMaterialComponents(app);
    registeMaterialComponentAttrs(app);
  }
};
