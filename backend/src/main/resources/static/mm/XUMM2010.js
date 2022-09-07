var menuId = 'XUMM2010';
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
	createCallInit: function(index,your,action,btnId,param,result) { //등록버튼 팝업띄우기 전에 호출되는 함수 
		if(index ==0 && btnId =='createBtn1'){			
			$('#poReferenceTypeDP1').val('10');
	        
					
		}

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
		if(index==100 && target=='vendorCd'){
			$('#vendorCdDP1').val(e.item.partnerCd+'('+e.item.partnerNm+')');
            partnerCd = e.item.partnerCd;
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
	momWidget.init(1, menuId, VIEW);	
	momWidget.init(2, menuId, VIEW);	
	VIEW.init();
});