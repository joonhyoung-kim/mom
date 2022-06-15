const menuId = 'XUPP1030';
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
	  cellClickCallBack: function(index,e) {
		if(index == 1){
			var item = e.item;	
			$('#itemId'+'DP1').val(item['itemId']);
			$('#workCenterCd'+'DP1').val(item['workCenterCd']);
           // $('#dropDownGridPop'+(index+1)).remove();
			//momWidget.findBtnClicked(1, {routingId:item.routingId}, true, 'INIT',menuId,XUMD1080,[]);
			 //$('#dropDownGridPop'+(index+1)).remove();
		}
	
	},	

	
	
};

$(document).ready(function(event){	
	momWidget.init(1, menuId, VIEW);	
	momWidget.init(2, menuId, VIEW);	
    momWidget.init(3, menuId, VIEW);	
	VIEW.init();
});