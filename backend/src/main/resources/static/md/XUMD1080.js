var menuId = 'XUMD1080';
var widget = momWidget;
var VIEW= {
	initParam		: undefined,
	columnProperty1	: undefined,
	createdFlag		: undefined,
	init: function() {
			
	},
	searchCallInit: function(index,your,action,btnId,param,result) {
	   let checkItem = widget.getCheckedRowItems(widget.grid[0]);
	    if(index==0){				
			   AUIGrid.clearGridData(widget.grid[1]);
		} 
        else if(index==1){				
			    result.param = {routingId:checkItem[0].routingId};	
		} 


	},
    cellClickCallBack: function(index,rowIndex,target,e) {
		if(index == 0){
			var item = e.item;		
			momWidget.findBtnClicked(1, {routingId:item.routingId}, true, 'INIT',menuId,VIEW);
			//that.initParam = {routingId:item.routingId}; 
		}
	
	},
	 dropCallBack: function(index,fromGrid,toGrid,fromRowIndex,toRowIndex,dropColumnIndex,item) {
		if(index == 10){	
			          let totalCount = AUIGrid.getRowCount(widget.grid[11]);
				      AUIGrid.setCellValue(widget.grid[11], toRowIndex, "operationSeq", totalCount+'');
	
         
		}
		if(index == 11){
			          let totalCount = AUIGrid.getRowCount(widget.grid[11]);	
			          for(let i=0,max=totalCount; i<max;i++){
							AUIGrid.setCellValue(widget.grid[11], i, "operationSeq", (i+1)+'');
			          }
				      
	
         
		}

	},


	customCallInit: function(index,your,action,btnId,param,result) {
		if(index == 11 &&btnId=='customBtn12-1'){
			AUIGrid.clearGridData(widget.grid[11]);
			mom_ajax('R', 'XXDG0110.findBtn11', {}, function(result1, data1) { 
		        if(result1 != 'SUCCESS' || data1.length == 0) {
		    	  momWidget.splashHide();
			      return;							     
		      }			
		        AUIGrid.setGridData(widget.grid[10], data1);	
			  	}, undefined, undefined, this, false);
		   }	
		
	}	  
};

$(document).ready(function(event){	
	momSetup.init();
	momWidget.init(1, menuId, VIEW);
	momWidget.init(2, menuId, VIEW);
	momWidget.gridPopup.init(1,1,'XXDG0110', VIEW);
	momWidget.gridPopup.init(1,2,'XXDG0110', VIEW);
	VIEW.init();
});