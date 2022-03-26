var siteInfo  = undefined;	
var locale    = undefined;	
var userName  = undefined;	
var userInfo  = undefined;	
var setupList = undefined;	
var loginType = undefined;	
var param  = {menuBarId:"btnMomGo",initFlag:"Y",initFlag2:"Y",tabChange: "N",bookMarkList: "[]",displayOrder:"[]",searchMenu:"[]",searchFlag:"N"};
var dragItem = undefined;
var momTabRunCnt = 0;
var bookTabRunCnt = 0;
var noticeBoardId = "";
var timer;
var index = {
	pwValFlag: undefined,
	init: function() {		
		if(sessionStorage.length == 0){
			top.location.href = common.contextPath() + "/login.html";
		}
		
		 siteInfo =  JSON.parse(sessionStorage.getItem('siteInfo'));	
		 locale = sessionStorage.getItem("locale");
		 userName = sessionStorage.getItem("userName");
		 userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
		 setupList =  JSON.parse(sessionStorage.getItem("siteSetup"));
		 loginType = sessionStorage.getItem("loginType");
		
		var divisionCd   = siteInfo.divisionCd;
		var divisionNm   = siteInfo.divisionName;
		var companyCd    = siteInfo.companyCd;
		var companyNm    = siteInfo.companyName;
		var userNm       = userInfo[0].userNm;
		var userNo       = userInfo[0].userNo;
		var deptCd       = 
		//$("#currentUser").html(userName);
		//$("#currentDivision").html(divisionName + "(" + divisionCd + "/" + companyCd + ") "+ " [" + deptCd + "]");		
		$('#companyNm').text(companyNm +'('+companyCd+')');
	    $('#divisionNm').text(divisionNm +'('+divisionCd+')');
	    $('#userNm').text(userNm +'('+userNo+')');
		//Language.init();
		//this.loginCheck();
		this.grid();
		this.event();
		this.style();
		//this.loginCheck();
		//this.noticeCheck();
		//this.browserClose();
		  //$('head').append('<script src="/mom/content/css/sash-bootstrap5/HTML/sash/assets/plugins/sidemenu/sidemenu.js"></script>');
		 // '<script type="text/javascript"></script>'
		$( 'a[name=MAIN]' ).attr( 'id', 'menuBtn' );
//		this.noticeStart();
		$('#searchMenu').focus();
		
	},

	style: function() {
		$(".mom-logo").css("cursor", "pointer");
		
		document.title = siteInfo.divisionName; 
	},
	grid: function() {
		
	},
	event: function() {
		var that = this ; 
		//var isExpanded = false;
		mCommon.leftMenuAuth(".w-nav",param);	
	    $('head').append('<script src="/mom/content/css/sash-bootstrap5/HTML/sash/assets/plugins/sidemenu/sidemenu.js"></script>');
	    $('head').append('<script src="/mom/content/css/sash-bootstrap5/HTML/sash/assets/plugins/tabs/tab-content.js"></script>');
	    $('head').append('<script src="/mom/content/css/sash-bootstrap5/HTML/sash/assets/plugins/tabs/jquery.multipurpose_tabcontent.js"></script>');

		$(document).on("click", "#menuBtn", function() {		
				$(".is-show").removeClass("is-show");
				$(".active").removeClass("active");
				$(this).find(".fa-angle-up").removeClass("fa-angle-up").addClass("fa-angle-down");			
		});
		
		$(document).on("click", ".menu-sam-width.userdd", function() {
			 if($(".userdropdownlist").is(".is-show") === true) {
				 $(".userdropdownlist").removeClass("is-show");				 
			 }
			 else{
				 $(".userdropdownlist").addClass("is-show");
			 }
		               
		});
		
		$(document).on("click", "#btnTabReset", function() {
			$("#tabgroup>a:not(#tabID_MAIN), .tabcontent>div:not(#tabContentID_MAIN)").remove();		 	
			$("#btnTabReset").addClass('active');            													
		});
		
		$(document).on("click", "#btnChangePass", function() {
			$("#nowPassword, #newPassword, #newPasswordConfirm").val("");
			$('#pCancelBtn, .bntpopclose').css({display: ''});
			$("#passwordPop").momModal('show');
//			nowPassword
//			newPassword
//			newPasswordConfirm
		});

		$("#pSaveBtn").click(function() {
			that.passwordChange();
		});
		
		$("#pCancelBtn, .bntpopclose").click(function() {
			$("#passwordPop").momModal('hide');
		});
		
		$(document).on("click", "#btnLogout", function() {
			that.logout();
		});
		$(document).on("click", "#btnMomGo", function() {
			that.momGo();
		});
		$(document).on("click", "#btnFomGo", function() {
			that.fomGo();
		});
		
		$(document).on("click", ".mom-logo", function() {
			location.reload();
		});
		$(document).on("click", ".depth1-menu", function() {
			var leftMenuItems = $("#leftMenuBar").children();			
				nowChildItem= leftMenuItems.children()[0];
		/*	if(nowChildItem.hash.replace("#","")=="MOMID004"){
				window.open('master/workingManual.html','workingManual','height=' + screen.height + ',width=' + screen.width + 'fullscreen=yes');				  
			}	*/	
		});
	/*	$(document).on("dragstart", "#leftMenuBar2", function(e) {
            	e.preventDefault();
            
			
		});*/
		// 상단탭 드래그시 드래그한 아이템 저장 
		$(document).on("dragstart", ".tablink", function(e) {
            if(param.menuBarId=="btnMomGo"){
            	e.preventDefault();
            }
			dragItem = {pageId:e.target.id.replace("tabID_",""),pageName: e.target.text,pageUrl:e.target.dataset.path,pageParam:e.target.dataset.param};
		});
		// 북마크 내부 메뉴 외부 드래그 차단
		$(document).on("drag", ".tablink", function(e) { 
        	e.preventDefault();
	     });
		// 북마크 내부 메뉴 외부 드래그 차단
		$(document).on("dragover", "#leftMenuBar2", function(e) {
            	e.preventDefault();
		});
		// 북마크 내부에 상단탭 드래그시 추가 이벤트
		$(document).on("drop", "#leftMenuBar2", function(e) {
			e.preventDefault();
			
			var leftMenuItems = $("#leftMenuBar").children();	
			var bookMarkPages =[];
			var bookMarkPages2 =[];
			var displayOrder =[];
			var j=0;
			for(var i=0;i<leftMenuItems.length*3;i+=3){					 
				 nowChildItem= leftMenuItems.children()[i];
				 bookMarkPages[j]  = nowChildItem.hash.replace("#","");
				 bookMarkPages2[j] = '"'+nowChildItem.hash.replace("#","")+'"';
				 displayOrder[j]   = "{"+'"menuId":'+bookMarkPages2[j]+","+'"displayOrder":'+j+"}";
				// 드롭한 엘리먼트 중복검사
			if(dragItem.pageId==bookMarkPages[j]){
				  alert("이미 등록된 페이지 입니다.");
				  return;
			}
			  j++;
			}	
		    // 드롭한 엘리먼트 좌측 메뉴바에 생성
			var pageId    = dragItem.pageId;
			var pageName  = dragItem.pageName;
			var pageUrl   = dragItem.pageUrl;
			var pageParam = dragItem.pageParam;
			var depth1 = '<li class="depth1-menu nav"style="background:#e9ecef;margin-top: 1px;"> <a style="width:90%;background-color: #e9ecef; color: black; border: #e9ecef;"href="##{id}" data-path="#{data-path}" data-param="#{param}" name="#{name}" class="w-inline-block navlink active"><div class="w-icon fa #{icon} icon"></div><div class="textarea"><div class="textblock">#{name}</div></div></a><a class="close-img2"style="left: -3%;top: 14px;"></a><div></div></li>';
			var el = $(".depth1.navbarmenu");

			var tmp = depth1.replace(/#{id}/gi, pageId);  // 페이지 ID
			tmp = tmp.replace(/#{data-path}/gi, pageUrl); // 실 소스파일 경로
			tmp = tmp.replace(/#{param}/gi, pageParam);   // 페이지  파라미터(필수는 아님)
			tmp = tmp.replace(/#{icon}/gi, "");           // 메뉴바에 표시되는 아이콘(필수는 아님)
			tmp = tmp.replace(/#{name}/gi, pageName);     // 페이지 이름
			el.append(tmp);
			
			// 드롭한 상단탭 페이지 DB에 업으면 insert 있으면 update
			var leftMenuItems     = $("#leftMenuBar").children();
			var lastChildIndex    = leftMenuItems.children().length-3;
				 nowChildItem     = leftMenuItems.children()[lastChildIndex];
				 bookMarkPages2[j] = '"'+nowChildItem.hash.replace("#","")+'"';
				 displayOrder[j]   = "{"+'"menuId":'+bookMarkPages2[j]+","+'"displayOrder":'+j+"}";
				
			var bookMarkPageList = "["+bookMarkPages2.join()+"]";
			var bookMarkDisplayOrder  = "["+displayOrder.join()+"]";
			var param = {userId:userInfo.userId,menuList:bookMarkPageList,displayOrder:bookMarkDisplayOrder};
		
			mom_ajax('R', 'admin.bookMark.bookMark', {userId: userInfo.userId}, function(result, data) {
				if(data.length>0){
					mom_ajax('U', 'admin.bookMark.bookMark',JSON.stringify(param), function(result, data){						
					});
				}
				else{
					  mom_ajax('C', 'admin.bookMark.bookMark', JSON.stringify(param), function(result, data){						    
					});
				}					  
			}, undefined, undefined, this, 'sync');
		});
		// 북마크 삭제 버튼
		$(document).on("click", ".close-img2", function(e){
			e.preventDefault();
			$(this).parent().remove();
			var removePageId    = e.target.previousSibling.hash.replace("#","");
			var leftMenuItems   = $("#leftMenuBar").children();	
			var bookMarkPages   =[];
			var bookMarkPages2  =[];
			var displayOrder =[];
			var j=0;
			for(var i=0;i<leftMenuItems.length*3;i+=3){
				 nowChildItem= leftMenuItems.children()[i];
				if(removePageId != nowChildItem.hash.replace("#","")){
					 bookMarkPages[j] = nowChildItem.hash.replace("#","");
					 bookMarkPages2[j] = '"'+nowChildItem.hash.replace("#","")+'"';
					 displayOrder[j]   = "{"+'"menuId":'+bookMarkPages2[j]+","+'"displayOrder":'+j+"}";
				}
				else{					
				}
				 j++;
			}	
			var bookMarkPageList = "["+bookMarkPages2.join()+"]";
			var bookMarkDisplayOrder  = "["+displayOrder.join()+"]";
			var param = {userId:userInfo.userId,menuList:bookMarkPageList,displayOrder:bookMarkDisplayOrder};
			mom_ajax('U', 'admin.bookMark.bookMark',JSON.stringify(param), function(result, data){				
			});
		});

		$(document).on("click", "#noticeTopTitle, #noticeTopText", function() {
			that.noticeCheck('Y');
		});
		$("#btnPrintAppDown").click(function() {
			window.open("https://chrome.google.com/webstore/detail/meta4-clickonce-launcher/jkncabbipkgbconhaajbapbhokpbgkdc","_blank", "");
		});
		
		$("#btnPrintAppDown2").click(function() {
			window.open("https://chrome.google.com/webstore/detail/clickonce-for-google-chro/kekahkplibinaibelipdcikofmedafmb","_blank", "");
		});
		// 공지사항팝업 닫기
		$(document).on("click", "#notiConfirmBtn, .bntpopclose", function() {
			
			$("#noticePop").momModal('hide');			
			$("#notiConfirmBtn").removeClass('active');  
			$("#notiConfirmBtn").addClass('disabled'); 
			that.saveNowLocation(); 
			that.noticeDoNotOpenCheck();
		});
		
		
		$(document).on("click", "#noticeCheckbox", function() {
			console.log($("#noticeCheckbox").prop("checked"));
		});
		
		/* modify_hists
		 * 20191104_002 / 20191104 / gyp / 메뉴검색 기능 추가 예정
		 * 
		 * */
		$(document).on("click", "#searchMenuBtn", function() {
			momWidget.splashShow();
			var searchName     = $("#searchMenu").val().trim(); 	
			var searchMenuName = [];
			searchMenuName[0]  = '"'+searchName+'"';	
		    var searchMenuNameText = "["+searchMenuName.join()+"]";
		    param.searchMenu = searchMenuNameText;
		    param.initFlag="N";
		    param.tabChange ="N"; 
		    if(searchName=="" || searchName==null || searchName==undefined){
		    	param.searchFlag = "N"; 
		    	mCommon.leftMenu(".w-nav", "W2018041313443077410040QmdGzBgE8y",param); //좌측 메뉴 만들기 
		    }
		    else{
		    	  param.searchFlag = "Y";
		    	  mCommon.leftMenu(".w-nav", "W2018041313443077410040QmdGzBgE8y",param); //좌측 메뉴 만들기 
		    }		  
		    param.searchFlag = "N";
		    
		    momWidget.splashHide();
		});
		$(document).on("keydown", "#searchMenu", function() {
			if (event.keyCode == 13){				
				momWidget.splashShow();
				var searchName     = $("#searchMenu").val().trim(); 	
				var searchMenuName = [];
				searchMenuName[0]  = '"'+searchName+'"';	
			    var searchMenuNameText = "["+searchMenuName.join()+"]";
			    param.searchMenu = searchMenuNameText;
			    param.initFlag="N";
			    param.tabChange ="N"; 
			    if(searchName=="" || searchName==null || searchName==undefined){
			    	param.searchFlag = "N"; 
			    	
			    	//$("#mainLogo").click();
			    	mCommon.leftMenu(".w-nav", "W2018041313443077410040QmdGzBgE8y",param); //좌측 메뉴 만들기 
			    }
			    else{
			    	  param.searchFlag = "Y";
			    	  mCommon.leftMenu(".w-nav", "W2018041313443077410040QmdGzBgE8y",param); //좌측 메뉴 만들기 
			    }
			  
			    param.searchFlag = "N";
			   
			    momWidget.splashHide();
			}
					
		});
		$(document).on('propertychange change keyup paste input','#newPassword',function() {
			if(that.pwValFlag == 'Y') {
				 if(pwCheck($('#newPassword').val()) != '') {
					 $('#tooltip').text(Language.lang['MESSAGES12485']);
				 } else {
					 $('#tooltip').text('');
				 }
			}
	    });
	},
	saveNowLocation: function() {
	    sessionStorage.setItem("preLocation",window.location.hash.slice(1).replace("#", "")); 
	},
	enableSortable: function() {
		
        $("#leftMenuBar").sortable({
            forcePlaceholderSize: true,
            disabled: false, // 정렬가능여부
            helper: "clone", //드래그중 상위 이벤트 일시적으로 중단
            opacity: 0,      //드래그중 투명도
            placeholder: "placeholder", //놓일 위치의 스타일 지정
            items: "li",           //정렬대상
            tolerance: "pointer", //영역안에 들어갈시 즉시 정렬적용
            
        });
    },

	disableSortable: function() {
	 
        $("#leftMenuBar").sortable("option", "disabled", true);
    },
	loginCheck: function() {
		if(localStorage.getItem("token") == null || '' || undefined){
			 that.logout();
		}
		var time = 5000;
		var timerId = setInterval(function() {
				
		mom_ajax('R', 'XUSM1010.loginCheck', {menuId:$('#menuId').val(),gridId:$('#gridId').val(),programId:$('#programId').val()}, function(result, data) {
				if (!result) {
					$.get(common.contextPath() + '/system/postLogout/' + companyCd + divisionCd + locale, function(result) {
						sessionStorage.setItem("userId", '');
						sessionStorage.setItem("divisionCd", '');
						sessionStorage.setItem("companyCd", '');
						sessionStorage.setItem("locale", '');						
						alert("토큰만료.재로그인 필요!");
//						micaCommon.messageBox({type:"danger", width:"400", height: "145", html: "Session lost."}); 
						clearInterval(timerId);
						this.logout();
					});
				}
		 }, undefined, undefined, this, false,'Y');
		}, time);

		
		//this.loginCheck();
		/*var time = 100000;
		this.noticeTop();
		timer = setInterval(this.noticeTop, 600000);
		setInterval(function() {
			mCommon.fnLoginCheck();
		}, time);*/
	},
	logout: function() {
		    localStorage.removeItem("token");
		    sessionStorage.removeItem("siteInfo");
		    sessionStorage.removeItem("userInfo");	
		    sessionStorage.removeItem("loginMenuList");
			location.href = common.contextPath() + "/login.html";
	
	},
	passwordChange: function() {
		var that = this;
		var nowPassword = $("#nowPassword").val();
		var newPassword = $("#newPassword").val();
		var newPassword1 = $("#newPasswordConfirm").val();
		if(that.pwValFlag == 'Y') {
			var url = 'user.chkUser';
			var param = {chkUserId: userInfo.userId};
			var pwValid = pwCheck(newPassword, nowPassword, newPassword1, url, param, 'password');
			
			if(pwValid != '') {
				momWidget.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang[pwValid]});
				return;
			}
		}
		var param = {nowPassword : mCommon.sha256Set(nowPassword), newPassword : mCommon.sha256Set(newPassword), pwchgDt: get_current_date('yyyy-mm-dd hh24:mi:ss'), pwerrCn: 0}
		$.ajax({
			url : common.contextPath() + "/system/userPasswordChange",
			data : JSON.stringify(param),
			contentType : "application/json; charset=UTF-8",
			method: "put",
			success: function(data) {
				if(data.result == "success") {
					momWidget.messageBox({type: "success", width: '400', height: '145', title: Language.lang['MESSAGES10547'], html : Language.lang['MESSAGES11766']});	
					$("#passwordPop").momModal('hide');
				} else {
					momWidget.messageBox({type: "fail", width: '400', height: '145', title: Language.lang['MESSAGES10547'], html : Language.lang['MESSAGES11767']});
				}
			}
		});
	},
	noticeCheck: function(cl) {
		
		var popFlag;
		if(cl == 'Y') {
			popFlag = 'N';
		} else {
			 popFlag = 'Y';
		}
			$.ajax({
				url : common.contextPath() + "/mom/request/com.thirautech.mom.admin.noticeBoard.dummy",
				type : "GET",
				data : {popFlag : popFlag},
				async: false,
				timeout 	: 30000000,
				dataType 	: 'json',
				contentType : 'application/json; charset=UTF-8',
				success : function(data){	
					if(data.length > 0){
						if(popFlag == 'N' && data[0].boardId != null) {
							$(".check").css({display:"none"});
						}
						$("#noticePop").momModal('show');	
						$("#notiConfirmBtn").removeClass('dsiabled');
						$("#notiConfirmBtn").addClass('active');
						$("#noticeTitle").text(data[0].boardTitle);
						$("#noticeContents").text(data[0].boardContents);
						$("#noticeText").text(data[0].boardContents);
						noticeBoardId = data[0].boardKey;
					}
				},
				error: function(data){
					console.log(data);
					momWidget.messageBox({type:"danger", width:"400", height: "145",   html:"Notice Error."});
					return;
				},
				fail : function(data){
					console.log(data);
					momWidget.messageBox({type:"danger", width:"400", height: "145",   html:"Notice Fail."});
					return;
				}
			});
			
	},
	noticeTop: function() {
		/*
		 * 20200602 / pyj / 비밀번호 벨리데이션 옵션 체크 
		 */
		var that = this;
			mom_ajax('R', 'common.comCode', {codeClassId: 'SITE_SETUP', codeId: 'PW_VAL_YN', attribute2: 'Y'}, function(result, data) {
				if(data.length > 0){
//					if(data[0].value == 'Y') {
						that.pwValFlag = 'Y';
//					} else {
//						that.pwValFlag = 'N';
//					}
				} else {
					that.pwValFlag = 'N';
				}
			});
			
/*			$.ajax({
				url : common.contextPath() + "/mom/request/com.thirautech.mom.admin.noticeBoard.dummy",
				type : "GET",
				data : {popFlag:'N'},
				async: false,
				timeout 	: 30000000,
				dataType 	: 'json',
				contentType : 'application/json; charset=UTF-8',
				success : function(data){	
					//console.log(data);
					if(data.length > 0){
						$("#noticeTopTitle").text(data[0].boardTitle)
						$("#noticeTopText").text(data[0].boardContents);
					} else {
						$("#noticeTopTitle").text("");
						$("#noticeTopText").text("");
					}
				},
				error: function(data){
					console.log(data);
					alert("Session lost.");
					top.location.href = common.contextPath() + '/login.html';
					return;
				},
				fail : function(data){
					console.log(data);
					momWidget.messageBox({type:"danger", width:"400", height: "145",   html:"Notice Check Fail."});
					return;
				}
			});*/
	},
	noticeDoNotOpenCheck: function() {
		if($("#noticeCheckbox").prop("checked")){
			var param = { boardId : noticeBoardId};
			mom_ajax("C","admin.noticeUserCheck", JSON.stringify(param));
			
		}
	},
	browserClose: function() {
		window.onbeforeunload = function(e){
//			$.get(common.contextPath() + "/system/logout", {}, 
//				function(data){
//					location.href = common.contextPath() + "/login.html";
//				}
//			);
		}
	},
	
	momGo: function() {
		//momWidget.splashShow();
		if(window.location.hash !="" && window.location.hash!=null){
			this.saveNowLocation();  
		}		
		this.disableSortable();
		$("#leftMenuBar").removeClass("ui-sortable"); // 정렬불가능한 클래스로 만듬
		$("#btnFomGo").removeClass('active');         // 텝 색상 전환
		$("#btnMomGo").addClass('active');            // 텝 색상 전환
		if(momTabRunCnt>0){
			param.initFlag = "N"; //처음 진입했는지여부
		}
		else{
			  param.initFlag = "Y";
		}
		param.tabChange ="Y";                         // 텝전환여부
		param.menuBarId = "btnMomGo";                 // 현재 메뉴바
		
		mCommon.leftMenu(".w-nav", "W2018041313443077410040QmdGzBgE8y",param); //좌측 메뉴 만들기 
		$("#tabID_MAIN").click();
		$("#searchMenu").val(""); 				      // 검색영역 초기화
		$("#searchMenu").prop('readonly', false);     // 검색영역 활성화
		
		//momWidget.splashHide();
	},
	fomGo: function() {		
		//momWidget.splashShow();
		if(window.location.hash !="" && window.location.hash!=null){
			this.saveNowLocation(); 
		}
		
		this.enableSortable();
		$("#leftMenuBar").addClass("ui-sortable"); 	  // 정렬가능한 클래스로 만듬
		$("#btnMomGo").removeClass('active');         // 텝 색상 전환	 	
		$("#btnFomGo").addClass('active');            // 텝 색상 전환
		//로그인 계정의 북마크  리스트 가져옴
		mom_ajax('R', 'admin.bookMark.bookMark', {userId: userInfo.userId}, function(result, data) {
	           if(data.length>0){
	        	   param.bookMarkList = data[0].menuList;     // 북마크 리스트
	        	   param.displayOrder = data[0].displayOrder; // 북마크 UI 정렬순서
	          }
	          else{
	        	  param.bookMarkList = "[]"; // 조회 결과없을시 빈배열 세팅
	        	  param.displayOrder = "[]"; // 조회 결과없을시 빈배열 세팅
	          }
	}, undefined, undefined, this, 'sync'); 
		bookTabRunCnt++;
		param.tabChange ="Y"; // 텝전환여부
		param.menuBarId = "btnFomGo"; //현재 메뉴바 
		if(momTabRunCnt>0){
			param.initFlag2 = "N"; //처음 진입했는지여부
		}
		else{
			  param.initFlag2 = "Y";
		}
		
		mCommon.leftMenu(".w-nav", "W2018041313443077410040QmdGzBgE8y",param); //좌측 메뉴 만들기 
		momTabRunCnt++;
		$("#searchMenu").prop('readonly', true); //검색영역 비활성화 	
		//momWidget.splashHide();
		$("#leftMenuBar").sortable({
			  //이동 축 제한
			   axis: "y",
			  //이동시 커서 모양
			  cursor: "move",
			  //이동시 커서 왼쪽에서 5px 위치에 항상 요소가 위치함, 이때 axis가 제한되어있으면 제대로 동작하지 않음
			  cursorAt: { left: 5 }, 
			  //이 영역안에서만 정렬가능 
			  connectWith:".sortList",
			  // 놓였을시 이벤트
			  update: function(event, ui) {    
				  if ($("#leftMenuBar").hasClass("ui-sortable")==false){
					   return;
				  }
					var leftMenuItems = $("#leftMenuBar").children();	
					var bookMarkPages2 =[];
					var displayOrder =[];
					var j=0;
					for(var i=0;i<leftMenuItems.length*3;i+=3){					 
						 nowChildItem= leftMenuItems.children()[i];
						 bookMarkPages2[j] = '"'+nowChildItem.hash.replace("#","")+'"';	
						 displayOrder[j]   = "{"+'"menuId":'+bookMarkPages2[j]+","+'"displayOrder":'+j+"}";
					  j++;
					}
					var bookMarkPageList = "["+bookMarkPages2.join()+"]";
					var bookMarkDisplayOrder  = "["+displayOrder.join()+"]";
					var param = {userId:userInfo.userId,menuList:bookMarkPageList,displayOrder:bookMarkDisplayOrder};
					mom_ajax('U', 'admin.bookMark.bookMark',JSON.stringify(param), function(result, data){
						
					});
			  }
			});
		
	}
};
$(document).ready(function(event){
	$("body").css("overflow-y", "scroll");
	index.init();
});
;