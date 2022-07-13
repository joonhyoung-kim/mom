var that   = undefined;
var menuId = 'XUSM3020';
var widget = momWidget;
var VIEW= {
	initParam	:  undefined,
	paramTmp	: undefined,
	createdFlag : undefined,
	init: function() {
		that = this;	
		that.event();
	
	},
	event: function() {
		 that = this;
	},
	cellClickCallBack: function(index,rowIndex,target,e) {
		if(index==0){
			//var param = momWidget.getSelectedItems(momWidget.grid[0]);
			momWidget.findBtnClicked(1, e.item, true, 'CELLCLICK',menuId,VIEW);
			that.paramTmp = e.item;
		}
		else if(index==1){
			//var param = momWidget.getSelectedItems(momWidget.grid[0]);
			momWidget.findBtnClicked(2, e.item, true, 'CELLCLICK',menuId,VIEW);
			that.paramTmp = e.item;
		}
		else if(index==2){
			//var param = momWidget.getSelectedItems(momWidget.grid[0]);
			momWidget.findBtnClicked(3, e.item, true, 'CELLCLICK',menuId,VIEW);
			that.paramTmp = e.item;
		}
	
	},
/*	saveCallInit: function(index,your,action,btnId,param,result) {
		if(index==1){
			var checkedItem = momWidget.getCheckedRowItems(momWidget.grid[0]);
			if(checkedItem =='FAIL'){
        		result = 'FAIL';
        		return;
			}
			for(var i=0,max=param.length; i<max;i++){
				 param[i].authGroupCd = checkedItem[0]['authGroupCd'];
			}	
			result = 'SUCCESS';
		}
	
	},*/
	/*	if(index==1 && btnId!= "CELLCLICK"+index){
	 * 		if($('#groupCdNm').val())
			param[0] = that.paramTmp;
			result = 'SUCCESS';
		}*/
	createCallBack: function(index,your,action,btnId,param,result,data) {
		if(index ==1 && btnId =='createBtn'){	
            checkedItem = widget.getCheckedRowItems(widget.grid[0]);
            if(checkedItem.length ==0){
	          $(defaultPop2).momModal('hide');
            }
		    $("#codeCategoryDP2").val(checkedItem[0]['categoryCd']);
				
		}
		else if(index ==2 && btnId =='createBtn'){	
            checkedItem = widget.getCheckedRowItems(widget.grid[1]);
            if(checkedItem.length ==0){
	          $(defaultPop3).momModal('hide');
            }
		    $("#groupCdDP3").val(checkedItem[0]['groupCd']);
				
		}
	 

	},
	searchCallInit: function(index,your,action,btnId,param,result) {
		if(index == 1 && btnId =='findBtn'){	
			var checkedItem = momWidget.getCheckedRowItems(momWidget.grid[0]);
			if(checkedItem.length ==0){
				result.result = 'FAIL';
				return;
			}
			result.param = {categoryCd:checkedItem[0].categoryCd};
					
		}
		else if(index == 2 && btnId =='findBtn'){	
			var checkedItem = momWidget.getCheckedRowItems(momWidget.grid[1]);
			var item = param;
			if(checkedItem.length ==0){
				result.result = 'FAIL';
				return;
			}
			 item.groupCd = checkedItem[0].groupCd;
			 result.param = item;
					
		}
		else if(index == 3 && btnId =='saveBtn'){	
			checkedItem = widget.getCheckedRowItems(widget.grid[2]);
            if(checkedItem.length == 0){
	        result.result = 'FAIL';
	        return;
            }		
					         param['msgType']     = 'CODE';		
					         param['code']        = checkedItem[0]['code'];
					         param['langGroupCd'] = checkedItem[0]['groupCd'] +'_'+  checkedItem[0]['code'];			         					        			
			  result.param = param;
					
		}

	},	
	saveCallInit: function(index,your,action,btnId,param,result) {
	     if(index ==3 && btnId =='saveBtn'){		           
			checkedItem = widget.getCheckedRowItems(widget.grid[2]);
            if(checkedItem.length == 0){
	        result.result = 'FAIL';
	        return;
            }
			for(var i=0;i<param.length;i++){
					         param[i]['msgType']   = 'CODE';		
					         param[i]['code']     = checkedItem[0]['groupCd'] +'_'+  param[i]['code'];			         
					        
			}
			  result.param = param;
        
	    }

	},
};

$(document).ready(function(event){
	momWidget.init(1, menuId, VIEW);
	momWidget.init(2, menuId, VIEW);
	momWidget.init(3, menuId, VIEW);
	momWidget.init(4, menuId, VIEW);
	VIEW.init();
});