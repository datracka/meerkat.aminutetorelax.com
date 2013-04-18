var Main = (function(){

    //Constructor
    function Main(){

        // Get new library object for storing elements
        Main.library = new Storage();

        Main.prototype.fetchElements();
        Main.prototype.initializeEventListeners();

        Main.video = new Video();
        //set Main.videos with videos from Channel
        Main.video.loadVideosFromChannel();

        //set Main.aThumbs with thumbs available
        Main.video.getThumbnails(Main.videos);
        Main.view = new View();
        Main.view.drawThumbnailsSidebar(Main.aThumbs, Main.aVideosThumbs);

        //load video
        Main.video.prepareVideoUrl(Main.videos);

        //TODO: positioning stuff. Move to appropiate place
        //$("div.loading:nth-child(1)").center();
        $(".st_thumbs_wrapper").css('left', ($(window).width() - 201) + 'px');


    }

    //atrributes
    Main.library = "";
    Main.video = null;
    Main.view = null;
    Main.urlVars = "";

    //data -> todo: use Storage library
    Main.aVideosThumbs = []
    Main.aThumbs = []  //array thumbs
    Main.videos = null //videos

    Main.prototype = {

        fetchElements: function(){
            var hidedHeader     = $('#hidedHeader')
            var sidebar         = $('#st_thumbs_wrapper')
            var imgPressed      = $('img[id|="imgThumbs"]')
            var html            = $('html');

            Main.library.set('hidedHeader', hidedHeader);
            Main.library.set('sidebar', sidebar);
            Main.library.set('imgPressed', imgPressed);
            Main.library.set('html', html);
        },

        initializeEventListeners: function () {

            /** get Vars from URL */
            Main.urlVars = this.getUrlVars();

            /** document events **/
            var html = Main.library.get('html');
            var hidedHeader = Main.library.get('hidedHeader');
            var sidebar = Main.library.get('sidebar');
            var imgPressed = Main.library.get('imgPressed');

            html.mouseover(Main.onDocument);

            sidebar.hover(Main.prototype.showSidebar, Main.prototype.hideSidebar);
            //imgPressed.click(Main.prototype.showVideo)

            /** show iframe **/
            $(".wrapper").fadeIn(2000);

            /** set close button animation */
            $("#closeHeader").animate(
                {"top": "65px"},
                "slow",
                function(){
                    $("#closeHeader").delay(3000).animate(
                        {"top": "-65px"},
                        "slow",
                        function(){
                            //enable events

                            hidedHeader.hover(Main.prototype.showCloseHeader, Main.prototype.hideCloseHeader);
                            //hidedHeader.mouseout(Main.prototype.hideCloseHeader);
                            hidedHeader.click(Main.prototype.closewindow)

                        }
                    );
                }
            );
        },

        /**
         * methods realted to events
         *
         */

        showVideo: function(){
            alert("show video");
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

        closewindow: function(){

            var d = Main.urlVars["a"];
            var p = Main.urlVars["p"];
            var url = p + "//" + d;

            var win = parent;
            win.postMessage("destroy_bookmarklet",url);

        },

        onDocument: function (event){
             alert("aa");
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



