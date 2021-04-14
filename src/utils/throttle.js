/**
 *
 * @param {Function} fn 被节流的函数
 * @param {Number} wait 节流时间段
 * @description 规定在单位时间内，只能触发一次函数，如果这个时间段内被多次触发，只有一个生效
 * 类似于fps游戏的有射速上限，不管鼠标点击多么快，一段时间内也只能射出一发子弹
 */
function throttle(fn, wait = 200) {
    let timer;
    return function(...args) {
        if (timer) {
            return;
        }
        // 在节流函数的最后一秒来做
        timer = setTimeout(function() {
            fn.apply(this, ...args);
            timer = null;
        }, wait);
    }
}