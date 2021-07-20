import {List} from './List.js';

export function testList() {
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
    const arr = [5,1,8,9,7,2];
    // const arr = [2,5,1,7, 10];
    const list = new List();
    initListFromArr(arr, list);

    window.list = list;
    window.toArray = toArray;
    // list.mergeSort(list.header.succ, list.size());
    list.mergeSort(list.header.succ, list.size())
    console.log(toArray(self));
}

testList()
