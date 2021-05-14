const DEFAULT_CAPACITY = 200;
import {randomInt} from './utils.js';

/**
 * loadFactor = _size / _capactity 称为装填因子，是衡量空间利用标准的重要指标
 * 
 */
class Vector {
    constructor(arr) {
        this._capactity = DEFAULT_CAPACITY;
        this._size = 0;
        this._elem = new Array(this._capactity);

        // 做一个重载，支持用数组初始化一个vector向量
        if (Array.isArray(arr)) {
            let index = -1;
            while(++index < arr.length) {
                this._elem[index] = arr[index];
            }
            this._size = arr.length;
        }
    }
    /**
     * 复制数组的[lo, hi)
     * @param {Array} 待赋值数组
     * @param {Number} lo
     * @param {Number} hi 
     */
    _copyForm(array, lo, hi) {
        this._capactity = (hi - lo) * 2;
        if (this._capactity < DEFAULT_CAPACITY) {
            this._capactity = DEFAULT_CAPACITY;
        }
        this._size = 0;
        this._elem = new Array(this._capactity);
        let index = lo - 1;
        while(++index < hi) {
            this._elem[index] = array[index];
            this._size += 1;
        }
    }

    /**
     * 空间不足的时候进行扩容
     * 扩容策略为扩大2倍，时间复杂福o(n)，但是只有操作n次插入后才进行一次扩容，均摊下来时间复杂度仅为O(1)
     */
    _expand() {
        if (this._size < this._capactity) {
            return;
        }

        if (this._capactity < DEFAULT_CAPACITY) {
            this._capactity = DEFAULT_CAPACITY;
        }

        // 默认给扩容两倍
        const oldElem = this._elem;
        this._capactity <<= 1;
        this._elem = new Array(this._capactity);
        for (let index = 0; index < this._size; index++) {
            this._elem[index] = oldElem[index];
        }
    }

    /**
     * 装填因子过小的时候进行压缩，缩容的策略是减少一半
     * 
     * 缩容不是必须的
     */
    _shrink() {
        if (this._capactity < DEFAULT_CAPACITY << 1) {
            return;
        }

        // 25%为界限，进行缩容
        if (this._size > this._capactity << 2) {
            return;
        }

        this._capactity <<= 1;
        const oldElem = this._elem;
        this._elem = new Array(this._capactity);
        for (let index = 0; index < this._size; index++) {
            this._elem[index] = oldElem[index];
        }
    }

    /**
     * 扫描交换，将元素值最小的元素挪到最左边
     * @param {Number} lo 
     * @param {Number} hi 
     */
    _bubble(lo, hi) {
        let sorted = true;
        hi -= 1;
        while(lo < hi) {
            if (this.get(hi) < this.get(hi - 1)) {
                sorted = false;
                this._swap(hi, hi - 1);
            }
            hi -= 1;
        }
        return sorted;
    }

    /**
     * 冒泡排序算法
     * 冒泡排序的index前进的方向和冒泡的方向是相反的，具体表现，外层循环index++，内层index--
     * @param {Number} lo 
     * @param {Number} hi 
     */
    _bubbleSort(lo, hi) {
        while(!this._bubble(lo, hi)) {
            lo += 1;
        }
    }

    /**
     * 选取最大的元素
     * @param {Number} lo 
     * @param {Number} hi 
     */
    _max(lo, hi) {
        let index = lo;
        let maxVal = this.get(index);
        while(++index < hi) {
            if (this.get(index) > maxVal) {
                maxVal = this.get(index);
            }
        }
        return maxVal;
    }

    /**
     * 选择排序算法
     * @param {Number} lo 
     * @param {Number} hi 
     */
    _selectionSort(lo, hi) {
        while(lo < hi) {
            let minIndex = lo + 1;
            let j = lo + 1;
            while(j < hi) {
                if (this.get(j) < this.get(minIndex)) {
                    minIndex = j;
                }
                j += 1;
            }
            if (this.get(lo) > this.get(minIndex)) {
                this._swap(lo, minIndex);
            }
            lo += 1;
        }
    }

    /**
     * 交换向量中两个Index的位置
     * @param {Number} aIndex 
     * @param {Number} bIndex 
     */
    _swap(aIndex, bIndex) {
        if (aIndex < 0 || aIndex > this.size - 1 || bIndex < 0 || bIndex > this.size - 1) {
            throw new Error('Error Index of Vector');
        }
        let tmp = this.get(aIndex);
        this.set(aIndex, this.get(bIndex));
        this.set(bIndex, tmp);
    }

