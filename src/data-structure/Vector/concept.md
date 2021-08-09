### 数据结构的分类
- 线性结构（向量、列表）
- 半线性结构（二叉树）
- 非线性结构（图）

#### 向量
数据存储的物理位置和逻辑位置完全一样，其逻辑顺序也被称为秩（Rank）

#### 列表
数据存储的物理位置和逻辑位置不一定一致，通过间接引用（position）的方式来引用

### 向量的定义
数组，A[]中A代表数组存放位置的起始地址，记做A = { a<sub>0</sub>, a<sub>2</sub>, ..., a<sub>n-1</sub> }或者
A[0, n) = { A[0], A[1], ..., A[n - 1] }


#### 前驱
其中对于任何0 <= i < j < n， A[i]都是A[j]的前驱（predecessor），特别地，对于任何i >= 1， A[i - 1]称作A[i]的直接前驱（immediate
predecessor）

#### 后驱
对于任何0 <= i < j < n，A[j]都是A[i]的后继（successor）。特别地，对于任何i <= n - 2， A[i + 1]称作A[i]的直接后继（immediate successor）

#### 线性数组特点
call by rank。 元素A[i]对应的物理地址为A + i * s，能在快速访问到元素，但是在添加、删除元素方面表现不佳。


### 向量的ADT部分关键点

#### 扩容和缩容
扩容：采用懒惰策略，当向量的容量确实没有办法容纳新加元素，一般扩容策略为：将向量的容量扩展到2倍，扩容的时机为insert元素的时


缩容：当向量的装填因子（size / capacity）小于25%的时候，进行减半缩容操作，缩容的时机为：当向量remove的时候


时间复杂度：就分摊意义而言，扩容和缩容的时间复杂度均为常数


#### 唯一化

对于无序向量：从向量rank 1开始，依次调用find函数，查询前驱是否存在该元素，若存在则忽略该元素，转向下一个元素；若不存在，则换位置，其时间复杂度为n<sup>2</sup>


对于有序向量：从向量首部开始，双指针p，q，p指向无重复元素的向量首部，q遍历元素，若q指向的元素和p元素相同，q++，否则p++，q++，当遍历完成，修改向量的size即可

#### 二分查找
一般的二分查找采用`减而治之`的方式能简单解决，对于查找有这样一种策略：`查找向量中等于t且秩最大者，若找不到，返回可插入的位置（push）`

```js
/**
 *
 * @param {number[]} list
 * @param {number} target
 * @param {number} lo
 * @param {number} hi
 */
function binarySearch(list, target, lo = 0, hi = list.length) {
    while (lo < hi) {
        const mi = (lo + hi) >>> 1;
        // 关键步骤
        if (list[mi] <= target) {
            lo = mi + 1;
        } else {
            hi = mi;
        }
    }
    return lo - 1;
}
```
