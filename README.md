# MediaPulse

MediaPulse is a modern Next.js media management and blogging workspace. It demonstrates drag-and-drop media uploads, preview galleries, video streaming controls, social sharing, optimistic image deletion, Markdown-style publishing controls, feed search, and article export actions.

## Stack

- Next.js App Router
- React + TypeScript
- Tailwind CSS
- Lucide React icons
- Framer Motion animations

## Test the website locally

Use these commands from the repository root:

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

### What to manually test

1. Toggle light/dark mode from the header.
2. On mobile width, open and close the sidebar menu.
3. Drag an image (`.jpg`, `.png`, `.webp`, `.svg`) under 10MB into the uploader and confirm the progress bar, thumbnail, and toast appear.
4. Drag a video (`.mp4`, `.mov`, `.webm`) under 100MB into the uploader and confirm the progress bar, preview card, and video modal playback work.
5. Try an unsupported file type or an oversized file and confirm a validation toast appears.
6. Use gallery actions: open preview/lightbox, copy a share link, download an asset, and delete an image after confirming the modal.
7. Edit the blog title/body, verify the slug changes automatically, then test **Save Draft**, **Preview**, and **Publish Instantly**.
8. Search the feed, share a post, and click **Download PDF** to confirm feedback appears.

### Automated smoke test

The repository includes a dependency-free smoke test that verifies the app scaffold and key feature markers are present:

```bash
npm test
```

### Production build check

After dependencies install successfully, run:

```bash
npm run typecheck
npm run build
```

> The UI currently uses browser object URLs and seeded demo data. `lib/media.ts` includes RESTful storage integration patterns for Supabase, Firebase, or Cloudinary-backed implementations.
