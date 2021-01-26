const tasks = document.querySelector(".js-add");
const tasksValue = tasks.querySelector("input");
const tasksTime = tasks
  .querySelector(".js-add-time")
  .querySelectorAll("select");
const pending = document.querySelector(".js-pending");
const pendingTime = document.querySelector(".js-pending-time");
const scheduleAdd = document.querySelector(".main__schedule");
const scheduleAddIcon = scheduleAdd.querySelector("i");
// const finished = document.querySelector(".finished");

const PENDING_LS = "pending";
const FINISHED_LS = "finished";
const STATUS_PENDING = "on";
const STATUS_FINISHED = "fin";

let toDos = [];
let finishedTasks = [];

function switchInfo(e) {
  const li = e.target.parentNode.parentNode;

  const delToDo = toDos.filter(function (info) {
    return info.id === li.id.replace("pending", "");
  });
  if (li.classList[0] === PENDING_LS) {
    console.log("완료로 변경");
    toDos.forEach(function (info) {
      if (info.id === li.id.replace("pending", "")) {
        info.status = STATUS_FINISHED;
      }
    });
    localStorage.setItem(PENDING_LS, JSON.stringify(toDos));

    li.classList.remove(PENDING_LS);
    li.classList.add(FINISHED_LS);
    li.querySelector("span").innerHTML = `<del>${delToDo[0].text}</del>`;
    const checkIcon = li.querySelector("i.fa-circle");
    checkIcon.classList.add("fa-check-circle");
    checkIcon.classList.add("fas");
    checkIcon.classList.remove("fa-circle");
    checkIcon.classList.remove("far");
    const startTimePosition =
      (parseInt(delToDo[0].time[0]) - 9) * 6 + parseInt(delToDo[0].time[1]);
    const endTimePosition =
      (parseInt(delToDo[0].time[2]) - 9) * 6 + parseInt(delToDo[0].time[3]);
    for (var i = startTimePosition; i < endTimePosition; i++) {
      document.querySelector(`.pt${i}`).classList.remove("on");
      document.querySelector(`.pt${i}`).classList.add("fin");
    }
  } else {
    console.log("진행중으로 변경");
    toDos.forEach(function (info) {
      if (info.id === li.id.replace("pending", "")) {
        info.status = STATUS_PENDING;
      }
    });
    localStorage.setItem(PENDING_LS, JSON.stringify(toDos));

    li.classList.add(PENDING_LS);
    li.classList.remove(FINISHED_LS);
    li.querySelector("span").innerHTML = `${delToDo[0].text}`;
    const checkIcon = li.querySelector("i.fa-check-circle");
    checkIcon.classList.remove("fa-check-circle");
    checkIcon.classList.remove("fas");
    checkIcon.classList.add("fa-circle");
    checkIcon.classList.add("far");
    const startTimePosition =
      (parseInt(delToDo[0].time[0]) - 9) * 6 + parseInt(delToDo[0].time[1]);
    const endTimePosition =
      (parseInt(delToDo[0].time[2]) - 9) * 6 + parseInt(delToDo[0].time[3]);
    for (var i = startTimePosition; i < endTimePosition; i++) {
      document.querySelector(`.pt${i}`).classList.add("on");
      document.querySelector(`.pt${i}`).classList.remove("fin");
    }
  }
}

function deleteInfo(e) {
  const li = e.target.parentNode;
  const emptyLi = document.createElement("li");
  const newToDos = toDos.filter(function (info) {
    return info.id !== li.id.replace("pending", "");
  });
  const delToDo = toDos.filter(function (info) {
    return info.id === li.id.replace("pending", "");
  });

  toDos = newToDos;
  pending.replaceChild(emptyLi, li);

  const startTimePosition =
    (parseInt(delToDo[0].time[0]) - 9) * 6 + parseInt(delToDo[0].time[1]);
  const endTimePosition =
    (parseInt(delToDo[0].time[2]) - 9) * 6 + parseInt(delToDo[0].time[3]);
  for (var i = startTimePosition; i < endTimePosition; i++) {
    document.querySelector(`.pt${i}`).classList.remove("on");
  }

  localStorage.setItem(PENDING_LS, JSON.stringify(toDos));
}

