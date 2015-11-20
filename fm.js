var bkgWid=1920;
var bkgHgt=940;
var fixW=0.7;
var fixH=0.7;
var bsW=0.30;
var bsH=0.50;
var textWid=500;
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
	console.log({'padding-left':offw+'px','padding-top':offh+'px'});
	$('.frontpage').css({'padding-left':offw+'px','padding-top':offh+'px'});
	//$('#frontpage-label-container').css({'margin-left':offw+'px','margin-top':offh+'px'});
}