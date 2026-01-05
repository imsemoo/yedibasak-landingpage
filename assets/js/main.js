// Programs slider (Swiper 11.2.10)
(function initProgramsSwiper() {
  const el = document.querySelector(".programs-swiper");
  if (!el || typeof Swiper === "undefined") return;

  new Swiper(el, {
    slidesPerView: 1,
    spaceBetween: 18,
    speed: 650,
    grabCursor: true,
    watchOverflow: true,
    centeredSlides: false,

    breakpoints: {
      640: { slidesPerView: 2, spaceBetween: 18 },
      992: { slidesPerView: 3, spaceBetween: 22 }
    },

    navigation: {
      nextEl: ".swiper-btn-next",
      prevEl: ".swiper-btn-prev"
    },

    pagination: {
      el: ".programs-pagination",
      clickable: true
    },

    keyboard: {
      enabled: true,
      onlyInViewport: true
    },

    a11y: {
      enabled: true
    }
  });
})();
// News slider (Swiper 11.2.10)
(function initNewsSwiper() {
  const el = document.querySelector(".news-swiper");
  if (!el || typeof Swiper === "undefined") return;

  new Swiper(el, {
    slidesPerView: 1,
    spaceBetween: 18,
    speed: 650,
    grabCursor: true,
    watchOverflow: true,

    breakpoints: {
      640: { slidesPerView: 2, spaceBetween: 18 },
      992: { slidesPerView: 3, spaceBetween: 22 }
    },

    navigation: {
      nextEl: ".swiper-btn-next-n",
      prevEl: ".swiper-btn-prev-n"
    },

    pagination: {
      el: ".news-pagination",
      clickable: true
    },

    keyboard: {
      enabled: true,
      onlyInViewport: true
    },

    a11y: {
      enabled: true
    }
  });
})();
// Testimonials (Swiper 11.2.10)
(function initTestimonialsSwiper() {
  const el = document.querySelector(".t-swiper");
  if (!el || typeof Swiper === "undefined") return;

  new Swiper(el, {
    slidesPerView: 1,
    spaceBetween: 18,
    speed: 650,
    grabCursor: true,
    watchOverflow: true,
    breakpoints: {
      640: { slidesPerView: 2, spaceBetween: 18 },
      992: { slidesPerView: 3, spaceBetween: 22 }
    },
    navigation: {
      nextEl: ".swiper-btn-next-t",
      prevEl: ".swiper-btn-prev-t"
    },
    pagination: {
      el: ".t-pagination",
      clickable: true
    },
    keyboard: { enabled: true, onlyInViewport: true },
    a11y: { enabled: true }
  });
})();

// Gallery (Main + Thumbs)
(function initGallerySwiper() {
  const mainEl = document.querySelector(".gallery-main");
  const thumbsEl = document.querySelector(".gallery-thumbs");
  if (!mainEl || !thumbsEl || typeof Swiper === "undefined") return;

  const thumbs = new Swiper(thumbsEl, {
    slidesPerView: 4,
    spaceBetween: 12,
    watchSlidesProgress: true,
    breakpoints: {
      0: { slidesPerView: 3 },
      640: { slidesPerView: 4 },
      992: { slidesPerView: 5 }
    }
  });

  new Swiper(mainEl, {
    slidesPerView: 1,
    spaceBetween: 16,
    speed: 650,
    grabCursor: true,
    watchOverflow: true,
    thumbs: { swiper: thumbs },
    navigation: {
      nextEl: ".swiper-btn-next-g",
      prevEl: ".swiper-btn-prev-g"
    },
    pagination: {
      el: ".g-pagination",
      clickable: true
    },
    keyboard: { enabled: true, onlyInViewport: true },
    a11y: { enabled: true }
  });
})();

// Partners (logo slider)
(function initPartnersSwiper() {
  const el = document.querySelector(".partners-swiper");
  if (!el || typeof Swiper === "undefined") return;

  new Swiper(el, {
    slidesPerView: 2,
    spaceBetween: 16,
    speed: 650,
    grabCursor: true,
    watchOverflow: true,
    breakpoints: {
      480: { slidesPerView: 3, spaceBetween: 16 },
      768: { slidesPerView: 4, spaceBetween: 18 },
      992: { slidesPerView: 5, spaceBetween: 22 }
    },
    navigation: {
      nextEl: ".swiper-btn-next-p",
      prevEl: ".swiper-btn-prev-p"
    },
    pagination: {
      el: ".p-pagination",
      clickable: true
    },
    keyboard: { enabled: true, onlyInViewport: true },
    a11y: { enabled: true }
  });
})();

