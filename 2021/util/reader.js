const fs = require('fs');

/**
 * Read a file containing values separated by returns as an array.
 * @param {string} filename The name of the file including its file extension to read
 * @param {string} dirPath The path to the directory from the root /2021/
 * @returns The contents of the file with the filename as an array
 */
function readAsArray(filename, dirPath = './inputs/') {
  const input = fs.readFileSync(dirPath + filename, { encoding: 'utf-8' });
  return input.split('\r\n');
}

function readAsString(filename, dirPath = './inputs/') {
  return fs.readFileSync(dirPath + filename, { encoding: 'utf-8' });
}

module.exports = {
  readAsArray,
  readAsString
};