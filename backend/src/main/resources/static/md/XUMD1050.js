var menuId = 'XUMD1050';
var XUMD1050= {
	initParam		:  undefined,
	columnProperty1	: undefined,
	createdFlag		: undefined,
	init: function() {
		var that = this;		
	} 		
};

$(document).ready(function(event){	
	momWidget.init(1, menuId, XUMD1050);
	XUMD1050.init();
});