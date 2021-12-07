const fs = require("fs");
const data = fs.readFileSync("input.txt", "utf8");
const lines = data.split(/\r?\n/);
const BOARD_SIZE = 5;

function solve1() {

  const drawNumbers = lines[0].split(",");
  let boards = [];
  let markedBoards = [];
  let index = 1;


  let Boards = [];

  for (let i = 0; i < lines.length; i++) {



   }

  while (index < lines.length) {
    if (lines[index] === "") {
      let newBoard = [];
      for (let i = index + 1; i < index + BOARD_SIZE + 1; i++) {
        newBoard.push(lines[i].trim().split(/\s+/));
      }

      let initialMarkedBoard = [];
      for (let i = 0; i < BOARD_SIZE; i++) {
        let row = [];
        for (let j = 0; j < BOARD_SIZE; j++) {
          row.push(false);
        }
        initialMarkedBoard.push(row);
      }

      boards.push(newBoard);
      markedBoards.push(initialMarkedBoard);
    }
    index++;
  }

  // start bingo
  let drawNumberIndex = 0;
  let winnerBoard = [];
  let winnerMarkedBoard = [];
  while (drawNumberIndex < drawNumbers.length && !winnerBoard.length) {
    for (let i = 0; i < boards.length; i++) {
      for (let boardY = 0; boardY < BOARD_SIZE; boardY++) {
        for (let boardX = 0; boardX < BOARD_SIZE; boardX++) {
          if (boards[i][boardY][boardX] === drawNumbers[drawNumberIndex]) {
            markedBoards[i][boardY][boardX] = true;
          }
        }
      }
      if (isBingo(markedBoards[i])) {
        winnerBoard = boards[i];
        winnerMarkedBoard = markedBoards[i];
        break;
      }
    }
    drawNumberIndex++;
  }

  // find result
  let sum = 0;
  for (let y = 0; y < BOARD_SIZE; y++) {
    for (let x = 0; x < BOARD_SIZE; x++) {
      if (!winnerMarkedBoard[y][x]) {
        sum += parseInt(winnerBoard[y][x], 10);
      }
    }
  }

  console.log(
    `Problem 1 answer: ${sum * parseInt(drawNumbers[drawNumberIndex - 1], 10)}`
  );
  console.timeEnd("Problem 1 run time");
}

function isBingo(board) {
  for (let i = 0; i < BOARD_SIZE; i++) {
    let horizontalBingo = true;
    let verticalBingo = true;

    for (let j = 0; j < BOARD_SIZE; j++) {
      horizontalBingo = horizontalBingo && board[i][j];
      verticalBingo = verticalBingo && board[j][i];
    }

    if (horizontalBingo || verticalBingo) {
      return true;
    }
  }

  return false;
}

// ------------ PROBLEM 2 ------------
function problem2() {
  console.time("Problem 2 run time");
  // read data
  const drawNumbers = lines[0].split(",");
  let bingoBoards = [];
  let markedBoards = [];

  let index = 1;
  while (index < lines.length) {
    if (lines[index] === "") {
      let newBoard = [];
      for (let i = index + 1; i < index + BOARD_SIZE + 1; i++) {
        newBoard.push(lines[i].trim().split(/\s+/));
      }

      let initialMarkedBoard = [];
      for (let i = 0; i < BOARD_SIZE; i++) {
        let row = [];
        for (let j = 0; j < BOARD_SIZE; j++) {
          row.push(false);
        }
        initialMarkedBoard.push(row);
      }

      bingoBoards.push(newBoard);
      markedBoards.push(initialMarkedBoard);
    }
    index++;
  }

  // start bingo
  let drawNumberIndex = 0;
  let winnerBoard = [];
  let winnerMarkedBoard = [];
  while (drawNumberIndex < drawNumbers.length && !winnerBoard.length) {
    for (let i = 0; i < bingoBoards.length; i++) {
      for (let boardY = 0; boardY < BOARD_SIZE; boardY++) {
        for (let boardX = 0; boardX < BOARD_SIZE; boardX++) {
          if (bingoBoards[i][boardY][boardX] === drawNumbers[drawNumberIndex]) {
            markedBoards[i][boardY][boardX] = true;
          }
        }
      }
      if (isBingo(markedBoards[i])) {
        if (markedBoards.length == 1) {
          winnerBoard = bingoBoards[i];
          winnerMarkedBoard = markedBoards[i];
          break;
        } else {
          bingoBoards.splice(i, 1);
          markedBoards.splice(i, 1);
          i--;
        }
      }
    }
    drawNumberIndex++;
  }

  // find result
  let sum = 0;
  for (let y = 0; y < BOARD_SIZE; y++) {
    for (let x = 0; x < BOARD_SIZE; x++) {
      if (!winnerMarkedBoard[y][x]) {
        sum += parseInt(winnerBoard[y][x], 10);
      }
    }
  }

  console.log(
    `\nProblem 2 answer: ${
      sum * parseInt(drawNumbers[drawNumberIndex - 1], 10)
    }`
  );
  console.timeEnd("Problem 2 run time");
}

solve1();
problem2();
