var hostLen = (location.hostname.indexOf(".smartmom") == -1) ? location.hostname.indexOf("-smartmom") : location.hostname.indexOf(".smartmom") ;
var companyCd =  location.hostname.substr(0, hostLen).toUpperCase() == 'WWW' ? '' : location.hostname.substr(0, hostLen).toUpperCase();
var setupList =  JSON.parse(sessionStorage.getItem("siteSetup"));


var Login = {
	siteList: {},
	pwValFlag: 'N',
	init: function() {
		   
		    var that = this; //
			this.event();    // 이벤트 함수등록
			this.logout();   //  로그아웃 처리
			this.setComboBox(); // 로그인폼 콤보박스 세팅		
	}, 
	
	event: function() {
		var that = this; 
		var param = undefined;
		$(document).on("click", "#loginBtn", function() {
			momWidget.splashShow(); //스플래쉬생성
			var msg = '';
			param = {
					      userId      : $("#loginId").val()  == undefined ? '' : $("#loginId").val(),
					      password    : $("#password").val() == undefined ? '' : $("#password").val(),			
					      companyCd   : $("#field-3").val()  == undefined ? '' : $("#field-3").val(),
					      companyName : $("#field-3").jqxComboBox('getSelectedItem').label  == undefined ? '' : $("#field-3").jqxComboBox('getSelectedItem').label,
					      divisionCd  : $("#field-4").val()  == undefined ? '' : $("#field-4").val(),
					      divisionName: $("#field-4").jqxComboBox('getSelectedItem').label  == undefined ? '' : $("#field-4").jqxComboBox('getSelectedItem').label,
					      languageCd  : $("#field-5").val()  == undefined ? '' : $("#field-5").val(),    
					      languageName: $("#field-5").jqxComboBox('getSelectedItem').label  == undefined ? '' : $("#field-5").jqxComboBox('getSelectedItem').label,
			}		
			//sessionStorage.setItem("pwTryCount",);	 
			that.login(param);		
		});			
		
		
		$(document).on("keydown", "#loginId", function(e) { //엔터입력시 패스워드 창으로 포커스이동
			if(e.keyCode == 13) {
				$("#password").focus();
			}
		});
		
		$(document).on("keydown", "#password", function(e) {
			if(e.keyCode == 13) {
				momWidget.splashShow();
//				var param = {
//					userId : $("#loginId").val(),
//					password : mCommon.sha256Set($("#password").val()),
//					siteId : $("#field-4").val()
//				}
				$('#loginBtn').trigger('click'); //패스워드 입력창에서 엔터 입력시 로그인 이벤트 실행
				//that.login(param);			
			}			
		});
		
		$(document).on('propertychange change keyup paste input','#newPassword',function() {
			if(pwCheck($('#newPassword').val()) != '') {
				 $('#tooltip').text(Language.lang['MESSAGES12485']);
			 } else {
				 $('#tooltip').text('');
			 }
	    });
	      $(document).on("change", "#field-3", function() {
	    	  that.getDivision($('#field-3').val());	 
	      });

	}, 
	
	setComboBox: function() {
		momWidget.splashShow(); 
		var that = this;
		var companyOptions   = {local: [],textName : "label", valueName : "value", readonly : false, selectedIndex : 0};		
		var divisionOptions  = {local: [],textName : "label", valueName : "value", readonly : false, selectedIndex : 0};
		var langOptions      = {local: [{'value':'KR','label':'한국어'},{'value':'EN','label':'영어'},{'value':'CN','label':'중국어'}],textName : "label", valueName : "value", readonly : false, selectedIndex : 0}; 
				
		//that.getDivision($('#field-3').val());		
		momWidget.setComboBox.set("#field-3", {width : '100%', dropDownHeight : '200px', autoDropDownHeight : false, searchMode : 'containsignorecase', autoComplete : true, selectedIndex : 0,theme: 'energyblue'}, companyOptions);	
		momWidget.setComboBox.set("#field-4", {width : '100%', dropDownHeight : '200px', autoDropDownHeight : false, searchMode : 'containsignorecase', autoComplete : true, selectedIndex : 0,theme: 'energyblue'}, divisionOptions);		
		momWidget.setComboBox.set("#field-5", {width : '100%', dropDownHeight : '200px', autoDropDownHeight : false, searchMode : 'containsignorecase', autoComplete : true, selectedIndex : 0,theme: 'energyblue'}, langOptions);	
									
			//that.rememberMeCheck();	
		that.getCompany();
		momWidget.splashHide(); 
	},
	login: function(loginParam) {
		var that = this; 		
		var errorMessage = '';
		momWidget.splashShow(); // 스플래쉬 생성		
		var param = { // 로그인폼 값으로 파라미터 세팅
			userId          : loginParam.userId       == '' ? errorMessage = '아이디 미입력!'  : loginParam.userId,
			password 	    : loginParam.password     == '' ? errorMessage = '패스워드 미입력!' : loginParam.password,
			companyCd 	    : loginParam.companyCd    == '' ? errorMessage = '컴퍼니 미선택!'  : loginParam.companyCd,
		    companyName 	: loginParam.companyName  == '' ? errorMessage = '컴퍼니 미선택!'  : loginParam.companyName,		
			divisionCd 	    : loginParam.divisionCd   == '' ? errorMessage = '디비전 미선택!'  : loginParam.divisionCd,
			divisionName 	: loginParam.divisionName == '' ? errorMessage = '디비전 미선택!'  : loginParam.divisionName,				
			languageCd	    : loginParam.languageCd   == '' ? errorMessage = '언어 미선택!'   : loginParam.languageCd
			//passwordTryCount: loginParam.passwordTryCount   == '' ? that.showVaildationMessage('W','국가 미선택!') : loginParam.languageCd
		//    today  		: get_current_date('yyyy-mm-dd hh24:mi:ss')
		}
		var siteInfo = {
				        companyCd 	    : loginParam.companyCd    ,
					    companyName 	: loginParam.companyName  ,		
						divisionCd 	    : loginParam.divisionCd   ,
						divisionName 	: loginParam.divisionName ,				
						languageCd	    : loginParam.languageCd   
		}	
		     	if(errorMessage != ''){
		     		  that.showVaildationMessage('W',errorMessage);
		     		  momWidget.splashHide();
		     		  return;
			    }
				
		$.ajax({
			url:"/login",
			method: "post",
			contentType: 'application/json',
			data : JSON.stringify(param),
			success: function(data){
				if(data.token != null && data.token != '') { //로그인 성공시 리턴된 token 값을 저장 
					localStorage.setItem("token", data.token); //토큰저장			
					sessionStorage.setItem("siteInfo", JSON.stringify(siteInfo));
					mom_ajax('R', 'XUSM1010.userInfo', param, function(result1, data1) {
					      if(result1 != 'SUCCESS') {
						      return;
					      }				
					        sessionStorage.setItem("userInfo", JSON.stringify(data1));
				    		mom_ajax('R', 'XUSM1010.authMenu', {authGroupCd:JSON.parse(sessionStorage.getItem("userInfo"))[0].authGroupCd,langCd:$("#field-5").val()}, function(result2, data2) {
								      if(result2 != 'SUCCESS') {
									      return;
								      }  
								       mom_ajax('R', 'XUSM1010.multiLang', param, function(result3, data3) {
						                 if(result3 != 'SUCCESS') {
						    	            momWidget.splashHide();
							                return;							     
						                 }	
						                sessionStorage.setItem("loginMenuList", JSON.stringify(data2));					    
						                sessionStorage.setItem("multiLangList", JSON.stringify(data3));
										momWidget.splashHide();
										top.location.href = mCommon.contextPath() + "/main.html";
					}, undefined, undefined, this, false);
					
								        
								
							}, undefined, undefined, this, false);				    		
					  	  
				    }, undefined, undefined, this, false);
					
		
//						if(isMobile) {
//							top.location.href = common.contextPath() + "/TabletMain.html";
//							momWidget.splashHide();
//						} else {
							//Language.init(undefined, true);
							
//						}
					
					
					/*console.log('Language.initialize Start ' + param.divisionCd + ', ' + param.divisionCd + ', ' + $('#field-4').val());
					Language.initialize(param.divisionCd, param.companyCd, $('#field-4').val(), function() {
						console.log('Language.initialize Success');
					})*/
					
//					mCommon.setCookie('loginId', param['userId'], 30);
//					mCommon.setCookie('password', $("#password").val(), 30);
//					mCommon.setCookie('siteId', $('#field-4').val(), 30);
				//	mCommon.setCookie('divisionCd', param['divisionCd'], 30);
				//	mCommon.setCookie('companyCd', param['companyCd'], 30);
				//	mCommon.setCookie('locale', $('#field-5').val(), 30);
					
			
				} else {
						 that.showVaildationMessage('D','CHECK ID OR PASSWORD!')
						 momWidget.splashHide();
				  
				}
			},
			error: function(e) {
				if(e.responseJSON.status == 401){
					that.showVaildationMessage('D','CHECK ID OR PASSWORD!'); 
					 momWidget.splashHide();
					 return;
				}
				else{
					  momWidget.splashHide();
					  return;
				}
				
				
			}
		});
	},
	getCompany: function() {
		var param = {
				userId      : "master",
				password 	: "master",
				comboType   : "company"
		};
		
		
		
		$.ajax({
		    url:"/login", 
		    type:'post', // GET, PUT
		    contentType: 'application/json',
		    data: JSON.stringify(param),
		    success: function(result){
		    	var divisionOptions = {local: result, /*textName : "companyName",*/ textName : "companyNm", valueName : "companyCd", readonly : false};		
				momWidget.setComboBox.set("#field-3", {width : '100%', dropDownHeight : '200px', autoDropDownHeight : false, searchMode : 'containsignorecase', autoComplete : true, selectedIndex : 0}, divisionOptions);
		    	//top.location.href = common.contextPath() + "/main.html";
			},
			error:function(){  
				//Login.init();
			}
		});
	},
	getDivision: function(companyCd) {
		var param = {
						userId      : "master"  ,
						password 	: "master"  ,
						companyCd   : companyCd ,
						comboType   : "division"
		};
		$.ajax({
			url:"/login",
			method: "post",
			contentType: 'application/json',
		    data: JSON.stringify(param),
		    success: function(result){
		    	var divisionOptions = {local: result, /*textName : "companyName",*/ textName : "divisionNm", valueName : "divisionCd", readonly : false};		
				momWidget.setComboBox.set("#field-4", {width : '100%', dropDownHeight : '200px', autoDropDownHeight : false, searchMode : 'containsignorecase', autoComplete : true, selectedIndex : 0}, divisionOptions);
		    	//top.location.href = common.contextPath() + "/main.html";
			},
			error:function(){  
				//Login.init();
			}
		});
	},
	showVaildationMessage: function(typeCode,message) {
		if(typeCode == 'D'){
			  momWidget.messageBox({type:'danger', width:'400', height: '240', html: message});
			  
			  momWidget.splashHide();
		      return;
		}
		else{
			  momWidget.messageBox({type:'warning', width:'400', height: '145', html: message});
			  momWidget.splashHide();	
			  return;
		}
		
	},
	
	logout: function() {
		//localStorage.removeItem("authenticatedUser");
	    localStorage.removeItem("token");
	    sessionStorage.removeItem("siteInfo");
	    sessionStorage.removeItem("userInfo");	 
	    sessionStorage.removeItem("loginMenuList");
	 // sessionStorage.removeItem("pwTryCount");	 
	},
	
	rememberMeSave: function() {
		if($("#checkbox").is(":checked")) {
			mCommon.setCookie("loginId", $("#loginId").val(), 30);
//			mCommon.setCookie("password", mCommon.sha256Set($("#password").val()), 30);
//			mCommon.setCookie("siteId", $("#field-4").val(), 30);
		} else {
			/*mCommon.setCookie("loginId", "", -1);
			mCommon.setCookie("password", "", -1);
			mCommon.setCookie("siteId", "", -1);*/
		}
	},
	
	rememberMeCheck: function() {
		if(mCommon.getCookie("loginId")) {
			$("#loginId").val(mCommon.getCookie("loginId")).attr("autocomplete", "false");
//			$("#password").val(mCommon.getCookie("password")).attr("autocomplete", "false");
//			$("#field-4").val(mCommon.getCookie("siteId"));
//			$("#checkbox").prop("checked", true);
			
			/*var param = {
				userId : mCommon.getCookie("loginId"),
				password : mCommon.getCookie("password"),
				siteId : mCommon.setCookie("siteId")
			}
			
			that.login(param);*/
		}
	}, 

};

$(document).ready(function(event){
	//Login.getSiteInfo();
	 Login.init();
});

var filter = "win16|win32|win64|mac";
var isMobile = false;
if(navigator.platform){
	if(0 > filter.indexOf((navigator.platform || "").toLowerCase())){
		isMobile = true;
	}
}
