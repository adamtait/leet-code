/**
 * Given a list of n integers arr[0..(n-1)], determine the number of
 * different pairs of elements within it which sum to k.
 *
 * If an integer appears in the list multiple times, each copy is
 * considered to be different; that is, two pairs are considered
 * different if one pair includes at least one array index which the
 * other doesn't, even if they include the same values.
 */


/*
  + every number will have a complement in it's sum to k
  + 1. build map of integers (for quick lookup in 2nd step)
  + 2. check each integer for it's complement in map
  + O(n) storage & compute
  
  2nd solution:
  + failed to map value & complement pairs
  + need to track values used
  
  3rd solution:
  + only need to remove/ignore indexes already visited
  
  [1, 2, 3, 4, 3] => 2
  [1, 5, 3, 3, 3] => 4
*/



function numberOfWays (arr, k) {
  
  // build m (index of integers in arr)
  var m = {};
  for ( var i = 0; i < arr.length; i++ ) {
    const v = arr[i];
    if ( ! m[v] ) m[v] = [i];
    else m[v].push(i);
  }
  
  // check each element for complement in m
  var c = 0;
  for ( var i = 0; i < arr.length; i++ ) {
    const v = arr[i];
    const complement = k - v;
    if ( m[complement] ) {
      for ( var j = 0; j < m[complement].length; j++ ) {
        if ( m[complement][j] > i ) // skip already account-for combinations
          c++;
      }
    }
  }
  return c;
}











// These are the tests we use to determine if the solution is correct.
// You can add your own at the bottom.
function printInteger(n) {
  var out = '[' + n + ']';
  return out;
}

var test_case_number = 1;

function check(expected, output) {
  var result = (expected == output);
  var rightTick = "\u2713";
  var wrongTick = "\u2717";
  if (result) {
    var out = rightTick + ' Test #' + test_case_number;
    console.log(out);
  }
  else {
    var out = '';
    out += wrongTick + ' Test #' + test_case_number + ': Expected ';
    out += printInteger(expected);
    out += ' Your output: ';
    out += printInteger(output);
    console.log(out);
  }
  test_case_number++;
}

var k_1 = 6;
var arr_1 = [1, 2, 3, 4, 3];
var expected_1 = 2;
var output_1 = numberOfWays(arr_1, k_1);
check(expected_1, output_1);

var k_2 = 6;
var arr_2 = [1, 5, 3, 3, 3];
var expected_2 = 4;
var output_2 = numberOfWays(arr_2, k_2);
check(expected_2, output_2);

// Add your own test cases here
