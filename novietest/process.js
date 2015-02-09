/**
 * New node file
 */

process.argv.forEach(function (item,index) {
	//인자로 들어온 인수 표시 0~2까지는 입력한 인자가 없어도 표시된다.
	console.log("%d : %s : %s",index, typeof(item), item);
	
	//인자가 exit일경우 다음 인자를 읽어들여 인자의 시간만큼 정지후 exit를 수행한다.
	//isNaN : 변수가 NaN(Not a Number)인지 확인 일반 자바스크립트용 함수
	if(item === '--exit') {
		var temp = Number(process.argv[index+1]);
		var exitTime = isNaN(temp) ? 0 : temp;
		
		console.log("exitTime : ",exitTime);
		
		setTimeout(function() {
			process.exit();
		}, exitTime);
	}
});
