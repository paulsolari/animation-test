import { ref, nextTick } from 'vue';
import { useEventListener } from './useEventListener';

export function useMediaQuery(mediaQuery) {
	const mediaQueryList = window.matchMedia(mediaQuery);
	const matches = ref(false);
	nextTick(() => {
		matches.value = mediaQueryList.matches ? true : false;
	});
	useEventListener(mediaQueryList, 'change', () => {
		matches.value = mediaQueryList.matches ? true : false;
	});
	return matches;
}
