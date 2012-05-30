// jQuery.transition : jQuery animate with css transtitions if available.
(function(jQuery) {
	var lastTime = 0;
	var vendors = ['ms', 'moz', 'webkit', 'o'];
	for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
			window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
			window.cancelAnimationFrame =
				window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
	}

	if (!window.requestAnimationFrame)
			window.requestAnimationFrame = function(callback, element) {
					var currTime = new Date().getTime();
					var timeToCall = Math.max(0, 16 - (currTime - lastTime));
					var id = window.setTimeout(function() { callback(currTime + timeToCall); },
						timeToCall);
					lastTime = currTime + timeToCall;
					return id;
			};

	if (!window.cancelAnimationFrame)
			window.cancelAnimationFrame = function(id) {
					clearTimeout(id);
			};

	var transEndEventNames = {
			'WebkitTransition' : 'webkitTransitionEnd',
			'MozTransition'    : 'transitionend',
			'OTransition'      : 'oTransitionEnd',
			'msTransition'     : 'MSTransitionEnd',
			'transition'       : 'transitionend'
	};
	window.Modernizr.transEndEventName = transEndEventNames[window.Modernizr.prefixed('transition')];

	jQuery.fn.extend({
		transition: function(o,speed,callback){
			var lastElmt = this.last();
			this.each(function(i,el){
				var that = jQuery(this),
					iStyles = 0;
					iObject = 0;
				for(i in o){
					iObject++
					if(that.css(i) == o[i]){
						iStyles++
					}
				}
				if(iObject> iStyles){
					if(Modernizr.csstransitions){
						this.style[Modernizr.prefixed('transition')] = "all "+speed+"ms ease-in-out";
						that.one(Modernizr.transEndEventName,function(e){
							e.currentTarget.style[Modernizr.prefixed('transition')] = "";
							if(!!callback && lastElmt.is(that)){
								callback();
							}
						})
						window.requestAnimationFrame(function(){
							that.css(o);
						})
					}else{
						that.animate(o,speed,callback);
					}
				}else{
					if(!!callback){
						callback();
					}
				}
			});
		}
	});
}(jQuery));