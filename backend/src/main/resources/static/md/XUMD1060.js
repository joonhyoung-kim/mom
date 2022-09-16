var menuId = 'XUMD1060';
var XUMD1060= {
	initParam		:  undefined,
	columnProperty1	: undefined,
	createdFlag		: undefined,
	init: function() {
		var that = this;		
	} 		
};

$(document).ready(function(event){	
	momSetup.init();
	momWidget.init(1, menuId, XUMD1060);
	XUMD1060.init();
});