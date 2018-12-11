var myLines = require('fs').readFileSync('input.txt').toString().match(/^.+$/gm);
//console.log(myLines);
var lastDifference;

myLines.forEach(function(lineA, lineANum) {
  myLines.forEach(function(lineB, lineBNum) {
    if (lineANum !== lineBNum) {
      var differences = 0;
      for (var i = 0; i < lineA.length; i++) {
        letterA = lineA[i];
        letterB = lineB[i];
        if (letterA !== letterB) {
          differences++;
          lastDifference = {
            letterA, letterB,
          };
        }
        if (differences > 1) break;
      };

      if (differences === 1){
        console.log('lastDifference found on lines', lineANum, lineBNum);
        console.log(myLines[lineANum]);
        console.log(myLines[lineBNum]);
        console.log('lastDifference', lastDifference);
        process.exit();
      }
    }
  })
})
