var menuId = 'XUMD4020';
var widget = momWidget;
var that = undefined;
var VIEW= {
	initParam		: undefined, 
	init: function() {
		that = this;	
		that.event();
		
	},
	event: function(e) {
		$(document).on('select','#restTimeCdDP3', function(e) {
			mom_ajax('R', 'XUMD4030.findBtn1', {restTimeCd2:$('#restTimeCdDP3').val(),useYn:'Y'}, function(result1, data1) { 
		        if(result1 != 'SUCCESS' || data1.length == 0) {
		    	  momWidget.splashHide();
			      return;							     
		      }			
		     var restTimeNm = data1[0]['restTimeNm'];
		     var startTime =  data1[0]['startTime'];
		     var endTime   =  data1[0]['endTime'];
		     $('#restTimeNmDP3').val(restTimeNm);
		     $('#startTimeDP3').val(startTime);
		     $('#endTimeDP3').val(endTime);
			  	}, undefined, undefined, this, false);
		});
	},
		cellClickCallBack: function(index,rowIndex,target,e) {
		if(index==0){
			var item = e.item;	
			//var param = momWidget.getSelectedItems(momWidget.grid[0]);
			  setTimeout(function() {
			  	   VIEW.initParam = {shiftCd:item['shiftCd']};
	               momWidget.findBtnClicked(1, {shiftCd:item['shiftCd']}, true, 'CELLCLICK',menuId,VIEW);
			       momWidget.findBtnClicked(2, {shiftCd:item['shiftCd']}, true, 'CELLCLICK',menuId,VIEW);
    					},200);
			
		
		
	}
	},
	 createCallInit: function(index,your,action,btnId,param,result) {
		if(index == 1 && btnId == 'createBtn'){
			var checkedItems = momWidget.getCheckedRowItems(momWidget.grid[0]);
				if (checkedItems.length==0){
					  result.result = 'FAIL';
					  result.msg    =  '상단에서 SHIFT 선택필수!';
					  momWidget.splashHide();
					  return;	
				}
		          $('#shiftCdDP2').val(checkedItems[0].shiftCd);
		    
					 		
		}
		else if(index == 2 && btnId == 'createBtn'){
			var checkedItems = momWidget.getCheckedRowItems(momWidget.grid[0]);
				if (checkedItems.length==0){
					  result.result = 'FAIL';
					  result.msg    =  '상단에서 SHIFT 선택필수!';
					  momWidget.splashHide();
					  return;	
				}
		          $('#shiftCdDP3').val(checkedItems[0].shiftCd);
		          that.initParam = {shiftCd:checkedItems[0].shiftCd};
					 		
		}
	
	},
	savePopCallInit: function(index,your,action,btnId,param,result) {
	     if(index == 0 && btnId =='saveBtnDP'){		           
					    var items = param;
					    var startTime = items[0]['startTime'].split(':');
					    var endTime   = items[0]['endTime'].split(':');
					    var startTimeToSec = Number(startTime[0])*3600 + Number(startTime[1])*60;
					    var endTimeToSec = Number(endTime[0])*3600 + Number(endTime[1])*60;
					    if(startTimeToSec>endTimeToSec){
						items[0]['workTime'] = (86400 + (endTimeToSec - startTimeToSec ))/60
					    }
					    else if(startTimeToSec == endTimeToSec){
						items[0]['workTime'] = 1440;
			          
					    }
					    else{
						items[0]['workTime'] = (endTimeToSec - startTimeToSec )/60;
			          
					    }
					     result.param = items;
        
	    }
	    else if(index == 1 && btnId =='saveBtnDP'){		           
				    var items = param;
				    var startTime = items[0]['startTime'].split(':');
				    var endTime   = items[0]['endTime'].split(':');
				    var startTimeToSec = Number(startTime[0])*3600 + Number(startTime[1])*60;
				    var endTimeToSec = Number(endTime[0])*3600 + Number(endTime[1])*60;
				       if(startTimeToSec>endTimeToSec){
						items[0]['workTime'] = (86400 + (endTimeToSec - startTimeToSec ))/60
					    }
					    else if(startTimeToSec == endTimeToSec){
						items[0]['workTime'] = 1440;
			          
					    }
					    else{
						items[0]['workTime'] = (endTimeToSec - startTimeToSec )/60;
			          
					    }
		            result.param = items;
		            that.initParam = {shiftCd: items[0].shiftCd};
        
	    }

	},
	searchCallInit: function(index,your,action,btnId,param,result) {
		if(index == 1 && (btnId=='createBtn' || btnId=='editBtn')){	
			 result.param = VIEW.initParam;
					
	    }
	/*    else if(index == 1 && btnId=='delBtn'){
		result.param = {shiftCd:AUIGrid.getSelectedItems(widget.grid[index])[0]['item']['shiftCd']}
		}*/
		else if(index == 2 && (btnId=='createBtn' || btnId=='editBtn')){	
			 result.param = VIEW.initParam;
					
	   }
	/*   else if(index == 2 && btnId=='delBtn'){
		result.param = {shiftCd:AUIGrid.getSelectedItems(widget.grid[index])[0]['item']['shiftCd']}
	   }*/

	},
	delCallBack	: function(index,your,action,btnId,param,result) {
		 if(index == 1 && btnId=='delBtn'){
			result.param = {shiftCd:AUIGrid.getSelectedItems(widget.grid[index])[0]['item']['shiftCd']}
		 }
		 else if(index == 2 && btnId=='delBtn'){
			result.param = {shiftCd:AUIGrid.getSelectedItems(widget.grid[index])[0]['item']['shiftCd']}
		 }
		
	}
	
};

$(document).ready(function(event){	
	momSetup.init();
	momWidget.init(1, menuId, VIEW);
	momWidget.init(2, menuId, VIEW);
	momWidget.init(3, menuId, VIEW);
	VIEW.init();
});