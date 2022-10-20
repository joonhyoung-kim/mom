var menuId = 'XUMM2170';
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
	copyCallInit: function(index,your,action,btnId,param,result) {
		if(index ==0 && btnId =='copyBtn'){	
			 $('#returnNoDP1').val('');
		}
	 

	},
    searchCallInit: function(index,your,action,btnId,param,result,event) { //조회액션 실행 전에 호출되는 함수 
        let checkItem = widget.getCheckedRowItems(widget.grid[0]);
        if(index==1){				
			    result.param = {inoutNo:checkItem[0].returnNo,inoutType:'RD',vendorCd:checkItem[0]['vendorCd'],currencyCd:checkItem[0]['currencyCd']};	
		} 
	    else if(index==20){		
			   result.param = {receiveNo:checkItem[0].receiveNo,inoutType:'RD',vendorCd:checkItem[0]['vendorCd'],currencyCd:checkItem[0]['currencyCd']};	
		}

	

		
	},
    cellClickCallBack: function(index,rowIndex,target,e) {				
		if(index==100 && target=='vendorNm'){
			$('#vendorNmDP1').val(e.item.partnerCd+'('+e.item.partnerNm+')');
            VIEW.partnerCd = e.item.partnerCd;
		}
		else if(index==0){
			widget.findBtnClicked(1, {poNo:e.item['poNo']}, true, 'CELLCLICK',menuId,VIEW);
		}
			
	},
	customCallInit: function(index,your,action,btnId,param,result) {
		if(index == 0 ){
			if(action =='D' || btnId == 'customBtn1-2'){
		
	
		   }
		}
		else if(index == 1){
			var checkItem = widget.getCheckedRowItems(widget.grid[0]);
			if(btnId == 'customGridPopBtn2-1'){ // 커스텀 버튼 실행시 1 삭제(D) 2 TMP삽입(C) 3 프로시저실행(P) actionType 으로 시점 제어가능  		
			if(checkItem.length==0){
				result.msg = '상단에서 반품서 선택필수!';
				result.result = 'WARN';
				return;
			}
	           
						
					   $('#vendorCdSP21').val(checkItem[0]['vendorCd']);
					   $('#currencyCdSP21').val(checkItem[0]['currencyCd']);
					   $('#grDateSD21').val($('#createDateSD1').val());
					   $('#grDateED21').val($('#createDateED1').val());
					   $('#vendorCdSP21').jqxComboBox({disabled: true});
					   $('#currencyCdSP21').jqxComboBox({disabled: true});
					  // $('#vendorCdSP21').css('background','#ededed');
					   //result.param = param;		 
			 
		   }
		   else if(btnId == 'customBtn2-2'){
			 for(var i=0,max=param.length; i<max;i++){
					 param[i]['inoutNo'] = checkItem[0]['departureNo'];
					 
			 }
		   }
		}
		
	}
	
};

$(document).ready(function(event){	
	momSetup.init();
	momWidget.init(1, menuId, VIEW,'GRID');	
	momWidget.init(2, menuId, VIEW,'GRID');	
	momWidget.init(2, 'XUSM8110', VIEW,'DG');
	VIEW.init();
});