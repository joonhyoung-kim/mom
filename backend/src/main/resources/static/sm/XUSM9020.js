var menuId = 'XUSM9020';
var widget = momWidget;
var VIEW= {
	initParam		: undefined, 	  
	init: function() {
		that = this;		
		that.event();
		$("#gridIdSP1").jqxComboBox({ disabled: true }); 
	},
	event: function(e) {
	$(document).on('change', '#menuIdSP1', function(e) {
       mom_ajax('R', 'DD.DD00006', {menuId:$("#menuIdSP1").val()}, function(result1, data1) {
			      if(result1 != 'SUCCESS') {
			    	  momWidget.splashHide();
				      return;							     
			      }	 							    					     
				  $('#gridIdSP1').jqxComboBox("clear");	
				  if(data1.length == 0){
					  //momWidget.messageBox({type: 'warning', width: '400', height: '145', html: '그리드등록필수!'});
										return;			  
				  }
				  else{
					   $('#gridIdSP1').jqxComboBox('source',data1);	
					   $("#gridIdSP1").jqxComboBox('selectItem', '1');
					   $("#gridIdSP1").jqxComboBox({ disabled: false }); 
				  }
				   momWidget.splashHide();
				   return;
				   }, undefined, undefined, this, false,'Y','crud');
});
	},
    savePopCallInit: function(index,your,action,btnId,param,result) { // 팝업저장 직전 호출
	      if(index ==0 && (btnId =='createBtn' || btnId =='editBtn' || btnId =='copyBtn')){	    			
			 param[0].menuId = widget.pageProperty[0]['menuId'];
			 param[0].gridId = '1';
			 result.param =  param;
		    
	     }
  
	},
};

$(document).ready(function(event){	
	momSetup.init();	
	momWidget.init(1, menuId, VIEW);	
	VIEW.init();
});