const { defineConfig } = require("eslint-define-config");

module.exports = defineConfig({
  root: true,
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    //模块化方案
    sourceType: "module",
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
    // 解决 defineProps and defineEmits generate no-undef warnings
    "vue/setup-compiler-macros": true,
  },
  globals: {},
  extends: [
    "plugin:vue/vue3-recommended",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended", // typescript-eslint推荐规则,
    "plugin:prettier/recommended",
    "prettier"
  ],
  rules: {
    // 禁止使用 var
    "no-var": "error",
    // semi: "off",
    // 优先使用 interface 而不是 type
    "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
    "@typescript-eslint/no-explicit-any": "off", // 可以使用 any 类型
    "@typescript-eslint/explicit-module-boundary-types": "off",
    // 解决使用 require() Require statement not part of import statement. 的问题
    "@typescript-eslint/no-var-requires": 0,
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/ban-types.md
    "@typescript-eslint/ban-types": ["error", {}],
    "prettier/prettier": "off", 
    "vue/html-indent": "off",
    // 关闭此规则 使用 prettier 的格式化规则，
    "vue/max-attributes-per-line": ["off"],
    // 优先使用驼峰，navie-ui 组件除外
    "vue/component-name-in-template-casing": [
      "error",
      "PascalCase",
      {
        ignores: ["/^n-/", "/^router-/"],
        registeredComponentsOnly: false,
      },
    ],
  },
  // 强制使用驼峰
  camelcase: ["error", { properties: "always" }],
});
