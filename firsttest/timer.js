/**
 * 타이머 예제
 * 
 * 기본적으로 javascript에서 사용하는 타이머와 동일
 * (javascript 타이머와 동일하게 반드시 지정된 시간후에 반복된다는 보장은 없음)
 */

function test(param1, param2) {
	console.log(param1,param2);
}

setTimeout(test, 2000, 'param1', 'param2');
