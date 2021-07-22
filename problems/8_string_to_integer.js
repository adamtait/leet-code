/**
  * Implement the myAtoi(string s) function, which converts a string
  * to a 32-bit signed integer (similar to C/C++'s atoi function).
  *
  * The algorithm for myAtoi(string s) is as follows:

  * 1. Read in and ignore any leading whitespace.

  * 2. Check if the next character (if not already at the end of the
  * string) is '-' or '+'. Read this character in if it is either.
  * This determines if the final result is negative or positive
  * respectively. Assume the result is positive if neither is present.

  * 3. Read in next the characters until the next non-digit charcter
  * or the end of the input is reached. The rest of the string is
  * ignored.

  * 4. Convert these digits into an integer (i.e. "123" -> 123, "0032"
  * -> 32). If no digits were read, then the integer is 0. Change the
  * sign as necessary (from step 2).

  * 5. If the integer is out of the 32-bit signed integer range [-231,
  * 231 - 1], then clamp the integer so that it remains in the range.
  * Specifically, integers less than -231 should be clamped to -231,
  * and integers greater than 231 - 1 should be clamped to 231 - 1.

  * 6. Return the integer as the final result.

  * Note:

  * Only the space character ' ' is considered a whitespace character.
  * Do not ignore any characters other than the leading whitespace or
  * the rest of the string after the digits.
  */



/**
 * @param {string} s
 * @return {number}
 */

const charCodeIsNumber = (cc) => {
    return (47 < cc) && (cc < 58);
}

var myAtoi = function (s) {

    // find index of first number
    var ni = -1;
    for (var i = 0; i < s.length; i++) {
        if ( charCodeIsNumber(s.charCodeAt(i)) ) {
            ni = i; break;
        }
    }
    if (ni < 0) return 0;

    var result = 0;
    for (var i = ni; i < s.length; i++) {
        var cc = s.charCodeAt(i);
        if ( ! charCodeIsNumber(cc) ) break;
        result = (result + (cc - 48)) * 10;
    }
    result = result / 10;
    var neg = s.charCodeAt(ni-1) === 45;
    if (neg) result = result * -1;
    if ( result > 2147483647 ) return 2147483647;
    if ( result < -2147483648 ) return -2147483648;
    return result;
};

const inputExpectedPairs = [
    [['0'], 0],
    [['a'], 0],
    [['-'], 0],
    [['-1'], -1],
    [['42'], 42],
    [['-42'], -42],
    [['4193 with words'], 4193],
    [['words and 987'], 987],
    [['101 words and 987'], 101],
    [['over 91283472332 bounds'], 2147483647],
    [['2147483647 at bounds'], 2147483647],
    [['over -91283472332 bounds'], -2147483648],
    [['-2147483648 at bounds'], -2147483648]
];


module.exports = {
    f: myAtoi,
    inputExpectedPairs,
    name: '8 - string to integer'
};
