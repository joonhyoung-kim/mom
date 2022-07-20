var menuId = 'XUMD2040';
var widget = momWidget;
var that = undefined;
var view= {
	initParam		:  undefined,
	columnProperty1	: undefined,
	createdFlag		: undefined,
	
	init: function() {
		that = this;	
		that.event();		
	},
	event: function(e) {
		$(document).on('change','#unitCategoryDP1', function(e) {
		
		     $('#unitDP1').val('');
		     $('#conversionUnitDP1').val('');
		     $('#unitQtyDP1').val('');
		     $('#conversionUnitQtyDP1').val('');

		});
	},
     cellClickCallBack: function(index,rowIndex,target,e) {
		if(index == 10){
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