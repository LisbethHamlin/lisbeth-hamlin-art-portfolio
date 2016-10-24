'use strict';

// Off Canvas Sliding
var buildMenu = function($) {
  // Menu button click
  $('#js-menu-trigger,#js-menu-screen').on('click touchstart', function(e){
    // $('#js-body').toggleClass('no-scroll');
    $('#js-menu, #js-menu-screen').toggleClass('is-visible');
    $('#js-menu-trigger').toggleClass('slide close');
    // $('#masthead, #page-wrapper').toggleClass('slide');
    e.preventDefault();
  });
};

var buildToc = function($) {
  // Table of Contents title. Change text to localize
  $("#markdown-toc").prepend("<li><h6>Overview</h6></li>");
};

var verifyItemTime = function($, $elements, callback) {
  var currentTime = Math.floor(Date.now() / 1000);

  for(var i = 0; i < $elements.length; ++i) {
    var $element = $($elements[i]);
    var endTime = parseInt($element.data('time'), 10);
    callback($element, currentTime > endTime);
  }
};

(function($) {
  buildMenu($);
  buildToc($);
})(jQuery);

module.exports = {
  verifyItemTime: verifyItemTime
};
