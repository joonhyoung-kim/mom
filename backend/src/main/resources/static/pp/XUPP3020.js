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
	
	},
	cellClickCallBack: function(index,rowIndex,target,e) {
		var item = e.item;	
		 if(index == 100){
			if(target=='itemId'){
				$('#itemId'+'DP1').val(item['itemId']);
				$('#borId'+'DP1').val(item['borId']);
				$('#routingId'+'DP1').val(item['routingId']);
			}
			else if(target=='workCenterCd'){
				$('#workCenterCd'+'DP1').val(item['workCenterCd']);
				$('#borId'+'DP1').val(item['borId']);
				$('#routingId'+'DP1').val(item['routingId']);
			}
			else{
				
			}
				
			
			
      
           // $('#dropDownGridPop'+(index+1)).remove();
			//momWidget.findBtnClicked(1, {routingId:item.routingId}, true, 'INIT',menuId,XUMD1080,[]);
			 //$('#dropDownGridPop'+(index+1)).remove();
		}
	
	},
		searchCallInit: function(index,your,action,btnId,param,result) {		
		if(index==100 &&  btnId == 'POPUPCLICK'){
			result.param  = {itemId:$('#itemId'+'DP1').val()};
		}
		
	},		

	
	
};

$(document).ready(function(event){	
	momWidget.init(1, menuId, VIEW);	
	VIEW.init();
});