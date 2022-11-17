var menuId = 'XUMM2040';
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
	editCallInit: function(index,your,action,btnId,param,result) { // 수정팝업 뜨기전에 호출
		if(index ==0 && btnId =='editBtn'){	
			 let checkedItem = widget.getCheckedRowItems(widget.grid[index]);		
              VIEW.popupParam1.partnerCd = checkedItem[0]['vendorCd'];
		}
		
	 

	},
	copyCallInit: function(index,your,action,btnId,param,result) { // 복사팝업 뜨기전에 호출
		if(index ==0 && btnId =='copyBtn'){	
			 let checkedItem = widget.getCheckedRowItems(widget.grid[index]);		
              VIEW.popupParam1.partnerCd = checkedItem[0]['vendorCd'];
		}
		else if(index ==1 && btnId =='copyBtn'){	
		 VIEW.popupParam2.itemId = $('#itemIdDP2').val();
		}
	   

	},
	savePopCallInit: function(index,your,action,btnId,param,result) { // 팝업저장 직전 호출
	     if(index ==0 && btnId =='saveBtnDP'){		    			
			 param[0].partnerCd =VIEW.popupParam1.partnerCd;
			 result.param =  param;
		    
	     }
	     else if(index ==1 && btnId =='saveBtnDP'){
		     
			 param[0].itemId =VIEW.popupParam2.itemId;
			 result.param =  param;
	     }
	  
	
	  
	},
	createCallInit: function(index,your,action,btnId,param,result) { //등록버튼 팝업띄우기 전에 호출되는 함수 
		if(index ==0 && btnId =='createBtn'){			
		
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
			result.param = {poNo:checkItem[0].poNo};
			  					
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
		if(index == 0 ){
			if(action =='D' || btnId == 'customBtn2-1'){ // 커스텀 버튼 실행시 1 삭제(D) 2 TMP삽입(C) 3 프로시저실행(P) actionType 으로 시점 제어가능  
			   /* for(var i=0,max=param.length; i<max;i++){
					 if(param[i].poUserNo == undefined || param[i].poUserNo == ''){
							result.msg = '발주담당자를 지정하지 않은 데이터가 있습니다!';
							result.result = 'WARN';
							return;
					 }		    
			    }*/
	
		   }
		}
		
	}
	
};

$(document).ready(function(event){	
	momSetup.init();
	momWidget.init(1, menuId, VIEW);	
	momWidget.init(2, menuId, VIEW);	
	//momWidget.gridPopup.init(1,11,1,'XUSM8040', VIEW);
	VIEW.init();
});