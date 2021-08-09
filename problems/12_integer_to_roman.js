/**
 * Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.
 * 
 * Symbol       Value
 * I             1
 * V             5
 * X             10
 * L             50
 * C             100
 * D             500
 * M             1000
 *
 * For example, 2 is written as II in Roman numeral, just two one's
 * added together. 12 is written as XII, which is simply X + II. The
 * number 27 is written as XXVII, which is XX + V + II.
 *
 * Roman numerals are usually written largest to smallest from left to
 * right. However, the numeral for four is not IIII. Instead, the
 * number four is written as IV. Because the one is before the five we
 * subtract it making four. The same principle applies to the number
 * nine, which is written as IX. There are six instances where
 * subtraction is used:
 *
 * + I can be placed before V (5) and X (10) to make 4 and 9.
 * + X can be placed before L (50) and C (100) to make 40 and 90. 
 * + C can be placed before D (500) and M (1000) to make 400 and 900.
 *
 * Given an integer, convert it to a roman numeral.
 */

const ntol = [
    [[1, "I"],
     [5, "V"]],
    [[10, "X"],
     [50, "L"]],
    [[100, "C"],
     [500, "D"]],
    [[1000, "M"]]
];

var intToRoman = function (num) {

    var nnum = num;
    var r = "";
    for (var i = ntol.length -1; i > -1; i--) {
        const ps = ntol[i];
        const [n, l] = ps[0];
        const [fn, fl] = ps[1] || [null,null];
        const [tn, tl] = ntol[i+1] ? ntol[i+1][0] : [null, null];
        const m = Math.floor( nnum / n );
        if ( m > 0 ) {
            if ( m === 9 && tl ) {
                r = r + l + tl;
            }
            else if ( m >= 5 && fl ) {
                r = r + fl;
                for (var j = 0; j < m - 5; j++) r = r + l;
            }
            else if ( m === 4 && fl ) {
                r = r + l + fl;
            }
            else { // 3 or less (usually)
                for (var j = 0; j < m; j++) r = r + l;
            }
            
            nnum = nnum - ( n * m );
        }
    }    
    return r;
};

const inputExpectedPairs = [
    [[0], ""],
    [[3], "III"],
    [[4], "IV"],
    [[5], "V"],
    [[6], "VI"],
    [[9], "IX"],
    [[58], "LVIII"],
    [[1994], "MCMXCIV"],
    [[5994], "MMMMMCMXCIV"],
];


module.exports = {
    f: intToRoman,
    inputExpectedPairs,
    name: '12 - integer to roman'
};
