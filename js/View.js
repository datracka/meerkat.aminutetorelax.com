/**
 *
 * Takes care of the view in the HTML document the info
 * dinamically loaded.
 *
 */

var View = function () {

}

View.prototype.drawThumbnailsSidebar = function (videos){

    $.each(videos, function(i,e){

        var div = document.createElement("div");
        div.setAttribute("id","divThumbs-" + i);
        div.setAttribute("class","divThumbs");

        //TODO better way to attach event centralizing into Main.
        div.setAttribute("onclick","View.prototype.showVideo('"+ e.id +"')");

        $("#st_thumbs").append(div);

        //load image
        Video.prototype.getThumbnailByVideoId(e.id, div);

    })

    var elem 			= $('body');
    var thumbs_wrapper = elem.find('.st_thumbs_wrapper');
    var thumbs 		= elem.find('.st_thumbs');
    //each thumb has 180px and we add 3 of margin
    var finalH 			= thumbs.find('div').length * 150;
    thumbs.css('height', finalH + 'px');
    thumbs_wrapper.css('height', ($(window).height() - 42) + 'px');

    View.prototype.makeScrollable(thumbs_wrapper,thumbs);

}

/**
 *
 * Draw image thumbnail
 *
 * @param el
 * @param data
 */
View.prototype.drawImageThumbnail = function(el, data){

    $(el).fadeTo('slow', 0.3, function()
    {
        $(el).css("background-image","none");

        var img = document.createElement("img");
        img.setAttribute("id","imgThumbs-" + el.id);
        img.setAttribute("class","imgThumbs");
        img.setAttribute("src",JSON.parse(data)[1]._content);
        $(el).append(img);

    }).fadeTo('slow', 1);

}
/**
 *
 * draw right thumbnails sidebar.
 * @param aThumbs
 * @param aVideosThumbs
 */
View.prototype.drawThumbnailsSidebarDeprecated = function (aThumbs, aVideosThumbs){

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

    //View.prototype.makeScrollable(thumbs_wrapper,thumbs);

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
    var lastElem = $inner.find('div:last');
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

/**
 *
 * Callback from Video.prototype.getVideo
 * @param video
 */
View.prototype.embedVideo = function (video){

    $('#loadingBackground').fadeOut(1000,function(){
        $('#embed').empty().append(decodeURI(video.html));
    });

}


