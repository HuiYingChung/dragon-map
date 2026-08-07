# Where Dragons Dwell · 群龍所居之處

**An interactive, bilingual atlas of dragon myths across fourteen world cultures.**
互動式雙語世界龍神話圖譜——收錄十四個文化的龍傳統。

Live site: **https://dragon-map.vercel.app**

Hover an antique world map to wake the dragons of China, Japan, Korea, South
Asia, Mesoamerica, the Amazon, Indigenous North America, medieval Europe, the
Norse world, the Slavic lands, Egypt, Persia, Aboriginal Australia, and
Aotearoa New Zealand. Every entry is curated, bilingual (English / Traditional
Chinese), and backed by verifiable primary texts, scholarship, and museum
sources.

> 🏆 Third place, Handshake × OpenAI Codex Creator Challenge.

## Features

- **Interactive myth map** — an antique-map interface with keyboard-accessible
  hotspots for each tradition
- **Curated entries with real references** — each dragon carries a "References"
  section; every citation was verified against a live URL or a standard
  published edition (`src/data/sources.ts`)
- **Timeline lens** — filter traditions by era: ancient, classical, medieval,
  living, or layered time
- **Comparison mode** — read any two traditions side by side
- **Ask the Oracle** — an AI guide grounded in the atlas's own source-checked
  entries; it refuses questions beyond the atlas rather than inventing answers
- **Daily dragon card** — draw one printable museum-style card per day
- **Fully bilingual** — English and Traditional Chinese throughout

## Getting started

```bash
git clone https://github.com/HuiYingChung/dragon-map.git
cd dragon-map
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. The default `.env.example` sets
`ORACLE_MOCK_MODE=true`, so the whole site — including the Oracle — runs
without any API key.

To enable the real Oracle, set `OPENAI_API_KEY` and `ORACLE_MOCK_MODE=false`
in `.env.local`. See `.env.example` for all configuration options.

## Architecture

```
src/
  app/
    page.tsx                 # Atlas: map, timeline, cards, oracle
    dragons/[id]/page.tsx    # SEO-friendly entry pages with sources
    dragons/[id]/card/       # Printable museum card
    api/oracle/route.ts      # Oracle endpoint (rate-limited, origin-checked)
  components/                # Map, cards, chat, ambient effects
  data/
    dragons.ts               # The 14 curated, bilingual entries
    sources.ts               # Verified references for every entry
  lib/
    oracle-scope.ts          # Shared client/server topic pre-filter
    oracle-knowledge.ts      # Builds the Oracle's grounding digest from data
```

The Oracle's design goal is *reliability over reach*: its system prompt embeds
a digest generated from the same data files that render the UI, it is
instructed to decline questions the atlas cannot support, and a keyword
pre-filter plus dual-window rate limiting (Upstash Redis, fail-closed in
production) keep the endpoint scoped and inexpensive.

## Verification & content standards

The reference list for each tradition distinguishes primary texts (原典),
modern scholarship (學術), and museum resources (館藏). Fabricated citations
are treated as bugs. Several traditions in the atlas are living traditions;
entries name specific peoples and beings rather than flattening them into one
myth, and favour community-authored sources where they exist. Corrections are
welcome — see [CONTRIBUTING.md](CONTRIBUTING.md).

## Scripts

| Command                   | Purpose                                      |
| ------------------------- | -------------------------------------------- |
| `npm run dev`             | Development server                           |
| `npm run build`           | Production build                             |
| `npm run lint`            | ESLint                                       |
| `npm run optimize:images` | Regenerate `public/` webp from source PNGs   |

The original high-resolution dragon PNGs (~250 MB) are kept out of the
repository; the site uses the optimized webp files in `public/dragons/`. If
you have source PNGs in `assets/`, `npm run optimize:images` rebuilds the webp
set.

## License

- **Code:** [MIT](LICENSE)
- **Atlas content, data, and imagery:** [CC BY 4.0](LICENSE-CONTENT.md) —
  the dragon illustrations were AI-generated and then curated/edited for this
  project; see LICENSE-CONTENT.md for provenance notes.

---

<sub>Copyright © 2026 Huiying Chung</sub>
