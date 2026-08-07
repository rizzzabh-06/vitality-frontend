# Vitality Frontend

The standalone web experience for Vitality's authorized security-validation
product. It contains the marketing landing page and the frontend workspace.

This repository intentionally has no direct connection to the backend, S3,
Supabase, an API, an event stream, a database, or a cloud runtime binding.
The backend team owns S3 delivery and every ingestion step. The browser only
renders presentation-ready artifacts after that delivery boundary is provided.

## Local setup

Requirements: Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Open `http://localhost:3000` for the landing page and
`http://localhost:3000/app` for the disconnected frontend workspace.

## Validation

```bash
npm test
```

The tests verify both routes and guard against adding browser-side network,
authentication, storage, or event-stream connections.
