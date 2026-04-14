/* ===================================================================
 *
 *  Jadesola Adeagbo Portfolio — Main JS
 *
 * =================================================================== */

(function($) {

    "use strict";

    var cfg = {
        scrollDuration: 700,
    };

    var $WIN = $(window);

    // Attach user-agent data for browser detection
    document.documentElement.setAttribute('data-useragent', navigator.userAgent);


    /* Preloader
    * ------------------------------------------------------------------ */
    var ssPreloader = function() {

        $('html').addClass('ss-preload');

        $WIN.on('load', function() {

            $('html, body').animate({ scrollTop: 0 }, 'normal');

            $('#loader').fadeOut('slow', function() {
                $('#preloader').delay(300).fadeOut('slow');
            });

            $('html').removeClass('ss-preload').addClass('ss-loaded');
        });
    };


    /* Sticky header on scroll
    * ------------------------------------------------------------------ */
    var ssHeaderScroll = function() {

        var $hdr = $('.s-header');

        $WIN.on('scroll', function() {
            if ($WIN.scrollTop() > 80) {
                $hdr.addClass('sticky');
            } else {
                $hdr.removeClass('sticky');
            }
        });
    };


    /* Mobile Menu
    * ------------------------------------------------------------------ */
    var ssMobileMenu = function() {

        var $toggle = $('.header-menu-toggle');
        var $nav    = $('.header-nav-wrap');
        var $hdr    = $('.s-header');

        $toggle.on('click', function(e) {
            e.preventDefault();
            $toggle.toggleClass('is-clicked');
            $nav.toggleClass('mobile-open');
            $hdr.toggleClass('sticky'); // keep header solid when menu is open
            $('body').toggleClass('menu-is-open');
        });

        // Close on nav link click
        $nav.find('a').on('click', function() {
            $toggle.removeClass('is-clicked');
            $nav.removeClass('mobile-open');
            $('body').removeClass('menu-is-open');
        });

        // Re-evaluate on resize
        $WIN.on('resize', function() {
            if ($WIN.width() > 800) {
                $toggle.removeClass('is-clicked');
                $nav.removeClass('mobile-open');
                $('body').removeClass('menu-is-open');
            }
        });
    };


    /* Highlight active nav section via Waypoints
    * ------------------------------------------------------------------ */
    var ssWaypoints = function() {

        var $sections  = $('.target-section');
        var $navLinks  = $('.header-main-nav li a');

        $sections.waypoint({
            handler: function(direction) {

                var $active = $('section#' + this.element.id);

                if (direction === 'up') {
                    $active = $active.prevAll('.target-section').first();
                }

                var $activeLink = $('.header-main-nav li a[href="#' + $active.attr('id') + '"]');

                $navLinks.parent().removeClass('current');
                $activeLink.parent().addClass('current');
            },
            offset: '25%'
        });
    };


    /* Smooth Scrolling
    * ------------------------------------------------------------------ */
    var ssSmoothScroll = function() {

        $('.smoothscroll').on('click', function(e) {

            var target  = this.hash;
            var $target = $(target);

            e.preventDefault();
            e.stopPropagation();

            $('html, body').stop().animate({
                scrollTop: $target.offset().top
            }, cfg.scrollDuration, 'swing').promise().done(function() {
                window.location.hash = target;
            });
        });
    };


    /* Animate on Scroll (AOS)
    * ------------------------------------------------------------------ */
    var ssAOS = function() {

        AOS.init({
            offset    : 80,
            duration  : 650,
            easing    : 'ease-out',
            delay     : 80,
            once      : true,
        });
    };


    /* Initialize
    * ------------------------------------------------------------------ */
    (function ssInit() {

        ssPreloader();
        ssHeaderScroll();
        ssMobileMenu();
        ssWaypoints();
        ssSmoothScroll();
        ssAOS();

    })();

})(jQuery);
