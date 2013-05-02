/**
 * Created with JetBrains PhpStorm.
 * User: vfayos
 * Date: 01.02.13
 * Time: 16:58
 * To change this template use File | Settings | File Templates.
 */

/**
 * Video manager
 */

var Video = function () {

}

/**
 * gather list of videos of selected channel
 * Channel HC on server side.
 *
 * Callback getVideoUrl
 *
 */
Video.prototype.loadVideosFromChannel =  function () {

    var oConfig = new Config();

    $.ajax({
        url: oConfig.getServiceUrl() + "getListVideos.php",
        dataType: "script",
        async: false,
        success: function (data, textStatus, jqxhr){
            Main.videos = data;
        }
    });

}

/**
 *
 * return array of thumbnails for videos given
 *
 * @param videos
 * @return {Array}
 */
Video.prototype.getThumbnails = function(videos){

    //iterate all the videos json and fill arrays
    var aVideos = JSON.parse(videos);
    aVideos = Video.prototype.shuffleArray(aVideos); //schuffle videos
    aVideos  = aVideos.reverse();
    var sliceVideos = aVideos.slice(0,20);

    $.each(sliceVideos, function(i,e){
        //TODO better storage!! very dirty. we just rely that the video Id has the same position that the thumb
        Main.aVideosThumbs.push(e.id);
        Video.prototype.getThumbnailByVideoId(e.id);
    })

}

/**
 *
 * Shuffle elements of an array
 *
 * @param o
 * @return array schuffled
 */

Video.prototype.shuffleArray = function(o){
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

/**
 *
 * given video Id gather thumbnails
 * @param videoId
 */
Video.prototype.getThumbnailByVideoId = function(videoId){

    var oConfig = new Config();

    $.ajax({
        url: oConfig.getServiceUrl() + "getThumbsByVideoId.php?id="+videoId,
        dataType: "script",
        async: false,
        success: function (data, textStatus, jqxhr){
            Main.aThumbs.push(JSON.parse(data)[1]._content);   //returns pos 1 array with thumb 150x200
        }
    });
}

/**
 * Get the random video to show on the screen
 *
 * @param videos
 */
Video.prototype.prepareVideoUrl = function (videos) {

    var v = null;
    var t = null;
    var rn = null;
    var ov = null;
    var av = [];  //array videos


    $.each(JSON.parse(videos),function(i,e){
        av.push(e.id);
    })


    //get a random video from the channel.
    var aLength = av.length;
    v = "22439234"; //default video
    if(av.length >0){
        rn = Math.floor(Math.random()*aLength);
        v = av[rn];
    }

    //set and return finakl url
    var videoUrl = 'http://www.vimeo.com/' + v;

    ov = {
        videoUrl: videoUrl,
        videoTiming: t
    }

    //Request video
    Video.prototype.getVideo(ov);
};

/**
 * Request Selected video
 *
 * Callback embedVideo
 *
 */
Video.prototype.getVideo =  function (oVideo) {

    var url = "http://www.vimeo.com/api/oembed.json" + '?url=' + encodeURIComponent("http://www.vimeo.com/" + oVideo.videoUrl) +
        '&callback=' + "Video.prototype.embedVideo" +
        '&width=' + (window.innerWidth) +
        '&height=' + (window.innerHeight) +
        '&autoplay=1' +
        '&t=' + oVideo.videoTiming;

    $.getScript(url);

};

/**
 *
 * Callback from Video.prototype.getVideo
 * @param video
 */
Video.prototype.embedVideo = function (video){

    $('#loadingBackground').fadeOut(1000,function(){
        $('#embed').empty().append(decodeURI(video.html));
    });
}







