import {Str} from './String.js';

function main() {
    let string = 'BBC ABCDAB ABCDABCDABDE';
    let sub = 'ABCDABD';
    // let sub = 'KK'
    console.log(string.indexOf(sub));
    string = new Str(string);
    sub = new Str(sub);
    console.log(string.match0(sub));
    console.log(string.match1(sub));
    console.log(string.matchKMP(sub))

}

main();
