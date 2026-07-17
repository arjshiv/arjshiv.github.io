# 003 - Move arrows in their stated direction

- **Status**: DONE
- **Commit**: 466ae8e
- **Severity**: LOW
- **Category**: Spatial consistency
- **Estimated scope**: 2 files, about 25 lines

## Problem

Directional arrows in `public/index.html:94-95`, `124`, `251`, and `307-309` remain static while their labels change state. The arrow semantics already distinguish in-page and external movement, but the feedback does not reinforce that distinction.

## Target

Give every decorative arrow a `.direction-arrow` class plus either `.is-down` or `.is-external`. Transition only `transform` over `140ms var(--ease-out)`. On fine-pointer hover, external arrows move `translate(2px, -2px)` and downward arrows move `translateY(2px)`. On pointer press, return them halfway toward rest. Keyboard focus and active states remain static and use the existing outline. Reduced motion keeps arrows still.

## Repo conventions to follow

- Arrows remain `aria-hidden="true"`.
- Hover movement is fine-pointer gated; keyboard focus gets the same directional state.

## Steps

1. Normalize decorative arrow spans in `public/index.html`, including contact links that currently contain raw arrow text.
2. Add base and fine-pointer hover state selectors in `public/styles.css`.
3. Keep transforms composited and under 160ms.
4. Disable arrow translation for reduced-motion users.

## Boundaries

- Do not alter link text, destinations, sizing, or layout gaps.
- Do not animate arrows continuously.

## Verification

- Run `bun run check:all`.
- Tab through every arrow link and confirm the correct direction.
- Confirm arrows do not move on touch or reduced motion.

## Done when

Every directional arrow gives consistent, restrained spatial feedback without changing layout.
