// INITIALIZING CANVAS
const canvas = document.querySelector("canvas");
canvas.height = innerHeight;
canvas.width = innerWidth;
canvas.style.backgroundColor = "black";
const pen = canvas.getContext("2d");
let isInv = false;
// RANDOM COLOR GENERATOR
function getRandomColor() {
  const letters = "0123456789ABCDE";
  let color = "#";

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 15)];
  }

  return color;
}
if (innerHeight < 600 || innerWidth < 700) {
  document.querySelector(".frosted-glass").style.display = "block";
  document.querySelector(".restrict").style.display = "flex";
} else {
  document.querySelector(".frosted-glass").style.display = "none";
  document.querySelector(".restrict").style.display = "none";
}
window.addEventListener("resize", () => {
  canvas.height = innerHeight;
  canvas.width = innerWidth;
  if (innerHeight < 700 || innerWidth < 700) {
    document.querySelector(".frosted-glass").style.display = "block";
    document.querySelector(".restrict").style.display = "flex";
  } else {
    document.querySelector(".frosted-glass").style.display = "none";
    document.querySelector(".restrict").style.display = "none";
  }
  pen.clearRect(0, 0, innerWidth, innerHeight);
  pen.lineWidth = 2;
  pen.beginPath();
  pen.moveTo(0, innerHeight / 2);
  pen.lineTo(innerWidth, innerHeight / 2);
  pen.strokeStyle = "#1B03A3";
  pen.stroke();
  pen.beginPath();
  pen.moveTo(innerWidth / 2, 0);
  pen.lineTo(innerWidth / 2, innerHeight);
  pen.strokeStyle = "#1B03A3";
  pen.stroke();
  pen.strokeStyle = "blue";
  pen.lineWidth = 2;
});
// MAKING SCALES
pen.moveTo(innerWidth / 2, innerHeight / 2);
const gui = new dat.GUI();

const wave = {
  Scale_X: 100,
  Scale_Y: 100,
};
let h = document.querySelector(".calculator__screen__expression");
gui.add(wave, "Scale_X", 0, 300);
gui.add(wave, "Scale_Y", 0, innerHeight / 2 - 70);

// MODIFYING FUNCTION
function modifyExpression(sign, userInput) {
  let newString;
  if (sign === "positive")
    newString = userInput.replace(/x/g, "${(x/wave.Scale_X)}");
  else {
    newString = userInput.replace(/x/g, "(${-x/wave.Scale_X})");
  }
  const templete = `\`${newString}\``;
  return templete;
}
let inv = false;
let backSpace = {
  user: [],
  programmer: [],
};
let topIndex = {
  user: -1,
  programmer: -1,
};
let htmlString = "";
let evalString = "";
let isValid = "false";
let htmlArray = [];
let colors = [];
const insertExpression = () => {
  const screen = document.querySelector(".calculator__screen__expression");
  screen.innerHTML = "";
  screen.insertAdjacentHTML("beforeend", htmlString);
  h.scrollLeft = h.scrollWidth;
};
const checkValidity = () => {
  let x = 1;
  const myExp = modifyExpression("positive", evalString);
  try {
    math.evaluate(eval(myExp));
    isValid = true;
  } catch (err) {
    isValid = false;
  }
};
const inavlidChangeColor = () => {
  if (!isValid) {
    document.querySelector(".calculator__screen").style.backgroundColor =
      "#e23d28";

    document.querySelector(".calculator__screen").style.color = "white";
  }
  if (isValid) {
    document.querySelector(".calculator__screen").style.backgroundColor =
      "rgb(183, 183, 181)";

    document.querySelector(".calculator__screen").style.color = "black";
  }
};
let expressions = [];
let modifedExpressions = [];
const modifyExpressionsArray = () => {
  modifedExpressions = expressions.map((exp) => {
    return {
      positive: modifyExpression("positive", exp),
      negative: modifyExpression("negative", exp),
    };
  });
};
modifyExpressionsArray();
let animationFrame;
console.log(modifedExpressions);
const exp = "sin (x)";
// ANIMATE THE GRAPHS
function animate() {
  pen.clearRect(0, 0, innerWidth, innerHeight);
  pen.lineWidth = 2;
  pen.beginPath();
  pen.moveTo(0, innerHeight / 2);
  pen.lineTo(innerWidth, innerHeight / 2);
  pen.strokeStyle = "#1B03A3";
  pen.stroke();
  pen.beginPath();
  pen.moveTo(innerWidth / 2, 0);
  pen.lineTo(innerWidth / 2, innerHeight);
  pen.strokeStyle = "#1B03A3";
  pen.stroke();
  pen.strokeStyle = "blue";
  pen.lineWidth = 2;

  modifedExpressions.forEach((exp, index) => {
    pen.strokeStyle = colors[index];
    pen.beginPath();
    for (let x = 0; x < innerWidth / 2; x++) {
      pen.lineTo(
        x + innerWidth / 2,
        innerHeight / 2 - math.evaluate(eval(exp.positive)) * wave.Scale_Y
      );

      pen.stroke();
    }
    pen.beginPath();
    for (let x = 0; x < innerWidth / 2; x++) {
      pen.lineTo(
        -x + innerWidth / 2,
        innerHeight / 2 - math.evaluate(eval(exp.negative)) * wave.Scale_Y
      );
      pen.stroke();
    }
  });
  animationFrame = requestAnimationFrame(animate);
}
animate();
cancelAnimationFrame(animationFrame);
