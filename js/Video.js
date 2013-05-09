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
 *
 *
 * @return {*}
 */

Video.prototype.loadVideosFromChannel = function(){

    var oConfig = new Config();

    var request = $.ajax({
        url: oConfig.getServiceUrl() + "getListVideos.php",
        dataType: "script",
        async: true
    });

    request.success(function(data, textStatus, jqXHR){

        Video.prototype.getThumbnails(data, textStatus, jqXHR);

        if (typeof(Main.urlVars["id"]) == "undefined"){
            Main.video.getRandomVideo(data);
        }
    });

}

/**
 *
 * return array of thumbnails for videos given
 *
 * @param videos
 * @return {Array}
 * @param jqXHR
 * @param textStatus
 */
Video.prototype.getThumbnails = function(videos, textStatus, jqXHR){

    var aVideos = JSON.parse(videos);

    //get the last 3 videos added to the channel
    var aVideos  = aVideos.reverse(); //reverse them to get the last one in position 0.

    var aLastVideos = [];
    aLastVideos.push(aVideos.pop());
    aLastVideos.push(aVideos.pop());
    aLastVideos.push(aVideos.pop());
    //schuffle the rest of the videos
    aVideos = Video.prototype.shuffleArray(aVideos);

    aSliceVideos = aVideos;
//    if (aVideos.length >= 20){
//        var aSliceVideos = aVideos.slice(0,17); //get 17
//    }

    var atotalVideos = aLastVideos.concat(aSliceVideos);

    Main.view = new View();
    Main.view.drawThumbnailsSidebar(atotalVideos);

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
 * @param element
 */
Video.prototype.getThumbnailByVideoId = function(videoId, element){

    var oConfig = new Config();

    var request = $.ajax({
        url: oConfig.getServiceUrl() + "getThumbsByVideoId.php?id="+ videoId,
        dataType: "script",
        async: true
    });

    request.success(function(data, textStatus, jqXHR){
        View.prototype.drawImageThumbnail(element,data);
    });
}

/**
 * Get the random video to show on the screen
 *
 * @param videos
 */
Video.prototype.getRandomVideo = function (videos) {

    var v = null;
    var t = null;
    var rn = null;
    var ov = null;
    var av = [];  //array videos

    v = "22439234";
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
        '&callback=' + "View.prototype.embedVideo" +
        '&width=' + (window.innerWidth) +
        '&height=' + (window.innerHeight) +
        '&autoplay=1' +
        '&t=' + oVideo.videoTiming;

    $.getScript(url);

};

Video.prototype.getInfoVideo = function (videoId){

    var oConfig = new Config();

    var request = $.ajax({
        url: oConfig.getServiceUrl() + "getInfoByVideoId.php?id="+ videoId,
        dataType: "script",
        async: true
    });

    request.success(function(data, textStatus, jqXHR){
        View.prototype.drawCustomHeaders(data);
    });
}









