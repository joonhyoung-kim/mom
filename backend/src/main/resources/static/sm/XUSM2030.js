var that   = undefined;
var menuId = 'XUSM2030';
var XUSM2030 = {
	initParam	:  undefined,
	paramTmp	: undefined,
	createdFlag : undefined,
	init: function() {
		that = this;	
		that.event();
	/*	  mom_ajax('R', 'XUSM2020.defaultInfo1', {menuId:$('#menuId').val(),gridId:$('#gridId').val(),programId:$('#programId').val()}, function(result, data) {
			  
		  }, undefined, undefined, this, false,'Y');*/
	
	},
	event: function() {
		var that = this;
		var isExpanded = true;
		$(document).on("click", "#showBigMenuBtn1", function() {
			
			if (!isExpanded) {
				AUIGrid.expandAll(momWidget.grid[0]);
				isExpanded = true;
			} else {
				AUIGrid.collapseAll(momWidget.grid[0]);
				isExpanded = false;
			}
		});
	},
	cellClickCallBack: function(index,rowIndex,target,e) {
		if(index==0){
			//var param = momWidget.getSelectedItems(momWidget.grid[0]);
			momWidget.findBtnClicked(2, e.item, true, 'CELLCLICK',menuId,XUSM2030);
			momWidget.findBtnClicked(1, e.item, true, 'CELLCLICK',menuId,XUSM2030);
			that.paramTmp = e.item;
		}
	
	},

		saveGridCallInit: function(index,your,action,btnId,param,result){
		if(index == 1 && btnId =='saveBtn'){
			var gridItem =  AUIGrid.getGridData(momWidget.grid[index]);
			for(var i=0,max=gridItem.length;i<max;i++){
					 if(AUIGrid.isCheckedRowById(momWidget.grid[index],gridItem[i]['menuId']) == true){
					gridItem[i]['useYn'] = 'Y';									
				 }
				 else{
					gridItem[i]['useYn'] = 'N';		
				 }
				// gridItem[i].authGroupCd = JSON.parse(sessionStorage.userInfo)[0]['authGroupCd'];
				  gridItem[i].authGroupCd = AUIGrid.getSelectedItems(momWidget.grid[0])[0]['item']['authGroupCd'];
				}
			for(var k=0,max2=gridItem.length;k<max2;k++){			
				 if(AUIGrid.isCheckedRowById(momWidget.grid[index],gridItem[k]['menuId']) == false && gridItem[k]['menuType'] == 'M'){
					for(var j=0,max3=gridItem.length;j<max3;j++){
				    	if(gridItem[j]['parentMenuId']== gridItem[k]['menuId']){
					          gridItem[j]['useYn'] = 'N';	
					}								
				 }
				 
			}
		
		
			result.param = gridItem;
		  }
		}
		
		
	},
	searchCallInit: function(index,your,action,btnId,param,result) {
		if(index==1 && btnId== "saveBtn"){
			result.param = {authGroupCd:that.paramTmp.authGroupCd};
			
		}
	/*	else if(index==1 && btnId== "saveBtn"+(index+1)){
			var checkedItem = momWidget.getCheckedRowItems(momWidget.grid[0]);
			if(checkedItem =='FAIL'){
        		result = 'FAIL';
        		return;
			}		
				 param.authGroupCd = checkedItem[0]['authGroupCd'];
			
			result = 'SUCCESS';
		}*/
		
	},
		searchCallBack: function(index,your,action,btnId,param,result,data) {
		if(index ==1 && (btnId =='CELLCLICK' || btnId == 'saveBtn')){
			/*var gridItem = AUIGrid.getGridData(momWidget.grid[index])
			 for(var i=0,max=gridItem.length; i<max;i++){
			      if(gridItem[i]['useYnFlag'] == 'Y'){
				      
				  }
			  }
			param.menuId = gridItem[0].menuId;*/
			AUIGrid.setCheckedRowsByValue(momWidget.grid[index], "useYn", "Y");
			
		}

},
delCallBack	: function(index,your,action,btnId,param,result) {
		 if(index == 0 && btnId=='delBtn'){
				AUIGrid.clearGridData(momWidget.grid[1]);
		 }
		 
		
	}
};

$(document).ready(function(event){
	momSetup.init();
	momWidget.init(1, menuId, XUSM2030);
	momWidget.init(2, menuId, XUSM2030);
	momWidget.init(3, menuId, XUSM2030);
	XUSM2030.init();
});