/**
 * 通过这个hook内部暴露的函数，组件卸载的时候会自动的unsubscribe
 */
import {ref, onUnmounted} from 'vue';
import {isObservable} from 'rxjs';
// 这里visit可以设置成ref，自动追踪属性
export function useAutoUnSubscribe() {
    const subs = ref([]);
    onUnmounted(() => {
        for (const sub of subs.value) {
            sub.unsubscribe && sub.unsubscribe();
        }
    });
    return (observable, fn) => {
        if (!isObservable(observable)) {
            console.error('not a valid observable');
            return;
        }
        const sub = observable.subscribe(fn);
        subs.value.push(sub);
    };
}
