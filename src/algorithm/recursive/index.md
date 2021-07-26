### 线性递归
分支转向是算法的灵魂，递归作为分支转向的一种形式，以其强大的灵活性闻名

递归地定义：允许函数或者过程自我调用，包括直接调用和间接调用

递归优势：
- 许多问题都可以简洁而准确地描述为递归形式
  - 操作系统的文件目录组织结构
- 递归是一种基本而典型的设计模式
  - 二叉树的定义就是典型的递归

数组求和
```js
// 线性递归、减而治之 例子
function sum(arr, length = arr.length) {
    if (length < 1) { // 平凡情况 递归基
        return 0;
    }
    return  sum(arr, length - 1) + arr[length - 1];
}
```

#### 线性递归

定义：算法可能朝着更深一层进行自我调用，且每一个递归实例**最多对自身调用一次**

#### 减而治之
在上面的例子中，问题可以分解为两个独立的子问题：
- 其一，对应平凡解
- 其二，问题退化为与原问题具有相同形式的子问题
子问题经过简单的合并就可以转化为原问题的解

线性递归往往对应的**减而治之**的算法策略：递归每推进一层，待求解的问题的规模都缩减**一个常数**，最终蜕化为**平凡解**


### 递归分析

#### 递归跟踪
要点
1. 算法的每一个递归实例都表示为一个方框，其中注明了该实例的调用参
2. 若实例M调用实例N，则再M和N对应的方框中添加一条有向线

sum函数的递归跟踪如图所示
![image.png](https://i.loli.net/2021/05/26/E4UuDPStkQOXRq8.png)

从中可以比较清晰地看出，sum算法的时间复杂度为o(n)，空间复杂度也为o(n)

#### 递推方程
sum函数的递归方程为

F(n) = F(n - 1) + C1;

边界条件为

F(0) = C0

联立方程可以有

F(n) = C1 * n + C2

### 递归模式

#### 多递归基
为了保证算法的*有穷性*，递归都需要设置递归基，针对每一类可能出现的平凡解，都需要设置正确的递归基，所以递归算法可能包含多个递归基


数组倒置
```js
function revsrse(arr) {
    revsrseCall(arr, 0, arr.lenght);
}

function revsrseCall(arr, lo, hi) {
    if (lo < hi) {
        const temp = arr[lo];
        arr[lo] = arr[hi - 1];
        arr[hi - 1] = temp;
        revsrse(arr, lo + 1, hi - 1);
    }
    // else 分支隐含了lo === hi和lo > hi两种递归分支的平凡解
}
```

#### 实现递归
实现递归以来经验，往往需要从多个角度考察问题，同时还可能需要对问题的形式进行**等价重新设计**，使得经过分解的子问题和原问题**具有相同的形式**

如数组倒置算法，对数组的倒置转化为等价的对数据区间的倒置

#### 多项递归


幂函数算法
```js
function power2Plain(n) {
    if (n === 0) {
        return 1;
    }
    return  power2Plain(n - 1) * 2;
}

function sqr(num) {
    return num * num;
}

function power2Multi(n) {
    if (n === 0) {
        return 1
    }
    // 奇数
    if ((n & 1) === 1) {
        return sqr(power2Multi(n >> 1)) * 2

    } else {
        return sqr(power2Multi(n >> 1))
    }
}
```

幂函数算法，依据传入的n是奇数还是偶数，设计了两种递归方向，即便如此，每个递归地实例都只能从递归方向中选择至多一个，仍然属于线性递归，
但是问题的规模是减半的，其算法的复杂度下降一个数量级，为log数量级

### 递归消除

递归表现形式简洁，但是递归需要操作系统创建额外的栈执行空间，并进行销毁，所以再对空间性能要求比较高的场合，往往需要将递归改写为迭代的形式。
一般是栈的方式进行模拟

#### 尾递归及其优化
尾递归：如果一个函数所有的调用都出现再函数的尾部且它的返回值不属于表达式的一部分，则称该递归为尾递归

像reverseCall是典型的尾递归，但是sum函数则不是尾递归，但是也可以改写
```js
function reverseIter(arr, lo, hi) {
    while (lo < hi) {
        const temp = arr[lo];
        arr[lo] = arr[hi - 1];
        arr[hi - 1] = temp;
        lo--;
        hi--;
    }
}
```

### 二分递归

定义：凡治众如治寡，分数是也，将待求解的问题分解为若干规模更小的子问题，不断缩减规模，直至到平凡解

```js
function sum(arr, lo = 0, hi = arr.length - 1) {
    if (lo === hi) {
        return arr[lo];
    }
    const mid = (lo + hi) >> 1;
    console.log(lo, hi, mid);
    return sum(arr, lo, mid) + sum(arr, mid + 1, hi);
}
```
该版本的sum函数每个递归实例调用自身两次，所以不属于线性递归


### 斐波那契数列的求和

```js
function fib(n) {
    if (n < 2) return n;
    return  fib(n - 1) + fib(n - 2);
}
```

#### 通用的优化策略
借助一定的辅助空间，待各个子问题求解之后，及时记录下其对应的解
```js
let cache = {}
function fib(n) {
    if (cache[n]) {
        return cache[n];
    }
    if (n < 2) {
        cache[n] = n;
        return cache[n];
    }
    cache[n] = fib(n - 1) + fib(n - 2);
    return cache[n];
}
```

#### 迭代版本
```js
function fibIter(n) {
    let prePre = 0;
    let pre = 1;
    let cur = 0;
    while (n--) {
        cur = prePre + pre;
        prePre = pre;
        pre = cur;
    }
    return prePre;
}
```

### 递归计算和递归函数

```js
// 阶乘1
function factorial(n) {
    if (n < 2) {
        return 1;
    }
    return n * factorial(n - 1);
}

// 阶乘2
function factorialIter(n, product = 1) {
    if (n < 2) {
        return product * 1;
    }
    return factorialIter(n - 1, product * n);
}
```
递归函数：递归函数是一种形式上的递归，只要函数（过程）直接或者间接调用自身，则其为递归函数（如factorialIter、factorial）

递归计算：函数的调用栈维护了一个调用链，factorial属于递归计算，而factorialIter则属于迭代过程，其计算结果由n和product来维护，任何时刻，
只要知道了n和product便能够推算出下一个结果
