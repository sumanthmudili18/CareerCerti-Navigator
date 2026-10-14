# CareerCert Navigator (frontend + backend combined)

    npm install
    JWT_SECRET=some-long-random-string npm start     # Windows PowerShell: $env:JWT_SECRET="..."; npm start
    open http://localhost:3000

Layout: server.js (Express API + serves the site), index.html, css/style.css, js/data.js, js/app.js.
Data is stored in data/db.json (created automatically).

How they connect: js/app.js calls /api/auth/register, /api/auth/login, /api/me,
/api/bookmarks (GET/PUT) and /api/tickets (POST) on the same origin; the JWT is kept in localStorage.

## Using VS Code Live Server
Terminal 1 (backend): `npm install` then `npm start`  -> API on http://localhost:3000
Then right-click index.html -> "Open with Live Server" (http://127.0.0.1:5500). Keep the backend running.

## GitHub
- Codespaces: Code -> Codespaces -> Create. The server starts automatically; open the forwarded port 3000.
- Render: New -> Blueprint -> pick this repo (uses render.yaml). Note: free tier storage is not permanent, so data/db.json can reset.