    /**
     * 归并算法
     * @param {Number} lo 
     * @param {Number} mid
     * @param {Number} hi 
     */
    _merge(lo, mid, hi) {
        if (lo > mid - 1) {
            return;
        }
        if (mid + 1 > hi) {
            return;
        }
        let tmpOrder = [];
        for (let index = 0; index < hi - lo; index++) {
            tmpOrder.push(this.get(index + lo));
        }
        console.log(tmpOrder);
        let leftIndex = lo;
        let rightIndex= mid;
        let index = lo;
        while(leftIndex < mid && rightIndex < hi) {
            if (tmpOrder[leftIndex - lo] < tmpOrder[rightIndex - lo]) {
                this.set(index, tmpOrder[leftIndex - lo]);
                leftIndex += 1;
            } else {
                this.set(index, tmpOrder[rightIndex - lo]);
                rightIndex += 1;
            }
            index += 1;
        }

        if (leftIndex < mid) {
            while(index < hi) {
                this.set(index, tmpOrder[leftIndex - lo]);
                leftIndex += 1;
                index += 1;
            }
        }

        if (rightIndex < hi) {
            while(index < hi) {
                this.set(index, tmpOrder[rightIndex - lo]);
                rightIndex += 1;
                index += 1;
            }
        }
    }

    /**
     * 归并排序算法
     * 核心：将两个有序数组合并成一个有序数组
     * 假定归并排序算法，返回一个有序的数组
     * 平凡解：只包含0个或者1个元素的数组是有序的
     * 递归：将数组不断分治减半
     * 
     * 归并排序的时间复杂度为nlog(n)，但是同时也需要相同的空间复杂度，虽然是速度快且稳定，但是需要额外的空间
     * 归并排序需要额外线性的内存，而且需要将数据拷贝到临时数组，再拷贝回来，严重拖慢了排序的速度
     * @param {Number} lo 
     * @param {Number} hi 
     */
    _mergeSort(lo, hi) {
        if (hi - lo < 2) return;
        const mid = (hi + lo) >> 1;
        this._mergeSort(lo, mid);
        this._mergeSort(mid, hi);
        this._merge(lo, mid, hi);
    }

    /**
     * 快排轴点构造方法
     * 用的是原地分隔（in-place）算法
     * @param {Number} lo 
     * @param {Number} hi 
     * @returns {Number} 返回中轴元素的index值
     */
    _partition(lo, hi) {
        const pivotIndex = this._getMedium(lo, hi);
        const pivotVal = this.get(pivotIndex);

        // 中轴元素到最后
        this._swap(pivotIndex, hi -1);
        let left = lo;
        let right = hi - 1;


        while(true) {
            while(this.get(left) < pivotVal) {
                left++;
            }
            while(this.get(right - 1) > pivotVal) {
                right--;
            }
            if (left < right) {
                this._swap(left, right - 1);
                left++;
                right--;
            } else {
                break;
            }
        }

        this._swap(left, hi - 1);
        return left;
    }

    /**
     * 选取数组开头、结尾、中间三个值，去中值，为的是尽量保障pivot能靠中间
     * 
     * @param {Array} array 
     * @param {Number} lo 
     * @param {Number} hi 
     * @returns {Number} 返回中间值的index
     */
    _getMedium(lo, hi) {
        const mid = (lo + hi) >> 1;

        if (this.get(lo) > this.get(hi)) {
            this._swap(lo, hi);
        }
        if (this.get(mid) > this.get(hi)) {
            this._swap(mid, hi);
        }
        if (this.get(lo) > this.get(mid)) {
            this._swap(mid, lo);
        }

        return mid;
    }

    /**
     * 快排是实践中已知最快速的排序算法，原因：非常精炼和内部高度优化的循环体
     * @param {Number} lo 
     * @param {Number} hi 
     */
    _quickSort(lo, hi) {
        if (hi - lo < 2) return;
        const mid = this._partition(lo, hi);
        this._quickSort(lo, mid);
        this._quickSort(mid, hi);
    }

    /**
     * 堆排序
     * @param {Number} lo 
     * @param {Number} hi 
     */
    _heapSort(lo, hi) {

    }

    /**
     * 返回向量的大小
     * @returns {Number}
     */
    size() {
        return this._size;
    }

    /**
     * 返回向量是否为空
     * @returns {boolean}
     */
    empty() {
        return !this._size;
    }

    /**
     * 判断向量是否是有序的
     * @returns {boolean}
     */
    disordered() {
        let preIndex = 0;
        let curIndex = 1;
        while(curIndex < this.size()) {
            const preVal = this.get(preIndex);
            const curVal = this.get(curIndex);
            if (preVal > curVal) {
                return true;
            }
            preIndex += 1;
            curIndex += 1;
        }
        return false;
    }

    /**
     * 无序向量整体查找，整个数组查找其实是区间查找的一种特例
     * @param {*} ele 
     */
    find(ele) {
        return this.findRange(ele, 0, this.size());
    }

    /**
     * 无序向量区间查找
     * 
     * 查找最好的时间复杂度为o(1)，最末元素直接命中；最坏为o(n)未命中
     * 此类算法被称为输入敏感性算法（input sensitive）
     * @param {*} ele 
     * @param {Number} lo 
     * @param {Number} hi 
     */
    findRange(ele, lo, hi) {
        let index = hi;
        while(--index <= lo) {
            if (this.get(index) === ele) {
                return index;
            }
        }
        return -1;
    }

