const greetingsBox = document.querySelector(".js-greetings"),
  input = greetingsBox.querySelector("input"),
  user = document.querySelector("#user");

const USER_LS = "currentUser",
  SHOWING_ON = "showing";

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}
function handleSubmit(e) {
  e.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}
function askForName() {
  greetingsBox.classList.add(SHOWING_ON);
  greetingsBox.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
  greetingsBox.classList.remove(SHOWING_ON);
  // user.classList.add(SHOWING_ON);
  user.innerText = `${text}'s`;
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}

init();
