var menuId = 'XUMD1040';
var XUMD1040= {
	initParam		:  undefined,
	columnProperty1	: undefined,
	createdFlag		: undefined,
	init: function() {
		var that = this;		
	} 		
};

$(document).ready(function(event){	
	momSetup.init();
	momWidget.init(1, menuId, XUMD1040);
	XUMD1040.init();
});