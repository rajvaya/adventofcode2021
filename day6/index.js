const input = [
  1, 1, 1, 1, 1, 1, 1, 4, 1, 2, 1, 1, 4, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 5, 1, 1, 1, 1, 3, 1, 1, 2, 1, 2, 1, 3, 3, 4, 1, 4, 1, 1, 3, 1, 1, 5,
  1, 1, 1, 1, 4, 1, 1, 5, 1, 1, 1, 4, 1, 5, 1, 1, 1, 3, 1, 1, 5, 3, 1, 1, 1, 1,
  1, 4, 1, 1, 1, 1, 1, 2, 4, 1, 1, 1, 1, 4, 1, 2, 2, 1, 1, 1, 3, 1, 2, 5, 1, 4,
  1, 1, 1, 3, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 2,
  1, 1, 5, 1, 1, 1, 4, 1, 1, 5, 1, 1, 5, 3, 3, 5, 3, 1, 1, 1, 4, 1, 1, 1, 1, 1,
  1, 5, 3, 1, 2, 1, 1, 1, 4, 1, 3, 1, 5, 1, 1, 2, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1,
  1, 2, 1, 1, 1, 1, 4, 3, 2, 1, 2, 4, 1, 3, 1, 5, 1, 2, 1, 4, 1, 1, 1, 1, 1, 3,
  1, 4, 1, 1, 1, 1, 3, 1, 3, 3, 1, 4, 3, 4, 1, 1, 1, 1, 5, 1, 3, 3, 2, 5, 3, 1,
  1, 3, 1, 3, 1, 1, 1, 1, 4, 1, 1, 1, 1, 3, 1, 5, 1, 1, 1, 4, 4, 1, 1, 5, 5, 2,
  4, 5, 1, 1, 1, 1, 5, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1,
  1, 5, 1, 1, 1, 1, 1, 1, 3, 1, 1, 2, 1, 1,
];

const testinput = [3, 4, 3, 1, 2];

let addNewCount = 0;

// function addNewFish(count, input) {
//   for (let i = 0; i < input.length; i++) {
//     if (input[i] === 0) {
//       input[i] = 6;
//     }
//   }
//   for (let i = 0; i < count; i++) {
//     console.log("adding");
//     input.push(8);
//   }

//   addNewCount = 0;
// }

function decreaseTimer(x, len) {
  for (let i = 0; i < len; i++) {
    if (x[i] === 0) {
      x[i] = 7;
      x.push(8);
    }

    if (x[i] > 0) {
      x[i]--;
    }
  }
}

function solve1(input, days) {
  //   console.log("INITIAL : ", input);
  for (let i = 0; i < 180; i++) {
    console.log(`computing day ${i}`);
    try {
      decreaseTimer(input, input.length);
    } catch (error) {
      console.log("ERROR DAY", i);
      break;
    }
  }

  console.log(`Total Fish after day ${days} : `, input.length);
}

// solve1(testinput, 256);

function decreaseTimerWithMap(x, len) {
  for (let i = 0; i < len; i++) {
    if (x.get(`fish${i + 1}`) === 0) {
      x.set(`fish${i + 1}`, 7);
      x.set(`fish${x.size + 1}`, 8);
    }

    if (x.get(`fish${i + 1}`) > 0) {
      x.set(`fish${i + 1}`, x.get(`fish${i + 1}`) - 1);
    }
  }
}

function solve2(testinput, days) {
  let FishMap = new Map();
  console.log("solving part2 using Maps");

  testinput.forEach((element, index) => {
    FishMap.set(`fish${index + 1}`, element);
  });
  console.log(FishMap.size);
  for (let i = 0; i < 256; i++) {
    console.log("Computing DAY : ", i);

    try {
      decreaseTimerWithMap(FishMap, FishMap.size);
      console.log(`Fishes after day : ${i} `, FishMap.size);
    } catch (error) {
      console.log("MAP SIZE EXCED");
    }
  }
}

function makeArrays(nos) {
  let arrays = [];
  for (let i = 1; i <= nos; i++) {
    arrays.push(new Array());
  }

  return arrays;
}

function decreaseTimerForMultipleArray(x, len, index, day) {
  for (let i = 0; i < len; i++) {
    if (x[index][i] === 0) {
      x[index][i] = 6;
      x[index + 1].push(8);
    }

    if (x[index][i] > 0) {
      x[index][i]--;
    }
  }
}

function solveWithDailyArray(input, days) {
  //make day wise arrays
  allDaysArrary = makeArrays(days);

  console.log("created arrays count : ", allDaysArrary.length);

  allDaysArrary[0] = input;

  // make logic to run for given days and calculate indvidually

  for (let i = 0; i < days; i++) {
    console.log("Calculating for Day : ", i + 1);
    for (let j = 0; j < i; j++) {
      decreaseTimerForMultipleArray(
        allDaysArrary,
        allDaysArrary[j].length,
        j,
        i
      );
    }
  }

  // sum the lens of arrry

  let count = 0;
  allDaysArrary.forEach((element, index) => {
    count += element.length;
  });
  console.log(`total fish after ${days} day : `, count);
  //   console.log(allDaysArrary);
}

function solMap(input,days) {
    let fish = Array(9).fill(0);

    console.log(fish)
  for (let num of input) {
    fish[num]++;
  }
  
  
  
  for (let i = 0; i <days; i++) {
      let reset = fish.shift();
      fish[6] += reset;
      fish.push(reset);
      console.log(fish)
  }

  return fish.reduce((a, b) => a + b, 0);
}

console.time("part 2 time");
//solve1(testinput, 256);
// solveWithDailyArray(testinput, 256);
console.log(solMap(input, 256));
// solve2(testinput, 180);
console.timeEnd("part 2 time");
