// 定义的全局过滤器

/**
 * 处理价格、人数等数量
 * @param val 传入的值
 * @param format 格式类型
 * @param min 最小值
 * @param max 最大值
 * @return {String}
 */
export let showNumber = function(val, obj) {
	
	let { format, min, max } = obj;
	
	if (format === 'range') {
		if (min === undefined && max === undefined) return val;
		if (max === undefined) return val < min ? '<' + min : val;
		return val < min ? '<' + min : val > max ? '+' + max : val;
	}else if (format === 'scale' || format === 'scale_zh') {
		
		if (val < 1000) return val;
		else if (val < 10000) return Math.floor(val / 100) / 10 + (format === 'scale_zh' ? '千' : 'k');
		else if (val < 100000000) return Math.floor(val / 1000) / 10 + (format === 'scale_zh' ? '万' : 'w');
		else return format === 'scale_zh' ? '超过9999.9万' : '9999.9w+';
		
	}else if (format === 'thousandth') return (val * 1).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');


}

/**
 * 价格保留小数
 * @param val 传入的值
 * @param count 最小值
 * @return {String}
 */
export let toFixed = function(val, count) {

	if (count <= 0) return val;
	return (val * 1 || 0).toFixed(count * 1 || 1);

}

/**
 * 格式化时间
 * @param time 传入的时间(string || object)
 * @param type 类型
 * @return {String}
 */
export let formatDate = function(time, type) {

	if (typeof time === "string" && time.indexOf('-') > -1) time = time.replace(/-/g, '/');

	let date = new Date(time);
	let week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
	let timeObj = {
		year: date.getFullYear(),
		month: date.getMonth() + 1,
		day: date.getDate(),
		hour: date.getHours(),
		minute: date.getMinutes(),
		second: date.getSeconds(),
		weekStr: week[date.getDay()]
	}

	let str = {
		str1: timeObj.year + '-' + (timeObj.month < 10 ? '0' + timeObj.month : timeObj.month) + '-' + (timeObj.day < 10 ?
			'0' + timeObj.day : timeObj.day) + ' ' + (timeObj.hour < 10 ? '0' + timeObj.hour : timeObj.hour) + ':' + (timeObj
			.minute < 10 ? '0' + timeObj.minute : timeObj.minute) + ':' + (timeObj.second < 10 ? '0' + timeObj.second :
			timeObj.second),
		str2: (timeObj.year + '').slice(-2) + '/' + (timeObj.month < 10 ? '0' + timeObj.month : timeObj.month) + '/' + (
				timeObj.day < 10 ? '0' + timeObj.day : timeObj.day) + ' ' + (timeObj.hour < 10 ? '0' + timeObj.hour : timeObj.hour) +
			':' + (timeObj.minute < 10 ? '0' + timeObj.minute : timeObj.minute),
		str3: (timeObj.month < 10 ? '0' + timeObj.month : timeObj.month) + '/' + (timeObj.day < 10 ? '0' + timeObj.day :
			timeObj.day) + ' ' + (timeObj.hour < 10 ? '0' + timeObj.hour : timeObj.hour) + ':' + (timeObj.minute < 10 ? '0' +
			timeObj.minute : timeObj.minute),
		str4: (timeObj.month < 10 ? '0' + timeObj.month : timeObj.month) + '/' + (timeObj.day < 10 ? '0' + timeObj.day :
			timeObj.day),
		str5: timeObj.year + '.' + (timeObj.month < 10 ? '0' + timeObj.month : timeObj.month) + '.' + (timeObj.day < 10 ?
			'0' + timeObj.day : timeObj.day) + ' ' + (timeObj.hour < 10 ? '0' + timeObj.hour : timeObj.hour) + ':' + (timeObj
			.minute < 10 ? '0' + timeObj.minute : timeObj.minute)
	}

	if (!type) return null;
	return str['str' + type];

}
