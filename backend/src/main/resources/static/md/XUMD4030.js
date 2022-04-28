var menuId = 'XUMD4030';
var widget = momWidget;
var VIEW= {
	initParam		: undefined,   
	init: function() {	
	}
	
};

$(document).ready(function(event){	
	momWidget.init(1, menuId, VIEW);
	VIEW.init();
});