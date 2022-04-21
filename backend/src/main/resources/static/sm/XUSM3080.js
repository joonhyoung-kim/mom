var menuId = 'XUSM3080';
var widget = momWidget;
var VIEW= {
	initParam		: undefined,
	columnProperty1	: undefined,
	createdFlag		: undefined,
   
	init: function() {	
	}
	
};

$(document).ready(function(event){	
	momWidget.init(1, menuId, VIEW);
	VIEW.init();
});