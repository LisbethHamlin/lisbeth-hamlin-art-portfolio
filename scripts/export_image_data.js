var fs = require('fs');
var sizeOf = require('image-size');
var rootDirectory = null;
var TEASER_IMAGE_PATTERN = '.+-teaser';

function getImageSize(image) {
	var imageSize = sizeOf(image);
	return imageSize.width.toString() + 'x' + imageSize.height.toString();
}

function createThumbnailFilename(image) {
	var dotPos = image.indexOf('.');
	return image.substring(0, dotPos) + '-teaser' + image.substring(dotPos);
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

if(process.argv.length < 3) {
	console.log('Specify a directory');
	return;
}

rootDirectory = process.argv[2];

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
			image: {
				feature: '/' + value,
				teaser: '/' + createThumbnailFilename(value),
				size: getImageSize(value)
			}
		});
	});

	var json = JSON.stringify(portfolio, null, 2);
	console.log(json);
});