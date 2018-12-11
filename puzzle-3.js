var myLines = require('fs').readFileSync('input.txt').toString().match(/^.+$/gm);

//#123 @ 3,2: 5x4
var fabric = [];

overlapClaimCount = 0;
overlapCount = 0;

myLines.forEach(function(line) {
  var commands = line.split(' ');
  var id, at, position, size
  var [ id, at, position, size ] = commands;

  position = position.replace(':', '');
  var [posX, posY] = position.split(',').map(function(val) {return parseInt(val); });;

  var [plusX, plusY] = size.split('x').map(function(val) {return parseInt(val); });
  var maxX = posX + plusX;
  var maxY = posY + plusY;

  // console.log( id, at, posX, ',', posY, plusX,'x', plusY, 'max', maxX, maxY);

  var overlapFlag = false;
  var unclaimed = false;
  for (var x = posX; x < maxX; x++) {
    for (var y = posY; y < maxY; y++) {
      if (!fabric[x]) fabric[x] = [];
      if (fabric[x][y]) {
        // console.warn('Has overlap', x, y)
        overlapFlag = true;
        if (fabric[x][y] !== 3) {
          overlapCount++;
          fabric[x][y] = 3
        }
      } else {
        fabric[x][y] = true;
      }
      // console.log('placed', x, y);
    }
  }
  if (!overlapFlag) {

  } else {
    overlapClaimCount++;
  }
});


var unspoiled = [];
myLines.forEach(function(line) {
  var commands = line.split(' ');
  var id, at, position, size
  var [ id, at, position, size ] = commands;

  position = position.replace(':', '');
  var [posX, posY] = position.split(',').map(function(val) {return parseInt(val); });;

  var [plusX, plusY] = size.split('x').map(function(val) {return parseInt(val); });
  var maxX = posX + plusX;
  var maxY = posY + plusY;

  // console.log( id, at, posX, ',', posY, plusX,'x', plusY, 'max', maxX, maxY);
  var overlapFlag = false;
  for (var x = posX; x < maxX; x++) {
    for (var y = posY; y < maxY; y++) {
      if (fabric[x][y] === 3) {
        overlapFlag = true;
      }
    }
  }
  if (!overlapFlag) {
    unspoiled.push(line);
  }
});
console.log('overlapClaimCount', overlapClaimCount);
console.log('overlapCount in inches', overlapCount);
console.log('unspoiled', unspoiled); 
