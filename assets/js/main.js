const menuToggle = document.querySelector('.mobile-nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuPanel = mobileMenu?.querySelector('.mobile-menu-panel');
const mobileClose = document.querySelector('.mobile-menu-close');
const focusableSelectors = 'a[href], button:not([disabled]), input, textarea, select';
let focusableElements = [];
let firstFocusableElement = null;
let lastFocusableElement = null;

const updateFocusableElements = () => {
  if (!mobileMenuPanel) return;
  focusableElements = Array.from(mobileMenuPanel.querySelectorAll(focusableSelectors));
  firstFocusableElement = focusableElements[0] || null;
  lastFocusableElement = focusableElements[focusableElements.length - 1] || null;
};

const openMenu = () => {
  if (!mobileMenu || !menuToggle) return;
  mobileMenu.classList.add('is-open');
  mobileMenu.setAttribute('aria-hidden', 'false');
  menuToggle.setAttribute('aria-expanded', 'true');
  document.body.classList.add('menu-open');
  updateFocusableElements();
  setTimeout(() => firstFocusableElement?.focus(), 0);
};

const closeMenu = () => {
  if (!mobileMenu || !menuToggle || !mobileMenu.classList.contains('is-open')) return;
  mobileMenu.classList.remove('is-open');
  mobileMenu.setAttribute('aria-hidden', 'true');
  menuToggle.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('menu-open');
  menuToggle.focus();
};

menuToggle?.addEventListener('click', () => {
  if (mobileMenu?.classList.contains('is-open')) {
    closeMenu();
  } else {
    openMenu();
  }
});

mobileClose?.addEventListener('click', closeMenu);

mobileMenu?.addEventListener('click', (event) => {
  if (event.target === mobileMenu) {
    closeMenu();
  }
});

mobileMenu?.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeMenu();
  }
  if (event.key !== 'Tab') return;
  updateFocusableElements();
  if (!firstFocusableElement || !lastFocusableElement) return;
  if (event.shiftKey && document.activeElement === firstFocusableElement) {
    event.preventDefault();
    lastFocusableElement.focus();
  } else if (!event.shiftKey && document.activeElement === lastFocusableElement) {
    event.preventDefault();
    firstFocusableElement.focus();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeMenu();
  }
});

const scrollLinks = document.querySelectorAll('[data-scroll]');
scrollLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetSelector = link.getAttribute('data-scroll') || link.getAttribute('href');
    if (!targetSelector || targetSelector === '#') return;
    const target = document.querySelector(targetSelector);
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    closeMenu();
  });
});

const faqButtons = document.querySelectorAll('.accordion-trigger');
faqButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const panelId = button.getAttribute('aria-controls');
    const panel = document.getElementById(panelId);
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!expanded));
    if (panel) {
      panel.hidden = expanded;
    }
  });
});

const backToTop = document.getElementById('back-to-top');
const toggleBackToTop = () => {
  if (!backToTop) return;
  backToTop.classList.toggle('is-visible', window.scrollY > 400);
};

window.addEventListener('scroll', toggleBackToTop);
toggleBackToTop();
backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('is-visible'));
}
