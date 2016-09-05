var https = require('https');
var fs = require('fs');
var username = require('git-user-name');
var cheerio = require('cheerio');

var user = username();
var url = 'https://github.com/users/' + user + '/contributions';

var body;
var $;
var days;

var getDays = function(username) {
	return new Promise(function(resolve, reject) {
		if (username) {
			url = 'https://github.com/users/' + username + '/contributions';
		}
		https.get(url, function(res) {
			res.setEncoding('utf8');
			res.on('data', function(data) {
				body += data;
			})

			if (res.statusCode !== 200) {
				reject(res.statusCode)
			}

			res.on('end', function() {
				$ = cheerio.load(body, { ignoreWhitespace: true, decodeEntities: true });
				var weeks = $('g', 'g');
				days = $('rect', weeks);
				resolve(days);
			})
		}).on('error', function(err) {
			reject(err);
		})
	})
}

exports.yearly = function(username) {
	return new Promise(function(resolve, reject) {
		var yearCount = 0;
		getDays(username).then(function(days) {
			for (var i = 0; i < days.length; i++) {
				yearCount += parseInt($(days[i]).attr('data-count'));
			}
			resolve(yearCount);
		})
		.catch((err) => {
			error(err);
		})
	})
}

exports.weekly = function(username) {
	return new Promise(function(resolve, reject) {
		var weekCount = 0;
		getDays(username).then((days) => {
			for (var i = days.length -1; i > days.length - 7; i--) {
				weekCount += parseInt($(days[i]).attr('data-count'))
			}
			resolve(weekCount);
		})
		.catch((err) => {
			error(err);
		})
	})
}

exports.daily = function(username) {
	return new Promise((resolve, reject) => {
		var dayCount = 0;
		getDays(username).then((days) => {
			dayCount = parseInt($(days[days.length-1]).attr('data-count'));
			resolve(dayCount);
		})
		.catch((err) => {
			error(err);
		})
	})
}

var error = function(err) {
	console.log('ERROR: ', err);
	console.log('Error getting your github info. Please make sure you have the correct username in ~/.gitconfig.');
}
