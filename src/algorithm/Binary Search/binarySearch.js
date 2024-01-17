/**
 * 基础版本
 * 若target < nums[mid] 则hi = mi,前半区间查找
 * 若target > nums[mid] 则lo = mid + 1，后半区间查找
 * 否则命中target
 * @param {Array} nums
 */
function binarySearchA(nums = [], target) {
    let lo = 0;
    let hi = nums.length;
    while (lo < hi) {
        const mid = (lo + hi) >>> 1;
        if (target < nums[mid]) {
            hi = mid;
        } else if (target > nums[mid]) {
            lo = mid + 1;
        } else {
            return mid;
        }
    }
    return -1;
}

/**
 * 若target < nums[mid] 则hi = mi,前半区间查找
 * 若target > nums[mid] 则lo = mid + 1，后半区间查找
 * 等于的情况，也把lo的情况也加一
 *
 * 如下的不变性
 * nums[0, lo)的值全都不大于target, nums[hi, n)大于target
 *
 * 若命中，返回秩最大者，如果失败，返回查找失败的最后位置，所以需要上次去判断是不是命中元素
 * @param {Array} nums
 */
function binarySearchB(nums = [], target) {
    let lo = 0;
    let hi = nums.length;
    while (lo < hi) {
        const mid = (lo + hi) >>> 1;
        if (target < nums[mid]) {
            hi = mid;
        } else if (target > nums[mid]) {
            lo = mid + 1;
        } else {
            // 等于情况
            lo = mid + 1;
        }
    }
    return lo - 1;
}

/**
 * 若命中，返回秩最小者，如果失败，返回查找失败的最后位置，所以需要上次去判断是不是命中元素
 * @param {Array} nums
 */
function binarySearchC(nums = [], target) {
    let lo = 0;
    let hi = nums.length;
    while (lo < hi) {
        const mid = (lo + hi) >>> 1;
        if (target < nums[mid]) {
            hi = mid;
        } else if (target > nums[mid]) {
            lo = mid + 1;
        } else {
            hi = mid;
        }
    }
    return hi;
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
// let matrix = [
//     [1, 4, 7, 11, 15],
//     [2, 5, 8, 12, 19],
//     [3, 6, 9, 16, 22],
//     [10, 13, 14, 17, 24],
//     [18, 21, 23, 26, 30]
// ];
// let target = 5;

let nums = [0, 1, 1, 1, 1, 2, 2, 2, 3, 3, 8, 9, 10];
console.log(binarySearchC(nums, -11));
