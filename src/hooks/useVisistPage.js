/**
 * 这个hook主要是用于判读用户是否访问了某个页面
 */
import { computed, onMounted, isRef, onUnmounted } from "vue";
// 这里visit可以设置成ref，自动追踪属性
export default function (pageKey, stayDuration = 0) {
    const localKey = computed(() => {
        const key = isRef(pageKey) ? pageKey.value : pageKey;
        return key + "_is_visit";
    });
    let timeoutId = -1;

    onMounted(() => {
        const key = localKey.value;
        timeoutId = setTimeout(() => {
            window.localStorage.setItem(key, "true");
        }, stayDuration);
    });

    onUnmounted(() => {
        if (timeoutId !== -1) {
            window.clearTimeout(timeoutId);
        }
    });

    const isVisit = JSON.parse(window.localStorage.getItem(localKey.value));
    if (isVisit === null) {
        return false;
    }
    return isVisit;
}
