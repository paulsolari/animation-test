import { onMounted, onUnmounted, isRef, unref, watch } from 'vue';

export function useEventListener(target, event, callback) {
	if (isRef(target)) {
		watch(target, (value, oldValue) => {
			console.log(target);
			oldValue?.removeEventListener(event, callback);
			value?.addEventListener(event, callback);
		});
	} else {
		onMounted(() => {
			target.addEventListener(event, callback);
		});
	}
	onUnmounted(() => {
		unref(target)?.removeEventListener(event, callback);
	});
}
