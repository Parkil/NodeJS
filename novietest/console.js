/**
 * New node file
 */

/*
 * 호출되는 파일명과 경로 표시
 */
console.log("filename : ", __filename);
console.log("dirname : ",__dirname);

/*
 * 로직 실행시간 측정
 */
console.time('timechk');

var cnt = 0;

for(var i = 0 ; i<=100000 ; i++) {
	cnt += i;
}

console.log("sum : ",cnt);
console.timeEnd('timechk');