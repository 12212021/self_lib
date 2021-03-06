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
 * ???js????????????bool??????????????????????????????????????????false
 *
 *
 * false        false?????????
 * 0            ??????0
 * -0           ??????-0
 * 0n           bigInt???0n???falsy
 * "",'',``     ?????????false
 * null         null???
 * undefined    undefined???
 * NaN          ?????????Not a Number
 */

/**
 * retry????????????????????????????????????????????????times
 * ! ???try???catch???????????????return???return??????????????????????????????
 * ! ??????finally?????????????????????
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
 * ????????????key??????map?????????mappedKey??????????????????????????????
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
 * ??????????????????????????????
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
