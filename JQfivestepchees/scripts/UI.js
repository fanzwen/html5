var chees=document.getElementById("chess");
	var context=chess.getContext("2d");
var chessBorad=chessBorad||{};

chessBorad.BoradInit=function(){
	//初始化棋盘
	var logo=new Image();
	logo.src="themes/images/logo.png";
	logo.onload =function(){
		context.drawImage(logo,0,0,450,450);
		chessBorad.drawLine();
	}
}
chessBorad.drawLine=function(){
	//绘制棋盘线
	context.strokeStyle="#efefef";
	for(var i=0;i<15;i++){
		//纵向棋盘线
		context.moveTo(15+i*30,15);
		context.lineTo(15+i*30,435);
		context.stroke();
	
		//横向棋盘线
		context.moveTo(15,15+i*30);
		context.lineTo(435,15+i*30);
		context.stroke();
	}
}
chessBorad.clearBorad=function(){
	//清空棋盘
	context.clearRect(0,0,450,450);
	chessBorad.BoradInit();
}
chessBorad.newchess=function(x,y,me){
	//生成棋子
	context.beginPath();
	context.arc(15+x*30,15 +y*30,13,0,2*Math.PI);
	
	var gradient=context.createRadialGradient(15+x*30,15 +y*30,13,15+x*30,15 +y*30,0);
	if(me){
		gradient.addColorStop(0,"#0a0a0a");
		gradient.addColorStop(1,"#636766");
	}
	else{
		gradient.addColorStop(0,"#d1d1d1");
		gradient.addColorStop(1,"#f9f9f9");
	}
	context.fillStyle=gradient;
	context.fill();
	context.closePath();
}
chessBorad.getX=function(e){
	var x=e.offsetX;
	return Math.floor(x/30);
}
chessBorad.getY=function(e){
	var y=e.offsetY;
	return Math.floor(y/30);
}
chessBorad.get=function(id){
	return document.getElementById(id);
}


