/**
 * zombie 브라우저 기본작동 테스트
 */

var assert = require('assert');
var zombie = require('c:/Dev/language/nodejs/node_modules/zombie');

describe('zombie call test',function() {
	
	it('google call', function(done) {
		var browser = new zombie();
		
		var url = 'https://www.google.co.kr';
		
		browser.debug(); //코드내에서 zombie를 debug모드로 실행
		/*
		 * zomibe 브라우저 객체 생성후 페이지가 정상적으로 로드되었는지 확인
		 */
		browser.visit(url, function() {
			assert.ok(browser.success, 'page loaded');
			done();
		});
		
		//페이지 로딩이 끝난후에 콜백함수를 실행한다.
		browser.wait(function() {
			console.log('page loading complete');
		});
	});
	
	
	/*
	 * it 내부에서 zombie visit을 이용하여 콜백 error객체를 받으면 에러가 발생할 경우(404 나 그외)
	 * 해당 로직이 실행이 되지 않는것으로 보임 이부분은 추가적인 확인이 필요
	 * 
	 * 추가로 zombie를 debug 모드로 실행하려면 SET DEBUG=zombie를 커맨드창에서 실행
	 */
	it('http://localhost:10010 call', function(done) {
		var browser = new zombie();
		
		var url2 = 'http://localhost:10010';
		
		browser.visit(url2, function(err) {
			console.log('err : '+err);
			if(!err) { //err 객체가 undefined면 false를 반환함
				console.log('not error');
			}else {
				console.log('error');
			}
			assert.ok(browser.success, 'page loaded');
			done();
		});
		
		browser.wait(function() {
			console.log('http://localhost:10010 loading complete');
		});
	});
});