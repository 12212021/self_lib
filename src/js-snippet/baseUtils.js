function isInteger(n) {
    return n % 1 === n;
}

function floor(num) {
    return num - (num % 1);
}

function ceil(num) {
    return floor(num) + 1;
}

// @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
function objectIs(a, b) {
    // SameValue algorithm
    if (a === b) {
        // Steps 1-5, 7-10
        // Steps 6.b-6.e: +0 != -0
        if (a !== 0) {
            return true;
        }
        return 1 / a === 1 / b;
    }

    // step 6.a: NaN === NaN
    return a !== a && b !== b;
}

function isNaN(num) {
    num = Number(num);
    return num !== num;
}
