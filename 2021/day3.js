const reader = require('./util/reader');

// Jaromanda X's solution: https://stackoverflow.com/questions/42450510/invert-unsigned-arbitrary-binary-bits-in-javascript/42450570
function flipBits(bitString) {
  return bitString.map(bit => 1 - bit).join('');
}

const values = reader.readAsArray('day3input.txt');
const columns = values[0].length;
const rows = values.length;

// Reduce values into an array of the number of 1s at the index
const onesSums = values.reduce(
  (ones, row) => ones.map(
    (sumAtIndex, index) => sumAtIndex + parseInt(row[index])), 
  new Array(columns).fill(0));

// Get the most common bits at each position. Assume we can't get 500 1s (and 500 0s...)
const mostCommonBitsArray = onesSums
  .map((onesSum) => onesSum > rows / 2 ? '1' : '0');

const leastCommonBits = parseInt(flipBits(mostCommonBitsArray), 2);
const mostCommonBits = parseInt(mostCommonBitsArray.join(''), 2);

// Part 1.
console.log(leastCommonBits * mostCommonBits);