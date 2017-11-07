/**
 * http://usejsdoc.org/
 */

var fs = require('fs');

try {
	fs.readFile('./apples22.txt', 'utf8', function(err, data) {
		try {
			if(err) {
				throw err;
			}
			
			var adjData = data.replace(/[A|a]pple/g, 'orange');
			
			fs.writeFile('./orange.txt', adjData, function(err) {
				if(err) {
					throw err;
				}
			});
		}catch(err) {
			console.log('11111111',err.stack);
		}
	});
}catch(err) {
	console.log('11111');
	console.log(err.stack);
}