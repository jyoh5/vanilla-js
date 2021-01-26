const clockContainer = document.querySelector(".js-clock"),
  clockDate = clockContainer.querySelector(".js-date"),
  clockTime = clockContainer.querySelector(".js-time");

function getTime() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const today = date.getDate();
  clockDate.innerText = `${year}.${month + 1}.${today}`;

  const minutes = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();
  clockTime.innerText = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds} ${hours < 12 ? "AM" : "PM"}`;
}

function init() {
  getTime();
  setInterval(getTime, 1000);
}

init();
