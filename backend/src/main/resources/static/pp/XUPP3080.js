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
			 widget.findBtnClicked(1, {workOrderId:e.item['workOrderId']}, true, 'CELLCLICK',menuId,VIEW);
		}
	
	
	},
	customCallInit: function(index,your,action,btnId,param,result) {
		if(index == 1){
			if( action =='D' && btnId == 'customBtn2-1'){
				for(let i=0,max=param.length; i<max;i++){
					if(param[i].resultState == 'C'){
					result.msg = '이미 취소된 데이터는 취소할수 없습니다.!';
					result.result = 'WARN';
					return;
				    }
			    }
			}
			
				
		}
	},
	searchCallInit: function(index,your,action,btnId,param,result,event) {
		if(index==1 && btnId== "customBtn2-1"){
			let checkItem = widget.getCheckedRowItems(widget.grid[0]);
			result.param = {workOrderId:checkItem[0].workOrderId};
			  					
		}

		
	},
    searchCallBack: function(index,your,action,btnId,param,result,data) {
		if(index==1 && btnId== "customBtn2-1"){
			let checkItem = widget.getCheckedRowItems(widget.grid[0]);
			widget.findBtnClicked(0, {workOrderId:checkItem[0].workOrderId}, true, 'customBtn2-1',menuId,VIEW);			
		}

},
	
	
};

$(document).ready(function(event){	
	momWidget.init(1, menuId, VIEW);	
	momWidget.init(2, menuId, VIEW);	
	VIEW.init();
});