var menuId = 'XUMD2020';
var XUMD2020= {
	initParam		:  undefined,
	columnProperty1	: undefined,
	createdFlag		: undefined,
	init: function() {
	var that = this;		
	},
	searchCallBack: function(index,your,action,btnId,param,result,data) {
		if(index ==0 && btnId =='findBtn'){	
			//AUIGrid.clearGridData(momWidget.grid[index]);
			var gridItem = data;
			for(var i=0;i<gridItem.length;i++){
				if(gridItem[i]['bomLevel'] == '1'){
					gridItem[i]['parentItemId2'] = '-';
				}
				
			}
			AUIGrid.setGridData(momWidget.grid[index], gridItem);
	
		}

	}		
};

$(document).ready(function(event){	
	momWidget.init(1, menuId, XUMD2020);
	XUMD2020.init();
});