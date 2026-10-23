---
name: self-hosted-marketing
description: Plan or build locally controlled marketing and contact-management tools, with explicit attention to privacy, access control, storage, and operational limits.
---

# Self-Hosted Marketing

Inspect the current application, hosting model, persistence, authentication, backups, and dependencies before choosing an architecture. Distinguish local development storage from production-ready storage: local files, browser storage, and ephemeral serverless filesystems do not provide a secure multi-user production CRM.

Keep contact records private and outside public/static directories and Git. Use server-side validation, access control for any management interface, bounded input sizes, spam controls, and clear retention/export/deletion behavior appropriate to the chosen storage. Do not expose contact data in logs, browser responses, source control, or public assets.

Prefer the smallest maintainable solution that fits verified infrastructure. Explain hosting, backup, security, and cost assumptions. Work locally; do not connect providers, create accounts, send campaigns, deploy, publish, or change production unless the user explicitly asks and authorizes that specific operation. Report implementation limits rather than presenting a local prototype as production-ready.
