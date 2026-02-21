const slider = document.getElementById("slider");
const imgTop = document.getElementById("imgTop");

if (slider && imgTop) {
  slider.addEventListener("input", function () {
    imgTop.style.width = this.value + "%";
  });
}
