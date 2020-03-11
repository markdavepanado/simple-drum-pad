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
