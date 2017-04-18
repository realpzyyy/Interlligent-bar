
window.onload=function(){ $('.loading').hide(); } //当页面加载完成时不现实loading页面
$(document).ready(function(){
	
	//切换心率和计步
   $("#sider-hearder li").click(function() {

        $(this).siblings('li').removeClass('selctor-header');  

        $(this).addClass('selctor-header');  

    });
	
	//切换页面
   $(".btn1").click(function(){
	  
    $('#xinlv').css('left','0');
	
  });
   $(".btn2").click(function(){
  	  
    $('#xinlv').css('left','-100%');
 
  });
  
    //健康指数蒙层点击显示
	$("#healthli").click(
	     function(){
			 
			$(".health").show(); 
			 
			 }
	)
	$(".health").click(
	    function(){
			 
			$(".health").hide(); 
			 
			 }
	)
    
	//显示实时心率 心率需要从硬件获取
	timeone = setInterval(function(){
		
		$("#nowxinlv").text(Math.ceil(Math.random()*120)); //text()中的数值从硬件中获取
		},1000);
	
	
	
	//开始测试按钮
    $("#testbtm-btm").click(
	
	   function(){
		   
		$("#testbtm").css('left','-100%');//按钮切换到心率
		
	
		var sumtime = 120;//时间总数
		
		var sumtimeone = 120; //时间基数备份
			
        var arry = new Array();//心率数值的数组  //需要从硬件中获取
		
		var sumbpm = 0;//心率总和初始化
		
		time = setInterval(function(){
			
			//倒计时
			sumtime--;
			var s = sumtime +"(S)";
			$("#time").text(s);
			 
			//心率数值数组
			arry.splice(0,0,Math.ceil(Math.random()*120));   //需要从硬件中获取 最后一个参数
			
		    sumbpm = sumbpm + arry[0]; //心率总和累加
			
			
			//当数组容量比60大的时候 数组大小不再改变
			if(arry.length>61){
				arry.splice(59,1);
				}
			
		    //心电图	绘制
            $("#sparkline").sparkline(arry,{
                type: 'line',
                width: '100%',
                height: '90%',
                lineColor: '#61f0be',
                fillColor: '#f7f7f7',
                lineWidth: 1,              //线的宽度
	            minSpotColor: '#61f0be',
                maxSpotColor: '#61f0be',
	            chartRangeMin: 1,
                chartRangeMax: 1,
                chartRangeMinX:2,         //画布上最少必须放的点数
                chartRangeMaxX: 60,       //画布上放的点数（控制每个点数的横坐标距离）
                spotColor: '#61f0be',
                highlightLineColor: undefined}
		        );
             $.sparkline_display_visible();
			 
			 	
			//当时间等于0以后 清楚时间Interval 并跳转页面
			if(sumtime < 1){
				clearInterval(time);
				localStorage.setItem("avg",Math.ceil(sumbpm/sumtimeone));
				location.href = "report.html"; 
				}
			 
			},1000);
		}
	);
});

function adddate(){
	
	//向右跳转时间（加时间）的按钮
	var s = document.getElementById("beginTime").innerHTML;
	
	var arr = s.split("/"); //将获取的数组按“/”拆分成字符串数组
	
	var year = parseInt(arr[0]);//开分字符串数组的第一个地址的内容是年份
	var mouth = parseInt(arr[1]);//开分字符串数组的第二个地址的内容是月份
	var date = parseInt( arr[arr.length-1]);//开分字符串数组的第三个地址的内容是日期
	
	if(date == 28){//当日期为28号时 只判断是否是2月
		switch(mouth)
		{
			  case 2:
				  if(year % 4 == 0 && year % 100 !=0 || year%400 ==0){
					  date = date +1;
					  break;
					 } else{
						  date = 1;
					     mouth = mouth +1; 
					     break;
					 //如果是闰年2月 日期就加一
						 }
			  default:
						 date = date +1;
					     break;
						 //不是闰年2月 日期就变为1 月份加一
		}
		
	}else if(date == 29){ //当日期为29号是 也是判断是否是2月
		switch(mouth)
		{
			  case 2:
				   date = 1;
				   mouth = mouth +1;
				   break;
			  default:
						 date = date +1;
					     break;
		} //当29号出现必定是闰年 日期变为1 月份加一
		
	}else if(date == 30){ //当日期为30 时
			 switch(mouth)
			   {
					case 1:
					case 3:
					case 5:
					case 7:
					case 8:
					case 10:
					case 12: 
						 date = date +1;
						 break; //这些月份的时候一个月有31天 到30的时候再加一
					case 4:
					case 6:
					case 9:
					case 11: 
						 date = 1;
						 mouth = mouth +1;
						break; //这些月份的时候一个月有30天 到30的时候 日期变为1 月份加一
					
			   }
	   }else if(date == 31){
		   
			 switch(mouth)
			   {
					case 1:
					case 3:
					case 5:
					case 7:
					case 8:
					case 10:
						 date = 1;
						 mouth = mouth+1;
						 break; //这些月份的时候一个月有31天 到31的时候  日期为1月份加一
					case 12: 
						 date = 1;
						 mouth = 1;
						 year = year+1;;
						 break;  //十二月 的 31 号 日期变为一 月份变为一 年份加一
										
			   }
	   }else{
		   date +=1;
		   }
	
	document.getElementById("beginTime").innerHTML = year+"/"+mouth+"/"+date;

	}
	
	
function increasdate(){
	//向左跳转时间（减时间）的按钮
	var s = document.getElementById("beginTime").innerHTML;
	
	var arr = s.split("/"); //将获取的数组按“/”拆分成字符串数组
	
	var year = parseInt(arr[0]);//开分字符串数组的第一个地址的内容是年份
	var mouth = parseInt(arr[1]);//开分字符串数组的第二个地址的内容是月份
	var date = parseInt( arr[arr.length-1]);//开分字符串数组的第三个地址的内容是日期
	
	if(date == 1){//当日期为1时，再剪就会改变月份，甚至年份
		switch(mouth){
			case 1:
			     date = 31;
				 mouth = 12;
				 year = year-1;
				 break;  //一月一日 再剪一天 年份减一 月份为12 日期为31
		    case 2:
			case 4:
			case 6:
			case 8:
			case 9:
			case 11:
			     date = 31;
				 mouth = mouth-1;
				 break; //这些月一日 再剪一天  月份减一 日期为31
			case 3:
			      if(year % 4 == 0 && year % 100 !=0 || year%400 ==0){
					  date = 29;
					  mouth = mouth -1;
					 }else {
						 date = 28;
						 mouth = mouth -1;
						 }
			       break; //三月一日 再剪一天  月份减一 日期为根据是否是闰年来判断 日期
			case 5:
			case 7:
			case 10:
			     date = 30;
				 mouth = mouth -1;
			     break; //这些月一日 再剪一天  月份减一 日期为30
			}
		}else{
			date = date-1;
			}
	
	document.getElementById("beginTime").innerHTML = year+"/"+mouth+"/"+date; //拼接字符串插入到标签中
	
	}
	
