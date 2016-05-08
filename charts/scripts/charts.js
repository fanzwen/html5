var charts=charts||{};
charts.init=function(type,jcolor,jsonX,jsonY,title){
	charts.newtype=type;//ͼ������ 0 ��ͼ��1 ��״ͼ��2 ����ͼ��3 ��״ ���߻��ͼ
	charts.Xalign=0; 	//0 x��ˮƽ���ң�1 x�ᴹֱ���£�2��x��ˮƽ����3��x�ᴹֱ����
	charts.Yalign=0;	//0 y�ᴹֱ���ϣ�1 y��ˮƽ���ң�2��y�ᴹֱ���£�3��y��ˮƽ����
	charts.Titlealign=0;//0 ͼ�������ͼ���Ϸ����У�1 ͼ�������ͼ���·�����
	charts.margin=40;
	charts.startpointX=0;
	charts.startpointY=0;
	charts.colors=jcolor;
	charts.XMeas=0;
	charts.XNum=0;
	charts.YMeas=0;
	charts.YMax=0;
	charts.notices="";
	charts.canvas=document.getElementById("charts");
	charts.cantext=charts.canvas.getContext("2d");
	charts.x=jsonX;
	charts.y=jsonY;
	charts.title=title;
	charts.isgroup=false;//�ж��Ƿ���� 
	charts.DrawCharts();
}
//��ͼ
charts.DrawCharts= function(){
	switch(charts.newtype)
	{
		case 0:
		charts.DrawPieCharts();
		break;
		case 1:
		charts.DrawColumnCharts();
		break;
		case 2:
		charts.DrawLineCharts();
		break;
		case 4:
		charts.DrawMutCharts();
		break;
		default:
		break;
	}
}
//��ͼ
charts.DrawPieCharts=function(){
	//��ȡԲ�ģ��뾶
	var canvas=charts.canvas;
	var width=canvas.width;
	var height=canvas.height;
	var x=width/2;
	var y=height/2;
	var radius=y-charts.margin;
	var context=charts.cantext;
	var ydata=charts.y;
	var sum=0;
	for(var i=0;i<ydata.length;i++){
		sum=sum+ydata[i];
	}
	
	
	var Mangle=2*Math.PI/sum;
	var angle1=0;
	var angle2=0;
	for(var i=0;i<ydata.length;i++){
		context.beginPath();
		//��ɫ
		if(i<charts.colors.length){
			context.fillStyle=charts.colors[i];
			context.strokeStyle=charts.colors[i];
		}
		else{
			var clength=charts.colors.length;
			context.fillStyle=charts.colors[i-clength];
			context.strokeStyle=charts.colors[i-clength];
		}
		//����
		var angle1=angle2;
		var angle2=angle2+Mangle*ydata[i];
		context.moveTo(x,y);
		
		context.arc(x,y,radius,angle1,angle2);
		context.fill();
		context.closePath();
		
	}
	
	
}
//��״ͼ
charts.DrawColumnCharts=function(){
	//����������
	charts.DrawArrow();
	//��������
	charts.DrawColumn();
}

//����ͼ
charts.DrawLineCharts=function(){
	//����������
	charts.DrawArrow();
	//��������
	charts.DrawLine();
}

//���ͼ
charts.DrawMutCharts=function(){
	charts.DrawArrow();
	charts.DrawColumn();
	charts.DrawLine();
	
}
//����������
charts.DrawArrow=function(){
	var canvas=charts.canvas;
	var width=canvas.width;
	var height=canvas.height;
	var margin=charts.margin;
	var context=charts.cantext;
	//var context=canvas.getContext("2d");
	context.beginPath();
	context.strokeStyle="#b9b9b9";
	//x��ˮƽ���ң�y�ᴹֱ����
	if((charts.Xalign==0) &&(charts.Yalign==0)){
		//����x��
		charts.startpointX=margin;
		charts.startpointY=height-margin;
		context.moveTo(margin,height-margin);
		context.lineTo(width-margin,height-margin);
		//context.stroke();
		context.moveTo(width-margin-5,height-margin+5);
		context.lineTo(width-margin,height-margin);
		//context.stroke();
		context.lineTo(width-margin-5,height-margin-5);
		context.stroke();
		//����Y��
		context.moveTo(margin,height-margin);
		context.lineTo(margin,margin);
		context.moveTo(margin-5,margin+5);
		context.lineTo(margin,margin);
		context.lineTo(margin+5,margin+5);
		context.stroke();
		charts.DrawLinearMeasure();
	}
	//x��ˮƽ���ң�y�ᴹֱ����
	else if((charts.Xalign==0) &&(charts.Yalign==2)){
		
	}
	//x��ˮƽ����y�ᴹֱ����
	else if((charts.Xalign==2) &&(charts.Yalign==0)){
		
	}
	//x��ˮƽ����y�ᴹֱ����
	else if((charts.Xalign==2) &&(charts.Yalign==2)){
		
	}
	//Y��ˮƽ���ң�x�ᴹֱ����
	else if( (charts.Yalign==1)&&(charts.Xalign==3)){
		
	}
	//Y��ˮƽ���ң�x�ᴹֱ����
	else if( (charts.Yalign==1)&&(charts.Xalign==1)){
		
	}
	//Y��ˮƽ����x�ᴹֱ����
	else if( (charts.Yalign==3)&&(charts.Xalign==3)){
		
	}
	//Y��ˮƽ����x�ᴹֱ����
	else if( (charts.Yalign==3)&&(charts.Xalign==1)){
		
	}
	context.closePath();
}

