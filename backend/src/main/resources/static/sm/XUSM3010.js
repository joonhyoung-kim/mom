
var menuId = 'XUSM3010';
var XUSM3010 = {
	initParam		:  undefined,
	columnProperty1	: undefined,
	createdFlag		: undefined,
	init: function() {
		var that = this;		
	} 		
};

$(document).ready(function(event){	
	momWidget.init(1, menuId, XUSM3010);	
	XUSM3010.init();
});