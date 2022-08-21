var menuId = 'XUPP3060';
var widget = momWidget;
var that = undefined;
var VIEW= {
	initParam		: undefined, 
	  
	init: function() {	
		that = this;	
		that.event();
		$('head').append('<style type="text/css">.blocked-style {background:#ffb6b6 !important;font-weight:bold;color:#484545;}</style>');
		$('head').append('<style type="text/css">.passed-style {background:#a2f1a4; ;font-weight:bold;color:#484545;}</style>');
		//$('head').append('<style type="text/css">.warn-style {background:#ffe68d !important; font-weight:bold;color:#484545;}</style>');
		$('head').append('<style type="text/css">.warn-style {background:#fafafa !important;}</style>');
		
	},
	event: function(e) {
	
	},
	  cellEditCallInit: function(index,rowIndex,e,) {
		if(index == 1){			
            if(e.item.state !='R' ){
	             //widget.messageBox({type: 'warning', width: '400', height: '145', html: multiLang.transText('MESSAGE','MSG00046')});
	             return 'FAIL';
			}
			
         
		}

	},	
	 cellEditCallBack: function(index,rowIndex,e,) {
		if(index == 1){	
			let totalGoodQty = Number(e.item.totalGoodQty);
			let totalDefectQty = Number(e.item.totalDefectQty);
			if(e.rowIndex==0){				
				  if(e.dataField =='goodQty'){
		                if(totalGoodQty <Number(e.value)){
			                widget.messageBox({type: 'warning', width: '400', height: '145', html: '총지시수량보다 클수없습니다! '});
			                return;
						}
						else{
							
						}
				   }
				   else if(e.dataField =='defectQty') {
						
				   }
				   else if(e.dataField =='startDate') {
						
				   }
				   else if(e.dataField =='endDate') {
						
				   }
				   else{
						
				   }
			}
			else{
				  if(e.dataField =='goodQty'){
	             //widget.messageBox({type: 'warning', width: '400', height: '145', html: multiLang.transText('MESSAGE','MSG00046')});
		             return 'FAIL';
				}
				else if(e.dataField =='defectQty') {
					
				}
				else if(e.dataField =='startDate') {
					
				}
				else if(e.dataField =='endDate') {
					
				}
				else{
					
				}
			}		
         
			
         
		}

	},	
	   cellClickCallBack: function(index,rowIndex,target,e) {
		if(index == 0 ){
		
			widget.findBtnClicked(1, {workOrderId:e.item['workOrderId']}, true, 'customBtn2-1',menuId,VIEW);			
		}
	
	
	},
	   searchCallBack: function(index,your,action,btnId,param,result,data) {
		if(index==1){
			// row Styling 함수를 다른 함수로 변경
		/*	AUIGrid.setProp('#grid2', "rowStyleFunction", function(rowIndex, item) {
				if(item.state == "R") {
					return "";
				}
				else if(item.state == "W"){
					return "";
				}
				else{
					return "";
				}
				
			});*/
			        let columnProp = widget.columnProperty[1];
			        
			        for(let i =0;i<columnProp.length;i++){
				      AUIGrid.setColumnPropByDataField(widget.grid[1], columnProp[i]['columnId'], { 		    	
						styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
					     if(item != null){						
						   if(item.state == 'R' && columnProp[i]['columnEditable'] =='Y'){						 
							    return '';
						  }
						   else {							    
							     return 'warn-style';
						  }
					     }
						 
						 
							
						},
					
				   });
			      }
				   
			// 변경된 rowStyleFunction 이 적용되도록 그리드 업데이트
			AUIGrid.update('#grid2');	
		}

	},
    delCallInit: function(index,your,action,btnId,param,result) {
		if(index == 1 || btnId == 'customBtn2-1'){		
		   for(var i=0,max=param.length; i<max;i++){
			if( param[i].state !='R'){
				result.msg = '상태가 진행인 공정만 실적등록 가능합니다!';
				result.result = 'WARN';
				return;
			}				    
	       }
          result.param = param;
	       
		}
	}
		
	
};

$(document).ready(function(event){	
	momWidget.init(1, menuId, VIEW);	
	momWidget.init(2, menuId, VIEW);	
	VIEW.init();
});