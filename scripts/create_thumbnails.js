var gm = require('gm')
  , common = require('./common')
  , rootDirectory = process.argv[2];

var TEASER_IMAGE_PATTERN = '.+-teaser';

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

  results.forEach(function(value) {
    var title = value.slice(0, -4) + '-teaser.jpg';
    var image = gm(value)
      .resize(400, 400)
      .write(title, function(err) {
        if(err) {
          console.log(err);
        }
        else {
          console.log('Creating: ' + title);
        }
      });
  });
});
