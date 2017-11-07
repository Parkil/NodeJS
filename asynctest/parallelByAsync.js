/**
 * http://usejsdoc.org/
 */

var fs = require('fs');
var async = require('c:/Dev/nodejs/node_modules/async');

//병렬로 실행하기 때문에 실행순서에는 변동이 있을수 있다.
try {
	async.parallel({
		data1 : function(callback) {
			fs.readFile('apples2.txt', 'utf8', function(err, data) {
				callback(err, data);
			});
		},
		data2 : function(callback) {
			fs.readFile('grape.txt', 'utf8', function(err, data) {
				callback(err, data);
			});
		},
		data3 : function(callback) {
			fs.readFile('orange.txt', 'utf8', function(err, data) {
				callback(err, data);
			});
		},
	}, function(err, result) {
		if(err) throw err;
		console.log(result);
	});
}catch(err) {
	console.log(err);
}