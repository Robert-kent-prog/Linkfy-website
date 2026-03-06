(function () {
  "use strict";

  const navbar = document.querySelector(".site-navbar");
  const currentPath = window.location.pathname.split("/").pop() || "index.html";

  const setActiveNav = () => {
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link[data-page]");
    navLinks.forEach((link) => {
      const page = link.getAttribute("data-page");
      link.classList.toggle("active", page === currentPath);
    });
  };

  const handleScrollNavbar = () => {
    if (!navbar) return;
    navbar.classList.toggle("navbar-scrolled", window.scrollY > 10);
  };

  const bindSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (event) => {
        const href = anchor.getAttribute("href");
        if (!href || href === "#") return;

        const target = document.querySelector(href);
        if (!target) return;

        event.preventDefault();
        const offset = window.innerWidth < 992 ? 74 : 112;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      });
    });
  };

  const initTooltips = () => {
    if (typeof bootstrap === "undefined") return;
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl));
  };

  const showSuccessBanner = (form, message) => {
    if (!form) return;
    const banner = form.querySelector(".success-banner");
    if (!banner) return;

    banner.textContent = message;
    banner.classList.add("show");
    setTimeout(() => banner.classList.remove("show"), 5000);
  };

  const initContactForm = () => {
    const form = document.getElementById("contactForm");
    if (!form) return;

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = form.querySelector("#name")?.value?.trim();
      const email = form.querySelector("#email")?.value?.trim();
      const subject = form.querySelector("#subject")?.value?.trim();
      const message = form.querySelector("#message")?.value?.trim();

      if (!name || !email || !subject || !message) {
        alert("Please fill in all required fields.");
        return;
      }

      if (!email.includes("@")) {
        alert("Please enter a valid email address.");
        return;
      }

      showSuccessBanner(form, "Thanks for contacting Linkfy. Our team will respond within 24 hours.");
      form.reset();
    });
  };

  const initDoNotSellForm = () => {
    const form = document.getElementById("doNotSellForm");
    if (!form) return;

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const email = form.querySelector("#email")?.value?.trim();
      const verify = form.querySelector("#verifyIdentity")?.checked;

      if (!email || !verify) {
        alert("Please provide your email and confirm identity.");
        return;
      }

      showSuccessBanner(
        form,
        "Your request has been captured. We will send a confirmation email with next steps."
      );
      form.reset();
    });
  };

  const initNewsletterForm = () => {
    const form = document.getElementById("newsletterForm");
    if (!form) return;

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const email = form.querySelector("input[type='email']")?.value?.trim();

      if (!email || !email.includes("@")) {
        alert("Enter a valid email to subscribe.");
        return;
      }

      showSuccessBanner(form, "Subscribed successfully. You will receive product updates and safety tips.");
      form.reset();
    });
  };

  const initServicesFilter = () => {
    const input = document.getElementById("serviceSearchInput");
    const resultCount = document.getElementById("servicesResultCount");
    const serviceCols = Array.from(document.querySelectorAll("#servicesGrid .service-col"));

    if (!input || serviceCols.length === 0) return;

    const update = () => {
      const query = input.value.trim().toLowerCase();
      let visibleCount = 0;

      serviceCols.forEach((col) => {
        const tags = (col.getAttribute("data-tags") || "").toLowerCase();
        const isVisible = !query || tags.includes(query);
        col.classList.toggle("is-hidden", !isVisible);
        if (isVisible) visibleCount += 1;
      });

      if (resultCount) {
        if (query) {
          resultCount.textContent = `${visibleCount} service categories match "${query}".`;
        } else {
          resultCount.textContent = `${visibleCount} featured service categories shown. Full catalog is available in the app.`;
        }
      }
    };

    input.addEventListener("input", update);
    update();
  };

  const setCurrentYear = () => {
    const year = new Date().getFullYear();
    document.querySelectorAll(".js-current-year").forEach((el) => {
      el.textContent = String(year);
    });
  };

  setActiveNav();
  handleScrollNavbar();
  bindSmoothScroll();
  initTooltips();
  initContactForm();
  initDoNotSellForm();
  initNewsletterForm();
  initServicesFilter();
  setCurrentYear();

  window.addEventListener("scroll", handleScrollNavbar, { passive: true });
})();
