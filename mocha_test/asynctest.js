var assert = require("assert");


function doaSync() {
	assert.notDeepEqual({a:1}, {a:1}, '2개의 배열내용이 동일함');
}

/*
 * 비동기적으로 수행되는 테스트 케이스
 */
describe('async test', function() {
	
	/*
	 * 기본 비동기 수행 
	 * function(done)으로 지정하고 테스트 케이스 내부에서 done();을 호출
	 */
	it('basic async',function(done) {
		assert.deepEqual({a:1}, {a:1}, '2개의 배열내용이 서로 다름');
		done();
	});
	
	/*
	 * 함수를 호출하고 에러 발생시 done callback함수에 에러 값을 전달하는 방법
	 * 아래 방법은 정상작동시에는 timeout에러가 발생하는 문제가 있다.
	 */
	it('async custom function error', function(done) {
		doaSync(function(err){
			done(err);
		});
	});
	
	
	/*
	 * 함수를 호출하고 인자로 바로 done callback함수를 전달하는 방법
	 * 단 이방법은 반환값을 체크한다거나 하지는 못하는 단점이 있다.
	 */
	it('async custom function', function(done) {
		this.timeout(500); //해당 테스트 케이스 timeout 지정
		doaSync(done);
	});
});