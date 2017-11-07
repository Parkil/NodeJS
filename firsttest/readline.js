/**
 * readline 예제
 */

var readline = require('readline');

var interface = readline.createInterface(process.stdin, process.stdout, null);

//특정 문자열을 프롬프트에 추가
interface.question('>>aaaaa', function(answer) {
	console.log('answer : '+answer);
	interface.setPrompt('>>');
	interface.prompt();
});

function closeInterface() {
	console.log('process exit');
	process.exit();
}

//일반적인 라인 입력 이벤트
interface.on('line', function(cmd) {
	if(cmd.trim() == '.leave') {
		closeInterface();
		return;
	}else {
		console.log('repeat command : '+cmd);
	}
	interface.setPrompt('>>');
	interface.prompt();
});

interface.on('close', function() {
	closeInterface();
});