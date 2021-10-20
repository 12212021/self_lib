class Trie {
    constructor() {
        this.root = {};
    }

    /**
     *
     * @param {string} word
     */
    insert(word) {
        let node = this.root;
        for (const char of word) {
            if (!node[char]) {
                node[char] = {};
            }
            node = node[char];
        }
        node.isEnd = true;
    }

    /**
     *
     * @param {string} word
     * @returns {boolean}
     */
    search(word) {
        const node = this._prefix(word);
        return node && node.isEnd;
    }

    /**
     *
     * @param {string} word
     * @returns {Object}
     */
    _prefix(word) {
        let node = this.root;
        for (const char of word) {
            if (!node[char]) {
                return undefined;
            }
            node = node[char];
        }
        return node;
    }

    /**
     *
     * @param {string} word
     * @returns {boolean}
     */
    startsWith(word) {
        const node = this._prefix(word);
        return node !== undefined;
    }
}
