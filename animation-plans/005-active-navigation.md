# 005 - Indicate the current section

- **Status**: DONE
- **Commit**: 466ae8e
- **Severity**: LOW
- **Category**: State indication
- **Estimated scope**: 2 files, about 45 lines

## Problem

`public/index.html:78-83` provides section links but no current-section state on a page over 7,000px tall on mobile. The sticky navigation does not help readers locate themselves after the first screen.

## Target

Use one `IntersectionObserver` to set `aria-current="location"` on the link for the section nearest the upper reading band. Render a one-pixel pseudo-element under each nav link, transitioning `opacity: 0; transform: scaleX(0)` to `opacity: 1; transform: scaleX(1)` over `150ms var(--ease-out)` from the left. Opacity prevents an antialiased dot at the collapsed origin. Track pointer versus keyboard input; keyboard navigation uses immediate scrolling and underline state changes. The observer is a progressive enhancement: no JavaScript means unchanged usable navigation. Reduced motion makes the underline state change effectively immediate.

## Repo conventions to follow

- The site uses inline progressive-enhancement JavaScript and no dependencies.
- Existing nav hover feedback uses 150ms transitions.

## Steps

1. Add an underline pseudo-element and active selector in `public/styles.css`.
2. Keep link text and current hover contrast unchanged.
3. Add a guarded `IntersectionObserver` in the existing inline script in `public/index.html`.
4. Observe only sections represented in the currently visible nav; safely handle mobile-hidden links.
5. Set exactly one `aria-current` value at a time and initialize `#top` without waiting for a scroll.
6. Make reduced-motion underline updates immediate.

## Boundaries

- Do not hide the header, animate its position, or add a progress bar.
- Do not add scroll listeners, requestAnimationFrame loops, or dependencies.
- Navigation must remain correct with JavaScript disabled.

## Verification

- Run `bun run check:all`.
- Scroll slowly and quickly on 1440px and 390px viewports; confirm one visible nav item is current.
- Click each nav link and confirm the indicator settles on its target.
- Disable JavaScript and confirm navigation still works.

## Done when

The sticky nav communicates location through one subtle, composited underline without affecting scrolling performance.
