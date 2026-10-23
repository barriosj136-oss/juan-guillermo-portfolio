# Portfolio validation report

Date: October 22, 2026

## Production and routes

- Added a continuous, bilingual “What I build” card marquee with pause control, hover/focus pause, and a static layout for reduced-motion preferences; the production build and TypeScript checks passed after this change.
- Vercel production deployment is ready at <https://portfolio-nu-ashy-28.vercel.app>. Latest pushed commit deployment: `portfolio-79rxjyyr1-juguibavi27-7134s-projects.vercel.app`.
- Anonymous HTTP requests to `/` and `/resume` returned status 200; `/resume` contains the updated résumé, print action, and GitHub link.
- `pnpm build` completed successfully on this checkout. TypeScript passed and Next.js generated the portfolio, résumé, and three project routes.
- The production server returned HTTP 200 for `/`, `/resume`, `/projects/novatech`, `/projects/operations-data-review-suite`, and `/projects/operations-decision-copilot`.
- `git diff --check` passed before the latest content commit.

## Recruiter access and editor

- The home page links to the bilingual `/resume` page, LinkedIn, GitHub profile, and each project demonstration.
- The résumé page is bilingual and includes a **Print / save as PDF** control. The page's print stylesheet hides navigation controls and formats the résumé for printing.
- Seven local CV copies were created with a clickable portfolio link: six revised v2 role variants and the revised v3 English master. Source documents remain unchanged and these CV files are not included in the public repository.
- Structural checks confirmed each copy contains an external hyperlink to the public portfolio. Visual document rendering could not run because the required bundled LibreOffice renderer was unavailable; these DOCX copies are not considered visually verified.
- Visual Studio Code 1.142.0 was installed from the Microsoft winget source. Workspace settings enable save formatting, two-space indentation, the workspace TypeScript version, and hide generated folders. The PowerShell extension is recommended, not installed automatically.

## Git and deployment workflow

- The public GitHub repository is <https://github.com/barriosj136-oss/juan-guillermo-portfolio>, branch `main`.
- The local folder is linked to the Vercel project `portfolio`.
- `pnpm dlx vercel git connect --yes` reported success. A push to `main` created a new Production deployment and it reached Ready.
- `.env.local` and `.vercel/` are ignored by Git and were not committed.

## Privacy and limitations

- The portfolio uses fictional demonstration data and does not connect to Iron Mountain or customer systems.
- No CV, certificate, personal email, account-volume figure, customer data, or credential was committed to the website repository.
- The automated verification checked server responses, build output, route availability, and hyperlink structure. A new visual desktop/mobile browser review was unavailable because browser use is disabled in Work settings.
