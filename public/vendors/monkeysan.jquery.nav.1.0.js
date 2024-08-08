/**
 * MonkeysanNav navigation jQuery plugin.
 *
 * @author Monkeysan Team
 * @version 1.0
 * @required Modernizr
 */
; (function ($) {

    'use strict';

    /**
     * Base plugin configuration.
     *
     * @var private Object _baseConfig
     */
    var _baseConfig = {
        cssPrefix: '',
        mobileBreakpoint: 767,
        movingToAnotherPageDelay: 700,
        classes: {
            desktopActive: 'selected',
            tabletActive: 'tapped',
            mobileActive: 'tapped',
            reverse: 'reverse',
            mobileBtnAdditionalClass: '',
            bodyMovingToAnotherPage: 'body--moving-to-another-page'
        },
        mobileAnimation: {
            easing: 'easeOutQuint',
            speed: 350
        }
    }

    /**
     * Contains info about text derection.
     *
     * @var private Boolean _isRTL
     */
    var _isRTL = getComputedStyle(document.body).direction === 'rtl';

    /**
     * Adds class, if the sub-menu is not placed into the container.
     *
     * @param jQuery subMenu
     * @param String reverseClass
     *
     * @return undefined
     */
    function smartPosition(subMenu, reverseClass) {

        var width = subMenu.outerWidth(),
            wWidth = $(window).width();

        if (_isRTL) {

            if (subMenu.offset().left <= 0) subMenu.addClass(reverseClass);

        }
        else {

            var offset = subMenu.offset().left;

            if (offset + width > wWidth) subMenu.addClass(reverseClass);

        }

    }

    /**
     * Navigation Constructor function.
     *
     * @param Object options
     * @param jQuery $element
     *
     */
    function Navigation(options, $element) {

        var _w = $(window),
            _self = this;

        this.config = $.extend({}, _baseConfig, options);

        Object.defineProperties(this, {

            element: {

                get: function () {

                    return $element;

                }

            }

        });

        _w.on('resize.MonkeysanNav', function () {

            if (_self.timeOutId) clearTimeout(_self.timeOutId);

            _self.timeOutId = setTimeout(function () {

                _self._refresh();

            }, 100);

        });

        this._refresh();

    }

    /**
     * Initialize or refresh the navigation.
     *
     * @return undefined
     */
    Navigation.prototype._refresh = function () {

        if ($(window).width() <= this.config.mobileBreakpoint && !(this.state instanceof MobileState)) {

            if (this.state) this.state.destroy();

            this.state = new MobileState(this.config, this.element);
            this.state.init();

        }
        else if ($(window).width() >= this.config.mobileBreakpoint) {

            if (Modernizr.touchevents) {

                if (!(this.state instanceof TabletState)) {

                    if (this.state) this.state.destroy();

                    this.state = new TabletState(this.config, this.element);
                    this.state.init();

                }

            }
            else {

                if (!(this.state instanceof DesktopState)) {

                    if (this.state) this.state.destroy();

                    this.state = new DesktopState(this.config, this.element);
                    this.state.init();

                }

            }

        }

    }

    /**
     * AbstractState constructor function. Defines base properties for all of the states.
     *
     * @param Object config
     * @param jQuery $element
     *
     */
    function AbstractState(config, $element) {

        Object.defineProperties(this, {

            /**
             * Defines active class for the current state.
             *
             * @var public string
             */
            activeClass: {

                get: function () {

                    return this.prefix + config.classes.desktopActive;

                },
                configurable: true,
                enumerable: true

            },

            /**
             * Defines reverse class for the current state.
             *
             * @var public string
             */
            reverseClass: {

                get: function () {

                    return this.prefix + config.classes.reverse;

                },
                configurable: true,
                enumerable: true

            },

            /**
             * Link to the main navigation jQuery element.
             *
             * @var public jQuery
             */
            element: {

                get: function () {

                    return $element;

                },
                configurable: false,
                enumerable: false

            },

            /**
             * Defines css prefix.
             *
             * @var public string
             */
            classPrefix: {

                get: function () {

                    return '.' + config.cssPrefix;

                },
                configurable: false,
                enumerable: false

            },

            /**
             * Defines css prefix.
             *
             * @var public string
             */
            prefix: {

                get: function () {

                    return config.cssPrefix;

                }

            },

            /**
             * Link to the configuration object.
             *
             * @var public string
             */
            config: {

                get: function () {

                    return config;

                },
                configurable: false,
                enumerable: false

            }

        });

    }

    /**
     * DesktopState constructor function.
     *
     * @param Object config
     * @param jQuery $element
     *
     */
    function DesktopState(config, $element) {

        AbstractState.call(this, config, $element);

    }

    /**
     * Initialization of Desktop navigation state.
     *
     * @return undefined
     */
    DesktopState.prototype.init = function () {

        var _self = this;

        _self.element.on('click.MonkeysanNavDesktop', 'a', function (event) {
            var $this = $(this),
                href = $this.attr('href');
            if (href == '#') return;

            event.preventDefault();

            $('body').addClass(_self.config.cssPrefix + _self.config.classes.bodyMovingToAnotherPage);

            setTimeout(function () {
                window.location.href = href;
            }, _self.config.movingToAnotherPageDelay);
        });





        _self.element.on('mouseleave.MonkeysanNavDesktop', function (e) {

            $(this).find(_self.classPrefix + 'has-children.' + _self.activeClass + ', .menu-item-has-children.' + _self.activeClass)
                .removeClass(_self.activeClass);

            $(this).find('.' + _self.reverseClass).each(function (i, el) {

                var $this = $(el);

                $this.data('timeOutId', setTimeout(function () {

                    $this.removeClass(_self.reverseClass);

                }, 350));

            });

            e.stopPropagation();
            e.preventDefault();

        });

    }

    /**
     * Destroy-function for the Desktop state.
     *
     * @return undefined.
     */
    DesktopState.prototype.destroy = function () {

        this.element.off('.MonkeysanNavDesktop');
        this.element.find(this.classPrefix + this.activeClass).removeClass(this.activeClass);

    }











})(jQuery);
