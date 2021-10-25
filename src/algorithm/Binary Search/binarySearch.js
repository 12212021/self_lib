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
        // 相等rank也增加
        if (nums[mid] <= target) {
            lo = mid + 1;
        } else {
            hi = mid;
        }
    }
    const index = lo - 1;
    return index;
}

/**
 * 搜索二维矩阵，矩阵符合如下规则
 * 1) 从左到右依次递增
 * 2) 从上到下依次递增
 * 给出target，搜索该矩阵，看target是否存在于该矩阵
 *
 * 1. 常规暴力搜索
 * 2. 针对矩阵中每一个一维数组，采用二分查找，搜索该值
 * 3. 用z字搜索法
 *
 *
 * Z字搜索法，以矩阵左下角，右上角为边界进行搜索，(x, y)代表右上角
 * 1) 初始化 x = 0, y = matrix.length - 1
 * 2) 若val = matrix[x][y] === target 返回true
 * 3) 若val > target 表示以该点为左上角的矩阵的值全部严格大于target, y--
 * 4) 若val < target 表示以该点为右下角的矩阵的值全部严格小于target, x++
 * 5) 若越界，代表搜索不到该target值
 */
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
    let x = 0;
    let y = matrix[0].length - 1;
    while (x < matrix.length && y > -1) {
        const val = matrix[x][y];
        if (val === target) {
            return true;
        } else if (val > target) {
            y--;
        } else {
            x++;
        }
    }
    return false;
};
let matrix = [
    [1, 4, 7, 11, 15],
    [2, 5, 8, 12, 19],
    [3, 6, 9, 16, 22],
    [10, 13, 14, 17, 24],
    [18, 21, 23, 26, 30]
];
let target = 5;
