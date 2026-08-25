# MediaPulse

MediaPulse is a modern Next.js App Router concept application for fast media management and a complete blogging workflow. It combines a drag-and-drop video/image dashboard, upload feedback, share/download/delete actions, rich publishing controls, article search, and a polished responsive UI.

## Features

- Media dashboard with drag-and-drop and file-picker uploads.
- Client-side validation for 10MB image uploads and 100MB video uploads.
- Real-time simulated upload progress with speed and percentage indicators.
- Image lightbox, HTML5 video preview/player, share links, downloads, and optimistic image deletion.
- Blog editor controls for drafts, preview, instant publishing, cover image upload, tags/categories, feed search, reader preview, comments placeholder, and PDF download affordance.
- Dark/light mode, responsive sidebar, glass panels, micro-interactions, toast alerts, and REST storage integration guidance for Supabase, Firebase, or Cloudinary.

## Getting Started

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Production Storage/API Pattern

Keep storage credentials on the server and expose REST endpoints that mint short-lived signed upload/download URLs. Validate file size and MIME type before upload, persist immutable media metadata, and execute destructive deletes through authenticated API routes with audit logging.
