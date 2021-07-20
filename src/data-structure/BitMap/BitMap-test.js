import {BitMap} from './BitMap.js';

var b = new BitMap(200)
b.set(2)
console.log(b.test(2));
b.clear(2)
console.log(b.test(2));
