'use strict';
var n=parseInt(process.argv[2]);
var filename=process.argv[3];
var file2=process.argv[4];
var p=parseFloat(process.argv[5]);
var sz=parseFloat(process.argv[6]);
var data=require("fs").readFileSync(filename,"utf-8");
data=data.split(/[\n\r\=]+/);
var fac=data.map(function(str){
	var t=str.split(/[\s\+a]+/);
	var res=[];
	for(var s of t){
		if(s.length) res[Number(s)-1]=true;
	}
	return res;
})
data=require("fs").readFileSync(file2,"utf-8");
data=data.split(/[\s\=a]+/);
data=data.filter(function(str){
	return str.length;
})
var restrict=data.map(Number);
function getsum(arr,fac){
	var sum=0;
	for(var i=0;i<fac.length;++i)if(fac[i]&&arr[i])++sum;
		return sum;
}
function chk(arr,fac){
	var len=fac.length>>1;
	for(var i=0;i<len;++i){
		if(getsum(arr,fac[i<<1])!=getsum(arr,fac[(i<<1)|1]))return 0;
	}
	return 1;
}
function chkn(x){
	var arr=[];
	while(x){
		arr.push(x&1);x>>=1;
	}
	return chk(arr,fac);
}
function getRandRes(){
	var arr=[],i;
	for(i=0;i<n;++i)arr.push(Math.random()<p);
	var len=restrict.length>>1;
	for(i=0;i<len;++i)arr[restrict[i<<1]-1]=restrict[(i<<1)|1];
	return chk(arr,fac);
}
function count(){
	var cnt=0;
	for(var i=0;i<sz;++i) cnt+=getRandRes();
	return cnt/sz;
}
console.log(count());