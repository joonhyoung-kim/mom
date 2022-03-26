/*var lang = {};
var korean = {};*/

var Language = {
	draw: 0,
	lang: {},
	korean: {},
	isDone: undefined,
	
	init: function(callBack, first) {
		var that = this;
		var companyCd = JSON.parse(sessionStorage.getItem('siteInfo')).companyCd;			
		var divisionCd = JSON.parse(sessionStorage.getItem('siteInfo')).divisionCd;						
		var locale = JSON.parse(sessionStorage.getItem('siteInfo')).languageCd;
		
		if(first) {
			$.ajax({
				  type: 'get',
				  url : tuCommon.contextPath() + '/request/com.mom.XUSM1010.langCode/R',
				  data : {'divisionCd':divisionCd, 'companyCd':companyCd, 'locale':locale},
				  contentType : 'application/json',
				  beforeSend: function (xhr) {
			          //  xhr.setRequestHeader("Content-type","application/json");
			            xhr.setRequestHeader("Authorization","Bearer" + localStorage.getItem('token'));
			      },
			      success: function(data){			    	  						
			    	  if(data.length == 0) {
			    		    momWidget.messageBox({type:'danger', width:'400', height: '145', html: "Lang. Config. Not Exist"});
			    			momWidget.splashHide();
							return;
						}
			    		
						that.lang = {};
						that.korean = {};
						
						if(locale == 'KR') {
							for(var i = 0; i < data.length; i++) {
								//console.log(data[i]['codeType'] + ', ' + data[i]['keyword'])
								that.lang[data[i]['codeType']] = data[i]['keyword'];
							}
						} else {
							for(var i = 0; i < data.length; i++) {
								if(data[i]['locale'] == 'KR') {
									/*if(that.korean[data[i]['keyword']] != undefined) {
										var key = data[i]['keyword'];
										var value = that.korean[key];
										
										that.korean[data[i]['keyword']] = '#COLLISION#';
										that.korean[key + '1'] = value;
										that.korean[key + '2'] = data[i]['codeType'];
									} else {*/
										that.korean[data[i]['keyword']] = data[i]['codeType'];
									//}
								} else {
									that.lang[data[i]['codeType']] = data[i]['keyword'];
								}
							}
						}
						
						sessionStorage.setItem('lang', JSON.stringify(that.lang));
						sessionStorage.setItem('korean', JSON.stringify(that.korean));
						
						//top.location.href = tuCommon.contextPath() + "/main.html";
						if(callBack != undefined) {
							callBack(that);
						}
			      }
			        
				});

		} else {
			if(that.isDone == 'DONE') {
				if(callBack != undefined) {
					callBack(that);
				}
				
				return;
			}
			
			that.isDone = 'DONE';
			
			if(that.lang == {} || jQuery.isEmptyObject(that.lang)) {
				that.lang = JSON.parse(sessionStorage.getItem('lang'));
			} 
			
			if(that.draw == 0) {
				that.draw = 1;
				var els = $('[multi-lang]');
				var maxLength = 0;
				
				els.each(function(idx, el){
					$(el).text(that.lang[$(el).text()]);
					$(el).css('display','');
					if(el.offsetParent != null){
						$(el).attr("title",el.innerText );
//						console.log(el.innerText + " : " + el.innerText.length + " = " + maxLength);
//						if(maxLength <= el.innerText.length){
//							maxLength = el.innerText.length;
//						} 
//						if(el.innerText.length >= 15 && el.innerText.length < 20){
//							$(".labelbox").addClass("w150");
//						} else if(el.innerText.length >= 20 && el.innerText.length < 25){
//							$(".labelbox").addClass("w170");
//						} else if(el.innerText.length >= 25 && el.innerText.length < 30){
//							$(".labelbox").addClass("w190");
//						} else if(el.innerText.length >= 30){
//							$(".labelbox").addClass("w220");
//						}
					}
				});
//				console.log("maxWidth :: " + maxWidth);
//				if(maxLength >= 15 && maxLength < 20){
//					$(".labelbox").removeClass("w110");
//					$(".labelbox").removeClass("w130");
//					$(".labelbox").addClass("w150");
//				} else if(maxLength >= 20 && maxLength < 25){
//					$(".labelbox").removeClass("w110");
//					$(".labelbox").removeClass("w130");
//					$(".labelbox").removeClass("w150");
//					$(".labelbox").addClass("w170");
//				} else if(maxLength >= 25 && maxLength < 30){
//					$(".labelbox").removeClass("w110");
//					$(".labelbox").removeClass("w130");
//					$(".labelbox").removeClass("w150");
//					$(".labelbox").removeClass("w170");
//					$(".labelbox").addClass("w190");
//				} else if(maxLength >= 30){
//					$(".labelbox").removeClass("w110");
//					$(".labelbox").removeClass("w130");
//					$(".labelbox").removeClass("w150");
//					$(".labelbox").removeClass("w170");
//					$(".labelbox").removeClass("w190");
//					$(".labelbox").addClass("w220");
//				}
			}
			
			if(callBack != undefined) {
				callBack(that);
			} 
		}
	},
	
	getLang: function(key) {
		var that = this;
		
		if(that.lang == {} || jQuery.isEmptyObject(that.lang)) {
			that.lang = JSON.parse(sessionStorage.getItem('lang'));
		}
		
		if(key.indexOf('+') <= 0 && key.indexOf('@') <= 0) {
			return that.lang[key] == undefined ? key : that.lang[key];
		}
		
		var key1 = key;
		
		var min = key1.indexOf(' ') > 0 ? key1.indexOf(' ') : key1.length;
		min = key1.indexOf('+') > 0 && key1.indexOf('+') < min ? key1.indexOf('+') : min;
		min = key1.indexOf('@') > 0 && key1.indexOf('@') < min ? key1.indexOf('@') : min;
		
		key1 = that.lang[key1.substring(0, min)];
		if(key.indexOf('+') > 0) {
			var value1 = '';
			var tokens1 = key.split('+');
			for(var j = 0; j < tokens1.length; j++) {
				if(tokens1[j].indexOf('@') > 0) {
					key = that.lang[$.trim(tokens1[j].substring(0, tokens1[j].indexOf('@')))];
					if(key == undefined) {
						return "Multi Language Not Set at " + $.trim(tokens1[j].substring(0, tokens1[j].indexOf('@')));
					}
					
					var value = '';
					var tokens = $.trim(tokens1[j]).split('@');
					for(var i = 1; i < tokens.length; i++) {
						value += (key.substring(0, key.indexOf('#')) + $.trim(tokens[i]));
						key = key.substring(key.indexOf('#')+1);
						key = key.substring(key.indexOf('#')+1);
					}
					
					value += key;
					if(j > 0) {
						value1 += '<br />';
					}
					
					value1 += value;
				}  else {
					key = that.lang[tokens1[j]];
					if(key == undefined) {
						return value1 += ('<br />' + tokens1[j]);
					}
					
					if(j > 0) {
						value1 += '<br />';
					}
					
					value1 += that.lang[tokens1[j]];
				}
			}
			
			return value1;
		} else {
			if(key.indexOf('@') > 0) {
				var value = '';
				var tokens = key.split('@');
				if(that.lang[$.trim(tokens[0])] == undefined) {
					return "Multi Language Not Set at " + tokens[0];
				}
				
				var key1 = that.lang[$.trim(tokens[0])];
				for(var i = 1; i < tokens.length; i++) {
					value += key1.substring(0, key1.indexOf('#')) + $.trim(tokens[i]);
					key1 = key1.substring(key1.indexOf('#')+1);
					key1 = key1.substring(key1.indexOf('#')+1);
				}
				
				return value + key1;
			} 
		}
		
		return key;  // Do Nothing
	},
	
	/*getKorean: function() {
		return korean;
	},*/
	
	getValueFromKorean: function(value) {
		var that = this;
		if(that.korean == {} || jQuery.isEmptyObject(that.korean)) {
			that.korean = JSON.parse(sessionStorage.getItem('korean'));
		}
		
		if(that.lang == {} || jQuery.isEmptyObject(that.lang)) {
			that.lang = JSON.parse(sessionStorage.getItem('lang'));
		}
//		console.log('#### korean = ' + sessionStorage.getItem('korean'));
//		console.log('#### lang = ' + sessionStorage.getItem('lang'));
		/*if(value == '수정자') {
			var keyCode = that.korean[value];
			console.log('#### keyCode = ' + keyCode);
			console.log('#### value = ' + that.lang[keyCode]);
			
			return '정호영';
		}*/
		
		return that.lang[that.korean[value]] == null ? value : that.lang[that.korean[value]]; // == '#COLLISION#' ? () : that.lang[that.korean[value]];
	},
	
	getKoreanFromLang: function(value) {
		var that = this;
		var rtnValue = "";
		
		
		if(that.korean == {} || jQuery.isEmptyObject(that.korean)) {
			that.korean = JSON.parse(sessionStorage.getItem('korean'));
		}
		
		if(that.lang == {} || jQuery.isEmptyObject(that.lang)) {
			that.lang = JSON.parse(sessionStorage.getItem('lang'));
		}
		
		//console.log(that.korean);
		
		rtnValue = that.getKeyByValue(that.lang, value);
		//console.log(rtnValue);
		
		rtnValue = that.getKeyByValue(that.korean, rtnValue);
		
		return rtnValue; // == '#COLLISION#' ? () : that.lang[that.korean[value]];
	},
	getKeyByValue : function(object, value) {
		return Object.keys(object).find(key => object[key] === value);
	},
		
	contextPath: function() {
		return '/TU_Platform';
	}
};

