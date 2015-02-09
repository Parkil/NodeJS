/**
 * 외부 에서 Import를 해서 쓰기 위한 함수
 */
exports.abs = function(number) {
	if(0 < number) {
		return number;
	}else {
		return -number;
	}
};

exports.circleArea = function(radius) {
	return radius * radius * Math.PI;
};