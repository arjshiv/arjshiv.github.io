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

- Paper base: warm tinted off-white, never pure white.
- Ink: warm charcoal, never pure black.
- Red: primary action, active state, module index, strongest emphasis.
- Yellow: attention panels, proof highlights, tactile buttons.
- Blue: proof bands, media backing plates, selected secondary panels.
- Green: start-here and operational panels.

Use OKLCH tokens only for new colors. Do not introduce purple, neon blue, glass gradients, or generic gray text on colored panels. Text on color must use ink, paper, or a darker shade of the panel, never washed neutral gray.

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

## Copy System

- Copy stays close to the transcript voice: practical, candid, context-heavy.
- Replace abstractions with the job being done.
- Prefer "what happens next" over "workflow orchestration."
- Prefer "read every text by hand" over "at scale" when explaining the practical problem.
- Keep the anti-demo point, but do not overuse it.

## Known Quality Bar

Flagship personal site. It should be visually distinctive, highly readable, responsive, fast, and clean enough that future edits can follow the documented system instead of adding another override pile.
