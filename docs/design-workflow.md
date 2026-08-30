# Frontend Design Workflow

`DESIGN.md` is the source of truth for visual changes. It adapts the linked Refero system to this site's existing founder narrative rather than cloning the reference page.

## Setup

Run once after cloning:

```sh
bun run hooks:install
```

This points Git at `.githooks/`. The pre-commit hook runs `bun run check:design` whenever staged HTML, CSS, the checker, or the design contract changes.

## Before A Frontend Change

1. Read `DESIGN.md`.
2. Preserve the six-section narrative and existing real media.
3. Use the named color, type, spacing, border, control, and motion rules.
4. Keep new CSS free of gradients, elevation shadows, glass effects, and `transition: all`.
5. Check the result at 390px and 1440px.

## Before Push

```sh
bun run check:all
```

The automated checks complement visual review. Passing a checker does not make an incoherent layout acceptable.
