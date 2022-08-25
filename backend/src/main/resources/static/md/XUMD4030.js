var menuId = 'XUMD4030';
var widget = momWidget;
var VIEW= {
	initParam		: undefined,   
	init: function() {	
	},
	savePopCallInit: function(index,your,action,btnId,param,result) {
	     if(index ==0 && btnId =='saveBtnDP'){		           
					    var items = param
					    var startTime = items[0]['startTime'].split(':');
					    var endTime   = items[0]['endTime'].split(':');
					    var startTimeToSec = Number(startTime[0])*3600 + Number(startTime[1])*60;
					    var endTimeToSec = Number(endTime[0])*3600 + Number(endTime[1])*60;
					    var restTime = (endTimeToSec - startTimeToSec )/60;
			/*	        for(var i=0;i<gridItems.length;i++){
					         gridItems[i]['msgType']     = $("#msgType2").val();
					         gridItems[i]['msgCd']       = $("#msgCd2").val();					         
					        
					    }*/
					    items[0]['restTime'] = restTime;
			             result.param = items;
        
	    }

	}
	
};

$(document).ready(function(event){	
	momWidget.init(1, menuId, VIEW);
	VIEW.init();
});