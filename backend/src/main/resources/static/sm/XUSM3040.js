var menuId = 'XUSM3040';
var VIEW= {
	initParam		:  undefined,
	columnProperty1	: undefined,
	createdFlag		: undefined,
	init: function() {
	var that = this;		
	},
	
	createCallBack: function(index,your,action,btnId,param,result,data) {
		if(index ==0 && btnId =='createBtn'){	
			//AUIGrid.clearGridData(momWidget.grid[index]);
			var gridItem = [{langCd:'KR',langNm:'한글',msgNm:''},{langCd:'EN',langNm:'영어',msgNm:''}];
		/*	for(var i=0;i<gridItem.length;i++){
				if(gridItem[i]['bomLevel'] == '1'){
					gridItem[i]['parentItemId2'] = '-';
				}
				
			}*/
			AUIGrid.setGridData(momWidget.grid[1], gridItem);
				
		}

	}	
};

$(document).ready(function(event){	
	momWidget.init(1, menuId, VIEW);
	momWidget.init(2, menuId, VIEW);
	VIEW.init();
});