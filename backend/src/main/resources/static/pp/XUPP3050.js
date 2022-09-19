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
	 cellEditCallBack: function(index,rowIndex,columnIndex,dataField,item,e) {
		if(index == 1){	
			      let remainQty = Number(item.remainQty); //잔량
			      let totalDefectQty = Number(item.totalCancelQty);	 //누적불량
				  let totalGoodQty   = Number(item.totalCancelQty);    //누적양품
				  let totalCancelQty = Number(item.totalCancelQty);    //누적취소
				  let sumGootQty = 0; // 등록할양품합
				  let sumDefectQty = 0 ; // 등록할불량합
				  let gridItem = AUIGrid.getGridData(widget.grid[1]);				 
		
				  for(let i=0;i<gridItem.length-1;i++){
					  sumGootQty  +=Number(gridItem[i]['goodQty']);
					  sumDefectQty +=Number(gridItem[i]['defectQty']);
				  }
				 
				
				  if(dataField =='goodQty' || dataField =='defectQty'){
	                  if(remainQty <sumGootQty+sumDefectQty){
							AUIGrid.setCellValue(widget.grid[index], rowIndex,columnIndex, 0);
			                widget.messageBox({type: 'warning', width: '400', height: '145', html: '양품,불량수량의 총합은 잔량보다 클수없습니다! '});
			                return;
					  }
					 
					  
				  }
			
			
				else{
					
				}
				
         
			
         
		}

	},	
	calendarGridSaveCallBack: function(index,rowIndex,columnIndex,dataField,item,nowTime,e){
		 if(index==1){
				if(dataField =='woStartTime') {
					        let checkedItem = widget.getCheckedRowItems(widget.grid[0])[0];
							    woStartDate   = new Date(checkedItem.woStartDate);
		                    let woResultStartDate = new Date(nowTime);
						    if(woResultStartDate<woStartDate){
							    AUIGrid.setCellValue(widget.grid[index], rowIndex,columnIndex, '');
							    momWidget.messageBox({type:'warning', width:'400', height: '145', html: '시작시간은 작업지시 확정일 이후여야 합니다!'});
							    momWidget.splashHide();
						        return;
						    }
			   }
			   else if(dataField =='woEndTime'){
				         let woStartTime = AUIGrid.getCellValue(widget.grid[index],rowIndex, 'woStartTime');
				         if(woStartTime=='' || woStartTime== undefined ){
					            AUIGrid.setCellValue(widget.grid[index], rowIndex,columnIndex, '');
							    momWidget.messageBox({type:'warning', width:'400', height: '145', html: '시작시간 먼저 입력해주세요!'});
							    momWidget.splashHide();
						        return;
				         }
				         else{
								let woStartTime   = new Date(item.woStartTime);
					            let woOpEndDate = new Date(nowTime);
						    if(woOpEndDate<woStartTime){
							    AUIGrid.setCellValue(widget.grid[index], rowIndex,columnIndex, '');
							    momWidget.messageBox({type:'warning', width:'400', height: '145', html: '종료시간은 시작시간 이후여야 합니다!'});
							    momWidget.splashHide();
						        return;
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
	momSetup.init();
	momWidget.init(1, menuId, VIEW);	
	momWidget.init(2, menuId, VIEW);	
	VIEW.init();
});