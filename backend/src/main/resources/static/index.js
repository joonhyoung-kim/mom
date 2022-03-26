var index = {
	init: function() {
		this.loginCheck();
	},
	loginCheck: function() {
		$.get(tuCommon.contextPath() + "/system/loginCheck", function (result) {
			console.log(result);
			if (!result) {
				top.location.href = tuCommon.contextPath() + "/login.html";
			} else {
				if(isMobile) {
					top.location.href = tuCommon.contextPath() + "/TabletMain.html";
				} else {
					top.location.href = tuCommon.contextPath() + "/main.html";
				}
			}
		});
	}
};
$(document).ready(function(event){
	index.init();
});

var filter = "win16|win32|win64|mac";
var isMobile = false;
if(navigator.platform){
	if(0 > filter.indexOf((navigator.platform || "").toLowerCase())){
		isMobile = true;
	}
}