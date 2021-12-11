const reader = require('./util/reader');

function summate(state) {
  let sum = 0;
  for (const pop of state.values()) sum += pop;
  return sum;
}

function addToState(state, fish, population) {
  const stateCopy = new Map(state);

  if (stateCopy.has(fish)) {
    stateCopy.set(fish, state.get(fish) + population);
  } else {
    stateCopy.set(fish, population);
  }

  return stateCopy;
}

function advanceState(state) {
  let newState = new Map();

  for (const [fish, population] of state.entries()) {
    if (fish === 0) {
      newState = addToState(newState, 6, population);
      newState = addToState(newState, 8, population);
    } else {
      newState = addToState(newState, fish - 1, population);
    }
  }

  return newState;
}

function advanceByDays(school, days) {
  // Turn school into map of life => number of fish with that life
  let state = new Map();

  for (const fish of school) {
    if (state.has(fish)) {
      state.set(fish, state.get(fish) + 1);
    } else {
      state.set(fish, 1);
    }
  }
  
  // Then advance time given days
  for (let i = 0; i < days; i++) {
    state = advanceState(state);
  }

  return state;
}


const input = reader.readAsString('day6input.txt');
let school = input.split(',').map(f => parseInt(f));

// Part 1
console.log(summate(advanceByDays(school, 80)));

// Part 2
console.log(summate(advanceByDays(school, 256)));