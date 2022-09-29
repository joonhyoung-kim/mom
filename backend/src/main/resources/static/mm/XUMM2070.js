var menuId = 'XUMM2070';
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
		if(index==100 && target=='vendorNm'){
			$('#vendorNmDP1').val(e.item.partnerCd+'('+e.item.partnerNm+')');
            VIEW.partnerCd = e.item.partnerCd;
		}
		else if(index==0){
			widget.findBtnClicked(1, {poNo:e.item['poNo']}, true, 'CELLCLICK',menuId,VIEW);
		}
			
	}

	
};

$(document).ready(function(event){	
	momSetup.init();
	momWidget.init(1, menuId, VIEW,'GRID');	
	VIEW.init();
});