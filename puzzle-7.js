var myLines = require('fs').readFileSync('input-test.txt').toString().match(/^.+$/gm);
//console.log(myLines);
var steps = [];
var regex = new RegExp(/Step (.) must be finished before step (.) can begin/)
myLines.forEach(function(line) {
  var matches = regex.exec(line);
  var step = matches[1];
  var before = matches[2];
  // console.log(step, 'before', before);
});
