// <⚠️ DONT DELETE THIS ⚠️>
// import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>

const rangeNumSlider = document.querySelector(".range-setting__range-slider");
let rangeNum = parseInt(rangeNumSlider.value, 10);
const form = document.querySelector(".num-setting__form");
const result = document.querySelector(".result-container");
const success = document.querySelector(".result-container__success");
const fail = document.querySelector(".result-container__fail");

function setSliderNum(e) {
  const rangeNumText = document.querySelectorAll(".num-setting__range-text");
  rangeNumText.forEach(function (text) {
    text.innerHTML = e.target.value;
  });
  rangeNum = e.target.value;
}

rangeNumSlider.oninput = setSliderNum;

function chechResult(num, randomNum) {
  if (num === randomNum) {
    result.style.backgroundColor = "#cfdac8";
    success.classList.add("on");
  } else {
    fail.classList.add("on");
  }
}

function setNumber(e) {
  e.preventDefault();

  result.style.backgroundColor = "white";
  success.classList.remove("on");
  fail.classList.remove("on");

  const userNumInput = document.querySelector(".num-setting__user-input");
  const num = parseInt(userNumInput.value, 10);
  if (isNaN(num)) {
    alert("Enter a 'NUMBER'.");
    userNumInput.focus();
    return;
  } else if (num > rangeNum) {
    alert("It's too big.");
    userNumInput.innerHTML = "";
    userNumInput.focus();
    return;
  } else if (num < 0) {
    alert("It's too small.");
    userNumInput.innerHTML = "";
    userNumInput.focus();
    return;
  }

  result.style.visibility = "visible";

  const randomNum = Math.floor(
    Math.random() * (parseInt(rangeNum, 10) + 1 - 0)
  );
  const answer = document.querySelector(".result-container__answer");
  answer.innerHTML = randomNum;

  chechResult(num, randomNum);
}

form.addEventListener("submit", setNumber);
