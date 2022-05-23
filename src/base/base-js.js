/**
 *
 * @param {Function} fn promise类型函数
 * @returns 返回一个callback类型的函数
 * @description 默认callback回调函数，参数类型为(err, data)，用户使用的时候需要将cb作为最后一个参数传递
 */
function callbackfy(fn) {
    return function (...args) {
        const cb = args.pop();
        fn(...args)
            .then(result => {
                cb(undefined, result);
            })
            .catch(err => {
                cb(err);
            });
    };
}

/**
 *
 * @param {any} src 被拷贝的元素
 * @returns 深拷贝后的元素，需要提防循环引用引起的暴栈问题
 */
function deepCopy(src) {
    let dist;
    if (isPlain(src)) {
        dist = src;
        return dist;
    }
    dist = Array.isArray(src) ? [] : {};
    Object.keys(src).forEach(key => {
        dist[key] = isPlain(src[key]) ? src[key] : deepCopy(src[key]);
    });
    return dist;
}

function isPlain(item) {
    if (
        item === null ||
        typeof item === 'number' ||
        typeof item === 'string' ||
        typeof item === 'symbol' ||
        typeof item === 'undefined' ||
        typeof item === 'function' ||
        typeof item === 'boolean'
    ) {
        return true;
    }
    return false;
}

/**
 * 判断一个对象是不是一个类的实例
 * @param {Object} L 被检测的对象
 * @param {Function} R 原型构造函数
 */
function instanceOf(L, R) {
    if (typeof R !== 'function') {
        return false;
    }
    R = R.prototype;
    let proto = Object.getPrototypeOf(L);
    while (proto) {
        if (proto === R) {
            return true;
        }
        proto = Object.getPrototypeOf(proto);
    }
    return false;
}

/**
 *
 * @param {Array} args 一个包含promsie的可迭代对象
 * @returns 如果所有的promise都返回，则返回一个数组，数组内包含了所有promise，否则返回第一个reject的内容
 */
export function PromiseAll(args) {
    return new Promise((resolve, reject) => {
        let promiseNumber = args.length;
        let count = 0;
        let resolved = new Array(promiseNumber);
        for (let index = 0; index < promiseNumber; index++) {
            let p = args[index];
            p.then(response => {
                count += 1;
                rejected[index] = response;
                if (count === promiseNumber) {
                    resolve(resolved);
                }
            }).then(err => {
                reject(err);
            });
        }
    });
}

/**
 * 自定义实现的new函数
 *
 * @param {Function} func 构造函数
 * @param  {...any} args
 * @returns {Object} 如果返回的一个对象，那么它的原型指向Object.prototype
 */
function selfNew(func, ...args) {
    // 这一步去做原型链
    const obj = Object.create(func.prototype);

    // 这一步，将obj apply给函数，如果函数访问this的话，更改的就是obj的值
    const ret = func.apply(obj, args);
    return typeof ret === 'object' ? ret : obj;
}

/**
 *
 * @param {Function} fn 被节流的函数
 * @param {Number} wait 节流时间段
 * @description 规定在单位时间内，只能触发一次函数，如果这个时间段内被多次触发，只有一个生效
 * 类似于fps游戏的有射速上限，不管鼠标点击多么快，一段时间内也只能射出一发子弹
 */
function throttle(fn, wait = 200) {
    let timer;
    return function (...args) {
        if (timer) {
            return;
        }
        // 在节流函数的最后一秒来做
        timer = setTimeout(function () {
            fn.apply(this, ...args);
            timer = null;
        }, wait);
    };
}

/**
 *
 * @param {Function} fn
 * @param {Number} wait
 * @description 防抖函数：当事件触发的n秒后再执行回调函数，如果这段时间内重复触发，则重新计时
 * 比喻：类似于游戏读技能条，需要一段时间，如果这个时候被敌人攻击了，需要重新读时间条
 */
function debounce(fn, wait = 200) {
    let timer = null;
    return function (...args) {
        if (timer) {
            clearTimeout(timer);
        }
        // setTimeout函数中充当了计时器
        timer = setTimeout(function () {
            fn.apply(this, args);
            timer = null;
        }, wait);
    };
}

/**
 * 自定义call函数
 * @param {Object} thisArg
 * @param  {...any} args
 */
Function.prototype.selfCall = (thisArg, ...args) => {
    if (typeof this !== 'function') {
        throw new Error('当前调用call的方法不是函数');
    }
    const fn = Symbol('fn');
    thisArg[fn] = this;
    const result = thisArg[fn](...args);
    delete thisArg[fn];
    return result;
};
