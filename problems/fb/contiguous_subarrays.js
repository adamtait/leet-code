/*
  You are given an array arr of N integers. For each index i, you are
  required to determine the number of contiguous subarrays that
  fulfill the following conditions:

  1. The value at index i must be the maximum element in the contiguous subarrays, and
  2. These contiguous subarrays must either start from or end on index i.
 */


// brute force

function countSubarrays (arr) {
  
  var cs = [];
  for ( var i = 0; i < arr.length; i++ ) {
    var c = 1;
    var b = i-1, f = i+1;
    while ( b > -1 && arr[b] < arr[i] ) { c++; b--; }
    while ( f < arr.length && arr[f] < arr[i] ) { c++; f++; }
    cs[i] = c;
  }
  return cs;
};


/*
  Thoughts:
  + every i is going to have at least subarray (itself)
  + it would be great if we could iterate through the array in a single pass
    + if i < max_so_far, then add to previous combos 
    + if i >= max_so_far, then add i combos
  + I feel like I may need to keep track of the indexes of previous max values
*/

/*
function countSubarrays (arr) {
  var max = -1, maxi = -1;
  var pmax = -1, pmaxi = -1;
  var cs = 0;
  
  for ( var i = 0; i < arr.length; i++ ) {
    cs++;  // single value subarray
    const v = arr[i];
    if ( maxi === -1 ) {
      max = v; maxi = i;
      pmax = v; pmaxi = i;
    }
    else if ( v < max ) {
      cs += i - maxi;
    }
    else if ( v >= max ) {
      pmax = max; pmaxi = maxi;
      max = v; maxi = i;
    }
  }
  return cs;
}
*/












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

var test_1 = [3, 4, 1, 6, 2];
var expected_1 = [1, 3, 1, 5, 1];
var output_1 = countSubarrays(test_1);
check(expected_1, output_1);

var test_2 = [2, 4, 7, 1, 5, 3];
var expected_2 = [1, 2, 6, 1, 3, 1];
var output_2 = countSubarrays(test_2);
check(expected_2, output_2);

// Add your own test cases here
