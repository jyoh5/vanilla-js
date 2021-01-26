// <⚠️ DONT DELETE THIS ⚠️>
// import "./styles.css";
const colors = ["#1abc9c", "#3498db", "#9b59b6", "#f39c12", "#e74c3c"];
// <⚠️ /DONT DELETE THIS ⚠️>

/*
✅ The text of the title should change when the mouse is on top of it.
✅ The text of the title should change when the mouse is leaves it.
✅ When the window is resized the title should change.
✅ On right click the title should also change.
✅ The colors of the title should come from a color from the colors array.
✅ DO NOT CHANGE .css, or .html files.
✅ ALL function handlers should be INSIDE of "superEventHandler"
*/
const superEventHandler = {
  mouseIn: function (e) {
    title.innerHTML = "Welcome!";
    title.style.color = colors[0];
  },
  mouseOut: function (e) {
    title.innerHTML = "Don't go ㅜㅜ";
    title.style.color = colors[1];
  },
  windowResize: function (e) {
    title.innerHTML = "The window size is just changed.";
    title.style.color = colors[2];
  },
  rightClick: function (e) {
    title.innerHTML = "Right click~!";
    title.style.color = colors[3];
  }
};

const title = document.querySelector("h2");

title.addEventListener("mouseover", superEventHandler.mouseIn);
title.addEventListener("mouseleave", superEventHandler.mouseOut);
window.addEventListener("resize", superEventHandler.windowResize);
window.addEventListener("contextmenu", superEventHandler.rightClick);
