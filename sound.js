var keysdown = {};

window.addEventListener("keydown", play);

function play(e) {
  // console.log(keysdown);
  if (!(e.key in keysdown)) {
    keysdown[e.key] = true;
    // key first pressed
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);

    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);

    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
    key.classList.add("playing");

    addRemoveEventListener();
  }
}

function removeClass(e) {
  if (e.propertyName !== "transform") return;
  this.classList.remove("playing");
}

window.addEventListener("keyup", stop);

function stop(e) {
  delete keysdown[e.key];
}

addClickEventListener();

function addClickEventListener() {
  const keys = document.querySelectorAll(`.key`);

  try {
    for (var i = 0; i <= keys.length; i++) {
      keys[i].addEventListener("click", clickKey);
    }
  } catch (e) {
    // do nothing
  }
}

var pendingClick = 0;

function clickKey(e) {
  // e.preventDefault();
  // console.log(e);

  this.classList.remove("playing");
  const dataKey = this.getAttribute("data-key");

  const audio = document.querySelector(`audio[data-key="${dataKey}"]`);

  audio.currentTime = 0;
  audio.play();

  this.classList.add("playing");

  addRemoveEventListener();
}

function addRemoveEventListener() {
  const keys = document.querySelectorAll(".key");
  keys.forEach(key => key.addEventListener("transitionend", removeClass));
}

// check every 1 second if there is class playing because of multiple click bug
window.setInterval(function() {
  const keys = document.querySelectorAll(".key");

  try {
    for (var i = 0; i <= keys.length; i++) {
      keys[i].classList.remove("playing");
    }
  } catch (e) {
    //do nothing
  }
}, 1000);
