var menuId = 'XUMM1010';
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
	createCallInit: function(index,your,action,btnId,param,result) { //등록버튼 팝업띄우기 전에 호출되는 함수 
		if(index ==1 && btnId =='createBtn2'){	
			 let checkItem = widget.getCheckedRowItems(widget.grid[0]);
			 if(checkItem.length==0){
					 result.msg = '상단에서 구매요청번호 선택해주세요';
				     result.result = 'WARN';
			         return;
			 }
	        
					
		}

	},
    searchCallInit: function(index,your,action,btnId,param,result,event) { //조회액션 실행 전에 호출되는 함수 
		if(index==1 && (btnId== "excelUpBtn2" || btnId== "createBtn2"|| btnId== "copyBtn"|| btnId== "editBtn2" || btnId== "delBtn2" || btnId== "customBtn2-1")){
			let checkItem = widget.getCheckedRowItems(widget.grid[0]);
			result.param = {prNo:checkItem[0].prNo};
			  					
		}

		
	},
	cellClickCallBack: function(index,rowIndex,target,e) {  //셀클릭 액션 실행 전에 호출되는 함수 
		if(index == 0 ){		
			widget.findBtnClicked(1, {prNo:e.item['prNo']}, true, 'CELLCLICK',menuId,VIEW);			
		}
		

	},
	 createCallBack: function(index,your,action,btnId,param,result,data) {  //등록버튼 팝업띄우고나서 호출되는 함수 
		if(index ==1 && btnId =='createBtn'){
			let checkItem = widget.getCheckedRowItems(widget.grid[0]);
		    $('#prNoDP2').val(checkItem[0]['prNo']);
		
				
		}
	},
	 copyCallBack: function(index,your,action,btnId,param,result,data) {  //복사버튼 누르고 나서 호출되는 함수 
		if(index ==0 && btnId =='copyBtn2'){	
		    $('#prNoDP1').val('');
		
				
		}
		else if(index ==1 && btnId =='copyBtn2'){	
		    $('#prNoDP2').val('');
			
				
		}
	}
};

$(document).ready(function(event){	
	momSetup.init();
	momWidget.init(1, menuId, VIEW);	
	momWidget.init(2, menuId, VIEW);	
	VIEW.init();
});