var menuId = 'XUPP3110';
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
      customCallInit: function(index,your,action,btnId,param,result) {
	  if(index==0 && action=='D'){
		if( btnId == 'customBtn1-1' ){	
		 let checkedItems = [];
	
		   for(var i=0,max=param.length; i<max;i++){
			if( param[i].checkBox=='Y' && param[i].resultState =='C'){
				result.msg = '이미  취소된 데이터가 포함되어있습니다!';
				result.result = 'WARN';
				return;
			}
			else if(param[i].checkBox=='Y'&&(param[i].resultState =='E' || param[i].resultState =='R')){
				checkedItems.push(param[i]);
			}		    
	       }
	       if(checkedItems.length ==0){
		        result.msg = '취소할 실적을 체크해주세요!';
				result.result = 'WARN';
				return;
	      }
	       result.param = checkedItems;
	       
	       
	       
		}
	  }
		
	}
	
	
	
};

$(document).ready(function(event){	
	momWidget.init(1, menuId, VIEW);		
	VIEW.init();
});