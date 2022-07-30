var menuId = 'XUPP3080';
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
		if(index == 0){
			 momWidget.findBtnClicked(1, {workOrderId:e.item['workOrderId']}, true, 'CELLCLICK',menuId,VIEW);
		}
	
	
	},
	procCallInit: function(index,your,action,btnId,param,result) {
		if(index == 1 || btnId == 'customBtn2-1'){
			if(param[0].resultState = 'C'){
				result.msg = '이미 취소된 데이터는 취소할수 없습니다.!';
				result.result = 'FAIL';
				return;
			}
	
		}
	},
/*	searchCallInit: function(index,your,action,btnId,param,result) {
		if(index==0 && btnId== "CELLCLICK"){
			result.param = {itemId:that.paramTmp.authGroupCd};
			
		}

		
	},*/

	
	
};

$(document).ready(function(event){	
	momWidget.init(1, menuId, VIEW);	
	momWidget.init(2, menuId, VIEW);	
	VIEW.init();
});