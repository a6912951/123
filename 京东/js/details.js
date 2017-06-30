function documentReady(fn){
	if(document.addEventListener){//w3c
		document.addEventListener('DOMContentLoaded', fn, false);
	}else{//ie8一下
		document.attachEvent('onreadystatechange', function (){//IE兼容
			if(document.readyState=='complete'){
				fn && fn();
			}
		});
	}
};
//
function offsetLeft(elm){
	var left = elm.offsetLeft;
	var parent = elm.offsetParent;
	while( parent!=null){
		left +=parent.offsetLeft;
		parent = parent.offsetParent;
	};
	return left;
};
function offsetTop(elm){
	var top = elm.offsetTop;
	var parent = elm.offsetParent;
	while( parent!=null){
		top +=parent.offsetTop;
		parent = parent.offsetParent;
	};
	return top;
};
window.onload=function(){
	//放大镜
	var oDiv1 = document.getElementsByClassName('z_pic')[0];
	var oSpan = oDiv1.getElementsByTagName('span')[0];
	var oDiv2 = document.getElementsByClassName('d_pic')[0];
	var aImg = oDiv2.getElementsByClassName('bigImg')[0];
	oDiv1.onmousemove = function(ev){
		ev=ev||window.event;
		var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
		var scrollLeft = document.documentElement.scrollLeft||document.body.scrollLeft;
		oSpan.style.display = "block";
		oDiv2.style.display = "block"
		var x = ev.clientX+scrollLeft-offsetLeft(oDiv1)-oSpan.offsetWidth/2;   //鼠标的X坐标减去盒子的左距离减去span的一半宽
		var y = ev.clientY+scrollTop-offsetTop(oDiv1)-oSpan.offsetHeight/2;
		if(x<0){
			x=0;
		};
		if(y<0){
			y=0;	
		};
		if(x>oDiv1.offsetWidth-oSpan.offsetWidth){
			x=oDiv1.offsetWidth-oSpan.offsetWidth;	
		};
		if(y>oDiv1.offsetHeight-oSpan.offsetHeight){
			y=oDiv1.offsetHeight-oSpan.offsetHeight;	
		};
		var rateX = x/(oDiv1.offsetWidth-oSpan.offsetWidth);  //计算宽的比率
		var rateY = y/(oDiv1.offsetHeight-oSpan.offsetHeight); //计算高的比率
		
		oSpan.style.left = x+'px';
		oSpan.style.top = y+'px';	
		
		aImg.style.left = -(aImg.offsetWidth-oDiv2.offsetWidth)*rateX+'px';
		aImg.style.top = -(aImg.offsetHeight-oDiv2.offsetHeight)*rateY+'px';
	};	
	oDiv1.onmouseout = function(ev){
		oSpan.style.display = "none";	
		oDiv2.style.display = "none"
	};
	
	//图片hover
	var pic_x = document.getElementsByClassName('pic_x')[0];
	var x_Img = pic_x.getElementsByTagName('img');
	var z_img = oDiv1.getElementsByTagName('img')[0];

		var n=0; //计数器累加
		for(var i=0;i<x_Img.length;i++){
			x_Img[i].index = i; //发牌照
			x_Img[i].onmouseover = function(){
				for(var j=0;j<x_Img.length;j++){
					x_Img[j].className = "";
				};
				this.className = "aa";
				z_img.src = 'images/img/z-'+(this.index+1)+'.jpg';
				aImg.src = 'images/img/d-'+(this.index+1)+'.jpg';
			};
		};
		
		//按钮点击
		var l_btn = document.getElementsByClassName('l_btn')[0];
		var r_btn = document.getElementsByClassName('r_btn')[0];
		r_btn.onclick = function(){
			n++;
			if(n>=x_Img.length-5){n=x_Img.length-5};
			pic_x.style.left = -n*62+'px';
		};
		l_btn.onclick = function(){
			n--;
			if(n<=0){n=0};
			pic_x.style.left = -n*62+'px';
		};

	//选择型号
	var sele = document.getElementsByClassName('sele')[0];
	var seleA = sele.getElementsByTagName('a');
	var seleB = document.createElement('b');
	for(var k=0;k<seleA.length;k++){
		seleA[k].index = k;
		seleA[0].appendChild(seleB);
		seleA[k].onclick = function(){
			seleA[this.index].appendChild(seleB);
			for(var i=0;i<seleA.length;i++){
				seleA[i].className = "";
			};
			this.className = "ab";
			
		};
	};
	
	//购物车加减
	var num_ = document.getElementById('num_');
	var num_btn = num_.getElementsByTagName('a');
	var num_inp = num_.getElementsByTagName('input')[0];
	var num_n = 1;
	num_btn[0].onclick = function(){
		num_n++;
		num_inp.value =num_n;
	};
	num_btn[1].onclick = function(){
		num_n--;
		if(num_n<1){num_n=1}
		num_inp.value =num_n;
	};
	
	
	//选项卡切换
	var two_nav = document.getElementsByClassName('two_nav')[0];
	var two_navA = two_nav.getElementsByTagName('a');
	var two_div = document.getElementsByClassName('tow_main');
	for(var i=0;i<two_navA.length;i++){
		two_div[0].style.display = "block";
		two_navA[i].index = i;
		two_navA[i].onclick = function(){
			for(var j=0;j<two_navA.length;j++){
				two_navA[j].className = "";
				two_div[j].style.display = "none";	
			};	
			this.className = "nav_a";
			two_div[this.index].style.display = "block";
		};
	};
;};
$(function(){
	//下拉菜单
	function caidan(obj){
		obj.hover(
			function(){
				$(this).children('.caidan').removeClass('ac')
			},function(){
				$(this).children('.caidan').addClass('ac')
			}
		);
	};
	caidan($('.diqucaidan'));
	caidan($('.myjd'));
	caidan($('.kehu'));
	caidan($('.wangzhan'));
})