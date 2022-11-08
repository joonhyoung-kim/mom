var menuId = 'XUMD1070';
var XUMD1070= {
	initParam		:  undefined,
	columnProperty1	: undefined,
	createdFlag		: undefined,
	init: function() {
		var that = this;		
	} 		
};

$(document).ready(function(event){	
	momSetup.init();
	momWidget.init(1, menuId, XUMD1070);
	XUMD1070.init();
});