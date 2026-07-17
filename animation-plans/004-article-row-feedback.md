# 004 - Give article rows click feedback

- **Status**: DONE
- **Commit**: 466ae8e
- **Severity**: LOW
- **Category**: Feedback
- **Estimated scope**: 1 file, about 12 lines

## Problem

`public/styles.css:585-610` changes article-title color on hover, but the large linked rows otherwise feel static.

## Target

Add `transform: translateX(0)` and `transition: color 160ms ease, transform 160ms var(--ease-out)` to `.link-list strong`. On fine-pointer row hover, move only the title to `translateX(3px)`. On pointer press, use `translateX(1px)`. Keyboard focus and active states change color but stay spatially still. Disable translation under reduced motion while retaining color.

## Repo conventions to follow

- Fine-pointer movement lives in the existing hover media query.
- Focus feedback must remain visible through the existing 3px outline.

## Steps

1. Add the explicit title transitions.
2. Extend the existing hover selector with the 3px transform.
3. Add equivalent `:focus-visible` and active states.
4. Remove translation under reduced motion.

## Boundaries

- Do not move the entire row, year, or description.
- Do not add backgrounds, shadows, or card styling.

## Verification

- Run `bun run check:all`.
- Hover, focus, and press each article row at desktop and mobile widths.

## Done when

Rows communicate clickability through a three-pixel title movement that never shifts layout.
