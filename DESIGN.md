# Design System

## Direction

This is a calm editorial founder site with one mechanical edge. It should read like Arjun explaining his work to another thoughtful operator, not like a dashboard, a press packet, or an AI demo.

The page has six sections:

1. Opening
2. ResiDesk
3. The path here
4. How I work
5. Writing and talks
6. Contact

Do not add a section unless it introduces a genuinely new part of the story.

## Visual System

Use four color roles:

- Paper: cool near-white
- Ink: dark teal-black
- Muted ink: supporting copy and metadata
- Accent: restrained teal for links, numbers, and section markers

New colors should use OKLCH with a hex fallback. Do not introduce gradients, glows, beige, purple, warm retro colors, or random card fills.

Use Geist for headings and body copy. Use Geist Mono only for navigation, dates, numbers, and short labels. Headings use text-wrap: balance; short body copy uses text-wrap: pretty.

## Layout

- The reading spine is about 62 characters wide.
- The hero and major data rows may break out to the wider page grid.
- Every section begins with a thin rule and a small numbered mono label.
- That rule-and-label pattern is the one surviving mechanical gesture.
- Most hierarchy comes from whitespace, type, and alignment.
- Cards are unusual. Use a card only when a surface genuinely needs containment.
- Mobile collapses to one column with no horizontal scrolling.

## Surfaces

- Use 1px rules for section and row separation.
- Portraits and media get a neutral inset outline.
- Buttons use transparent layered shadows instead of hard borders.
- Radius is small and quiet.
- Nested radii must be concentric.
- Do not restore hard offset shadows or thick retro frames.

## Interaction

- The page must remain useful with JavaScript disabled.
- Use JavaScript only for the click-to-load video facade.
- Interactive transitions must be interruptible and under 200ms.
- Never use transition: all.
- Press feedback uses scale(0.96).
- Hover motion is gated behind fine-pointer media queries.
- Reduced-motion users get instant state changes.
- Every interactive target is at least 44px tall.

## Copy

- Start with the actual job, customer, and decision.
- Use first person for beliefs and lessons.
- Keep the causal chain visible: what happened, what I learned, what I did next.
- State each major number once.
- Do not turn ResiDesk into a metaphor. It is the company Arjun is building.
- Candor should feel supportive: take the pain seriously, separate symptom from cause, and name the next useful action.
- Remove anything that sounds like a persona funnel, research binder, legal brief, or generic AI consultancy.

## Guardrails

- Six main sections
- At most 350 DOM nodes
- At most 10,000px page height at 390px viewport width
- No command palette
- No tool lab
- No scroll-triggered reveal system
- No decorative perpetual animation
- No repeated proof metrics
- No duplicate article grids

## Quality Check

Before shipping:

- Read the page once at 390px and once at 1440px.
- Check that the portrait never overlaps the title.
- Check all text and controls at WCAG AA contrast.
- Confirm keyboard focus is visible.
- Confirm the page works without JavaScript.
- Confirm the video facade creates a privacy-enhanced embed.
- Run bun run check:all.
