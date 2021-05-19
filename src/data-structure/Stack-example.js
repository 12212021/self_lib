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


/**
 * 栈混洗
 * 定义：
 * 对于A栈<a1, a2, ..., an] a1为栈顶元素，B、S栈均为空
 * 可允许的操作：S.push(A.pop())、B.push(S.pop)操作
 * 结果：当A栈、S栈为空，B栈为满的时候，一次栈混洗操作完成
 * 限制：当栈被pop的时候，不能为空
 *
 *
 * 栈混洗具有以下几个特点：
 *
 * 1、B为A { 1, 2, 3, ..., n }的任一排列，若B为A的一个栈混洗当且仅当，对于任意的1 <= i < j < k <= n，B中都不含有
 * {...,k,...,i,...,j,...}模式
 *
 * 2、A 为{ 1, 2, 3, ..., n }一个栈混洗，则A对应一个有效的的n对括号组成的表达式，反之亦然
 * 令栈混洗中的push/pop操作对应为左括号和又括号，可证明
 *
 */


/**
 * 判断一个表达式是不是合法的表达式
 * @param {String} exp
 */
export function paren(exp) {
    const s = new Stack();
    for (const char of exp) {
        switch (char) {
            case '(':
            case '[':
            case '{':
                s.push(char);
                break;
            case ')':
                if (s.empyty() || s.pop() !== '(') {
                    return false;
                }
                break;
            case ']':
                if (s.empyty() || s.pop() !== '[') {
                    return false;
                }
                break;
            case '}':
                if (s.empyty() || s.pop() !== '{') {
                    return false;
                }
                break;
            default:
                break;
        }
    }
    return s.empyty();
}


/**
 *
 * @param {String} exp
 * @returns 返回字符串类型exp的输出
 */
export function evaluate(exp) {
    const oprator = new Stack();
    const oprend = new Stack();

    // 哨兵元素，优先级最低
    oprator.push('sentry');

    let index = 0;
    exp = exp.replaceAll(' ', '');
    while(index < exp.length) {
        const token = readToken(exp.slice(index));
        index += token.length;

        if (isOprator(token)) {
            if (token === ')') {
                while(oprator.top() !== '(') {
                    oprend.push(compute(oprator, oprend));
                }
                oprator.pop();
            } else {
                while(leftOpratorPrecede(oprator.top(), token)) {
                    oprend.push(compute(oprator, oprend));
                }
                oprator.push(token);
            }

        } else {
            // 对操作数而言
            oprend.push(Number(token));
        }
    }
    while(oprator.top() !== 'sentry') {
        oprend.push(compute(oprator, oprend));
    }
    return oprend.pop();
}

/**
 * 支持加减乘除立方括号，支持正整数和小数
 * @param {String} str
 * @returns {String} 返回一个可用的token
 */
function readToken(str) {
    const opList = ['(', ')', '+', '-', '*', '/', '^'];
    const firstChar = str[0];
    if (opList.includes(firstChar)) {
        return firstChar;
    }
    let index = 0;
    let token = firstChar;
    while(++index < str.length) {
        if (opList.includes(str[index])) {
            return token;
        } else {
            token += str[index];
        }
    }
    return token;
}


/**
 *
 * @param {String} token
 * @returns {Boolean} 判断一个token是不是操作符
 */
function isOprator(token) {
    const opList = ['(', ')', '+', '-', '*', '/', '^'];
    return opList.includes(token);
}

/**
 * 如果右侧操作符优先级小于左侧，返回ture，否则false
 * @param {String} leftOprt
 * @param {String} rightOprt
 * @returns {Boolean}
 */
function leftOpratorPrecede(leftOprt, rightOprt) {
    if (leftOprt === 'sentry') {
        return false;
    }
    const precedeTable = [
    /*    当前运算法 */
    /*       | (    )    +    -    *    /    ^ | */
/*栈  ( */    ['=', '<', '<', '<', '<', '<', '<'],
/*顶  ) */    ['=', '=', '<', '<', '<', '<', '<'],
/*运  + */    ['>', '>', '=', '=', '<', '<', '<'],
/*算  - */    ['>', '>', '=', '=', '<', '<', '<'],
/*符  * */    ['>', '>', '>', '>', '=', '=', '<'],
/*略  / */    ['>', '>', '>', '>', '=', '=', '>'],
/*略  ^ */    ['>', '>', '>', '>', '>', '>', '=']
    ];
    const indexMap = {
        '(': 0,
        ')': 1,
        '+': 2,
        '-': 3,
        '*': 4,
        '/': 5,
        '^': 6
    };
    const leftIndex = indexMap[leftOprt];
    const rightIndex = indexMap[rightOprt];
    const tableOp = precedeTable[leftIndex][rightIndex];
    return tableOp === '>';
}

/**
 *
 * @param {Stack} oprator
 * @param {Stack} oprendPairs
 * @returns {Number} 返回操作符运算结果
 */
function compute(oprator, oprend) {
    const op = oprator.pop();
    const rightOprend = oprend.pop();
    const leftOprend = oprend.pop();
    switch (op) {
        case '+':
            return leftOprend + rightOprend;
        case '-':
            return leftOprend - rightOprend;
        case '*':
            return leftOprend * rightOprend;
        case '/':
            return leftOprend / rightOprend;
        case '^':
            return Math.pow(leftOprend, rightOprend);
    }
}
