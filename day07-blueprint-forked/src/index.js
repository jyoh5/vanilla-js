// <⚠️ DONT DELETE THIS ⚠️>
// import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>

const tasks = document.querySelector(".tasks");
const tasksValue = tasks.querySelector("input");
const pending = document.querySelector(".pending");
const finished = document.querySelector(".finished");

const PENDING_LS = "pending";
const FINISHED_LS = "finished";

let toDos = [];
let finishedTasks = [];

function switchInfo(e) {
  const type = e.target.parentNode.parentNode.className;
  const li = e.target.parentNode;
  if (type === PENDING_LS) {
    const newToDos = toDos.filter(function (info) {
      return info.id !== li.id;
    });
    toDos = newToDos;
    pending.removeChild(li);
    localStorage.setItem(PENDING_LS, JSON.stringify(toDos));
    console.log(newToDos);
    saveFinishedLS(li);
  } else {
    const newfinishedTasks = finishedTasks.filter(function (info) {
      return info.id !== li.id;
    });
    finishedTasks = newfinishedTasks;
    finished.removeChild(li);
    localStorage.setItem(FINISHED_LS, JSON.stringify(finishedTasks));

    savePendingLS(li);
  }
}

function deleteInfo(e) {
  const type = e.target.parentNode.parentNode.className;
  const li = e.target.parentNode;
  if (type === PENDING_LS) {
    const newToDos = toDos.filter(function (info) {
      return info.id !== li.id;
    });
    toDos = newToDos;
    pending.removeChild(li);
    localStorage.setItem(PENDING_LS, JSON.stringify(toDos));
  } else {
    const newfinishedTasks = finishedTasks.filter(function (info) {
      return info.id !== li.id;
    });
    finishedTasks = newfinishedTasks;
    finished.removeChild(li);
    localStorage.setItem(FINISHED_LS, JSON.stringify(finishedTasks));
  }
}

function saveFinishedLS(li) {
  const infoObj = {
    id: li.id,
    text: li.querySelector("span").innerHTML
  };
  finishedTasks.push(infoObj);
  localStorage.setItem(FINISHED_LS, JSON.stringify(finishedTasks));
  showList(FINISHED_LS, infoObj);
}

function savePendingLS(e) {
  let idNum = 1;
  if (localStorage.getItem("idNum") !== null) {
    idNum = parseInt(localStorage.getItem("idNum"), 10) + 1;
  }

  let toDosObj = {};
  if (e.id === undefined) {
    e.preventDefault();
    toDosObj = {
      id: String(idNum),
      text: tasksValue.value
    };
  } else {
    toDosObj = {
      id: e.id,
      text: e.querySelector("span").innerHTML
    };
  }
  console.log(toDosObj);
  toDos.push(toDosObj);
  localStorage.setItem(PENDING_LS, JSON.stringify(toDos));
  tasksValue.value = "";
  showList(PENDING_LS, toDosObj);

  localStorage.setItem("idNum", idNum);
}

function showList(type, info) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const btnDel = document.createElement("button");
  const btnFin = document.createElement("button");

  li.id = info["id"];
  span.innerHTML = info["text"];
  btnDel.innerHTML = "X";
  if (type === PENDING_LS) {
    btnFin.innerHTML = "V";
  } else {
    btnFin.innerHTML = "<";
  }

  li.appendChild(span);
  li.appendChild(btnDel);
  li.appendChild(btnFin);

  if (type === PENDING_LS) {
    pending.appendChild(li);
  } else {
    finished.appendChild(li);
  }

  btnDel.addEventListener("click", deleteInfo);
  btnFin.addEventListener("click", switchInfo);
}

function loadToDos() {
  const pendingOrigin = localStorage.getItem(PENDING_LS);
  const finishedOrigin = localStorage.getItem(FINISHED_LS);

  if (pendingOrigin !== null) {
    toDos = JSON.parse(pendingOrigin);
    toDos.forEach(function (info) {
      showList(PENDING_LS, info);
    });
  }
  if (finishedOrigin !== null) {
    finishedTasks = JSON.parse(finishedOrigin);
    finishedTasks.forEach(function (info) {
      showList(FINISHED_LS, info);
    });
  }
}

function init() {
  loadToDos();
  tasks.addEventListener("submit", savePendingLS);
}

init();
