var popup = {
	init: function() {
		mCommon.init("auigrid-2", "W201804131344405511005fblOYGXqRkv");
		mCommon.init("auigrid", "W201804131344405511005fblOYGXqRkv");
		mCommon.init("auigrid", "W201806221720411561000xXhtpN4O4Fe");
		this.grid();
		this.event();
		mCommon.render("auigrid-2", "W201804131344405511005fblOYGXqRkv");
		mCommon.render("auigrid", "W201804131344405511005fblOYGXqRkv");
		mCommon.render("auigrid", "W201806221720411561000xXhtpN4O4Fe");
	}, grid: function() {
	}, event: function() {
		$("#btnSearch").click(function(event){
			mCommon.renderForm("auigrid", "W201804171937587591000dvUxX5NEG7n", $(event.target).parents('form')[0]);
		});
	}
};
$(document).ready(function(event){
	popup.init();
});