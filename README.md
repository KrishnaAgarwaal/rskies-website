# rskies — Company Website

A modern, fully responsive single-page website for **rskies** — a two-developer
studio building mobile apps, websites and custom digital solutions starting at ₹19,999.

Design language: dark, futuristic, immersive (inspired by nexttechlab.in) —
near-black canvas, cyan/blue glow, Space Grotesk display type, JetBrains Mono
micro-labels, marquee strips and floating tech chips. Light mode is one click away.

## Files

| File | Purpose |
|---|---|
| `index.html` | All sections & SEO meta |
| `styles.css` | Theme variables (top of file), layout, dark/light themes |
| `script.js` | **PRODUCTS & PORTFOLIO data arrays (top of file)** + all behaviour |
| `assets/` | Logo (light & dark variants), favicon, apple-touch icon |

## Run it

Just open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

## Editing your content

### Products (`script.js` → `PRODUCTS`)
Add / edit / remove objects freely — the grid and cards update automatically.

```js
{
  name: 'Candle Mantra',
  category: 'web',
  icon: '🕯️',
  description: 'An interactive Learning Management System (LMS)...',
  tech: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript'],
  status: 'live',
  features: ['Feature 1', 'Feature 2'],
  links: [{ label: 'Visit Website ↗', url: 'https://app.candlemantra.in' }],
}
```

### Contact details
WhatsApp: `+491749586659` (`https://wa.me/491749586659`)
Email: `info@rskies.com`

### Team photos (About section)
Replace the `.avatar` initials blocks in `index.html` with
`<img src="assets/your-photo.jpg" class="avatar-img" alt="Name" />` and add a small
CSS rule (`.avatar-img { width:100%; height:100%; object-fit:cover; border-radius:inherit; }`).

### Colors (`styles.css` top)
All theme colors are CSS variables in `:root` (dark) and `[data-theme="light"]`.
`--blue` (#2F6BFF) comes from the logo's kite, `--cyan` (#28D8FE) is the sky accent.

## Features

- Mobile-first responsive layout (breakpoints at 560 / 760 / 900 / 992 px)
- Dark (default) + light theme with persistence and no flash-on-load
- Smooth scrolling, scroll-reveal animations, marquee strips, floating hero chips
- Direct WhatsApp and Email integration
- SEO meta + Open Graph + JSON-LD structured data
- Reduced-motion support & keyboard focus styles
