var menuId = 'XUPP3050';
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
	addRowCallInit: function(index,your,action,btnId,param,result){
		if(index == 0 && btnId == 'addBtn'){
			   if(widget.getCheckedRowItems(widget.grid[0]).length == 0){
					     targetItem = {};
					     result.msg = 'MSG00054';
					     result.result = 'WARN';
			   }			
			   else{
						   result.param = {targetIndex:0,addIndex:1};
			   }
			          
		
		}
	},
	
	addRowCallBack: function(index,your,action,btnId,param,result,data){
		if(index == 0 && btnId == 'addBtn'){
			AUIGrid.setCellValue(widget.grid[1], 0, 'woStartTime', '');
			AUIGrid.setCellValue(widget.grid[1], 0, 'woEndTime', '');
		}
	},
	   cellClickCallBack: function(index,rowIndex,target,e) {
		if(index == 0 ){
			AUIGrid.clearGridData(widget.grid[1]);
		}
	
	
	},
	 cellEditCallBack: function(index,rowIndex,e,) {
		if(index == 0){	
			      let remainQty = Number(e.item.remainQty);
			      let totalDefectQty = Number(e.item.totalDefectQty);
			
				  let prevGoodQty   = Number(AUIGrid.getCellValue(widget.grid[index],rowIndex-1, 'goodQty'));
				  let gridItem = AUIGrid.getGridData(widget.grid[index]);
				  let prevDefectQty = 0; 
				  let woQty = Number(AUIGrid.getCellValue(widget.grid[index],rowIndex, 'remainQty'));
				  for(let i=0;i<gridItem.length-1;i++){
					  prevDefectQty +=Number(gridItem[i]['defectQty']);
				  }
				 
				  let prevRemainQty = woQty-prevDefectQty;
				  if(e.dataField =='goodQty'){
	                  if(prevRemainQty <Number(e.value)+prevDefectQty){
			                widget.messageBox({type: 'warning', width: '400', height: '145', html: '양품,불량수량의 합은 공정잔량보다 클수없습니다! '});
			                return;
					  }
					   if(prevGoodQty <Number(e.value)){
			                widget.messageBox({type: 'warning', width: '400', height: '145', html: '이전공정 양품수량보다 클수없습니다! '});
			                return;
					  }
					  
				  }
				  else if(e.dataField =='defectQty') {					 
					   if(prevRemainQty <Number(e.value)+prevGoodQty){
			                widget.messageBox({type: 'warning', width: '400', height: '145', html: '양품,불량수량의 합은 공정잔량보다 클수없습니다! '});
			                return;
					  }
				 }
			
				else{
					
				}
				
         
			
         
		}

	},	
	calendarGridSaveCallBack: function(index,rowIndex,columnIndex,dataField,item,nowTime,e){
		 if(index==1){
			if(rowIndex==0){
				  if(dataField =='startDate') {
							let woStartDate   = new Date(item.woStartDate);
		                    let woOpStartDate = new Date(nowTime);
						    if(woOpStartDate<woStartDate){
							    AUIGrid.setCellValue(widget.grid[index], rowIndex,columnIndex, '');
							    momWidget.messageBox({type:'warning', width:'400', height: '145', html: '공정 시작시간은 작업지시 확정일 이후여야 합니다!'});
							    momWidget.splashHide();
						        return;
						    }
			   }
			   else if (dataField =='endDate'){
				         let woOpStartDate = AUIGrid.getCellValue(widget.grid[index],rowIndex, 'startDate');
				         if(woOpStartDate=='' || woOpStartDate== undefined ){
					            AUIGrid.setCellValue(widget.grid[index], rowIndex,columnIndex, '');
							    momWidget.messageBox({type:'warning', width:'400', height: '145', html: '공정 시작시간 먼저 입력해주세요!'});
							    momWidget.splashHide();
						        return;
				         }
				         else{
								let woStartDate   = new Date(item.startDate);
					            let woOpEndDate = new Date(nowTime);
						    if(woOpEndDate<woStartDate){
							    AUIGrid.setCellValue(widget.grid[index], rowIndex,columnIndex, '');
							    momWidget.messageBox({type:'warning', width:'400', height: '145', html: '공정 완료시간은 공정 시작시간 이후여야 합니다!'});
							    momWidget.splashHide();
						        return;
						    }
				         }
					        
			   }
			}
			else{
				  if(dataField =='startDate') {
							let prevEndDate   = new Date(AUIGrid.getCellValue(widget.grid[index],rowIndex-1, 'endDate'));
		                    let woOpStartDate = new Date(nowTime);
						    if(woOpStartDate<prevEndDate){
							    AUIGrid.setCellValue(widget.grid[index], rowIndex,columnIndex, '');
							    momWidget.messageBox({type:'warning', width:'400', height: '145', html: '공정 시작시간은 이전 공정 완료시간 이후여야 합니다!'});
							    momWidget.splashHide();
						        return;
						    }
			   }
			   else if (dataField =='endDate'){
				         let woOpStartDate = AUIGrid.getCellValue(widget.grid[index],rowIndex, 'startDate');
				         if(woOpStartDate=='' || woOpStartDate== undefined ){
					            AUIGrid.setCellValue(widget.grid[index], rowIndex,columnIndex, '');
							    momWidget.messageBox({type:'warning', width:'400', height: '145', html: '공정 시작시간 먼저 입력해주세요!'});
							    momWidget.splashHide();
						        return;
				         }
				         else{
								let woStartDate   = new Date(item.startDate);
					            let woOpEndDate = new Date(nowTime);
						    if(woOpEndDate<woStartDate){
							    AUIGrid.setCellValue(widget.grid[index], rowIndex,columnIndex, '');
							    momWidget.messageBox({type:'warning', width:'400', height: '145', html: '공정 완료시간은 공정 시작시간 이후여야 합니다!'});
							    momWidget.splashHide();
						        return;
						    }
				         }
					        
			   }
			}
			 
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