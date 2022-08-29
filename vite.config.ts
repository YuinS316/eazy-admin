import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import Unocss from "unocss/vite";
import { presetAttributify, presetUno } from "unocss";
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

const pathResolve = (dir: string): string => {
  return resolve(__dirname, ".", dir);
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Unocss({
      presets: [
        presetAttributify({
          /* preset options */
        }),
        presetUno(),
        // ...custom presets
      ],
      rules: [
        // your custom rules
      ],
    }),
    Components({
      resolvers: [NaiveUiResolver()]
    }),
    AutoImport({
        resolvers: [],
        // 自定引入 Vue VueRouter API,如果还需要其他的可以自行引入
        imports: ['vue', 'vue-router'],
        // 调整自动引入的文件位置
        dts: 'src/types/auto-import.d.ts',
        // 解决自动引入eslint报错问题 需要在eslintrc的extend选项中引入
        eslintrc: {
          enabled: true,
          // 配置文件的位置
          filepath: './.eslintrc-auto-import.json',
          globalsPropValue: true,
        },
      }),
  ],
  resolve: {
    alias: {
      "@": pathResolve("src"),
    },
  },
});
