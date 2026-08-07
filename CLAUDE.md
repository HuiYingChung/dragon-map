# dragon-map — Repo 規則

@AGENTS.md

> 全域規則見 ~/.claude/CLAUDE.md。本檔只放這個 repo 特有的事。
> 上方引用的 AGENTS.md 含 Next.js 版本警告（工具生成），
> 內容有效，保留：寫任何 code 前先讀 node_modules/next/dist/docs/
> 的相關指南，不要依賴訓練資料中的 Next.js 慣例。

## 這個專案是什麼
Where Dragons Dwell：互動神話圖譜（14 個文化的龍傳統），
含 Oracle AI 對話、時間軸、比較模式、每日卡片、逐條文獻參考。
Handshake × OpenAI Codex Creator Challenge 第三名作品。已開源
（code MIT；內容與圖片 CC BY 4.0，見 LICENSE-CONTENT.md）。

## 技術棧與部署
- Next.js（App Router）＋ TypeScript，部署 Vercel。
- Oracle endpoint：`src/app/api/oracle/route.ts`
  （@upstash/ratelimit ＋ @upstash/redis，雙視窗限流）。
- Oracle grounding：system prompt 內嵌 `src/lib/oracle-knowledge.ts`
  由 `src/data/` 生成的摘要——Oracle 知道的必須不超過圖譜本身。
- 關鍵字預過濾共用模組：`src/lib/oracle-scope.ts`（client 與
  server 共用，不要再各自複製一份）。
- CI：`.github/workflows/ci.yml`（lint + tsc + build，mock 模式，
  不需 secrets）。

## 內容標準（重要）
- 文獻資料在 `src/data/sources.ts`：每筆引用都經過驗證
  （URL 可連或標準出版品）。**捏造引用視同 bug。**
- 圖譜文案雙語（英文＋繁中台灣用語），改任何 user-facing 文案
  兩種語言都要改。
- 活傳統（毛利 taniwha、彩虹蛇、北美角蛇等）用現在式、
  點名具體民族，不要壓平成單一神話；優先引用社群自撰來源。

## 適用的共用標準
- [x] standards/serverless-ai-proxy.md（動 oracle route 必讀）
- [x] standards/verification.md

## 這個 repo 的驗證方式
- oracle 改動：serverless-ai-proxy.md 的 curl 驗證清單；
  另外用 `ORACLE_MOCK_MODE=true` 測 scope 過濾與 429 行為
- 前端改動：verification.md 前端清單；每日卡片功能注意
  localStorage 狀態（清掉再測一次）

## 已知的坑
- ~~getClientIp 優先取 x-forwarded-for 可被偽造~~ 已修復：
  現在優先 `x-real-ip` → `x-vercel-forwarded-for` → fallback。
- 限流 fail-closed 行為（production 缺 Redis 即拒絕服務）是
  刻意設計，不要「順手」改成放行。
- 關鍵字預過濾（oracle-scope.ts）偏保守，可能誤擋無關鍵字的
  正當問題——調整範圍前先問 Huiying 取捨。
- 字型用 `<link>` 而非 next/font：build 環境不一定連得到
  fonts.googleapis.com（sandbox/內網），不要改回 next/font。
- 原始高解析 PNG（assets/，~250MB）已 gitignore，不要 commit。
