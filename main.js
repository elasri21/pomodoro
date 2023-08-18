//
const timer = document.querySelector(".content .number");
let strNum = timer.textContent.trim().split(":");
const pause = document.querySelector(".content .pause");
const cont = document.querySelector(".content .continue");
const gear = document.querySelector(".settings");
const settingsBox = document.querySelector(".settings-box");
const eksBtn = document.querySelector(".settings-box .x");
const apply = document.querySelector(".applay");
const circle = document.querySelector(".timer-box svg circle");
gear.addEventListener("click", function () {
  settingsBox.style.display = "block";
});
eksBtn.addEventListener("click", function () {
  settingsBox.style.display = "none";
});
function upDateTimer(field) {
  let tot = parseInt(field.value.trim());
  return tot;
}

apply.addEventListener("click", function () {
  let fields = Array.from(document.querySelectorAll(".field-min"));
  let field = fields.filter((f) => f.value != "")[0];
  settingsBox.style.display = "none";
  let total = upDateTimer(field);
  let dur = total;

  function test() {
    let min = Math.floor(total / 60);
    let sec = total % 60;
    let strmin = min < 10 ? `0${min}` : `${min}`;
    let strsec = sec < 10 ? `0${sec}` : `${sec}`;
    timer.textContent = `${strmin}:${strsec}`;
    total--;
    if (total == -1) {
      clearInterval(tt);
    }
    circle.style.animation = `countdown ${dur}s linear 1 forwards`;
  }
  let tt = setInterval(test, 1000);
  let isClicked = false;
  pause.addEventListener("click", function (e) {
    if (!isClicked) {
      clearInterval(tt);
      circle.style.animationPlayState = "paused";
    } else {
      tt = setInterval(test, 1000);
      circle.style.animationPlayState = "running";
    }
    isClicked = !isClicked;
  });
});
// change colors
const colors = Array.from(document.querySelectorAll(".colors span"));
const chooseTimer = Array.from(document.querySelectorAll(".choose-timer span"));
colors.forEach((color) => {
  color.addEventListener("click", function () {
    for (let i = 0; i < colors.length; i++) {
      colors[i].classList.remove("active");
    }
    apply.style.backgroundColor = `#${this.dataset.color}`;
    this.classList.add("active");
    chooseTimer.forEach((box) => {
      if (box.classList.contains("active")) {
        box.style.backgroundColor = `#${this.dataset.color}`;
      } else {
        box.style.backgroundColor = "#060646";
      }
    });
  });
});

// fix family font
const fonts = Array.from(document.querySelectorAll(".fonts span"));
fonts.forEach((font) => {
  font.addEventListener("click", function () {
    for (let i = 0; i < fonts.length; i++) {
      fonts[i].classList.remove("active");
    }
    document.body.style.fontFamily = this.dataset.font;
    this.classList.add("active");
  });
});
