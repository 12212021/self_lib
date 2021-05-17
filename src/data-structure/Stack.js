
class Stack {
    constructor() {
        this._stack = [];
        this._size = 0;
    }

    size() {
        return this._size;
    }

    empyty() {
        return this._size === 0;
    }

    push(e) {
        this._stack.push(e);
        this._size++;
    }

    pop() {
        this._size--;
        return this._stack.pop();
    }

    clear() {
        this._stack = [];
        this._size = 0;
    }

    top() {
        return this._stack[this._size - 1];
    }
}

export {Stack};