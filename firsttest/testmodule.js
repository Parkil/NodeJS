/**
 * 테스트 모듈
 */

var globalValue;

exports.setGlobal = function(val) {
	globalValue = val;
}

exports.returnGlobal = function() {
	console.log(globalValue);
	return globalValue;
}
