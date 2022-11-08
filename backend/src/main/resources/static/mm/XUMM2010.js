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
	editCallInit: function(index,your,action,btnId,param,result) {
		if(index ==0 && btnId =='editBtn'){	
			 let checkedItem = widget.getCheckedRowItems(widget.grid[index]);		
              VIEW.partnerCd = checkedItem[0]['vendorCd'];
		}
	 

	},
	copyCallInit: function(index,your,action,btnId,param,result) {
		if(index ==0 && btnId =='copyBtn'){	
			  $('#poNoDP1').val('');
			  let checkedItem = widget.getCheckedRowItems(widget.grid[index]);		
              VIEW.partnerCd = checkedItem[0]['vendorCd'];
		}
	 

	},
	savePopCallInit: function(index,your,action,btnId,param,result) {
	     if(index ==0 && btnId =='saveBtnDP'){		    			
			 param[0].partnerCd =VIEW.partnerCd;
			 result.param =  param;
		    
	     }
	
	  
	},
	createCallInit: function(index,your,action,btnId,param,result) { //등록버튼 팝업띄우기 전에 호출되는 함수 
		if(index ==0 && btnId =='createBtn1'){			
			$('#poReferenceTypeDP1').val('10');
	        
					
		}

	},

    searchCallInit: function(index,your,action,btnId,param,result,event) { //조회액션 실행 전에 호출되는 함수 
        let checkItem = widget.getCheckedRowItems(widget.grid[0]);
        if(index==1){
		param['vendorCd'] = checkItem[0]['vendorCd'];
		param['poNo'] = checkItem[0]['poNo'];  					
		} 
		else if(index ==0){                                            //20221027 LCS 추가 
		  AUIGrid.clearGridData(widget.grid[1]);  	
	    }
		else if (index==20){
			param['vendorCd'] = checkItem[0]['vendorCd'];
		}
	

		
	},
    cellClickCallBack: function(index,rowIndex,target,e) {				
		if(index==100 && target=='vendorNm'){
			$('#vendorNmDP1').val(e.item.partnerCd+'('+e.item.partnerNm+')');
			$('#doInvoiceYnDP1').val(e.item.doInvoiceYn);
            VIEW.partnerCd = e.item.partnerCd;
		}
		else if(index==0){
			widget.findBtnClicked(1, {poNo:e.item['poNo']}, true, 'CELLCLICK',menuId,VIEW);
		}
			
	},
	savePopCallInit: function(index,your,action,btnId,param,result) {
	     if(index ==0 && (btnId =='createBtn' || btnId =='editBtn' || btnId =='copyBtn')){		    			
			 param[0].partnerCd =VIEW.partnerCd;
			 result.param =  param;
		    
	     }
	
	  
	},
		customCallInit: function(index,your,action,btnId,param,result) {
		 let checkItem = widget.getCheckedRowItems(widget.grid[0]);
		   if(index == 0){			    

		    
		
	    }
		else if(index == 1){
			if(btnId == 'customGridPopBtn2-3'){ // 커스텀 버튼 실행시 1 삭제(D) 2 TMP삽입(C) 3 프로시저실행(P) actionType 으로 시점 제어가능  		
			if(checkItem.length==0){
				result.msg = '상단에서 발주서 선택필수!';
				result.result = 'WARN';
				return;
				
				//widget.messageBox({type: 'warning', width: '400', height: '145', html: '상단에서 납품서 선택필수!'});				 
			    //return;
			}
	           
		
			 
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
					 param[i]['poNo'] = checkItem[0]['poNo'];
					
			        }
		}
		
	    }
	}
	
};

$(document).ready(function(event){	
	momSetup.init();
	momWidget.init(1, menuId, VIEW,'GRID');	
	momWidget.init(2, menuId, VIEW,'GRID');	
	momWidget.init(2, 'XUSM8060', VIEW,'DG');
	VIEW.init();
});