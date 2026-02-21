document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("slider");
  const imgTop = document.getElementById("imgTop");

  if (!slider || !imgTop) return;

  function update() {
    imgTop.style.width = slider.value + "%";
  }

  slider.addEventListener("input", update);
  update();
});
