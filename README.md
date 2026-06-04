# Markdown Notebook

A minimal single-page app: write Markdown on the left, see a live, sanitized
preview on the right. Auto-saves to your browser — no account, no database.

## Stack

- [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- [marked](https://marked.js.org/) — Markdown → HTML
- [DOMPurify](https://github.com/cure53/DOMPurify) — HTML sanitization
- `localStorage` for persistence

## Develop

```bash
npm install
npm run dev
```

Then open the URL Vite prints (default http://localhost:5173).

## Build

```bash
npm run build      # outputs to dist/
npm run preview    # preview the production build locally
```

## Deploy to Vercel

This is a standard Vite app, so Vercel auto-detects everything:

1. Push this repo to GitHub.
2. Import the repo at [vercel.com/new](https://vercel.com/new).
3. Vercel detects **Vite** — Build Command `npm run build`, Output Directory
   `dist`. Click **Deploy**.

Or from the CLI:

```bash
npm i -g vercel
vercel
```
