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
	cellClickCallBack: function(index,rowIndex,target,e) {
		if(index == 0 ){		
			widget.findBtnClicked(1, {prNo:e.item['prNo']}, true, 'CELLCLICK',menuId,VIEW);			
		}
		

	},
	 createCallBack: function(index,your,action,btnId,param,result,data) {
		if(index ==1 && btnId =='createBtn'){
			let checkItem = widget.getCheckedRowItems(widget.grid[0]);
		    $('#prNoDP2').val(checkItem[0]['prNo']);
			/*var gridItem = [{langCd2:'KR',langNm:'한글',msgNm:''},{langCd2:'EN',langNm:'영어',msgNm:''}];
			AUIGrid.setGridData(widget.grid[1], gridItem);*/
				
		}
	},
	 copyCallBack: function(index,your,action,btnId,param,result,data) {
		if(index ==0 && btnId =='copyBtn'){	
		    $('#prNoDP1').val('');
			/*var gridItem = [{langCd2:'KR',langNm:'한글',msgNm:''},{langCd2:'EN',langNm:'영어',msgNm:''}];
			AUIGrid.setGridData(widget.grid[1], gridItem);*/
				
		}
		else if(index ==1 && btnId =='copyBtn'){	
		    $('#prNoDP2').val('');
			/*var gridItem = [{langCd2:'KR',langNm:'한글',msgNm:''},{langCd2:'EN',langNm:'영어',msgNm:''}];
			AUIGrid.setGridData(widget.grid[1], gridItem);*/
				
		}
	}
};

$(document).ready(function(event){	
	momWidget.init(1, menuId, VIEW);	
	momWidget.init(2, menuId, VIEW);	
	VIEW.init();
});