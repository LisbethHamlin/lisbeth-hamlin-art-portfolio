System.register(["./jquery.js"],(function(){"use strict";var e;return{setters:[function(s){e=s.$}],execute:function(){e("#js-menu-trigger,#js-menu-screen").on("click touchstart",(function(s){e("#js-menu, #js-menu-screen").toggleClass("is-visible"),e("#js-menu-trigger").toggleClass("slide close"),s.preventDefault()})),e("#markdown-toc").prepend("<li><h6>Overview</h6></li>")}}}));
