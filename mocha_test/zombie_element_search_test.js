/**
 * Zombie 
 */
var assert = require('assert');
var zombie = require('c:/Dev/language/nodejs/node_modules/zombie');
var fixture = require('./fixture.json'); //json 형식으로된 데이터를 require를 통해 가져올수 있다.
var browser = null;

describe('element search', function(){
	before(function() {
		browser = new zombie();
		browser.debug(); //디버깅 메시지 표시
	});
	
	/*
	 * 만약 동기(done을 지정하지 않고 done();을 호출하지 않을 경우)로 테스트가 진행되면 테스트내부의 console.log이나 기타로직은 전혀 작동을
	 * 하지 않는다. 주의할것 
	 */
	it('login page', function(done) {
		browser.visit('http://localhost:10010', function() {
			assert.ok(browser.success, 'page loaded');
			var form = browser.query('form');
			
			assert(form,'form not exists'); //form tag가 존재하는지 확인
			
			assert.equal('POST', form.method, 'this form action is not POST');
			assert.equal('/j_spring_security_check', form.action, 'form action not matched');
			
			/*
			 * browser.query 명령을 이용하여 해당 element를 가져올 수 있다. 가져오는 명령어는 selenium과 거의 동일함(jQuery 명령어 생각하면됨)
			 */
			assert(browser.query('#id', form), 'id[id] inputbox not exists');
			assert(browser.query('#pw', form), 'id[pw] inputbox not exists');
			assert(browser.query('input[type=submit]', form),'submit not exists');
			assert.equal('Login',browser.text('h1', form),'submit not exists'); //해당 tag안의 내용을 반환한다. innerHTML이라고 보면 된다.
			done();
		});
		
		//아래 로직은 비동기로 테스트가 진행될 경우에만 실행된다.
		browser.wait(function() {
			console.log('page loading complete');
		});
	});
	
	it('button push test', function(done) {
		/*
		 * pressButton은 해당 웹 element에 따라서 다른 반응을 보이는데
		 * input type button인 경우 : 해당 버튼 클릭
		 * a tag인 경우 : href안에 들어있는 url로 이동
		 * 
		 * <a href='javascript:fun()'></a>처럼 href안에 javascript소스를 넣을 경우 문제가 되는데 이 경우 http://~/fun으로 url이 이동되기 때문에
		 * 404에러가 발생한다.
		 */
		browser.visit('http://localhost:10010', function() {
			browser.pressButton('#click', function() {
				console.log('버튼 클릭');
				done();
			});
		});
	});
	
	it('login', function(done) {
		
		//zombie.localhost('http://localhost', 10022); //url 호출시 prefix설정 단 http://localhost:8080 같이 port가 뒤에 붙는 경우는 prefix가 잘 설정되지 않는 문제가 있음
		browser.visit('http://localhost:10010', function(){
			browser
				.fill('#id','user')
				.fill('#pw','user')
				.pressButton('input[type=submit]', function() {
					console.log('current url : '+browser.location._url); //현재 브라우저의 url
					console.log('stausCode : '+browser.statusCode); //html staus code(404,500......)
					//browser.assert.url('http://localhost:10010/login.do?fail=true');//현재 브라우저의 url이 입력한 url과 같은지 검증
					browser.assert.url('http://localhost:10010/sample/egovSampleList.do');
					
					//위처럼 pressButton을 이용할 경우 버튼을 눌러서 페이지가 변경되는 경우 해당 페이지가 loading이 끝날때까지 기다렸다가 callback을 수행하는것으로 보임
					//var sss = browser.query('#error_msg');
					//console.log(sss.innerHTML);
					
					done();
				});
		});
	});
	
	it('list check', function(done) {
		browser.visit('http://localhost:10010/sample/egovSampleList.do', function() {
			assert.ok(browser.success, 'page loading complete');
			console.log('list check : '+browser.location._url);
			
			assert.equal(browser.query('title').innerHTML, 'Basic Board List', 'title is not list title'); //title tag안에 들어 있는 값 체크
			
			var a = browser.query('.btn_blue_l a');
			
			/*
			 * a tag에 href=javascript: ~ 로 바로 javascript 코드를 실행하기 보다 다음과 같이 표준을 지켜서 코딩을 하는게 좋다.
			 * <a href="<c:url value='/sample/egovSampleList.do'/>" onclick="fn_egov_selectList(this.href)">링크</a>
			 * 
			 * href에는 해당 링크에서 사용할 url을 적고 onclick에서 해당 url을 이용하도록 조치한다.
			 */
			browser.pressButton(a, function() {
				console.log('검색버튼 클릭');
			});
			
			done();
			/*
			console.log(browser.query('table tr').innerHTML); //tag안의 html 검색
			console.log(browser.text('table tr')); //해당 tag안의 택스트값만 검색(table의 전체 tr값을 검색)
			
			var list = browser.queryAll('table tr'); //해당되는 데이터를 전체  검색(만약 여러건이 존재하는 tag를 browser.query로 검색하면 처음 1건만 가져온다)
			
			for(var i in list) {
				var arr = browser.text(list[i]).split(' '); //해당건처럼 browser.query로 검색된값을 다시 browser.text로 검색하는것도 가능하다.
				
				for(var j in arr) {
					console.log(arr[j]);
				}
			}
			*/
		});
	});
});
