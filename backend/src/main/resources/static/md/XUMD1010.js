
var menuId = 'XUMD1010';
var XUMD1010 = {
	initParam		:  undefined,
	columnProperty1	: undefined,
	createdFlag		: undefined,
	init: function() {
		var that = this;		
	} 		
};

$(function(){
	momSetup.init();
	momWidget.init(1, menuId, XUMD1010);
	XUMD1010.init();
});