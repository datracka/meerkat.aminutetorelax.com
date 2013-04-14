/**
 *
 * Takes care of the view in the HTML document the info
 * dinamically loaded.
 *
 */

var View = function () {

}

/**
 *
 * draw right thumbnails sidebar.
 * @param aThumbs
 * @param aVideosThumbs
 */
View.prototype.drawThumbnailsSidebar = function (aThumbs, aVideosThumbs){

    $(aThumbs).each(function(i,e){

         var img = document.createElement("img");
         img.setAttribute("src",e);
         img.setAttribute("id","imgThumbs-" + i);
         img.setAttribute("class","imgThumbs-" + i);
        //TODO better way to attach event centralizing into Main.
         img.setAttribute("onclick","View.prototype.showVideo('"+ aVideosThumbs[i] +"')");

         $("#st_thumbs").append(img);
    });

    var elem 			= $('body');
    var thumbs_wrapper = elem.find('.st_thumbs_wrapper');
    var thumbs 		= elem.find('.st_thumbs');
    //each thumb has 180px and we add 3 of margin
    var finalH 			= thumbs.find('img').length * 150;
    thumbs.css('height', finalH + 'px');
    thumbs_wrapper.css('height', ($(window).height() - 42) + 'px');

    View.prototype.makeScrollable(thumbs_wrapper,thumbs);

}

/**
 *
 * makes the thumbs div scrollable
 * on mouse move the div scrolls automatically
 * @param outer
 * @param $inner
 */
View.prototype.makeScrollable =  function (outer, $inner){

    var extra 			= 100;
    //Get menu width
    var divHeight = outer.height();
    //Remove scrollbars
    outer.css({
        overflow: 'hidden'
    });
    //Find last image in container
    var lastElem = $inner.find('img:last');
    outer.scrollTop(0);
    //When user move mouse over menu
    outer.unbind('mousemove').bind('mousemove',function(e){
        var containerHeight = lastElem[0].offsetTop + lastElem.outerHeight() + 2*extra;
        var top = (e.pageY - outer.offset().top) * (containerHeight-divHeight) / divHeight - extra;
        outer.scrollTop(top);
    });
}
View.prototype.showVideo = function (video){

    var v = new Video();

    //set and return finakl url
    var videoUrl = 'http://www.vimeo.com/' + video;

    var ov = {
        videoUrl: videoUrl,
        videoTiming: 0
    }

    Video.prototype.getVideo(ov);
}



