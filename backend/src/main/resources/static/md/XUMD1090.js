var menuId = 'XUMD1090';
var widget = momWidget;
var that = undefined;
var VIEW= {
	init: function() {	
		that = this;	
		//that.event();
	},
	
	searchCallInit: function(index,your,action,btnId,param,result,event) {
		if(index ==1 && btnId =='saveBtn' ){
			 let checkItem = widget.getCheckedRowItems(widget.grid[0]);
		      result.param = {borId:checkItem[0].borId};
			  					
		}
		else if(index==0){				                        //20221027 LCS 추가 
		  AUIGrid.clearGridData(widget.grid[1]);
		} 
	},
	customCallInit: function(index,your,action,btnId,param,result) {
	  let checkItem = widget.getCheckedRowItems(widget.grid[0]);
	  if (index == 0){
	    if(btnId == 'customGridPopBtn1-1'){
	      if(checkItem.length==0){
	        result.msg = '상단에서 품목별 작업장 관리 선택필수!';
					result.result = 'WARN';
					return;
	      }
	      // 검색조건 초기화 
	      $('#routingIdSP11').val('');
	      $('#operationIdSP11').val('');
	   
	    }  
	  }
	  else if(index == 10){			    
		if(action=='D'&& btnId == 'customBtn11-1'){ 		
		  let checkedItem = [];  
		  for(var i=0,max=param.length; i<max;i++){
			if(param[i]['checkBox']=='Y'){
			  checkedItem.push(param[i]);
			}
	      }
	      result.param = checkedItem;
		}
		else if(action=='C'&& btnId == 'customBtn11-1'){ 
		  for(var i=0,max=param.length; i<max;i++){
			param[i]['borId'] = checkItem[0]['borId'];
			
	      }
		}
	  }
    },	
    	customCallBack: function(index,your,action,btnId,param,result,data) {
	    if(index == 0 && btnId == 'customGridPopBtn1-1'){	
			let checkedItem = AUIGrid.getCheckedRowItems(widget.grid[0]);
			let gridItem = AUIGrid.getGridData(widget.grid[10]);
		    if(checkedItem.length==0){
	        result.msg = '상단에서 품목별 작업장 관리 선택필수!';
					result.result = 'WARN';
					return;
	       } 
	       for(let i=0;i<gridItem.length;i++){
		       if(gridItem[i]["routingId"] == checkedItem[0]['item']['routingId']){
			     AUIGrid.setCellValue(widget.grid[10], i, "checkBox", 'Y');
			   }
	       }
	       	   			
		}
	
	},	  
	cellClickCallBack: function(index,rowIndex,target,e) {
	  if(index==0){
		var item = e.item;	
		//var param = momWidget.getSelectedItems(momWidget.grid[0]);
		setTimeout(function(){
		  mom_ajax('R', 'DD.DD00023', {workCenterCd:item['workCenterCd']}, function(result, data) {
		    if(result != 'SUCCESS') {
		      momWidget.splashHide();
			  return;							     
		    }					       
			for(var i=0;i<widget.columnProperty[1].length;i++){
			  if(widget.columnProperty[1][i]['columnId'] =='workStationCd'){
				widget.columnDropdown[1][widget.columnProperty[1][i]['columnId']]=data;
			  }
			}
			widget.findBtnClicked(1, {borId:item['borId']}, true, 'CELLCLICK',menuId,VIEW);
	      }, undefined, undefined, this, false);	
		}, 200);
	  }
	
	}
};

$(document).ready(function(event){	
	momSetup.init();
	momWidget.init(1, menuId, VIEW);
	momWidget.init(2, menuId, VIEW);
	momWidget.gridPopup.init(1,11,1,'XXDG0120', VIEW);
	/*momWidget.gridPopup.init(1,2,'XXDG0120', VIEW);*/
	VIEW.init();
});