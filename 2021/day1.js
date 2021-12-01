const fs = require('fs');

function getIncreases(values) {
  let increases = 0;

  for (let i = 1; i < values.length; i++) {
    if (values[i - 1] < values[i]) {
      increases++;
    }
  }
  
  return increases;
}

/**
 * Get an array where each value in values is mapped to a sum of itself and the
 * next windowSize - 1 values. When there are less than windowSize values left
 * no more values are mapped.
 * @param {number[]} values The values to map
 * @param {number} windowSize The size of the window in which to sum values
 */
function getWindowMeasurements(values, windowSize) {
  let windowMeasurements = [];
  
  for (let i = 0; i <= values.length - windowSize; i++) {
    const sum = values
      .slice(i, i + windowSize)
      .reduce((prev, current) => prev + current);

    windowMeasurements.push(sum);
  }

  return windowMeasurements;
}

const input = fs.readFileSync('./inputs/day1input.txt', { encoding: 'utf-8' });
const values = input
  .split('\r\n')
  .map(value => parseInt(value));

// Part 1
// console.log(getIncreases(values));

// Part2
console.log(getIncreases(getWindowMeasurements(values, 3)));