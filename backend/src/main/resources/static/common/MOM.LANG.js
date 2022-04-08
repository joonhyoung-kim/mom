
var multiLang = {
	draw: 0,
	lang: {},
	korean: {},
	isDone: undefined,
	multiLangInfo:undefined,
	siteInfo :undefined,
    companyCd  :undefined,	
	divisionCd :undefined,			
	langCd     :undefined,
	
	init: function(callBack, first) {
		var that = this;
		multiLangInfo   = JSON.parse(sessionStorage.multiLangList);
		siteInfo    = JSON.parse(sessionStorage.siteInfo);
		companyCd   = siteInfo.companyCd;			
		divisionCd  = siteInfo.divisionCd;						
		langCd      = siteInfo.languageCd;

 
		
	},
	transText: function(msgType,text) {
		var that = this;
		multiLang.multiLangInfo  = JSON.parse(sessionStorage.multiLangList);
	   	for(var i = 0, max = multiLang.multiLangInfo.length; i < max; i++) {
		     if(multiLang['multiLangInfo'][i]['msgCd'] == text){
			     return multiLang['multiLangInfo'][i]['msgNm'];
		     }
	    }
	    return text;
	},
	transAll: function() { //전체 다국어 변환
		var that = this;
		multiLang.multiLangInfo  = JSON.parse(sessionStorage.multiLangList);
		var target = $('[multi-lang]');
	   	for(var i = 0, max = multiLang.multiLangInfo.length; i < max; i++) {
		  for(var j = 0, max2 = target.length; j < max2; j++){
			 if(multiLang['multiLangInfo'][i]['msgCd'] == target[j].innerText.trim()){
			  target[j].textContent = multiLang['multiLangInfo'][i]['msgNm'];
			}
		}
		   
		    
		}
			
			
	},
	
	contextPath: function() {
		return '/TU_Platform';
	}
};