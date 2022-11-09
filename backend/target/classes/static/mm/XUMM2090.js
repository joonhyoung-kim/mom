var menuId = 'XUMM2090';
var widget = momWidget;
var that = undefined;
var VIEW= {
	initParam		: undefined, 
	partnerCd       : undefined,
	init: function() {	
		that = this;	
		that.event();
	},
	event: function(e) {
	
	},
    searchCallInit: function(index,your,action,btnId,param,result,event) { //조회액션 실행 전에 호출되는 함수 
        if(index==0 ){	                                               //20221027 LCS 추가 
		    AUIGrid.clearGridData(widget.grid[1]);
		} 		
	},
    cellClickCallBack: function(index,rowIndex,target,e) {				
	    if(index==0){
		    widget.findBtnClicked(1, {departureNo:e.item['departureNo']}, true, 'CELLCLICK',menuId,VIEW);
		}
	},
};

$(document).ready(function(event){	
	momSetup.init();
	momWidget.init(1, menuId, VIEW,'GRID');	
	momWidget.init(2, menuId, VIEW,'GRID');	
	VIEW.init();
});