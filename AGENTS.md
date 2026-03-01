# Repository Guidelines

## Project Structure & Module Organization
This repository is a static personal site with deployment config.

- `public/index.html`: single-page site UI (HTML, Tailwind config, and inline behavior).
- `public/assets/`: static media (images and other frontend assets).
- `firebase.json`: Firebase Hosting settings, including SPA rewrite to `/index.html`.
- `database.rules.json`: Firebase Realtime Database access rules.
- `.github/workflows/static.yml`: GitHub Pages deployment workflow (publishes `public/`).
- `skills/frontend-design/SKILL.md`: local agent skill notes used for design-focused edits.

## Build, Test, and Development Commands
There is no build step; content in `public/` is served as-is.

- `npx firebase-tools login`: authenticate Firebase CLI.
- `npx firebase-tools emulators:start --only hosting`: run local hosting preview.
- `npx firebase-tools deploy --only hosting`: deploy site updates.
- `npx firebase-tools deploy --only database`: deploy database rules when `database.rules.json` changes.

## Coding Style & Naming Conventions
- Use 4-space indentation in `public/index.html` to match the existing file.
- Keep markup semantic and section IDs descriptive (for example, `about`, `press`, `work`).
- Prefer Tailwind utilities and existing custom class patterns (notably `te-*`) over ad hoc styling.
- Name assets in lowercase kebab-case (for example, `landscape-1.png`).
- Keep inline JavaScript focused on UI behavior; avoid large, unrelated logic blocks.

## Testing Guidelines
No automated test suite is configured in this repository today. Use manual verification before opening a PR:

1. Run the hosting emulator and load the site in desktop and mobile widths.
2. Verify navigation anchors, theme toggle behavior, and key interactions.
3. Check browser console for errors or failed asset loads.
4. If rules changed, validate authenticated read/write behavior against the emulator.

## Commit & Pull Request Guidelines
- Follow the commit style already used in history: `feat:`, `refactor:`, `docs:`, `chore:`.
- Keep commit scope narrow (one logical change per commit).
- PRs should include: concise summary, linked issue (if applicable), and test notes.
- For UI changes, include before/after screenshots or a short recording.
- Call out deployment impact explicitly (hosting only vs. hosting + database rules).

## Security & Configuration Tips
- `database.rules.json` currently requires authenticated access for both `.read` and `.write`; do not loosen this without explicit review.
- Keep generated Firebase cache files out of commits (respect existing `.gitignore` settings).
