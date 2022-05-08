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
		 				var diffDate = date1.getTime() - date2.getTime();	  
					    var dateDays = Math.abs(diffDate / (1000 * 3600 * 24));
					    var today = new Date(items[0]['startDate']);  //startdate 넣어야댐
					    for(var i=0;i<=dateDays;i++){
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
			             result.param = newParam;
        
	    }
	    else if(index == 0 && action == 'U' && btnId =='saveBtnDP'){
			var checkedItem = momWidget.getCheckedRowItems(momWidget.grid[0]);
			var items = param;	
			if(checkedItem =='FAIL'){
        		result.result = 'FAIL';
        		return;
			}				           				        
			    items[0]['applyDate'] =  checkedItem[0]['applyDate'];
			   result.param = items;  
                       
	    }
	    else if (index == 1 && btnId =='saveBtnDP'){
		                var items = param;	
		                items[0]['arrayParam1']	= [{toWorkCenterCd:items[0]['toWorkGroupCd']}];				
					   /* for(var i=0;i<=items.length;i++){
						
						   
						     
					    }*/
			            result.param = items;
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