var menuId = 'XUMD1080';
var XUMD1080= {
	initParam		:  undefined,
	columnProperty1	: undefined,
	createdFlag		: undefined,
	init: function() {
		var that = this;		
	} 		
};

$(document).ready(function(event){	
	momWidget.init(1, menuId, XUMD1080);
	momWidget.init(2, menuId, XUMD1080);
	XUMD1080.init();
});