const helpButton = document.getElementById("helpImg");

helpButton.addEventListener("click", help);

function help() {
  const helpTextContainer = document.getElementsByClassName(
    "img-help-text-container"
  );
  //   console.log("clicked");
  //   console.log(this);

  //   console.log(helpTextContainer[0]);

  helpTextContainer[0].classList.toggle("active");
}
