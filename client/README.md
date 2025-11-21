Client (React + Vite)

This folder is a minimal React frontend that hits the backend API at the same origin under `/api/*`.

Quick start (PowerShell):

# from repository root
cd .\client
npm install
npm run dev

Notes:
- The client expects the backend to be reachable at the same origin under `/api/contacts`, `/api/projects`, `/api/services`, `/api/users`.
- If your backend runs on a different port during development (for example backend on http://localhost:5000), configure a proxy or run both and use full URLs in `src/api.js` by replacing `baseUrl`.
- The frontend uses a single generic `CrudPage` component. It performs GET/POST/PUT/DELETE for each resource.
