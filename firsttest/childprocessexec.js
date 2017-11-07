/**
 * child process를 이용하여 파일을 실행하는 예제
 * 
 * exec - shell에서 명령어 실행
 * execFile - shell에서 특정 실행파일 구동
 * 
 * 2개다 shell기반에서 작동하기 때문에 windows에서는 제대로 작동이 되지 않을 수 있다.
 */

var execfile = require('child_process').execFile;

var exec = execfile('cmd', function(error, stdout, stderr) {
	if(error === null) {
		console.log(stdout);
	}
});


