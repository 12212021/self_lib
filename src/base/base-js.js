/**
 *
 * @param {Function} fn promise类型函数
 * @returns 返回一个callback类型的函数
 * @description 默认callback回调函数，参数类型为(err, data)，用户使用的时候需要将cb作为最后一个参数传递
 */
function callbackfy(fn) {
    return function (...args) {
        const cb = args.pop();
        fn(...args)
            .then(result => {
                cb(undefined, result);
            })
            .catch(err => {
                cb(err);
            });
    };
}

function deepCopy(obj, seen = new WeakMap()) {
    // 判断是否为对象类型，如果是数组或函数，则使用JSON方法进行深拷贝
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    // 检查是否已经处理过该对象，如果是则直接返回
    if (seen.has(obj)) {
        return seen.get(obj);
    }

    // 创建一个新的对象或数组，用于存储深拷贝后的结果
    let copy = Array.isArray(obj) ? [] : {};

    // 将新对象添加到已处理过的对象集合中
    seen.set(obj, copy);

    // 遍历原对象的所有属性，并进行深拷贝
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            copy[key] = deepCopy(obj[key], seen);
        }
    }

    return copy;
}
function isObject(value) {
    const type = typeof value;
    return value != null && (type === 'object' || type === 'function');
}

/**
 * 判断一个对象是不是一个类的实例
 *
 * 构造函数才有prototype对象，es6新出的箭头函数是没prototype的
 * @param {Object} L 被检测的对象
 * @param {Function} R 原型构造函数
 */
function instanceOf(L, R) {
    if (typeof R !== 'function') {
        return false;
    }
    R = R.prototype;
    let proto = Object.getPrototypeOf(L);
    while (proto) {
        if (proto === R) {
            return true;
        }
        proto = Object.getPrototypeOf(proto);
    }
    return false;
}

/**
 *
 * @param {Array} args 一个包含promsie的可迭代对象
 * @returns 如果所有的promise都返回，则返回一个数组，数组内包含了所有promise，否则返回第一个reject的内容
 */
function PromiseAll(args) {
    return new Promise((resolve, reject) => {
        let promiseNumber = args.length;
        let count = 0;
        let resolved = new Array(promiseNumber);
        for (let index = 0; index < promiseNumber; index++) {
            let p = args[index];
            p.then(response => {
                count += 1;
                rejected[index] = response;
                if (count === promiseNumber) {
                    resolve(resolved);
                }
            }).then(err => {
                reject(err);
            });
        }
    });
}

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

/**
 *
 * @param {Function} fn 被节流的函数
 * @param {Number} wait 节流时间段
 * @description 规定在单位时间内，只能触发一次函数，如果这个时间段内被多次触发，只有一个生效
 * 类似于fps游戏的有射速上限，不管鼠标点击多么快，一段时间内也只能射出一发子弹
 */
function throttle(fn, wait = 200) {
    let timer;
    return function (...args) {
        if (timer) {
            return;
        }
        // 在节流函数的最后一秒来做
        timer = setTimeout(function () {
            fn.apply(this, ...args);
            timer = null;
        }, wait);
    };
}

/**
 *
 * @param {Function} fn
 * @param {Number} wait
 * @description 防抖函数：当事件触发的n秒后再执行回调函数，如果这段时间内重复触发，则重新计时
 * 比喻：类似于游戏读技能条，需要一段时间，如果这个时候被敌人攻击了，需要重新读时间条
 */
function debounce(fn, wait = 200) {
    let timer = null;
    return function (...args) {
        if (timer) {
            clearTimeout(timer);
        }
        // setTimeout函数中充当了计时器
        timer = setTimeout(function () {
            fn.apply(this, args);
            timer = null;
        }, wait);
    };
}

/**
 * 自定义call函数
 * @param {Object} thisArg
 * @param  {...any} args
 */
Function.prototype.selfCall = (thisArg, ...args) => {
    if (typeof this !== 'function') {
        throw new Error('当前调用call的方法不是函数');
    }
    const fn = Symbol('fn');
    thisArg[fn] = this;
    const result = thisArg[fn](...args);
    delete thisArg[fn];
    return result;
};

