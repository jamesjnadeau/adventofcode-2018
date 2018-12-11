var _ = require('lodash');

var myLines = require('fs').readFileSync('input.txt').toString().match(/^.+$/gm);
//console.log(myLines);
var value = 0
var lineRegEx = new RegExp(/\[(.*?)\] (.*)/)
var data = [];
myLines.forEach(function(line) {
  var matches = lineRegEx.exec(line);
  var time = new Date(matches[1]);
  var message = matches[2];
  data.push({
    time, message,
  })
});

function compare(a ,b) {
  if (a.time < b.time)
    return -1;
  if (a.time > b.time)
    return 1;
  return 0;
}

data.sort(compare);
// console.log(data);

var timeline = {}
var currentGuard;
var sleepMinute;
data.forEach(function(row) {
  if (row.message === 'falls asleep') {
    sleepMinute = row.time.getMinutes();
  } else if (row.message === 'wakes up') {
    for (var i = sleepMinute; i < row.time.getMinutes(); i++) {
      // console.log(currentGuard, i, timeline[currentGuard][i]);
      if (timeline[currentGuard][i]) {
        timeline[currentGuard][i]++;
      } else {
        timeline[currentGuard][i] = 1;
      }
    }
  } else { // new guard
    currentGuard = row.message.split(' ')[1];
    if (!timeline[currentGuard]) timeline[currentGuard] = new Array(60).fill(0);;
  }
});

var getMaxIndex = (bestIndexSoFar, currentlyTestedValue, currentlyTestedIndex, array) =>
  currentlyTestedValue > array[bestIndexSoFar] ? currentlyTestedIndex : bestIndexSoFar;

var sums = _.map(timeline, function(item, guard) {
  return {
    guard,
    max: Math.max.apply(null, item),
    minute: timeline[guard].reduce(getMaxIndex, 0),
  }
});


function compareMax(a ,b) {
  if (a.max < b.max)
    return 1;
  if (a.max > b.max)
    return -1;
  return 0;
}
var most = sums.sort(compareMax)[0];
console.log(most);
