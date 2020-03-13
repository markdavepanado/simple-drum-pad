const helpButton = document.getElementById("helpImg");

helpButton.addEventListener("click", help);

function help() {
  const helpTextContainer = document.getElementsByClassName(
    "img-help-text-container"
  );

  helpTextContainer[0].classList.toggle("active");
}
