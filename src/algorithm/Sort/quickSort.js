/**
 * 快排的核心思想在于每次找到一个pivot，然后将数组分成左右两部分，左侧的部分值小于pivot，
 * 右侧值大于pivot，对左右两侧的值分治递归，然后合并
 * @param {Array} arr the array to sort
 * @returns {Array} sorted Array
 */
function quickSort(arr) {
    if (arr.length === 0) {
        return arr;
    }
    const [left, right, pivot] = partition(arr);
    const leftSorted = quickSort(left);
    const rightSorted = quickSort(right);
    return [...leftSorted, pivot, ...rightSorted];
}

/**
 * partition array to three parts, members in left is smaller than pivot, right is bigger
 * @param {Array} arr the array to partition
 * @returns {Array} [left, right, right]
 */
function partition(arr) {
    const pivot = arr[0];
    let left = [];
    let right = [];
    let index = 0;
    while(++index < arr.length) {
        const value = arr[index];
        if (value < pivot) {
            left.push(value);
        }
        else {
            right.push(value);
        }
    }
    return [left, right, pivot];
}

export {quickSort};
