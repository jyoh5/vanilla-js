// <⚠️ DONT DELETE THIS ⚠️>
// import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>

function getValue() {
  const myCountry = document.querySelector("select").value;
  localStorage.setItem("LC_CONTRY", myCountry);
}

function init() {
  const LC_CONTRY = localStorage.getItem("LC_CONTRY");

  if (LC_CONTRY !== null) {
    document.querySelector("select").value = LC_CONTRY;
  }
}

init();
const select = document.querySelector("select");
select.addEventListener("change", getValue);
