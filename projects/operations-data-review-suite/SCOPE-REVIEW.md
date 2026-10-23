# Operations Data Review Suite scope and migration note

The original standalone app remains at `projects/operations-data-review-suite`. The Next.js portfolio links to a case-study route and serves a synchronized static copy of the app from `public/operations-data-review-suite`. The six-view tool is still vanilla HTML/CSS/JavaScript, not rewritten as React components. Its portfolio case study is a Next.js App Router page. The app now has an English/Spanish interface.

## Current feature inventory from source

- Six navigation views: Dashboard NA, Baseline Search, RMS Listing, CSV Generator, Follow-up Queue, Knowledge Base.
- Synthetic dashboard filters and charts; dashboard CSV template and CSV upload.
- Exact, normalized, and partial baseline reference matching with CSV export.
- Listing search, status/unit filters, sort, pagination, add/edit, CSV import/export, and local snapshot publish/clear.
- Batch CSV generator for reason, note, and combined output plus template.
- Follow-up form, checklist, local notes, CSV download, and print.
- Knowledge note search/filter/create/edit/remove/print.
- Light/dark theme and reset to included synthetic sample.
- English/Spanish UI switch and persistent local language selection.
- Reference normalization tested with punctuation, case, spaces, and leading zeroes.

## Limits

- Uses fabricated sample records; no employer/customer system is connected.
- CSV import only; XLSX import is not included.
- Storage is browser-local and can be cleared by browser settings or the reset action.
- No server, login, external API, or Sheets sync.
- Standalone suite remains English-only while bilingual site content is under development.
- Authorship note updated from the user's clarification: Juan Barrios states that he independently implemented the demonstration; another person contributed the idea referenced by an earlier footer.

## Behavior preservation

The Next.js case page embeds the source app as a static browser demo rather than changing the internal implementation. The static copy is refreshed at dev/build time from the source folder using `scripts/sync-demo.mjs`. A full client-side React/TypeScript rewrite is a future engineering step because no dependency install/build validation was available during this pass; current function behavior was not presumed to have been re-tested.
