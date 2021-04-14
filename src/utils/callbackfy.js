/**
 *
 * @param {Function} fn promise类型函数
 * @returns 返回一个callback类型的函数
 * @description 默认callback回调函数，参数类型为(err, data)，用户使用的时候需要将cb作为最后一个参数传递
 */
function callbackfy(fn) {
    return function(...args) {
        const cb = args.pop();
        fn.apply(null, args).then(response => {
            cb(undefined, response);
        }).catch(err => {
            cb(err, undefined);
        });
    }
}