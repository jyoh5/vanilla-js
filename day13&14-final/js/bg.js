const body = document.querySelector("body"),
  wiseSaying = document.querySelector(".js-wise-saying");
const wiseSayingList = [
  "산다는것 그것은 치열한 전투이다. - 로망로랑 -",
  "언제나 현재에 집중할수 있다면 행복할것이다. - 파울로 코엘료 -",
  "신은 용기있는자를 결코 버리지 않는다. - 켄러 -",
  "한번의 실패와 영원한 실패를 혼동하지 마라. - F.스콧 핏제랄드 -",
  "1퍼센트의 가능성, 그것이 나의 길이다. - 나폴레옹 -",
  "고통이 남기고 간 뒤를 보라! 고난이 지나면 반드시 기쁨이 스며든다. - 괴테 -",
  "고개 숙이지 마십시오. 세상을 똑바로 정면으로 바라보십시오. - 헬렌 켈러 -",
  "The way to get started is to quit talking and begin doing. - Walt Disney -",
  "In order to succeed, we must first believe that we can. - Nikos Kazantzakis -",
  "The only place where success comes before work is in the dictionary. - Vidal Sassoon -",
];
const IMG_NUMBER = 4;

// function handleImgLoad() {
//   console.log("끝");
// }

function switchBg(imgNumber, wiseNumber) {
  const imgPath = `./img/${imgNumber + 1}.png`;
  body.style.backgroundImage = `url(${imgPath})`;
  wiseSaying.innerHTML = `"${wiseSayingList[wiseNumber]}"`;
  //   image.addEventListener("loadend", handleImgLoad);
}

function getRandom(num) {
  const number = Math.floor(Math.random() * num);
  return number;
}

function init() {
  const imgNumber = getRandom(IMG_NUMBER);
  const wiseNumber = getRandom(wiseSayingList.length);
  switchBg(imgNumber, wiseNumber);
}

init();
