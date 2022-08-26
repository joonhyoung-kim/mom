var menuId = 'XUPP3100';
var widget = momWidget;
var that = undefined;
var VIEW= {
	initParam		: undefined, 
	  
	init: function() {	
		that = this;	
		that.event();
	},
	event: function(e) {
	
	},
	 customCallInit: function(index,your,action,btnId,param,result) {
		if(index==0){
		    if( action=='D' && btnId == 'customBtn1-1'){
				     for(var i=0,max=param.length; i<max;i++){
						if(param[i].cancelItemInoutId != undefined && param[i].cancelItemInoutId != ''){
							result.msg = '이미 차감 취소된 데이터가 포함되어있습니다!';
							result.result = 'WARN';
							return;
						}		    
			         }
		    }				
		}
		
	}
	
	
};

$(document).ready(function(event){	
	momWidget.init(1, menuId, VIEW);		
	VIEW.init();
});