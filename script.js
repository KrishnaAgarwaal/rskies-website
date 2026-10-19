/* ============================================================
   rskies — script.js
   All dynamic product content lives in the PRODUCTS array below.
   Edit freely — the layout adapts automatically.
============================================================ */

/* ============================================================
   ✏️ PRODUCTS — your own apps & tools
   ------------------------------------------------------------
   To add / edit / remove a product, just change the objects below.
   Fields:
     name        : product name (shown as card title)
     category    : "web" | "mobile" | "tool"   (used by the filter tabs)
     icon        : any emoji (or swap the banner for an <img> in your HTML)
     description : one-line description
     tech        : array of tech-stack tags
     status      : "live" | "beta" | "soon"   (badge colour changes)
     features    : short list revealed on card hover / tap
     links       : array of { label, url } buttons ("Play Store",
                   "App Store", "Visit Product", "View Demo"…)
============================================================ */
const PRODUCTS = [
  {
    name: 'ShopMate',
    category: 'web',
    icon: '🛒',
    description: 'A lightning-fast online store platform with inventory and payments built in.',
    tech: ['React', 'Node.js', 'MongoDB'],
    status: 'live',
    features: [
      'Product catalog with smart search',
      'Secure checkout & payment gateway',
      'Owner dashboard with sales analytics',
    ],
    links: [
      { label: 'Visit Product', url: '#' },
      { label: 'View Demo', url: '#' },
    ],
  },
  {
    name: 'TaskNest',
    category: 'mobile',
    icon: '📱',
    description: 'A calm daily planner that keeps tasks, habits and reminders in one place.',
    tech: ['Flutter', 'Firebase'],
    status: 'beta',
    features: [
      'Offline-first task lists',
      'Smart reminders & recurring tasks',
      'Cloud sync across all your devices',
    ],
    links: [
      { label: 'Play Store', url: '#' },
      { label: 'App Store', url: '#' },
    ],
  },
  {
    name: 'BillWise',
    category: 'tool',
    icon: '🧾',
    description: 'GST-ready invoicing for small businesses — create, send and track bills in minutes.',
    tech: ['Vue.js', 'Express', 'PostgreSQL'],
    status: 'soon',
    features: [
      'One-click invoices & GST reports',
      'Client and payment tracking',
      'Monthly business summary at a glance',
    ],
    links: [
      { label: 'View Demo', url: '#' },
    ],
  },
  /* ➕ Add more products here — copy any object above and tweak it */
];



/* ============================================================
   ⚙️ ENGINE — you shouldn't need to change anything below
============================================================ */

/* ---------- Render products (with category filter) ---------- */
const productsGrid = document.getElementById('productsGrid');

const STATUS_LABEL = { live: 'Live', beta: 'Beta', soon: 'Coming Soon' };

function productCardHTML(p) {
  const links = p.links
    .map((l, i) => `<a class="btn btn-sm ${i === 0 ? 'btn-primary' : 'btn-ghost'}" href="${l.url}" ${l.url.startsWith('http') ? 'target="_blank" rel="noopener"' : ''}>${l.label}</a>`)
    .join('');

  return `
    <article class="card product-card cat-${p.category}" data-category="${p.category}" data-reveal>
      <div class="product-banner">
        <span class="banner-icon" aria-hidden="true">${p.icon}</span>
        <span class="status-badge status-${p.status}"><span class="dot"></span>${STATUS_LABEL[p.status]}</span>
      </div>
      <div class="product-body">
        <h3>${p.name}</h3>
        <p class="product-desc">${p.description}</p>
        <div class="tech-tags">${p.tech.map((t) => `<span>${t}</span>`).join('')}</div>
        <ul class="product-features">${p.features.map((f) => `<li>${f}</li>`).join('')}</ul>
        <div class="product-links">${links}</div>
      </div>
    </article>`;
}

function renderProducts(filter = 'all') {
  const items = filter === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter);
  productsGrid.innerHTML = items.length
    ? items.map(productCardHTML).join('')
    : '<p class="pricing-note">No products in this category yet — check back soon!</p>';
  // Re-observe freshly injected cards + wire tap-to-expand on touch devices
  observeReveals(productsGrid);
  wireTouchExpand();
}

