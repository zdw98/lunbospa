// var pictures = document.getElementsByClassName('pictures')[0];
// 		
// var previous = document.getElementsByClassName('previous')[0];
// 		
// var next = document.getElementsByClassName('next')[0];
// 		
// var buttons = document.getElementById("buttons").getElementsByTagName('span');
		
var container = document.getElementsByClassName('container')[0];

//动态生成div
function createDiv(){
	
	var div1 = document.createElement('div');
	
	div1.innerHTML = '<img src="images/b5.png" alt="5"><img src="images/b1.png" alt="1" class="p1"><img src="images/b2.png" alt="2"><img src="images/b3.png" alt="3"><img src="images/b4.png" alt="4"><img src="images/b5.png" alt="5"><img src="images/b1.png" alt="1">';
	
	div1.className = "pictures";
	
	div1.style.cssFloat="left:-1000px";
	
	container.appendChild(div1);
	
	var div2 = document.createElement('div');
	
	div2.id = "buttons";
	
	container.appendChild(div2);
	
	var div3 = document.createElement('div');
	
	div3.className = "arrow";
	
	container.appendChild(div3);
	
}

createDiv();

var button = document.getElementById('buttons');

//动态生成span标签
function createSpan(){
	
	button.innerHTML = "<span class='on' index='1'>1</span><span index='2'>2</span><span index='3'>3</span><span index='4'>4</span><span index='5'>5</span>";
}

createSpan();

var buttons = button.getElementsByTagName('span');

console.log(buttons[1]);

//动态生成左右两个导航
function createNav(){
	
	var arrow = document.getElementsByClassName('arrow')[0];
	
	var div1 = document.createElement('div');
	
	div1.className = "previous";
	
	div1.innerHTML = "&lt;";
	
	arrow.appendChild(div1);
	
	var div2 = document.createElement('div');
	
	div2.className = "next";
	
	div2.innerHTML = "&gt;";
	
	arrow.appendChild(div2);
}

createNav();

var pictures = document.getElementsByClassName('pictures')[0];
		
var previous = document.getElementsByClassName('previous')[0];
		
var next = document.getElementsByClassName('next')[0];

console.log(next);
		
// var move = 0;//图片
		
var index = 1;//小圆点
		
var flag;

//平移函数
function animate(element,distance){
			
	clearInterval(element.timer);
			
	element.timer = setInterval(function(){
		
		var present=element.offsetLeft;
				
		var movement = 10;
				
		movement = present < distance ? movement : -movement;
				
		present = present + movement;
				
		if(Math.abs(present-distance)>Math.abs(movement)){
					
			element.style.left = present+'px';
					
			flag = false;
					
		}
				
		else{
					
		    clearInterval(element.timer);
					
			element.style.left=distance+'px';
					
			flag = true;
					
		}
				
	},80);
 }
		
		
		
//小圆点展示
function buttonsShow(){
			
	for(var i=0 ; i<5; i++){
				
		if(buttons[i].className == 'on'){
					
			buttons[i].className = '';
		}
	}
			
	buttons[index-1].className = 'on';
			
}
//切换图片

previous.onclick=function(){
			   
	   if(flag || flag == undefined){
				
		if(index == 1){
					
			index=5;
					
			buttonsShow();
						
			pictures.style.left = -6000 + 'px';
						
			animate(pictures,-5000);
						
		}
				
		else{
				
		index--;
				
		buttonsShow();
				
		animate(pictures,-(index)*1000);}
				   
	   }
			
}
		
next.onclick=function(){
			
	if(flag || flag == undefined){
				
		if(index == 5){
					
			index=1;
					
			buttonsShow();
						
			pictures.style.left = 0 + 'px';
						
			animate(pictures,-1000);
				    
		}
				
		else
				
		{
				
		    index++;
				
		    animate(pictures,-(index)*1000);
				
			buttonsShow();
		}
				
	}
			
}
		
//点击小圆点
for(var i = 0 ; i < 5 ; i++){
			
	(function(i){
				
		buttons[i].onclick =function(){
					
			var clickIndex = parseInt(this.getAttribute('index'));
					
			var offset = - clickIndex * 1000;
				
			animate(pictures , offset);
					
			index = clickIndex;
					
			buttonsShow();
		}
				
	})(i)
}

//自动播放
var timer =null;
		
function autoPlay(){
			
	timer = setInterval(function(){
				
		next.onclick();
				
	},2000);
			
}
		
autoPlay();
		
//鼠标控制
container.onmouseleave=function(){
			
	autoPlay();
			
}
		
container.onmouseenter=function(){
			
	clearInterval(timer);
			
}