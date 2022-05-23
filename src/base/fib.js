/**
 * 菲波那切数列以及优化
 *
 */

// 需要的重复计算太多
function fibBase(n) {
    const fib = memory(fibBase);
    if (n < 1) throw new Error('参数错误');
    if (n === 1 || n === 2) {
        return 1
    }
    return fib(n - 1) + fib(n - 2);
}

// 高阶函数，利用闭包，缓存结果
function fibCache() {
    let cache = {};
    return function fib(n) {
        if (n < 1) throw new Error('参数错误');
        if (n === 1 || n === 2) {
            return 1
        }
        if (!cache[n]) {
            cache[n] = fib(n - 1) + fib(n - 2);
        }
        return cache[n];
    }
}

function fibDP(n) {
    if (n === 1 || n === 2) {
        return 1;
    }
    let res = 0;
    let pre = 1;
    let cur = 1;
    let index = 1;
    while(++index < n) {
        res = pre + cur;
        pre = cur;
        cur = res;
    }
    return res;
}


export {fibBase, fibCache, fibDP};