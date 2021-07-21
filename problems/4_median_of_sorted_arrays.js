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


const nthSmallestNumber = (n, nums1, nums2, [i1, i2]) => {
    if (i1 > nums1.length) return 

};

const findMedianSortedArrays = (nums1, nums2) => {
    // assumes that nums1 & nums2 are already sorted

    if (nums1.length > nums2.length)
        return findMedianSortedArrays(nums2, nums1);

    const totalLength = nums1.length + nums2.length;
    if ( totalLength % 2 === 0 )
        return ( nthSmallestNumber(totalLength / 2, nums1, nums2, [0,0])
                 + nthSmallestNumber((totalLength / 2) + 1, nums1, nums2, [0,0])
               ) / 2;
    return nthSmallestNumber(Math.ceil(totalLength / 2), nums1, nums2, [0,0])
};


// [1,2,3], [1]
// [1,1,2,3]
// = 1.5

// [1,2,3,4,4], [1]
// [1,1,2,3,4,4]
// = 2.5

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
// = 4.5


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
