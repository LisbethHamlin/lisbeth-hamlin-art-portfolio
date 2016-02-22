'use strict';

const fs = require('fs');

const walk = function(dir, results, done) {
	fs.readdir(dir, function(error, list) {
		if(error) {
			return done(error);
		}

		let i = 0;
		(function next()
		{	let file = list[i++];
			if(!file) {
				return done(null);
			}

			file = dir + '/' + file;

			fs.stat(file, function(error, stat) {
				if(stat && stat.isDirectory()) {
					walk(file, results, function() {
						next();
					});
				}
				else {
					results.push(file);
					next();
				}
			});
		})();
	});
};

exports.walk = walk;
