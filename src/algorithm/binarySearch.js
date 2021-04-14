/**
 * 二分查找,二分搜索区域减少一半，log(n)（n代表集合中元素的个数）
 * @param {Array} array sorted array
 * @returns {Number} if matched return index of metched element else -1
 */
function binarySearch(array, val, begin = 0, end = array.length) {
    if (end - begin <= 0) {
        return -1;
    }
    const mid = Math.ceil((begin + end) / 2);
    const midVal = array[mid - 1];
    if (midVal === val) {
        return mid - 1;
    } else if (midVal > val) {
        return binarySearch(array, val, begin, mid - 1);
    } else {
        return binarySearch(array, val, mid, end);
    }
}


export {binarySearch};