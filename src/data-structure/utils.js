
/**
 * @param {Number} int 
 */
function randomInt(int) {
    int = Math.abs(int);
    return Math.floor(Math.random() * int);
}


export {
    randomInt
}