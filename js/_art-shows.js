'use strict';

require('./_common.js');

(function($) {
  var $showRoot = $('#show-root');

  if(!$showRoot) {
    return;
  }

  var $target = $('#previous-shows');
  verifyItemTime($, $('#current-shows > div'), function($element, showEnded) {
    if(showEnded) {
      $element.detach();
      $target.prepend($element);
    }
  });

  if($('#current-shows > div').length === 0) {
    $('#current-shows').remove();
    $('#no-current-shows-message').removeClass('hidden');
  }
  $showRoot.removeClass('load');
})(jQuery);
