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
		
			/*	        for(var i=0;i<gridItems.length;i++){
					         gridItems[i]['msgType']     = $("#msgType2").val();
					         gridItems[i]['msgCd']       = $("#msgCd2").val();					         
					        
					    }*/
					     param[0]['borId'] = '1';
			             result.param = param;
        
	    }
	     else if(index ==0 && btnId =='saveBtnDP' && action=='U' ){		           
					    var items = AUIGrid.getCheckedRowItems(widget.grid[index]);
		
			/*	        for(var i=0;i<gridItems.length;i++){
					         gridItems[i]['msgType']     = $("#msgType2").val();
					         gridItems[i]['msgCd']       = $("#msgCd2").val();					         
					        
					    }*/
					     param[0]['borId'] = items[0]['item']['borId'];
			             result.param = param;
        
	    }

	},
	cellClickCallBack: function(index,e) {
		if(index==0){
			var item = e.item;	
			//var param = momWidget.getSelectedItems(momWidget.grid[0]);
			  setTimeout(function() {
	               momWidget.findBtnClicked(1, {borId:item['borId']}, true, 'CELLCLICK',menuId,VIEW);
    			   },200);

	}
	},
	
};

$(document).ready(function(event){	
	momWidget.init(1, menuId, VIEW);
	momWidget.init(2, menuId, VIEW);
	
	VIEW.init();
});