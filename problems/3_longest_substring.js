/**
 * @param {string} s
 * @return {number}
 */

const consume = (a) => {
    var na = [];
    for (var i in a) {
        const j = Number(i);
        const c = a[j];
        if ( na.indexOf(c) >= 0 ) return na;
        na.push(c); 
    }
    return na;
};

const lengthOfLongestSubstring = (s) => {

    const ss = s.split('');
    var rs = [];
    
    for (var i in ss) {
        const j = Number(i);
        rs.push( consume(ss.slice(j)) );
    }

    for (var i = ss.length - 1; i >= 0; i--) {
        rs.push( consume(ss.slice(0,i).reverse()).reverse() );
    }

    return rs.reduce(
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
    ['dvdf', 3],
    ['asjrgapa', 6]
];

module.exports = {
    f: lengthOfLongestSubstring,
    inputExpectedPairs,
    name: '3 - lengthOfLongestSubstring'
};
