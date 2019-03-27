let timeout,
  mouseStopDelay = 200;

document.addEventListener("mousemove", function(e) {
  clearTimeout(timeout);
  timeout = setTimeout(function() {
    var event = new CustomEvent("mousestop", {
      detail: {
        clientX: e.clientX,
        clientY: e.clientY
      },
      bubbles: true,
      cancelable: true
    });
    e.target.dispatchEvent(event);
  }, mouseStopDelay);
});
document.getElementById("sphere").addEventListener("mousestop", function(e) {
  // document.getElementsByClassName("contact")[0].style.opacity = 0;
  const classList = document.getElementsByClassName("contact")[0].classList;
  if (classList.contains("fade-out")) return;
  console.log("fade out");
  document.getElementsByClassName("contact")[0].classList.remove("fade-in");
  document.getElementsByClassName("contact")[0].classList.add("fade-out");
});
document.getElementById("sphere").addEventListener("mousemove", function(e) {
  // document.getElementsByClassName("contact")[0].style.opacity = 0.9;
  const classList = document.getElementsByClassName("contact")[0].classList;
  if (classList.contains("fade-in")) return;
  console.log("fade in");
  document.getElementsByClassName("contact")[0].classList.remove("fade-out");
  document.getElementsByClassName("contact")[0].classList.add("fade-in");
});
