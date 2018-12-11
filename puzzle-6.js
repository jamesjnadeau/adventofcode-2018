var myLines = require('fs').readFileSync('input.txt').toString().match(/^.+$/gm);
//console.log(myLines);
var value = 0
var positions = [];
var maxX = 0;
var maxY = 0;
var minX = 1000;
var minY = 1000;
myLines.forEach(function(line) {
  var pos = line.split(', ');
  pos = pos.map( function(val) { return parseInt(val) });
  positions.push({
    x: pos[0],
    y: pos[1],
  });
  if (pos[0] > maxX) maxX = pos[0];
  if (pos[1] > maxY) maxY = pos[1];
  if (pos[0] < minX) minX = pos[0];
  if (pos[1] < minY) minY = pos[1];
});
console.log(positions.length);
console.log('max', maxX, maxY);
console.log('min', minX, minY);

maxX+=500;
maxY+=500;
minX-=500;
minY-=500;

/*
function fillArray(dimensions) {
    var array = [];

    for (var i = 0; i < dimensions[0]; ++i) {
        array.push(dimensions.length == 1 ? 0 : fillArray(dimensions.slice(1)));
    }

    return array;
}

var grid = fillArray([maxX+1, maxY+1]);

positions.forEach(function(pos, index){
  grid[pos.x][pos.y] = index+1;
});
*/

function countInArray(array, what) {
    return array.filter(item => item == what).length;
}

var posTallies = Array(positions.length).fill(0);
for(var x = minX; x < maxX; x++) {
  for(var y = minY; y < maxY; y++) {
    // calculate closest pos
    // console.log('working on', x, y);
    var distances = [];
    positions.forEach(function(pos, index){
      var xDis = Math.abs(pos.x - x);
      var yDis = Math.abs(pos.y - y);
      distances.push(xDis + yDis);
    });
    var minDistance = Math.min.apply(null, distances);
    var minIndex = distances.indexOf(minDistance);
    // console.log('found min', minDistance, 'with count',countInArray(posTallies, minDistance) );
    posTallies[minIndex]++;
    /*if (countInArray(posTallies, minDistance) === 0) {
      posTallies[minIndex]++;
    } else {
      console.log('found same');x
    }*/
  }
}

var maxTallies = Math.max.apply(null, posTallies);
var winnerIndex = posTallies.indexOf(maxTallies);
// console.log(posTallies);
console.log('winner index', winnerIndex, 'with', maxTallies, positions[winnerIndex]);
console.log(typeof posTallies[winnerIndex])
console.log(posTallies.map( function(val) { return parseInt(val) }).sort())
