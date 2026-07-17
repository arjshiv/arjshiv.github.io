# 002 - Clarify the video affordance

- **Status**: DONE
- **Commit**: 466ae8e
- **Severity**: LOW
- **Category**: Feedback
- **Estimated scope**: 1 file, about 15 lines

## Problem

`public/styles.css:526-578` gives the video press feedback but no fine-pointer hover feedback. The static media block does not immediately read as pressable.

## Target

Inside the existing fine-pointer media query, transition the facade image with `transform 180ms var(--ease-out)` and the play arrow with `transform 140ms var(--ease-out)`. Hover or `:focus-visible` moves the image from `scale(1)` to `scale(1.012)` and the arrow from `translateX(1px)` to `translateX(3px)`.

## Repo conventions to follow

- Hover movement belongs inside `@media (hover: hover) and (pointer: fine)`.
- Use the existing `--ease-out` token and explicit transition properties.

## Steps

1. Add transform transitions to `.video-facade img` and `.play-label > span`.
2. Add fine-pointer hover selectors for the two target transforms.
3. Keep keyboard focus and native Space/Enter active states static, relying on the existing 3px focus outline.
4. Remove both movement transforms under reduced motion while retaining existing color and opacity feedback.

## Boundaries

- Do not animate the whole video block or change its layout.
- Do not exceed `scale(1.012)` or 180ms.
- Do not add keyframes.

## Verification

- Run `bun run check:all`.
- Compare mouse, keyboard, and touch behavior.
- At 10% playback speed, confirm the image stays clipped and no edge flashes appear.

## Done when

The media block reads as clickable through subtle feedback without moving on keyboard focus, touch, or for reduced-motion users.
