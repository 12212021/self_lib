export class HashTable {
    constructor() {
        this.M = null;
        this.N = null;
        this.ht = null;
        this.lazyRemoval = null;
    }

    _probe4Hit() {}

    _probe4Free() {}

    _rehash() {}

    size() {
        return this.N;
    }

    put(k, v) {}

    get(k) {}

    remove(k) {}
}
