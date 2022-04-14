var menuId = 'XUMD3010';
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