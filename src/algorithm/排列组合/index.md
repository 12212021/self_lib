### 排列
从n个元素中抽取m(0 < m <= n)个不同的元素，按照一定的顺序排成一列，这个过程就叫排列(permutation)，当m=n的时候，这种情况被称为全排列(all permutation)

排列的个数
- 对于n元素进行全排列，排列个数为`n!`
- 对于n个元素中取出m个元素进行排列，排列的个数为`n! / (n - m)!`

下面是求取一个全排列的例子
```js
/**
 * @desc 通过递归来实现
 * 核心思路：将最后一个元素，依次插入到已经permutation好的元素之间的空位
 * @param {string | number []} originList
 */
function allPermutation(originList) {
    if (originList.length === 0) {
        return [];
    }
    if (originList.length === 1) {
        return [[originList[0]]];
    }
    let ans = [];
    const last = originList[originList.length - 1];
    const result = allPermutation(originList.slice(0, originList.length - 1));
    for (const each of result) {
        for (let i = 0; i <= each.length; i++) {
            ans.push([...each.slice(0, i), last, ...each.slice(i)]);
        }
    }
    return ans;
}
```

```js
/**
 * 通过nextPermutation的方式来求解全排列
 * 详情可见leetcode: https://leetcode-cn.com/problems/next-permutation/
 */
class AllPermutation {
    constructor(list) {
        list.sort();
        this.list = list;
    }

    nextPermutation(list) {
        let newList = list.slice();
        for (let i = newList.length - 1; i >= 1; i--) {
            const cur = newList[i];
            const pre = newList[i - 1];
            // 找到一个逆序对且区间[i, n)为降序排列
            if (pre < cur) {
                let k = newList.length - 1;
                while (pre >= newList[k]) {
                    k--;
                }
                // 在区间[i, n)找到一个数大于pre，该数必然存在，平凡情况下cur
                this.swap(i - 1, k, newList);

                // 此时区间[i, n)仍然为降序排列
                let begin = i;
                let end = newList.length - 1;
                while (begin < end) {
                    this.swap(begin, end, newList);
                    begin++;
                    end--;
                }
                return newList;
            }
        }
        return newList;
    }

    swap(a, b, list) {
        const tmp = list[a];
        list[a] = list[b];
        list[b] = tmp;
    }

    allPermutation() {
        let ans = [];
        let list = this.list;
        const upper = this.factorial(list.length);
        ans.push(list)
        while (ans.length < upper) {
            const next = this.nextPermutation(list);
            ans.push(next);
            list = next;
        }
        return ans;
    }

    factorial(n) {
        let i = 1;
        let pro = 1;
        while (i <= n) {
            pro *= i;
            i++;
        }
        return pro;
    }
}
```


### 组合
从n个元素中取出m个元素（m <= n），m个元素组成一个集合，如m = n，则称为n的全集合，例如对于集合{1,2,3}其全集合为{空集, {1}, {2}, {3}, {1, 2}, {1,3} {2, 3}, {1, 2, 3}}，注意，集合不区分元素的顺序。全集合的个数为2<sup>n</sup>



求取一个集合的全集合，如下代码
```js

/**
 * @desc 核心思路：对于集合每一个元素而言，有两种选择，选中或者不选中
 * 利用二进制位为0 | 1来代表集合元素的选中与否
 * @param {number | string []} s
 */
function combination1(s) {
    const upper = 2 ** (s.length);
    let ans = [];
    for (let i = 0; i < upper; i++) {
        let j = s.length - 1;
        let num = i;
        let tmp = [];
        while (num) {
            const bitFlag = num & 1;
            if (bitFlag) {
                tmp.push(s[j]);
            }
            j--;
            num = num >>> 1;
        }
        ans.push(tmp);
    }
    return ans;
}


/**
 * @desc 采用递归的方式来做，核心思路：对于最后一个元素存在两种可能性
 * 选中或者非选中，基于此方式递归，可或得
 * @param {number | string []} s
 */
function combination2(s) {
    if (s.length === 0) {
        return [[]];
    }
    let ans = [];
    const last = s[s.length - 1];
    const setWithOutLast = combination2(s.slice(0, s.length - 1));
    let setWithLast = setWithOutLast.map(list => [...list]);
    setWithLast = setWithLast.map(list => {
        list.push(last);
        return list;
    });
    ans = ans.concat(setWithOutLast).concat(setWithLast);
    return ans;
}

```
