jQuery Transition
=================

Use css transition instead of jQuery.animate when available.

Synthax
-------

.transition() uses the same synthax as the .animate() method:

.animate( properties [, duration] [, complete] )
**properties** A map of CSS properties that the animation will move toward.
**duration** A string or number determining how long the animation will run.
**complete** A function to call once the animation is complete


	jQuery('#child').transition({
		left: "200px",
		top: "20px"
	},300,function(){
		//when animation is complete
	})
