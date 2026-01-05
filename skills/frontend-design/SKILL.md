---
name: frontend-design
description: Create distinctive, production-grade frontend interfaces (components, pages, apps) with a bold, intentional aesthetic; avoid generic AI layouts and follow ResiDesk typography/theme tokens when applicable.
metadata:
  short-description: Distinctive frontend UI design
---

# Frontend Design Skill

Use this skill when the user asks to build web components, pages, or applications. The goal is
to produce creative, polished, production-grade UI that avoids generic "AI slop" aesthetics.

## Workflow

1) **Design thinking first**
   - **Purpose**: What problem does this interface solve? Who uses it?
   - **Tone**: Commit to a clear aesthetic (brutalist, editorial, industrial, soft, etc.).
   - **Constraints**: Framework, performance, accessibility, existing design system.
   - **Differentiation**: Decide the one memorable visual idea and execute it.

2) **Implement real code**
   - Build working HTML/CSS/JS or framework components (React/Vue/etc.).
   - Match implementation complexity to the aesthetic vision.

3) **Polish**
   - Typography hierarchy, spacing rhythm, and visual tension.
   - One strong motion moment (page-load stagger or hero reveal) over scattered micro-motions.
   - Backgrounds/texture for atmosphere, not flat single-color panels.

## Frontend Aesthetics Guidelines

### Typography
- **ResiDesk**: Space Grotesk for headings, Geist for body.
- Use tight letter spacing (`-0.05em`) for headings and UI elements.
- Avoid generic fonts (Inter, Roboto, Arial, system stacks).

### Color & Theme
- Commit to a cohesive palette; use CSS variables for consistency.
- Prefer dominant colors with sharp accents over timid, evenly distributed palettes.
- **ResiDesk tokens only**: `bg-background`, `text-foreground`, `border-border`, `bg-muted`,
  `hsl(var(--variable))`.
- **Never hardcode** colors (white/black/hex) when ResiDesk tokens apply.

### Motion
- Use high-impact motion: page-load staggered reveal or a single hero animation.
- Prefer CSS-only animation for HTML; use Motion library in React when available.

### Spatial Composition
- Embrace asymmetry, overlap, diagonal flow, or grid-breaking elements.
- Use either generous negative space or intentional density.

### Backgrounds & Visual Detail
- Add depth with gradients, noise, patterns, layered transparency, or custom borders.
- Avoid flat single-color backgrounds when a richer atmosphere fits the concept.

## ResiDesk Typography System (if applicable)
- **Headings**: Space Grotesk (h1–h6)
- **Body**: Geist
- Both are loaded via Google Fonts and configured in Tailwind.
- Reference `/brand-hub` for full guidelines.

## Dark Mode Requirements (if applicable)
- Use theme tokens only; dark mode is automatic via CSS variables.
- Use `useTheme()` when conditional theme logic is needed:
  `import { useTheme } from '../contexts/ThemeContext'`

## Non-Goals
- Do not default to generic layouts, default font stacks, or purple-on-white gradients.
- Do not produce placeholder/mock-only styling; ship working, production-grade UI.
