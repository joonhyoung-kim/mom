var menuId = 'XUSM3040';
var widget = momWidget;
var VIEW= {
	initParam		:  undefined,
	columnProperty1	: undefined,
	createdFlag		: undefined,
   
	init: function() {	
	},
	
	createCallBack: function(index,your,action,btnId,param,result,data) {
		if(index ==0 && btnId =='customBtn1-1'){	
			$('#msgCd2SP11').attr("readonly",false);
			$('#msgCd2SP11').css('background','#fff');
		    $("#msgType2SP11").jqxComboBox({disabled: false});
		    $("#msgType2SP11").jqxComboBox('selectIndex',0); 
		    $('#msgCd2SP11').val('');
			/*var gridItem = [{langCd2:'KR',langNm:'한글',msgNm:''},{langCd2:'EN',langNm:'영어',msgNm:''}];
			AUIGrid.setGridData(widget.grid[1], gridItem);*/
				
		}
		else if (index ==0 && btnId =='customBtn1-2'){
			   
			    if(AUIGrid.getCheckedRowItems(widget.grid[index]).length==0){
				   $('#'+'gridPop-'+btnId).momModal('hide');
				   momWidget.messageBox({type:'danger', width:'400', height: '145', html: multiLang.transText('MESSAGE','MSG00034')});				   
				   return;
			    }
			    var gridItem = [{langCd2:'KR',langNm:'한글',msgNm:''},{langCd2:'EN',langNm:'영어',msgNm:''}];
		        var checkedItem = AUIGrid.getCheckedRowItems(widget.grid[index])[0]['item'];
		        $("#msgType2SP21").jqxComboBox({disabled: true});
		        $('#msgCd2SP21').attr("readonly",true); 
		        $('#msgCd2SP21').css('background','#ededed');
		        $('#msgType2SP21').val(checkedItem["msgType"]);
		        $('#msgCd2SP21').val(checkedItem["msgCd"]);
		       
		        for(var i=0;i<gridItem.length;i++){
			        if(gridItem[i]['langCd2'] == 'KR'){
				       gridItem[i]['msgNm'] = checkedItem['msgNmKr'];
			        }
			        else if(gridItem[i]['langCd2'] == 'EN'){
				       gridItem[i]['msgNm'] = checkedItem['msgNmEn'];
			        }
		         }
		        AUIGrid.setGridData(widget.grid[20], gridItem); 
				
		}
		else if(index ==0 && btnId =='customBtn1-3'){
		
			  if(AUIGrid.getCheckedRowItems(widget.grid[index]).length==0){
				   $('#'+'gridPop-'+btnId).momModal('hide');
				   momWidget.messageBox({type:'danger', width:'400', height: '145', html: multiLang.transText('MESSAGE','MSG00034')});				   
				   return;
			  }
			var gridItem = [{langCd2:'KR',langNm:'한글',msgNm:''},{langCd2:'EN',langNm:'영어',msgNm:''}];
		    var checkedItem = AUIGrid.getCheckedRowItems(widget.grid[index])[0]['item'];
			$('#msgCd2SP31').attr("readonly",false);
			$('#msgCd2SP31').css('background','#fff');
		    $("#msgType2SP31").jqxComboBox({disabled: false});
		    $('#msgType2SP31').val(checkedItem["msgType"]);
		    $('#msgCd2SP31').val(checkedItem["msgCd"]);
			   for(var i=0;i<gridItem.length;i++){
			        if(gridItem[i]['langCd2'] == 'KR'){
				       gridItem[i]['msgNm'] = checkedItem['msgNmKr'];
			        }
			        else if(gridItem[i]['langCd2'] == 'EN'){
				       gridItem[i]['msgNm'] = checkedItem['msgNmEn'];
			        }
		         }

			AUIGrid.setGridData(widget.grid[30], gridItem);
		}
	 

	},

	saveCallInit: function(index,your,action,btnId,param,result) {
	     if(index ==0 && btnId =='customBtn1-1'){		           
					    var gridItems = AUIGrid.getGridData(widget.grid[10]);
				        for(var i=0;i<gridItems.length;i++){
					         gridItems[i]['msgType']     = $("#msgType2SP11").val();
					         gridItems[i]['msgCd']       = $("#msgCd2SP11").val();					         
					        
					    }
			             result.param = gridItems;
        
	    }

	},
	createCallInit: function(index,your,action,btnId,param,result) {
		if(index ==0 && btnId =='customBtn1-1'){	
	        result.param.groupCd = 'SM0012';
					
		}

	},
	/*searchCallInit: function(index,your,action,btnId,param,result) {
		if(index ==0 && btnId =='customBtn'){	
	        param.groupCd = 'SM0012';
					
		}

	}*//*,	
	delCallInit: function(index,your,action,btnId,param,result) {
		if(index ==0 && btnId =='delBtn'){	
			 result.param['langCd2'] = data[0]['pivotLang']; 

					
		}

	}	*/
	
};

$(document).ready(function(event){	
	momWidget.init(1, menuId, VIEW);
	momWidget.init(11, 'XUSM8040', VIEW);
	momWidget.init(21, 'XUSM8040', VIEW);
	momWidget.init(31, 'XUSM8040', VIEW);
	VIEW.init();
});