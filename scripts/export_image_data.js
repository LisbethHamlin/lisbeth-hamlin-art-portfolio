var fs = require('fs'),
		sizeOf = require('image-size'),
		TEASER_IMAGE_PATTERN = '.+-teaser',
		PORTFOLIO_OUT_FILE = '_data/portfolio.json',
		rootDirectory = process.argv[2];

function getImageSize(image) {
	var imageSize = sizeOf(image);
	return imageSize.width.toString() + 'x' + imageSize.height.toString();
}

function removeExtension(image) {
	return image.replace(/\.[^/.]+$/, "");
}

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

if(!rootDirectory) {
	console.log('Specify a directory');
	return;
}

rootDirectory = rootDirectory.replace(/\\/g, '/');

var results = [];
walk(rootDirectory, results, function(error) {
	if(error) {
		throw error;
	}

	results = results.filter(function(value) {
		return value.search(TEASER_IMAGE_PATTERN) === -1;
	});

	var portfolio = {};
	results.forEach(function(value) {
		var splitValues = value.split('/'),
				group = splitValues[2];

		portfolio[group] = portfolio[group] || [];
		portfolio[group].push({
			title: removeExtension(splitValues[3]),
			size: getImageSize(value)
		});
	});

	fs.writeFile(PORTFOLIO_OUT_FILE, JSON.stringify(portfolio, null, 2), function(err) {
		if(err) {
			return console.log(err);
		}
		console.log(PORTFOLIO_OUT_FILE + ' successfully created.');
	});
});
