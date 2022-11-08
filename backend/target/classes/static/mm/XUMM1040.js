var menuId = 'XUMM1040';
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
        //if(index==0 && btnId== "customBtn1-1"){                      //20221027 LCS 삭제 
	    if(index==0 ){	                                               //20221027 LCS 추가 
			AUIGrid.clearGridData(widget.grid[1]);	
			  					
		} 
		else if(index==1 && btnId== "customBtn2-1"){
			let checkItem = widget.getCheckedRowItems(widget.grid[0]);
			result.param = {prNo:checkItem[0].prNo};
			  					
		}

		
	},
	cellClickCallBack: function(index,rowIndex,target,e) {  //셀클릭 액션 실행 전에 호출되는 함수 
		if(index == 0 ){		
			widget.findBtnClicked(1, {prNo:e.item['prNo']}, true, 'CELLCLICK',menuId,VIEW);			
		}
		

	}
	
};

$(document).ready(function(event){	
	momSetup.init();
	momWidget.init(1, menuId, VIEW);	
	momWidget.init(2, menuId, VIEW);	
	VIEW.init();
});