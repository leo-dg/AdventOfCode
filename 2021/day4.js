const { readAsString } = require('./util/reader');

function summate(array) {
  let sum = 0;

  for (const value of array) {
    if (typeof(value) === 'string') {
      sum += parseInt(value);
      continue;
    }
    sum += value;
  }

  return sum;
}

// => [number]
function parseNumberLine(line) {
  let numbers = [];
  let values = line.split(' ');

  // Single-digit values have a space before them; filter out empty strings
  for (const value of values) {
    if (value.length > 0) {
      numbers.push(parseInt(value));
    }
  }

  return numbers;
}

// => [number]
function getDrawNumbers(input, boundary) {
  return input
    .slice(0, boundary)
    .trim()
    .split(',')
    .map(value => parseInt(value));
}

function getRowsByTotal(values) {
  let rowTotals = {};

  for (const row of values) {
    let sum = summate(row);
    if (sum in rowTotals) {
      rowTotals[sum].push(row);
    } else {
      rowTotals[sum] = [row];
    }
  }

  return rowTotals;
}

function getColsByTotal(values, colLength) {
  let colTotals = {};

  // For each column...
  for (let i = 0; i < colLength; i++) {
    // Get the column values at each row
    let col = [];

    for (const row of values) {
      col.push(row[i]);
    }
    
    let sum = summate(col);

    // Then add it to the map
    if (sum in colTotals) {
      colTotals[sum].push(col);
    } else {
      colTotals[sum] = [col];
    }
  }

  return colTotals;
}

/**
 * @param {number[][]} values The 2D array of board values
 * @returns A board 'object'
 */
function createBoard(values) {
  let rowsByTotal = getRowsByTotal(values);
  let colsByTotal = getColsByTotal(values, values[0].length);

  return {
    rowsByTotal: rowsByTotal,
    colsByTotal: colsByTotal
  };
}

function getBoards(input, boundary) {
  let boards = [];

  // Get each board as a single string
  let boardStrings = input
    .slice(boundary)
    .trim()
    .split(NEWLINE + NEWLINE);

  // Then for each board string, turn it into a board
  for (const boardString of boardStrings) {
    // Get the board values (number[][]) 
    let values = boardString
      .split(NEWLINE)
      .map(line => parseNumberLine(line));

    boards.push(createBoard(values));
  }

  return boards;
}

function containsAllValues(superArray, subArray) {
  for (const value of subArray) {
    if (!superArray.includes(value)) {
      return false;
    }
  }

  return true;
}

function hasBingo(numbersByTotal, drawnNumbers) {
  for (const total in numbersByTotal) {
    for (const numbers of numbersByTotal[total]) {
      if (containsAllValues(drawnNumbers, numbers)) {
        return true;
      }
    }
  }

  return false;
}

function getScore(board, drawNumbers, latestDraw) {
  let boardTotal = 0;
  const rowsByTotal = board.rowsByTotal;

  for (const total in rowsByTotal) {
    for (const row of rowsByTotal[total]) {
      for (const value of row) {
        const num = parseInt(value);
        if (!drawNumbers.includes(num)) {
          boardTotal += num;
        }
      }
    }
  }
  
  return boardTotal * latestDraw;
}

function getWinningBoards(drawNumbers, boards) {
  let drawn = [];
  let wonBoards = [];

  // For each drawn number we need to get the boards that won
  for (let i = 0; i < drawNumbers.length; ++i) {
    let latestDraw = drawNumbers[i];
    drawn.push(latestDraw);

    if (i < 5) {
      continue;
    }

    // For each board, check if it has a full row or column
    for (const board of boards) {
      const rowHasBingo = hasBingo(board.rowsByTotal, drawn);
      const colHasBingo = hasBingo(board.colsByTotal, drawn);

      if (rowHasBingo || colHasBingo) {
        // If bingo then find the score for it & add to winningBoards
        if (wonBoards.findIndex(b => b.board === board) === -1) {
          wonBoards.push({
            board: board, 
            score: getScore(board, drawn, latestDraw)
          });
        }
      }
    }

    if (wonBoards.length === boards.length) {
      break;
    }
  }

  return wonBoards;
}

// 😡
const NEWLINE = '\r\n';

const input = readAsString('day4input.txt');

// Split the string based on where the draw numbers ends
const boundary = input.indexOf(NEWLINE);
const drawNumbers = getDrawNumbers(input, boundary);
const boards = getBoards(input, boundary);
const winningBoards = getWinningBoards(drawNumbers, boards);

// Part 1
console.log(winningBoards[0])

// Part 2
console.log(winningBoards[winningBoards.length - 1]);