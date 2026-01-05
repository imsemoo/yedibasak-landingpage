document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const mobileToggle = document.querySelector(".mobile-nav-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const backToTop = document.getElementById("back-to-top");
  const scrollLinks = document.querySelectorAll("[data-scroll]");
  const faqButtons = document.querySelectorAll(".accordion-trigger");
  const revealBlocks = document.querySelectorAll(".reveal");

  const toggleMobileNav = () => {
    if (!mobileMenu || !mobileToggle) return;
    const isOpen = mobileMenu.classList.toggle("active");
    mobileToggle.setAttribute("aria-expanded", String(isOpen));
    mobileMenu.setAttribute("aria-hidden", String(!isOpen));
    body.classList.toggle("nav-open", isOpen);
  };

  if (mobileToggle) {
    mobileToggle.addEventListener("click", toggleMobileNav);
  }

  const smoothScroll = (selector) => {
    if (!selector) return;
    const target = document.querySelector(selector);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  scrollLinks.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      const selector = trigger.dataset.scroll || trigger.getAttribute("href");
      smoothScroll(selector);
      if (mobileMenu && mobileMenu.classList.contains("active")) {
        toggleMobileNav();
      }
    });
  });

  const updateBackToTop = () => {
    if (!backToTop) return;
    const shouldShow = window.scrollY > window.innerHeight / 2;
    backToTop.classList.toggle("is-visible", shouldShow);
  };

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  window.addEventListener("scroll", updateBackToTop);
  updateBackToTop();

  faqButtons.forEach((button) => {
    const panelId = button.getAttribute("aria-controls");
    const panel = document.getElementById(panelId);
    if (panel) {
      panel.setAttribute("aria-expanded", "false");
    }
    button.addEventListener("click", () => {
      const isExpanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!isExpanded));
      if (panel) {
        panel.setAttribute("aria-expanded", String(!isExpanded));
        panel.style.maxHeight = !isExpanded ? `${panel.scrollHeight}px` : "0px";
      }
    });
  });

  if ("IntersectionObserver" in window && revealBlocks.length) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    revealBlocks.forEach((el) => observer.observe(el));
  } else {
    revealBlocks.forEach((el) => el.classList.add("is-visible"));
  }
});
