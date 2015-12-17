var player={
	isPlaying:false,
	updateUrl:function(){
		if(this.urls.length){
			this.q.attr('src',this.urls[0]);
			this.urls.shift();
			if(this.isPlaying) this.dom.play();
			return false;
		}
		$('#list-container .playcard-status').html('fail');
		console.log('fail');
	},
	setMedia:function(url){
		this.q.removeAttr('src');
		this.urls=url.concat();
		this.updateUrl();
		return this;
	},
	play:function(){
		this.isPlaying=true;
		this.dom.play();
	},
	pause:function(){
		this.isPlaying=false;
		this.dom.pause();
	},
	getDuration: function(){
		return this.dom.duration;
	},
	getCurrentTime:function(){
		return this.dom.currentTime;
	},
	getCurrentPercent:function(){
		return this.dom.currentTime/this.dom.duration*100;
	},
	getBufferedLength:function(){
		return this.dom.buffered.length?this.dom.buffered.end(0):0;
	},
	getBufferedPercent:function(){
		return this.getBufferedLength()/this.dom.duration*100;
	},
	formatTime: function(t){
		t=Math.floor(t);
		if(t>=60)
			return Math.floor(t/60)+'\''+t%60+'\"';
		else
			return t%60+'\"';
	}
}
$(document).ready(function(){
	player.q=$('#player');
	player.dom=player.q[0];
	player.q.on('ended',function(){
		$('#list-container .play-pause-button').toggleClass('glyphicon-pause').toggleClass('glyphicon-play');
		player.isPlaying=false;
	}).on('error',function(){
		console.log('error');
		player.updateUrl();
	}).on('timeupdate',function(){
		
		console.log(player.getBufferedLength());
	}).on('loadstart',function(){
		$('#list-container .playcard-status').html('loading...');
	}).on('canplay',function(){
		$('#list-container .playcard-status').empty();
	});
	setInterval(function(){
		$('#list-container .played-bar').css('width',player.getCurrentPercent()+'%');
		$('#list-container .buffered-bar').css('width',player.getBufferedPercent()-player.getCurrentPercent()+'%');
		$('#list-container .time-remain').html('-'+player.formatTime(player.getDuration()-player.getCurrentTime()));
	},250);
});
function getPlaylist(item,id){
		$('#template-playlist .playlist-title').html(item.title);
		$('#template-playlist .playlist-published').html(item.published);
		$('#template-playlist .playlist-duration').html(item.duration);
		$('#template-playlist .playlist-button').attr('id','pb-'+id);
		var html=$('#template-playlist .playlist-item').html();
		$('#template-playlist .playlist-button').removeAttr('id');
		return html;
}
function getPlaycard(item){
	$('#template-playcard .playcard-title').html(item.title);
	var html=$('#template-playcard .playcard').html();
	console.log(item.title);
	return html;
}
function spreadToCard(id){
	$('#item-'+id).html(getPlaycard(arr[id])).removeClass('playlist-item').addClass('playcard');
	playnw=id;
}
function retractToItem(){
	if(playnw!=null){
		$('#item-'+playnw).html(getPlaylist(arr[playnw],playnw)).removeClass('playcard').addClass('playlist-item');
	}
}
$(document).ready(function(){
	$('#list-container').on('click',function(event){
		var tar=$(event.target);
		console.log(tar);
		if(tar.hasClass('item-button')){
			var id=tar.attr('id');
			id=/[0-9]+/.exec(id)[0];
			id=parseInt(id);
			retractToItem();
			spreadToCard(id);
			player.setMedia(arr[id].url).play();
		}
		else if(tar.hasClass('play-pause-button')){
			if(player.isPlaying)
				player.pause();
			else
				player.play();
			tar.toggleClass('glyphicon-pause').toggleClass('glyphicon-play');
		}
	});
});