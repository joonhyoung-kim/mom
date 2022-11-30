var menuId = 'XUMD4030';
var widget = momWidget;
var VIEW= {
	initParam		: undefined,   
	init: function() {	
	},
	savePopCallInit: function(index,your,action,btnId,param,result) {
	    if(index ==0 && (btnId =='createBtn' || btnId =='editBtn'|| btnId =='copyBtn')){		           
		    let items = param
			var startTime = items[0]['startTime'].split(':');
			var endTime   = items[0]['endTime'].split(':');
			var startTimeToSec = Number(startTime[0])*3600 + Number(startTime[1])*60;
			var endTimeToSec = Number(endTime[0])*3600 + Number(endTime[1])*60;
			if(startTimeToSec>endTimeToSec){
			    items[0]['restTime'] = (86400 + (endTimeToSec - startTimeToSec ))/60
			}
			else if(startTimeToSec == endTimeToSec){
			    items[0]['restTime'] = 1440;
			}
			else{
			    items[0]['restTime'] = (endTimeToSec - startTimeToSec )/60;
			}
			result.param = items;
	    }
    }
};

$(document).ready(function(event){	
    momSetup.init();
	momWidget.init(1, menuId, VIEW);
	VIEW.init();
});