var menuId = 'XUPP3010';
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
	 editCallInit: function(index,your,action,btnId,param,result) {
		if(index ==0 && btnId =='customBtn1-2'){
			let items = [];	
	          for(let i=0,max=param.length;i<max;i++){
		           if(param[i].state =='R'){
			         items.push(param[i]);
			       }
			  }
			result.param = items;  	
		}
	 

	},
	delCallInit: function(index,your,action,btnId,param,result) {
		if(index == 0 || btnId == 'customBtn1-1'){
			if(param[0].state == 'C'){
				result.msg = '이미 확정 처리된 데이터 입니다.!';
				result.result = 'WARN';
				return;
			}
		    else if(param[0].state == 'R'){
			 param[0]['actionMode'] = 'WA';
			 result.param = param;
		    }
	
		}
	},
	procCallInit: function(index,your,action,btnId,param,result) {
		if(index == 0 || btnId == 'customBtn1-1'){				    
			 param['actionMode'] = 'WA';
			 result.param = param;
		    
	
		}
	},
    cellClickCallInit: function(index,rowIndex,e,) {
		if(index == 0){
			let item = e.item;		
            if(item.state =='C' && (e.dataField=='workCenterCd' ||e.dataField=='confirmQty' ||e.dataField=='priority')){
	             widget.messageBox({type: 'warning', width: '400', height: '145', html: multiLang.transText('MESSAGE','MSG00046')});
	             return 'FAIL';
			}
			
         
		}
		else if (index == 90){
			let item = e.item;	
			AUIGrid.setCellValue(widget.grid[0], rowIndex, "borId", item['borId']);
            AUIGrid.setCellValue(widget.grid[0], rowIndex, "routingId", item['routingId']);
		}
	
	},	
	   cellClickCallBack: function(index,rowIndex,target,e) {
		if(index == 0 && e.dataField != 'workCenterCd'){
			 momWidget.findBtnClicked(1, {borId:e.item['borId']}, true, 'CELLCLICK',menuId,VIEW);
		}
		else if(index == 90){
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