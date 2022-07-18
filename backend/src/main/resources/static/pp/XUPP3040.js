var menuId = 'XUPP3040';
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
		var item = e.item;	
		 if(index == 0){
		     widget.findBtnClicked(1, {workOrderId:item.workOrderId}, true, 'INIT',menuId,VIEW,undefined);
		}
	
	},
	addRowCallBack(index,your,action,btnId,param,result,data){
		if(index==1){
			// row Styling 함수를 다른 함수로 변경
			let columnProp = widget.columnProperty[index];
			//let colStyle = "aui-grid-default-column-left";
			let colStyle = "";
			let columnCreate = [];
			let columnEditable = [];
			 colStyle = 'aui-grid-edit-column-left2';
			for(let i=0;i<columnProp.length;i++){
				if(columnProp[i]['columnCreate']=='Y'&&columnProp[i]['columnEditable']=='N'){					
					 columnCreate.push(columnProp[i]['columnId']);
				}
				else if(columnProp[i]['columnCreate']=='N'&&columnProp[i]['columnEditable']=='Y'){
					columnEditable.push(columnProp[i]['columnId']);
				}
				else{
					
				}
				
				  AUIGrid.setColumnPropByDataField(widget.grid[index], columnProp[i]['columnId'], { 		    	
						styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
						  if(item.keyId != undefined && item.keyId != ''){
							
						  }
						  else if(item.keyId == undefined  ){
							
						  }
							return 'aui-grid-edit-column-left';
						}
				 });
			
			}
			
		
		}
	}

	
	
};

$(document).ready(function(event){	
	momWidget.init(1, menuId, VIEW);	
	momWidget.init(2, menuId, VIEW);	
	VIEW.init();
});