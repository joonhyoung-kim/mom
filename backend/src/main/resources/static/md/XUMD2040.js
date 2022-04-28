var menuId = 'XUMD2040';
var view= {
	initParam		:  undefined,
	columnProperty1	: undefined,
	createdFlag		: undefined,
	init: function() {
	var that = this;		
	},
     cellClickCallBack: function(index,e) {
		if(index == 1){
			var item = e.item;	
			$('#unitCategory'+'DP1').val(item['unitCategory']);
			$('#unit'+'DP1').val(item['unit']);
			$('#conversionUnit'+'DP1').val(item['conversionUnit']);
			$('#unitQty'+'DP1').val(item['unitQty']);
			$('#conversionUnitQty'+'DP1').val(item['conversionUnitQty']);
            $('#dropDownGridPop'+(index+1)).remove();
			//momWidget.findBtnClicked(1, {routingId:item.routingId}, true, 'INIT',menuId,XUMD1080,[]);
			 //$('#dropDownGridPop'+(index+1)).remove();
		}
	
	},	
};

$(document).ready(function(event){	
	momWidget.init(1, menuId, view);
	view.init();
});