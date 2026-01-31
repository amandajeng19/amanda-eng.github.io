// Learned to create the accordion from here: https://www.w3schools.com/howto/howto_js_accordion.asp

var accord = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < accord.length; i++) {
  accord[i].addEventListener("click", function () {
    this.classList.toggle("active");

    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}
