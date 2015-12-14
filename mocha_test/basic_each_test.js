var assert = require("assert");

/*
 * beforeEach,afterEach 테스트
 * 
 * 
 */
describe('Array', function() {
	/*
	 * beforeEach/afterEach는 describe내의 it이 실행될때마다 작동되며 중첩된 describe의 경우 외부 describe는 it을 가지고 있지 않아도 
	 * 내부 describe가 it을 가진경우 그 회수만큼 beforeEach/afterEach가 실행된다. 
	 * 
	 * 중첩된 경우 실행순서
	 * 외부 beforeEach -> 내부 beforeEach -> 내부 afterEach -> 외부 afterEach
	 */
	beforeEach(function() {
		console.log('Array beforeEach');
	});
	
	afterEach(function() {
		console.log('Array afterEach');
	});
	
	describe('#indexOf', function() {
		beforeEach(function() {
			console.log('indexOf beforeEach');
		});
		
		afterEach(function() {
			console.log('indexOf afterEach');
		});
		
		it('should return -1 when value is not present', function() {
			assert.equal(-1,[1,2,3].indexOf(5));
		});
		
		it('should return 1 when value is present', function() {
			assert.equal([1,2,3].indexOf(2), 1, 'message');
		});
	});
	
	/*
	 * deep equal 테스트 배열이나 json객체 내부의값을 직접비교하여 true,false를 반환한다.
	 */
	describe('deep equal', function() {
		it('array deep equal', function() { //function(done)으로 지정하면 done이란 이름의 callback함수를 호출하도록 지정하는 것임 
			assert.deepEqual({a:1}, {a:1}, '두개의 배열의 내용이 서로 다름');
		})
	});
})
