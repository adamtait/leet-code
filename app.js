const { test } = require('./test');
const p1 = require('./problems/leet/1_two_sum');
//const p2 = require('./problems/leet/2_add_two_numbers');
const p3 = require('./problems/leet/3_longest_substring');
const p5 = require('./problems/leet/5_longest_palindromic_string');
const p6 = require('./problems/leet/6_zigzag_conversion');
const p7 = require('./problems/leet/7_reverse_integer');
const p8 = require('./problems/leet/8_string_to_integer');
const p9 = require('./problems/leet/9_palindrome_number');
const p10 = require('./problems/leet/10_regular_expression_matching');
const p11 = require('./problems/leet/11_container_with_most_water');
const p12 = require('./problems/leet/12_integer_to_roman');
const p15 = require('./problems/leet/15_three_sum');

const pt = require('./problems/other/permissions_tree');
const pc = require('./problems/fb/cafeteria');
const pdp = require('./problems/fb/director_of_photography');
const d7 = require('./problems/daily/7_decoding_combinations');
const d8 = require('./problems/daily/8_unival_subtrees');
const d9 = require('./problems/daily/9_sum_non_adjacent');
const d11 = require('./problems/daily/11_autocomplete');

const ps = {
    daily: [d7, d8, d9, d11],
    fb: [pc, pdp],
    leet: [p1, p3, p5, p6, p7, p8, p9, p10, p11, p12, p15],
    other: [pt]
};

const problems = Object.values(ps).reduce((a,p) => a.concat(p), []);

//
// helpers

const assoc = (o, k, v) => {
    var no = Object.assign({}, o);
    no[k] = v;
    return no;
};

const groupBy = (f, arr) => {
    if ( typeof f !== 'function' )
        throw 'Input [first] must be function';

    if ( ! Array.isArray(arr) )
        throw 'Input [second] must be Array';

    return arr.reduce(
        (acc, a) => {
            const k = f(a);
            const cv = acc[k];
            const nv = cv === undefined ? [a] : cv.concat([a]);
            return assoc(acc, k, nv);
        }, {}
    );
    
};



//
// test

const all = () => problems.reduce(
    (acc, { f, inputExpectedPairs, name }) => {
        const rs = inputExpectedPairs
              .reduce((results, pair) => results.concat([test(f, pair)]), [])
              .map((r) => assoc(r, 'name', name));
        return acc.concat( rs );
    }, []
);

const testsAll = () => {
    console.log(
        groupBy((r) => r.name, all())
    );
};

const testsFailed = () => {
    const fts = all().filter((r) => ! r.result );
    console.log(
        groupBy((r) => r.name, fts)
    );
};

module.exports = { all, testsAll, testsFailed };
