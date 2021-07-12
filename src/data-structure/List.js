
/**
 * Vector特点是存储位置是连续的，通过Rank来访问，访问速度很快，但是插入和删除的效率比较慢
 *
 * List是call-by-link，node节点的物理存储位置不是固定的，插入和删除比较快
 */

import {randomInt} from './utils.js';
class List {
    constructor() {
        this._size = 0;
        this.header = null;
        this.trailer = null;
        this._init();
    }

    /**
     * header、trailer作为列表的`哨兵节点`，不存储实际的数据
     */
    _init() {
        this.header = new ListNode(null);
        this.trailer = new ListNode(null);

        this.header.setSucc(this.trailer);
        this.header.setPre(null);

        this.trailer.setPre(this.header);
        this.trailer.setSucc(null);

        this._size = 0;
    }

    _clear() {
        let p = this.header;
        p = p.succ;
        while(p !== this.trailer) {
            const succ = p.succ;
            p = null;
            p = succ;
            this._size -= 1;
        }

        this.header.succ = this.trailer;
        this.trailer.pre = this.header;
    }

    /**
     * 从p节点开始，复制n个节点
     * @param {ListNode} p
     * @param {Number} n
     */
    _copyNodes(p, n) {
        this._init();
        let iter = this.header;
        while(n--) {
            iter.setSucc(p);
            p.setPre(iter);
            iter = p;
            p = p.succ;
            this._size += 1;
        }
    }

    size() {
        return this._size;
    }

    empty() {
        return this._size < 1;
    }

    get(index) {
        if (index < 0 || index > this.size()) {
            throw new Error('wrong index');
        }
        let p = this.first();
        while(index--) {
            p = p.succ;
        }
        return p.data;
    }

    first() {
        return this.header.succ;
    }

    last() {
        return this.trailer.pre;
    }

    _valid(p) {
        return p && p !== this.header && p !== this.trailer;
    }

    /**
     *
     * @param {*} e
     */
    insertAsFirst(e) {
        const node = new ListNode(e);
        this._insert(this.header, node, this.header.succ);
    }

    /**
     * 将node元素插入到begin和end之间
     * @param {ListNode} begin
     * @param {ListNode} node
     * @param {ListNode} end
     */
    _insert(begin, node, end) {
        begin.succ = node;
        node.pre = begin;

        node.succ = end;
        end.pre = node;
        this._size += 1;
    }

    insertAsLast(e) {
        const node = new ListNode(e);
        this._insert(this.trailer.pre, node, this.trailer);
    }

    /**
     *
     * @param {ListNode} p
     * @param {*} e
     */
    insertBefore(p, e) {
        const node = new ListNode(e);
        this._insert(p.pre, node, p);
    }

    /**
     *
     * @param {ListNode} p
     * @param {*} e
     */
    insertAfter(p, e) {
        const node = new ListNode(e);
        this._insert(p, node, p.succ);
    }

    /**
     * 删除合法位置的p处的节点
     *
     * 即便p节点为链表唯一有效节点，头尾的哨兵元素能保障remove算法可用
     * @param {ListNode} p
     */
    remove(p) {
        const data = p.data;
        const pre = p.pre;
        const succ = p.succ;
        pre.setSucc(succ);
        succ.setPre(pre);
        this._size -= 1;
        return data;
    }


    /**
     * 判断链表是否是有序的
     *
     * 有序定义，对于所有 0 <= i <=j < n; A[i] <= A[j]
     */
    disordered() {
        if (this._size < 2) return true;

        let p = this.header;
        let q = p.succ;
        while(q !== this.trailer) {
            if (p.data > q.data) {
                return true;
            }
            p = q;
            q = q.succ;
        }
        return false;
    }

    sort(p, n) {
        const rand = randomInt(3);
        switch(rand) {
            case 0:
                this.insertionSort(p, n);
                break;
            case 1:
                this.selectionSort(p, n);
                break;
            case 2:
                this.mergeSort(p, n);
                break;
        }
    }

    /**
     * 对p节点后面的n个元素进行插入排序
     *
     * 将序列分成两部分，有序的前缀和无序的后缀，反复迭代，将无序后缀插入到有序的前缀里
     * 在任何时刻，相对于当前节点e = S[r]，前缀S[0, r)总是业已有序
     * @param {ListNode} p
     * @param {Number} n
     */
    insertionSort(p, n) {
        let r = 0;
        while(r++ < n) {
            // 可能是哨兵header节点
            const res = this.searchRange(p.data, p, r);

            const nextNode = p.succ;
            this.remove(p);
            this._insert(res, p, res.succ);
            p = nextNode;
        }
    }

    /**
     * 对p节点后面的n个元素进行选择排序
     *
     * 将序列分成两部分，要求S[0, r)不大于S[r, length)，从前缀中选出最大者，转移到后缀
     * @param {NodeList} p
     * @param {Number} n
     */
    selectionSort(p, n) {
        let count = n;
        let trail = p;
        while(count--) {
            trail = trail.succ;
        }

        while(n) {
            const maxNode = this.selectMax(p, n);

            this.remove(maxNode);
            this._insert(trail.pre, maxNode, trail);
            trail = trail.pre;
            n -= 1;
        }
    }

