/*
 Thoughts
 + output[i] = product of 3 largest integers up to i
   + if i < 2, output = -1
   
 solution 1
 + max heap of size 3
 + iterate through arr
   + add i to heap
   + calculate product from heap
 + time: O(n * log3) = O(n)
 + space: O(3 + n) = O(n) ( O(1) if you don't include output array)
 
 solution 2
 + instead of max heap, just a sorted array of size 3
*/

var addToMaxThree = (v, m3) => {
  // invariant: m3 is sorted ascending
  var i = 0;
  while ( v > m3[i] ) i++;
  const rest = m3.slice(i);
  m3 = m3.slice(0,i).concat([v, ...rest]);
  if ( m3.length > 3 ) 
    m3.shift();  // drop lowest
  return m3;
};

var product = (m3) => {
  if ( m3.length < 3 ) return -1;
  const [a,b,c] = m3;  // or, m3.reduce((a,v) => a*v, 1)
  return a*b*c;
}

function findMaxProduct (arr) {

  var m3 = [], output = [];
  for ( var i = 0; i < arr.length; i++ ) {
    const v = arr[i];
    m3 = addToMaxThree(v, m3);
    output.push( product(m3) );
  }
  return output;
}

/*
 examples
 
 input: [1,2,3]
 m3:     [], [1],  [1,2],   [1,2,3]
 output: [], [-1], [-1,-1], [-1,-1,6]
 
 input: [1,2,3,-1]
 m3:     [], [1],  [1,2],   [1,2,3],   [1,2,3]
 output: [], [-1], [-1,-1], [-1,-1,6], [-1,-1,6,6]
 
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

var arr_1 = [1, 2, 3, 4, 5];
var expected_1 = [-1, -1, 6, 24, 60];
var output_1 = findMaxProduct(arr_1);
check(expected_1, output_1);

var arr_2 = [2, 4, 7, 1, 5, 3];
var expected_2 = [-1, -1, 56, 56, 140, 140];
var output_2 = findMaxProduct(arr_2);
check(expected_2, output_2);

// Add your own test cases here
