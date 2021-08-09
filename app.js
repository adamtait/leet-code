const { test } = require('./test');
const p1 = require('./problems/1_two_sum');
//const p2 = require('./problems/2_add_two_numbers');
const p3 = require('./problems/3_longest_substring');
const p5 = require('./problems/5_longest_palindromic_string');
const p6 = require('./problems/6_zigzag_conversion');
const p7 = require('./problems/7_reverse_integer');
const p8 = require('./problems/8_string_to_integer');
const pt = require('./problems/permissions_tree');
const p9 = require('./problems/9_palindrome_number');
const p10 = require('./problems/10_regular_expression_matching');
const p11 = require('./problems/11_container_with_most_water');
const p12 = require('./problems/12_integer_to_roman');
const pc = require('./problems/cafeteria');


const problems = [p1, p3, p5, p6, p7, p8, pt, p9, p10, p11, p12, pc];


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
