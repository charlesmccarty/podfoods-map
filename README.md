# Bright.Blue × Pod Foods

Building the Future of Connected Retail — a 14-slide presentation built in the
Bright.Blue deck style (near-black stage, blue-to-cyan gradient accents, Nunito
headings on DM Sans body copy).

## Quick start

```bash
npm install
npm run dev
```

Open **http://localhost:5173**

## Controls

- **→ / Space** — next slide
- **←** — previous slide
- **Swipe** — next / previous on touch devices
- **`?slide=N`** — jump to slide N (1–14); the URL tracks the current slide
- **`?clean`** — hide the on-screen nav and render slides already settled, for
  screenshots and PDF export

## Slides

| # | Slide |
|---|---|
| 1 | Cover — Building the Future of Connected Retail |
| 2 | Consumer expectations have fundamentally changed |
| 3 | Today's retail is fragmented |
| 4 | Imagine if everything worked together |
| 5 | The brand journey doesn't end at retail |
| 6 | Europa — full-height screen-fronted units |
| 7 | Hyperion — large-format travel and flagship |
| 8 | Blinx — premium glass-locker display |
| 9 | Connected Retail Intelligence (live dashboard) |
| 10 | One payment infrastructure. Every transaction. |
| 11 | Every interaction creates multiple revenue streams |
| 12 | Why this matters for Pod Foods |
| 13 | The opportunity |
| 14 | Close |

### Machine pages

Each format page (6–8) is a photo collage defined by the `MACHINES` array in
`machines.tsx`. A tile takes a still by default; for footage, drop an mp4 into
`Public/machines/` and set `kind: 'video'` on the tile — it plays muted on loop
in place, no other changes needed.

## Screenshots

With the dev server running:

```bash
npm run shots
```

Captures every slide at 1920×1080 into `.shots/`. Requires Google Chrome at the
standard macOS path.

## Build for static hosting

```bash
npm run build
npm run preview
```

Output goes to `dist/` — deploy that folder to any static host.

## Structure

```
├── main.tsx           # Slide player (keyboard, swipe, deep links)
├── slides.tsx         # Narrative slides
├── opening.tsx        # Opening act carried over from the keynote
├── machines.tsx       # One page per retail format (Europa, Hyperion, Blinx)
├── common.tsx         # Brand logo, hero carousel, footer, shared styles
├── src/               # Theme tokens + slide primitives
├── Public/            # Images and brand assets (Vite publicDir)
└── legacy-deck.html   # The original single-file light-theme deck
```

Slides are authored against a fixed 1920×1080 canvas and scaled as one unit by
`SlideStage`, so the composition holds from a projector down to a phone.
