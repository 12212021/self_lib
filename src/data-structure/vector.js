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
        let temp;
        hi -= 1;
        while(lo < hi) {
            if (this.get(hi) < this.get(hi - 1)) {
                sorted = false;
                temp = this.get(hi);
                this.set(hi, this.get(hi - 1));
                this.set(hi - 1, temp);
            }
            hi -= 1;
        }
        console.log(this._elem)
        return sorted;
    }

    /**
     * 冒泡排序算法
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

    }

    /**
     * 选择排序算法
     * @param {Number} lo 
     * @param {Number} hi 
     */
    _selectionSort(lo, hi) {

    }

    /**
     * 归并算法
     * @param {Number} lo 
     * @param {Number} hi 
     */
    _merge(lo, hi) {

    }

    /**
     * 归并排序算法
     * @param {Number} lo 
     * @param {Number} hi 
     */
    _mergeSort(lo, hi) {

    }

    /**
     * 快排轴点构造方法
     * @param {Number} lo 
     * @param {Number} hi 
     */
    _partition(lo, hi) {

    }

    /**
     * 快排
     * @param {Number} lo 
     * @param {Number} hi 
     */
    _quickSort(lo, hi) {

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
            temp = this._elem[count - 1];
            this._elem[count - 1] = this._elem[randomSortIndex];
            this._elem[randomSortIndex] = temp;
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