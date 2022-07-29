var menuId = 'XUPP3080';
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
	   cellClickCallInit: function(index,rowIndex,e,) {
		if(index == 0){
			let item = e.item;		
            if(item.state =='C' && e.dataField=='workCenterCd'){
	             widget.messageBox({type: 'warning', width: '400', height: '145', html: multiLang.transText('MESSAGE','MSG00046')});
	             return 'FAIL';
			}
         
		}
	
	},	
	   cellClickCallBack: function(index,rowIndex,target,e) {
		if(index == 0 && e.dataField != 'workCenterCd'){
			 momWidget.findBtnClicked(1, {borId:e.item['borId']}, true, 'CELLCLICK',menuId,VIEW);
		}
		else if(index == 10){
			var item = e.item;		
            AUIGrid.setCellValue(widget.grid[0], rowIndex, "workCenterCd", item['workCenterCd']);
            AUIGrid.setCellValue(widget.grid[0], rowIndex, "borId", item['borId']);
            AUIGrid.setCellValue(widget.grid[0], rowIndex, "routingId", item['routingId']);
           // $('#dropDownGridPop'+(index+1)).remove();
			//momWidget.findBtnClicked(1, {routingId:item.routingId}, true, 'INIT',menuId,XUMD1080,[]);
			 //$('#dropDownGridPop'+(index+1)).remove();
		}
	
	}	
/*	searchCallInit: function(index,your,action,btnId,param,result) {
		if(index==0 && btnId== "CELLCLICK"){
			result.param = {itemId:that.paramTmp.authGroupCd};
			
		}

		
	},*/

	
	
};

$(document).ready(function(event){	
	momWidget.init(1, menuId, VIEW);	
	momWidget.init(2, menuId, VIEW);	
	VIEW.init();
});