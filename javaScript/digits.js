// DIGITS AND BASIC SYMBOLS
let isPiOre = false;
const digit = (number) => {
  if (number === "*") htmlString += "×";
  else htmlString += number;

  insertExpression();

  evalString += number;
  checkValidity();
  inavlidChangeColor();
  topIndex.user += 1;
  topIndex.programmer += 1;
  backSpace.user.push(topIndex.user);
  backSpace.programmer.push(topIndex.programmer);
  console.log(backSpace);
};
// TRIGONOMERTY AND LOG
const trigoAndLog = (fun) => {
  if (isInv) {
    if (fun == "log") {
      htmlString += "10^(";
      evalString += "10^(";
      topIndex.user += 4;
      topIndex.programmer += 4;
    } else {
      htmlString += fun + "<sup>-1</sup>(";
      evalString += "a" + fun + "(";
      topIndex.user += 17;
      topIndex.programmer += 5;
    }
  } else {
    htmlString += fun + "(";
    evalString += fun + "(";
    topIndex.user += 4;
    topIndex.programmer += 4;
  }
  checkValidity();
  insertExpression();
  inavlidChangeColor();
  backSpace.user.push(topIndex.user);
  backSpace.programmer.push(topIndex.programmer);
  console.log(backSpace);
};
// HYPERBOLIC
const hyperbolic = (fun) => {
  if (isInv) {
    htmlString += fun + "<sup>-1</sup>(";
    evalString += "a" + fun + "(";
    topIndex.user += 18;
    topIndex.programmer += 6;
  } else {
    htmlString += fun + "(";
    evalString += fun + "(";

    topIndex.user += 5;
    topIndex.programmer += 5;
  }
  insertExpression();
  console.log(evalString, htmlString);
  checkValidity();
  inavlidChangeColor();
  backSpace.user.push(topIndex.user);
  backSpace.programmer.push(topIndex.programmer);
  console.log(backSpace);
};
//POWER
document.querySelector("#pow").addEventListener("click", () => {
  htmlString += "^(";
  insertExpression();
  evalString += "^(";
  checkValidity();
  inavlidChangeColor();
  topIndex.user += 2;
  topIndex.programmer += 2;

  backSpace.user.push(topIndex.user);
  backSpace.programmer.push(topIndex.programmer);
});
//INVERSE
document.querySelector("#inv").addEventListener("click", () => {
  let logTrigo = document.querySelectorAll(".lt");
  let invT = document.querySelectorAll(".invT");

  if (!isInv) {
    document.querySelector("#inv").classList.toggle("activated");
    isInv = true;
    // let invTrigo=
    logTrigo.forEach((elem) => {
      if (elem.id === "log") {
        elem.innerHTML = "";
        elem.insertAdjacentHTML("beforeend", "10<sup>x</sup>");
      } else {
        elem.innerHTML = "";
        elem.insertAdjacentHTML(`beforeend`, `${elem.id}<sup>-1</sup>`);
      }
    });
    invT.forEach((elem) => {
      elem.innerHTML = "";
      elem.insertAdjacentHTML(`beforeend`, `${elem.id}<sup>-1</sup>`);
    });
  } else {
    document.querySelector("#inv").classList.toggle("activated");
    isInv = false;
    logTrigo.forEach((elem) => {
      if (elem.id === "log") {
        elem.innerHTML = "";
        elem.insertAdjacentHTML("beforeend", "log");
      } else {
        elem.innerHTML = "";
        elem.insertAdjacentHTML(`beforeend`, `${elem.id}`);
      }
    });

    invT.forEach((elem) => {
      elem.innerHTML = "";
      elem.insertAdjacentHTML(`beforeend`, `${elem.id}`);
    });
  }
  console.log(isInv);
});
//FOR x
document.querySelector(".x").addEventListener("click", () => {
  htmlString += "x";
  insertExpression();
  evalString += "x";
  checkValidity();
  inavlidChangeColor();
  topIndex.user += 1;
  topIndex.programmer += 1;
  backSpace.user.push(topIndex.user);
  backSpace.programmer.push(topIndex.programmer);
});

document.querySelector("#pi").addEventListener("click", () => {
  htmlString += "π";
  isPiOre = true;
  insertExpression();
  evalString += "3.142";
  checkValidity();
  inavlidChangeColor();
  topIndex.user += 1;
  topIndex.programmer += 5;
  backSpace.user.push(topIndex.user);
  backSpace.programmer.push(topIndex.programmer);
});
document.querySelector("#e").addEventListener("click", () => {
  htmlString += "e";

  insertExpression();
  evalString += "2.718";
  checkValidity();
  inavlidChangeColor();
  topIndex.user += 1;
  topIndex.programmer += 4;
  backSpace.user.push(topIndex.user);
  backSpace.programmer.push(topIndex.programmer);
});
// ALL CLEAR
document.querySelector("#ac").addEventListener("click", () => {
  inv = false;
  backSpace = {
    user: [],
    programmer: [],
  };
  topIndex = {
    user: -1,
    programmer: -1,
  };
  htmlString = "";
  evalString = "";
  isValid = "true";
  insertExpression();
  inavlidChangeColor();
});
// BACKSPACE
document.querySelector("#back").addEventListener("click", () => {
  htmlString = htmlString.substring(
    0,
    htmlString.length -
      (backSpace.user[backSpace.user.length - 1] -
        backSpace.user[backSpace.user.length - 2])
  );
  console.log(htmlString);
  evalString = evalString.substring(
    0,
    evalString.length -
      (backSpace.programmer[backSpace.programmer.length - 1] -
        backSpace.programmer[backSpace.programmer.length - 2])
  );
  insertExpression();
  console.log(htmlString);
  backSpace.user.pop();
  backSpace.programmer.pop();

  checkValidity();
  inavlidChangeColor();
});
