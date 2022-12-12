const menuId = 'XUPP1030';
var widget = momWidget;
var that = undefined;
var VIEW= {
    initParam		: undefined, 
	  
	init: function() {	
	    that = this;	
		that.event();
	},
	event: function(e) {
	    AUIGrid.bind('#grid1', 'cellEditBegin', function(e) {
	        if(e.dataField == 'workCenterCd' || e.dataField == 'priority') {
		        if(e.item.modifyYn =='N'){
			        return false;
			    }
		    }
		});
	},
	customCallInit: function(index,your,action,btnId,param,result) {
	    if(index == 0){ // 팝업에서 드롭다운 컬럼선택하여 열기직전 호출
	        let checkedItem = AUIGrid.getCheckedRowItems(widget.grid[index]);
	      if(btnId == 'itemIdDP1'){   
	             $('#itemIdSP11').val('');
	      }
	    }
	    else if(index == 10){       
	        if(btnId == 'customBtn11-1'){// 팝업에서 커스텀버튼(선택) 눌렀을떄 호출
	            let checkItem = widget.getCheckedRowItems(widget.grid[index]);
	            $('#itemId'+'DP1').val(checkItem[0]['itemId']);      
	            $('#workCenterCd'+'DP1').val(checkItem[0]['workCenterCd']);
	            widget.modalHide('#','gridPop-itemIdDP1','2');
	        }
	    }
    }	
			
};

$(document).ready(function(event){	
	momSetup.init();
	momWidget.init(1, menuId, VIEW);	
	momWidget.gridPopup.init(1,11,1,'XUSM8010', VIEW); 
	VIEW.init();
});