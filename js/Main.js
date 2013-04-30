var Main = (function(){

    //Constructor
    function Main(){

        // Get new library object for storing elements
        Main.library = new Storage();

        Main.prototype.fetchElements();
        Main.prototype.initializeEventListeners();

        Main.prototype.init();

    }

    //atrributes
    Main.library = "";
    Main.video = null;
    Main.view = null;
    Main.urlVars = null;
    //data -> todo: use Storage library
    Main.aVideosThumbs = []
    Main.aThumbs = []  //array thumbs
    Main.videos = null //videos

    Main.prototype = {

        init: function () {

            //load video if exists Id. else we load it after ask for loadVideosFromChannel.
            if (typeof(Main.urlVars["id"]) != "undefined"){

                //set and return final url
                var videoUrl = 'http://www.vimeo.com/' + Main.urlVars["id"];

                var ov = {
                    videoUrl: videoUrl,
                    videoTiming: 0 //don't use timing at the moment
                }

                Video.prototype.getVideo(ov);
            }

            Main.video = new Video();
            Main.video.loadVideosFromChannel();

        },

        fetchElements: function(){
            var hidedHeader     = $('#hidedHeader')
            var sidebar         = $('#st_thumbs_wrapper')
            var html            = $('html');
            var cWindow         = $(window);


            Main.library.set('hidedHeader', hidedHeader);
            Main.library.set('sidebar', sidebar);

            Main.library.set('html', html);
            Main.library.set('cWindow', cWindow);

        },

        initializeEventListeners: function () {

            /** get Vars from URL */
            Main.urlVars = this.getUrlVars();

            /** document events **/
            var cWindow = Main.library.get('cWindow');
            var html = Main.library.get('html');
            var hidedHeader = Main.library.get('hidedHeader');
            var sidebar = Main.library.get('sidebar');



            cWindow.resize(Main.prototype.resizeScreenElements);

            sidebar.hover(Main.prototype.showSidebar, Main.prototype.hideSidebar);
            hidedHeader.hover(Main.prototype.showCloseHeader, Main.prototype.hideCloseHeader);

            /** show iframe **/
            $(".wrapper").fadeIn(2000);

        },

        resizeScreenElements: function(){

            var elem 			= $('body');
            var thumbs_wrapper = elem.find('.st_thumbs_wrapper');
            thumbs_wrapper.css('height', ($(window).height() - 42) + 'px');

            $('.wrapper iframe').css('height', $(window).height() + 'px');
            $('.wrapper iframe').css('width', $(window).width() + 'px');
        },

        showSidebar: function () {
            $(this).stop().animate({
                opacity: 1
            }, 500)
        },

        hideSidebar: function () {
            $(this).stop().animate({
                opacity: 0
            }, 500)
        },

        showCloseHeader: function () {
            $("#closeHeader").stop().animate({"top": "+65px"}, "fast");
        },
        hideCloseHeader: function () {
            $("#closeHeader").stop().animate({"top": "-65px"}, "fast");
        },

        getUrlVars: function(){
            var vars = {};
            var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
                vars[key] = value;
            });

           return vars;
        }

}
    return Main;
}());



