import { nextTick, ref, onMounted } from "vue";

export function useScroll(getRef) {
    const scrollElem = ref(null);

    onMounted(() => {
        scrollElem.value = getRef();
    });

    return {
        scrollToPosition(position) {
            nextTick(() => {
                scrollElem.value.scrollTo({
                    top: position,
                });
            });
        },
        getScrollPosition() {
            return scrollElem.value.scrollTop;
        }
    }

}
