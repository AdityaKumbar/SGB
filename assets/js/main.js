/**
 * SBG BCA College — Main JavaScript
 * Handles: Navbar, Scroll effects, Animations, Counter
 */

/* ============================================
   NAV SCROLL + HIGHLIGHT
   ============================================ */
const navbar = document.getElementById('mainNav');
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');

// Scroll shadow on navbar
window.addEventListener('scroll', () => {
  if (window.scrollY > 48) {
    navbar?.classList.add('scrolled');
  } else {
    navbar?.classList.remove('scrolled');
  }
}, { passive: true });

// Highlight active nav link
(function highlightActive() {
  const links = document.querySelectorAll('.nav-link[data-nav]');
  const page  = window.location.pathname.split('/').pop() || 'index.html';

  links.forEach(link => {
    const href = (link.getAttribute('href') || '').split('/').pop();
    if (href === page || (page === 'index.html' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

/* ============================================
   HAMBURGER MENU
   ============================================ */
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!navbar?.contains(e.target)) {
      navMenu.classList.remove('open');
      navToggle?.classList.remove('open');
      navToggle?.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      navMenu.classList.remove('open');
      navToggle?.classList.remove('open');
      navToggle?.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}

/* ============================================
   DROPDOWN — mobile toggle
   ============================================ */
document.querySelectorAll('.nav-item').forEach(item => {
  const link = item.querySelector('.nav-link[aria-haspopup]');
  if (!link) return;

  // Mobile: tap to toggle
  link.addEventListener('click', (e) => {
    if (window.innerWidth <= 900) {
      e.preventDefault();
      const isOpen = item.classList.toggle('open');
      link.setAttribute('aria-expanded', String(isOpen));
    }
  });
});

/* ============================================
   SCROLL REVEAL ANIMATION
   ============================================ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger sibling elements
      const siblings = entry.target.parentElement?.querySelectorAll('[data-reveal]') || [entry.target];
      let delay = 0;
      siblings.forEach((el, idx) => {
        if (el === entry.target) delay = idx * 80;
      });
      setTimeout(() => {
        entry.target.classList.add('revealed');
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -32px 0px'
});

document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));

/* ============================================
   COUNTER ANIMATION
   ============================================ */
function animateCounter(el) {
  const target = parseInt(el.dataset.target || el.textContent, 10);
  const duration = 1800;
  const start = performance.now();

  function update(time) {
    const elapsed = time - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target).toLocaleString('en-IN');
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counters = entry.target.querySelectorAll('[data-counter]');
      counters.forEach(animateCounter);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

document.querySelectorAll('.numbers-grid, .hero-stats').forEach(el => counterObserver.observe(el));

/* ============================================
   FOOTER — DYNAMIC YEAR
   ============================================ */
const yearEl = document.getElementById('footerYear');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ============================================
   SMOOTH AOS-LIKE CUSTOM LOGIC (Optional polish)
   ============================================ */
// Close mobile menu when a nav link (non-dropdown) is clicked
document.querySelectorAll('.nav-link:not([aria-haspopup])').forEach(link => {
  link.addEventListener('click', () => {
    if (navMenu?.classList.contains('open')) {
      navMenu.classList.remove('open');
      navToggle?.classList.remove('open');
      navToggle?.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
});
