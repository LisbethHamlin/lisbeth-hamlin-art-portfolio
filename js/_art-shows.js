'use strict';

var common = require('./_common.js');
var $target = $('#current-shows');
common.verifyItemTime($, $('#previous-shows > div'), function($element, showEnded) {
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
