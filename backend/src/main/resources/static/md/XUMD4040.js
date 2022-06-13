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
			mom_ajax('R', 'XUMD4020.defaultInfo1', {shiftCd2:$('#shiftCdDP1').val(),useYn:'Y'}, function(result1, data1) { 
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
	
    saveCallInit: function(index,your,action,btnId,param,result) {
	     if(index == 0 && action == 'C' && btnId =='saveBtnDP'){		           
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
					    mom_ajax('R', 'XUMD4040.checkShift', {applyDate:newParam[0]['applyDate'],workCenterCd:newParam[0]['workCenterCd']}, function(result1, data1) { 
							        if(result1 != 'SUCCESS' ) {
							    		  result.result = 'FAIL';
							              result.msg = '통신에러!';
								          return;							     
							        }
							        if(data1.length > 0){
								  		  result.result = 'FAIL';
							              result.msg = '적용일 기간에 SHIFT 존재합니다!!';
								          return;		
									}			
									  result.param = newParam;
			  						}, undefined, undefined, this, false);
					    
					    
			            
        
	    }
	    else if(index == 0 && action == 'U' && btnId =='saveBtnDP'){
			var checkedItem = momWidget.getCheckedRowItems(momWidget.grid[0],true);
			var items = param;	
			if(checkedItem =='FAIL'){
        		result.result = 'FAIL';
        		return;
			}				           				        
			    items[0]['applyDate'] =  checkedItem[0]['applyDate'];
			    result.param = items;  
                       
	    }
	/*    else if (index == 1 && btnId =='saveBtnDP'){
		                var items = param;				
					    for(var i=0;i<=items.length;i++){		
						if(items[i]['fromWorkCd'] == $('#toWorkGroupCdDP2').val()){
							items[0]['toWorkGroupCd'][0]['toWorkGroupCd']
						}				
					
						     
					    }
			            result.param = items;
	}
     else if (index == 2 && btnId =='saveBtnDP'){
		                var items = param;				
				
			            result.param = items;
	}*/
	},
	editCallInit: function(index,your,action,btnId,param,result) {
		if(index ==0 && btnId =='editBtn'){	
	           var items = param;	
	          $('#startDate'+'DP1').val(items[0]['applyDate']);
			  $('#endDate'+'DP1').val(items[0]['applyDate']);	
		}
	 

	},
	customCallInit: function(index,your,action,btnId,param,result) {
		if(index == 1 || index == 2){
			var checkedItems = momWidget.getCheckedRowItems('#grid1',true);
			if(checkedItems == 0){
				 result.msg = '데이터를 체크해주세요!';
				 result.result = 'FAIL';
			}
			$('#startDate'+'DP'+(index+1)).val($('#startDate').val());
			$('#endDate'+'DP'+(index+1)).val($('#endDate').val());	
			
		}
		else{
			  //var items = param;	
	          $('#startDate'+'DP'+(index+1)).val($('#startDate').val());
			  $('#endDate'+'DP'+(index+1)).val($('#endDate').val());	
		}
	        
		
	 

	},
};

$(document).ready(function(event){	
	momWidget.init(1, menuId, VIEW);
	momWidget.init(2, menuId, VIEW);
	momWidget.init(3, menuId, VIEW);
	momWidget.init(4, menuId, VIEW);
	momWidget.init(5, menuId, VIEW);
	
	VIEW.init();
});