
var menuId = 'XUSM9010';
var XUSM9010 = {
	initParam		:  undefined,
	columnProperty1	: undefined,
	createdFlag		: undefined,
	init: function() {
		var that = this;	
		$('#grid1').remove();
		var textareaHtml = '<textarea id = "xmlText" name="opinion" cols="264" rows="42"></textarea>';
		$('.grid-box1').prepend(textareaHtml);
		
		
	} 		
};

$(document).ready(function(event){	
	momWidget.init(1, menuId, XUSM9010);
	XUSM9010.init();
});