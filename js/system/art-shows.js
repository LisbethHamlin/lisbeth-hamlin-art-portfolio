System.register(["./jquery.js"],(function(){"use strict";var e;return{setters:[function(r){e=r.$}],execute:function(){var r=e("#current-shows");!function(r,s){for(var t=Math.floor(Date.now()/1e3),o=0;o<r.length;++o){var n=e(r[o]),a=parseInt(n.data("time"),10);s(n,t>a)}}(e("#previous-shows > div"),(function(e,s){s||(e.detach(),r.prepend(e))})),r.is(":parent")||(e("#current-shows").remove(),e("#no-current-shows-message").removeClass("hidden")),e("#show-root").removeClass("load")}}}));
