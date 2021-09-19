/**
 * You likely know that different currencies have coins and bills of
 * different denominations. In some currencies, it's actually
 * impossible to receive change for a given amount of money. For
 * example, Canada has given up the 1-cent penny. If you're owed 94
 * cents in Canada, a shopkeeper will graciously supply you with 95
 * cents instead since there exists a 5-cent coin.
 *
 * Given a list of the available denominations, determine if it's
 * possible to receive exact change for an amount of money
 * targetMoney. Both the denominations and target amount will be given
 * in generic units of that currency.
 */



function canGetExactChange(targetMoney, denominations) {
    
  
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

var target_1 = 94;
var arr_1 = [5, 10, 25, 100, 200];
var expected_1 = false;
var output_1 = canGetExactChange(target_1, arr_1);
check(expected_1, output_1);

var target_2 = 75;
var arr_2 = [4, 17, 29];
var expected_2 = true;
var output_2 = canGetExactChange(target_2, arr_2);
check(expected_2, output_2);

// Add your own test cases here
