console.log("main.ts loaded successfully");

const pressables = document.querySelectorAll<HTMLElement>(".pressable");

pressables.forEach((element) => {
  element.addEventListener("pointerdown", (event) => {
    console.log("Ripple triggered!", event.clientX, event.clientY);
    const rect = element.getBoundingClientRect();
    const ripple = document.createElement("span");
    const size = Math.max(rect.width, rect.height);
    console.log("Reveal targets:", revealTargets.length);

    ripple.className = "ripple";
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${event.clientX - rect.left}px`;
    ripple.style.top = `${event.clientY - rect.top}px`;

    element.append(ripple);
    ripple.addEventListener("animationend", () => ripple.remove(), {
      once: true,
    });
  });
});

console.log("Pressable elements initialized.");

const revealTargets = document.querySelectorAll<HTMLElement>("[data-reveal]");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -8% 0px",
    },
  );

  revealTargets.forEach((target) => revealObserver.observe(target));
} else {
  revealTargets.forEach((target) => target.classList.add("is-visible"));
}



const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
);

const hero = document.querySelector<HTMLElement>(".hero-section");
const progress = document.querySelector<HTMLElement>(".scroll-progress");

// Mouse-following hero spotlight
if (hero && !reducedMotion.matches) {
  hero.addEventListener("pointermove", (event) => {
    if (event.pointerType === "touch") return;

    const rect = hero.getBoundingClientRect();

    hero.style.setProperty(
      "--mouse-x",
      `${event.clientX - rect.left}px`
    );

    hero.style.setProperty(
      "--mouse-y",
      `${event.clientY - rect.top}px`
    );
  });
}

// Interactive 3D feature cards
if (!reducedMotion.matches) {
  document.querySelectorAll<HTMLElement>(".feature-card")
    .forEach((card) => {
      card.addEventListener("pointermove", (event) => {
        if (event.pointerType === "touch") return;

        const rect = card.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const rotateX = (0.5 - y / rect.height) * 5;
        const rotateY = (x / rect.width - 0.5) * 5;

        card.style.setProperty("--card-x", `${x}px`);
        card.style.setProperty("--card-y", `${y}px`);

        card.style.transform =
          `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });

      card.addEventListener("pointerleave", () => {
        card.style.transform = "";
      });
    });
}

// Scroll progress indicator
if (progress) {
  let ticking = false;

  const updateProgress = () => {
    const scrollable =
      document.documentElement.scrollHeight - window.innerHeight;

    const ratio = scrollable > 0
      ? Math.min(1, Math.max(0, window.scrollY / scrollable))
      : 0;

    progress.style.transform = `scaleX(${ratio})`;
    ticking = false;
  };

  window.addEventListener("scroll", () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(updateProgress);
    }
  }, { passive: true });

  updateProgress();
}
