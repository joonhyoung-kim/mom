var menuId = 'XUMM2060';
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
        if(index==1){
			
			  					
		} 
	

		
	},
	 searchCallBack: function(index,your,action,btnId,param,result,data) {
		if(index==0){
			AUIGrid.clearGridData(widget.grid[1]);		
		}

    },
	moveRowCallInit: function(index,your,action,btnId,param,result){
		if(index == 0 && btnId == 'moveBtn'){
			   let toItem = AUIGrid.getGridData(widget.grid[1]);	
			   if(toItem.length==0){				
				 return;
			   }		   
			   let fromItem = widget.getCheckedRowItems(widget.grid[0]);
			  		
			   for(var i=0,max=toItem.length; i<max;i++){
				 for(var j=0,max2=fromItem.length; j<max2;j++){
				   if(toItem[i]['purchaseOrderId'] == fromItem[j]['purchaseOrderId']){
				    result.msg = '중복데이터 존재!';
					result.result = 'WARN';
					return;
				   }	
			     }
		       }
	   }
	},
	customCallInit: function(index,your,action,btnId,param,result) {
		if(index == 0 ){
			if(action =='D' || btnId == 'customBtn1-2'){
			   /* for(var i=0,max=param.length; i<max;i++){
					 if(param[i].poUserNo == undefined || param[i].poUserNo == ''){
							result.msg = '발주담당자를 지정하지 않은 데이터가 있습니다!';
							result.result = 'WARN';
							return;
					 }		    
			    }*/
	
		   }
		}
		
	},
	customCallBack: function(index,your,action,btnId,param,result,data) {
		if(index == 1 ){
			if(action =='P' || btnId == 'customBtn2-1'){
		    AUIGrid.clearGridData(widget.grid[1]);			
		    widget.findBtnClicked(1, {poNo:e.item['poNo']}, true, 'CELLCLICK',menuId,VIEW);
		   }
		}
		
	}
	
};

$(document).ready(function(event){	
	momSetup.init();
	momWidget.init(1, menuId, VIEW,'GRID');	
	momWidget.init(2, menuId, VIEW,'GRID');	
	VIEW.init();
});