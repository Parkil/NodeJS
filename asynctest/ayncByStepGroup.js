/**
 * http://usejsdoc.org/
 */
var fs = require('fs');
var step = require('c:/Dev/nodejs/node_modules/step');

var files;
var _dir = 'd:/new/';

try{
	step(
		function readDir() {
			fs.readdir(_dir, this);
		},
		function readFile(err, results) {
			if(err) {
				throw err;
			}
			
			files = results;
			var group = this.group();
			results.forEach(function(name) {
				fs.readFile(_dir + name, 'utf8', group()); //group()으로 callback을 입력하게되면 해당 함수 실행결과가 다음 함수인자로 넘어간다.
			});
		},
		function writeAll(err, data) {
			if(err) {
				throw err;
			}
			for(var i = 0 ; i < files.length ; i++) {
				var adjData = data[i].replace(/after/g, 'before');
				fs.writeFile(_dir+files[i], adjData, 'utf8', this);
			}
		}
	);
}catch(err) {
	console.log(err.stack);
}