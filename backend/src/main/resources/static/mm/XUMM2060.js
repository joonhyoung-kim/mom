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
	editCallInit: function(index,your,action,btnId,param,result) {
		if(index ==0 && btnId =='editBtn'){	
			 let checkedItem = widget.getCheckedRowItems(widget.grid[index]);		
              VIEW.partnerCd = checkedItem[0]['vendorCd'];
		}
	 

	},
	copyCallInit: function(index,your,action,btnId,param,result) {
		if(index ==0 && btnId =='copyBtn'){	
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
        if(index==1){
			
			  					
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
	momWidget.init(1, menuId, VIEW,'GRID');	
	momWidget.init(2, menuId, VIEW,'GRID');	
	momWidget.init(11, 'XUSM8060', VIEW,'DG');
	VIEW.init();
});