# dragon-map — Repo 規則

@AGENTS.md

> 全域規則見 ~/.claude/CLAUDE.md。本檔只放這個 repo 特有的事。
> 上方引用的 AGENTS.md 含 Next.js 版本警告（工具生成），
> 內容有效，保留：寫任何 code 前先讀 node_modules/next/dist/docs/
> 的相關指南，不要依賴訓練資料中的 Next.js 慣例。

## 這個專案是什麼
Where Dragons Dwell：互動神話圖譜（14 個文化的龍傳統），
含 Oracle AI 對話、時間軸、比較模式、每日卡片。
Handshake × OpenAI Codex Creator Challenge 第三名作品。

## 技術棧與部署
- Next.js（App Router）＋ TypeScript，部署 Vercel。
- Oracle endpoint：`src/app/api/oracle/route.ts`
  （@upstash/ratelimit ＋ @upstash/redis，雙視窗限流）。

## 適用的共用標準
- [x] standards/serverless-ai-proxy.md（動 oracle route 必讀）
- [x] standards/verification.md

## 這個 repo 的驗證方式
- oracle 改動：serverless-ai-proxy.md 的 curl 驗證清單
- 前端改動：verification.md 前端清單；每日卡片功能注意
  localStorage 狀態（清掉再測一次）

## 已知的坑與待辦
- **待辦（安全）**：`getClientIp` 目前優先取 `x-forwarded-for`
  第一值，可被偽造重置限流。依 SETUP.md 修復 3a 改為優先
  `x-real-ip`。
- 限流 fail-closed 行為（production 缺 Redis 即拒絕服務）是
  刻意設計，不要「順手」改成放行。
- 關鍵字預過濾（isAtlasScopedQuestion）偏保守，可能誤擋
  無關鍵字的正當問題——調整範圍前先問 Huiying 取捨。
