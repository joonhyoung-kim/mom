var menuId = 'XUPP3020';
var widget = momWidget;
var that = undefined;
var VIEW= {
	initParam		: undefined, 
	  
	init: function() {	
		that = this;	
		that.event();
	},
	event: function(e) {
	
	}

	
	
};

$(document).ready(function(event){	
	momWidget.init(1, menuId, VIEW);	
	VIEW.init();
});