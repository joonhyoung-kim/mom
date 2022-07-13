
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
	cellClickCallBack: function(index,rowIndex,target,e) {
		if(index==0){
			var item = e.item;		
			var rowIdField;
			var rowId;


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
			for(var k=0,max2=gridItem.length;k<max2;k++){			
				 if(AUIGrid.isCheckedRowById(momWidget.grid[index],gridItem[k]['menuId']) == false && gridItem[k]['menuType'] == 'M'){
					for(var j=0,max3=gridItem.length;j<max3;j++){
				    	if(gridItem[j]['parentMenuId']== gridItem[k]['menuId']){
					          gridItem[j]['useYnFlag'] = 'N';	
					}								
				 }
				 
			}
		    gridItem[k]['sortNo'] = 10*(k+1);	
		
			
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

	},
	searchCallBack: function(index,your,action,btnId,param,result,data) {
		if(index ==0 && (btnId =='INIT' || btnId == 'saveBtn')){
			/*var gridItem = AUIGrid.getGridData(momWidget.grid[index])
			 for(var i=0,max=gridItem.length; i<max;i++){
			      if(gridItem[i]['useYnFlag'] == 'Y'){
				      
				  }
			  }
			param.menuId = gridItem[0].menuId;*/
			AUIGrid.setCheckedRowsByValue(momWidget.grid[index], "useYnFlag", "Y");
			
		}

}
}
$(document).ready(function(event){
	momWidget.init(1, menuId, XUSM2020);
	momWidget.init(2, menuId, XUSM2020);
	XUSM2020.init();
});