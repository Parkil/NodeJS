var http	 = require('http');

var flatiron = require('c:/Dev/language/nodejs/node_modules/flatiron');
var app		 = flatiron.app;

var winston = require('c:/Dev/language/nodejs/node_modules/winston');

app.use(flatiron.plugins.http, {
	// HTTP options
});

app.use(flatiron.plugins.log); //flatiron log를 사용

//winston log를 파일로 저장 - flatiron.plugins.log가 winston이라고는 하는데 flatiron.plugins.log는 파일로저장이 안됨
winston.add(winston.transports.File, { filename: 'somefile.log' });

/*
 * flatiron.app이 broadway(custom plugin 제작 API)를 상속받고 있기 때문에 아래와 같이 
 * broadway를 따로 선언하지 않고 커스텀 플러그인을 제작하는 게 가능
 */
var customPlugin = {
	name : 'custom-plugin',
	attach : function(options) { //plugin이 app.use로 사용되었을때
		winston.info('plugin attached',{aaa : 'bbb'}); //추가 정보를 입력하고 싶을때 {}로 추가정보를 입력
	},
	init : function() {
		winston.debug('plugin init');
	}
};

app.use(customPlugin);

app.listen(9000);