/* Filter tabs */
document.querySelector('.filter-tabs').addEventListener('click', (e) => {
  const tab = e.target.closest('.filter-tab');
  if (!tab) return;
  document.querySelectorAll('.filter-tab').forEach((t) => t.classList.remove('active'));
  tab.classList.add('active');
  renderProducts(tab.dataset.filter);
});

/* On touch devices there is no hover — tap a card to reveal its features */
function wireTouchExpand() {
  if (!window.matchMedia('(hover: none)').matches) return;
  productsGrid.querySelectorAll('.product-card').forEach((card) => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('a')) return; // don't hijack button taps
      card.classList.toggle('expanded');
    });
  });
}



/* ---------- Fluid Momentum Scrolling with Velocity Damping (Next Tech Lab physics) ---------- */
let lenis;
if (typeof Lenis !== 'undefined') {
  lenis = new Lenis({
    lerp: 0.075,            // True frame-by-frame spring inertia: prevents sudden jumps & caps peak speed
    wheelMultiplier: 0.75,  // Dampens aggressive mouse-wheel spins to maintain a controlled velocity ceiling
    touchMultiplier: 1.5,
    smoothWheel: true,
    smoothTouch: false,
    autoResize: true,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

/* ---------- Navbar: scrolled state ---------- */
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

function onScroll() {
  const currentY = window.scrollY || (lenis ? lenis.scroll : 0);
  navbar.classList.toggle('scrolled', currentY > 24);
  backToTop.classList.toggle('show', currentY > 600);
}
window.addEventListener('scroll', onScroll, { passive: true });
if (lenis) lenis.on('scroll', onScroll);
onScroll();

// Smooth anchor scrolling using Lenis momentum
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId && targetId !== '#') {
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        if (lenis) {
          lenis.scrollTo(targetEl, { offset: -74, duration: 1.2 });
        } else {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  });
});

backToTop.addEventListener('click', () => {
  if (lenis) {
    lenis.scrollTo(0, { duration: 1.2 });
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});

/* ---------- Interactive Cursor Spotlight on Cards (fluid feel) ---------- */
document.addEventListener('pointermove', (e) => {
  const card = e.target.closest('.card');
  if (card) {
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  }
}, { passive: true });

/* ---------- Mobile menu ---------- */
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', open);
  document.body.classList.toggle('menu-open', open);
  if (lenis) {
    if (open) lenis.stop();
    else lenis.start();
  }
});

// Close the menu after tapping a link (mobile UX)
navLinks.addEventListener('click', (e) => {
  if (e.target.closest('a')) {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
    if (lenis) lenis.start();
  }
});

// Close the menu when tapping anywhere outside (mobile UX)
document.addEventListener('click', (e) => {
  if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && !navToggle.contains(e.target)) {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
    if (lenis) lenis.start();
  }
});

/* ---------- Theme toggle (light / dark) ---------- */
const themeToggle = document.getElementById('themeToggle');
const themeMeta = document.querySelector('meta[name="theme-color"]');

themeToggle.addEventListener('click', () => {
  const root = document.documentElement;
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  try { localStorage.setItem('rskies-theme', next); } catch (e) { /* private mode */ }
  if (themeMeta) themeMeta.setAttribute('content', next === 'dark' ? '#0B0F1A' : '#ffffff');
});

/* ---------- Scroll-reveal animations (Next Tech Lab blur-to-focus) ---------- */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08, rootMargin: '0px 0px -25px 0px' }
);

function observeReveals(scope = document) {
  scope.querySelectorAll('[data-reveal]:not(.revealed)').forEach((el) => revealObserver.observe(el));
}
observeReveals();

