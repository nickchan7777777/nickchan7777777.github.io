const carousels = document.querySelectorAll("[data-carousel]");

carousels.forEach((carousel) => {
    const slides = Array.from(carousel.querySelectorAll(".carousel-track img"));
    const prev = carousel.querySelector("[data-carousel-prev]");
    const next = carousel.querySelector("[data-carousel-next]");
    const count = carousel.querySelector("[data-carousel-count]");
    let index = slides.findIndex((slide) => slide.classList.contains("active"));

    if (index < 0) {
        index = 0;
    }

    const showSlide = (nextIndex) => {
        slides[index].classList.remove("active");
        index = (nextIndex + slides.length) % slides.length;
        slides[index].classList.add("active");

        if (count) {
            count.textContent = `${index + 1} / ${slides.length}`;
        }
    };

    showSlide(index);

    if (prev) {
        prev.addEventListener("click", () => showSlide(index - 1));
    }

    if (next) {
        next.addEventListener("click", () => showSlide(index + 1));
    }
});

const revealTargets = document.querySelectorAll(
    ".hero, .bio-grid article, .embedded-site, .page-intro, .project-row, .plant-feature, .timeline-period, .timeline-items section, .docs-content > section"
);

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.16,
            rootMargin: "0px 0px -8% 0px",
        }
    );

    revealTargets.forEach((target, index) => {
        target.dataset.reveal = "";
        target.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 70}ms`);
        revealObserver.observe(target);
    });
} else {
    revealTargets.forEach((target) => {
        target.dataset.reveal = "";
        target.classList.add("is-visible");
    });
}
