var input = require('fs').readFileSync('input.txt').toString();
//console.log(myLines);

function isUpper(character) {
  if (character == character.toUpperCase()) {
    return true;
  }
  return false;
}

function isLower(character) {
  if (character == character.toLowerCase()) {
    return true;
  }
  return false;
}

function spliceSlice(str, index, count, add) {
  // We cannot pass negative indexes directly to the 2nd slicing operation.
  if (index < 0) {
    index = str.length + index;
    if (index < 0) {
      index = 0;
    }
  }
  return str.slice(0, index) + (add || "") + str.slice(index + count);
}

var didSomething = true;
var loopCount = 0;
while(didSomething) {
  didSomething = false;
  loopCount++;
  console.log('loop', loopCount);
  for(var i = 0; i< input.length-1; i++) {
    var current = input[i];
    var next = input[i+1];
    // console.log('check', current + next);
    if (current.toUpperCase() === next.toUpperCase()) { // same char
      if (isUpper(current) && isLower(next) || isUpper(next) && isLower(current)) {
        // reaction
        didSomething = true;
        console.log('removed', input.substring(i, i+2), 'on step', i);
        var input = spliceSlice(input, i, 2);
      }
    }
  }
}
console.log('finished', input.length);
