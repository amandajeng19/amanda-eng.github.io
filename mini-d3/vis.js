import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

let svg;
let circle;
const width = 800;
const height = 600;
let circleCount = 0;

async function prepareVis() {
  svg = d3.create("svg").attr("width", width).attr("height", height);
  viscontainer.append(svg.node());
  // Set attributes for D3 container canvas
}

async function drawCircle(x, y) {
  if (circleCount < 10) {
    circle = svg
      .append("circle")
      .attr("r", 15)
      .attr("fill", "black")
      .attr("cx", x)
      .attr("cy", y);
    circleCount += 1;
    console.log(circleCount);
  } else {
    alert("Maximum circles reached.");
  }
}

async function runApp() {
  await prepareVis();
  await drawCircle(55, 25);
  svg.on("click", handleClick);
}

async function handleClick(event) {
  // Get the coordinates of the click event relative to the SVG container
  const [x, y] = d3.pointer(event);

  // Draw new circle using coordinates
  await drawCircle(x, y);
}

runApp();
