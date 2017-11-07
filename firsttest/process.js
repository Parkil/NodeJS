//process 객체의 속성표시
console.log(process.execPath);
console.log(process.version);
console.log(process.platform);
console.log(process.memoryUsage());

/*
var buf = new Buffer('12345', 'utf8');
console.log(Buffer);
buf.write('6 7 8 9 10 11 12');
console.log(buf);
*/
/*
 * process의 Stdin(input), Stdout(output)설정
 * Stdin은 기본적으로 disable되어 있으므로 stdin.resume()을 통해 활성화를 시켜 주어야 한다.
 */
/**/
process.stdin.resume();
process.stdin.on('data', function(chunk) {
	process.stdout.write('data : '+chunk);
});
