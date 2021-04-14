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

export {flat};
