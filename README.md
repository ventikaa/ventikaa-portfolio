# Avanthikaa — Portfolio

Personal portfolio for Sundari Avanthikaa Srinivasan. Built with **Vite + React**.

## Run locally

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## Build for production

```bash
npm run build      # outputs to dist/
npm run preview    # preview the production build
```

## Deploy

Any static host works — the build in `dist/` is plain files.

- **Netlify / Vercel** — connect the repo (build command `npm run build`, output `dist`), or drag `dist/` into the Netlify dashboard.
- **GitHub Pages** — push the repo, then serve `dist/`. `vite.config.js` uses `base: './'`, so assets resolve on project subpaths without extra config.

## Editing content

All content lives in the data arrays at the top of `src/App.jsx`
(`EXPERIENCE`, `PROJECTS`, `SKILLS`, `CAMPUS`, `PUBLICATIONS`). Colors and type
are CSS variables at the top of `src/styles.css`.

### To fill in before going live
- LinkedIn and GitHub URLs — the two `data-fill` links in the Contact section of `src/App.jsx`.
- Project links — add an `href` to any entry in `PROJECTS` and wire it into the card if you want clickable titles.
- Drop the `wip: true` flag on a project once it ships.
