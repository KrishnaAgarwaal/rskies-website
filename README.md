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
Add / edit / remove objects freely — the grid, filters and cards update automatically.

```js
{
  name: 'ShopMate',
  category: 'web',              // "web" | "mobile" | "tool"
  icon: '🛒',                    // any emoji
  description: 'One-line description.',
  tech: ['React', 'Node.js'],   // tech-stack tags
  status: 'live',               // "live" | "beta" | "soon"
  features: ['Hover feature 1', 'feature 2'],
  links: [{ label: 'Visit Product', url: 'https://…' }],
}
```

### Portfolio (`script.js` → `PORTFOLIO`)
Same idea — `name`, `category` (chip label), `icon`, `description`, `tech`,
`gradient: ['#hex1', '#hex2']` (cover colors) and `url`.

### Contact details (placeholders to replace)
Search `index.html` for `919876543210` (WhatsApp number), `hello@rskies.in`
(email) and `+91 98765 43210` (phone) and swap in your real details.

### Team photos (About section)
Replace the `.avatar` initials blocks in `index.html` with
`<img src="assets/your-photo.jpg" class="avatar-img" alt="Name" />` and add a small
CSS rule (`.avatar-img { width:100%; height:100%; object-fit:cover; border-radius:inherit; }`).

### Colors (`styles.css` top)
All theme colors are CSS variables in `:root` (dark) and `[data-theme="light"]`.
`--blue` (#2F6BFF) comes from the logo's kite, `--cyan` (#28D8FE) is the sky accent.

## Connecting the contact form

The form currently shows a success message without sending (no backend).
To receive real messages, pick one:

- **Formspree / Web3Forms**: create a form, then in `script.js` (contact form
  submit handler) POST the `FormData` to your endpoint with `fetch`.
- **Netlify Forms**: add `netlify` to the `<form>` attributes when deploying on Netlify.
- **Your own API**: replace the demo block in the submit handler with your `fetch` call.

## Features

- Mobile-first responsive layout (breakpoints at 560 / 760 / 900 / 992 px)
- Dark (default) + light theme with persistence and no flash-on-load
- Smooth scrolling, scroll-reveal animations, marquee strips, floating hero chips
- Product filter tabs, hover/tap feature reveal, status badges
- Section-aware navbar highlighting, back-to-top, toast notifications
- SEO meta + Open Graph + JSON-LD structured data
- Reduced-motion support & keyboard focus styles