    /**
     * 选取p节点后的n个节点中，值最大的元素
     * @param {ListNode} p
     * @param {Number} n
     * @returns {ListNode} 返回最大值
     */
    selectMax(p, n) {
        if (n < 1) {
            throw new Error('argument n must be greater than 1');
        }
        let maxNode = p;
        while(n--) {
            const maxVal = maxNode.data;
            const curVal = p.data;
            if (maxVal < curVal) {
                maxNode = p;
            }
            p = p.succ;
        }
        return maxNode;
    }

    /**
     * 对p节点后面的n的元素进行归并排序
     * @param {ListNode} p
     * @param {Number} n
     */
    mergeSort(p, n) {
        if (n < 2) return;

        const mid = n >> 1;
        let p1 = p;
        let midNode;
        for(let index = 0; index < mid; index++) {
            midNode = p1
            p1 = p1.succ
        }
        this.mergeSort(p, mid);
        this.mergeSort(midNode.succ, n - mid);
        this._merge(p, mid, midNode, n - mid);
    }

    /**
     *
     * @param {ListNode} p 左侧链表头节点
     * @param {Number} n 左链表需要处理的节点个数
     * @param {ListNode} q 右侧链表的头节点
     * @param {Number} m 右侧链表需要处理的节点个数
     */
    _merge(p, n, q, m) {
        let pp = p.pre;
        // 循环条件要注意，需要消耗完一个子链表
        while(n && m) {
            let chooseNode = null;
            if (p.data < q.data) {
                chooseNode = p;
                this.remove(p);
                p = p.succ;
                n -= 1;
            }
            else {
                chooseNode = q;
                this.remove(q);
                q = q.succ;
                m -= 1;
            }
            this._insert(pp, chooseNode, pp.succ);
            pp = chooseNode;
        }
        if (!n) {
            pp.succ = p;
            p.pre = pp;
        }
        if(!m) {
            pp.succ = q;
            q.pre = pp;
        }
    }

    /**
     * 从无序列表的n的真前驱中，找到等于e的元素
     * @param {*} e
     * @param {ListNode} p
     * @param {Number} n
     */
    findRange(e, p, n) {
        while(n--) {
            p = p.pre;
            if (p.data === e) {
                return p;
            }
        }
        return null;
    }

    /**
     * 无序列表寻找等于e的元素
     * @param {*} e
     */
    find(e) {
        return this.findRange(e, this.trailer, this._size);
    }

    /**
     * 在有序链表中查找某个元素e
     *
     * 因为链表的地址是不连续的，不能像按Rank访问那样快速，所以有序链表和无需链表的查找工作无太多区别
     * @param {*} e
     */
    search(e) {
        return this.searchRange(e, this.trailer, this._size);
    }

    /**
     * 查找p节点的n个真前继节点是否有data值为e的节点
     * @param {*} e
     * @param {ListNode} p
     * @param {Number} n
     * @returns {ListNode} 返回不大于e的p节点
     *
     */
    searchRange(e, p, n) {
        p = p.pre;
        while(n--) {
            if (p.data <= e) {
                break;
            }
            p = p.pre;
        }
        // 可以通过valid来判断p节点是否为哨兵节点
        return p;
    }

    /**
     * 无序链表唯一化
     *
     * @returns {number} 返回被删除元素的个数
     */
    deduplicate() {
        // 平凡情况
        if (this._size < 2) return 0;
        const oldSize = this.size();

        let p = this.header.succ;
        let count = 0;
        while(p !== this.trailer) {
            const q = this.findRange(p.data, p, count);
            if (q) {
                this.remove(q);
            } else {
                count += 1;
            }
            p = p.succ;
        }
        return oldSize - this._size;
    }

    /**
     * 有序列表唯一化
     * 链表的删除操作是常数复杂度，所以跟向量删除有些许不同
     *
     * @returns {Number} 返回被删除元素的个数
     */
    uniquify() {
        if (this._size < 2) return 0;
        const oldSize = this._size;
        let p = this.header;
        let q = p.succ;
        while(q !== this.trailer) {
            if (p.data === q.data) {
                this.remove(q);
                q = p.succ;
            }
            p = q;
            q = q.succ;
        }
        return oldSize - this._size;
    }

    traverse(fn) {
        let p = this.header.succ;
        let count = -1;
        while(++count < this._size) {
            fn(p.data);
            p = p.succ;
        }
    }

    print() {
        let printString = [];
        let p = this.header.succ;
        while(p !== this.trailer) {
            printString.push(`${p.data} ===> `);
        }
        let last = printString[printString.length - 1];
        last = last.slice(0, last.length - 6);
        printString[printString.length - 1] = last;
        return printString.join('');
    }
}

// 双向链表
class ListNode {
    constructor(data) {
        this.data = data;
        this.pre = null;
        this.succ = null;
    }

    setPre(p) {
        this.pre = p;
    }

    setData(data) {
        this.data = data;
    }

    setSucc(p) {
        this.succ = p;
    }
}

export {List};
