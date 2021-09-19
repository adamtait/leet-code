
const runner = require('./lib/runner');

const k1   = require('./problems/cake/merging_ranges');
const k2   = require('./problems/cake/reverse_string_in_place');
const k3   = require('./problems/cake/reverse_words');
const k4   = require('./problems/cake/merge_sorted_arrays');
const k5   = require('./problems/cake/cafe_order_checker');
const k6   = require('./problems/cake/inflight_entertainment');
const k7   = require('./problems/cake/permutation_palindrome');

const c15  = require('./problems/cracking/1_5_one_away');
const c86  = require('./problems/cracking/8_6_towers_of_hanoi');

const d1_1  = require('./problems/daily/1_1_product_of_all_other_elements');
const d1_2  = require('./problems/daily/1_2_find_unsorted');
const d1_3  = require('./problems/daily/1_3_calculate_maximum_subarray_sum');
const d2_1  = require('./problems/daily/2_1_anagram_indices');
const d3_2  = require('./problems/daily/3_2_add_linked_list_numbers');
const d4_3  = require('./problems/daily/4_3_maximum_of_subarrays');
const d7    = require('./problems/daily/7_decoding_combinations');
const d8    = require('./problems/daily/8_unival_subtrees');
const d9    = require('./problems/daily/9_sum_non_adjacent');
const d11   = require('./problems/daily/11_autocomplete');
const d15_4 = require('./problems/daily/15_4_find_in_rotated_array');
const d19   = require('./problems/daily/19_colored_houses');
const d20   = require('./problems/daily/20_linked_list_intersection');
const d22   = require('./problems/daily/22_word_matching');

const fbcaf = require('./problems/fb/cafeteria');
const fbdp  = require('./problems/fb/director_of_photography');
const fbrme = require('./problems/fb/reverse_to_make_equal');

const p1    = require('./problems/leet/1_two_sum');
//const p2    = require('./problems/leet/2_add_two_numbers');
const p3    = require('./problems/leet/3_longest_substring');
const p5    = require('./problems/leet/5_longest_palindromic_string');
const p6    = require('./problems/leet/6_zigzag_conversion');
const p7    = require('./problems/leet/7_reverse_integer');
const p8    = require('./problems/leet/8_string_to_integer');
const p9    = require('./problems/leet/9_palindrome_number');
const p10   = require('./problems/leet/10_regular_expression_matching');
const p11   = require('./problems/leet/11_container_with_most_water');
const p12   = require('./problems/leet/12_integer_to_roman');
const p15   = require('./problems/leet/15_three_sum');
const p54   = require('./problems/leet/54_spiral_matrix');
const p57   = require('./problems/leet/57_insert_interval');
const p70   = require('./problems/leet/70_climbing_stairs');
const p73   = require('./problems/leet/73_set_matrix_zeros');
const p121  = require('./problems/leet/121_buy_sell_stock');
const p133  = require('./problems/leet/133_clone_graph');
const p139  = require('./problems/leet/139_word_break');
const p206  = require('./problems/leet/206_reverse_linked_list');
const p271  = require('./problems/leet/271_encode_decode_strings');
const p322  = require('./problems/leet/322_coin_change');
const p371  = require('./problems/leet/371_sum_two_integers');

const oh    = require('./problems/own/highlight');
const obs   = require('./problems/own/binary_search');


//
// problems

const problemsByType = {
    cake: { k1, k2, k3, k4, k5, k6, k7 },
    cracking: { c15, c86 },
    daily: { d1_1, d1_2, d1_3, d2_1, d3_2, d4_3, d7, d8, d9, d11,
             d15_4, d19, d20, d22 },
    fb: { fbcaf, fbdp, fbrme },
    leet: {p1, p3, p5, p6, p7, p8, p9, p10, p11, p12, p15, p54,
           p57, p70, p73, p121, p133, p139, p206, p271, p322, p371},
    own: { oh, obs }
};

const problems = Object
      .values(problemsByType)
      .reduce((a,p) => a.concat( Object.values(p) ), []);


//
// test aggregators

const testsAll = () => runner.testsAll(problems);
const testsFailed = () => runner.testsFailed(problems);


//
// test

const validateProblemSet = (s) => {
    if ( Object.keys(problemsByType).indexOf(s) < 0 )
        throw 'Problem set/type (' + s + ') is not valid';
};

const validateProblemKey = (ps, pks) => {
    if ( Object.keys(problemsByType[ps]).indexOf(pks) < 0 )
        throw 'Problem keys (' + pks + ') is not valid';
};

const test = (ps, pks) => {
    validateProblemSet(ps);
    validateProblemKey(ps, pks);
    const p = problemsByType[ps][pks];
    return runner.testsAll( [p] );
};


//
// interface

module.exports = {
    problems,
    problemsByType,
    test,
    testsAll,
    testsFailed,
};
