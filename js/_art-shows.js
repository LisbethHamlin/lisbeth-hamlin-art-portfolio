'use strict';

var $ = require('jquery');
var $target = $('#current-shows');

var verifyItemTime = function($, $elements, callback) {
  var currentTime = Math.floor(Date.now() / 1000);

  for(var i = 0; i < $elements.length; ++i) {
    var $element = $($elements[i]);
    var endTime = parseInt($element.data('time'), 10);
    callback($element, currentTime > endTime);
  }
};

verifyItemTime($, $('#previous-shows > div'), function($element, showEnded) {
  if(!showEnded) {
    $element.detach();
    $target.prepend($element);
  }
});

if(!$target.is(':parent')) {
  $('#current-shows').remove();
  $('#no-current-shows-message').removeClass('hidden');
}
$('#show-root').removeClass('load');
