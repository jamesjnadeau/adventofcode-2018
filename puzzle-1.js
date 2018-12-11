var myLines = require('fs').readFileSync('input.txt').toString().match(/^.+$/gm);
//console.log(myLines);
var value = 0
myLines.forEach(function(line) {
  var change = parseInt(line);
  value += change;
})

console.log(value);
