const reader = require('./util/reader');

// Jaromanda X's solution: https://stackoverflow.com/questions/42450510/invert-unsigned-arbitrary-binary-bits-in-javascript/42450570
function flipBitsArray(bits) {
  return bits.map(bit => 1 - bit);
}

function bitsArrayToDecimal(bits) {
  return parseInt(bits.join(''), 2);
}

/**
 * Get the total number of 1's for each bit position in a given array of binary
 * strings.
 * @param {string[]} binaryNumbers The array of binary numbers (that are represented as strings)
 * @param {number} bitCount The number of bits each binary number has
 * @returns An array of the total number of '1' bits at that index
 */
function getOnesTotals(binaryNumbers, bitCount) {
  const initialArray = new Array(bitCount).fill(0);

  return binaryNumbers.reduce(
    (totals, row) => totals.map((total, index) => total + parseInt(row[index])), 
    initialArray); 
}

function getMostCommonBit(onesTotal, numberCount) {
  return onesTotal >= numberCount - onesTotal ? '1' : '0';
}

function getLeastCommonBit(onesTotal, numberCount) {
  return onesTotal < numberCount - onesTotal ? '1' : '0';
}

/**
 * Get a 'rating' given an array of string-represented binary numbers. The rating
 * is the binary number that meets all of the bit criteria (found by the 
 * bitCriteriaFn).
 * @param {string[]} binaryNumbers The array of string-represented binary numbers 
 * containing the rating
 * @param {function} bitCriteriaFn The function which gets the criteria given 
 * the total number of ones at an index and the amount of binary numbers
 * @param {number} bitCount The number of bits per binary number
 * @returns The rating - a binary number represented as a string 
 */
function getRating(binaryNumbers, bitCriteriaFn, bitCount) {
  let filtered = [...binaryNumbers];

  for (let i = 0; i < bitCount; i++) {
    // Find the ones totals from the current list of binary numbers
    const filteredOnesTotals = getOnesTotals(filtered, bitCount);
    const bitCriteria = bitCriteriaFn(filteredOnesTotals[i], filtered.length);
    filtered = filtered.filter((binaryNumber) => binaryNumber[i] === bitCriteria);

    if (filtered.length === 1) {
      break;
    }
  }

  return filtered[0];
}

const binaryNumbers = reader.readAsArray('day3input.txt');
const numberCount = binaryNumbers.length;
const bitCount = binaryNumbers[0].length;

// Reduce values into an array of the number of 1s at the index
const onesTotals = getOnesTotals(binaryNumbers, bitCount);

// Get the most common bits at each position. Assume we can't get 500 1s (and 500 0s...)
const mostCommonBitsArray = onesTotals
  .map((sum) => sum > numberCount / 2 ? '1' : '0');

const leastCommonBits = bitsArrayToDecimal(flipBitsArray(mostCommonBitsArray));
const mostCommonBits = bitsArrayToDecimal(mostCommonBitsArray);

// Part 1.
console.log(leastCommonBits * mostCommonBits);

const oxygenRatingStr = getRating(binaryNumbers, getMostCommonBit, bitCount);
const co2RatingStr = getRating(binaryNumbers, getLeastCommonBit, bitCount);

const oxygenRating = bitsArrayToDecimal(oxygenRatingStr.split(''));
const co2Rating = bitsArrayToDecimal(co2RatingStr.split(''));

// Part 2.
console.log(oxygenRating * co2Rating);