import $ from 'jquery'

// Off Canvas Sliding
// Menu button click
$('#js-menu-trigger,#js-menu-screen').on('click touchstart', (e) => {
  // $('#js-body').toggleClass('no-scroll');
  $('#js-menu, #js-menu-screen').toggleClass('is-visible');
  $('#js-menu-trigger').toggleClass('slide close');
  // $('#masthead, #page-wrapper').toggleClass('slide');
  e.preventDefault();
});

$("#markdown-toc").prepend("<li><h6>Overview</h6></li>");
