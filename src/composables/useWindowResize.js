import { ref } from 'vue';
import { useEventListener } from './useEventListener';

export function useWindowResize() {
	let timeoutId = null;
	const delay = 250;
	const width = ref(0);
	const height = ref(0);
	useEventListener(window, 'resize', () => {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => {
			width.value = window.innerWidth;
			height.value = window.innerHeight;
		}, delay);
	});
	return { width, height };
}
