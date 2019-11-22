var GR = (function($) {

	var init = function() {

		var loaded = false;
		var totalElements = 0;
		var newCursor = $('.cursor');
		var cursorHover = $('a');

		window.addEventListener('mousemove', e => {
			// console.log(e.clientX);
			newCursor.css('-webkit-transform', 'translate3d(' + (e.pageX-(newCursor.width()/2)) + 'px,' + (e.pageY-(newCursor.width()/2)) + 'px,0)')
				   .css('transform', 'translate3d(' + (e.pageX-(newCursor.width()/2)) + 'px,' + (e.pageY-(newCursor.width()/2)) + 'px,0)');

			// newCursor.css({"left": (e.pageX-15) + "px", "top": (e.pageY-15) + "px"});

		});
		
		$("a").hover(function(){
			newCursor.addClass('cursor-hover');
		}, function(){
			newCursor.removeClass('cursor-hover');
		});


		// Label Intro
		$('.label').each(function(index) {
			var item = $(this);
			if(isOnScreen(item)) {
				setTimeout(function(){
					item.find("div").addClass('visible');
				}, 200*totalElements); 
				totalElements++;
			}
		});

		// Mask Text Intro
		$('.mask-text').each(function(index) {
			var item = $(this);
			if(isOnScreen(item)) {
				setTimeout(function(){
					item.find("span").addClass('visible');
				}, 200*totalElements); 
				totalElements++;
			}
		});

		setTimeout(function(){
			loaded = true;
		}, 50*totalElements); 

		// Mask Text Waypoints
		$('.mask-text').each(function(index) {
			var inview = new Waypoint.Inview({
				element: $(this),
				enter: function(direction) {
					if(loaded) {
						this.element.find("span").addClass('visible');
					}
				}
			});
		});

		// Label Text Waypoints
		$('.mainphoto, .label').each(function(index) {
			var inview = new Waypoint.Inview({
				element: $(this),
				enter: function(direction) {
					if(loaded) {
						this.element.find("div").addClass('visible');
					}
				}
			});
		});

	};

	var setMode = function(mode) {

		$('.colormode a').removeClass('active');

		if(mode === 'dark') {
			$('html').removeClass('light');
			$('html').addClass('dark');

			$('.colorDark').addClass('active');
		} else {
			$('html').removeClass('dark');
			$('html').addClass('light');

			$('.colorLight').addClass('active');
		}

	};

	var isOnScreen = function(el) {
		var elementTop = $(el).offset().top;
		var elementBottom = elementTop + $(el).outerHeight();
		var viewportTop = $(window).scrollTop();
		var viewportBottom = viewportTop + $(window).height();
		return elementBottom > viewportTop && elementTop < viewportBottom;
	};
	
	return {
		init: init,
		setMode: setMode,
		isOnScreen: isOnScreen
	};

}(jQuery));

$(function() {
	GR.init();
});
