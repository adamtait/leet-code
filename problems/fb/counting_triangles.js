/*
 * url: https://www.facebookrecruiting.com/portal/coding_practice_question/?problem_id=720422605157879
 *
 * Given a list of N triangles with integer side lengths, determine
 * how many different triangles there are. Two triangles are
 * considered to be the same if they can both be placed on the plane
 * such that their vertices occupy exactly the same three points.
 *
*/

/*
+ need to figure out if next triangle is a permutation of previously seen 3 numbers
+ easy comparison of each array if numbers are sorted
+ brute force
  + compare each tuple to those previously seen
  + time:  O(n^2)
  + space: O(n)  => maintain sorted copies of previously seen
  + assumes sort() on 3 tuple is negligible

+ could avoid sorting if we could compute a signature for a single combination of numbers
  + sorted collection is one type of signature
  + what about sum of lowest * 100, 2nd * 10, highest * 1
    + think this is similar to Rabin-Carp
  + if match, would still need to check individual numbers
  + problem: some probability of signature collisions
  + time:  0(n), o(n^2)
  + space: O(n)
*/

var sortTuple = ([a,b,c]) => {
  const min = Math.min(a,b), max = Math.max(a,b);
  const mmin = Math.min(min, c), mmax = Math.max(max, c);
  if ( min === mmin && max === mmax )
    return [ min, c, max ];  
  else if ( min === mmin )
    return [ min, max, c ];
 
  return [ c, min, max ]; // else max === mmax && mmin changed
};



var signature = (tuple) => {
  return sortTuple( tuple ).join(',');
};

function countDistinctTriangles (arr) {
  
  var count = 0, memo = new Set();
  for ( const tuple of arr ) {
    const sig = signature(tuple);
    if ( memo.has( sig ) ) continue;
    memo.add( sig );
    count++;
  }
  return count;
}




//
// test

const inputExpectedPairs = [
    [[[[7, 6, 5], [5, 7, 6], [8, 2, 9], [2, 3, 4], [2, 4, 3]]], 3],
    [[[[3, 4, 5], [8, 8, 9], [7, 7, 7]]], 3]
];

module.exports = {
    f: countDistinctTriangles,
    inputExpectedPairs,
    name: 'Facebook - counting triangles'
};
