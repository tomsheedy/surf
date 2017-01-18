/*
	Helios by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var settings = {

		// Carousels
			carousels: {
				speed: 4,
				fadeIn: true,
				fadeDelay: 250
			},

	};

	skel.breakpoints({
		wide: '(max-width: 1680px)',
		normal: '(max-width: 1280px)',
		narrow: '(max-width: 960px)',
		narrower: '(max-width: 840px)',
		mobile: '(max-width: 736px)'
	});

	$(function() {

		var	$window = $(window),
			$body = $('body');

		// Back to top
		// browser window scroll (in pixels) after which the "back to top" link is shown
		var offset = 300,
			//browser window scroll (in pixels) after which the "back to top" link opacity is reduced
			offset_opacity = 1200,
			//duration of the top scrolling animation (in ms)
			scroll_top_duration = 700,
			//grab the "back to top" link
			$back_to_top = $('.cd-top');

		// Hide or show the "back to top" link
		$(window).scroll(function(){
			( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
			if( $(this).scrollTop() > offset_opacity ) { 
				$back_to_top.addClass('cd-fade-out');
			}
		});

		// Smooth scroll to top
		$back_to_top.on('click', function(event){
			event.preventDefault();
			$('body,html').animate({
				scrollTop: 0 ,
			 	}, scroll_top_duration
			);
		});

		// Gallery.
		$('a.gallery').featherlightGallery({
	        previousIcon: '&#9664;',     /* Code that is used as previous icon */
	        nextIcon: '&#9654;',         /* Code that is used as next icon */
	        galleryFadeIn: 100,          /* fadeIn speed when slide is loaded */
	        galleryFadeOut: 300          /* fadeOut speed before slide is loaded */
	    });

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				$body.removeClass('is-loading');
			});

		// CSS polyfills (IE<9).
			if (skel.vars.IEVersion < 9)
				$(':last-child').addClass('last-child');

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on mobile.
			skel.on('+mobile -mobile', function() {
				$.prioritize(
					'.important\\28 mobile\\29',
					skel.breakpoint('mobile').active
				);
			});

		// Dropdowns.
			// $('#nav > ul').dropotron({
			// 	mode: 'fade',
			// 	speed: 350,
			// 	noOpenerFade: true,
			// 	alignment: 'center'
			// });

			Grid.init();

		// Scrolly links.
			$('.scrolly').scrolly();

		// Off-Canvas Navigation.

			// Navigation Button.
				$(
					'<div id="navButton">' +
						'<a href="#navPanel" class="toggle"></a>' +
					'</div>'
				)
					.appendTo($body);

			// Navigation Panel.
				$(
					'<div id="navPanel">' +
						'<nav>' +
							$('#nav').navList() +
						'</nav>' +
					'</div>'
				)
					.appendTo($body)
					.panel({
						delay: 500,
						hideOnClick: true,
						hideOnSwipe: true,
						resetScroll: true,
						resetForms: true,
						target: $body,
						visibleClass: 'navPanel-visible'
					});

			// Fix: Remove navPanel transitions on WP<10 (poor/buggy performance).
				if (skel.vars.os == 'wp' && skel.vars.osVersion < 10)
					$('#navButton, #navPanel, #page-wrapper')
						.css('transition', 'none');

		// // Carousels.
		// 	$('.carousel').each(function() {

		// 		var	$t = $(this),
		// 			$forward = $('<span class="forward"></span>'),
		// 			$backward = $('<span class="backward"></span>'),
		// 			$reel = $t.children('.reel'),
		// 			$items = $reel.children('article');

		// 		var	pos = 0,
		// 			leftLimit,
		// 			rightLimit,
		// 			itemWidth,
		// 			reelWidth,
		// 			timerId;

		// 		// Items.
		// 			if (settings.carousels.fadeIn) {

		// 				$items.addClass('loading');

		// 				$t.onVisible(function() {
		// 					var	timerId,
		// 						limit = $items.length - Math.ceil($window.width() / itemWidth);

		// 					timerId = window.setInterval(function() {
		// 						var x = $items.filter('.loading'), xf = x.first();

		// 						if (x.length <= limit) {

		// 							window.clearInterval(timerId);
		// 							$items.removeClass('loading');
		// 							return;

		// 						}

		// 						if (skel.vars.IEVersion < 10) {

		// 							xf.fadeTo(750, 1.0);
		// 							window.setTimeout(function() {
		// 								xf.removeClass('loading');
		// 							}, 50);

		// 						}
		// 						else
		// 							xf.removeClass('loading');

		// 					}, settings.carousels.fadeDelay);
		// 				}, 50);
		// 			}

		// 		// Main.
		// 			$t._update = function() {
		// 				pos = 0;
		// 				rightLimit = (-1 * reelWidth) + $window.width();
		// 				leftLimit = 0;
		// 				$t._updatePos();
		// 			};

		// 			if (skel.vars.IEVersion < 9)
		// 				$t._updatePos = function() { $reel.css('left', pos); };
		// 			else
		// 				$t._updatePos = function() { $reel.css('transform', 'translate(' + pos + 'px, 0)'); };

		// 		// Forward.
		// 			$forward
		// 				.appendTo($t)
		// 				.hide()
		// 				.mouseenter(function(e) {
		// 					timerId = window.setInterval(function() {
		// 						pos -= settings.carousels.speed;

		// 						if (pos <= rightLimit)
		// 						{
		// 							window.clearInterval(timerId);
		// 							pos = rightLimit;
		// 						}

		// 						$t._updatePos();
		// 					}, 10);
		// 				})
		// 				.mouseleave(function(e) {
		// 					window.clearInterval(timerId);
		// 				});

		// 		// Backward.
		// 			$backward
		// 				.appendTo($t)
		// 				.hide()
		// 				.mouseenter(function(e) {
		// 					timerId = window.setInterval(function() {
		// 						pos += settings.carousels.speed;

		// 						if (pos >= leftLimit) {

		// 							window.clearInterval(timerId);
		// 							pos = leftLimit;

		// 						}

		// 						$t._updatePos();
		// 					}, 10);
		// 				})
		// 				.mouseleave(function(e) {
		// 					window.clearInterval(timerId);
		// 				});

		// 		// Init.
		// 			$window.load(function() {

		// 				reelWidth = $reel[0].scrollWidth;

		// 				skel.on('change', function() {

		// 					if (skel.vars.touch) {

		// 						$reel
		// 							.css('overflow-y', 'hidden')
		// 							.css('overflow-x', 'scroll')
		// 							.scrollLeft(0);
		// 						$forward.hide();
		// 						$backward.hide();

		// 					}
		// 					else {

		// 						$reel
		// 							.css('overflow', 'visible')
		// 							.scrollLeft(0);
		// 						$forward.show();
		// 						$backward.show();

		// 					}

		// 					$t._update();

		// 				});

		// 				$window.resize(function() {
		// 					reelWidth = $reel[0].scrollWidth;
		// 					$t._update();
		// 				}).trigger('resize');

		// 			});

		// 	});

	});

})(jQuery);
