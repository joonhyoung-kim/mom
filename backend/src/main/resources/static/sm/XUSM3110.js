var menuId = 'XUSM3110';
var widget = momWidget;
var that = undefined;
var VIEW= {
	initParam		: undefined, 
	  
	init: function() {	
		that = this;	
		that.event();
	},
	event: function(e) {
		$(document).on('change','#menuId', function(e) {
			mom_ajax('R', 'DD.DD00006', {menuId:$('#menuId').val()}, function(result1, data1) { 
		        if(result1 != 'SUCCESS' || data1.length == 0) {
		    	  momWidget.splashHide();
			      return;							     
		      }			
		   $('#gridId').jqxComboBox('source', data1);
			  	}, undefined, undefined, this, false);
		});
	},
	
};

$(document).ready(function(event){	
	momSetup.init();
	momWidget.init(1, menuId, VIEW);
	VIEW.init();
});