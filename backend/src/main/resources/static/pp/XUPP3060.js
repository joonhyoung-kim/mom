var menuId = 'XUPP3060';
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
		if(index == 0 ){
		
			widget.findBtnClicked(1, {workOrderId:e.item['workOrderId']}, true, 'customBtn2-1',menuId,VIEW);			
		}
	
	
	}	
	
};

$(document).ready(function(event){	
	momWidget.init(1, menuId, VIEW);	
	momWidget.init(2, menuId, VIEW);	
	VIEW.init();
});