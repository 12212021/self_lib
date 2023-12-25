/**
 * 计算两个大数的和
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var addStrings = function (num1, num2) {
    let num1Arr = num1.split('').reverse();
    let num2Arr = num2.split('').reverse();

    const len = Math.max(num1Arr.length, num2Arr.length);
    let result = new Array(len).fill(0);
    let carry = 0;
    for (let i = 0; i < len; i++) {
        const n1 = +(num1Arr[i] || 0);
        const n2 = +(num2Arr[i] || 0);
        const sum = n1 + n2 + carry;
        result[i] = sum % 10;
        carry = Math.floor(sum / 10);
    }
    const r = result.reverse().join('');
    if (carry) {
        return String(carry) + r;
    }
    return r;
};

/**
 * 计算两个大数的乘积
 * 用竖式乘法模拟
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function (num1, num2) {
    const add2Array = (arr1, arr2) => {
        arr1.reverse();
        arr2.reverse();
        const len = Math.max(arr1.length, arr2.length);
        const r = new Array(len).fill(0);
        let carry = 0;
        for (let i = 0; i < len; i++) {
            const n1 = +(arr1[i] || 0);
            const n2 = +(arr2[i] || 0);
            const sum = n1 + n2 + carry;
            r[i] = sum % 10;
            carry = Math.floor(sum / 10);
        }
        if (carry) {
            r.push(carry);
        }
        return r.reverse();
    };

    const productSingleNum = (list, num) => {
        let r = new Array().fill(0);
        num = +num;
        let carry = 0;
        for (let i = list.length - 1; i >= 0; i--) {
            const p = +list[i] * num + carry;
            r[i] = p % 10;
            carry = Math.floor(p / 10);
        }
        if (carry) {
            r.unshift(carry);
        }
        return r;
    };

    if (num1 === '0' || num2 === '0') {
        return '0';
    }

    const numArr1 = num1.split('');
    const numArr2 = num2.split('');
    let result = new Array(numArr1.length + numArr2.length).fill(0);
    let minArr = [];
    let maxArr = [];
    if (numArr1.length < numArr2.length) {
        minArr = numArr1;
        maxArr = numArr2;
    } else {
        minArr = numArr2;
        maxArr = numArr1;
    }

    for (let i = minArr.length - 1; i >= 0; i--) {
        const product = productSingleNum(maxArr, +minArr[i]);
        product.push(...new Array(minArr.length - 1 - i).fill(0));
        // console.log(product, 'pp')
        result = add2Array(result, product);
    }
    if (result[0] === 0) {
        result.shift();
    }
    return result.join('');
};

console.log(multiply('123', '56'));
