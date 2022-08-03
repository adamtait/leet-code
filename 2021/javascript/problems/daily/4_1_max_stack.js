/**
 * Implement a "max" stack. 'push' & 'pop' are normal. 'max' returns
 * the current maximum value in the stack. All operations must run in
 * constant time.
 */

var MaxStack = () => {
    var a = [];
    var ms = [];
    
    return {
        push: (v) => {
            a.push(v);
            if ( ms.length === 0 ) ms.push(v);
            else ms.push( Math.max(v, ms[ms.length-1]) );
        },
        pop: () => {
            a.pop();
            ms.pop();
        },
        max: () => ms[ms.length-1]
    };
};


//
// tests

const inputExpectedPairs = [
    [[], true],
];

module.exports = {
    f: () => true,
    inputExpectedPairs,
    name: '2.1 (book) - find anagram indices'
};
