/**
 * http://usejsdoc.org/
 * async 라이브러리를 이용한 비동기처리 
 */
var fs = require('fs');
var async = require('c:/Dev/nodejs/node_modules/async');

try {
	async.waterfall([ //waterfall은 함수를 작성한 순서대로 위->아래로 움직인다.
		function readData1(callback) {
			fs.readFile('./apples2.txt', 'utf8', function(err, data) {
				console.log('1', data);
				callback(err, data);
			});
		},
		
		function readData2(prev_data, callback) { //첫번째 인자에는 전함수의 실행값이 들어오고 2번째 인자에서 callback이 들어온다 주의
			fs.readFile('./orange.txt', 'utf8', function(err, data) {
				console.log('2', data);
				callback(err, data);
			});
		},
		
		function readData3(prev_data, callback) {
			console.log(prev_data, callback);
			fs.readFile('./orange.txt', 'utf8', function(err, data) {
				console.log('3', data);
				callback(err, data); 
			});
		}
		],
		function(err, result) {
			console.log('result', result);
			if(err) {
				throw err;
			}
		}
	);
}catch(err) {
	console.log('outer',err.stack);
}