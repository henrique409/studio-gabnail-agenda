(function () {
  const root = document.querySelector("[data-carousel]");
  if (!root) return;

  const track = root.querySelector("[data-track]");
  const slides = Array.from(root.querySelectorAll("[data-slide]"));
  const prev = root.querySelector("[data-prev]");
  const next = root.querySelector("[data-next]");
  const dotsWrap = root.querySelector("[data-dots]");

  let i = 0;

  function setActive(idx) {
    i = (idx + slides.length) % slides.length;
    track.style.transform = `translateX(${-i * 100}%)`;

    if (dotsWrap) {
      Array.from(dotsWrap.children).forEach((d, di) => {
        d.setAttribute("aria-current", di === i ? "true" : "false");
      });
    }
  }

  if (dotsWrap) {
    dotsWrap.innerHTML = "";
    slides.forEach((_, di) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "dot";
      b.addEventListener("click", () => setActive(di));
      dotsWrap.appendChild(b);
    });
  }

  prev?.addEventListener("click", () => setActive(i - 1));
  next?.addEventListener("click", () => setActive(i + 1));

  // swipe no celular
  let startX = 0;
  track.addEventListener("touchstart", (e) => (startX = e.touches[0].clientX), { passive: true });
  track.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX;
    if (Math.abs(diff) > 40) setActive(diff > 0 ? i - 1 : i + 1);
  });

  // auto play (opcional)
  let timer = setInterval(() => setActive(i + 1), 4500);
  root.addEventListener("mouseenter", () => clearInterval(timer));
  root.addEventListener("mouseleave", () => (timer = setInterval(() => setActive(i + 1), 4500)));

  setActive(0);
})();
