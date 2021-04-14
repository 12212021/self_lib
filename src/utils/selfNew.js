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
