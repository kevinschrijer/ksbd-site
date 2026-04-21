const yearElement = document.getElementById("year");
const revealElements = document.querySelectorAll(".reveal");
const menuToggle = document.getElementById("menuToggle");
const siteMenu = document.getElementById("siteMenu");
const menuLinks = siteMenu ? siteMenu.querySelectorAll("a") : [];
const contactForm = document.getElementById("contactForm");
const formStartedAt = document.getElementById("formStartedAt");
const contactFormStatus = document.getElementById("contactFormStatus");

if (yearElement) {
  yearElement.textContent = String(new Date().getFullYear());
}

if (formStartedAt) {
  formStartedAt.value = String(Date.now());
}

if (menuToggle && siteMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = !siteMenu.hasAttribute("hidden");
    if (isOpen) {
      siteMenu.setAttribute("hidden", "");
      menuToggle.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      return;
    }

    siteMenu.removeAttribute("hidden");
    menuToggle.classList.add("is-open");
    menuToggle.setAttribute("aria-expanded", "true");
  });

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      siteMenu.setAttribute("hidden", "");
      menuToggle.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const startedAt = Number(formData.get("formStartedAt")) || Date.now();
    const elapsed = Date.now() - startedAt;
    const honeypot = String(formData.get("website") || "").trim();
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const company = String(formData.get("company") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (honeypot) {
      if (contactFormStatus) {
        contactFormStatus.textContent = "Verzenden is niet gelukt. Probeer het opnieuw.";
      }
      return;
    }

    if (elapsed < 3000) {
      if (contactFormStatus) {
        contactFormStatus.textContent = "Formulier te snel verzonden. Probeer het nog een keer.";
      }
      return;
    }

    if (!name || !email || !phone) {
      if (contactFormStatus) {
        contactFormStatus.textContent = "Vul naam, e-mail en telefoon in.";
      }
      return;
    }

    const subject = encodeURIComponent(`Aanvraag via KS|BD website van ${name}`);
    const body = encodeURIComponent(
      [
        `Naam: ${name}`,
        `E-mail: ${email}`,
        `Telefoon: ${phone}`,
        company ? `Organisatie: ${company}` : "",
        "",
        "Toelichting:",
        message || "-"
      ]
        .filter(Boolean)
        .join("\n")
    );

    if (contactFormStatus) {
      contactFormStatus.textContent =
        "Je e-mailprogramma wordt geopend om de aanvraag te versturen.";
    }

    window.location.href = `mailto:kevin.schrijer@gmail.com?subject=${subject}&body=${body}`;
  });
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  revealElements.forEach((element, index) => {
    element.style.transitionDelay = `${Math.min(index * 80, 320)}ms`;
    observer.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("is-visible");
  });
}
