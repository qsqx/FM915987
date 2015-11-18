var bkgWid=1920;
var bkgHgt=940;
var fixW=0.7;
var fixH=0.7;
var bsW=0.30;
var bsH=0.50;
var textWid=600;
function reszBkg(){
	//resize image
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
	console.log($(window).width()+'/'+w+','+winH+'/'+h+','+offw+'/'+offh);
	$('#main-bar').height($(window).height()).css("background-size",w+'px '+h +'px').css("background-position",offw+'px '+offh+'px');
	w=textWid;
	h=$('#front-page-container').height();
	//resize text
	offw=Math.round(bsW*winW-bsW*w);
	offw=Math.max(0,offw);
	offh=Math.round(bsH*winH-bsH*h);
	$('#front-page-container').css("margin-left",offw+'px');
	$('#front-page-container').css("margin-top",offh+'px');
}