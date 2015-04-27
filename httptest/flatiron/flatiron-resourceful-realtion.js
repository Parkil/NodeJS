/**
 * flatiron에서 여러개의 resourceful을 관계를 맺는 예제
 */


var resource = require('c:/Dev/language/nodejs/node_modules/resourceful');
resource.use('memory'); //메모리에 저장

//callback 함수 정의
function createChild(data, err, parent) {
	console.log(arguments); //함수의 파라메터를 표시
	parent.createCategory(data, function(err,data) {
		console.log('child data : '+data);
	});
} 

function getResource(err, resource) {
	console.log('get data : '+resource);
}
//callback 함수 정의 끝

/*
 * resource 정의 및 상위 resource 지정
 * 정의 시 제일 앞의 문자를 대문자로 쓰던 안쓰던간에 제일 앞의 문자는 대문자로 지정된다.
 * ex) resource.define('zzz') -> resource명 : Zzz
 * 
 * 상위 resource를 지정하게 되면 create+Resource명 함수로 하위 resource를 생성할 수 있다.
 * ex) var zzz = resource.define('zzz'); zzz.parent('zzz'); -> createZzz() 함수로 하위 resource생성가능 
 * 
 * 하위 resource를 검색하는 함수는 define에서 지정한 resource명이 영단어일때는 복수형으로 특정문자열일 경우에는 resource명+'s'가 된다.
 * ex) resource 명 category -> categories
 *	   resource 명 zzz	   -> zzzs
 *  
 */
var category = resource.define('category'); 
category.parent('category');

/*
 * callback함수에 파라메터를 전달하고자 할 경우에는 bind 함수를 이용한다. 
 * bind(context, args1, args2.......)
 * context : 파라메터를 다른 함수에 전달하고 싶을 때 사용한다고 함 보통은 this로 처리
 * args... : 전달하고자하는 파라메터 입력
 * 
 * 주의할점은 외부 api에서 이미 정의된 callback함수에 파라메터를 입력할때는 입력한 파라메터가 제일 앞에 입력되고
 * 기존에 정의된 callback 파라메터는 뒤로 밀리게 된다.
 * 
 * ex)
 * callback함수 정의 가 callback(param1,param2)일 경우
 * callback.bind(this, 'param3');를 수행하면
 * 파라메터 순서는 param3,param1,param2순이 된다.
 * 
 */
category.create({ id : 'music'}, createChild.bind(this, {id : 'hip-hop'}));

category.get('music', getResource);

/*
 * 하위 resource를 생성하게 되면 id는 resource명/상위 resource id.../자기 자신 id가 된다.
 * 
 * ex) category resource를 생성하고 id가 music인  resource를 생성후 music아래에 rap이란 resource를 생성했을때
 * category/music/rap
 */
category.get('music', createChild.bind(this, {id : 'rap'}));

//자식 데이터 불러오기
category.get('music', function(err, data) {
	
	/*
	 * categories 함수를 이용하면 해당 resource의 하위 resource를 가져올 수 있다.
	 * categories 함수는 반드시 get으로 기준 resource를 가져온 다음에 사용해야 한다.
	 * 단독으로 호출하게 되면 has no method 'keys' 에러가 발생
	 */
	data.categories(function(err, result){
		console.log('music', err, result); //하위 resource전체를 반환
		console.log('detail', result[0]); //배열 index로 resource를 가져오는 것도 가능
		
		//하위 resource를 get이나 find를 이용하여 검색할 경우는 반드시 categories callback함수 내에서 실행을 해야 데이터가 추출됨
		category.get('category/music/rap', function(err,data) {
			console.log('test',data);
		});
		
		category.find({id : 'category/music/rap'}, function(err,data) {
			console.log('test2',data);
		});
	});
});
