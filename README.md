# Eazy Admin

Eazy = easy for lazy

Eazy Admin 是一个免费开源的中后台模板。使用了最新的 `vue3`、`vite3`、`typescript` 等主流技术，简单易懂的中后台前端解决方案，供学习参考。

## 技术栈

- [vue3](https://cn.vuejs.org/)
- [vite3](https://cn.vitejs.dev/)
- [unocss](https://github.com/unocss/unocss)
- [navie ui](https://www.naiveui.com/zh-CN/os-theme)
- [pinia](https://pinia.vuejs.org/zh/)

## 功能

- 路由
  - [x] 路由配置自动生成菜单
  - [ ] 后端返回路由表
- 权限功能
  - [ ] 按钮权限
  - [ ] 路由权限
- 二次封装

  - [x] axios: 可对接口和实例单独配置拦截器，并有健全的类型提示
  - [x] storage: 对 `loalStorage` 和 `sessionStorage` 封装，根据 `prefix` 配置命名空间 和 储存时设置过期时间
  - [ ] cookie

- 打包

  - [ ] 区分环境
  - [ ] 优化体积

- 其他功能
  - [ ] 一键换肤
  - [ ] 国际化
  - [x] mock

## 安装使用

- 获取项目代码

```
https://github.com/YuinS316/eazy-admin.git
```

- 安装依赖

```
cd eazy-admin
pnpm install
```

- 运行

```
pnpm serve
```

- 打包

```
pnpm build
```
