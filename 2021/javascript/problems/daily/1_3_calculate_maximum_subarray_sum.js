/**
 * Given an array of numbers, calculate the maximum sum of any
 * contiguous subarray of array. For example, given the array [34,
 * -50, 42, 14, -5, 86], the maximum subarray sum would be 137 since
 * we would take 42, 14, -5, 86. Given the array [-5, -1, -8, -9], the
 * maximum sum would be 0 since we would choose not to take any
 * elements.
 *
 * Do this in O(n) time.
 *
 * Follow-up: what if the elements can wrap around? For example, given
 * [8, -1, 3, 4] return 15 as we would choose 3,4,8 where 8 is
 * obtained by wrapping around.
 */

//
// 1st attempt

var calc = (arr) => {

    var max = 0;
    
    for ( var i = 0; i < arr.length; i++ ) {
        const v = arr[i];
        if ( v > 0 ) max = max + v;
        else if ( i === arr.length -1 ) break;
        else if ( max + v + arr[i+1] > max )
            max = max + v;
        else max = 0;
    }
    return max;
};

var calcWrapped = (arr) => {

    var max = 0;
    var min = 0;
    var mini = -1;
    var minUsed = false;
    
    for ( var i = 0; i < arr.length; i++ ) {

        const v = arr[i];

        if ( v < min ) {
            min = v;
            mini = i;
            if ( i < arr.length -1 && max + v + arr[i+1] > max )
                minUsed = true;
        }

        if ( v > 0 ) max = max + v;
        else if ( i === arr.length -1 ) break;
        else if ( max + v + arr[i+1] > max )
            max = max + v;
        else max = 0;
    }

    if ( minUsed )
        max = max + Math.abs(min);
    else if ( min < 0 )
        max = max + calc(arr.slice(0,mini));
    // else => no values less than 0
    
    return max;
};


//
// 2nd attempt
//  - Kadne's algorithm

var kadnes = (arr) => {

    var max_to_here = 0;
    var max_so_far = 0;
    for ( var i = 0; i < arr.length; i++ ) {
        const v = arr[i];
        max_to_here = Math.max(v, max_to_here + v);
        max_so_far = Math.max(max_to_here, max_so_far);
    }
    return max_so_far;
};

var kadnesMin = (arr) => {

    var min_to_here = 0;
    var min_so_far = 0;
    for ( var i = 0; i < arr.length; i++ ) {
        const v = arr[i];
        min_to_here = Math.min(v, min_to_here + v);
        min_so_far = Math.min(min_to_here, min_so_far);
    }
    return min_so_far;
}

var sum = (arr) => arr.reduce((a,v) => a + v, 0);

var wrappedKadnes = (arr) => {
    const wrapped_max = sum(arr) - kadnesMin(arr);
    return Math.max(kadnes(arr), wrapped_max);
};


//
// tests

const inputExpectedPairs = [
    [[[]], 0],
    [[[1,2]], 3],
    [[[1,2,-3]], 3],
    [[[1,2,-3,4]], 4],
    [[[-1]], 0],
    [[[-5,-1,-8,-9]], 0],
    [[[34, -50, 42, 14, -5, 86]], 137],
    [[[8,-1,3,4]], 14],

    // wrappedKadnes tests
    //[[[8,-1,3,4]], 15]  // 3+4+8
    //[[[8,-3,4,-5,3,4]], 16] // 3+4+8+-3+4
];

module.exports = {
    f: kadnes,
    inputExpectedPairs,
    name: '1.3 (book) - calculate maximum subarray sum'
};
