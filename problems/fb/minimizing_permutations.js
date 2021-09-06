
/*
 Thoughts:
 + want to sort array in ascending order
 + array must contain consecutive integers 1-N (!)
 + how to find the minimum number of reversals?
 + are there slices of the array that are strickly less than others?
 + are there slices of the array that are strickly greater than others?
 + why is this question related to graphs?
   + what if I think of the array as a graph?
   + can I perform the reverse operation on a graph? (yes)
   + how do I shape the graph?
 
 example:
 [3, 1, 2]   3 - 1 - 2
 -> identify that [1,2] could be reversed to match with 3
 [3, 2, 1]   3 - (1 - 2) => 3 - (2 - 1)
 -> identify that entire list could be reversed
 [1, 2, 3]   (3 - 2 - 1) => (1 - 2 - 3)
 
 
 3 - 4 - 1 - 2
 3 - 4 - (1 - 2) => 3 - 4 - 2 - 1
 (3 - 4) - 2 - 1 => 4 - 3 - 2 - 1
 (4 - 3 - 2 - 1) => 1 - 2 - 3 - 4
 
 2 - 3 - 4 - 1
 (2 - 3 - 4) - 1 => 4 - 3 - 2 - 1
 (4 - 3 - 2 - 1) => 1 - 2 - 3 - 4
 
 2 - 3 - 4 - 1 - 5
 (2 - 3 - 4) - 1 - 5 => 4 - 3 - 2 - 1 - 5
 (4 - 3 - 2 - 1) - 5 => 1 - 2 - 3 - 4 - 5
 
 3 - 1 -> 2
 3 -> 4 - 1 -> 2
 2 -> 3 -> 4 - 1
 2 -> 3 -> 4 - 1 - 5
 
 solution 1:
 + find longest consecutive sequence
 + reverse sequence to connect with other values
 + repeat
 
 solution 2:
 + find *any* consecutive sequence
 + reverse sequence to connect with other values
 + repeat
*/

function minOperations (arr) {

  if ( arr.length <= 1 ) return 0;
  if ( arr.length === 2 ) return arr[0] < arr[1] ? 0 : 1;
  
  // find consecutive sequences
  var seqs = [[arr[0]]];
  for ( var i = 1; i < arr.length; i++ ) {
    const v = arr[i];
    var cs = seqs[ seqs.length -1 ];
    const l = cs[ cs.length -1 ];
    if ( v === l + 1 || v === l - 1 )
      cs.push(v);
    else seqs.push([v]);
  }
  
  
  return null;
}



//
// Attempt 2


/*
 Thoughts:
 + arr is a permutation of numbers 1...N
   + all consecutive integers, just out of order
 + output: re-arrange into increasing order
   + only with reverse( subarray )
   + minimize the number of reverse calls
   
   3 - 1 - 2 => 3 - 2 - 1 => 1 - 2 - 3   (2)
   4,3,5,1,2 => 3,4,5,1,2 => 5,4,3,1,2 => 5,4,3,2,1 => 1,2,3,4,5 (4)

 solution 1:
 + split array into ordered (asc, desc) subarrays
 + rotate subarrays (based on neighbors) to form larger subarrays
   + when only 1 subarray remaining, check (asc, desc) then rotate (if necessary)
 + does this guarantee minimal number of reverse calls?
 
 solution 2:
 + build a permutation graph (guess)
   + I don't know how to build this
   + I don't know why permutation graph would be useful
 + use dikstra's algorithm to minimize [some?] path (hint)
   + I know I can use dikstra's algorithm to find a minimal path
   + I don't know how a minimal path would lead to an optimal solution
*/

//
// solution 1

const replace = (low, high, narrs, arrs) => {
  const rest = arrs.slice( high + 1 );
  return arrs.slice(0,low).concat( narrs ).concat( rest );
};

const withinOne = (a,b) => a === b+1 || a === b-1;

const combineSubarrays = (a,b) => {
  
  var reversals = 0;
  var newArrays = [a,b];
  
  if ( !a || !b ) return { reversals, newArrays };
  
  if ( withinOne( a[a.length-1], b[0] )) // already in order!
    newArrays = [ a.concat( b ) ];
        
  else if ( withinOne( a[0], b[0] )) {  // reverse a
    a.reverse();
    newArrays = [ a.concat( b ) ];
    reversals = 1;
  }
  else if ( withinOne( a[a.length-1], b[b.length-1] )) {  // reverse b
    b.reverse();
    newArrays = [ a.concat( b ) ];
    reversals = 1;
  }
  else if ( withinOne( a[0], b[b.length-1] )) {  // reverse both!
    a.reverse(); b.reverse();
    newArrays = [ a.concat( b ) ];
    reversals = 2;
  }
  return { reversals, newArrays };
};

const reversals = (sarrs) => {
  
  //console.log('reversals: ' + JSON.stringify(sarrs) );
  
  var rs = 0;
  var i = 0;
  //var nrs = 999999;   // do some memoization or dynamic programming to find optimal solution?
  while ( sarrs.length > 1 ) {
    var { reversals, newArrays } = combineSubarrays( sarrs[i], sarrs[i+1] );
    rs += reversals;
    sarrs = replace(i, i+1, newArrays, sarrs);
    if ( newArrays.length > 1 )  // => no combining possible with sarrs[i]
      i = i+1 % sarrs.length;
    //if (reversals > 0) console.log( JSON.stringify(sarrs) );
  }
  
  //console.log('fin: ' + JSON.stringify(sarrs) );
  if ( sarrs[0][0] !== 1 ) rs++;
  return rs;
}

function minOperations (arr) {

  var sas = [[arr[0]]];
  for ( var i = 1; i < arr.length; i++ ) {
    const v = arr[i];
    const lsa = sas[sas.length -1];
    const lv = lsa[lsa.length -1];
    if ( withinOne( v, lv ) ) lsa.push(v);
    else sas.push([v]);
  }
 
  return reversals(sas);
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

var n_1 = 5;
var arr_1 = [1, 2, 5, 4, 3];
var expected_1 = 1;
var output_1 = minOperations(arr_1);
check(expected_1, output_1);

var n_2 = 3;
var arr_2 = [3, 1, 2];
var expected_2 = 2;
var output_2 = minOperations(arr_2);
check(expected_2, output_2);

// Add your own test cases here



var n_3 = 5;
var arr_3 = [4, 3, 5, 1, 2];
var expected_3 = 4;
var output_3 = minOperations(arr_3);
check(expected_3, output_3);
