var bypassDissabledScroll = false;
var currentSection = '';
$(document).ready(function () {
    if (history.scrollRestoration) {
        history.scrollRestoration = 'manual';
    } else {
        window.onbeforeunload = function () {
            window.scrollTo(0, 0);
        }
    }
    $("body").waitForImages(function () {
        // All descendant images have loaded
        $("#loader-wrapper").delay(500).fadeOut();
        $("#overlayer").delay(1000).fadeOut("slow");
    });

    $("#menu li").on("click", function () {
        if (bypassDissabledScroll) {
          return;
        }
        $("#menu li").removeClass('active');
        $(this).toggleClass('active');
        bypassDissabledScroll = true;
        let link = $(this).children("a.nav-link");
        let sectionId = link.data("section");
        let section = $("#" + sectionId);
        if (currentSection === section) {
          return;
        }
        currentSection = section;
        let positon = $(section).offset().top;
        if (sectionId == 'kingdom-gate') {
            positon += 200;
            $(".castle-img-wraper").css("opacity", 1);
        } else if (sectionId == 'white-paper') {
            positon += 50;
        }

        $('html, body').animate({
            scrollTop: positon
        }, 800, function () {
            // delay more 0.1 second for scroll event
            setTimeout(function () {
              bypassDissabledScroll = false;
            }, 1);
        });
    });

});
