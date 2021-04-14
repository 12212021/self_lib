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
        dist[key] = (isPlain(src[key])) ? src[key] : deepCopy(src[key]);
    });
    return dist;
}

function isPlain(item) {
    if (item === null
        || typeof item === 'number'
        || typeof item === 'string'
        || typeof item === 'symbol'
        || typeof item === 'undefined'
        || typeof item === 'function'
        || typeof item === 'boolean') {
        return true;
    }
    return false;
}

export {deepCopy};