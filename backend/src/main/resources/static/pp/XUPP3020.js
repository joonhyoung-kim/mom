var menuId = 'XUPP3020';
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
	cellClickCallBack: function(index,rowIndex,target,e) {
		var item = e.item;	
		 if(index == 100){
			if(target=='itemId'){
				$('#itemId'+'DP1').val(item['itemId']);
				$('#borId'+'DP1').val(item['borId']);
				$('#routingId'+'DP1').val(item['routingId']);
				
			}
			else if(target=='workCenterCd'){
				$('#workCenterCd'+'DP1').val(item['workCenterCd']);
				$('#borId'+'DP1').val(item['borId']);
				$('#routingId'+'DP1').val(item['routingId']);
			}
			else{
				
			}
				
			
			
      
           // $('#dropDownGridPop'+(index+1)).remove();
			//momWidget.findBtnClicked(1, {routingId:item.routingId}, true, 'INIT',menuId,XUMD1080,[]);
			 //$('#dropDownGridPop'+(index+1)).remove();
		}
	
	},
		searchCallInit: function(index,your,action,btnId,param,result,event) {		
			if(index==100 &&  btnId == 'POPUPCLICK' ){
				if($('#defaultPop1').attr('btnid')=='editBtn1'){
				/*	if($('#itemId'+'DP1').val() != ''){
						result.param  = {itemId:''};
					}
					else{&& event.currentTarget.id =='itemIdDP1'
						result.param  = {itemId:$('#itemId'+'DP1').val()};
					}*/
						result.msg = '수정할수없습니다.!';
						result.result = 'WARN';
						return;
					 
				}
				else{
					result.param  = {itemId:$('#itemId'+'DP1').val()};
				}
			   
			
		   }
		
	},		
     saveCallInit: function(index,your,action,btnId,param,result) {
	     if(index ==0 && btnId =='saveBtnDP'){		           
			 let checkedItem = widget.getCheckedRowItems(widget.grid[index],true);
			 if(checkedItem.length ==0){
				return;
			 }
			result.param.push({workOrderId:checkedItem[0]['workOrderId']})
        
	    }
	  
	},
	
	
};

$(document).ready(function(event){	
	momWidget.init(1, menuId, VIEW);	
	VIEW.init();
});