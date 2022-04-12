var menuId = 'XUSM3040';
var widget = momWidget;
var VIEW= {
	initParam		:  undefined,
	columnProperty1	: undefined,
	createdFlag		: undefined,
   
	init: function() {	
	},
	
	createCallBack: function(index,your,action,btnId,param,result,data) {
		if(index ==0 && btnId =='createBtn'){	
			$('#msgCd2').attr("readonly",false);
			$('#msgCd2').css('background','#fff');
		    $("#msgType2").jqxComboBox({disabled: false});
		    $("#msgType2").jqxComboBox('selectIndex',0); 
		    $('#msgCd2').val('');
			var gridItem = [{langCd2:'KR',langNm:'한글',msgNm:''},{langCd2:'EN',langNm:'영어',msgNm:''}];

			AUIGrid.setGridData(widget.grid[1], gridItem);
				
		}
	 

	},
	copyCallBack: function(index,your,action,btnId,param,result,data) {
		if(index ==0 && btnId =='copyBtn'){	
			var gridItem = [{langCd2:'KR',langNm:'한글',msgNm:''},{langCd2:'EN',langNm:'영어',msgNm:''}];
		    var checkedItem = param[0];
			$('#msgCd2').attr("readonly",false);
			$('#msgCd2').css('background','#fff');
		    $("#msgType2").jqxComboBox({disabled: false});
		    $('#msgType2').val(checkedItem["msgType"]);
		    $('#msgCd2').val(checkedItem["msgCd"]);
			   for(var i=0;i<gridItem.length;i++){
			        if(gridItem[i]['langCd2'] == 'KR'){
				       gridItem[i]['msgNm'] = checkedItem['msgNmKr'];
			        }
			        else if(gridItem[i]['langCd2'] == 'EN'){
				       gridItem[i]['msgNm'] = checkedItem['msgNmEn'];
			        }
		         }

			AUIGrid.setGridData(widget.grid[1], gridItem);
				
		}
	 

	},
	editCallBack: function(index,your,action,btnId,param,result,data) {
	     if(index ==0 && btnId =='editBtn'){
		        var gridItem = [{langCd2:'KR',langNm:'한글',msgNm:''},{langCd2:'EN',langNm:'영어',msgNm:''}];
		        var checkedItem = param[0];
		        $("#msgType2").jqxComboBox({disabled: true});
		        $('#msgCd2').attr("readonly",true); 
		        $('#msgCd2').css('background','#ededed');
		        $('#msgType2').val(checkedItem["msgType"]);
		        $('#msgCd2').val(checkedItem["msgCd"]);
		       
		        for(var i=0;i<gridItem.length;i++){
			        if(gridItem[i]['langCd2'] == 'KR'){
				       gridItem[i]['msgNm'] = checkedItem['msgNmKr'];
			        }
			        else if(gridItem[i]['langCd2'] == 'EN'){
				       gridItem[i]['msgNm'] = checkedItem['msgNmEn'];
			        }
		         }
		        AUIGrid.setGridData(widget.grid[1], gridItem); 
		        
	    }

	},
	saveCallInit: function(index,your,action,btnId,param,result) {
	     if(index ==0 && btnId =='saveBtnDP'){		           
					    var gridItems = AUIGrid.getGridData(widget.grid[1]);
				        for(var i=0;i<gridItems.length;i++){
					         gridItems[i]['msgType']     = $("#msgType2").val();
					         gridItems[i]['msgCd']       = $("#msgCd2").val();					         
					        
					    }
			             result.param = gridItems;
        
	    }

	},
	searchCallInit: function(index,your,action,btnId,param,result) {
		if(index ==0 && btnId =='INIT'){	
			mom_ajax('R', 'XUSM3040.pivotLang', {groupCd:'SM0012'}, function(result2, data) {				
	         result.param['pivotLang'] = data[0]['pivotLang']; 
				
		    }, undefined, undefined, this, false);

					
		}

	}		
};

$(document).ready(function(event){	
	momWidget.init(1, menuId, VIEW);
	momWidget.init(2, menuId, VIEW);
	VIEW.init();
});