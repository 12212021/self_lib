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

function retry(asyncFunc, times = 3) {
    const innerCall = (resolve, reject, retryTimes) => {
        asyncFunc()
            .then(res => resolve(res))
            .catch(err => {
                if (retryTimes <= 0) {
                    reject(err);
                    return;
                }
                innerCall(resolve, reject, retryTimes - 1);
            });
    };

    return new Promise((resolve, reject) => {
        innerCall(resolve, reject, times);
    });
}

export {isInteger, floor, ceil, objectIs, isNaN, type, curry, retry};
