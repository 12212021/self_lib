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
    let proto = Object.getPrototypeOf(L)
    while(proto) {
        if (proto === R) {
            return true;
        }
        proto = Object.getPrototypeOf(proto);
    }
    return false;
}

export {instanceOf};
