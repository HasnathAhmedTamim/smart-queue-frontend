# Smart Queue Frontend

Frontend application for a real-time queue system built with Next.js (App Router), React, TypeScript, and Tailwind CSS.

## Overview

This app provides three views:

- Customer view (`/`): take a token and see live queue summary.
- Admin dashboard (`/admin`): call next token and inspect live history by status.
- Public display (`/display`): fullscreen-friendly "Now Serving" board.

Queue updates are received via Server-Sent Events (SSE), so customer/admin/display pages stay in sync in near real time.

## Features

- Create token by selected service and optional customer name.
- Dynamic services list from API with fallback services when unavailable.
- Admin "Call Next" action using `X-Admin-Key` header.
- Live connection status indicator: `connecting`, `live`, `offline`.
- Live admin history tabs: `waiting`, `serving`, `done`.
- Dedicated display screen with drawer menu and fullscreen action.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- ESLint

## Prerequisites

- Node.js 20+
- A running Smart Queue backend API that supports endpoints listed below

## Environment Variables

Create `.env.local` in project root:

```env
NEXT_PUBLIC_API_BASE=http://localhost:8000
```

Notes:

- `NEXT_PUBLIC_API_BASE` is required.
- The app throws on startup if this variable is missing.
- Ensure backend CORS allows your frontend origin (for local dev, typically `http://localhost:3000`).

## Run Locally

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Open:

- `http://localhost:3000` (customer page)
- `http://localhost:3000/admin` (admin dashboard)
- `http://localhost:3000/display` (display board)

## Available Scripts

- `npm run dev` - run local dev server
- `npm run build` - create production build
- `npm run start` - run production server
- `npm run lint` - run ESLint

## Backend API Contract

This frontend currently calls:

- `POST /api/tokens` - create token
- `GET /api/services` - list available services
- `POST /api/queue/next` - call next token (requires `X-Admin-Key`)
- `GET /api/tokens?status={waiting|serving|done}&limit={n}` - list tokens by status
- `GET /api/stream/queue` - SSE stream for queue updates

Expected SSE `queue` event payload shape:

```json
{
	"current_token": "A-001",
	"waiting": 12
}
```

## Project Structure

Key files and folders:

- `src/app/page.tsx` - customer page
- `src/app/admin/page.tsx` - admin dashboard
- `src/app/display/page.tsx` - queue display page
- `src/hooks/useQueueSSE.ts` - SSE connection and reconnect logic
- `src/lib/api.ts` - frontend API client
- `src/lib/env.ts` - required environment variable handling
- `src/components/*` - UI components (token form, admin controls, tables, etc.)

## Known Behavior

- If SSE disconnects, the client marks status `offline` and retries every 1 second.
- Admin history refreshes silently on live queue events.
- Admin key defaults to `dev-admin-key` in UI and can be changed before calling next.
