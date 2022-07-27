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
			$('#msgCd2SP2').attr("readonly",false);
			$('#msgCd2SP2').css('background','#fff');
		    $("#msgType2SP2").jqxComboBox({disabled: false});
		    $("#msgType2SP2").jqxComboBox('selectIndex',0); 
		    $('#msgCd2SP2').val('');
			var gridItem = [{langCd2:'KR',langNm:'한글',msgNm:''},{langCd2:'EN',langNm:'영어',msgNm:''}];

			AUIGrid.setGridData(widget.grid[1], gridItem);
				
		}
	 

	},
	copyCallBack: function(index,your,action,btnId,param,result,data) {
		if(index ==0 && btnId =='copyBtn'){	
			var gridItem = [{langCd2:'KR',langNm:'한글',msgNm:''},{langCd2:'EN',langNm:'영어',msgNm:''}];
		    var checkedItem = data[0];
			$('#msgCd2SP2').attr("readonly",false);
			$('#msgCd2SP2').css('background','#fff');
		    $("#msgType2SP2").jqxComboBox({disabled: false});
		    $('#msgType2SP2').val(checkedItem["msgType"]);
		    $('#msgCd2SP2').val(checkedItem["msgCd"]);
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
		        var checkedItem = data[0];
		        $("#msgType2SP2").jqxComboBox({disabled: true});
		        $('#msgCd2SP2').attr("readonly",true); 
		        $('#msgCd2SP2').css('background','#ededed');
		        $('#msgType2SP2').val(checkedItem["msgType"]);
		        $('#msgCd2SP2').val(checkedItem["msgCd"]);
		       
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
					         gridItems[i]['msgType']     = $("#msgType2SP2").val();
					         gridItems[i]['msgCd']       = $("#msgCd2SP2").val();					         
					        
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

	}/*,	
	delCallInit: function(index,your,action,btnId,param,result) {
		if(index ==0 && btnId =='delBtn'){	
			 result.param['langCd2'] = data[0]['pivotLang']; 

					
		}

	}	*/
	
};

$(document).ready(function(event){	
	momWidget.init(1, menuId, VIEW);
	momWidget.init(11, 'XUSM8040', VIEW);
	VIEW.init();
});