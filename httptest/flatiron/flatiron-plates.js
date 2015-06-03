/*
 * flatiron framework 예제(plates, router)
 * 
 * flatiron.union : nodejs.http와 비슷한 역할을 하는듯
 */

var http	 = require('http');
var fs		 = require('fs');

var flatiron = require('c:/Dev/language/nodejs/node_modules/flatiron');
var logger	 = require('c:/Dev/language/nodejs/node_modules/custom-logger').config({ level : 0 });
var plates	 = require('c:/Dev/language/nodejs/node_modules/plates');

/*
 * case1 - data의 key값에 해당하는 html의 id 에 값을 입력한 html을 반환
 * 		   data가 여러개일 경우에는 인자로 주어진 html을 반복하여 표시한다
 */
var html = '<tr><td id="test">1</td></tr>';
var data = [{ "test": "New Value" },{ "test": "New Value2" }];

var output = plates.bind(html, data);
console.log('case1 : '+output);
//case1 end

/*
 * case2 - html tag와 data를 mapping 시킴
 *		      아래코드를 보면 html의 class="name"을  data의 username key값과 mapping을 시키고 있음
 *		   data가 여러개일 경우에는 인자로 주어진 html을 반복하여 표시
 */
var html = '<span class="name">User</span>';

var data = [{ "username": "name1" },{ "username": "name2" },{ "username": "name3" }];
var map = plates.Map();

map.class('name').to('username'); //html의 class="name"인 tag안에 data key값이 username인 데이터를 입력하도록 수정

console.log('\ncase2 : '+plates.bind(html, data, map));
//case2 end

/*
 * case3 - html 특정부분에 값을 입력
 * 밑의 케이스의 경우 href의 값이 '/'인  부분에 새로운 값을 입력함
 * 
 * ex)<a href="#"></a> 일경우
 * where  - 태그속성의 이름부분을 지정	: map.where('href') - 태그의 href속성이 있는 위치를 지정
 * is	  - 태그속성의 값을 지정		: map.where('href').is('#') - href속성의 값이 #인 값을 지정
 * insert - 태그속성에 값을 입력시 사용	: map.where('href').is('#').insert('www.google.co.kr') - href속성이 #인 태그의 href값을 www.google.co.kr로 변경
 * use	  - 1.where-is 로 지정된 tag의 다른속성값을 지정할때 사용
 * 			ex) <img data-foo="bar" src=""></img>
 * 				{"newurl" : "http://www.nodejitsu.com"};
 * 			map.where('data-foo').is('bar').use('newurl').as('src') - data-foo의 src속성을 newurl값으로 변경
 * 
 * 			2.innerHTML
 * 			ex) <div id="test"></div>
 * 				{"newurl" : "http://www.nodejitsu.com"};
 * 				map.where('id').is('test').use('newurl') - test태그안의 값을 newurl값을 변경
 * 
 * use는 json으로 지정된 값만 사용할 수 있다
 *  
 */
//var html = '<a href="/"></a>';
var data = {"newurl" : "http://www.nodejitsu.com"};

var map = plates.Map();

map.where('id').is('test').use('newurl');

console.log('\ncase3 : '+plates.bind(html, data, map));
//case3 end

/*
 * case4 - html을 특정위치에 입력
 */
var partial = '<li class="partial"></li>';
var base = '<div><h1 class="foo"></h1><ul class="menu"></ul></div>';

var baseData = { foo: 'bar' };
var mapping = plates.Map();

mapping.class('menu').append(partial);
console.log('\ncase4 : '+plates.bind(base, baseData, mapping));
//case4 end

/*
 * case5 - 데이터를 가지고 테이블에서 리스트를 구성
 */
var file_html = fs.readFileSync('list.html','utf-8');

var temp_data_val = [{ "name": "name1", "region" : "region1" },{ "name": "name2", "region" : "region2" },{ "name": "name3", "region" : "region3" }]; //실 데이터
var temp_data = {"data_row" : temp_data_val}; //실데이터를 한번더 wrapping 함

/*
 * plates map에 실 데이터 - 데이터가 입력될 html mapping
 * 여기서 왜 wrapping을 수행하냐면 그냥 name,region을 mapping 시키게 되면 데이터가 5개일 경우 행은 늘어나지 않고 같은 행 위치에 계속 데이터가 mapping되게 되어 
 * 마지막 값만 1개행에 표시가 되게 된다.
 * 
 * 행도 data개수만큼 생성하기 위해 wrapping을 하고 wrapping한 data key값을 mapping을 시키게 된다
 */
var map = plates.Map();
map.where('id').is('data_row').to('data_row'); //테이블에서 반복될부분에 지정한 id와 실 데이터를 wrapping한 데이터를 mapping
map.where('id').is('name').to('name'); //데이터를 입력할 id에 json데이터 key값 mapping
map.where('id').is('region').to('region'); //데이터를 입력한 id에 json데이터  key값 mapping

logger.info('\ncase5 : '+plates.bind(file_html, temp_data, map));
//case5 end