/* ============================================================
   🖥️ HERO 3D STUDIO SHOWCASE (Dimension-style interactive mockup)
============================================================ */
const HERO_TAB_DATA = {
  shop: {
    kpis: [
      { label: 'MONTHLY VOLUME', num: '₹4,82,900', badge: '+142% vs last month' },
      { label: 'ACTIVE SHOPPERS', num: '12,480', badge: '↑ 3.2k live now' },
      { label: 'EDGE LATENCY', num: '28ms', badge: 'Zero downtime' },
    ],
    feed: [
      { icon: '⚡', title: 'Razorpay & Stripe Multi-Currency', desc: 'Instant checkout with 99.9% uptime', time: '2m ago' },
      { icon: '🛒', title: 'Real-Time Inventory Engine', desc: 'Instant order sync with WhatsApp alerts', time: '18m ago' },
      { icon: '🚀', title: 'Next.js Server-Side Storefront', desc: 'Deployed to Vercel edge in 34ms', time: '1h ago' },
    ],
    stack: 'Stack: React · Node.js · MongoDB · Stripe',
    score: '99 / 100',
    barHeights: [45, 70, 52, 88, 62, 96, 74, 90, 100, 82],
  },
  app: {
    kpis: [
      { label: 'DAILY ACTIVE USERS', num: '8,920', badge: '+86% weekly growth' },
      { label: 'SYNC LATENCY', num: '14ms', badge: 'Cloud Firestore 100%' },
      { label: 'STORE RATING', num: '4.9 ★', badge: '1,240+ reviews' },
    ],
    feed: [
      { icon: '📱', title: 'Flutter iOS & Android Build', desc: 'AOT compiled with fluid 60fps animations', time: 'Just now' },
      { icon: '🔔', title: 'Automated Push Notifications', desc: 'Habit reminders delivered in 12ms', time: '12m ago' },
      { icon: '☁️', title: 'Offline-First SQLite Cache', desc: 'Zero data conflict on multi-device sync', time: '45m ago' },
    ],
    stack: 'Stack: Flutter · Dart · Firebase · SQLite',
    score: '100 / 100',
    barHeights: [65, 85, 40, 92, 78, 88, 95, 60, 84, 98],
  },
  dash: {
    kpis: [
      { label: 'INVOICES PROCESSED', num: '₹1.2 Cr', badge: 'Across 180+ businesses' },
      { label: 'AUTOMATION RATE', num: '94.2%', badge: 'Zero human error' },
      { label: 'API RESPONSE', num: '19ms', badge: 'PostgreSQL cache' },
    ],
    feed: [
      { icon: '🧾', title: 'GST E-Invoice & PDF Engine', desc: 'Cryptographically signed invoices generated', time: '5m ago' },
      { icon: '📊', title: 'Real-Time Financial Analytics', desc: 'Aggregated client cash-flow chart updated', time: '22m ago' },
      { icon: '🔒', title: 'Bank-Grade RBAC & 2FA', desc: 'OAuth 2.0 & audit log streaming verified', time: '1h ago' },
    ],
    stack: 'Stack: Vue.js · Express · PostgreSQL · Redis',
    score: 'A+ / 100',
    barHeights: [55, 68, 88, 75, 95, 82, 90, 96, 70, 85],
  },
};