function saveFinishedLS(li) {
  const infoObj = {
    id: li.id,
    text: li.querySelector("span").innerHTML,
  };
  finishedTasks.push(infoObj);
  localStorage.setItem(FINISHED_LS, JSON.stringify(finishedTasks));
  showList(infoObj);
}

function savePendingLS(e) {
  e.preventDefault();
  const saveText = tasksValue.value;
  const timeList = [];
  tasksTime.forEach(function (t) {
    timeList.push(t.value);
  });
  let idNum = `${timeList[0]}`;

  //   if (localStorage.getItem("idNum") !== null) {
  //     idNum = parseInt(localStorage.getItem("idNum"), 10) + 1;
  //   }

  let toDosObj = {};
  if (e.id === undefined) {
    toDosObj = {
      id: idNum,
      text: saveText,
      time: timeList,
      status: STATUS_PENDING,
    };
  } else {
    toDosObj = {
      id: e.id,
      text: saveText,
      time: timeList,
      status: STATUS_PENDING,
    };
  }
  toDos.push(toDosObj);
  localStorage.setItem(PENDING_LS, JSON.stringify(toDos));
  tasksValue.value = "";
  tasksTime.forEach(function (t) {
    t.value = "-";
  });
  showList(toDosObj);

  //   localStorage.setItem("idNum", idNum);
}

function showList(info) {
  const li = document.createElement("li");
  const div = document.createElement("div");
  const iconFin = document.createElement("i");
  const span = document.createElement("span");
  const iconDel = document.createElement("i");

  li.id = `pending${info.id}`;

  if (info.status === STATUS_PENDING) {
    li.classList.add(PENDING_LS);
    span.innerHTML = info["text"];
    iconFin.classList.add("far");
    iconFin.classList.add("fa-circle");
  } else {
    li.classList.add(FINISHED_LS);
    span.innerHTML = `<del>${info["text"]}</del>`;
    iconFin.classList.add("fas");
    iconFin.classList.add("fa-check-circle");
  }

  iconDel.classList.add("fas");
  iconDel.classList.add("fa-trash-alt");

  const insertPosition = pending.querySelector(`#pending${info.id}`);
  div.appendChild(iconFin);
  div.appendChild(span);
  li.appendChild(div);
  li.appendChild(iconDel);
  pending.replaceChild(li, insertPosition);

  const startTimePosition =
    (parseInt(info.time[0]) - 9) * 6 + parseInt(info.time[1]);
  const endTimePosition =
    (parseInt(info.time[2]) - 9) * 6 + parseInt(info.time[3]);
  for (var i = startTimePosition; i < endTimePosition; i++) {
    document.querySelector(`.pt${i}`).classList.add(info.status);
  }

  iconDel.addEventListener("click", deleteInfo);
  iconFin.addEventListener("click", switchInfo);
}

function loadToDos() {
  const pendingOrigin = localStorage.getItem(PENDING_LS);

  if (pendingOrigin !== null) {
    toDos = JSON.parse(pendingOrigin);
    toDos.forEach(function (info) {
      showList(info);
    });
  }
}

function focusTime() {
  tasksTime[0].focus();
}
// function selectValidation(e) {
//   let selectTimeValue = e.target.value;
//   const startHours = tasksTime[0].value;
//   const endHours = tasksTime[2].value;
//   const startMinutes = tasksTime[1].value;
//   const endMinutes = tasksTime[3].value;

//   if (startHours > endHours || startMinutes > endMinutes) {
//     alert("Wrong TIME.");
//     console.log(selectTimeValue);
//     return;
//   }
// }

function init() {
  loadToDos();
  tasks.addEventListener("submit", savePendingLS);
  scheduleAddIcon.addEventListener("click", focusTime);
  //   tasksTime.forEach(function (t) {
  //     t.addEventListener("focus", selectValidation);
  //     t.addEventListener("change", selectValidation);
  //   });
}

init();