// FAQ Accordion (A11y)
(function initAccordion() {
  const root = document.querySelector("[data-accordion]");
  if (!root) return;

  const triggers = Array.from(root.querySelectorAll(".accordion-trigger"));
  triggers.forEach((btn) => {
    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      const panelId = btn.getAttribute("aria-controls");
      const panel = panelId ? document.getElementById(panelId) : null;
      if (!panel) return;

      // close others (accordion behavior)
      triggers.forEach((b) => {
        const id = b.getAttribute("aria-controls");
        const p = id ? document.getElementById(id) : null;
        if (!p) return;
        b.setAttribute("aria-expanded", "false");
        p.hidden = true;
      });

      // toggle current
      btn.setAttribute("aria-expanded", String(!expanded));
      panel.hidden = expanded;
    });
  });
})();
// Footer year + Back to top
(function footerUtilities() {
  const yearEl = document.getElementById("footer-year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const btn = document.getElementById("back-to-top");
  if (!btn) return;

  const toggle = () => {
    const y = window.scrollY || document.documentElement.scrollTop || 0;
    btn.classList.toggle("is-visible", y > 700);
  };

  toggle();
  window.addEventListener("scroll", toggle, { passive: true });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();
// Header: sticky shadow + mobile menu + active section highlight
(function headerUX() {
  const header = document.querySelector("[data-header]");
  const toggleBtn = document.querySelector(".mobile-nav-toggle");
  const menu = document.getElementById("mobile-menu");
  const closeEls = menu ? menu.querySelectorAll("[data-menu-close]") : [];
  const mobileLinks = menu ? menu.querySelectorAll("a[data-scroll]") : [];

  // Sticky shadow
  const onScroll = () => {
    const y = window.scrollY || document.documentElement.scrollTop || 0;
    if (header) header.classList.toggle("is-scrolled", y > 10);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Mobile menu open/close
  const openMenu = () => {
    if (!menu || !toggleBtn) return;
    menu.classList.add("is-open");
    menu.setAttribute("aria-hidden", "false");
    toggleBtn.setAttribute("aria-expanded", "true");
    document.documentElement.classList.add("is-locked");
  };

  const closeMenu = () => {
    if (!menu || !toggleBtn) return;
    menu.classList.remove("is-open");
    menu.setAttribute("aria-hidden", "true");
    toggleBtn.setAttribute("aria-expanded", "false");
    document.documentElement.classList.remove("is-locked");
  };

  if (toggleBtn) toggleBtn.addEventListener("click", () => {
    const expanded = toggleBtn.getAttribute("aria-expanded") === "true";
    expanded ? closeMenu() : openMenu();
  });

  closeEls.forEach((el) => el.addEventListener("click", closeMenu));
  mobileLinks.forEach((a) => a.addEventListener("click", closeMenu));
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // Active link highlight (desktop)
  const navLinks = Array.from(document.querySelectorAll(".primary-nav a[data-scroll]"));
  const sections = navLinks
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && navLinks.length && sections.length) {
    const map = new Map();
    navLinks.forEach((a) => map.set(a.getAttribute("href"), a));

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = `#${entry.target.id}`;
        navLinks.forEach((l) => l.classList.remove("is-active"));
        const active = map.get(id);
        if (active) active.classList.add("is-active");
      });
    }, { root: null, threshold: 0.35 });

    sections.forEach((s) => io.observe(s));
  }
})();
// Premium smooth scroll with easing + sticky-header offset
(function premiumSmoothScroll() {
  const header = document.querySelector("[data-header]");
  const getOffset = () => {
    const h = header ? header.getBoundingClientRect().height : 0;
    return Math.ceil(h + 12); // 12px breathing space
  };

  const easeInOutCubic = (t) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const animateScrollTo = (targetY, duration = 700) => {
    const startY = window.scrollY || document.documentElement.scrollTop || 0;
    const diff = targetY - startY;
    if (Math.abs(diff) < 2) return;

    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const t = Math.min(1, elapsed / duration);
      const eased = easeInOutCubic(t);
      window.scrollTo(0, startY + diff * eased);
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const onClick = (e) => {
    const a = e.target.closest('a[data-scroll], a[href^="#"]');
    if (!a) return;

    const href = a.getAttribute("href") || "";
    const targetId = a.getAttribute("data-scroll") || href;
    if (!targetId || !targetId.startsWith("#")) return;

    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();

    const offset = getOffset();
    const y = target.getBoundingClientRect().top + (window.scrollY || 0) - offset;

    // duration dynamic based on distance (feels premium)
    const distance = Math.abs((window.scrollY || 0) - y);
    const duration = Math.max(520, Math.min(950, distance * 0.55));

    animateScrollTo(y, duration);

    // update URL hash without jump
    if (history.pushState) history.pushState(null, "", targetId);
    else location.hash = targetId;
  };

  document.addEventListener("click", onClick);
})();
