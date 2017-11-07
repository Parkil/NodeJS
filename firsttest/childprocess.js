/**
 * 자식프로세스를 이용하여 운영체제명령어를 실행하는 예제
 * 
 * 주의 : windows의 경우 dos 명령어를 실행하는 것이 아닌 내부 프로그램을 실행하는것을 유의할것
 * unix/linux의 경우 command 기반으로 실행되면 바로 명령어를 수행 가능
 */

var spawn = require('child_process').spawn;

//var cmd = spawn('cmd',['/c','dir/w']); //파일 실행후 인자를 넣어서 shell 명령어를 실행하는 방법(앞의 /c는 고정이고 뒤에 명령어가 들어간다 1개씩만 작동함)
var cmd = spawn('cmd');

//정상 작동시 메시지를 출력
cmd.stdout.on('data', function(data) {
	console.log('stdout : '+data);
	
	/*
	//메시지 출력후 shell에서 특정명령어 실행
	var exec = require('child_process').exec;

	exec('dir', function(error, stdout, stderr) {
		if(error === null) {
			console.log(stdout.toString('euc-kr'));
		}
	});
	
	exec('dir/w', function(error, stdout, stderr) {
		if(error === null) {
			console.log(stdout.toString('euc-kr'));
		}
	});
	*/
});

//에러발생시 메시지를 출력
cmd.stderr.on('data', function(data) {
	console.log('stderr : '+data);
});

//종료시 메시지를 출력
cmd.on('exit', function(code) {
	console.log('child process exited with code : '+code);
});

