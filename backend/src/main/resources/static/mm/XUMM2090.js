var menuId = 'XUMM2090';
var widget = momWidget;
var that = undefined;
var VIEW= {
	initParam		: undefined, 
	partnerCd       : undefined,
	init: function() {	
		that = this;	
		that.event();
	},
	event: function(e) {
	
	},
    searchCallInit: function(index,your,action,btnId,param,result,event) { //조회액션 실행 전에 호출되는 함수 
        if(index==1){
			
			  					
		} 
	

		
	},
 cellClickCallBack: function(index,rowIndex,target,e) {				
		 if(index==0){
			widget.findBtnClicked(1, {departureNo:e.item['departureNo']}, true, 'CELLCLICK',menuId,VIEW);
		}
		
			
	},
	customCallInit: function(index,your,action,btnId,param,result) {
		if(index == 0 ){
			if(action =='D' || btnId == 'customBtn1-2'){
			   /* for(var i=0,max=param.length; i<max;i++){
					 if(param[i].poUserNo == undefined || param[i].poUserNo == ''){
							result.msg = '발주담당자를 지정하지 않은 데이터가 있습니다!';
							result.result = 'WARN';
							return;
					 }		    
			    }*/
	
		   }
		}
		
	}
	
};

$(document).ready(function(event){	
	momSetup.init();
	momWidget.init(1, menuId, VIEW,'GRID');	
	momWidget.init(2, menuId, VIEW,'GRID');	
	VIEW.init();
});