var menuId = 'XUMD3020';
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