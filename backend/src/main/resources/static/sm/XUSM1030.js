var that   = undefined;
var menuId = 'XUSM1030';
var XUSM1030 = {
	initParam	:  undefined,
	paramTmp	: undefined,
	createdFlag : undefined,
	init: function() {
		that = this;	
		that.event();
	/*	  mom_ajax('R', 'XUSM2020.defaultInfo1', {menuId:$('#menuId').val(),gridId:$('#gridId').val(),programId:$('#programId').val()}, function(result, data) {
			  
		  }, undefined, undefined, this, false,'Y');*/
		
	},
	event: function() {
		var that = this;
		var isExpanded = true;
		$(document).on("click", "#showBigMenuBtn1", function() {
			
			if (!isExpanded) {
				AUIGrid.expandAll(momWidget.grid[0]);
				isExpanded = true;
			} else {
				AUIGrid.collapseAll(momWidget.grid[0]);
				isExpanded = false;
			}
		});
	},
	savePopCallInit: function(index,your,action,btnId,param,result) {
		if(index==1){
			var checkedItem = momWidget.getCheckedRowItems(momWidget.grid[0]);
			if(checkedItem =='FAIL'){
        		result.result = 'FAIL';
        		return;
			}
			for(var i=0,max=param.length; i<max;i++){
				 param[i].authGroupCd = checkedItem[0]['authGroupCd'];
			}	
		result.param = param;
		}
	
	}
};

$(document).ready(function(event){
	momSetup.init();
	momWidget.init(1, menuId, XUSM1030);
	XUSM1030.init();
});