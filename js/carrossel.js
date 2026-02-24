(() => {
  const carousels = document.querySelectorAll("[data-carousel]");

  carousels.forEach((carousel) => {
    const track = carousel.querySelector("[data-track]");
    const prevBtn = carousel.querySelector("[data-prev]");
    const nextBtn = carousel.querySelector("[data-next]");
    const dotsWrap = carousel.querySelector("[data-dots]");

    if (!track) return;

    const slides = Array.from(track.children).filter(el => el.classList.contains("slide"));
    if (!slides.length) return;

    let index = 0;

    // cria bolinhas
    let dots = [];
    if (dotsWrap) {
      dotsWrap.innerHTML = "";
      dots = slides.map((_, i) => {
        const b = document.createElement("button");
        b.className = "dot";
        b.type = "button";
        b.setAttribute("aria-label", `Ir para foto ${i + 1}`);
        b.addEventListener("click", () => goTo(i));
        dotsWrap.appendChild(b);
        return b;
      });
    }

    function update() {
      track.style.transform = `translateX(-${index * 100}%)`;

      if (dots.length) {
        dots.forEach((d, i) => d.setAttribute("aria-current", i === index ? "true" : "false"));
      }

      if (prevBtn) prevBtn.disabled = (index === 0);
      if (nextBtn) nextBtn.disabled = (index === slides.length - 1);
    }

    function goTo(i) {
      index = Math.max(0, Math.min(slides.length - 1, i));
      update();
    }

    if (prevBtn) prevBtn.addEventListener("click", () => goTo(index - 1));
    if (nextBtn) nextBtn.addEventListener("click", () => goTo(index + 1));

    // swipe no celular (opcional, mas ajuda)
    let startX = 0;
    let touching = false;

    carousel.addEventListener("touchstart", (e) => {
      touching = true;
      startX = e.touches[0].clientX;
    }, { passive: true });

    carousel.addEventListener("touchend", (e) => {
      if (!touching) return;
      touching = false;
      const endX = (e.changedTouches && e.changedTouches[0]) ? e.changedTouches[0].clientX : startX;
      const diff = endX - startX;

      if (Math.abs(diff) > 40) {
        if (diff < 0) goTo(index + 1);
        else goTo(index - 1);
      }
    }, { passive: true });

    update();
  });
})();
