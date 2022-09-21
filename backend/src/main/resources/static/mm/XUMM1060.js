var menuId = 'XUMM1060';
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
        if(index==0 && btnId== "customBtn1-1"){
			AUIGrid.clearGridData(widget.grid[1]);	
			  					
		} 
		else if(index==1 && btnId== "customBtn2-1"){
			let checkItem = widget.getCheckedRowItems(widget.grid[0]);
			result.param = {prNo:checkItem[0].prNo};
			  					
		}

		
	},
    cellClickCallBack: function(index,rowIndex,target,e) {
		if(index == 90 && e.dataField != 'poUserNoNm'){
			var item = e.item;		
            AUIGrid.setCellValue(widget.grid[0], rowIndex, "poUserNo", item['userNo']);
            AUIGrid.setCellValue(widget.grid[0], rowIndex, "poUserNoNm", item['userNo'] +'('+item['userNm']+')');
		}
		
	
	},
	customCallInit: function(index,your,action,btnId,param,result) {
		if(index == 0 ){
			if(action =='D' || btnId == 'customBtn1-2'){
			    for(var i=0,max=param.length; i<max;i++){
					 if(param[i].poUserNo == undefined || param[i].poUserNo == ''){
							result.msg = '발주담당자를 지정하지 않은 데이터가 있습니다!';
							result.result = 'WARN';
							return;
					 }		    
			    }
	
		   }
		}
		
	}
	
};

$(document).ready(function(event){	
	momSetup.init();
	momWidget.init(1, menuId, VIEW);	
	momWidget.init(2, menuId, VIEW);	
	VIEW.init();
});