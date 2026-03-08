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
firebase login
firebase deploy
```
