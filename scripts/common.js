var fs = require('fs');

var walk = function(dir, results, done) {
	fs.readdir(dir, function(error, list) {
		if(error) {
			return done(error);
		}

		var i = 0;
		(function next()
		{	var file = list[i++];
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
