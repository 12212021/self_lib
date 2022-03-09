### 差分数组

对于数组 [1,2,2,4]，其差分数组为 [1,1,0,2]，差分数组为其后一项减去前一项的值

查分数组有如下的性质：对于区间[l, r]进行加数x(可为正或者负)，则arr[l] += x; arr[r + 1] - x

#### 例子


这里有 n 个航班，它们分别从 1 到 n 进行编号。

有一份航班预订表 bookings ，表中第 i 条预订记录 bookings[i] = [firsti, lasti, seatsi] 意味着在从 firsti 到 lasti （包含 firsti 和 lasti ）的 每个航班 上预订了 seatsi 个座位。

请你返回一个长度为 n 的数组 answer，其中 answer[i] 是航班 i 上预订的座位总数。


```
示例 1：

输入：bookings = [[1,2,10],[2,3,20],[2,5,25]], n = 5
输出：[10,55,45,25,25]
解释：
航班编号        1   2   3   4   5
预订记录 1 ：   10  10
预订记录 2 ：       20  20
预订记录 3 ：       25  25  25  25
总座位数：      10  55  45  25  25
因此，answer = [10,55,45,25,25]
```
```js
/**
 * @param {number[][]} bookings
 * @param {number} n
 * @return {number[]}
 */
var corpFlightBookings = function (bookings, n) {
    let arr = Array(n).fill(0);
    for (const book of bookings) {
        const [firstFlight, lastFlight, seats] = book;
        arr[firstFlight - 1] += seats;
        // 如果是最后一个值，则不需要减
        if (lastFlight < n) {
            arr[lastFlight] -= seats;
        }
    }
    return arr.reduce((acc, cur) => {
        if (acc.length === 0) {
            acc.push(cur);
        } else {
            acc.push(acc[acc.length - 1] + cur);
        }
        return acc;
    }, []);
};
```

### 前缀和
对于数组[1,2,3,4,5,6]，其前缀和数组为[0,1,3,6,10,15,21]，前缀和对于求取一个数组区间和较方便

对于任意的x,y(x,y不等且处于数组长度范围内)，求解区间[x, y]的和，其值为前缀和数组S<sub>y</sub> - S<sub>x-1</sub>



#### 例子
给你一个整数数组 nums 和一个整数 k ，编写一个函数来判断该数组是否含有同时满足下述条件的连续子数组：

子数组大小 至少为 2 ，且
子数组元素总和为 k 的倍数。
如果存在，返回 true ；否则，返回 false 。
如果存在一个整数 n ，令整数 x 符合 x = n * k ，则称 x 是 k 的一个倍数。0 始终视为 k 的一个倍数。
链接：https://leetcode-cn.com/problems/continuous-subarray-sum


输入：nums = [23,2,4,6,7], k = 6
输出：true
解释：[2,4] 是一个大小为 2 的子数组，并且和为 6 。


输入：nums = [23,2,6,4,7], k = 6
输出：true
解释：[23, 2, 6, 4, 7] 是大小为 5 的子数组，并且和为 42 。
42 是 6 的倍数，因为 42 = 7 * 6 且 7 是一个整数。

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var checkSubarraySum = function (nums, k) {
    let preSum = Array(nums.length + 1).fill(0);
    for (let i = 1, sum = 0; i < preSum.length; i++) {
        sum += nums[i - 1];
        preSum[i] = sum;
    }
    let s = new Set();
    for (let i = 2; i < preSum.length; i++) {
        s.add(preSum[i - 2] % k);
        if (s.has(preSum[i] % k)) {
            return true;
        }
    }
    return false;
};

```

题解：https://leetcode-cn.com/problems/continuous-subarray-sum/solution/gong-shui-san-xie-tuo-zhan-wei-qiu-fang-1juse/

