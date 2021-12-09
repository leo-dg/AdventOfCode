const reader = require('./util/reader');

class Point {
  x;
  y;

  constructor(x, y) {
    [this.x, this.y] = [x, y];
  }

  static Make(str) {
    return new Point(...(str.split(',').map(v => parseInt(v))));
  }
}

function findMaxPoint(points) {
  const allX = points.map(point => point.x);
  const allY = points.map(point => point.y);

  return new Point(Math.max(...allX), Math.max(...allY));
}

function toSegments(input) {
  const segments = [];

  for (const line of input) {
    const [start, end] = line.split(' -> ');
    segments.push([Point.Make(start), Point.Make(end)]);
  }

  return segments;
}

function getLinePoints(segment) {
  const [start, end] = [...segment];
  const line = [start];
  let curX = start.x;
  let curY = start.y;

  while (curX !== end.x || curY !== end.y) {
    if (curX < end.x) {
      curX++;
    } else if (curX > end.x) {
      curX--
    }

    if (curY < end.y) {
      curY++;
    } else if (curY > end.y) {
      curY--;
    }

    line.push(new Point(curX, curY));
  }

  return line;
}

function toLines(segments, acceptDiagonals) {
  const lines = [];

  for (const segment of segments) {
    // For part 1 avoid diagonals
    if (!acceptDiagonals) {
      const [start, end] = [...segment];
      if (start.x !== end.x && start.y !== end.y) continue;
    }

    lines.push(getLinePoints(segment));
  }

  return lines;
}

function populateMap(blankMap, segments, acceptDiagonals = false) {
  const map = Array.from(Array(blankMap.length), () => new Array(blankMap[0].length).fill(0));

  const lines = toLines(segments, acceptDiagonals);

  for (const line of lines) {
    for (const point of line) {
      map[point.y][point.x] += 1;
    }
  }

  return map;
}

function count(arr, predicate) {
  let count = 0;

  for (const element of arr) {
    if (predicate(element)) count++;
  }

  return count;
}

const input = reader.readAsArray('day5input.txt');
const segments = toSegments(input);
const maxPoint = findMaxPoint(segments.flat());

// Credits to zurfyx/Trent: https://stackoverflow.com/questions/966225/how-can-i-create-a-two-dimensional-array-in-javascript/966938#966938
const map = Array.from(Array(maxPoint.x + 1), () => new Array(maxPoint.y + 1).fill(0));

const populatedMap = populateMap(map, segments);
const populatedMapWithDiagonals = populateMap(map, segments, true);

// Part 1
console.log(count(populatedMap.flat(), v => v >= 2));

// Part 2
console.log(count(populatedMapWithDiagonals.flat(), v => v >= 2));
