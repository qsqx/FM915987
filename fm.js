var bkgWid=1920;
var bkgHgt=940;
var fixW=0.7;
var fixH=0.7;
var bsW=0.30;
var bsH=0.50;
var textWid=500;
var arr;
var playnw=null;
var param={
	welcome:true,
	pageSize:20,
	page:1
};
var sizer={
	reszBkg: function(){
		//resize image
		$('.frontpage-container').css({'width':$(window).width()+'px','height':$(window).height()+'px'});
		$('.frontpage-container').css({'width':$(window).width()+'px','height':$(window).height()+'px'});
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
		$('.frontpage').css({'background-size':w+'px '+h+'px','background-position':offw+'px '+offh+'px'});
		w=textWid;
		h=$('#frontpage-label-container').height();
		//resize text
		offw=Math.round(bsW*winW-bsW*w);
		offw=Math.max(0,offw);
		offh=Math.round(bsH*winH-bsH*h);
		offh=Math.max(0,offh);
		$('.frontpage').css({'padding-left':offw+'px','padding-top':offh+'px'});
	},
	reszPage:function(){
		var w=$(window).width();
		w=Math.max(w,1320);
		w=w-1280;
		$('#list-container').css('margin-left',w*0.44+'px');
		$('.frontpage-container').css('margin-left',w*0.12+'px');
	},
	getFcAniCss:function(w){
		return {
			'width':'320px',
			'height':'600px',
			'margin-top':'18px',
			'margin-left':w*0.56+960+'px',
			'border-radius':'8px'
		};
	},
	fpCss:{
		'width':'240px',
		'height':'240px',
		'margin':'40px'
	}
}
$(document).ready(function(){
	if(param.welcome){
		$('.profile').removeClass('profile').addClass('frontpage');
		$(window).on('resize',sizer.reszBkg).resize();
		$('#spread').on('click',function(){
			$(window).off('resize');
			$('#frontpage-label-container').empty();
			var w=$(window).width();
			w=Math.max(w,1320)-1280;
			$('#main-container').css('min-width','1320px');
			$('.frontpage-container').animate(sizer.getFcAniCss(w),'slow','swing',function(){
				$('.frontpage').removeAttr('style').animate(sizer.fpCss,'slows','swing',function(){
					$('.frontpage').removeClass('frontpage').addClass('profile');
					$('.profile-detail').fadeIn('slow',function(){
						$('.frontpage-container').css('margin-left',w*0.12+'px');
						$('#list-container').fadeIn('slow');
						$(window).on('resize',sizer.reszPage).resize();
					});
				});						
			});
		});
	}
	else{
		var w=$(window).width();
		w=Math.max(w,1320)-1280;
		$('#frontpage-label-container').empty();
		$('#main-container').css('min-width','1320px');
		$('.frontpage-container').css(sizer.getFcAniCss(w));
		$('.profile').removeAttr('style').css(sizer.fpCss);
		$('.profile-detail').show();
		$('.frontpage-container').css('margin-left',w*0.12+'px');
		$('#list-container').show();
		$(window).on('resize',sizer.reszPage).resize();
	}
});
var pager={
	switchPage:function(e){
		var l=$('#list-container .list-group');
		player.pause();
		l.empty();
		e=Math.max(e,1);
		var bg=(e-1)*param.pageSize,end=e*param.pageSize;
		end=Math.min(end,arr.length);
		for(var i=bg;i<end;++i){
			l.append('<li class="list-group-item playlist-item" id=\"item-'+i+'\">'+getPlaylist(arr[i],i)+'</li>');
		}
		this.pgnw=e;
		return this;
	},
	init:function(){
		this.pgs=Math.ceil(arr.length/param.pageSize);
		for(var i = 1;i<=this.pgs;++i){
			$('.page-label').append('<li><a href="#!/?welcome=false&page='+i+'" onclick="pager.switchPage('+i+')">'+i+'</a></li>');
		}
		return this;
	}
}
function getParam(){
	var pset={
		page:true,
		welcome:true,
		pageSize:true
	};
	var url=window.location.href.split('?');
	if(url.length<2) return ;
	url=url[1].split('&');
	for(var i in url){
		var s=url[i].split('=').map($.trim);
		if(s.length==2&&(s[0] in pset)){
			if(s[1]=='true') param[s[0]]=true;
			else if(s[1]=='false') param[s[0]]=false;
			else if(/[0-9]+/.test(s[1])) param[s[0]]=parseInt(s[1]);
			else param[s[0]]=s[1];
		}
	}
	console.log(param);
}
getParam();
$(window).ready(function(){
	pager.init().switchPage(param.page);
});
