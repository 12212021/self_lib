/**
 * 欧几里得算法：
 * 如果r是a除以b的余数，那么a和b的公约数也正好是b和r的公约数
 */

/**
 * 基于欧几里得算法，返回数a，b的最大公约数
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function gcd(a, b) {
    if (b === 0) {
        return a;
    }
    const r = a % b;
    return gcd(b, r);
}

/**
 * 判断一个数是不是素数
 * @param {number} num
 * @returns {boolean}
 */
function isPrime(num) {
    const target = Math.floor(Math.sqrt(num));
    for (let i = 1; i <= target; i++) {
        if (Number.isInteger(num / i)) {
            return false;
        }
    }
    return true;
}


// 牛顿迭代法求解一个数的平方根
function sqrt(c) {
    if (c < 0) {
        return NaN;
    }
    // 误差
    const err = 1e-15;
    let t = c;
    while (Math.abs(t - c / t) > err * t) {
        t = (c / t + t) / 2;
    }
    return t;
}

/**
 * 将一个整数映射为其所属区间的开头
 * example
 * 以0为开头，3为区间长度，则2 -> 0; 3 -> 3; 4 -> 3
 * @param {number} intervalLen
 * @param {number} begin
 * @param {number} num
 */
function intervalMapping(intervalLen, begin, num) {
    const absNum = num - begin;
    return intervalLen * Math.floor(absNum / intervalLen) + begin;
}
