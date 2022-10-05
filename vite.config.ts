import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import { viteMockServe } from "vite-plugin-mock";
import {
  createStyleImportPlugin,
  VxeTableResolve
} from "vite-plugin-style-import";
import Unocss from "unocss/vite";
import { presetAttributify, presetUno } from "unocss";
import transformerDirective from "@unocss/transformer-directives";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import { getExportsStatic } from "pkg-exports";

const pathResolve = (dir: string): string => {
  return resolve(__dirname, ".", dir);
};

// https://vitejs.dev/config/
export default defineConfig(async ({ command, mode }) => {
  const _exports = await Promise.allSettled([getExportsStatic("naive-ui")]);

  const exports = _exports.map(m => (m.status === "fulfilled" ? m.value : []));

  return {
    plugins: [
      vue(),
      Unocss({
        presets: [
          presetAttributify({
            /* preset options */
          }),
          presetUno()
          // ...custom presets
        ],
        //@ts-ignore
        transformers: [transformerDirective()],
        rules: [
          // your custom rules
        ],
        theme: {
          colors: {
            primary: "#0560fd"
          }
        }
      }),
      Components({
        resolvers: [NaiveUiResolver()]
      }),
      createStyleImportPlugin({
        resolves: [VxeTableResolve()]
      }),
      AutoImport({
        resolvers: [],
        // 自定引入 Vue VueRouter API,如果还需要其他的可以自行引入
        imports: [
          "vue",
          "vue-router",
          {
            "navie-ui": exports[0].filter(
              n => n.startsWith("N") || n.startsWith("use")
            )
          }
        ],
        // 调整自动引入的文件位置
        dts: "src/types/auto-import.d.ts",
        // 解决自动引入eslint报错问题 需要在eslintrc的extend选项中引入
        eslintrc: {
          enabled: true,
          // 配置文件的位置
          filepath: "./.eslintrc-auto-import.json",
          globalsPropValue: true
        }
      }),
      viteMockServe({
        ignore: /^\_/,
        mockPath: "mock",
        localEnabled: command === "serve",
        watchFiles: true
      }),
      createSvgIconsPlugin({
        iconDirs: [resolve(process.cwd(), "src/assets/svg")],
        symbolId: "icon-[dir]-[name]"
      })
    ],
    optimizeDeps: {
      include: ["@kangc/v-md-editor/lib/theme/vuepress.js"]
    },
    resolve: {
      alias: {
        "@": pathResolve("src")
      }
    },
    css: {
      preprocessorOptions: {
        scss: {}
      }
    }
  };
});
