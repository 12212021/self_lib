function isInteger(n) {
    return n % 1 === n;
}

function floor(num) {
    return num - (num % 1);
}

function ceil(num) {
    return floor(num) + 1;
}

// @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
function objectIs(a, b) {
    // SameValue algorithm
    if (a === b) {
        // Steps 1-5, 7-10
        // Steps 6.b-6.e: +0 != -0
        if (a !== 0) {
            return true;
        }
        return 1 / a === 1 / b;
    }

    // step 6.a: NaN === NaN
    return a !== a && b !== b;
}

function isNaN(num) {
    num = Number(num);
    return num !== num;
}

/**
 *
 * @param {Function} fn function to be curred
 * @returns {*} curred function or result
 */
function curry(fn) {
    let _args = [];
    return function inner(...args) {
        _args = _args.concat(args);
        if (_args.length < fn.length) {
            return inner;
        }
        return fn(..._args);
    };
}

function type(input) {
    const typeOf = typeof input;

    if (input === null) {
        return 'Null';
    } else if (input === undefined) {
        return 'Undefined';
    } else if (typeOf === 'boolean' || input instanceof Boolean) {
        return 'Boolean';
    } else if (typeOf === 'number') {
        return input === input ? 'Number' : 'NaN';
    } else if (input instanceof Number) {
        const innerValue = input && input.valueOf && input.valueOf();
        return innerValue === innerValue ? 'Number' : 'NaN';
    } else if (typeOf === 'string' || input instanceof String) {
        return 'String';
    } else if (typeOf === 'symbol') {
        return 'Symbol';
    } else if (typeOf === 'function') {
        return 'Function';
    } else if (input instanceof RegExp) {
        return 'RegExp';
    } else if (input instanceof Promise) {
        return 'Promise';
    } else if (input instanceof Date) {
        return 'Date';
    } else if (Array.isArray(input)) {
        return 'Array';
    } else {
        return 'Object';
    }
}

/**
 * Primitive wrapper objects in JavaScript
 *
 * String for the string primitive.
 * BigInt for the bigint primitive.
 * Boolean for the boolean primitive.
 * Symbol for the symbol primitive.
 * Number for the number primitive.
 */

/**
 * 当js期望一个bool值的时候，以下值总是会被当成false
 *
 *
 * false        false关键字
 * 0            数值0
 * -0           数值-0
 * 0n           bigInt，0n是falsy
 * "",'',``     空串是false
 * null         null值
 * undefined    undefined值
 * NaN          非数值Not a Number
 */

/**
 * retry函数，针对异步函数失败，最多重试times
 * ! 在try、catch语句中执行return，return值会作为函数的返回值
 * ! 但是finally语句一定会执行
 *
 * @param {async function} asyncFunc
 * @param {number} times
 * @returns
 */
function retry(asyncFunc, times = 3) {
    const call = async (...params) => {
        let resp;
        try {
            resp = await asyncFunc.apply(null, params);
        } catch (error) {
            if (times > 0) {
                times--;
                return call(...params);
            }
            return error;
        }
        return resp;
    };
    return call;
}


/**
 * 再Promise中，then、catch函数中均可以返回一个Promise，返回的Promise会代替原有的
 * 从而能够实现链式调用
 * @param {Function} fn 异步函数
 * @param {Number} times 重试次数
 * @param {Number} delay 重试延时时长
 * @returns 返回一个包裹的异步函数
 */
export const retry1 = (fn, times = 3, delay = 20) => {
    let retryTimes = 0;
    const call = (...args) => {
        return new Promise((resolve, reject) => {
            fn(...args)
                .then(data => {
                    resolve(data);
                })
                .catch(err => {
                    if (retryTimes < times) {
                        retryTimes++;
                        return new Promise(r => {
                            setTimeout(r, retryTimes * delay * 1000);
                        }).then(call);
                    } else {
                        reject(err);
                    }
                });
        });
    };

    return call;
};

/**
 * 对集合的key进行map，同一mappedKey会被划分到一个集合内
 * @param {Function} iteratee
 * @param {Array} collection
 */
const keyBy = (iteratee, collection) => {
    return collection.reduce((acc, cur) => {
        const mappedKey = iteratee(cur);
        if (!acc[mappedKey]) {
            acc[mappedKey] = [];
        }
        acc[mappedKey].push(cur);
        return acc;
    }, {});
};

/**
 * 对数组进行洗牌，扰乱
 * @param {Array} array
 * @returns {Array}
 */
const shuffle = array => {
    let index = 0;
    const swap = (indexA, indexB, collection) => {
        const tmp = collection[indexA];
        collection[indexA] = collection[indexB];
        collection[indexB] = tmp;
    };
    const lastIndex = array.length;
    const shuffleArray = array.slice();

    while (index < shuffleArray.length) {
        const randomIndex =
            Math.floor(Math.random() * (lastIndex - index)) + index;
        swap(index, randomIndex, shuffleArray);
        index++;
    }
    return shuffleArray;
};

// 如何从文件流下载文件
const downloadTemplate = async (url, name) => {
    httpApi
        .get(
            `${url}`,
            {},
            {
                responseType: 'blob'
            }
        )
        .then(res => {
            const blob = res.rawData;
            var a = document.createElement('a');
            a.href = URL.createObjectURL(blob); // 将流文件写入a标签的href属性值
            a.download = `${name}.xlsx`;
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            a.remove();
            // release URL.createObjectURL创建的流 未测试
            URL.revokeObjectURL(url);
        });
};

// 闭包函数，返回最新的promise
function getLatestPromise(asyncFunc) {
    let id = 0;
    return function (...args) {
        id++;
        const curId = id;
        return asyncFunc.apply(null, args).then(resp => {
            // console.log(id, curId, '-----', args);
            if (id === curId) {
                return resp;
            }
            throw new Error('not latest promise result!');
        });
    };
}
