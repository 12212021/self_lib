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
