# crazyblueberri

Personal academic website for a behavioral scientist. Hosted on GitHub Pages, auto-deploys on push to `master`.

**Live URL:** https://anonymouslimone.github.io/crazyblueberri/
**Repo:** https://github.com/AnonymousLimone/crazyblueberri

## Owner Profile

- Behavioral scientist
- Research areas: communication neuroscience, political psychology, social neuroscience
- Personality: Enneagram 5w4 — intellectual, introspective, creative but understated
- Prefers things that are not flashy/formal, but also not too loud

## Design Language

- **Style:** minimalist pixel-art aesthetic with light anime-inspired elements
- **Color palette:** soft/muted blue series (--blue-50 through --blue-900), white cards on pale blue background
- **Typography:**
  - Headings/decorative: `Press Start 2P` (pixel font)
  - Body text: `IBM Plex Sans` (16px base)
  - Monospace/labels: `IBM Plex Mono`
- **Pixel elements:** pixel-border buttons with box-shadow offsets, pixel rain canvas background, pixel-art custom cursor (arrow + pointer hand)
- **Interactive details:**
  - Black pixel cat in bottom-right corner (72x72 canvas). Full mouse interaction system:
    - **Track:** when mouse approaches (~120px), cat's eyes follow the cursor. Occasionally jumps toward mouse.
    - **Pet:** move mouse back and forth over cat's head area → cat shows happy squint eyes (^_^) and spawns floating pixel hearts.
    - **Jump:** click the cat → it jumps up toward cursor. Has cooldown between jumps.
    - **Lonely:** when mouse leaves the cat's area, a pixel yarn ball floats above its head (brief sad state).
    - **Sleep:** after 8 seconds of no interaction, cat falls asleep with floating "z" particles. Wakes when mouse approaches.
    - Tail wags faster during active interactions (track/pet). Eyes blink periodically in idle.
  - Avatar smiley block bounces on page load with expression cycle (:/ → :| → :) → :D → :)), wiggles on hover
  - Emojis (course icons, nav logo, footer stars) bounce on hover
  - Scroll-reveal animations on content sections
  - Falling pixel rain in background (canvas)
  - Navbar blur + shadow on scroll
- **Tone:** quiet, curious, slightly playful — never corporate or over-the-top

## File Structure

```
crazyblueberri/
├── index.html          # Single-page site, all sections in one file
├── style.css           # All styling — layout, colors, animations, responsive, pixel cursor
├── script.js           # Pixel rain, cat animation, avatar face animation, nav, tabs, scroll reveal
├── CLAUDE.md           # This file — project context for future sessions
└── .github/
    └── workflows/
        └── pages.yml   # GitHub Actions workflow for auto-deploying to GitHub Pages
```

## Page Sections (in order)

1. **Hero** (`#hero`) — pixel avatar with animated face, site name "crazyblueberri" in pixel font, subtitle with research keywords, decorative twinkling stars
2. **About** (`#about`) — three paragraphs of bio text, email link button, ASCII brain art decoration on the side
3. **Publications** (`#publications`) — tabbed interface (journal articles / conference papers), entries organized by year with author, title, venue, and [pdf]/[doi] links
4. **Teaching** (`#teaching`) — 3-column card grid, each card has emoji icon, course title, term, description
5. **CV** (`#cv`) — PDF download button, education timeline, methods/skills tag cloud
6. **Footer** — one-liner "built with pixels & curiosity"

## Current State

- All text content is **Lorem Ipsum placeholder** — no real personal info has been added yet
- The email link points to `mailto:your@email.com` (placeholder)
- The CV download points to `cv.pdf` which does not exist yet
- Google Scholar and GitHub external links have been intentionally removed from the about section (owner hasn't decided what links to include)
- Publication [pdf] and [doi] links are `#` placeholders
- The site is fully responsive (mobile breakpoint at 640px)

## Deployment

- Push to `master` → GitHub Actions workflow (`.github/workflows/pages.yml`) → auto-deploys to GitHub Pages
- Pure static HTML/CSS/JS, no build step, no dependencies, no framework

## Notes for Future Sessions

- Owner does not write code — all code changes go through Claude
- Owner prefers minimal permission confirmations
- Next steps: replace Lorem Ipsum with real content when owner is ready to add personal information
- Keep the understated pixel-art + light anime vibe consistent with any new features
