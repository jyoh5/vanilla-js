// <⚠️ DONT DELETE THIS ⚠️>
// import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>

const key = document.querySelectorAll(".keys__key");
const displayHistory = document.querySelector(".display__history");
const displayResult = document.querySelector(".display__result");
let inputOneNum = [];
let inputHistory = [];
let result = 0;

const calculator = {
  "+": function (a, b) {
    return a + b;
  },
  "-": function (a, b) {
    return a - b;
  },
  x: function (a, b) {
    return a * b;
  },
  "/": function (a, b) {
    return a / b;
  }
};

function getResult(num, data) {
  inputHistory.push(num);
  inputHistory.push(data);
  inputOneNum = [];

  let operator = "";

  if (inputHistory.length === 2) {
    result = inputHistory[0];
  } else {
    operator = inputHistory[inputHistory.length - 3];
    result = calculator[operator](result, num);
  }
  displayResult.innerHTML = result;
  displayHistory.innerHTML = inputHistory.join("");
}

function getData(e) {
  let data = e.target.innerHTML;

  if (data === "C") {
    // C 입력
    displayHistory.innerHTML = "";
    displayResult.innerHTML = "";
    inputOneNum = [];
    inputHistory = [];
  } else if (data === "=") {
    // = 입력
    const num = parseInt(inputOneNum.join(""), 10);
    if (isNaN(num)) {
      return;
    }

    getResult(num, data);

    inputOneNum = [];
    inputHistory = [];
  } else if (e.target.className.indexOf("operator") !== -1) {
    // 연산 기호 입력
    const num = parseInt(inputOneNum.join(""), 10);
    if (isNaN(num)) {
      inputHistory[inputHistory.length - 1] = data;
      displayHistory.innerHTML = inputHistory.join("");
      return;
    }

    getResult(num, data);
  } else {
    // 숫자 입력
    inputOneNum.push(data);
    displayResult.innerHTML = inputOneNum.join("");
  }
}

key.forEach(function (k) {
  k.addEventListener("click", getData);
});
