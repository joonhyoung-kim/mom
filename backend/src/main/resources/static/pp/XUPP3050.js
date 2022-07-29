var menuId = 'XUPP3050';
var widget = momWidget;
var that = undefined;
var VIEW= {
	initParam		: undefined, 
	  
	init: function() {	
		that = this;	
		that.event();
	},
	event: function(e) {
	
	},
	addRowCallInit: function(index,your,action,btnId,param,result){
		if(index == 0 && btnId == 'addBtn'){
			result.param = {targetIndex : 1};
		}
	},
	addRowCallBack: function(index,your,action,btnId,param,result,data){
		if(index == 0 && btnId == 'addBtn'){
			AUIGrid.setCellValue(widget.grid[1], 0, 'woStartTime', '');
			AUIGrid.setCellValue(widget.grid[1], 0, 'woEndTime', '');
		}
	},
	   cellClickCallBack: function(index,rowIndex,target,e) {
		if(index == 0 ){
			AUIGrid.clearGridData(widget.grid[1]);
		}
	
	
	}	
/*	searchCallInit: function(index,your,action,btnId,param,result) {
		if(index==0 && btnId== "CELLCLICK"){
			result.param = {itemId:that.paramTmp.authGroupCd};
			
		}

		
	},*/

	
	
};

$(document).ready(function(event){	
	momWidget.init(1, menuId, VIEW);	
	momWidget.init(2, menuId, VIEW);	
	VIEW.init();
});