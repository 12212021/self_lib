## 队列

### 队列定义

栈是一组受限的线性数据结构，其特点为FIFO（first in, first out）数据结构，其数据结构的ADT如下

| 操作接口  | 功能描述  |
|---|---|
| size()  | 获取队列内元素数量  |
| isEmpty()  | 队列是否为空  |
| enqueue(e)  | 向队列尾部添加元素e  |
| dequeue  | 弹出队列首部元素 |
| front()  | 查看队列首部元素  |

### 滑动窗口
双指针的滑动窗口本质上一个队列，算法基本思想：给出left=right=0的闭区间[left, right]，不断增加right指针，直至区间内元素**符合某种条件**，
再将left向右移，不断更新**最佳case**。

#### 适用范围
- 一般是字符串或者列表
- 一般是要求最值（最大长度、最短长度）或者子序列等

#### 算法的思想
1. 左右指针技巧，初始化left=right=0，将闭区间[left, right]称为一个窗口
2. 先不断增加right指针扩大窗口[left, right]，直到窗口中序列符合要求
3. 此时，停止增加right，转而不断增加left，缩小窗口，直到窗口中需求不满足要求；同时每更新left的时候，都要更新**最佳case**结果
4. 重复2，3直到right到达尽头

思路：在步骤2寻找`可行解`，在步骤3`优化可行解`，最终找到`最优解`

#### 算法框架

单层循环
```js
function template() {
    // 窗口左右两端
    let left = 0;
    let right = 0;
    // 原始序列
    const seq = 'xxxxxx';
    // 可行解序列
    let slide = [];
    // 最优解
    let res = null;
    while (right < seq.length) {
        slide.push(seq[right]);
        // 不满足需求，增加右指针
        if (!available(slide)) {
            right++;
        } else {
            // 更新最优解，增加左指针
            update(res);
            left++;
        }
    }
}
```

双层循环
```js
function template() {
    let left = 0;
    let right = 0;
    const seq = 'xxxx';
    let slide = [];
    let res = null;
    while (right < seq.length) {
        slide.push(seq[right]);
        if (!available(slide)) {
            right++;
            continue;
        }
        while (available(slide)) {
            update(res);
            left++;
        }
    }
}
```
