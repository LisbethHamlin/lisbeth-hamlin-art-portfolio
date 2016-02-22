var fs = require('fs'),
		sizeOf = require('image-size'),
		common = require('./common'),
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

function splitPath(path) {
	return path.split(/\/+/g);
}

if(!rootDirectory) {
	console.log('Specify a directory');
	return;
}

rootDirectory = rootDirectory.replace(/\\/g, '/');

var results = [];
common.walk(rootDirectory, results, function(error) {
	if(error) {
		throw error;
	}

	results = results.filter(function(value) {
		return value.search(TEASER_IMAGE_PATTERN) === -1;
	});

	var portfolio = {};
	results.forEach(function(value) {
		var splitValues = splitPath(value),
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
