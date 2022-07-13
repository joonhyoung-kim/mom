const menuId = 'XUSM3120';
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
		if(index==0){
			var item = e.item;	
			//var param = momWidget.getSelectedItems(momWidget.grid[0]);
			  setTimeout(function() {
	               momWidget.findBtnClicked(1, {idGenCd:item['idGenCd']}, true, 'CELLCLICK',menuId,VIEW);
    			   },200);

	}
	},

};

$(document).ready(function(event){	
	momWidget.init(1, menuId, VIEW);
	momWidget.init(2, menuId, VIEW);	
	VIEW.init();
});