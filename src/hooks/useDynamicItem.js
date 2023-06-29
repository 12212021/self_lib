/**
 * 该hook主要用于动态item的增删改查
 *
 * 其中getDefaultFn为同步的函数，如果需要一部修改数据，用updateItem
 *
 * 主要解决了手动维护id的烦恼
 *
 * 这里的id不可以用Date.now() map、for等循环中，生成的id可能是一个值
 */
import { ref } from "vue";
export function useDynamicItem(getDefaultFn) {
    let id = 0;
    const list = ref([]);

    const addItem = () => {
        const item = getDefaultFn();
        id++;
        list.value.push({
            ...item,
            id
        });
    };

    const subItem = (id) => {
        const findIndex = list.value.findIndex((each) => each.id === id);
        if (findIndex !== -1) {
            list.value.splice(findIndex, 1);
        }
    };

    const updateItem = (id, newItem, strategy = "merge") => {
        list.value = list.value.map((each) => {
            if (each.id === id) {
                switch (strategy) {
                    case "merge":
                        return {
                            ...each,
                            ...newItem,
                            id
                        };
                    case "replace":
                        return {
                            ...newItem,
                            id
                        };

                    default:
                        throw new Error("wrong strategy, please check!");
                }
            }

            return each;
        });
    };

    const reset = () => {
        list.value = [];
        id = 0;
        addItem();
    };
    addItem();

    return {
        list,
        addItem,
        subItem,
        reset,
        updateItem
    };
}
