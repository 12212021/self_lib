#### leetCode 1143.最长公共子序列

对于最长公共子序列（LCS）存在如下公共定义
f[i][j]代表S1串的前i个字符和S2串的前j个字符形成的最长公共子序列的长度。


当状态定义好之后，状态转移方程为
- S1[i] === S2[j]时候，f[i][j] = f[i-1][j-1] + 1，代表`必然使用S1[i]和S2[j]`LCS的长度
- S1[i] !== S2[j]时候，f[i][j] = Max(f[i-1][j], f[i][j-1])代表`必然不使用S1[i]，可能使用S2[j]`和`必然不使用S2[j]，可能使用S1[i]`时候LCS长度
```js
/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function (text1, text2) {
    // 字符串增加前缀空格，可以避免处理一些意外case
    text1 = ' ' + text1;
    text2 = ' ' + text2;
    let dp = Array(text1.length)
        .fill(0)
        .map(() => Array(text2.length).fill(0));
    for (let i = 0; i < text1.length; i++) {
        dp[i][0] = 1;
    }
    for (let i = 0; i < text2.length; i++) {
        dp[0][i] = 1;
    }
    for (let i = 1; i < text1.length; i++) {
        for (let j = 2; j < text2.length; j++) {
            if (text1[i] === text2[j]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    return dp[text1.length - 1][text2.length - 1] - 1;
};
```


这里有另外一个用函数递归的思想去做,这里就需要占据大量的内存
```js
/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function (text1, text2) {
    const mp = {};
    /**
     *
     * @param {string} t1
     * @param {string} t2
     * @returns {number}
     */
    const dfs = (t1, t2) => {
        if (t1.length === 0 || t2.length === 0) {
            return 0;
        }
        const key = t1.length + ',' + t2.length;
        if (mp[key] !== undefined) {
            return mp[key];
        }
        if (t1[t1.length - 1] === t2[t2.length - 1]) {
            const maxLen = Math.max(
                dfs(t1.slice(0, t1.length - 1), t2.slice(0, t2.length - 1)) + 1,
                dfs(t1, t2.slice(0, t2.length - 1)),
                dfs(t1.slice(0, t1.length - 1), t2)
            );
            mp[key] = maxLen;
            return maxLen;
        } else {
            const maxLen = Math.max(
                dfs(t1, t2.slice(0, t2.length - 1)),
                dfs(t1.slice(0, t1.length - 1), t2)
            );
            mp[key] = maxLen;
            return maxLen;
        }
    };

    const len = dfs(text1, text2);
    return len;
};
```
