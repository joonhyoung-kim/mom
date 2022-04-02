var menuId = 'XUMD1080';
var XUMD1080= {
	initParam		: undefined,
	columnProperty1	: undefined,
	createdFlag		: undefined,
	init: function() {
		var that = this;		
	},
	 createCallInit: function(index,your,action,btnId,param,result) {
		if(index==1 && btnId =='createBtn'){
			var checkedItems = momWidget.getCheckedRowItems(momWidget.grid[0]);
				if (checkedItems.length==0){
					  result.result = 'FAIL';
					  momWidget.splashHide();
					  return;	
				}
		$('#routingNmDP2').val(checkedItems[0].routingId);
					 		
		}
	
	}

};

$(document).ready(function(event){	
	momWidget.init(1, menuId, XUMD1080);
	momWidget.init(2, menuId, XUMD1080);
	XUMD1080.init();
});