# Contact form: local-development behavior

The current contact form is a local preview feature, not a production inbox.

- In `pnpm dev`, a visitor can submit a message with explicit consent to local storage.
- The API validates the origin, field lengths, allowed topic, message, consent, request size, and a hidden spam field. It applies a small in-memory rate limit.
- Valid messages are appended to `.local-data/contact-submissions.jsonl`, which is ignored by Git and excluded from `public/`.
- The endpoint returns 404 outside development. It does not send email, contact anyone, or start a marketing sequence.
- There is no authenticated admin panel. To review local test messages, open `.local-data/contact-submissions.jsonl` in VS Code. Treat it as private personal data and remove it when no longer needed.
- Before enabling public contact in a hosted environment, choose a trusted storage/email provider, configure consent and privacy disclosures, and add server-side access controls and retention rules. Do not expose the local JSONL file or place credentials in source files.

Optional local path configuration is documented in `.env.example`. The checked-in example contains no secret values.
