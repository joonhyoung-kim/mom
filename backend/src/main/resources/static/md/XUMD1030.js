var menuId = 'XUMD1030';
var XUMD1030= {
	initParam		:  undefined,
	columnProperty1	: undefined,
	createdFlag		: undefined,
	init: function() {
		var that = this;		
	} 		
};

$(document).ready(function(event){	
	momWidget.init(1, menuId, XUMD1030);
	XUMD1030.init();
});