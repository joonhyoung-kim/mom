var menuId = 'XUMM2080';
var widget = momWidget;
var that = undefined;
var VIEW= {
	initParam		: undefined, 
	popupParam1     : {},
	popupParam2     : {},
	init: function() {	
		that = this;	
		that.event();
	},
	event: function(e) {
	
	},
	copyCallInit: function(index,your,action,btnId,param,result) { // 복사팝업 뜨기전에 호출
		if(index ==0 && btnId =='copyBtn'){	
			$('#departureNoDP1').val('');
		}
	
	   

	},

	 createCallBack: function(index,your,action,btnId,param,result,data) {  //등록버튼 팝업띄우고나서 호출되는 함수 
		if(index ==1 && btnId =='createBtn'){
			let checkedItem = widget.getCheckedRowItems(widget.grid[0]);	
			if(checkedItem.length==0){
                widget.messageBox({type: 'warning', width: '400', height: '145', html: '상단에서 데이터 발주번호 선택해주세요! '});
                $('#' +'defaultPop'+(index+1)).modal('hide');
                return;
			}
			
				$('#poNoDP'+(index+1)).val(checkedItem[0]['poNo']);
			
			
		}
	},
    searchCallInit: function(index,your,action,btnId,param,result,event) { //조회액션 실행 전에 호출되는 함수 
        if(index==1){
			let checkItem = widget.getCheckedRowItems(widget.grid[0]);
			result.param = {departureNo:checkItem[0].departureNo};
			  					
		}
		else if(index==0 ){	                                               //20221027 LCS 추가 
		  AUIGrid.clearGridData(widget.grid[1]);
		}
	},
    cellClickCallBack: function(index,rowIndex,target,e) {				
		 if(index==0){
			widget.findBtnClicked(1, {poNo:e.item['poNo']}, true, 'CELLCLICK',menuId,VIEW);
		}
		
			
	},
	customCallInit: function(index,your,action,btnId,param,result) {
			var checkItem = widget.getCheckedRowItems(widget.grid[0]);
		if(index == 1){
			if(btnId == 'customGridPopBtn2-1'){ // 커스텀 버튼 실행시 1 삭제(D) 2 TMP삽입(C) 3 프로시저실행(P) actionType 으로 시점 제어가능  		
			if(checkItem.length==0){
				//$('#' +'gridPop-'+btnId).modal('hide');
				result.msg = '상단에서 납품서 선택필수!';
				result.result = 'WARN';
				return;
				//widget.messageBox({type: 'warning', width: '400', height: '145', html: '상단에서 납품서 선택필수!'});				 
			    //return;
			}
	           
					   param['vendorCd'] = checkItem[0]['vendorCd'];
					   param['departureLocationCd'] = checkItem[0]['departureLocationCd'];
					   param['iqcFlag'] = checkItem[0]['iqcFlag'];
					   param['currencyCd'] = checkItem[0]['currencyCd'];			
					   $('#vendorCdSP21').val(checkItem[0]['vendorCd']);
					   $('#departureLocationCdSP21').val(checkItem[0]['departureLocationCd']);
					   $('#iqcFlagSP21').val(checkItem[0]['iqcFlag']);
					   $('#currencyCdSP21').val(checkItem[0]['currencyCd']);
					   //result.param = param;		 
			 
		   }
		   else if(btnId == 'customBtn2-2'){
			 for(var i=0,max=param.length; i<max;i++){
					 param[i]['inoutNo'] = checkItem[0]['departureNo'];
					 
			 }
		   }
		}
	
	    else if(index == 20){			    
			    if(action='C'&& btnId == 'customBtn21-1'){ 
				    for(var i=0,max=param.length; i<max;i++){
					 param[i]['inoutNo'] = checkItem[0]['departureNo'];
					 
			        }
		}
		
	    }
	}
};

$(document).ready(function(event){	
	momSetup.init();
	momWidget.init(1, menuId, VIEW);	
	momWidget.init(2, menuId, VIEW);	
	momWidget.gridPopup.init(2,21,1,'XUSM8080', VIEW);
	VIEW.init();
});