const mockupTabs = document.getElementById('heroMockupTabs');
if (mockupTabs) {
  const tabBtns = mockupTabs.querySelectorAll('.win-tab-btn');
  const feedContainer = document.getElementById('heroMockupFeed');
  const stackSpan = document.getElementById('heroMockupStack');
  const scoreBadge = document.getElementById('heroMockupScore');
  const barCols = document.querySelectorAll('.win-bar-col');

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const tabKey = btn.getAttribute('data-tab');
      const data = HERO_TAB_DATA[tabKey];
      if (!data) return;

      tabBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      // Update KPIs
      data.kpis.forEach((kpi, i) => {
        const idx = i + 1;
        const lbl = document.getElementById(`kpiLabel${idx}`);
        const num = document.getElementById(`kpiNum${idx}`);
        const bdg = document.getElementById(`kpiBadge${idx}`);
        if (lbl) lbl.textContent = kpi.label;
        if (num) num.textContent = kpi.num;
        if (bdg) bdg.textContent = kpi.badge;
      });

      // Update feed
      if (feedContainer) {
        feedContainer.innerHTML = data.feed
          .map(
            (item) => `
          <div class="win-feed-entry">
            <span class="entry-icon">${item.icon}</span>
            <div class="entry-info">
              <b>${item.title}</b>
              <span>${item.desc}</span>
            </div>
            <span class="entry-time mono">${item.time}</span>
          </div>`
          )
          .join('');
      }

      // Update stack and score
      if (stackSpan) stackSpan.textContent = data.stack;
      if (scoreBadge) scoreBadge.textContent = data.score;

      // Update bars with smooth height transition
      barCols.forEach((bar, i) => {
        if (data.barHeights[i] !== undefined) {
          bar.style.setProperty('--h', `${data.barHeights[i]}%`);
        }
      });
    });
  });

  // Dynamic subtle wave fluctuation to give it real-time life
  setInterval(() => {
    barCols.forEach((bar) => {
      const currentH = parseInt(bar.style.getPropertyValue('--h') || '60', 10);
      const delta = (Math.random() - 0.5) * 16;
      const newH = Math.min(100, Math.max(30, Math.round(currentH + delta)));
      bar.style.setProperty('--h', `${newH}%`);
    });
  }, 2200);
}

/* ---------- Highlight the nav link of the section in view ---------- */
const sections = document.querySelectorAll('main section[id]');
const navAnchors = document.querySelectorAll('.nav-link');

/* Map sections to their corresponding navbar items so active indicator never dies */
const SECTION_NAV_MAP = {
  home: 'home',
  services: 'services',
  products: 'products',
  pricing: 'pricing',
  why: 'pricing',
  process: 'pricing',
  contact: 'contact',
};

const visibleSections = new Map();

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => visibleSections.set(entry.target.id, entry.isIntersecting));
    const activeIds = [...visibleSections.entries()].filter(([, v]) => v).map(([id]) => id);
    const activeId = activeIds[activeIds.length - 1];
    if (!activeId) return;
    const targetNavId = SECTION_NAV_MAP[activeId] || activeId;
    navAnchors.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === `#${targetNavId}`));
  },
  { rootMargin: '-45% 0px -50% 0px' }
);
sections.forEach((s) => sectionObserver.observe(s));

/* ---------- Contact form with Async Submission ---------- */
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Mark empty required fields (simple inline validation)
  let valid = true;
  contactForm.querySelectorAll('[required]').forEach((field) => {
    const bad = !field.value.trim();
    field.closest('.form-field').classList.toggle('error', bad);
    if (bad) valid = false;
  });
  if (!valid) {
    showToast('⚠️ Please fill in all required fields.');
    return;
  }

  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span class="spinner"></span> Sending...';

  const formData = new FormData(contactForm);
  const name = contactForm.querySelector('#cf-name').value.trim().split(' ')[0];
  const accessKey = contactForm.querySelector('input[name="access_key"]')?.value;

  try {
    if (accessKey && accessKey !== 'YOUR_ACCESS_KEY_HERE') {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || 'Submission failed');
    } else {
      // Fluid simulated delay if no live access key is provided yet
      await new Promise((r) => setTimeout(r, 650));
    }

    contactForm.innerHTML = `
      <div class="form-success">
        <div class="big">🎉</div>
        <h3>Thanks, ${name}! Message sent.</h3>
        <p>We've received your enquiry and will get back to you within a few hours.<br/>
        In a hurry? <a href="https://wa.me/919876543210" style="color:var(--blue);font-weight:600">Ping us on WhatsApp →</a></p>
      </div>`;
    showToast('✅ Message sent successfully!');
  } catch (err) {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnText;
    showToast('❌ Failed to send. Please reach out via WhatsApp or email directly.');
  }
});

/* Clear the error highlight as soon as the user types */
contactForm.addEventListener('input', (e) => {
  e.target.closest('.form-field')?.classList.remove('error');
});

/* ---------- Toast helper ---------- */
const toast = document.getElementById('toast');
let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3500);
}

/* ---------- Footer year ---------- */
document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- Boot: draw the product grid ---------- */
renderProducts('all');
