/**
 *
 * @param {number[]} nums
 * @param {number} target
 * @param {number} lo
 * @param {number} hi
 */
function binarySearchA(nums, target, lo, hi) {
    while (lo < hi) {
        const mid = (lo + hi) >> 1;
        const ele = nums[mid];
        if (ele === target) {
            return mid;
        } else if (ele > target) {
            hi = mid;
        } else {
            lo = mid + 1;
        }
    }
    return -1;
}

/**
 * 斐波那契近乎黄金分割比例，能从常系数上减少复杂度
 * @param {number[]} nums
 * @param {number} target
 * @param {number} lo
 * @param {number} hi
 */
function binarySearchB(nums, target, lo, hi) {
    while (lo < hi) {
        const mid = Math.floor((lo + hi * 2) / 3);
        const ele = nums[mid];
        if (ele === target) {
            return mid;
        } else if (ele > target) {
            hi = mid;
        } else {
            lo = mid + 1;
        }
    }
    return -1;
}

/**
 * 针对最坏查找情况，能略微提高运算效率
 * @param {number[]} nums
 * @param {number} target
 * @param {number} lo
 * @param {number} hi
 */
function binarySearchC(nums, target, lo, hi) {
    while (hi - lo > 1) {
        const mid = (lo + hi) >> 1;
        if (nums[mid] < target) {
            lo = mid + 1;
        } else {
            hi = mid;
        }
    }
    return nums[hi] === target ? hi : -1;
}

/**
 * 该版本的二分查找能找到nums中值为target且秩最大者
 * @param {number[]} nums
 * @param {number} target
 * @param {number} lo
 * @param {number} hi
 */
function binarySearchD(nums, target, lo, hi) {
    while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (nums[mid] <= target) {
            lo = mid + 1;
        } else {
            hi = mid;
        }
    }
    const index = lo - 1;
    return nums[index] === target ? index : -1;
}
