const COLOR_LIST = ["#ffc764", "#ff884b", "#ff577f"];
const body = document.querySelector("body");

function sizeCheck() {
  const windowSize = window.innerWidth;
  if (windowSize <= 700) {
    body.style.backgroundColor = COLOR_LIST[0];
  } else if (windowSize >= 1000) {
    body.style.backgroundColor = COLOR_LIST[2];
  } else {
    body.style.backgroundColor = COLOR_LIST[1];
  }
}

window.addEventListener("resize", sizeCheck);
