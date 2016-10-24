'use strict';

var updateLatestArtshows = function($, common) {
  var $artShows = $('#latest-art-shows');

  if(!$artShows.length) {
    return;
  }

  common.verifyItemTime($, $('ul#latest-art-shows li'), function($element, showEnded) {
    var titleValue = 'Previous Art Show';
    if(!showEnded) {
      $element.addClass('current-show');
      titleValue = 'Current Art Show';
    }
    $element.attr('title', titleValue);
  });
};

require(['./_common.js', './_photo-gallery.js'], function(common) {
  updateLatestArtshows($, common);
});
