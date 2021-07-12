/**
 * ArrayBuffer表示通用的、固定长度的二进制数据缓冲区
 * ArrayBuffer只能够通过类数组对象（TypedArray）或者DataView来进行访问
 */
export class BitMap {
    constructor(size) {
        this._buf = new Uint8Array(size);
        this._size = this._buf.byteLength;
    }

    test(n) {
        return this._buf[n];
    }

    set(n) {
        this.expand(n)
        this._buf[n] = 1;
    }

    clear(n) {
        this.expand(n);
        if (n === undefined) {
            for (let i = 0; i < this._size; i++) {
                this._buf[i] = 0;
            }
        }
        this._buf[n] = 0;
    }

    expand(n) {
        if (!n) {
            return;
        }
        if (n > this._size) {
            let buffer = new Uint8Array(n >> 1);
            for (let i = 0; i < this._size; i++) {
                buffer[i] = this._buf[i];
            }
            this._size = (n >> 1);
            this._buf = buffer;
        }
    }
}
