var menuId = 'XUMM2150';
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
        if(index==1){
			  let checkItem = widget.getCheckedRowItems(widget.grid[0]);
		      param.receiveNo = checkItem[0].receiveNo;		  					
		} 
	

		
	},
    cellClickCallBack: function(index,rowIndex,target,e) {			
		 if(index==0){
			widget.findBtnClicked(1, {receiveNo:e.item['receiveNo']}, true, 'CELLCLICK',menuId,VIEW);
		}
			
	},
	customCallInit: function(index,your,action,btnId,param,result) {
	    var checkItem = widget.getCheckedRowItems(widget.grid[0]);
		if(index == 1 ){		    
			    if(action='C'&& btnId == 'customBtn2-1'){ 
				    for(var i=0,max=param.length; i<max;i++){
					 param[i]['inoutType'] = checkItem[0]['inoutType'];
					 param[i]['vendorCd'] = checkItem[0]['vendorCd'];
					 param[i]['locationCd'] = checkItem[0]['departureLocationCd'];
					 param[i]['ioType'] = checkItem[0]['ioType'];
					 param[i]['exchangeRate'] = checkItem[0]['exchangeRate'];
					 param[i]['currencyCd'] = checkItem[0]['currencyCd'];
					 
			        }
		        }
		       
		}
		
	},
	customCallBack: function(index,your,action,btnId,param,result,data) {
		if(index == 1 ){
			let checkItem = widget.getCheckedRowItems(widget.grid[0]);
			if(action =='P' || btnId == 'customBtn2-1'){			
		    widget.findBtnClicked(0, {}, true, 'CELLCLICK',menuId,VIEW);
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