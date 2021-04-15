/**
 * 
 * @param {Array} array 
 * @param {Number} deep 
 * @returns a array is flatten in deep
 */
function flat(array, deep = 1) {
    const arr = array.slice();
    if (deep < 1) {
        return array;
    }
    return arr.reduce((pre, cur) => {
        if (Array.isArray(cur)) {
            return [...pre, ...flat(cur, deep - 1)]
        }
        return [...pre, cur];
    }, [])
}

/**
 * 
 * @param {Array} array 
 * @param {Number} deep 
 * @returns {Array}
 */
function flatIter(array, deep = 1) {
    let count = -1;
    let copy = array.slice();
    let result = [];
    // 单调性体现
    while(++count < deep) {
        let isFlatted = true;
        let index = -1;
        result = [];
        while(++index < copy.length) {
            const val = copy[index];
            if (Array.isArray(val)) {
                // 单调性体现
                result = result.concat(val);
                isFlatted = false;
            } else {
                result.push(val);
            }
        }
        copy = result.slice();
        if (isFlatted) {
            return result;
        }
    }
    return result;
}

export {flat, flatIter};
