/**
 * 优先级队列
 *
 * 优先级队列维护一个偏序关系，严格维护一个全序关系，代价不低
 * 优先级队列维护key，key必须支持比较大小的操作
 *
 *
 * 优先级队列采用堆（heap）的方式实现，需要保证insert、getMax操作在对数时间复杂度内完成
 * 完全堆可以用vector来实现，其节点之间的父子关系可以比较轻易地通过下标来判断
 * 1）若v有左孩子，则i(lchild(v)) = 2∙i(v) + 1；
 * 2）若v有右孩子，则i(rchild(v)) = 2∙i(v) + 2；
 * 3）若v有父节点，则i(parent(v)) = Math.floor((i(v) - 1)/2) or Math.ceil((i(v)/2) - 1
 *
 */

class PriorityQueue {
    constructor() {
        this._size = 0;
        this._queue = [];
    }

    size() {
        return this._size;
    }

    insert() {}

    getMax() {}

    delMax() {}

    /**
     * 判断坐标i是否在堆内
     * @param {number} length
     * @param {number} i
     * @returns {boolean}
     */
    _inHeap(length, i) {
        return i > -1 && i < length;
    }

    /**
     *
     * @param {number} i 坐标
     * @returns 坐标i逻辑上的父节点坐标
     */
    _parent(i) {
        return (i - 1) >>> 1;
    }

    /**
     * 返回最后一个内部节点（即最后一个节点的父节点）
     * @param {number} length 堆最后一个节点
     * @returns {number}
     */
    _lastInternal(length) {
        return this._parent(length - 1);
    }

    /**
     * 返回i坐标的左孩子
     * @param {number} i
     * @returns {number}
     */
    _lchild(i) {
        return 1 + i * 2;
    }

    /**
     * 返回i坐标的右孩子
     * @param {number} i
     * @returns {number}
     */
    _rchild(i) {
        return 2 + i * 2;
    }

    /**
     * 查看坐标i是否有父亲节点
     * @param {number} i 坐标
     * @returns {boolean}
     */
    _hasParent(i) {
        return i > 0;
    }

    /**
     * 坐标i是否存在左孩子
     * @param {number} length
     * @param {number} i
     * @returns {boolean}
     */
    _hasLChild(length, i) {
        return this._inHeap(length, this._lchild(i));
    }

    /**
     * 坐标i是否存在右孩子
     * @param {number} length
     * @param {number} i
     * @returns {boolean}
     */
    _hashRChild(length, i) {
        return this._inHeap(length, this._rchild(i));
    }

    /**
     * 经过pred预言，返回坐标i，j中较大者
     * @param {number} i
     * @param {number} j
     * @param {function} pred
     * @returns {number}
     */
    _bigger(i, j, pred) {
        pred = pred ?? ((a, b) => a - b);
        if (pred(this._queue[i], this._queue[j] >= 0)) {
            return i;
        }
        return j;
    }

    /**
     * 选择坐标i父子三个节点中最大者，坐标i为父节点
     * @param {number} length 堆的长度
     * @param {number} i 坐标
     */
    _properParent(length, i) {
        if (this._hashRChild(length, i)) {
            return this._bigger(
                i,
                this._bigger(this._lchild(i), this._rchild(i))
            );
        }
        if (this._hasLChild(i)) {
            return this._bigger(this._lchild(i), i);
        }
        return i;
    }
}
