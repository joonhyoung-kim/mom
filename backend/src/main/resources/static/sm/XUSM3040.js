var menuId = 'XUSM3040';
var widget = momWidget;
var VIEW= {
	initParam		:  undefined,
	columnProperty1	: undefined,
	createdFlag		: undefined,
   
	init: function() {	
	},

	customCallInit: function(index,your,action,btnId,param,result) {
		if(index == 0){
		    let checkedItem = AUIGrid.getCheckedRowItems(widget.grid[index]);
			if(btnId == 'customGridPopBtn1-1'){		
       			if(checkedItem.length>0){
			    //$("#msgType2SP11").jqxComboBox({disabled: true});
		        //$('#msgCd2SP11').attr("readonly",true); 
		        //$('#msgCd2SP11').css('background','#ededed');
		        $('#msgType2SP11').val(checkedItem[index]['item']["msgType"]);
		        $('#msgCd2SP11').val(checkedItem[index]['item']["msgCd"]);
		     
			    }
		     
			}
		}
	    else if(index == 10){				
			if(btnId == 'customBtn11-1'){ // 커스텀 버튼 실행시 1 삭제(D) 2 TMP삽입(C) 3 프로시저실행(P) actionType 으로 시점 제어가능  		
  				let gridItems = AUIGrid.getGridData(widget.grid[index]);
				        for(let i=0;i<gridItems.length;i++){
					         gridItems[i]['msgType']     = $("#msgType2SP11").val();
					         gridItems[i]['msgCd']       = $("#msgCd2SP11").val();		
					         gridItems[i]['useYn']       = 'Y';				         
					         gridItems[i]['description'] = '';	
					    }
			             result.param = gridItems;
		    }
		 
		}
	},
	searchCallInit: function(index,your,action,btnId,param,result) {
		if(index ==0 && btnId =='customGridPopBtn1-1'){	
	        param.groupCd = 'SM0012';
					
		}
		else if(index ==10 && btnId =='customBtn11-1'){	
	        param.groupCd = 'SM0012';
	        param.msgType = $('#msgType2SP11').val();
	        param.msgCd  =  $('#msgCd2SP11').val();
					
		}

	},
	customCallBack: function(index,your,action,btnId,param,result,data) {
	    if(index == 0 && btnId == 'customGridPopBtn1-1'){	
		    let gridItem =[{langCd2:'KR',langNm:'한글'},{langCd2:'EN',langNm:'영어'}];
		    AUIGrid.setGridData(widget.grid[10], gridItem);	
			let checkedItem = AUIGrid.getCheckedRowItems(widget.grid[index]);
			if(checkedItem.length>0){
				AUIGrid.setCellValue(widget.grid[10], 0, "msgNm", checkedItem[index]['item']['msgNmKr']);
		        AUIGrid.setCellValue(widget.grid[10], 1, "msgNm", checkedItem[index]['item']['msgNmEn']);
			}			   		   			
		}
		else if(index == 10 && btnId == 'customBtn11-1'){
		     widget.findBtnClicked(0, {}, true, btnId,menuId,VIEW);
			// widget.modalHide('id','gridPop-customBtn1-1','1');
		}
	}	  
	
};

$(document).ready(function(event){	
	momSetup.init();
	momWidget.init(1, menuId, VIEW);
	momWidget.gridPopup.init(1,11,1,'XUSM8040', VIEW);
	VIEW.init();
});