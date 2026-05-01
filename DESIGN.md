# Design System

## Design Direction

Polished retro operating manual: warm paper, hard ink, ticket controls, printed labels, and restrained red, blue, green, and yellow panels. The site should feel like a physical reference binder for applied AI and housing operations, not a novelty arcade skin.

Reference family:

- RetroUI-style hard borders and tactile surfaces.
- Nothing-inspired mechanical labeling and grid discipline.
- Taste Skill anti-slop rules: no generic SaaS gradients, no empty decorative cards, no fake polish that breaks layout.
- Impeccable rules: brand register, concrete voice, no side-stripe accents, no gradient text, no glassmorphism by default, no identical card-grid monotony when another structure fits better.

## Physical Scene

A partner or operator is reading the site on a laptop during the workday, probably between calls, trying to decide whether Arjun's work is specific and real. The page should be light, legible, fast to scan, and tactile enough to be memorable.

## Color Strategy

Full palette, but controlled by role.

- Paper base: pale aqua-cream, never pure white.
- Ink: dark teal-black, never flat black.
- Teal-blue: main active state, proof bands, media backing plates, selected primary panels.
- Seafoam and mint: start-here panels, operational cards, secondary rhythm.
- Soft citrus: small highlights and tactile shadows, not the dominant field color.
- Coral: module index, tiny warning/active accents, never the main palette.

Use OKLCH tokens only for new colors. Do not introduce purple, neon blue, glass gradients, beige dominance, or generic gray text on colored panels. Text on color must use ink, paper, or a darker shade of the panel, never washed neutral gray.

## Typography

Use Geist and Geist Mono only.

- Geist: body, long-form copy, explanatory text, navigation labels that need readability.
- Geist Mono: display titles, module labels, numbers, compact technical labels, buttons.
- Large headings can use hard shadow sparingly, but the shadow must never reduce readability.
- Body copy should sit around 55 to 68 characters per line where possible.
- Mobile headings must wrap deliberately. No single-word orphan lines when avoidable.
- Avoid all-caps for paragraph-length copy. Reserve caps for short labels only.

## Layout

- Page width stays constrained around the existing max width.
- Sections should have a visible rhythm: heading, content, proof or links. Avoid giant empty slabs.
- Hero can be asymmetric. Utility and content sections should favor readable grids.
- Cards are allowed when they behave like physical printed objects. Do not nest cards inside cards.
- Avoid full-width heavy-bordered rows unless the row is genuinely a table or control.
- Use centered or constrained accordions for FAQ-like content, not edge-to-edge slabs.
- Mobile layouts collapse to one column with stable touch targets and no horizontal scroll.

## Surface Rules

- Borders are hard ink, usually 2px or 3px. Use 4px only for primary hero or major proof modules.
- Radius stays tight: around 0.18rem to 0.35rem for retro surfaces.
- Shadows are hard offset shadows using the ink token. They must not be clipped by containment.
- Surface backgrounds should be intentional: paper, cream, yellow, blue, green, or red-tinted paper.
- Every repeated card set needs a clear visual system, not random color alternation.

## Interaction

- Buttons and cards should feel tactile: short transform on hover or active, hard-shadow compression, visible focus ring.
- Accordions should have consistent closed and open states.
- Anchor navigation must not produce awkward scroll positions.
- Motion should be quick, transform/opacity-only, and respect reduced motion.
- Do not use animated states that temporarily reduce text contrast.

## Interface Detail Rules

Reference: Jakub Krehel's "Details That Make Interfaces Feel Better".

- Headings use `text-wrap: balance`; paragraph copy uses `text-wrap: pretty`.
- All visible numeric labels, counters, dates, and module indexes use tabular numbers.
- Root text stays antialiased for crisp rendering.
- Interactive motion must be interruptible. Use transitions for hover, active, menu, and text-swap states; keyframes are only for staged entrance.
- Press feedback uses `scale(0.96)` exactly where it does not distort layout.
- Images and embeds get a subtle inset outline so media edges stay crisp on paper surfaces.
- Use optical alignment for arrows and tiny symbols; do not trust geometric centering when the icon shape reads off.
- Prefer soft layered depth for secondary repeated cards. Keep hard retro borders for major panels and controls only, so the page does not become visually noisy.
- Nested surfaces must use concentric radii: outer radius equals inner radius plus the visible padding.

## Copy System

- Copy stays close to the transcript voice: practical, candid, context-heavy.
- Replace abstractions with the job being done.
- Prefer "what happens next" over "workflow orchestration."
- Prefer "read every text by hand" over "at scale" when explaining the practical problem.
- Keep the anti-demo point, but do not overuse it.

## Known Quality Bar

Flagship personal site. It should be visually distinctive, highly readable, responsive, fast, and clean enough that future edits can follow the documented system instead of adding another override pile.
