var Mad = (function ($) {
    'use strict';

    var App = {},
        DOMDfd = $.Deferred(),
        $body = $('body'),
        $doc = $(document);

    App.modules = {};
    App.helpers = {};
    App._localCache = {};

    App.ISTOUCH = Modernizr.touchevents;
    App.ANIMATIONDURATION = 500;
    App.ANIMATIONEASING = 'easeOutQuart';
    App.ANIMATIONSUPPORTED = Modernizr.cssanimations;
    App.ANIMATIONEND = "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
    App.RTL = getComputedStyle(document.body).direction === 'rtl';
    App.ISLEGACYBROWSER = !Modernizr.flexbox;
    App.ISFIREFOX = window.navigator.userAgent.indexOf('Firefox') != -1;

    App.afterDOMReady = function () {


        /* ------------------------------------------------
            Revolution slider
        ------------------------------------------------ */

        var $revSlider1 = $('#rev-slider-1'),
            revApi1;

        if ($revSlider1.length && $.fn.revolution) {
            revApi1 = $revSlider1.show().revolution({
                dottedOverlay: 'mad',
                disableProgressBar: "on",
                spinner: 'spinner3',
                gridwidth: [1440, 1024, 1024, 580],
                gridheight: [848, 848, 848, 848],
                responsiveLevels: [1440, 1024, 813, 580],
                navigation: {
                    keyboardNavigation: 'on',
                    keyboard_direction: 'horizontal',
                    onHoverStop: 'false',
                    arrows: {
                        enable: false,
                    },
                    bullets: {
                        enable: false,
                        style: 'mad',
                        hide_onleave: false,
                        h_align: 'left',
                        v_align: 'bottom',
                        direction: 'horisontal',
                        h_offset: 90,
                        v_offset: 70
                    }
                }
            });

        }

        if (this.helpers.revArrowsOutside) this.helpers.revArrowsOutside();

        var $revSlider2 = $('#rev_slider_1_1_wrapper');

        if ($revSlider2.length && $.fn.revolution) {
            var revapi2,
                tpj;
            (function () {
                if (!/loaded|interactive|complete/.test(document.readyState)) document.addEventListener("DOMContentLoaded", onLoad); else onLoad();

                function onLoad() {
                    if (tpj === undefined) { tpj = jQuery; if ("off" == "on") tpj.noConflict(); }
                    if (tpj("#rev_slider_1_1").revolution == undefined) {
                        revslider_showDoubleJqueryError("#rev_slider_1_1");
                    } else {
                        revapi2 = tpj("#rev_slider_1_1").show().revolution({
                            sliderType: "standard",
                            jsFileLocation: "//velikorodnov.com/temp/17/revslider/public/assets/js/",
                            sliderLayout: "auto",
                            dottedOverlay: "none",
                            delay: 9500,
                            navigation: {
                                onHoverStop: "off",
                            },
                            visibilityLevels: [1240, 1024, 778, 480],
                            gridwidth: 1920,
                            gridheight: 1200,
                            responsiveLevels: [1440, 1024, 813, 580],
                            lazyType: "none",
                            shadow: 0,
                            spinner: "spinner0",
                            stopLoop: "off",
                            stopAfterLoops: -1,
                            stopAtSlide: -1,
                            shuffle: "off",
                            autoHeight: "off",
                            disableProgressBar: "on",
                            hideThumbsOnMobile: "off",
                            hideSliderAtLimit: 0,
                            hideCaptionAtLimit: 0,
                            hideAllCaptionAtLilmit: 0,
                            startWithSlide: 0,
                            debugMode: false,
                            fallbacks: {
                                simplifyAll: "off",
                                nextSlideOnWindowFocus: "off",
                                disableFocusListener: false,
                            }
                        });
                    }; /* END OF revapi call */
                }; /* END OF ON LOAD FUNCTION */
            }()); /* END OF WRAPPING FUNCTION */
        }

        /* ------------------------------------------------
            End of Revolution slider
        ------------------------------------------------ */










        DOMDfd.resolve();

    };


    /* ----------------------------------------
        Bg move
    ---------------------------------------- */

    App.modules.bgMove = function () {

        var lFollowX = 0,
            lFollowY = 0,
            x = 0,
            y = 0,
            friction = 1 / 30;

        function moveBackground() {
            x += (lFollowX - x) * friction;
            y += (lFollowY - y) * friction;

            var translate = 'translate(' + x + 'px, ' + y + 'px) scale(1)';

            $('.bg-move').css({
                '-webit-transform': translate,
                '-moz-transform': translate,
                'transform': translate
            });

            window.requestAnimationFrame(moveBackground);
        }

        $(window).on('mousemove click', function (e) {

            var lMouseX = Math.max(-100, Math.min(100, $(window).width() / 2 - e.clientX));
            var lMouseY = Math.max(-100, Math.min(100, $(window).height() / 2 - e.clientY));
            lFollowX = (20 * lMouseX) / 100; // 100 : 12 = lMouxeX : lFollow
            lFollowY = (10 * lMouseY) / 100;

        });

        moveBackground();
    }

    /* ----------------------------------------
        Bg move
    ---------------------------------------- */

    /* ----------------------------------------
        View Types
    ---------------------------------------- */

    App.modules.viewTypes = function () {

        var collection = $('[data-view]');
        if (!collection.length) return;

        if ($('.mad-full-page-wrap').length) {
            $('.toggle-map').on('click', function (e) {
                e.preventDefault();
                $(this).toggleClass('active');
                $('body').toggleClass('mad-full-page');
            });
            $('.toggle-list').on('click', function (e) {
                e.preventDefault();
                $('.toggle-map').addClass('active not-active');
                $('body').addClass('mad-full-page');
            });
            $('.toggle-grid').on('click', function (e) {
                e.preventDefault();
                $('.toggle-map').removeClass('not-active');
            });
        } else {
            $('.toggle-map').on('click', function (e) {
                e.preventDefault();
                $(this).toggleClass('active');
                $('.gmap-toggle').slideToggle();
            });
        }

        collection.on('click', function (e) {

            e.preventDefault();
            var $this = $(this),
                target = $($this.data('target'));

            $this
                .addClass('active')
                .siblings("a:not('.toggle-map')")
                .removeClass('active');

            target
                .removeClass('mad-entity-hr mad-entity-vr mad-entity-ar')
                .addClass('mad-entity-' + $this.data('view'));

            target
                .removeClass('style-2 style-4 mad-entity-2 mad-entity-4')
                .addClass('style-' + $this.data('view'));

            $('.owl-carousel').trigger('refresh.owl.carousel');

        });

        $('.view-type a').on('click', function () {
            $('.owl-carousel').trigger('refresh.owl.carousel');
        });

        return collection;

    }

    /* ----------------------------------------
        View Types
    ---------------------------------------- */

    /**
     * Emulates single accordion item
     * @param Function callback
     * @return jQuery collection;
     **/
    App.modules.hiddenSections = function (callback) {

        var collection = $('.hidden-section');
        if (!collection.length) return;

        collection.each(function (i, el) {
            $(el).find('.content').hide();
        });

        collection.on('click.hidden', '.invoker', function (e) {

            e.preventDefault();

            var content = $(this).closest('.hidden-section').find('.content');

            content.slideToggle({
                duration: 500,
                easing: 'easeOutQuint',
                complete: callback ? callback : function () { }
            });

        });

        return collection;

    },

        $.extend({
            isjQuery: function (element, elementExists) {
                if (element === undefined || element === null) return false;

                if (elementExists === undefined) {
                    return element instanceof jQuery;
                }
                else {
                    return $.isjQuery(element) && element.length;
                }
            }
        });

    $.fn.extend({
        jQueryImagesLoaded: function () {
            var $imgs = this.find('img[src!=""]');

            if (!$imgs.length) { return $.Deferred().resolve().promise(); }

            var dfds = [];

            $imgs.each(function () {
                var dfd = $.Deferred();
                dfds.push(dfd);
                var img = new Image();
                img.onload = function () { dfd.resolve(); };
                img.onerror = function () { dfd.resolve(); };
                img.src = this.src;
            });

            return $.when.apply($, dfds);
        }
    });

    $doc.on('beforeClose', function (event) {
        if ($(event.target).hasClass('mad-modal')) {
            event.stopImmediatePropagation();
        }
    });

    $doc.ready(function () {
        App.afterDOMReady();
    });
    $(window).on('load', function () {



        $("#close-msg").on('click', function () {
            $(this).parent().fadeOut();
        });

        $('.mad-products .mad-grid-item').parent().each(function () {
            var height = 0,
                column = $(this).find('.mad-grid-item');
            column.each(function () {
                if ($(this).height() > height) height = $(this).height();
            });
            column.height(height);
        });

        if ($('#toggle-item').length) {
            $("#toggle-btn").on('click', function () {
                $(this).next().toggleClass('active');
            });
            $(".toggle-section-close").on('click', function () {
                $(this).parent().removeClass('active');
            });
        };

        if ($('#mad-order-section').length) {
            $('#mad-order-section li.mad-action-area').on('click', function () {
                $(this).addClass('selected').siblings().removeClass('selected');
            });
        };

        if ($('#page-popup').length) {
            $('#page-popup.share-popup').hide();
            $('.mad-popup-open').on('click', function (e) {
                e.preventDefault();
                $('#page-popup').show();
            });
            $('#mad-popup-close').on('click', function () {
                $('#page-popup').fadeOut();
            });
        };

        if ($('#mad-filter-list').length) {
            $('.mad-filter-list ul li').on('click', function () {
                $(this).toggleClass('toggle');
            });
        };

        const $menu = $('#toggle-item');

        $(document).mouseup(e => {
            if (!$menu.is(e.target) // if the target of the click isn't the container...
                && $menu.has(e.target).length === 0) // ... nor a descendant of the container
            {
                $('.toggle-section').removeClass('active');
            }
        });

    });

    /* ---------------------------------------------------- */
    /*	Elevate zoom										*/
    /* ---------------------------------------------------- */

    if ($('[data-zoom-image]').length) {

        var button = $('.qv-preview');

        $("#zoom-image").elevateZoom({
            gallery: 'thumbnails',
            galleryActiveClass: 'active',
            zoomType: "inner",
            cursor: "crosshair",
            responsive: true,
            zoomWindowFadeIn: 500,
            zoomWindowFadeOut: 500,
            easing: true,
            lensFadeIn: 500,
            lensFadeOut: 500
        });

    }

    /* ---------------------------------------------------- */
    /*	Elevate zoom										*/
    /* ---------------------------------------------------- */


    return App;

})(window.jQuery);