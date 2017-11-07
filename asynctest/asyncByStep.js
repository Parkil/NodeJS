/**
 * http://usejsdoc.org/
 * step 라이브러리를 이용하여 비동기 처리를 순차적으로 실행하는 예제
 */

var fs = require('fs');
var step = require('c:/Dev/nodejs/node_modules/step');

try {
	step(
		function readData1() {
			var aaa = fs.readFile('./apples2.txt', 'utf8', this); //fs.readFile이 동기함수이기때문에 readFile실행후 readData2로 넘어가기 위해서 callback함수대신 this를 입력한다.
			console.log('first',aaa);
		},
		
		function readData2() {
			var bbb = fs.readFile('./orange.txt', 'utf8', this);
			console.log('second',bbb);
		}
	);
}catch(err) {
	console.log(err);
}