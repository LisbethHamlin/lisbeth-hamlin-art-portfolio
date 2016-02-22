'use strict';

const fs = require('fs'),
		sizeOf = require('image-size'),
		common = require('./common'),
		TEASER_IMAGE_PATTERN = '.+-teaser',
		PORTFOLIO_OUT_FILE = '_data/portfolio.json';

let rootDirectory = process.argv[2];

function getImageSize(image) {
	const imageSize = sizeOf(image);
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

let results = [];
common.walk(rootDirectory, results, function(error) {
	if(error) {
		throw error;
	}

	results = results.filter(function(value) {
		return value.search(TEASER_IMAGE_PATTERN) === -1;
	});

	const portfolio = {};
	results.forEach(function(value) {
		const splitValues = splitPath(value),
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
