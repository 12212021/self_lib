/**
 * Stack类的问题比较擅长问题：虽然有明确的算法，但是输出形式是线性序列的方式给我
 */

import {Stack} from './Stack.js';


/**
 * 输入一个合法的10进制数据和进制转化（最高限制为16）
 * 输出一个转化后的字符串
 * @param {Number} sourcce 
 * @param {Number} base 
 * @returns {String}
 */
export function convertToBase(sourcce, base) {
    const stack = new Stack();
    const charSet = [
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        'A',
        'B',
        'C',
        'D',
        'E',
        'F'
    ];
    while(sourcce > 0) {
        const remainder = sourcce % base;
        sourcce = Math.floor(sourcce / base)
        stack.push(charSet[remainder]);
    }
    let res = '';
    while(stack.size()) {
        res += stack.pop();
    }
    return res;
}

/**
 * 将一个base数转化为10进制数据
 * @param {String} source 
 * @param {Number} base 
 * @returns {Number}
 */
export function convertFrom(source, base) {
    const stack = new Stack();
    for(let index = 0; index < source.length; index++) {
        stack.push(source[index]);
    }
    const charMap = {
        '1': 1,
        '2': 2,
        '3': 3,
        '4': 4,
        '5': 5,
        '6': 6,
        '7': 7,
        '8': 8,
        '9': 9,
        'A': 10,
        'B': 11,
        'C': 12,
        'D': 13,
        'E': 14,
        'F': 15
    };

    let res = 0;
    let weight = stack.size();
    while(stack.size()) {
        const val = charMap[stack.pop()];
        res += val * (Math.pow(base, weight - 1 - stack.size()));
    }
    return res;
}