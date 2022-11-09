var menuId = 'XUMD2010';
var XUMD2010= {
	initParam		:  undefined,
	columnProperty1	: undefined,
	createdFlag		: undefined,
	init: function() {
		var that = this;		
	} 		
};

$(document).ready(function(event){	
	momSetup.init();
	momWidget.init(1, menuId, XUMD2010);
	XUMD2010.init();
});