# 山谷 / The Vale

也有 [英文版](README.md)。

部署狀態：[![Website Deploy](https://deploy-badge.vercel.app/?url=https://thevale.top&name=Vercel)](https://thevale.top) ｜
授權條款：[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)

一個讓旅人們留下自己情緒，並讓其他旅人一起傾聽的簡單網站。

這個專案部署在 [Vercel](https://thevale.top) 上。

## 技術棧
![Next.js](https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/tailwind%20css-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/postgresql-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)

## 貢獻
歡迎對專案進行貢獻。可以開啟PR到`develop`分支（或`main`，如果沒有`develop`分支的話）。

## 部署
在部署這個專案以前，你需要有一個 PostgreSQL 資料庫運行。這個專案使用 Neon 作為資料庫。你可以在 [Neon](https://neon.tech/) 註冊帳號。

1. 複製專案
```bash
git clone https://github.com/3underscoreN/theVale; cd theVale
```

2. 安裝需要的套件
```bash
npm install
```
3. 在專案根目錄創建 `.env` 檔案，並加入資料庫的 URL：
```bash
// 檔案: .env.local
DATABASE_URL="postgresql://..."
DATABASE_URL_DEV="postgresql://..."
```

4. 啟動伺服器
```bash
npm run dev
```
5. 打開瀏覽器並前往 `http://localhost:3000`。