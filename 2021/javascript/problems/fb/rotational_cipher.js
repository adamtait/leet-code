const charRanges = [
  [48, 57],  // number
  [65, 90],  // uppercase letter
  [97, 122]  // lowercase letter
];


const rotateChar = (ch, rotationFactor) => {
  
  const code = ch.charCodeAt(0);
  var result = -1;
  
  for ( var i = 0; i < charRanges.length; i++ ) {
    const [low, high] = charRanges[i];
    if ( code >= low && code <= high ) {
      const width = high - low + 1;
      const rf = rotationFactor % width;
      result = (code + rf) % (high + 1);
      if ( result < low ) result += low;
      //console.log(JSON.stringify({ ch, code, rotationFactor, width, rf, result }));
      break;
    }
  }
  
  if ( result < 0 ) return ch;
  return String.fromCharCode(result);
};

function rotationalCipher (input, rotationFactor) {
  
  var output = '';
  for ( var i = 0; i < input.length; i++ ) {
    output += rotateChar(input[i], rotationFactor);
    //console.log( input[i] + ' ' + output[ output.length - 1] );
  }
  return output;
}










// These are the tests we use to determine if the solution is correct.
// You can add your own at the bottom.
function printString(str) {
  var out = '["' + str + '"]';
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
    out += printString(expected);
    out += ' Your output: ';
    out += printString(output);
    console.log(out);
  }
  test_case_number++;
}

var input_1 = "All-convoYs-9-be:Alert1.";
var rotationFactor_1 = 4;
var expected_1 = "Epp-gsrzsCw-3-fi:Epivx5.";
var output_1 = rotationalCipher(input_1, rotationFactor_1);
check(expected_1, output_1);

var input_2 = "abcdZXYzxy-999.@";
var rotationFactor_2 = 200;
var expected_2 = "stuvRPQrpq-999.@";
var output_2 = rotationalCipher(input_2, rotationFactor_2);
check(expected_2, output_2);

// Add your own test cases here

/*
console.log( 'a'.charCodeAt(0) );
console.log( 'z'.charCodeAt(0));
console.log( 'A'.charCodeAt(0));
console.log( 'Z'.charCodeAt(0));
console.log( '0'.charCodeAt(0));
console.log( '9'.charCodeAt(0));
*/

console.log( rotationalCipher('abcdZXY', 200) );
