/**
 * 栈有一个非常重要的特点，就是先进后出
 * 在栈所擅长解决的典型问题中， 有一类具有以下共同特征：首先，虽有明确的算法，但其解
 * 答却以线性序列的形式给出；其次，无论是递归还是迭代实现， 该序列都是依逆序计算输出的；
 * 最后，输入和输出规模不确定，难以事先确定盛放输出数据的容器大小。因其特有的“后进先出”
 * 特性及其在容量方面的自适应性， 使用栈来解决此类问题可谓恰到好处。
 */
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
