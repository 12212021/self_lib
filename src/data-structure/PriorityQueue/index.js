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
    constructor(pred) {
        this._size = 0;
        this._queue = [];
        this._pred = pred ?? ((a, b) => a - b);
    }

    size() {
        return this._size;
    }

    insert(e) {
        this._queue.push(e);
        this._size++;
        this._percolateUp(this._size - 1);
    }

    getMax() {
        if (this._size < 1) {
            throw new Error("can't get item from empty heap");
        }
        return this._queue[0];
    }

    delMax() {
        if (this._size < 1) {
            throw new Error("can't delete item from empty heap");
        }
        const top = this._queue[0];
        const val = this._queue.pop();
        this._size--;
        this._queue[0] = val;
        this._percolateDown(this._size, 0);

        return top;
    }

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
        pred = pred ?? this._pred;
        if (pred(this._queue[i], this._queue[j] > 0)) {
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

    /**
     * 下滤操作，删除首节点后将尾节点挪到首节点，对首节点进行下滤操作
     * @param {number} length
     * @param {number} i
     */
    _percolateDown(length, i, pred) {
        pred = pred ?? this._pred;
        let j = this._properParent(length, i);
        while (i !== j) {
            this._swap(i, j);
            i = j;
            j = this._properParent(length, i);
        }
    }

    /**
     * 上滤操作，对新插入节点上滤，确保每个节点都符合堆的定义
     * @param {number} i
     * @param {function} pred
     */
    _percolateUp(i, pred) {
        pred = pred ?? this._pred;
        while (this._hasParent(i)) {
            if (pred(i, this._parent(i)) <= 0) {
                break;
            }
            this._swap(i, this._parent(i));
            i = this._parent(i);
        }
    }

    _swap(i, j) {
        const tmp = this._queue[i];
        this._queue[i] = this._queue[j];
        this._queue[j] = tmp;
    }

    /**
     *
     * 朴素算法：遍历向量，不断地将向量值insert到堆中，该建堆算法的复杂度为nlog(n)
     * log(1) + log(2) + ... + log(n) 约为nlog(n)
     * 该朴素算法自顶向下进行上滤操作，会操作到堆的每一个节点
     *
     *
     * Floyd建堆算法
     * 针对二叉树的叶子节点，每一个叶子节点天然符合堆的定义，所以可以自底向上进行上滤，针对
     * 堆的内部节点进行操作，该算法复杂度为n，对于满二叉树而言，叶子节点占据的数量是非常巨大的
     * 复杂度详细分析见assets
     *
     * @param {number} length
     */
    _heapify(length) {
        let i = this._lastInternal(length);
        while(this._inHeap(length, i)) {
            this._percolateDown(length, i);
            i--;
        }
    }
}
