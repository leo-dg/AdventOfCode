const reader = require('./util/reader');

function findMax(array) {
  let max = Number.MIN_SAFE_INTEGER;
  
  for (let i = 0; i < array.length; i++) {
    if (array[i] > max) {
      max = array[i];
    }
  }

  return max;
}

function calculateCost(value, positions) {
  let totalCost = 0;

  for (const position of positions) {
    totalCost += Math.abs(value - position);
  }

  return totalCost;
}

function calculateCost2(value, positions) {
  let totalCost = 0;

  for (const position of positions) {
    let distance = Math.abs(value - position);
    // 👍 https://en.wikipedia.org/wiki/1_%2B_2_%2B_3_%2B_4_%2B_%E2%8B%AF
    totalCost += (distance * (distance + 1)) / 2;
  }

  return totalCost;
}

function findOptimalCost(input, max, costFn) {
  const positions = Uint32Array.from([...input]).sort();

  let minCost = Number.MAX_SAFE_INTEGER;
  let previousCost = Number.MAX_SAFE_INTEGER;

  for (let alignment = 0; alignment < max; alignment++) {
    let cost = costFn(alignment, positions);

    if (cost < minCost) {
      minCost = cost;
    }

    // I got this optimisation from Reddit
    if (cost > previousCost) {
      return previousCost;
    }

    previousCost = cost;
  }
}

const input = reader.readAsString('day7input.txt')
                .split(',')
                .map(v => parseInt(v));

// Part 1.
console.log(findOptimalCost(input, findMax(input), calculateCost));

// Part 2.
console.log(findOptimalCost(input, findMax(input), calculateCost2));
