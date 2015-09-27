/*! skinny-bones-jekyll - v0.0.1 - 2015-09-27 */!function($){"use strict";$.fn.fitVids=function(options){var settings={customSelector:null,ignore:null};if(!document.getElementById("fit-vids-style")){var head=document.head||document.getElementsByTagName("head")[0],css=".fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}",div=document.createElement("div");div.innerHTML='<p>x</p><style id="fit-vids-style">'+css+"</style>",head.appendChild(div.childNodes[1])}return options&&$.extend(settings,options),this.each(function(){var selectors=["iframe[src*='player.vimeo.com']","iframe[src*='youtube.com']","iframe[src*='youtube-nocookie.com']","iframe[src*='kickstarter.com'][src*='video.html']","object","embed"];settings.customSelector&&selectors.push(settings.customSelector);var ignoreList=".fitvidsignore";settings.ignore&&(ignoreList=ignoreList+", "+settings.ignore);var $allVideos=$(this).find(selectors.join(","));$allVideos=$allVideos.not("object object"),$allVideos=$allVideos.not(ignoreList),$allVideos.each(function(){var $this=$(this);if(!($this.parents(ignoreList).length>0||"embed"===this.tagName.toLowerCase()&&$this.parent("object").length||$this.parent(".fluid-width-video-wrapper").length)){$this.css("height")||$this.css("width")||!isNaN($this.attr("height"))&&!isNaN($this.attr("width"))||($this.attr("height",9),$this.attr("width",16));var height="object"===this.tagName.toLowerCase()||$this.attr("height")&&!isNaN(parseInt($this.attr("height"),10))?parseInt($this.attr("height"),10):$this.height(),width=isNaN(parseInt($this.attr("width"),10))?$this.width():parseInt($this.attr("width"),10),aspectRatio=height/width;if(!$this.attr("id")){var videoID="fitvid"+Math.floor(999999*Math.random());$this.attr("id",videoID)}$this.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top",100*aspectRatio+"%"),$this.removeAttr("height").removeAttr("width")}})})}}(window.jQuery||window.Zepto),function($){var $w=$(window);$.fn.visible=function(partial,hidden,direction){if(!(this.length<1)){var $t=this.length>1?this.eq(0):this,t=$t.get(0),vpWidth=$w.width(),vpHeight=$w.height(),direction=direction?direction:"both",clientSize=hidden===!0?t.offsetWidth*t.offsetHeight:!0;if("function"==typeof t.getBoundingClientRect){var rec=t.getBoundingClientRect(),tViz=rec.top>=0&&rec.top<vpHeight,bViz=rec.bottom>0&&rec.bottom<=vpHeight,lViz=rec.left>=0&&rec.left<vpWidth,rViz=rec.right>0&&rec.right<=vpWidth,vVisible=partial?tViz||bViz:tViz&&bViz,hVisible=partial?lViz||lViz:lViz&&rViz;if("both"===direction)return clientSize&&vVisible&&hVisible;if("vertical"===direction)return clientSize&&vVisible;if("horizontal"===direction)return clientSize&&hVisible}else{var viewTop=$w.scrollTop(),viewBottom=viewTop+vpHeight,viewLeft=$w.scrollLeft(),viewRight=viewLeft+vpWidth,offset=$t.offset(),_top=offset.top,_bottom=_top+$t.height(),_left=offset.left,_right=_left+$t.width(),compareTop=partial===!0?_bottom:_top,compareBottom=partial===!0?_top:_bottom,compareLeft=partial===!0?_right:_left,compareRight=partial===!0?_left:_right;if("both"===direction)return!!clientSize&&viewBottom>=compareBottom&&compareTop>=viewTop&&viewRight>=compareRight&&compareLeft>=viewLeft;if("vertical"===direction)return!!clientSize&&viewBottom>=compareBottom&&compareTop>=viewTop;if("horizontal"===direction)return!!clientSize&&viewRight>=compareRight&&compareLeft>=viewLeft}}}}(jQuery),$(document).ready(function(){$("#js-menu-trigger,#js-menu-screen").on("click touchstart",function(e){$("#js-menu, #js-menu-screen").toggleClass("is-visible"),$("#js-menu-trigger").toggleClass("slide close"),e.preventDefault()})}),$(document).ready(function(){$("#main").fitVids()}),$("#markdown-toc").prepend("<li><h6>Overview</h6></li>");var initPhotoSwipeFromDOM=function(gallerySelector){for(var galleryElements=document.querySelectorAll(gallerySelector),parseThumbnailElements=function(el){for(var figureEl,linkEl,size,item,thumbElements=el.childNodes,numNodes=thumbElements.length,items=[],i=0;numNodes>i;i++)figureEl=thumbElements[i],1===figureEl.nodeType&&(linkEl=figureEl.children[0],size=linkEl.getAttribute("data-size").split("x"),item={src:linkEl.getAttribute("href"),desc:linkEl.getAttribute("data-description"),pid:linkEl.getAttribute("data-index"),w:parseInt(size[0],10),h:parseInt(size[1],10)},figureEl.children.length>1?item.title=figureEl.children[1].innerHTML:item.title=" ",item.el=figureEl,items.push(item));return items},closest=function closest(el,fn){return el&&(fn(el)?el:closest(el.parentNode,fn))},onThumbnailsClick=function(e){e=e||window.event,e.preventDefault?e.preventDefault():e.returnValue=!1;var eTarget=e.target||e.srcElement,clickedListItem=closest(eTarget,function(el){return el.tagName&&"FIGURE"===el.tagName.toUpperCase()});if(clickedListItem){for(var index,clickedGallery=clickedListItem.parentNode,childNodes=clickedListItem.parentNode.childNodes,numChildNodes=childNodes.length,nodeIndex=0,i=0;numChildNodes>i;i++)if(1===childNodes[i].nodeType){if(childNodes[i]===clickedListItem){index=nodeIndex;break}nodeIndex++}return index>=0&&openPhotoSwipe(index,clickedGallery),!1}},photoswipeParseHash=function(){var hash=window.location.hash.substring(1),params={};if(hash.length<5)return params;for(var vars=hash.split("&"),i=0;i<vars.length;i++)if(vars[i]){var pair=vars[i].split("=");pair.length<2||(params[pair[0]]=pair[1])}return params.gid&&(params.gid=parseInt(params.gid,10)),params},openPhotoSwipe=function(index,galleryElement,disableAnimation,fromURL){if(galleryElement){var gallery,options,items,pswpElement=document.querySelectorAll(".pswp")[0];if(items=parseThumbnailElements(galleryElement),options={galleryUID:galleryElement.getAttribute("data-pswp-uid"),showHideOpacity:!0,getThumbBoundsFn:!1,clickToCloseNonZoomable:!1,closeOnScroll:!1,galleryPIDs:!0,addCaptionHTMLFn:function(item,captionEl,isFake){return item.title?(captionEl.children[0].innerHTML="<p>"+item.title+"<br>"+item.desc+"</p>",!0):(captionEl.children[0].innerText="",!1)}},fromURL)if(options.galleryPIDs){for(var j=0;j<items.length;j++)if(items[j].pid===index){options.index=j;break}}else options.index=parseInt(index,10)-1;else options.index=parseInt(index,10);isNaN(options.index)||(disableAnimation&&(options.showAnimationDuration=0),gallery=new PhotoSwipe(pswpElement,PhotoSwipeUI_Default,items,options),gallery.init())}},i=0,l=galleryElements.length;l>i;i++)galleryElements[i].setAttribute("data-pswp-uid",i+1),galleryElements[i].onclick=onThumbnailsClick;var hashData=photoswipeParseHash();hashData.pid&&hashData.gid&&openPhotoSwipe(hashData.pid,galleryElements[hashData.gid-1],!0,!0)},updateUpcomingShows=function($){for(var currentTime=Math.floor(Date.now()/1e3),$shows=$("#current-shows > div"),$target=$("#previous-shows"),i=0;i<$shows.length;++i){var $currentShow=$($shows[i]),showTime=+$currentShow.attr("data-time");currentTime>showTime&&($currentShow.detach(),$target.append($currentShow))}$("#show-root").removeClass("load")};initPhotoSwipeFromDOM(".my-gallery"),updateUpcomingShows(window.jQuery);