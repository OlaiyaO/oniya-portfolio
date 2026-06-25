# oniya.tagrider.com — portfolio

Personal portfolio + CV for **Olaiya Joseph Oniya** (founder, Tag-Along Ltd).

Live at https://oniya.tagrider.com — CV at https://oniya.tagrider.com/cv

## Stack

Hand-built — no framework. Vanilla HTML + CSS + JS. GSAP + Lenis loaded via CDN. CSS-only hero backdrop (no WebGL, no canvas).

| | |
|---|---|
| Type | Fraunces (display serif) + JetBrains Mono (body) |
| Palette | `#FAF8F5` warm off-white + `#0A0908` off-black + `#DC2626` scarlet accent |
| Motion | GSAP ScrollTrigger + Lenis smooth scroll, throttled, mobile-aware |
| Hosting | nginx static on a small EC2, Let's Encrypt cert, Cloudflare DNS |

## Local preview

```bash
python3 -m http.server 8000
# visit http://localhost:8000
```

Or any static server. No build step.

## File map

- `index.html` — landing page
- `styles.css` — full design system + responsive rules
- `js/main.js` — animation orchestration (loader, cursor, scroll choreography, contextual nav theme)
- `cv/index.html` — print-to-PDF CV
- `cv/Olaiya-Oniya-CV.md` — markdown source for the CV
- `assets/headshot.jpg` — portrait

## License

All rights reserved. Code is open for inspection; copying the visual design is not authorized.