/**
 * 返回带并发限制的http请求
 * @param {string[]} urls 请求urls
 * @param {number} limit
 * @returns {Promise}
 */
function requestWithLimit(urls = [], limit = 10) {
    const successNum = 0;
    const result = new Array(urls.length);
    let urlIndex = 0;

    return new Promise((resolve, reject) => {
        const request = index => {
            const url = urls[index];
            http(url)
                .then(data => {
                    successNum++;
                    result[index] = data;
                    if (successNum === urls.length) {
                        resolve(result);
                        return;
                    }
                    urlIndex++;
                    request(urlIndex);
                })
                .catch(err => {
                    reject(err);
                });
        };
        for (
            urlIndex = 0;
            urlIndex < Math.min(limit, urls.length);
            urlIndex++
        ) {
            request(urlIndex);
        }
    });
}
// test for request with limit
// const start = performance.now();
// requestWithLimit(['1', '2', '3', '4', '5', '6', '7', '8'], 1000)
//     .then(r => {
//         console.log(performance.now() - start);
//         console.log(r);
//     })
//     .catch(err => console.log(err));

class MyPromise {
    constructor(promiseFn) {
        this.promiseFn = promiseFn;
        this.thenCbList = [];
        this.errorCbList = [];
        // 传入promise的resolve和reject，绑定this，供外函数调用
        this.promiseFn(this.resolve.bind(this), this.reject.bind(this));
        return this;
    }

    then(cb) {
        this.thenCbList.push(cb);
        return this;
    }

    catch(cb) {
        this.errorCbList.push(cb);
        return this;
    }

    resolve(value) {
        const cb = this.thenCbList.shift();
        if (cb && typeof cb === 'function') {
            let r;
            try {
                r = cb(value);
            } catch (e) {
                this.reject(r);
            }
            if (r instanceof MyPromise) {
                r.then(res => {
                    setTimeout(() => {
                        this.resolve(res);
                    }, 0);
                }).catch(err => this.reject(err));
            } else {
                setTimeout(() => {
                    this.resolve(r);
                }, 0);
            }
        }
    }

    reject(err) {
        const cb = this.errorCbList.shift();
        if (cb && typeof cb === 'function') {
            setTimeout(() => {
                cb(err);
                this.reject(err);
            }, 0);
        }
    }
}

// test for MyPromise
// const p = new MyPromise((resolve, reject) => {
//     setTimeout(() => {
//         resolve(1);
//     }, 1000);
// });

// p.then(res => {
//     console.log(`first ${res}`);
//     return 2;
// })
//     .then(res => {
//         console.log(`second ${res}`);
//         return new MyPromise((resolve, reject) => {
//             setTimeout(() => {
//                 reject('error');
//             }, 2000);
//         });
//     })
//     .then(res => {
//         console.log(`third ${res}`);
//     })
//     .catch(err => {
//         console.log(`reject ${err}`);
//     });

function flatten(array) {
    return array.reduce((acc, cur) => {
        if (Array.isArray(cur)) {
            return acc.concat(flatten(cur));
        }
        acc.push(cur);
        return acc;
    }, []);
}

class SliceBlob {
    constructor(chunkSize = 10 * 1024 * 1024) {
        this.chunkSize = chunkSize;
        this.data = [];
    }

    createFileChunk(file, size = this.chunkSize) {
        const fileChunkList = [];
        let cur = 0;
        while (cur < file.size) {
            fileChunkList.push({
                // 这里用文件自己prototype上带的slice方法进行分片
                file: file.slice(cur, cur + size)
            });
            cur += size;
        }
        return fileChunkList;
    }

    async uploadChunks() {
        const requestList = this.data
            .map(({chunk, hash}) => {
                const formData = new FormData();
                formData.append('chunk', chunk);
                formData.append('hash', hash);
                formData.append('filename', 'fileTest');
                return {
                    formData
                };
            })
            .map(({formData}) => {
                return this.request({url: '', data: formData});
            });
        await Promise.all(requestList);
    }

    async handleUpload() {
        const fileChunkList = this.createFileChunk();
        this.data = fileChunkList.map(({file}, i) => {
            return {
                chunk: file,
                hash: 'file-' + i
            };
        });

        await this.uploadChunks();
    }
}
