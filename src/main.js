import {List} from './data-structure/List.js';

function testList() {
    let initListFromArr = (arr, list) => {
        let p = list.header;
        for(let index = 0; index < arr.length; index++) {
            list.insertAfter(p, arr[index]);
            p = p.succ;
        }
        return list;
    };
    /**
     * 
     * @param {List} list 
     */
    let toArray = list => {
        let p = list.header;
        let arr = [];
        let size = list.size();
        while(arr.length < size) {
            p = p.succ;
            arr.push(p.data);
        }
        return arr;
    }
    const arr = [78,283,232,232,1,1,2,90,132,132];
    // const arr = [2,5,1,7, 10];
    const list = new List();
    initListFromArr(arr, list);

    window.self = list;
    window.toArray = toArray;
    // list.mergeSort(list.header.succ, list.size());
    self.mergeSort(self.header.succ, self.size())
    console.log(toArray(self));
}

testList();

