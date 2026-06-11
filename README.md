# Abernethy PTA Website

Lightweight static site for [supportabernethy.org](https://supportabernethy.org), built with [Eleventy](https://www.11ty.dev/). Eight pages, all plain-text Markdown. Designed so the board almost never has to touch it.

## Who has to do what (the short version)

| Role | Routine task | How |
| --- | --- | --- |
| Secretary | Post agendas & minutes | Upload the PDF to the shared Drive folder. **No site edit.** |
| Treasurer | Post budgets & reports | Upload to the budget Drive folder. **No site edit.** |
| President | Annual: new meeting dates, event dates, directory names | Edit 3 files on GitHub.com, once a year (see checklist) |

## One-time setup: Drive folders

The Meetings and Finance pages read three folder IDs from `src/_data/site.json`:

```json
{
  "minutesFolderId": "",   // current-year agendas & minutes
  "archiveFolderId": "",   // past years' minutes
  "budgetFolderId": ""     // budgets & financial reports
}
```

For each: create (or pick) a folder in the PTA Shared Drive → Share → "Anyone with the link: Viewer" → copy the ID from the folder's URL (`drive.google.com/drive/folders/THIS-PART`) → paste it into `site.json`. Until an ID is filled in, the pages show a graceful fallback.

The minutes folder is **embedded** on the Meetings page, so uploaded files appear there automatically. Tip: name files like `2026-09-17 Community Minutes.pdf` so they sort by date.

## Editing a page

Pages live in `src/` — folders match URLs (`src/events/index.md` → `/events/`). It's [Markdown](https://www.markdownguide.org/basic-syntax/): `## Heading`, `**bold**`, `[text](url)`. On GitHub.com: click the pencil, edit, commit — the site redeploys in about a minute.

The `---` block at the top controls the title and navigation; you'll rarely need to change it.

## Annual checklist (president, ~30 minutes each summer)

1. `src/meetings/index.md` — replace the schedule table with next year's dates; secretary moves last year's PDFs from the current folder to the archive folder
2. `src/events/index.md` — new event dates
3. `src/directory/index.md` — new officers and chairs
4. `src/give-volunteer/index.md` — Annual Appeal kickoff date

## Site structure

- `/` Home · `/get-connected/` · `/give-volunteer/` · `/events/` · `/programs/` · `/meetings/` · `/directory/` · `/finance/`
- `src/_includes/base.njk` — the single page template (header, nav, footer — the check request form is in footer quick links)
- `src/css/style.css` — all styles
- `board-docs/` — **not published.** Board-internal reference (PTA account setup, committee email how-to, the 2015–2026 minutes link archive). Worth pasting into Google Docs in the Shared Drive.

## Running locally (optional)

Requires [Node.js](https://nodejs.org): `npm install`, then `npm start` (serves at localhost:8080, live-reloads). `npm run build` writes the site to `_site/`.

## Deploying

Pushes to `main` auto-deploy via GitHub Actions to GitHub Pages (`.github/workflows/deploy.yml`). Point supportabernethy.org at it via the repo's Pages custom-domain settings. Also works on Netlify/Cloudflare Pages (build `npm run build`, output `_site`).
