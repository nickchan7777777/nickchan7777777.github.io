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
