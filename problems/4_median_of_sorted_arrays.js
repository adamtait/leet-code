/**
 * Given two sorted arrays nums1 and nums2 of size m and n
 * respectively, return the median of the two sorted arrays.
 *
 * The overall run time complexity should be O(log (m+n)).
 *
 * notes: https://mem.ai/m/JE9LNcv67DT2Jt8uiHyT
 */

const first = (nums) => nums[0];
const last = (nums) => nums[nums.length -1];

const median = (nums) => {
    const sum = nums.reduce((a, n) => a + n, 0);
    return sum / nums.length;
};

const point = (nums, index) => {
    return {
        index: index,
        value: nums[index]
    };
};

const middle = (nums) => {
    const hl = nums.length / 2;
    if ( nums.length % 2 === 0 )
        return [ point(nums, hl-1), point(nums, hl) ];
    return [ point(nums, Math.floor(hl)) ];
};

const triplets = (nums) => {
    if ( nums.length === 0 ) return [];
    if ( nums.length === 1 ) return [ point(nums,0) ];
    if ( nums.length === 2 ) return [ point(nums,0), point(nums,1) ];
    const hl = Math.floor(nums.length / 3);
    return [ point(nums, hl), point(nums, nums.length - hl) ];
};


const sort = (n1, n2, low, high) => {
    
    return [];
};

const findMedianSortedArrays = (nums1, nums2) => {
    // assumes that nums1 & nums2 are already sorted

    console.log("----");
    console.log(nums1);
    console.log(nums2);

    if ( nums1.length === 0 ) return median(nums2);
    if ( nums2.length === 0 ) return median(nums1);

    // if nums1 is strictly smaller than nums2
    if ( last(nums1) < first(nums2) )
        median(middle( nums1.concat(nums2) ));

    // if nums2 is strictly smaller than nums1
    if ( last(nums2) < first(nums1) )
        median(middle( nums2.concat(nums1) ));


    if ( last(nums2) < first(nums1) ) {
        if ( nums1.length === nums2.length )
            return median([last(nums2), first(nums1)]);
        if ( nums2.length > nums1.length ) return last(nums2);
        return first(nums1);
    }

    
    
};


// [1,2,3], [1]
// [1,1,2,3]
// = 1.5

// [1,2,3,4], [3,4,5,6]
// [1,2,3,3,4,4,5,6]
// = 3.5

// [1,2,5,6], [3,3,4,4]
// [1,2,3,3,4,4,5,6]
// = 3.5

// [3,3,4,4], [1,2,5,6]
// [1,2,3,3,4,4,5,6]
// = 3.5

// [1,2,3], [8,9,10]
// [1,2,3,8,9,10]
// = 5.5

// [1,3,5,7,9], [0,2,4,6,8]
// [0,1,2,3,4,5,6,7,8,9]
// = 5


//
// testing

const inputExpectedPairs = [
    [[[1,3],[2]], 2],
    [[[1,2],[3,4]], 2.5],
    [[[0,0],[0,0]], 0],
    [[[],[1]], 1],
    [[[2],[]], 2],
    [[[8,9,10],[1,2,3]], 5.5],
    [[[1,2,3],[8,9,10]], 5.5],
    [[[1],[1]], 1],
    [[[1,3,5,7,9],[0,2,4,6,8]], 5]
];

module.exports = {
    f: twoSum,
    inputExpectedPairs,
    name: '4 - median of sorted arrays'
};
