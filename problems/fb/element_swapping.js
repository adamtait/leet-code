/*
 * Given a sequence of n integers arr, determine the lexicographically
 * smallest sequence which may be obtained from it after performing at
 * most k element swaps, each involving a pair of consecutive elements
 * in the sequence.
 *
 * Note: A list x is lexicographically smaller than a different
 * equal-length list y if and only if, for the earliest index at which
 * the two lists differ, x's element at that index is smaller than y's
 * element at that index.
 */


/*
 Thoughts:
 + need to 
   + move the smallest elements 
     + to the front of the array
   + in the fewest number of steps (< k)
   
 solution 1:
 + find smallest element
   + if distance-to-0-index > k, then move
   + else repeat with next smallest element
   
 solution 2:
 + solution 1 failed to consider that the element we want to move is not the global smallest
 + instead, we should look for a small element that we *can* move to the 0 index
 
 
 solution 3:
 + solution 2 didn't seem to solve the problem
 + what if we check for the minimum value within k elements of the beginning?
   + repeat until k is 0?

*/

/*
function findMinArray (arr, k) {
  
  var mins = arr
    .reduce((a,v,i) => a.concat([v,i]), [])
    .sort(([av, ai], [bv, bi]) => av - bv);  // O(n log(n))

  var output = arr;
  var rem = k;
  for ( var i = 0; i < mins.length; i++ ) {
    const [v, index] = mins[i];
    if ( index < k ) {
      // move as close to front as possible...
    }
  }
  return output;
}
*/

function findMinArray (arr, k) {
  
  if ( arr.length === 0 ) return [];
  
  var min = 999999, mini = -1;
  for ( var i = 0; i <= k; i++ ) {
    if ( arr[i] < min ) {
      min = arr[i]; mini = i;
    }
  }
  
  var sarr = arr // remove mini
    .slice(0, mini)
    .concat( arr.slice(mini+1) );
  
  var remk = k - mini;
  if ( remk === 0 )   // made it all the way!
    return [min].concat( sarr ); // add min back to beginning
  
  // move next lowest value
  var rest = findMinArray( sarr, remk );
  return [min].concat( rest );  
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


var n_1 = 3, k_1 = 2;
var arr_1 = [5, 3, 1];
var expected_1 = [1, 5, 3];
var output_1 = findMinArray(arr_1, k_1);
check(expected_1, output_1);

var n_2 = 5, k_2 = 3;
var arr_2 = [8, 9 ,11, 2, 1];
var expected_2 = [2, 8, 9, 11, 1];
var output_2 = findMinArray(arr_2, k_2);
check(expected_2, output_2);

// Add your own test cases here

var n_3 = 5, k_3 = 4;
var arr_3 = [8, 9 ,11, 2, 1];
var expected_3 = [1, 8, 9, 11, 2];
var output_3 = findMinArray(arr_3, k_3);
check(expected_3, output_3);

var n_4 = 5, k_4 = 6;
var arr_4 = [8, 9 ,11, 2, 1];
var expected_4 = [1, 8, 2, 9, 11];
var output_4 = findMinArray(arr_4, k_4);
check(expected_4, output_4);


var n_5 = 5, k_5 = 8;
var arr_5 = [8, 9 ,11, 2, 1];
var expected_5 = [1, 2, 8, 9, 11];
var output_5 = findMinArray(arr_5, k_5);
check(expected_5, output_5);
