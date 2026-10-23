# Portfolio design direction

## Purpose and audience

This is Juan Guillermo Barrios Villamil's professional portfolio for recruiters and hiring teams considering junior Data Analyst, BI Analyst, Business Analyst, and Operations Analyst roles. The site should make his real engineering and operations background easy to scan and help visitors review his independent demonstrations.

## Content boundaries

- Keep the portfolio personal; do not use another studio, founder, or company identity as the site's brand.
- Use only verified education, role, dates, and experience. Do not create achievements, business outcomes, client names, testimonials, metrics, or advanced skill claims.
- Label every fictional or synthetic dataset and visual clearly. Never imply that a demonstration uses Iron Mountain or customer systems.
- Keep historical design files and alternate drafts out of public routes and navigation unless Juan asks to publish them.
- Keep recruiter paths clear: projects, experience, résumé, education, and contact.

## Visual direction

Use an editorial "operations field notes" direction: warm paper surfaces, charcoal ink, a restrained burnt-copper accent, large expressive serif headlines, and a clean system sans-serif for navigation, forms, and dense information. A dark contact footer may provide a clear closing contrast.

Build a strong reading hierarchy with generous whitespace, concise section labels, varied section compositions, and purposeful project artwork. Avoid a stack of identical cards, ornamental gradients, decorative statistics, fake dashboards that look like employer data, and generic agency language.

The home-page illustration is code-drawn and conceptual. Its curves and bars are illustrative, not analysis outputs. Keep its synthetic/no-company-data label visible.

## Motion and interaction

- Motion must explain a transition, provide orientation, or give immediate input feedback. Do not animate just to fill space.
- Keep repeated controls and navigation immediate. Keep hover and press feedback brief, preferably under 300 ms.
- Use opacity and transforms for entrance or reveal effects; avoid animating large blurs, layout dimensions, or shadows.
- Respect `prefers-reduced-motion`; all content and navigation must remain available without animation.
- Provide keyboard focus, usable touch targets, and a working mobile menu.

## Responsive and accessible layout

Design mobile first. Check the hero, navigation, long role titles, project artwork, contact form, and footer at narrow widths. Prevent horizontal overflow, preserve readable contrast, use semantic headings/landmarks, and ensure links describe their destination.

## Implementation guardrails

- Preserve the existing Next.js App Router, React, TypeScript, and CSS Modules approach.
- Avoid adding dependencies unless a specific need cannot be met with the existing stack.
- Check the running site at desktop and mobile widths when a browser tool is available; otherwise say that visual inspection was not performed.
- Run the checks that already exist and report only actual results.
- Work locally. Do not push, deploy, or change production without explicit authorization.
