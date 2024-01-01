// js function
const hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Array.reduce的特殊化方案
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initAccum] Specify using the first element of `array` as
 *  the initial value.
 * @returns {*} Returns the accumulated value.
 */
function arrayReduce(array, iteratee, accumulator, initAccum) {
    let index = -1;
    const length = array === null ? 0 : array.length;
    if (initAccum && length) {
        accumulator = array[++index];
    }
    while (++index < length) {
        accumulator = iteratee(accumulator, array[index], index, array);
    }
    return accumulator;
}

/**
 * The base implementation of `reduce` and `reduceRight` which iterates
 * over `collection` using `eachFunc`.
 *
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} accumulator The initial value.
 * @param {boolean} initAccum Specify using the first or last element of
 *  `collection` as the initial value.
 * @param {Function} eachFunc The function to iterate over `collection`.
 * @returns {*} Returns the accumulated value.
 */
function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
    eachFunc(collection, (value, index, collection) => {
        accumulator = initAccum
            ? ((initAccum = false), value)
            : iteratee(accumulator, value, index, collection);
    });
    return accumulator;
}

function baseEach(collection, iteratee) {
    if (collection === null) {
        return collection;
    }
    // Array forEach
    if (Array.isArray(collection)) {
        const length = collection.length;
        let index = -1;
        while (++index < length) {
            if (iteratee(collection[index], index, collection) === false) {
                break;
            }
        }
        return collection;
    }
    // Object
    const iterable = Object(collection);
    const props = Object.keys(collection);
    let {length} = props;
    let index = -1;
    while (length--) {
        const key = props[++index];
        if (iteratee(iterable[key], key, iterable) === false) {
            break;
        }
    }
    return collection;
}

/**
 * 对集合的元素做一个reduce, reduceRight只有对array类型的数据才有保障，object的key是无序的，也就无所谓left、right了
 * @param {Array | Object} collection
 * @param {Function} iteratee
 * @param {*} accumulator
 * @returns {*} 返回accumulated value
 */
function reduce(collection, iteratee, accumulator) {
    const func = Array.isArray(collection) ? arrayReduce : baseReduce;
    const initAccum = arguments.length < 3;
    return func(collection, iteratee, accumulator, initAccum, baseEach);
}


/**
 * 对集合内部的元素进行一个类似于数据库的groupBy的操作
 * @param {Array | Object} collection
 * @param {Function} iteratee
 * @returns {Object}
 */
function groupBy(collection, iteratee) {
    return reduce(
        collection,
        (result, value, key) => {
            key = iteratee(key);
            if (hasOwnProperty.call(result, key)) {
                result[key].push(value);
            } else {
                result[key] = [value];
            }
            return result;
        },
        {}
    );
}
