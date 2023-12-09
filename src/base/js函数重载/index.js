const searcher = {
    tag: '1.0.0'
};

/**
 * 通过递归的方式去不断调用old，old内不断去闭包保存函数
 * 这个是Jquery的实现方式
 * @param {Object} obj 对象
 * @param {String} name 函数名
 * @param {Function} fn 函数
 */
const addMethod = (obj, name, fn) => {
    let old = obj[name];
    obj[name] = (...args) => {
        if (args.length === fn.length) {
            fn.apply(obj, args);
        } else if (typeof old === 'function') {
            old.apply(obj, args);
        }
    };
};

addMethod(searcher, 'find', function () {
    console.log(`${this.tag} 无参数search`);
});
addMethod(searcher, 'find', function (name) {
    console.log(`${this.tag} 一个参数：${name}`);
});
addMethod(searcher, 'find', function (name, age) {
    console.log(`${this.tag} 两个参数：${name}、${age}`);
});
searcher.find();
searcher.find('yuchi');
searcher.find('yuchi', 12);
