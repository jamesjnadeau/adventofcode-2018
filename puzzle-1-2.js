var myLines = require('fs').readFileSync('input.txt').toString().match(/^.+$/gm);
//console.log(myLines);
var value = 0;
var previousFreq = [];
var found = false;
while (found === false) {
  myLines.forEach(function(line) {
    var change = parseInt(line);
    value += change;
    if (previousFreq.indexOf(value) !== -1) {
      console.log('repeated value', value);
      found = true;
      process.exit();
    }
    previousFreq.push(value);
  })
}
