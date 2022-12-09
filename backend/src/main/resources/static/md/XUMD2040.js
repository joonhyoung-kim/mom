var menuId = 'XUMD2040';
var widget = momWidget;
var that = undefined;
var view= {
	initParam		:  undefined,
	columnProperty1	: undefined,
	createdFlag		: undefined,
	
	init: function() {
		that = this;	
		that.event();		
	},
	event: function(e) {
		$(document).on('change','#unitCategoryDP1', function(e) {		
		     $('#unitDP1').val('');
		     $('#conversionUnitDP1').val('');
		     $('#unitQtyDP1').val('');
		     $('#conversionUnitQtyDP1').val('');

		});
	},
	customCallInit: function(index,your,action,btnId,param,result) {
		if(index == 0){ // 팝업에서 드롭다운 컬럼선택하여 열기직전 호출
		    let checkedItem = AUIGrid.getCheckedRowItems(widget.grid[index]);
			if(btnId == 'unitCategoryDP1'){		
       		   $('#unitCategorySP11').jqxComboBox('clearSelection')
		     
			}
		}
	    else if(index == 10){				
			if(btnId == 'customBtn11-1'){// 팝업에서 커스텀버튼(선택) 눌렀을떄 호출
  			    let checkItem = widget.getCheckedRowItems(widget.grid[index]);
                 if(checkItem.length==0){
				    result.msg = '단위 선택 필수!';
				    result.result = 'WARN';
				    return;
			     }			             
					$('#unitCategory'+'DP1').val(checkItem[0]['unitCategory']);
					$('#unit'+'DP1').val(checkItem[0]['unit']);
					$('#conversionUnit'+'DP1').val(checkItem[0]['conversionUnit']);
					$('#unitQty'+'DP1').val(checkItem[0]['unitQty']);
					$('#conversionUnitQty'+'DP1').val(checkItem[0]['conversionUnitQty']);
					widget.modalHide('#','gridPop-unitCategoryDP1','2');
		    }
		 
		}
	}
	
};

$(document).ready(function(event){	
	momSetup.init();
	momWidget.init(1, menuId, view);
	momWidget.gridPopup.init(1,11,1,'XUSM8030', view);
	view.init();
});