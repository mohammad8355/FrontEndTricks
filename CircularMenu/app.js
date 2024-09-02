var circles = document.querySelectorAll(".circle");
var circlesATags = document.querySelectorAll(".circle a");
var centerCircleSpan = document.querySelector("#centerCircle span");
var circleCenter = document.querySelector("#centerCircle");
var circleWrapper = document.querySelector(".circle-wrapper");
var isOpen = true;
circleCenter.addEventListener("click", () => {
  var angle = 45;
  Array.prototype.forEach.call(circles, function (circle, index) {
    setTimeout(() => {
      if (!isOpen) {
        circle.style.left = 0;
        circle.style.transform = "rotate(" + angle * (index + 1) + "deg)";
        circlesATags[index].style.transform =
          "rotate(" + angle * -(index + 1) + "deg)";
        centerCircleSpan.style.transform = "rotate(45deg)";
      } else {
        circle.style.left = "40%";
        circle.style.transform = "rotate(0deg)";
        circleWrapper.classList.remove("rotate");
        centerCircleSpan.style.transform = "rotate(0)";
      }
    }, 200);
  });
  isOpen = !isOpen;
});
let isDragging = false;
let startX, startY, initialAngle;

const startDrag = (e) => {
  isDragging = true;
  const touch = e.touches ? e.touches[0] : e;
  startX = touch.clientX;
  startY = touch.clientY;
  const rect = circleWrapper.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  initialAngle = Math.atan2(startY - centerY, startX - centerX);
};

const drag = (e) => {
  if (isDragging) {
    const touch = e.touches ? e.touches[0] : e;
    const rect = circleWrapper.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const currentAngle = Math.atan2(
      touch.clientY - centerY,
      touch.clientX - centerX
    );
    const rotation = (currentAngle - initialAngle) * (180 / Math.PI);
    circleWrapper.style.transform = ` rotate(${rotation}deg)`;
    Array.prototype.forEach.call(circlesATags, function (tag) {
      tag.style.transform = ` rotate(${rotation}deg)`;
    });
  }
};

const endDrag = () => {
  isDragging = false;
};

circleWrapper.addEventListener("mousedown", startDrag);
document.addEventListener("mousemove", drag);
document.addEventListener("mouseup", endDrag);

circleWrapper.addEventListener("touchstart", startDrag);
document.addEventListener("touchmove", drag);
document.addEventListener("touchend", endDrag);
