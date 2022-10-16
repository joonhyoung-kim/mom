var menuId = 'XUMM2110_1';
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
	     if(index ==1 && btnId=='editBtn'){
		   let checkItem = widget.getCheckedRowItems(widget.grid[1]);
		   result.param = [{purchaseInoutId:checkItem[0]['purchaseInoutId']}];
		   
	     }
	    
	  
	},
	createCallInit: function(index,your,action,btnId,param,result) { //등록버튼 팝업띄우기 전에 호출되는 함수 
			if(index ==1 && btnId =='createBtn'){					     
			let checkItem = widget.getCheckedRowItems(widget.grid[0]);
			if(checkItem.length==0){
				result.msg = '상단에서 입고서 선택필수!';
				result.result = 'WARN';
				return;
			
			}
			$('#receiveNoDP2').val(checkItem[0].receiveNo);   
		}

	},
    searchCallInit: function(index,your,action,btnId,param,result,event) { //조회액션 실행 전에 호출되는 함수 
        if(index==1){
	        let checkItem = widget.getCheckedRowItems(widget.grid[0]);
			param.receiveNo = checkItem[0].receiveNo;
			  					
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
	VIEW.init();
});