# arjshiv.github.io

Arjun Kannan's personal website. The site is a static page served from `public/`.

## Setup

```bash
npm install
```

## Build CSS

The site now uses a local Tailwind build instead of the CDN runtime.

```bash
npm run build:css
```

This compiles:

- source: `src/tailwind.css`
- output: `public/styles.css`

Re-run the build after changing Tailwind classes, theme tokens, or any custom layer styles.

## Local Preview

For a quick static preview:

```bash
python3 -m http.server 4173 --directory public
```

Then open `http://127.0.0.1:4173`.

## Deploy

```bash
npm run firebase:login
npm run firebase:deploy
```

If you need to reconfigure Firebase for this repo, use:

```bash
npm run firebase:init
```

The project now uses the repo-local Firebase CLI from `firebase-tools`, so it no longer depends on a globally installed `firebase` binary being on your shell `PATH`.


## TODOS
[] Migrate to a free vercel project from firebase
[] Cron job to add all relevant mentions
