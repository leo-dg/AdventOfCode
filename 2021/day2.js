const reader = require('./util/reader');

const values = reader.readAsArray('day2input.txt');

// Inspired by https://dev.to/_bigblind/quick-tip-transform-an-array-into-an-object-using-reduce-2gh6

function updatePosition(position, direction, distance) {
  let newPosition = {...position};

  switch (direction) {
    case 'forward':
      newPosition.x += distance;
      break;
    case 'up':
      newPosition.y -= distance;
      break;
    case 'down':
      newPosition.y += distance;
      break;
  };

  return newPosition;
}

function updatePositionWithAim(position, direction, distance) {
  let newPosition = {...position};

  switch (direction) {
    case 'forward':
      newPosition.x += distance;
      newPosition.y += position.aim * distance;
      break;
    case 'up':
      newPosition.aim -= distance;
      break;
    case 'down':
      newPosition.aim += distance;
      break;
  };

  return newPosition;
}

function reducer(position, current) {
  const [direction, distanceStr] = current.split(' ');
  const distance = parseInt(distanceStr);

  if ('aim' in position) {
    return updatePositionWithAim(position, direction, distance);
  } 
  return updatePosition(position, direction, distance);
}

// Part 1
const finalPosition = values.reduce(reducer, { x: 0, y: 0 });
console.log(finalPosition.x * finalPosition.y);

// Part 2
const finalPosition2 = values.reduce(reducer, { x: 0, y: 0, aim: 0 });
console.log(finalPosition2.x * finalPosition2.y);