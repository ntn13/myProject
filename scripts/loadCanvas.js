$(document).ready(function () {
    const loadCanvas = function (videoid, cvId = null) {
        const canvasId = cvId ? cvId : "cv_" + videoid;
        const videoId = videoid;
        const canvas = document.getElementById(canvasId);
        const video = document.getElementById(videoId);
        if (canvas == null || canvas.value == '') {
            return;
        }

        if (video == null || video.value == '') {
            return;
        }
        const ctx = canvas.getContext('2d');
        const video_width = video.offsetWidth || window.innerWidth;
        const video_height = video.offsetHeight ||  window.innerHeight;
        if (video_width > 0) {
            canvas.width = video_width;
        }

        if (video_height > 0) {
            canvas.height = video_height;
        }
              
        video.addEventListener('play', function () {
            var $this = this;
            (function loop() {
                // if (!$this.paused && !$this.ended) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height) 
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                    setTimeout(loop, 1000 / 60); // drawing at 30fps
                // }
            })();
        }, 0);
    }


    let testEl = document.createElement("video"), webm;
    if (testEl.canPlayType ) {
        webm = "" !== testEl.canPlayType('video/webm; codecs="vp8, vorbis"');
        if (webm) {
            loadCanvas("animation_logo_big");
            loadCanvas("flag_bg","cv_flag_bg_1");
            loadCanvas("flag_bg_2");
            loadCanvas("flag_bg","cv_flag_bg_3");
            loadCanvas("hero_piggy");
            loadCanvas("hero-florist");
            loadCanvas("hero-knight");
            loadCanvas("hero-king-doodle-left");
            loadCanvas("hero-ninja");
            loadCanvas("hero-pirate");
            loadCanvas("hero-bear");
            loadCanvas("hero-king-doodle-right");
            loadCanvas("kingdom-king");
            loadCanvas("kingdom-paper");
            loadCanvas("step5-minion");
            loadCanvas("animation-coin");
            // loadCanvas("witch");
            loadCanvas("forist");
            loadCanvas("kingdom-PiggyStrikeFire", 'cv_kingdom-PiggyStrikeFire');
        } else {
            // $(".img-mobile").css('visibility','unset');
            if (!isMobileScreen()) {
                $(".img-replace-video").css('display','unset');
            }
            $("canvas").css('display','none');

        }
    }


    function isMobileScreen() {
        return window.matchMedia("screen and (max-width: 900px)").matches;
    }



    var iFrameYoutube = document.getElementById('frame-youtube');
    if (isMobileScreen()) {
        iFrameYoutube.width  = 355;
        iFrameYoutube.height = 190;
    }

   
});