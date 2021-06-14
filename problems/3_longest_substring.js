const { areEqual, newTestRunner } = require('../test');

/**
 * @param {string} s
 * @return {number}
 */

const splitRepeated = (subs, c) => {
    const ls = subs.pop();
    if (ls.indexOf(c) >= 0)
        return subs.concat([ls, c]);
    return subs.concat([ ls + c ]);
};

const lengthOfLongestSubstring = (s) => {
    const ss = s.split('');
    const sss = ss.reduce(splitRepeated, [''])
          .concat(ss.reverse().reduce(splitRepeated, ['']));

    return sss.reduce(
        (longest, sub) => sub.length > longest.length ? sub : longest, ''
    ).length;
};


//
// testing

const inputExpectedPairs = [
    ['', 0],
    ['abc', 3],
    ['abbc', 2],
    ['abcabcbb', 3],
    ['bbbbb', 1],
    ['pwwkew', 3],
    ['dvdf', 3]
];

module.exports = {
    f: lengthOfLongestSubstring,
    inputExpectedPairs,
    name: '3 - lengthOfLongestSubstring'
};
