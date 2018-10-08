import $ from 'jquery'

const $target = $('#current-shows');

const verifyItemTime = ($elements, callback) => {
  const currentTime = Math.floor(Date.now() / 1000);

  for(let i = 0; i < $elements.length; ++i) {
    const $element = $($elements[i]);
    const endTime = parseInt($element.data('time'), 10);
    callback($element, currentTime > endTime);
  }
};

verifyItemTime($('#previous-shows > div'), ($element, showEnded) => {
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
