var that   = undefined;
var menuId = 'XUSM1040';
var XUSM1040 = {
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
	/*	$(".modal-content-change-pop").on("shown.bs.modal", function () {
			 $("#changePassword1").focus(); 
	    });*/


	},
	savePopCallInit: function(index,your,action,btnId,param,result) {
		if(index==0){		
			for(var i=0,max=param.length; i<max;i++){
				 param[i].pwEncode = 'Y';
			}	
		
		}
	
	}
};

$(document).ready(function(event){
	momWidget.init(1, menuId, XUSM1040);
	XUSM1040.init();
});