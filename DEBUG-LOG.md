# Debug log

Real problems I ran into while building 10X Shop, newest at the bottom.
Format for every entry: symptom → reproduction → tool → root cause → fix → lesson.

## 1. TypeScript 7 from the Vite template breaks typescript-eslint

- **Date:** 1 Nov 2026
- **Symptom:** the fresh Vite template came with TypeScript 7 and oxlint. Adding ESLint with `typescript-eslint` (required by the PRD) failed with a peer-dependency conflict.
- **Reproduction:** `npm create vite@latest … --template react-ts` → `npm install -D typescript-eslint` → npm reports `ERESOLVE` (peer `typescript >=4.8.4 <6.1.0`).
- **Tool:** npm error output, then `npm view typescript-eslint peerDependencies` to see the supported range.
- **Root cause:** the template installs the newest TypeScript major, and the linter plugin does not support it yet.
- **Fix:** pinned `typescript` to `~6.0.3`, replaced oxlint with ESLint 10 + typescript-eslint + react-hooks, removed the template boilerplate — [0a227e2](https://github.com/kiberdave/10x-shop-Dato_Chaduneli/commit/0a227e2).
- **Lesson:** a starter template is not automatically compatible with the project's required tools; check peer dependencies before adding a plugin.

## 2. `npm` blocked by the PowerShell execution policy

- **Date:** 1 Nov 2026
- **Symptom:** `npm -v` printed `npm.ps1 cannot be loaded because running scripts is disabled on this system`, while `node -v` worked.
- **Reproduction:** Windows PowerShell 5.1 with the default policy → run any `npm` command.
- **Tool:** the error text and the `about_Execution_Policies` help page it links to.
- **Root cause:** on Windows, `npm` starts through the `npm.ps1` script, and the default policy (`Restricted`) forbids running `.ps1` scripts.
- **Fix:** `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned` (local scripts allowed, unsigned downloaded scripts still blocked). No code change.
- **Lesson:** when a command works in one place and fails in another, read the exact error — here it pointed to a system setting, not to Node.

## 3. VS Code terminal does not find `npm`

- **Date:** 1 Nov 2026
- **Symptom:** in the VS Code terminal `npm create vite …` failed with `The term 'npm' is not recognized`, but the same command worked in a separate PowerShell window.
- **Reproduction:** VS Code opened before Node.js was added to PATH → new terminal inside that VS Code → `npm -v`.
- **Tool:** comparing `node -v` / `npm -v` in both terminals; checking `$env:Path`.
- **Root cause:** a running VS Code keeps the PATH it started with, so its terminals did not see the Node.js folder.
- **Fix:** reloaded PATH in the session (`$env:Path = [Environment]::GetEnvironmentVariable("Path","Machine") + ";" + …`); restarting VS Code fixes it permanently. No code change.
- **Lesson:** environment variables are read when a program starts; after installing tools, restart the editor.

## 4. Vercel could not see the new repository

- **Date:** 1 Nov 2026
- **Symptom:** on Vercel → Add New → Project, the import list showed only two older repositories, not `10x-shop-Dato_Chaduneli`.
- **Reproduction:** Vercel's GitHub App installed with "Only select repositories" → create a new repository → open the import list.
- **Tool:** the Vercel import screen and GitHub → Settings → Applications → Vercel → Repository access.
- **Root cause:** the GitHub App had access only to the repositories selected earlier.
- **Fix:** "Adjust GitHub App Permissions" → added the repository → Import → Deploy. No code change; deploy works with every push to `main`.
- **Lesson:** deploy problems are not always in the code — check access and integrations first.

## 5. `robots.txt` returned the app's HTML

- **Date:** 6 Nov 2026
- **Symptom:** Lighthouse SEO was 92 with the audit "robots.txt is not valid — 38 errors found". The "errors" were the lines of our own page: `<!doctype html>`, `<html lang="en">`, `<head>` …
- **Reproduction:** deploy with the SPA rewrite in `vercel.json` (`"/(.*)" → "/index.html"`) and no `robots.txt` in `public/` → open `https://10x-shop-dato-chaduneli.vercel.app/robots.txt` → the store's `index.html` comes back with status 200.
- **Tool:** Lighthouse (Mobile, SEO section — it lists every line it could not parse), then opening `/robots.txt` directly in the browser.
- **Root cause:** the rewrite sends every path that is not a real file to `index.html`. There was no real `robots.txt`, so crawlers got HTML instead of rules.
- **Fix:** added `public/robots.txt` (`User-agent: *` / `Allow: /`). Vite copies it to `dist/`, and Vercel serves real files before applying rewrites — [b4d8eb5](https://github.com/kiberdave/10x-shop-Dato_Chaduneli/commit/b4d8eb5).
- **Lesson:** a catch-all rewrite also catches the files that crawlers and browsers ask for by convention (`robots.txt`, `favicon.ico`); they must exist as real files.
