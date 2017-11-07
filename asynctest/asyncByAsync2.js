/**
 * http://usejsdoc.org/
 * async 라이브러리를 이용한 비동기처리 + loop
 */
var fs = require('fs');
var async = require('c:/Dev/nodejs/node_modules/async');

var _dir = 'd:/new/';

try {
	async.waterfall([ //waterfall은 함수를 작성한 순서대로 위->아래로 움직인다.
			function readDir(callback) {
				fs.readdir(_dir, function(err, files) {
					callback(err, files);
				});
			},
			function loopFiles(files, callback) {
				files.forEach(function(name) {
					callback(null, name);
				});
			}/*,
			function checkFile(file, callback) {
				fs.stat(_dir+file, function(err, stats) {
					callback(err, stats, file);
				});
			},
			function readData(stats, file, callback) {
				if(stats.isFile()) {
					fs.readFile(_dir+file, 'utf8', function(err, data) {
						callback(err, file, data);
					});
				}
			},
			function modify(file, text, callback) {
				var adjData = text.replace(/before/g, 'after');
				callback(null, file, adjData);
			},
			function writeAll(file, text, callback) {
				fs.writeFile(_dir+file, text, 'utf8', function(err) {
					callback(err, file);
				});
			}*/
		],
		function(err, result) {
			if(err) {
				throw err;
			}
		}
	);
}catch(err) {
	console.log('outer',err.stack);
}