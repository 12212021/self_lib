### Promise
Promise是针对setter-setter函数的抽象，在此基础上Promise增加了一下限制如下
- 内部的setter只能被异步调用
- 内部的setter最多被调用一次
- 可以传递第二个setter来接收错误值


#### Eager, Not Lazy
Promise是被立即调用的，如下代码
```js
console.log('before')
const p = new Promise((resolve, reject) => {
    console.log('hello')
})
console.log('after')

// before
// hello
// after
```
这种Eager执行代码的方式会导致下面的两个不方便处
- 一些情况，并不期望Promise会立即执行
- Promise是立即执行的，所以没有办法复用**异步逻辑**

为了复用Promise的异步逻辑，可以采用Promise-getter的方式
```js
function fn(resole, reject) {
    console.log('hello');
}

console.log('before');
const promiseGetter = () => new Promise(fn);
const p = promiseGetter();
console.log('after');

// before
// hello
// after
```

#### No cancellation
promise一旦被创建了之后就没有办法取消


#### Never synchronous
Promise跟回调不同的地方在于，回调cb函数可以**同步或者异步**执行，而promise则强迫所有的代码都采用异步的方式执行

```js
console.log('before')
Promise.resolve(42).then(x => console.log(x))
console.log('after')

// before
// after
// 42
```
