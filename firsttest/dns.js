/**
 * dns,url 관련 예제
 */
var dns = require('dns');

//domain->ip
dns.lookup('burningbird.net', function(err, ip) {
	console.log('ip : '+ip);
});

//ip trace
dns.reverse('173.255.206.103', function(err, domains) {
	domains.forEach(function(domain) {
		console.log('reverse : '+domain);
	});
});

dns.resolve('burningbird.net', function(err, domains) {
	console.log('resolve : '+domains);
	/*
	domains.forEach(function(domain) {
		console.log(domain);
	});
	*/
});

var url = require('url');
console.log(url.parse('http://burningbird.net/'));