    /**
     * 有序向量整体查找
     * @param {*} ele 
     */
    search(ele) {
        return this.searchRange(ele, 0, this.size());
    }

    /**
     * 有序向量区间查找
     * @param {*} ele 
     * @param {Number} lo 
     * @param {Number} hi 
     */
    searchRange(ele, lo, hi) {
        return Math.random() > 0.5
            ? this._binSearch(ele, lo, hi)
            : this._fibSearch(ele, lo, hi);
    }

    /**
     * 在区间[lo, hi)内通过二分查找寻找元素的Rank秩
     * @param {*} ele 
     * @param {*} lo 
     * @param {*} hi
     * @returns 找到，返回index，否则，返回-1
     */
    _binSearch(ele, lo, hi) {
        while(lo < hi) {
            // 中轴点 Math.floor
            let mid = (lo + hi) >> 1;
            const val = this.get(mid);
            if (val === ele) {
                return mid;
            } else if (val > ele) {
                // 区间[lo, mid)
                hi = mid;
            } else {
                // (mi, hi)
                lo = mid + 1;
            }
        }
        return -1;
    }

    /**
     * 在区间[lo, hi)内通过近似黄金比例的方式来方式查找元素的Rank秩
     * 只能在常系数上降低一些复杂度
     * @param {*} ele 
     * @param {*} lo 
     * @param {*} hi 
     */
    _fibSearch(ele, lo, hi) {
        while(lo < hi) {
            // 近似黄金比例分割
            let mid = Math.floor((lo + hi * 2) / 3);
            const val = this.get(mid);
            if (val === ele) {
                return mid;
            } else if (val > ele) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return -1;
    }

    /**
     * 依据index返回向量值
     * @param {Number} index 
     */
    get(index) {
        return this._elem[index];
    }

    /**
     * 设置向量index值为value
     * @param {Number} index 
     * @param {*} val 
     */
    set(index, val) {
        this._elem[index] = val;
    }

    /**
     * 删除秩为index的向量处的值
     * @param {Number} val 
     */
    remove(index) {
        let eleBeRemove = this.get(index);
        this.removeRange(index, index + 1);
        return eleBeRemove;
    }

    /**
     * 删除向量区间值
     * @param {Number} lo 
     * @param {Number} hi 
     */
    removeRange(lo, hi) {
        if (lo === hi) {
            return -1;
        }
        while(hi < this.size()) {
            this._elem[lo++] = this._elem[hi++];
        }
        this._size = lo;
        this._shrink();
        return hi - lo;
    }

    /**
     * 再秩index之前插入ele
     * @param {*} ele 
     * @param {Number} index 
     */
    insert(ele, index) {
        this._expand();
        for(let i = this._size; i > index; i--) {
            this.set(i, this.get(i - 1));
        }
        this.set(index, ele);
        return index;
    }

    /**
     * 对[lo, hi)之间的元素进行排序
     * @param {Number} lo 
     * @param {Number} hi 
     */
    sort(lo, hi) {
        const rand = randomInt(5);
        switch (rand) {
            case 0:
                this._bubbleSort(lo, hi);
                break;
            case 1:
                this._selectionSort(lo, hi);
                break;
            case 2:
                this._mergeSort(lo, hi);
                break;
            case 3:
                this._heapSort(lo, hi);
                break;
            case 4:
                this._quickSort(lo, hi);
                break;
        }
    }

    /**
     * 对[lo, hi)之间的元素进行置乱
     * @param {Number} lo 
     * @param {Number} hi 
     */
    unsort(lo, hi) {
        let count = hi;
        let temp;
        while(count > lo) {
            const randomSortIndex = randomInt(count - lo) + lo;
            this._swap(randomSortIndex, count - 1);
            count -= 1;
        }
    }

    /**
     * 无序向量去重
     */
    deduplicate() {
        const oldSize = this.size();

        let index = 0;
        // 从1开始，可以保障前继元素都是不重复的
        while(index < this.size()) {
            const val = this.get(index);
            if (this.find(val) !== -1) {
                this.remove(index);
            } else {
                index += 1;
            }
        }

        return oldSize - this.size();
    }

    /**
     * 有序向量去重，时间复杂度是o(n)
     */
    uniquity() {
        let i = 0;
        let j = 1;
        while(j < this.size()) {
            // 只需要找到相同元素的最后一个元素，予以赋值即可
            if (this.get(i) === this.get(j)) {
                j++;
            } else {
                i++;
                this.set(i, this.get(j));
            }
        }
        this._size = ++i;
    }

    /**
     * 遍历向量
     * @param {Function} fn
     */
    traverse(fn) {
        for(let index = 0; index < this.size(); index++) {
            fn(this.get(index));
        }
    }
}

export {Vector}