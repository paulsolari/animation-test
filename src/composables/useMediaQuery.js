import { ref, nextTick } from 'vue';
import { useEventListener } from './useEventListener';

export function useMediaQuery(mediaQuery) {
	const mediaQueryList = window.matchMedia(mediaQuery);
	const matches = ref(null);
	nextTick(() => {
		matches.value = mediaQueryList.matches ? true : false;
	});
	useEventListener(mediaQueryList, 'change', () => {
		matches.value = mediaQueryList.matches ? true : false;
	});
	return matches;
}
