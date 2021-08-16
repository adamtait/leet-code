/**
 * Given an integer x, return true if x is palindrome integer.
 *
 * An integer is a palindrome when it reads the same backward as
 * forward. For example, 121 is palindrome while 123 is not.
 *
 */

const sip = (s) => {
    const l = s.length;
    if (l < 2) return true;
    if (s[0] !== s[l-1]) return false;
    return sip(s.slice(1, l-1));
};

var isPalindrome = function (x) {
    return sip(x.toString());
};

const inputExpectedPairs = [
    [['0'], true],
    [['1'], true],
    [['121'], true],
    [['-121'], false],
    [['123'], false],
];


module.exports = {
    f: isPalindrome,
    inputExpectedPairs,
    name: '9 - palindrome number '
};
