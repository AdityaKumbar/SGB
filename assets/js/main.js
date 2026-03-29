/**
 * SBG BCA College — Main JavaScript
 * Handles: Scroll reveals, Counter animations, and general utilities
 */

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