//���������ϻ��Ƶ�λ���
charts.DrawLinearMeasure= function(){
	//����x�ᵥλ
	var xdata=charts.x;
	var ydata=charts.y;
	var max=Math.max.apply(Math,ydata);
	var Ymiddle=YMeas*max/2;
	var num=(xdata.length)*2;
	var canvas=charts.canvas;
	var width=canvas.width;
	var height=canvas.height;
	var margin=charts.margin;
	var XMeas=(width-2*margin-20)/num;
	var YMeas=(height-2*margin-20)/max;
	var x=charts.startpointX;
	var y=charts.startpointY;
	var context=charts.cantext;
	charts.XMeas=XMeas;
	charts.YMeas=YMeas;
	charts.YMax=max;
	charts.XNum=num;
	
	for(var i=0,k=0;i<=num;i++){
		context.moveTo(x+XMeas*i,y-1);
		context.lineTo(x+XMeas*i,y);
		context.stroke();
		if(k==1){
			context.font="14px Arial";
			context.textAlign="center";
			context.textBaseline="middle";
			var j=Math.floor(i/2);
			context.strokeText(xdata[j],x+XMeas*i+(XMeas/2),y+15);
			k=0;
		}
		else{
			k=1;
		}
	}
	
	//����y�ᵥλ
	context.moveTo(x+5,margin+20);
	context.lineTo(x,margin+20);
	context.moveTo(x+5,margin+((y-margin-20)/2)+20);
	context.lineTo(x,margin+((y-margin-20)/2)+20);
	context.stroke();
	context.font="14px Arial";
	context.textAlign="end";
	context.textBaseline="middle";
	context.strokeText(max,x-15,margin+20);
	context.strokeText(max/2,x-15,margin+((y-margin-20)/2)+20);
}


//��������
charts.DrawColumn=function(){
	var ydata=charts.y;
	var max=charts.YMax;
	var YMeas=charts.YMeas;
	var Xmeas=charts.XMeas;
	var margin=charts.margin;
	var length=ydata.length;
	var Ystart=charts.startpointY;
	var context=charts.cantext;
	context.fillStyle=charts.colors[0];
	for(var i=0;i<length;i++){
		var x1=Xmeas+margin;
		var y=charts.startpointY;
		x1=x1+2*Xmeas*i;
		y=y-ydata[i]*YMeas;
		context.fillRect(x1,y,Xmeas,ydata[i]*YMeas);
		var notices=charts.notices+ydata[i];
		context.strokeText(notices,x1+Xmeas/2,y-20);
		//context.fill();
	}
}

//��������
charts.DrawLine=function(){
	var ydata=charts.y;
	var max=charts.YMax;
	var YMeas=charts.YMeas;
	var Xmeas=charts.XMeas;
	var margin=charts.margin;
	var length=charts.XNum;
	var Ystart=charts.startpointY;
	var context=charts.cantext;
	var x1=Xmeas+margin+Xmeas/2;
	var x2=Xmeas+margin+Xmeas/2;
	var y1=charts.startpointY;
	var y2=charts.startpointY-ydata[0]*YMeas;
	for(var i=0;i<length;i++){
		context.beginPath();
		context.strokeStyle=charts.colors[0];
		x1=x2;
		x2=x2+2*Xmeas;
		y1=y2;
		y2=charts.startpointY-ydata[i+1]*YMeas;
		context.moveTo(x1,y1);
		context.lineTo(x2,y2);
		context.stroke();
		context.closePath();
		context.beginPath();
		context.strokeStyle="#b9b9b9";
		context.font="14px Arial";
		context.textAlign="end";
		context.textBaseline="middle";
		var notices=charts.notices+ydata[i];
		context.strokeText(notices,x1,y1-20);
		context.closePath();
	}
	//context.closePath();
	
}

var jcolor=["red","yellow","blue","green","black","purple","brown"];
var jsonX=["a","b","c","d","e"];
var jsonY=[10,15,30,25,36];
charts.init(0,jcolor,jsonX,jsonY,"");