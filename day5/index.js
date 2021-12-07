const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: fs.createReadStream("input.txt"),
  output: process.stdout,
  terminal: false,
});

// Keeps track of points for PART ONE
const points = {};
// Keeps track of points for PART TWO
const allPoints = {};

rl.on("line", (line) => {
  const points = line.split(" -> ");
  const [x1, y1] = points[0].split(",").map((v) => Number(v));
  const [x2, y2] = points[1].split(",").map((v) => Number(v));
  populatePoints(x1, y1, x2, y2);
});

rl.on("close", () => {
  console.log(
    "Number of points where at least 2 vertical/horizontal lines overlap:"
  );
  console.log(Object.values(points).filter((val) => val >= 2).length);
  // PART TWO
  console.log("Number of points where at least 2 lines overlap:");
  console.log(Object.values(allPoints).filter((val) => val >= 2).length);
});

function populatePoints(x1, y1, x2, y2) {
  const isHorizontal = y1 === y2;
  const isVertical = x1 === x2;
  if (isHorizontal) {
    const allXs = x1 > x2 ? range(x2, x1) : range(x1, x2);
    for (let x of allXs) {
      incrementPoint(x, y1);
    }
  } else if (isVertical) {
    const allYs = y1 > y2 ? range(y2, y1) : range(y1, y2);
    for (let y of allYs) {
      incrementPoint(x1, y);
    }
  } else {
    // PART TWO
    const currentPoint = [x1, y1];
    const goingRight = x2 > x1;
    const goingDown = y2 > y1;
    while (currentPoint[0] !== x2) {
      const point = `${currentPoint[0]},${currentPoint[1]}`;
      allPoints[point] = allPoints[point] ? allPoints[point] + 1 : 1;
      currentPoint[0] = goingRight ? currentPoint[0] + 1 : currentPoint[0] - 1;
      currentPoint[1] = goingDown ? currentPoint[1] + 1 : currentPoint[1] - 1;
    }
    currentPoint[0] = x2;
    currentPoint[1] = y2;
    const point = `${currentPoint[0]},${currentPoint[1]}`;
    allPoints[point] = allPoints[point] ? allPoints[point] + 1 : 1;
  }
}

function incrementPoint(x, y) {
  const point = `${x},${y}`;
  points[point] = points[point] ? points[point] + 1 : 1;
  allPoints[point] = allPoints[point] ? allPoints[point] + 1 : 1;
}

function range(min, max) {
  return [...Array(max - min + 1).keys()].map((i) => i + min);
}
