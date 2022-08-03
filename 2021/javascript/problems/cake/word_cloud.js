/**
 * url: https://www.interviewcake.com/question/javascript/word-cloud
 *
 * You want to build a word cloud, an infographic where the size of a
 * word corresponds to how often it appears in the body of text.
 *
 * To do this, you'll need data. Write code that takes a long string
 * and builds its word cloud data in a map, where the keys are words
 * and the values are the number of times the words occurred.
 *
 * Think about capitalized words. For example, look at these sentences: 
 * + "After beating the eggs, Dana read the next step:"
 * + "Add milk and eggs, then add flour and sugar."
 *
 * What do we want to do with "After", "Dana", and "add"? In this
 * example, your final map should include one "Add" or "add" with a
 * value of 2. Make reasonable (not necessarily perfect) decisions
 * about cases like "After" and "Dana".
 *
 * Assume the input will only contain words and standard punctuation.
 *
 * You could make a reasonable argument to use regex in your solution.
 * We won't, mainly because performance is difficult to measure and
 * can get pretty bad.
 */

/*
+ sounds like a tokenizer
+ iterate string
  + find next token (until whitespace, punctuation)
  + lowercase token
  + add token to word cloud

*/


var isWordChar = (c) => {

    const code = c.charCodeAt(0);
    if ( 65 <= code && code <= 90 )
        return true;
    if ( 97 <= code && code <= 122 )
        return true;
    if ( code === 45 ) return true;
    return false;
};

var cloud = (s) => {

    var m = new Map();
    var i = 0;
    
    while ( i < s.length ) {

        // get next token
        var token = "";
        while ( i < s.length && isWordChar( s[i] ) ) {
            token = token + s[i];
            i++;
        }
        token = token.toLowerCase();

        if ( token.length > 0 ) {
            if ( ! m.get(token) )
                m.set(token, 0);
            m.set(token, m.get(token) + 1);
        }
             
        // move i to next char
        while ( i < s.length && ! isWordChar( s[i] ) )
            i++;
    }

    return m;
};


//
// test

const inputExpectedPairs = [
    [[ "Add milk and eggs, then add flour and sugar." ],
     new Map([ ['add', 2], ['milk', 1], ['and', 2], ['eggs', 1], ['then', 1], ['flour', 1], ['sweet-sugar', 1] ])],
    [["We came, we saw, we conquered...then we ate Bill's (Mille-Feuille) cake."],
     new Map([ ['we', 4], ['came', 1], ['saw', 1], ['conquered', 1], ['then', 1], ['ate', 1], ['bill', 1], ['s', 1], ['mille-feuille', 1], ['cake', 1] ])],
    [["The bill came to five dollars."],
     new Map([ ['the', 1], ['bill', 1], ['came', 1], ['to', 1], ['five', 1], ['dollars', 1] ])]
];

module.exports = {
    f: cloud,
    inputExpectedPairs,
    name: 'word cloud'
};
