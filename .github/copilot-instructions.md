# Copilot Instructions for w-day

## 專案架構
- 本專案為 Vue 3 + Vite 應用，採用 Vue 3 `<script setup>` 單檔元件（SFC）。
- 主要入口：`src/main.js`，掛載 `App.vue` 並註冊 Vue Router。
- 路由設定於 `src/router/index.js`，包含 `/`（首頁）、`/slotMachine`（拉霸機頁面），以及所有未匹配路徑導向 `/`。
- 頁面元件放於 `src/pages/`，如 `Home/index.vue`、`SlotMachine/index.vue`。
- 共用元件放於 `src/components/`，如 `Menu.vue`、`Gift.vue`。
- 靜態資源（圖片等）放於 `src/assets/`。

## 開發與建置流程
- 啟動開發伺服器：`npm run dev`
- 建置正式版：`npm run build`
- 預覽建置結果：`npm run preview`
- Vite 設定檔為 `vite.config.js`。

## 主要開發慣例
- 所有 Vue 元件皆採用 `<script setup>` 語法。
- 路由元件使用動態 import（`component: () => import(...)`）以提升效能。
- 樣式可用 CSS 或 SCSS，部分頁面（如 Home）直接於 SFC 內使用 SCSS。
- Swiper 輪播元件於首頁（`Home/index.vue`）大量使用，圖片路徑以 `new URL(..., import.meta.url).href` 生成。
- 路由切換時自動將滾動容器（`.cp-main-layout-pages` 或 `#router-view-container`）滾動至頂部。

## 依賴與整合
- 主要依賴：`vue`、`vue-router`、`swiper`。
- 開發依賴：`@vitejs/plugin-vue`、`sass-embedded`、`vite`（使用 rolldown-vite 版本）。
- 若需新增第三方套件，請先確認是否需在 Vite 設定中額外配置。

## 其他注意事項
- 頁面切換與動畫初始化可於 `onMounted` 生命週期內處理。
- 若有特殊路由行為（如登入後強制導回首頁），請參考 `src/router/index.js` 內 `redirectToHomePages`。
- 請遵循現有檔案結構與命名慣例，並優先使用現有元件與樣式。

---

如需補充專案規則或有不明確處，請於此檔案更新並通知維護者。

## 部署（GitHub Pages）

- 已新增 npm 腳本：`npm run predeploy`（執行 build）與 `npm run deploy`（使用 `gh-pages` 套件將 `dist/` 發佈到 `gh-pages` 分支）。
- Vite `base` 已在 `vite.config.js` 設為 `process.env.BASE || '/w-day/'`，確保公開 URL 正確；CI 或在本地部署前可以用 `BASE=/w-day/ npm run build` 覆寫。
- 已加入 GitHub Actions 工作流程：`.github/workflows/gh-pages.yml`，會在 push 到 `main` 時自動 build 並使用 `peaceiris/actions-gh-pages@v3` 部署 `dist/`。

使用範例：

```bash
# 本地打包並推送（示範）：
npm run predeploy
npm run deploy

# 或依賴 GitHub Actions，自動在 push 到 main 時部署：
git add .
git commit -m "chore: prepare for gh-pages"
git push origin main
```

注意：如果你想把網站部署到 repository root（例如 `https://<user>.github.io/`），請把 `base` 設為 `'/'` 並調整 workflow 或使用其他 target。