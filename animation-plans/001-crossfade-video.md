# 001 - Crossfade the video handoff

- **Status**: DONE
- **Commit**: 466ae8e
- **Severity**: MEDIUM
- **Category**: Missed opportunities
- **Estimated scope**: 2 files, about 45 lines

## Problem

`public/index.html:323-330` replaces the video facade immediately with an iframe. The visual state teleports while the remote player loads.

```js
video?.addEventListener('click', () => {
  const iframe = document.createElement('iframe');
  // attributes omitted
  video.replaceWith(iframe);
}, { once: true });
```

## Target

Append the iframe inside `.video-shell`, keep it transparent until its `load` event, and mark the shell with `data-video-state="loading"` and then `data-video-state="ready"`. During pointer loading, fade the facade copy to `opacity: 0` over `140ms var(--ease-out)` and scale its image to `1.015` over `220ms var(--ease-out)`. Reveal the iframe from `opacity: 0; transform: scale(0.985)` to settled over `220ms var(--ease-out)`, then remove the facade after the transition. For keyboard activation (`event.detail === 0`), keep the facade unchanged until load and replace it without positional or opacity animation.

## Repo conventions to follow

- `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` already lives in `public/styles.css`.
- Existing interaction transitions list properties explicitly and stay below 300ms.

## Steps

1. Update the click handler in `public/index.html` to append and load the iframe without a blank intermediate state.
2. Add loading and ready selectors to `public/styles.css`, animating only opacity and transform.
3. Preserve the current `youtube-nocookie.com` URL and iframe attributes.
4. Under reduced motion, keep the opacity bridge but remove scaling.
5. Update `scripts/ai-field-tools-check.mjs` if its video assertion assumes immediate replacement.

## Boundaries

- Do not add a dependency or autoplay animation before click.
- Do not change video copy, dimensions, or provider.
- If selectors no longer match commit `466ae8e`, stop instead of improvising.

## Verification

- Run `bun run check:all` with the local server on port 4173.
- Click the facade and confirm there is no dark or white flash before playback appears.
- Confirm the final host is `www.youtube-nocookie.com`.
- At 10% playback speed, confirm the two states do not visibly double-expose.
- With reduced motion, confirm only opacity changes.

## Done when

The loaded iframe replaces the facade through one interruptible, sub-300ms transition with no layout shift.
