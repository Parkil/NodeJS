/**
 * 사용자 정의 REPL
 */

var repl = require('repl');

/*
 * 파라메터
 * 1.프롬프트 명
 * 2.stream
 * 3.eval 객체
 * 4.전역객체 사용여부 (true or false)
 * 5.undefnied 응답 무시여부(true or false)
 */
var context = repl.start('test>', null, null, null, true).context;

//repl에서 바로 사용할수 있도록 조치
context.http = require('http');
context.util = require('util');
context.os = require('os');
