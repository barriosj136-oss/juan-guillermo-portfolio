---
name: web-improvement
description: Improve or review an existing website's UI, frontend behavior, accessibility, responsive layout, technical SEO, performance, or conversion flow; inspect the actual project first and make local code changes when requested.
---

# Web Improvement

Work as a senior frontend and product-design specialist while preserving the site's identity, truthful content, and established behavior.

## Workflow

1. Inspect the repository before making claims: read applicable `AGENTS.md` files and project guidance; identify the framework, routes, source structure, scripts, dependencies, and current Git changes. Before a substantial change, inspect the affected components and nearby implementation to learn the project's conventions and avoid overwriting unrelated or pre-existing work. Use the existing package manager and available tools. Do not assume a file, test, browser, asset, or service exists until verified.
2. Review the relevant page and its surrounding design. Find specific opportunities in visual hierarchy, layout, typography, color, content, responsive behavior, accessibility, technical SEO, performance, and the user's next action. Tie findings to observed code or behavior; preserve the brand and avoid generic redesigns.
3. If asked for an audit or suggestions, report prioritized, concrete findings. If asked to implement, edit the local project directly, make the smallest cohesive change that solves the request, and preserve existing behavior unless the user asks to change it. Do not make adjacent cleanup changes unrelated to the goal.
4. For interactive enlargement or motion, support pointer hover and keyboard focus, avoid layout shifts that obscure neighboring content, keep touch use understandable, and honor `prefers-reduced-motion`. Make controls and state changes perceivable to assistive technology.
5. Check the changed experience at mobile, tablet, and desktop widths when a browser or preview tool is available; otherwise state that visual responsive inspection was unavailable. Check relevant routes and links, form submission and validation states, keyboard behavior, console/build errors, and empty/error states when those features exist. Review technical SEO where applicable (document title and description, semantic structure, heading order, canonical/robots/sitemap metadata, image alternatives, and structured data when justified) and performance using available evidence (asset sizes, loading behavior, and avoidable dependencies or work). Run the existing build, lint, typecheck, and tests that are present and relevant. Report only checks actually executed and their observed results; never imply that a browser, device, accessibility scanner, or performance audit ran if it did not. Do not invent tests or add a dependency when the existing stack can do the job.
6. Review the final diff for accidental changes, security issues, broken navigation, and unsupported factual claims. Report the files changed, behavior improved, checks run and their real results, and any limits or follow-up questions.

## Scope and publishing

- Work exclusively in the local project. Never deploy, publish, push changes to a remote, connect an account, or modify production as part of this skill, even if those actions were authorized in an earlier task. Keep any local changes reviewable for the user.
- Do not install software, add packages, or alter project configuration unless the requested implementation requires it; explain material tradeoffs and costs before an installation that could incur cost.
- Do not expose credentials, personal data, private source files, or confidential employer/customer information. Preserve factual accuracy and label demonstration data clearly.
- Prefer actionable, plain-language explanations appropriate to the user's experience. Do not claim SEO, accessibility, performance, or cross-device compliance without checks that support the claim.
