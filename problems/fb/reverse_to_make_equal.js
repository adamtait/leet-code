/*
 * url:
 *
 * Given two arrays A and B of length N, determine if there is a way
 * to make A equal to B by reversing any subarrays from array B any
 * number of times.
 */

/*
+ find section of array that differs
+ iterate from opposite ends of differing section
  + palindrome check
+ time:  O(n)
+ space: O(1)
*/

function areTheyEqual(array_a, array_b){
  
  const len = array_a.length;
  if ( len !== array_b.length )
    return false;
  
  // find section that differs
  var start = 0;
  while ( start < len && array_a[start] === array_b[start] )
    start++;

  // check for same array
  if ( start >= len )
    return false;  // => same array
  
  var end = len - 1;
  while ( end >= 0 && array_a[end] === array_b[end] )
    end--;
  
  // palindrome check
  for ( var i = 0; i <= (end - start); i++ ) {
    var ai = start + i, bi = end - i;
    if ( array_a[ai] !== array_b[bi] )
      return false;
  }
  return true;
}

/*
[1, 2, 3, 4], [1, 4, 3, 2]
start = 1, end = 3
=> true
*/


const inputExpectedPairs = [
    [[[], []], false],
    [[[1], [1,2]], false],
    [[[1,2], [1,2]], false],
    [[[1,2], [2,1]], true],
    [[[1, 2, 3, 4], [1, 4, 3, 3]], false],
    [[[1, 2, 3, 4], [1, 4, 3, 2]], true],
];


module.exports = {
    f: areTheyEqual,
    inputExpectedPairs,
    name: 'Facebook - arrays - reverse to make equal'
};
