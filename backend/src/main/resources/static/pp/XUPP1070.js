var menuId = 'XUPP1070';
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
	searchCallInit: function(index,your,action,btnId,param,result,event) { 
	  if(index==0){
		 let fromDate =   $('#planDateSD1').val();
		 let toDate   =   $('#planDateED1').val();
	     let pivotText = widget.getPivotDate(index,fromDate,toDate,'d','1');
	     param.pivot = pivotText; 
      }
	},
	searchCallBack: function(index,your,action,btnId,param,result,data) {
		if(index==0){
		   //widget.changePivotGrid(widget.grid[0],data); //pivot 그리드로 변경하고 데이터 넣기
		}

    }
};

$(document).ready(function(event){	
	momSetup.init();
	momWidget.init(1, menuId, VIEW);	
	VIEW.init();
});

