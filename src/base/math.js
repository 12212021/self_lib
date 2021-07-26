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
    function run(dividor) {
        if (dividor < 2) {
            return true;
        }
        if (Number.isInteger(num / dividor)) {
            return false;
        }
        return run(dividor - 1);
    }
    return run(target);
}


console.log(isPrime(7));
