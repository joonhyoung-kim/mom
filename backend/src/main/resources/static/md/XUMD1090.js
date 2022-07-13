var menuId = 'XUMD1090';
var widget = momWidget;
var that = undefined;
var VIEW= {
	initParam		: undefined, 
	  
	init: function() {	
		that = this;	
		//that.event();
	},
		saveCallInit: function(index,your,action,btnId,param,result) {
			   if(index ==0 && btnId =='saveBtnDP' && action=='C' ){		           
					    var items = AUIGrid.getCheckedRowItems(widget.grid[index]);
		
	
					     //param[0]['borId'] = '1';
			             //result.param = param;
        
	    }
	     else if(index ==0 && btnId =='saveBtnDP' && action=='U' ){		           
					    //var items = AUIGrid.getCheckedRowItems(widget.grid[index]);
		
	
					     //param[0]['borId'] = items[0]['item']['borId'];
			             //result.param = param;
        
	    }
	   

	},
		searchCallBack: function(index,your,action,btnId,param,result,data) {
		/*
		    if(index ==1 && btnId =='saveBtnDP' && action=='CU' ){		           
					    var items = AUIGrid.getCheckedRowItems(widget.grid[index]);
		
		
					     param[0]['borId'] = items[0]['item']['borId'];
			             result.param = param;
        
	    }*/

   },
	cellClickCallBack: function(index,rowIndex,target,e) {
		if(index==0){
			var item = e.item;	
			//var param = momWidget.getSelectedItems(momWidget.grid[0]);
			  setTimeout(function() {
			 mom_ajax('R', 'DD.DD00023', {workCenterCd:item['workCenterCd']}, function(result, data) {
		      if(result != 'SUCCESS') {
		    	  momWidget.splashHide();
			      return;							     
		      }					       
			    for(var i=0;i<widget.columnProperty[1].length;i++){
					   if(widget.columnProperty[1][i]['columnId'] =='workStationCd'){
						 widget.columnDropdown[1][widget.columnProperty[1][i]['columnId']]=data;
					   }
					}
  widget.findBtnClicked(1, {borId:item['borId']}, true, 'CELLCLICK',menuId,VIEW);
	}, undefined, undefined, this, false);	
				
				  
	             
    			   },200);

	}
	},
	
};

$(document).ready(function(event){	
	momWidget.init(1, menuId, VIEW);
	momWidget.init(2, menuId, VIEW);
	
	VIEW.init();
});