var menuId = 'XUMD4040';
var widget = momWidget;
var that = undefined;
var VIEW= {
	initParam		: undefined, 
	  
	init: function() {	
		that = this;	
		that.event();
	},
	event: function(e) {
		$(document).on('change','#shiftCdDP1', function(e) {
			mom_ajax('R', 'XUMD4020.findBtn1', {shiftCd2:$('#shiftCdDP1').val(),useYn:'Y'}, function(result1, data1) { 
		        if(result1 != 'SUCCESS' || data1.length == 0) {
		    	  momWidget.splashHide();
			      return;							     
		      }			
		     var startTime =  data1[0]['startTime'];
		     var endTime   =  data1[0]['endTime'];
		     $('#startTimeDP1').val(startTime);
		     $('#endTimeDP1').val(endTime);
			  	}, undefined, undefined, this, false);
		});
	},
	
    savePopCallInit: function(index,your,action,btnId,param,result) {
	     if(index == 0 && (btnId =='createBtn' || btnId =='editBtn' || btnId =='copyBtn')){		           
					    var items = param;						    	
					    let newParam = [];				   												
						var date1 = new Date(items[0]['startDate']);
						var date2 = new Date(items[0]['endDate']);
						var startTimeToSec = date1.getTime()/1000;
				        var endTimeToSec   = date2.getTime()/1000;
				        if(startTimeToSec>endTimeToSec){
					        /*  momWidget.messageBox({type:'danger', width:'400', height: '145', html:'종료일은 시작일 이후여야 합니다!'});
							  momWidget.splashHide();*/
							  result.result = 'FAIL';
							  result.msg = '종료일은 시작일 이후여야 합니다!';
						      return;
						/*var diffDate = (86400 + (endTimeToSec - startTimeToSec ))*/
					    }
					    else if(startTimeToSec == endTimeToSec){
						//var diffDate= 1440;
			            var diffDate= 86400;
					    }
					    else{
						
						var diffDate = (endTimeToSec - startTimeToSec )+86400;
			          
					    }
		 		  		 				
					   // var dateDays = Math.abs(diffDate / (1000 * 3600 * 24));
					   dateDays = Math.abs(diffDate / (86400));
					    var today = new Date(items[0]['startDate']);  //startdate 넣어야댐
					    for(var i=0;i<dateDays;i++){
						     today = new Date(items[0]['startDate']);						
						     today = new Date(today.setDate(today.getDate()+i));
							 year  = today.getFullYear()+''; // 년도
						     month = today.getMonth()+1+'' ;  // 월
						     day  = today.getDate()+'';  // 날짜
						     if(month.length==1){
							      month = '0'+month;
						     }
						     if(day.length==1){
							     day = '0'+day;
						     }
						       items[0]['applyDate'] = year+'-'+month+'-'+day;
						       newParam[i] =  JSON.parse(JSON.stringify(items[0])); 
						   
						     
					    }
					    if(btnId=='createBtn' || btnId=='copyBtn'){
						   mom_ajax('R', 'XUMD4040.checkShift', {applyDate:newParam[0]['applyDate'],workCenterCd:newParam[0]['workCenterCd']}, function(result1, data1) { 
							        if(result1 != 'SUCCESS' ) {
							    		  result.result = 'FAIL';
							              result.msg = '통신에러!';
								          return;							     
							        }
							        if(data1.length > 0){
								  		  result.result = 'WARN';
							              result.msg = '적용일 기간에 SHIFT 존재합니다!!';
								          return;		
									}
									
												
									  result.param = newParam;
			  						}, undefined, undefined, this, false);
					    }
					 
					    
					    
			            
        
	    }
      else if(index == 0 && btnId =='customBtn1-1'){	
	      	 for(var i=0,max=param.length; i<max;i++){
				 param[i]['param1'] = $("#toWorkGroupCdDP1").jqxComboBox('getCheckedItems')[i]['value'];		     
		     }	
	             result.param = param;
	  }

	},
	editCallInit: function(index,your,action,btnId,param,result) {
		if(index ==0 && btnId =='editBtn'){	
	           var items = param;	
	          $('#startDate'+'DP1').val(items[0]['applyDate']);
			  $('#endDate'+'DP1').val(items[0]['applyDate']);	
		}
	 

	},
	copyCallInit: function(index,your,action,btnId,param,result) {
		if(index ==0 && btnId =='copyBtn'){	
	           var items = param;	
	          $('#startDate'+'DP1').val(items[0]['applyDate']);
			  $('#endDate'+'DP1').val(items[0]['applyDate']);	
		}
	 

	},
	customCallInit: function(index,your,action,btnId,param,result) {
			 if (btnId=='customBtn1-1'){
				var checkedItems = widget.getCheckedRowItems(widget.grid[0]);
				if(checkedItems == 0){
					 result.msg = '데이터를 체크해주세요!';
					 result.result = 'FAIL';
				}
				  //$('#'+'defaultPop-'+(index+1)).find('#startDateDP1').val()
				  $('#'+'customPop-'+btnId).find('#startDateDP1').val($('#startDate'+'SP1').val());
				  $('#'+'customPop-'+btnId).find('#endDateDP1').val($('#endDate'+'SP1').val());
				  $('#'+'customPop-'+btnId).find('#fromWorkCenterCdDP1').val(checkedItems[0]['fromWorkCenterCd']);
				  		
			}
			else if(btnId=='customBtn1-2'){
					var checkedItems = momWidget.getCheckedRowItems('#grid1',true);
				if(checkedItems == 0){
					 result.msg = '데이터를 체크해주세요!';
					 result.result = 'FAIL';
				}
				  $('#startDateDP1-2').val($('#startDateSP1').val());
				  $('#endDateDP1-2').val($('#endDateSP1').val());			
				  $('#fromWorkCenterCdDP1-2').val(checkedItems[0]['workCenterCd']);	
			}
				
			else{
				  	
			}
		
		   
	        		 
	}
};

$(document).ready(function(event){	
	momSetup.init();
	momWidget.init(1,   menuId,    VIEW,'GRID');
	/*momWidget.init(61, 'XUSM8050', VIEW,'CP');
	momWidget.init(62, 'XUSM8060', VIEW,'CP');
	momWidget.init(63, 'XUSM8070', VIEW,'CP');
	momWidget.init(64, 'XUSM8080', VIEW,'CP');	*/
	VIEW.init();
});