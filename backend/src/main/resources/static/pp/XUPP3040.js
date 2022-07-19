var menuId = 'XUPP3040';
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
		cellClickCallBack: function(index,rowIndex,target,e) {
		var item = e.item;	
		 if(index == 0){
		     widget.findBtnClicked(1, {workOrderId:item.workOrderId}, true, 'INIT',menuId,VIEW,undefined);
		}
	
	},
	addRowCallBack(index,your,action,btnId,param,result,data){
		if(index==1){
			
			
		}
			
		
		}
	

	
	
};

$(document).ready(function(event){	
	momWidget.init(1, menuId, VIEW);	
	momWidget.init(2, menuId, VIEW);	
	VIEW.init();
});