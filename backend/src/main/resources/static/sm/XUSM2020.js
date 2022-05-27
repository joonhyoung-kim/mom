
var menuId = 'XUSM2020';
var XUSM2020 = {
	initParam		:  undefined,
	columnProperty1	: undefined,
	createdFlag		: undefined,
	init: function() {
		var that = this;	
		that.event();
		
		//momWidget.findBtnClicked(0, {}, true, 'INIT',menuId,XUSM2020,[]);
	},
	event: function() {
		var that = this;
		var isExpanded = true;
		$(document).on("click", "#showBigMenuBtn1", function() {
			
			if (!isExpanded) {
				AUIGrid.expandAll(momWidget.grid[0]);
				isExpanded = true;
			} else {
				AUIGrid.collapseAll(momWidget.grid[0] );
				isExpanded = false;
			}
		});
	},
	cellClickCallBack: function(index,e) {
		if(index==0){
			var item = e.item;		
			var rowIdField;
			var rowId;

		/*	rowIdField = AUIGrid.getProp(e.pid, "rowIdField"); // rowIdField 얻기
			rowId = item[rowIdField];

			AUIGrid.setCheckedRowsByIds(e.pid, rowId);*/
			momWidget.findBtnClicked(1, {menuId:item.menuId,menuNm:item.menuNm}, true, 'INIT',menuId,XUSM2020);
		}
	
	},

	saveCallInit: function(index,your,action,btnId,param,result){
		if(index == 0 && btnId =='saveBtn'){
			var gridItem =  AUIGrid.getGridData(momWidget.grid[index]);
			for(var i=0,max=gridItem.length;i<max;i++){
				 if(AUIGrid.isCheckedRowById(momWidget.grid[index],gridItem[i]['menuId']) == true){
					gridItem[i]['useYnFlag'] = 'Y';									
				}
				else{
					gridItem[i]['useYnFlag'] = 'N';		
				}
			}
			result.param = gridItem;
		}
		else if(index == 1){
			for(var j=0;j<param.length;j++){
				  param[j].msgType = 'MENU';
				if(param[1].menuNm == undefined || param[1].menuNm ==''){
					param[1].menuNm = param[0].menuNm;
				}
				//param[i].menuId   = AUIGrid.getGridData(momWidget.grid[index])[0]['menuId'];
			}
		}
		
		
	},
	searchCallInit: function(index,your,action,btnId,param,result) {
		if(index ==1 && btnId =='saveBtn2'){	
			var gridItem = AUIGrid.getGridData(momWidget.grid[index])
			if(gridItem =='FAIL'){
				result.result = 'FAIL';
				return;
			}
			param.menuId = gridItem[0].menuId;
					
		}

	}	
};

$(document).ready(function(event){
	momWidget.init(1, menuId, XUSM2020);
	momWidget.init(2, menuId, XUSM2020);
	XUSM2020.init();
});