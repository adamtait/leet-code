/*
  solution 2:
  + sort milestones
  + time:  O( n + k*log(k) )
  + space: O( k )
  
  solution 3:
  + store milestones in a min heap
  + iterate through revenues
  + time:  O( n + k*log(k) ), k*log(k) => extract from heap
  + space: O( k )

  
  edge case!
  + more than 1 milestone on a single day!
  
  example:
  indexes:     [ 1,  2,  3,  4,  5,  6,  7,  8,  9,  10]
  revenues =   [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
  milestones = [100, 200, 500]
  output =     [4, 6, 10]

  indexes:     [ 1,    2,   3,   4,   5]
  revenues =   [100, 200, 300, 400, 500]
  milestones = [300, 800, 1000, 1400]
  output =     [2, 4, 4, 5]

  indexes:     [  1,   2,   3,   4,   5,   6]
  revenues =   [700, 800, 600, 400, 600, 700]
  milestones = [3100, 2200, 800, 2100, 1000]
  output =     [5, 4, 2, 3, 2]
*/

function getMilestoneDays (revenues, milestones) {
  
  const ms = milestones
    .map((m,i) => [m,i])
    .sort((a,b) => a[0] - b[0]);

  var mi = 0, total = 0, output = [];
  for ( var i = 0; i < revenues.length; i++ ) {
    total += revenues[i];
    while ( mi < ms.length 
           && total >= ms[mi][0] ) {
      const outputIndex = ms[mi][1];
      output[ outputIndex ] = i+1;
      mi++;
    }
  }
  return output;
}











// These are the tests we use to determine if the solution is correct.
// You can add your own at the bottom.
function printintegerArray(array) {
  var size = array.length;
  var res = '';
  res += '[';
  var i = 0;
  for (i = 0; i < size; i++) {
    if (i !== 0) {
      res += ', ';
    }
    res += array[i];
  }
  res += ']';
  return res;
}

var test_case_number = 1;

function check(expected, output) {
  var expected_size = expected.length;
  var output_size = output.length;
  var result = true;
  if (expected_size != output_size) {
    result = false;
  }
  for (var i = 0; i < Math.min(expected_size, output_size); i++) {
    result &= (output[i] == expected[i]);
  }
  var rightTick = "\u2713";
  var wrongTick = "\u2717";
  if (result) {
    var out = rightTick + ' Test #' + test_case_number;
    console.log(out);
  }
  else {
    var out = '';
    out += wrongTick + ' Test #' + test_case_number + ': Expected ';
    out += printintegerArray(expected);
    out += ' Your output: ';
    out += printintegerArray(output);
    console.log(out);
  }
  test_case_number++;
}

var revenues_1 = [100, 200, 300, 400, 500];
var milestones_1 = [300, 800, 1000, 1400]
var expected_1 = [2, 4, 4, 5];
var output_1 = getMilestoneDays(revenues_1, milestones_1);
check(expected_1, output_1);

var revenues_2 = [700, 800, 600, 400, 600, 700];
var milestones_2 = [3100, 2200, 800, 2100, 1000];
var expected_2 = [5, 4, 2, 3, 2];
var output_2 = getMilestoneDays(revenues_2, milestones_2);
check(expected_2, output_2);

// Add your own test cases here
