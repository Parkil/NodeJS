/**
 * 테스트 모듈을 읽어들이는 예제
 */

var test = require('./testmodule.js');

test.setGlobal('test');
var val = test.returnGlobal();
console.log('12345 : '+val);
console.log(test);

