# Contributing

Thanks for your interest in Where Dragons Dwell!

## Development setup

```bash
npm install
cp .env.example .env.local   # ORACLE_MOCK_MODE=true works without any API key
npm run dev
```

Before opening a PR, please make sure the same checks CI runs pass locally:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## What contributions are welcome

- **Corrections to mythology content.** Every factual claim should be backed
  by a verifiable source. If you propose a change to an entry in
  `src/data/dragons.ts`, cite a source that meets the bar used in
  `src/data/sources.ts` (primary texts, academic scholarship, museum or
  community-authored resources — with a checkable URL or a standard published
  edition).
- **New references.** Additions to `src/data/sources.ts` must be real and
  verifiable. No fabricated citations, ever.
- **Accessibility, performance, and i18n improvements.**
- **Bug fixes.**

## Content guidelines

- The atlas is bilingual: any user-facing copy change needs both English and
  Traditional Chinese (台灣用語) versions.
- Living traditions (Māori taniwha, Rainbow Serpent beings, Indigenous North
  American horned serpents, and others) are described in the present tense and
  with respect for the communities they belong to. Community-authored sources
  are preferred where they exist.

## Oracle endpoint

`src/app/api/oracle/route.ts` is deliberately conservative:

- Rate limiting fails **closed** in production (no Redis → no service). Do not
  "fix" this by letting requests through.
- The keyword pre-filter in `src/lib/oracle-scope.ts` may occasionally block a
  legitimate question. Loosen it carefully — it exists to keep the endpoint
  from being used as a general chatbot.
- The system prompt is grounded in `src/lib/oracle-knowledge.ts`, which is
  generated from the atlas data. Keep it that way: the Oracle should never
  know more than the atlas does.
