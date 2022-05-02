var that   = undefined;
var menuId = 'XUSM2030';
var XUSM2030 = {
	initParam	:  undefined,
	paramTmp	: undefined,
	createdFlag : undefined,
	init: function() {
		that = this;	
		that.event();
	/*	  mom_ajax('R', 'XUSM2020.defaultInfo1', {menuId:$('#menuId').val(),gridId:$('#gridId').val(),programId:$('#programId').val()}, function(result, data) {
			  
		  }, undefined, undefined, this, false,'Y');*/
		momWidget.findBtnClicked(0, {}, true, 'INIT',menuId,XUSM2030,[]);
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
	cellClickCallBack: function(index,e) {
		if(index==0){
			//var param = momWidget.getSelectedItems(momWidget.grid[0]);
			momWidget.findBtnClicked(2, e.item, true, 'CELLCLICK',menuId,XUSM2030);
			momWidget.findBtnClicked(1, e.item, true, 'CELLCLICK',menuId,XUSM2030);
			that.paramTmp = e.item;
		}
	
	},
	saveCallInit: function(index,your,action,btnId,param,result) {
		if(index==1){
			var checkedItem = momWidget.getCheckedRowItems(momWidget.grid[0]);
			if(checkedItem =='FAIL'){
        		result.result = 'FAIL';
        		return;
			}
			for(var i=0,max=param.length; i<max;i++){
				 param[i].authGroupCd = checkedItem[0]['authGroupCd'];
			}	
			
		}
	
	},
	searchCallInit: function(index,your,action,btnId,param,result) {
		if(index==1 && btnId== "saveBtn"+(index+1)){
			param.authGroupCd = that.paramTmp.authGroupCd;
			
		}
	/*	else if(index==1 && btnId== "saveBtn"+(index+1)){
			var checkedItem = momWidget.getCheckedRowItems(momWidget.grid[0]);
			if(checkedItem =='FAIL'){
        		result = 'FAIL';
        		return;
			}		
				 param.authGroupCd = checkedItem[0]['authGroupCd'];
			
			result = 'SUCCESS';
		}*/
		
	}	
};

$(document).ready(function(event){
	momWidget.init(1, menuId, XUSM2030);
	momWidget.init(2, menuId, XUSM2030);
	momWidget.init(3, menuId, XUSM2030);
	XUSM2030.init();
});