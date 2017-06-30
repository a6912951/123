documentReady(function(){

	//banner图片轮播
	var banner = document.getElementsByClassName('banner')[0]
	var ba_img = document.getElementsByClassName('ba_img')[0];
	var baLi = ba_img.getElementsByTagName('li');
	var ba_ol = banner.getElementsByTagName('ol')[0];
	var btn1 = document.getElementById('btn1');
	var btn2 = document.getElementById('btn2');
	var n=0; //计算器累加
	//左右按钮显示or隐藏
	banner.onmouseover = function(){
		btn1.style.display = "block";
		btn2.style.display = "block";
		clearInterval(banner.timer);
	};
	banner.onmouseout = function(){
		btn1.style.display = "none";
		btn2.style.display = "none";
		autoRun();
	};
	//生成按钮
	for(var i=0;i<baLi.length;i++){
		var Li = document.createElement('li');
		Li.innerHTML = i+1;
			ba_ol.appendChild(Li);
	};
	
	function change(n){
		for(var j=0;j<ba_btn.length;j++){
				ba_btn[j].className = "";
			}
			ba_btn[n].className="b_sty";
			hxsd_tools.move(ba_img,{"left":-li_w*n});
	};
	
	//按钮样式
	var ba_btn = ba_ol.getElementsByTagName('li');
	for(var i=0;i<ba_btn.length;i++){
		ba_btn[0].className = "b_sty";
		ba_btn[i].index = i;
		ba_btn[i].onmouseover = function(){
			n=this.index;
			change(n);
		};
	};
	//按钮点击
	var li_w = hxsd_tools.getStyle(baLi[0], 'width'); //图片的宽度
    ba_img.style.width = li_w * baLi.length + 'px';
	var oUl_l = hxsd_tools.getStyle(ba_img,'left'); //获取ul的left值
	
		btn1.onclick = function(){
			n--;
			if(n<0){n=baLi.length-1;};
			change(n);
			hxsd_tools.move(ba_img,{"left":oUl_l-n*li_w});
		};
		btn2.onclick = function(){
			n++;
			if(n>=baLi.length){n=0;};
			change(n);
			hxsd_tools.move(ba_img,{"left":oUl_l-n*li_w});
		};
		
		//按钮自动切换
		function autoRun(){
			clearInterval(banner.timer);
			banner.timer=setInterval(function(){
				//计数器自动累加
				n++;
				//当n>aLi.length n=0
				if(n==baLi.length){
					n=0;
				};
				change(n);
				hxsd_tools.move(ba_img,{"left":oUl_l-n*li_w});
			},2000);
		};
		autoRun();

	//侧边导航栏
	var oMenu = document.getElementById('sidebar');
    var aMenuLi = oMenu.getElementsByTagName('li');
    var oMenuCont = document.getElementById('sectionAll');
    var aDl = oMenuCont.children;

    var show_t; //显示弹框计算器
    var hide_t; //隐藏弹框计算器
    var move_t; //鼠标从弹框移入菜单延迟用计时器

    //----------------------------------------------------------------------------------------
    for (var i = 0; i < aMenuLi.length; i++) {
        aMenuLi[i].index = i; //发牌照
        aMenuLi[i].onmouseover = function() {
            clearTimeout(hide_t); //清除关闭
            clearTimeout(move_t); //清除鼠标移动

            var _this = this; //计时器中的this是window，所以要先声明一个_this变量，用这个变量传入计时器 
            show_t = setTimeout(function() {

                oMenuCont.style.display = "block"; //oMenuCont弹框 显示

                //显示相对应的内容(就是选项卡的原理)
                for (var i = 0; i < aDl.length; i++) {
                    aDl[i].style.display = "none";
                };
                aDl[_this.index].style.display = "block";
            }, 200);


        };


        aMenuLi[i].onmouseout = function() {
            clearTimeout(show_t);
            clearTimeout(hide_t);
            var _this = this;
            hide_t = setTimeout(function() {
                oMenuCont.style.display = "none"; //oMenuCont弹框 隐藏
            }, 200);
        };
        //-------------------------------------------------------------------------------------     
    };

    //oMenuCont绑定两个事件
    oMenuCont.onmouseover = function() {
        clearTimeout(hide_t);
        clearTimeout(move_t);
        this.style.display = "block"; //让自己显示
    };

    oMenuCont.onmouseout = function() {
        var _this = this;
        move_t = setTimeout(function() { //延时隐藏
            _this.style.display = "none";
        }, 100);
    };

	//选项卡
	function floorDiv(id,cls){
		var f1_nav = document.getElementById(id);
		var f1_Li = f1_nav.getElementsByTagName('li');
		var f1_Div = document.getElementsByClassName(cls);
	 	for(var i=0;i<f1_Li.length;i++){
	 		f1_Div[0].style.display = "block";
	 		f1_Li[i].index = i;
	 		f1_Li[i].onmouseover = function(){
	 			for(var j=0;j<f1_Li.length;j++){
	 				f1_Li[j].className = "";
	 				f1_Div[j].style.display = "none";
	 			}
	 			f1_Div[this.index].style.display = "block";
	 			this.className = "hover";
	 		};
	 	};
	};	
	function floorNav(id){
		var f1_nav = document.getElementById(id);
		var f1_Li = f1_nav.getElementsByTagName('li');
	 	for(var i=0;i<f1_Li.length;i++){
	 		f1_Li[i].index = i;
	 		f1_Li[i].onmouseover = function(){
	 			for(var j=0;j<f1_Li.length;j++){
	 				f1_Li[j].className = "";
	 			}
	 			this.className = "hover";
	 		};
	 	};
	};
	floorDiv('f1_nav','midright1');
	floorDiv('f2_nav','midright2');
	floorDiv('f3_nav','midright3');
	floorDiv('f4_nav','midright4');
	floorDiv('f5_nav','midright5');
	floorDiv('f6_nav','midright6');
	floorNav('f7_nav');
	floorNav('f8_nav');
	floorNav('f9_nav');
	floorNav('f10_nav');
	floorNav('f11_nav');
	
	//跳转楼层
	var oFloorList=document.getElementsByClassName('fixedList')[0];
	var fix_Li=oFloorList.getElementsByTagName('li');
	var aFloor=document.getElementsByClassName('FF');
	var arr=[];

	for(var i=0; i<aFloor.length; i++){
		var json={};
		json.name=i;
		json.offsetTop=aFloor[i].offsetTop;
		arr.push(json);
	};
	
	window.onscroll=function(ev){
		//ev=ev || window.event;
		//获取滚动条高度
		var scrolltop=document.documentElement.scrollTop || document.body.scrollTop;
		//获取浏览器高度
		var h=document.documentElement.clientHeight;
		if(scrolltop+h>1800){
			oFloorList.style.display='block';
		}else{
			oFloorList.style.display='none';
		};
		if(scrolltop>aFloor[aFloor.length-1].offsetTop+aFloor[aFloor.length-1].offsetHeight){
			oFloorList.style.display='none';
		};
		
		// 根据楼层滚动位置，定位编号------------------------------------------------
		var last_arr=[];
		
		for(var j=0; j<arr.length; j++){
			if(arr[j].offsetTop<scrolltop+h/2){
				last_arr.push(arr[j].name);
			}
		};
		
		if (scrolltop>1730) {
            var li_index = last_arr[last_arr.length - 1];
	
			for(var l=0; l<aFloor.length; l++){
				fix_Li[l].className='';
			};
			fix_Li[li_index].className='fl_ac';
		};

	};

	//点击编号，跳转到相对楼层-----------------------------------------------
	for(var i=0; i<aFloor.length; i++){
		fix_Li[i].index = i;
		fix_Li[i].onclick=function(){
			var start=document.documentElement.scrollTop || document.body.scrollTop;
			var end=arr[this.index].offsetTop;
			changeFloor(start,end)
		}
	};
	//changeFloor-------------------------------------------------------
	var timer;
	function changeFloor(start,end){
		var dis=end-start;
		var count=parseInt(1500/30);
		var n=0;
		clearInterval(timer);
		timer=setInterval(function(){
			n++;
			var a=1-n/count;
			var step_dis=start+dis*(1-a*a*a*a);
			window.scrollTo(0,step_dis);
			if(n==count){
				clearInterval(timer);
			};
		},30)
	};
	
});
$(function(){
	//下拉菜单
	function caidan(obj){
		obj.hover(
			function(){
				$(this).children('.caidan').removeClass('ac').show();
			},function(){
				$(this).children('.caidan').addClass('ac').hide(200);
			}
		);
	}
	caidan($('.diqucaidan'))
	caidan($('.myjd'))
	caidan($('.kehu'))
	caidan($('.wangzhan'))
	//右边菜单
	var show=true;
	$('.mod_tab_head_item').hover(
		function(){
			_this=$(this).index();
				
			if(show){
				$(this).addClass('service_frame_on').siblings().removeClass('service_frame_on');
				$('.mod_tab_head_item a').addClass('aac');
				$('.service_pop').eq(_this).removeClass('ac').siblings('.service_pop').addClass('ac');
			}
			
		},
		function(){
			show=true;
		}
	);
		
	$('.closeBtn').click(function(){
		$('.mod_tab_head_item').removeClass('service_frame_on')
		$('.mod_tab_head_item a').removeClass('aac');
		$('.service_pop').addClass('ac');
		show=false;
	});
	$('.jd_7').click(function(){
		$('.jd_7').a
	})
})


	
