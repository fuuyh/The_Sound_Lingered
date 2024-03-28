export const versionCompare = (curV, reqV, isEqule = false) => {
	if (curV && reqV) {
		//将两个版本号拆成数字
		let arr1 = curV.split('.'),
			arr2 = reqV.split('.');
		let minLength = Math.min(arr1.length, arr2.length),
			position = 0,
			diff = 0;
		while (position < minLength && ((diff = parseInt(arr1[position]) - parseInt(arr2[position])) == 0)) {
			position++;
		}
		diff = (diff != 0) ? diff : (arr1.length - arr2.length);
		if (isEqule) {
			console.log('diff>=0;', diff)
			return diff >= 0;
		} else {
			return diff > 0;
		}
	} else {
		return false;
	}
}
export const formatTime = (time) => {
	if (typeof time !== "number" || time < 0) {
		return "00:00";
	}
	const hour = parseInt(time / 3600);
	time = time % 3600;
	const minute = parseInt(time / 60);
	time = time % 60;
	const second = time;
	let list = [minute, second];
	if (hour > 1) {
		list.unshift(hour);
	}
	return list
		.map(function(n) {
			n = n.toString();
			return n[1] ? n : "0" + n;
		})
		.join(":");
};

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