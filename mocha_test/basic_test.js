/**
 * mocha 기본 테스트
 * 여기서는 zombie와 연계하지 않은 기본 테스트 케이스만 작성
 * 
 * 2015-11-23 현재 eclipse 내에서 mocha를 실행하는 방법은 찾지 못하였으며
 * c:\Dev\language\nodejs\node_modules\.bin\ 에 있는 mocha를 다음과 같이 실행하는 방법으로 일단 테스트를 진행하기로 함
 * 
 * mocha [js 파일 경로]
 */

var assert = require("assert");

/*
 * before는 해당 로직이 실행하기전에 ,after는 해당로직이 실행된 후에 실행된다 
 * 아래 코드와 같이 describe안에서 실행할 수 도 있고 아예 코드 밖에서 실행할 수도 있다.
 */
describe('Array', function() {
	before(function runBefore() {
		console.log('- Array before');
	});
	
	after(function runAfter(){
		console.log('- Array After');
	});
	describe('#indexOf', function() {
		before(function runBefore() {
			console.log('- indexOf Before');
		});
		
		it('should return -1 when value is not present', function() {
			assert.equal(1,2);
			assert.equal([1,2,3].indexOf(5), -1, 'message');
		});
		
		after(function runAfter() {
			console.log('- indexOf After');
		});
	});
})

after(function() {
	console.log('total after');
});
