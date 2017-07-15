//根据class名称来取出元素。
//主要依据，根据clsName来取出所需的所有元素
//1.判断是否有parent元素，有的话取出parent的id；2.创建存放元素的数组；3.取出所有有tagName的元素；4.判断这些元素的className是不是==ClsName；如果是的话，放入创建好的空集合中。
function getByClass(clsName,parent) {
	var oParent=parent?document.getElementById(parent):document,
	//创建一个取出来的元素存放的数组
	eles=[],
	//取出父元素下面所有的name的元素
	elements=oParent.getElementsByTagName('*');
	//
	for(var i=0, l=elements.length;i<l;i++){
	if(elements[i].className==clsName){
		eles.push(elements[i]);
	}
	}
	return eles;
}

//drag,onmousedown,fnDown
//属性clientX,和clientY,光标的坐标
//把窗口的位置定位到光标位置
//整个页面用document表示
//onmousemove=function()
//非ie用event，ie用window.event
//跟着鼠标移动的元素都需要有一个绝对定位
//光标的clientX，clientY，面板的offsetX和offsetY

window.onload=drag;

function drag(){
	var oTitle=getByClass('login_logo_webqq','loginPanel')[0],
	oClose=getByClass('ui_boxyClose','loginPanel')[0];
	//鼠标按下
	oTitle.onmousedown=fnDown;
	oClose.onclick=function(){
		document.getElementById('loginPanel').style.display='none';
	}
	//切换状态
	var loginState=document.getElementById('loginState'),
	stateList=document.getElementById('loginStatePanel'),
	lis=stateList.getElementsByTagName('li'),
	stateTxt=document.getElementById('login2qq_state_txt'),
	loginStateShow=document.getElementById('loginStateShow');
	
	loginState.onclick=function(e){
		e = e || window.event;
		if(e.stopPropagation){
			e.stopPropagation();
		}else{
			e.cancelBubble=true;
		}
		stateList.style.display='block';
	}
	
	//设置鼠标滑过、离开、点击的状态
	for(var i=0,l=lis.length;i<l;i++){
		lis[i].onmouseover=function(){
			this.style.background='#567';
		}
		lis[i].onmouseout=function(){
			this.style.background='#fff';
		}
		lis[i].onclick=function(e){
			e = e || window.event;
			if(e.stopPropagation){
			e.stopPropagation();
			}else{
			e.cancelBubble=true;
			}
		//取出每一li的id
		var id = this.id;
		
		//隐藏选择框
		stateList.style.display = 'none';
		
		//将文字部分变成选中的li的id下的文字内容
		stateTxt.innerHTML= getByClass('stateSelect_text',id)[0].innerHTML;
		//将原来的图标清除，可以没有
		loginStateShow.className='';
		
		
		loginStateShow.className='login-state-show '+id;
		}
	}
	document.onclick=function(){
		stateList.style.display='none';
	}
}

function fnDown(event){
	event = event || window.event;
	var oDrag = document.getElementById('loginPanel');
	//取出元素的坐标
	disX = event.clientX - oDrag.offsetLeft;
	disY = event.clientY - oDrag.offsetTop;
	//鼠标移动
	document.onmousemove=function(event){
		event = event || window.event;
		fnMove(event,disX,disY);
	}
	//鼠标释放
	document.onmouseup=function(){
		document.onmousemove=null;
		document.onmouseup=null;
	}
}


function fnMove(e,posX,posY){
	var oDrag=document.getElementById("loginPanel"),
	l=e.clientX-posX,
	t=e.clientY-posY,
	winW = document.documentElement.clientWidth || document.body.clientWidth,
	winH = document.documentElement.clientHeight || document.body.clientHeight,
	maxW = winW - oDrag.offsetWidth-10,
	maxH = winH - oDrag.offsetHeight;
	
	
	if(l<0){
		l=0;
	}else if(l>maxW){
		l=maxW;
	}
	if(t<0){
		t=10;
	}else if(t>maxH){
		t=maxH;
	}
	
	oDrag.style.left=l+'px';
	oDrag.style.top=t+'px';
	
}
