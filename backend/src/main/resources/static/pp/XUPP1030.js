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
	AUIGrid.bind('#grid1', 'cellEditBegin', function(e) {
			if(e.dataField == 'workCenterCd' || e.dataField == 'priority') {
				if(e.item.modifyYn =='N'){
					return false;
				}
				//AUIGrid.setCellValue('#grid1', e.rowIndex, 'dropdownParam', e.item['dropdownDetail'] );
			}
		});
	},
	  cellClickCallBack: function(index,rowIndex,target,e) {
		if(index == 100){
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
	VIEW.init();
});