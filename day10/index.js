const fs = require("fs");
const lines = fs.readFileSync("input.txt", "utf-8").split("\n");

function part1(lines) {
  const openers = "{(<[";
  const brackets = {
    "}": "{",
    ")": "(",
    ">": "<",
    "]": "[",
  };

  const costs = { ")": 3, "]": 57, "}": 1197, ">": 25137 };
  function getCost(line) {
    let stack = [];
    for (i in line) {
      if (openers.includes(line[i])) {
        stack.push(line[i]);
      } else {
        if (brackets[line[i]] != stack.pop()) {
          return costs[line[i]];
        }
      }
    }
    return 0;
  }
  let sum = 0;
  for (x in lines) sum += getCost(lines[x]);
  console.log("SUM : ", sum);
}

function part2(lines) {
  const openers = "{(<[";
  const brackets = {
    "}": "{",
    ")": "(",
    ">": "<",
    "]": "[",
  };

  let uncomplete = [];

  function isCorrupted(line) {
    let stack = [];
    for (i in line) {
      if (openers.includes(line[i])) {
        stack.push(line[i]);
      } else {
        if (brackets[line[i]] != stack.pop()) {
          return false;
        }
      }
    }
    return true;
  }

  for (x in lines) if (isCorrupted(lines[x])) uncomplete.push(lines[x]);

  let scores = [];
  for (let i = 0; i < uncomplete.length; i++) {
    scores.push(getCost(uncomplete[i]));
  }

  scores = scores.sort((a, b) => a - b);

  console.log(`\nProblem 2 answer: ${scores[Math.trunc(scores.length / 2)]}`);

  function getCost(line) {
    const brackets = { "{": "}", "(": ")", "<": ">", "[": "]" };
    const costs = { ")": 1, "]": 2, "}": 3, ">": 4 };
    let stack = [];
    for (let i = 0; i < line.length; i++) {
      if (openers.includes(line[i])) {
        stack.push(line[i]);
      } else {
        stack.pop();
      }
    }

    let completed = "";
    while (stack.length > 0) {
      completed += brackets[stack.pop()];
    }

    let score = 0;
    for (let i = 0; i < completed.length; i++) {
      score = score * 5 + costs[completed[i]];
    }
    return score;
  }
}

// part1(lines);
part2(lines);
