$(document).ready(function(){
	$(".screenshot-slider").slick({
		arrows: false,
		dots: true
	});

	$(".slider-previous").click(function(){
		$(".screenshot-slider").slick("slickPrev");
	});

	$(".slider-next").click(function(){
		$(".screenshot-slider").slick("slickNext");
	});
});