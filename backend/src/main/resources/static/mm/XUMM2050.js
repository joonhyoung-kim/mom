var menuId = 'XUMM2050';
var widget = momWidget;
var that = undefined;
var VIEW= {
	initParam		: undefined, 
	popupParam1     : {},
	popupParam2     : {},
	init: function() {	
		that = this;	
		that.event();
	},
	event: function(e) {
	
	},

	customCallInit: function(index,your,action,btnId,param,result) {
		if(index == 0 ){
			if(action =='C' && btnId == 'customBtn1-1' ){
			    for(var i=0,max=param.length; i<max;i++){				     
				      param[i].actionType = 'S';	    
			    }
	
		   }
		   	else if(action =='C' &&  btnId == 'customBtn1-2'){
			    for(var i=0,max=param.length; i<max;i++){				     
				      param[i].actionType = 'C';	    
			    }
	
		   }
		}
		
	}
	
};

$(document).ready(function(event){	
	momSetup.init();
	momWidget.init(1, menuId, VIEW,'GRID');	
	VIEW.init();
});