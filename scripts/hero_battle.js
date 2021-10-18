$(document).ready(function () {
    var screenWidth = $(window).width();
    var mainWidth = 1843;
    var screenHeight = $(window).height();
    var kingdomWraperPosition = $(".kingdom-wraper").position();
    var castle = $(".kingdom-gate-wraper .castle-img");
    var heroLeft = $(".hero-left");
    var heroRight = $(".hero-right");
    var htmlEl = $("html");

    var isScrollUp = false;
    var isDisableScroll = false;
    var casterPosition = "absolute";
    var scalePercent = screenWidth / mainWidth;
    const CONSTANT = {
        SCROLL_MOVE_SPEED: scalePercent < 1 ? 60 : parseInt(scalePercent * 60),
        TIME_OUT_CASTLE: 500,
        SCROLL_MOVE_SPEED_CASTLE: parseInt(scalePercent * 40),
    };
    var currentMoveStep = CONSTANT.SCROLL_MOVE_SPEED;

    var heroConfig = {
        isShowHero: false,
        canChanging: true,
        timeTransform: 1000,
        addtionHeroPosition: 40,
        heroPosition: 0,
        maxHeroPos: screenWidth / 2 - 400,
        addDistance: parseInt(scalePercent * 60),
        subDistance: parseInt(-100 * scalePercent),
    };
    var minScale = 1.2;
    var currentScale = 1;
    var objectParam = {
        scrollspeed: 40,
        cursorwidth: "10px",
        mousescrollstep: CONSTANT.SCROLL_MOVE_SPEED,
    };

    $(window).bind("wheel", function (e) {
        if (isMobileScreen() || bypassDissabledScroll) {
            return;
        }
        if (e.originalEvent.wheelDelta / 120 > 0) {
            if (isScrollUp != true) {
                isScrollUp = true;
                changeHeroDitection();
            }
        } else {
            if (isScrollUp != false) {
                isScrollUp = false;
                changeHeroDitection();
            }
            isScrollUp = false;
        }
        if (isDisableScroll && heroConfig.canChanging) {
            if (!heroConfig.isShowHero) {
                showHeroCastle();
            } else if (!isHeroRunning) {
                hideHeroCastle();
            }
        }
    });

    $(window).scroll(function () {
        if (isMobileScreen() || bypassDissabledScroll) {
            setDefaultKingdomGate();
            return;
        }
        currentSection = '';
        var scrollTopPosition = $(window).scrollTop();
        if (
            $(window).scrollTop() + screenHeight > kingdomWraperPosition.top &&
            $(window).scrollTop() < kingdomWraperPosition.top + 100
        ) {
            var scale = 1;
            scale +=
                (scrollTopPosition + screenHeight - kingdomWraperPosition.top) /
                ((screenWidth - screenHeight) / 2);
            if (casterPosition === "absolute") {
                casterPosition = "fixed";
                castle.css("position", casterPosition);
                if (!isScrollUp) {
                    if (scale < minScale && !heroConfig.isShowHero) {
                        minScale = 1;
                        scrollToPosition(kingdomWraperPosition.top - screenHeight + 5);
                        setScaleImage(1);
                        disableScroll();
                        return;
                    }
                }
            }
            if (currentMoveStep != 1) {
                initNiceScroll(CONSTANT.SCROLL_MOVE_SPEED_CASTLE);
            }
            setScaleImage(scale);
            if (scrollTopPosition - kingdomWraperPosition.top + 100 > 0) {
                var opacity =
                    (kingdomWraperPosition.top + 20 - scrollTopPosition) / 200;
                $(".castle-img-wraper").css("opacity", opacity);
            } else {
                $(".castle-img-wraper").css("opacity", 1);
            }
        } else {
            if (casterPosition === "fixed") {
                casterPosition = "absolute";
                castle.css("position", casterPosition);
                initNiceScroll(CONSTANT.SCROLL_MOVE_SPEED);
            }
        }
        if (scrollTopPosition < kingdomWraperPosition.top - screenHeight) {
            minScale = 1.2;
        }
    });

    function setDefaultKingdomGate() {
      if (bypassDissabledScroll) {
        if (currentScale !== 1) {
            setScaleImage(1);
        }
        castle.css("position", 'absolute');
        castle.css("opacity", 1);
      }
    }

    function changeHeroDitection() {
        if (heroConfig.addtionHeroPosition > 0) {
            heroConfig.addtionHeroPosition = heroConfig.subDistance;
        } else {
            heroConfig.addtionHeroPosition = heroConfig.addDistance;
        }
    }

    function handleHeroRunning() {
        if (heroConfig.isShowHero) {
            heroLeft.animate(
                {
                    left: heroConfig.heroPosition,
                },
                heroConfig.timeTransform
            );
            heroRight.animate(
                {
                    right: heroConfig.heroPosition,
                },
                heroConfig.timeTransform
            );
            if (heroConfig.heroPosition == 0) {
                isDisableScroll = false;
                // hideHeroCastle();
            }
        }
    }

    function scrollToPosition(position) {
        $([document.documentElement, document.body]).animate(
            {
                scrollTop: position,
            },
            10
        );
    }
    function setScaleImage(scale) {
        if (!isDisableScroll) {
            currentScale = scale;
            castle.css(
                "transform",
                "translate3d(0px, 0px, 0px) scale(" + scale + ", " + scale + ")"
            );
            castle.css("transform-origin", "center bottom");
            var timeTransform = 100;
            if (screenWidth > 1800) {
                timeTransform = 200;
            }
            //var bottomImage = scale * scale * 40;
            // castle.css("bottom", 0 - bottomImage);
            castle.css("transition", "transform " + timeTransform + "ms ease-in-out");
        } else {
            // castle.animate({ bottom: 0 }, 80);
        }
    }

    function scaleBlockHero() {
        heroLeft.css(
            "transform",
            "translate3d(0px, 0px, 0px) scale(" +
            screenWidth / mainWidth +
            ", " +
            screenWidth / mainWidth +
            ")"
        );
        heroRight.css(
            "transform",
            "translate3d(0px, 0px, 0px) scale(" +
            screenWidth / mainWidth +
            ", " +
            screenWidth / mainWidth +
            ")"
        );
    }

    function showHeroCastle() {
        if (!heroConfig.isShowHero) {
            heroConfig.heroPosition = heroConfig.maxHeroPos;
            heroConfig.isShowHero = true;
            heroLeft.removeClass("d-none");
            heroLeft.css("visibility", "visible");
            heroLeft.css("animation", "fadein 1s");
            heroLeft.css("animation-fill-mode", "forwards");
            heroRight.removeClass("d-none");
            heroRight.css("visibility", "visible");
            heroRight.css("animation", "fadein 1s");
            heroRight.css("animation-fill-mode", "forwards");
            isHeroRunning = true;
            setTimeout(function () {
                isHeroRunning = false;
            }, heroConfig.timeTransform + 500);
            handleHeroRunning();
        }
    }

    function hideHeroCastle() {
        heroConfig.heroPosition = 0;
        handleHeroRunning();
        if (heroConfig.isShowHero) {
            heroLeft.css("animation", "fadeout 1s");
            heroRight.css("animation", "fadeout 1s");
            setTimeout(function () {
                heroLeft.addClass("d-none");
                heroRight.addClass("d-none");
                heroConfig.isShowHero = false;
                enableScroll();
            }, heroConfig.timeTransform);
        }
    }

    function disableScroll(time) {
        isDisableScroll = true;
        initNiceScroll(1);
        if (time) {
            setTimeout(function () {
                enableScroll();
            }, time);
        }
    }

    function enableScroll() {
        isDisableScroll = false;
        initNiceScroll(CONSTANT.SCROLL_MOVE_SPEED);
    }

    function initNiceScroll(mousescrollstep) {
        if (currentMoveStep != mousescrollstep) {
            currentMoveStep = mousescrollstep;
            htmlEl.getNiceScroll().remove();
            objectParam.mousescrollstep = mousescrollstep;
            htmlEl.niceScroll(objectParam);
        }
    }

    function isMobileScreen() {
        return window.matchMedia("screen and (max-width: 900px)").matches;
    }

    function initApp() {
        scaleBlockHero();
        htmlEl.niceScroll(objectParam);
    }

    initApp();
});
