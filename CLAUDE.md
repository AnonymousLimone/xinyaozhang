# Xinyao Zhang — Personal Academic Website

Personal academic website for Xinyao Zhang. Hosted on GitHub Pages, auto-deploys on push to `master`.

**Live URL:** https://anonymouslimone.github.io/xinyaozhang/
**Repo:** https://github.com/AnonymousLimone/xinyaozhang

## Owner Profile

- Xinyao Zhang — Ph.D. student in Communication Science, University of Amsterdam
- Research areas: communication neuroscience, political neuroscience, social media, behavioral science
- Personality: Enneagram 5w4
- Prefers things that are not flashy/formal, but also not too loud
- Likes black cats

## Design Language

- **Style:** minimalist pixel-art aesthetic with light anime-inspired elements
- **Color palette:** soft/muted blue series (--blue-50 through --blue-900), white cards on pale blue background
- **Typography:**
  - Headings/decorative: `Press Start 2P` (pixel font)
  - Body text: `IBM Plex Sans` (16px base)
  - Monospace/labels: `IBM Plex Mono`
  - Chinese name: `Noto Sans SC` (rounded gothic)
- **Pixel elements:** pixel-border buttons with box-shadow offsets, pixel rain canvas background, pixel-art custom cursor (arrow + pointer hand)
- **Interactive details:**
  - Black pixel cat in bottom-right corner (72x96 canvas). Full mouse interaction system:
    - **Track:** when mouse approaches (~120px), cat's eyes follow the cursor
    - **Pet:** move mouse back and forth over cat's head → happy squint eyes (^_^), floating pixel hearts
    - **Blueberry:** click the cat → a pixel blueberry drops from above, cat looks up, eats it, hearts appear
    - **Lonely:** when mouse leaves, a pixel yarn ball floats above its head (brief sad state)
    - **Sleep:** after 8 seconds of no interaction, cat falls asleep with floating "z" particles. Wakes when mouse approaches.
    - Tail wags faster during active interactions (track/pet). Eyes blink periodically in idle.
  - Avatar block: entrance animation (:/ → :| → :) → :D → :)), then clickable to cycle icons: :) → 🧠 (neuroscience) → 💬 (communication). Wiggles on hover.
  - Emojis (course icons, nav logo, footer stars) bounce on hover
  - Scroll-reveal animations on content sections
  - **Seasonal pixel rain** — background particles change by month: spring (Mar–May) = soft pink cherry blossom petals, summer (Jun–Aug) = blue pixels, autumn (Sep–Nov) = amber leaves, winter (Dec–Feb) = white snowflakes. Canvas opacity 0.3.
  - **Konami code** (↑↑↓↓←→←→BA) — triggers a 5-second Game Boy green color palette swap. Cat wears a party hat and dances (bouncing animation + happy eyes + hearts). Footer has a subtle hint "psst... try the konami code".
  - **Logo blueberry bounce** — clicking the 🫐 nav logo drops a blueberry emoji that bounces with gravity physics, then fades out. Also scrolls to top.
  - **Day/night auto mode** — checks the hour on page load. Between 8pm and 7am, applies `.night-mode` class which overrides CSS variables to a dark navy palette. Cat uses lighter gray colors (#4a4a60) at night for visibility, and defaults to sleep state.
  - Navbar blur + shadow on scroll
  - Pixel-art loading bar on page open (0.8s wait + 0.7s steps animation)
- **Photo treatment:** profile photo displayed as-is (original image, no pixelation or filter)
- **Tone:** quiet, curious, slightly playful — never corporate or over-the-top

## File Structure

```
xinyaozhang/                    (local dir still named crazyblueberri)
├── index.html                  # Single-page site, all sections in one file
├── style.css                   # All styling — layout, colors, animations, responsive, pixel cursor, night mode, konami mode
├── script.js                   # Seasonal rain, cat, avatar icon cycle, konami code, logo bounce, day/night, nav, tabs, scroll reveal, loader
├── photo.jpg                   # Profile photo (displayed as-is, no runtime processing)
├── robots.txt                  # Search engine crawler permissions
├── sitemap.xml                 # Sitemap for search engine indexing
├── CLAUDE.md                   # This file — project context for future sessions
└── .github/
    └── workflows/
        └── pages.yml           # GitHub Actions workflow for auto-deploying to GitHub Pages
```

## Page Sections (in order)

1. **Hero** (`#hero`) — pixel avatar with animated face, "Xinyao Zhang" in pixel font (click to toggle Chinese name 张心瑶 in Noto Sans SC), subtitle with research keywords, twinkling stars, subtle hint "click my name for 中文"
2. **About** (`#about`) — bio text, email + Bluesky links, profile photo on the right (visible on mobile too). "behavioral and psychological level" and "neural level" are highlighted.
3. **Publications** (`#publications`) — tabbed: Conferences / Workshops. Journal articles tab removed (all currently in review). Entries organized by year, Zhang X. bolded.
4. **Teaching** (`#teaching`) — 3-column card grid: Communication Research 1 (📊), Persuasive Communication (📢), Graduation Project (🎓). Ordered newest first. Student evaluations shown.
5. **CV** (`#cv`) — marked "under construction". Education timeline (PhD, Research MSc, double BA), skills tags, languages tags.
   - Skills: fMRI, Experiment, R, LaTeX, Nilearn (Python), EEGLAB (MATLAB)
   - Languages: Mandarin Chinese (Native), English (C1), Japanese (N1), Dutch (A2)
6. **Footer** — "built with pixels & curiosity · powered by Claude Code" + Konami hint

## Current State

- Real content filled in for: name, bio, email, Bluesky, publications (5 conferences + 1 workshop), teaching (3 courses), CV (education, skills, languages)
- Journal articles tab intentionally hidden — papers are in review
- CV section is marked "under construction", no PDF download yet
- The site is fully responsive (mobile breakpoint at 640px)
- Photo shows on mobile (was previously hidden, now fixed)
- SEO in place: meta description, keywords, Open Graph, Twitter card, JSON-LD Person schema, canonical URL, robots.txt, sitemap.xml
- Chinese name toggle (click "Xinyao Zhang" in hero → 张心瑶 in Noto Sans SC)
- Footer credits Claude Code + Konami hint

## Deployment

- Push to `master` → GitHub Actions workflow → auto-deploys to GitHub Pages
- Pure static HTML/CSS/JS, no build step, no dependencies, no framework
- **Note:** local directory is still named `crazyblueberri` but the GitHub repo is `xinyaozhang`

## Notes for Future Sessions

- All code changes go through Claude
- Owner prefers minimal permission confirmations
- Keep the understated pixel-art + light anime vibe consistent with any new features
- Owner's writing tone is casual-academic — correct grammar but don't make it sound overly formal
- When adding journal articles later, re-add a "Journal Articles" tab to publications
- When content changes, update sitemap.xml `<lastmod>` date
