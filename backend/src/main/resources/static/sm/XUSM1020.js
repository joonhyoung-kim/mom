var menuId = 'XUSM1020';
var that   = undefined;
var XUSM1020 = {
	initParam		:  undefined,
	paramTmp	    : undefined,
	
	init: function() {
     that = this;		
	},
	cellClickCallBack: function(index,e) {
		if(index==0){
			//var param = momWidget.getSelectedItems(momWidget.grid[0]);
			that.paramTmp = e.item;
			momWidget.findBtnClicked(1, e.item, true, 'CELLCLICK',menuId,XUSM1020,[]);
		}
	
	},
	searchCallInit: function(index,your,action,btnId,param,result) {		
		if(index==1 &&  btnId != 'CELLCLICK1'){
			param.companyCode  = that.paramTmp.companyCode;
			result = 'SUCCESS';
		}
		
	},	
	delCallInit: function(index,your,action,btnId,param,result) {		
		if(index==1 &&  btnId != 'CELLCLICK1'){
			for(var i=0;i<param.length;i++){
				param[i].companyCode  = that.paramTmp.companyCode;
				result = 'SUCCESS';
			}
			
		}
		
	},	
	saveCallInit: function(index,your,action,btnId,param,result){
	 if(index == 0){
		
	}
	else if(index == 1){		
			param[0].companyCode = that.paramTmp.companyCode;
			result = 'SUCCESS';			
		}
	
		
	}
};

$(document).ready(function(event){	
	momWidget.init(1, menuId, XUSM1020);
	momWidget.init(2, menuId, XUSM1020);
	XUSM1020.init();
});