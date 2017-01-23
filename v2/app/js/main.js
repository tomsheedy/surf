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

			Grid.init();

		// Scrolly links.
			$('.scrolly').scrolly();

		// Scroll function - if grid close button is visible but off screen, close that grid expander.
		// $(window).scroll(function() {
		//     clearTimeout($.data(this, 'scrollTimer'));
		//     $.data(this, 'scrollTimer', setTimeout(function() {

		//         console.log("Haven't scrolled in 250ms!");

		//         if($('.og-expanded .og-close').length) {

		// 	        // Close grid items.
		// 	        if(!$('.og-expanded .og-close').isOnScreen()) {
		// 	        	console.log('Close...');
		// 	        	// console.log(Grid);
		// 	        	Grid.initEvents();
		// 	        } else {
		// 	        	console.log('Not closing..');
		// 	        }
		//     	}

		//     }, 250));
		// });

		// // Scroll grid preview at mobile using down arrow.

		// 	$('.scroller').click(function() {

		// 		console.log('clicked');

	 //            scrolled = scrolled + 300;
	    
		// 		$(this).parent().find('.og-details').animate({
		// 			scrollTop:  scrolled
		// 		});

		// 	});


 
			$('.scroller').on("click", function(){ alert('hoy') })


		// Off-Canvas Mobile Navigation.

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
	});

})(jQuery);
