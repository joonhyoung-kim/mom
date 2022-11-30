var menuId = 'XUMD1030';
var widget = momWidget;
var that = undefined;
var VIEW= {
  initParam   : undefined, 
    
  init: function() {  
    that = this;  
    that.event();
  },
  event: function(e) {
  
  },
};

$(document).ready(function(event){  
  momSetup.init();
  momWidget.init(1, menuId, VIEW);  
  VIEW.init();
});