
/**
 * Vector特点是存储位置是连续的，通过Rank来访问，访问速度很快，但是插入和删除的效率比较慢
 * 
 * List是call-by-link，node节点的物理存储位置不是固定的，插入和删除比较快
 */

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

    }

    _copyNodes()

    size() {

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

    valid(p) {
        return p && p !== this.header && p !== this.trailer;
    }

    insertAsFirst(e) {

    }

    insertAsLast(e) {

    }

    insertBefore(p, e) {

    }

    insertAfter(p, e) {

    }

    remove(p) {

    }

    disordered() {

    }

    sort() {

    }

    find(e, p, n) {
        
    }

    search(e) {

    }

    deduplicate() {

    }

    uniquify() {

    }

    traverse(fn) {

    }

    print() {

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