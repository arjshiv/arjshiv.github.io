# Design System

## Source And Intent

This design system adapts the Resend style documented by Refero:
https://styles.refero.design/style/0d914ef0-fa84-4c60-a9aa-cef0b5eb6e5d

The reference contributes its black canvas, graphite rules, restrained violet identifier, serif display type, compact controls, and exact spacing. This site remains an editorial founder story. It must not become a developer-product landing page, a fake terminal, a dashboard, or an effects demo.

The page keeps six sections:

1. Opening
2. ResiDesk
3. How I got here
4. How I work
5. Writing and talks
6. Contact

Do not add a section unless it introduces a genuinely new part of the story.

## Design Tokens

These values are the source of truth for production CSS:

```css
--canvas: #000000;
--surface: #0b0e11;
--surface-raised: #111417;
--hairline: #292d30;
--hairline-strong: #464a4d;
--heading: #ffffff;
--text: #f0f0f0;
--muted: #a1a4a5;
--quiet: #7d8186;
--accent: #baa7ff;
--accent-strong: #d1c7ff;
--focus: #3b9eff;
```

Color rules:

- The canvas is pure black. Surfaces may lift one or two steps, never into blue-gray page chrome.
- White and bone white carry the narrative. Gray is for metadata and supporting detail only.
- Violet identifies links, selected states, and small editorial markers. It is never a large filled CTA or decorative gradient.
- Blue is reserved for keyboard focus. Red, green, and amber are reserved for real status or data semantics.
- All normal text and controls must meet WCAG AA contrast in default, hover, focus, active, and visited states.
- Do not use gradients, glows, texture overlays, translucent glass, or colored page backgrounds.

## Typography

- Hero display: Georgia, Times New Roman, or the system serif stack. Use it only for the primary opening statement and the final invitation.
- Headings and body: Geist, then the system sans-serif stack.
- Labels, dates, numbers, and compact metadata: Geist Mono, then the system monospace stack.
- Hero maximum: 96px on wide screens, 56px on mobile, line-height 0.98.
- Section heading maximum: 56px on wide screens, 36px on mobile, line-height 1.08.
- Body: 17px to 19px, line-height 1.55 to 1.7, with a reading measure near 62 characters.
- Letter spacing is zero. Do not simulate sophistication with compressed tracking.
- Use `text-wrap: balance` for headings and `text-wrap: pretty` for short prose.

## Layout And Rhythm

- Maximum page width: 1200px.
- Base spacing unit: 4px.
- Major section gap: 96px desktop, 64px tablet, 48px mobile.
- Default internal gap: 16px. Dense metadata may use 8px. Large editorial groups may use 32px.
- Section padding: 96px desktop, 64px tablet, 48px mobile.
- Default contained-surface padding: 32px desktop, 20px mobile.
- The reading spine stays near 62 characters. Portraits, media, and selected data rows may use the wider grid.
- Keep the current asymmetric editorial layouts where they clarify the story.
- Cards are unusual. Use a bordered surface only when an item genuinely needs containment.
- Mobile uses one column, preserves generous breathing room, and never scrolls horizontally.

## Borders, Radius, And Elevation

- Use one-pixel graphite borders for section rules, controls, media frames, and true containers.
- Controls use a 6px radius. Repeated media and compact surfaces use 12px to 16px. Large panels may use 24px only when their scale earns it.
- Do not use box shadows for elevation. Hierarchy comes from spacing, contrast, scale, and hairlines.
- Never use offset borders, doubled outlines, clipped hover borders, thick frames, or nested card shells.
- Images receive one quiet graphite frame and a black backing surface.

## Controls And Links

- Primary actions are ghost controls: transparent black, graphite border, white text, 6px radius.
- Hover increases border contrast and may change text to `--accent-strong`. It must never reduce legibility.
- Inline links use the violet accent and an underline offset from the text. Links remain identifiable without hover.
- Every target is at least 44px tall or has an equivalent 44px hit area.
- Focus uses a visible two-pixel `--focus` outline with a two-pixel offset.
- Press feedback may use `scale(0.98)`. Do not move controls enough to disturb layout.

## Motion

- Default transition: 150ms ease-out on color, border-color, opacity, and transform only.
- Never use `transition: all`.
- Motion must be interruptible and should explain hover, focus, expansion, or video loading.
- No scroll-triggered reveal system, loading theater, perpetual decoration, parallax, or background animation.
- Fine-pointer hover effects belong inside `@media (hover: hover) and (pointer: fine)`.
- `prefers-reduced-motion: reduce` removes nonessential transitions and transforms.

## Media And Visuals

- Keep the portrait and the existing talks. They are evidence of a real person and a real body of work.
- Preserve natural image color. Do not hide media under heavy tints, blur, duotone, or atmospheric crops.
- The video facade remains click-to-load and privacy-enhanced.
- Do not add a 3D cube, abstract code object, stock image, generated founder portrait, or decorative illustration merely to imitate the reference.

## Copy

- Start with the actual job, customer, and decision.
- Use first person for beliefs, tradeoffs, mistakes, and lessons.
- Keep the causal chain visible: what happened, what I learned, what I did next.
- State each major number once and put it in its real context.
- ResiDesk is the company Arjun is building, not a test, metaphor, or case-study prop.
- Candor should feel supportive: take the pain seriously, separate symptom from cause, and name the next useful action.
- Remove anything that sounds like a persona funnel, evidence binder, legal brief, generic AI consultancy, or manufactured founder mythology.

## Technical Guardrails

- Six main sections.
- At most 300 DOM nodes.
- At most 12,000px page height at a 390px viewport.
- Useful with JavaScript disabled.
- JavaScript is limited to the click-to-load video facade and essential progressive enhancement.
- No command palette, tool lab, fake terminal, or browser-AI showcase in the primary narrative.
- No duplicate metrics, repeated article grids, or effects whose only purpose is to prove they can run.
- Preserve compatibility with current evergreen browsers and readable fallback behavior in older browsers.

## Enforcement

`DESIGN.md` is the contract for frontend work. Any change to `public/*.html` or `public/*.css` must be checked against it.

- Run `bun run check:design` for design-system drift.
- Run `bun run check:all` before pushing.
- The repository-managed pre-commit hook runs the design check for staged frontend changes.
- Visual QA is required at 390px and 1440px.

Before shipping, verify:

- The portrait never overlaps the title.
- Every text and control state passes WCAG AA contrast.
- Hover and focus borders are visible and never clipped.
- Keyboard focus is obvious.
- No section feels like a card placed inside another card.
- The page works without JavaScript.
- The video facade creates a privacy-enhanced embed.
- The final result feels like one coherent personal site, not a collection of design exercises.
