/**
 *
 * @param {Function} fn
 * @param {Number} wait
 * @description 防抖函数：当事件触发的n秒后再执行回调函数，如果这段时间内重复触发，则重新计时
 * 比喻：类似于游戏读技能条，需要一段时间，如果这个时候被敌人攻击了，需要重新读时间条
 */
function debounce(fn, wait=200) {
    let timer = null;
    return function(...args) {
        if (timer) {
            clearTimeout(timer);
        }
        // setTimeout函数中充当了计时器
        timer = setTimeout(function() {
            fn.apply(this, args);
            timer = null;
        }, wait);
    }
}