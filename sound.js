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

    const keys = document.querySelectorAll(".key");
    keys.forEach(key => key.addEventListener("transitionend", removeClass));
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

function clickKey() {
  const dataKey = this.getAttribute("data-key");

  const audio = document.querySelector(`audio[data-key="${dataKey}"]`);

  audio.currentTime = 0;
  audio.play();

  this.classList.add("playing");

  const keys = document.querySelectorAll(".key");
  keys.forEach(key => key.addEventListener("transitionend", removeClass));
}

function mouseUpKey() {
  console.log(this);

  this.classList.remove("playing");
}
