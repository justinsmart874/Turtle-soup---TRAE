# 前端项目文件结构（FE Structure）

> 本文档记录当前前端工程结构，默认不展示 `node_modules`、`dist` 等构建产物目录。

## 根目录

```text
client/
├── package.json
├── package-lock.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
├── index.html
├── eslint.config.js
├── public/
│   └── vite.svg
└── src/
    ├── main.tsx
    ├── index.css
    ├── App.tsx
    ├── App.css
    ├── assets/
    │   ├── react.svg
    │   ├── vite.svg
    │   ├── hero.png
    │   └── avatars/
    │       ├── rabbit-avatar.svg
    │       ├── kitten-avatar.svg
    │       └── index.ts
    ├── routes/
    │   └── AppRouter.tsx
    ├── layouts/
    │   └── MainLayout.tsx
    ├── pages/
    │   ├── HomePage.tsx
    │   ├── GamePage.tsx
    │   ├── ResultPage.tsx
    │   └── NotFoundPage.tsx
    ├── components/
    │   ├── NameWithAvatar.tsx
    │   └── .gitkeep
    ├── hooks/
    │   └── .gitkeep
    ├── store/
    │   └── .gitkeep
    ├── services/
    │   └── .gitkeep
    ├── constants/
    │   └── .gitkeep
    ├── types/
    │   └── .gitkeep
    └── utils/
        └── .gitkeep
```

## 说明

- `routes/`：路由入口与页面映射。
- `layouts/`：通用布局壳。
- `pages/`：页面级组件（开始页、游戏页、结果页、404）。
- `components/`、`hooks/`、`store/`、`services/`、`constants/`、`types/`、`utils/`：预留给后续业务开发。

