var playinit=playinit||{}
var Wins=[];
var count=0;
var chessboard=[];
var myWin=[];
var comWin=[];
var over=false;
var MyScore=[];
var ComScore=[];

playinit.init=function(){
	playinit.initchessBoard();
	playinit.getWins();
	playinit.initWin();
	//playinit.initScore();
	
}
playinit.getover=function(){
	return over;
}
playinit.setover=function(){
	if(over){
		over=!over;
	}
}
playinit.initchessBoard=function(){//初始化计算棋盘数组
	for(var i=0;i<15;i++){
		chessboard[i]=[];
		for(var j=0;j<15;j++){
			chessboard[i][j]=0;
		}
	}
}
playinit.SetChessBoard=function(x,y,me){
	if(me){
		chessboard[x][y]=1;
	}
	else{
		chessboard[x][y]=2;
	}
}

playinit.canchessBoard=function(x,y){//判断是否可以下子
	
	
	if(chessboard[x][y]==0){
		return true;
	}
	else {
		return false;
	}
	
}
playinit.getWins=function(){//初始化赢法数组
	for(var i=0;i<15;i++){
		Wins[i]=[];
		for(var j=0;j<15;j++){
			Wins[i][j]=[];
		}
	}
	
	for(var i=0;i<15;i++){
		for(var j=0;j<11;j++){
			for(var k=0;k<5;k++){
				Wins[i][j+k][count]=true;
			}
			count++;
		}
	}
	for(var i=0;i<15;i++){
		for(var j=0;j<11;j++){
			for(var k=0;k<5;k++){
				Wins[j+k][i][count]=true;
			}
			count++;
		}
	}
	for(var i=0;i<11;i++){
		for(var j=0;j<11;j++){
			for(var k=0;k<5;k++){
				Wins[i+k][j+k][count]=true;
			}
			count++;
		}
	}
	for(var i=0;i<11;i++){
		for(var j=14;j>3;j--){
			for(var k=0;k<5;k++){
				Wins[i+k][j-k][count]=true;
			}
			count++;
		}
	}
}

playinit.getcount=function(){
	return count;
}
playinit.initWin=function(){//初始化判断输赢数组
	for(var i=0;i<count;i++){
		myWin[i]=0;
		comWin[i]=0;
	}
}

playinit.whoWin=function(x,y,me){//判断输赢
	for(var k=0;k<count;k++){
		if(Wins[x][y][k]){
			if(me){
				myWin[k]++;
				comWin[k]=6;
				if(myWin[k]==5){
					window.alert("你赢了！");
					over=true;
				}
			}
			else{
				comWin[k]++;
				myWin[k]=6;
				if(comWin[k]==5){
					window.alert("computer 赢了！");
					over=true;
				}
			}
		}
	}
}

playinit.initScore=function(){//初始化分数数组
	for(var i=0;i<15;i++){
		MyScore[i]=[];
		ComScore[i]=[];
		for(var j=0;j<15;j++){
			MyScore[i][j]=0;
			ComScore[i][j]=0;
		}
	}
}
playinit.getScore=function(x,y,k){
	if(Wins[x][y][k]){
		switch(myWin[k]){
			case 1: MyScore[x][y]+=200;  break;
			case 2: MyScore[x][y]+=400;  break;
			case 3: MyScore[x][y]+=2000; break;
			case 4: MyScore[x][y]+=10000;break;
			//default:MyScore[x][y]+=0; 
		}
		switch(comWin[k]){
			case 1: ComScore[x][y]+=220;  break;
			case 2: ComScore[x][y]+=420;  break;
			case 3: ComScore[x][y]+=2200; break;
			case 4: ComScore[x][y]+=20000;break;
			//default:ComScore[x][y]+=0; 
		}
	}
}

playinit.computerAI=function(me,over){
	if(over){return;}
	playinit.initScore();
	var max=0;
	var x=0,y=0;
	for(var i=0;i<15;i++){
		for(var j=0;j<15;j++){
			if(playinit.canchessBoard(i,j)){
				for(var k=0;k<count;k++){
					playinit.getScore(i,j,k);
				}
				if(MyScore[i][j]>max){
					max=MyScore[i][j];
					x=i;
					y=j;
				}
				else if(MyScore[i][j]==max){
					if(ComScore[i][j]>ComScore[x][y]){
						x=i;
						y=j;
					}
				}
				if(ComScore[i][j]>max){
					max=ComScore[i][j];
					x=i;
					y=j;
				}
			}
		}
	}
	chessBorad.newchess(x,y,me);
	playinit.SetChessBoard(x,y,me);
	playinit.whoWin(x,y,me);
}
