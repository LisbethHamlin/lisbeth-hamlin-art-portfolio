'use strict';

var $ = require('jquery');

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

buildMenu($);
buildToc($);
