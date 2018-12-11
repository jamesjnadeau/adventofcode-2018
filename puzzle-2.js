var myLines = require('fs').readFileSync('input.txt').toString().match(/^.+$/gm);
//console.log(myLines);
var has2matches = 0;
var has3matches = 0;
myLines.forEach(function(line, lineNum) {
  var counts = {};
  for (var i = 0; i < line.length; i++) {
    var letter = line[i];
    if (counts[letter]) {
      counts[letter]++;
    } else {
      counts[letter] = 1;
    }
  };
  var any2 = false;
  var any3 = false;
  for (var letter in counts) {
    var count = counts[letter];
    if (count === 2) {
      // console.log(lineNum, letter, count);
      any2 = true;
    }
    if (count === 3) {
      any3 = true;
    }
  }


  if (any2) has2matches++;
  if (any3) has3matches++;


})

console.log('has2matches', has2matches);
console.log('has3matches', has3matches);
console.log('hash', has2matches * has3matches);
