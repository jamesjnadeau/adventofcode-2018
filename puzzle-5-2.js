var input = require('fs').readFileSync('input.txt').toString().trim();
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

function reactor(rinput) {
  var didSomething = true;
  var loopCount = 0;
  while(didSomething) {
    didSomething = false;
    loopCount++;
    // console.log('loop', loopCount);
    for(var i = 0; i< rinput.length-1; i++) {
      var current = rinput[i];
      var next = rinput[i+1];
      // console.log('check', current + next);
      if (current.toUpperCase() == next.toUpperCase()) { // same char
        if (isUpper(current) && isLower(next) || isUpper(next) && isLower(current)) {
          // reaction
          didSomething = true;
          // console.log('removed', rinput.substring(i, i+2), 'on step', i);
          var rinput = spliceSlice(rinput, i, 2);
        }
      }
    }
  }
  return rinput;
}


function genCharArray(charA, charZ) {
    var a = [], i = charA.charCodeAt(0), j = charZ.charCodeAt(0);
    for (; i <= j; ++i) {
        a.push(String.fromCharCode(i));
    }
    return a;
}
var alphabet = genCharArray('A', 'Z'); // ["A", ..., "Z"]

var baseInput = (' ' + input).slice(1);
var loopCount = 0;
var counts = [];
for (a = 0; a < alphabet.length; a++) {
  var letter = alphabet[a];
  console.log(letter);
  loopCount++;
  // console.log('loop', loopCount);
  for(var t = 0; t < input.length; t++) {
    var current = input[t];
    // console.log('check', current + next);
    // console.log(letter, current, current.toUpperCase() == letter.toUpperCase(), current == letter);
    if (current.toUpperCase() == letter.toUpperCase() || current == letter) { // same char
      var input = spliceSlice(input, t, 1);
      t--;
    }
  }
  // console.log(input)

  input = reactor(input);

  // console.log(input);
  // console.log(input.length);
  counts.push(input.length);
  var input = (' ' + baseInput).slice(1);
}
var min = baseInput.length;
var minIndex = 0;
counts.forEach(function(count, index) {
  if (count < min) {
    min = count;
    minIndex = index;
  }
});


console.log('finished with index', minIndex, 'and length', counts[minIndex], 'using letter', alphabet[minIndex]);
