'use strict';

var common = require('./_common.js');
var $target = $('#previous-shows');

common.verifyItemTime($, $('#current-shows > div'), function($element, showEnded) {
  if(showEnded) {
    $element.detach();
    $target.prepend($element);
  }
});

if($('#current-shows > div').length === 0) {
  $('#current-shows').remove();
  $('#no-current-shows-message').removeClass('hidden');
}
$('#show-root').removeClass('load');
