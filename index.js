var https = require('https');
var fs = require('fs');
var username = require('git-user-name');

console.log('username: ', username());


var body;
https.get('https://github.com/users/mazdeh/contributions', function(res) {
	console.log(res.statusCode);
	res.setEncoding('utf8')
	res.on('data', function(data) {
		body += data;
	})
	res.on('end', function() {
		fs.writeFile('html.txt', body);
	})
})