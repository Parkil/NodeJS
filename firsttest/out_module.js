/**
 * 외부 모듈 테스트
 */
var _ = require('c:/Dev/nodejs/node_modules/underscore/underscore'); //jquery같은 javascript확장을 담당하는 외부 모듈
//console.log(_);
var aaa = {};
aaa.a = '1';
aaa.b = '2';


_.each(aaa,function(data) {
	console.log(data);
});




//var optimist = require('optimist');//명령어 옵션파싱때 사용하는 외부 모듈

//log에 색을 적용하는 모듈(이클립스 console창에서는 적용되지 않음)
/*
var color = require('c:/Dev/nodejs/node_modules/colors/lib/index');
//var color = require('../lib/index');
console.log("First some yellow text".yellow);

console.log("Underline that text".yellow.underline);

console.log("Make it bold and red".red.bold);

console.log(("Double Raindows All Day Long").rainbow)

console.log("Drop the bass".trap)

console.log("DROP THE RAINBOW BASS".trap.rainbow)


console.log('Chains are also cool.'.bold.italic.underline.red); // styles not widely supported

console.log('So '.green + 'are'.underline + ' ' + 'inverse'.inverse + ' styles! '.yellow.bold); // styles not widely supported
console.log("Zebras are so fun!".zebra);

//
// Remark: .strikethrough may not work with Mac OS Terminal App
//
console.log("This is " + "not".strikethrough + " fun.");

console.log('Background color attack!'.black.bgWhite)
console.log('Use random styles on everything!'.random)
console.log('America, Heck Yeah!'.america)
*/