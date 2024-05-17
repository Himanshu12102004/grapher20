const graph = document.querySelector("#graph");
const box = document.querySelector(".inputAndShow__show");
const createHtml = (html, index) => {
  return `  <div class="plottedGraphs plottedGraph${index}">
  <div class="srNo">${index + 1}.</div>
  <div class="function">f(x)=${html}</div>
  <div class="cross">
    <img class="crossInit" onclick="cross(${index})" height="30px" src="./cross.png" />
  </div>
</div>`;
};
const insertFunctions = () => {
  box.innerHTML = "";
  htmlArray.forEach((elem, index) => {
    let htmlToBeInserted = createHtml(elem, index);

    box.insertAdjacentHTML("beforeend", htmlToBeInserted);
    document.querySelector(`.plottedGraph${index}`).style.backgroundColor =
      colors[index];
  });
};
graph.addEventListener("click", () => {
  if (isValid) {
    expressions.push(evalString);
    document.querySelector(".calculator").style.display = "none";
    document.querySelector(".frosted-glass").style.display = "none";
    modifyExpressionsArray();
    colors.push(getRandomColor());
    htmlArray.push(htmlString);
    insertFunctions();
    animate();
  }
});
document.querySelector(".inputAndShow__input").addEventListener("click", () => {
  cancelAnimationFrame(animationFrame);
  document.querySelector(".calculator").style.display = "flex";
  document.querySelector(".frosted-glass").style.display = "block";
});
const cross = (index) => {
  expressions.splice(index, 1);
  modifyExpressionsArray();
  htmlArray.splice(index, 1);
  colors.splice(index, 1);
  insertFunctions();
};
