'use strict';

const gm = require('gm'),
    fs = require('fs'),
    common = require('./common'),
    root = process.argv[2],
    width = process.argv[3] || 250,
    height = process.argv[4] || 400,
    TEASER_IMAGE_PATTERN = '.+-teaser',
    TEASER_FILE_NAME = '-teaser.jpg';

function createThumbnail(file) {
  const outFile = file.slice(0, -4) + TEASER_FILE_NAME;
  gm(file)
    .resize(width, height)
    .write(outFile, function(err) {
      if(err) {
        console.log(err);
      }
      else {
        console.log('Creating: ' + outFile);
      }
  });
}

if(!root) {
	console.log('Specify a file or directory');
	return;
}

let isFile = null;
let isDirectory = null;

try {
  const stats = fs.statSync(root);
  isFile = stats.isFile();
  isDirectory = stats.isDirectory();
}
catch(e) {
  console.log(e);
}

if(isDirectory) {
  let results = [];
  common.walk(root, results, function(error) {
  	if(error) {
  		throw error;
  	}

    results = results.filter(function(value) {
  		return value.search(TEASER_IMAGE_PATTERN) === -1;
  	});

    results.forEach(createThumbnail);
  });
}
else if(isFile) {
  createThumbnail(root);
}
