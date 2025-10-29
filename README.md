# MERN Image Search & Multi-Select (Starter Repo)

## What you get
- Full server (Express + Passport + Mongoose) with routes for:
  - OAuth (Google, GitHub, Facebook)
  - POST /api/search
  - GET /api/top-searches
  - GET /api/history
- Client (Vite + React) starter with:
  - Login page (OAuth links)
  - Search page with 4-column grid and checkbox overlay
  - Top searches banner and personal history list
- `.env.example` for server and client

## Quick setup
1. Server:
   - `cd server`
   - `npm install`
   - create `.env` based on `.env.example` and fill keys (Unsplash key, OAuth keys, Mongo URI)
   - `npm run dev`

2. Client:
   - `cd client`
   - `npm install`
   - copy `.env.example` to `.env`
   - `npm run dev`

## Notes
- Unsplash: use a server-side key (UNSPLASH_ACCESS_KEY)
- OAuth: set redirect URIs to `http://localhost:5000/api/auth/<provider>/callback`
- In production, configure session cookie security and HTTPS.

