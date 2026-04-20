# arjshiv.github.io

Arjun Kannan's personal website. The site is a static page served from `public/`.

## Setup

```bash
bun install
```

## Build CSS

The site now uses a local Tailwind build instead of the CDN runtime.

```bash
bun run build:css
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
bun run firebase:login
bun run firebase:deploy
```

If you need to reconfigure Firebase for this repo, use:

```bash
bun run firebase:init
```

The project now uses Bun for dependency management and script execution, plus the repo-local Firebase CLI from `firebase-tools`, so it no longer depends on a globally installed `firebase` binary being on your shell `PATH`.


## TODOS
[] Migrate to a free vercel project from firebase
[] Cron job to add all relevant mentions
