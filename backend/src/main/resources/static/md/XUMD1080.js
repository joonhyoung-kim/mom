var menuId = 'XUMD1080';
var widget = momWidget;
var VIEW= {
	initParam		: undefined,
	columnProperty1	: undefined,
	createdFlag		: undefined,
	init: function() {
			
	},
	 createCallInit: function(index,your,action,btnId,param,result) {
		if(index == 1 && btnId == 'createBtn'){
			var checkedItems = momWidget.getCheckedRowItems(momWidget.grid[0]);
				if (checkedItems.length==0){
					  result.result = 'FAIL';
					  result.msg    =  '상단에서 Routin Id 선택 필요!';
					  widget.splashHide();
					  return;	
				}
					$('#routingIdDP2').val(checkedItems[0].routingId);
					 		
		}
	
	},
	searchCallInit: function(index,your,action,btnId,param,result) {
		if(index == 1 && (btnId=='findBtn' ||  btnId=='EXCEL_DOWN')){	
			var item = param;
			var checkedItems =AUIGrid.getSelectedItems(momWidget.grid[0])[0];
				if (checkedItems==undefined){
					 /* result.result = 'FAIL';
					  result.msg    =  '상단에서 Routin Id 선택 필요!';*/ 
					  widget.splashHide();
					  return;	
				}
			result.param = {routingId:checkedItems['item'].routingId};
					
	    }


	},
	searchCallBack: function(index,your,action,btnId,param,result,data) {
		if(index == 0){				
			//AUIGrid.clearGridData(widget.grid[1]);
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