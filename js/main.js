/*! skinny-bones-jekyll - v0.0.1 - 2014-08-27 */!function($){"use strict";$.fn.fitVids=function(options){var settings={customSelector:null,ignore:null};if(!document.getElementById("fit-vids-style")){var head=document.head||document.getElementsByTagName("head")[0],css=".fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}",div=document.createElement("div");div.innerHTML='<p>x</p><style id="fit-vids-style">'+css+"</style>",head.appendChild(div.childNodes[1])}return options&&$.extend(settings,options),this.each(function(){var selectors=["iframe[src*='player.vimeo.com']","iframe[src*='youtube.com']","iframe[src*='youtube-nocookie.com']","iframe[src*='kickstarter.com'][src*='video.html']","object","embed"];settings.customSelector&&selectors.push(settings.customSelector);var ignoreList=".fitvidsignore";settings.ignore&&(ignoreList=ignoreList+", "+settings.ignore);var $allVideos=$(this).find(selectors.join(","));$allVideos=$allVideos.not("object object"),$allVideos=$allVideos.not(ignoreList),$allVideos.each(function(){var $this=$(this);if(!($this.parents(ignoreList).length>0||"embed"===this.tagName.toLowerCase()&&$this.parent("object").length||$this.parent(".fluid-width-video-wrapper").length)){$this.css("height")||$this.css("width")||!isNaN($this.attr("height"))&&!isNaN($this.attr("width"))||($this.attr("height",9),$this.attr("width",16));var height="object"===this.tagName.toLowerCase()||$this.attr("height")&&!isNaN(parseInt($this.attr("height"),10))?parseInt($this.attr("height"),10):$this.height(),width=isNaN(parseInt($this.attr("width"),10))?$this.width():parseInt($this.attr("width"),10),aspectRatio=height/width;if(!$this.attr("id")){var videoID="fitvid"+Math.floor(999999*Math.random());$this.attr("id",videoID)}$this.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top",100*aspectRatio+"%"),$this.removeAttr("height").removeAttr("width")}})})}}(window.jQuery||window.Zepto),function($){var $w=$(window);$.fn.visible=function(partial,hidden,direction){if(!(this.length<1)){var $t=this.length>1?this.eq(0):this,t=$t.get(0),vpWidth=$w.width(),vpHeight=$w.height(),direction=direction?direction:"both",clientSize=hidden===!0?t.offsetWidth*t.offsetHeight:!0;if("function"==typeof t.getBoundingClientRect){var rec=t.getBoundingClientRect(),tViz=rec.top>=0&&rec.top<vpHeight,bViz=rec.bottom>0&&rec.bottom<=vpHeight,lViz=rec.left>=0&&rec.left<vpWidth,rViz=rec.right>0&&rec.right<=vpWidth,vVisible=partial?tViz||bViz:tViz&&bViz,hVisible=partial?lViz||lViz:lViz&&rViz;if("both"===direction)return clientSize&&vVisible&&hVisible;if("vertical"===direction)return clientSize&&vVisible;if("horizontal"===direction)return clientSize&&hVisible}else{var viewTop=$w.scrollTop(),viewBottom=viewTop+vpHeight,viewLeft=$w.scrollLeft(),viewRight=viewLeft+vpWidth,offset=$t.offset(),_top=offset.top,_bottom=_top+$t.height(),_left=offset.left,_right=_left+$t.width(),compareTop=partial===!0?_bottom:_top,compareBottom=partial===!0?_top:_bottom,compareLeft=partial===!0?_right:_left,compareRight=partial===!0?_left:_right;if("both"===direction)return!!clientSize&&viewBottom>=compareBottom&&compareTop>=viewTop&&viewRight>=compareRight&&compareLeft>=viewLeft;if("vertical"===direction)return!!clientSize&&viewBottom>=compareBottom&&compareTop>=viewTop;if("horizontal"===direction)return!!clientSize&&viewRight>=compareRight&&compareLeft>=viewLeft}}}}(jQuery),function($){$.fn.smoothScroller=function(options){options=$.extend({},$.fn.smoothScroller.defaults,options);var el=$(this);return $(options.scrollEl).animate({scrollTop:el.offset().top-$(options.scrollEl).position().top-options.offset},options.speed,options.ease,function(){var hash=el.attr("id");hash.length&&(history.pushState?history.pushState(null,null,"#"+hash):document.location.hash=hash),el.trigger("smoothScrollerComplete")}),this},$.fn.smoothScroller.defaults={speed:400,ease:"swing",scrollEl:"body",offset:0},$("body").on("click","[data-smoothscroller]",function(e){e.preventDefault();var href=$(this).attr("href");0===href.indexOf("#")&&$(href).smoothScroller()})}(jQuery),function($){var verboseIdCache={};$.fn.toc=function(options){var timeout,self=this,opts=$.extend({},jQuery.fn.toc.defaults,options),container=$(opts.container),headings=$(opts.selectors,container),headingOffsets=[],activeClassName=opts.activeClass,scrollTo=function(e,callback){if(opts.smoothScrolling&&"function"==typeof opts.smoothScrolling){e.preventDefault();var elScrollTo=$(e.target).attr("href");opts.smoothScrolling(elScrollTo,opts,callback)}$("li",self).removeClass(activeClassName),$(e.target).parent().addClass(activeClassName)},highlightOnScroll=function(){timeout&&clearTimeout(timeout),timeout=setTimeout(function(){for(var highlighted,top=$(window).scrollTop(),closest=Number.MAX_VALUE,index=0,i=0,c=headingOffsets.length;c>i;i++){var currentClosest=Math.abs(headingOffsets[i]-top);closest>currentClosest&&(index=i,closest=currentClosest)}$("li",self).removeClass(activeClassName),highlighted=$("li:eq("+index+")",self).addClass(activeClassName),opts.onHighlight(highlighted)},50)};return opts.highlightOnScroll&&($(window).bind("scroll",highlightOnScroll),highlightOnScroll()),this.each(function(){var el=$(this),ul=$(opts.listType);headings.each(function(i,heading){var $h=$(heading);headingOffsets.push($h.offset().top-opts.highlightOffset);var anchorName=opts.anchorName(i,heading,opts.prefix);if(heading.id!==anchorName){$("<span/>").attr("id",anchorName).insertBefore($h)}var a=$("<a/>").text(opts.headerText(i,heading,$h)).attr("href","#"+anchorName).bind("click",function(e){$(window).unbind("scroll",highlightOnScroll),scrollTo(e,function(){$(window).bind("scroll",highlightOnScroll)}),el.trigger("selected",$(this).attr("href"))}),li=$("<li/>").addClass(opts.itemClass(i,heading,$h,opts.prefix)).append(a);ul.append(li)}),el.html(ul)})},jQuery.fn.toc.defaults={container:"body",listType:"<ul/>",selectors:"h1,h2,h3",smoothScrolling:function(target,options,callback){$(target).smoothScroller({offset:options.scrollToOffset}).on("smoothScrollerComplete",function(){callback()})},scrollToOffset:0,prefix:"toc",activeClass:"toc-active",onHighlight:function(){},highlightOnScroll:!0,highlightOffset:100,anchorName:function(i,heading,prefix){if(heading.id.length)return heading.id;var candidateId=$(heading).text().replace(/[^a-z0-9]/gi," ").replace(/\s+/g,"-").toLowerCase();if(verboseIdCache[candidateId]){for(var j=2;verboseIdCache[candidateId+j];)j++;candidateId=candidateId+"-"+j}return verboseIdCache[candidateId]=!0,prefix+"-"+candidateId},headerText:function(i,heading,$heading){return $heading.text()},itemClass:function(i,heading,$heading,prefix){return prefix+"-"+$heading[0].tagName.toLowerCase()}}}(jQuery),$(document).ready(function(){$(".js-menu-trigger").on("click touchstart",function(e){$("body").toggleClass("no-scroll"),$(".js-menu, .js-menu-screen").toggleClass("is-visible"),$(".sliding-menu-button").toggleClass("slide close"),$("#masthead, #page-wrapper").toggleClass("slide"),e.preventDefault()}),$(".js-menu-screen").on("click touchstart",function(e){$("body").toggleClass("no-scroll"),$(".js-menu, .js-menu-screen").toggleClass("is-visible"),$(".sliding-menu-button").toggleClass("slide close"),$("#masthead, #page-wrapper").toggleClass("slide"),e.preventDefault()})}),$(document).ready(function(){$("#main").fitVids()});

var initPhotoSwipeFromDOM = function(gallerySelector) {

    // loop through all gallery elements and bind events
    var galleryElements = document.querySelectorAll( gallerySelector );

    // parse slide data (url, title, size ...) from DOM elements 
    // (children of gallerySelector)
    var parseThumbnailElements = function(el) {
        var thumbElements = el.childNodes,
            numNodes = thumbElements.length,
            items = [],
            figureEl,
            linkEl,
            size,
            item;

        for(var i = 0; i < numNodes; i++) {

            figureEl = thumbElements[i]; // <figure> element

            // include only element nodes 
            if(figureEl.nodeType !== 1) {
                continue;
            }

            linkEl = figureEl.children[0]; // <a> element

            size = linkEl.getAttribute('data-size').split('x');

            // create slide object
            item = {
                src: linkEl.getAttribute('href'),
                desc: linkEl.getAttribute('data-description'),
                pid: linkEl.getAttribute('data-index'),
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10)
            };

            if(figureEl.children.length > 1) {
                // <figcaption> content
                item.title = figureEl.children[1].innerHTML; 
            }
            else {
                item.title = ' '; // TODO: look into this
            }

            item.el = figureEl; // save link to element for getThumbBoundsFn
            items.push(item);
        }

        return items;
    };

    // find nearest parent element
    var closest = function closest(el, fn) {
        return el && ( fn(el) ? el : closest(el.parentNode, fn) );
    };

    // triggers when user clicks on thumbnail
    var onThumbnailsClick = function(e) {
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;

        var eTarget = e.target || e.srcElement;

        // find root element of slide
        var clickedListItem = closest(eTarget, function(el) {
            return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
        });

        if(!clickedListItem) {
            return;
        }

        var clickedGallery = clickedListItem.parentNode;
        var index = 0;


        // find index of clicked item by looping through all child nodes
        // alternatively, you may define index via data- attribute
        var childNodes = clickedListItem.parentNode.childNodes,
            numChildNodes = childNodes.length,
            nodeIndex = 0,
            index;

        for (var i = 0; i < numChildNodes; i++) {
            if(childNodes[i].nodeType !== 1) { 
                continue; 
            }

            if(childNodes[i] === clickedListItem) {
                index = nodeIndex;
                break;
            }
            nodeIndex++;
        }
        

        if(index >= 0) {
            // open PhotoSwipe if valid index found
            openPhotoSwipe( index, clickedGallery );
        }
        return false;
    };

    // parse picture index and gallery index from URL (#&pid=1&gid=2)
    var photoswipeParseHash = function() {
        var hash = window.location.hash.substring(1),
        params = {};

        if(hash.length < 5) {
            return params;
        }

        var vars = hash.split('&');
        for (var i = 0; i < vars.length; i++) {
            if(!vars[i]) {
                continue;
            }
            var pair = vars[i].split('=');  
            if(pair.length < 2) {
                continue;
            }           
            params[pair[0]] = pair[1];
        }

        if(params.gid) {
            params.gid = parseInt(params.gid, 10);
        }

        return params;
    };

    var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
        var pswpElement = document.querySelectorAll('.pswp')[0],
            gallery,
            options,
            items;

        items = parseThumbnailElements(galleryElement);

        // define options (if needed)
        options = {
            // define gallery index (for URL)
            galleryUID: galleryElement.getAttribute('data-pswp-uid'),
            showHideOpacity: true,
            getThumbBoundsFn: false,
            clickToCloseNonZoomable: false,
            closeOnScroll: false,
            galleryPIDs: true,
            addCaptionHTMLFn: function(item, captionEl, isFake) {
                if(!item.title) {
                    captionEl.children[0].innerText = '';
                    return false;
                }
                captionEl.children[0].innerHTML = '<p>' + item.title + '<br>' + item.desc + '</p>' // TODO: remove this br
                return true;
            }
        };

        // PhotoSwipe opened from URL
        if(fromURL) {
            if(options.galleryPIDs) {
                // parse real index when custom PIDs are used 
                // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
                for(var j = 0; j < items.length; j++) {
                    if(items[j].pid == index) {
                        options.index = j;
                        break;
                    }
                }
            } else {
                // in URL indexes start from 1
                options.index = parseInt(index, 10) - 1;
            }
        } else {
            options.index = parseInt(index, 10);
        }

        // exit if index not found
        if( isNaN(options.index) ) {
            return;
        }

        if(disableAnimation) {
            options.showAnimationDuration = 0;
        }

        // Pass data to PhotoSwipe and initialize it
        var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
    };

    for(var i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute('data-pswp-uid', i+1);
        galleryElements[i].onclick = onThumbnailsClick;
    }

    // Parse URL and open gallery if it contains #&pid=3&gid=1
    var hashData = photoswipeParseHash();
    if(hashData.pid && hashData.gid) {
        openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
    }
};

initPhotoSwipeFromDOM('.my-gallery');