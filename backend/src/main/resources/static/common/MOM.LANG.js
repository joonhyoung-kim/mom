
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
	transText: function(msgType,text) { //단문 변환 
		var that = this;
		let transText = '';
		multiLang.multiLangInfo  = JSON.parse(sessionStorage.multiLangList);
		if(text.indexOf('+')>=0 && text.indexOf('#')>=0){
			let dbMsg = text.split('#');
			let multiLangText = dbMsg[0].split('+');
					
			for(let i = 0, max = multiLangText.length; i < max; i++) {
				 for(let j = 0, max2 = multiLang.multiLangInfo.length; j < max2; j++) {
					 if(multiLang['multiLangInfo'][j]['msgCd'] == multiLangText[i]){
			     	     transText += multiLang['multiLangInfo'][j]['msgNm'];
			     	     break;
		             }
				 }
				transText += multiLangText[i];
				
			}
			 return transText;
		}
		else if(text.indexOf('+')>=0 && text.indexOf('#')== -1){
			let multiLangText = text.split('+');
			for(let i = 0, max = multiLangText.length; i < max; i++) {
				 for(let j = 0, max2 = multiLang.multiLangInfo.length; j < max2; j++) {
					 if(multiLang['multiLangInfo'][j]['msgCd'] == multiLangText[i]){
			     	     transText += multiLang['multiLangInfo'][j]['msgNm'];
			     	     break;
		             }
				 }
				//transText += multiLangText[i];
				
			}
			 return transText;
		}
		else{
			 for(let i = 0, max = multiLang.multiLangInfo.length; i < max; i++) {
		     if(multiLang['multiLangInfo'][i]['msgCd'] == text){
			     return multiLang['multiLangInfo'][i]['msgNm'];
		     }
	    }
	     return text;
		}
	  
	   
	},
	transAll: function() { //UI 전체 다국어 변환
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
		return '';
	}
};