var me=true;
var ifstart=false;

window.onload=function(){
	chessBorad.BoradInit();
	//var replay=document.getElementById("reload");
	chessBorad.get("reload").onclick=function(e){
		//从新开始
		chessBorad.clearBorad();
		ifstart=true;
		me=true;
		playinit.setover();
		playinit.init();
		
	}
	//var play=document.getElementById("start");
	chessBorad.get("start").onclick=function(e){
		//开始游戏
		var over=playinit.getover();
		if(over){return ;}
		if(ifstart){return;}
		ifstart=true;
		me=true;
		playinit.init();
	}
	chessBorad.get("chess").onclick=function(e){
		//下子
		//if(!me){
		//	return;
		//}
		if(!ifstart){return ;}
		if(!me){return;}
		var over=playinit.getover();
		if(over){return;}
		var x=chessBorad.getX(e);
		var y=chessBorad.getY(e);
		if(playinit.canchessBoard(x,y)){
			chessBorad.newchess(x,y,me);
			playinit.SetChessBoard(x,y,me);
			playinit.whoWin(x,y,me);
			me=!me;
			playinit.computerAI(me,over);
			me=!me;
		}
		
		
		
	}
}