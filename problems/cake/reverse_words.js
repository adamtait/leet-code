/**
 * You're working on a secret team solving coded transmissions.
 *
 * Your team is scrambling to decipher a recent message, worried it's
 * a plot to break into a major European National Cake Vault. The
 * message has been mostly deciphered, but all the words are backward!
 * Your colleagues have handed off the last step to you.
 *
 * Write a function reverseWords() that takes a message as an array of
 * characters and reverses the order of the words in place.
 *
 *
 * Why an array of characters instead of a string?
 *
 * The goal of this question is to practice manipulating strings in
 * place. Since we're modifying the message, we need a mutable type
 * like an array, instead of JavaScript's immutable strings.
 */

/* Thoughts
 + need to letters in words in same order
 + but reverse the order of words

 solution 1:
 + iterate through array
   + collect characters, until space
   + at space, append word to end of array
   + stop when index === array.length

 + oh! if I was to remove the word from the beginning of the array,
 then index would be changing
   + we can solve this by removing the first array.length characters
   after loop is complete
     + downside is that space complexity would be O(2n)...
   + alternatively
     + we could remove the word when we place it at the back
     + but add a token to the end of the array when we start
       + then check for token in loop condition

 solution 2:
 + solution 1 did not actually reverse words
 + iterate backwords through array
 */

var reverseWords = (carr) => {
    const l = carr.length;
    var cw = [];
    for ( var i = l-1; i > -1; i-- ) {
        const c = carr[i];
        
        if ( c === ' ' ) {
            while ( cw.length > 0 )
                carr.push( cw.shift() );
            carr.push(' ');
            // cw = []
        }
        else cw.unshift(c);
    }
    while ( cw.length > 0 )
        carr.push( cw.shift() );
    for ( var i = 0; i < l; i++ ) carr.shift();
    return carr;
};


//
// test

const inputExpectedPairs = [
    [[[]], []],
    [[['a']], ['a']],
    [[['a', 'd']], ['a', 'd']],
    [[['a', 'd', ' ']], [' ', 'a', 'd']],
    [[['a', 'b', ' ', 'c']], ['c', ' ', 'a', 'b']],
    [[['a', 'b', ' ', 'c', 'd']], ['c', 'd', ' ', 'a', 'b']],
    [[['a', 'b', ' ', 'c', 'd', ' ']], [' ', 'c', 'd', ' ', 'a', 'b']]
];

module.exports = {
    f: reverseWords,
    inputExpectedPairs,
    name: ''
};
