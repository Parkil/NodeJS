/**
 * connect 미들웨어에서 사용할 사용자 정의 모듈
 */

var fs = require('fs');

module.exports = function customHandler(path, missing_msg, directory_msg) {
	if(arguments.length < 3) throw new Error('missing parameter in customHandler');
	
	return function customHandler(req, res, next) {
		var pathname = path+ req.url;
		console.log('pathname',pathname);
		
		fs.stat(pathname, function(err, stats) {
			if(err) {
				res.writeHead(404);
				res.write(missing_msg);
				res.end();
			}else if(!stats.isFile()) {
				res.writeHead(403);
				res.write(directory_msg);
				res.end();
			}else {
				next(); //사용자 정의모듈에서 처리할수 없는 경우 다음 connect 미들웨어가 처리하도록 next()를 호출
			}
		});
	}
}