var menuId = 'XUMD4020';
var widget = momWidget;
var VIEW= {
	initParam		: undefined,   
	init: function() {	
	}
	
};

$(document).ready(function(event){	
	momWidget.init(1, menuId, VIEW);
	momWidget.init(2, menuId, VIEW);
	momWidget.init(3, menuId, VIEW);
	VIEW.init();
});