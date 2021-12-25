const reader = require('./util/reader');

                      // 0  1  2  3  4  5  6  7  8  9
const segmentsByDigit = [6, 2, 5, 5, 4, 5, 6, 3, 7, 6];

function getNotes(input) {
  let notes = [];
  
  for (const element of input) {
    const [pattern, digits] = element
      .split('|')
      .map(part => part.trim().split(' '));
    
    notes.push({
      pattern: pattern,
      digits: digits
    });
  }

  return notes;
}

function digitHasUniqueLength(digit) {
  return (digit.length === segmentsByDigit[1]
    || digit.length === segmentsByDigit[4]
    || digit.length === segmentsByDigit[7]
    || digit.length === segmentsByDigit[8]);
}

function getUniqueSegmentDigits(garble) {
  const uniqueSegmentDigits = [];

  for (const digit of garble) {
    if (digitHasUniqueLength(digit)) {
      uniqueSegmentDigits.push(digit);
    }
  }

  return uniqueSegmentDigits;
}

function getUniqueDigit(digit, pattern) {
  if ()


  const length = segmentsByDigit[digit]
}

function countUniqueSegmentDigits(notes) {
  let count = 0;

  for (const note of notes) {
    count += getUniqueSegmentDigits(note.digits).length;
  }

  return count;
}



const input = reader.readAsArray('day8input.txt');
const notes = getNotes(input);

// Part 1
console.log(countUniqueSegmentDigits(notes));
// Part 2

