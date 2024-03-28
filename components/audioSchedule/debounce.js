//防抖
let timeout = null;
export function debounce(func, times = 500, immediate = false) {
	if (timeout !== null) clearTimeout(timeout);
	if (immediate) {
		var callNow = !timeout;
		timeout = setTimeout(function() {
			timeout = null;
		}, times);
		if (callNow) typeof func === 'function' && func();
	} else {
		timeout = setTimeout(function() {
			typeof func === 'function' && func();
		}, times);
	}
}
