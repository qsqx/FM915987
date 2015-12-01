var bkgWid=1920;
var bkgHgt=940;
var fixW=0.7;
var fixH=0.7;
var bsW=0.30;
var bsH=0.50;
var textWid=500;
var arr;
var playnw=null;
function reszBkg(){
	//resize image
	$('.frontpage').css({'width':$(window).width()+'px','height':$(window).height()+'px'});
	$('.frontpage').css({'width':$(window).width()+'px','height':$(window).height()+'px'});
	var winH=$(window).height();
	var winW=$(window).width();
	var w=winW;
	var h=Math.round(bkgHgt/bkgWid*w);
	if(h<winH){
		h=winH;
		w=Math.round(bkgWid/bkgHgt*h);
	}
	var offw=Math.round(fixW*winW-fixW*w);
	var offh=Math.round(fixH*winH-fixH*h);
	$('.frontpage').css({'background-size':w+'px '+h+'px','background-position':offw+'px '+offh+'px','width':winW+'px','height':winH+'px'});
	w=textWid;
	h=$('#frontpage-label-container').height();
	//resize text
	offw=Math.round(bsW*winW-bsW*w);
	offw=Math.max(0,offw);
	offh=Math.round(bsH*winH-bsH*h);
	offh=Math.max(0,offh);
	$('.frontpage').css({'padding-left':offw+'px','padding-top':offh+'px'});
	//$('#frontpage-label-container').css({'margin-left':offw+'px','margin-top':offh+'px'});
}
$(document).ready(function(){
	$('#spread').on('click',function(){
		$(window).off('resize');
		var w=$(window).width();
		w=Math.max(w,1320);
		w=w-1280;
		$('#main-container').css('min-width','1320px');
		$('.frontpage-container').animate({'width':'320px','height':'600px','margin-top':'18px','margin-left':w*0.56+960+'px','border-radius':'8px'},'slow','swing',function(){
			$('#front-page-container').animate({'background-size':'240px 240px','background-position':'30px 45px'},'slow');			
			$('.frontpage').css({'padding':'0px','width':'100%','height':'100%'}).animate(
				{'width':'240px','height':'240px','margin':'40px'},'slows','swing',function(){
					$('.frontpage').css({'background-size':'240px 240px','background-position':'0px 0px','background-image':'url(17105288983053444_320x320.png)'});
					$('.profile-detail').fadeIn('slow',function(){
						$('.frontpage-container').css('margin-left',w*0.12+'px');
						$('#list-container').fadeIn('slow');
						$(window).on('resize',function(){
							var w=$(window).width();
							w=Math.max(w,1320);
							w=w-1280;
							$('#list-container').css('margin-left',w*0.44+'px');
							$('.frontpage-container').css('margin-left',w*0.12+'px');
						}).resize();
					});
				});						
		});
		$('#frontpage-label-container').remove();
	});
}).ready(function(){
	$(window).on('resize',reszBkg);
}).ready(reszBkg).ready(function(){
	//$('#spread').click();
});