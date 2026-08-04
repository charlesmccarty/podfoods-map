# Bright.Blue × Pod Foods

Building the Future of Connected Retail — an 11-slide presentation built in the
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
- **`?slide=N`** — jump to slide N (1–11); the URL tracks the current slide
- **`?clean`** — hide the on-screen nav and render slides already settled, for
  screenshots and PDF export

## Slides

| # | Slide |
|---|---|
| 1 | Cover — Building the Future of Connected Retail |
| 2 | Traditional Retail makes sales / Connected Retail builds relationships |
| 3 | The brand journey doesn't end at retail |
| 4 | The Connected Retail Platform |
| 5 | One platform. Three retail formats. |
| 6 | Connected Retail Intelligence |
| 7 | One payment infrastructure. Every transaction. |
| 8 | Every interaction creates multiple revenue streams |
| 9 | Why this matters for Pod Foods |
| 10 | The opportunity |
| 11 | Close |

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
├── slides.tsx         # All 11 slides
├── common.tsx         # Brand logo, hero carousel, footer, shared styles
├── src/               # Theme tokens + slide primitives
├── Public/            # Images and brand assets (Vite publicDir)
└── legacy-deck.html   # The original single-file light-theme deck
```

Slides are authored against a fixed 1920×1080 canvas and scaled as one unit by
`SlideStage`, so the composition holds from a projector down to a phone.
