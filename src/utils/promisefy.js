/**
 *
 * @param {Function} fn callback类型函数
 * @returns 返回一个Promisefy的函数
 * @description 默认callback回调函数，参数类型为(err, data)，用户使用的时候不传递改cb函数
 */
function promisefy(fn) {
    return function(...args) {
        return new Promise((resolve, reject) => {
            args.push(function(err, data) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(data);
            });
            fn.apply(null, args);
        });
    }
}

export {promisefy};