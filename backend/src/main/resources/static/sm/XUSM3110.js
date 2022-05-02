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
		$(document).on('select','#shiftCdDP1', function(e) {
			mom_ajax('R', 'XUMD4030.defaultInfo1', {restTimeCd2:$('#restTimeCdDP3').val(),useYn:'Y'}, function(result1, data1) { 
		        if(result1 != 'SUCCESS' || data1.length == 0) {
		    	  momWidget.splashHide();
			      return;							     
		      }			
		     var restTimeNm = data1[0]['restTimeNm'];
		     var startTime =  data1[0]['startTime'];
		     var endTime   =  data1[0]['endTime'];
		     $('#restTimeNmDP3').val(restTimeNm);
		     $('#startTimeDP3').val(startTime);
		     $('#endTimeDP3').val(endTime);
			  	}, undefined, undefined, this, false);
		});
	},
	
};

$(document).ready(function(event){	
	momWidget.init(1, menuId, VIEW);
	VIEW.init();
});