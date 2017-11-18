// 按下c键时候的操作符？？dot??
//两个0.几相加会，第二位不能识别
//一个两位数加小数点，小数点再也加不了了
//0. 加正负号会出错
//清0后小数点
//退格
//开平方的结果再输一味
//有些东西可能忘了清零，嗯几次会出错
//清零后要按两下
//1+3-2
//2X根号
//6. + 6
//0.
var first;
var second;
var pointer=1;
var beforeoper=false;
var beforepin=false;
var screenin;
var operater;
var beforeCE=false;
var beforewrong=false;
function number(oaj){
	//该if语句实现重复按下按钮，数字改变或是不停增加的效果
	
	if(beforewrong==true){
		clearAll();
		recover();
	}
	//恢复按钮
    if(beforeoper==false && (!second) && first && operater ){
		pointer=2;
		document.getElementById("screenName").value=0;
		//输入第二个数字的时候界面清零
	}
	else if(beforeoper==true){
		document.getElementById("screenName").value=0;
		beforeoper=false;

	}

	//上一次运算结束，清零
	screenin = document.getElementById("screenName");
	var strs=screenin.value;
	if(screenin.value=="0" && oaj.innerHTML!=".")
		screenin.value=oaj.innerHTML;
	else if((screenin.value!="0" && oaj.innerHTML!=".")||(oaj.innerHTML=="." && strs.indexOf(".")==-1))
		screenin.value+=oaj.innerHTML;
	if(pointer==1)
		first=screenin.value;

	else if(pointer==2){
		// screenin.value=0;

		second=screenin.value;
	}
}
function operaterin(obj){
	// var str=document.getElementById("screenName")
	// if(str.value.substring(str.value.length-1,str.value.length)=="."){
	// 	str.value=str.value.substring(0,str.value.length-1)
	// }
	//如果这时候没有给第一位操作数赋值
	screenin = document.getElementById("screenName");
	screenin.value=(screenin.value-0);
	if(!first && pointer==1)
		first=screenin.value;
	
	if(pointer==1){
		operater=obj.innerHTML;
		pointer=2;
		//防止第二次小数点用不了

	}
	//如果second first 的值有0怎么办

	else if(second && first){
		//operater=obj.innerHTML;
		equalin();
		operater=obj.innerHTML;
	}
	//如果没有按等号，连续相加等操作，必须要把上一次的结果计算出来,就调用下面的程序
	// else if(pointer==2 && first && (!second)){
	// 	operater=obj.innerHTML;
	// 	screenin=document.getElementById("screenName")		
	// }
	//这这是啥
	second=0;
	//一定要清变量啊···
	beforeoper=false;
	beforepin=false;
	
}
function equalin(oaj){
	// 自加···
	screenin = document.getElementById("screenName")
	if(beforewrong==true){
		clearAll();
		recover();
	}
	//恢复按钮
	else{
		if(!second && !first)
			first=0;
		//一开始什么都没有			
		else if(!second && beforeCE==false)
			second=first;
		//没有为第二个赋值
		// 通过操作符判断执行的函数
		//加法
		if(operater=="+")
			first=((first-0)*10+(second-0)*10)/10;
		//减法
		else if(operater=="-")
			first=((first-0)*10-(second-0)*10)/10;
			//first=(first-0)-(second-0);
		//乘法
		else if(operater=="×")
			first=((first-0)*10*(second-0)*10)/100;
		// 除法
		else if(operater=="÷"){
			
			if(first==0 && second==0){
				//first="结果未定义";
				first="Error";
				loseefficacy();
			}
			//0/0
			else if(second==0){
				//first="除数不能为零";
				first="Error";
				loseefficacy();
			}
			else
				first=(first-0)/(second-0);
			}
			
		// 取模
		else if(operater=="%")
			first=(first-0)%(second-0);
		//平方根
		else if(operater=="√")
			first=(first-0)+sqrt(second-0);
		 if(first=="结果未定义"||first=="除数不能为零" ||(first-0)>1e256){
		 	first="Error";
		 	loseefficacy();
		 }
		//screenin = document.getElementById("screenName")
		screenin.value=first;
		pointer=1;
		beforeoper=true;
		beforeCE=false;
	}
}
//按下C的时候
function clearAll(oaj){
	screenin=document.getElementById("screenName")
	screenin.value=0;
	pointer=1;
	first="";
	second="";
	beforeoper=false;
	operater="";
	
	beforeCE==false;
	recover();  
}
//按下CE
function clearOne(oaj){
	screenin=document.getElementById("screenName")
	//screenin.value=0;
	// if((pointer==2)||(operater && pointer==1))
	// 	second="0";
	if(pointer==1){
		first=0;
		screenin.value=first;
	}
	else{
		pointer=2;
		second="0";
		screenin.value=second;
	}
	beforeCE=true;
	if(beforewrong==true){
		clearAll();
		recover();
	}
}
//平方根,1/x，x平方
function pinf(oaj){
	screenin=document.getElementById("screenName")
	if(oaj.innerHTML=="√"){
		if(screenin.value<0)
		{
			screenin.value="Error";
			loseefficacy();
		}
		else if(pointer==1 && (!second) && first && operater)
		{
			screenin.value=Math.sqrt(first);
			second=screenin.value;
			pointer=2;
			//operaterin();
			// second=Math.sqrt(first);
			//equalin();
		}

		//2* 按根号	
		else if((!first) && (!second))
			screenin.value=0;
		else if(pointer==1){
			screenin.value=Math.sqrt(first);
			first=screenin.value;
		}
		else if(pointer==2){
			screenin.value=Math.sqrt(second);
			second=screenin.value;	
		}
	}
	else if(oaj.innerHTML=="1/x"){
		if(screenin.value==0){
			//screenin.value="除数不能为零";
			screenin.value="Error"
			loseefficacy();
		}
		else if(pointer==1){
			screenin.value=1/(first-0);
			first=screenin.value;
		}
		else if(pointer==2){
			screenin.value=1/(second-0);
			second=screenin.value;
			
		}
	}
	else if(oaj.innerHTML=="x²"){
		if((!first) && (!second))
			screenin.value=0;
		else if(pointer==1){
			screenin.value=(screenin.value)*(screenin.value);
			first=screenin.value;
		}
		else if(pointer==2){
			screenin.value=(screenin.value)*(screenin.value);
			second=screenin.value;
			
		}
	//}
	//beforeoper=true;
	equalin();
	}
	beforeoper=true;
	//单目操作符当作一次运算结束
}
//退格,不可退结果
function adelete(oaj){
	screenin=document.getElementById("screenName")	       
	var arr=screenin;
	var strs=screenin.value;
	if(strs.indexOf("-")!=-1 && arr.value==0 && beforeoper==false)
		arr.value=0;
	//输入0的
	//-0.8 -0. 0
	else if(strs.indexOf("-")!=-1 && arr.value.length==2 && beforeoper==false)
		arr.value=0;
	//-1.8 -1. -1 0
	else if ((arr.value.length!=1 && beforeoper==false && !operater && pointer==1) || (arr.value.length!=1 && beforeoper==false && pointer==2) ) 
		arr.value = arr.value.substring(0, arr.value.length - 1);
	//加了操作符,也不能删,所以要分为两种情况，一种第一位，一种第二位
	//单目运算符也不能删
	else if(arr.value.length==1 && beforeoper==false)
		arr.value=0;
	//如果第一位是0，那么不能再删数字、、
	
	
	//-8
	
	if(beforewrong==true){
		clearAll();
		recover();
	}
}
//正负号
function negative(oaj){
	screenin=document.getElementById("screenName")	 
	var strs=screenin.value;
	if(strs.indexOf("-")!=-1){
		var arr=screenin;
		arr.value = arr.value.substring(1, arr.value.length);
	}
	//已经有一个负号了，再按一次就去掉符号	
	else if(strs.indexOf(".")!=-1)
		screenin.value="-"+screenin.value;
	
	else 
		screenin.value=(screenin.value)*(-1);
	if(pointer==1 && operater && (!second)){
		second=screenin.value;
	}
	//1+ 按- 1+（-1）=0
	else if(pointer==1){
		first=screenin.value;
	}
	else if(pointer==2){
		second=screenin.value;
	}
		
}
//按钮失效
function loseefficacy(oaj){
	document.getElementById("board reminder").disabled=true;
	document.getElementById("board sqrt").disabled=true;
	document.getElementById("board square").disabled=true;
	document.getElementById("board 1x").disabled=true;
	document.getElementById("board plus").disabled=true;
	document.getElementById("board minus").disabled=true;
	document.getElementById("board multiply").disabled=true;
	document.getElementById("board division").disabled=true;
	document.getElementById("board dot").disabled=true;
	document.getElementById("board negative").disabled=true;
	beforewrong=true;
} 
//按钮恢复
function recover(oaj){
	screenin=document.getElementById("screenName");	
	//clearAll();
	document.getElementById("board reminder").disabled=false;
	document.getElementById("board sqrt").disabled=false;
	document.getElementById("board square").disabled=false;
	document.getElementById("board 1x").disabled=false;
	document.getElementById("board plus").disabled=false;
	document.getElementById("board minus").disabled=false;
	document.getElementById("board multiply").disabled=false;
	document.getElementById("board division").disabled=false;
	document.getElementById("board dot").disabled=false;
	document.getElementById("board negative").disabled=false;
	screenin.value=0;
	beforewrong=false;
}
//清除浮点数问题······
// function clearfloat(a,b){
// 	var strlength_1 = a.split(".")[1].length;
// 	var strlength_2 = b.split(".")[1].length;
// 	var times=Math.pow(10,Math.max(strlength_1,strlength_2))
	//加法
	// if(operater=="+")
	// 	first=((first-0)*10+(second-0)*10)/10;
	//减法
// 	else if(operater=="-")
// 		first=((first-0)*10-(second-0)*10)/10;	

// }