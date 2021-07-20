class Queue {
    constructor() {
        this._size = 0;
        this.queue = [];
    }

    size() {
        return this._size;
    }

    empty() {
        return this.size() === 0;
    }

    enqueue(e) {
        this.queue.push(e);
        this._size++;
    }

    dequque() {
        this._size--;
        return this.queue.shift();
    }

    front() {
        return a[0];
    }
}
/**
 * 队列主要用在资源分配上
 */

export {
    Queue
}
