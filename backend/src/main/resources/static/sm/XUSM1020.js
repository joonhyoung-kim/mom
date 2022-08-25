var menuId = 'XUSM1020';
var that   = undefined;
var widget = momWidget;
var XUSM1020 = {
	initParam		:  undefined,
	paramTmp	    : undefined,
	
	init: function() {
     that = this;		
	},
	createCallInit:function(index,your,action,btnId,param,result){	
		  if(index ==1 && btnId =='createBtn'){	
            checkedItem = widget.getCheckedRowItems(widget.grid[0]);
            if(checkedItem.length ==0){
	          result.result='FAIL';
	          result.msg='회사코드 선택해주세요!';
	          return;
            }
		    //$("#codeCategoryDP2").val(checkedItem[0]['categoryCd']);
				
		  }

	 

	},
	cellClickCallBack: function(index,rowIndex,target,e) {
		if(index==0){
			//var param = momWidget.getSelectedItems(momWidget.grid[0]);
			that.paramTmp = e.item;
			momWidget.findBtnClicked(1, e.item, true, 'CELLCLICK',menuId,XUSM1020);
		}
	
	},
	searchCallInit: function(index,your,action,btnId,param,result) {		
		if(index==1 &&  btnId != 'CELLCLICK1'){
			param.companyCode  = that.paramTmp.companyCode;
	
		}
		
	},	
	delCallInit: function(index,your,action,btnId,param,result) {		
		if(index==1 &&  btnId != 'CELLCLICK1'){
			for(var i=0;i<param.length;i++){
				param[i].companyCode  = that.paramTmp.companyCode;
			
			}
			
		}
		
	},	
	savePopCallInit: function(index,your,action,btnId,param,result){
	 if(index == 0){
		
	}
	else if(index == 1){	
		    param[0] = that.paramTmp.companyCode;	
			result.param  = param;
				
		}
	
		
	}
};

$(document).ready(function(event){	
	momWidget.init(1, menuId, XUSM1020);
	momWidget.init(2, menuId, XUSM1020);
	//multiLang.transAll();
	XUSM1020.init();
});