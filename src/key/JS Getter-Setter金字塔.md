### 函数
函数的特点
- Lazy，函数是可复用的
- 实现的灵活性：对于调用方而言，只关注输入和输入，对函数的实现是不关注的

### Getter () => x
Getter函数没有输入，但是会有一个输出x，如下

```js
function getUser() {
    return {
        name: 'yu'
    };
}
```
Getter函数是js函数的一种，像一些系统函数，Math.random(), Date.now()都是Getter函数。Getter函数可以继承函数的两个特点，Lazy和实现的灵活性。
- 像getUser函数，只要不调用，就不会生成对象。
- 可以在函数体内部做一些Side Effect，对调用者是无感知的，如下

```js
function getUser() {
    Analytics.sendEvent('User object is now being accessed');
    return {
        name: 'yu'
    };
}
```

### Setter (x) => void
Setter函数只接受参数，但是没有输出。如console.log函数，Setter函数一般没有抽象而言


### Getter-Getter () => (() => x)
没有参数，返回值为Getter函数
```js
function getGetNext() {
    let seed = 2
    return function() {
        const next = seed;
        seed = seed * 2;
        return next;
    }
}

let getNext = getGetNext();
console.log(getNext()); // 2
console.log(getNext()); // 4
console.log(getNext()); // 8
getNext = getGetNext(); // 🔷 restart!
console.log(getNext()); // 2
console.log(getNext()); // 4
console.log(getNext()); // 8
console.log(getNext()); // 16
console.log(getNext()); // 32
```

### Setter-Setter ((x) => void) => void
接受一个Setter作为参数，没有返回。Setter-Setter模式即js中很常见的回调模式，Setter-Setter的除了函数常见的优点，还具备
- 控制反转
- 可以异步调用

```js
function setSetTen(cb) {
    cb(10); // 可以同步回调
    cb(10); // 可以回调多次
    setTimeout(() => {
        cb(10)
    }, 500); // 可以异步回调
}

```

### Iterable () => (() => ({value, done}))
```js
function getGetNext() {
    let seed = 40;
    return function () {
        if (seed <= 48) {
            let next = seed;
            seed += 2;
            return {
                value: next,
                done: false
            };
        } else {
            return {
                done: true
            };
        }
    };
}

const getNext = getGetNext();
for (let val = getNext(); !val.done; val = getNext()) {
    console.log(val.value);
}
```
es6针对迭代器除了专门的yield、for...of语法，也规定了迭代器的自定义方式，es6 style的迭代器如下
```js
const addNums = {
    [Symbol.iterator]: () => {
        let i = 41;
        return {
            next: () => {
                if (i <= 49) {
                    const next = i;
                    i += 2;
                    return {
                        done: false,
                        value: next
                    }
                } else {
                    return {
                        done: true,
                        value: i
                    }
                }
            }
        };
    }
};

for(let num of addNums) {
    console.log(num)
}
```
采用yield字段，可以写出更加简洁的迭代器
```js
function* numSubHundreds() {
    let i = 80;
    while( i < 100) {
        yield i;
        i++
    }
    return;
}

for(const num of numSubHundreds()) {
    console.log(num)
}

```


### Promise (x => void, err => void) => void
Promise是setter-setter，接受两个Setter函数，并且有如下额外的限制
- cb函数只能被异步回调，不能同步
- cb函数最多被调用一次
- 额外的cb可选函数用于接收错误

### Observable (x=> void, err => void, () => void) => void
Observable也是Setter-Setter，可以存在三个Setter函数，一般observable是可以取消的


Observable的定义
- 是一个对象
- 有一个observe类的函数，aka subscribe
- subscribe method是Observable的一个setter函数
- subscribe接收参数observer，必须有next方法作为setter

对内部inner setter observer的限制如下
- 一旦complete调用了，error不会调用
- 一旦error调用了，complete不会调用
- 一旦error或者complete被调用了，next就不再被调用

```js
const oddNum = {
    subscribe(observer) {
        let num = 41;
        let id = setInterval(() => {
            if (num < 58) {
                observer.next(num);
                num += 2;
            } else {
                observer.complete();
            }
        }, 1000);
        return function () {
            clearInterval(id);
        };
    }
};

const subscription = oddNum.subscribe({
    next: x => console.log(x),
    complete: () => console.log('done')
});

setTimeout(() => {
    subscription();
}, 8000);

```

### AsyncIterable () => (() => Promise<{done, value}>)
迭代器可以表示一个有限或者无限的序列，但是迭代能表示的协议只是同步的，当调用next的时候，迭代器必须**同步产出**值。
AsyncIterable基于迭代器和Promise，产出可迭代的异步序列

```js
function* oddNums() {
    for (let i = 10; i < 20; i++) {
        yield slowProduce(i);
    }
    return;
}

function slowProduce(num) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(num);
        }, 100 * num);
    });
}

async function test1() {
    for (let promise of oddNums()) {
        const val = await promise;
        console.log(val);
    }
}

// es2018 新语法调用
async function test2() {
    for await(let p of oddNums()) {
        console.log(p)
    }
}


test1()
test2()
```


### 总结
函数、Getter、Setter等控制方式如同金字塔一般，如下图所示

![image.png](https://i.loli.net/2021/11/04/YWVsl6AT2RtwjeD.png)
