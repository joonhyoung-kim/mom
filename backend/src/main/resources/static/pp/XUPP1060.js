var menuId = 'XUPP1060';
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
	searchCallInit: function(index,your,action,btnId,param,result,event) { //조회액션 실행 전에 호출되는 함수 
		if(index ==0) {                                           
		  AUIGrid.clearGridData(widget.grid[1]);  	
	    }
	},
	cellClickCallBack: function(index,rowIndex,target,e) {
	    if(index==0){
		    var item = e.item;	
			setTimeout(function() {
	            momWidget.findBtnClicked(1, {itemId:item['itemId'],planType:item['planType']}, true, 'CELLCLICK',menuId,VIEW);
    		},200);
	    }
	},
};

$(document).ready(function(event){	
	momSetup.init();
	momWidget.init(1, menuId, VIEW);	
	momWidget.init(2, menuId, VIEW);	
	VIEW.init();
});