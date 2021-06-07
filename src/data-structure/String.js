class Str {
    constructor(raw) {
        this._content = raw;
        this._len = this._content.length;
    }

    /**
     * 返回串的长度
     * @returns {Number}
     */
    length() {
        return this._len;
    }

    /**
     *
     * @returns {String}
     */
    rawContent() {
        return this._content;
    }

    /**
     *
     * @param {Number} i 位置
     * @returns {String}
     */
    chartAt(i) {
        console.assert(i < this._len && i >= 0, '参数i必须再合理的范围内');
        const content = this._content[i];
        return content;
    }

    /**
     * 位置从i开始，长度为k的字串
     * @param {Number} i
     * @param {Number} k
     * @returns {Str}
     */
    subStr(i, k) {
        console.assert(i < this._len && i >= 0, '参数i必须再合理的范围内');
        let sub = '';
        let index = i;
        while (index++ < k && i + index < this._len) {
            sub += this._content[index];
        }
        return new Str(sub);
    }

    /**
     * 返回长度为k的前缀
     * @param {Number} k
     */
    prefix(k) {
        return this.subStr(0, k);
    }

    /**
     * 返回长度为k的后缀
     * @param {Number} k
     */
    suffix(k) {
        return this.subStr(this._len - k, k);
    }

    /**
     * 判断两个串是不是相等
     * @param {Str} str
     * @returns {Boolean}
     */
    equal(str) {
        if (this._len !== str.length()) {
            return false;
        }
        let index = -1;
        while (++index < this._len) {
            if (this.chartAt(index) !== str.chartAt(index)) {
                return false;
            }
        }
        return true;
    }

    /**
     * 将串str接在当前串的后面
     * @param {Str} str
     */
    concat(str) {
        let index = -1;
        while (++index < str.length()) {
            this._content += str.chartAt(index);
        }
    }

    /**
     * 若串str是本串的一个字串，返回str的起始位置，否则返回-1
     * @param {String} str
     * @returns {Number}
     */
    indexOf(str) {}

    /**
     * 暴力串匹配算法
     * @param {Str} str
     */
    match0(str) {
        const lenN = this._len;
        const lenM = str.length();
        let i = 0;
        let j = 0;
        for (i = 0; i < lenN - lenM + 1; i++) {
            for (j = 0; j < lenM; j++) {
                if (this.chartAt(i + j) !== str.chartAt(j)) break;
            }
            if (j >= lenM) break;
        }
        return i === lenN - lenM + 1 ? -1 : i;
    }

    /**
     * 暴力串匹配算法
     * @param {Str} str
     */
    match1(str) {
        const lenN = this._len;
        const lenM = str.length();
        let i = 0;
        let j = 0;
        while (i < lenN && j < lenM) {
            if (this.chartAt(i) === str.chartAt(j)) {
                i++;
                j++;
            } else {
                // 文本串回退，匹配串复位
                i = i - j + 1;
                j = 0;
            }
        }
        const searchedIndex = i - j;
        return searchedIndex === this._len ? -1 : searchedIndex;
    }

    /**
     *
     * @param {Str} str
     */
    matchKMP(str) {
        const table = this.buildNextTable(str.rawContent());

        const lenN = this.length();
        let i = 0;
        const lenM = str.length();
        let j = 0;
        while (i < lenN && j < lenM) {
            // j < 0用来处理哨兵元素返回为-1的情况
            if (j < 0 || this.chartAt(i) === str.chartAt(j)) {
                i++;
                j++;
            } else {
                // 不匹配转入nextTable表
                j = table[j];
            }
        }
        return (i - j === this.length()) ? -1 : (i - j);
    }

    /**
     *
     * @param {String} chartP
     */
    buildNextTable(chartP) {
        let next = new Array(chartP.length);
        next[0] = -1;
        let t = next[0];
        let j = 0;
        while (j < chartP.length) {
            if (t < 0 || chartP[j] === chartP[t]) {
                j++;
                t++;
                next[j] = t;
            } else {
                t = next[t];
            }
        }
        return next;
    }
}

export {Str};
