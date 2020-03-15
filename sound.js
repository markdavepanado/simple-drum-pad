var keysdown = {};

window.addEventListener("keydown", play);
window.addEventListener("keyup", play);

function play(e) {
  // console.log(keysdown);
  if (!(e.key in keysdown)) {
    keysdown[e.key] = true;
    // key first pressed
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);

    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);

    const keypress = document.getElementsByClassName("key-details-youpress");
    const message = document.getElementsByClassName("message-details-youpress");
    const imageMessage = document.getElementsByClassName(
      "image-youpress-container"
    );

    const soundName = document.getElementsByClassName("sound-details-youpress");

    keypress[0].innerHTML = truncate(e.key, 6);

    message[0].style.display = "flex";

    if (!audio) {
      imageMessage[0].children[0].setAttribute("src", "images/fail.ico");
      imageMessage[0].children[0].setAttribute("alt", "Wrong");
      message[0].children[0].innerHTML = "Oops! wrong key";
      soundName[0].innerHTML = "No sound";
      return;
    } else {
      soundName[0].innerHTML = "Sound: " + key.children[0].innerHTML;
      audio.currentTime = 0;
      audio.play();
      key.classList.add("playing");

      addRemoveEventListener();

      imageMessage[0].children[0].setAttribute("src", "images/success.ico");
      imageMessage[0].children[0].setAttribute("alt", "Success");
      message[0].children[0].innerHTML = "Good! keep going";
    }
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
}, 500);

// ==> for adding dots when string is too long
function truncate(string, length, delimiter) {
  delimiter = delimiter || "&hellip;";
  return string.length > length ? string.substr(0, length) + delimiter : string;
}
