# Juan Guillermo Barrios professional portfolio

Bilingual (English / Spanish) portfolio for Data Analyst, BI Analyst, Business Analyst, and Operations Analyst opportunities. Recruiters can open the web résumé at `/resume`, visit the project demonstrations, and follow the LinkedIn and GitHub profile links. The main site uses Next.js App Router, React, and TypeScript with custom CSS and no UI or chart libraries.

Live site: <https://portfolio-nu-ashy-28.vercel.app>

## Local preview

1. Open PowerShell in this folder.
2. Run `pnpm install` once if dependencies are not present.
3. Run `pnpm dev`.
4. Open `http://localhost:3000`.

In Visual Studio Code, choose **File → Open Folder** and select this `outputs/portfolio` folder. Use **Terminal → New Terminal**, then run `pnpm dev` and open the local address above.

For an optimized local preview, run `pnpm build` then `pnpm start`.

## Routes

- `/` — bilingual portfolio and experience.
- `/resume` — recruiter-friendly bilingual web résumé with project, GitHub, and LinkedIn links. Use **Print / save as PDF** to export a copy from the browser.
- `/projects/operations-data-review-suite` — case study with embedded interactive app.
- `/operations-data-review-suite/index.html` — standalone interactive app.
- `/projects/novatech` — synthetic monthly performance case, data model, SQL, and Python checks.
- `/projects/operations-decision-copilot` — fictional bilingual decision-support demonstration.

## Vercel

The app builds for production with Next.js and needs no environment variables. It is live on Vercel, and this local folder is linked to the existing Vercel project. The GitHub repository is private and pushed to `main`; automatic deployment on each GitHub push still needs the Git provider connection completed. See [VERCEL-PUBLISHING-GUIDE.md](VERCEL-PUBLISHING-GUIDE.md) for its current state. The app source is the Git repository root. Private CV source files and certificates stay outside the repository.

## Data and privacy

Portfolio demonstrations use synthetic data and are not connected to Iron Mountain, customers, spreadsheets, or external business systems. Internal account or invoice volumes are not published. Do not commit credentials, `.env` files, customer data, certificates, national identifiers, or private CV copies.
