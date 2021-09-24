
/*
solution 1
+ dynamic programming
+ subproblems are 'what if I move this word to the next line?
+ for i in words
  + compute minimum empty spaces for words[i+1]
+ maybe bottom up?
  + same work in either direction
+ table

+ recurrence
  + min( spaces with word[i] on this line, 
         spaces with word[i] on next line )

+ time:  O( n^2 )
+ space: O( n^2 )
*/

// badness =
//   if charsPerLine - words[].length < 0
//     => Number.POSITIVE_INFINITY
//   else
//     charsPerLine - words[].length

var badness = () => {
    
};

var length = (words, i, j) => {
    const ws = words.slice(i-1,j).reduce((a,w) => a + w.length, 0);
    const spaces = j - i + 1;
    return ws + spaces;
};

var justify = (charsPerLine, words) => {

    const len = words.length;
    var dpt = new Array(len); // dpt => dynamic programming table
    for ( var i = 0; i < len; i++ )
        dpt[i] = new Array(len);
    
    for ( var i = len-1; i >= 0; i-- ) {
        for ( var j = 0; j < len; j++ ) {
            const word = words[j];
            const prev = dpt[i+1][j] || 0;
            const wl = prev === 0 ? word.length : word.length + 1;
            const thisLine = charsPerLine - prev - wl;
            const nextLine = (charsPerLine - prev) + (charsPerLine - wl);
            dpt[i][j] = Math.min( thisLine, nextLine );
        }
    }
    console.log(dpt);
    return Math.min( ...dpt[ len-1 ] );
};


//
// test

var words = [
    "In", "computer", "science,", "binary", "search,", "also", "known", "as",
    "half-interval", "search", "logarithmic", "search,", "or", "binary",
    "chop", "is", "a", "search", "algorithm", "that", "finds", "the", "position",
    "of", "a", "target", "value", "within", "a", "sorted", "array"];

var fewerWords = words.slice(0,4);


const inputExpectedPairs = [
    [[10, fewerWords], 16],  // [["In" + 8], ["computer" + 2], ["science," + 2], ["binary" + 4]] = 16
    [[20, words], [[]]]
];

module.exports = {
    f: justify,
    inputExpectedPairs,
    name: 'Dynamic programming - text justification'
};
