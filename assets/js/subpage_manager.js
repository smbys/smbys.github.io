/* =========================================================================
   PROJECT INITIALIZATION SCRIPT
   Author: Hideki Shimobayashi
   Description: Custom script for project pages (Slideshow, UI interactions)
   ========================================================================= */

jQuery(document).ready(function($) {
    "use strict";

    // =========================================================================
    // 1. BACKSTRETCH SLIDESHOW (Background Image Slider)
    //    Reads image paths from 'data-images' attribute in HTML
    // =========================================================================
    var $heroHeader = $('#home.backstretched');

    if ($heroHeader.length > 0) {
        // Get image paths string from data attribute
        var imagesAttr = $heroHeader.attr('data-images');

        if (imagesAttr) {
            // Convert comma-separated string to array & trim whitespace
            var imagesArray = imagesAttr.split(',').map(function(path) {
                return path.trim();
            });

            // Initialize Backstretch
            // Note: Requires jquery.backstretch.js (included in plugins.js)
            if ($.fn.backstretch) {
                $heroHeader.backstretch(imagesArray, {
                    duration: 5000, // Switch every 5 seconds
                    fade: 750       // Fade transition speed
                });

                // --- Slideshow Navigation (Prev/Next Arrows) ---
                $('a[href="#prev-slide"]').on('click', function(e) {
                    e.preventDefault();
                    $heroHeader.data('backstretch').prev();
                });

                $('a[href="#next-slide"]').on('click', function(e) {
                    e.preventDefault();
                    $heroHeader.data('backstretch').next();
                });
            } else {
                console.warn('Backstretch plugin is missing.');
            }
        }
    }

    // =========================================================================
    // 2. UI INTERACTIONS & UTILITIES
    // =========================================================================
    
    // --- Mobile Menu: Close on click ---
    $('.navbar-collapse a').on('click', function() {
        $(".navbar-collapse").collapse('hide');
    });

    // --- Back to Top Button ---
    var $backToTop = $('#back-to-top');
    if ($backToTop.length) {
        var scrollTrigger = 100; // px
        
        // Show/Hide button based on scroll position
        $(window).on('scroll', function () {
            if ($(window).scrollTop() > scrollTrigger) {
                $backToTop.addClass('show');
            } else {
                $backToTop.removeClass('show');
            }
        });

        // Scroll to top animation
        $backToTop.on('click', function (e) {
            e.preventDefault();
            $('html,body').animate({
                scrollTop: 0
            }, 700);
        });
    }

    // =========================================================================
    // 3. THIRD-PARTY PLUGINS INITIALIZATION
    // =========================================================================

    // --- WOW.js (Scroll Animations) ---
    if (typeof WOW !== 'undefined') {
        new WOW().init();
    }

    // --- FitVids (Responsive Video Embeds) ---
    if ($.fn.fitVids) {
        $(".frame-wrapper").fitVids();
    }

    // --- Owl Carousel (Image Sliders) ---
    if ($.fn.owlCarousel) {
        $('.owl-carousel').owlCarousel({
            navigation: false,
            pagination: false,
            autoPlay: 8000,
            loop: true,
            singleItem: true // Ensures one image at a time
        });
    }

    // --- Magnific Popup (Lightbox) ---
    if ($.fn.magnificPopup) {
        $('.lb-link, .image-gallery').magnificPopup({
            preloader: true,
            type: 'image',
            removalDelay: 300,
            mainClass: 'fadeInDown',
            gallery: { enabled: true }
        });
    }

});