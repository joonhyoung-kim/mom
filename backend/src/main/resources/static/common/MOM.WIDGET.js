var momWidget = {
	your:				    [], // 화면별 스크립트객체
	grid: 				    [], // 화면별 메인 그리드 ID
	excelDownGrid:          [], // 엑셀다운로드 그리드 ID
	excelTmpGrid:           [], // 엑셀 업로드 양식 그리드 ID
	excelUpGrid  :          [], // 엑셀 업로드 그리드 ID
	
	pageProperty: 		    [], // 화면별 속성값 (programId,menuId,tamplateId,page parameter)
	gridProperty: 		    [], // 메인 그리드 세팅 속성 (mom_widget 테이블)
	columnProperty: 	    [], // 컬럼 세팅 속성(mom_widget 테이블)
	searchProperty: 	    [], // 검색조건 세팅 속성(mom_widget 테이블)
	buttonProperty: 	    [], // 버튼 세팅 속성(mom_widget 테이블)
	popupProperty: 		    [], // 팝업 세팅 속성(mom_widget 테이블)
	customPopupProperty:    {}, // 커스텀팝업 세팅 속성(mom_widget 테이블)
	gridExtraProperty:      [], // 메인 그리드 커스텀 세팅값 (checkId,gridTitle,headerColor,initSearch,popupColNum,popupRowNum,popupTitle,showFindBtn)
	excelUpGridProperty:    [], // 엑셀 업로드 컬럼 세팅 속성(aui grid 기준에 맞게 가공)
	excelDownProperty: 		[], // 엑셀 다운로드 컬럼 세팅 속성(aui grid 기준에 맞게 가공)	
	excelUploadProperty: 	[], // 엑셀 다운로드 컬럼 세팅 속성(aui grid 기준에 맞게 가공)	
	columnProp:             [], // 컬럼 세팅 속성(aui grid 기준에 맞게 가공)
	
	excelDownGridData:      [], // 엑셀다운로드 그리드 data 임시 보관(풀스캔시 활용)
	backWork:               [], // 페이징시 풀스캔(전체조회) 중인지 여부
	totalRowCount:          [], // 페이징시 풀스캔(전체조회) 전체 카운트(전체 조회건수) 저장
    
	columnDropdown:         [], // 그리드 컬럼에 콤보박스 사용할 경우 해당 list 보관	
	columnDropdownReSearch: [], // 그리드 컬럼에 콤보박스 사용할 경우 (조인조건으로 사용할 특정 컬럼들보관)
	dropdownProperty:       [], // 그리드 컬럼에 콤보박스 사용할 경우 해당 속성 보관
		
	totalPage:              [], // ??
    startPage:              [], // 페이징시 시작페이지
    endPage:                [], // 페이징시 엔드페이지
    splitGridData:          [], // 
	checkedRowItem:         [], //
	searchComboQueryId:     [], // 검색조건필드 query id
	searchComboMinLength:   [],	// 검색조건필드 최소 검색 길이
	popupComboQueryId:      [], // 검색팝업필드 query id
	popupComboMinLength:    [],	// 검색팝업필드 최소 검색 길이
	sortingInfo:            [], // 그리드 필터 컬럼 
	searchComboItems:       [], // 검색조건필드 콤보박스 아이템 list
	preComboItems:          [], // 검색조건필드 콤보박스 아이템 list
	INFINITE: 			    100000000,	
	uploadFlag: 		    0,
	popupPrevItem:          [],
	searchPrevItem:         [],
	editItem:               [],
	downSequence:		    100,	
	isInitSearch:		    false,
	firstPageFlag:          true,
	excelUpCheckYn:         undefined , // 엑셀 업로드 검증 사용여부(Y/N)
	dateCheckParam :        '-1', // 엑셀 업로드시 추가적인 벨리데이션(yyyymm형태)을 위한 변수
	upsertFlag:             'Y',
	//background: #6c5ffc !important;
	init: function(index, menuId, your, widgetType) {		  
		  var that = momWidget;	 
		  let gridId = index;
		  index--;

		 // var fileUpProgressBar = that.createFileUploadPop.progressBar(index,'파일업로드');
		
	
				  
		  if(index == 0 && widgetType!='DG'){
 			  //let uploadPop = that.createFileUploadPop.excelUp(index,'파일업로드');
			  //$('body').append(uploadPop);
			  //$('body').append(fileUpProgressBar);
			  var changePwPop = that.createChangePop.password(index,'비밀번호변경');
			  $('body').append(changePwPop);
			  let calendarPop = that.createPopup.calendarPop(index+1,'grid');
			  $('body').append(calendarPop);
			 
			  //$('head').append('<style type="text/css">.aui-grid-edit-column-left{background:#c7e8fd !important;color:black !important;text-align: left !important;}.aui-grid-edit-column-center{background:#c7e8fd !important;color:black !important;text-align: center !important;}.aui-grid-edit-column-right {background:#c7e8fd !important;color:black !important;text-align: right !important;}.aui-grid-default-column-center {background-color:rgb(250 250 250) !important;text-align: center !important;font-size: 1em !important;cursor: default !important;}.aui-grid-default-column-left {background-color:rgb(250 250 250) !important;text-align: left !important;font-size: 1em !important;cursor: default !important;}.aui-grid-default-column-right {background-color:rgb(250 250 250) !important;text-align: right !important;font-size: 1em !important;cursor: default !important;}</style>');			  
		  }
		  else if(index>=0 && widgetType=='DG' ){
			index = (index+1)*10;
			gridId = 1;
		  }
		  let uploadPop = that.createFileUploadPop.excelUp(index,'파일업로드');
		  $('body').append(uploadPop);
		  //$('body').css('background','#f0f0f5 !important;')
	      
		  that.your[index] = your; //스크립트 객체주입	
		  /*
		  ----------------------------------------------------------------------------------------------------------------------------------     
	      * 위젯 전역변수에 위젯정보 세팅 
		  ----------------------------------------------------------------------------------------------------------------------------------
		  */
		  mom_ajax('R', 'XUSM3030.defaultInfo', {menuId:menuId,gridId:gridId}, function(result1, data1) { //해당 페이지의 위젯정보 조회
		      if(result1 != 'SUCCESS' || data1.length == 0) {
		    	  momWidget.splashHide();
			      return;							     
		      }
		      var columnProp = []; // 메인그리드 컬럼정보
		      var excelDownProp = []; //엑셀다운그리드 컬럼정보
		      var excelUploadProp = []; // 엑셀업로드그리드 컬럼정보
		      var columnType = 'default';  //컬럼타입
		      var classItem  = []; // 클래스 정보
		      var searchItem = []; // 검색 필드 클래스 정보
		      var popupItem = []; // 팝업 필드 클래스 정보
		      var labelField = ''; 
		      var headerField = '';
		      var createPop = '';
		      var editPop = '';
		      var searchPop = '';	
		      var circleClass = '';
		      var textClass   = '';
		      var dropdownTmp = {};           
		      var gridString   = data1[0]['gridProperty']   == undefined ? '[]':data1[0]['gridProperty'];
		      var columnString = data1[0]['columnProperty'] == undefined ? '[]':data1[0]['columnProperty'];
		      var searchString = data1[0]['searchProperty'] == undefined ? '[]':data1[0]['searchProperty'];
		      var buttonString = data1[0]['buttonProperty'] == undefined ? '[]':data1[0]['buttonProperty'];
		      var popupString  = data1[0]['popupProperty']  == undefined ? '[]':data1[0]['popupProperty'];
		      that.searchComboItems = {};
		      that.editItem[index] = {};
		     // that.preComboItems[index] = {};
		
			  gridString   = gridString =='[]'   ? gridString   : gridString.substr(1,    gridString.length-2);
			  columnString = columnString =='[]' ? columnString : columnString.substr(1,  columnString.length-2);
			  searchString = searchString =='[]' ? searchString : searchString.substr(1,  searchString.length-2);
			  buttonString = buttonString =='[]' ? buttonString : buttonString.substr(1,  buttonString.length-2);
		      popupString  = popupString =='[]'  ? popupString  : popupString.substr(1,   popupString.length-2);
			
						 
			       
		    	  that.pageProperty[index]     = {programId:data1[0].programId,menuId:data1[0].menuId,templateId:data1[0].templateId,param:data1[0].param};
			      that.gridProperty[index]     = JSON.parse(gridString);
			      that.columnProperty[index]   = JSON.parse(columnString);
			      
			      that.searchProperty[index]   = JSON.parse(searchString);
			      that.buttonProperty[index]   = JSON.parse(buttonString);
			      that.popupProperty[index]    = JSON.parse(popupString);
			 /*   that.dropdownProperty[index] = JSON.parse(data[0].dropdownProperty);
			      that.popUpProperty[index]    = JSON.parse(data[0].popUpProperty);*/
			      
			 /*
			 ----------------------------------------------------------------------------------------------------------------------------------     
			 * 위젯 속성  seq 순으로 정렬 
			 ----------------------------------------------------------------------------------------------------------------------------------
			 */
			      that.columnProperty[index].sort(function(a,b){ return a.columnSeq-b.columnSeq});
			      that.buttonProperty[index].sort(function(a,b){ return a.buttonSeq-b.buttonSeq});
			      that.popupProperty[index].sort(function(a,b){ return a.popupSeq-b.popupSeq});		      
			  /*
			  ----------------------------------------------------------------------------------------------------------------------------------     
			  * 위젯세팅 정보 이용해 html 동적생성 
			  ----------------------------------------------------------------------------------------------------------------------------------			  
			  */ 
			  
			  if(Array.isArray(that.gridProperty[index]) == true && that.gridProperty[index].length !=0){
				  var gridExceptList = ['checkId','gridTitle','popupColNum','popupRowNum','popupTitle','headerColor','initSearch','showFindBtn']; 	
			      var gridExtraProp  = {'checkId':'checkId','gridTitle':'gridTitle','popupColNum':'popupColNum','popupRowNum':'popupRowNum','popupTitle':'popupTitle','headerColor':'headerColor','initSearch':'initSearch','showFindBtn':'showFindBtn'};
			      var searchBtn      =  '';
			      var gridPopYn      = '';
			      var templateInfo   = '';
			      var searchRowcnt   = that.searchProperty[index].length;
			      var searchBtnColSize = "col-xl-3";
			      if(searchRowcnt%3 == 1 ){
				      searchBtnColSize = "col-xl-9";
			      }
			      else if(searchRowcnt%3 == 2 ){
				      searchBtnColSize = "col-xl-6";
			      }
			      for(var i=0,max=gridExceptList.length; i<max;i++){
			    	   gridExtraProp[gridExceptList[i]] = that.gridProperty[index][0][gridExceptList[i]];			    	  
			    	   delete that.gridProperty[index][0][gridExceptList[i]];
			      }
			      that.gridExtraProperty[index] = gridExtraProp;
			      if(that.gridExtraProperty[index]['showFindBtn']==false){
			
				
				      searchBtn = '';
				      templateInfo = that.pageProperty[index]['templateId'].split('-');
			      }
			      else{
				        searchBtn = '<div class=" '+ searchBtnColSize+' align-self-center search-btn-group "><button type="button"  class=" align-self-center w-auto  px-4 py-2  searchField-Btn find btn-search" id=findBtn'+(index+1)+'><i class="fe fe-search me-2"></i>'+multiLang.transText('MESSAGE','MSG00042')+'</button></div>';
				        templateInfo = that.pageProperty[index]['templateId'].split('-');
			     }
			
			     // var popupTemplateInfo = ;
			      var splitNum     = Number(templateInfo[1]);
			      var splitType    = templateInfo[2];
			      var splitRatio   = templateInfo[3];			      			      
	              var templateName = 'tm'+splitNum+splitType;   
			  }
			
	              
	              
			      //var searchRowcnt = that.searchProperty[index].length;
			      var searchLineCnt = 0;
			      var searchStyle   = 'h00';
			      var remarkYn      = 'N'
			      var remarkInline  = 'Y';
			      var popupTotalNum   = that.popupProperty[index].length;
			      var popupColNum = that.gridExtraProperty[index]['popupColNum'] == undefined ? 3:Number(that.gridExtraProperty[index]['popupColNum']);
			      var popupRowNum = that.gridExtraProperty[index]['popupRowNum'] == undefined ? 3:Number(that.gridExtraProperty[index]['popupRowNum']);
			      if(popupTotalNum % popupColNum == 1 ){
				     remarkInline  = 'N';
			      }

			      for(var i=0,max=searchRowcnt; i<max;i++){	
		    		  if(that.searchProperty[index][i]['headerType']=='S'){
			    		  headerField = '<select id='+that.searchProperty[index][i]['searchId']+'Header'+'SP'+(index+1)+' class="searchSelectField"></select>';
			    	  }
			    	  
			    	  else if (that.searchProperty[index][i]['headerType']=='M'){
			    		  headerField = '<select id='+that.searchProperty[index][i]['searchId']+'Header'+'SP'+(index+1)+' class="searchSelectField"></select>';
			    	  }
			    	  else {
			    		  headerField = that.searchProperty[index][i]['columnRequire'] != 'Y' ? '<div multi-lang="" class="textblock">'+that.searchProperty[index][i]['searchNm']+'</div>': '<div multi-lang="" class="textblock orange">'+that.searchProperty[index][i]['searchNm']+'</div>';
			    	  }
			    		    		   
			    	  if(that.searchProperty[index][i]['searchType']=='S'){
			    		        labelField = '<select id='+that.searchProperty[index][i]['searchId']+'SP'+(index+1) +' class="mt-2 searchSelectField"></select>';
			    	  }
			    	  else if(that.searchProperty[index][i]['searchType']=='SS'){
		    			        labelField = '<select id='+that.searchProperty[index][i]['searchId']+'SP'+(index+1) + ' class="mt-2 searchSelectField-search-combo"></select>';
		    			   
			    	  }
			    	  else if(that.searchProperty[index][i]['searchType']=='MS'){
		    			        labelField = '<select id='+that.searchProperty[index][i]['searchId']+'SP'+(index+1) + ' class="mt-2 searchSelectField-search-combo"></select>';
		    			   
			    	  }
			    	  else if (that.searchProperty[index][i]['searchType']=='M'){
			    		        labelField = '<select id='+that.searchProperty[index][i]['searchId']+'SP'+(index+1) +' class="mt-2 searchSelectField"></select>';
			    	  }
			    	   else if (that.searchProperty[index][i]['searchType']=='C'){
			    		        labelField = '<div id='+that.searchProperty[index][i]['searchId']+'SP'+(index+1) +' class="searchSelectField mt-2"></div>';
			    	  }
			    	  else if (that.searchProperty[index][i]['searchType']=='CP'){
			    		        labelField = '<div id='+that.searchProperty[index][i]['searchId']+'SD'+(index+1)+' class="mt-3 fromDateField searchSelectField"></div>' +'<div id="fromToIcon" class="mt-3 fromToIcon" >~</div>'+ '<div id='+that.searchProperty[index][i]['searchId']+'ED'+(index+1)+' class="mt-3 toDateField searchSelectField"></div>';
			    	  }
			    	  else{
			    		    labelField = '<input maxlength="256" id='+that.searchProperty[index][i]['searchId']+'SP'+(index+1) +' input-type="text" type="text" class="form-control w-input searchInputField" date-format="date"></input>';
			    	  }
			    	  searchItem[i] =  {	  			    	  
				    	  searchId:         that.searchProperty[index][i]['searchId'],
				    	  searchNm:         that.searchProperty[index][i]['searchNm'],
				    	  labelTextClass:   that.searchProperty[index][i]['columnRequire'] == 'N' ? 'textblock' : 'textblock orange',
				    	  circelClass:      that.searchProperty[index][i]['columnRequire'] == 'N' ? 'circle' : 'circle bg-orange',
				      	  searchSeq:        that.searchProperty[index][i]['searchSeq'],
				    	  defaultValue:     that.searchProperty[index][i]['defaultValue'],
				    	  searchType:       that.searchProperty[index][i]['searchType'],
				    	  dropdownId:       that.searchProperty[index][i]['dropdownId'],
				    	  headerLabelType:  that.searchProperty[index][i]['headerType'],
				    	  headerDropdownId: that.searchProperty[index][i]['headerDropdownId'],
				    	  columnRequire:    that.searchProperty[index][i]['columnRequire'],
				    	  headerField:      headerField,
				    	  labelField:       labelField
		              };
			      }
			      searchItem.sort(function(a,b){ return a.searchSeq-b.searchSeq});
			      
			      if(searchRowcnt == 0){
			    	    searchLineCnt = 0;
			    	    searchStyle = 'h00';
			    	    $('body').css('top','-0.2rem');
			      } 
			      else if(searchRowcnt > 0 && searchRowcnt <=3){
			    	    searchLineCnt = 1;
			    	    searchStyle = 'h01';
			    	    classItem[0] = {
					    		        // searchAreaClass:'searchArea-h01',
					    		         searchAreaClass:'"col-xl-12'+' searchArea-h01'+' pt-2"',
					    		         searchItemClass:'"col-xl-3 mb-2  align-self-center searchItem-h01"',
					    			     labelBoxClass:'"mx-4 mt-2 labelbox-col3"',
					    			     index:index+1
			             }
			        var searchAreaHtml  = that.createSearchArea.h01(classItem,searchItem,searchBtn);	      
			     }
			     else if (searchRowcnt > 3 && searchRowcnt <=6){
			    	 searchLineCnt = 2;
			    	 searchStyle = 'h02';
			    	   classItem[0] = {
			    		         searchAreaClass:'"col-xl-12'+' searchArea-h02'+' pt-2"', 
			    		         searchItemClass:'"col-xl-3 mb-2 mt-2 align-self-center searchItem-h02"',
			    		         labelBoxClass:'"mx-4 mt-2 labelbox-col3"'	,
			    		         index:index+1
			    				
			             }
			    	var searchAreaHtml  = that.createSearchArea.h02(classItem,searchItem,searchBtn);	 
			     }
			       else if (searchRowcnt > 6 && searchRowcnt <=9){
			    	 searchLineCnt = 3;
			    	 searchStyle = 'h03';
			    	   classItem[0] = {
			    		         searchAreaClass:'"col-xl-12'+' searchArea-h03'+' pt-2"', 
			    		         searchItemClass:'"col-xl-3 mb-2 align-self-center searchItem-h03"',
			    		         labelBoxClass:'"mx-4 mt-2 labelbox-col3"'	,
			    		         index:index+1
			    				
			             }
			    	var searchAreaHtml  = that.createSearchArea.h03(classItem,searchItem,searchBtn);	 
			     }
			     else{
			  	       classItem[0] = {
		    		        // searchAreaClass:'searchArea-h01',
		    		         searchAreaClass:'"col-xl-12'+' searchArea-h03'+' pt-2"', 
		    		         searchItemClass:'"col-xl-3 mb-2 align-self-center searchItem-h03"',
		    		         labelBoxClass:'"mx-4 mt-2 labelbox-col3"'	 ,
		    		         index:index+1
		              }
		             var searchAreaHtml  = that.createSearchArea.h01(classItem,searchItem,searchBtn);	  
			    	 
			     }
			     
			     for(var i=0,max=that.popupProperty[index].length;i<max;i++){
			    	  if(that.popupProperty[index][i]['columnRequire']== "Y"){
			    		    circleClass = 'circle-bg-orange';
			    		    textClass   =  'textblock-orange';
			    		    
			    	  }
			    	  else{
			      		    circleClass = 'circle';
			    		    textClass   = 'textblock';
			    	  }
			    	  
		    		  if(that.popupProperty[index][i]['popupType']=='S' || that.popupProperty[index][i]['popupType'] == 'M'){
		    			   labelField = '<select id='+that.popupProperty[index][i]['popupId']+'DP'+(index+1)+' class="popupSelectField"></select>';
		    			  
			    	  }
			    	  else if(that.popupProperty[index][i]['popupType']=='SS'){
		    			   labelField = '<select id='+that.popupProperty[index][i]['popupId']+'DP'+(index+1)+' class="popupSelectField-popup-combo"></select>';
		    			   
			    	  }
		    		  else if (that.popupProperty[index][i]['popupType']=='C'){
		    			  labelField  = '<input maxlength="256" id='+that.popupProperty[index][i]['popupId']+'DP'+(index+1)+' type="datepicker"  class="w-input popupInputField" date-format="date"></input>';
		    			  
		    		  }
		    		  else if (that.popupProperty[index][i]['popupType']=='C-HM'){
		    			  labelField  = '<input  id='+that.popupProperty[index][i]['popupId']+'DP'+(index+1)+' type="time"  class="w-input popupInputField"></input>';
		    			  
		    		  }
		    		  else if (that.popupProperty[index][i]['popupType']=='P'){
		    			  labelField  = '<input maxlength="50" id='+that.popupProperty[index][i]['popupId']+'DP'+(index+1)+' type="password"  class="w-input passwordInputField" date-format="date"></input><button id="changePwBtn'+(index+1)+'" type="button" class="btn btn-icon  btn-change" style="display: none;"><i class="mdi mdi-settings"style="font-size: 1.25rem;"></i></button>';
		    			  
		    		  }
		    		  else if (that.popupProperty[index][i]['popupType']=='DS'){
		    			  labelField  = '<textarea class="remark C'+popupColNum+'"  rows="5" maxlength="500" id='+that.popupProperty[index][i]['popupId']+'DP'+(index+1)+'></textarea>';
		    			  remarkYn    = 'Y';
		    		  }
		    		  else if(that.popupProperty[index][i]['popupType']=='DG'){			  
			    		  labelField  = '<select maxlength="256" id='+that.popupProperty[index][i]['popupId']+'DP'+(index+1)+'  class="gridPop'+(index+1)+ ' grid-popup popupSelectField"></select>';
			    	  }
			    	  else {
			    		  labelField  = '<input maxlength="256" id='+that.popupProperty[index][i]['popupId']+'DP'+(index+1)+' type="text" type="text" class="w-input popupInputField" date-format="date"></input>';
			    	  }
			    
		    		  			    	  
			    	  popupItem[i] =  {	  			    	  
				    	  popupId:          that.popupProperty[index][i]['popupId'],
				    	  popupNm:          that.popupProperty[index][i]['popupNm'],
				      	  popupSeq:         that.popupProperty[index][i]['popupSeq'],
				    	  defaultVlue:      that.popupProperty[index][i]['defaultValue'],
				    	  columnRequire:    that.popupProperty[index][i]['columnRequire'],
				    	  popupType:        that.popupProperty[index][i]['popupType'],
				    	  labelField:       labelField,
				    	  circleClass:      circleClass,
				          textClass:        textClass
		              };
		              
			      }
			      
			     // searchAreaHtml = searchAreaHtml.replace(/#{searchAreaClass}/gi, classItem[0].searchAreaClass).replace(/#{searchItemClass}/gi, classItem[0].searchItemClass).replace(/#{labelBoxClass}/gi, classItem[0].labelBoxClass).replace(/#{circelClass}/gi, classItem[0].circelClass).replace(/#{labelTextClass}/gi, classItem[0].labelTextClass)replace(/#{searchNm}/gi, classItem[0].searchNm).replace(/#{labelField}/gi, classItem[0].labelField);
			 
				   if(that.gridProperty[index][0]['showFooter'] == true || that.gridProperty[index][0]['usePaging']== true){
					   if(that.gridProperty[index][0]['showFooter'] == true || that.gridProperty[index][0]['showFooter']== true){
						   if(searchStyle =='h00'){
						       var gridAreaHtml    = that.createGridArea.h00(index+1,'grid'+(index+1),'gridArea-'+templateName+'-'+searchStyle+'-'+'0'+(index+1)+'-'+'footer-paging'); 
					        }
						    else if(searchStyle =='h01'){
							   var gridAreaHtml    = that.createGridArea.h01(index+1,'grid'+(index+1),'gridArea-'+templateName+'-'+searchStyle+'-'+'0'+(index+1)+'-'+'footer-paging'); 
						    } 
						    else if(searchStyle =='h02'){
							 var gridAreaHtml    = that.createGridArea.h02(index+1,'grid'+(index+1),'gridArea-'+templateName+'-'+searchStyle+'-'+'0'+(index+1)+'-'+'footer-paging'); 
						    } 
						    else if(searchStyle =='h03'){
							 var gridAreaHtml    = that.createGridArea.h03(index+1,'grid'+(index+1),'gridArea-'+templateName+'-'+searchStyle+'-'+'0'+(index+1)+'-'+'footer-paging'); 
						    } 
					   }
					   else{
							if(searchStyle =='h00'){
						    var gridAreaHtml    = that.createGridArea.h00(index+1,'grid'+(index+1),'gridArea-'+templateName+'-'+searchStyle+'-'+'0'+(index+1)+'-'+'paging'); 
					        }
					        else if(searchStyle =='h01'){
						    var gridAreaHtml    = that.createGridArea.h01(index+1,'grid'+(index+1),'gridArea-'+templateName+'-'+searchStyle+'-'+'0'+(index+1)+'-'+'paging'); 
					        } 
							else if(searchStyle =='h02'){
								 var gridAreaHtml    = that.createGridArea.h02(index+1,'grid'+(index+1),'gridArea-'+templateName+'-'+searchStyle+'-'+'0'+(index+1)+'-'+'paging'); 
							} 
							else if(searchStyle =='h03'){
								 var gridAreaHtml    = that.createGridArea.h03(index+1,'grid'+(index+1),'gridArea-'+templateName+'-'+searchStyle+'-'+'0'+(index+1)+'-'+'paging'); 
							} 
						}

				 }
				 else{
					   if(momWidget.gridProperty[index][0]['showFooter']){
						  if(searchStyle =='h00'){
						    var gridAreaHtml    = that.createGridArea.h00(index+1,'grid'+(index+1),'gridArea-'+templateName+'-'+searchStyle+'-'+'0'+(index+1)+'-'+'footer'); 
						  }
						  else if(searchStyle =='h01'){
								  var gridAreaHtml    = that.createGridArea.h01(index+1,'grid'+(index+1),'gridArea-'+templateName+'-'+searchStyle+'-'+'0'+(index+1)+'-'+'footer'); 
					      } 
						  else if(searchStyle =='h02'){
							 var gridAreaHtml    = that.createGridArea.h02(index+1,'grid'+(index+1),'gridArea-'+templateName+'-'+searchStyle+'-'+'0'+(index+1)+'-'+'footer'); 
						  } 
						  else if(searchStyle =='h03'){
							 var gridAreaHtml    = that.createGridArea.h03(index+1,'grid'+(index+1),'gridArea-'+templateName+'-'+searchStyle+'-'+'0'+(index+1)+'-'+'footer'); 
						  } 
					   }
					   else{
						if(searchStyle =='h00'){
						 var gridAreaHtml    = that.createGridArea.h00(index+1,'grid'+(index+1),'gridArea-'+templateName+'-'+searchStyle+'-'+'0'+(index+1)); 
						}
						else if(searchStyle =='h01'){
							  var gridAreaHtml    = that.createGridArea.h01(index+1,'grid'+(index+1),'gridArea-'+templateName+'-'+searchStyle+'-'+'0'+(index+1)); 
						} 
						else if(searchStyle =='h02'){
							 var gridAreaHtml    = that.createGridArea.h02(index+1,'grid'+(index+1),'gridArea-'+templateName+'-'+searchStyle+'-'+'0'+(index+1)); 
						} 
						else if(searchStyle =='h03'){
							 var gridAreaHtml    = that.createGridArea.h03(index+1,'grid'+(index+1),'gridArea-'+templateName+'-'+searchStyle+'-'+'0'+(index+1)); 
						} 
					 }
					
					
				}
				
				
			   
			    
			      var gridTabRightHtml = that.createGridTabArea.rightTab(index+1,that.buttonProperty[index]);
			      var gridTabLeftHtml  = that.createGridTabArea.leftTab(index+1,that.gridExtraProperty[index]['gridTitle'],that.buttonProperty[index]);			      
			      var widthUse = 'Y';
			      var excelShow = 'N';
			      var excelTmpShow = 'N';
			      var gridShow = 'Y';
			      var isCheckBox = 'N';
			      var isDropDown ='N';
			      var columnId = '';
			      var isRequire = 'N';
			      var sortTmp   = [];
		          var groupHeader = 'N';
			      var popupAreaHtml = '';
			      var isCellMerge = false;
			     // let gridPopIndex = ($('.grid-pop').length +1)*10 +1;
			        let gridPopIndex = (index +1)*10 +1;
			      if(index == 0 ){				    
			    		 var createFrontArea ={};  
			    			createFrontArea["tm1st"] = that.tm1st;
			    			createFrontArea["tm2h"]  = that.tm2h;
			    			createFrontArea["tm2v"]  = that.tm2v;  
			    			createFrontArea["tm3vh"]  = that.tm3vh; 
			    		    createFrontArea["tm3hv"]  = that.tm3hv; 
			    			createFrontArea["tm4vvh"]  = that.tm4vvh;
			    		    createFrontArea[templateName](index+1,splitRatio,'contentArea',"#front_main");
			    		    $('#contentArea'+(index+1)).append(searchAreaHtml); 	
			    	 }
			    	  else if(index >0 && index%10 ==0){				    
			    		 var createFrontArea ={};  
			    			createFrontArea["tm1st"] = that.tm1st;
			    			createFrontArea["tm2h"]  = that.tm2h;
			    			createFrontArea["tm2v"]  = that.tm2v;  
			    			createFrontArea["tm3vh"]  = that.tm3vh; 
			    		    createFrontArea["tm3hv"]  = that.tm3hv; 
			    			createFrontArea["tm4vvh"]  = that.tm4vvh;
			    		    createFrontArea[templateName](index+1,splitRatio,'contentArea',"#popup_main"+(index+1));
			    		    $('#contentArea'+(index+1)).append(searchAreaHtml); 	
			    	 }
			    		    				    	
				     
			    	 if(that.popupProperty[index].length > 0){	
					      popupAreaHtml = that.createPopup.defaultPop(index+1,popupColNum,popupRowNum,popupItem,that.gridExtraProperty[index]['popupTitle'],remarkYn,remarkInline);		    		 
			    		  $('body').append(popupAreaHtml);
			    	 }  
			    		
                     for(let i=0,max=that.buttonProperty[index].length;i<max;i++){
					    
						if(that.buttonProperty[index][i]['buttonType']=='DG'){
							 popupAreaHtml = that.createPopup.gridPop(index+1,gridPopIndex,that.buttonProperty[index][i]['popupGridId'],that.buttonProperty[index][i]['buttonId'],'팝업타이틀');							 								    		 
			    		    $('body').append(popupAreaHtml);
			    		    gridPopIndex = ($('.grid-pop').length +1)*10 +1;
			    		    // gridPopIndex = (index+1)*10 +1;
			    		    //that.buttonProperty[index][i]['customType'] = 'DG';
			    		    //break;
						}
						else if(that.buttonProperty[index][i]['buttonType']=='CP'){	
												
							that.createCustomPop(index,that.buttonProperty[index][i]['popupGridId'],that.buttonProperty[index][i]['buttonId'],that.buttonProperty[index][i]['eventType']);
							//that.buttonProperty[index][i]['customType'] = 'CP';
						}
						
				        else{
									//that.buttonProperty[index][i]['customType'] = 'GRID';
				        }
					 }
					 $('#contentArea'+(index+1)).append(gridAreaHtml); 
				  	
			         $('.gridTab'+(index+1)).append(gridTabLeftHtml);
			         $('.gridTab'+(index+1)).append(gridTabRightHtml);
			
			         $('body').append('<div id="excelArea' + (index + 1) + '" style="width:100%; position:fixed; height:100%; z-index: -999; top:0px"><div id="excelGrid' + (index + 1)  + '"></div><div id="excelTmpGrid' + (index + 1)  + '"></div></div>');					
			         for(var i=0,max=that.columnProperty[index].length;i<max;i++){	
			    	   columnType = that.columnProperty[index][i]['columnEditable'] == 'N' ? 'default':'edit';	
			    	   widthUse = that.columnProperty[index][i]['columnWidth']  == 0 ? 'N': 'Y';
			    	   excelShow = that.columnProperty[index][i]['excelShow']  == 'Y' ? 'Y': 'N';
			    	   excelTemplateShow = that.columnProperty[index][i]['excelTemplateShow']  == 'Y' ? 'Y': 'N';
			    	   gridShow = that.columnProperty[index][i]['columnShow']  == 'Y' ? true: false;
			    	   excelDownShow   = that.columnProperty[index][i]['excelShow'] == 'Y' ? true: false;
			    	   excelUploadShow = that.columnProperty[index][i]['excelTemplateShow'] == 'Y' ? true: false;
			    	   isCheckBox = that.columnProperty[index][i]['columnType'] == 'CK' ? 'Y': 'N';
			    	   isDropDown = that.columnProperty[index][i]['columnType'] == 'S' ? 'Y': momWidget.columnProperty[index][i]['columnType'] == 'M' ? 'Y':'N';
			    	   isCalendar = that.columnProperty[index][i]['columnType'] == 'C' ? 'Y': 'N';
			    	   columnId = that.columnProperty[index][i]['columnId'];
			    	   isRequire = that.columnProperty[index][i]['columnRequire'] == 'Y' ? 'Y': 'N';
			    	   sortType = that.columnProperty[index][i]['sortMethod'] == 'ASC' ? 1: -1;
			    	   sortNo   = that.columnProperty[index][i]['sortNo'] == '' ? 0: that.columnProperty[index][i]['sortNo'];
			    	   isCellMerge = that.columnProperty[index][i]['cellMerge'] == '' ? false : that.columnProperty[index][i]['cellMerge'] == 'Y' ? true: false;
			    	  // groupHeader  = that.columnProperty[index][i]['columnType'] == 'G' ? 'Y': 'N';
			    	   
			    	   if(sortNo > 0){
							sortTmp.push({dataField : columnId, sortType : sortType,sortNo:sortNo}) ;
					   }
			    	   
			    	 //that.columnProperty[index].splice(i,1);
			    	
							  columnProp[i] =  {
								    	      dataField 	: columnId 
								  			, headerText 	: that.columnProperty[index][i]['columnNm'] 
									   		, dataType      : that.columnProperty[index][i]['dataType'] 
											, formatString  : that.columnProperty[index][i]['dataFormat']											
				    	                    , editable      : that.columnProperty[index][i]['columnEditable']  == 'Y' ? true : that.columnProperty[index][i]['columnCreate']  == 'Y' ? true : false
								  			, style			: that.columnProperty[index][i]['columnAlign']  == 'LEFT' ? 'aui-grid-'+columnType+'-column-left': that.columnProperty[index][i]['columnAlign'] == 'RIGHT'? 'aui-grid-'+columnType+'-column-right' : 'aui-grid-'+columnType+'-column-center'	
								  			, visible       : gridShow 
								  			, mergePolicy : "restrict" 
								  			, cellMerge : isCellMerge 
								  			, filter : {
										      showIcon : true
											}
								  		
				                    };
							
				
			    	 
	                    if(excelDownShow){
						    excelDownProp.push({
									    	      dataField 	: columnId 
									  			, headerText 	: that.columnProperty[index][i]['columnNm'] 
										   		, dataType      : that.columnProperty[index][i]['dataType'] 
												, formatString  : that.columnProperty[index][i]['dataFormat']
					    	                    , editable      : that.columnProperty[index][i]['columnEditable']  == 'Y' ? true : false  
					    	                    , headerStyle   : isRequire == 'Y' ? "my-header-style-require":"my-header-style-default"
									  			, style			: that.columnProperty[index][i]['columnAlign']  == 'LEFT' ? 'aui-grid-'+columnType+'-column-left': that.columnProperty[index][i]['columnAlign'] == 'RIGHT'? 'aui-grid-'+columnType+'-column-right' : 'aui-grid-'+columnType+'-column-center'	
									  			, visible       : excelDownShow
									  			, mergePolicy : "restrict"
									  			, cellMerge : isCellMerge 
									  		 
					                    });
					      if(widthUse == 'Y'){
			    		  excelDownProp[excelDownProp.length - 1].width  = that.columnProperty[index][i]['columnWidth'];
			    		
			    	   }
						}
			    	
	                    if(excelUploadShow){
		 			/*	if(excelUploadProp.length==0){
				      		excelUploadProp.push({
										    	      dataField 	: 'valMsg' 
										  			, headerText 	: 'Result'
										  			, headerStyle   : "my-header-style-default"
											   		, dataType      : "string"
													, formatString  : ""
						    	                    , editable      : false
										  			, style			: 'aui-grid-default-column-left'
										  		    , visible       : false
						                     }); 
								}*/
							   excelUploadProp.push({
										    	      dataField 	: columnId 
										  			, headerText 	: that.columnProperty[index][i]['columnNm'] 
										  			, headerStyle   : isRequire == 'Y' ? "my-header-style-require":"my-header-style-default"
											   		, dataType      : that.columnProperty[index][i]['dataType'] 
													, formatString  : that.columnProperty[index][i]['dataFormat']
						    	                    , editable      : that.columnProperty[index][i]['columnEditable']  == 'Y' ? true : false
										  			, style			: that.columnProperty[index][i]['columnAlign']  == 'LEFT' ? 'aui-grid-'+columnType+'-column-left': that.columnProperty[index][i]['columnAlign'] == 'RIGHT'? 'aui-grid-'+columnType+'-column-right' : 'aui-grid-'+columnType+'-column-center'
										  		    , visible       : true
						                     }); 
						 
				
			    	         if(widthUse == 'Y'){			    		  
			    		     excelUploadProp[excelUploadProp.length - 1].width = that.columnProperty[index][i]['columnWidth'];
			    	   }
			    	         
						}
			    	 
			    	   if(widthUse == 'Y'){
			    		   columnProp[i].width      = that.columnProperty[index][i]['columnWidth'];
			    		
			    	   }
			    	   if(isCheckBox =='Y'){
			    		   columnProp[i].renderer = {
									          type: 'CheckBoxEditRenderer'
											, editable: true
											, checkValue : 'Y' 
											, unCheckValue : 'N'
											
										};
			    		   
			    		 /*  columnProp[i].headerRenderer = { 
			    				type : "CheckBoxHeaderRenderer",
			    				position : "right",
			    				dependentMode : true
			    				//onClick : myHeaderCheckClick 
			    			};*/
			    	   }
			    	   if(isDropDown =='Y'){
			    		   let dropDownQueryId = that.columnProperty[index][i]['dropdownId'];		    		   
			    		   //var nameSpace = 'DD' + that.pageProperty[index]['programId'].substr(2,2);
			    		   let nameSpace = 'DD';
			    		   let param = {};
			    		   let dropdownParamArry =[];
			    		   let dropdownParamText = that.columnProperty[index][i]['dropdownParam'];
			    		   //var dropdownTmp = {};			    		 
			    		   	
				                  dropdownParamArry = dropdownParamText.split(',');
				                  for(let i=0;i<dropdownParamArry.length;i++){
										param[dropdownParamArry[i].split('=')[0]]=dropdownParamArry[i].split('=')[1];
							     }
							   							
							     if(dropDownQueryId == 'DD00001'){
			    			          dropDownQueryId = 'DD.DD00001';

			    		   }
			    		   else{			    			  
			    			   dropDownQueryId = nameSpace +'.'+dropDownQueryId;
			    			   
			    		   }
			    		   mom_ajax('R', dropDownQueryId, param, function(result2, data2) {
			    			   if(data2.length==0) {
			    				      return;
			    				      momWidget.splashHide();
			    			      } 
			    			    dropdownTmp[columnId] = data2;
			    			   // that.columnDropdown[index]= dropdownTmp;
			    			    columnProp[i].labelFunction = function(rowIndex, columnIndex, value, item) { 
					               	 var retStr = "";
					               	 
					               	 var comboList = that.columnDropdown[index][that.columnProperty[index][columnIndex]['columnId']];
					       			 for(var i=0,len=comboList.length; i<len; i++) {
					       					  if(comboList[i]["code"] == value) {
					           					retStr = comboList[i]["label"];
					           					break;
					           				  } 				    				
					       			 }
					       			return retStr == "" ? value : retStr;			                  
					   			   };	
					    		   columnProp[i].editRenderer = {			    				   
								   				type: 'ComboBoxRenderer',
								   				autoCompleteMode : true,  // 자동완성 모드 설정
								   				matchFromFirst : true,  // 처음부터 매치가 아닌 단순 포함되는 자동완성
								   				autoEasyMode : false,     // 자동완성 모드일 때 자동 선택할지 여부 (기본값 : false)
								   				showEditorBtnOver: true, // 에디터 버튼 마우스 올릴시 보여줄지
								   				listAlign:'left',        // 라벨 정렬
								   				/*list: that.columnDropdown[index][that.columnProperty[index][columnIndex]['columnId']],*/
								   				keyField: 'code', 
								   				valueField: 'label' ,
								   			    listFunction : function(rowIndex, columnIndex, item, dataField) {											    					   			    
								   			                /*if(that.columnDropdownReSearch[index][that.columnProperty[index][columnIndex]['columnId']]){
									                                   
															}*/
									                        return that.columnDropdown[index][that.columnProperty[index][columnIndex]['columnId']];									 
								                           
								                }
							/*validator : function(oldValue, newValue, item) {
								var isValid = false;
								for(var i=0, len=that.columnDropdown[index][columnId].length; i<len; i++) { // keyValueList 있는 값만..
									if(that.columnDropdown[index][columnId][i]["code"] == newValue) {
										isValid = true;
										break;
									}
								}
								// 리턴값은 Object 이며 validate 의 값이 true 라면 패스, false 라면 message 를 띄움
								return { "validate" : isValid, "message"  : "리스트에 있는 값만 선택(입력) 가능합니다." };
				} */                                                                 
						           };
					    		
			    		   }, undefined, undefined, this, false,'Y');
			    	
			    	   }
			    	   else if(isCalendar =='Y'){
				 				/*columnProp[i].dateInputFormat = "yyymmdd"; // 실제 데이터의 형식 지정
				 				columnProp[i].formatString = "yyyy년 mm월 dd일", // 실제 데이터 형식을 어떻게 표시할지 지정
				 				columnProp[i].dateType = 'date';
				 				columnProp[i].width = 160;
				 				columnProp[i].renderer = {
																type : "IconRenderer",
																iconWidth : 16, // icon 사이즈, 지정하지 않으면 rowHeight에 맞게 기본값 적용됨
																iconHeight : 16,
																iconPosition : "aisleRight",
																iconTableRef :  { // icon 값 참조할 테이블 레퍼런스
																	"default" : "../content/icon/calendar-icon.png" // default
																},
																onClick : function(event) {
																	// 달력 아이콘 클릭하면 실제로 달력을 띄움.
																	// 즉, 수정으로 진입함.
																	AUIGrid.openInputer(event.pid);
															    }

								};
								columnProp[i].editRenderer = {
																	type : "JQCalendarRenderer", // jquery-datepicker 달력 렌더러 사용
																	defaultFormat : "yyyymmdd", // 달력 선택 시 데이터에 적용되는 날짜 형식
																	uncheckDateValue : "-", // Clear 버턴 클릭 시 적용될 값.
																	showEditorBtn : false,
																	showEditorBtnOver : false,
																	onlyCalendar : false, // 사용자 입력 불가, 즉 달력으로만 날짜입력 (기본값 : true)
																	openDirectly : true, // 에디팅 진입 시 바로 달력 열기
																	
																	jqOpts : {
																		changeMonth: true,
																		changeYear: true,
																		selectOtherMonths : true,
																		showOtherMonths: true,
																		dayNamesMin: [ "일", "월", "화", "수", "목", "금", "토" ],
																		monthNamesShort: [ "1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월" ]
																	} 
							   };*/
								
					   }
			    	   
			    /*	  if(groupHeader =='Y'){
				          var childrenTmp =[];
				          var childrenColumn = JSON.parse(momWidget.columnProperty[index][i]['groupingColumn'].replace(/\'/gi, '"'));
				          for(var k=0,max4=that.columnProperty[index].length;k<max4;k++){	
					           for(var k2=0,max5=Object.keys(childrenColumn[0]).length;k2<max5;k2++){
						             if(that.columnProperty[index][k]['columnId'] == childrenColumn[0]['columnId'+(k2+1)] ){
							             childrenTmp.push(columnProp[k]);
										 delete columnProp[k];
										 
										 		
									 }
					           }
						  }
						  columnProp.children = childrenTmp;
								
						} */
			    	   
			    	   
			    	   	
			      } 	
			      		    that.columnDropdown[index]= dropdownTmp;
			      		    
				          var childrenTmp =[];
				          var childrenColumn = [];
				          var parentId = '';
				          var deleteColumn = [];
				         
				          for(var k=0,max4=that.columnProperty[index].length;k<max4;k++){	
					               if(that.columnProperty[index][k]['columnType'] != 'G' ){
						                  continue;
										}
										parentId = that.columnProperty[index][k]['columnId'];
										//Object.keys(childrenColumn[0]).lengt
									childrenColumn = JSON.parse(momWidget.columnProperty[index][k]['groupingColumn'].replace(/\'/gi, '"'));
							for(var k2=0,max5=columnProp.length;k2<max5;k2++){		
					           for(var k3=0,max6=Object.keys(childrenColumn[0]).length;k3<max6;k3++){
						             if(columnProp[k2]['dataField'] == childrenColumn[0]['columnId'+(k3+1)] ){
							             childrenTmp.push(columnProp[k2]);
							             deleteColumn.push({index:k2});
										
										 
										 		
									 }
					           }
					            
					        }
					        	for(var k4=0,max7=columnProp.length;k4<max7;k4++){		
					              if(parentId == columnProp[k4]['dataField']){
											columnProp[k4].children = childrenTmp;
										}
					            
					        }
					    
					         
					        childrenTmp =[];
					        parentId = '';
						  }
						   for(var k5=0,max8=deleteColumn.length;k5<max8;k5++){		
					            delete columnProp[deleteColumn[k5]['index']];
					            
					        }
						var filteredColumnProp = columnProp.filter(function (el) {
							  return el != null;
							});		
						 	
			         sortTmp.sort(function(a,b){ return a.sortNo-b.sortNo});	
			         for(var k=0,max5=sortTmp.length;k<max5;k++){	
				         delete sortTmp[k]['sortNo'];
					}
			        that.sortingInfo[index] = sortTmp;		     
	          	    that.excelDownProperty[index]   = excelDownProp; 
				/*	excelUploadProp.unshift({
										    	      dataField 	: 'validateYn'
										  			, headerText 	: '검사여부' 
										  			, headerStyle   : "my-header-style-default"
											   		, dataType      : 'string'
						    	                    , editable      :  false
										  			, style			: 'aui-grid-default-column-center'
										  		    , visible       : false
						                     }); */
			    		
			    	   
			   	    that.excelUploadProperty[index] = excelUploadProp; 
					var excelUploadProp = that.excelUploadProperty[index];				
					that.excelDownGrid[index]   = AUIGrid.create('#excelGrid' + (index + 1), that.excelDownProperty[index], that.gridProperty[index]);	
					that.excelTmpGrid[index]     = AUIGrid.create('#excelTmpGrid' + (index + 1), that.excelUploadProperty[index], that.gridProperty[index]);	
			  	    var isExist = document.getElementById('grid' + (index + 1));
				    if(isExist == undefined) {
					/* that.messageBox({type:'danger', width:'400', height: '145', html: 'grid' + (index + 1) + '가 존재하지 않습니다.'});
					 return;*/
					 
				    }
                    else{
	                      if(momWidget.gridProperty[index][0]['usePaging']){
		                  /*   that.gridProperty[index][0]['pagingInfoLabelFunction'] = 	function(currentPage, totalPageCount, currentTopNumber, currentBottomNumber, dataLen) {
							 return "현재페이징 : " + currentPage + " / 전체페이징 : " + totalPageCount + "( " + currentTopNumber + "~" + dataLen + " 개 )";
						     };	*/
						  }
	     					 that.columnProp[index] = filteredColumnProp;
	     					
							 that.grid[index] = AUIGrid.create('#grid'+(index+1), filteredColumnProp, that.gridProperty[index][0]); 
					}
		
	           
			     
			      
			      $('td').removeClass('aui-grid-default-column');
			      that.startPage[index]    = 1;
			      that.endPage[index]      = momWidget.gridProperty[0][0]['pageRowCount'] == undefined ? 20:momWidget.gridProperty[0][0]['pageRowCount'];
	}, undefined, undefined, this, false);
	
		
			
			 
			  
			 
		  									
		  /*
		  ----------------------------------------------------------------------------------------------------------------------------------     
		  * 화면별 이벤트 세팅 
		  ----------------------------------------------------------------------------------------------------------------------------------
		  */																							
			
			//that.setAddBtnEvent(index, your);				    // 행추가버튼 이벤트 핸들러 등록
			that.setComboBoxSet(index,your);                    // 콤보박스 공통 이벤트 처리
		    that.setSearchSet(index, your);                     // 검색조건 세팅
		    that.setBtnEvent(index, your);					    // 버튼이벤트 세팅
		    that.setGridEvent(index,your);                      // 그리드이벤트 세팅(셀클릭,체크박스클릭,편집 등)
		    that.setKeyEvent(index,your); 					    // 버튼이벤트 세팅 (엔터,기타..)
		    that.htmlResize(index,your);                        // 해상도 변경시 html 사이즈 조절 
		    if(that.gridProperty[index][0]['usePaging'] ==true){ //페이징사용
				if(that.gridExtraProperty[index]['initSearch']=='Y'){
				 // that.backWork[index] = 'Y';		
				  that.findBtnClicked(index,  {startPage:1,endPage:1}, true, 'TOTAL',momWidget.pageProperty[0]['programId'],your);	
		    	  that.findBtnClicked(index, {startPage:1,endPage:that.gridProperty[index][0]['pageRowCount']}, true, 'INIT_PAGING',momWidget.pageProperty[0]['programId'],your);
		    	//  that.findBtnClicked(index, {}, true, 'BACK',menuId,your);
		    	}
		    	else{
			      that.backWork[index] = 'Y';
			      that.findBtnClicked(index,  {startPage:1,endPage:1}, true, 'TOTAL',momWidget.pageProperty[0]['programId'],your);			
			  	  that.findBtnClicked(index, {}, true, 'BACK',momWidget.pageProperty[0]['programId'],your);
				}
			  
		    }
		    else{//페이징 미사용
				if(that.gridExtraProperty[index]['initSearch']=='Y'){
					if(index>0 && index%10 == 0){
						  						
					}
					else{
						that.findBtnClicked(index, {}, true, 'INIT',momWidget.pageProperty[0]['programId'],your);
					}
						
					
		    	    
		        }
			}
		  
		    
		
		   // multiLang.transLang();
			//that.procProcessTran(index, your);					// 자리 이동
			
			//setTimeout(that.backProc, 0, index, your, pageId);			
			/*that.procAddDelSaveBtn(index, your);				// 등록버튼 이벤트 핸들러 등록
																// 설정
			that.procEditBtn(index, your);						// Edit 버튼 이벤트, 수정
																// 팝업 생성 및 데이터 복사
			that.procCopyBtn(index, your);						// 복사 버튼 이벤트, 내리기 버튼
			that.procExcelDown(index, pageId, your);			// Excel Download 버튼
																// 이벤트
			that.procExcelDownAll(index, pageId, your);			// Excel Download
																// All 버튼 이벤트
			that.procExcelTemplateDown(index, pageId, your);	// Excel Template
																// Download 버튼 이벤트
			
			that.procExcelUpload(index, pageId, your);			// Excel Upload 버튼
			
			that.procNewExcelUpload(index, pageId, your);		// Excel Upload 삭제기능추가
																// 이벤트
			that.procCellClick(index, your);					// 셀클릭, 단일선택, 다중선택
																// 설정
			that.clickCancelBtn2(index, your);					// 추가셀 취소 이벤트
			
			if(index == 0) {
				that.procCalendar(index);
				
			} else if(index == 2 || index == 4 || index == 98) {
				that.procPopUpCancelBtn(index, your);
			}
			
		    that.procGridWidget(index, pageId); //간편위젯 임시 주석
			that.procEnterKeyEvent(index, your);

			// 필터 사용시 전체 선택시 필터링 된 데이터 선택
			if(that.gridProperty[index]['independentAllCheckBox']) {
				// 전체 체크박스 클릭 이벤트 바인딩
				AUIGrid.bind('#grid' + (index + 1), "rowAllChkClick", function(event) {
					if(event.checked) {
						// 현재 데이터 얻기
						var gridData = AUIGrid.getGridData(event.pid);
						// rowIdField 값 얻기
						var rowIdField = AUIGrid.getProp(event.pid, "rowIdField"); 
						
						// 현재 데이터의 rowId 값들 ids 배열에 보관
						var ids = [];
						gridData.forEach(function(item) {
							ids.push(item[rowIdField]);
						});
						// 현재 그리드 데이터(필터링된 경우 필터링 된 데이터)만 전체 체크하기
						AUIGrid.setCheckedRowsByIds(that.grid[index], ids);
					} else {
						// 체크 초기화
						AUIGrid.setCheckedRowsByIds(event.pid, []);
					}
				});

				// 필터링 이벤트
				AUIGrid.bind('#grid' + (index + 1), "filtering", function(evt) {
					// 체크 초기화
					AUIGrid.setCheckedRowsByIds(evt.pid, []);
				});
			}
		
			
			$(window).resize(function(){
				AUIGrid.resize(momWidget.grid[index]); 
				AUIGrid.resize(momWidget.grid[index]);  모르겠는데 두번 resize해야 정상resizing됨..
			});*/
	},	
   gridPopup: {
		init : function(buttonIndex,gridIndex, menuId, your, widgetType) {
		  var that = momWidget;	 
		  
		  let gridId = gridIndex;
		  let index = (buttonIndex*10+gridIndex)-1;
          that.your[index] = your; //스크립트 객체주입	
	      
		 
		  /*
		  ----------------------------------------------------------------------------------------------------------------------------------     
	      * 위젯 전역변수에 위젯정보 세팅 
		  ----------------------------------------------------------------------------------------------------------------------------------
		  */
		  mom_ajax('R', 'XUSM3030.defaultInfo', {menuId:menuId,gridId:gridId}, function(result1, data1) { //해당 페이지의 위젯정보 조회
		      if(result1 != 'SUCCESS' || data1.length == 0) {
		    	  momWidget.splashHide();
			      return;							     
		      }
		      var columnProp = []; // 메인그리드 컬럼정보
		      var excelDownProp = []; //엑셀다운그리드 컬럼정보
		      var excelUploadProp = []; // 엑셀업로드그리드 컬럼정보
		      var columnType = 'default';  //컬럼타입
		      var classItem  = []; // 클래스 정보
		      var searchItem = []; // 검색 필드 클래스 정보
		      var popupItem = []; // 팝업 필드 클래스 정보
		      var labelField = ''; 
		      var headerField = '';
		      var createPop = '';
		      var editPop = '';
		      var searchPop = '';	
		      var circleClass = '';
		      var textClass   = '';
		      var dropdownTmp = {};           
		      var gridString   = data1[0]['gridProperty']   == undefined ? '[]':data1[0]['gridProperty'];
		      var columnString = data1[0]['columnProperty'] == undefined ? '[]':data1[0]['columnProperty'];
		      var searchString = data1[0]['searchProperty'] == undefined ? '[]':data1[0]['searchProperty'];
		      var buttonString = data1[0]['buttonProperty'] == undefined ? '[]':data1[0]['buttonProperty'];
		      var popupString  = data1[0]['popupProperty']  == undefined ? '[]':data1[0]['popupProperty'];
		      that.searchComboItems = {};
		      that.editItem[index] = {};
		     // that.preComboItems[index] = {};
		
			  gridString   = gridString =='[]'   ? gridString   : gridString.substr(1,    gridString.length-2);
			  columnString = columnString =='[]' ? columnString : columnString.substr(1,  columnString.length-2);
			  searchString = searchString =='[]' ? searchString : searchString.substr(1,  searchString.length-2);
			  buttonString = buttonString =='[]' ? buttonString : buttonString.substr(1,  buttonString.length-2);
		      popupString  = popupString =='[]'  ? popupString  : popupString.substr(1,   popupString.length-2);
			
						 
			       
		    	  that.pageProperty[index]     = {programId:data1[0].programId,menuId:data1[0].menuId,templateId:data1[0].templateId,param:data1[0].param};
			      that.gridProperty[index]     = JSON.parse(gridString);
			      that.columnProperty[index]   = JSON.parse(columnString);
			      
			      that.searchProperty[index]   = JSON.parse(searchString);
			      that.buttonProperty[index]   = JSON.parse(buttonString);
			      that.popupProperty[index]    = JSON.parse(popupString);
			 /*   that.dropdownProperty[index] = JSON.parse(data[0].dropdownProperty);
			      that.popUpProperty[index]    = JSON.parse(data[0].popUpProperty);*/
			      
			 /*
			 ----------------------------------------------------------------------------------------------------------------------------------     
			 * 위젯 속성  seq 순으로 정렬 
			 ----------------------------------------------------------------------------------------------------------------------------------
			 */
			      that.columnProperty[index].sort(function(a,b){ return a.columnSeq-b.columnSeq});
			      that.buttonProperty[index].sort(function(a,b){ return a.buttonSeq-b.buttonSeq});
			      that.popupProperty[index].sort(function(a,b){ return a.popupSeq-b.popupSeq});		      
			  /*
			  ----------------------------------------------------------------------------------------------------------------------------------     
			  * 위젯세팅 정보 이용해 html 동적생성 
			  ----------------------------------------------------------------------------------------------------------------------------------			  
			  */ 
			  
			  if(Array.isArray(that.gridProperty[index]) == true && that.gridProperty[index].length !=0){
				  var gridExceptList = ['checkId','gridTitle','popupColNum','popupRowNum','popupTitle','headerColor','initSearch','showFindBtn']; 	
			      var gridExtraProp  = {'checkId':'checkId','gridTitle':'gridTitle','popupColNum':'popupColNum','popupRowNum':'popupRowNum','popupTitle':'popupTitle','headerColor':'headerColor','initSearch':'initSearch','showFindBtn':'showFindBtn'};
			      var searchBtn      =  '';
			      var gridPopYn      = '';
			      var templateInfo   = '';
			      var searchRowcnt   = that.searchProperty[index].length;
			      var searchBtnColSize = "col-xl-3";
			      if(searchRowcnt%3 == 1 ){
				      searchBtnColSize = "col-xl-9";
			      }
			      else if(searchRowcnt%3 == 2 ){
				      searchBtnColSize = "col-xl-6";
			      }
			      for(var i=0,max=gridExceptList.length; i<max;i++){
			    	   gridExtraProp[gridExceptList[i]] = that.gridProperty[index][0][gridExceptList[i]];			    	  
			    	   delete that.gridProperty[index][0][gridExceptList[i]];
			      }
			      that.gridExtraProperty[index] = gridExtraProp;
			      if(that.gridExtraProperty[index]['showFindBtn']==false){
			
				
				      searchBtn = '';
				      templateInfo = that.pageProperty[index]['templateId'].split('-');
			      }
			      else{
				        searchBtn = '<div class=" '+ searchBtnColSize+' align-self-center search-btn-group "><button type="button"  class=" align-self-center w-auto  px-4 py-2  searchField-Btn find btn-search" id=findBtn'+(index+1)+'><i class="fe fe-search me-2"></i>'+multiLang.transText('MESSAGE','MSG00042')+'</button></div>';
				        templateInfo = that.pageProperty[index]['templateId'].split('-');
			     }
			
			     // var popupTemplateInfo = ;
			      var splitNum     = Number(templateInfo[1]);
			      var splitType    = templateInfo[2];
			      var splitRatio   = templateInfo[3];			      			      
	              var templateName = 'tm'+splitNum+splitType;   
			  }
			
	              
	              
			      //var searchRowcnt = that.searchProperty[index].length;
			      var searchLineCnt = 0;
			      var searchStyle   = 'h00';
			      var remarkYn      = 'N'
			      var remarkInline  = 'Y';
			      var popupTotalNum   = that.popupProperty[index].length;
			      var popupColNum = that.gridExtraProperty[index]['popupColNum'] == undefined ? 3:Number(that.gridExtraProperty[index]['popupColNum']);
			      var popupRowNum = that.gridExtraProperty[index]['popupRowNum'] == undefined ? 3:Number(that.gridExtraProperty[index]['popupRowNum']);
			      if(popupTotalNum % popupColNum == 1 ){
				     remarkInline  = 'N';
			      }

			      for(var i=0,max=searchRowcnt; i<max;i++){	
		    		  if(that.searchProperty[index][i]['headerType']=='S'){
			    		  headerField = '<select id='+that.searchProperty[index][i]['searchId']+'Header'+'SP'+(index+1)+' class="searchSelectField"></select>';
			    	  }
			    	  
			    	  else if (that.searchProperty[index][i]['headerType']=='M'){
			    		  headerField = '<select id='+that.searchProperty[index][i]['searchId']+'Header'+'SP'+(index+1)+' class="searchSelectField"></select>';
			    	  }
			    	  else {
			    		  headerField = that.searchProperty[index][i]['columnRequire'] != 'Y' ? '<div multi-lang="" class="textblock">'+that.searchProperty[index][i]['searchNm']+'</div>': '<div multi-lang="" class="textblock orange">'+that.searchProperty[index][i]['searchNm']+'</div>';
			    	  }
			    		    		   
			    	  if(that.searchProperty[index][i]['searchType']=='S'){
			    		        labelField = '<select id='+that.searchProperty[index][i]['searchId']+'SP'+(index+1) +' class="mt-2 searchSelectField"></select>';
			    	  }
			    	  else if(that.searchProperty[index][i]['searchType']=='SS'){
		    			        labelField = '<select id='+that.searchProperty[index][i]['searchId']+'SP'+(index+1) + ' class="mt-2 searchSelectField-search-combo"></select>';
		    			   
			    	  }
			    	  else if(that.searchProperty[index][i]['searchType']=='MS'){
		    			        labelField = '<select id='+that.searchProperty[index][i]['searchId']+'SP'+(index+1) + ' class="mt-2 searchSelectField-search-combo"></select>';
		    			   
			    	  }
			    	  else if (that.searchProperty[index][i]['searchType']=='M'){
			    		        labelField = '<select id='+that.searchProperty[index][i]['searchId']+'SP'+(index+1) +' class="mt-2 searchSelectField"></select>';
			    	  }
			    	   else if (that.searchProperty[index][i]['searchType']=='C'){
			    		        labelField = '<div id='+that.searchProperty[index][i]['searchId']+'SP'+(index+1) +' class="searchSelectField mt-2"></div>';
			    	  }
			    	  else if (that.searchProperty[index][i]['searchType']=='CP'){
			    		        labelField = '<div id='+that.searchProperty[index][i]['searchId']+'SD'+(index+1)+' class="mt-3 fromDateField searchSelectField"></div>' +'<div id="fromToIcon" class="mt-3 fromToIcon" >~</div>'+ '<div id='+that.searchProperty[index][i]['searchId']+'ED'+(index+1)+' class="mt-3 toDateField searchSelectField"></div>';
			    	  }
			    	  else{
			    		    labelField = '<input maxlength="256" id='+that.searchProperty[index][i]['searchId']+'SP'+(index+1) +' input-type="text" type="text" class="form-control w-input searchInputField" date-format="date"></input>';
			    	  }
			    	  searchItem[i] =  {	  			    	  
				    	  searchId:         that.searchProperty[index][i]['searchId'],
				    	  searchNm:         that.searchProperty[index][i]['searchNm'],
				    	  labelTextClass:   that.searchProperty[index][i]['columnRequire'] == 'N' ? 'textblock' : 'textblock orange',
				    	  circelClass:      that.searchProperty[index][i]['columnRequire'] == 'N' ? 'circle' : 'circle bg-orange',
				      	  searchSeq:        that.searchProperty[index][i]['searchSeq'],
				    	  defaultValue:     that.searchProperty[index][i]['defaultValue'],
				    	  searchType:       that.searchProperty[index][i]['searchType'],
				    	  dropdownId:       that.searchProperty[index][i]['dropdownId'],
				    	  headerLabelType:  that.searchProperty[index][i]['headerType'],
				    	  headerDropdownId: that.searchProperty[index][i]['headerDropdownId'],
				    	  columnRequire:    that.searchProperty[index][i]['columnRequire'],
				    	  headerField:      headerField,
				    	  labelField:       labelField
		              };
			      }
			      searchItem.sort(function(a,b){ return a.searchSeq-b.searchSeq});
			      
			      if(searchRowcnt == 0){
			    	    searchLineCnt = 0;
			    	    searchStyle = 'h00';
			    	    $('body').css('top','-0.2rem');
			      } 
			      else if(searchRowcnt > 0 && searchRowcnt <=3){
			    	    searchLineCnt = 1;
			    	    searchStyle = 'h01';
			    	    classItem[0] = {
					    		        // searchAreaClass:'searchArea-h01',
					    		         searchAreaClass:'"col-xl-12'+' searchArea-h01'+' pt-2"',
					    		         searchItemClass:'"col-xl-3 mb-2  align-self-center searchItem-h01"',
					    			     labelBoxClass:'"mx-4 mt-2 labelbox-col3"',
					    			     index:index+1
			             }
			        var searchAreaHtml  = that.createSearchArea.h01(classItem,searchItem,searchBtn);	      
			     }
			     else if (searchRowcnt > 3 && searchRowcnt <=6){
			    	 searchLineCnt = 2;
			    	 searchStyle = 'h02';
			    	   classItem[0] = {
			    		         searchAreaClass:'"col-xl-12'+' searchArea-h02'+' pt-2"', 
			    		         searchItemClass:'"col-xl-3 mb-2 mt-2 align-self-center searchItem-h02"',
			    		         labelBoxClass:'"mx-4 mt-2 labelbox-col3"'	,
			    		         index:index+1
			    				
			             }
			    	var searchAreaHtml  = that.createSearchArea.h02(classItem,searchItem,searchBtn);	 
			     }
			       else if (searchRowcnt > 6 && searchRowcnt <=9){
			    	 searchLineCnt = 3;
			    	 searchStyle = 'h03';
			    	   classItem[0] = {
			    		         searchAreaClass:'"col-xl-12'+' searchArea-h03'+' pt-2"', 
			    		         searchItemClass:'"col-xl-3 mb-2 align-self-center searchItem-h03"',
			    		         labelBoxClass:'"mx-4 mt-2 labelbox-col3"'	,
			    		         index:index+1
			    				
			             }
			    	var searchAreaHtml  = that.createSearchArea.h03(classItem,searchItem,searchBtn);	 
			     }
			     else{
			  	       classItem[0] = {
		    		        // searchAreaClass:'searchArea-h01',
		    		         searchAreaClass:'"col-xl-12'+' searchArea-h03'+' pt-2"', 
		    		         searchItemClass:'"col-xl-3 mb-2 align-self-center searchItem-h03"',
		    		         labelBoxClass:'"mx-4 mt-2 labelbox-col3"'	 ,
		    		         index:index+1
		              }
		             var searchAreaHtml  = that.createSearchArea.h01(classItem,searchItem,searchBtn);	  
			    	 
			     }
			     
			     for(var i=0,max=that.popupProperty[index].length;i<max;i++){
			    	  if(that.popupProperty[index][i]['columnRequire']== "Y"){
			    		    circleClass = 'circle-bg-orange';
			    		    textClass   =  'textblock-orange';
			    		    
			    	  }
			    	  else{
			      		    circleClass = 'circle';
			    		    textClass   = 'textblock';
			    	  }
			    	  
		    		  if(that.popupProperty[index][i]['popupType']=='S' || that.popupProperty[index][i]['popupType'] == 'M'){
		    			   labelField = '<select id='+that.popupProperty[index][i]['popupId']+'DP'+(index+1)+' class="popupSelectField"></select>';
		    			  
			    	  }
			    	  else if(that.popupProperty[index][i]['popupType']=='SS'){
		    			   labelField = '<select id='+that.popupProperty[index][i]['popupId']+'DP'+(index+1)+' class="popupSelectField-popup-combo"></select>';
		    			   
			    	  }
		    		  else if (that.popupProperty[index][i]['popupType']=='C'){
		    			  labelField  = '<input maxlength="256" id='+that.popupProperty[index][i]['popupId']+'DP'+(index+1)+' type="datepicker"  class="w-input popupInputField" date-format="date"></input>';
		    			  
		    		  }
		    		  else if (that.popupProperty[index][i]['popupType']=='C-HM'){
		    			  labelField  = '<input  id='+that.popupProperty[index][i]['popupId']+'DP'+(index+1)+' type="time"  class="w-input popupInputField"></input>';
		    			  
		    		  }
		    		  else if (that.popupProperty[index][i]['popupType']=='P'){
		    			  labelField  = '<input maxlength="50" id='+that.popupProperty[index][i]['popupId']+'DP'+(index+1)+' type="password"  class="w-input passwordInputField" date-format="date"></input><button id="changePwBtn'+(index+1)+'" type="button" class="btn btn-icon  btn-change" style="display: none;"><i class="mdi mdi-settings"style="font-size: 1.25rem;"></i></button>';
		    			  
		    		  }
		    		  else if (that.popupProperty[index][i]['popupType']=='DS'){
		    			  labelField  = '<textarea class="remark C'+popupColNum+'"  rows="5" maxlength="500" id='+that.popupProperty[index][i]['popupId']+'DP'+(index+1)+'></textarea>';
		    			  remarkYn    = 'Y';
		    		  }
		    		  else if(that.popupProperty[index][i]['popupType']=='DG'){			  
			    		  labelField  = '<select maxlength="256" id='+that.popupProperty[index][i]['popupId']+'DP'+(index+1)+'  class="gridPop'+(index+1)+ ' grid-popup popupSelectField"></select>';
			    	  }
			    	  else {
			    		  labelField  = '<input maxlength="256" id='+that.popupProperty[index][i]['popupId']+'DP'+(index+1)+' type="text" type="text" class="w-input popupInputField" date-format="date"></input>';
			    	  }
			    
		    		  			    	  
			    	  popupItem[i] =  {	  			    	  
				    	  popupId:          that.popupProperty[index][i]['popupId'],
				    	  popupNm:          that.popupProperty[index][i]['popupNm'],
				      	  popupSeq:         that.popupProperty[index][i]['popupSeq'],
				    	  defaultVlue:      that.popupProperty[index][i]['defaultValue'],
				    	  columnRequire:    that.popupProperty[index][i]['columnRequire'],
				    	  popupType:        that.popupProperty[index][i]['popupType'],
				    	  labelField:       labelField,
				    	  circleClass:      circleClass,
				          textClass:        textClass
		              };
		              
			      }
			      
			     // searchAreaHtml = searchAreaHtml.replace(/#{searchAreaClass}/gi, classItem[0].searchAreaClass).replace(/#{searchItemClass}/gi, classItem[0].searchItemClass).replace(/#{labelBoxClass}/gi, classItem[0].labelBoxClass).replace(/#{circelClass}/gi, classItem[0].circelClass).replace(/#{labelTextClass}/gi, classItem[0].labelTextClass)replace(/#{searchNm}/gi, classItem[0].searchNm).replace(/#{labelField}/gi, classItem[0].labelField);
			 
				   if(that.gridProperty[index][0]['showFooter'] == true || that.gridProperty[index][0]['usePaging']== true){
					   if(that.gridProperty[index][0]['showFooter'] == true || that.gridProperty[index][0]['showFooter']== true){
						   if(searchStyle =='h00'){
						       var gridAreaHtml    = that.createGridArea.h00(index+1,'grid'+(index+1),'gridArea-'+templateName+'-'+searchStyle+'-'+'0'+(index+1)+'-'+'footer-paging'); 
					        }
						    else if(searchStyle =='h01'){
							   var gridAreaHtml    = that.createGridArea.h01(index+1,'grid'+(index+1),'gridArea-'+templateName+'-'+searchStyle+'-'+'0'+(index+1)+'-'+'footer-paging'); 
						    } 
						    else if(searchStyle =='h02'){
							 var gridAreaHtml    = that.createGridArea.h02(index+1,'grid'+(index+1),'gridArea-'+templateName+'-'+searchStyle+'-'+'0'+(index+1)+'-'+'footer-paging'); 
						    } 
						    else if(searchStyle =='h03'){
							 var gridAreaHtml    = that.createGridArea.h03(index+1,'grid'+(index+1),'gridArea-'+templateName+'-'+searchStyle+'-'+'0'+(index+1)+'-'+'footer-paging'); 
						    } 
					   }
					   else{
							if(searchStyle =='h00'){
						    var gridAreaHtml    = that.createGridArea.h00(index+1,'grid'+(index+1),'gridArea-'+templateName+'-'+searchStyle+'-'+'0'+(index+1)+'-'+'paging'); 
					        }
					        else if(searchStyle =='h01'){
						    var gridAreaHtml    = that.createGridArea.h01(index+1,'grid'+(index+1),'gridArea-'+templateName+'-'+searchStyle+'-'+'0'+(index+1)+'-'+'paging'); 
					        } 
							else if(searchStyle =='h02'){
								 var gridAreaHtml    = that.createGridArea.h02(index+1,'grid'+(index+1),'gridArea-'+templateName+'-'+searchStyle+'-'+'0'+(index+1)+'-'+'paging'); 
							} 
							else if(searchStyle =='h03'){
								 var gridAreaHtml    = that.createGridArea.h03(index+1,'grid'+(index+1),'gridArea-'+templateName+'-'+searchStyle+'-'+'0'+(index+1)+'-'+'paging'); 
							} 
						}

				 }
				 else{
					   if(momWidget.gridProperty[index][0]['showFooter']){
						  if(searchStyle =='h00'){
						    var gridAreaHtml    = that.createGridArea.h00(index+1,'grid'+(index+1),'gridArea-'+templateName+'-'+searchStyle+'-'+'0'+(index+1)+'-'+'footer'); 
						  }
						  else if(searchStyle =='h01'){
								  var gridAreaHtml    = that.createGridArea.h01(index+1,'grid'+(index+1),'gridArea-'+templateName+'-'+searchStyle+'-'+'0'+(index+1)+'-'+'footer'); 
					      } 
						  else if(searchStyle =='h02'){
							 var gridAreaHtml    = that.createGridArea.h02(index+1,'grid'+(index+1),'gridArea-'+templateName+'-'+searchStyle+'-'+'0'+(index+1)+'-'+'footer'); 
						  } 
						  else if(searchStyle =='h03'){
							 var gridAreaHtml    = that.createGridArea.h03(index+1,'grid'+(index+1),'gridArea-'+templateName+'-'+searchStyle+'-'+'0'+(index+1)+'-'+'footer'); 
						  } 
					   }
					   else{
						if(searchStyle =='h00'){
						 var gridAreaHtml    = that.createGridArea.h00(index+1,'grid'+(index+1),'gridArea-'+templateName+'-'+searchStyle+'-'+'0'+(index+1)); 
						}
						else if(searchStyle =='h01'){
							  var gridAreaHtml    = that.createGridArea.h01(index+1,'grid'+(index+1),'gridArea-'+templateName+'-'+searchStyle+'-'+'0'+(index+1)); 
						} 
						else if(searchStyle =='h02'){
							 var gridAreaHtml    = that.createGridArea.h02(index+1,'grid'+(index+1),'gridArea-'+templateName+'-'+searchStyle+'-'+'0'+(index+1)); 
						} 
						else if(searchStyle =='h03'){
							 var gridAreaHtml    = that.createGridArea.h03(index+1,'grid'+(index+1),'gridArea-'+templateName+'-'+searchStyle+'-'+'0'+(index+1)); 
						} 
					 }
					
					
				}
				
				
			   
			    
			      var gridTabRightHtml = that.createGridTabArea.rightTab(index+1,that.buttonProperty[index]);
			      var gridTabLeftHtml  = that.createGridTabArea.leftTab(index+1,that.gridExtraProperty[index]['gridTitle'],that.buttonProperty[index]);			      
			      var widthUse = 'Y';
			      var excelShow = 'N';
			      var excelTmpShow = 'N';
			      var gridShow = 'Y';
			      var isCheckBox = 'N';
			      var isDropDown ='N';
			      var columnId = '';
			      var isRequire = 'N';
			      var sortTmp   = [];
		          var groupHeader = 'N';
			      var popupAreaHtml = '';
			      var isCellMerge = false;
			     // let gridPopIndex = ($('.grid-pop').length +1)*10 +1;
			        let gridPopIndex = (index +1) ;
			  			    
			    			
			    	if(gridPopIndex%10==1){
				 			var createFrontArea ={};  
			    			createFrontArea["tm1st"] = that.tm1st;
			    			createFrontArea["tm2h"]  = that.tm2h;
			    			createFrontArea["tm2v"]  = that.tm2v;  
			    			createFrontArea["tm3vh"]  = that.tm3vh; 
			    		    createFrontArea["tm3hv"]  = that.tm3hv; 
			    			createFrontArea["tm4vvh"]  = that.tm4vvh;
			    		    createFrontArea[templateName](index+1,splitRatio,'contentArea',"#popup_main"+(index+1));
			        }				    			    		
			    		    $('#contentArea'+(index+1)).append(searchAreaHtml); 	
			    	 
			    		    				    	
				     
			    	 if(that.popupProperty[index].length > 0){	
					      popupAreaHtml = that.createPopup.defaultPop(index+1,popupColNum,popupRowNum,popupItem,that.gridExtraProperty[index]['popupTitle'],remarkYn,remarkInline);		    		 
			    		  $('body').append(popupAreaHtml);
			    	 }  
			    		
                     for(let i=0,max=that.buttonProperty[index].length;i<max;i++){
					    
						if(that.buttonProperty[index][i]['buttonType']=='DG'){
							 popupAreaHtml = that.createPopup.gridPop(index+1,gridPopIndex,that.buttonProperty[index][i]['popupGridId'],that.buttonProperty[index][i]['buttonId'],'팝업타이틀');							 								    		 
			    		    $('body').append(popupAreaHtml);
			    		    gridPopIndex = ($('.grid-pop').length +1)*10 +1;
			    		    // gridPopIndex = (index+1)*10 +1;
			    		    //that.buttonProperty[index][i]['customType'] = 'DG';
			    		    //break;
						}
						else if(that.buttonProperty[index][i]['buttonType']=='CP'){	
												
							that.createCustomPop(index,that.buttonProperty[index][i]['popupGridId'],that.buttonProperty[index][i]['buttonId'],that.buttonProperty[index][i]['eventType']);
							//that.buttonProperty[index][i]['customType'] = 'CP';
						}
						
				        else{
									//that.buttonProperty[index][i]['customType'] = 'GRID';
				        }
					 }
					 $('#contentArea'+(index+1)).append(gridAreaHtml); 
				  	
			         $('.gridTab'+(index+1)).append(gridTabLeftHtml);
			         $('.gridTab'+(index+1)).append(gridTabRightHtml);
			
			         $('body').append('<div id="excelArea' + (index + 1) + '" style="width:100%; position:fixed; height:100%; z-index: -999; top:0px"><div id="excelGrid' + (index + 1)  + '"></div><div id="excelTmpGrid' + (index + 1)  + '"></div></div>');					
			         for(var i=0,max=that.columnProperty[index].length;i<max;i++){	
			    	   columnType = that.columnProperty[index][i]['columnEditable'] == 'N' ? 'default':'edit';	
			    	   widthUse = that.columnProperty[index][i]['columnWidth']  == 0 ? 'N': 'Y';
			    	   excelShow = that.columnProperty[index][i]['excelShow']  == 'Y' ? 'Y': 'N';
			    	   excelTemplateShow = that.columnProperty[index][i]['excelTemplateShow']  == 'Y' ? 'Y': 'N';
			    	   gridShow = that.columnProperty[index][i]['columnShow']  == 'Y' ? true: false;
			    	   excelDownShow   = that.columnProperty[index][i]['excelShow'] == 'Y' ? true: false;
			    	   excelUploadShow = that.columnProperty[index][i]['excelTemplateShow'] == 'Y' ? true: false;
			    	   isCheckBox = that.columnProperty[index][i]['columnType'] == 'CK' ? 'Y': 'N';
			    	   isDropDown = that.columnProperty[index][i]['columnType'] == 'S' ? 'Y': momWidget.columnProperty[index][i]['columnType'] == 'M' ? 'Y':'N';
			    	   isCalendar = that.columnProperty[index][i]['columnType'] == 'C' ? 'Y': 'N';
			    	   columnId = that.columnProperty[index][i]['columnId'];
			    	   isRequire = that.columnProperty[index][i]['columnRequire'] == 'Y' ? 'Y': 'N';
			    	   sortType = that.columnProperty[index][i]['sortMethod'] == 'ASC' ? 1: -1;
			    	   sortNo   = that.columnProperty[index][i]['sortNo'] == '' ? 0: that.columnProperty[index][i]['sortNo'];
			    	   isCellMerge = that.columnProperty[index][i]['cellMerge'] == '' ? false : that.columnProperty[index][i]['cellMerge'] == 'Y' ? true: false;
			    	  // groupHeader  = that.columnProperty[index][i]['columnType'] == 'G' ? 'Y': 'N';
			    	   
			    	   if(sortNo > 0){
							sortTmp.push({dataField : columnId, sortType : sortType,sortNo:sortNo}) ;
					   }
			    	   
			    	 //that.columnProperty[index].splice(i,1);
			    	
							  columnProp[i] =  {
								    	      dataField 	: columnId 
								  			, headerText 	: that.columnProperty[index][i]['columnNm'] 
									   		, dataType      : that.columnProperty[index][i]['dataType'] 
											, formatString  : that.columnProperty[index][i]['dataFormat']											
				    	                    , editable      : that.columnProperty[index][i]['columnEditable']  == 'Y' ? true : that.columnProperty[index][i]['columnCreate']  == 'Y' ? true : false
								  			, style			: that.columnProperty[index][i]['columnAlign']  == 'LEFT' ? 'aui-grid-'+columnType+'-column-left': that.columnProperty[index][i]['columnAlign'] == 'RIGHT'? 'aui-grid-'+columnType+'-column-right' : 'aui-grid-'+columnType+'-column-center'	
								  			, visible       : gridShow 
								  			, mergePolicy : "restrict" 
								  			, cellMerge : isCellMerge 
								  			, filter : {
										      showIcon : true
											}
								  		
				                    };
							
				
			    	 
	                    if(excelDownShow){
						    excelDownProp.push({
									    	      dataField 	: columnId 
									  			, headerText 	: that.columnProperty[index][i]['columnNm'] 
										   		, dataType      : that.columnProperty[index][i]['dataType'] 
												, formatString  : that.columnProperty[index][i]['dataFormat']
					    	                    , editable      : that.columnProperty[index][i]['columnEditable']  == 'Y' ? true : false  
					    	                    , headerStyle   : isRequire == 'Y' ? "my-header-style-require":"my-header-style-default"
									  			, style			: that.columnProperty[index][i]['columnAlign']  == 'LEFT' ? 'aui-grid-'+columnType+'-column-left': that.columnProperty[index][i]['columnAlign'] == 'RIGHT'? 'aui-grid-'+columnType+'-column-right' : 'aui-grid-'+columnType+'-column-center'	
									  			, visible       : excelDownShow
									  			, mergePolicy : "restrict"
									  			, cellMerge : isCellMerge 
									  		 
					                    });
					      if(widthUse == 'Y'){
			    		  excelDownProp[excelDownProp.length - 1].width  = that.columnProperty[index][i]['columnWidth'];
			    		
			    	   }
						}
			    	
	                    if(excelUploadShow){
		 			/*	if(excelUploadProp.length==0){
				      		excelUploadProp.push({
										    	      dataField 	: 'valMsg' 
										  			, headerText 	: 'Result'
										  			, headerStyle   : "my-header-style-default"
											   		, dataType      : "string"
													, formatString  : ""
						    	                    , editable      : false
										  			, style			: 'aui-grid-default-column-left'
										  		    , visible       : false
						                     }); 
								}*/
							   excelUploadProp.push({
										    	      dataField 	: columnId 
										  			, headerText 	: that.columnProperty[index][i]['columnNm'] 
										  			, headerStyle   : isRequire == 'Y' ? "my-header-style-require":"my-header-style-default"
											   		, dataType      : that.columnProperty[index][i]['dataType'] 
													, formatString  : that.columnProperty[index][i]['dataFormat']
						    	                    , editable      : that.columnProperty[index][i]['columnEditable']  == 'Y' ? true : false
										  			, style			: that.columnProperty[index][i]['columnAlign']  == 'LEFT' ? 'aui-grid-'+columnType+'-column-left': that.columnProperty[index][i]['columnAlign'] == 'RIGHT'? 'aui-grid-'+columnType+'-column-right' : 'aui-grid-'+columnType+'-column-center'
										  		    , visible       : true
						                     }); 
						 
				
			    	         if(widthUse == 'Y'){			    		  
			    		     excelUploadProp[excelUploadProp.length - 1].width = that.columnProperty[index][i]['columnWidth'];
			    	   }
			    	         
						}
			    	 
			    	   if(widthUse == 'Y'){
			    		   columnProp[i].width      = that.columnProperty[index][i]['columnWidth'];
			    		
			    	   }
			    	   if(isCheckBox =='Y'){
			    		   columnProp[i].renderer = {
									          type: 'CheckBoxEditRenderer'
											, editable: true
											, checkValue : 'Y' 
											, unCheckValue : 'N'
											
										};
			    		   
			    		 /*  columnProp[i].headerRenderer = { 
			    				type : "CheckBoxHeaderRenderer",
			    				position : "right",
			    				dependentMode : true
			    				//onClick : myHeaderCheckClick 
			    			};*/
			    	   }
			    	   if(isDropDown =='Y'){
			    		   let dropDownQueryId = that.columnProperty[index][i]['dropdownId'];		    		   
			    		   //var nameSpace = 'DD' + that.pageProperty[index]['programId'].substr(2,2);
			    		   let nameSpace = 'DD';
			    		   let param = {};
			    		   let dropdownParamArry =[];
			    		   let dropdownParamText = that.columnProperty[index][i]['dropdownParam'];
			    		   //var dropdownTmp = {};			    		 
			    		   	
				                  dropdownParamArry = dropdownParamText.split(',');
				                  for(let i=0;i<dropdownParamArry.length;i++){
										param[dropdownParamArry[i].split('=')[0]]=dropdownParamArry[i].split('=')[1];
							     }
							   							
							     if(dropDownQueryId == 'DD00001'){
			    			          dropDownQueryId = 'DD.DD00001';

			    		   }
			    		   else{			    			  
			    			   dropDownQueryId = nameSpace +'.'+dropDownQueryId;
			    			   
			    		   }
			    		   mom_ajax('R', dropDownQueryId, param, function(result2, data2) {
			    			   if(data2.length==0) {
			    				      return;
			    				      momWidget.splashHide();
			    			      } 
			    			    dropdownTmp[columnId] = data2;
			    			   // that.columnDropdown[index]= dropdownTmp;
			    			    columnProp[i].labelFunction = function(rowIndex, columnIndex, value, item) { 
					               	 var retStr = "";
					               	 
					               	 var comboList = that.columnDropdown[index][that.columnProperty[index][columnIndex]['columnId']];
					       			 for(var i=0,len=comboList.length; i<len; i++) {
					       					  if(comboList[i]["code"] == value) {
					           					retStr = comboList[i]["label"];
					           					break;
					           				  } 				    				
					       			 }
					       			return retStr == "" ? value : retStr;			                  
					   			   };	
					    		   columnProp[i].editRenderer = {			    				   
								   				type: 'ComboBoxRenderer',
								   				autoCompleteMode : true,  // 자동완성 모드 설정
								   				matchFromFirst : true,  // 처음부터 매치가 아닌 단순 포함되는 자동완성
								   				autoEasyMode : false,     // 자동완성 모드일 때 자동 선택할지 여부 (기본값 : false)
								   				showEditorBtnOver: true, // 에디터 버튼 마우스 올릴시 보여줄지
								   				listAlign:'left',        // 라벨 정렬
								   				/*list: that.columnDropdown[index][that.columnProperty[index][columnIndex]['columnId']],*/
								   				keyField: 'code', 
								   				valueField: 'label' ,
								   			    listFunction : function(rowIndex, columnIndex, item, dataField) {											    					   			    
								   			                /*if(that.columnDropdownReSearch[index][that.columnProperty[index][columnIndex]['columnId']]){
									                                   
															}*/
									                        return that.columnDropdown[index][that.columnProperty[index][columnIndex]['columnId']];									 
								                           
								                }
							/*validator : function(oldValue, newValue, item) {
								var isValid = false;
								for(var i=0, len=that.columnDropdown[index][columnId].length; i<len; i++) { // keyValueList 있는 값만..
									if(that.columnDropdown[index][columnId][i]["code"] == newValue) {
										isValid = true;
										break;
									}
								}
								// 리턴값은 Object 이며 validate 의 값이 true 라면 패스, false 라면 message 를 띄움
								return { "validate" : isValid, "message"  : "리스트에 있는 값만 선택(입력) 가능합니다." };
				} */                                                                 
						           };
					    		
			    		   }, undefined, undefined, this, false,'Y');
			    	
			    	   }
			    	   else if(isCalendar =='Y'){
				 				/*columnProp[i].dateInputFormat = "yyymmdd"; // 실제 데이터의 형식 지정
				 				columnProp[i].formatString = "yyyy년 mm월 dd일", // 실제 데이터 형식을 어떻게 표시할지 지정
				 				columnProp[i].dateType = 'date';
				 				columnProp[i].width = 160;
				 				columnProp[i].renderer = {
																type : "IconRenderer",
																iconWidth : 16, // icon 사이즈, 지정하지 않으면 rowHeight에 맞게 기본값 적용됨
																iconHeight : 16,
																iconPosition : "aisleRight",
																iconTableRef :  { // icon 값 참조할 테이블 레퍼런스
																	"default" : "../content/icon/calendar-icon.png" // default
																},
																onClick : function(event) {
																	// 달력 아이콘 클릭하면 실제로 달력을 띄움.
																	// 즉, 수정으로 진입함.
																	AUIGrid.openInputer(event.pid);
															    }

								};
								columnProp[i].editRenderer = {
																	type : "JQCalendarRenderer", // jquery-datepicker 달력 렌더러 사용
																	defaultFormat : "yyyymmdd", // 달력 선택 시 데이터에 적용되는 날짜 형식
																	uncheckDateValue : "-", // Clear 버턴 클릭 시 적용될 값.
																	showEditorBtn : false,
																	showEditorBtnOver : false,
																	onlyCalendar : false, // 사용자 입력 불가, 즉 달력으로만 날짜입력 (기본값 : true)
																	openDirectly : true, // 에디팅 진입 시 바로 달력 열기
																	
																	jqOpts : {
																		changeMonth: true,
																		changeYear: true,
																		selectOtherMonths : true,
																		showOtherMonths: true,
																		dayNamesMin: [ "일", "월", "화", "수", "목", "금", "토" ],
																		monthNamesShort: [ "1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월" ]
																	} 
							   };*/
								
					   }
			    	   
			    /*	  if(groupHeader =='Y'){
				          var childrenTmp =[];
				          var childrenColumn = JSON.parse(momWidget.columnProperty[index][i]['groupingColumn'].replace(/\'/gi, '"'));
				          for(var k=0,max4=that.columnProperty[index].length;k<max4;k++){	
					           for(var k2=0,max5=Object.keys(childrenColumn[0]).length;k2<max5;k2++){
						             if(that.columnProperty[index][k]['columnId'] == childrenColumn[0]['columnId'+(k2+1)] ){
							             childrenTmp.push(columnProp[k]);
										 delete columnProp[k];
										 
										 		
									 }
					           }
						  }
						  columnProp.children = childrenTmp;
								
						} */
			    	   
			    	   
			    	   	
			      } 	
			      		    that.columnDropdown[index]= dropdownTmp;
			      		    
				          var childrenTmp =[];
				          var childrenColumn = [];
				          var parentId = '';
				          var deleteColumn = [];
				         
				          for(var k=0,max4=that.columnProperty[index].length;k<max4;k++){	
					               if(that.columnProperty[index][k]['columnType'] != 'G' ){
						                  continue;
										}
										parentId = that.columnProperty[index][k]['columnId'];
										//Object.keys(childrenColumn[0]).lengt
									childrenColumn = JSON.parse(momWidget.columnProperty[index][k]['groupingColumn'].replace(/\'/gi, '"'));
							for(var k2=0,max5=columnProp.length;k2<max5;k2++){		
					           for(var k3=0,max6=Object.keys(childrenColumn[0]).length;k3<max6;k3++){
						             if(columnProp[k2]['dataField'] == childrenColumn[0]['columnId'+(k3+1)] ){
							             childrenTmp.push(columnProp[k2]);
							             deleteColumn.push({index:k2});
										
										 
										 		
									 }
					           }
					            
					        }
					        	for(var k4=0,max7=columnProp.length;k4<max7;k4++){		
					              if(parentId == columnProp[k4]['dataField']){
											columnProp[k4].children = childrenTmp;
										}
					            
					        }
					    
					         
					        childrenTmp =[];
					        parentId = '';
						  }
						   for(var k5=0,max8=deleteColumn.length;k5<max8;k5++){		
					            delete columnProp[deleteColumn[k5]['index']];
					            
					        }
						var filteredColumnProp = columnProp.filter(function (el) {
							  return el != null;
							});		
						 	
			         sortTmp.sort(function(a,b){ return a.sortNo-b.sortNo});	
			         for(var k=0,max5=sortTmp.length;k<max5;k++){	
				         delete sortTmp[k]['sortNo'];
					}
			        that.sortingInfo[index] = sortTmp;		     
	          	    that.excelDownProperty[index]   = excelDownProp; 
				/*	excelUploadProp.unshift({
										    	      dataField 	: 'validateYn'
										  			, headerText 	: '검사여부' 
										  			, headerStyle   : "my-header-style-default"
											   		, dataType      : 'string'
						    	                    , editable      :  false
										  			, style			: 'aui-grid-default-column-center'
										  		    , visible       : false
						                     }); */
			    		
			    	   
			   	    that.excelUploadProperty[index] = excelUploadProp; 
					var excelUploadProp = that.excelUploadProperty[index];				
					that.excelDownGrid[index]   = AUIGrid.create('#excelGrid' + (index + 1), that.excelDownProperty[index], that.gridProperty[index]);	
					that.excelTmpGrid[index]     = AUIGrid.create('#excelTmpGrid' + (index + 1), that.excelUploadProperty[index], that.gridProperty[index]);	
			  	    var isExist = document.getElementById('grid' + (index + 1));
				    if(isExist == undefined) {
					/* that.messageBox({type:'danger', width:'400', height: '145', html: 'grid' + (index + 1) + '가 존재하지 않습니다.'});
					 return;*/
					 
				    }
                    else{
	                      if(momWidget.gridProperty[index][0]['usePaging']){
		                  /*   that.gridProperty[index][0]['pagingInfoLabelFunction'] = 	function(currentPage, totalPageCount, currentTopNumber, currentBottomNumber, dataLen) {
							 return "현재페이징 : " + currentPage + " / 전체페이징 : " + totalPageCount + "( " + currentTopNumber + "~" + dataLen + " 개 )";
						     };	*/
						  }
	     					 that.columnProp[index] = filteredColumnProp;
	     					
							 that.grid[index] = AUIGrid.create('#grid'+(index+1), filteredColumnProp, that.gridProperty[index][0]); 
					}
		
	           
			     
			      
			      $('td').removeClass('aui-grid-default-column');
			      that.startPage[index]    = 1;
			      that.endPage[index]      = momWidget.gridProperty[0][0]['pageRowCount'] == undefined ? 20:momWidget.gridProperty[0][0]['pageRowCount'];
	}, undefined, undefined, this, false);
	
		
			
			 
			  
			 
		  									
		  /*
		  ----------------------------------------------------------------------------------------------------------------------------------     
		  * 화면별 이벤트 세팅 
		  ----------------------------------------------------------------------------------------------------------------------------------
		  */																							
			
			//that.setAddBtnEvent(index, your);				    // 행추가버튼 이벤트 핸들러 등록
			that.setComboBoxSet(index,your);                    // 콤보박스 공통 이벤트 처리
		    that.setSearchSet(index, your);                     // 검색조건 세팅
		    that.setBtnEvent(index, your);					    // 버튼이벤트 세팅
		    that.setGridEvent(index,your);                      // 그리드이벤트 세팅(셀클릭,체크박스클릭,편집 등)
		    that.setKeyEvent(index,your); 					    // 버튼이벤트 세팅 (엔터,기타..)
		    that.htmlResize(index,your);                        // 해상도 변경시 html 사이즈 조절 
		    if(that.gridProperty[index][0]['usePaging'] ==true){ //페이징사용
				if(that.gridExtraProperty[index]['initSearch']=='Y'){
				 // that.backWork[index] = 'Y';		
				  that.findBtnClicked(index,  {startPage:1,endPage:1}, true, 'TOTAL',momWidget.pageProperty[0]['programId'],your);	
		    	  that.findBtnClicked(index, {startPage:1,endPage:that.gridProperty[index][0]['pageRowCount']}, true, 'INIT_PAGING',momWidget.pageProperty[0]['programId'],your);
		    	//  that.findBtnClicked(index, {}, true, 'BACK',menuId,your);
		    	}
		    	else{
			      that.backWork[index] = 'Y';
			      that.findBtnClicked(index,  {startPage:1,endPage:1}, true, 'TOTAL',momWidget.pageProperty[0]['programId'],your);			
			  	  that.findBtnClicked(index, {}, true, 'BACK',momWidget.pageProperty[0]['programId'],your);
				}
			  
		    }
		    else{//페이징 미사용
				if(that.gridExtraProperty[index]['initSearch']=='Y'){
					if(index>0 && index%10 == 0){
						  						
					}
					else{
						that.findBtnClicked(index, {}, true, 'INIT',momWidget.pageProperty[0]['programId'],your);
					}
						
					
		    	    
		        }
			}
			}

	},	
	setSearchSet: function(index,your){
		var that = this;
		var searchId = undefined;
		var dropdownId = undefined;
		var headerDropdownId = undefined;
		var groupCd = undefined;
		var searchType = undefined;
		var nameSpace  = undefined;
		var paramMap   = [];
		var splitArray1 = undefined;
		var splitArray2 = undefined;
		var defaultValue = undefined;
		let comboTmp = {};
		
		
		if(that.searchProperty[index] == undefined || that.searchProperty[index] == ''){
			return;
		}
		for(var i=0,max1=that.searchProperty[index].length;i<max1;i++){
			searchId         = that.searchProperty[index][i]['searchId'];
			dropdownId       = that.searchProperty[index][i]['dropdownId'];
			headerDropdownId = that.searchProperty[index][i]['headerDropdownId'];
			dropdownParam    = that.searchProperty[index][i]['dropdownParam'];
			headerDropdownParam = that.searchProperty[index][i]['headerDropdownParam'];
		    searchType       = that.searchProperty[index][i]['searchType']; 
		    headerSearchType = that.searchProperty[index][i]['headerType']; 
		    defaultValue     = that.searchProperty[index][i]['defaultValue'];
		    nameSpace        = dropdownId.substr(0, 2);  
		    queryId          = '';
		    searchId2 = searchId+'SP'+(index+1);
		    paramMap.length = 0;
		    comboTmp = {};
			if(searchType == 'S' || searchType == 'M' || headerSearchType == 'S'||headerSearchType == 'M'){
			/*	searchId = that.searchProperty[index][i]['searchId'];
				dropdownId = that.searchProperty[index][i]['searchId'];
				headerDropdownId = that.searchProperty[index][i]['searchId'];
				searchType =  that.searchProperty[index][i]['searchType'];*/
				if(dropdownId != '' && dropdownId != undefined){
					 queryId = dropdownId;
					 splitArray1 = dropdownParam.split(',');					 
					 for(var j=0,max2=splitArray1.length;j<max2;j++){
						  splitArray2 = splitArray1[j].split('=');
						  paramMap.push(JSON.parse('{"'+splitArray2[0] +'"'+':'+'"'+splitArray2[1]+'"}'));
					 }
					 
					// paramMap[i] = splitArray[0]:; 
				}
				else if(headerDropdownId != '' && headerDropdownId != undefined){
					      queryId    = headerDropdownId;
					      nameSpace  = headerDropdownId.substr(0, 4);  
							 splitArray1 = headerDropdownParam.split('&');
							 for(var j=0,max2=splitArray1.length;j<max2;j++){
								  splitArray2 = splitArray1[j].split('=');
								  paramMap.push(JSON.parse('{"'+splitArray2[0] +'"'+':'+'"'+splitArray2[1]+'"}'));
							 }
				}
				else{
					    queryId = dropdownId;
					 //   paramMap[i] = ; 
				}
				  mom_ajax('R', nameSpace+'.'+queryId, paramMap[0] == undefined ? {}:paramMap[0], function(result, data) {
				      if(result != 'SUCCESS' || data.length==0) {
				    	  momWidget.splashHide();
					      return;							     
				      }		
				      
				        if(headerDropdownId != '' && headerDropdownId != undefined){
				        	 $('#'+searchId+'Header'+'SP'+(index+1)).jqxComboBox({source: data}); 
				        	 $('#'+searchId+'Header'+'SP'+(index+1)).prev().prev().attr('class','circle-dh')
				        	 $('#'+searchId+'Header'+'SP'+(index+1)).jqxComboBox({selectedIndex: 0 });
				        }
				        else{
				        	if(searchType == 'M'){
				        		$('#'+searchId +'SP'+(index+1)).jqxComboBox({source: data});	
				        	if(defaultValue == 'CHECK_ALL'){
								//$('#'+searchId +'SP'+(index+1)).jqxComboBox('checkAll'); 
							}
							else{
								//$('#'+searchId).jqxComboBox('checkIndex', 0); 
							}				        
								
							          
				        		//$('#'+searchId).val(defaultValue); 
				        	}
				        	else{
				        		$('#'+searchId+'SP'+(index+1)).jqxComboBox({source: data}); 
				        		$('#'+searchId+'SP'+(index+1)).val(defaultValue); 
				        		//comboTmp[searchId2] = data;
				        		
				        		that.searchComboItems[searchId2] = data;

				        	}
				        	  
				        }
				       
					  	//$('#gridId').jqxComboBox("clear");								
						//$('#'+searchId).jqxComboBox('source',data);					
						//$("#gridId").jqxComboBox({ disabled: false }); 
						//momWidget.messageBox({type:'success', width:'400', height: '145', html: '성공하였습니다!'});
						//momWidget.splashHide();
					   
			}, undefined, undefined, this, false);
			}
			else if(searchType == 'C' ){
					var today = new Date();  
					var year  = undefined; // 년도
				    var month = undefined;;  // 월
				    var date  = undefined;;  // 날짜
				if(defaultValue == 'TODAY'){
					 year = today.getFullYear(); // 년도
				     month = today.getMonth() ;  // 월
				     date = today.getDate();  // 날짜
				    
				}
				else if(defaultValue == 'INIT'){
					     today = new Date(today.getFullYear(), today.getMonth(), 1);
						 year  = today.getFullYear(); // 년도
					     month = today.getMonth() ;  // 월
					     date  = today.getDate();  // 날짜
				}
				else if(defaultValue == 'LAST'){
					     today = new Date(today.getFullYear(), today.getMonth()+1, 0);
						 year  = today.getFullYear(); // 년도
					     month = today.getMonth() ;  // 월
					     date  = today.getDate();  // 날짜
				}
						else if(defaultValue.includes("W") && defaultValue.length>1 && !(defaultValue.includes("+") || defaultValue.includes("-"))){
					      var weekNum =	defaultValue.substring(0,defaultValue.indexOf('W')) =='T' ? moment().isoWeeks()+'': defaultValue.substring(0,defaultValue.indexOf('W'));
					      
					      year = moment(moment().years()+weekNum, 'YYYYWW').format('YYYY');					     
					      month = moment(moment().years()+weekNum, 'YYYYWW').format('MM')-1+'';
					      date = moment(moment().years()+weekNum, 'YYYYWW').format('DD');
					     
				}
					else if(defaultValue.includes("W") && defaultValue.length>1 && (defaultValue.includes("+") || defaultValue.includes("-"))){
						var weekNum ='1';
						var dateType ='+';
						var calNum = 0;
			
						  if (defaultValue.indexOf('+')>0){
							  dateType = defaultValue.substring(defaultValue.indexOf('+'),defaultValue.indexOf('+')+1); 
							  weekNum =	defaultValue.substring(0,defaultValue.indexOf('W')) =='T' ? moment().isoWeeks()+'': defaultValue.substring(0,defaultValue.indexOf('W'));
							  calNum = defaultValue.substring(defaultValue.indexOf('+')+1,defaultValue.length-1);
							  year = moment(moment().years()+weekNum, 'YYYYWW').add(calNum,'days').format('YYYY')				     
						      month = moment(moment().years()+weekNum, 'YYYYWW').add(calNum,'days').format('MM')-1+'';
						      date = moment(moment().years()+weekNum, 'YYYYWW').add(calNum,'days').format('DD')
						  }
						  else  if (defaultValue.indexOf('-')>0){
							  dateType = defaultValue.substring(defaultValue.indexOf('-'),defaultValue.indexOf('-')+1); 
							  weekNum =	defaultValue.substring(0,defaultValue.indexOf('W')) =='T' ? moment().isoWeeks()+'': defaultValue.substring(0,defaultValue.indexOf('W'));
							  calNum = defaultValue.substring(defaultValue.indexOf('-')+1,defaultValue.length-1);
							  year = moment(moment().years()+weekNum, 'YYYYWW').subtract(calNum,'days').format('YYYY')				     
						      month = moment(moment().years()+weekNum, 'YYYYWW').subtract(calNum,'days').format('MM')-1+'';
						      date = moment(moment().years()+weekNum, 'YYYYWW').subtract(calNum,'days').format('DD')
						  }
					     
					  
					      
				}
				else if(defaultValue.includes("TODAY") && defaultValue.length>5){
				var dateNum  =	defaultValue.substring(5,defaultValue.length-1);
				var dateType =	defaultValue.substring(defaultValue.length,defaultValue.length-1);
				  if(dateType == 'M'){
					 today = new Date(today.setMonth(today.getMonth() +Number(dateNum)));
					 year = today.getFullYear(); // 년도
				     month = today.getMonth() ;  // 월
				     date = today.getDate();  // 날짜
				  }
				  else if (dateType == 'D'){
					 today = new Date(today.setDate(today.getDate() +Number(dateNum)));
					 year  = today.getFullYear(); // 년도
				     month = today.getMonth() ;  // 월
				     date  = today.getDate();  // 날짜
				  }
				  else{
					
				  }
				
				}
				else if(defaultValue.includes("INIT") && defaultValue.length>5){
					var dateNum  =	defaultValue.substring(4,6);
				    var dateType =	defaultValue.substring(6,7);
				    today = new Date(today.getFullYear(), today.getMonth(), 1);
				      if(dateType == 'M'){
						 today = new Date(today .setMonth(today.getMonth() +Number(dateNum)));
						 year = today.getFullYear(); // 년도
					     month = today.getMonth() ;  // 월
					     date = today.getDate();  // 날짜
				      }
					  else if (dateType == 'D'){
						 today = new Date(today.setDate(today.getDate() +Number(dateNum)));
						 year  = today.getFullYear(); // 년도
					     month = today.getMonth() ;  // 월
					     date  = today.getDate();  // 날짜
					  }
					  else{
						 
					  }
				}
					else if(defaultValue.includes("LAST") && defaultValue.length>5){
					var dateNum  =	defaultValue.substring(4,6);
				    var dateType =	defaultValue.substring(6,7);
				        today    = new Date(today.getFullYear(), today.getMonth()+1, 0);
				      if(dateType == 'M'){
						 today = new Date(today .setMonth(today.getMonth() +Number(dateNum)));
						 year = today.getFullYear(); // 년도
					     month = today.getMonth() ;  // 월
					     date = today.getDate();  // 날짜
				      }
					  else if (dateType == 'D'){
						 today = new Date(today.setDate(today.getDate() +Number(dateNum)));
						 year  = today.getFullYear(); // 년도
					     month = today.getMonth() ;  // 월
					     date  = today.getDate();  // 날짜
					  }
					  else{
						
					  }
				}
				else{
					 year = today.getFullYear(); // 년도
				     month = today.getMonth() ;  // 월
				     date = today.getDate();  // 날짜
				}
						
				 var calendar = new Date();
                 calendar.setFullYear(year, month, date);
				$('#'+searchId+'SP'+(index+1)).jqxDateTimeInput({ width: '210px', height: '25px',formatString: "yyyy-MM-dd",editMode: 'full',allowNullDate: true,value: null});
				$('#'+searchId+'SP'+(index+1)).jqxDateTimeInput('setDate', calendar);
				   
       //input을 datepicker로 선언
              
  
			}
			else if(searchType == 'CP'){
					var today = new Date();  
					var year  = undefined; // 년도
				    var month = undefined;;  // 월
				    var date  = undefined;;  // 날짜
				    const defaultValueArray = defaultValue.split('/');
				    let defaultValue1 = defaultValueArray[0] == undefined ? '':defaultValueArray[0];
				    let defaultValue2 = defaultValueArray[1] == undefined ? '':defaultValueArray[1];
				if(defaultValue1 == 'TODAY'){
					 year = today.getFullYear(); // 년도
				     month = today.getMonth() ;  // 월
				     date = today.getDate();  // 날짜
				    
				}
				else if(defaultValue1.includes("W") && defaultValue1.length>1 && !(defaultValue1.includes("+") || defaultValue1.includes("-"))){
					      var weekNum =	defaultValue1.substring(0,defaultValue1.indexOf('W')) =='T' ? moment().isoWeeks()+'': defaultValue1.substring(0,defaultValue1.indexOf('W'));
					      year = moment(moment().years()+weekNum, 'YYYYWW').format('YYYY');					     
					      month = moment(moment().years()+weekNum, 'YYYYWW').format('MM')-1+'';
					      date = moment(moment().years()+weekNum, 'YYYYWW').format('DD');
					     
				}
					else if(defaultValue1.includes("W") && defaultValue1.length>1 && (defaultValue1.includes("+") || defaultValue1.includes("-"))){
						var weekNum ='1';
						var dateType ='+';
						var calNum = 0;
			
						  if (defaultValue1.indexOf('+')>0){
							  dateType = defaultValue1.substring(defaultValue1.indexOf('+'),defaultValue1.indexOf('+')+1); 
							  weekNum =	defaultValue1.substring(0,defaultValue1.indexOf('W')) =='T' ? moment().isoWeeks()+'': defaultValue1.substring(0,defaultValue1.indexOf('W'));
							  calNum = defaultValue1.substring(defaultValue1.indexOf('+')+1,defaultValue1.length-1);
							  year = moment(moment().years()+weekNum, 'YYYYWW').add(calNum,'days').format('YYYY')				     
						      month = moment(moment().years()+weekNum, 'YYYYWW').add(calNum,'days').format('MM')-1+'';
						      date = moment(moment().years()+weekNum, 'YYYYWW').add(calNum,'days').format('DD')
						  }
						  else  if (defaultValue1.indexOf('-')>0){
							  dateType = defaultValue1.substring(defaultValue1.indexOf('-'),defaultValue1.indexOf('-')+1); 
							  weekNum =	defaultValue1.substring(0,defaultValue1.indexOf('W')) =='T' ? moment().isoWeeks()+'': defaultValue1.substring(0,defaultValue1.indexOf('W'));
							  calNum = defaultValue1.substring(defaultValue1.indexOf('-')+1,defaultValue1.length-1);
							  year = moment(moment().years()+weekNum, 'YYYYWW').subtract(calNum,'days').format('YYYY')				     
						      month = moment(moment().years()+weekNum, 'YYYYWW').subtract(calNum,'days').format('MM')-1+'';
						      date = moment(moment().years()+weekNum, 'YYYYWW').subtract(calNum,'days').format('DD')
						  }
					     
					  
					      
				}
				else if(defaultValue1 == 'INIT'){
					     today = new Date(today.getFullYear(), today.getMonth(), 1);
						 year  = today.getFullYear(); // 년도
					     month = today.getMonth() ;  // 월
					     date  = today.getDate();  // 날짜
				}
				else if(defaultValue1 == 'LAST'){
					     today = new Date(today.getFullYear(), today.getMonth()+1, 0);
						 year  = today.getFullYear(); // 년도
					     month = today.getMonth() ;  // 월
					     date  = today.getDate();  // 날짜
				}
				else if(defaultValue1.includes("TODAY") && defaultValue1.length>5){
				var dateNum  =	defaultValue1.substring(5,defaultValue1.length-1);
				var dateType =	defaultValue1.substring(defaultValue1.length,defaultValue1.length-1);
				  if(dateType == 'M'){
					 today = new Date(today.setMonth(today.getMonth() +Number(dateNum)));
					 year = today.getFullYear(); // 년도
				     month = today.getMonth() ;  // 월
				     date = today.getDate();  // 날짜
				  }
				  else if (dateType == 'D'){
					 today = new Date(today.setDate(today.getDate() +Number(dateNum)));
					 year  = today.getFullYear(); // 년도
				     month = today.getMonth() ;  // 월
				     date  = today.getDate();  // 날짜
				  }
				  else{
					
				  }
				
				}
				else if(defaultValue1.includes("INIT") && defaultValue1.length>5){
					var dateNum  =	defaultValue1.substring(4,6);
				    var dateType =	defaultValue1.substring(6,7);
				    today = new Date(today.getFullYear(), today.getMonth(), 1);
				      if(dateType == 'M'){
						 today = new Date(today .setMonth(today.getMonth() +Number(dateNum)));
						 year = today.getFullYear(); // 년도
					     month = today.getMonth() ;  // 월
					     date = today.getDate();  // 날짜
				      }
					  else if (dateType == 'D'){
						 today = new Date(today.setDate(today.getDate() +Number(dateNum)));
						 year  = today.getFullYear(); // 년도
					     month = today.getMonth() ;  // 월
					     date  = today.getDate();  // 날짜
					  }
					  else{
						 
					  }
				}
					else if(defaultValue1.includes("LAST") && defaultValue1.length>5){
					var dateNum  =	defaultValue1.substring(4,6);
				    var dateType =	defaultValue1.substring(6,7);
				        today    = new Date(today.getFullYear(), today.getMonth()+1, 0);
				      if(dateType == 'M'){
						 today = new Date(today .setMonth(today.getMonth() +Number(dateNum)));
						 year = today.getFullYear(); // 년도
					     month = today.getMonth() ;  // 월
					     date = today.getDate();  // 날짜
				      }
					  else if (dateType == 'D'){
						 today = new Date(today.setDate(today.getDate() +Number(dateNum)));
						 year  = today.getFullYear(); // 년도
					     month = today.getMonth() ;  // 월
					     date  = today.getDate();  // 날짜
					  }
					  else{
						
					  }
				}
				else{
					 year = today.getFullYear(); // 년도
				     month = today.getMonth() ;  // 월
				     date = today.getDate();  // 날짜
				}
						
				 var calendar = new Date();
                 calendar.setFullYear(year, month, date);
				$('#'+searchId+'SD'+(index+1)).jqxDateTimeInput({ width: '115px', height: '25px',formatString: "yyyy-MM-dd",editMode: 'full',allowNullDate: true,value: null});
				$('#'+searchId+'SD'+(index+1)).jqxDateTimeInput('setDate', calendar);
			    today = new Date();
				
				
				if(defaultValue2 == 'TODAY'){
					 year = today.getFullYear(); // 년도
				     month = today.getMonth() ;  // 월
				     date = today.getDate();  // 날짜
				    
				}
				else if(defaultValue2 == 'INIT'){
					     today = new Date(today.getFullYear(), today.getMonth(), 1);
						 year  = today.getFullYear(); // 년도
					     month = today.getMonth() ;  // 월
					     date  = today.getDate();  // 날짜
				}
				else if(defaultValue2 == 'LAST'){
					     today = new Date(today.getFullYear(), today.getMonth()+1, 0);
						 year  = today.getFullYear(); // 년도
					     month = today.getMonth() ;  // 월
					     date  = today.getDate();  // 날짜
				}
				else if(defaultValue2.includes("TODAY") && defaultValue2.length>5){
				var dateNum  =	defaultValue2.substring(5,defaultValue2.length-1);
				var dateType =	defaultValue2.substring(defaultValue2.length,defaultValue2.length-1);
				  if(dateType == 'M'){
					 today = new Date(today.setMonth(today.getMonth() +Number(dateNum)));
					 year = today.getFullYear(); // 년도
				     month = today.getMonth() ;  // 월
				     date = today.getDate();  // 날짜
				  }
				  else if (dateType == 'D'){
					 today = new Date(today.setDate(today.getDate() +Number(dateNum)));
					 year  = today.getFullYear(); // 년도
				     month = today.getMonth() ;  // 월
				     date  = today.getDate();  // 날짜
				  }
				  else{
					
				  }
				
				}
				else if(defaultValue2.includes("W") && defaultValue2.length>1 && !(defaultValue2.includes("+") || defaultValue2.includes("-"))){
					      var weekNum =	defaultValue2.substring(0,defaultValue2.indexOf('W')) =='T' ? moment().isoWeeks()+'': defaultValue2.substring(0,defaultValue2.indexOf('W'));
					      year = moment(moment().years()+weekNum, 'YYYYWW').format('YYYY');					     
					      month = moment(moment().years()+weekNum, 'YYYYWW').format('MM')-1+'';
					      date = moment(moment().years()+weekNum, 'YYYYWW').format('DD');
					     
				}
					else if(defaultValue2.includes("W") && defaultValue2.length>1 && (defaultValue2.includes("+") || defaultValue2.includes("-"))){
						var weekNum ='1';
						var dateType ='+';
						var calNum = 0;
			
						  if (defaultValue2.indexOf('+')>0){
							  dateType = defaultValue2.substring(defaultValue2.indexOf('+'),defaultValue2.indexOf('+')+1); 
							  weekNum =	defaultValue2.substring(0,defaultValue2.indexOf('W')) =='T' ? moment().isoWeeks()+'': defaultValue2.substring(0,defaultValue2.indexOf('W'));
							  calNum = defaultValue2.substring(defaultValue2.indexOf('+')+1,defaultValue2.length-1);
							  year = moment(moment().years()+weekNum, 'YYYYWW').add(calNum,'days').format('YYYY')				     
						      month = moment(moment().years()+weekNum, 'YYYYWW').add(calNum,'days').format('MM')-1+'';
						      date = moment(moment().years()+weekNum, 'YYYYWW').add(calNum,'days').format('DD')
						  }
						  else  if (defaultValue2.indexOf('-')>0){
							  dateType = defaultValue2.substring(defaultValue2.indexOf('-'),defaultValue2.indexOf('-')+1); 
							  weekNum =	defaultValue2.substring(0,defaultValue2.indexOf('W')) =='T' ? moment().isoWeeks()+'': defaultValue2.substring(0,defaultValue2.indexOf('W'));
							  calNum = defaultValue2.substring(defaultValue2.indexOf('-')+1,defaultValue2.length-1);
							  year = moment(moment().years()+weekNum, 'YYYYWW').subtract(calNum,'days').format('YYYY')				     
						      month = moment(moment().years()+weekNum, 'YYYYWW').subtract(calNum,'days').format('MM')-1+'';
						      date = moment(moment().years()+weekNum, 'YYYYWW').subtract(calNum,'days').format('DD')
						  }
					     
					  
					      
				}
				else if(defaultValue2.includes("INIT") && defaultValue2.length>5){
					var dateNum  =	defaultValue2.substring(4,6);
				    var dateType =	defaultValue2.substring(6,7);
				    today = new Date(today.getFullYear(), today.getMonth(), 1);
				      if(dateType == 'M'){
						 today = new Date(today .setMonth(today.getMonth() +Number(dateNum)));
						 year = today.getFullYear(); // 년도
					     month = today.getMonth() ;  // 월
					     date = today.getDate();  // 날짜
				      }
					  else if (dateType == 'D'){
						 today = new Date(today.setDate(today.getDate() +Number(dateNum)));
						 year  = today.getFullYear(); // 년도
					     month = today.getMonth() ;  // 월
					     date  = today.getDate();  // 날짜
					  }
					  else{
						 
					  }
				}
					else if(defaultValue2.includes("LAST") && defaultValue2.length>5){
					var dateNum  =	defaultValue2.substring(4,6);
				    var dateType =	defaultValue2.substring(6,7);
				        today    = new Date(today.getFullYear(), today.getMonth()+1, 0);
				      if(dateType == 'M'){
						 today = new Date(today .setMonth(today.getMonth() +Number(dateNum)));
						 year = today.getFullYear(); // 년도
					     month = today.getMonth() ;  // 월
					     date = today.getDate();  // 날짜
				      }
					  else if (dateType == 'D'){
						 today = new Date(today.setDate(today.getDate() +Number(dateNum)));
						 year  = today.getFullYear(); // 년도
					     month = today.getMonth() ;  // 월
					     date  = today.getDate();  // 날짜
					  }
					  else{
						
					  }
				}
				else{
					 year = today.getFullYear(); // 년도
				     month = today.getMonth() ;  // 월
				     date = today.getDate();  // 날짜
				}
						
				 var calendar = new Date();
                 calendar.setFullYear(year, month, date);
			
				$('#'+searchId+'ED'+(index+1)).jqxDateTimeInput({ width: '115px', height: '25px',formatString: "yyyy-MM-dd",editMode: 'full',allowNullDate: true,value: null});
				$('#'+searchId+'ED'+(index+1)).jqxDateTimeInput('setDate', calendar);
			}
			else{
				
			}
		}
		},	

	createSearchArea: {
		h01 : function(classItem,searchItem,searchBtn) {
		var topHtml  = '';
		var midHtml  = '';
	    var botHtml = '';
	    topHtml =	'<div id="searchArea" class='+classItem[0].searchAreaClass+'>'
		  // +'<ul id="ul" class="w-list-unstyled w-clearfix b1">';
	    +'<ul id="ul" class="row pe-3 searchRowBox h01">';
		  for(var i=0;i<searchItem.length;i++){	    
		       if(i== (searchItem.length-1)){
			       midHtml +=  '<li class='+classItem[0].searchItemClass+'>'+ 
					       '<div class='+classItem[0].labelBoxClass+'style="align-self: center!important;"'+'>'+
					       '<div class='+searchItem[i].circelClass+'></div>'+
					        searchItem[i].headerField+
					       '</div>'+
					        searchItem[i].labelField+		         
		             '</li>'+
		             searchBtn;
		            
		             
		       }
		       else{
		    	   midHtml +=  '<li class='+classItem[0].searchItemClass+'>' 
					+'       <div class='+classItem[0].labelBoxClass+'style="align-self: center!important;"'+'>'
					+'        <div class='+searchItem[i].circelClass+'></div>'
					+        searchItem[i].headerField
					+'       </div>'
					+        searchItem[i].labelField
					+      '</li>';
		       }
					
		}
	           botHtml  = '</ul>';
	        	    + '</div>';
			return topHtml + midHtml + botHtml;
		},		
		h02 : function(classItem,searchItem,searchBtn) {
		var topHtml  = '';
		var midHtml  = '';
	    var botHtml = '';
	    var topHtml2  = '';
		var midHtml2  = '';
	    var botHtml2 = '';
	    var searchHtml = '';
	    topHtml =	'<div id="searchArea" class='+classItem[0].searchAreaClass+'>'
	                  +'<ul id="ul" class="row pe-3  searchRowBox h02">';
		  for(var i=0;i<3;i++){	    
		    	   midHtml +=  '<li class='+classItem[0].searchItemClass+'>' 
					+'       <div class='+classItem[0].labelBoxClass+'style="align-self: center!important;"'+'>'
					+'        <div class='+searchItem[i].circelClass+'></div>'
					+        searchItem[i].headerField
					+'       </div>'
					+        searchItem[i].labelField
					+      '</li>';		       					
		}
	           botHtml  = '</ul>'
	           
	           
	        	   // + '</div>';
			searchHtml = topHtml + midHtml + botHtml;
	
				topHtml2 =	'<ul id="ul" class="row pe-3  searchRowBox h02">';
			
			
			  for(var j=3;j<searchItem.length;j++){	    
		       if(j==(searchItem.length-1)){
			       midHtml2 +=  '<li class='+classItem[0].searchItemClass+'>' 
						+'       <div class='+classItem[0].labelBoxClass+'style="align-self: center!important;"'+'>'
					+'        <div class='+searchItem[j].circelClass+'></div>'
					+        searchItem[j].headerField
					+'       </div>'
					+        searchItem[j].labelField		        
		            + '</li>'
		            + searchBtn;

		           
		           
		       }
		       else{
		    	   midHtml2 +=  '<li class='+classItem[0].searchItemClass+'>' 
					+'       <div class='+classItem[0].labelBoxClass+'style="align-self: center!important;"'+'>'
					+'        <div class='+searchItem[j].circelClass+'></div>'
					+        searchItem[j].headerField
					+'       </div>'
					+        searchItem[j].labelField
					+      '</li>';
		       }
					
		}
		botHtml2  = '</ul>'
		        + '</div>';
		        return searchHtml+ topHtml2+midHtml2+botHtml2;
		  // +'<ul id="ul" class="w-list-unstyled w-clearfix b1">';
	    
			
			
		},
		h03 : function(classItem,searchItem,searchBtn) {
		var topHtml  = '';
		var midHtml  = '';
	    var botHtml = '';
	    var topHtml2  = '';
		var midHtml2  = '';
	    var botHtml2 = '';
	    var topHtml3  = '';
		var midHtml3  = '';
	    var botHtml3 = '';
	    var searchHtml = '';
	    var searchHtml2 = '';
	    topHtml =	'<div id="searchArea" class='+classItem[0].searchAreaClass+'>'
	                  +'<ul id="ul" class="row pe-3  searchRowBox h03">';
		  for(var i=0;i<3;i++){	    
		    	   midHtml +=  '<li class='+classItem[0].searchItemClass+'>' 
					+'       <div class='+classItem[0].labelBoxClass+'style="align-self: center!important;"'+'>'
					+'        <div class='+searchItem[i].circelClass+'></div>'
					+        searchItem[i].headerField
					+'       </div>'
					+        searchItem[i].labelField
					+      '</li>';		       					
		}
	           botHtml  = '</ul>'
	           
	           
	        	   // + '</div>';
			searchHtml = topHtml + midHtml + botHtml;
			
		topHtml2 =	'<ul id="ul" class="row pe-3  searchRowBox h03">';
		
		for(var k=3;k<6;k++){	    
		    	   midHtml2 +=  '<li class='+classItem[0].searchItemClass+'>' 
					+'       <div class='+classItem[0].labelBoxClass+'style="align-self: center!important;"'+'>'
					+'        <div class='+searchItem[k].circelClass+'></div>'
					+        searchItem[k].headerField
					+'       </div>'
					+        searchItem[k].labelField
					+      '</li>';		       					
		}
	           botHtml2  = '</ul>'
	           
	           
	        	   // + '</div>';
			searchHtml2 = topHtml2 + midHtml2 + botHtml2;
		
				topHtml3 =	'<ul id="ul" class="row pe-3  searchRowBox h03">';
			
			
			  for(var j=6;j<searchItem.length;j++){	    
		       if(j==(searchItem.length-1)){
			       midHtml3 +=  '<li class='+classItem[0].searchItemClass+'>' 
					+'       <div class='+classItem[0].labelBoxClass+'style="align-self: center!important;"'+'>'
					+'        <div class='+searchItem[j].circelClass+'></div>'
					+        searchItem[j].headerField
					+'       </div>'
					+        searchItem[j].labelField		        
		            + '</li>'
		            + searchBtn;

		           
		           
		       }
		       else{
		    	   midHtml3 +=  '<li class='+classItem[0].searchItemClass+'>' 
					+'       <div class='+classItem[0].labelBoxClass+'style="align-self: center!important;"'+'>'
					+'        <div class='+searchItem[j].circelClass+'></div>'
					+        searchItem[j].headerField
					+'       </div>'
					+        searchItem[j].labelField
					+      '</li>';
		       }
					
		}
		botHtml3  = '</ul>'
		        + '</div>';
		        return searchHtml+ searchHtml2 +topHtml3+midHtml3+botHtml3;
		  // +'<ul id="ul" class="w-list-unstyled w-clearfix b1">';
	    
			
			
		}
	},

		tm1st : function(index,splitRatio,content,target) {
		var html ='<div id ='+ content+index+' class = "row tabcontentarea1"></div>';  
		$(target).append(html); 		
		return html;
		},
		tm2h : function(index,splitRatio,content,target) {
	    var html     =	 '<div id = "split1" class="splitGrid">'
		           +     '<div id = "contentArea1" class = "row tabcontentarea55"></div>'
	               +     '<div id = "contentArea2" class = "row tabcontentarea55"></div>'	               
	        	   +     '</div>';		
		$(target).append(html);   
		 $('#split1').jqxSplitter({ width:'100%', height: '100%', orientation: 'horizontal', panels: [{ size:Number(splitRatio.substring(0, 1))*10 + '%'}, {size: Number(splitRatio.substring(1, 2))*10 + '%'}]});
		return html;
		},
		tm2v : function(index,splitRatio,content,target) {
		    var html     =	 '<div id = "split'+index+'" class="splitGrid">'
			           +     '<div id = "contentArea'+index+'" class = "row tabcontentarea'+index+'"></div>'
		               +     '<div id = "contentArea'+(index+1)+'" class = "row tabcontentarea'+index+'"></div>'	               
		        	   +     '</div>';	  
			$(target).append(html);  
			$('#split'+index).jqxSplitter({ width:'100%', height: '100%', orientation: 'vertical', panels: [{ size:Number(splitRatio.substring(0, 1))*10 + '%'}, {size: Number(splitRatio.substring(1, 2))*10 + '%'}]});
			return html;
		},
		tm3vh : function(index,splitRatio,content,target) {
		    var html     = '<div id = "split1" class="splitGrid">'
                         +    '<div>'
                         +      '<div id = "split2" class="splitGrid">'
                         +       '<div id = '+ content+index+' class = "row tabcontentarea55"></div>'
                         +       '<div id = '+ content+(index+2)+' class = "row tabcontentarea55"></div>'	
                         +      '</div>'
                         +    '</div>'
                         +    '<div id = '+ content+(index+1)+' class = "row tabcontentarea1"></div>'
                         + '</div>';
			$(target).append(html);  
			$('#split1').jqxSplitter({ width:'100%', height: '100%', orientation: 'vertical', panels: [{ size:Number(splitRatio.substring(0, 1))*10 + '%'}, {size: Number(splitRatio.substring(1, 2))*10 + '%'}]});
			$('#split2').jqxSplitter({ width:'100%', height: '100%', orientation: 'horizontal', panels: [{ size:Number(splitRatio.substring(2, 3))*10 + '%'}, {size: Number(splitRatio.substring(3, 4))*10 + '%'}]});
			return html;
		},
		tm3hv : function(index,splitRatio,content,target) {
		      var html     = '<div id = "split1" class="row splitGrid">'
		                 +    '<div id = '+ content+index+' class = "row tabcontentarea1"></div>'
                         +    '<div>'
                         +      '<div id = "split2" class="row splitGrid">'
                         +       '<div id = '+ content+(index+1)+' class = "row tabcontentarea55"></div>'
                         +       '<div id = '+ content+(index+2)+' class = "row tabcontentarea55"></div>'	
                         +      '</div>'
                         +    '</div>'
                         + '</div>';
			$(target).append(html);  
			$('#split1').jqxSplitter({ width:'100%', height: '100%', orientation: 'horizontal', panels: [{ size:Number(splitRatio.substring(0, 1))*10 + '%'}, {size: Number(splitRatio.substring(1, 2))*10 + '%'}]});
			$('#split2').jqxSplitter({ width:'100%', height: '100%', orientation: 'vertical', panels: [{ size:Number(splitRatio.substring(2, 3))*10 + '%'}, {size: Number(splitRatio.substring(3, 4))*10 + '%'}]});
			return html;
		},
		tm4vvh : function(index,splitRatio,content,target) {
		    var html     = '<div id = "split1" class="splitGrid">'
                         +    '<div>'
                         +      '<div id = "split2" class="splitGrid">'
                         +        '<div id = "contentArea1" class = "row tabcontentarea"></div>'
                         +        '<div id = "contentArea2" class = "row tabcontentarea"></div>'	
                         +      '</div>'
                         +    '</div>'
                         +    '<div>'
                         +      '<div id = "split3" class="splitGrid">'
                         +       '<div id = "contentArea3" class = "row tabcontentarea"></div>'
                         +       '<div id = "contentArea4" class = "row tabcontentarea"></div>'	
                         +      '</div>'
                         +    '</div>'
                         + '</div>';
			$(target).append(html);  
			$('#split1').jqxSplitter({ width:'100%', height: '100%', orientation: 'vertical', panels: [{ size:Number(splitRatio.substring(0, 1))*10 + '%'}, {size: Number(splitRatio.substring(1, 2))*10 + '%'}]});
			$('#split2').jqxSplitter({ width:'100%', height: '100%', orientation: 'vertical', panels: [{ size:Number(splitRatio.substring(2, 3))*10 + '%'}, {size: Number(splitRatio.substring(3, 4))*10 + '%'}]});
			$('#split3').jqxSplitter({ width:'100%', height: '100%', orientation: 'horizontal', panels: [{ size:Number(splitRatio.substring(4, 5))*10 + '%'}, {size: Number(splitRatio.substring(5, 6))*10 + '%'}]});
			return html;
		},
	createGridArea: {
		h00 : function(index,gridId,gridSizeClass) {
	    var html   =	'<div class='+'"col-xl-12 px-0 '+gridSizeClass+'">'
	               +     '<div class = "card" id="main-box'+index+'">'
		           +     '<div class = "card-header ps-0 pe-2 pb-1 gridTab'+index+'"></div>'
	               +     '<div class = "card-body grid-box'+index+'-h00">'
	               +      '<div id='+gridId+' class="grid" data-name="페이지정보"></div>'
	        	   +     '</div></div></div>';
			return html;
		},
		h01 : function(index,gridId,gridSizeClass) {
	    var html   =	'<div class='+'"col-xl-12 px-0 '+gridSizeClass+'">'
	               +     '<div class = "card" id="main-box'+index+'">'
		           +     '<div class = "card-header  ps-0 pe-2 pb-1 gridTab'+index+'"></div>'
	               +     '<div class = "card-body grid-box'+index+'-h01">'
	               +      '<div id='+gridId+' class="grid" data-name="페이지정보"></div>'
	        	    +     '</div></div></div>';
			return html;
		},
		h02 : function(index,gridId,gridSizeClass) {
	    var html   =	'<div class='+'"col-xl-12 px-0 '+gridSizeClass+'">'
	      		   +     '<div class = "card">'
		           +     '<div class = "card-header  ps-0 pe-2 pb-1 gridTab'+index+'"></div>'
	               +     '<div class = "card-body grid-box'+index+'-h02">'
	               +      '<div id='+gridId+' class="grid" data-name="페이지정보"></div>'
	        	  +     '</div></div></div>';
			return html;
		},
		h03 : function(index,gridId,gridSizeClass) {
	    var html   =	'<div class='+'"col-xl-12 px-0 '+gridSizeClass+'">'
	      		   +     '<div class = "card">'
		           +     '<div class = "card-header  ps-0 pe-2 pb-1 gridTab'+index+'"></div>'
	               +     '<div class = "card-body grid-box'+index+'-h03">'
	               +      '<div id='+gridId+' class="grid" data-name="페이지정보"></div>'
	        	   +     '</div></div></div>';
			return html;
		}
	/*	
		h02 : function() {
			
		}	*/
	},     
	createGridTabArea: {
		rightTab : function(index,btnItem) {
	    var topHtml = '<div class="end widget-box2">';
	    var midHtml = '';
	    var botHtml = '';
	    for(var i=0;i<btnItem.length;i++){
	    	/* midHtml +=   '<a id='+ btnItem[i].buttonId + ' class = "btntool gridTab" href="#">'
               +     '<div class ="w-icon '+btnItem[i].buttonIcon+'"></div>'
               +     '<div multi-lang="" class="textblock gridRightTab">'+btnItem[i].buttonNm+'</div>'
        	   +     '</a>';		*/        	  
					if(btnItem[i].buttonId.indexOf('customBtn')>=0){
						let btnSeq = btnItem[i].buttonId.split('-')[1];
						let customBtnId = 'customBtn'+index+'-'+btnSeq;
						btnItem[i].buttonId = customBtnId;
						/* if(index>10&&index%10<10){
							midHtml += '<button type="button" class="custom-btn btn btn-search" id='+ customBtnId+'><i class="mdi '+btnItem[i].buttonIcon+'"></i>'+btnItem[i].buttonNm+'</button>';
						}
						else{
							midHtml += '<button type="button" class="custom-btn btn btn-search" id='+ btnItem[i].buttonId+'><i class="mdi '+btnItem[i].buttonIcon+'"></i>'+btnItem[i].buttonNm+'</button>';
						}*/
						midHtml += '<button type="button" class="custom-btn btn btn-search" id='+ btnItem[i].buttonId+'><i class="mdi '+btnItem[i].buttonIcon+'"></i>'+btnItem[i].buttonNm+'</button>';
					}
					else{
						 midHtml += '<button type="button" class="btn btn-search" id='+ btnItem[i].buttonId+index+'><i class="mdi '+btnItem[i].buttonIcon+'"></i>'+btnItem[i].buttonNm+'</button>';
					}
	               
               
           
        	  
	    }
	    botHtml  = '</div>';
	    return topHtml + midHtml+botHtml;
		},
		leftTab : function(index,gridTitle,btnItem) {
		    var topHtml = '<div class="widget-box1 h-75 ms-2">';
		    var midHtml = '';
		    var botHtml = '';
		    	 midHtml += '<div class ="w-icon fa fa-align-justify icon"></div>'
	                     + '<div multi-lang="" class="textblock gridLeftTab">'+gridTitle+'</div>';		    
		         botHtml  = '</div>';
		    return topHtml + midHtml+botHtml;
			}
		/*h02 : function() {
			
		}*/	
	},
	createChangePop: {
		password : function(index,title) {			
			var html  = '<div id ="changePwPop'+(index+1)+'"  class="modal modal-content modal-content-change-pop"style="display: none;height: 11rem;">'+
						  '<div class="modal-header" style="padding-bottom: 0.7rem;height: 32%;">'+
						    '<h6 class="modal-title" style="font-size: 1.5rem;">비밀번호변경</h6>'+
							  '<button aria-label="Close" class="btn-close" data-bs-dismiss="modal"><span aria-hidden="true">×</span></button>'+
						  '</div>'+
						  '<div class="modal-body" style="height: 51%;">'+
							'<div class="w-col w-col-3" style="margin-top: -0.5rem;margin-left: -0.2rem;">'+
								'<div class="labelbox">'+
									'<div class="circle">'+
									'</div>'+
									'<div class="textblock">현재비밀번호'+										
									'</div>'+
								'</div>'+
								'<input maxlength="256" id="nowPassword'+(index+1)+'" type="text" class="w-input searchInputField" date-format="date" style="background: rgb(255, 255, 255);width: 18.5rem;">'+
							'</div>'+
							'<div class="w-col w-col-3" style="margin-top: -0.5rem;margin-left: 3.5rem;margin-right: 3.6rem;">'+
							'<div class="labelbox">'+
								'<div class="circle">'+
								'</div>'+
								'<div class="textblock">변경할비밀번호'+									
								'</div>'+
							'</div>'+
							'<input maxlength="256" id="changePassword'+(index+1)+'" type="text" class="w-input searchInputField" date-format="date" style="background: rgb(255, 255, 255);width: 18.5rem;">'+
						 '</div>'+
						 '<button id ="saveBtnCp'+(index+1)+'" class="btn btn-light" style="margin-top: 1.5rem;"><i class="mdi mdi-content-save-outline"></i>변경</button><button id ="closeBtnCp'+(index+1)+'" class="btn btn-light" style="margin-top: 1.5rem;margin-left: 0.5rem;"><i class="mdi mdi-window-close"></i>'+multiLang.transText('MESSAGE','MSG00036')+'</button>'+
						  '</div>'+
						'</div>';
			return html;
			}
		},
	createFileUploadPop: {
		excelUp : function(index,title) {			
			var html  = '<div class="modal" id="excelUpPop'+(index+1)+'" style="z-index: 9999;display: none;" aria-hidden="true">'+
			    '<div class="modal-dialog" role="document">'+
			        '<div class="modal-content excelUploadPop">'+
			            '<div class="modal-header-excelUp pt-3 pb-1">'+
			                '<div class="textblock modal-header-title-text excelUpPop-title">엑셀 업로드</div> <button aria-label="Close" class="btn-close" data-bs-dismiss="modal" type="button"></button>'+
			            '</div>'+
			            '<div class="modal-body">'+
			                '<div class="excel-input-box">'+ 
			                  '<input type="file" class = "excel-input-text" accept=".xls, .xlsx, .csv" id="excelFile'+(index+1)+'">'+
			                    '<div class="progress">'+
			                      '<div class="bar"></div>'+
			                        '<div class="percent">0%</div>'+
			                      '</div>'+
			                        '<div id="status"></div>'+
			                  '</div>'+
			                '<div class="excel-grid-box">'+
			                  '<div id ="excelUpGrid'+(index+1)+'" class="excel-up-grid">'+
			                '</div>'+
			            '</div>'+
			            '<div class="modal-footer excelUp"><div class="excel-up-footer"><button class="btn excel-up-pop-btn " disabled="disabled" type="button" id="exUpCheck'+(index+1)+'"><i class="mdi mdi-file-find"></i>검사</button>  <button class="btn excel-up-pop-btn " type="button" disabled="disabled" id="exUpCheckDown'+(index+1)+'" "><i class="mdi mdi-cloud-download"></i>검사결과</button>  <button class="btn excel-up-pop-btn " type="button" disabled="disabled" id="saveBtnExUp'+(index+1)+'"><i class="mdi mdi-file-upload-outline"></i>업로드</button> <button class="btn excel-up-pop-btn" type="button" id="cancelBtnExUp'+(index+1)+'"><i class="mdi mdi-window-close"></i>'+multiLang.transText('MESSAGE','MSG00036')+'</button></div</div>'+
			        '</div>'+
			    '</div>'+
			'</div>';
			return html;
		},
		progressBar: function(index,title){
			var html = '<div class="modal fade" id="pleaseWaitDialog" aria-hidden="true" >'+
			             '<div class="modal-dialog modal-process">'+
			             	'<div class="modal-content">'+
			                  '<div class="modal-header">'+
			                  '<h3>Upload processing...</h3>'+
			                  '</div>'+
			                  '<div class="modal-body">'+     
			                    '<div class="progress">'+
			                      '<div class="bar"></div>'+
			                        '<div class="percent">0%</div>'+
			                      '</div>'+
			                        '<div id="status"></div>'+
			                   '</div>'+
			                  '</div>'+
			                '</div>'+
			             '</div>';
			return html;
		}
	},
	createPopup: {
		defaultPop : function(index,colNum,rowNum,popupItem,popupTitle,remarkYn,remarkInline) {	//열3줄 colNum==3
	    var midHtml = '';
		var botHtml = '';
		var tmpCnt  = 1;
		var totalNum = popupItem.length;
		var fieldCnt = remarkInline == 'N' ? 1: popupItem.length%colNum;
		var remarkInlineClass = remarkInline == 'Y' ? 'in' : 'out';
		var defaultPopClass = remarkYn == 'Y' ? 'defaultPop-C'+colNum+'-R'+rowNum+'-remark-'+remarkInlineClass : 'defaultPop-C'+colNum+'-R'+rowNum;
		var searchAreaClass = remarkYn == 'Y' ? 'R'+rowNum+'-remark-'+remarkInlineClass : 'R'+rowNum;
		
		
		var topHtml =	'<div id="defaultPop'+index+'" index='+(index-1)+' class="modal '+defaultPopClass+'">'
	        +    '<div class="panelheader">' 
	        +     '<div class="modal-header-title">'
	        +       '<div class ="fa fa-edit"></div>'
	        +       '<div multi-lang="" id="popupTitle'+index+'" class ="textblock modal-header-title-text">'+popupTitle+'</div>'
	        +     '</div>'
	        +     '<div class = "modal-header-xbtn">'
	        +     '<a href="#" class="bntpopclose"></a>'
	        +     '</div>'
	        +    '</div>'
	        +    '<div class = "searcharea-pop '+searchAreaClass+'">';
	    for(var i=0;i<totalNum;i+=colNum){	//전체 돌리는 개수 
	        if(tmpCnt == rowNum && fieldCnt==1){ // 마지막 하나일떄 
		       	 midHtml +=   '<div class ="modal-contents-row">'
	             +           '<div class ="w-col w-col-'+colNum+'">'
	             +            '<div class ="labelbox">'
	             +              '<div class ='+popupItem[i].circleClass+'></div>'
	             +              '<div class ='+popupItem[i].textClass+'>'+popupItem[i].popupNm+'</div>'  
	             +            '</div>'
	             +          popupItem[i].labelField
	             +           '</div>'
	             +          '</div>'; 
		    	 if(rowNum>tmpCnt){
		    		 tmpCnt ++;
		    	 }
	        }
	        else if(tmpCnt == rowNum && fieldCnt==2){ //마지막 2개일떄 
			       	 midHtml +=   '<div class ="modal-contents-row">'
		             +           '<div class ="w-col w-col-'+colNum+'">'
		             +            '<div class ="labelbox">'
		             +              '<div class ='+popupItem[i].circleClass+'></div>'
		             +              '<div class ='+popupItem[i].textClass+'>'+popupItem[i].popupNm+'</div>'  
		             +            '</div>'
		             +          popupItem[i].labelField
		             +           '</div>';
		             if(remarkYn =='Y'){
						 midHtml += '</div>'
					 +    '<div class ="modal-contents-row">'
		             +           '<div class ="w-col w-col-'+colNum+'">'
		             +            '<div class ="labelbox">'
		             +              '<div class ='+popupItem[i+1].circleClass+'></div>'
		             +              '<div class ='+popupItem[i+1].textClass+'>'+popupItem[i+1].popupNm+'</div>'  
		             +            '</div>'
		             +          popupItem[i+1].labelField
		             +           '</div>'
		             +          '</div>'; 
						 
		             }
		              else{
		  midHtml +=           '<div class ="w-col w-col-'+colNum+'">'
		             +            '<div class ="labelbox">'
		             +              '<div class ='+popupItem[i+1].circleClass+'></div>'
		             +              '<div class ='+popupItem[i+1].textClass+'>'+popupItem[i+1].popupNm+'</div>'  
		             +            '</div>'
		             +          popupItem[i+1].labelField
		             +           '</div>'
		             +          '</div>'; 
		              }
		           
			    	 if(rowNum>tmpCnt){
			    		 tmpCnt ++;
			    	 }
	        }
	                else if(tmpCnt == rowNum && fieldCnt==3){ //마지막 3개일떄 
			       	 midHtml +=   '<div class ="modal-contents-row">'
		             +           '<div class ="w-col w-col-'+colNum+'">'
		             +            '<div class ="labelbox">'
		             +              '<div class ='+popupItem[i].circleClass+'></div>'
		             +              '<div class ='+popupItem[i].textClass+'>'+popupItem[i].popupNm+'</div>'  
		             +            '</div>'
		             +          popupItem[i].labelField
		             +           '</div>'
		             +           '<div class ="w-col w-col-'+colNum+'">'
		             +            '<div class ="labelbox">'
		             +              '<div class ='+popupItem[i+1].circleClass+'></div>'
		             +              '<div class ='+popupItem[i+1].textClass+'>'+popupItem[i+1].popupNm+'</div>'  
		             +            '</div>'
		             +          popupItem[i+1].labelField
		             +           '</div>'
		             +           '<div class ="w-col w-col-'+colNum+'">'
		             +            '<div class ="labelbox">'
		             +              '<div class ='+popupItem[i+2].circleClass+'></div>'
		             +              '<div class ='+popupItem[i+2].textClass+'>'+popupItem[i+2].popupNm+'</div>'  
		             +            '</div>'
		             +          popupItem[i+2].labelField
		             +           '</div>'
		             +          '</div>'; 
			    	 if(rowNum>tmpCnt){
			    		 tmpCnt ++;
			    	 }
	        }
	          else if(tmpCnt == rowNum && fieldCnt==4){ //마지막 4개일떄 
			       	 midHtml +=   '<div class ="modal-contents-row">'
		             +           '<div class ="w-col w-col-'+colNum+'">'
		             +            '<div class ="labelbox">'
		             +              '<div class ='+popupItem[i].circleClass+'></div>'
		             +              '<div class ='+popupItem[i].textClass+'>'+popupItem[i].popupNm+'</div>'  
		             +            '</div>'
		             +          popupItem[i].labelField
		             +           '</div>'
		             +           '<div class ="w-col w-col-'+colNum+'">'
		             +            '<div class ="labelbox">'
		             +              '<div class ='+popupItem[i+1].circleClass+'></div>'
		             +              '<div class ='+popupItem[i+1].textClass+'>'+popupItem[i+1].popupNm+'</div>'  
		             +            '</div>'
		             +          popupItem[i+1].labelField
		             +           '</div>'
		             +           '<div class ="w-col w-col-'+colNum+'">'
		             +            '<div class ="labelbox">'
		             +              '<div class ='+popupItem[i+2].circleClass+'></div>'
		             +              '<div class ='+popupItem[i+2].textClass+'>'+popupItem[i+2].popupNm+'</div>'  
		             +            '</div>'
		             +          popupItem[i+2].labelField
		             +           '</div>'
		             +           '<div class ="w-col w-col-'+colNum+'">'
		             +            '<div class ="labelbox">'
		             +              '<div class ='+popupItem[i+3].circleClass+'></div>'
		             +              '<div class ='+popupItem[i+3].textClass+'>'+popupItem[i+3].popupNm+'</div>'  
		             +            '</div>'
		             +          popupItem[i+3].labelField
		             +           '</div>'
		             +          '</div>'; 
			    	 if(rowNum>tmpCnt){
			    		 tmpCnt ++;
			    	 }
	         }
	         else if (colNum ==1){
	        	 midHtml +=   '<div class ="modal-contents-row">'
	               +           '<div class ="w-col w-col-'+colNum+'">'
	               +            '<div class ="labelbox">'
	               +              '<div class ='+popupItem[i].circleClass+'></div>'
	               +              '<div class ='+popupItem[i].textClass+'>'+popupItem[i].popupNm+'</div>'  
	               +            '</div>'
	               +          popupItem[i].labelField
	               +           '</div>'
	               +          '</div>'; 
		    	 if(rowNum>tmpCnt){
		    		 tmpCnt ++;
		    	 }
	        	
	        }
	          else if (colNum ==2){
	        	    	 midHtml +=   '<div class ="modal-contents-row">'
		             +           '<div class ="w-col w-col-'+colNum+'">'
		             +            '<div class ="labelbox">'
		             +              '<div class ='+popupItem[i].circleClass+'></div>'
		             +              '<div class ='+popupItem[i].textClass+'>'+popupItem[i].popupNm+'</div>'  
		             +            '</div>'
		             +          popupItem[i].labelField
		             +           '</div>';
		             if(tmpCnt == rowNum && remarkYn =='Y'){
						 midHtml += '</div>'
					 +    '<div class ="modal-contents-row">'
		             +           '<div class ="w-col w-col-'+colNum+'">'
		             +            '<div class ="labelbox">'
		             +              '<div class ='+popupItem[i+1].circleClass+'></div>'
		             +              '<div class ='+popupItem[i+1].textClass+'>'+popupItem[i+1].popupNm+'</div>'  
		             +            '</div>'
		             +          popupItem[i+1].labelField
		             +           '</div>'
		             +          '</div>'; 
						 
		             }
		              else{
		  midHtml +=           '<div class ="w-col w-col-'+colNum+'">'
		             +            '<div class ="labelbox">'
		             +              '<div class ='+popupItem[i+1].circleClass+'></div>'
		             +              '<div class ='+popupItem[i+1].textClass+'>'+popupItem[i+1].popupNm+'</div>'  
		             +            '</div>'
		             +          popupItem[i+1].labelField
		             +           '</div>'
		             +          '</div>'; 
		              }
		    	 if(rowNum>tmpCnt){
		    		 tmpCnt ++;
		    	 }
	        	
	        }
	        else if (colNum ==3){
	        	 midHtml +=   '<div class ="modal-contents-row">'
	               +           '<div class ="w-col w-col-'+colNum+'">'
	               +            '<div class ="labelbox">'
	               +              '<div class ='+popupItem[i].circleClass+'></div>'
	               +              '<div class ='+popupItem[i].textClass+'>'+popupItem[i].popupNm+'</div>'  
	               +            '</div>'
	               +          popupItem[i].labelField
	               +           '</div>'
	               +           '<div class ="w-col w-col-'+colNum+'">'
	               +            '<div class ="labelbox">'
	               +              '<div class ='+popupItem[i+1].circleClass+'></div>'
	               +              '<div class ='+popupItem[i+1].textClass+'>'+popupItem[i+1].popupNm+'</div>'  
	               +            '</div>'
	               +          popupItem[i+1].labelField
	               +           '</div>';
	            if(tmpCnt == rowNum && remarkYn =='Y'&&remarkInline=='Y'){
						 midHtml += '</div>'
					 +    '<div class ="modal-contents-row">'
		             +           '<div class ="w-col w-col-'+colNum+'">'
		             +            '<div class ="labelbox">'
		             +              '<div class ='+popupItem[i+2].circleClass+'></div>'
		             +              '<div class ='+popupItem[i+2].textClass+'>'+popupItem[i+2].popupNm+'</div>'  
		             +            '</div>'
		             +          popupItem[i+2].labelField
		             +           '</div>'
		             +          '</div>'; 
						 
		             }
		        else{
		  midHtml +=           '<div class ="w-col w-col-'+colNum+'">'
		             +            '<div class ="labelbox">'
		             +              '<div class ='+popupItem[i+2].circleClass+'></div>'
		             +              '<div class ='+popupItem[i+2].textClass+'>'+popupItem[i+2].popupNm+'</div>'  
		             +            '</div>'
		             +          popupItem[i+2].labelField
		             +           '</div>'
		             +          '</div>'; 
		              }
		    	 if(rowNum>tmpCnt){
		    		 tmpCnt ++;
		    	 }
	        	
	        }
	          else if (colNum ==5){
	        	 midHtml +=   '<div class ="modal-contents-row">'
	               +           '<div class ="w-col w-col-'+colNum+'">'
	               +            '<div class ="labelbox">'
	               +              '<div class ='+popupItem[i].circleClass+'></div>'
	               +              '<div class ='+popupItem[i].textClass+'>'+popupItem[i].popupNm+'</div>'  
	               +            '</div>'
	               +          popupItem[i].labelField
	               +           '</div>'
	               +           '<div class ="w-col w-col-'+colNum+'">'
	               +            '<div class ="labelbox">'
	               +              '<div class ='+popupItem[i+1].circleClass+'></div>'
	               +              '<div class ='+popupItem[i+1].textClass+'>'+popupItem[i+1].popupNm+'</div>'  
	               +            '</div>'
	               +          popupItem[i+1].labelField
	               +           '</div>'
	               +           '<div class ="w-col w-col-'+colNum+'">'
	               +            '<div class ="labelbox">'
	               +              '<div class ='+popupItem[i+2].circleClass+'></div>'
	               +              '<div class ='+popupItem[i+2].textClass+'>'+popupItem[i+2].popupNm+'</div>'  
	               +            '</div>'
	               +          popupItem[i+2].labelField
	               +           '</div>'
	               +           '<div class ="w-col w-col-'+colNum+'">'
	               +            '<div class ="labelbox">'
	               +              '<div class ='+popupItem[i+3].circleClass+'></div>'
	               +              '<div class ='+popupItem[i+3].textClass+'>'+popupItem[i+3].popupNm+'</div>'  
	               +            '</div>'
	               +          popupItem[i+3].labelField
	               +           '</div>'
	               +           '<div class ="w-col w-col-'+colNum+'">'
	               +            '<div class ="labelbox">'
	               +              '<div class ='+popupItem[i+4].circleClass+'></div>'
	               +              '<div class ='+popupItem[i+4].textClass+'>'+popupItem[i+4].popupNm+'</div>'  
	               +            '</div>'
	               +          popupItem[i+4].labelField
	               +           '</div>'
	               +          '</div>'; 
		    	 if(rowNum>tmpCnt){
		    		 tmpCnt ++;
		    	 }
	        	
	        }
	          else{
	        	 midHtml +=   '<div class ="modal-contents-row">'
	               +           '<div class ="w-col w-col-'+colNum+'">'
	               +            '<div class ="labelbox">'
	               +              '<div class ='+popupItem[i].circleClass+'></div>'
	               +              '<div class ='+popupItem[i].textClass+'>'+popupItem[i].popupNm+'</div>'  
	               +            '</div>'
	               +          popupItem[i].labelField
	               +           '</div>'
	               +           '<div class ="w-col w-col-'+colNum+'">'
	               +            '<div class ="labelbox">'
	               +              '<div class ='+popupItem[i+1].circleClass+'></div>'
	               +              '<div class ='+popupItem[i+1].textClass+'>'+popupItem[i+1].popupNm+'</div>'  
	               +            '</div>'
	               +          popupItem[i+1].labelField
	               +           '</div>'
	               +           '<div class ="w-col w-col-'+colNum+'">'
	               +            '<div class ="labelbox">'
	               +              '<div class ='+popupItem[i+2].circleClass+'></div>'
	               +              '<div class ='+popupItem[i+2].textClass+'>'+popupItem[i+2].popupNm+'</div>'  
	               +            '</div>'
	               +          popupItem[i+2].labelField
	               +           '</div>'
	               +          '</div>'; 
		    	 if(rowNum>tmpCnt){
		    		 tmpCnt ++;
		    	 }
	        	
	        }
	
	    }
	    botHtml  =     '</div>'
	    	     +     '<div class="panelfooter">'
	    	   	 +      '<div class="footer-pop-btn-area">'
	    	     +       '<button  id = "saveBtnDP'+index+'" class="btnpop save-pop-btn"><i class="mdi mdi-content-save-outline"></i>'+multiLang.transText('MESSAGE','MSG00035')+'</button>'
	    	     +       '<button  id = "cancelBtnDP'+index+'" class="btnpop close-pop-btn"><i class="mdi mdi-window-close"></i> '+multiLang.transText('MESSAGE','MSG00036')+'</button>'
	    	     +      '</div>'       
	    	     +    '</div>';
	    return topHtml + midHtml+botHtml;
		},	
		customPop : function(btnId,index,btnIndex,colNum,rowNum,popupItem,popupTitle,remarkYn,remarkInline,actionType) {	//열3줄 colNum==3
	    var midHtml = '';
		var botHtml = '';
		var tmpCnt  = 1;
		var totalNum = popupItem.length;
		var fieldCnt = remarkInline == 'N' ? 1: popupItem.length%colNum;
		var remarkInlineClass = remarkInline == 'Y' ? 'in' : 'out';
		var defaultPopClass = remarkYn == 'Y' ? 'defaultPop-C'+colNum+'-R'+rowNum+'-remark-'+remarkInlineClass : 'defaultPop-C'+colNum+'-R'+rowNum;
		var searchAreaClass = remarkYn == 'Y' ? 'R'+rowNum+'-remark-'+remarkInlineClass : 'R'+rowNum;
		
		
		var topHtml =	'<div id="customPop-'+btnId+'" btnIndex = '+btnIndex+'" actionType ='+actionType+' class="modal customPop '+defaultPopClass+'">'
	        +    '<div class="panelheader">' 
	        +     '<div class="modal-header-title">'
	        +       '<div class ="fa fa-edit"></div>'
	        +       '<div multi-lang="" id="popupTitle'+index+'" class ="textblock modal-header-title-text">'+popupTitle+'</div>'
	        +     '</div>'
	        +     '<div class = "modal-header-xbtn">'
	        +     '<a href="#" class="bntpopclose"></a>'
	        +     '</div>'
	        +    '</div>'
	        +    '<div class = "searcharea-pop '+searchAreaClass+'">';
	    for(var i=0;i<totalNum;i+=colNum){	//전체 돌리는 개수 
	        if(tmpCnt == rowNum && fieldCnt==1){ // 마지막 하나일떄 
		       	 midHtml +=   '<div class ="modal-contents-row">'
	             +           '<div class ="w-col w-col-'+colNum+'">'
	             +            '<div class ="labelbox">'
	             +              '<div class ='+popupItem[i].circleClass+'></div>'
	             +              '<div class ='+popupItem[i].textClass+'>'+popupItem[i].popupNm+'</div>'  
	             +            '</div>'
	             +          popupItem[i].labelField
	             +           '</div>'
	             +          '</div>'; 
		    	 if(rowNum>tmpCnt){
		    		 tmpCnt ++;
		    	 }
	        }
	        else if(tmpCnt == rowNum && fieldCnt==2){ //마지막 2개일떄 
			       	 midHtml +=   '<div class ="modal-contents-row">'
		             +           '<div class ="w-col w-col-'+colNum+'">'
		             +            '<div class ="labelbox">'
		             +              '<div class ='+popupItem[i].circleClass+'></div>'
		             +              '<div class ='+popupItem[i].textClass+'>'+popupItem[i].popupNm+'</div>'  
		             +            '</div>'
		             +          popupItem[i].labelField 
		             +           '</div>';
		             if(remarkYn =='Y'){
						 midHtml += '</div>'
					 +    '<div class ="modal-contents-row">'
		             +           '<div class ="w-col w-col-'+colNum+'">'
		             +            '<div class ="labelbox">'
		             +              '<div class ='+popupItem[i+1].circleClass+'></div>'
		             +              '<div class ='+popupItem[i+1].textClass+'>'+popupItem[i+1].popupNm+'</div>'  
		             +            '</div>'
		             +          popupItem[i+1].labelField
		             +           '</div>'
		             +          '</div>'; 
						 
		             }
		              else{
		  midHtml +=           '<div class ="w-col w-col-'+colNum+'">'
		             +            '<div class ="labelbox">'
		             +              '<div class ='+popupItem[i+1].circleClass+'></div>'
		             +              '<div class ='+popupItem[i+1].textClass+'>'+popupItem[i+1].popupNm+'</div>'  
		             +            '</div>'
		             +          popupItem[i+1].labelField
		             +           '</div>'
		             +          '</div>'; 
		              }
		           
			    	 if(rowNum>tmpCnt){
			    		 tmpCnt ++;
			    	 }
	        }
	                else if(tmpCnt == rowNum && fieldCnt==3){ //마지막 3개일떄 
			       	 midHtml +=   '<div class ="modal-contents-row">'
		             +           '<div class ="w-col w-col-'+colNum+'">'
		             +            '<div class ="labelbox">'
		             +              '<div class ='+popupItem[i].circleClass+'></div>'
		             +              '<div class ='+popupItem[i].textClass+'>'+popupItem[i].popupNm+'</div>'  
		             +            '</div>'
		             +          popupItem[i].labelField
		             +           '</div>'
		             +           '<div class ="w-col w-col-'+colNum+'">'
		             +            '<div class ="labelbox">'
		             +              '<div class ='+popupItem[i+1].circleClass+'></div>'
		             +              '<div class ='+popupItem[i+1].textClass+'>'+popupItem[i+1].popupNm+'</div>'  
		             +            '</div>'
		             +          popupItem[i+1].labelField
		             +           '</div>'
		             +           '<div class ="w-col w-col-'+colNum+'">'
		             +            '<div class ="labelbox">'
		             +              '<div class ='+popupItem[i+2].circleClass+'></div>'
		             +              '<div class ='+popupItem[i+2].textClass+'>'+popupItem[i+2].popupNm+'</div>'  
		             +            '</div>'
		             +          popupItem[i+2].labelField
		             +           '</div>'
		             +          '</div>'; 
			    	 if(rowNum>tmpCnt){
			    		 tmpCnt ++;
			    	 }
	        }
	          else if(tmpCnt == rowNum && fieldCnt==4){ //마지막 4개일떄 
			       	 midHtml +=   '<div class ="modal-contents-row">'
		             +           '<div class ="w-col w-col-'+colNum+'">'
		             +            '<div class ="labelbox">'
		             +              '<div class ='+popupItem[i].circleClass+'></div>'
		             +              '<div class ='+popupItem[i].textClass+'>'+popupItem[i].popupNm+'</div>'  
		             +            '</div>'
		             +          popupItem[i].labelField
		             +           '</div>'
		             +           '<div class ="w-col w-col-'+colNum+'">'
		             +            '<div class ="labelbox">'
		             +              '<div class ='+popupItem[i+1].circleClass+'></div>'
		             +              '<div class ='+popupItem[i+1].textClass+'>'+popupItem[i+1].popupNm+'</div>'  
		             +            '</div>'
		             +          popupItem[i+1].labelField
		             +           '</div>'
		             +           '<div class ="w-col w-col-'+colNum+'">'
		             +            '<div class ="labelbox">'
		             +              '<div class ='+popupItem[i+2].circleClass+'></div>'
		             +              '<div class ='+popupItem[i+2].textClass+'>'+popupItem[i+2].popupNm+'</div>'  
		             +            '</div>'
		             +          popupItem[i+2].labelField
		             +           '</div>'
		             +           '<div class ="w-col w-col-'+colNum+'">'
		             +            '<div class ="labelbox">'
		             +              '<div class ='+popupItem[i+3].circleClass+'></div>'
		             +              '<div class ='+popupItem[i+3].textClass+'>'+popupItem[i+3].popupNm+'</div>'  
		             +            '</div>'
		             +          popupItem[i+3].labelField
		             +           '</div>'
		             +          '</div>'; 
			    	 if(rowNum>tmpCnt){
			    		 tmpCnt ++;
			    	 }
	         }
	         else if (colNum ==1){
	        	 midHtml +=   '<div class ="modal-contents-row">'
	               +           '<div class ="w-col w-col-'+colNum+'">'
	               +            '<div class ="labelbox">'
	               +              '<div class ='+popupItem[i].circleClass+'></div>'
	               +              '<div class ='+popupItem[i].textClass+'>'+popupItem[i].popupNm+'</div>'  
	               +            '</div>'
	               +          popupItem[i].labelField
	               +           '</div>'
	               +          '</div>'; 
		    	 if(rowNum>tmpCnt){
		    		 tmpCnt ++;
		    	 }
	        	
	        }
	          else if (colNum ==2){
	        	    	 midHtml +=   '<div class ="modal-contents-row">'
		             +           '<div class ="w-col w-col-'+colNum+'">'
		             +            '<div class ="labelbox">'
		             +              '<div class ='+popupItem[i].circleClass+'></div>'
		             +              '<div class ='+popupItem[i].textClass+'>'+popupItem[i].popupNm+'</div>'  
		             +            '</div>'
		             +          popupItem[i].labelField
		             +           '</div>';
		             if(tmpCnt == rowNum && remarkYn =='Y'){
						 midHtml += '</div>'
					 +    '<div class ="modal-contents-row">'
		             +           '<div class ="w-col w-col-'+colNum+'">'
		             +            '<div class ="labelbox">'
		             +              '<div class ='+popupItem[i+1].circleClass+'></div>'
		             +              '<div class ='+popupItem[i+1].textClass+'>'+popupItem[i+1].popupNm+'</div>'  
		             +            '</div>'
		             +          popupItem[i+1].labelField
		             +           '</div>'
		             +          '</div>'; 
						 
		             }
		              else{
		  midHtml +=           '<div class ="w-col w-col-'+colNum+'">'
		             +            '<div class ="labelbox">'
		             +              '<div class ='+popupItem[i+1].circleClass+'></div>'
		             +              '<div class ='+popupItem[i+1].textClass+'>'+popupItem[i+1].popupNm+'</div>'  
		             +            '</div>'
		             +          popupItem[i+1].labelField
		             +           '</div>'
		             +          '</div>'; 
		              }
		    	 if(rowNum>tmpCnt){
		    		 tmpCnt ++;
		    	 }
	        	
	        }
	        else if (colNum ==3){
	        	 midHtml +=   '<div class ="modal-contents-row">'
	               +           '<div class ="w-col w-col-'+colNum+'">'
	               +            '<div class ="labelbox">'
	               +              '<div class ='+popupItem[i].circleClass+'></div>'
	               +              '<div class ='+popupItem[i].textClass+'>'+popupItem[i].popupNm+'</div>'  
	               +            '</div>'
	               +          popupItem[i].labelField
	               +           '</div>'
	               +           '<div class ="w-col w-col-'+colNum+'">'
	               +            '<div class ="labelbox">'
	               +              '<div class ='+popupItem[i+1].circleClass+'></div>'
	               +              '<div class ='+popupItem[i+1].textClass+'>'+popupItem[i+1].popupNm+'</div>'  
	               +            '</div>'
	               +          popupItem[i+1].labelField
	               +           '</div>';
	            if(tmpCnt == rowNum && remarkYn =='Y'&&remarkInline=='Y'){
						 midHtml += '</div>'
					 +    '<div class ="modal-contents-row">'
		             +           '<div class ="w-col w-col-'+colNum+'">'
		             +            '<div class ="labelbox">'
		             +              '<div class ='+popupItem[i+2].circleClass+'></div>'
		             +              '<div class ='+popupItem[i+2].textClass+'>'+popupItem[i+2].popupNm+'</div>'  
		             +            '</div>'
		             +          popupItem[i+2].labelField
		             +           '</div>'
		             +          '</div>'; 
						 
		             }
		        else{
		  midHtml +=           '<div class ="w-col w-col-'+colNum+'">'
		             +            '<div class ="labelbox">'
		             +              '<div class ='+popupItem[i+2].circleClass+'></div>'
		             +              '<div class ='+popupItem[i+2].textClass+'>'+popupItem[i+2].popupNm+'</div>'  
		             +            '</div>'
		             +          popupItem[i+2].labelField
		             +           '</div>'
		             +          '</div>'; 
		              }
		    	 if(rowNum>tmpCnt){
		    		 tmpCnt ++;
		    	 }
	        	
	        }
	          else if (colNum ==5){
	        	 midHtml +=   '<div class ="modal-contents-row">'
	               +           '<div class ="w-col w-col-'+colNum+'">'
	               +            '<div class ="labelbox">'
	               +              '<div class ='+popupItem[i].circleClass+'></div>'
	               +              '<div class ='+popupItem[i].textClass+'>'+popupItem[i].popupNm+'</div>'  
	               +            '</div>'
	               +          popupItem[i].labelField
	               +           '</div>'
	               +           '<div class ="w-col w-col-'+colNum+'">'
	               +            '<div class ="labelbox">'
	               +              '<div class ='+popupItem[i+1].circleClass+'></div>'
	               +              '<div class ='+popupItem[i+1].textClass+'>'+popupItem[i+1].popupNm+'</div>'  
	               +            '</div>'
	               +          popupItem[i+1].labelField
	               +           '</div>'
	               +           '<div class ="w-col w-col-'+colNum+'">'
	               +            '<div class ="labelbox">'
	               +              '<div class ='+popupItem[i+2].circleClass+'></div>'
	               +              '<div class ='+popupItem[i+2].textClass+'>'+popupItem[i+2].popupNm+'</div>'  
	               +            '</div>'
	               +          popupItem[i+2].labelField
	               +           '</div>'
	               +           '<div class ="w-col w-col-'+colNum+'">'
	               +            '<div class ="labelbox">'
	               +              '<div class ='+popupItem[i+3].circleClass+'></div>'
	               +              '<div class ='+popupItem[i+3].textClass+'>'+popupItem[i+3].popupNm+'</div>'  
	               +            '</div>'
	               +          popupItem[i+3].labelField
	               +           '</div>'
	               +           '<div class ="w-col w-col-'+colNum+'">'
	               +            '<div class ="labelbox">'
	               +              '<div class ='+popupItem[i+4].circleClass+'></div>'
	               +              '<div class ='+popupItem[i+4].textClass+'>'+popupItem[i+4].popupNm+'</div>'  
	               +            '</div>'
	               +          popupItem[i+4].labelField
	               +           '</div>'
	               +          '</div>'; 
		    	 if(rowNum>tmpCnt){
		    		 tmpCnt ++;
		    	 }
	        	
	        }
	          else{
	        	 midHtml +=   '<div class ="modal-contents-row">'
	               +           '<div class ="w-col w-col-'+colNum+'">'
	               +            '<div class ="labelbox">'
	               +              '<div class ='+popupItem[i].circleClass+'></div>'
	               +              '<div class ='+popupItem[i].textClass+'>'+popupItem[i].popupNm+'</div>'  
	               +            '</div>'
	               +          popupItem[i].labelField
	               +           '</div>'
	               +           '<div class ="w-col w-col-'+colNum+'">'
	               +            '<div class ="labelbox">'
	               +              '<div class ='+popupItem[i+1].circleClass+'></div>'
	               +              '<div class ='+popupItem[i+1].textClass+'>'+popupItem[i+1].popupNm+'</div>'  
	               +            '</div>'
	               +          popupItem[i+1].labelField
	               +           '</div>'
	               +           '<div class ="w-col w-col-'+colNum+'">'
	               +            '<div class ="labelbox">'
	               +              '<div class ='+popupItem[i+2].circleClass+'></div>'
	               +              '<div class ='+popupItem[i+2].textClass+'>'+popupItem[i+2].popupNm+'</div>'  
	               +            '</div>'
	               +          popupItem[i+2].labelField
	               +           '</div>'
	               +          '</div>'; 
		    	 if(rowNum>tmpCnt){
		    		 tmpCnt ++;
		    	 }
	        	
	        }
	
	    }
	    botHtml  =     '</div>'
	    	     +     '<div class="panelfooter">'
	    	   	 +      '<div class="footer-pop-btn-area">'
	    	     +       '<button  id = "saveCustomPopBtnDP'+index+'" class="btnpop save-pop-btn"><i class="mdi mdi-content-save-outline"></i>'+multiLang.transText('MESSAGE','MSG00035')+'</button>'
	    	     +       '<button  id = "cancelCustomPopBtnDP'+index+'" class="btnpop close-pop-btn"><i class="mdi mdi-window-close"></i> '+multiLang.transText('MESSAGE','MSG00036')+'</button>'
	    	     +      '</div>'       
	    	     +    '</div>';
	    return topHtml + midHtml+botHtml;
		},	
			
		gridPop : function(index,gridPopIndex,menuId,btnId,popupTitle) {
			var topHtml =	'<div id="gridPop-'+btnId+'" gridIndex="'+gridPopIndex+'" class="modal  grid-pop'+index+' gridPop-'+menuId+'">'
			+    '<div class="modal-dialog custom-dialog" role="document">'  
			+      '<div class="modal-content custom-content">'
	        +    '<div class="modal-header panelheader-gridPop">' 
	        +     '<div class="modal-title modal-header-title-gridPop">'
	        +       '<div class ="fa fa-edit gridPop-title-icon"></div>'
	        +       '<div id="popupTitle'+index+'" class ="textblock modal-header-title-text">'+popupTitle+'</div>'
	        +     '</div>'
	        +     '<button type="button" class="close gridPop-x-btn" data-dismiss="modal" aria-label="Close">'
	        +     '<span aria-hidden="true">×</span></button>'
	        /*+     '</div>'*/
	        +    '</div>'
	        +    '<div class = "modal-body gridPop-searcharea-'+menuId+'">'
			+     '<div class = "container-fluid popup_main" id="popup_main'+gridPopIndex+'"></div>';			
			botHtml  =     '</div>'
    	    +     '<div class="py-2 modal-footer gridpop-panelfooter">'
    	   	+      '<div class="footer-pop-btn-area">'
    	  /*  +       '<button  id = "saveBtnCP'+index+'" class="btnpop save-pop-btn"><i class="mdi mdi-content-save-outline"></i>'+multiLang.transText('MESSAGE','MSG00035')+'</button>'*/
    	    +       '<button  id = "cancelBtnCP'+index+'" class="btnpop close-pop-btn"><i class="mdi mdi-window-close"></i> '+multiLang.transText('MESSAGE','MSG00036')+'</button>'
    	    +      '</div>'       
    	    +    '</div></div>';
			   return topHtml+botHtml;
		},
			dropDownGridPop : function(gridIndex,colNum,rowNum,popupTitle,target,rowIndex){
			var topHtml =	'<div rowIndex ="'+rowIndex+'" target="'+target+'" id="dropDownGridPop'+gridIndex+'" class="dropDownGrid modal gridPop-C'+colNum+'-R'+rowNum+'">'
	      /*  +    '<div class = "searcharea-gridPop-C'+colNum+'-R'+rowNum+'">'*/
	        +    '<div class = "searcharea-gridPop-default">'
			+     '<div class="popup_main" id="popup_main'+gridIndex+'">'
			+      '<div class = "grid" id="grid'+gridIndex+'">'
			+     '</div>';
			botHtml  =     '</div>';
			   return topHtml+botHtml;
		},
			calendarPop : function(index,target){
				let html='<div id="calendar-pop" class="calendar-pop">'
						/*+'<div id="calendar-main"></div>'*/
						+'<input type="datetime-local" class = "calendar-pop-time-input" id="time-main"></input>'
						+'<div class = "calendar-pop-footer" id="calendar-pop-footer">'
						+'<button class = "calendar-pop-button left" id="saveBtnDT'+(index+1)+'">'+multiLang.transText('MESSAGE','MSG00035')+'</button>'
						+'<button class = "calendar-pop-button right" id="closeBtnDT'+(index+1)+'">'+multiLang.transText('MESSAGE','MSG00036')+'</button>'
						+'</div>'
						+'</div>';
					   return html;
		    },

	},
	 createCustomPop: function(index,menuId,btnId,actionType){
		       var actionType = actionType == undefined ? 'C': actionType;

			   mom_ajax('R', 'XUSM3030.defaultInfo', {menuId:menuId,gridId:1}, function(result1, data1) { //해당 페이지의 위젯정보 조회
			   let that = momWidget;
			   
			   let popupString  = data1[0]['popupProperty']  == undefined ? '[]':data1[0]['popupProperty'];
			       popupString  = popupString =='[]'  ? popupString  : popupString.substr(1,   popupString.length-2);			       
			   let popupProperty    = JSON.parse(popupString);
			   let gridString       = data1[0]['gridProperty']   == undefined ? '[]':data1[0]['gridProperty'];
 				   gridString       = gridString =='[]'   ? gridString   : gridString.substr(1,    gridString.length-2);
  			   let gridProperty     = JSON.parse(gridString);
			   let buttonString     = data1[0]['buttonProperty'] == undefined ? '[]':data1[0]['buttonProperty'];
			       buttonString     = buttonString =='[]' ? buttonString : buttonString.substr(1,  buttonString.length-2);
			   let buttonProperty   = JSON.parse(buttonString);		   
			      buttonProperty.sort(function(a,b){ return a.buttonSeq-b.buttonSeq});
			      popupProperty.sort(function(a,b){ return a.popupSeq-b.popupSeq});		
			      that.customPopupProperty[btnId] = popupProperty;
			      var gridExceptList = ['checkId','gridTitle','popupColNum','popupRowNum','popupTitle','headerColor','initSearch','showFindBtn']; 	
			      var gridExtraProp  = {'checkId':'checkId','gridTitle':'gridTitle','popupColNum':'popupColNum','popupRowNum':'popupRowNum','popupTitle':'popupTitle','headerColor':'headerColor','initSearch':'initSearch','showFindBtn':'showFindBtn'};
			      var searchBtn      =  '';
			      var gridPopYn      =  '';
			      var templateInfo   =  '';
		          let btnIndex = btnId.split('customBtn')[1];
			      for(let i=0,max=gridExceptList.length; i<max;i++){
			    	   gridExtraProp[gridExceptList[i]] = gridProperty[0][gridExceptList[i]];			    	  
			    	   delete gridProperty[0][gridExceptList[i]];
			      }
			      let gridExtraProperty = gridExtraProp;
			   			   
			   let popupTotalNum   = popupProperty.length;
			   let popupColNum     = gridExtraProperty['popupColNum'] == undefined ? 3:Number(gridExtraProperty['popupColNum']);
			   let popupRowNum     = gridExtraProperty['popupRowNum'] == undefined ? 3:Number(gridExtraProperty['popupRowNum']);
			   let remarkInline    = popupTotalNum % popupColNum == 1 ? 'N':'Y';
			   let remarkYn        = 'N';
			   let circleClass = '';
			   let textClass   = '';
			   let popupItem = [];
			   let labelField = '';
			 
			     for(var i=0,max=popupProperty.length;i<max;i++){
			    	  if(popupProperty[i]['columnRequire']== "Y"){
			    		    circleClass = 'circle-bg-orange';
			    		    textClass   =  'textblock-orange';
			    		    
			    	  }
			    	  else{
			      		    circleClass = 'circle';
			    		    textClass   = 'textblock';
			    	  }
			    	  
		    		  if(popupProperty[i]['popupType']=='S' || popupProperty[i]['popupType'] == 'M'){
		    			   labelField = '<select id='+popupProperty[i]['popupId']+'DP'+(index+1) +' class="popupSelectField"></select>';
		    			  
			    	  }
			    	  else if(popupProperty[i]['popupType']=='SS'){
		    			   labelField = '<select id='+popupProperty[i]['popupId']+'DP'+(index+1)+' class="popupSelectField-popup-combo"></select>';
		    			   
			    	  }
		    		  else if (popupProperty[i]['popupType']=='C'){
		    			  labelField  = '<input maxlength="256" id='+popupProperty[i]['popupId']+'DP'+(index+1)+' type="datepicker"  class="w-input popupInputField" date-format="date"></input>';
		    			  
		    		  }
		    		  else if (popupProperty[i]['popupType']=='C-HM'){
		    			  labelField  = '<input  id='+popupProperty[i]['popupId']+'DP'+(index+1)+' type="time"  class="w-input popupInputField"></input>';
		    			  
		    		  }
		    		  else if (popupProperty[i]['popupType']=='P'){
		    			  labelField  = '<input maxlength="50" id='+that.popupProperty[index][i]['popupId']+'DP'+(index+1)+' type="password"  class="w-input passwordInputField" date-format="date"></input><button id="changePwBtn'+btnIndex+'" type="button" class="btn btn-icon  btn-change" style="display: none;"><i class="mdi mdi-settings"style="font-size: 1.25rem;"></i></button>';
		    			  
		    		  }
		    		  else if (popupProperty[i]['popupType']=='DS'){
		    			  labelField  = '<textarea class="remark C'+popupColNum+'"  rows="5" maxlength="500" id='+popupProperty[i]['popupId']+'DP'+(index+1)+'></textarea>';
		    			  remarkYn    = 'Y';
		    		  }
		    		  else if(popupProperty[i]['popupType']=='DG'){			  
			    		  labelField  = '<select maxlength="256" id='+popupProperty[i]['popupId']+'DP'+(index+1)+'  class="gridPop'+(index+1)+ ' grid-popup popupSelectField"></select>';
			    	  }
			    	  else {
			    		  labelField  = '<input maxlength="256" id='+popupProperty[i]['popupId']+'DP'+(index+1)+' type="text" type="text" class="w-input popupInputField" date-format="date"></input>';
			    	  }
			    
		    		  			    	  
			    	  popupItem[i] =  {	  			    	  
				    	  popupId:          popupProperty[i]['popupId'],
				    	  popupNm:          popupProperty[i]['popupNm'],
				      	  popupSeq:         popupProperty[i]['popupSeq'],
				    	  defaultVlue:      popupProperty[i]['defaultValue'],
				    	  columnRequire:    popupProperty[i]['columnRequire'],
				    	  popupType:        popupProperty[i]['popupType'],
				    	  labelField:       labelField,
				    	  circleClass:      circleClass,
				          textClass:        textClass
		              };
		              
			      }

			
				
			  let popupAreaHtml = that.createPopup.customPop(btnId,index+1,btnIndex,popupColNum,popupRowNum,popupItem,gridExtraProperty['popupTitle'],remarkYn,remarkInline,actionType);				  			  	    		 
			  $('body').append(popupAreaHtml);
			  that.setCustomBoXSet(btnId,btnId);      
			               
			  //that.setBtnEvent(index, your);					    // 버튼이벤트 세팅
		     // that.setKeyEvent(index,your); 					    // 버튼이벤트 세팅 (엔터,기타..)
			  })
    },
	design: function(index, idx, color, align) {
	    $('head').append('<style>.aui-grid-user-custom-header{background-color: #ff8000 !important;font-weight: bold;background: -webkit-gradient(linear, left top, left bottom, from(#ff8000),to(#ff8000));background: -webkit-linear-gradient(top, #ff8000, #ff8000);background: -moz-linear-gradient(top, #ff8000, #ff8000);background: -ms-linear-gradient(top, #ff8000, #ff8000);background: -o-linear-gradient(top, #ff8000, #ff8000);background: linear-gradient(top,#ff8000, #ff8000);}</style>');
	    $('head').append('<style>.back-red{background-color: #ff8000 !important;}</style>');
		$("head").append('<style>.hyperStyle{ background: #C7E8FD}</style>');	
		$("head").append('<style>.deleteStyle{  color: black;  font-size: 50px ;background-image: url(../Images/deleteBtn3.png);background-repeat : no-repeat;background-size : 45% 80% ;background-position-x: 50%;background-position-y: 55%;}</style>');
		$("head").append('<style>.scanedStyle{ text-decoration: underline; color: red; background: #a3c3ea; font-size: 25px }</style>');	
		$("head").append('<style>.NotPassStyle{ color: #F6F6F6 !important; background: #ff4545 !important; font-size: 25px }</style>');	
		

	if(color == undefined) {
		if(align != undefined && align.indexOf('-') > 0) {
			$('head').append('<style>.columnStyle' + index + '' + idx + '{text-align:' + align.substr(0, align.indexOf('-')) + '}</style>');
		} else {
			$('head').append('<style>.columnStyle' + index + '' + idx + '{text-align:center}</style>');
		}
	} else {				
		if(color.indexOf('H') >= 0) {
			if(color.indexOf(';')>0)
				{
				  var colorSplit = color.split(';');
				   for(var i=0;i<colorSplit.length;i++)
					   {
					    if(colorSplit[i].indexOf('H') >= 0)
						    {
					    	colorSplit[i] = colorSplit[i].replace(/H/gi, '#');
						     $('head').append('<style>.headerStyle' + index + '' + idx + '{background:' + colorSplit[i] + ';}</style>');
						    }
					    else
						    {
						    $('head').append('<style>.columnStyle' + index + '' + idx + '{background:' + colorSplit[i] + '; text-align:center}</style>');
						    }
					   }  
				}
			else
				{
				color = color.replace(/H/gi, '#');
				$('head').append('<style>.headerStyle' + index + '' + idx + '{background:' + color + ';}</style>');
				}

		} else {
			if(align != undefined && align.indexOf('-') > 0) {
				$('head').append('<style>.columnStyle' + index + '' + idx + '{background:' + color + '; text-align:' + align.substr(0, align.indexOf('-')) + '}</style>');
			} else {
				$('head').append('<style>.columnStyle' + index + '' + idx + '{background:' + color + '; text-align:center}</style>');
			}
		}	
	}
},
   isJson: function(item) {
    item = typeof item !== "string"
        ? JSON.stringify(item)
        : item;

    try {
        item = JSON.parse(item);
    } catch (e) {
        return false;
    }

    if (typeof item === "object" && item !== null) {
        return true;
    }

    return false;
  },
	setSearchBtnEvent: function(index, your) {
		var that =  this;
		var findBtnId = 'findBtn';
		var isExist = document.getElementById(findBtnId + (index + 1));
		if(isExist == undefined || that.pageProperty[index]['programId'] == undefined || that.pageProperty[index]['programId'] == '') {
			return;
		}
		
		$(document).on('click', '#' + findBtnId, function(e) {
			 if(that.gridProperty[index][0]['usePaging'] ==true){ //페이징사용			
		    	 that.findBtnClicked(index, {startPage:1,endPage:that.gridProperty[index][0]['pageRowCount']}, true, 'PAGING',menuId,your);
		    }		    	
			that.findBtnClicked(index, {}, true, findBtnId,that.pageProperty[index]['programId'],your,that.searchProperty[index]);
			// e.preventDefault();
		});
	},

	// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 입력상자 엔터키 이벤트 핸들러
	procEnterKeyIsEnter				: undefined,
	procEnterKeyRetrieveComplete 	: [undefined, undefined, undefined, undefined, undefined, undefined],
	procEnterKeyEvent: function(index, your) {
		var that = this.grid == undefined ? this.momWidget : this;
		
		var $form = $('.form-inline');
		var $objs = $form.find('input[id]');
		for (var i = 0; i < $objs.length; i++) {
			$(document).on('keydown', $($objs[i]), function(e) {
			    if(e.keyCode == 13) {
					if(your != undefined && your.keyDownCallInit != undefined) {
						your.keyDownCallInit(index, e.keyCode);
						if(your.returnFlag == 'Y') {
							return;
						}
					}
					
					if(((your != undefined && your.currentEnterKeyIndex == index) || (your != undefined && your.currentEnterKeyIndex == undefined))
							&& that.procEnterKeyRetrieveComplete[index] == undefined && document.getElementById('findBtn' + (index+1)) != undefined) {
						that.procEnterKeyRetrieveComplete[index] = true;
						setTimeout(function() {
							that.procEnterKeyRetrieveComplete[index] = undefined;
						}, 400);
						
						if(e.target.form != undefined) {
							if(e.target.form.id == "form") {
								that.findBtnClicked(index, true, {}, undefined, {index: index, op: 'findBtn' + (index + 1)}, your);
							}
						}
					}
					
					return false;
				}
			});
		}		
		
		$(document).on('keydown', '.momMessageBoxSet', function(e) {
			if(e.keyCode == 13) {
				$('.btn-ok').click();
				e.stopProgation();	
			}
		});
/*		$(document).on('keydown', 'body', function(e) {
			if(e.keyCode == 38) {
				if(document.getElementById('findBtn' + (index+1)) != undefined))
				that.findBtnClicked(index, true, {}, undefined, {index: index, op: 'findBtn' + (index + 1)}, your);
			}
		});*/
	},
	isJson: function(obj){
	var isjson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length; 
	return isjson;
    },
	// 검색버튼을 누른 효과
	findBtnClicked: function(index, param, splash, btnId, menuId, your, callBackFunc,event) { 	//momWidget.findBtnClicked(1, [], true, 'findBtn1', 'PGIDXX002', MOMXX000, function(result, data)
	    var that= this;	
	    var callInitResult = undefined;
	    var callBackResult = undefined; 
	    var checkSearchParam = {};
        var totalParam = {};
        let searchParam = {};
        let menuParamText = that.pageProperty[index] == undefined ? {}: that.pageProperty[index]['param'] == undefined ? {}:that.pageProperty[index]['param'].split(',');

	    let menuParamMap = {};
        var queryId = menuId == undefined ? that.pageProperty[index]['menuId']+'.findBtn'+(index+1) : menuId+'.findBtn'+(index+1);
		
		if(Array.isArray(menuParamText)==true){
			 for(let j=0,max2=menuParamText.length;j<max2;j++){
				 menuParamMap[menuParamText[j].split('=')[0]]=menuParamText[j].split('=')[1];
			 }
		}
	   
							 
	
		   if(splash==true){
			that.splashShow();
		   }
   
		   // param = that.pageProperty[index]['param'];
	        initParam = that.checkInitParam(index,param,your); //init param 설정시 세팅
	        checkSearchParam = that.checkSearchParam(index,searchParam,your); //search param 설정시 세팅
	         if (!(that.checkSearchProperty(index, checkSearchParam, your))){ //파라미터 밸리데이션 체크
        	that.splashHide();
        	return;   
        	}

	         if(menuParamMap != undefined){
			    totalParam = Object.assign(menuParamMap, checkSearchParam);   	 
	            totalParam = Object.assign(totalParam,initParam,param);  
		    }
	        else{
				 totalParam = Object.assign(checkSearchParam,totalParam,initParam,param);   	 
			} 	 
	       
	               
	    if(that.checkInitMessage(index,your) == 'CLEAR'){ //init message 설정시 세팅
	    	totalParam = {};	    	  
	    }
     /*   if (!(that.checkSearchProperty(index, totalParam, your))){ //파라미터 밸리데이션 체크
        	that.splashHide();
        	return;               	   
        }*/
        else{ //검색조건 밸리데이션 성공시    
        callInitResult = that.checkActionCallInit(index, 'R',  totalParam, btnId, your,event);     	
        	  if(callInitResult['result'] != 'SUCCESS') { 
							  momWidget.messageBox({type:'danger', width:'400', height: '145', html: callInitResult['msg']});
							  momWidget.splashHide();
						      return;
			 }
			// totalParam = callInitResult['param'];
		    totalParam = Object.assign(totalParam,callInitResult['param']);  
        	/*  param.startPage = that.startPage[index]; 
              praram.endPage  = that.endPage[index];*/
              if(btnId=='TOTAL'){
	  				//queryId = menuId == undefined ? that.pageProperty[index]['programId']+'.totalCount'+(index+1) : menuId+'.totalCount'+(index+1);
			  }
             // setTimeout(function() {
            	  //that.splashShow();
	              mom_ajax('R', queryId, totalParam, function(result, data) {
    				            if(result != 'SUCCESS') {
    					             return;
    				            }  
    				  
    				          if(btnId=='BACK'){	 							  
								    that.excelDownGridData[index] = data;
								    that.backWork[index] = 'N';
								   	var excelData = that.excelDownGridData[index]; 
									AUIGrid.setGridData(that.excelDownGrid[index], excelData);												
									var	fileName = that.pageProperty[index]['programId'] + '_' + get_current_date('yyyy-mm-dd');
								    var excelDownOpt = {fileName: fileName ,
										    		    progressBar: true,
										    		    showRowNumColumn:false,
										    		    footers: undefined,
										    		    exportWithStyle: true
								    		            };
				    
				    excelDownOpt.afterRequestCallback = function() { // 엑셀 만들고 호출되는 콜백함수
					$('.aui-grid-export-progress-modal').remove();
					// AUIGrid.GridData(that.excelGrid[index]);
					
					//$('#excelArea' + (index + 1)).remove();
					//AUIGrid.destroy(that.excelDownGrid[index]);
					//that.exceldownGrid[index] = undefined;
				}
				//option.footers = footerProperty;
				    //that.excelDownGrid[index]
					 // AUIGrid.exportToXlsx("#excelGrid"+(index+1), excelDownOpt);
				//AUIGrid.exportToXlsx(that.excelDownGrid[index], excelDownOpt);
				$('.aui-grid-export-progress-modal').height('100%');
				$('#grid' + (index + 1)).children().append($('.aui-grid-export-progress-modal'));
								   //that.splashHide();
							      //AUIGrid.setGridData(that.grid[index], data);  
							  }
							   if(btnId=='EXCEL_DOWN'){	 							  
								    that.excelDownGridData[index] = data;
								    that.backWork[index] = 'N';
								   	var excelData = that.excelDownGridData[index]; 
									AUIGrid.setGridData(that.excelDownGrid[index], excelData);												
									var	fileName = that.pageProperty[index]['programId'] + '_' + get_current_date('yyyy-mm-dd');
								    var excelDownOpt = {fileName: fileName ,
										    		    progressBar: true,
										    		    showRowNumColumn:false,
										    		    footers: undefined,
										    		    exportWithStyle: true
								    		            };
				    
				    excelDownOpt.afterRequestCallback = function() { // 엑셀 만들고 호출되는 콜백함수
					$('.aui-grid-export-progress-modal').remove();
					// AUIGrid.GridData(that.excelGrid[index]);
					
					//$('#excelArea' + (index + 1)).remove();
					//AUIGrid.destroy(that.excelDownGrid[index]);
					//that.exceldownGrid[index] = undefined;
				}
				//option.footers = footerProperty;
				    //that.excelDownGrid[index]
					 // AUIGrid.exportToXlsx("#excelGrid"+(index+1), excelDownOpt);
				AUIGrid.exportToXlsx(that.excelDownGrid[index], excelDownOpt);
				$('.aui-grid-export-progress-modal').height('100%');
				$('#grid' + (index + 1)).children().append($('.aui-grid-export-progress-modal'));
								   //that.splashHide();
							      //AUIGrid.setGridData(that.grid[index], data);  
							  }
							  else if(btnId=='TOTAL'){
								that.totalRowCount[index] = data.length==0 ? 0:data[0]['totalCount'];
							  }
							  else if(btnId=='INIT_PAGING' ){
								if(data.length ==0){
									AUIGrid.setGridData(that.grid[index], data); 
							
								} 
								else if(that.gridProperty[index][0]['pageRowCount'] > that.totalRowCount[index]){
								var pageTotalNum = Math.ceil(that.totalRowCount[index]/ that.gridProperty[index][0]['pageRowCount']);
								var pagingBtnHtml = '';
								var pagingInfoHtml =  '<span class ="aui-grid-paging-info-text">'+'>'+'</span>';
								var rightNextBtnHtml  = '<span class ="aui-grid-paging-number aui-grid-paging-next">'+'>'+'</span>';
								var rightLastBtnHtml = '<span class ="aui-grid-paging-number aui-grid-paging-last">'+'>'+'</span>'; 
								var startPage= 1;
				 				var endPage = 1; 
				 				
				 				if(pageTotalNum<=10){
										for(var i = 1, max = pageTotalNum; i<= max; i++){
														pagingBtnHtml += '<span class ="aui-grid-paging-number">'+i+'</span>';
														if(i==pagingBtnHtml){
															break;
														}
														
													   }
													    $('#grid'+(index+1)).find('.aui-grid-paging-panel').empty();
								   $('#grid'+(index+1)).find('.aui-grid-paging-panel').append(pagingBtnHtml);
							       $('#grid'+(index+1)).find('.aui-grid-paging-panel').append(pagingInfoHtml); 
								}
				 			
								  
								else if ( 10< pageTotalNum){
										for(var i = 1, max = 10; i<= max; i++){
									pagingBtnHtml += '<span class ="aui-grid-paging-number">'+i+'</span>';
									if(i==pagingBtnHtml){
										break;
									}
									
								   }
								  	    $('#grid'+(index+1)).find('.aui-grid-paging-panel').empty();
								   $('#grid'+(index+1)).find('.aui-grid-paging-panel').append(pagingBtnHtml);
							       $('#grid'+(index+1)).find('.aui-grid-paging-panel').append(pagingInfoHtml); 
								   $('#grid'+(index+1)).find('.aui-grid-paging-panel').append(rightNextBtnHtml);
					               $('#grid'+(index+1)).find('.aui-grid-paging-panel').append(rightLastBtnHtml);
					           
									/*	$('.aui-grid-paging-panel').append(pagingBtnHtml);
										$('.aui-grid-paging-panel').append(rightNextBtnHtml);
										$('.aui-grid-paging-panel').append(rightLastBtnHtml);*/
									
								}
							
							
										startPage = data[0]['id'];
				 					endPage = data[data.length-1]['id'];
									AUIGrid.setGridData(that.grid[index], data); 
								
								    if(that.sortingInfo[index]!= undefined && that.sortingInfo[index].length >0 ){
											AUIGrid.setSorting(that.grid[index], that.sortingInfo[index]);	
									} 
									for(var j=0,max2=data.length;j<max2;j++){		
										AUIGrid.updateRow(that.grid[index], {id:startPage+j}, j,false);			
									}
								
												$('#grid'+(index+1)).find('.aui-grid-paging-info-text')[0].innerText  = "현재페이징 : " + '1' + " / 전체페이징 : " + pageTotalNum + "( " + '1' + "~" + that.totalRowCount[index] + " 개 )";
									
							
									for(var k=0,max3=data.length;k<max3;k++){
										if($('.aui-grid-paging-panel')[0].children[k].innerText =='1'){
											$('.aui-grid-paging-panel')[0].children[k].classList.add('aui-grid-paging-number-selected');											
											break;
										}
									}
									$('#grid'+(index+1)).find('.aui-grid-paging-number.aui-grid-paging-number-selected')[0].setAttribute('id','click');
								
								
								    //AUIGR//뒤에 버튼추가해야함
								    
									//AUIGrid.addRow(that.grid[index], data, "first"); 
								
								
									   
							
									 
								}
								else{
								var pageTotalNum = Math.ceil(that.totalRowCount[index]/ that.gridProperty[index][0]['pageRowCount']);
								var pagingBtnHtml = '';
								var pagingInfoHtml =  '<span class ="aui-grid-paging-info-text">'+'>'+'</span>';
								var rightNextBtnHtml  = '<span class ="aui-grid-paging-number aui-grid-paging-next">'+'>'+'</span>';
								var rightLastBtnHtml = '<span class ="aui-grid-paging-number aui-grid-paging-last">'+'>'+'</span>'; 
								var startPage= 1;
				 				var endPage = 1; 
				 				
				 				if(pageTotalNum<=10){
										for(var i = 1, max = pageTotalNum; i<= max; i++){
														pagingBtnHtml += '<span class ="aui-grid-paging-number">'+i+'</span>';
														if(i==pagingBtnHtml){
															break;
														}
														
													   }
													    $('#grid'+(index+1)).find('.aui-grid-paging-panel').empty();
								   $('#grid'+(index+1)).find('.aui-grid-paging-panel').append(pagingBtnHtml);
							       $('#grid'+(index+1)).find('.aui-grid-paging-panel').append(pagingInfoHtml); 
								}
				 			
								  
								else if ( 10< pageTotalNum){
										for(var i = 1, max = 10; i<= max; i++){
									pagingBtnHtml += '<span class ="aui-grid-paging-number">'+i+'</span>';
									if(i==pagingBtnHtml){
										break;
									}
									
								   }
								  	    $('#grid'+(index+1)).find('.aui-grid-paging-panel').empty();
								   $('#grid'+(index+1)).find('.aui-grid-paging-panel').append(pagingBtnHtml);
							       $('#grid'+(index+1)).find('.aui-grid-paging-panel').append(pagingInfoHtml); 
								   $('#grid'+(index+1)).find('.aui-grid-paging-panel').append(rightNextBtnHtml);
					               $('#grid'+(index+1)).find('.aui-grid-paging-panel').append(rightLastBtnHtml);
					           
									/*	$('.aui-grid-paging-panel').append(pagingBtnHtml);
										$('.aui-grid-paging-panel').append(rightNextBtnHtml);
										$('.aui-grid-paging-panel').append(rightLastBtnHtml);*/
									
								}
							
							
										startPage = data[0]['id'];
				 					endPage = data[data.length-1]['id'];
									AUIGrid.setGridData(that.grid[index], data); 
								
								    if(that.sortingInfo[index]!= undefined && that.sortingInfo[index].length >0 ){
											AUIGrid.setSorting(that.grid[index], that.sortingInfo[index]);	
									} 
									for(var j=0,max2=data.length;j<max2;j++){		
										AUIGrid.updateRow(that.grid[index], {id:startPage+j}, j,false);			
									}
								
												$('#grid'+(index+1)).find('.aui-grid-paging-info-text')[0].innerText  = "현재페이징 : " + '1' + " / 전체페이징 : " + pageTotalNum + "( " + '1' + "~" + that.totalRowCount[index] + " 개 )";
									
							
									for(var k=0,max3=data.length;k<max3;k++){
										if($('.aui-grid-paging-panel')[0].children[k].innerText =='1'){
											$('.aui-grid-paging-panel')[0].children[k].classList.add('aui-grid-paging-number-selected');											
											break;
										}
									}
									$('#grid'+(index+1)).find('.aui-grid-paging-number.aui-grid-paging-number-selected')[0].setAttribute('id','click');
								
								
								    //AUIGR//뒤에 버튼추가해야함
								    
									//AUIGrid.addRow(that.grid[index], data, "first"); 
								
								
									

							  }
							  }
							  else if(btnId=='PAGING'){
								
							  }							  
							  else{
								AUIGrid.setGridData(that.grid[index], data);  
								if(that.sortingInfo[index]!= undefined && that.sortingInfo[index].length >0 ){
											AUIGrid.setSorting(that.grid[index], that.sortingInfo[index]);	
									}
								
							 }
    				        	 
									
										           
                                  	if(callBackFunc != undefined) {	
									  callBackFunc('SUCCESS', data,index,event);
								    }						  						
    					           /*if(your.retrieveCallBack != undefined) {
    					        	   your.retrieveCallBack('SUCCESS', data, param, undefined, indexInfo, your);
    					           }*/
    					            your.initParam = undefined;
    					            callBackResult = that.checkActionCallBack(index, 'R',  param, btnId, your,data);     	
    					            if(callBackResult['result'] != 'SUCCESS') {
										  momWidget.messageBox({type:'danger', width:'400', height: '145', html: callBackResult['msg']});
										  momWidget.splashHide();
									      return;
			 						}
    					           $('td').removeClass('aui-grid-default-column');
    					             that.splashHide();
    			}, undefined, undefined, this, true);
	         // }, 500);
        		   
        	 
        }
        
		  return;	
	},
	//init message 처리 
	checkInitMessage: function(index,your){
		if(your['initMessage'] != undefined) {
			
			var initMessage = your['initMessage'];
			your['initMessage'] = undefined;	
			
			if(initMessage == 'CLEAR_PARAM') {
				return 'CLEAR';
			}
				return'';
		}
		        return '';
	},
	//init param 처리 
	checkInitParam: function(index,param,your){
		if(your['initParam'] != undefined) {
		     return your['initParam'] ;
		}
		return param;
	},
	//init searchParam 처리 
	checkSearchParam: function(index,param,your){
		var that = momWidget;
		var searchParam = {};
		var itemBox = {};
		var dropdownId = undefined;
		var headerDropdownId = undefined;
		var searchId         = undefined;
		var searchId         = undefined;
		var defaultValue     = undefined;
		var searchType       = undefined;
		var headerType       = undefined;
			
		if(your['searchParam'] != undefined) {
			 searchParam = your['searchParam'][index-1];
			 for(var i=0 ;i<searchParam.length ;i++){			
				 itemBox[searchParam[i]] = $('#'+searchParam[i]).val();
				 				  
			 }
			            param.push(itemBox);
			  return 	param;      
		}
		if(that.searchProperty[index]!=undefined){
			 for(var i = 0, max = that.searchProperty[index].length; i< max; i++){
			 searchId         = that.searchProperty[index][i]['searchId'];
			 dropdownId       = that.searchProperty[index][i]['dropdownId'];
			 headerDropdownId = that.searchProperty[index][i]['headerDropdownId'];
			 searchType       = that.searchProperty[index][i]['searchType']; 
			 headerSearchType = that.searchProperty[index][i]['headerType']; 
			 if(headerDropdownId != '' && headerDropdownId != undefined){
				 param[searchId+'Header'] = $('#'+searchId+'Header'+'SP'+(index+1)).val();
			}
			 if(dropdownId != '' && dropdownId != undefined){
				 if(searchType =='M'){
					 var checkedItem = $('#'+searchId+'SP'+(index+1)).jqxComboBox('getCheckedItems');
					 if(checkedItem == undefined || checkedItem.length == 0){
						continue;
					}
					 var paramText   = '';
					 for(var j = 0, max2 = checkedItem.length; j< max2; j++ ){
						 paramText += ",'"+checkedItem[j]['value']+"'";						 
					 }
					     param[searchId] = paramText.replace(',','').replace(/\"/gi, "");
				 }
				 else{
					 param[searchId] = $('#'+searchId+'SP'+(index+1)).val();
				 }
				
			 }
			 else if (searchType =='CP'){
				param[searchId+'SD'] = $('#'+searchId+'SD'+(index+1)).val();
				param[searchId+'ED'] = $('#'+searchId+'ED'+(index+1)).val();
			}
			 
			 else if(searchType =='C'){
				 param[searchId] = $('#'+searchId+'SP'+(index+1)).val();
			 }
			 else if(searchType =='S' || searchType =='SS'){
				param[searchId] = $('#'+searchId+'SP'+(index+1)).val();
			}
			 else if(searchType =='T' ){
				param[searchId] = $('#'+searchId+'SP'+(index+1)).val();
			}
			else{
				
			}
			
		}
		}
	
			return param;		  
	},
	// 검색조건 유효성체크
	checkSearchProperty: function(index, param, your) { //인덱스  파라미터 
		var that = momWidget;
		//param = (param == undefined || jQuery.isEmptyObject(param) || param == '' || param == null) == true ?   that.getSearchParam(index, '#searchArea'+(index+1),searchParam) : param;
        if(that.searchProperty[index] != undefined && jQuery.isEmptyObject(momWidget.searchProperty)==false){ 
            for(var i = 0, max = momWidget.searchProperty[index].length; i< max; i++){
	          if(that.searchProperty[index][i]['searchType']=='CP'){
			      if(that.searchProperty[index][i]['columnRequire'] == 'Y' && (param[momWidget.searchProperty[index][i]['searchId']+'ED'] == undefined || param[momWidget.searchProperty[index][i]['searchId']+'ED'] == '' || param[momWidget.searchProperty[index][i]['searchId']+'SD'] == undefined || param[momWidget.searchProperty[index][i]['searchId']+'SD'] =='')){
  			      that.messageBox({type: 'warning', width: '400', height: '145', html: momWidget.searchProperty[index][i]['searchNm'] +' '+ multiLang.transText('MESSAGE','MSG00043')});
  			      return false;
  		      	   }	
			  }
			  else{
					if(that.searchProperty[index][i]['columnRequire'] == 'Y' && (param[momWidget.searchProperty[index][i]['searchId']] == undefined || param[momWidget.searchProperty[index][i]['searchId']] =='')){
  			        that.messageBox({type: 'warning', width: '400', height: '145', html: momWidget.searchProperty[index][i]['searchNm'] +' '+ multiLang.transText('MESSAGE','MSG00043')});
  			        return false;
  		      }	
			  }
  										
  		  
          }
        }	
	    return true;
	},
	 syncData: function(index,item, rowIndex, dataField, refDataField, value) {
		var that = momWidget;
	var gridData = AUIGrid.getGridData(that.grid[index]);
	var gridLen = gridData.length;
	var rowIdField = AUIGrid.getProp(that.grid[index], "rowIdField");
	var items4update = [];
	var row;
	var obj;

	for(var i=rowIndex+1; i<gridLen; i++) {
		row = gridData[i];
		if(item[refDataField] == row[refDataField]) {
			obj = {};
			obj[rowIdField] = row[rowIdField];
			obj[dataField] = value;
			items4update.push(obj);
		} else {
			break;
		}
	}
	// 동일하게 변경
	AUIGrid.updateRowsById(that.grid[index], items4update);
},
	/*	// 검색버튼을 누른 효과
		: function(index, splash, param, retrieveCallBack, indexInfo, your) { 
			if(indexInfo != undefined && indexInfo['index'] != -1) {
				index = (indexInfo != undefined && indexInfo['newIndex'] != undefined && indexInfo['newIndex'] != indexInfo['index']) ? indexInfo['newIndex'] : indexInfo['index'];
			}
			
			var that = this;
			if(param == undefined || jQuery.isEmptyObject(param) || param == 'default') {
				param = this.createParam4Form(index, '#form');
				if(param <= 0) {
					setTimeout(function() {
						if(that.searchFilter[index][param * -1]['sortIndex'] == undefined || that.searchFilter[index][param * -1]['sortIndex'] == '') {
							that.messageBox({type: 'warning', width: '400', height: '145', html: that.searchFilter[index][param * -1]['headerText'] + ' 은(는) 필수 항목입니다.'});
							return;
						}
						
						var message = '';
						var sortIndex = that.searchFilter[index][param * -1]['sortIndex'];
						
						for(var i = 0; i < that.searchFilter[index].length; i++) {
							if(that.searchFilter[index][i]['sortIndex'] != undefined && that.searchFilter[index][i]['sortIndex'] == sortIndex) {
								if(message == '') {
									message = that.searchFilter[index][i]['headerText'];
								} else {
									message += (', ' + that.searchFilter[index][i]['headerText']);
								}
							}
						}
						
						message += ' 중 적어도 1개는 필수 항목입니다.';
						that.messageBox({type: 'warning', width: '400', height: '145', html: message});
						return;
					}, 40);
					
					return;
				}
			}
			
			
			 * if(document.getElementById('fromDate') != undefined &&
			 * document.getElementById('toDate') != undefined) { if($('.h01 >
			 * #fromDate').val() == '' || $('.h01 > #toDate').val() == '') {
			 * that.messageBox({type: 'warning', width: '400', height: '145',
			 * html: Language.lang['MESSAGES10250']}); return; } else
			 * if($('#fromDate').val() > $('#toDate').val()) {
			 * that.messageBox({type: 'warning', width: '400', height: '145',
			 * html: Language.lang['MESSAGES10785']}); return; } }
			 
			var h01Area = document.querySelector('.h01');
			if(h01Area != undefined) {
				var fromDate = h01Area.querySelector('#fromDate');
				var toDate = h01Area.querySelector('#toDate');
				if(fromDate != undefined && toDate != undefined) {
					if(fromDate.value == '' || toDate.value == '') {
						that.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES10250']});
						return;
					} else if(Number(fromDate.value.replace(/-/gi,'')) > Number(toDate.value.replace(/-/gi,''))) {
						that.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES10785']});
						return;
					}
				} else if(fromDate != undefined) {
					if($('#fromDate').val() == '') {
						that.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES10250']});
						return;
					}
				} else if(toDate != undefined) {
					if($('#toDate').val() == '') {
						that.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES11240']});
						return;
					}
				}
			}
			var h02Area = document.querySelector('.h02');
			if(h02Area != undefined) {
				var fromDate = h02Area.querySelector('#fromDate');
				var toDate = h02Area.querySelector('#toDate');
				if(fromDate != undefined && toDate != undefined) {
					if(fromDate.value == '' || toDate.value == '') {
						that.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES10250']});
						return;
					} else if(Number(fromDate.value.replace(/-/gi,'')) > Number(toDate.value.replace(/-/gi,''))) {
						that.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES10785']});
						return;
					}
				} else if(fromDate != undefined) {
					if($('#fromDate').val() == '') {
						that.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES10250']});
						return;
					}
				} else if(toDate != undefined) {
					if($('#toDate').val() == '') {
						that.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES11240']});
						return;
					}
				}
			}
			var h03Area = document.querySelector('.h03');
			if(h03Area != undefined) {
				var fromDate = h03Area.querySelector('#fromDate');
				var toDate = h03Area.querySelector('#toDate');
				if(fromDate != undefined && toDate != undefined) {
					if(fromDate.value == '' || toDate.value == '') {
						that.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES10250']});
						return;
					} else if(Number(fromDate.value.replace(/-/gi,'')) > Number(toDate.value.replace(/-/gi,''))) {
						that.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES10785']});
						return;
					}
				} else if(fromDate != undefined) {
					if($('#fromDate').val() == '') {
						that.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES10250']});
						return;
					}
				} else if(toDate != undefined) {
					if($('#toDate').val() == '') {
						that.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES11240']});
						return;
					}
				}
			}
			var h04Area = document.querySelector('.h04');
			if(h04Area != undefined) {
				var fromDate = h04Area.querySelector('#fromDate');
				var toDate = h04Area.querySelector('#toDate');
				if(fromDate != undefined && toDate != undefined) {
					if(fromDate.value == '' || toDate.value == '') {
						that.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES10250']});
						return;
					} else if(Number(fromDate.value.replace(/-/gi,'')) > Number(toDate.value.replace(/-/gi,''))) {
						that.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES10785']});
						return;
					}
				} else if(fromDate != undefined) {
					if($('#fromDate').val() == '') {
						that.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES10250']});
						return;
					}
				} else if(toDate != undefined) {
					if($('#toDate').val() == '') {
						that.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES11240']});
						return;
					}
				}
			}
			var h05Area = document.querySelector('.h05');
			if(h05Area != undefined) {
				var fromDate = h05Area.querySelector('#fromDate');
				var toDate = h05Area.querySelector('#toDate');
				
				if(fromDate != undefined && toDate != undefined) {
					if(fromDate.value == '' || toDate.value == '') {
						that.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES10250']});
						return;
					} else if(Number(fromDate.value.replace(/-/gi,'')) > Number(toDate.value.replace(/-/gi,''))) {
						that.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES10785']});
						return;
					}
				} else if(fromDate != undefined) {
					if($('#fromDate').val() == '') {
						that.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES10250']});
						return;
					}
				} else if(toDate != undefined) {
					if($('#toDate').val() == '') {
						that.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES11240']});
						return;
					}
				}
			}
			// 날짜체크 부분 수정 - 210322 / gyp
			var fromDate = document.getElementById('fromDate');
			var toDate = document.getElementById('toDate');
			
			if(fromDate != undefined && toDate != undefined) {
				if(fromDate.value == '' || toDate.value == '') {
					that.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES10250']});
					return;
				} else if(Number(fromDate.value.replace(/-/gi,'')) > Number(toDate.value.replace(/-/gi,''))) {
					that.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES10785']});
					return;
				}
			} else if(fromDate != undefined) {
				if($('#fromDate').val() == '') {
					that.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES10250']});
					return;
				}
			} else if(toDate != undefined) {
				if($('#toDate').val() == '') {
					that.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES11240']});
					return;
				}
			}
			
			if(document.getElementById('moFromDate') != undefined && document.getElementById('moToDate') != undefined) {
				if($('#moFromDate').val() == '' || $('#moToDate').val() == '') {
					that.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES10250']});
					return;
				} else if($('#moFromDate').val() > $('#moToDate').val()) {
					that.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES10785']});
					return;
				}
			}
			
			// ///////////////////////////////////////////////////////////
			var paramPair = {param : param, callBackParam : undefined};
			var message = this.procCallInit(index, 'R', paramPair, indexInfo, your);
			if(message == 'BREAK') {
				return;
			} else if(message != 'SUCCESS') {
				this.splashHide();
				this.messageBox({type: 'warning', width: '400', height: '145',  html: message});
				
				return;
			}
			param = paramPair['param'];
			// ///////////////////////////////////////////////////////////
			
			this.entireIsDone[index] = 'INIT';
			this.entireDatas[index] = undefined;
			
			this.currentPage[index] = 1;
			this.pageNumber[index] = 0;
			
			this.startPage[index] = 1; 
			this.gridProperty[index]['pageRowCount'] == this.gridProperty[index]['pageRowCount'] == undefined ? this.INFINITE : this.gridProperty[index]['pageRowCount'];
			this.endPage[index] = this.gridProperty[index]['pageRowCount'];
			var sortParam = momWidget.sortParam[index];
			var sortColumn = undefined;
			var sortType = undefined;
			var orderbyParam = "";
			
			for(var loop = 0; loop <sortParam.length ; loop++) {
				sortColumn = sortParam[loop].dataField;
				sortType = sortParam[loop].sortType;
				sortType = sortType == -1 ? "DESC" : "ASC"; 
				var sortText = sortColumn.replace(/[A-Z]/g, function(upp, i, st) {				    	
				    sortColumn = sortColumn.replace("/"+upp+"/gi","_"+upp);
				    	return "_"+upp;
				    	
					});
				    sortColumn = sortText.toUpperCase();
				    if(loop == sortParam.length-1){
				    	  orderbyParam =  orderbyParam+ sortColumn+" "+sortType;
				    }
				    else{
				    	  orderbyParam =  orderbyParam+ sortColumn+" "+sortType+",";
				    }		
			}

			for(var loop = 0,max=that.indexColumn[index].length; loop <max ; loop++) {
				const INDEX = that.indexColumn[index][loop]['INDEX'];
			    const dataField = that.columnProperty[index][INDEX]['dataField'];
			    const sortIndex = that.indexColumn[index][i]['sortIndex'] - 1;  
			    const asc = that.columnProperty[index][INDEX]['sort'];
				that.sortParam[index][sortIndex] = {dataField : data_field, sortType : asc};	
				
			}
			param.orderbyParam = orderbyParam;
			param['startPage'] = this.startPage[index];
			param['endPage'] = this.endPage[index];
			
			const entireProcess = ++(this.entireProcess[index]);
			
			if(splash) {
				this.splashShow();
			}

			if(index == 0 && this.grid[index+1] != undefined) {
				if(your != undefined) {
					if(your.noClear == undefined) {
						AUIGrid.clearGridData(this.grid[index+1]);
					}
				}
			}
			
			this.retrievePartial(index, param, entireProcess, retrieveCallBack, indexInfo, your);
		},*/
		
	// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 셀클릭 관련
	// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	setGridEvent: function(index, your) {
		var that =  this;	
        let result = 'SUCCESS';
       
		AUIGrid.bind(momWidget.grid[index], "ready", function(e) {
			let scrollbar = $(e.pid).find('.aui-hscrollbar');
		   if(scrollbar[0]!=undefined && scrollbar.css('display') !='none'){
		
		
		   }
		});
			AUIGrid.bind(that.grid[index], "cellEditBegin", function(e) {
			 if(your != undefined && your.cellEditCallInit != undefined) {
				result = your.cellEditCallInit(index,e.rowIndex,e);
				if (result == undefined){
					result = 'SUCCESS';
				}
				if(result != 'SUCCESS'){
					//e.orgEvent.stopImmediatePropagation();
					return false;
				}
			}	
			 for(let i=0,max=that.columnProperty[index].length; i<max;i++){
				if(that.columnProperty[index][i]['columnEditable'] =='N' && that.columnProperty[index][i]['columnCreate'] =='Y' && e.item.addItem == undefined && e.dataField == that.columnProperty[index][i]['columnId']){
						return false;
			    }
			 }			
	
			});
		AUIGrid.bind(that.grid[index], "cellEditEnd", function(e) {
			let columnProp = that.columnProperty[index][e.columnIndex];
			if(columnProp['columnType'] == 'S'){
					for(var i=0, len=that.columnDropdown[index][e.dataField].length; i<len; i++) { // keyValueList 있는 값만..
									if(that.columnDropdown[index][e.dataField][i]["code"] == e.value) {
										break;
									}
									if(i==len-1&&e.value!=''){
										AUIGrid.setCellValue(that.grid[index], e.rowIndex,e.columnIndex, e.oldValue);
										that.messageBox({type: 'warning', width: '400', height: '145', html: '리스트에 없는 데이터!'});
									}
								}
								$('.aui-grid-cell-editor-button.aui-grid-cell-editor-button-combo-list').css('display','none');
			}
						
			else if(columnProp['columnType'] == 'T'){
				 if(e.value=='' || e.value==null || e.value==undefined){
					 if(columnProp['dataType']=='string'){
						AUIGrid.setCellValue(that.grid[index], e.rowIndex, e.columnIndex, '');
					 }
					 else if(columnProp['dataType']=='numeric'){
						
					 }
					
				 }
				 else{
					   if(columnProp['dataType']=='numeric'){
					     if(isNaN(e.value)==true){
						      that.messageBox({type: 'warning', width: '400', height: '145', html: '숫자만 입력가능!'});
						      AUIGrid.setCellValue(that.grid[index], e.rowIndex, e.columnIndex, e.oldValue);
					     }
				       }
				 }
				  
			}
			else if(that.columnProperty[index][e.columnIndex]['columnType'] == 'DG'){
				//that.editItem[index].push();
			}
			else if(that.columnProperty[index][e.columnIndex]['columnType'] == 'CK'){
				if(e.dataField == "checkBox") {
			// 체크박스 클릭 했을 때, 병합된 모든 행의 체크박스를 동기화 시킴.
			that.syncData(index,e.item, e.rowIndex, e.dataField, that.columnProperty[0][1]['columnId'], e.value);
		     }
			}		
			if(your != undefined && your.cellEditCallBack != undefined) {
				result = your.cellEditCallBack(index,e.rowIndex,e.columnIndex,e.dataField,e.item,e);
				if (result == undefined){
					result = 'SUCCESS';
				}
				if(result != 'SUCCESS'){
					//e.orgEvent.stopImmediatePropagation();
					return false;
				}
			}				
      // return false; // false, true 반환으로 동적으로 수정, 편집 제어 가능
			});
			AUIGrid.bind(that.grid[index], "dropEnd", function(e) {
   			if(your != undefined && your.dropCallBack != undefined) {
				 your.dropCallBack(index,e.pid,e.pidToDrop,e.fromRowIndex,e.toRowIndex,e.dropColumnIndex,e.items); 		
			}	
    });
		$(document).on('click', '#upBtn1', function() {
			AUIGrid.moveRowsToUp(momWidget.grid[index]);
		
		});
		
		$(document).on('click', '#downBtn1', function() {
			AUIGrid.moveRowsToDown(momWidget.grid[index]);
		});	
/*	    AUIGrid.bind('#excelUpGrid1',  "ready", function(event) {
	  alert('으아아');
		return event.value; // 원래값
	});*/
		AUIGrid.bind(that.grid[index], "cellClick", function(e) {
			
			let customCheckBox = 'N';
				//let scrollbar = $('#grid1').children().children('.aui-hscrollbar').children('.aui-scroll-thumb').offset() == undefined ? {top:0,left:0}:$('#grid1').children().children('.aui-hscrollbar').children('.aui-scroll-thumb').offset();			
				
								
		        	    
			let item = e.item;
			let rowIdField = AUIGrid.getProp(e.pid, "rowIdField"); 
			let rowId = item[rowIdField];
			let rowIdValue = [] ;
			let dropdownGridYn = 'N';
			let dropDownGridIndex = 0;
		    let rowIndex = $('#dropDownGridPop'+(index+1)).length == 0 ?  0: Number($('#dropDownGridPop'+(index+1)).attr('rowIndex'));
		    let target = $('#dropDownGridPop'+(index+1)).length == 0 ?  '': $('#dropDownGridPop'+(index+1)).attr('target');
			let selectionMode = momWidget.gridProperty[index][0]['selectionMode'];
				if(your != undefined && your.cellClickCallInit != undefined) {
				result = your.cellClickCallInit(index,rowIndex,e) ;
				if (result == undefined){
					result = 'SUCCESS';
				}
				if(result != 'SUCCESS'){
					e.orgEvent.stopImmediatePropagation();
					return;
				}
			}
			
				for(let i=0,max=that.columnProperty[index].length; i<max;i++){
				 if( that.columnProperty[index][i]['columnType']=='C' && that.columnProperty[index][i]['columnId'] == e.dataField){
			/*	  $('#calendar-main').datepicker({
					changeMonth: true,
					changeYear: true,
					selectOtherMonths : true,
					showOtherMonths: true,
					autoSize: true,
					dateFormat: 'dd-mm-yy',
					dayNamesMin: [ "일", "월", "화", "수", "목", "금", "토" ],
					monthNamesShort: [ "1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월" ]});*/
					if(e.value != '' && e.value !=undefined){
						let cellValue = e.value.split(' ');
						//let setDateText = cellValue[0].split('-');
						//setDateText =  setDateText[2]+'-'+ setDateText[1]+'-' +setDateText[0];
						//$( "#calendar-main" ).datepicker( "setDate", setDateText);
						$( "#time-main" ).val(cellValue[0]+'T'+cellValue[1]);
						//$('#time-main').val('2017-06-01T08:30')
						//$('#time-main').timepicker();
					
						
					}
					
			        $('#calendar-pop').attr('rowIndex',e.rowIndex);
			        $('#calendar-pop').attr('columnIndex',e.columnIndex);
			        $('#calendar-pop').css('display','block');
			        let td = AUIGrid.getCellElementByIndex(that.grid[index], e.rowIndex,e.columnIndex); // 0, 0 번째 TD 얻기
		       	    let offset = $(td).offset();
					let activeTop = offset.top;//
					let activeLeft = offset.left;	
			      $('#calendar-pop').offset({top : activeTop, left : activeLeft});		
			    }
			    if(that.columnProperty[index][i]['columnId']=='checkBox'){
				    customCheckBox = 'Y';
			    }
			}
			
			 for(let i=0,max1=that.columnProperty[index].length; i<max1;i++){
				if(that.columnProperty[index][i].columnType == 'DG' && that.columnProperty[index][i].columnId == e.dataField){					
						dropdownGridYn = 'Y';
						dropDownGridIndex = i;
					    break;				
				}
			 }
			
			if(dropdownGridYn == 'Y'){
				var columnProp = [];	
				var targetId =  e.dataField;
				let totalParam = [];
				let rowIndex = e.rowIndex;

				
				
				    let td = AUIGrid.getCellElementByIndex(that.grid[index], e.rowIndex,e.columnIndex); // 0, 0 번째 TD 얻기
		       	    let offset = $(td).offset();
					let activeTop = offset.top;//
					let activeLeft = offset.left;	
				// activeTop = e.orgEvent.currentTarget.offsetTop;//
				 //activeLeft = e.orgEvent.currentTarget.offsetLeft;
  	            var dropdownGridId =90;
	            let dropdownGridQueryId = that.columnProperty[index][dropDownGridIndex]['dropdownId'];
			    mom_ajax('R', 'XUSM3030.defaultInfo', {menuId:dropdownGridQueryId,gridId:1}, function(result1, data1) { 
		         if(result1 != 'SUCCESS' || data1.length == 0) {
		    	  momWidget.splashHide();
			      return;							     
		        }			  
		      var gridString   = data1[0]['gridProperty']   == undefined ? '[]':data1[0]['gridProperty'];
		      var columnString = data1[0]['columnProperty'] == undefined ? '[]':data1[0]['columnProperty'];
		          gridString   = gridString.substr(1,  gridString.length-2);  
			      columnString = columnString.substr(1,  columnString.length-2);
			      that.gridProperty[dropdownGridId]     = JSON.parse(gridString);
			      that.columnProperty[dropdownGridId]   = JSON.parse(columnString);
			    var gridExceptList = ['checkId','gridTitle','popupColNum','popupRowNum','popupTitle','headerColor','initSearch','showFindBtn']; 	
				var gridExtraProp  = {'checkId':'checkId','gridTitle':'gridTitle','popupColNum':'popupColNum','popupRowNum':'popupRowNum','popupTitle':'popupTitle','headerColor':'headerColor','initSearch':'initSearch','showFindBtn':'showFindBtn'};			
			      for(var i=0,max=gridExceptList.length; i<max;i++){
			    	   gridExtraProp[gridExceptList[i]] = that.gridProperty[dropdownGridId][0][gridExceptList[i]];			    	  
			    	   delete that.gridProperty[dropdownGridId][0][gridExceptList[i]];
			      }
			      that.gridExtraProperty[dropdownGridId] = gridExtraProp;
			     var popupColNum = that.gridExtraProperty[dropdownGridId]['popupColNum'] == undefined ? 3:Number(that.gridExtraProperty[dropdownGridId]['popupColNum']);
			     var popupRowNum = that.gridExtraProperty[dropdownGridId]['popupRowNum'] == undefined ? 3:Number(that.gridExtraProperty[dropdownGridId]['popupRowNum']);
			     var popupHtml = that.createPopup.dropDownGridPop(dropdownGridId+1,popupColNum,popupRowNum,'popup',targetId,rowIndex);
			    
 		         var menuId = that.pageProperty[index]['programId'];
                 var isShow = $('#dropDownGridPop'+(dropdownGridId+1)).css('display');
                    if(isShow == 'block'){
	                // $('#dropDownGridPop'+(dropdownGridId+1)).css('display','none');
	                 $('#dropDownGridPop'+(dropdownGridId+1)).remove();
					 return;
				}	
			    //$('#dropDownGridPop'+(dropdownGridId+1)).remove();   
			    $('body').append(popupHtml);
			
                
			       for(var i=0,max=that.columnProperty[dropdownGridId].length;i<max;i++){	
			    	   columnType = that.columnProperty[dropdownGridId][i]['columnEditable'] == 'N' ? 'default':'edit';	
			    	   widthUse = that.columnProperty[dropdownGridId][i]['columnWidth']  == 0 ? 'N': 'Y';
			    	   excelShow = that.columnProperty[dropdownGridId][i]['excelShow']  == 'Y' ? 'Y': 'N';
			    	   excelTemplateShow = that.columnProperty[dropdownGridId][i]['excelTemplateShow']  == 'Y' ? 'Y': 'N';
			    	   gridShow = that.columnProperty[dropdownGridId][i]['columnShow']  == 'Y' ? true: false;
			    	   excelDownShow   = that.columnProperty[dropdownGridId][i]['excelShow'] == 'Y' ? true: false;
			    	   excelUploadShow = that.columnProperty[dropdownGridId][i]['excelTemplateShow'] == 'Y' ? true: false;
			    	   isCheckBox = momWidget.columnProperty[dropdownGridId][i]['columnType'] == 'CK' ? 'Y': 'N';
			    	   isDropDown = momWidget.columnProperty[dropdownGridId][i]['columnType'] == 'S' ? 'Y': momWidget.columnProperty[index][i]['columnType'] == 'M' ? 'Y':'N';
			    	   columnId = that.columnProperty[dropdownGridId][i]['columnId'];

			    	   columnProp[i] =  {
					    	      dataField 	: columnId 
					  			, headerText 	: that.columnProperty[dropdownGridId][i]['columnNm'] 
						   		, dataType      : that.columnProperty[dropdownGridId][i]['dataType'] 
								, formatString  : that.columnProperty[dropdownGridId][i]['dataFormat']
	    	                    , editable      : that.columnProperty[dropdownGridId][i]['columnEditable']  == 'Y' ? true : false
					  			, style			: that.columnProperty[dropdownGridId][i]['columnAlign']  == 'LEFT' ? 'aui-grid-'+columnType+'-column-left': that.columnProperty[index][i]['columnAlign'] == 'RIGHT'? 'aui-grid-'+columnType+'-column-right' : 'aui-grid-'+columnType+'-column-center'	
					  			, visible       : gridShow  
					  		
	                    };

			    	   if(widthUse == 'Y'){
			    		   columnProp[i].width      = that.columnProperty[dropdownGridId][i]['columnWidth'];

			    	   }
			    	   if(isCheckBox =='Y'){
			    		   columnProp[i].renderer = {
									          type: 'CheckBoxEditRenderer'
											, editable: true
											,checkValue : 'Y' 
											,unCheckValue : 'N'
										};
			    		   
			    		   columnProp[i].headerRenderer = { 
			    				type : "CheckBoxHeaderRenderer",
			    				position : "right",
			    				dependentMode : true
			    				//onClick : myHeaderCheckClick 
			    			};
			    	   }
			 
			    	   	
			      } 	
			        AUIGrid.destroy('#grid'+(dropdownGridId+1));
				    that.grid[dropdownGridId] = AUIGrid.create('#grid'+(dropdownGridId+1), columnProp, that.gridProperty[dropdownGridId][0]); 
			      

				     //$('#dropDownGridPop'+(dropdownGridId+1)).momModal('show');
				     $('#dropDownGridPop'+(dropdownGridId+1)).css('z-index','9999');
				     $('#dropDownGridPop'+(dropdownGridId+1)).css('display','block');
				     
				     $('#dropDownGridPop'+(dropdownGridId+1)).offset({top : activeTop+20, left : activeLeft+0});
				  AUIGrid.resize('#grid'+(dropdownGridId+1));	
				  that.setGridEvent(dropdownGridId,your);                      // 그리드이벤트 세팅(셀클릭,체크박스클릭,편집 등)
				  let callInitResult = that.checkActionCallInit(dropdownGridId, 'R',  item, 'CELLCLICK', your,e);     	
			  if(callInitResult['result'] != 'SUCCESS') {
							  momWidget.messageBox({type:'danger', width:'400', height: '145', html: callInitResult['msg']});
							  momWidget.splashHide();
						      return;
			 }
			 totalParam = callInitResult['param'];
				  mom_ajax('R', 'DG.'+dropdownGridQueryId, totalParam, function(result1, data1) {
					if(result1 != 'SUCCESS') {
						    	  momWidget.splashHide();
							      return;							     
					}
						 AUIGrid.setGridData(that.grid[dropdownGridId], data1); 
						   						   	
				}, undefined, undefined, that, false);
		    	/* that.findBtnClicked(dropdownGridId, [{keyId1:fieldValue}], true, 'INIT',menuId,your,function(callBackResult, callBackData) {
						                 if(callBackResult != 'SUCCESS' || callBackData.length==0) {
						    	            momWidget.splashHide();
						    	            momWidget.messageBox({type:'warning', width:'400', height: '145', html: '조회된 데이터없음!'});
						    	            $('#dropDownGridPop'+(dropdownGridId+1)).remove();
							                return;							     
						                 }	
						               
					});*/
		       
				}, undefined, undefined, this, false);
				
				//}
				e.orgEvent.stopImmediatePropagation();
				return;
			}
			else{
				
			rowIdValue.push(e.rowIdValue);
			let gridData = AUIGrid.getGridData(e['pid']);
			let checkCount = 0;
			if(selectionMode =='singleCell' || selectionMode == 'singleRow'){
				for(let i=0,max=gridData.length; i<max;i++){
					if(AUIGrid.isCheckedRowById(e.pid, gridData[i][rowIdField])){ //체크되어있따면
					  
						checkCount ++;
					}
					
					
				}
				 if(checkCount==0){					
					AUIGrid.setCheckedRowsByIds(e.pid, rowId);
					  if(customCheckBox=='Y'){
						//that.syncData(index,e.item, e.rowIndex, 'checkBox', that.columnProperty[0][1]['columnId'], 'Y');
						     
					  }
				}
				 else if(checkCount==1){
					     AUIGrid.setCheckedRowsByIds(e.pid, rowId);
					     if(customCheckBox=='Y'){
						   //that.syncData(index,e.item, e.rowIndex, 'checkBox', that.columnProperty[0][1]['columnId'], 'N');
					    }
				     }
				 else if(checkCount>1){
					let ischeck = AUIGrid.isCheckedRowById(e.pid, rowId);
					AUIGrid.setAllCheckedRows(e.pid, false);
					AUIGrid.setCheckedRowsByIds(e.pid, rowId);
				/*	if(ischeck==true){
						AUIGrid.addUncheckedRowsByIds(e.pid, rowId);
					}
					else{
						AUIGrid.setCheckedRowsByIds(e.pid, rowId);
					}*/
					
				
					  if(customCheckBox=='Y'){
						  // that.syncData(index,e.item, e.rowIndex, 'checkBox', that.columnProperty[0][1]['columnId'], '');
					  }
					
				}
				
				
				else{
					
				}
				
			/*	if(AUIGrid.isCheckedRowById(e.pid, rowId)) {
					AUIGrid.addUncheckedRowsByIds(e.pid, rowId);
				} else {								
					     AUIGrid.setCheckedRowsByIds(e.pid, rowId);
				}*/
			}
			else if(selectionMode =='multipleCells' || selectionMode == 'multipleRows'){	
				if(AUIGrid.isCheckedRowById(e.pid, rowId)) {
					AUIGrid.addUncheckedRowsByIds(e.pid, rowId);
				} else {								
					AUIGrid.addCheckedRowsByIds(e.pid, rowId);
				}
				     
					
			}
			else{
				
			}
			if(your != undefined && your.cellClickCallBack != undefined) {
			     your.cellClickCallBack(index,rowIndex,target,e);
			}
			}
		
			
		});	
		AUIGrid.bind(that.grid[index], "rowCheckClick", function(e) {
		
			const rowIdField = AUIGrid.getProp(e['pid'], 'rowIdField'); 			 
			const rowId = e['item'][rowIdField];
			let gridData = AUIGrid.getGridData(e['pid']);
			let checkCount=0;
			//let selectionMode = AUIGrid.getProp(that.grid[index], "selectionMode");
			let checkMode = that.gridExtraProperty[index]['checkId'];
			if(checkMode =='singleRows'){
				for(let i=0,max=gridData.length; i<max;i++){
					if(AUIGrid.isCheckedRowById(e.pid, gridData[i][rowIdField])){
						checkCount ++;
					}
					
					
				}
				 if(checkCount==0){					
					AUIGrid.setCheckedRowsByIds(e.pid, rowId);
					
				}
				else if(checkCount==1){
					
				}
				else if(checkCount>1){
						let ischeck = AUIGrid.isCheckedRowById(e.pid, rowId);
					AUIGrid.setAllCheckedRows(e.pid, false);
					AUIGrid.setCheckedRowsByIds(e.pid, rowId);
				/*	if(ischeck==true){
						AUIGrid.addUncheckedRowsByIds(e.pid, rowId);
					}
					else{
						AUIGrid.setCheckedRowsByIds(e.pid, rowId);
					}*/
					
					
				}
				
				
				else{
					
				}
				
			}
			else if( checkMode == 'multipleRows'){
				for(let i=0,max=gridData.length; i<max;i++){
					if(AUIGrid.isCheckedRowById(e.pid, gridData[i][rowIdField])){
						checkCount ++;
					}
					
					
				}
				 if(checkCount==0){					
					AUIGrid.setCheckedRowsByIds(e.pid, rowId);
					
				}
				else if(checkCount==1){
					//AUIGrid.setCheckedRowsByIds(e.pid, rowId);
				}
				else if(checkCount>1){
					//AUIGrid.setAllCheckedRows(e.pid, false);
					//AUIGrid.setCheckedRowsByIds(e.pid, rowId);
					
				}
				
				
				else{
					
				}
			}
			else{
				
			}
	
		});	
	/*	AUIGrid.bind(that.grid[index], "dropEnd", function(event ) {
			var childColumn    = that.gridProperty[index][0]['treeIdField']
			var childId        = event['toRowIndex'];
			var parentColumn   = that.gridProperty[index][0]['treeIdRefField'];
			var prevParentId   = event.items[0][that.gridProperty[index][0]['treeIdRefField']]
			var toRowIndex     = event['toRowIndex'];
			var nowParentId    = event.items[0]['_$parent'];
			AUIGrid.setCellValue(that.grid[index], toRowIndex, parentColumn, nowParentId);
		});*/
	},
	setKeyEvent: function(index, your) {
		var that =  this;	
		//$(document).on('keydown', '.searchInputField, .searchSelectField, .searchSelectField-search-combo', function(e) {
			$(document).on('keydown', 'searchInputField, .searchSelectField, body', function(e) {
			if(e.keyCode == 113){ //엔터
				$('#findBtn'+(index+1)).click();
			} 
			else if(e.keyCode == 8 || e.keyCode == 46){
				var searchId = document.activeElement.parentElement.parentElement.parentElement.parentElement.id;
				$('#'+searchId).jqxComboBox('clearSelection');
				$('#'+searchId).jqxComboBox('uncheckAll');
			}
		});
		$(document).on('keydown','.searchSelectField.jqx-datetimeinput', function(e) {
			if(e.keyCode == 113){ //엔터
				$('#findBtn'+(index+1)).click();
			} 
			else if(e.keyCode == 8 || e.keyCode == 46){
				var searchId = document.activeElement.parentElement.parentElement.parentElement.parentElement.id;
				$('#'+searchId+'SP'+(index+1)).val('');
			}
		});
		$(document).on('keydown', '.searchSelectField-search-combo', function(e) {
			if(e.keyCode == 13){ //엔터
			var searchId = document.activeElement.parentElement.parentElement.parentElement.parentElement.id;
			var searchString = $('#'+document.activeElement.parentElement.parentElement.parentElement.parentElement.id).val().trim();
			var minLength = that.searchComboMinLength[index][searchId] ;
			var queryId = that.searchComboQueryId[index][searchId];
			if(searchString.length < minLength)	{
						that.messageBox({type: 'warning', width: '400', height: '145', html: that.searchComboMinLength[index][popupId] +''+ multiLang.transText('MESSAGE','MSG00050')});
						return;
			}
			else{
				mom_ajax('R', queryId, {"searchKey":searchString}, function(result, data) {
						      if(result != 'SUCCESS') {
						    	  momWidget.splashHide();
							      return;							     
						      }	
						      $('#'+searchId).jqxComboBox({source: data});
						   		setTimeout(function() {
	                				$('#'+searchId).jqxComboBox('open' ); 
    							},500);
						      		}, undefined, undefined, that, false);
			}
				

			} 
			
			

		});
		$(document).on('keydown', '.popupSelectField-popup-combo', function(e) {
			if(e.keyCode == 13){ //엔터
			e.stopImmediatePropagation();
			var popupId = document.activeElement.parentElement.parentElement.parentElement.parentElement.id;
			var popupIndex = Number($('#'+e.currentTarget.parentElement.parentElement.parentElement.parentElement.id).attr('index'))
			var searchString = $('#'+document.activeElement.parentElement.parentElement.parentElement.parentElement.id).val().trim();
			var minLength = that.popupComboMinLength[popupIndex][popupId] ;
			var queryId = that.popupComboQueryId[popupIndex][popupId];
			
			if(searchString.length < minLength)	{
						that.messageBox({type: 'warning', width: '400', height: '145', html: that.popupComboMinLength[index][popupId] +''+ multiLang.transText('MESSAGE','MSG00050')});
						return;
			}
			else{
				mom_ajax('R', queryId, {"searchKey":searchString}, function(result, data) {
						      if(result != 'SUCCESS') {
						    	  momWidget.splashHide();
							      return;							     
						      }	
						      $('#'+popupId).jqxComboBox({source: data});
						   		setTimeout(function() {
	                				$('#'+popupId).jqxComboBox('open' ); 
    							},500);
						      		}, undefined, undefined, that, false);
			}
				

			} 

		});

	},
	setComboBoxSet: function(index, your) {
		var that =  momWidget;	
        var searchId = '';
        var popupId = '';
        var searchType = '';
        var popupType = '';
        var paramMap   = [];
        var searchQueryId = '';
        var popupQueryId = '';
        var searchHeaderDropdownId = '';
        var searchHeaderType = '';
        var popupHeaderDropdownId = '';
        var popupHeaderType = '';
        var searchComboMinLength={};
        var searchComboItem = {};
        var popupComboMinLength={};
        var popupComboItem = {};
        var searchDropdownId  = '';
        var popupDropdownId  = '';
        var searchNameSpace  = '';
        var popupNameSpace  = '';
        var searchMinLen=1;
        var popupMinLen=1;
        var maxItemWidth = 0;
        var maxItemWidthArry = 0;
        var maxItemWidthNum = 0;
        var searchDropdownParam =[];
        var popupDropdownParam =[];
        if (momWidget.searchProperty.length > 0){
	  for(var i=0,max=that.searchProperty[index].length; i<max;i++){
			 searchType = that.searchProperty[index][i]['searchType'];
			 searchId = that.searchProperty[index][i]['searchId'];
			 searchHeaderDropdownId  = that.searchProperty[index][i]['headerDropdownId'];
			 searchHeaderType  = that.searchProperty[index][i]['headerType'];
			 searchDropdownId  = that.searchProperty[index][i]['dropdownId'];
			 searchNameSpace   = searchDropdownId.substr(0, 2);  


			  
			if(searchType == 'S' || searchType == 'M' || searchHeaderType == 'S'||searchHeaderType == 'M' || searchType == 'SS' || searchType == 'MS'){	      
				        if(searchHeaderDropdownId != '' && searchHeaderDropdownId != undefined){
				        	 $('#'+searchId+'Header'+'SP'+(index+1)).jqxComboBox({ displayMember: "label", valueMember: "code", width: '160px', height: 27,dropDownHeight: 120,disabled: false});
				        	 $('#'+searchId+'Header'+'SP'+(index+1)).prev().prev().attr('class','circle-dh')
				        	 $('#'+searchId+'Header'+'SP'+(index+1)).jqxComboBox({selectedIndex: 0 });
				        }
				        else{
				        	if(searchType == 'M'){
				        		$('#'+searchId+'SP'+(index+1)).jqxComboBox({displayMember: "label", valueMember: "code", width: '210px', height: 27,dropDownHeight: 120,disabled: false,checkboxes: true,searchMode: 'containsignorecase'});
				        		$('#'+searchId+'SP'+(index+1)).on('bindingComplete', function (e) {
				  
				   maxItemWidth = $("#innerListBox" + e.owner.id + " div[role=option] span")[1].style["width"];
				   maxItemWidthArry = maxItemWidth.split('px');
				   maxItemWidthNum = Number(maxItemWidthArry[0]);
				  if(maxItemWidthNum<210){
					 maxItemWidth = '210px';
				 }
				 else{
					maxItemWidth = maxItemWidthNum+50+'px'
				 }
				 $('#'+e.target.id).jqxComboBox({dropDownWidth:maxItemWidth});
			      });
				        		
				 }
				  else if(searchType == 'MS'){
						searchMinLen  = Number(that.searchProperty[index][i]['defaultValue'].trim());
						searchComboMinLength[searchId+'SP'+(index+1)] = searchMinLen;
						if(searchDropdownId != '' && searchDropdownId != undefined){
						searchQueryId = searchDropdownId;
						searchComboItem[searchId+'SP'+(index+1)] = searchNameSpace+'.'+searchQueryId;
							 
							// paramMap[i] = splitArray[0]:; 
						}
						else{
							    searchQueryId = searchDropdownId;
							 //   paramMap[i] = ; 
						}
					that.searchComboQueryId[index] = searchComboItem;
					that.searchComboMinLength[index] = searchComboMinLength; 		    
						     $('#'+searchId+'SP'+(index+1)).jqxComboBox({ displayMember: "label",checkboxes: true, valueMember: "code", width: 210, height: 30,dropDownHeight: 120,disabled: false,searchMode: 'containsignorecase',placeHolder: 'enter '+searchMinLen +' or more characters',minLength: searchMinLen,remoteAutoComplete: false});
		  $('#'+searchId+'SP'+(index+1)).on('bindingComplete', function (e) {				  
				   maxItemWidth = $("#innerListBox" + e.owner.id + " div[role=option] span")[1].style["width"];
				   maxItemWidthArry = maxItemWidth.split('px');
				   maxItemWidthNum = Number(maxItemWidthArry[0]);
				  if(maxItemWidthNum<160){
					 maxItemWidth = '160px';
				 }
				 else{
					maxItemWidth = maxItemWidthNum+30+'px'
				 }
				 $('#'+e.target.id).jqxComboBox({dropDownWidth:maxItemWidth});
			      });
				}
				 else if(searchType == 'SS'){
						searchMinLen  = Number(that.searchProperty[index][i]['defaultValue'].trim());
						searchComboMinLength[searchId+'SP'+(index+1)] = searchMinLen;
						if(searchDropdownId != '' && searchDropdownId != undefined){
						searchQueryId = searchDropdownId;
						searchComboItem[searchId+'SP'+(index+1)] = searchNameSpace+'.'+searchQueryId;
							 
							// paramMap[i] = splitArray[0]:; 
						}
						else{
							    searchQueryId = searchDropdownId;
							 //   paramMap[i] = ; 
						}
					that.searchComboQueryId[index] = searchComboItem;
					that.searchComboMinLength[index] = searchComboMinLength; 		    
						     $('#'+searchId+'SP'+(index+1)).jqxComboBox({ displayMember: "label", valueMember: "code", width: 210, height: 30,dropDownHeight: 120,disabled: false,searchMode: 'containsignorecase',placeHolder: 'enter '+searchMinLen +' or more characters',minLength: searchMinLen,remoteAutoComplete: false});
		  $('#'+searchId+'SP'+(index+1)).on('bindingComplete', function (e) {				  
				   maxItemWidth = $("#innerListBox" + e.owner.id + " div[role=option] span")[0].style["width"];
				   maxItemWidthArry = maxItemWidth.split('px');
				   maxItemWidthNum = Number(maxItemWidthArry[0]);
				  if(maxItemWidthNum<160){
					 maxItemWidth = '160px';
				 }
				 else{
					maxItemWidth = maxItemWidthNum+30+'px'
				 }
				 $('#'+e.target.id).jqxComboBox({dropDownWidth:maxItemWidth});
			      });
			          $('#'+searchId+'SP'+(index+1)).on('close', function (e) {
				     var tmpCd = e.target.children[1].value; 
				            if(tmpCd ==''){
								$('#'+e.target.id).jqxComboBox('clear');
								return;
							}
							 
							 //$('#'+e.target.id).val(tmpCd);
			      });		
			      
			     
				}
				else if(searchType == 'S'){
				      $('#'+searchId+'SP'+(index+1)).jqxComboBox({displayMember: "label", valueMember: "code", width: 210, height: 27,dropDownHeight: 120,disabled: false,searchMode: 'containsignorecase'});
				    	$('#'+searchId+'SP'+(index+1)).on('bindingComplete', function (e) {	
					if($("#innerListBox" + e.owner.id + " div[role=option] span")[0]==undefined){
						 
						  maxItemWidth = '160px';
					}	  
					else{
						 maxItemWidth = $("#innerListBox" + e.owner.id + " div[role=option] span")[0].style["width"];
					}
				 
				   maxItemWidthArry = maxItemWidth.split('px');
				   maxItemWidthNum = Number(maxItemWidthArry[0]);
				  if(maxItemWidthNum<210){
					 maxItemWidth = '210px';
				 }
				 else{
					maxItemWidth = maxItemWidthNum+30+'px';
				 }
				 $('#'+e.target.id).jqxComboBox({dropDownWidth:maxItemWidth});
			      });
			          $('#'+searchId+'SP'+(index+1)).on('close', function (e) {
				/*     var tmpCd = e.target.children[1].value; 
				            if(tmpCd ==''){
								$('#'+e.target.id).jqxComboBox('clear');
								return;
							}*/
							//$('#'+searchId+'SP'+(index+1)).jqxComboBox('clear'); 
							 //$('#'+e.target.id).val(tmpCd);
			      });	
			      	$('#'+searchId+'SP'+(index+1)).on('keyup', function (e) {
				        if(e.keyCode==13){
						    let passCount = 0;				 	  
							that.searchPrevItem = $('#'+e.currentTarget.id).jqxComboBox('getItems') == undefined ? 0:$('#'+e.currentTarget.id).jqxComboBox('getItems');
					       if(that.searchPrevItem.length !=0 && $('#'+e.currentTarget.id).val()!=''){
		             		for(var i=0,max1=that.searchPrevItem.length; i<max1;i++){
								if(that.searchPrevItem[i]['value'] == $('#'+e.currentTarget.id).val().trim()){
								passCount ++;	
							}
						    
					       } 
					     if(passCount >=1 ){
						     return;
						 }
							}	
										  				  
      					// let items = $('#'+searchId+'SP'+(index+1)).jqxComboBox('getItems');
      					   if($('#'+e.currentTarget.id).val() =='' ||that.searchComboItems[e.currentTarget.id] == undefined || that.searchComboItems[e.currentTarget.id] == ''){
							$('#'+e.currentTarget.id).jqxComboBox('source',that.searchComboItems[e.currentTarget.id]);	
			  		        $('#'+e.currentTarget.id).jqxComboBox('open');
	          				return;
						} 
						//$('#'+e.currentTarget.id).val('');
						let searchStr = $('#'+e.currentTarget.id).val();
						//$('#'+e.currentTarget.id).jqxComboBox('clear');
      					let oldItems = that.searchComboItems[e.currentTarget.id];
      				/*	if(that.preComboItems[index][e.currentTarget.id]==undefined){
	 						that.preComboItems[index][e.currentTarget.id] = oldItems;
						}*/
      					    
      					let newItems = [];
              			for(var i=0,popupLen=oldItems.length; i<popupLen;i++){					
				 			if(oldItems[i]['label'].toUpperCase().indexOf($('#'+e.currentTarget.id).val().toUpperCase()) >=0){
								//$("#jqxComboBox").jqxComboBox('removeItem', "List Item" ); 
								 newItems.push(oldItems[i]);
							     
								//$('#'+e.currentTarget.id).jqxComboBox('addItem', { label: oldItems[i]['label'], code: oldItems[i]['code']}); 
							}
							else{
								//$('#'+e.currentTarget.id).jqxComboBox('removeItem', oldItems[i]['code']);
							}

			  		   }
			  		      
	               			//$('#'+e.currentTarget.id).val(searchStr);
    					
			  		  
			  		   if(newItems.length ==0 ){
				 		   
			  		       $('#'+e.currentTarget.id).jqxComboBox('source',oldItems);	
			  		       $('#'+e.currentTarget.id).jqxComboBox('open');
			  		  
						}
						else{
							
			  		    	$('#'+e.currentTarget.id).jqxComboBox('source',newItems);	
			  		    	$('#'+e.currentTarget.id).jqxComboBox('open');
			  		    	
			  		    	 $('#'+e.currentTarget.id).val(searchStr);
						}
			  		    
     					
}
				    	
			      });
				}
				else{
				     
				        	}
				        
				        	  
				        }

					
		
			}
		
		
			}
		}
		
		if (momWidget.popupProperty.length > 0){

		  for(var j=0,max2=that.popupProperty[index].length; j<max2;j++){
			
				popupDropdownId       = that.popupProperty[index][j]['dropdownId'];
				popupDropdownParam   = that.popupProperty[index][j]['dropdownParam'] == '' ? []:that.popupProperty[index][j]['dropdownParam'];
			    popupType        = that.popupProperty[index][j]['popupType']; 
			    popupNameSpace   = popupDropdownId.substr(0, 2);  
			    queryId          = '';
			    paramMap.length  = 0;
			  //  minLength        = 1;
			    popupId = that.popupProperty[index][j]['popupId'] + 'DP' +(index+1);
					if(popupType == 'S' ){    
						$('#'+popupId).jqxComboBox({displayMember: "label", valueMember: "code", width: 160, height: 30,dropDownHeight: 120,disabled: false,searchMode: 'none'});       		
					  	 $('#'+popupId).on('bindingComplete', function (e) {
							   maxItemWidth = $("#innerListBox" + e.owner.id + " div[role=option] span")[0].style["width"];
							  maxItemWidthArry = maxItemWidth.split('px');
							   maxItemWidthNum = Number(maxItemWidthArry[0]);
							  if(maxItemWidthNum<160){
								 maxItemWidth = '160px';
							 }
							 else{
								maxItemWidth = maxItemWidthNum+20+'px';
							 }
							 $('#'+e.target.id).jqxComboBox({dropDownWidth:maxItemWidth});
			      });		
			   /*    	$('#'+popupId).on('open', function (e) {
				    that.popupOpenYn = 'N';
				 });*/	
				    $('#'+popupId).on('close', function (e) {
				     var tmpCd = e.target.children[1].value; 
				           /* if(tmpCd ==''){
								$('#'+e.target.id).jqxComboBox('clear');
								return;
							}*/
							//that.popupOpenYn = 'N';
						

							
			      });	
			      	      	$('#'+popupId).on('keyup', function (e) {
				        if(e.keyCode==13){	
					        let passCount = 0;				 	  
							that.popupPrevItem = $('#'+e.currentTarget.id).jqxComboBox('getItems');
						
	                     if(that.popupPrevItem.length !=0 && $('#'+e.currentTarget.id).val()!=''){
		             		for(var i=0,max1=that.popupPrevItem.length; i<max1;i++){
								if(that.popupPrevItem[i]['value'] == $('#'+e.currentTarget.id).val().trim()){
								passCount ++;	
							}
						    
					     } 
					     if(passCount>=1){
						     return;
						 }
							}							  
      					// let items = $('#'+searchId+'SP'+(index+1)).jqxComboBox('getItems');
      					   if($('#'+e.currentTarget.id).val() =='' ||that.searchComboItems[e.currentTarget.id] == undefined || that.searchComboItems[e.currentTarget.id] == ''){
							$('#'+e.currentTarget.id).jqxComboBox('source',that.searchComboItems[e.currentTarget.id]);	
			  		        $('#'+e.currentTarget.id).jqxComboBox('open');
			  		        //that.popupOpenYn = 'Y'; 
	          				return;
						} 
						//$('#'+e.currentTarget.id).val('');
						let searchStr = $('#'+e.currentTarget.id).val();
						//$('#'+e.currentTarget.id).jqxComboBox('clear');
      					let oldItems = that.searchComboItems[e.currentTarget.id];
      				/*	if(that.preComboItems[index][e.currentTarget.id]==undefined){
	 						that.preComboItems[index][e.currentTarget.id] = oldItems;
						}*/
      					    
      					let newItems = [];
              			for(var i=0,popupLen=oldItems.length; i<popupLen;i++){					
				 			if(oldItems[i]['label'].toUpperCase().indexOf($('#'+e.currentTarget.id).val().toUpperCase()) >=0){
								//$("#jqxComboBox").jqxComboBox('removeItem', "List Item" ); 
								 newItems.push(oldItems[i]);
								//$('#'+e.currentTarget.id).jqxComboBox('addItem', { label: oldItems[i]['label'], code: oldItems[i]['code']}); 
							}
							else{
								//$('#'+e.currentTarget.id).jqxComboBox('removeItem', oldItems[i]['code']);
							}

			  		   }
			  		      
	               			//$('#'+e.currentTarget.id).val(searchStr);
    					
			  		  
			  		   if(newItems.length ==0 ){
				 		   
			  		       $('#'+e.currentTarget.id).jqxComboBox('source',oldItems);	
			  		       $('#'+e.currentTarget.id).jqxComboBox('open');
			  		  
						}
						else{
							
			  		    	$('#'+e.currentTarget.id).jqxComboBox('source',newItems);	
			  		    	$('#'+e.currentTarget.id).jqxComboBox('open');
			  		    	
			  		    	 $('#'+e.currentTarget.id).val(searchStr);
						}
    				
					 
			  		    
     					
						}
				    	
			      });
				
			      
			      
				}
				else if(popupType == 'DG' ){    
						$('#'+popupId).jqxComboBox({displayMember: "label", valueMember: "code", width: 160, height: 30,dropDownHeight: 120,disabled: false,searchMode: 'containsignorecase',placeHolder: 'press click to open'});       		
					  	 $('#'+popupId).on('bindingComplete', function (e) {
							/*   maxItemWidth = $("#innerListBox" + e.owner.id + " div[role=option] span")[0].style["width"];
							  maxItemWidthArry = maxItemWidth.split('px');
							   maxItemWidthNum = Number(maxItemWidthArry[0]);
							  if(maxItemWidthNum<160){
								 maxItemWidth = '160px';
							 }
							 else{
								maxItemWidth = maxItemWidthNum+20+'px'
							 }
							 $('#'+e.target.id).jqxComboBox({dropDownWidth:maxItemWidth});*/
			      });		
				}
				else if (popupType == 'M'){
					$('#'+popupId).jqxComboBox({displayMember: "label", valueMember: "code", width: 160, height: 30,dropDownHeight: 120,disabled: false,checkboxes: true,searchMode: 'containsignorecase'});
					 	 $('#'+popupId).on('bindingComplete', function (e) {
							   maxItemWidth = $("#innerListBox" + e.owner.id + " div[role=option] span")[1].style["width"];
							  maxItemWidthArry = maxItemWidth.split('px');
							   maxItemWidthNum = Number(maxItemWidthArry[0]);
							  if(maxItemWidthNum<160){
								 maxItemWidth = '160px';
							 }
							 else{
								maxItemWidth = maxItemWidthNum+20+'px'
							 }
							 $('#'+e.target.id).jqxComboBox({dropDownWidth:maxItemWidth});
			      });		
				}
				else if(popupType == 'SS'){
						popupMinLen  = Number(that.popupProperty[index][j]['defaultValue'].trim());
						popupComboMinLength[popupId] = popupMinLen;
						if(popupDropdownId != '' && popupDropdownId != undefined){
						popupQueryId = popupDropdownId;
						popupComboItem[popupId] =  popupNameSpace +'.'+popupQueryId;
							 
							// paramMap[i] = splitArray[0]:; 
						}
						else{
							    popupQueryId = popupDropdownId;
							 //   paramMap[i] = ; 
						}
					that.popupComboQueryId[index] = popupComboItem;
					that.popupComboMinLength[index] = popupComboMinLength; 		    
						     $('#'+popupId).jqxComboBox({ displayMember: "label", valueMember: "code", width: 160, height: 30,dropDownHeight: 120,disabled: false,searchMode: 'containsignorecase',placeHolder: 'enter '+popupMinLen +' or more characters',minLength: popupMinLen,remoteAutoComplete: false});
	 	 $('#'+popupId).on('bindingComplete', function (e) {
			if ($('#'+e.target.id).jqxComboBox('isOpened' ) == false){
				return;
			}
							   maxItemWidth = $("#innerListBox" + e.owner.id + " div[role=option] span")[0].style["width"];
							  maxItemWidthArry = maxItemWidth.split('px');
							   maxItemWidthNum = Number(maxItemWidthArry[0]);
							  if(maxItemWidthNum<160){
								 maxItemWidth = '160px';
							 }
							 else{
								maxItemWidth = maxItemWidthNum+20+'px'
							 }
							 $('#'+e.target.id).jqxComboBox({dropDownWidth:maxItemWidth});
			      });	
			       $('#'+popupId).on('close', function (e) {
				     var tmpCd = e.target.children[1].value; 
				            if(tmpCd ==''){
								$('#'+e.target.id).jqxComboBox('clear');
								return;
							}
							
							 //$('#'+e.target.id).val(tmpCd);
			      });			
				}
				  
					  	 	
						    			        	 
						        
		}
			
			}
	
	

	},
		setCustomBoXSet: function(index, btnId) {
		var that =  momWidget;	
		var btnIndex = btnId.split('customBtn')[1];
        var searchId = '';
        var popupId = '';
        var searchType = '';
        var popupType = '';
        var paramMap   = [];
        var searchQueryId = '';
        var popupQueryId = '';
        var searchHeaderDropdownId = '';
        var searchHeaderType = '';
        var popupHeaderDropdownId = '';
        var popupHeaderType = '';
        var searchComboMinLength={};
        var searchComboItem = {};
        var popupComboMinLength={};
        var popupComboItem = {};
        var searchDropdownId  = '';
        var popupDropdownId  = '';
        var searchNameSpace  = '';
        var popupNameSpace  = '';
        var searchMinLen=1;
        var popupMinLen=1;
        var maxItemWidth = 0;
        var maxItemWidthArry = 0;
        var maxItemWidthNum = 0;
        var searchDropdownParam =[];
        var popupDropdownParam =[];
     
		
		if (that.customPopupProperty[btnId].length > 0){
		  for(var j=0,max2=that.customPopupProperty[index].length; j<max2;j++){			
				popupDropdownId       = that.customPopupProperty[index][j]['dropdownId'];
				popupDropdownParam   = that.customPopupProperty[index][j]['dropdownParam'] == '' ? []:that.popupProperty[index][j]['dropdownParam'];
			    popupType        = that.customPopupProperty[index][j]['popupType']; 
			    popupNameSpace   = popupDropdownId.substr(0, 2);  
			    queryId          = '';
			    paramMap.length  = 0;
			  //  minLength        = 1;
			    popupId = that.customPopupProperty[index][j]['popupId'] + 'DP' +btnIndex;
					if(popupType == 'S' ){    
						$('#'+popupId).jqxComboBox({displayMember: "label", valueMember: "code", width: 160, height: 30,dropDownHeight: 120,disabled: false,searchMode: 'none'});       		
					  	 $('#'+popupId).on('bindingComplete', function (e) {
							   maxItemWidth = $("#innerListBox" + e.owner.id + " div[role=option] span")[0].style["width"];
							   maxItemWidthArry = maxItemWidth.split('px');
							   maxItemWidthNum = Number(maxItemWidthArry[0]);
							  if(maxItemWidthNum<160){
								 maxItemWidth = '160px';
							 }
							 else{
								maxItemWidth = maxItemWidthNum+20+'px';
							 }
							 $('#'+e.target.id).jqxComboBox({dropDownWidth:maxItemWidth});
			      });		
			   /*    	$('#'+popupId).on('open', function (e) {
				    that.popupOpenYn = 'N';
				 });*/	
				    $('#'+popupId).on('close', function (e) {
				     var tmpCd = e.target.children[1].value; 
				           /* if(tmpCd ==''){
								$('#'+e.target.id).jqxComboBox('clear');
								return;
							}*/
							//that.popupOpenYn = 'N';
						

							
			      });	
			      	 $('#'+popupId).on('keyup', function (e) {
				        if(e.keyCode==13){	
					        let passCount = 0;				 	  
							that.popupPrevItem = $('#'+e.currentTarget.id).jqxComboBox('getItems');
						
	                     if(that.popupPrevItem.length !=0 && $('#'+e.currentTarget.id).val()!=''){
		             		for(var i=0,max1=that.popupPrevItem.length; i<max1;i++){
								if(that.popupPrevItem[i]['value'] == $('#'+e.currentTarget.id).val().trim()){
								passCount ++;	
							}
						    
					     } 
					     if(passCount>=1){
						     return;
						 }
							}							  
      					// let items = $('#'+searchId+'SP'+(index+1)).jqxComboBox('getItems');
      					   if($('#'+e.currentTarget.id).val() =='' ||that.searchComboItems[e.currentTarget.id] == undefined || that.searchComboItems[e.currentTarget.id] == ''){
							$('#'+e.currentTarget.id).jqxComboBox('source',that.searchComboItems[e.currentTarget.id]);	
			  		        $('#'+e.currentTarget.id).jqxComboBox('open');
			  		        //that.popupOpenYn = 'Y'; 
	          				return;
						} 
						//$('#'+e.currentTarget.id).val('');
						let searchStr = $('#'+e.currentTarget.id).val();
						//$('#'+e.currentTarget.id).jqxComboBox('clear');
      					let oldItems = that.searchComboItems[e.currentTarget.id];
      				/*	if(that.preComboItems[index][e.currentTarget.id]==undefined){
	 						that.preComboItems[index][e.currentTarget.id] = oldItems;
						}*/
      					    
      					let newItems = [];
              			for(var i=0,popupLen=oldItems.length; i<popupLen;i++){					
				 			if(oldItems[i]['label'].toUpperCase().indexOf($('#'+e.currentTarget.id).val().toUpperCase()) >=0){
								//$("#jqxComboBox").jqxComboBox('removeItem', "List Item" ); 
								 newItems.push(oldItems[i]);
								//$('#'+e.currentTarget.id).jqxComboBox('addItem', { label: oldItems[i]['label'], code: oldItems[i]['code']}); 
							}
							else{
								//$('#'+e.currentTarget.id).jqxComboBox('removeItem', oldItems[i]['code']);
							}

			  		   }
			  		      
	               			//$('#'+e.currentTarget.id).val(searchStr);
    					
			  		  
			  		   if(newItems.length ==0 ){
				 		   
			  		       $('#'+e.currentTarget.id).jqxComboBox('source',oldItems);	
			  		       $('#'+e.currentTarget.id).jqxComboBox('open');
			  		  
						}
						else{
							
			  		    	$('#'+e.currentTarget.id).jqxComboBox('source',newItems);	
			  		    	$('#'+e.currentTarget.id).jqxComboBox('open');
			  		    	
			  		    	 $('#'+e.currentTarget.id).val(searchStr);
						}
    				
					 
			  		    
     					
						}
				    	
			      });
				
			      
			      
				}
				else if(popupType == 'DG' ){    
						$('#'+popupId).jqxComboBox({displayMember: "label", valueMember: "code", width: 160, height: 30,dropDownHeight: 120,disabled: false,searchMode: 'containsignorecase',placeHolder: 'press enter to open'});       		
					  	 $('#'+popupId).on('bindingComplete', function (e) {
							/*   maxItemWidth = $("#innerListBox" + e.owner.id + " div[role=option] span")[0].style["width"];
							  maxItemWidthArry = maxItemWidth.split('px');
							   maxItemWidthNum = Number(maxItemWidthArry[0]);
							  if(maxItemWidthNum<160){
								 maxItemWidth = '160px';
							 }
							 else{
								maxItemWidth = maxItemWidthNum+20+'px'
							 }
							 $('#'+e.target.id).jqxComboBox({dropDownWidth:maxItemWidth});*/
			      });		
				}
				else if (popupType == 'M'){
					$('#'+popupId).jqxComboBox({displayMember: "label", valueMember: "code", width: 160, height: 30,dropDownHeight: 120,disabled: false,checkboxes: true,searchMode: 'containsignorecase'});
					 	 $('#'+popupId).on('bindingComplete', function (e) {
							   maxItemWidth = $("#innerListBox" + e.owner.id + " div[role=option] span")[1].style["width"];
							  maxItemWidthArry = maxItemWidth.split('px');
							   maxItemWidthNum = Number(maxItemWidthArry[0]);
							  if(maxItemWidthNum<160){
								 maxItemWidth = '160px';
							 }
							 else{
								maxItemWidth = maxItemWidthNum+20+'px'
							 }
							 $('#'+e.target.id).jqxComboBox({dropDownWidth:maxItemWidth});
			      });		
				}
				else if(popupType == 'SS'){
						popupMinLen  = Number(that.popupProperty[index][j]['defaultValue'].trim());
						popupComboMinLength[popupId] = popupMinLen;
						if(popupDropdownId != '' && popupDropdownId != undefined){
						popupQueryId = popupDropdownId;
						popupComboItem[popupId] =  popupNameSpace +'.'+popupQueryId;
							 
							// paramMap[i] = splitArray[0]:; 
						}
						else{
							    popupQueryId = popupDropdownId;
							 //   paramMap[i] = ; 
						}
					that.popupComboQueryId[index] = popupComboItem;
					that.popupComboMinLength[index] = popupComboMinLength; 		    
						     $('#'+popupId).jqxComboBox({ displayMember: "label", valueMember: "code", width: 160, height: 30,dropDownHeight: 120,disabled: false,searchMode: 'containsignorecase',placeHolder: 'enter '+popupMinLen +' or more characters',minLength: popupMinLen,remoteAutoComplete: false});
	 	 $('#'+popupId).on('bindingComplete', function (e) {
			if ($('#'+e.target.id).jqxComboBox('isOpened' ) == false){
				return;
			}
							   maxItemWidth = $("#innerListBox" + e.owner.id + " div[role=option] span")[0].style["width"];
							  maxItemWidthArry = maxItemWidth.split('px');
							   maxItemWidthNum = Number(maxItemWidthArry[0]);
							  if(maxItemWidthNum<160){
								 maxItemWidth = '160px';
							 }
							 else{
								maxItemWidth = maxItemWidthNum+20+'px'
							 }
							 $('#'+e.target.id).jqxComboBox({dropDownWidth:maxItemWidth});
			      });	
			       $('#'+popupId).on('close', function (e) {
				     var tmpCd = e.target.children[1].value; 
				            if(tmpCd ==''){
								$('#'+e.target.id).jqxComboBox('clear');
								return;
							}
							
							 //$('#'+e.target.id).val(tmpCd);
			      });			
				}
				  
					  	 	
						    			        	 
						        
		}
			
			}
	
	

	},
		controlPaging : function(result,data,index,e) {
			    var that = momWidget;

				 $('.aui-grid-paging-number.aui-grid-paging-number-selected').removeClass('aui-grid-paging-number-selected');
				 $('#click').addClass('aui-grid-paging-number-selected');
				 var startPage= 1;
				 var endPage = 1; 
				 var nextPagingNum =1;
				 var prevNum = 1;
				 var infoHtml = '';
				 var endPageNum = Math.ceil(that.totalRowCount[index]/ that.gridProperty[index][0]['pageRowCount']); //마지막 페이징번호
				 var endPageRow = Math.ceil(endPageNum/10)*10;
				 startPage = data[0]['id'];
				 endPage = data[data.length-1]['id'];	
		
				if(e.target.classList.contains('aui-grid-paging-first')){
					 nextPagingNum = 1;
					 	 infoHtml = '<span class="aui-grid-paging-info-text" style="position: absolute;"></span>';
					 $('#grid'+(index+1)).find('.aui-grid-paging-panel').prepend(infoHtml);
				}
				else if(e.target.classList.contains('aui-grid-paging-last')){
					 nextPagingNum = endPageRow-9;  //다음에 선택될버튼
					 infoHtml = '<span class="aui-grid-paging-info-text" style="position: absolute;"></span>';
					 $('.aui-grid-paging-panel').prepend(infoHtml);
					 	 infoHtml = '<span class="aui-grid-paging-info-text" style="position: absolute;"></span>';
					 $('#grid'+(index+1)).find('.aui-grid-paging-panel').prepend(infoHtml);
				}
				else if(e.target.classList.contains('aui-grid-paging-prev')){
					 prevNum = Number($('.aui-grid-paging-panel').find('#click')[0].innerText);
					 nextPagingNum = Math.floor(prevNum/10)*10+1-10+10;  //다음에 선택될버튼
					 infoHtml = '<span class="aui-grid-paging-info-text" style="position: absolute;"></span>';
					 $('#grid'+(index+1)).find('.aui-grid-paging-panel').prepend(infoHtml);
				}
				else if(e.target.classList.contains('aui-grid-paging-next')){
					 prevNum = Number($('.aui-grid-paging-panel').find('#click')[0].innerText);
					 nextPagingNum = Math.ceil(prevNum/10)*10+1-10;  //다음에 선택될버튼
					 infoHtml = '<span class="aui-grid-paging-info-text" style="position: absolute;"></span>';
					 $('#grid'+(index+1)).find('.aui-grid-paging-panel').prepend(infoHtml);
				}
				else{
					  nextPagingNum = Number(e.target.innerHTML);  //다음에 선택될버튼
				}
				 
				 var nextCount = (nextPagingNum*that.gridProperty[index][0]['pageRowCount'])-that.gridProperty[index][0]['pageRowCount'] +1;				 
				 var pagingRow = Math.ceil(nextPagingNum/10);
				
			     AUIGrid.setGridData(that.grid[index], data); 
			    
					
					    if(that.sortingInfo[index]!= undefined && that.sortingInfo[index].length >0 ){
								AUIGrid.setSorting(that.grid[index], that.sortingInfo[index]);	
						} 
				for(var i=0,max1=data.length;i<max1;i++){
					//AUIGrid.setCellValue(that.grid[index], 0, "seq", i+1);		
					AUIGrid.updateRow(that.grid[index], {id:startPage+i}, i,false);			
				}
				
				$('#grid'+(index+1)).find('.aui-grid-paging-info-text')[0].innerText  = "현재페이징 : " + nextPagingNum + " / 전체페이징 : " + endPageNum + "( " + nextCount + "~" + that.totalRowCount[index] + " 개 )";		
			       // AUIGrid.updateRowsById(that.grid[index], data,false);
			      //AUIGrid.setSorting(that.grid[index], that.sortingInfo[index]);	
			     // AUIGrid.refreshRows(that.grid[index], data, "my-flash-style", 200); 
	                  	
											
								
    				
   			
			},
	wait: function(sec) {
	    let start = Date.now(), now = start;
	    while (now - start < sec * 1000) {
	        now = Date.now();
	    }
	},
	// 등록버튼 이벤트 핸들러
	setBtnEvent: function(index, your) {
			var that = momWidget;
			for(let i=0,max=that.buttonProperty[index].length; i<max;i++){ //커스텀 버튼 이벤트 핸들러 추가
				
				if(that.buttonProperty[index].length==0){
					break;
				}
				if(that.buttonProperty[index][i]['buttonType']=='DG'){				   	
				   	 $(document).on('click', '#' + that.buttonProperty[index][i]['buttonId'], function(e) {		//커스텀 그리드랍업			     
					     that.setCustomGridPopBtn(index,e.currentTarget.id.split('customBtn')[1],e.currentTarget.id,your,e);				
			         });	
					
				}
				else if(that.buttonProperty[index][i]['buttonType']=='CP'){
					 $(document).on('click', '#' + that.buttonProperty[index][i]['buttonId'], function(e) {	 //커스텀 랍업				     
					     that.setCustomPopBtn(index,e.target.id.split('customBtn')[1],e.target.id,your,e);				
			         });	
					
				}
				else if( that.buttonProperty[index][i]['buttonType']=='ST' || that.buttonProperty[index][i]['buttonType']=='EX'){
					 $(document).on('click', '#' + that.buttonProperty[index][i]['buttonId'], function(e) {	//커스텀 버튼(팝업없이 ACTION만실행)					     
					     that.setCustomBtn(index,e.currentTarget.id.split('customBtn')[1],e.currentTarget.id,your,e);				
			         });	
					
				}
			}
			var findBtnId        = 'findBtn'+(index + 1);			
			var createBtnId      = 'createBtn'+(index + 1);	
			var createBtnIdV     = 'createBtnV'+(index + 1);	
			var copyBtnId        = 'copyBtn'+(index + 1);
			var copyBtnIdV       = 'copyBtnV'+(index + 1);
			var editBtnId        = 'editBtn'+(index + 1);	
			var editBtnIdV       = 'editBtnV'+(index + 1);	
			var cancelBtnId      = 'cancelBtn'+'DP'+(index + 1);	
			var cancelCustomPopBtnId  = 'cancelCustomPopBtn'+'DP'+(index + 1);	
			var saveCustomPopBtnId  = 'saveCustomPopBtn'+'DP'+(index + 1);
			var dropDownGridCancelBtnId  = 'cancelBtn'+'DG'+(index + 1);	
			var excelDownBtnId   = 'excelDownBtn'+(index + 1);
			var excelTmpBtnId    = 'excelTmpBtn'+(index + 1);
			var excelUpBtnId     = 'excelUpBtn'+(index + 1);
			var excelUpBtnIdV    = 'excelUpBtnV'+(index + 1);
			var excelUpCancelBtnId = 'cancelBtnExUp'+(index + 1);
			var saveBtnId        = 'saveBtn'+(index + 1);
			var saveBtnIdV       = 'saveBtnV'+(index + 1);
			let procBtnId        = 'procBtn'+(index + 1);
			var savePopBtnId     = 'saveBtn'+'DP'+(index + 1);
			var dropdownGridId   = 'saveBtn'+'DG'+(index + 1);
			var delBtnId         = 'delBtn'+(index + 1);
			let delGridBtnId     = 'delGridBtn'+(index + 1);;
			var addBtnId         = 'addBtn'+(index + 1);
			var showLv1Btn       = 'showLv1Btn'+(index + 1);  
			var excelFile          = 'excelFile'+(index + 1);  
			var isExpanded         = true;
			var saveExUpBtnId      = 'saveBtnExUp'+(index + 1);
			var exUpCheckBtnId     = 'exUpCheck'+(index + 1);
			var exUpCheckDownBtnId = 'exUpCheckDown'+(index + 1);
			var reportBtnId        = 'reportBtn'+(index + 1);
			var changePwBtnId      = 'changePwBtn'+(index + 1);
			var changePwSaveBtn    = 'saveBtnCp'+(index + 1); 
			var changePwCencelBtn  = 'closeBtnCp'+(index + 1);
			var callInitResult     = undefined;
			var callBackResult     = undefined;
			var pagingNumBtnClass  ='aui-grid-paging-number';
			var paginFirstBtnClass = 'aui-grid-paging-first';
			var paginLastBtnClass  = 'aui-grid-paging-last';
			var paginPrevBtnClass  = 'aui-grid-paging-prev';
			var paginNextBtnClass  = 'aui-grid-paging-next';
			let calendarPopSaveBtnId = 'saveBtnDT'+(index + 1);
			let calendarPopCloseBtnId = 'closeBtnDT'+(index + 1);
			let gridPopSaveBtnId   = 'saveBtnCP';
			let gridPopCancelBtnId = 'cancelBtnCP'+(index + 1);
			let moveBtnId = 'moveBtn'+(index + 1);
			let gridPopXBtnId = 'gridPop-x-btn';
			
		/*	var isExist = document.getElementById(findBtnId);
			if(isExist == undefined || that.pageProperty[index]['programId'] == undefined || that.pageProperty[index]['programId'] == '') {
				return;excelUpCancelBtnId
			}*/
		
			$(document).on('click', '#'+moveBtnId  , function(e) {				
				 let fromIndex = index; //복사할 인덱스
				 let toIndex = fromIndex+1; //이동할 인덱스
				 let param = {fromIndex:fromIndex,toIndex:toIndex};
				 let isCheckCol = that.gridProperty[fromIndex ][0]['showRowCheckColumn']; //체크 여부
			     let fromItem	= {};	
			     let callInitResult = that.checkActionCallInit(fromIndex, 'GM', param, 'moveBtn', your,e);
				 if(callInitResult['result'] != 'SUCCESS') {
				          let msgType = callInitResult['result'] == 'WARN' ? 'warning': 'danger';
						  momWidget.messageBox({type:msgType, width:'400', height: '145', html: multiLang.transText('MESSAGE',callInitResult['msg'])});
						  momWidget.splashHide();
					      return;
			    }
			
			    param = Object.assign(param, callInitResult['param']);  
			    fromIndex = param.fromIndex;
			    toIndex = param.toIndex;
			    isCheckCol = that.gridProperty[fromIndex][0]['showRowCheckColumn'];;
				if(isCheckCol == true){
					 fromItem = that.getCheckedRowItems(that.grid[fromIndex]);
					 if(fromItem.length == 0){
						fromItem = {};
					     momWidget.messageBox({type:'warning', width:'400', height: '145', html: multiLang.transText('MESSAGE','MSG00034')});
						 momWidget.splashHide();
						 return;
				    }
				    else{
					fromItem = fromItem;
				    }
										
				}
				else{
				     fromItem = AUIGrid.getSelectedItems(that.grid[fromIndex])[0];
				    if(fromItem == undefined){
					     fromItem = {};
					    /* momWidget.messageBox({type:'warning', width:'400', height: '145', html: multiLang.transText('MESSAGE','MSG00052')});
						 momWidget.splashHide();
						 return;*/
				    }
				    else{
					fromItem = fromItem['item'];
					}
				}

				AUIGrid.addRow(that.grid[toIndex], fromItem, "last");
				
			});	
			$(document).on('click', '#'+cancelCustomPopBtnId , function(e) {
				$('.' + 'customPop').momModal('hide');	
			
			});
			$(document).on('click', '.'+gridPopXBtnId , function(e) {
				$(".grid-pop"+(index+1)).momModal('hide');	
			});
			$(document).on('click', '#'+gridPopCancelBtnId , function(e) {
				$(".grid-pop"+(index+1)).momModal('hide');	
			});
			$(document).on('click', '#'+gridPopSaveBtnId + (index + 1) , function(e) {
				that.wait(0.5);
				let customPopId = e.target.parentElement.parentElement.parentElement.id; //커스텀 팝업 id
				let buttonId    = customPopId.split('customBtn')[1]; //커스텀 버튼 id
				let gridIndex   = Number($('#'+customPopId).attr('gridindex'))-1;			
				let isCheckCol  = that.gridProperty[gridIndex][0]['showRowCheckColumn'];
				let param = [];
				let callInitResult = [];
				let actionType = 'C';
				let tmpYn = 'N';
				let queryId = that.pageProperty[index]['programId'] + '.customBtn'+buttonId+'-'+(gridIndex+1);
			   	if(isCheckCol == true){
					    param = that.getCheckedRowItems(that.grid[gridIndex]);
					if (param.length == 0){												
						 momWidget.messageBox({type:'danger', width:'400', height: '145', html: multiLang.transText('MESSAGE','MSG00034')});				   
				         return;
					}				
									
				}
				else{					
					   checkedItems = AUIGrid.getGridData(that.grid[gridIndex]);
					   for(var i=0,max=checkedItems.length;i<max;i++){	
						  param.push(checkedItems[i]); 														
				        }
				}
				
				callInitResult = that.checkActionCallInit(gridIndex, actionType, param, 'saveBtnCP', your,e);
				if(callInitResult['result'] != 'SUCCESS') {
							  momWidget.messageBox({type:'danger', width:'400', height: '145', html: callInitResult['msg']});
							  momWidget.splashHide();
						      return;
			    }
			   
			     
				 param = callInitResult['param'];
				
				 for(var i=0;i<that.buttonProperty[index].length;i++){
					if(that.buttonProperty[index][i]['buttonId'] == 'customBtn'+buttonId){
						actionType = that.buttonProperty[index][i]['eventType'];
						tmpYn = that.buttonProperty[index][i]['tempUseYn'];					
						break;
					}
			
				 }	 
				 if(tmpYn =='Y'){
						 mom_ajax('D', queryId,[], function(result1, data1) {
						 if(result1!='SUCCESS') {
			            	  momWidget.messageBox({type:'danger', width:'400', height: '145', html: multiLang.transText('MESSAGE','MSG00047')});
							  momWidget.splashHide();
				              return;
			            }    	
						  mom_ajax('C', queryId,param, function(result2, data2) {
							 if(result2!='SUCCESS') {
			            	  momWidget.messageBox({type:'danger', width:'400', height: '145', html: multiLang.transText('MESSAGE','MSG00048')});
							  momWidget.splashHide();
				              return;
			            }   
							 mom_ajax('P', queryId,[], function(result3, data3) {
			            	     if(data3[0]['p_err_code']=='E') {
						         momWidget.messageBox({type:'danger', width:'400', height: '145', html: multiLang.transText('MESSAGE',data3[0]['p_err_msg'])});
			            	  //momWidget.messageBox({type:'danger', width:'400', height: '145', html: multiLang.transText('MESSAGE','MSG00049')});
							  momWidget.splashHide();
				              return;
			            } 
			                callBackResult = that.checkActionCallBack(index, actionType, {}, buttonId, your);   				                         							  						
				        	if(callBackResult['result'] != 'SUCCESS') {
								  momWidget.messageBox({type:'danger', width:'400', height: '145', html: callBackResult['msg']});
								  momWidget.splashHide();
							      return;
							}
						if(your.initParam != undefined && your.initParam != ''){
				              initParam = your.initParam;
			             }
			        	  momWidget.findBtnClicked(btnIndex, initParam, false, 'findBtn',momWidget.pageProperty[btnIndex]['menuId'],your);
			        	 // $('#' +'defaultPop'+(index+1)).momModal('hide');
			        	  momWidget.messageBox({type:'success', width:'400', height: '145', html: multiLang.transText('MESSAGE','MSG00001')});
						  momWidget.splashHide();
					      return;
		          }, undefined, index, this, false,undefined,actionType);
							
							
							 }, undefined, index, this, false,undefined,'C');
				   }, undefined, index, this, false,undefined,'D');
				 }
				 else{
					  mom_ajax(actionType, queryId,param, function(result, data) {
			            if(data[0]['p_err_code']=='E') {
			            	  momWidget.messageBox({type:'danger', width:'400', height: '145', html: multiLang.transText('MESSAGE',data[0]['p_err_msg'])});
							  momWidget.splashHide();
				              return;
			            }    				                         							  						
			        	callBackResult = that.checkActionCallBack(gridIndex, actionType, param, 'saveBtnCP', your);
						if(callBackResult['result'] != 'SUCCESS') {
							  momWidget.messageBox({type:'danger', width:'400', height: '145', html: callInitResult['msg']});
							  momWidget.splashHide();
						      return;
			    		}
			
						 
			        	  momWidget.findBtnClicked(index, {}, true, 'saveBtnCP',momWidget.pageProperty[index]['programId'],your);
			        	  
			        	  momWidget.messageBox({type:'success', width:'400', height: '145', html: multiLang.transText('MESSAGE','MSG00001')});
						  momWidget.splashHide();
					      return;
		          }, undefined, undefined, this, false);
				}
				
				
				//$('.' + 'grid-pop').momModal('hide');	
			});
 			$(document).on('click', '#' + calendarPopSaveBtnId, function(e) {
	        let nowTime = $( "#time-main" ).val().replace('T',' ');
	        
			$('#calendar-pop').css('display','none');
			let rowIndex= Number($('#calendar-pop').attr('rowIndex'));
			let columnIndex = Number($('#calendar-pop').attr('columnIndex'));
			let dataField = AUIGrid.getColumnLayout(that.grid[index])[columnIndex]['dataField'];
			let item = AUIGrid.getGridData(that.grid[index])[rowIndex];
			AUIGrid.setCellValue(that.grid[index],rowIndex, columnIndex, nowTime);
			if (your != undefined && your.calendarGridSaveCallBack != undefined) {
				  your.calendarGridSaveCallBack(index,rowIndex,columnIndex,dataField,item,nowTime,e);
			}
			});
			$(document).on('click', '#' + calendarPopCloseBtnId, function(e) {	
			$('#calendar-pop').css('display','none');
			});
			 $(document).on('click', '.' + paginFirstBtnClass, function(e) {
				if(e.target.closest('#grid'+(index+1))==null){
					 return;
				}
				if(e.target.parentElement.parentElement.parentElement.classList.contains('excel-up-grid')){
					return;
				}
			 var pagingBtnHtml = '';
				 var leftHtml = '';
				 var rightHtml = '';
				// var prevNum = Number($('.aui-grid-paging-panel').find('#click')[0].innerText); //이전에 누른버튼
				 var prevNum = Number($('#grid'+(index+1)).find('.aui-grid-paging-panel').find('#click')[0].innerText);
				 var nextPagingNum =  1; //다음에 선택될버튼
				 var endPageNum = Math.ceil(that.totalRowCount[index]/ that.gridProperty[index][0]['pageRowCount']); //마지막 페이징번호
				 var pagingRow = Math.ceil(nextPagingNum/10);
				 var endPageRow = Math.ceil(endPageNum/10)*10;
				 var nextIcon = '>';
				 var lastIcon = '>>';
				 var fisrtIcon = '<<';
				 var prevIcon = '<';
				 var targetSeq = 1;
				 $('#grid'+(index+1)).find('.aui-grid-paging-panel').empty(); //페이징버튼  전부삭제
				 	  for(var i=nextPagingNum,max1=10*pagingRow; i<=max1;i++){
					   pagingBtnHtml += '<span class ="aui-grid-paging-number">'+i+'</span>';	
						if(i==endPageNum){
								break;
						}
								
			  	 }  

					    rightHtml += '<span class ="aui-grid-paging-number aui-grid-paging-next">'+nextIcon+'</span>';	
					    rightHtml += '<span class ="aui-grid-paging-number aui-grid-paging-last">'+lastIcon+'</span>';
					      
					    $('#grid'+(index+1)).find('.aui-grid-paging-panel').append(pagingBtnHtml);	
					    $('#grid'+(index+1)).find('.aui-grid-paging-panel').append(rightHtml);
					    $('#grid'+(index+1)).find('.aui-grid-paging-panel')[0].childNodes[0].setAttribute('id','click');
					 
					

			
				
					
					 // $('.aui-grid-paging-panel').find('#click')[0].setAttribute('id','');
					 
				   
				   var nowPagingBtn = e.target.classList.contains('aui-grid-paging-next'); 					
					if(nowPagingBtn == undefined) {
						return;
					}
			
					var maxPagingNum =  that.gridProperty[index][0]['pageRowCount'];
					var nowStartPage = 1;
					var nowEndPage = nextPagingNum*maxPagingNum ;	  
  				    that.findBtnClicked(index, {startPage:nowStartPage,endPage:nowEndPage}, true, 'PAGING',that.pageProperty[index]['programId'],your,that.controlPaging,e);
				
		
		    });
		     $(document).on('click', '.' + paginLastBtnClass, function(e) {
			if(e.target.closest('#grid'+(index+1))==null){
					 return;
				}
				if(e.target.parentElement.parentElement.parentElement.classList.contains('excel-up-grid')){
					return;
				}
			   	// e.stopPropagation(); 
				 var pagingBtnHtml = '';
				 var leftHtml = '';
				 var rightHtml = '';
				 //var prevNum = Number($('.aui-grid-paging-panel').find('#click')[0].innerText); //이전에 누른버튼
				 var prevNum = Number($('#grid'+(index+1)).find('.aui-grid-paging-panel').find('#click')[0].innerText);
				 var endPageNum = Math.ceil(that.totalRowCount[index]/ that.gridProperty[index][0]['pageRowCount']); //마지막 페이징번호
				 var endPageRow = Math.ceil(endPageNum/10)*10;
				 var nextPagingNum = endPageRow-9; //다음에 선택될버튼
				// var endPageNum = Math.ceil(that.totalRowCount[index]/ that.gridProperty[index][0]['pageRowCount']) -  Math.ceil(prevNum/10)*10; //마지막 페이징번호
			
				 var pagingRow = Math.ceil(nextPagingNum/10);
				
				 var nextIcon = '>';
				 var lastIcon = '>>';
				 var fisrtIcon = '<<';
				 var prevIcon = '<';
				 var targetSeq = 1;
				 $('#grid'+(index+1)).find('.aui-grid-paging-panel').empty(); //페이징버튼  전부삭제
				 	  for(var i=nextPagingNum,max1=10*pagingRow; i<=max1;i++){
					pagingBtnHtml += '<span class ="aui-grid-paging-number">'+i+'</span>';	
						if(i==endPageNum){
								break;
									}
								
				}
				/* if(nextPagingNum<=10){
					    rightHtml += '<span class ="aui-grid-paging-number aui-grid-paging-next">'+nextIcon+'</span>';	
					    pagingBtnHtml += '<span class ="aui-grid-paging-number aui-grid-paging-last">'+lastIcon+'</span>';
					    $('.aui-grid-paging-panel').append(pagingBtnHtml);	
				 }*/

					    
					    leftHtml += '<span class ="aui-grid-paging-number aui-grid-paging-first">'+fisrtIcon+'</span>';	
					     leftHtml += '<span class ="aui-grid-paging-number aui-grid-paging-prev">'+prevIcon+'</span>';
					    $('#grid'+(index+1)).find('.aui-grid-paging-panel').append(leftHtml);
					    $('#grid'+(index+1)).find('.aui-grid-paging-panel').append(pagingBtnHtml);	
					    $('.aui-grid-paging-panel')[0].childNodes[2].setAttribute('id','click');
					
			
			
				
					
					 // $('.aui-grid-paging-panel').find('#click')[0].setAttribute('id','');
					 
				   
				   var nowPagingBtn = e.target.classList.contains('aui-grid-paging-next'); 					
					if(nowPagingBtn == undefined) {
						return;
					}
			
					var maxPagingNum =  that.gridProperty[index][0]['pageRowCount'];
					var nowStartPage = ((nextPagingNum*maxPagingNum)-maxPagingNum) + 1;
					var nowEndPage = nextPagingNum*maxPagingNum ;	  
  				    that.findBtnClicked(index, {startPage:nowStartPage,endPage:nowEndPage}, true, 'PAGING',that.pageProperty[index]['programId'],your,that.controlPaging,e);
				
		
		    });
			 $(document).on('click', '.' + paginPrevBtnClass, function(e) {
				if(e.target.closest('#grid'+(index+1))==null){
					 return;
				}
				if(e.target.parentElement.parentElement.parentElement.classList.contains('excel-up-grid')){
					return;
				}
					// e.stopPropagation(); 
				 var pagingBtnHtml = '';
				 var leftHtml = '';
				 var rightHtml = '';
				 //var prevNum = Number($('.aui-grid-paging-panel').find('#click')[0].innerText); //이전에 누른버튼
				 var prevNum = Number($('#grid'+(index+1)).find('.aui-grid-paging-panel').find('#click')[0].innerText);
				 var nextPagingNum =  Math.floor(prevNum/10)*10+1-10; //다음에 선택될버튼
				 var endPageNum = Math.ceil(that.totalRowCount[index]/ that.gridProperty[index][0]['pageRowCount']); //마지막 페이징번호
				 var pagingRow = Math.ceil(nextPagingNum/10);
				 var endPageRow = Math.ceil(endPageNum/10)*10;
				 var nextIcon = '>';
				 var lastIcon = '>>';
				 var fisrtIcon = '<<';
				 var prevIcon = '<';
				 var targetSeq = 1;
				 $('#grid'+(index+1)).find('.aui-grid-paging-panel').empty(); //페이징버튼  전부삭제
				 	  for(var i=nextPagingNum,max1=10*pagingRow; i<=max1;i++){
					pagingBtnHtml += '<span class ="aui-grid-paging-number">'+i+'</span>';	
						if(i==endPageNum){
								break;
						}
								
				}  
				/* if(nextPagingNum<=10){
					    rightHtml += '<span class ="aui-grid-paging-number aui-grid-paging-next">'+nextIcon+'</span>';	
					    pagingBtnHtml += '<span class ="aui-grid-paging-number aui-grid-paging-last">'+lastIcon+'</span>';
					    $('.aui-grid-paging-panel').append(pagingBtnHtml);	
				 }*/
				 if( nextPagingNum<=10){
					    
					    rightHtml += '<span class ="aui-grid-paging-number aui-grid-paging-next">'+nextIcon+'</span>';	
					    rightHtml += '<span class ="aui-grid-paging-number aui-grid-paging-last">'+lastIcon+'</span>';
					      
					    $('#grid'+(index+1)).find('.aui-grid-paging-panel').append(pagingBtnHtml);	
					    $('#grid'+(index+1)).find('.aui-grid-paging-panel').append(rightHtml);
					    $('.aui-grid-paging-panel')[0].childNodes[0].setAttribute('id','click');
					
				 }
				 else{
					     leftHtml += '<span class ="aui-grid-paging-number aui-grid-paging-first">'+fisrtIcon+'</span>';	
					     leftHtml += '<span class ="aui-grid-paging-number aui-grid-paging-prev">'+prevIcon+'</span>';
					     rightHtml += '<span class ="aui-grid-paging-number aui-grid-paging-next">'+nextIcon+'</span>';	
					     rightHtml += '<span class ="aui-grid-paging-number aui-grid-paging-last">'+lastIcon+'</span>';
					    $('#grid'+(index+1)).find('.aui-grid-paging-panel').append(leftHtml);	
					    $('#grid'+(index+1)).find('.aui-grid-paging-panel').append(pagingBtnHtml);	
					    $('#grid'+(index+1)).find('.aui-grid-paging-panel').append(rightHtml);
					    $('.aui-grid-paging-panel')[0].childNodes[2].setAttribute('id','click');
				  }
			
				
					
					 // $('.aui-grid-paging-panel').find('#click')[0].setAttribute('id','');
					 
				   
				   var nowPagingBtn = e.target.classList.contains('aui-grid-paging-next'); 					
					if(nowPagingBtn == undefined) {
						return;
					}
			
					var maxPagingNum =  that.gridProperty[index][0]['pageRowCount'];
					var nowStartPage = ((nextPagingNum*maxPagingNum)-maxPagingNum) + 1;
					var nowEndPage = nextPagingNum*maxPagingNum ;	  
  				    that.findBtnClicked(index, {startPage:nowStartPage,endPage:nowEndPage}, true, 'PAGING',that.pageProperty[index]['programId'],your,that.controlPaging,e);
				
		
		    });
			 $(document).on('click', '.' + paginNextBtnClass, function(e) {
				if(e.target.closest('#grid'+(index+1))==null){
					 return;
				}
				if(e.target.parentElement.parentElement.parentElement.classList.contains('excel-up-grid')){
					return;
				}
				// e.stopPropagation(); 
				 var pagingBtnHtml = '';
				 var leftHtml = '';
				 var rightHtml = '';
				 
				 var prevNum = Number($('#grid'+(index+1)).find('.aui-grid-paging-panel').find('#click')[0].innerText); //이전에 누른버튼
				 var nextPagingNum =  Math.ceil(prevNum/10)*10+1; //다음에 선택될버튼
				// var endPageNum = Math.ceil(that.totalRowCount[index]/ that.gridProperty[index][0]['pageRowCount']) -  Math.ceil(prevNum/10)*10; //마지막 페이징번호
				 var endPageNum = Math.ceil(that.totalRowCount[index]/ that.gridProperty[index][0]['pageRowCount']); //마지막 페이징번호
				 var pagingRow = Math.ceil(nextPagingNum/10);
				 var endPageRow = Math.ceil(endPageNum/10)*10;
				 var nextIcon = '>';
				 var lastIcon = '>>';
				 var fisrtIcon = '<<';
				 var prevIcon = '<';
				 var targetSeq = 1;
				 $('#grid'+(index+1)).find('.aui-grid-paging-panel').empty(); //페이징버튼  전부삭제
				 	  for(var i=nextPagingNum,max1=10*pagingRow; i<=max1;i++){
					pagingBtnHtml += '<span class ="aui-grid-paging-number">'+i+'</span>';	
						if(i==endPageNum){
								break;
									}
								
				}
				/* if(nextPagingNum<=10){
					    rightHtml += '<span class ="aui-grid-paging-number aui-grid-paging-next">'+nextIcon+'</span>';	
					    pagingBtnHtml += '<span class ="aui-grid-paging-number aui-grid-paging-last">'+lastIcon+'</span>';
					    $('.aui-grid-paging-panel').append(pagingBtnHtml);	
				 }*/
				 if((endPageRow-10)<nextPagingNum && nextPagingNum<=endPageRow){
					    
					    leftHtml += '<span class ="aui-grid-paging-number aui-grid-paging-first">'+fisrtIcon+'</span>';	
					     leftHtml += '<span class ="aui-grid-paging-number aui-grid-paging-prev">'+prevIcon+'</span>';
		
					    $('#grid'+(index+1)).find('.aui-grid-paging-panel').append(leftHtml);
					    $('#grid'+(index+1)).find('.aui-grid-paging-panel').append(pagingBtnHtml);	
					    $('.aui-grid-paging-panel')[0].childNodes[2].setAttribute('id','click');
					
				 }
				 else{
					     leftHtml += '<span class ="aui-grid-paging-number aui-grid-paging-first">'+fisrtIcon+'</span>';	
					     leftHtml += '<span class ="aui-grid-paging-number aui-grid-paging-prev">'+prevIcon+'</span>';
					     rightHtml += '<span class ="aui-grid-paging-number aui-grid-paging-next">'+nextIcon+'</span>';	
					     rightHtml += '<span class ="aui-grid-paging-number aui-grid-paging-last">'+lastIcon+'</span>';
					    $('#grid'+(index+1)).find('.aui-grid-paging-panel').append(leftHtml);	
					    $('#grid'+(index+1)).find('.aui-grid-paging-panel').append(pagingBtnHtml);	
					    $('#grid'+(index+1)).find('.aui-grid-paging-panel').append(rightHtml);
					   $('#grid'+(index+1)).find('.aui-grid-paging-panel')[0].childNodes[2].setAttribute('id','click');
				  }
			
				
					
					 // $('.aui-grid-paging-panel').find('#click')[0].setAttribute('id','');
					 
				   
				   var nowPagingBtn = e.target.classList.contains('aui-grid-paging-next'); 					
					if(nowPagingBtn == undefined) {
						return;
					}
			
					var maxPagingNum =  that.gridProperty[index][0]['pageRowCount'];
					var nowStartPage = ((nextPagingNum*maxPagingNum)-maxPagingNum) + 1;
					var nowEndPage = nextPagingNum*maxPagingNum ;	  
						
  				    that.findBtnClicked(index, {startPage:nowStartPage,endPage:nowEndPage}, true, 'PAGING',that.pageProperty[index]['programId'],your,that.controlPaging,e);
					//$('.aui-grid-paging-info-text')[0].innerText  = "현재페이징 : " + nextPagingNum + " / 전체페이징 : " + endPageNum + "( " + '1' + "~" + that.totalRowCount[index] + " 개 )";
						
		    });
			 $(document).on('click', '.' + pagingNumBtnClass, function(e) {
				//e.stopPropagation();
			
				if(e.target.closest('#grid'+(index+1))==null){
					 return;
				}
				if(e.target.parentElement == null || e.target.parentElement == undefined){
					return;
				}
				if(e.target.parentElement.parentElement.parentElement.classList.contains('excel-up-grid')){
					return;
				}
				if($('.aui-grid-paging-panel').find('#click')[0]==undefined){
					return;
				}
				if(e.target.classList.contains('aui-grid-paging-first')){
					return;
				}
				if(e.target.classList.contains('aui-grid-paging-last')){
					return;
				}
				if(e.target.classList.contains('aui-grid-paging-prev')){
					return;
				}
				if(e.target.classList.contains('aui-grid-paging-next')){
					return;
				}
				 $('.aui-grid-paging-panel').find('#click')[0].setAttribute('id','');
				    e.target.setAttribute('id','click');
				    //var prevNum = Number($('#grid'+(index+1)).find('.aui-grid-paging-panel').find('#click')[0].innerText);
					var nowPagingNum = Number(e.target.innerHTML); 
					if(isNaN(nowPagingNum) == true){
						return;
					}
					var maxPagingNum =  that.gridProperty[index][0]['pageRowCount'];
					var nowStartPage = ((nowPagingNum*maxPagingNum)-maxPagingNum) + 1 ;
					var nowEndPage = nowPagingNum*maxPagingNum;	 
					var endPageNum = Math.ceil(that.totalRowCount[index]/ that.gridProperty[index][0]['pageRowCount']); //마지막 페이징번호 
					
  				 that.findBtnClicked(index, {startPage:nowStartPage,endPage:nowEndPage}, true, 'PAGING',that.pageProperty[index]['programId'],your,that.controlPaging,e);
  				 
		//$('.aui-grid-paging-info-text')[0].innerText  = "현재페이징 : " + nowPagingNum + " / 전체페이징 : " + endPageNum + "( " + '1' + "~" + that.totalRowCount[index] + " 개 )";
		    });
		    
		  $(document).on('click', '#' + findBtnId, function(e) {  
			 if(that.gridProperty[index][0]['usePaging'] == true){ //페이징사용		
			     that.findBtnClicked(index, {startPage:1,endPage:1}, true, 'TOTAL',that.pageProperty[index]['programId'],your);
		    	 that.findBtnClicked(index, {startPage:1,endPage:that.gridProperty[index][0]['pageRowCount']}, true, 'INIT_PAGING',that.pageProperty[index]['programId'],your);
		    }	
		    else{
			  //momWidget.findBtnClicked(1, {}, true, 'CELLCLICK',menuId,VIEW);
			  that.findBtnClicked(index, {}, true, 'findBtn',that.pageProperty[index]['menuId'],your);
		    }	    	
			
			// e.preventDefault();
		});
			$(document).on('click','.grid-popup'+'.gridPop'+(index+1), function(e) {	
				let isEdit = $('#defaultPop'+(index+1)).attr('btnId') == 'editBtn'+(index+1) ? 'Y':'N';	
				if(isEdit == 'Y'){
					return;
				}
				let columnProp = [];			
					
				let activeId =  e.target.parentElement.parentElement.parentElement.parentElement.id.split('DP');
				let targetId = 	activeId[0]; //선택자 
				let clickedElment = e.target.parentElement.parentElement.parentElement.parentElement.id;
				let dropDownGridIndex = 0;
				let totalParam = [];
				//var clickedElment = document.activeElement.parentElement.parentElement.parentElement.parentElement.id;
					
				if(clickedElment =='' || clickedElment.indexOf('DP') == -1){
					return;
				}
				if(fieldValue==''){
					return;
				}
				for(let i=0,max1=that.popupProperty[index].length; i<max1;i++){
					if(that.popupProperty[index][i].popupType == 'DG' && that.popupProperty[index][i].popupId == targetId){												
							dropDownGridIndex = i;
						    break;				
					}
			    }
				var fieldValue = $('#'+clickedElment).val();
				var activeTop = $('#'+clickedElment).offset().top;
				var activeLeft = $('#'+clickedElment).offset().left;
				
			    var dropdownGridId = (index+1)*100;
			    let dropdownGridQueryId = that.popupProperty[index][dropDownGridIndex]['dropdownGridList'];
				
			
	
			    mom_ajax('R', 'XUSM3030.defaultInfo', {menuId:dropdownGridQueryId,gridId:1}, function(result1, data1) { 
				
		         if(result1 != 'SUCCESS' || data1.length == 0) {
		    	  momWidget.splashHide();
			      return;							     
		         }			  
		      var gridString   = data1[0]['gridProperty']   == undefined ? '[]':data1[0]['gridProperty'];
		      var columnString = data1[0]['columnProperty'] == undefined ? '[]':data1[0]['columnProperty'];
		          gridString   = gridString.substr(1,  gridString.length-2);  
			      columnString = columnString.substr(1,  columnString.length-2);
			      that.gridProperty[dropdownGridId]     = JSON.parse(gridString);
			      that.columnProperty[dropdownGridId]   = JSON.parse(columnString);
			      				var gridExceptList = ['checkId','gridTitle','popupColNum','popupRowNum','popupTitle','headerColor','initSearch','showFindBtn']; 	
				var gridExtraProp  = {'checkId':'checkId','gridTitle':'gridTitle','popupColNum':'popupColNum','popupRowNum':'popupRowNum','popupTitle':'popupTitle','headerColor':'headerColor','initSearch':'initSearch','showFindBtn':'showFindBtn'};			
			      for(var i=0,max=gridExceptList.length; i<max;i++){
			    	   gridExtraProp[gridExceptList[i]] = that.gridProperty[dropdownGridId][0][gridExceptList[i]];			    	  
			    	   delete that.gridProperty[dropdownGridId][0][gridExceptList[i]];
			      }
			      that.gridExtraProperty[dropdownGridId] = gridExtraProp;
			     var popupColNum = that.gridExtraProperty[dropdownGridId]['popupColNum'] == undefined ? 3:Number(that.gridExtraProperty[dropdownGridId]['popupColNum']);
			    var popupRowNum = that.gridExtraProperty[dropdownGridId]['popupRowNum'] == undefined ? 3:Number(that.gridExtraProperty[dropdownGridId]['popupRowNum']);
			    var popupHtml = that.createPopup.dropDownGridPop(dropdownGridId+1,popupColNum,popupRowNum,'popup',targetId,0);
                var menuId = that.pageProperty[index]['programId'];
                    var isShow = $('#dropDownGridPop'+(dropdownGridId+1)).css('display');
                    if(isShow == 'block'){
	                // $('#dropDownGridPop'+(dropdownGridId+1)).css('display','none');
	                 $('#dropDownGridPop'+(dropdownGridId+1)).remove();
					 return;
				}	
			    //$('#dropDownGridPop'+(dropdownGridId+1)).remove();   
			    $('body').append(popupHtml);
			
                
			       for(var i=0,max=that.columnProperty[dropdownGridId].length;i<max;i++){	
			    	   columnType = that.columnProperty[dropdownGridId][i]['columnEditable'] == 'N' ? 'default':'edit';	
			    	   widthUse = that.columnProperty[dropdownGridId][i]['columnWidth']  == 0 ? 'N': 'Y';
			    	   excelShow = that.columnProperty[dropdownGridId][i]['excelShow']  == 'Y' ? 'Y': 'N';
			    	   excelTemplateShow = that.columnProperty[dropdownGridId][i]['excelTemplateShow']  == 'Y' ? 'Y': 'N';
			    	   gridShow = that.columnProperty[dropdownGridId][i]['columnShow']  == 'Y' ? true: false;
			    	   excelDownShow   = that.columnProperty[dropdownGridId][i]['excelShow'] == 'Y' ? true: false;
			    	   excelUploadShow = that.columnProperty[dropdownGridId][i]['excelTemplateShow'] == 'Y' ? true: false;
			    	   isCheckBox = momWidget.columnProperty[dropdownGridId][i]['columnType'] == 'CK' ? 'Y': 'N';
			    	   isDropDown = momWidget.columnProperty[dropdownGridId][i]['columnType'] == 'S' ? 'Y': momWidget.columnProperty[index][i]['columnType'] == 'M' ? 'Y':'N';
			    	   columnId = that.columnProperty[dropdownGridId][i]['columnId'];

			    	   columnProp[i] =  {
					    	      dataField 	: columnId 
					  			, headerText 	: that.columnProperty[dropdownGridId][i]['columnNm'] 
						   		, dataType      : that.columnProperty[dropdownGridId][i]['dataType'] 
								, formatString  : that.columnProperty[dropdownGridId][i]['dataFormat']
	    	                    , editable      : that.columnProperty[dropdownGridId][i]['columnEditable']  == 'Y' ? true : false
					  			, style			: that.columnProperty[dropdownGridId][i]['columnAlign']  == 'LEFT' ? 'aui-grid-'+columnType+'-column-left': that.columnProperty[index][i]['columnAlign'] == 'RIGHT'? 'aui-grid-'+columnType+'-column-right' : 'aui-grid-'+columnType+'-column-center'	
					  			, visible       : gridShow  
					  		
	                    };

			    	   if(widthUse == 'Y'){
			    		   columnProp[i].width      = that.columnProperty[dropdownGridId][i]['columnWidth'];

			    	   }
			    	   if(isCheckBox =='Y'){
			    		   columnProp[i].renderer = {
									          type: 'CheckBoxEditRenderer'
											, editable: true
											,checkValue : 'Y' 
											,unCheckValue : 'N'
										};
			    		   
			    		   columnProp[i].headerRenderer = { 
			    				type : "CheckBoxHeaderRenderer",
			    				position : "right",
			    				dependentMode : true
			    				//onClick : myHeaderCheckClick 
			    			};
			    	   }
			 
			    	   	
			      } 	
			        AUIGrid.destroy('#grid'+(dropdownGridId+1));
				    that.grid[dropdownGridId] = AUIGrid.create('#grid'+(dropdownGridId+1), columnProp, that.gridProperty[dropdownGridId][0]); 
			      

				     //$('#dropDownGridPop'+(dropdownGridId+1)).momModal('show');
				
				  let callInitResult = that.checkActionCallInit(dropdownGridId, 'R',  {}, 'POPUPCLICK', your,e);     	
				  if(callInitResult['result'] != 'SUCCESS') {
						      let msgType = callInitResult['result'] == 'WARN' ? 'warning': 'danger';
							  momWidget.messageBox({type:msgType, width:'400', height: '145', html: callInitResult['msg']});
							  momWidget.splashHide();
						      return;
			      }
			           $('#dropDownGridPop'+(dropdownGridId+1)).css('z-index','9999');
				     $('#dropDownGridPop'+(dropdownGridId+1)).css('display','block');
				     
				     $('#dropDownGridPop'+(dropdownGridId+1)).offset({top : activeTop+29, left : activeLeft});
				  AUIGrid.resize('#grid'+(dropdownGridId+1));	
				  that.setGridEvent(dropdownGridId,your);                      // 그리드이벤트 세팅(셀클릭,체크박스클릭,편집 등)
			      totalParam = callInitResult['param'];
				  		 mom_ajax('R', 'DG.'+dropdownGridQueryId, totalParam, function(result1, data1) {
					//momWidget.splashShow();
					if(result1 != 'SUCCESS') {
						    	  momWidget.splashHide();
							      return;							     
					}
						 AUIGrid.setGridData(that.grid[dropdownGridId], data1); 
						   						   	
				}, undefined, undefined, that, false);	 
		/*    	 that.findBtnClicked(dropdownGridId, [{keyId1:fieldValue}], true, 'INIT',menuId,your,function(callBackResult, callBackData) {
						                 if(callBackResult != 'SUCCESS' || callBackData.length==0) {
						    	            momWidget.splashHide();
						    	            momWidget.messageBox({type:'warning', width:'400', height: '145', html: '조회된 데이터없음!'});
						    	            $('#dropDownGridPop'+(dropdownGridId+1)).remove();
							                return;							     
						                 }	
						               
					});*/
		       
				}, undefined, undefined, this, false);
				
				//}
				e.stopImmediatePropagation();
			});
			
	     $(document).on('click','html', function(e) {
		/*    if(document.activeElement.id.indexOf('defaultPop') != -1 || document.activeElement.id==''){
					return;
				}*/
				
             if($('.dropDownGrid').length>0){
	  			var dropdownGridId = $('.dropDownGrid')[0]['id'].split('dropDownGridPop');	  			 
			        dropdownGridId = Number(dropdownGridId[1]);
				 var isShow = $('#dropDownGridPop'+(dropdownGridId)).css('display');
				      if(isShow == 'block'){
	                // $('#dropDownGridPop'+(dropdownGridId+1)).css('display','none');
	                 $('#dropDownGridPop'+(dropdownGridId)).remove();
					 return;
				     }
            }
			
			/*	var activeId = document.activeElement.parentElement.parentElement.parentElement.parentElement.id.split('DP');
				var clickedElment = document.activeElement.parentElement.parentElement.parentElement.parentElement.id;
				var fieldValue = $('#'+clickedElment).val();
				if(fieldValue==''){
					return;
				}
				var targetId = 	activeId[0];*/
				
		   
                 
		});	
			$(document).on('click','#'+changePwBtnId, function() {
				//that.splashShow();
               var modalDiv = $('#changePwPop'+(index+1));
               modalDiv.momModal({ backdrop: false, show: true });
               $('#changePwPop'+(index+1)).draggable({ handle: ".modal-header" });

		      // $('#changePwPop'+(index+1)).css("display","block");
					 $('#changePwPop'+(index+1)).momModal('show');
				});
				$(document).on('click','#'+changePwSaveBtn, function() {
					momWidget.splashShow();
					let param = {loginId:$('#userNoDP'+(index+1)).val(),nowPass:$('#nowPassword'+(index+1)).val()};
					$.ajax({
    				url:mCommon.contextPath() + '/passwordChange',
    				method: "get",
    				contentType: 'application/json; charset=UTF-8',
    				data :param,
    				async		: true,
		            timeout 	: 30000000,
		            beforeSend: function (xhr) {
	                  xhr.setRequestHeader("Authorization","Bearer " + localStorage.getItem('token'));
	               },
    				success: function(data){	                
	                    
	                    if(data.result == 'Y'){
							$('#changePwPop'+(index+1)).momModal('hide');
		                    momWidget.messageBox({type:'success', width:'400', height: '145', html: '저장시에 최종 반영됩니다!'});
						    momWidget.splashHide();
						    $('#passwordDP'+(index+1)).val($('#changePassword'+(index+1)).val().trim());						    
					        return;
						}
						else{
							$('#changePwPop'+(index+1)).momModal('hide');
							momWidget.messageBox({type:'danger', width:'400', height: '145', html: '현재비밀번호 불일치!'});
						    momWidget.splashHide();
					        return;
						}
           			
    				
    				},
    				error: function(e) {    				
    						  momWidget.splashHide();
    						  return;
    				}
    			});	        
				});
				
				$(document).on('click','#'+changePwCencelBtn, function() {

					 $('#changePwPop'+(index+1)).momModal('hide');
				});
			$(document).on('click','#'+reportBtnId, function() {
				that.splashShow();
				
			
				var param = that.getCheckedRowItems(that.grid[index]);
				if (param.length == 0){
					      return;	
					}			
					param[0].fileName  = that.pageProperty[index]['programId']+'_'+(index+1);
					//param[0].fileType = 'xlsx';
					param[0].fileType = 'pdf';
			   // param = that.checkSearchParam(index,param,your); 	   
				$.ajax({
    				url:mCommon.contextPath() + '/createReport',
    				method: "get",
    				contentType: 'application/json; charset=UTF-8',
    				data :param[0],
    				async		: true,
		            timeout 	: 30000000,
		            beforeSend: function (xhr) {
	                  xhr.setRequestHeader("Authorization","Bearer " + localStorage.getItem('token'));
	               },
    				success: function(data){
	                  setTimeout(function() {
	                    momWidget.splashHide();
    					//window.open('../report-xlsx/'+param[0].fileName+'.'+param[0].fileType, '_blank','resizable=no,width=2000,height=1300,left=740,top=520');	
    					//history.pushState(null, null, '../report-xlsx/'+param[0].fileName+'.'+param[0].fileType)
    					location.href = location.href;
           				//location.href  = '../report-xlsx/'+param[0].fileName+'.'+param[0].fileType;
           				
           				location.href  = '../report-pdf/'+param[0].fileName+'.'+param[0].fileType;
    					},7000);
    				},
    				error: function(e) {    				
    						  momWidget.splashHide();
    						  return;
    				}
    			});	            
					
				});
			
			$(document).on('click','#'+exUpCheckDownBtnId, function() {
				/*	var excelData = AUIGrid.getGridData(that.excelUpGrid[index]); 
					AUIGrid.setGridData(that.excelDownGrid[index], excelData);		*/		
					 
					 
					 mom_ajax('R', momWidget.pageProperty[0]['programId']+'.excelUpBtn'+(index+1), [], function(result1, data1) {
						   		if(result1 != 'SUCCESS') {
							    	  momWidget.splashHide();
							    	  momWidget.messageBox({type:'danger', width:'400', height: '145', html: '프로시저 호출실패!'});							    	  
								      return;							     
			      				}
			      				let rowIndexes = [];
			      			for(var i=0,max1=data1.length; i<max1;i++){
								rowIndexes.push(i);
							}
							AUIGrid.updateRows(that.excelUpGrid[index], data1, rowIndexes); 
			      				//AUIGrid.setGridData(that.excelUpGrid[index], data1);	
					var	fileName = that.pageProperty[index]['programId'] + '_' + get_current_date('yyyy-mm-dd')+'_검사결과';
				    var excelDownOpt = {fileName: fileName ,
						    		    progressBar: true,
						    		    showRowNumColumn:false,
						    		    footers: undefined,
						    		    exportWithStyle: true
				    		            };
				   
				    excelDownOpt.afterRequestCallback = function() { // 엑셀 만들고 호출되는 콜백함수
					$('.aui-grid-export-progress-modal').remove();
					// AUIGrid.GridData(that.excelGrid[index]);
					
					//$('#excelArea' + (index + 1)).remove();
					//AUIGrid.destroy(that.excelDownGrid[index]);
					//that.exceldownGrid[index] = undefined;
				}
				//option.footers = footerProperty;
				    //that.excelDownGrid[index]
				    //  AUIGrid.setColumnPropByDataField(that.excelUpGrid[index], "valMsg", {visible : true});
				   // that.excelUpGrid[index] = AUIGrid.create('#excelUpGrid'+(index+1), that.excelUploadProperty[index], gridPros);	
						validateCol = { dataField 	: 'valMsg' 
				  			  , headerText 	: 'Result'
				  			  , headerStyle   : "my-header-style-default"
					   		  , dataType      : "string"
							  , formatString  : ""
    	                      , editable      : false
				  			  , style			: 'aui-grid-default-column-left'
				  		      , visible       : true
				  		      , width         : 350
						                     };			
					 // let backupGridData = AUIGrid.getGridData('#excelUpGrid'+(index+1));	
				      AUIGrid.addColumn(that.excelUpGrid[index], validateCol, 'first'); 
				      $('.aui-grid-export-progress-modal').height('100%');
				      $('#excelUpGrid' + (index + 1)).children().append($('.aui-grid-export-progress-modal'));
				      AUIGrid.exportToXlsx(that.excelUpGrid[index], excelDownOpt);
				     // AUIGrid.removeColumn(that.excelUpGrid[index],0); 
				     	setTimeout(function() {
					     AUIGrid.removeColumn(that.excelUpGrid[index],0); 
					   //AUIGrid.destroy(that.excelUpGrid[index]);
				      // AUIGrid.create(that.excelUpGrid[index], that.excelUploadProperty[index], that.excelUpGridProperty[index]);	
					   //AUIGrid.setGridData(that.excelUpGrid[index], backupGridData);
				}, 400);
				
					  //AUIGrid.setColumnProp( that.excelUpGrid[index], 0, { visible : false} );				
			
				//AUIGrid.removeColumn(that.excelUpGrid[index], 'first');
	   	 					}, undefined, undefined, this, false,undefined,'R');
	   	 					
	   	 														
			
				});
					$(document).on('click','#'+exUpCheckBtnId, function() {	
					let uploadItems = AUIGrid.getGridData(momWidget.excelUpGrid[index]);
					if(uploadItems.length ==0){
						 momWidget.messageBox({type:'warning', width:'400', height: '145', html: '데이터가없습니다!'});
					}
                 mom_ajax('D', momWidget.pageProperty[0]['programId']+'.excelUpBtnV'+(index+1), [], function(result1, data1) {
		      		if(result1 != 'SUCCESS') {
			    	  momWidget.splashHide();
			    	  momWidget.messageBox({type:'danger', width:'400', height: '145', html: 'tmp테이블 삭제실패!'});
				      return;							     
		      		}					       			
        				mom_ajax('C', momWidget.pageProperty[0]['programId']+'.excelUpBtnV'+(index+1), uploadItems, function(result2, data2) {
				  			if(result2 != 'SUCCESS') {
					    	  momWidget.splashHide();
					    	  momWidget.messageBox({type:'danger', width:'400', height: '145', html: 'tmp테이블 삽입실패!'});
						      return;							     
				      		}
			      			   mom_ajax('P', momWidget.pageProperty[0]['programId']+'.excelUpBtnV'+(index+1), [], function(result3, data3) {
						   		if(result3 != 'SUCCESS') {
							    	  momWidget.splashHide();
							    	  momWidget.messageBox({type:'danger', width:'400', height: '145', html: '프로시저 호출실패!'});							    	  
								      return;							     
			      				}
			      				 if(data3[0]['p_err_code']=='E') {
								
					            	  momWidget.messageBox({type:'danger', width:'400', height: '145', html: '검사 불합격! 검사 결과를 다운 받으세요'+multiLang.transText('MESSAGE',data3[0]['p_err_msg'])});
									  momWidget.splashHide();
									  $("#exUpCheckDown"+(index+1)).prop("disabled", false);
						              return;
					            }    
		      				    	$("#saveBtnExUp"+(index+1)).prop("disabled", false);

	    							  momWidget.messageBox({type:'success', width:'400', height: '145', html: '검사통과!'});
	   	 					}, undefined, undefined, this, false,undefined,'EV');			

	    }, undefined, undefined, this, false);	
   
	}, undefined, undefined, this, false);	
	 				   

			});
			
			$(document).on('click','#'+saveExUpBtnId, function(e) {
			    // $('#excelUpPop'+(index+1)).momModal('hide');	
				 that.splashShow();
				
				 var bar = $('.bar');
				 var percent = $('.percent');
				 var status = $('#status');
				   bar.width('0%');
		           percent.text('0%');  
            
                status.empty();
                var percentVal = '0%';
            /*    bar.width(percentVal);
                percent.html(percentVal);*/
				var param = [];					
			    var checkedItems = AUIGrid.getGridData(that.excelUpGrid[index]);
			    if(checkedItems.length == 0){
					momWidget.messageBox({type:'warning', width:'400', height: '145', html:'데이터가 없습니다!'});
			        momWidget.splashHide();
			        return;
				}
					for(var i=0,max=checkedItems.length;i<max;i++){	
						param.push(checkedItems[i]); 														
				    }
					if(param.length>=1000){
						that.splashHide();
						 //$("#pleaseWaitDialog").momModal('show');
					
					}
					else{
						//that.splashShow();
					}
				if(that.checkActionCallInit(index, 'GS', param, 'saveUpBtn', your,e)['result'] != 'SUCCESS') {
					  momWidget.messageBox({type:'danger', width:'400', height: '145', html: 'callInit action fail!'});
					  momWidget.splashHide();
				      return;
				}	
					 				
				    var actionType = $('#excelUpPop'+(index+1)).attr('actiontype') == undefined ? 'CU' : $('#excelUpPop'+(index+1)).attr('actiontype');
				    let queryId    = actionType == 'CU' ? that.pageProperty[index]['programId']+'.excelUpBtn'+(index+1) : that.pageProperty[index]['programId']+'.excelUpBtn'+(index+1);
				    let validateYn = $('#excelUpPop'+(index+1)).attr('validateYn') == undefined ? 'N' : $('#excelUpPop'+(index+1)).attr('validateYn');
				    let tmpYn = $('#excelUpPop'+(index+1)).attr('tmpYn') == undefined ? 'N' : $('#excelUpPop'+(index+1)).attr('tmpYn');
					setTimeout(function() {
						if(validateYn=='Y'){
							 param[0].excelUpYn = 'Y';
					         param[0].sessionId = Math.floor(Math.random() * 10000000000000001);
							 mom_ajax(actionType, queryId,[], function(result, data) {
							   bar.width('100%');
					           percent.text('100%'+' '+param.length+'/'+param.length);  
							// percent.html(percentVal+' '+paramSize+'/'+data.percent);
					            if(data[0]['p_err_code']=='E') {
									  $("#pleaseWaitDialog").momModal('hide');
					            	  momWidget.messageBox({type:'danger', width:'400', height: '145', html: multiLang.transText('MESSAGE','MSG00033')});
									  momWidget.splashHide();
						              return;
					            }    				                         							  						
					        	if(that.checkActionCallBack(index, 'GS', param, 'createBtn'+index, your)['result'] != 'SUCCESS'){
									  momWidget.messageBox({type:'danger', width:'400', height: '145', html: 'callBack action fail!'});
									  momWidget.splashHide();
								      return;
								} momWidget.findBtnClicked(index, {}, true, 'saveBtnExUp' + (index + 1),momWidget.pageProperty[index]['programId'],your,[]);	
					        	  //$('#excelUpPop'+(index+1)).momModal('hide');
					        	  momWidget.messageBox({type:'success', width:'400', height: '145', html: multiLang.transText('MESSAGE','MSG00001')});
								  momWidget.splashHide();
								  //$("#pleaseWaitDialog").momModal('hide');
							      return;
				          }, undefined, index, this, false,undefined,'EA');	
		          
						
					
						// $("#pleaseWaitDialog").modal('show');
					
						}
						else{
							 param[0].excelUpYn = 'Y';
						     param[0].sessionId = Math.floor(Math.random() * 10000000000000001);
							 if(tmpYn=='Y'){
								    mom_ajax('D', that.pageProperty[index]['programId']+'.excelUpBtn'+(index+1) ,[], function(result1, data1) {
						            if(result1!='SUCCESS') {
						            	  momWidget.messageBox({type:'danger', width:'400', height: '145', html: multiLang.transText('MESSAGE','MSG00047')});
										  momWidget.splashHide();
							              return;
						            }    	
					                   mom_ajax('C', that.pageProperty[index]['programId']+'.excelUpBtn'+(index+1),param, function(result2, data2) {                                                                                                      
						 		  			if(result2!='SUCCESS') {
							            	   momWidget.messageBox({type:'danger', width:'400', height: '145', html: multiLang.transText('MESSAGE','MSG00048')});
											   momWidget.splashHide();
								               return;
							                }    	
					                 mom_ajax('P', that.pageProperty[index]['programId']+'.excelUpBtn'+(index+1),[], function(result3, data3) {
									    if(data3[0]['p_err_code']=='E') {
								            	  momWidget.messageBox({type:'danger', width:'400', height: '145', html: multiLang.transText('MESSAGE',data3[0]['p_err_code'])});
												  momWidget.splashHide();
									              return;
								         }    	
					                 }, undefined, undefined, this, false,undefined,'C'); 
			                    
						 }, undefined, undefined, this, false);    
						                      							  						
			        	callBackResult = that.checkActionCallBack(index, 'P', param, 'excelUpBtn'+(index+1), your);
						if(callBackResult['result'] != 'SUCCESS') {
							  momWidget.messageBox({type:'danger', width:'400', height: '145', html: callBackResult['msg']});
							  momWidget.splashHide();
						      return;
			    		}
						  let callBackParam = callBackResult['param'];		 
			        	  momWidget.findBtnClicked(index, callBackParam, true, 'excelUpBtn'+(index+1),momWidget.pageProperty[index]['programId'],your);			        	  
			        	  momWidget.messageBox({type:'success', width:'400', height: '145', html: multiLang.transText('MESSAGE','MSG00001')});
						  momWidget.splashHide();
					      return;
		          }, undefined, undefined, this, false);
							 }
							 else{
								 mom_ajax(actionType, queryId,param, function(result, data) {
									   bar.width('100%');
							           percent.text('100%'+' '+param.length+'/'+param.length);  
							// percent.html(percentVal+' '+paramSize+'/'+data.percent);
					            if(data[0]['p_err_code']=='E') {
									  $("#pleaseWaitDialog").momModal('hide');
					            	  momWidget.messageBox({type:'danger', width:'400', height: '145', html: multiLang.transText('MESSAGE','MSG00033')});
									  momWidget.splashHide();
						              return;
					            }    				                         							  						
					        	if(that.checkActionCallBack(index, 'GS', param, 'createBtn'+index, your)['result'] != 'SUCCESS'){
									  momWidget.messageBox({type:'danger', width:'400', height: '145', html: 'callBack action fail!'});
									  momWidget.splashHide();
								      return;
								} momWidget.findBtnClicked(index, {}, true, 'saveBtnExUp' + (index + 1),momWidget.pageProperty[index]['programId'],your,[]);	
					        	  //$('#excelUpPop'+(index+1)).momModal('hide');
					        	  momWidget.messageBox({type:'success', width:'400', height: '145', html: multiLang.transText('MESSAGE','MSG00001')});
								  momWidget.splashHide();
								  //$("#pleaseWaitDialog").momModal('hide');
							      return;
				          }, undefined, index, this, false,undefined,'EA');
							}
							
					
						// $("#pleaseWaitDialog").modal('show');
						
						}
						
				    
					}, 500);
				 
				
			});
			$(document).on('change','#'+excelFile, function(e) {
				that.splashShow();
				 var bar = $('.bar');
				 var percent = $('.percent');
				 var status = $('#status');
				 let validateYn = $('#excelUpPop'+(index+1)).attr('validateYn') == undefined ? 'N':$('#excelUpPop'+(index+1)).attr('validateYn');
			   bar.width('0%');
			   percent.text('0%');  
			
				
				setTimeout(function() {
						excelUploadGrid(e.target,index, that.excelUpGrid[index],validateYn);
                        
				$('#'+excelFile).val('');
				//AUIGrid.update(that.excelUpGrid[index]);
							setTimeout(function() {

						that.splashHide();
							}, 500);
							}, 500);
			
		//AUIGrid.showToastMessage(that.excelUpGrid[index], 2, 0, "Y/N만 입력가능!");
			});
			$(document).on('click','#'+excelUpCancelBtnId, function() {
				$('#excelFile1').val('')
				 AUIGrid.destroy(that.excelUpGrid[index]);
				//AUIGrid.clearGridData(that.excelUpGrid[index]);
				//$('#excelUpPop'+(index+1)).css('opacity', '0');
				$('#excelUpPop'+(index+1)).momModal('hide');
				
			});
			$(document).on('click', '#' + excelUpBtnId, function() {
				 //$("#exUpCheck"+(index+1)).prop("disabled", false);		
				 let eventType = 'CU';	
				 let tmpYn = 'N';	 
				  $("#saveBtnExUp"+(index+1)).prop("disabled", false);
				  for(let i=0,max=that.buttonProperty[index].length;i<max;i++){
					  if(that.buttonProperty[index][i]['buttonId'] == 'excelUpBtn') {
						 eventType =   that.buttonProperty[index][i]['eventType'];
						 tmpYn = that.buttonProperty[index][i]['tempUseYn'];
					  }
				  }
				  $('#excelUpPop'+(index+1)).attr('actionType', eventType);
				  $('#excelUpPop'+(index+1)).attr('validateYn', 'N');
				  $('#excelUpPop'+(index+1)).attr('tmpYn', tmpYn);
			     //$("#exUpCheckDown"+(index+1)).prop("disabled", true);
				$('#excelFile1').val('')
				AUIGrid.clearGridData(that.excelUpGrid[index]);
					 var bar = $('.bar');
				 var percent = $('.percent');
				 var status = $('#status');
			   bar.width('0%');
			   percent.text('0%');  
				var gridPros = {
						
						// 페이징 사용		
						usePaging : true,
						
						// 한 화면 페이징 버턴 개수 5개로 지정
						showPageButtonCount : 10,
						
						// 페이지 행 개수 select UI 출력 여부 (기본값 : false)
						showPageRowSelect : true,
						
						// 한 화면에 출력되는 행 개수 30개로 지정
						// pageRowCount 의 크기가 너무 크면 퍼포먼스가 낮아집니다.
						// 그리드 페이징은 해당 행 수만큼 DOM을 만들기 때문입니다.
						pageRowCount : 100,
						showRowNumColumn: true,
						// 페이징 하단에 출력되는 페이징 정보 텍스트 변경 함수
						// 파라메터 설명 
						// currentPage : 현재 페이지, 
						// totalPageCount : 총 페이지 수, 
						// currentTopNumber : 최 상단의 행 번호, 
						// currentBottomNumber : 최 하단 행 번호,
						// dataLen : 전체 데이터 수
						// 리턴 : 리턴되는 스트링이 출력됩니다.
						pagingInfoLabelFunction : function(currentPage, totalPageCount, currentTopNumber, currentBottomNumber, dataLen) {
							return "현재페이징 : " + currentPage + " / 전체페이징 : " + totalPageCount + "( " + currentTopNumber + "~" + dataLen + " 개 )";
						},
						
						// 그룹핑 패널 사용
					/*	useGroupingPanel : true,
					
						groupingMessage : "여기에 칼럼을 드래그하면 그룹핑이 됩니다."*/
					};
					that.excelUpGridProperty[index] = gridPros;
					that.excelUpGrid[index] = AUIGrid.create('#excelUpGrid'+(index+1), that.excelUploadProperty[index], gridPros);	
						
				   // AUIGrid.hideColumnByDataField(that.excelUpGrid[index], ["valMsg"] ); 
					$('#' +'excelUpPop'+(index+1)).momModal('show');
					AUIGrid.resize('#excelUpGrid'+(index+1));
			});
			$(document).on('click', '#' + excelUpBtnIdV, function() {
				 $("#exUpCheck"+(index+1)).prop("disabled", false);
			     $("#exUpCheckDown"+(index+1)).prop("disabled", true);
			     $('#excelUpPop'+(index+1)).attr('actionType', 'P');
			     $('#excelUpPop'+(index+1)).attr('index', index);
			     
			     $('#excelUpPop'+(index+1)).attr('validateYn', 'Y');
				 $('#excelFile1').val('')
				 
				AUIGrid.clearGridData(that.excelUpGrid[index]);
					 var bar = $('.bar');
				 var percent = $('.percent');
				 var status = $('#status');
			   bar.width('0%');
			   percent.text('0%');  
				var gridPros = {
						
						// 페이징 사용		
						usePaging : true,
						
						// 한 화면 페이징 버턴 개수 5개로 지정
						showPageButtonCount : 10,
						
						// 페이지 행 개수 select UI 출력 여부 (기본값 : false)
						showPageRowSelect : true,
						
						// 한 화면에 출력되는 행 개수 30개로 지정
						// pageRowCount 의 크기가 너무 크면 퍼포먼스가 낮아집니다.
						// 그리드 페이징은 해당 행 수만큼 DOM을 만들기 때문입니다.
						pageRowCount : 100,
						showRowNumColumn: true,
						// 페이징 하단에 출력되는 페이징 정보 텍스트 변경 함수
						// 파라메터 설명 
						// currentPage : 현재 페이지, 
						// totalPageCount : 총 페이지 수, 
						// currentTopNumber : 최 상단의 행 번호, 
						// currentBottomNumber : 최 하단 행 번호,
						// dataLen : 전체 데이터 수
						// 리턴 : 리턴되는 스트링이 출력됩니다.
						pagingInfoLabelFunction : function(currentPage, totalPageCount, currentTopNumber, currentBottomNumber, dataLen) {
							return "현재페이징 : " + currentPage + " / 전체페이징 : " + totalPageCount + "( " + currentTopNumber + "~" + dataLen + " 개 )";
						},
						
						// 그룹핑 패널 사용
					/*	useGroupingPanel : true,
					
						groupingMessage : "여기에 칼럼을 드래그하면 그룹핑이 됩니다."*/
					};
					that.excelUpGridProperty[index] = gridPros;
					that.excelUpGrid[index] = AUIGrid.create('#excelUpGrid'+(index+1), that.excelUploadProperty[index], gridPros);	
  
					$('#' +'excelUpPop'+(index+1)).momModal('show');
					AUIGrid.resize('#excelUpGrid'+(index+1));
			});
			$(document).on('click', '#' + addBtnId, function(e) {	
				 let param = {targetIndex:index,addIndex:index};
				 let addIndex = index;
				 let targetIndex = index;
				 let isCheckCol = that.gridProperty[index][0]['showRowCheckColumn'];
			     let targetItem	={};	
			     let callInitResult = that.checkActionCallInit(index, 'GA', param, 'addBtn', your,e);
				 if(callInitResult['result'] != 'SUCCESS') {
					          let msgType = callInitResult['result'] == 'WARN' ? 'warning': 'danger';
							  momWidget.messageBox({type:msgType, width:'400', height: '145', html: multiLang.transText('MESSAGE',callInitResult['msg'])});
							  momWidget.splashHide();
						      return;
			    }
			    param = Object.assign(param, callInitResult['param']);  
			    targetIndex = param.targetIndex;
			    addIndex = param.addIndex;
			    isCheckCol = that.gridProperty[targetIndex][0]['showRowCheckColumn'];;
				if(isCheckCol == true){
					 targetItem = that.getCheckedRowItems(that.grid[targetIndex]);
					 if(targetItem.length == 0){
						targetItem = {};
					    /* momWidget.messageBox({type:'warning', width:'400', height: '145', html: multiLang.transText('MESSAGE','MSG00034')});
						 momWidget.splashHide();
						 return;*/
				    }
				    else{
					targetItem = targetItem[0];
				    }
										
				}
				else{
				     targetItem = AUIGrid.getSelectedItems(that.grid[targetIndex])[0];
				    if(targetItem == undefined){
					     targetItem = {};
					    /* momWidget.messageBox({type:'warning', width:'400', height: '145', html: multiLang.transText('MESSAGE','MSG00052')});
						 momWidget.splashHide();
						 return;*/
				    }
				    else{
					targetItem = targetItem['item'];
					}
				}
  				     
				
				 
				let columnProp = that.columnProperty[addIndex];
				let item = {};
				let columnEdit =false;
				for(let i=0,max=columnProp.length;i<max;i++){					
					 if(columnProp[i]['columnShow'] =='Y'){
							if(targetItem[columnProp[i]['columnId']] != undefined && targetItem[columnProp[i]['columnId']] != ''){
								 item[columnProp[i]['columnId']] = targetItem[columnProp[i]['columnId']];
							}
							else{
								 item[columnProp[i]['columnId']] = '';
							}
							
						
						
					 }
				}
				item.addItem = 'Y';
				AUIGrid.addRow(that.grid[addIndex], item, "first");
				// row Styling 함수를 다른 함수로 변경
		
				//let colStyle = "aui-grid-default-column-left";			
			 
				for(let i=0,max=columnProp.length;i<max;i++){
				    AUIGrid.setColumnPropByDataField(widget.grid[addIndex], columnProp[i]['columnId'], { 		    	
						styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
						  if(item.addItem == 'Y' && columnProp[i]['columnCreate'] =='Y'){
							   
							    return 'aui-grid-edit-column-left';
						  }
						  else {
							  
							     return '';
						  }
							
						},
					
				   });
			 
	
				}
				let callBackResult 	= that.checkActionCallBack(index, 'GA', item, 'addBtn', your,[]);	
				if(callBackResult['result']  != 'SUCCESS') {
					  momWidget.messageBox({type:'danger', width:'400', height: '145', html: callBackResult['msg']});
					  momWidget.splashHide();
				      return;
				}	
			});
			
			$(document).on('click', '#' + showLv1Btn, function(e) {	
				if (!isExpanded) {
					AUIGrid.expandAll(that.grid[index]);
					isExpanded = true;
				} else {
					AUIGrid.collapseAll(that.grid[index]);
					isExpanded = false;
				}
			});
			 
		
			
			$(document).on('click', '#' + createBtnId, function(e) {
				var callbackData = [];	
				var targetArray = e.target.id.split('DP');
				var buttonId = targetArray[0];
				var actionType = 'C';
		        for(var k=0,max=that.buttonProperty[index].length;k<max;k++){
					if(that.buttonProperty[index][k]['buttonId']+(index+1) == buttonId){
						actionType = that.buttonProperty[index][k]['eventType'];
						
					}
				}	
				if($('#changePwBtn'+(index+1)).length){
					 $('#changePwBtn'+(index+1)).css('display','none');
				}	
				that.setPopup(index,actionType,'createBtn'+(index+1),'N');	
				$('#defaultPop'+(index+1)).attr('actionType', actionType);
				$('#defaultPop'+(index+1)).attr('btnId', buttonId);
				callInitResult = that.checkActionCallInit(index, actionType, [], 'createBtn', your,e);
				if(callInitResult['result'] != 'SUCCESS') {
					  momWidget.messageBox({type:'warning', width:'400', height: '145', html: callInitResult['msg']});
					  momWidget.splashHide();
				      return;
				}		
				//$('#popupTitle'+(index+1)).text('등록');	
				var popupTitle = that.gridExtraProperty[index]['popupTitle'];
				$('#popupTitle'+(index+1)).text('');
				$('#popupTitle'+(index+1)).append(popupTitle+'('+multiLang.transText('MESSAGE','MSG00039')+')');	
				$('#' +'defaultPop'+(index+1)).momModal('show');
				
				    // AUIGrid.resize('#grid'+index+1);
				 that.htmlResize(index,your);
				//that.popUpSizeSet(index);			
			
				 callbackData   = AUIGrid.getGridData(that.grid[index]);
				 callBackResult = that.checkActionCallBack(index, actionType, [], 'createBtn', your,callbackData);	
				 if(callBackResult['result']  != 'SUCCESS') {
					  momWidget.messageBox({type:'danger', width:'400', height: '145', html: callBackResult['msg']});
					  momWidget.splashHide();
				      return;
				}				
				
			});	
			

			$(document).on('click', '#' + copyBtnId, function(e) {	
				var isCheckCol = that.gridProperty[index][0]['showRowCheckColumn'];
				var param = that.getCheckedRowItems(that.grid[index]);
				var actionType = 'C';
				var targetArray = e.target.id.split('DP');
				var buttonId = targetArray[0];
		        for(var k=0,max=that.buttonProperty[index].length;k<max;k++){
					if(that.buttonProperty[index][k]['buttonId']+(index+1) == buttonId){
						actionType = that.buttonProperty[index][k]['eventType'];
						
					}
				}	
				
				if(isCheckCol == true){
					if (param.length == 0){
					   momWidget.messageBox({type:'warning', width:'400', height: '145', html: multiLang.transText('MESSAGE','MSG00034')});
					  momWidget.splashHide();
					  return;		
					}			
										
				}
				else{
				      momWidget.messageBox({type:'danger', width:'400', height: '145', html: '체크박스 설정필요!'});
					  momWidget.splashHide();
				      return;
				}
								
				that.setPopup(index,"CP",'copy'+(index+1),'N');	
				$('#defaultPop'+(index+1)).attr('actionType', actionType);
				$('#defaultPop'+(index+1)).attr('btnId', buttonId);
			    callInitResult = that.checkActionCallInit(index, actionType, param, 'copyBtn', your,e);
				if(callInitResult['result'] != 'SUCCESS') {
					  momWidget.messageBox({type:'danger', width:'400', height: '145', html: callInitResult['msg']});
					  momWidget.splashHide();
				      return;
				}	
	
				var popupTitle = that.gridExtraProperty[index]['popupTitle'];
				$('#popupTitle'+(index+1)).text('');	
				$('#popupTitle'+(index+1)).append(popupTitle+'('+multiLang.transText('MESSAGE','MSG00041')+')');	
				if($('#changePwBtn'+(index+1)).length){
					 $('#changePwBtn'+(index+1)).css('display','none');
				}	
				$('#' +'defaultPop'+(index+1)).momModal('show');
				that.htmlResize(index,your);
				//that.popUpSizeSet(index);				
				
				callBackResult = that.checkActionCallBack(index, actionType, param, 'copyBtn', your,param);	
				if(callBackResult['result']  != 'SUCCESS') {
					  momWidget.messageBox({type:'danger', width:'400', height: '145', html: callBackResult['msg']});
					  momWidget.splashHide();
				      return;
				}						
				
			});	
			$(document).on('click', '#' + procBtnId, function(e) {
				let isCheckCol = that.gridProperty[index][0]['showRowCheckColumn'];
				var checkedItems = [];
				var param = [];
				let actionType = 'P';	
				let tmpYn = 'N';
				if(isCheckCol == true){
					    param = that.getCheckedRowItems(that.grid[index]);
					if (param.length == 0){
						  checkedItems = AUIGrid.getGridData(that.grid[index]);
						  for(var i=0,max=checkedItems.length;i<max;i++){	
						     param.push(checkedItems[i]); 														
				          }
						/*  momWidget.messageBox({type:'danger', width:'400', height: '145', html: multiLang.transText('MESSAGE','MSG00034')});
					      return;	*/
					}				
									
				}
				else{					
					    checkedItems = AUIGrid.getGridData(that.grid[index]);
					for(var i=0,max=checkedItems.length;i<max;i++){	
						  param.push(checkedItems[i]); 														
				    }
				}
		
				callInitResult = that.checkActionCallInit(index, 'P', param, 'procBtn', your,e);
				if(callInitResult['result'] != 'SUCCESS') {
							  momWidget.messageBox({type:'danger', width:'400', height: '145', html: callInitResult['msg']});
							  momWidget.splashHide();
						      return;
			    }
			    	
			     
				 param = callInitResult['param'];
				
				 for(var i=0;i<that.buttonProperty[index].length;i++){
					if(that.buttonProperty[index][i]['buttonId'] == 'procBtn'){
						actionType = that.buttonProperty[index][i]['eventType'];
						tmpYn = that.buttonProperty[index][i]['tempUseYn'];
						
					}					
				 }
		       if(tmpYn =='Y'){
			        mom_ajax('D', that.pageProperty[index]['programId']+'.procBtn'+(index+1),[], function(result1, data1) {
			            if(result1!='SUCCESS') {
			            	  momWidget.messageBox({type:'danger', width:'400', height: '145', html: multiLang.transText('MESSAGE','MSG00047')});
							  momWidget.splashHide();
				              return;
			            }    	
			             mom_ajax('C', that.pageProperty[index]['programId']+'.procBtn'+(index+1),param, function(result2, data2) {                                                                                                      
				 		  if(result2!='SUCCESS') {
			            	  momWidget.messageBox({type:'danger', width:'400', height: '145', html: multiLang.transText('MESSAGE','MSG00048')});
							  momWidget.splashHide();
				              return;
			              }    	
			                 mom_ajax('P', that.pageProperty[index]['programId']+'.procBtn'+(index+1),[], function(result3, data3) {
							    if(data[0]['p_err_code']=='E') {
						            	  momWidget.messageBox({type:'danger', width:'400', height: '145', html: multiLang.transText('MESSAGE',data[0]['p_err_code'])});
										  momWidget.splashHide();
							              return;
						         }    	
			                 }, undefined, undefined, this, false,undefined,'C'); 
			                    
						 }, undefined, undefined, this, false);    
						                      							  						
			        	callBackResult = that.checkActionCallBack(index, 'P', param, 'procBtn', your);
						if(callBackResult['result'] != 'SUCCESS') {
							  momWidget.messageBox({type:'danger', width:'400', height: '145', html: callBackResult['msg']});
							  momWidget.splashHide();
						      return;
			    		}
									 
			        	  momWidget.findBtnClicked(index, {}, true, 'procBtn',momWidget.pageProperty[index]['programId'],your);			        	  
			        	  momWidget.messageBox({type:'success', width:'400', height: '145', html: multiLang.transText('MESSAGE','MSG00001')});
						  momWidget.splashHide();
					      return;
		          }, undefined, undefined, this, false);
			      
			   }
			   else{
				             mom_ajax(actionType, that.pageProperty[index]['programId']+'.procBtn'+(index+1),param, function(result1, data1) {
								  if(result1!='SUCCESS') {
							            	  momWidget.messageBox({type:'danger', width:'400', height: '145', html: multiLang.transText('MESSAGE','MSG00049')});
											  momWidget.splashHide();
								              return;
							      } 
			                 }, undefined, undefined, this, false);    
			  } 
				
				  
					
				
			});
			$(document).on('click', '#' + saveBtnId, function(e) {
				let isCheckCol = that.gridProperty[index][0]['showRowCheckColumn']
				let checkedItems = [];
				let param = [];
				let tmpYn = 'N';
				let actionType = 'CU';		
				let queryId = that.pageProperty[index]['programId']+'.saveBtn'+(index+1);
				let targetParam ='';
				for(let i=0,max=that.buttonProperty[index].length;i<max;i++){
					if(that.buttonProperty[index][i]['buttonId']=='saveBtn'){
						targetParam = that.buttonProperty[index][i]['checkType'];	
						break;	
					}
				}
				if(targetParam=='GRID_CHECK'){
					param = that.getCheckedRowItems(that.grid[index],true);
					if(param.length==0){
						     return;
					}
				}
				else if(targetParam=='GRID_SELECT'){
					
				}
				else if(targetParam=='GRID_ALL'){
					    param = AUIGrid.getGridData(that.grid[index]);
					    if(param.length==0){
							momWidget.messageBox({type:'warning', width:'400', height: '145', html: multiLang.transText('MESSAGE','MSG00055')});
							return;
					    }
							 
				}
				else{
					if(isCheckCol == true){
					    param = that.getCheckedRowItems(that.grid[index]);
					if (param.length == 0){
						 /* checkedItems = AUIGrid.getGridData(that.grid[index]);
						  for(let i=0,max=checkedItems.length;i<max;i++){	
						     param.push(checkedItems[i]); 														
				          }*/
						  momWidget.messageBox({type:'danger', width:'400', height: '145', html: multiLang.transText('MESSAGE','MSG00034')});
					      return;	
					}				
									
				}
					else{
						
						    checkedItems = AUIGrid.getGridData(that.grid[index]);
						for(var i=0,max=checkedItems.length;i<max;i++){	
							  param.push(checkedItems[i]); 														
					    }
					}
				}
			
				 
				
		
				callInitResult = that.checkActionCallInit(index, 'GS', param, 'saveBtn', your,e);
				if(callInitResult['result'] != 'SUCCESS') {
							  momWidget.messageBox({type:'danger', width:'400', height: '145', html: callInitResult['msg']});
							  momWidget.splashHide();
						      return;
			    }
			   
			     
				 param = callInitResult['param'];
				
				 for(var i=0;i<that.buttonProperty[index].length;i++){
					if(that.buttonProperty[index][i]['buttonId'] == 'saveBtn'){
						actionType = that.buttonProperty[index][i]['eventType'];
						tmpYn = that.buttonProperty[index][i]['tempUseYn'];
						//queryId = that.pageProperty[index]['programId']+'.saveBtn'+(index+1);
						break;
					}
			
				 }	 
				 if(tmpYn =='Y'){
						 mom_ajax('D', queryId,[], function(result1, data1) {
						 if(result1!='SUCCESS') {
			            	  momWidget.messageBox({type:'danger', width:'400', height: '145', html: multiLang.transText('MESSAGE','MSG00047')});
							  momWidget.splashHide();
				              return;
			            }    	
						  mom_ajax('C', queryId,param, function(result2, data2) {
							 if(result2!='SUCCESS') {
			            	  momWidget.messageBox({type:'danger', width:'400', height: '145', html: multiLang.transText('MESSAGE','MSG00048')});
							  momWidget.splashHide();
				              return;
			            }   
							 mom_ajax('P', queryId,[], function(result3, data3) {
			            	  if(data3[0]['p_err_code']=='E') {
						         momWidget.messageBox({type:'danger', width:'400', height: '145', html: multiLang.transText('MESSAGE',data3[0]['p_err_msg'])});
			            	    //momWidget.messageBox({type:'danger', width:'400', height: '145', html: multiLang.transText('MESSAGE','MSG00049')});
								  momWidget.splashHide();
					              return;
			                  } 
			                  callBackResult = that.checkActionCallBack(index, actionType, {}, 'saveBtn', your);   				                         							  						
				        	  if(callBackResult['result'] != 'SUCCESS') {
								  momWidget.messageBox({type:'danger', width:'400', height: '145', html: callBackResult['msg']});
								  momWidget.splashHide();
							      return;
							}
						    if(your.initParam != undefined && your.initParam != ''){
				                initParam = your.initParam;
			                }
			        	  momWidget.findBtnClicked(index, initParam, false, 'findBtn',momWidget.pageProperty[index]['menuId'],your);
			        	  // $('#' +'defaultPop'+(index+1)).momModal('hide');
			        	  momWidget.messageBox({type:'success', width:'400', height: '145', html: multiLang.transText('MESSAGE','MSG00001')});
						  momWidget.splashHide();
					      return;
		          }, undefined, index, this, false,undefined,actionType);
							
							
							 }, undefined, index, this, false,undefined,'C');
				   }, undefined, index, this, false,undefined,'D');
				 }
				 else{
					  mom_ajax(actionType, queryId,param, function(result, data) {
			            if(data[0]['p_err_code']=='E') {
			            	  momWidget.messageBox({type:'danger', width:'400', height: '145', html: multiLang.transText('MESSAGE',data[0]['p_err_msg'])});
							  momWidget.splashHide();
				              return;
			            }    				                         							  						
			        	callBackResult = that.checkActionCallBack(index, 'GS', param, 'saveBtn', your);
						if(callBackResult['result'] != 'SUCCESS') {
							  momWidget.messageBox({type:'danger', width:'400', height: '145', html: callInitResult['msg']});
							  momWidget.splashHide();
						      return;
			    		}
			
						 
			        	  momWidget.findBtnClicked(index, {}, true, 'saveBtn',momWidget.pageProperty[index]['programId'],your);
			        	  
			        	  momWidget.messageBox({type:'success', width:'400', height: '145', html: multiLang.transText('MESSAGE','MSG00001')});
						  momWidget.splashHide();
					      return;
		          }, undefined, undefined, this, false);
				}
				
				  
					
				
			});
				$(document).on('click', '#' + savePopBtnId, function(e) {
				 
		        momWidget.splashShow();
	    		setTimeout(function() {	
				var param = [];
				var initParam ={};
		        let searchResult = true;
		        let popupTitle ='#'+e.target.parentElement.parentElement.parentElement.id ;
		        let tmpYn = 'N';
		        let buttonId = $('#defaultPop'+(index+1)).attr('btnId') == undefined ? 'createBtn'+(index+1):$('#defaultPop'+(index+1)).attr('btnId');
				var actionType = $('#defaultPop'+(index+1)).attr('actionType');
				var btnPopYn   = $('#defaultPop'+(index+1)).attr('btnindex') == undefined ? 'N' : 'Y';
				var btnIndex   = $('#defaultPop'+(index+1)).attr('btnindex') == undefined ? index : Number($('#defaultPop'+(index+1)).attr('btnindex'));
				var gridPopIndex   = $('#defaultPop'+(index+1)).attr('gridPopIndex') == undefined ? index+1 : Number($('#defaultPop'+(index+1)).attr('gridPopIndex'));
				var gridPopYn      = $('#defaultPop'+(index+1)).attr('gridPopIndex') == undefined ? 'N' : 'Y';
				//var btnIndex   = index;
				var queryId = that.pageProperty[index]['programId']+'.'+buttonId;
				that.wait(0.5);
				var buttonParam = [];
				var extraParam = {};
				var validateCheck = true;
				let actionMode = 'C';
				
				
					if(buttonId.indexOf('createBtn') >= 0) {
 				        actionMode = 'C';
					}
					else if(buttonId.indexOf('copyBtn') >= 0){
								actionMode = 'C';
					}
					else if(buttonId.indexOf('editBtn') >= 0){
							actionMode = 'U';
					}
					else if(buttonId.indexOf('delBtn') >= 0){
							actionMode = 'D';
					}
					else if(buttonId.indexOf('procBtn') >= 0){
							actionMode = 'P';
					}
					else{
						actionMode = 'C';
					}

		    
		    
		    
		/*
				callInitResult = that.checkActionCallInit(index, actionType, param, 'saveBtnDP', your,e);
					if(callInitResult['result'] != 'SUCCESS') {
					  momWidget.messageBox({type:'danger', width:'400', height: '145', html: callInitResult['msg']});
					  momWidget.splashHide();
				      return;
					}	
				  	param = callInitResult['param'];	*/
				
				var popupCount = that.popupProperty[index].length;
				var popupItem  = that.popupProperty[index];
				if(gridPopYn=='Y'){
					
				}
				else{
					for(var i=0,max2=popupCount;i<max2;i++){
					let fieldValue = $('#'+popupItem[i]['popupId'] +'DP'+(index+1)).val() == undefined ? '':$('#'+popupItem[i]['popupId'] +'DP'+(index+1)).val().trim();
					let fieldValues = [];
					
					if(actionType == 'C' ){		
						 let containsYn = 'Y';		
						if(that.popupProperty[index][i]['columnRequire']=='Y' && fieldValue ==''){
							 momWidget.messageBox({type:'warning', width:'400', height: '145', html: popupItem[i]['popupNm'] +' '+ multiLang.transText('MESSAGE','MSG00043')});
							 momWidget.splashHide();
				             return;
						}
					if(that.popupProperty[index][i]['popupType'] == 'S' && fieldValue !=''){
						let comboBoxItems= $('#'+popupItem[i]['popupId'] +'DP'+(index+1)).jqxComboBox('getItems');
						containsYn = 'N';
						for(var j=0,max3=comboBoxItems.length;j<max3;j++){
							if(comboBoxItems[j]['value'] == fieldValue){
								containsYn = 'Y';
							}
																			
					}
					if(containsYn == 'N'){
						 momWidget.messageBox({type:'warning', width:'400', height: '145', html: popupItem[i]['popupNm'] +'필드가 유효한값이 아닙니다!' });
						 momWidget.splashHide();
				         return;
					}
					
					}
					else if(that.popupProperty[index][i]['popupType'] == 'M' && fieldValue !=''){
						 if($('#'+popupItem[i]['popupId'] +'DP'+(index+1)).jqxComboBox('getCheckedItems').length==0){
							 momWidget.messageBox({type:'warning', width:'400', height: '145', html: popupItem[i]['popupNm'] +' '+ multiLang.transText('MESSAGE','MSG00043')});
							 momWidget.splashHide();
				             return;
						} 
						let comboBoxItems= $('#'+popupItem[i]['popupId'] +'DP'+(index+1)).jqxComboBox('getItems');
						let containsYn = 'N';
						fieldValues = $('#'+popupItem[i]['popupId'] +'DP'+(index+1)).jqxComboBox('getCheckedItems');
							for(var j=0,max3=comboBoxItems.length;j<max3;j++){
								for(var h=0,max3=fieldValues.length;h<max3;h++){
										if(comboBoxItems[j]['value'] == fieldValues[h]['value']){
										    containsYn = 'Y';
										}
								}
						
																			
							}
								if(containsYn == 'N'){
						 momWidget.messageBox({type:'warning', width:'400', height: '145', html: popupItem[i]['popupNm'] +'필드가 유효한값이 아닙니다!' });
						 momWidget.splashHide();
				         return;
					}
					}
					else if(that.popupProperty[index][i]['popupType'] == 'SS' && fieldValue !=''){
						
							var popupId = popupItem[i]['popupId'] +'DP'+(index+1);
							var searchString = $('#'+popupItem[i]['popupId'] +'DP'+(index+1)).val();
							var minLength = that.popupComboMinLength[index][popupId] ;
							var queryId2 = that.popupComboQueryId[index][popupId];
				if(searchString.length < minLength)	{
										that.messageBox({type: 'warning', width: '400', height: '145', html: that.popupComboMinLength[index][popupId] +''+ multiLang.transText('MESSAGE','MSG00050')});
										return;
							}
							
				else{
	
					 mom_ajax('R', queryId2, {"searchKey":searchString}, function(result, data) {
									searchResult = false;
							      if(result != 'SUCCESS' || data.length ==0) {		
								      that.messageBox({type: 'warning', width: '400', height: '145', html: popupItem[i]['popupNm'] +'필드가 유효한값이 아닙니다!'});					    	  
							    	  momWidget.splashHide();
								      return ;							     
							      }	
							       
							      for(var z=0,max7=data.length;z<max7;z++){
								      if(data[z]['code'] == searchString){
										   searchResult = true;
									       break;
										}

								 }
							      
							      //$('#'+popupId).jqxComboBox({source: data});
							   
		                		        momWidget.splashHide();
		                			
	    						
							      		}, undefined, undefined, that, false)
							      		
							      	
							      		
							      		
					if(!searchResult) {
						
						 return;
					}		      		
				}
				
					}	
					else if(that.popupProperty[index][i]['popupType'] == 'MS' && fieldValue !=''){
						
					}			
					else{
						
					}	
					}
					else if (actionType == 'U' ){ 
						    let containsYn = 'Y';
						    if(fieldValue =='' && that.popupProperty[index][i]['columnRequire']=='Y'){
							 momWidget.messageBox({type:'warning', width:'400', height: '145', html: popupItem[i]['popupNm'] +' '+ multiLang.transText('MESSAGE','MSG00043')});
							 momWidget.splashHide();
				             return;
						} 
						if(that.popupProperty[index][i]['popupType'] == 'S' && fieldValue !=''){
						let comboBoxItems= $('#'+popupItem[i]['popupId'] +'DP'+(index+1)).jqxComboBox('getItems');
					    containsYn = 'N';
						for(var j=0,max3=comboBoxItems.length;j<max3;j++){
							if(comboBoxItems[j]['value'] == fieldValue){
								containsYn = 'Y';
							}
																			
					}
					if(containsYn == 'N'){
						 momWidget.messageBox({type:'warning', width:'400', height: '145', html: popupItem[i]['popupNm'] +'필드가 유효한값이 아닙니다!' });
						 momWidget.splashHide();
				         return;
					}
					
					}
					else if(that.popupProperty[index][i]['popupType'] == 'M'&& fieldValue !=''){
						 if($('#'+popupItem[i]['popupId'] +'DP'+(index+1)).jqxComboBox('getCheckedItems').length==0){
							 momWidget.messageBox({type:'warning', width:'400', height: '145', html: popupItem[i]['popupNm'] +' '+ multiLang.transText('MESSAGE','MSG00043')});
							 momWidget.splashHide();
				             return;
						} 
						let comboBoxItems= $('#'+popupItem[i]['popupId'] +'DP'+(index+1)).jqxComboBox('getItems');
						let containsYn = 'N';
						fieldValues = $('#'+popupItem[i]['popupId'] +'DP'+(index+1)).jqxComboBox('getCheckedItems');
							for(var j=0,max3=comboBoxItems.length;j<max3;j++){
								for(var h=0,max3=fieldValues.length;h<max3;h++){
										if(comboBoxItems[j]['value'] == fieldValues[h]['value']){
										    containsYn = 'Y';
										}
								}
						
																			
							}
								if(containsYn == 'N'){
						 momWidget.messageBox({type:'warning', width:'400', height: '145', html: popupItem[i]['popupNm'] +'필드가 유효한값이 아닙니다!' });
						 momWidget.splashHide();
				         return;
					}
					}
		else if(that.popupProperty[index][i]['popupType'] == 'SS'&& fieldValue !=''){
						   
							var popupId = popupItem[i]['popupId'] +'DP'+(index+1);
							var searchString = $('#'+popupItem[i]['popupId'] +'DP'+(index+1)).val();
							var minLength = that.popupComboMinLength[index][popupId] ;
							var queryId2 = that.popupComboQueryId[index][popupId];
				if(searchString.length < minLength)	{
										that.messageBox({type: 'warning', width: '400', height: '145', html: that.popupComboMinLength[index][popupId] +''+ multiLang.transText('MESSAGE','MSG00050')});
										return;
							}
							
				else{
	
					 mom_ajax('R', queryId2, {"searchKey":searchString}, function(result, data) {
						 			searchResult = false;
							      if(result != 'SUCCESS' || data.length ==0) {	
								     that.messageBox({type: 'warning', width: '400', height: '145', html: popupItem[i]['popupNm'] +'필드가 유효한값이 아닙니다!'});									    	 
							    	  momWidget.splashHide();								
								      return ;							     
							      }	
							       
							      for(var z=0,max7=data.length;z<max7;z++){
								      if(data[z]['code'] == searchString){
											searchResult = true;
									       break;
										}
										
							    	  
									
									  
		                			
	    						
								 }
							      
							      //$('#'+popupId).jqxComboBox({source: data});
							   
		                		        momWidget.splashHide();
		                			
	    						
							      		}, undefined, undefined, that, false)
							      		
							      	
							      		
							      		
					if(!searchResult) {
						
						 return;
					}		      		
				}
				
					}	
					else if(that.popupProperty[index][i]['popupType'] == 'MS'&& fieldValue !=''){
						
					}			
					else{
						
					}
					}
						else if (actionType == 'CP' ){
						    if(fieldValue ==''&&that.popupProperty[index][i]['columnRequire']=='Y'){
							 momWidget.messageBox({type:'warning', width:'400', height: '145', html: popupItem[i]['popupNm'] +' '+ multiLang.transText('MESSAGE','MSG00043')});
							 momWidget.splashHide();
				             return;
						} 
						if(that.popupProperty[index][i]['popupType'] == 'S'&& fieldValue !=''){
						let comboBoxItems= $('#'+popupItem[i]['popupId'] +'DP'+(index+1)).jqxComboBox('getItems');
						let containsYn = 'N';
						for(var j=0,max3=comboBoxItems.length;j<max3;j++){
							if(comboBoxItems[j]['value'] == fieldValue){
								containsYn = 'Y';
							}
																			
					}
					if(containsYn == 'N'){
						 momWidget.messageBox({type:'warning', width:'400', height: '145', html: popupItem[i]['popupNm'] +'필드가 유효한값이 아닙니다!' });
						 momWidget.splashHide();
				         return;
					}
					
					}
					else if(that.popupProperty[index][i]['popupType'] == 'M'&& fieldValue !=''){
						 if($('#'+popupItem[i]['popupId'] +'DP'+(index+1)).jqxComboBox('getCheckedItems').length==0){
							 momWidget.messageBox({type:'warning', width:'400', height: '145', html: popupItem[i]['popupNm'] +' '+ multiLang.transText('MESSAGE','MSG00043')});
							 momWidget.splashHide();
				             return;
						} 
						let comboBoxItems= $('#'+popupItem[i]['popupId'] +'DP'+(index+1)).jqxComboBox('getItems');
						let containsYn = 'N';
						fieldValues = $('#'+popupItem[i]['popupId'] +'DP'+(index+1)).jqxComboBox('getCheckedItems');
							for(var j=0,max3=comboBoxItems.length;j<max3;j++){
								for(var h=0,max3=fieldValues.length;h<max3;h++){
										if(comboBoxItems[j]['value'] == fieldValues[h]['value']){
										    containsYn = 'Y';
										}
								}
						
																			
							}
								if(containsYn == 'N'){
						 momWidget.messageBox({type:'warning', width:'400', height: '145', html: popupItem[i]['popupNm'] +'필드가 유효한값이 아닙니다!' });
						 momWidget.splashHide();
				         return;
					}
					}
					else if(that.popupProperty[index][i]['popupType'] == 'SS'&& fieldValue !=''){
							var popupId = popupItem[i]['popupId'] +'DP'+(index+1);
							var searchString = $('#'+popupItem[i]['popupId'] +'DP'+(index+1)).val();
							var minLength = that.popupComboMinLength[index][popupId] ;
							var queryId2 = that.popupComboQueryId[index][popupId];
				if(searchString.length < minLength)	{
										that.messageBox({type: 'warning', width: '400', height: '145', html: that.popupComboMinLength[index][popupId] +''+ multiLang.transText('MESSAGE','MSG00050')});
										return;
							}
							
				else{
	
					 mom_ajax('R', queryId2, {"searchKey":searchString}, function(result, data) {
							      if(result != 'SUCCESS' || data.length ==0) {
							    	  searchResult = false;
							    	  momWidget.splashHide();
									 
								      return ;							     
							      }	
							       
							      for(var z=0,max7=data.length;z<max7;z++){
								      if(data[z]['code'] == searchString){
									       searchResult = true;
									       break;
										}
										
							    	  
									 
									  
		                			
	    						
								 }
							      
							      //$('#'+popupId).jqxComboBox({source: data});
							   
		                		        momWidget.splashHide();
		                			
	    						
							      		}, undefined, undefined, that, false)
							      		
							      	
							      		
							      		
					if(!searchResult) {
						 that.messageBox({type: 'warning', width: '400', height: '145', html: popupItem[i]['popupNm'] +'필드가 유효한값이 아닙니다!'});
						 return;
					}		      		
				}
					}	
					else if(that.popupProperty[index][i]['popupType'] == 'MS'&& fieldValue !=''){
						
					}			
					else{
						
					}
					}
					else if (actionType == 'P' ){
					if(fieldValue =='' && that.popupProperty[index][i]['columnRequire']=='Y'){
							 momWidget.messageBox({type:'warning', width:'400', height: '145', html: popupItem[i]['popupNm'] +' '+ multiLang.transText('MESSAGE','MSG00043')});
							 momWidget.splashHide();
				             return;
						} 
							if(that.popupProperty[index][i]['popupType'] == 'S'&& fieldValue !=''){
						let comboBoxItems= $('#'+popupItem[i]['popupId'] +'DP'+(index+1)).jqxComboBox('getItems');
						let containsYn = 'N';
						for(var j=0,max3=comboBoxItems.length;j<max3;j++){
							if(comboBoxItems[j]['value'] == fieldValue){
								containsYn = 'Y';
							}
																			
					}
					if(containsYn == 'N'){
						 momWidget.messageBox({type:'warning', width:'400', height: '145', html: popupItem[i]['popupNm'] +'필드가 유효한값이 아닙니다!' });
						 momWidget.splashHide();
				         return;
					}
					
					}
					else if(that.popupProperty[index][i]['popupType'] == 'M'&& fieldValue !=''){
						 if($('#'+popupItem[i]['popupId'] +'DP'+(index+1)).jqxComboBox('getCheckedItems').length==0){
							 momWidget.messageBox({type:'warning', width:'400', height: '145', html: popupItem[i]['popupNm'] +' '+ multiLang.transText('MESSAGE','MSG00043')});
							 momWidget.splashHide();
				             return;
						} 
						let comboBoxItems= $('#'+popupItem[i]['popupId'] +'DP'+(index+1)).jqxComboBox('getItems');
						let containsYn = 'N';
						fieldValues = $('#'+popupItem[i]['popupId'] +'DP'+(index+1)).jqxComboBox('getCheckedItems');
							for(var j=0,max3=comboBoxItems.length;j<max3;j++){
								for(var h=0,max3=fieldValues.length;h<max3;h++){
										if(comboBoxItems[j]['value'] == fieldValues[h]['value']){
										    containsYn = 'Y';
										}
								}
						
																			
							}
								if(containsYn == 'N'){
						 momWidget.messageBox({type:'warning', width:'400', height: '145', html: popupItem[i]['popupNm'] +'필드가 유효한값이 아닙니다!' });
						 momWidget.splashHide();
				         return;
					}
					}
					else if(that.popupProperty[index][i]['popupType'] == 'SS'&& fieldValue !=''){
							var popupId = popupItem[i]['popupId'] +'DP'+(index+1);
							var searchString = $('#'+popupItem[i]['popupId'] +'DP'+(index+1)).val();
							var minLength = that.popupComboMinLength[index][popupId] ;
							var queryId2 = that.popupComboQueryId[index][popupId];
				if(searchString.length < minLength)	{
										that.messageBox({type: 'warning', width: '400', height: '145', html: that.popupComboMinLength[index][popupId] +''+ multiLang.transText('MESSAGE','MSG00050')});
										return;
							}
							
				else{
	
					 mom_ajax('R', queryId2, {"searchKey":searchString}, function(result, data) {
							      if(result != 'SUCCESS' || data.length ==0) {
							    	  searchResult = false;
							 
								      return ;							     
							      }	
							       	searchResult = false;
							      for(var z=0,max7=data.length;z<max7;z++){
								      if(data[z]['code'] == searchString){
										   searchResult = true;
									       break;
									       
										}
										}

							      //$('#'+popupId).jqxComboBox({source: data});
							   
		                		        momWidget.splashHide();
		                			
	    						
							      		}, undefined, undefined, that, false)
							      		
							      	
							      		
							      		
					if(!searchResult) {
						 momWidget.splashHide();
						 that.messageBox({type: 'warning', width: '400', height: '145', html: popupItem[i]['popupNm'] +'필드가 유효한값이 아닙니다!'});
						 return;
					}		      		
				}
					}	
					else if(that.popupProperty[index][i]['popupType'] == 'MS'&& fieldValue !=''){
						
					}			
					else{
						
					}
						 
						
						 
					}
				
					
				   if(that.popupProperty[index][i]['popupType']=='I' || that.popupProperty[index][i]['popupType']=='D'&& fieldValue !=''){
				
						  if(isNaN(Number($('#'+popupItem[i]['popupId'] +'DP'+(index+1)).val().trim()))==true){
							  momWidget.messageBox({type:'warning', width:'400', height: '145', html: popupItem[i]['popupNm'] +' 숫자입력!'});
							 momWidget.splashHide();
				             return;
						  }
					 						
				    }
					
				}
				}
			   for(var i=0,max=that.buttonProperty[index].length;i<max;i++){
					if(that.buttonProperty[index][i]['tempUseYn'] == 'Y'){
						tmpYn = that.buttonProperty[index][i]['tempUseYn'];
						
					}					
				 }
				//if(btnIndex != undefined && btnPopYn == 'Y'){
					if(btnIndex != undefined && btnPopYn =='Y'){
					for(var i=0,max=that.buttonProperty[btnIndex].length;i<max;i++){
					if((that.buttonProperty[btnIndex][i]['buttonParameter'] != undefined && that.buttonProperty[btnIndex][i]['buttonParameter'] != '')){
						buttonParam = JSON.parse(that.buttonProperty[btnIndex][i]['buttonParameter'].replace(/\'/gi, '"'));
						break;
					}
				}
				for(var j=0,max2=buttonParam.length;j<max2;j++){
					if(buttonParam[j]['typeMap']!= undefined && buttonParam[j]['typeMap']!='' && buttonParam[j]['typeList']!= undefined && buttonParam[j]['typeList']!=''){
					
						extraParam['typeMap'] = buttonParam[j]['typeMap'];
						extraParam['typeList'] = buttonParam[j]['typeList'];
					}
				
						
					
					
				}
				
					param = buttonParam.map(function(item1){
			    var obj = that.getPopupParam(index,your,extraParam).find(function(item2){
		        return item2;
		    })
		    $.extend(item1, obj);               
			    return item1;
			});
				
				}
				else{
					    let buttonParamText = {};
					    let buttonParamList = [];
					    let buttonParamMap = {};
					    
					    param = that.getPopupParam(index,your,extraParam);
					    let actionBtnId =  buttonId.split('Btn')[0] +'saveBtnDP';
					    callInitResult = that.checkActionCallInit(index, actionType, param, actionBtnId, your,e);
							if(callInitResult['result'] != 'SUCCESS') {
								  let msgType = callInitResult['result'] == 'WARN' ? 'warning': 'danger';
									  momWidget.messageBox({type:msgType, width:'400', height: '145', html: callInitResult['msg']});
									  momWidget.splashHide();
								      return;
							}	
				param = param.map(function(item1){
			    var obj = callInitResult['param'].find(function(item2){
		        return item2;
		    })
		    $.extend(item1, obj);               
			    return item1;
			});
				  	         //  param = callInitResult['param'];	
					if(Array.isArray(param)==true){
					    param = param.length == 0 ? {}:param;					    
						//param = [Object.assign(param, that.getPopupParam(index,your,extraParam)[0])];  
					}
					else{
						// param = Object.assign(param, that.getPopupParam(index,your,extraParam)[0]);  
					}
					
					for(let i=0,max=that.buttonProperty[index].length;i<max;i++){
						if(buttonId == that.buttonProperty[index][i]['buttonId']+(index+1)){
							buttonParamText = that.buttonProperty[index][i]['buttonParameter'];
							buttonParamList = buttonParamText.split(',');
							 for(let j=0,max2=buttonParamList.length;j<max2;j++){
								   buttonParamMap[buttonParamList[j].split('=')[0]]=buttonParamList[j].split('=')[1];
							 }
							 for(let k=0,max3=param.length;k<max3;k++){
								 param[k] = Object.assign(param[k],buttonParamMap);   
							}
 						 
						}
					}
					
				
				
				}
				if(tmpYn=='Y'){
					
					 mom_ajax('D', queryId,param, function(result1, data1) {
						 if(result1!='SUCCESS') {
			            	  momWidget.messageBox({type:'danger', width:'400', height: '145', html: multiLang.transText('MESSAGE','MSG00047')});
							  momWidget.splashHide();
				              return;
			            }    	
						  mom_ajax('C', queryId,param, function(result2, data2) {
							 if(result2!='SUCCESS') {
			            	  momWidget.messageBox({type:'danger', width:'400', height: '145', html: multiLang.transText('MESSAGE','MSG00048')});
							  momWidget.splashHide();
				              return;
			            }   
							 mom_ajax('P', queryId,param, function(result3, data3) {
			            	     if(data3[0]['p_err_code']=='E') {
				                    if(data3[0]['p_err_msg'] == null || data3[0]['p_err_msg'] ==''){
					                             data3[0]['p_err_msg'] = '프로시저에러입니다!';
											}
				                  
						         momWidget.messageBox({type:'danger', width:'400', height: '145', html: multiLang.transText('MESSAGE',data3[0]['p_err_msg'])});
			            	  //momWidget.messageBox({type:'danger', width:'400', height: '145', html: multiLang.transText('MESSAGE','MSG00049')});
							  momWidget.splashHide();
				              return;
			            } 
			                callBackResult = that.checkActionCallBack(index, actionType, {}, buttonId, your);   				                         							  						
				        	if(callBackResult['result'] != 'SUCCESS') {
								  momWidget.messageBox({type:'danger', width:'400', height: '145', html: callBackResult['msg']});
								  momWidget.splashHide();
							      return;
							}
						if(your.initParam != undefined && your.initParam != ''){
				              initParam = your.initParam;
			             }
			        	  momWidget.findBtnClicked(btnIndex, initParam, false, buttonId,momWidget.pageProperty[btnIndex]['menuId'],your);
			        	 // $('#' +'defaultPop'+(index+1)).momModal('hide');
			        	  momWidget.messageBox({type:'success', width:'400', height: '145', html: multiLang.transText('MESSAGE','MSG00001')});
						  momWidget.splashHide();
					      return;
		          }, undefined, index, this, false,undefined,actionMode);
							
							
							 }, undefined, index, this, false,undefined,actionMode);
				   }, undefined, index, this, false,undefined,actionMode);
					
				}
				else{
					 mom_ajax(actionType, queryId,param, function(result, data) {
			             if(data[0]['p_err_code']=='E') {
			            	  momWidget.messageBox({type:'danger', width:'400', height: '145', html: multiLang.transText('MESSAGE',data[0]['p_err_msg'])});
							  momWidget.splashHide();
				              return;
			            } 
			               callBackResult = that.checkActionCallBack(index, actionType, {}, 'createBtn'+index, your);   				                         							  						
			        	if(callBackResult['result'] != 'SUCCESS') {
							  momWidget.messageBox({type:'danger', width:'400', height: '145', html: callBackResult['msg']});
							  momWidget.splashHide();
						      return;
						}
						if(your.initParam != undefined && your.initParam != ''){
				              initParam = your.initParam;
			             }
			        	  momWidget.findBtnClicked(btnIndex, initParam, false, 'findBtn',momWidget.pageProperty[btnIndex]['menuId'],your);
			        	 // $('#' +'defaultPop'+(index+1)).momModal('hide');
			        	  momWidget.messageBox({type:'success', width:'400', height: '145', html: multiLang.transText('MESSAGE','MSG00001')});
						  momWidget.splashHide();
					      return;
		          }, undefined, index, this, false);
				}
					
						
							 
				 },500);
				  
			
				
			});
			$(document).on('click', '#' + saveCustomPopBtnId, function(e) {				 
		        momWidget.splashShow();
	    		setTimeout(function() {	
				var param = [];
				var initParam ={};
		        let searchResult = true;
		        let popupTitle ='#'+e.target.parentElement.parentElement.parentElement.id ;
		        let tmpYn = 'N';
		        let buttonId = $('#defaultPop'+(index+1)).attr('btnId') == undefined ? 'createBtn'+(index+1):$('#defaultPop'+(index+1)).attr('btnId');
				var actionType = $('#defaultPop'+(index+1)).attr('actionType');
				var btnPopYn   = $('#defaultPop'+(index+1)).attr('btnindex') == undefined ? 'N' : 'Y';
				var btnIndex   = $('#defaultPop'+(index+1)).attr('btnindex') == undefined ? index : Number($('#defaultPop'+(index+1)).attr('btnindex'));
				var gridPopIndex   = $('#defaultPop'+(index+1)).attr('gridPopIndex') == undefined ? index+1 : Number($('#defaultPop'+(index+1)).attr('gridPopIndex'));
				var gridPopYn      = $('#defaultPop'+(index+1)).attr('gridPopIndex') == undefined ? 'N' : 'Y';
				//var btnIndex   = index;
				var queryId = that.pageProperty[index]['programId']+'.'+buttonId;
				that.wait(0.5);
				var buttonParam = [];
				var extraParam = {};
				var validateCheck = true;
				let actionMode = 'C';
				
				
					if(buttonId.indexOf('createBtn') >= 0) {
 				        actionMode = 'C';
					}
					else if(buttonId.indexOf('copyBtn') >= 0){
								actionMode = 'C';
					}
					else if(buttonId.indexOf('editBtn') >= 0){
							actionMode = 'U';
					}
					else if(buttonId.indexOf('delBtn') >= 0){
							actionMode = 'D';
					}
					else if(buttonId.indexOf('procBtn') >= 0){
							actionMode = 'P';
					}
					else{
						actionMode = 'C';
					}

		    
		    
		    
		/*
				callInitResult = that.checkActionCallInit(index, actionType, param, 'saveBtnDP', your,e);
					if(callInitResult['result'] != 'SUCCESS') {
					  momWidget.messageBox({type:'danger', width:'400', height: '145', html: callInitResult['msg']});
					  momWidget.splashHide();
				      return;
					}	
				  	param = callInitResult['param'];	*/
				
				var popupCount = that.popupProperty[index].length;
				var popupItem  = that.popupProperty[index];
				if(gridPopYn=='Y'){
					
				}
				else{
					for(var i=0,max2=popupCount;i<max2;i++){
					let fieldValue = $('#'+popupItem[i]['popupId'] +'DP'+(index+1)).val() == undefined ? '':$('#'+popupItem[i]['popupId'] +'DP'+(index+1)).val().trim();
					let fieldValues = [];
					
					if(actionType == 'C' ){		
						 let containsYn = 'Y';		
						if(that.popupProperty[index][i]['columnRequire']=='Y' && fieldValue ==''){
							 momWidget.messageBox({type:'warning', width:'400', height: '145', html: popupItem[i]['popupNm'] +' '+ multiLang.transText('MESSAGE','MSG00043')});
							 momWidget.splashHide();
				             return;
						}
					if(that.popupProperty[index][i]['popupType'] == 'S' && fieldValue !=''){
						let comboBoxItems= $('#'+popupItem[i]['popupId'] +'DP'+(index+1)).jqxComboBox('getItems');
						containsYn = 'N';
						for(var j=0,max3=comboBoxItems.length;j<max3;j++){
							if(comboBoxItems[j]['value'] == fieldValue){
								containsYn = 'Y';
							}
																			
					}
					if(containsYn == 'N'){
						 momWidget.messageBox({type:'warning', width:'400', height: '145', html: popupItem[i]['popupNm'] +'필드가 유효한값이 아닙니다!' });
						 momWidget.splashHide();
				         return;
					}
					
					}
					else if(that.popupProperty[index][i]['popupType'] == 'M' && fieldValue !=''){
						 if($('#'+popupItem[i]['popupId'] +'DP'+(index+1)).jqxComboBox('getCheckedItems').length==0){
							 momWidget.messageBox({type:'warning', width:'400', height: '145', html: popupItem[i]['popupNm'] +' '+ multiLang.transText('MESSAGE','MSG00043')});
							 momWidget.splashHide();
				             return;
						} 
						let comboBoxItems= $('#'+popupItem[i]['popupId'] +'DP'+(index+1)).jqxComboBox('getItems');
						let containsYn = 'N';
						fieldValues = $('#'+popupItem[i]['popupId'] +'DP'+(index+1)).jqxComboBox('getCheckedItems');
							for(var j=0,max3=comboBoxItems.length;j<max3;j++){
								for(var h=0,max3=fieldValues.length;h<max3;h++){
										if(comboBoxItems[j]['value'] == fieldValues[h]['value']){
										    containsYn = 'Y';
										}
								}
						
																			
							}
								if(containsYn == 'N'){
						 momWidget.messageBox({type:'warning', width:'400', height: '145', html: popupItem[i]['popupNm'] +'필드가 유효한값이 아닙니다!' });
						 momWidget.splashHide();
				         return;
					}
					}
					else if(that.popupProperty[index][i]['popupType'] == 'SS' && fieldValue !=''){
						
							var popupId = popupItem[i]['popupId'] +'DP'+(index+1);
							var searchString = $('#'+popupItem[i]['popupId'] +'DP'+(index+1)).val();
							var minLength = that.popupComboMinLength[index][popupId] ;
							var queryId2 = that.popupComboQueryId[index][popupId];
				if(searchString.length < minLength)	{
										that.messageBox({type: 'warning', width: '400', height: '145', html: that.popupComboMinLength[index][popupId] +''+ multiLang.transText('MESSAGE','MSG00050')});
										return;
							}
							
				else{
	
					 mom_ajax('R', queryId2, {"searchKey":searchString}, function(result, data) {
									searchResult = false;
							      if(result != 'SUCCESS' || data.length ==0) {		
								      that.messageBox({type: 'warning', width: '400', height: '145', html: popupItem[i]['popupNm'] +'필드가 유효한값이 아닙니다!'});					    	  
							    	  momWidget.splashHide();
								      return ;							     
							      }	
							       
							      for(var z=0,max7=data.length;z<max7;z++){
								      if(data[z]['code'] == searchString){
										   searchResult = true;
									       break;
										}

								 }
							      
							      //$('#'+popupId).jqxComboBox({source: data});
							   
		                		        momWidget.splashHide();
		                			
	    						
							      		}, undefined, undefined, that, false)
							      		
							      	
							      		
							      		
					if(!searchResult) {
						
						 return;
					}		      		
				}
				
					}	
					else if(that.popupProperty[index][i]['popupType'] == 'MS' && fieldValue !=''){
						
					}			
					else{
						
					}	
					}
					else if (actionType == 'U' ){ 
						    let containsYn = 'Y';
						    if(fieldValue =='' && that.popupProperty[index][i]['columnRequire']=='Y'){
							 momWidget.messageBox({type:'warning', width:'400', height: '145', html: popupItem[i]['popupNm'] +' '+ multiLang.transText('MESSAGE','MSG00043')});
							 momWidget.splashHide();
				             return;
						} 
						if(that.popupProperty[index][i]['popupType'] == 'S' && fieldValue !=''){
						let comboBoxItems= $('#'+popupItem[i]['popupId'] +'DP'+(index+1)).jqxComboBox('getItems');
					    containsYn = 'N';
						for(var j=0,max3=comboBoxItems.length;j<max3;j++){
							if(comboBoxItems[j]['value'] == fieldValue){
								containsYn = 'Y';
							}
																			
					}
					if(containsYn == 'N'){
						 momWidget.messageBox({type:'warning', width:'400', height: '145', html: popupItem[i]['popupNm'] +'필드가 유효한값이 아닙니다!' });
						 momWidget.splashHide();
				         return;
					}
					
					}
					else if(that.popupProperty[index][i]['popupType'] == 'M'&& fieldValue !=''){
						 if($('#'+popupItem[i]['popupId'] +'DP'+(index+1)).jqxComboBox('getCheckedItems').length==0){
							 momWidget.messageBox({type:'warning', width:'400', height: '145', html: popupItem[i]['popupNm'] +' '+ multiLang.transText('MESSAGE','MSG00043')});
							 momWidget.splashHide();
				             return;
						} 
						let comboBoxItems= $('#'+popupItem[i]['popupId'] +'DP'+(index+1)).jqxComboBox('getItems');
						let containsYn = 'N';
						fieldValues = $('#'+popupItem[i]['popupId'] +'DP'+(index+1)).jqxComboBox('getCheckedItems');
							for(var j=0,max3=comboBoxItems.length;j<max3;j++){
								for(var h=0,max3=fieldValues.length;h<max3;h++){
										if(comboBoxItems[j]['value'] == fieldValues[h]['value']){
										    containsYn = 'Y';
										}
								}
						
																			
							}
								if(containsYn == 'N'){
						 momWidget.messageBox({type:'warning', width:'400', height: '145', html: popupItem[i]['popupNm'] +'필드가 유효한값이 아닙니다!' });
						 momWidget.splashHide();
				         return;
					}
					}
		else if(that.popupProperty[index][i]['popupType'] == 'SS'&& fieldValue !=''){
						   
							var popupId = popupItem[i]['popupId'] +'DP'+(index+1);
							var searchString = $('#'+popupItem[i]['popupId'] +'DP'+(index+1)).val();
							var minLength = that.popupComboMinLength[index][popupId] ;
							var queryId2 = that.popupComboQueryId[index][popupId];
				if(searchString.length < minLength)	{
										that.messageBox({type: 'warning', width: '400', height: '145', html: that.popupComboMinLength[index][popupId] +''+ multiLang.transText('MESSAGE','MSG00050')});
										return;
							}
							
				else{
	
					 mom_ajax('R', queryId2, {"searchKey":searchString}, function(result, data) {
						 			searchResult = false;
							      if(result != 'SUCCESS' || data.length ==0) {	
								     that.messageBox({type: 'warning', width: '400', height: '145', html: popupItem[i]['popupNm'] +'필드가 유효한값이 아닙니다!'});									    	 
							    	  momWidget.splashHide();								
								      return ;							     
							      }	
							       
							      for(var z=0,max7=data.length;z<max7;z++){
								      if(data[z]['code'] == searchString){
											searchResult = true;
									       break;
										}
										
							    	  
									
									  
		                			
	    						
								 }
							      
							      //$('#'+popupId).jqxComboBox({source: data});
							   
		                		        momWidget.splashHide();
		                			
	    						
							      		}, undefined, undefined, that, false)
							      		
							      	
							      		
							      		
					if(!searchResult) {
						
						 return;
					}		      		
				}
				
					}	
					else if(that.popupProperty[index][i]['popupType'] == 'MS'&& fieldValue !=''){
						
					}			
					else{
						
					}
					}
						else if (actionType == 'CP' ){
						    if(fieldValue ==''&&that.popupProperty[index][i]['columnRequire']=='Y'){
							 momWidget.messageBox({type:'warning', width:'400', height: '145', html: popupItem[i]['popupNm'] +' '+ multiLang.transText('MESSAGE','MSG00043')});
							 momWidget.splashHide();
				             return;
						} 
						if(that.popupProperty[index][i]['popupType'] == 'S'&& fieldValue !=''){
						let comboBoxItems= $('#'+popupItem[i]['popupId'] +'DP'+(index+1)).jqxComboBox('getItems');
						let containsYn = 'N';
						for(var j=0,max3=comboBoxItems.length;j<max3;j++){
							if(comboBoxItems[j]['value'] == fieldValue){
								containsYn = 'Y';
							}
																			
					}
					if(containsYn == 'N'){
						 momWidget.messageBox({type:'warning', width:'400', height: '145', html: popupItem[i]['popupNm'] +'필드가 유효한값이 아닙니다!' });
						 momWidget.splashHide();
				         return;
					}
					
					}
					else if(that.popupProperty[index][i]['popupType'] == 'M'&& fieldValue !=''){
						 if($('#'+popupItem[i]['popupId'] +'DP'+(index+1)).jqxComboBox('getCheckedItems').length==0){
							 momWidget.messageBox({type:'warning', width:'400', height: '145', html: popupItem[i]['popupNm'] +' '+ multiLang.transText('MESSAGE','MSG00043')});
							 momWidget.splashHide();
				             return;
						} 
						let comboBoxItems= $('#'+popupItem[i]['popupId'] +'DP'+(index+1)).jqxComboBox('getItems');
						let containsYn = 'N';
						fieldValues = $('#'+popupItem[i]['popupId'] +'DP'+(index+1)).jqxComboBox('getCheckedItems');
							for(var j=0,max3=comboBoxItems.length;j<max3;j++){
								for(var h=0,max3=fieldValues.length;h<max3;h++){
										if(comboBoxItems[j]['value'] == fieldValues[h]['value']){
										    containsYn = 'Y';
										}
								}
						
																			
							}
								if(containsYn == 'N'){
						 momWidget.messageBox({type:'warning', width:'400', height: '145', html: popupItem[i]['popupNm'] +'필드가 유효한값이 아닙니다!' });
						 momWidget.splashHide();
				         return;
					}
					}
					else if(that.popupProperty[index][i]['popupType'] == 'SS'&& fieldValue !=''){
							var popupId = popupItem[i]['popupId'] +'DP'+(index+1);
							var searchString = $('#'+popupItem[i]['popupId'] +'DP'+(index+1)).val();
							var minLength = that.popupComboMinLength[index][popupId] ;
							var queryId2 = that.popupComboQueryId[index][popupId];
				if(searchString.length < minLength)	{
										that.messageBox({type: 'warning', width: '400', height: '145', html: that.popupComboMinLength[index][popupId] +''+ multiLang.transText('MESSAGE','MSG00050')});
										return;
							}
							
				else{
	
					 mom_ajax('R', queryId2, {"searchKey":searchString}, function(result, data) {
							      if(result != 'SUCCESS' || data.length ==0) {
							    	  searchResult = false;
							    	  momWidget.splashHide();
									 
								      return ;							     
							      }	
							       
							      for(var z=0,max7=data.length;z<max7;z++){
								      if(data[z]['code'] == searchString){
									       searchResult = true;
									       break;
										}
										
							    	  
									 
									  
		                			
	    						
								 }
							      
							      //$('#'+popupId).jqxComboBox({source: data});
							   
		                		        momWidget.splashHide();
		                			
	    						
							      		}, undefined, undefined, that, false)
							      		
							      	
							      		
							      		
					if(!searchResult) {
						 that.messageBox({type: 'warning', width: '400', height: '145', html: popupItem[i]['popupNm'] +'필드가 유효한값이 아닙니다!'});
						 return;
					}		      		
				}
					}	
					else if(that.popupProperty[index][i]['popupType'] == 'MS'&& fieldValue !=''){
						
					}			
					else{
						
					}
					}
					else if (actionType == 'P' ){
					if(fieldValue =='' && that.popupProperty[index][i]['columnRequire']=='Y'){
							 momWidget.messageBox({type:'warning', width:'400', height: '145', html: popupItem[i]['popupNm'] +' '+ multiLang.transText('MESSAGE','MSG00043')});
							 momWidget.splashHide();
				             return;
						} 
							if(that.popupProperty[index][i]['popupType'] == 'S'&& fieldValue !=''){
						let comboBoxItems= $('#'+popupItem[i]['popupId'] +'DP'+(index+1)).jqxComboBox('getItems');
						let containsYn = 'N';
						for(var j=0,max3=comboBoxItems.length;j<max3;j++){
							if(comboBoxItems[j]['value'] == fieldValue){
								containsYn = 'Y';
							}
																			
					}
					if(containsYn == 'N'){
						 momWidget.messageBox({type:'warning', width:'400', height: '145', html: popupItem[i]['popupNm'] +'필드가 유효한값이 아닙니다!' });
						 momWidget.splashHide();
				         return;
					}
					
					}
					else if(that.popupProperty[index][i]['popupType'] == 'M'&& fieldValue !=''){
						 if($('#'+popupItem[i]['popupId'] +'DP'+(index+1)).jqxComboBox('getCheckedItems').length==0){
							 momWidget.messageBox({type:'warning', width:'400', height: '145', html: popupItem[i]['popupNm'] +' '+ multiLang.transText('MESSAGE','MSG00043')});
							 momWidget.splashHide();
				             return;
						} 
						let comboBoxItems= $('#'+popupItem[i]['popupId'] +'DP'+(index+1)).jqxComboBox('getItems');
						let containsYn = 'N';
						fieldValues = $('#'+popupItem[i]['popupId'] +'DP'+(index+1)).jqxComboBox('getCheckedItems');
							for(var j=0,max3=comboBoxItems.length;j<max3;j++){
								for(var h=0,max3=fieldValues.length;h<max3;h++){
										if(comboBoxItems[j]['value'] == fieldValues[h]['value']){
										    containsYn = 'Y';
										}
								}
						
																			
							}
								if(containsYn == 'N'){
						 momWidget.messageBox({type:'warning', width:'400', height: '145', html: popupItem[i]['popupNm'] +'필드가 유효한값이 아닙니다!' });
						 momWidget.splashHide();
				         return;
					}
					}
					else if(that.popupProperty[index][i]['popupType'] == 'SS'&& fieldValue !=''){
							var popupId = popupItem[i]['popupId'] +'DP'+(index+1);
							var searchString = $('#'+popupItem[i]['popupId'] +'DP'+(index+1)).val();
							var minLength = that.popupComboMinLength[index][popupId] ;
							var queryId2 = that.popupComboQueryId[index][popupId];
				if(searchString.length < minLength)	{
										that.messageBox({type: 'warning', width: '400', height: '145', html: that.popupComboMinLength[index][popupId] +''+ multiLang.transText('MESSAGE','MSG00050')});
										return;
							}
							
				else{
	
					 mom_ajax('R', queryId2, {"searchKey":searchString}, function(result, data) {
							      if(result != 'SUCCESS' || data.length ==0) {
							    	  searchResult = false;
							 
								      return ;							     
							      }	
							       	searchResult = false;
							      for(var z=0,max7=data.length;z<max7;z++){
								      if(data[z]['code'] == searchString){
										   searchResult = true;
									       break;
									       
										}
										}

							      //$('#'+popupId).jqxComboBox({source: data});
							   
		                		        momWidget.splashHide();
		                			
	    						
							      		}, undefined, undefined, that, false)
							      		
							      	
							      		
							      		
					if(!searchResult) {
						 momWidget.splashHide();
						 that.messageBox({type: 'warning', width: '400', height: '145', html: popupItem[i]['popupNm'] +'필드가 유효한값이 아닙니다!'});
						 return;
					}		      		
				}
					}	
					else if(that.popupProperty[index][i]['popupType'] == 'MS'&& fieldValue !=''){
						
					}			
					else{
						
					}
						 
						
						 
					}
				
					
				   if(that.popupProperty[index][i]['popupType']=='I' || that.popupProperty[index][i]['popupType']=='D'&& fieldValue !=''){
				
						  if(isNaN(Number($('#'+popupItem[i]['popupId'] +'DP'+(index+1)).val().trim()))==true){
							  momWidget.messageBox({type:'warning', width:'400', height: '145', html: popupItem[i]['popupNm'] +' 숫자입력!'});
							 momWidget.splashHide();
				             return;
						  }
					 						
				    }
					
				}
				}
			   for(var i=0,max=that.buttonProperty[index].length;i<max;i++){
					if(that.buttonProperty[index][i]['tempUseYn'] == 'Y'){
						tmpYn = that.buttonProperty[index][i]['tempUseYn'];
						
					}					
				 }
				//if(btnIndex != undefined && btnPopYn == 'Y'){
					//if(btnIndex != undefined && btnPopYn =='Y'){
					  for(var i=0,max=that.buttonProperty[btnIndex].length;i<max;i++){
					    if((that.buttonProperty[btnIndex][i]['buttonParameter'] != undefined && that.buttonProperty[btnIndex][i]['buttonParameter'] != '')){
							buttonParam = JSON.parse(that.buttonProperty[btnIndex][i]['buttonParameter'].replace(/\'/gi, '"'));
							break;
					   }
				}
				for(var j=0,max2=buttonParam.length;j<max2;j++){
						if(buttonParam[j]['typeMap']!= undefined && buttonParam[j]['typeMap']!='' && buttonParam[j]['typeList']!= undefined && buttonParam[j]['typeList']!=''){
					
						extraParam['typeMap'] = buttonParam[j]['typeMap'];
						extraParam['typeList'] = buttonParam[j]['typeList'];
					}
						
					
					
				}
				
					param = buttonParam.map(function(item1){
			    var obj = that.getPopupParam(index,your,extraParam).find(function(item2){
		        return item2;
		    })
		    $.extend(item1, obj);               
			    return item1;
			});
				
				
			
					  
					    callInitResult = that.checkActionCallInit(index, actionType, param, 'saveBtnDP', your,e);
							if(callInitResult['result'] != 'SUCCESS') {
								  let msgType = callInitResult['result'] == 'WARN' ? 'warning': 'danger';
									  momWidget.messageBox({type:msgType, width:'400', height: '145', html: callInitResult['msg']});
									  momWidget.splashHide();
								      return;
							}	
				  	           param = callInitResult['param'];	
					if(Array.isArray(param)==true){
					    param = param.length == 0 ? {}:param;					    
						//param = [Object.assign(param, that.getPopupParam(index,your,extraParam)[0])];  
					}
					else{
						// param = Object.assign(param, that.getPopupParam(index,your,extraParam)[0]);  
					}
				
				
				
				if(tmpYn=='Y'){
					 mom_ajax('D', queryId,[], function(result1, data1) {
						 if(result1!='SUCCESS') {
			            	  momWidget.messageBox({type:'danger', width:'400', height: '145', html: multiLang.transText('MESSAGE','MSG00047')});
							  momWidget.splashHide();
				              return;
			            }    	
						  mom_ajax('C', queryId,param, function(result2, data2) {
							 if(result2!='SUCCESS') {
			            	  momWidget.messageBox({type:'danger', width:'400', height: '145', html: multiLang.transText('MESSAGE','MSG00048')});
							  momWidget.splashHide();
				              return;
			            }   
							 mom_ajax('P', queryId,[], function(result3, data3) {
			            	     if(data3[0]['p_err_code']=='E') {
						         momWidget.messageBox({type:'danger', width:'400', height: '145', html: multiLang.transText('MESSAGE',data3[0]['p_err_msg'])});
			            	  //momWidget.messageBox({type:'danger', width:'400', height: '145', html: multiLang.transText('MESSAGE','MSG00049')});
							  momWidget.splashHide();
				              return;
			            } 
			                callBackResult = that.checkActionCallBack(index, actionType, {}, buttonId, your);   				                         							  						
				        	if(callBackResult['result'] != 'SUCCESS') {
								  momWidget.messageBox({type:'danger', width:'400', height: '145', html: callBackResult['msg']});
								  momWidget.splashHide();
							      return;
							}
						if(your.initParam != undefined && your.initParam != ''){
				              initParam = your.initParam;
			             }
			        	  momWidget.findBtnClicked(btnIndex, initParam, false, buttonId,momWidget.pageProperty[btnIndex]['menuId'],your);
			        	 // $('#' +'defaultPop'+(index+1)).momModal('hide');
			        	  momWidget.messageBox({type:'success', width:'400', height: '145', html: multiLang.transText('MESSAGE','MSG00001')});
						  momWidget.splashHide();
					      return;
		          }, undefined, index, this, false,undefined,actionMode);
							
							
							 }, undefined, index, this, false,undefined,actionMode);
				   }, undefined, index, this, false,undefined,actionMode);
					
				}
				else{
					 mom_ajax(actionType, queryId,param, function(result, data) {
			             if(data[0]['p_err_code']=='E') {
			            	  momWidget.messageBox({type:'danger', width:'400', height: '145', html: multiLang.transText('MESSAGE',data[0]['p_err_msg'])});
							  momWidget.splashHide();
				              return;
			            } 
			               callBackResult = that.checkActionCallBack(index, actionType, {}, 'createBtn'+index, your);   				                         							  						
			        	if(callBackResult['result'] != 'SUCCESS') {
							  momWidget.messageBox({type:'danger', width:'400', height: '145', html: callBackResult['msg']});
							  momWidget.splashHide();
						      return;
						}
						if(your.initParam != undefined && your.initParam != ''){
				              initParam = your.initParam;
			             }
			        	  momWidget.findBtnClicked(btnIndex, initParam, false, 'findBtn',momWidget.pageProperty[btnIndex]['menuId'],your);
			        	 // $('#' +'defaultPop'+(index+1)).momModal('hide');
			        	  momWidget.messageBox({type:'success', width:'400', height: '145', html: multiLang.transText('MESSAGE','MSG00001')});
						  momWidget.splashHide();
					      return;
		          }, undefined, index, this, false);
				}
					
						
							 
				 },500);
				  
			
				
			});
			$(document).on('click', '#' + editBtnId, function(e) {	
				
				var isCheckCol = that.gridProperty[index][0]['showRowCheckColumn'];
				var param = that.getCheckedRowItems(that.grid[index]);
				var targetArray = e.target.id.split('DP');
				var buttonId = targetArray[0];
				var actionType = 'U';
		        for(var k=0,max=that.buttonProperty[index].length;k<max;k++){
					if(that.buttonProperty[index][k]['buttonId']+(index+1) == buttonId){
						actionType = that.buttonProperty[index][k]['eventType'];
						
					}
				}	
				
				if(isCheckCol == true){
					if (param.length == 0){
					  momWidget.messageBox({type:'warning', width:'400', height: '145', html: multiLang.transText('MESSAGE','MSG00034')});
					  momWidget.splashHide();
					  return;	
					}			
										
				}
				else{
				      momWidget.messageBox({type:'warning', width:'400', height: '145', html: '체크박스 설정필요!'});
					  momWidget.splashHide();
				      return;
				}
				if($('#changePwBtn'+(index+1)).length){
					 $('#changePwBtn'+(index+1)).css('display','block');
				}
				$('#' +'defaultPop'+(index+1)).momModal('show');
				that.setPopup(index,'U','editBtn'+(index+1),'N');	
				$('#defaultPop'+(index+1)).attr('actionType', actionType);
				$('#defaultPop'+(index+1)).attr('btnId', buttonId);
		
				callInitResult = that.checkActionCallInit(index, actionType, param, 'editBtn', your,param,e);
				if(callInitResult['result'] != 'SUCCESS') {
							  momWidget.messageBox({type:'danger', width:'400', height: '145', html: callInitResult['msg']});
							  momWidget.splashHide();
						      return;
			    }
				var popupTitle = that.gridExtraProperty[index]['popupTitle'];
				$('#popupTitle'+(index+1)).text('');
				$('#popupTitle'+(index+1)).append(popupTitle+'('+multiLang.transText('MESSAGE','MSG00040')+')');	

				//$('#' +'defaultPop'+(index+1)).momModal('show');
				that.htmlResize(index,your);
				//that.popUpSizeSet(index);		
				callBackResult = that.checkActionCallBack(index, actionType, {}, 'editBtn', your,param);
				if(callBackResult['result']  != 'SUCCESS') {
					  momWidget.messageBox({type:'danger', width:'400', height: '145', html: callBackResult['msg']});
					  momWidget.splashHide();
				      return;
				}					
		
					
				
			});
			$(document).on('click', '#' + delGridBtnId, function(e) {	
				that.getCheckedRowItems(that.grid[index],true);
				AUIGrid.removeCheckedRows(that.grid[index]);
			});
			$(document).on('click', '#' + delBtnId, function(e) {	
				var param = [];
				var callBackParam = {};
				let buttonId = e.target.id;
				let eventType = 'D';
				let tmpYn = 'N';
				let queryId = that.pageProperty[index]['programId']+'.delBtn'+(index+1);
			    let buttonParamText = {};
			    let buttonParamList = [];
			    let buttonParamMap = {};
			    var obj =[];
			    
			    param = that.getCheckedRowItems(that.grid[index]);
				if(param.length ==0) {
					  momWidget.messageBox({type:'warning', width:'400', height: '145', html: multiLang.transText('MESSAGE','MSG00034')});
					  momWidget.splashHide();
					  return;	
				}
				for(let i=0,max=that.buttonProperty[index].length;i<max;i++){
					if(that.buttonProperty[index][i]['buttonId']+(index+1) == buttonId){
						eventType = that.buttonProperty[index][i]['eventType'];
						tmpYn = that.buttonProperty[index][i]['tempUseYn'];
						buttonParamText = that.buttonProperty[index][i]['buttonParameter'];
						buttonParamList = buttonParamText.split(',');
						for(let j=0,max2=buttonParamList.length;j<max2;j++){
							 buttonParamMap[buttonParamList[j].split('=')[0]]=buttonParamList[j].split('=')[1];
						}
						for(let k=0,max3=param.length;k<max3;k++){
							 param[k] = Object.assign(param[k],buttonParamMap);   
						}
					}
					
				}
		
				
				  if(tmpYn=='Y'){
					   callInitResult = that.checkActionCallInit(index, 'D', param, 'delBtn', your,e);
						   if(callInitResult['result'] != 'SUCCESS') {
							          let msgType = callInitResult['result'] == 'WARN' ? 'warning': 'danger';
									  momWidget.messageBox({type:msgType, width:'400', height: '145', html: callInitResult['msg']});
									  momWidget.splashHide();
								      return;
					       }
			               mom_ajax('D', queryId,param, function(result1, data1) {
			               if(result1!='SUCCESS') {
			            	  momWidget.messageBox({type:'danger', width:'400', height: '145', html: multiLang.transText('MESSAGE','MSG00047')});
							  momWidget.splashHide();
				              return;
			               }
			               callInitResult = that.checkActionCallInit(index, 'C', param, 'delBtn', your,e);
						   if(callInitResult['result'] != 'SUCCESS') {
							          let msgType = callInitResult['result'] == 'WARN' ? 'warning': 'danger';
									  momWidget.messageBox({type:msgType, width:'400', height: '145', html: callInitResult['msg']});
									  momWidget.splashHide();
								      return;
					       }
			    	
			     		param = param.map(function(item1){
					    obj = callInitResult['param'].find(function(item2){
				        return item2;
				    })
				    $.extend(item1, obj);               
					    return item1;
					});
				 		    // param = callInitResult['param'];   	
			                 mom_ajax('C', queryId,param, function(result2, data2) {                                                                                                      
				 		     if(result2!='SUCCESS') {
			            	  momWidget.messageBox({type:'danger', width:'400', height: '145', html: multiLang.transText('MESSAGE','MSG00048')});
							  momWidget.splashHide();
				              return;
			              }    	
			                  callInitResult = that.checkActionCallInit(index, 'P', param, 'delBtn', your,e);
				              if(callInitResult['result'] != 'SUCCESS') {
					          let msgType = callInitResult['result'] == 'WARN' ? 'warning': 'danger';
							  momWidget.messageBox({type:msgType, width:'400', height: '145', html: callInitResult['msg']});
							  momWidget.splashHide();
						      return;
			       			}
			    	
			                    param = param.map(function(item1){
				                obj = callInitResult['param'].find(function(item2){
						        return item2;
						    })
						    $.extend(item1, obj);               
							    return item1;
							});
				             if(param['actionMode'] != undefined && param['actionMode'] != ''){
							     actionMode = param['actionMode'];
							 }
			                 mom_ajax('P', queryId,param, function(result3, data3) {
							    if(data3[0]['p_err_code']=='E') {
						            	  momWidget.messageBox({type:'danger', width:'400', height: '145', html: multiLang.transText('MESSAGE',data3[0]['p_err_code'])});
										  momWidget.splashHide();
							              return;
						         }    	
			                 }, undefined, undefined, this, false,undefined,'D'); 
			                    
						 }, undefined, undefined, this, false);    
						                      							  						
			        	callBackResult = that.checkActionCallBack(index, 'P', param, 'procBtn', your);
						if(callBackResult['result'] != 'SUCCESS') {
							  momWidget.messageBox({type:'danger', width:'400', height: '145', html: callBackResult['msg']});
							  momWidget.splashHide();
						      return;
			    		}
									 
			        	  momWidget.findBtnClicked(index, {}, true, 'findBtn',momWidget.pageProperty[index]['menuId'],your);			        	  
			        	  momWidget.messageBox({type:'success', width:'400', height: '145', html: multiLang.transText('MESSAGE','MSG00001')});
						  momWidget.splashHide();
					      return;
		          }, undefined, undefined, this, false);
				  }
				  else {
					    callInitResult = that.checkActionCallInit(index, eventType, param, 'delBtn', your,param,e);
						if(callInitResult['result'] != 'SUCCESS') {
									  momWidget.messageBox({type:'danger', width:'400', height: '145', html: callInitResult['msg']});
									  momWidget.splashHide();
								      return;
					    }
				      param = callInitResult['param'];	
					  mom_ajax(eventType, queryId,param, function(result, data) {
			              if(data[0]['p_err_code']=='E') {
			            	  momWidget.messageBox({type:'danger', width:'400', height: '145', html: multiLang.transText('MESSAGE',data[0]['p_err_msg'])});
							  momWidget.splashHide();
				              return;
			            }    				                         							  						
			  
						callBackResult = that.checkActionCallBack(index, eventType, {}, 'delBtn', your,param);
				        if(callBackResult['result']  != 'SUCCESS') {
							  momWidget.messageBox({type:'danger', width:'400', height: '145', html: callBackResult['msg']});
							  momWidget.splashHide();
						      return;
						}	
						  callBackParam = callBackResult['param'];	
			        	  momWidget.findBtnClicked(index, callBackParam, false, 'findBtn',momWidget.pageProperty[index]['menuId'],your);
			        	  momWidget.messageBox({type:'success', width:'400', height: '145', html: multiLang.transText('MESSAGE','MSG00001')});
						  momWidget.splashHide();
					      return;
		          }, undefined, undefined, this, false) ;
			     }
				 
				  	
			});
			$(document).on('click', '.bntpopclose, '+'#'+cancelBtnId, function() {
				$('#defaultPop'+(index+1)).momModal('hide');
				
			});
			$(document).on('click', '.bntpopclose, '+'#'+gridPopCancelBtnId, function() {
				$('#dropDownGridPop'+(index+1)).momModal('hide');
				
			});
			$(document).on('click', '#' + excelDownBtnId, function(e) {	        				
					if(your != undefined && your['excelDownCallInit'] != undefined) {
						your.excelDownCallInit(index, your);
					}					
					if(that.gridProperty[index][0]['usePaging']== true){
						//that.backWork[index] = 'Y';		    
						that.findBtnClicked(index, {}, true, 'EXCEL_DOWN',menuId,your);
						return;
	
					}	
					else{
							var excelData = AUIGrid.getGridData(that.grid[index]); 
					}		
				
					AUIGrid.setGridData(that.excelDownGrid[index], excelData);												
					var	fileName = that.pageProperty[index]['programId'] + '_' + get_current_date('yyyy-mm-dd');
				    var excelDownOpt = {fileName: fileName ,
						    		    progressBar: true,
						    		    showRowNumColumn:false,
						    		    footers: undefined,
						    		    exportWithStyle: true
				    		            };
				    
				    excelDownOpt.afterRequestCallback = function() { // 엑셀 만들고 호출되는 콜백함수
					$('.aui-grid-export-progress-modal').remove();
					// AUIGrid.GridData(that.excelGrid[index]);
					
					//$('#excelArea' + (index + 1)).remove();
					//AUIGrid.destroy(that.excelDownGrid[index]);
					//that.exceldownGrid[index] = undefined;
				}
				//option.footers = footerProperty;
				    //that.excelDownGrid[index]
					  AUIGrid.exportToXlsx("#excelGrid"+(index+1), excelDownOpt);
					  				
				$('.aui-grid-export-progress-modal').height('100%');
				$('#grid' + (index + 1)).children().append($('.aui-grid-export-progress-modal'));
			});
			
			$(document).on('click', '#' + excelTmpBtnId, function(e) {	        				
				if(your != undefined && your['excelUploadCallInit'] != undefined) {
					your.excelDownCallInit(index, your);
				}																				
				var	fileName = that.pageProperty[index]['programId'] + '_template_' + get_current_date('yyyy-mm-dd');
			    var excelDownOpt = {fileName: fileName ,
					    		    progressBar: true,
					    		    showRowNumColumn:false,
					    		    footers: undefined
			    		            };
			    
			    excelDownOpt.afterRequestCallback = function() { // 엑셀 만들고 호출되는 콜백함수
				$('.aui-grid-export-progress-modal').remove();
				// AUIGrid.clearGridData(that.excelGrid[index]);				
				//$('#excelArea' + (index + 1)).remove();
				//AUIGrid.destroy(that.excelDownGrid[index]);
				//that.exceldownGrid[index] = undefined;
			}
				  AUIGrid.exportToXlsx("#excelTmpGrid"+(index+1), excelDownOpt);
				  
			
			$('.aui-grid-export-progress-modal').height('100%');
			$('#grid' + (index + 1)).children().append($('.aui-grid-export-progress-modal'));
		});
	},
	// 팝업 파라미터 가져오기
	getPopupParam: function(index, your,extraParam) {
		  var that = this;
		  var param = {};
		  var popupId =  '';
		  var searchId = '';
		  var checkedItem = [];
		  var listItem = [];
		  var mapItem = {};
	
		  //param = that.getCheckedRowItems(index) == 'FAIL'? []:that.getCheckedRowItems(index);
		  for(var i=0;i<that.popupProperty[index].length;i++){
			    popupId = that.popupProperty[index][i]['popupId'];
			    popupType = that.popupProperty[index][i]['popupType'];
				searchId = that.popupProperty[index][i]['popupId']+'DP'+(index+1);
				that.popupProperty[index][i]['popupId']+'DP'+(index+1);
		/*	if(that.popupProperty[index][i]['popupType'] =='M' && Object.keys(extraParam).length >0){
				checkedItem = $('#'+searchId).jqxComboBox('getCheckedItems');
				for(var j=0;j<checkedItem.length;j++){
					 mapItem[popupId] = checkedItem[j]['value'];
					 mapItem['typeMap']  = extraParam['typeMap'] == undefined ? '':extraParam['typeMap'];
					 mapItem['typeList'] = extraParam['typeList'] == undefined ? '':extraParam['typeList'];
					 listItem[j] = JSON.parse(JSON.stringify(mapItem));
			
				}
			
				param[popupId]= listItem;
			}*/
				if(Object.keys(extraParam).length >0 && i==0){			
					 mapItem[popupId] = $('#'+searchId).val();
					 mapItem['typeMap']  = extraParam['typeMap'] == undefined ? '':extraParam['typeMap'];
					 mapItem['typeList'] = extraParam['typeList'] == undefined ? '':extraParam['typeList'];
					 //listItem[j] = JSON.parse(JSON.stringify(mapItem));

				
			}
			else if(Object.keys(extraParam).length >0&&i>0){
				 mapItem[popupId] = $('#'+searchId).val();
			}
		
			
				param[popupId]=$('#'+searchId).val(); 
				
			
			 if(Object.keys(extraParam).length >0 && i==(that.popupProperty[index].length)-1 ){
				param['arrayParam']= [mapItem];
			}
			  
			  if( popupType=='SS' || popupType=='MS'){
				//$('#'+searchId).jqxComboBox({source:[]});
				 // let searchMinLen = that.searchComboMinLength[index][popupId+'SP'+(index+1)];
             //$('#'+searchId).jqxComboBox({ displayMember: "label", valueMember: "code", width: 210, height: 30,dropDownHeight: 120,disabled: false,searchMode: 'containsignorecase',placeHolder: 'enter '+searchMinLen +' or more characters',minLength: searchMinLen,remoteAutoComplete: false});
			}
		  }
		  return [param];
	},
		// 엑셀 업로드 검증 팝업생성
		createExcelPopUp: function(index, your) {
			var that = this.grid == undefined ? this.momWidget : this;
			var excelUpBtnId = 'excelUpBtn' + (index + 1); 								
			
			var widthSizes = {1 : 400, 2 : 700, 3 : 776};
			var wSizeClass = {1 : 'w190', 2 : 'w190', 3 : 'w120'}
			var modalTitle ='MESSAGES12565';
			var modalId = 'listPop49';	
			
			var excelCheckModal = this.createExcelCheckPopUpHtml.modal();
			excelCheckModal = excelCheckModal.replace(/#{index}/gi, (index)).replace(/#{modalId}/gi, modalId).replace('#{modalTitle}', modalTitle);
			var rowColCount = 0;
			
			var rowHtml = '';
			var $row = null;
			var col1TextArea = '';
			var cols = null;
			
			
	
			// excelCheckModal = excelCheckModal.replace('#{context}', rowHtml);
			$('body').append(excelCheckModal);
			// $('#' + modalId).find('.panel').width('800' || '');
		    
			
			$('#cancelBtn99').on('click', function() {
				$('#' + modalId).momModal('hide');			
			});

			$('#applyBtn99').on('click', function() {
//				that.splashShow();
				var gridHeaders = AUIGrid.getColumnLayout(momWidget.grid[98]);
				for(var i = 0; i < gridHeaders.length; i++) {
					if(gridHeaders[i]['headerRenderer'] != undefined) {
						if(gridHeaders[i]['headerRenderer']['checked']) {
							AUIGrid.setHeaderRendererProp(momWidget.grid[98], i, {'checked' : false});	
						}
					}
				}
//					 for(var i = 0; i < that.columnProperty[98].length; i++) {
//						 if(that.columnProperty[98][i]['visible'] && !that.columnProperty[98][i]['popUpReq']) {
//							 AUIGrid.setHeaderRendererProp(momWidget.grid[98], checkList[i]['index'], {'checked' : false});	
//						 }
//					 }
					 
				var checkList = [];
				var list = $('#checkComboBox').jqxComboBox('getCheckedItems');
				if(list != undefined) {
					that.splashShow();
					if(list.length == 1) {
						checkList[0] = list[0]['value'];
					} else {
						$.each(list, function(index) {
							checkList.push({index: list[index]['index'], value: list[index]['value']})
						});
					
					}
				}
				for(var i = 0; i < checkList.length; i++) {
					for(var j = 0; j < gridHeaders.length; j++) {
						if(checkList[i]['value'] == gridHeaders[j]['dataField']) {
							AUIGrid.setHeaderRendererProp(momWidget.grid[98], j, {'checked' : true} );	
						}
					}
				}
				setTimeout(function() {
					that.splashHide();
				}, 100);
			});
			$('#allcheckBtn99').on('click', function() {
				that.splashShow();
				var gridHeaders = AUIGrid.getColumnLayout(momWidget.grid[98]);
				for(var i = 0; i < gridHeaders.length; i++) {
					if(gridHeaders[i]['headerRenderer'] != undefined) {
						if(!gridHeaders[i]['headerRenderer']['checked']) {
							AUIGrid.setHeaderRendererProp(momWidget.grid[98], i, {'checked' : true});	
						}
					}
				}
				setTimeout(function() {
					that.splashHide();
				}, 10);
			});
			
			$('#alluncheckBtn99').on('click', function() {
				that.splashShow();
				var gridHeaders = AUIGrid.getColumnLayout(momWidget.grid[98]);
				for(var i = 0; i < gridHeaders.length; i++) {
					if(gridHeaders[i]['headerRenderer'] != undefined) {
						if(gridHeaders[i]['headerRenderer']['checked']) {
							AUIGrid.setHeaderRendererProp(momWidget.grid[98], i, {'checked' : false});	
						}
					}
				}
				setTimeout(function() {
					that.splashHide();
				}, 10);
			});
			
			this.popUpSetting[99] = modalId;
			// $('#' + that.popUpSetting[99]).momModal('show');
			// $('#' + that.popUpSetting[index+4]).momModal('show');
			this.popUpSaveCancelBtn(98, your);
			that.splashHide();
		},
		//  RPA 엑셀 업로드 팝업생성
		createNewExcelPopUp: function(index, your) {
			var that = this.grid == undefined ? this.momWidget : this;
			var excelUpBtnId = 'excelNewUpBtn' + (index + 1); 								
			
			var widthSizes = {1 : 400, 2 : 700, 3 : 776};
			var wSizeClass = {1 : 'w190', 2 : 'w190', 3 : 'w120'}
			var modalTitle ='MESSAGES12638';
			var modalId = 'excelNewPop'+(index + 1);
			
			var excelUpModal = this.createExcelNewPopUpHtml.modal();
			excelUpModal = excelUpModal.replace(/#{index}/gi, (index+1)).replace(/#{modalId}/gi, modalId).replace('#{modalTitle}', modalTitle);
			var rowColCount = 0;
			
			var rowHtml = '';
			var $row = null;
			var col1TextArea = '';
			var cols = null;
			
			
	
			// excelCheckModal = excelCheckModal.replace('#{context}', rowHtml);
			$('body').append(excelUpModal);
			// $('#' + modalId).find('.panel').width('800' || '');
		    
			
			$('#' +'cancelBtn'+(index + 1)).on('click', function() {
				$('#' + modalId).momModal('hide');			
			});
			
		},
			// Level 3. 팝업창 생성을 위한 HTML 동적 생성, by createPopUp
			createPopUpHtml: {
				modal : function() {
					var html = 
					     '<div id="#{modalId}" class="modal gridPopup">'
						+'    <div id="panel" class="panel messagebox col2">'
						+'        <div class="panel-body">'
						+'            <div class="panelbody">'
						+'                <div class="w-clearfix panelheader panel-heading">'
						+'                    <div tmpTabId="two" data-undefined="fa-edit" class="w-icon fa fa-edit icon r5"></div>'
						+'                    <div class="textblock">#{modalTitle}</div>'
						+'                    <a href="#" class="w-inline-block bntpopclose pop-close-Btn"></a>'
						+'                </div>'
						+'                <div class="searcharea pop">'
						+'                    <div class="w-form">'
						+'                        <form name="form" id="form#{modalId}" class="form-inline" data-name="Form">'
						+'#{context}'
					   	+'                        </form>'
					   	+'                    </div>'
					   	+'                </div>'
					   	+'            </div>'
					   	+'            <div class="panelfooter">'
					   	+'              <div class="footer-pop-btn-area">'
					   	+'                <a id="saveBtnEP#{index}" href="#" class="w-inline-block btnpop pop-save-Btn">'
					   	+'                    <div class="textblock">'+multiLang.transText('MESSAGE','MSG00035')+'</div>'
					   	+'                </a>'
					   	+'                <a id="cancelBtnEP#{index}" href="#" class="w-inline-block btnpop grey pop-close-Btn">'
					   	+'                    <div class="textblock">취소</div>'
					   	+'                </a>'
					   	+'              </div>'
					   	+'            </div>'
					   	+'        </div>'
					   	+'        <div panelFooter="n" class="panel-footer hide" data-panelFooter="n"></div>'
					   	+'    </div>'
					   	+'</div>';
					
					return html;
				},
				
				row: function() {
					var html = 
						 '<div class="b5">'
						+'    <div class="w-row">'
					   	+'        '
					   	+'    </div>'
					   	+'</div>';
					
					return html;
				},
				
				col1: function() {
					var html = 
						'<ul class="w-list-unstyled">'
						+'   <li>'
						+'       <div>'
						+'           <div id="#{labelId}" class="col1-label labelbox" style="white-space: nowrap; text-overflow: ellipsis;">'
						+'               <div class="circle #{circle_require}"></div>'
						+'               <div class="textblock #{textblock_require}" title="#{headerText}">#{headerText}</div>'
						+'           </div>'
						+'       	#{editBox}'
						+'       </div>'
						+'   </li>'
						+'</ul>';
						
					return html;
				},
				
				colReq: function() {
					var html = 
						'<ul class="w-list-unstyled">'
						+'   <li>'
						+'       <div>'
						+'           <div id="#{labelId}" class="col1-label labelbox" style="white-space: nowrap; text-overflow: ellipsis;">'
						+'               <div class="circle bg-orange"></div>'
						+'               <div class="textblock orange" title="#{headerText}">#{headerText}</div>'
						+'           </div>'
						+'       	#{editBox}'
						+'       </div>'
						+'   </li>'
						+'</ul>';
					
					return html;
				},
				
				col2: function() {
					var html = 
						 '<div class="w-col w-col-6">'
						+'    <div class="w-clearfix listitem">'
						+'	    <div class="w-col w-col-5">'
						+'   	     <div id="#{labelId}" class="labelbox" style="width:100%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">'
						+'	            <div class="circle #{circle_require}"></div>'
						+'	            <div class="textblock #{textblock_require}" title="#{headerText}">#{headerText}</div>'
						+'	        </div>'
						+'       </div>'
						+'	    <div class="w-col w-col-6">'
						+'       	#{editBox}'
						+'       </div>'
						+'    </div>'
						+'</div>';
					
					return html;
				},
				
				col3: function() {
					var html =
						 '<div class="w-col w-col-'+colNum+'">'
						+'    <div class="w-clearfix listitem">'
						+'	    <div class="w-col w-col-6">'
						+'   	     <div id="#{labelId}" class="labelbox" style="width:100%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">'
						+'	            <div class="circle #{circle_require}"></div>'
						+'	            <div class="textblock #{textblock_require}" title="#{headerText}">#{headerText}</div>'
						+'	        </div>'
						+'       </div>'
						+'	    <div class="w-col w-col-6">'
						+'       	#{editBox}'
						+'       </div>'
						+'    </div>'
						+'</div>';
						
					return html;
				},
				
				input: function() {
					var html = '<input style="float:right;" maxlength="256" id="#{id}" input-type="text" type="text" class="w-input fieldbox #{wSize}" autocomplete="off"></input>';					
					return html;
				},
				
				number: function() {
					var html = '<input style="float:right;" maxlength="100" id="#{id}" input-type="text" type="text" class="w-input fieldbox #{wSize}" autocomplete="off" onkeypress="digit_check(event)" onkeyup="this.value=number_filter(this.value)"></input>';					
					return html;
				},
				
				number1: function() {
					var html = '<input style="float:right;" maxlength="1" id="#{id}" input-type="text" type="text" class="w-input fieldbox #{wSize}" autocomplete="off" onkeypress="digit_check(event)" onkeyup="this.value=number_filter(this.value)"></input>';					
					return html;
				},
				
				number4: function() {
					var html = '<input style="float:right;" maxlength="4" id="#{id}" input-type="text" type="text" class="w-input fieldbox #{wSize}" autocomplete="off" onkeypress="digit_check(event)" onkeyup="this.value=number_filter(this.value)"></input>';					
					return html;
				},
				
				number6: function() {
					var html = '<input style="float:right;" maxlength="6" id="#{id}" input-type="text" type="text" class="w-input fieldbox #{wSize}" autocomplete="off" onkeypress="digit_check(event)" onkeyup="this.value=number_filter(this.value)"></input>';					
					return html;
				},
				
				textarea: function() {
					var html = '<textarea style="resize: none;" id="#{id}" type="text" class="w-input textbox w490px"></textarea>';					
					return html;
				},
				
				select: function() {
					var html = '<select style="float:right;" id="#{id}" class="w-select fieldbox #{wSize}"></select>';					
					return html;
				},
				
				calendar: function() {
					var html = '<input style="float:right;" maxlength="256" id="#{id}" input-type="datepicker" date-format="date" class="w-input fieldbox #{wSize}" autocomplete="off"></input>';					
					return html;
				},
				
				file: function() {
					var html = '<input name="file" id="#{id}" type="file" accept="image" style="float:left; width:100%;">'
					return html;
				},
				
				password: function() {
					var html = '<input style="float:right;" maxlength="50" id="#{id}" input-type="password" type="password" class="w-input fieldbox #{wSize}"></input>';
					return html;
				}
			},
			// Level 3. 엑셀 업로드 체크 팝업창 생성을 위한 HTML 동적 생성, by excelUploadPopUp
			createExcelCheckPopUpHtml: {
				modal : function() {
				var html = 
					'<div id="listPop49" class="modal">'
				+'	<div id="panel" class="panel messagebox w85p excelCheckPopPanel">'
				+'		<div data-panelHeader="n" panelHeader="n" class="panel-heading hide">'
				+'			<h5>Panel</h5>'
				+'		</div>'
				+'		<div data-panelToolbar="n" panelToolbar="n" class="panel-toolbar hide"></div>'
				+'		<div class="panel-body panel-body">'
				+'			<div class="panelbody">'
				+'				<div class="w-clearfix panelheader panel-heading">' 
				+'					<div class="w-icon fa fa-cog icon r5"></div>'
				+'					<div multi-lang="" class="textblock">#{modalTitle}</div>'
				+'					<a href="#" class="w-inline-block bntpopclose"></a>'
				+'				</div>'	
				+'				<div class="w-clearfix cardheard"style="position: relative;height: 1.3em;">'
				+'                 <div id="expArea" style="display:inline-block;float: left;position: relative;right: -%;top: -0.8em;">'
				+'                  <div multi-lang="" id="uploadIcon"style="background-color : rgb(255 69 69);width: 50px;height: 16px;border: 1px solid gray;" class="textblock"></div>'
				+'                  <div multi-lang="" style="position: relative;top: -0.3em;" id="uploadErrorCountText" class="textblock">MESSAGES12568</div>'
				+'                  <div multi-lang=""id="uploadErrorCount"class="textblock"style="position: relative;top: -0.3em;"></div>'
				+'                  <div multi-lang=""id="uploadErrorCountText2"class="textblock"style="position: relative;top: -0.24em;">MESSAGES12569</div>'
				+'					<div class="w-clearfix combo-area" id="checkComboArea">'
//				+'						<div multi-lang="" style="display:none;" class="textblock floatl"></div>'
				+'						<select id="checkComboBox" class="w-select fieldbox small"></select>'
				+'					</div>'
				+'               </div>'
				+'				   <a id="excelDownBtn99" href="#" class="w-inline-block btntool floatr"style="position: relative;top: -1.2em;">'
				+'					<div tmpTabId="two" class="w-icon fa fa-file-excel-o icon"></div>'
				+'					<div multi-lang="" style="display:none;" class="textblock">MESSAGES10863</div>'
				+'				   </a>'
				+'					<div id="checkArea">'				
				+'			   			<a id="applyBtn99" href="#" class="w-inline-block btntool floatl"style="position: relative;top: -1.2em;">'
				+'							<div tmpTabId="two" class="w-icon fa fa-redo-o icon"></div>'
				+'							<div multi-lang="" style="display:none;" class="textblock">적용</div>'
				+'			   			</a>'
				+'			   			<a id="allcheckBtn99" href="#" class="w-inline-block btntool floatl"style="position: relative;top: -1.2em;">'
				+'							<div tmpTabId="two" class="w-icon fa fa-check-o icon"></div>'
				+'							<div multi-lang="" style="display:none;" class="textblock">All+</div>'
				+'			   			</a>'
				+'			   			<a id="alluncheckBtn99" href="#" class="w-inline-block btntool floatl"style="position: relative;top: -1.2em;">'
				+'							<div tmpTabId="two" class="w-icon fa fa-check-o icon"></div>'
				+'							<div multi-lang="" style="display:none;" class="textblock">All-</div>'
				+'			   			</a>'
				+'              	</div>'
				+'              </div>'
				+'				<div class="panelcontent2">'
				+'					<div class="calc100"style="position: relative;height: 30.8em;width: 101.5%;left: -0.7%;">'
				+'						<div class="card h150"style="position: relative;height: 100%;">'
				+'							<div class="cardcontent h100per"style="position: relative;height: 100%;">'
				+'								<div id="grid99" class="w-widget w-dyn-list w-unbound grid w-widget-auigrid"></div>'
				+'							</div>'
				+'						</div>'
				+'					</div>'
				+'				</div>	'					
				+'			</div>'
				+'			<div class="w-clearfix panelfooter paddingrl10"style="position: relative;top: -0.5em;right: 0.1%;">'
				+'			    <a id="verificationBtn99" href="#" class="w-inline-block btnpop"style="position: relative;right: -0.5%;top: 0.2em;">'
				+'                    <div multi-lang="" class="textblock">재검증</div>'
				+'              </a>'	
				+'			    <a id="excelUpConfirmBtn99" href="#" class="w-inline-block btnpop"style="position: relative;right: -0.5%;top: 0.2em;">'
				+'                    <div multi-lang="" class="textblock">MESSAGES10840</div>'
				+'              </a>'				
				+'				<a id="cancelBtn99" href="#" class="w-inline-block btnpop grey"style="position: relative;width: 6.3%;right: -0.2%;top: 0.2em;">'
				+'					<div multi-lang="" class="textblock">MESSAGES11457</div>'
				+'				</a>'			
				+'			</div>'
				+'		</div>'
				+'		<div panelFooter="n" class="panel-footer hide" data-panelFooter="n"></div>'
				+'      </div>';
					return html;
				}
				
			
			},
			// Level 3. 엑셀 업로드 rpa 팝업창 생성을 위한 HTML 동적 생성
			createExcelNewPopUpHtml: {
				modal : function() {
				var html = 
					'<div id="#{modalId}" class="modal">'
				+'  <div id="panel" class="panel messagebox w400">'
				+' 	<div data-panelHeader="n" panelHeader="n" class="panel-heading hide">'
				+'	  <h5>Panel</h5>'
				+'  </div>'
				+'	<div data-panelToolbar="n" panelToolbar="n" class="panel-toolbar hide"></div>'
				+'    <div class="panel-body">'
				+'    <div class="panelbody">'
				+'    <div class="w-clearfix panelheader panel-heading">'
				+'    <div tmpTabId="two" class="w-icon fa fa-edit icon r5"></div>'
				+'    <div multi-lang="" style="display:none;" class="textblock">MESSAGES12638</div>'
				+'    <a href="#" class="w-inline-block bntpopclose"></a>'
				+'	  </div>'
				+'    <div class="searcharea pop">'
				+'    <div class="w-form">'
				+'    <form name="form" id="form" class="form-inline" data-name="Form"></form>'
				+'    </div>'
				+' 	  </div>'
				+' 	  </div>'
				+'    <div class="panelfooter">'
				+'    <a id="saveBtnNEX#{index}" href="#" class="w-inline-block btnpop">'
				+'    <div multi-lang="" style="display:none;" class="textblock">MESSAGES11192</div>'
				+'    </a>'
				+'    <a id="cancelBtnNEX#{index}" href="#" class="w-inline-block btnpop grey">'
				+'    <div multi-lang="" style="display:none;" class="textblock">MESSAGES11457</div>'
				+'	  </a>'
				+'	  </div>'
				+'	  </div>'
				+'    <div panelFooter="n" class="panel-footer hide" data-panelFooter="n"></div>'
				+'    </div>'
				+'    </div>'
					return html;
				}
				
			
			},
			setCustomBtn: function(index,btnIndex,btnId,your,e) {
				let that = momWidget;
				let isCheckCol = that.gridProperty[index][0]['showRowCheckColumn'];
				let checkedItems = [];
				let param = [];
				let queryId = that.pageProperty[index]['menuId']+'.customBtn'+btnIndex;
				let actionType = 'R';	
				let tmpYn = 'N';
			    let callInitResult = undefined;
				let targetParam = '';
				let actionMode='R';
		        let buttonParamText = {};
			    let buttonParamList = [];
			    let buttonParamMap = {};
				let isProcess = 'Y';
				for(let i=0,max=that.buttonProperty[index].length;i<max;i++){
					if(that.buttonProperty[index][i]['buttonId']==btnId){
						targetParam = that.buttonProperty[index][i]['checkType'];	
						actionType = that.buttonProperty[index][i]['eventType'];
						break;	
					}
				}
				if(actionType !='R'){
				  if(targetParam=='GRID_CHECK'){
					    param = that.getCheckedRowItems(that.grid[index],true);
					    if(param.length==0){
						     return;
					    }
				}
				else if(targetParam=='GRID_SELECT'){
					
				}
				else if(targetParam=='GRID_ALL'){
					    param = AUIGrid.getGridData(that.grid[index]);
					    if(param.length==0){
							momWidget.messageBox({type:'warning', width:'400', height: '145', html: multiLang.transText('MESSAGE','MSG00055')});
							return;
					    }
							 
				}
				else{
						if(isCheckCol == true){
					       param = that.getCheckedRowItems(that.grid[index],true);
					       if(param.length==0){
						     return;
					       }
					   
														
						}
						else{	
							    param = AUIGrid.getGridData(that.grid[index]);
							    if(param.length==0){
								momWidget.messageBox({type:'warning', width:'400', height: '145', html: multiLang.transText('MESSAGE','MSG00034')});
								return;
							    }
							   
						}
				}
				}
				
			    for(var i=0,max=that.columnProperty[index].length;i<max;i++){
				     if(that.columnProperty[index][i]['columnRequire']=='Y'){
					      for(var j=0,max2=param.length;j<max2;j++){
						     if(param[j][that.columnProperty[index][i]['columnId']]=='' || param[j][that.columnProperty[index][i]['columnId']]==undefined){
							     momWidget.messageBox({type:'warning', width:'400', height: '145', html: that.columnProperty[index][i]['columnNm']+'필수입력!'});
								 return;
						     }
						    
						  }
					   
				     }
				}
		 		for(var i=0,max=that.buttonProperty[index].length;i<max;i++){
					if(that.buttonProperty[index][i]['buttonId']=='customBtn'+btnIndex){
						//actionType = that.buttonProperty[index][i]['eventType'];
						tmpYn = that.buttonProperty[index][i]['tempUseYn'];
						buttonParamText = that.buttonProperty[index][i]['buttonParameter'];
						buttonParamList = buttonParamText.split(',');
							 for(let j=0,max2=buttonParamList.length;j<max2;j++){
								   buttonParamMap[buttonParamList[j].split('=')[0]]=buttonParamList[j].split('=')[1];
							 }
							 for(let k=0,max3=param.length;k<max3;k++){
								 param[k] = Object.assign(param[k],buttonParamMap);   
							}
									
					}
				}
				
				
			
		       if(tmpYn =='Y'){
			  			   callInitResult = that.checkActionCallInit(index, 'D', param, btnId, your,e);
						   if(callInitResult['result'] != 'SUCCESS') {
							          let msgType = callInitResult['result'] == 'WARN' ? 'warning': 'danger';
									  momWidget.messageBox({type:msgType, width:'400', height: '145', html: callInitResult['msg']});
									  momWidget.splashHide();
								      return;
					       }
					      
					       	param = callInitResult['param'];
			        mom_ajax('D', queryId,[param[0]==undefined ? {}:param[0]], function(result1, data1) {
			               if(result1!='SUCCESS') {
			            	  momWidget.messageBox({type:'danger', width:'400', height: '145', html: multiLang.transText('MESSAGE','MSG00047')});
							  momWidget.splashHide();
				              return;
			               }
			               callInitResult = that.checkActionCallInit(index, 'C', param, btnId, your,e);
						   if(callInitResult['result'] != 'SUCCESS') {
							          let msgType = callInitResult['result'] == 'WARN' ? 'warning': 'danger';
									  momWidget.messageBox({type:msgType, width:'400', height: '145', html: callInitResult['msg']});
									  momWidget.splashHide();
								      return;
					       }
			    	
			     				param = callInitResult['param'];
				 		     //param = callInitResult['param'];  
				 		     
				 		      	
			                 mom_ajax('C', queryId,param, function(result2, data2) {                                                                                                      
				 		     if(result2!='SUCCESS') {
			            	  momWidget.messageBox({type:'danger', width:'400', height: '145', html: multiLang.transText('MESSAGE','MSG00048')});
							  momWidget.splashHide();
				              return;
			              }    	
			                  callInitResult = that.checkActionCallInit(index, 'P', param, btnId, your,e);
				              if(callInitResult['result'] != 'SUCCESS') {
					          let msgType = callInitResult['result'] == 'WARN' ? 'warning': 'danger';
							  momWidget.messageBox({type:msgType, width:'400', height: '145', html: callInitResult['msg']});
							  momWidget.splashHide();
						      return;
			       			}
			    	
			     
				             param = callInitResult['param'];
				             if(param['actionMode'] != undefined && param['actionMode'] != ''){
							     actionMode = param['actionMode'];
							 }
			                 mom_ajax('P', queryId,param[0], function(result3, data3) {
							    if(data3[0]['p_err_code']=='E') {
						            	  momWidget.messageBox({type:'danger', width:'400', height: '145', html: multiLang.transText('MESSAGE',data3[0]['p_err_msg'])});
										  momWidget.splashHide();
							              return;
						         }
						         isProcess = 'N';    	
			                 }, undefined, undefined, this, false,undefined,actionMode); 
			                    
						 }, undefined, undefined, this, false);    
						                      							  						
			        	callBackResult = that.checkActionCallBack(index, 'P', param, 'procBtn', your);
						if(callBackResult['result'] != 'SUCCESS') {
							  momWidget.messageBox({type:'danger', width:'400', height: '145', html: callBackResult['msg']});
							  momWidget.splashHide();
						      return;
			    		}
					      if( isProcess =='Y'){
						       return;
					      }	 
			        	  momWidget.findBtnClicked(index, {}, true, btnId,momWidget.pageProperty[index]['menuId'],your);			        	  
			        	  momWidget.messageBox({type:'success', width:'400', height: '145', html: multiLang.transText('MESSAGE','MSG00001')});
						  momWidget.splashHide();
					      return;
		          }, undefined, undefined, this, false);
			      
			   }
			   else{
				      	   callInitResult = that.checkActionCallInit(index, actionType, param, btnId, your,e);
						   if(callInitResult['result'] != 'SUCCESS') {
							          let msgType = callInitResult['result'] == 'WARN' ? 'warning': 'danger';
									  momWidget.messageBox({type:msgType, width:'400', height: '145', html: callInitResult['msg']});
									  momWidget.splashHide();
								      return;
					       }
			    	
			     
				      param = callInitResult['param'];
				      mom_ajax(actionType, queryId,param, function(result1, data1) {
								  if(result1!='SUCCESS') {
							            	  momWidget.messageBox({type:'danger', width:'400', height: '145', html: multiLang.transText('MESSAGE','MSG00049')});
											  momWidget.splashHide();
								              return;
							      }
							          isProcess = 'N';    	
							          momWidget.findBtnClicked(index, {}, true, btnId,momWidget.pageProperty[index]['programId'],your);			        	  
						        	  momWidget.messageBox({type:'success', width:'400', height: '145', html: multiLang.transText('MESSAGE','MSG00001')});
									  momWidget.splashHide();
								      return;
			                 }, undefined, undefined, this, false);    
			  } 
				
				  
				
				
		           
			},
			setCustomPopBtn: function(index,popupIndex,btnId,your,e) {
				let that = momWidget;
				let callbackData = [];	
				/*let targetArray = e.target.id.split('DP');
				var buttonId = targetArray[0];*/
				var actionType = $('#customPop-'+btnId).attr('actiontype');
		      	
			
				that.setPopup(index,actionType,btnId,'Y');	
				
				callInitResult = that.checkActionCallInit(index, actionType, [], btnId, your,e);
				if(callInitResult['result'] != 'SUCCESS') {
					  momWidget.messageBox({type:'warning', width:'400', height: '145', html: callInitResult['msg']});
					  momWidget.splashHide();
				      return;
				}		
		
				 $('#'+'customPop-'+btnId).momModal('show');
				 that.htmlResize(index,your);

				 callbackData   = AUIGrid.getGridData(that.grid[index]);
				 let callBackResult = that.checkActionCallBack(index, actionType, [], 'createBtn', your,callbackData);	
				 if(callBackResult['result']  != 'SUCCESS') {
					  momWidget.messageBox({type:'danger', width:'400', height: '145', html: callBackResult['msg']});
					  momWidget.splashHide();
				      return;
				}		

		           
			},
			setCustomGridPopBtn: function(index,btnIndex,btnId,your,e) {				
				let that = momWidget;	
				//that.wait(0.5);
				let totalParam = {};
				let gridPopIndex = $('#'+'gridPop-'+btnId).attr('gridIndex') == undefined ? 10:Number($('#'+'gridPop-'+btnId).attr('gridIndex')); //r그리드 id
				let actionType = 'R';
				let popupTitle = '';
				let buttonNm ='팝업타이틀';
                let popupBtnIndex = $('#grid'+gridPopIndex).length; //그리드 개수
				let queryId = that.pageProperty[index]['menuId']+'.findBtn'+gridPopIndex;
		
						  for(var i=0,max=that.buttonProperty[index].length;i<max;i++){
							 if(that.buttonProperty[index][i]['buttonId']=='customBtn'+btnIndex){
								queryId = that.buttonProperty[index][i]['popupGridId']+'.findBtn'+ gridPopIndex;
								actionType = that.buttonProperty[index][i]['eventType'];
								buttonNm = that.buttonProperty[index][i]['buttonNm'];
								if(actionType =='C'){
									$('#popupTitle'+gridPopIndex).append('('+multiLang.transText('MESSAGE','MSG00039')+')');
								}
								else if(actionType =='U'){
									$('#popupTitle'+gridPopIndex).append('('+multiLang.transText('MESSAGE','MSG00040')+')');
								}
								else if(actionType =='CP'){
									$('#popupTitle'+gridPopIndex).append('('+multiLang.transText('MESSAGE','MSG00041')+')');
								}
									
							}
						  }
						  
						 
			 	          let callInitResult = that.checkActionCallInit(index, 'C',  totalParam, 'customGridPopBtn'+btnIndex, your,e);     	
	     
			              if(callInitResult['result'] != 'SUCCESS') {
				          let msgType = callInitResult['result'] == 'WARN' ? 'warning': 'danger';
						  momWidget.messageBox({type:msgType, width:'400', height: '145', html: multiLang.transText('MESSAGE',callInitResult['msg'])});
						  momWidget.splashHide();
					      return;
			             }
			 			 totalParam = callInitResult['param'];
                         totalParam = Object.assign(totalParam, that.checkSearchParam(gridPopIndex-1,{},your));  
                         callInitResult = that.checkActionCallInit(index, 'R',  totalParam, 'customGridPopBtn'+btnIndex, your,e);     	
        	              if(callInitResult['result'] != 'SUCCESS') { 
							  momWidget.messageBox({type:'danger', width:'400', height: '145', html: callInitResult['msg']});
							  momWidget.splashHide();
						      return;
			              }
			             totalParam = Object.assign(callInitResult['param'], totalParam);   
						 mom_ajax('R', queryId, totalParam, function(result1, data1) {
							if(result1 != 'SUCCESS') {
								    	  momWidget.splashHide();
									      return;							     
							}
							
								 AUIGrid.setGridData(that.grid[gridPopIndex-1], data1); 
					
								// $('#findBtn'+gridPopIndex).attr('id','findBtn'+popupBtnIndex)
								 $('#popupTitle'+(index+1)).text(buttonNm);
								 for(let i=0;i<=10;i++){
									 if($('#grid'+(gridPopIndex+i)).length >0){
										 AUIGrid.clearFilterAll('#grid'+(gridPopIndex+i));
										 AUIGrid.clearSortingAll('#grid'+(gridPopIndex+i));
										 AUIGrid.resize('#grid'+(gridPopIndex+i));
									 }
								}
								 
								   
								 $('#'+'gridPop-'+btnId).momModal('show');
								 
								// $('#'+'gridPop-'+btnId).modal('show');
								//$('#'+'gridPop-'+btnId).draggable();
									 let  callBackResult = that.checkActionCallBack(index, 'C', totalParam, 'customBtn'+btnIndex, your,data1);     	
		    					            if(callBackResult['result'] != 'SUCCESS') {
												  momWidget.messageBox({type:'danger', width:'400', height: '145', html: callBackResult['msg']});
												  momWidget.splashHide();
											      return;
					 						}   						   	
							}, undefined, undefined, that, false);
					

		           
			},
	
	
		     // 체크된 아이템 얻기
            getSelectedItems: function(gridId) {
            	var selectedItems = AUIGrid.getSelectedItems(gridId);
            	var param = [];
            	if(selectedItems.length <= 0) {
            		return [];
            	}
            	var str = "";
            	var i, rowItem, rowInfoObj, dataField;
            	var selectionMode = AUIGrid.getProp(myGridID, "selectionMode");
            	
            	// 셀 선택모드
            	if(selectionMode == "singleCell" || selectionMode == "multipleCells") {          		
            		for(i=0; i<selectedItems.length; i++) {
            			param.push(selectedItems[i]['item']);
            		}            	
            	// 행 선택모드
            	} else if(selectionMode == "singleRow" || selectionMode == "multipleRows") {
            		for(i=0; i<selectedItems.length; i++) {
            			param.push(selectedItems[i]['item']);
            		}
            	}           	
            	return param;
            },
         // 체크된 아이템 얻기
            getCheckedRowItems: function(gridId,msgShow) {
            	var checkedItems = AUIGrid.getCheckedRowItems(gridId);
            	var param = [];
            	if(checkedItems.length <= 0) {
	                 if(msgShow){
					momWidget.messageBox({type:'warning', width:'400', height: '145', html: multiLang.transText('MESSAGE','MSG00034')});
					}
            		
      			    momWidget.splashHide();
            		return param;
            	}
            	for(var i=0;i<checkedItems.length;i++){
            		param.push(checkedItems[i]['item']);
            	}
            	return param;
            },
		// Level 2. 등록 팝업창 열기시 데이터 복사, by procCreateBtn, procEditBtn
	setPopup: function(index, type, btnId,customYn) {
			var that = this;
			var parentIndex = index['parent'] == undefined ? index : index['parent'];
			var index = index['child'] == undefined ? index : index['child'];
			var searchId = undefined;
			var dropdownId = undefined;
			var headerDropdownId = undefined;
			var groupCd = undefined;
			var searchType = undefined;
			var nameSpace  = undefined;
			var paramMap   = [];
			var splitArray1 = undefined;
			var splitArray2 = undefined;
			var searchComboMinLength={};
			var searchComboItem = {};
			var btnIndex = index+1;
			
			if(customYn =='Y'){
				var popupProperty = that.customPopupProperty;
				index =  btnId;
				btnIndex = btnId.split('customBtn')[1];
			}
			else{
				var popupProperty = that.popupProperty;
			}
			
			for(var k = 0, max = popupProperty[index].length; k< max; k++) {	
				 $('#' + popupProperty[index][k]['popupId'] + 'DP' + (index + 1)).val('');	
			}
							
			for(var i = 0, max = popupProperty[index].length; i< max; i++) {	
				popupId          = popupProperty[index][i]['popupId']+ 'DP' +  btnIndex;
				dropdownGridId   = popupProperty[index][i]['popupId']+ 'DG' +  btnIndex;
				dropdownId       = popupProperty[index][i]['dropdownId'];
				dropdownParam    = popupProperty[index][i]['dropdownParam'];
			    popupType        = popupProperty[index][i]['popupType']; 
			    nameSpace        = dropdownId.substr(0, 2);  
			    queryId          = '';
			    paramMap.length  = 0;
			    minLength        = 1;
			    searchType        = popupProperty[index][i]['popupType']; 
                defaultValue      = popupProperty[index][i]['defaultValue'];
               
	
					if(popupType == 'S'  || popupType == 'M'){
						if(dropdownId != '' && dropdownId != undefined){
							 queryId = dropdownId;
							 splitArray1 = dropdownParam.split(',');					 
							 for(var j=0,max2=splitArray1.length;j<max2;j++){
								  splitArray2 = splitArray1[j].split('=');
								  paramMap.push(JSON.parse('{"'+splitArray2[0] +'"'+':'+'"'+splitArray2[1]+'"}'));
							 }
							 
							// paramMap[i] = splitArray[0]:; 
						}
						else{
							    queryId = dropdownId;
							 //   paramMap[i] = ; 
						}
						  mom_ajax('R', nameSpace+'.'+queryId, paramMap[0] == undefined ? {}:paramMap[0], function(result, data) {
						      if(result != 'SUCCESS') {
						    	  momWidget.splashHide();
							      return;							     
						      }							  
						      	     that.searchComboItems[popupId] = data;  
						        	 $('#'+popupId).jqxComboBox({source: data});
						          // $('#'+popupId).prev().prev().attr('class','circle-dh')
						        	 if(popupType == 'S' || popupType =='M'){
							          if(defaultValue=='NULL'){
								           defaultValue='';
								           popupProperty[index][i]['defaultValue'] = '';
							          }
							          if(popupType =='M'){
								             $('#'+popupId).jqxComboBox('checkIndex', 0); 
							          }
							          else{
											// $('#'+popupId).jqxComboBox({selectedIndex: 0 });
							         }
						        		
						        	 }
						        	 else if(popupType =='DG'){
										 $('#'+popupId).jqxComboBox({disabled: true});
										 $('#'+popupId).css('background','#ededed');
									}
									else{
										
									}							        	 
						        	// $('#'+popupId).jqxComboBox('focus');
					}, undefined, undefined, that, false);
					}
				else if(popupType == 'SS' || popupType == 'MS' ){
					$('#'+popupId).jqxComboBox('clear');
				}
				else if(popupType == 'C'){
					var today = new Date();  
					var year  = undefined; // 년도
				    var month = undefined;;  // 월
				    var date  = undefined;;  // 날짜
				if(defaultValue == 'TODAY'){
					 year = today.getFullYear(); // 년도
				     month = today.getMonth() ;  // 월
				     date = today.getDate();  // 날짜
				    
				}
				else if(defaultValue == 'INIT'){
					     today = new Date(today.getFullYear(), today.getMonth(), 1);
						 year  = today.getFullYear(); // 년도
					     month = today.getMonth() ;  // 월
					     date  = today.getDate();  // 날짜
				}
				else if(defaultValue == 'LAST'){
					     today = new Date(today.getFullYear(), today.getMonth()+1, 0);
						 year  = today.getFullYear(); // 년도
					     month = today.getMonth() ;  // 월
					     date  = today.getDate();  // 날짜
				}
				else if(defaultValue.includes("TODAY") && defaultValue.length>5){
		        var dateNum  =	defaultValue.substring(5,defaultValue.length-1);
				var dateType =	defaultValue.substring(defaultValue.length,defaultValue.length-1);
				  if(dateType == 'M'){
					 today = new Date(today.setMonth(today.getMonth() +Number(dateNum)));
					 year = today.getFullYear(); // 년도
				     month = today.getMonth() ;  // 월
				     date = today.getDate();  // 날짜
				  }
				  else if (dateType == 'D'){
					 today = new Date(today.setDate(today.getDate() +Number(dateNum)));
					 year  = today.getFullYear(); // 년도
				     month = today.getMonth() ;  // 월
				     date  = today.getDate();  // 날짜
				  }
				  else{
					
				  }
				
				}
				else if(defaultValue.includes("INIT") && defaultValue.length>5){
					var dateNum  =	defaultValue.substring(4,6);
				    var dateType =	defaultValue.substring(6,7);
				    today = new Date(today.getFullYear(), today.getMonth(), 1);
				      if(dateType == 'M'){
						 today = new Date(today .setMonth(today.getMonth() +Number(dateNum)));
						 year = today.getFullYear(); // 년도
					     month = today.getMonth() ;  // 월
					     date = today.getDate();  // 날짜
				      }
					  else if (dateType == 'D'){
						 today = new Date(today.setDate(today.getDate() +Number(dateNum)));
						 year  = today.getFullYear(); // 년도
					     month = today.getMonth() ;  // 월
					     date  = today.getDate();  // 날짜
					  }
					  else{
						
					  }
				}
					else if(defaultValue.includes("LAST") && defaultValue.length>5){
					var dateNum  =	defaultValue.substring(4,6);
				    var dateType =	defaultValue.substring(6,7);
				        today    = new Date(today.getFullYear(), today.getMonth()+1, 0);
				      if(dateType == 'M'){
						 today = new Date(today .setMonth(today.getMonth() +Number(dateNum)));
						 year = today.getFullYear(); // 년도
					     month = today.getMonth() ;  // 월
					     date = today.getDate();  // 날짜
				      }
					  else if (dateType == 'D'){
						 today = new Date(today.setDate(today.getDate() +Number(dateNum)));
						 year  = today.getFullYear(); // 년도
					     month = today.getMonth() ;  // 월
					     date  = today.getDate();  // 날짜
					  }
					  else{
						
					  }
				}
			/*	else if(defaultValue.includes("-") && defaultValue.length>9){
					
				}*/
				else{ //
					 year = today.getFullYear(); // 년도
				     month = today.getMonth() ;  // 월
				     date = today.getDate();  // 날짜
				}
						
				 var calendar = new Date();
                 calendar.setFullYear(year, month, date);
				$('#'+popupId).jqxDateTimeInput({ width: '150px', height: '25px',formatString: "yyyy-MM-dd",editMode: 'full',allowNullDate: true,value: null});
				$('#'+popupId).jqxDateTimeInput('setDate', calendar);
				}
				else if (popupType == 'C-HM'){
					//$('#'+popupId).attr('value', '13:30');
					//$('#'+popupId).val('13:30');
					//$('#'+popupId).jqxDateTimeInput({ dropDownVerticalAlignment: "bottom", width: '150px', height: '25px',theme:'material',animationType: 'fade',enableBrowserBoundsDetection: true,popupZIndex: 999999});
				}
				
				}
					
			
			if(type == 'C' || type=='P') {
				for(var i = 0, max = popupProperty[index].length; i< max; i++) {
								
					if(popupProperty[index][i]['insertEditFlag'] == 'N') { // 읽기전용
						if(popupProperty[index][i]['popupType'] == 'S' || popupProperty[index][i]['popupType'] == 'M' || popupProperty[index][i]['popupType'] == 'SS' || popupProperty[index][i]['popupType'] == 'DG') { //콤보박스
						
						
							 $('#' + popupProperty[index][i]['popupId'] + 'DP' +  btnIndex).jqxComboBox({disabled: true});
							 $('#' + popupProperty[index][i]['popupId'] + 'DP' +  btnIndex).css('background','#ededed');
							 
							 
						}					
						else if(popupProperty[index][i]['popupType'] == 'C'){ //캘린더
							 $('#' + popupProperty[index][i]['popupId'] + 'DP' +  btnIndex).attr('readonly', true);
							 $('#' + popupProperty[index][i]['popupId'] + 'DP' +  btnIndex).css('background','#ededed');
							 $('#' + popupProperty[index][i]['popupId'] + 'DP' +  btnIndex).children().children().css('background','#ededed');
							 $('#' + popupProperty[index][i]['popupId'] + 'DP' +  btnIndex).jqxDateTimeInput({ disabled: true});
						}
						else{ // 텍스트
						
							 $('#' + popupProperty[index][i]['popupId'] + 'DP' +  btnIndex).attr('readonly', true);
							 $('#' + popupProperty[index][i]['popupId'] + 'DP' +  btnIndex).css('background','#ededed');
							 $('#' + popupProperty[index][i]['popupId'] + 'DP' +  btnIndex).css('color','#817b7b');
						}
					} 
					else  { // 수정가능
						if(popupProperty[index][i]['popupType'] == 'S' || popupProperty[index][i]['popupType'] == 'SS' || popupProperty[index][i]['popupType'] == 'M') { //콤보박스
							
							 $('#' + popupProperty[index][i]['popupId'] + 'DP' +  btnIndex).jqxComboBox({disabled: false});
							 $('#' + popupProperty[index][i]['popupId'] + 'DP' +  btnIndex).css('background','#fff');
							 
						}					
						else if(popupProperty[index][i]['popupType'] == 'C'){ //캘린더
							 $('#' + popupProperty[index][i]['popupId'] + 'DP' +  btnIndex).attr('readonly', false);
							 $('#' + popupProperty[index][i]['popupId'] + 'DP' +  btnIndex).css('background','#fff');
							 $('#' + popupProperty[index][i]['popupId'] + 'DP' +  btnIndex).children().children().css('background','#fff');
							 $('#' + popupProperty[index][i]['popupId'] + 'DP' +  btnIndex).jqxDateTimeInput({ disabled: false});
						}
						else{ // 텍스트

							 $('#' + popupProperty[index][i]['popupId'] + 'DP' +  btnIndex).attr('readonly', false);
							 $('#' + popupProperty[index][i]['popupId'] + 'DP' +  btnIndex).css('background','#fff');
							 $('#' + popupProperty[index][i]['popupId'] + 'DP' +  btnIndex).css('color','black');
						}
					}
				
					if(popupProperty[index][i]['defaultValue'] != '' && popupProperty[index][i]['defaultValue'] != undefined  && popupProperty[index][i]['popupType'] != 'SS'&& popupProperty[index][i]['popupType'] != 'MS'){
						     	if(popupProperty[index][i]['popupType'] == 'C' && defaultValue.includes("-") && defaultValue.length>9){							
							     $('#' + popupProperty[index][i]['popupId'] + 'DP' + btnIndex).val(popupProperty[index][i]['defaultValue']);
								}
								else if(popupProperty[index][i]['popupType'] == 'C' &&(  popupProperty[index][i]['defaultValue'].includes("INIT") ||  popupProperty[index][i]['defaultValue'].includes("LAST") ||  popupProperty[index][i]['defaultValue'].includes("TODAY"))){
									
								}
								else{
									 $('#' + popupProperty[index][i]['popupId'] + 'DP' + btnIndex).val(popupProperty[index][i]['defaultValue']);
								}
							
					}
					
				
					
				}
			}
			else if(type == 'U'){	
								
				var checkedItems = this.getCheckedRowItems(this.grid[index],true);
				for(var i = 0, max1 = checkedItems.length; i< max1; i++){
					for(var j = 0, max2 = popupProperty[index].length; j< max2; j++){
						 $('#' + popupProperty[index][j]['popupId'] + 'DP' + btnIndex).val('');		
						 if(popupProperty[index][j]['popupId'] == undefined || popupProperty[index][j]['popupId'] == ''){	
							 continue;
						 }
						 else{
							if(momWidget.popupProperty[index][j]['popupType'] =='C'){
								if(checkedItems[i][popupProperty[index][j]['popupId']] == undefined){
									continue;
								}
								checkedItems[i][popupProperty[index][j]['popupId']] = checkedItems[i][popupProperty[index][j]['popupId']].substr(0,10);
								$('#' + popupProperty[index][j]['popupId'] + 'DP' + btnIndex).val(checkedItems[i][popupProperty[index][j]['popupId']]);
							}
							else if(momWidget.popupProperty[index][j]['popupType'] =='SS'){
								$('#' + popupProperty[index][j]['popupId'] + 'DP' + btnIndex).jqxComboBox({source:[]});
								$('#' + popupProperty[index][j]['popupId'] + 'DP' + btnIndex).val(checkedItems[i][popupProperty[index][j]['popupId']]);
							}
							else{

								
								$('#' + popupProperty[index][j]['popupId'] + 'DP' + btnIndex).val(checkedItems[i][popupProperty[index][j]['popupId']]);
							}
							    
						 }
						
					}				
				}
				for(var i = 0, max3 = popupProperty[index].length; i< max3; i++) {									
					if(popupProperty[index][i]['updateEditFlag'] == 'N') { // 읽기전용
						if(popupProperty[index][i]['popupType'] == 'S' || popupProperty[index][i]['popupType'] == 'M' || popupProperty[index][i]['popupType'] == 'SS'|| popupProperty[index][i]['popupType'] == 'DG' ) { //콤보박스							
							
							 	 //$('#' + popupProperty[index][i]['popupId'] + 'DP' + (index + 1)).attr('readonly', true);
							 $('#' + popupProperty[index][i]['popupId'] + 'DP'  + btnIndex).css('background','#ededed');
							  $('#' + popupProperty[index][i]['popupId'] + 'DP' + btnIndex).jqxComboBox({disabled: true});
						}					
						else if(popupProperty[index][i]['popupType'] == 'C'){ //캘린더
							 $('#' + popupProperty[index][i]['popupId'] + 'DP' + btnIndex).attr('readonly', true);
							 $('#' + popupProperty[index][i]['popupId'] + 'DP' + btnIndex).css('background','#ededed');
							 $('#' + popupProperty[index][i]['popupId'] + 'DP' + btnIndex).children().children().css('background','#ededed');
							 $('#' + popupProperty[index][i]['popupId'] + 'DP' + btnIndex).jqxDateTimeInput({ disabled: true});
						}
						else{ // 텍스트
							 $('#' + popupProperty[index][i]['popupId'] + 'DP' + btnIndex).attr('readonly', true);
							 $('#' + popupProperty[index][i]['popupId'] + 'DP' + btnIndex).css('background','#ededed');
							 $('#' + popupProperty[index][i]['popupId'] + 'DP' + btnIndex).css('color','#817b7b');
						}
					} 
					else{ // 수정가능
						if(popupProperty[index][i]['popupType'] == 'S' || popupProperty[index][i]['popupType'] == 'SS' ||popupProperty[index][i]['popupTpe'] == 'M' || popupProperty[index][i]['popupType'] == 'DG') { //콤보박스							
							 $('#' + popupProperty[index][i]['popupId'] + 'DP' + btnIndex).jqxComboBox({disabled: false});
							 $('#' + popupProperty[index][i]['popupId'] + 'DP' + btnIndex).css('background','#fff');
							 
						}					
						else if(popupProperty[index][i]['popupType'] == 'C'){ //캘린더
							 $('#' + popupProperty[index][i]['popupId'] + 'DP' + btnIndex).attr('readonly', false);
							 $('#' + popupProperty[index][i]['popupId'] + 'DP' + btnIndex).css('background','#fff');
							 $('#' + popupProperty[index][i]['popupId'] + 'DP' + btnIndex).children().children().css('background','#fff');
							 $('#' + popupProperty[index][i]['popupId'] + 'DP' + btnIndex).jqxDateTimeInput({ disabled: false});
						}
						else{ // 텍스트
							 $('#' + popupProperty[index][i]['popupId'] + 'DP' + btnIndex).attr('readonly', false);
							 $('#' + popupProperty[index][i]['popupId'] + 'DP' + btnIndex).css('background','#fff');
							 $('#' + popupProperty[index][i]['popupId'] + 'DP' + btnIndex).css('color','black');							 
						}
					}
					
				}
				
			}
				else if (type =='P'){
				var checkedItems = this.getCheckedRowItems('#grid'+(parentIndex+1),false);
				if(checkedItems.length ==0){
					return 'FAIL';
				}
				for(var i = 0, max1 = checkedItems.length; i< max1; i++){
					for(var j = 0, max2 = popupProperty[index].length; j< max2; j++){
						// $('#' + popupProperty[index][j]['popupId'] + 'DP' + (index + 1)).val('');	
						 if(popupProperty[index][j]['popupId'] == undefined || popupProperty[index][j]['popupId'] == ''){	
							 continue;
						 }
						 else{
								if(momWidget.popupProperty[index][j]['popupType'] =='C'){
									if(checkedItems[i][popupProperty[index][j]['popupId']] == undefined){
									continue;
								}
								checkedItems[i][popupProperty[index][j]['popupId']] = checkedItems[i][popupProperty[index][j]['popupId']].substr(0,10);
								$('#' + popupProperty[index][j]['popupId'] + 'DP' + btnIndex).val(checkedItems[i][popupProperty[index][j]['popupId']]);
							}
							else{
								$('#' + popupProperty[index][j]['popupId'] + 'DP' + btnIndex).val(checkedItems[i][popupProperty[index][j]['popupId']]);
							}
							   
						 }
						
					}				
				}
				for(var i = 0, max3 = popupProperty[index].length; i< max3; i++) {						
					if(popupProperty[index][i]['insertEditFlag'] == 'N') { // 읽기전용
						if(popupProperty[index][i]['popupType'] == 'S' || popupProperty[index][i]['popupType'] == 'M' || popupProperty[index][i]['popupType'] == 'SS') { //콤보박스							
							 $('#' + popupProperty[index][i]['popupId'] + 'DP' + btnIndex).jqxComboBox({disabled: true});
							 $('#' + popupProperty[index][i]['popupId'] + 'DP' + btnIndex).css('background','#ededed');
							 
						}					
						else if(popupProperty[index][i]['popupType'] == 'C'){ //캘린더
							 $('#' + popupProperty[index][i]['popupId'] + 'DP' + btnIndex).attr('readonly', true);
							 $('#' + popupProperty[index][i]['popupId'] + 'DP' + btnIndex).css('background','#ededed');
							 $('#' + popupProperty[index][i]['popupId'] + 'DP' + btnIndex).children().children().css('background','#ededed');
							 $('#' + popupProperty[index][i]['popupId'] + 'DP' + btnIndex).jqxDateTimeInput({ disabled: true});
						}
						else{ // 텍스트
							 $('#' + popupProperty[index][i]['popupId'] + 'DP' + btnIndex).attr('readonly', true);
							 $('#' + popupProperty[index][i]['popupId'] + 'DP' + btnIndex).css('background','#ededed');
						}
					} 
					else{ // 수정가능
						if(popupProperty[index][i]['popupType'] == 'S' || popupProperty[index][i]['popupType'] == 'M') { //콤보박스							
							 $('#' + popupProperty[index][i]['popupId'] + 'DP' + btnIndex).jqxComboBox({disabled: false});
							 $('#' + popupProperty[index][i]['popupId'] + 'DP' + btnIndex).css('background','#fff');
							 
						}					
						else if(popupProperty[index][i]['popupType'] == 'C'){ //캘린더
							 $('#' + popupProperty[index][i]['popupId'] + 'DP' + btnIndex).attr('readonly', false);
							 $('#' + popupProperty[index][i]['popupId'] + 'DP' + btnIndex).css('background','#fff');
							 $('#' + popupProperty[index][i]['popupId'] + 'DP' + btnIndex).children().children().css('background','#fff');
							 $('#' + popupProperty[index][i]['popupId'] + 'DP' + btnIndex).jqxDateTimeInput({ disabled: false});
						}
						else{ // 텍스트
							 $('#' + popupProperty[index][i]['popupId'] + 'DP' + btnIndex).attr('readonly', false);
							 $('#' + popupProperty[index][i]['popupId'] + 'DP' + btnIndex).css('background','#fff');
							 $('#' + popupProperty[index][i]['popupId'] + 'DP' + btnIndex).css('color','black');
						}
					}
						if(popupProperty[index][i]['defaultValue'] != '' && popupProperty[index][i]['defaultValue'] != undefined  && popupProperty[index][i]['popupType'] != 'SS'&& popupProperty[index][i]['popupType'] != 'MS'){
						     	if(popupProperty[index][i]['popupType'] == 'C' && defaultValue.includes("-") && defaultValue.length>9){							
							     $('#' + popupProperty[index][i]['popupId'] + 'DP' + btnIndex).val(popupProperty[index][i]['defaultValue']);
								}
								else if(popupProperty[index][i]['popupType'] == 'C' &&(  popupProperty[index][i]['defaultValue'].includes("INIT") ||  popupProperty[index][i]['defaultValue'].includes("LAST") ||  popupProperty[index][i]['defaultValue'].includes("TODAY"))){
									
								}
								else{
									 $('#' + popupProperty[index][i]['popupId'] + 'DP' + btnIndex).val(popupProperty[index][i]['defaultValue']);
								}
							
					}
					
				}
				
			}
			else if (type =='CP'){
				var checkedItems = this.getCheckedRowItems(this.grid[index],false);
				for(var i = 0, max1 = checkedItems.length; i< max1; i++){
					for(var j = 0, max2 = popupProperty[index].length; j< max2; j++){
						 $('#' + popupProperty[index][j]['popupId'] + 'DP' + btnIndex).val('');	
						 if(popupProperty[index][j]['popupId'] == undefined || popupProperty[index][j]['popupId'] == ''){	
							 continue;
						 }
						 else{
								if(momWidget.popupProperty[index][j]['popupType'] =='C'){
									if(checkedItems[i][popupProperty[index][j]['popupId']] == undefined){
									continue;
								}
								checkedItems[i][popupProperty[index][j]['popupId']] = checkedItems[i][popupProperty[index][j]['popupId']].substr(0,10);
								$('#' + popupProperty[index][j]['popupId'] + 'DP' + btnIndex).val(checkedItems[i][popupProperty[index][j]['popupId']]);
							}
							else{
								$('#' + popupProperty[index][j]['popupId'] + 'DP' + btnIndex).val(checkedItems[i][popupProperty[index][j]['popupId']]);
							}
							   
						 }
						
					}				
				}
				for(var i = 0, max3 = popupProperty[index].length; i< max3; i++) {						
					if(popupProperty[index][i]['insertEditFlag'] == 'N') { // 읽기전용
						if(popupProperty[index][i]['popupType'] == 'S' || popupProperty[index][i]['popupType'] == 'M' || popupProperty[index][i]['popupType'] == 'SS'|| popupProperty[index][i]['popupType'] == 'DG') { //콤보박스							
							 $('#' + popupProperty[index][i]['popupId'] + 'DP' + btnIndex).jqxComboBox({disabled: true});
							 $('#' + popupProperty[index][i]['popupId'] + 'DP' + btnIndex).css('background','#ededed');
							 
						}					
						else if(popupProperty[index][i]['popupType'] == 'C'){ //캘린더
							 $('#' + popupProperty[index][i]['popupId'] + 'DP' + btnIndex).attr('readonly', true);
							 $('#' + popupProperty[index][i]['popupId'] + 'DP' + btnIndex).css('background','#ededed');
							 $('#' + popupProperty[index][i]['popupId'] + 'DP' + btnIndex).children().children().css('background','#ededed');
							 $('#' + popupProperty[index][i]['popupId'] + 'DP' + btnIndex).jqxDateTimeInput({ disabled: true});
						}
						else{ // 텍스트
							 $('#' + popupProperty[index][i]['popupId'] + 'DP' + btnIndex).attr('readonly', true);
							 $('#' + popupProperty[index][i]['popupId'] + 'DP' + btnIndex).css('background','#ededed');
						}
					} 
					else{ // 수정가능
						if(popupProperty[index][i]['popupType'] == 'S' || popupProperty[index][i]['popupType'] == 'M'|| popupProperty[index][i]['popupType'] == 'DG'|| popupProperty[index][i]['popupType'] == 'SS') { //콤보박스							
							 $('#' + popupProperty[index][i]['popupId'] + 'DP' + btnIndex).jqxComboBox({disabled: false});
							 $('#' + popupProperty[index][i]['popupId'] + 'DP' + btnIndex).css('background','#fff');
							 
						}					
						else if(popupProperty[index][i]['popupType'] == 'C'){ //캘린더
							 $('#' + popupProperty[index][i]['popupId'] + 'DP' + btnIndex).attr('readonly', false);
							 $('#' + popupProperty[index][i]['popupId'] + 'DP' + btnIndex).css('background','#fff');
							 $('#' + popupProperty[index][i]['popupId'] + 'DP' + btnIndex).children().children().css('background','#fff');
							 $('#' + popupProperty[index][i]['popupId'] + 'DP' + btnIndex).jqxDateTimeInput({ disabled: false});
						}
						else{ // 텍스트
							 $('#' + popupProperty[index][i]['popupId'] + 'DP' + btnIndex).attr('readonly', false);
							 $('#' + popupProperty[index][i]['popupId'] + 'DP' + btnIndex).css('background','#fff');
							  $('#' + popupProperty[index][i]['popupId'] + 'DP'+ btnIndex).css('color','black');
						}
					}
					
				}
				
			}
			else{
				
			}
			
			
			
		    $( "#defaultPop"+(index+1)).draggable();
			$( ".customPop").draggable();
			
		},
	
		
		// Level2, 팝업창 크기 조절, by procCreateBtn, procEditBtn
		popUpSizeSet: function(index) {
			var $popup = $('#' + this.popUpSetting[index]);
			var labelWidth = $popup.find('.listitem .w-col.w-col-4, .listitem .w-col.w-col-5').width();
			var col1Size = $popup.find('.listitem .w-col.w-col-4').width() / 4;
			col1Size = col1Size < 1 ?  $popup.find('.listitem .w-col.w-col-5').width() / 5 : col1Size;
			
			$popup.find('.col1-label').width(labelWidth);
			$popup.find('textarea').width('calc(100% - ' + (labelWidth + col1Size) + 'px)');
		},
	// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 팡업창 닫기 버튼 관련
	// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// cancelBtn3, bntpopclose
	procPopUpCancelBtn: function(index, your) {
		var that = this;
		
		var cancelBtn3Id = 'cancelBtn' + (index + 1);
		var isExist = document.getElementById(cancelBtn3Id);		
		if(isExist != undefined) {
			$(document).on('click', '.bntpopclose, #cancelBtn' + (index + 1), function() {
				$('#listPop' + (index / 2)).momModal('hide');
				if(your != undefined && your.popUpCancelBtnCallBack != undefined) {
					your.popUpCancelBtnCallBack(index);
				}
				if(your != undefined && your.currentEnterKeyIndex != undefined) {
					your.currentEnterKeyIndex = 0;
				}
			});
		}
	},
	// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Edit 버튼 관련
	// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Edit 버튼 이벤트 핸들러
	procEditBtn: function(index, your) {
		var that = this.grid == undefined ? this.momWidget : this;
		
		if(that.gridProperty[index]['editId'] == undefined || that.gridProperty[index]['editId'] == false || that.gridProperty[index]['editId'] == '') {
			return;
		}
		
		// var editPop = document.getElementById('editPop' + (index + 1));
		
		// 그리드 edit버튼
		$(document).on('click', '.GridEditBtn' + (index + 1), function(e) {
			// console.time('TOBE 등록창 열기');
			/*
			 * if(that.popUpSetting == undefined || that.popUpSetting[index] ==
			 * undefined) { that.messageBox({type:'warning', width:'400',
			 * height: '145', html: '팝업창을 준비중입니다.<br />1 ~ 2 초 뒤에 다시 이용해 주시기
			 * 바랍니다.'}); return; }
			 */
			
			var rowIndex = $(this).attr('row-index');		 		
			var selectedItem = AUIGrid.getItemByRowIndex(that.grid[index], rowIndex);	
			that.createPopUp(index, your);
			that.popUpDataSetCopy(index, 'EDIT', selectedItem);
			
			var message = that.procCallInit(index, 'CW', {param : selectedItem, callBackParam : undefined}, {index : index, op : 'editBtn' + (index + 1)}, your);
			if(message != 'SUCCESS') {
				that.splashHide();
				that.messageBox({type:'warning', width:'400', height: '145',  html: message});
				
				return;
			}
			
			$('#' + that.popUpSetting[index]).momModal('show');
			that.popUpSizeSet(index);	
			if(your != undefined && your.createCallBack != undefined) {
				your.createCallBack(index, selectedItem, undefined, {index : index, op : 'editBtn' + (index + 1)});
			}
		});
	},
	
	// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 복사 팝업창 관련
	// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 복사버튼 이벤트 핸들러
	procCopyBtn: function(index, your) {
		var that = this.grid == undefined ? this.momWidget : this;
		
		var copyBtnId = 'copyBtn' + (index + 1);
		
		var linkCopyBtn = 'linkCopyBtn' + (index + 1); 
		var isExist = document.getElementById(copyBtnId);		
		
		if(isExist != undefined) {
			$(document).on('click', '#' + copyBtnId, function(e) {
				var selectedItem = AUIGrid.getCheckedRowItems(that.grid[index],true);
				if(selectedItem.length < 1) {
					that.messageBox({type:'warning', width:'400', height: '145', html:Language.lang['MESSAGES10491']});					
					return;
				}
				
				if(selectedItem.length > 1) {
					that.messageBox({type:'warning', width:'400', height: '145', html:Language.lang['MESSAGES11603']});					
					return;
				}
				
				/*
				 * if(that.popUpSetting == undefined || that.popUpSetting[index] ==
				 * undefined) { that.messageBox({type:'warning', width:'400',
				 * height: '145', html: '팝업창을 준비중입니다.<br />1 ~ 2 초 뒤에 다시 이용해
				 * 주시기 바랍니다.'}); return; }
				 */
				
				// start / SMTP관리 발송 목록 복사 시 SMTP ID는 팝업 항목에 값 복사하지 않도록 / ljw
				if(selectedItem[0].item.smtpId != undefined && index == 0) {
					delete selectedItem[0].item.smtpId;
				}
				// end
				
				selectedItem = 	selectedItem[0].item;
				
				that.createPopUp(index, your);
				
				that.popUpDataSetCopy(index, 'COPY', selectedItem);
				
				var message = that.procCallInit(index, 'CW', {param : selectedItem, callBackParam : undefined}, {index : index, op : 'copyBtn' + (index + 1)}, your);
				if(message != 'SUCCESS') {
					that.splashHide();
					that.messageBox({type:'warning', width:'400', height: '145',  html: message});
					
					return;
				}
				
				$('#' + that.popUpSetting[index]).momModal('show');
				that.popUpSizeSet(index);	
				
				if(your != undefined && your.createCallBack != undefined) {
					your.createCallBack(index, selectedItem, undefined, {index : index, op : 'copyBtn' + (index + 1)});
				}
			});
		}
		
		isExist = document.getElementById(linkCopyBtn);		
		if(isExist != undefined) {
			$(document).on('click', '#' + linkCopyBtn, function(e) {
				var selectedItem = AUIGrid.getCheckedRowItems(that.grid[index],true);
				if(selectedItem.length < 1) {
					that.messageBox({type:'warning', width:'400', height: '145', html:Language.lang['MESSAGES10491']});					
					return;
				}
				
				if(selectedItem.length > 1) {
					that.messageBox({type:'warning', width:'400', height: '145', html:Language.lang['MESSAGES11603']});					
					return;
				}
				
				selectedItem = 	selectedItem[0].item;
				
				that.createPopUp(index, your);
				that.popUpDataSetCopy(index, 'COPY', selectedItem);
				
				var message = that.procCallInit(index, 'CW', {param : selectedItem, callBackParam : undefined}, {index : index, op : 'linkCopyBtn' + (index + 1)}, your);
				if(message != 'SUCCESS') {
					that.splashHide();
					that.messageBox({type:'warning', width:'400', height: '145',  html: message});
					
					return;
				}
				
				$('#' + that.popUpSetting[index]).momModal('show');
				that.popUpSizeSet(index);
				
				if(your != undefined && your.createCallBack != undefined) {
					your.createCallBack(index, selectedItem, undefined, {index : index, op : 'linkCopyBtn' + (index + 1)});
				}
			});
		}
		
		var downBtnId = 'downBtn' + (index + 1);
		isExist = document.getElementById(downBtnId);
		
		if(isExist != undefined) {
			$(document).on('click', '#' + downBtnId, function(e) {
				var selectedItems1 = AUIGrid.getCheckedRowItems(that.grid[index],true);
				if(selectedItems1.length < 1) {
					that.messageBox({type:'warning', width:'400', height: '145', html: Language.lang['MESSAGES11610']});					
					return;
				}
				
				var selectedItems = [];
				for(var i = 0; i < selectedItems1.length; i++) {
					selectedItems[i] = selectedItems1[i].item;
				}
				
				AUIGrid.clearGridData(that.grid[index + 1]);
				setTimeout(function() {
					AUIGrid.setGridData(that.grid[index + 1], selectedItems);
				}, 0);	
			});
		}
	},
	  // ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 엑셀업로드 유효성체크(숫자 유효성 체크)
	isNumeric: function(num, opt){
		  // 좌우 trim(공백제거)을 해준다.
		  num = String(num).replace(/^\s+|\s+$/g, '').replace(/\,/g,'').replace(/\./g,'');
		/*  if(num.charAt(num.length-1) == '.') {
			  num = num.substr(0, num.length-1);
		  }*/
		/*  if(typeof opt == "undefined" || opt == "1"){
		    // 모든 10진수 (부호 선택, 자릿수구분기호 선택, 소수점 선택)
		    var regex = /^[+\-]?(([1-9][0-9]{0,2}(,[0-9]{10})*)|[0-9]+){1}(\.[0-9]+)?$/g;
		  }else if(opt == "2"){
		    // 부호 미사용, 자릿수구분기호 선택, 소수점 선택
		    var regex = /^(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+){1}(\.[0-9]+)?$/g;
		  }else if(opt == "3"){
		    // 부호 미사용, 자릿수구분기호 미사용, 소수점 선택
		    var regex = /^[0-9]+(\.[0-9]+)?$/g;
		  }else{
		    // only 숫자만(부호 미사용, 자릿수구분기호 미사용, 소수점 미사용)
		    var regex = /^[0-9]$/g;
		  }*/
		  return isNaN(num) == false ? true : false;
		/*  if(regex.test(parseFloat(num))){
		    num = num.replace(/,/g, "");
		    return isNaN(num) ? false : true;
		  }else{ return false;  }*/
		},
	// 엑셀업로드 유효성체크(날짜 유효성체크)
    dateCheck: function(dateStr,dateCheckParam) 	
	 {   
    	if(dateStr==null || dateStr==''||dateStr==undefined||(this.isNumeric(dateStr)))
    		{
    		 return false;
    		}
		if(dateStr.indexOf("-") != -1)
			{
			var array = [];
			array = dateStr.split("-");
			var year = parseInt(array[0]); // 입력한 값의 0~4자리까지 (연)
		  var month = parseInt(array[1]); // 입력한 값의 4번째 자리부터 2자리 숫자 (월)
		  var day = parseInt(array[2]); // 입력한 값 6번째 자리부터 2자리 숫자 (일)
		  var today = new Date(); // 날짜 변수 선언
		  var yearNow = today.getFullYear(); // 올해 연도 가져옴
			}
	    else if(dateStr.indexOf("/") != -1){
		      var array = [];
		      array = dateStr.split("/");
		     var year = parseInt('20'+array[2]); // 입력한 값의 0~4자리까지 (연)
	  var month = parseInt(array[0]); // 입력한 값의 4번째 자리부터 2자리 숫자 (월)
	  var day = parseInt(array[1]); // 입력한 값 6번째 자리부터 2자리 숫자 (일)
	  var today = new Date(); // 날짜 변수 선언
	  var yearNow = today.getFullYear(); // 올해 연도 가져옴
	}
	    else if(!(this.isNumeric(dateStr)))
	    	{
	    	
	    	  return false;
	    	}
	else
		{
		
		var year = parseInt(dateStr.substr(0,4)); // 입력한 값의 0~4자리까지 (연)
	  var month = parseInt(dateStr.substr(4,2)); // 입력한 값의 4번째 자리부터 2자리 숫자
													// (월)
	  var day = parseInt(dateStr.substr(6,2)); // 입력한 값 6번째 자리부터 2자리 숫자 (일)
	  var today = new Date(); // 날짜 변수 선언
	  var yearNow = today.getFullYear(); // 올해 연도 가져옴
		}
	  if(dateCheckParam!='-1')
		  {
			  var year2 = parseInt(dateCheckParam.substr(0,4)); // 입력한 값의
																// 0~4자리까지 (연)
			  var month2 = parseInt(dateCheckParam.substr(4,2)); // 입력한 값의
																	// 4번째 자리부터
																	// 2자리 숫자
																	// (월)
			  var day2 = parseInt(dateCheckParam.substr(6,2)); // 입력한 값 6번째
																// 자리부터 2자리 숫자
																// (일)
			  var today2 = new Date(); // 날짜 변수 선언
			  var yearNow2 = today.getFullYear(); // 올해 연도 가져옴
			  if(year==year2 && month==month2) // 넘겨받은 년월과 일치하는지 검사
				  {
				    
				  }
			  else
				  {
				    return false;
				  }
			  
		   }
		
	  
	  if (dateStr.length <=11) { // 연도의 경우 1900 보다 작거나 yearNow 보다 크다면 false를
									// 반환합니다.
	  if (20 > year){ return false; }
	  else if (month < 1 || month > 12) { return false; }
	  else if (day < 1 || day > 31) { return false; }
	  else if ((month==4 || month==6 || month=='요청일' || month==11) && day==31) { return false; }
	  else if (month == 2) { var isleap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)); 
	  						 if (day>29 || (day==29 && !isleap)) { return false; } 
	  						 else {
	  							 return true; }  
	  						 }

	  else { return true; }
	  // end of if } else { //1.입력된 생년월일이 8자 초과할때 : auth:false return false; }
		// }
	  }
	  },
	// 엑셀 업로드 유효성 체크
	excelUpDataCheck: function(gridName, dateCheckParam, checkedHeader) {
		var that = this;
		var requiredCell ="";
		var requiredCellFlag="";
		var excelHideCellFlag;
		var dataTypeText="";
		var dataTypeFlag=false;
		var selectedRecord="";
		var recordCount=0;
		var columnLayout = checkedHeader == undefined ? AUIGrid.getColumnLayout(gridName) : checkedHeader;
	
		 if(checkedHeader != undefined) {
			 for(var i = 0; i < AUIGrid.getColumnLayout(gridName).length; i++) {
				 AUIGrid.setColumnPropByDataField(gridName, AUIGrid.getColumnLayout(gridName)[i].dataField, { 		    	
						styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
							return '';
						}
					 });
			 }
			
		 }
		for(var j=0; j<columnLayout.length;j++)
		{				
		 requiredCellFlag = columnLayout[j].excelTemplateHide;
		 excelHideCellFlag = columnLayout[j].excelHide;     
		 requiredCell = columnLayout[j].dataField;
		 if(excelHideCellFlag == true) {
			 if(checkedHeader != undefined) {
				 AUIGrid.setColumnPropByDataField(gridName, requiredCell, { 		    	
						styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
							for(var i = 0; i < columnLayout.length; i++) {
								if(dataField == columnLayout[i]['dataField']) {
									dataTypeText = columnLayout[i].formatString;
									if(dataTypeText==undefined) { //문자
										dataTypeFlag=false;
									} else if(dataTypeText=='yyyy-mm-dd') { // 날짜
										dataTypeFlag=false;					 
									} else { //숫자
										dataTypeFlag=true;
									}
									 
									if(value == null || value== undefined || value== '' || that.isNumeric(value) != dataTypeFlag) {  // null 또는 숫자																												
									   if(dataTypeText == undefined) {
											 return '';	
									   } else if(dataTypeText=='yyyy-mm-dd' && (value!=''&& value!= undefined)&& that.dateCheck(value,dateCheckParam)) { // 날짜타입
											 if(this.excelTemplateHide==true || this.excelTemplateHide==1||this.excelTemplateHide==0||this.excelTemplateHide==2) {
												 return '';	 
											 } else {			
												 return 'NotPassStyle';	
											 }
									   } else {	
										   if(this.excelTemplateHide==true || this.excelTemplateHide==1) {
											   if((this.excelTemplateHide==2|| this.excelTemplateHide==0)&&(value == null || value== undefined || value== '')) {
												   return '';
											   } else if(value==0&&dataTypeText!='yyyy-mm-dd') {
												   return '';
											   } else {
												   if(dataTypeText!='yyyy-mm-dd'&&dataTypeText!=undefined&&value!=undefined) {
													   var lastChar = value.substring(value.length-1, value.length);
													   if(lastChar=='.'||lastChar==',') {
														   return '';
													   } else {
														   return 'NotPassStyle';
													   }
												   } else {
													   return 'NotPassStyle';
												   }
											   }
										   } else if(this.excelTemplateHide==0 ) {
												 if((value == null || value== undefined || value== '')) {
													 return '';
												 } else {
													 if(((this.excelTemplateHide==0)&&(value == null || value== undefined || value== ''))||that.isNumeric(value) != dataTypeFlag) {
														 return '';
													 } else {
														 return 'NotPassStyle';
													 }
													      
												 }	
											} else {
												if(this.formatString==undefined || this.formatString=='yyyy-mm-dd') {
													return '';
												} else if(dataTypeFlag==true&&(value== undefined || value == 0)) {	
													return '';
												} else {
													return 'NotPassStyle';
												}
											}
								    	           		                    								 
										}		
										
							       } else {	
							    	   if(dataTypeText=='yyyy-mm-dd') { // 날짜일떄
							    		   if(!that.dateCheck(value,dateCheckParam)) {	
												return 'NotPassStyle';
											} else {
												return '';
											}
											    
										} else {// 일반문자일떄
											return '';
										}
						    	   }	
								}
							}
							
						}
					});	
		    	} else {
		    		AUIGrid.setColumnPropByDataField(gridName, requiredCell, { 		    	
						styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
							dataTypeText = columnLayout[columnIndex].formatString;
							if(dataTypeText==undefined) { //문자
								dataTypeFlag=false;
							} else if(dataTypeText=='yyyy-mm-dd') { // 날짜
								dataTypeFlag=false;					 
							} else { //숫자
								dataTypeFlag=true;
							}
							 
							if(value == null || value== undefined || value== '' || that.isNumeric(value) != dataTypeFlag) {  // null 또는 숫자																												
							   if(dataTypeText == undefined) {
									 return '';	
							   } else if(dataTypeText=='yyyy-mm-dd' && (value!=''&& value!= undefined)&& that.dateCheck(value,dateCheckParam)) { // 날짜타입
									 if(this.excelTemplateHide==true || this.excelTemplateHide==1||this.excelTemplateHide==0||this.excelTemplateHide==2) {
										 return '';	 
									 } else {			
										 return 'NotPassStyle';	
									 }
							   } else {	
								   if(this.excelTemplateHide==true || this.excelTemplateHide==1) {
									   if((this.excelTemplateHide==2|| this.excelTemplateHide==0)&&(value == null || value== undefined || value== '')) {
										   return '';
									   } else if(value==0&&dataTypeText!='yyyy-mm-dd') {
										   return '';
									   } else {
										   if(dataTypeText!='yyyy-mm-dd'&&dataTypeText!=undefined&&value!=undefined) {
											   var lastChar = value.substring(value.length-1, value.length);
											   if(lastChar=='.'||lastChar==',') {
												   return '';
											   } else {
												   return 'NotPassStyle';
											   }
										   } else {
											   return 'NotPassStyle';
										   }
									   }
								   } else if(this.excelTemplateHide==0 ) {
										 if((value == null || value== undefined || value== '')) {
											 return '';
										 } else {
											 if(((this.excelTemplateHide==0)&&(value == null || value== undefined || value== ''))||that.isNumeric(value) != dataTypeFlag) {
												 return '';
											 } else {
												 return 'NotPassStyle';
											 }
											      
										 }	
									} else {
										if(this.formatString==undefined || this.formatString=='yyyy-mm-dd') {
											return '';
										} else if(dataTypeFlag==true&&(value== undefined || value == 0)) {	
											return '';
										} else {
											return 'NotPassStyle';
										}
									}
						    	           		                    								 
								}		
								
					       } else {	
					    	   if(dataTypeText=='yyyy-mm-dd') { // 날짜일떄
					    		   if(!that.dateCheck(value,dateCheckParam)) {	
										return 'NotPassStyle';
									} else {
										return '';
									}
									    
								} else {// 일반문자일떄
									return '';
								}
				    	   }
						}
					});	
		    	}
		 	}
		}
		
	}, 
	// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Excel Download 관련
	// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	// 엑셀 다운로드 버튼 핸들러
	procExcelDownAll: function(index, pageId1, your) {
		var that = this.grid == undefined ? this.momWidget : this;
		
		var excelDownAllBtnId = 'excelDownAllBtn' + (index + 1);
		var isExist = document.getElementById(excelDownAllBtnId);
		if(isExist != undefined) {
			const pageId = pageId1;
			$(document).on('click', '#' + excelDownAllBtnId, function(e) {
				var options = [];
				var fileName = '';
				for(var index2 = 0; index2 < that.excelGrid.length; index2++) {
					if(that.grid[index2] == undefined) {
						continue;
					}
					
					const index1 = index2;
					if(that.excelGrid[index1] == undefined) {
						if(that.columnProperty[index1] == undefined) {
							continue;
						} else {
							$('body').append('<div id="temp_div2_' + (index1 + 1) + '" style="width:100%; position:fixed; height:100%; /*z-index: -999;*/ top:0px"><div id="excelGrid' + (index1 + 1)  + '"></div></div>');
							
							if(JSON.stringify(that.columnProperty[index1]).length < 4) {
								continue;
							}
							
							var excelProperty1 = JSON.parse(JSON.stringify(that.columnProperty[index1]));
							for(var i = excelProperty1.length - 1; i >= 0 ; i--) {
								if(!excelProperty1[i]['excelHide']) {
									excelProperty1.splice(i, 1);
								} else if(!excelProperty1[i]['visible']) {
									excelProperty1[i]['visible'] = true;
								}
							}
							
							const excelProperty = excelProperty1;							
							that.excelGrid[index1] = AUIGrid.create('#excelGrid' + (index1 + 1), excelProperty, {showRowNumColumn: false});
						}
					}
					
					if(that.excelGrid[index1] != undefined && that.entireDatas[index1] != undefined) {
						AUIGrid.setGridData(that.excelGrid[index1], that.entireDatas[index1]);	
					}
					
					if(fileName == '') {
						fileName = pageId + '_' + get_current_date('yyyy-mm-dd');
					}
					
					var option = {sheetName: 'Sheet' + (index1 + 1), fileName: fileName};
					options.push(option);
				}
				
				options.afterRequestCallback = function() { // 엑셀 만들고 호출되는 콜백함수
					$('.aui-grid-export-progress-modal').remove();
					
					for(var index1 = 0; index1 < that.excelGrid.length; index1++) {
						if(that.excelGrid[index1] != undefined) {
							$('#temp_div2_' + (index1 + 1)).remove();
							AUIGrid.destroy(that.excelGrid[index1]);
							that.excelGrid[index1] = undefined
						}
					}
				}
				
				options.progressBar = true;
				
				var start = 0;				
				var excelGrids = [];
				for(var index1 = start + 1; index1 < that.excelGrid.length; index1++) {
					if(that.excelGrid[index1] != undefined) {
						excelGrids.push(that.excelGrid[index1]);
					}
				}
				
				AUIGrid.exportToXlsxMulti(that.excelGrid[start], excelGrids, options);
				
				$('.aui-grid-export-progress-modal').height('100%');
				$('#grid' + (index + 1)).children().append($('.aui-grid-export-progress-modal'));				
			});
		}
	},
	objectInitialize: function(obj) {
		let self = this;
        self.obj = obj;
        
       $.each(obj, function (item_name, item) {


        let datatype = $.type(item);

 

        if (datatype == "number")
            self.obj[item_name] = 0;   // 정수는 0 으로 초기화


        else if (datatype == "string")
            self.obj[item_name] = '';   // 문자는 '' 으로 초기화


        else if (datatype == "boolean")
            self.obj[item_name] = false;   // boolean 는 false 으로 초기화


        else if (datatype == "array")
            self.obj[item_name] = [];   // 배열은 [] 으로 초기화


        else if (datatype == "object") {
            if (deep)   // deep 적용 : object 를 다시 $.ObjectInitialize 를 호출하여 초기화 한다.
                $.ObjectInitialize(self.obj[item_name]);
            else
                self.obj[item_name] = {};   // object는  {} 으로 초기화
        }


    });

    return self.obj;
		
	},	
	procExcelDownAll2: function(index, pageId1, your) {
		var that = this.grid == undefined ? this.momWidget : this;
		
		var excelDownAll2BtnId = 'excelDownAll2Btn' + (index + 1);
		var isExist = document.getElementById(excelDownAll2BtnId);
		if(isExist != undefined) {
			const pageId = pageId1;
			var options = [];
			var fileName = '';
			for(var index2 = 0; index2 < that.excelGrid.length; index2++) {
				if(that.grid[index2] == undefined) {
					continue;
				}
				
				const index1 = index2;				
				if(that.excelGrid[index1] == undefined) {
					if(that.columnProperty[index1] == undefined) {
						continue;
					} else {
						$('body').append('<div id="temp_div2_' + (index1 + 1) + '" style="width:100%; position:fixed; height:100%; z-index: -999; top:0px"><div id="excelGrid' + (index1 + 1)  + '"></div></div>');
						
						var excelProperty1 = JSON.parse(JSON.stringify(that.columnProperty[index1]));
						for(var i = excelProperty1.length - 1; i >= 0 ; i--) {
							if(!excelProperty1[i]['excelHide']) {
								excelProperty1.splice(i, 1);
							} else if(!excelProperty1[i]['visible']) {
								excelProperty1[i]['visible'] = true;
							}
						}
						
						const excelProperty = excelProperty1;
						that.excelGrid[index1] = AUIGrid.create('#excelGrid' + (index1 + 1), excelProperty, {showRowNumColumn: false});
					}
				}
				
				AUIGrid.setGridData(that.excelGrid[index1], that.entireDatas[index1]);					
				if(fileName == '') {
					fileName = pageId + '_' + get_current_date('yyyy-mm-dd');
				}
				
				var option = {sheetName: 'Sheet' + (index1 + 1), fileName: fileName};
				options.push(option);
			}
			
			options.afterRequestCallback = function() { 
				$('.aui-grid-export-progress-modal').remove();
				
				for(var index1 = 0; index1 < that.excelGrid.length; index1++) {
					if(that.excelGrid[index1] != undefined) {
						$('#temp_div2_' + (index1 + 1)).remove();
						AUIGrid.destroy(that.excelGrid[index1]);
						that.excelGrid[index1] = undefined
					}
				}
			}
			
			options.progressBar = true;
			
			var start = 0;
			var excelGrids = [];
			for(var index1 = start + 1; index1 < that.excelGrid.length; index1++) {
				if(that.excelGrid[index1] != undefined) {
					excelGrids.push(that.excelGrid[index1]);
				} 
			}
			
			AUIGrid.exportToXlsxMulti(that.excelGrid[start], excelGrids, options);
			
			$('.aui-grid-export-progress-modal').height('100%');
			$('#grid' + (index + 1)).children().append($('.aui-grid-export-progress-modal'));				
		}
	},
	
		excelDelay: function(index, pageId, gridId) {
			var that = this.grid == undefined ? this.momWidget : this;
			
			setTimeout(function(index, pageId, gridId) {
				if(that.entireIsDone[index] != 'DONE') {
					that.excelDelay(index, pageId, gridId);
				} else {
					// AUIGrid.clearGridData(that.excelGrid[index]);
					AUIGrid.setGridData(that.excelGrid[index], /* items */that.entireDatas[index]);	
					
					var option = {fileName : pageId + '_' + get_current_date('yyyy-mm-dd')};
					option.afterRequestCallback = function() { // 엑셀 만들고 호출되는
																// 콜백함수
						$('.aui-grid-export-progress-modal').remove();
						$('#temp_div1_' + (index + 1)).remove();
						AUIGrid.destroy(that.excelGrid[index]);
						that.excelGrid[index] = undefined;
					}
					
					that.splashHide();
					
					option.progressBar = true;
					
					AUIGrid.exportToXlsx(that.excelGrid[index], option);
					
					$('.aui-grid-export-progress-modal').height('100%');
					$('#grid' + (index + 1)).children().append($('.aui-grid-export-progress-modal'));
					
					return;
				}
			}, 40, index, pageId, gridId);
		},
	
	// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// ExcelTemplate Download 관련
	// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 엑셀양식 다운로드 버튼 핸들러
	procExcelTemplateDown: function(index, pageId1, your) {
		var that = this.grid == undefined ? this.momWidget : this;
		
		var excelTemplateBtnId = 'excelTemplateBtn' + (index + 1);
		var isExist = document.getElementById(excelTemplateBtnId);
		if(isExist == undefined) {
			return;
		}
		
		const pageId = pageId1;
		$(document).on('click', '#' + excelTemplateBtnId, function(e) {
			var items = AUIGrid.getGridData(that.grid[index]);
			
			$('head').append('<style>.back-red{background-color: #ff8000;}</style>');
			$('body').append('<div id="temp_div3_' + (index + 1) + '" style="width:100%; position:fixed; height:100%; z-index: -999; top:0px"><div id="excelTemplateGrid' + (index + 1)  + '"></div></div>');
			
			var excelTemplateProperty = JSON.parse(JSON.stringify(that.columnProperty[index]));
			if(your != undefined && your['excelTemplateDownCallInit'] != undefined) {
				your.excelTemplateDownCallInit(index, excelTemplateProperty, undefined, undefined);
			}
			if(your != undefined && your['excelTemplateDownParam'] != undefined) {
				excelTemplateProperty = JSON.parse(JSON.stringify(your['excelTemplateDownParam']));
			}
			
			for(var i = excelTemplateProperty.length - 1; i >= 0 ; i--) {
				if(excelTemplateProperty[i]['excelTemplateHide'] == 1) {
					excelTemplateProperty[i]['visible'] = true;
					excelTemplateProperty[i]['headerStyle'] = 'back-red';
				} else if(excelTemplateProperty[i]['excelTemplateHide'] == 2) {
					excelTemplateProperty[i]['visible'] = true;
				} else {
					excelTemplateProperty.splice(i, 1);
				}
			}
			
			that.excelTemplateGrid[index] = AUIGrid.create('#excelTemplateGrid' + (index + 1), excelTemplateProperty, {showRowNumColumn: false});
			
			if(that.entireDatas[index] != undefined && that.entireDatas[index].length > 0) {
				AUIGrid.setGridData(that.excelTemplateGrid[index], that.entireDatas[index].slice(0, 1));	
			}
			
			var templeteData = new Array;
			var templeteDataObj = {};
			for(var i = 0; i < excelTemplateProperty.length; i++) {
				var name = excelTemplateProperty[i].dataField;
				templeteDataObj[name] = excelTemplateProperty[i].columnTempleteData;
			}
			templeteData.push(templeteDataObj);
			AUIGrid.setGridData(that.excelTemplateGrid[index], templeteData);
			
			if(pageId == 'MOMNA004') {
				var kpiType = [];
				mom_ajax('R', 'eis.qualityStatus.qualityKpiType', {qaSeq: (index+1)}, function(result, data) {
					if(result != 'SUCCESS') {
						return;
					}
					if(data.length > 0) {
						for(var i = 0; i < data.length; i++) {
							kpiType.push(data[i]);
						}
					}
				}, undefined, undefined, this, 'async');
	            AUIGrid.setGridData(that.excelTemplateGrid[index], kpiType); 
	         }
			
			var fileName = '';
			if(pageId.indexOf('MOMBA003') >= 0) {
				fileName = 'SALES_ORDER_UPLOAD(PO)_MOMBA003_' + get_current_date('yyyy-mm-dd');
			} else {
				if(your.addExcelName != undefined) {
					fileName = your.addExcelName + '_' + pageId + '_template_' + get_current_date('yyyy-mm-dd');
				} else {
					fileName = pageId + '_template_' + get_current_date('yyyy-mm-dd');
				}
			} 
			
			var option = {fileName : fileName};
			option.afterRequestCallback = function() { // 엑셀 만들고 호출되는 콜백함수
				$('.aui-grid-export-progress-modal').remove();
				// AUIGrid.clearGridData(that.excelTemplateGrid[index]);
				
				$('#temp_div3_' + (index + 1)).remove();
				AUIGrid.destroy(that.excelTemplateGrid[index]);
			}
			
			option.progressBar = true;
			AUIGrid.exportToXlsx(that.excelTemplateGrid[index], option);
			
			$('.aui-grid-export-progress-modal').css({'height' : '100%'});
			$(that.excelTemplateGrid[index]).children().append($('.aui-grid-export-progress-modal'));
		});
	},
	
	// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Excel Upload 관련
	// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 엑셀업로드 버튼 이벤트 핸들러
	procExcelUpload: function(index, pageId1, your) {
		var that = this.grid == undefined ? this.momWidget : this;
		
		var excelUpBtnId = 'excelUpBtn' + (index + 1);
		var isExist = document.getElementById(excelUpBtnId);
		if(isExist == undefined) {
			return;
		}
		
		var excelPopExistId = 'excelPopExist' + (index + 1); 
		isExist = document.getElementById(excelPopExistId);
		if(isExist) {
			$(document).on('click', '#' + excelUpBtnId, function(e) {
				if(your != undefined && your.excelUpInit != undefined) {
					your.excelUpInit(index, e);
					if(your != undefined && your.excelUpInitParam != undefined) {
						if(your['initMessage'] != undefined) {
							var err = your['initMessage'];
							that.messageBox({type:'warning', width:'400', height: '145',  html: err});	
							your['initMessage'] = undefined;
							return;
						}
					}
				}
				$('#file' + (index + 1)).val('');
				$('#uploadFileName' + (index + 1)).val('');
				$('#' + excelPopExistId).momModal('show');
			});
			
			$(document).on('click', '#fileBtn' + (index + 1), function(e) {
				$('#file' + (index + 1)).click();
			});
			$(document).on('click', '#cancelBtn99', function(e) {
				$('#listPop49').momModal('hide');
			});
			
			$(document).on('click', '#appBtn99', function(e) {
				$('#listPop49').momModal('hide');
			});
			
			$(document).on('change', '#file' + (index + 1), function(e) {
				$('#uploadFileName' + 1).val('');
				$('#uploadFileName' + 1).val($('#file' + 1).val());
			});
			
			$(document).on('click', '#cancelBtnEX' + (index + 1) + ', ' + '.bntpopclose', function(e) {
				$('#' + excelPopExistId).momModal('hide');	
			});
			
			return;
		} 
		
		var excelPopId = 'excelPop' + (index + 1);
		isExist = document.getElementById(excelPopId);
		var isEnter = false;
		if(isExist) {
			isEnter = true;
			$('#' + excelPopId + ' .searcharea').css({'padding' : '5px 5px 0'});
			$('#' + excelPopId + ' .searcharea from').attr('id', 'fileUploadForm');
			$('#' + excelPopId + ' .searcharea form').html('<input name="file' + (index + 1) + '" id="file' + (index + 1) + '" type="file" accept=".xlsx, .xls" style="width:100%;">');
		
			$(document).on('click', '#' + excelUpBtnId, function(e) {
				if(your != undefined && your.excelUpInit != undefined) {
					your.excelUpInit(index, e);
					if(your['initMessage'] != undefined) {
						var err = your['initMessage'];
						that.messageBox({type:'warning', width:'400', height: '145',  html: err});	
						your['initMessage'] = undefined;
						return;
					}
				}
				$('#file' + (index + 1)).val('');
				$('#' + excelPopId).momModal('show');
			});
		$(document).on('click', '#excelUpConfirmBtn99', function(e) {
			if($('.NotPassStyle').length>0) {
				that.messageBox({type:'warning', width:'400', height: '145',  html: Language.lang['MESSAGES12567']});	
				your['initMessage'] = undefined;
				return;
			}
			
			that.splashShow();
			that.firstPageFlag = true;												
			that.uploadFlag = 2;
			// var param = [{}];
//			var param = {};
			var callBackParam = {};
//				var file;
//				if(index == 0) {
//					file = file1;
//				} else if(index == 1) {
//					file = file2;
//				} else if(index == 2) {
//					file = file3;
//				} else if(index == 3) {
//					file = file4;
//				} else if(index == 4) {
//					file = file5;
//				} else if(index == 5) {
//					file = file6;
//				}
			var checkedHeader = [];
			var gridDatas = AUIGrid.getGridData(momWidget.grid[98]);
			for(var i = 0; i < that.columnProperty[98].length; i++) {
			
				if(that.columnProperty[98][i]['headerRenderer'] != undefined) {
					if(that.columnProperty[98][i]['headerRenderer']['checked']) {
						checkedHeader.push(that.columnProperty[98][i]);
					}
				} else if(!that.excelCheckBox || (that.excelCheckBox && that.columnProperty[98][i]['message'] == 'KEY')) {
					checkedHeader.push(that.columnProperty[98][i]);
				}
			}
			var param = [];
			for(var i = 0; i < gridDatas.length; i++) {
				param[i] = {};
				for(var j = 0; j < checkedHeader.length; j++) {
					var headerTmp = checkedHeader[j]['dataField'];
					param[i][headerTmp] = gridDatas[i][checkedHeader[j]['dataField']];
					var paramTmp = param[i][headerTmp] + '';
					if(checkedHeader[j]['dataType'] == 'numeric' && paramTmp.charAt(paramTmp.length-1) == '.') {
						param[i][headerTmp] = gridDatas[i][checkedHeader[j]['dataField']].replace('.', '').replace(',','');
					}
				}
			}
			
			var paramPair = {param: param, callBackParam : undefined};
			var message = that.procCallInit(index, 'L', paramPair, {index: index, op: 'excelUpConfirmBtn99'}, your);
			if(message != 'SUCCESS') {
				that.splashHide();
				that.messageBox({type:'warning', width:'400', height: '145',  html: message});
				
				return;
			}
			
			param = paramPair['param'];
			mom_ajax('L', that.gridProperty[index]['queryId'], JSON.stringify(param), function(result, data) {
				var message = that.procCallBack(index, 'L', result, data, param, undefined, {'index' : index, 'op' : 'excelUpConfirmBtn99'}, your);
				if(your != undefined && your.interfaceUrl != undefined) { // 200805 / chs / IF 프로시저 호출 공통 처리
                    mom_ajax('C', your.interfaceUrl, JSON.stringify({cudFlag: 'C'})); 
                }
//				if(message == 'SUCCESS') {
//					return;
//				} 
				
				that.splashHide();
				
				if(result == 'SUCCESS') {
					that.findBtnClicked(index, true, {}, function(result, data) {
						if(your != undefined && your.interfaceUrl != undefined) {// 변수수정
	                        mom_ajax('C', your.interfaceUrl, JSON.stringify({cudFlag: 'C'})); // excel 업로드 시 IF 프로시저 호출
	                     }
						if(that.firstPageFlag){
							that.firstPageFlag = false;
							if(your != undefined && your.retrieveCallBack != undefined) {
								your.retrieveCallBack('SUCCESS', data, param, undefined, {'index' : index, 'op' : 'excelUpConfirmBtn' + (index + 1)}, your);							
								return;
							}
							// 2020.08.27 박연주 action 처리 직후 페이징된 페이지 전체 선택 후
							// 삭제 시 해당 페이지외 전체 데이터 삭제되는 현상 수정 start
							var partialData = data.slice(that.startPage[index] - 1, that.endPage[index]);
							AUIGrid.setGridData(that.grid[index], partialData);
							// 2020.08.27 박연주 action 처리 직후 페이징된 페이지 전체 선택 후
							// 삭제 시 해당 페이지외 전체 데이터 삭제되는 현상 수정 end							
							that.messageBox({type:'success', width:'400', height: '145', html: Language.lang['MESSAGES11193']});
						}
					}, {'index' : index, 'op' : 'excelUpConfirmBtn' + '99'}, your);											
				} else {
					if(data['p_err_msg'] != undefined && data['p_err_msg'].length > 0) {
						that.messageBox({type:'danger', width:'400', height: '145', html:Language.getLang(data['p_err_msg'])});
					} else {
						that.messageBox({type:'danger', width:'400', height: '145', html:Language.lang['MESSAGES10821']});
					}
				}
				$('#' + excelPopId).momModal('hide');
			}, undefined, {'index' : index, 'op' : 'excelUpConfirmBtn99'}, your);	
//				excel_upload(file, that.gridProperty[index]['queryId'], pageId, that.grid[index], JSON.stringify(param), function(result, data) {
//					if(result == 'SUCCESS') {
//						that.findBtnClicked(index, true, {}, function(result, data) {
//							if(your != undefined && your.interfaceUrl != undefined) {// 변수수정
//		                        mom_ajax('C', your.interfaceUrl, JSON.stringify({cudFlag: 'C'})); // excel
//																									// 업로드
//																									// 시 IF
//																									// 프로시저
//																									// 호출
//		                     }
//							if(that.firstPageFlag){
//								that.firstPageFlag = false;
//								if(your != undefined && your.retrieveCallBack != undefined) {
//									your.retrieveCallBack('SUCCESS', data, param, undefined, {'index' : index, 'op' : 'saveBtnEX' + (index + 1)}, your);							
//									return;
//								}
//								// 2020.08.27 박연주 action 처리 직후 페이징된 페이지 전체 선택 후
//								// 삭제 시 해당 페이지외 전체 데이터 삭제되는 현상 수정 start
//								var partialData = data.slice(that.startPage[index] - 1, that.endPage[index]);
//								AUIGrid.setGridData(that.grid[index], partialData);
//								// 2020.08.27 박연주 action 처리 직후 페이징된 페이지 전체 선택 후
//								// 삭제 시 해당 페이지외 전체 데이터 삭제되는 현상 수정 end
//								
//								that.messageBox({type:'success', width:'400', height: '145', html: Language.lang['MESSAGES11193']});
//							}
//						}, {'index' : index, 'op' : 'excelUpConfirmBtn' + '99'}, your);						
//					} else {
//						// that.splashHide();
//						if(data['p_err_msg'] != undefined && data['p_err_msg'].length > 0) {
//							that.messageBox({type:'danger', width:'400', height: '145', html:Language.getLang(data['p_err_msg'])});
//						} else {
//							that.messageBox({type:'danger', width:'400', height: '145', html:Language.lang['MESSAGES10821']});
//						}
//					}
//				}, undefined, {'index' : index, 'op' : 'excelUpConfirmBtn' + (index + 1)}, your);
				
				that.splashHide();
				$('#listPop49').momModal('hide');	
			});
		
			$(document).on('click', '#verificationBtn99', function(e) {
				that.splashShow();
				var checkedHeader = [];
				var gridDatas = AUIGrid.getGridData(momWidget.grid[98]);
				for(var i = 0; i < that.columnProperty[98].length; i++) {
					if(that.columnProperty[98][i]['headerRenderer'] != undefined) {
						if(that.columnProperty[98][i]['headerRenderer']['checked']) {
							checkedHeader.push(that.columnProperty[98][i]);
						}
					}
				}
				var param = [];
				for(var i = 0; i < gridDatas.length; i++) {
					param[i] = {};
					for(var j = 0; j < checkedHeader.length; j++) {
						var headerTmp = checkedHeader[j]['dataField'];
						param[i][headerTmp] = gridDatas[i][checkedHeader[j]['dataField']];
						var paramTmp = param[i][headerTmp] + '';
						if(checkedHeader[j]['dataType'] == 'numeric' && paramTmp.charAt(paramTmp.length-1) == '.') {
							param[i][headerTmp] = gridDatas[i][checkedHeader[j]['dataField']].replace('.', '').replace(',','');
						}
					}
				}
				
				var gridName = '#grid99';
				var gridRowErrorCount = 0;
				
				that.excelUpDataCheck(gridName,dateCheckParam,checkedHeader);
//				AUIGrid.bind(that.grid[98], 'ready', function(event) {
				gridRowCount =	$('#grid99').find('tr').length;
				for(var i = 0; i < gridRowCount; i++)
					{
					if($('#grid99').find('tr').eq(i).children('.NotPassStyle').length>0)
						{
						gridRowErrorCount++;
						}
					}
					
					 if(gridRowErrorCount==0)
					   {
    	               $('#uploadIcon').css('background-color','rgb(68 216 107)');
    	               $("#uploadErrorCount").text(Language.lang['MESSAGES12570']);
    	               $("#uploadErrorCountText").text('');
    	               $("#uploadErrorCountText2").text('');
    	                 
					   }
                     else
                    	{
                    	 $('#uploadIcon').css('background-color','#ff4545');	    	              
	    	             $("#uploadErrorCountText").text(Language.lang['MESSAGES12568']);
	    	             $("#uploadErrorCountText2").text(Language.lang['MESSAGES12569']);
	    	             $("#uploadErrorCount").text(' '+gridRowErrorCount);
					     
                    	}
					 setTimeout(function() {
						that.splashHide();
					}, 100);
//				});
			});
			
			const pageId = pageId1;
	
		
		   
		}
		var excelGridId = 'excelGrid' + (index + 1);
		isExist = document.getElementById(excelGridId);
		if(isExist) {
			if(!isEnter) {
				$('#' + excelGridId + ' .searcharea').css({'padding' : '5px 5px 0'});
				$('#' + excelGridId + ' .searcharea from').attr('id', 'excelGridForm');
				$('#' + excelGridId + ' .searcharea form').html('<input name="gridFile' + (index + 1) + '" id="gridFile' + (index + 1) + '" type="file" accept=".xlsx, .xls" style="width:100%;">');
			
				$(document).on('click', '#' + excelUpBtnId, function(e) {
					if(your != undefined && your.excelUpInit != undefined) {
						your.excelUpInit(index, e);
						if(your != undefined && your.excelUpInitParam != undefined) {
							if(your['initMessage'] != undefined) {
								var err = your['initMessage'];
								that.messageBox({type:'warning', width:'400', height: '145',  html: err});	
								your['initMessage'] = undefined;
								return;
							}
						}
					}
					
					$('#' + excelGridId).momModal('show');
// $('#file' + (index + 1)).val('');
					$('#gridFile' + (index + 1)).val('');
				});
			}
			
			$(document).on('click', '#saveBtnEX' + (index + 1), function(e) {
				$('#' + excelGridId).momModal('hide');
				that.uploadFlag = 2;
				var param = [{}];
				
				// that.splashShow();
				var file;
				if(index == 0) {
					file = gridFile1;
				} else if(index == 1) {
					file = gridFile2;
				} else if(index == 2) {
					file = gridFile3;
				} else if(index == 3) {
					file = gridFile4;
				} else if(index == 4) {
					file = gridFile5;
				} else if(index == 5) {
					file = gridFile6;
				} 
				
				excel_upload_new(file, that.grid[index], function() {
					that.uploadFlag = 0; // uploadFlag가 2로 설정돼서 웹엑셀 업로드 후
											// 조회버튼 누르면 성공했다는 메세지가 나오는 현상 수정
					that.splashHide();
					if(your != undefined && your.excelGridCallBack) {
						your.excelGridCallBack(index);
					}
				});
			});
			
			$(document).on('click', '#cancelBtnEX' + (index + 1) + ', ' + '.bntpopclose', function(e) {
				$('#' + excelGridId).momModal('hide');	
			});
		}
	},
	//RPA 엑셀 업로드 
	procNewExcelUpload: function(index, pageId1, your) {
		var that = this.grid == undefined ? this.momWidget : this;
		
		var excelUpBtnId = 'excelNewUpBtn' + (index + 1);
		var isExist = document.getElementById(excelUpBtnId);
		if(isExist == undefined) {
			return;
		}
		
		var excelPopExistId = 'excelPopExist' + (index + 1); 
		isExist = document.getElementById(excelPopExistId);
		if(isExist) {
			$(document).on('click', '#' + excelUpBtnId, function(e) {
				if(your != undefined && your.excelUpInit != undefined) {
					your.excelUpInit(index, e);
					if(your != undefined && your.excelUpInitParam != undefined) {
						if(your['initMessage'] != undefined) {
							var err = your['initMessage'];
							that.messageBox({type:'warning', width:'400', height: '145',  html: err});	
							your['initMessage'] = undefined;
							return;
						}
					}
				}
				$('#file' + (index + 1)).val('');
				$('#uploadFileName' + (index + 1)).val('');
				$('#' + excelPopExistId).momModal('show');
			});
			
			$(document).on('click', '#fileBtn' + (index + 1), function(e) {
				$('#file' + (index + 1)).click();
			});

			$(document).on('change', '#file' + (index + 1), function(e) {
				$('#uploadFileName' + (index + 1)).val('');
				$('#uploadFileName' + (index + 1)).val($('#file' + (index + 1)).val());
			});
			
			$(document).on('click', '#cancelBtnNEX' + (index + 1) + ', ' + '.bntpopclose', function(e) {
				$('#' + excelPopExistId).momModal('hide');	
			});
			
			return;
		} 
		
		var excelPopId = 'excelNewPop' + (index + 1);
		isExist = document.getElementById(excelPopId);
		var isEnter = false;
		if(isExist) {
			isEnter = true;
			$('#' + excelPopId + ' .searcharea').css({'padding' : '5px 5px 0'});
			$('#' + excelPopId + ' .searcharea from').attr('id', 'fileUploadForm');
			$('#' + excelPopId + ' .searcharea form').html('<input name="file' + (index + 1) + '" id="excelFile' + (index + 1) + '" type="file" accept=".xlsx, .xls" style="width:100%;">');
		
			$(document).on('click', '#' + excelUpBtnId, function(e) {
				if(your != undefined && your.excelUpNewInit != undefined) {
					your.excelUpNewInit({index: (index+1), op: 'excelNewUpBtn'+(index+1)},e);
					if(your['initMessage'] != undefined) {
						var err = your['initMessage'];
						that.messageBox({type:'warning', width:'400', height: '145',  html: err});	
						your['initMessage'] = undefined;
						return;
					}
				}
				$('#file' + (index + 1)).val('');
				$('#' + excelPopId).momModal('show');
			});
				
			const pageId = pageId1;
			$(document).on('click', '#saveBtnNEX' + (index + 1), function(e) {
				that.firstPageFlag = true;
				$('#' + excelPopId).momModal('hide');
				that.uploadFlag = 2;
				// var param = [{}];
				var param = {};
				var callBackParam = {};
				that.splashShow();
				var file;
				if(index == 0) {
					file = excelFile1;
				} else if(index == 1) {
					file = excelFile2;
				} else if(index == 2) {
					file = excelFile3;
				} else if(index == 3) {
					file = excelFile4;
				} else if(index == 4) {
					file = excelFile5;
				} else if(index == 5) {
					file = excelFile6;
				} 
				
				if(your != undefined && your.initParam != undefined) {
					param = your.initParam;
				}			
				excel_upload(file, that.gridProperty[index]['queryId'], pageId, that.grid[index], JSON.stringify(param), function(result, data) {
					if(result == 'SUCCESS') {
						that.findBtnClicked(index, true, {}, function(result, data) {
							if(your != undefined && your.interfaceUrl != undefined) {// 변수수정
		                        mom_ajax('C', your.interfaceUrl, JSON.stringify({cudFlag: 'C'})); 	
		                     }
							if(that.firstPageFlag){
								that.firstPageFlag = false;
								if(your != undefined && your.retrieveCallBack != undefined) {
									your.retrieveCallBack('SUCCESS', data, param, undefined, {'index' : index, 'op' : 'saveBtnNEX' + (index + 1)}, your);							
									return;
								}
								var partialData = data.slice(that.startPage[index] - 1, that.endPage[index]);
								AUIGrid.setGridData(that.grid[index], partialData);							
								that.messageBox({type:'success', width:'400', height: '145', html: Language.lang['MESSAGES11193']});
							}
						}, {'index' : index, 'op' : 'saveBtnNEX' + (index + 1)}, your);						
					} else {
						if(data['p_err_msg'] != undefined && data['p_err_msg'].length > 0) {
							that.messageBox({type:'danger', width:'400', height: '145', html:Language.getLang(data['p_err_msg'])});
						} else {
							that.messageBox({type:'danger', width:'400', height: '145', html:Language.lang['MESSAGES10821']});
						}
					}
				}, undefined, {'index' : index, 'op' : 'saveBtnNEX' + (index + 1)}, your);
				
			});
			
			$(document).on('click', '#cancelBtnNEX' + (index + 1) + ', ' + '.bntpopclose', function(e) {
				$('#' + excelPopId).momModal('hide');	
			});
		   
		}
	},
	// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Calendar Component
	// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 달력 컴포넌트
	procCalendar: function(index) {
		var that = this.grid == undefined ? this.momWidget : this;
		
		// var $form = $('#form');
		var $form = $('.form-inline');
		var $objs = $form.find('input');
		
		for (var i = 0; i < $objs.length; i++) {
			var $obj = $($objs[i]);
			$.datetimepicker.setLocale('ko');
			if($obj.attr('input-type') == 'datepicker') {
				var dataFormat = $obj.attr('data-format') || 'Y-m-d';
                var dateFormat = ($obj.attr('date-format') || '').toLocaleLowerCase();
                
                var options = {
                    format: dataFormat,
                    formatDate: dataFormat,
                    step: 60
                };
                
                if(dateFormat.indexOf('time') < 0 && dateFormat.indexOf('date') < 0) {
                    $.extend(options, {
                        timepicker: dateFormat.indexOf('time') > -1,
                        datepicker: true
                    });
                } else {
                    $.extend(options, {
                        timepicker: dateFormat.indexOf('time') > -1,
                        datepicker: dateFormat.indexOf('date') > -1,
                    });
                }
                
                if(dataFormat == 'Y-m') {
                    $.extend(options, {
                        onGenerate: function (a, b) {
                            var clone = $($(".xdsoft_datetimepicker[style*='display: block']").find('tr')[2]).find('td:first').clone();
                            clone.css('width', '1%');
                            clone.html("<div style='text-align:center'>OK</div>");
                            $(".xdsoft_datetimepicker[style*='display: block']").find(".xdsoft_calendar").html(clone);
                        },
                        onShow: function (a, b) {
                            var picker = $('.xdsoft_datetimepicker');
                            $.each(picker, function (i, v) {
                                var clone = $($(v).find('tr')[2]).find('td:first').clone();
                                clone.css('width', '1%');
                                clone.html("<div style='text-align:center'>OK</div>");
                                $(v).find('.xdsoft_calendar').html(clone);
                            });
                        }
                    });
                }
                
                $obj.datetimepicker(options);
                
                if(that.searchFilter[index] == undefined || that.searchFilter[index].length == 0) {
                	return;
                }
                for(var loop = 0; loop < that.searchFilter[index].length; loop++) {
                	if(that.searchFilter[index][loop]['popUpInit'] != undefined && that.searchFilter[index][loop]['popUp'] == 'CALENDAR' && that.searchFilter[index][loop]['dataField'] == $obj.attr('id')) {
        				if(that.searchFilter[index][loop]['popUpInit'] == 'YYYY-MM-01'/*
																						 * ||
																						 * that.searchFilter[index][loop]['popUpInit'] ==
																						 * 'yyyy-mm-01'
																						 */) {
        					var today = get_date_diff(0);
        					$('#' + that.searchFilter[index][loop]['dataField']).val(today.substring(0, 8) + '01');
        				} else if(that.searchFilter[index][loop]['popUpInit'] == 'YYYY-MM-31') {
	    					var today = get_date_diff(0);	    					
	    					var todaydd = parseInt(today.substring(8, 10));
	    					var nextMonthdd = '';
	    					if(todaydd < 15) {
	    						nextMonthdd = get_date_diff2(today, 40);
	    					} else {
	    						nextMonthdd = get_date_diff2(today, 20);
	    					}
	    					nextMonthdd = nextMonthdd.substring(0, 8) + '01';
	    					$('#' + that.searchFilter[index][loop]['dataField']).val(get_date_diff2(nextMonthdd, -1));
	    				} else if(that.searchFilter[index][loop]['popUpInit'] == 'YYYY-M--01') {
	    					var today = get_date_diff(0);	    					
	    					var todaydd = parseInt(today.substring(8, 10));
	    					var prevMonthdd = '';
	    					if(todaydd < 15) {
	    						prevMonthdd = get_date_diff2(today, -20);
	    					} else {
	    						prevMonthdd = get_date_diff2(today, -40);
	    					}
	    					$('#' + that.searchFilter[index][loop]['dataField']).val(prevMonthdd.substring(0, 8) + '01');
	    				} else if(that.searchFilter[index][loop]['popUpInit'] == 'YYYY-M--31') {
	    					var today = get_date_diff(0);	    					
	    					var currentMonth01 = today.substring(0, 8) + '01';
	    					$('#' + that.searchFilter[index][loop]['dataField']).val(get_date_diff2(currentMonth01, -1));
	    				} else if(that.searchFilter[index][loop]['popUpInit'] == 'TODAY' || that.searchFilter[index][loop]['popUpInit'] == 'today') {
        					var today = get_date_diff(0);
        					$('#' + that.searchFilter[index][loop]['dataField']).val(today);
        				} else if(that.searchFilter[index][loop]['popUpInit'].indexOf('TODAY') >= 0 || that.searchFilter[index][loop]['popUpInit'].indexOf('today') >= 0) {
	    					var date = that.searchFilter[index][loop]['popUpInit'];
	    					var diff = parseInt(date.substring(5, date.length).replace(/ /gi,''));
	    					$('#' + that.searchFilter[index][loop]['dataField']).val(get_date_diff(diff));
	    				}
        			}
                }
			}
		}
	},
	

	// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	
	

	// init 함수 처리
	 checkActionCallInit: function(index, action, param, btnId, your,event) {
		var result = {result:'SUCCESS', msg:'SUCCESS',param:param};
		if(your == undefined) {
			return 'FAIL';
		}		
		 if((action == 'C' || action == 'P' ) && your.createCallInit != undefined && btnId.indexOf('createBtn')>=0 ) {
			 your.createCallInit(index,your,action,btnId,param,result);				 
		}
		else if(your.editCallInit != undefined && btnId.indexOf('editBtn')>=0) {
			 your.editCallInit(index,your,action,btnId,param,result);				 
		}
		else if( your.copyCallInit != undefined && btnId.indexOf('copyBtn')>=0) {
			 your.copyCallInit(index,your,action,btnId,param,result);				 
		}
		else if(your.customCallInit != undefined && btnId.indexOf('customBtn')>=0) {
			 your.customCallInit(index,your,action,btnId,param,result);				 
		}
		else if(your.customCallInit != undefined && btnId.indexOf('customGridPopBtn')>=0) {
			 your.customCallInit(index,your,action,btnId,param,result);				 
		}
		else if(your.excelDownCallInit != undefined&& btnId=='excelDownBtn') {
			 your.excelDownCallInit(index,your,action,btnId,param,result);	
		}
		else if(your.saveGridCallInit != undefined && btnId=='saveBtn' ) {
				your.saveGridCallInit(index,your,action,btnId,param,result);			
		} 
		else if(your.addRowCallInit != undefined&& btnId=='addBtn') {
				your.addRowCallInit(index,your,action,btnId,param,result);			
		}
		else if(your.moveRowCallInit != undefined&& btnId=='moveBtn') {
				your.moveRowCallInit(index,your,action,btnId,param,result);			
		} 		 		
		else if(your.delCallInit != undefined && btnId=='delBtn') {		
			 your.delCallInit(index,your,action,btnId,param,result);			
		}
		if(action == 'R' && your.searchCallInit != undefined) {
			 your.searchCallInit(index,your,action,btnId,param,result,event);	
		}
		if(your.savePopCallInit != undefined && (btnId.indexOf('saveBtnDP')>=0 || btnId.indexOf('saveBtnCP')>=0)) {
			if(btnId.indexOf('saveBtnDP')>=0){
				btnId = btnId.split('saveBtnDP')[0] + 'Btn';
			}
			else{
					btnId = btnId.split('saveBtnCP')[0] + 'Btn';
			}
			
			 your.savePopCallInit(index,your,action,btnId,param,result);			
	    } 

		

			return {result:result.result,param:result.param,msg:result.msg};

	},
	// Callback 함수 처리
	 checkActionCallBack: function(index, action, param, btnId, your,data) {
		var result = {result:'SUCCESS', msg:'SUCCESS',param:param};
		if(your == undefined) {
			return 'FAIL';
		}		
		if( (action == 'C' || action == 'P' ) && your.createCallBack != undefined && btnId.indexOf('createBtn')>=0 ) {
			your.createCallBack(index,your,action,btnId,param,result,data);	
			
		}
		else if(your.editCallBack != undefined && btnId.indexOf('editBtn')>=0) {
			your.editCallBack(index,your,action,btnId,param,result,data);	
		}	
					
		else if( your.copyCallBack != undefined && btnId.indexOf('copyBtn')>=0) {
			your.copyCallBack(index,your,action,btnId,param,result,data);	
		}	
		else if(your.customCallBack != undefined && btnId.indexOf('customBtn')>=0) {
			your.customCallBack(index,your,action,btnId,param,result,data);	
		}
		else if(your.excelUpCallBack != undefined && btnId.indexOf('excelUpBtn')>=0) {
			your.excelUpCallBack(index,your,action,btnId,param,result,data);	
		}	
		else if(your.excelDownCallBack != undefined &&  btnId.indexOf('excelDownBtn')>=0) {
			your.excelDownCallBack(index,your,action,btnId,param,result,data);	
		}
		
		else if(your.saveGridCallBack != undefined && btnId.indexOf('saveBtn')>=0 ) {
				your.saveGridCallBack(index,your,action,btnId,param,result,data);				
		} 
		else if(your.addRowCallBack != undefined && btnId.indexOf('addBtn')>=0) {
				your.addRowCallBack(index,your,action,btnId,param,result,data);				
		} 
		else if(your.moveRowCallBack != undefined && btnId.indexOf('moveBtn')>=0) {
				your.moveRowCallBack(index,your,action,btnId,param,result,data);				
		} 
		else if(your.delCallBack != undefined && btnId.indexOf('delBtn')>=0) {		
			     your.delCallBack(index,your,action,btnId,param,result,data);				
		}
		if(action == 'R' && your.searchCallBack != undefined) {
			your.searchCallBack(index,your,action,btnId,param,result,data);	
		}
		if(your.savePopCallBack != undefined && (btnId.indexOf('saveBtnDP')>=0 || btnId.indexOf('saveBtnCP')>=0)) {
			your.savePopCallBack(index,your,action,btnId,param,result,data);		
	    } 
	
			return {result:result.result,param:result.param,msg:result.msg};
		

		
	},
	// 윈도우 리사이즈2
	htmlResize: function(index,your) {	
		var that = momWidget;
		
		if(index == undefined) {
			for(var i = 0; i < that.grid.length; i++) {
				if(that.grid[i] == undefined || document.getElementById('grid' + (index + 1)) == undefined) {
	                  continue;
	            }
				
				AUIGrid.resize(that.grid[i]);
				
				var height = document.getElementById('grid' + (index + 1)).children[0].clientHeight;
				var width = document.getElementById('grid' + (index + 1)).children[0].clientWidth;
				
				$(that.grid[i]).find('.aui-grid').css('height', height + 17 + 'px');
				$(that.grid[i]).find('.aui-grid').css('width', width + 17 + 'px');

				AUIGrid.resize(that.grid[i]);
			}
		} else {
			const i = index;
			$(window).resize(function() {
				setTimeout(function() {
					AUIGrid.resize(that.grid[i]);
					
					var height = document.getElementById('grid' + (i + 1)).children[0].clientHeight;
					var width = document.getElementById('grid' + (i + 1)).children[0].clientWidth;
					
					$(that.grid[i]).find('.aui-grid').css('height', height + 17 + 'px');
					$(that.grid[i]).find('.aui-grid').css('width', width + 17 + 'px');
	
					AUIGrid.resize(that.grid[i]);
				}, 100);
			});	
			/*	for(var k = 0, max = that.grid.length; k < max; k++) {
				AUIGrid.resize(that.grid[k]);
			}*/
				
		}
	},
	
	procCallInitTran: function(index, action, param, indexInfo, your) {
		if(your == undefined) {
			return 'SUCCESS';
		}
		
		if(action == 'CW' && your.createCallInit != undefined) {
			your.createCallInit(index, param['param'], param['callBackParam'], indexInfo);
		} else if(action == 'E' && your.excelCallInit != undefined) {
			your.excelCallInit(index, param['param'], param['callBackParam'], indexInfo);
		} else if(action == 'R' && your.retrieveCallInit != undefined) {
			your.retrieveCallInit(index, param['param'], param['callBackParam'], indexInfo);
		} else if((action == 'C' || action == 'L') && your.saveCallInit != undefined) {
			your.saveCallInit(index, param['param'], param['callBackParam'], indexInfo);
		} else if((action == 'D' || action == 'LD') && your.delCallInit != undefined) {
			your.delCallInit(index, param['param'], param['callBackParam'], indexInfo);
		} else if((action == 'U') && your.updateCallInit != undefined) {
			your.updateCallInit(index, param['param'], param['callBackParam'], indexInfo);
		}
		
		if(your['initMessage'] != undefined) {
			var err = your['initMessage'];
			your['initMessage'] = undefined;
			
			if(err != 'CLEAR_PARAM') {
				return err;
			} else if(err == 'CLEAR_PARAM' || param['param'] == undefined) {
				if(action == 'E' || action == 'R' || action == 'C' || action == 'D' || action == 'U') {
					param['param'] = {};
				} else {
					param['param'] = [];
				}
			} else if(err == 'BREAK') {
				return 'BREAK';
			}
		}
		
		if(action == 'CW') {
			return 'SUCCESS';
		}

		if(param['param'] != undefined && your['initParam'] != undefined) {
			if(JSON.stringify(param['param']) == '{}' || JSON.stringify(param['param']) == '"{}"') {
				param['param'] = your['initParam'];
    		} else if(JSON.stringify(param['param']) == '[]' || JSON.stringify(param['param']) == '[{}]' || JSON.stringify(param['param']) == '"[]"' || JSON.stringify(param['param']) == '"[{}]"') {
    			param['param'][0] = your['initParam'];
    		} else {
				for(key in your['initParam']) {
					if(param['param'].length == undefined) {
						param['param'][key] = your['initParam'][key];
					} else {
						for(var i = 0; i < param['param'].length; i++) {
							param['param'][i][key] = your['initParam'][key];
						}
					}
				}
    		}
		}
		
		return 'SUCCESS';
	},
	

		
	procProcessTran: function(index1, your) {
		var that = this.grid == undefined ? this.momWidget : this;
		
		const index = index1;
		if(that.processTran[index] == undefined) {
			return;
		} 
		
		var indexInfoList = [];
		for(var loop = 0; loop < that.processTran[index].length; loop++) {
			const i = loop;
			
			var indexInfo = {};
			indexInfo['index'] = index;
			indexInfo['op'] = that.processTran[index][i]['dataField'] + (index + 1);
			indexInfoList[i] = indexInfo;
			
			if(that.processTran[index][i]['dataField'] == 'INIT') {
				indexInfoList[i]['index'] = index;
				indexInfoList[i]['row'] = i;
				indexInfoList[i]['sequence'] = 1;
				if(that.processTran[index][i]['headerText'] == 'SEARCH') {
					that.findBtnClicked(index, false, undefined, undefined, indexInfoList[i], your);
				} else if(that.processTran[index][i]['headerText'] == 'LOAD') {
					if(your != undefined && your.loadCallInit != undefined) {
						your.loadCallInit();
					}
					
					that.splashHide('load');
				} else if(that.processTran[index][i]['headerText'] == 'GRID') {
					var message = that.procCallInit(index, 'R', {param : undefined, callBackParam : undefined}, indexInfoList[i], your);
					if(message != 'SUCCESS') {
						that.messageBox({type:'warning', width:'400', height: '145',  html: message});						
						return;
					}
					
					mom_ajax('R', that.processTran[index][i]['dropDown'], {}, function(result, data) {
						if(result != 'SUCCESS' || data == undefined || data.length < 1) {
							return;
						}
						
						var underCamel = function(str) {
							 return str.toLowerCase().replace(/(\_[a-z])/g, function(arg) {
								 return arg.toUpperCase().replace('_','');
							 });
						};
						
						var initColSize = data.length + 1;
						var fieldString = '';
						var fieldStringG = '';
						/*
						 * 20200630 / pyj / 영업마스터 업로드(PO) 업로드 같은 p/no,납기일은 한줄로
						 * 출력되도록 pivot 쿼리 수정
						 */
						for (var j = 0; j < data.length; j++) {
							if(j == 0) {
								if(data[j].colType == 'DATETIME') {
									fieldString = 'TO_CHAR(' + data[j].momDemandColId + ', \'yyyy-mm-dd HH24:MI:ss\') as ' + data[j].momDemandColId;
								} else if(data[j].colType == 'DATE') {
									if(data[j].momDemandColId == 'DUE_DATE') {
										fieldString += 'MIN(TO_CHAR('+data[j].momDemandColId+', \'yyyy-mm-dd\')) as '+data[j].momDemandColId;
									} else {
										fieldString += 'TO_CHAR('+data[j].momDemandColId+', \'yyyy-mm-dd\') as '+data[j].momDemandColId;
									}
								} else {
									if(data[j].momDemandColId == 'QTY') {
										fieldString += 'SUM('+data[j].momDemandColId+') '+data[j].momDemandColId;
									} else {
										fieldString += data[j].momDemandColId;
									}
								}
								if(data[j].momDemandColId != 'DUE_DATE' && data[j].momDemandColId != 'QTY') {
									fieldStringG += data[j].momDemandColId;
								}
							} else {
								if(data[j].colType == 'DATETIME') {
									fieldString += ', TO_CHAR(' + data[j].momDemandColId + ', \'yyyy-mm-dd HH24:MI:ss\') as ' + data[j].momDemandColId;
								} else if(data[j].colType == 'DATE') {
									if(data[j].momDemandColId == 'DUE_DATE') {
										fieldString += ', MIN(TO_CHAR('+data[j].momDemandColId+', \'yyyy-mm-dd\')) as '+data[j].momDemandColId;
									} else {
										fieldString += ', TO_CHAR('+data[j].momDemandColId+', \'yyyy-mm-dd\') as '+data[j].momDemandColId;
									}
								} else {
									if(data[j].momDemandColId == 'QTY') {
										fieldString += ', SUM('+data[j].momDemandColId+') '+data[j].momDemandColId;
									} else {
										fieldString += ',' + data[j].momDemandColId;
									}
								}
								if(data[j].momDemandColId != 'DUE_DATE' && data[j].momDemandColId != 'QTY') {
									fieldStringG += ',' + data[j].momDemandColId;
								}
							}
							
				            var colId = underCamel(data[j].momDemandColId);
							var colName = locale == 'KR' ? data[j].promptName : Language.getValueFromKorean(data[j].promptName);
								
							AUIGrid.addColumn(that.grid[index], {dataField: colId, headerText: colName/*
																										 * ,
																										 * dataType:
																										 * 'String'
																										 */, visible: true, editable: false}, 'last');
						}
						
						if(your != undefined && your.initColSize != undefined) {
							your.initColSize = initColSize;
						}
						if(your != undefined && your.fieldString != undefined) {
							your.fieldString = fieldString;
						} 
						if(your != undefined && your.fieldStringG != undefined) {
							your.fieldStringG = fieldStringG;
						}
						
						that.splashHide('load');	
						
						if(your != undefined && your.gridCallInit != undefined) {
							your.gridCallInit();
						}
						
						return;
					}, undefined, indexInfoList[i], your, 'sync'); 
				}
					  else if(that.processTran[index][i]['headerText'] ==
					  'GRID2') { var param = {}; if(your != undefined &&
					  your['grid2CallInit'] != undefined) {
					  your.grid2CallInit(function(initParam) { param =
					  initParam; mom_ajax('R',
					  that.processTran[index][i]['dropDown'], param,
					  function(result, data) { var columnLayout =
					  AUIGrid.getColumnLayout(that.grid[index]); var column =
					  {width:120,visible:true}; if(data.length > 0) { for(var i =
					  columnLayout.length - 1; i >= 0; i--) {
					  if(columnLayout[i].dataField.indexOf('Qty') > -1) {
					  if(data[0][columnLayout[i].dataField] != undefined) {
					  columnLayout[i].visible = true;
					  if(columnLayout[i].dataField.indexOf('m') > -1) {
					  columnLayout[i].headerText =
					  data[0][columnLayout[i].dataField].toString().substr(0,6); }
					  else { columnLayout[i].headerText =
					  data[0][columnLayout[i].dataField]; } } else {
					  columnLayout[i].visible = false;
					  columnLayout[i].excelHide = true; //
					  columnLayout.splice(i, 1); } } }
					  AUIGrid.changeColumnLayout(that.grid[index],
					  columnLayout); }
					  
					  that.splashHide('load'); return; }); }); } }
					 
				
				continue;
			} else if(that.processTran[index][i]['dropDown'].indexOf('POPUP') == 0) {
				const actionBtnId = that.processTran[index][i]['dataField'] + (index + 1);
				var isExist = document.getElementById(actionBtnId);	
				if(isExist) {
					// that.processTran[index][i]['dropDown'] =
					// that.processTran[index][i]['dropDown'].substring(6);
					$(document).on('click', '#' + actionBtnId, function(e) {
						var actionToken = that.processTran[index][i]['dropDown'].substring(6);
						var param = {};
						if(actionToken == 'form') {
							param = that.createParam4Form(index, '#form');
							if(param <= 0) {
								setTimeout(function() {
									// that.messageBox({type:'warning',
									// width:'400', height: '145',
									// html:that.searchFilter[index][param *
									// -1]['headerText'] + ' 은(는) 필수 항목입니다.'});
									if(that.searchFilter[index][param * -1]['sortIndex'] == undefined || that.searchFilter[index][param * -1]['sortIndex'] == '') {
										that.messageBox({type: 'warning', width: '400', height: '145', html: that.searchFilter[index][param * -1]['headerText'] +' '+ multiLang.transText('MESSAGE','MSG00043')});
										return;
									}
									
									var message = '';
									var sortIndex = that.searchFilter[index][param * -1]['sortIndex'];
									for(var i = 0; i < that.searchFilter[index].length; i++) {
										if(that.searchFilter[index][i]['sortIndex'] != undefined && that.searchFilter[index][i]['sortIndex'] == sortIndex) {
											if(message == '') {
												message = that.searchFilter[index][i]['headerText'];
											} else {
												message += (', ' + that.searchFilter[index][i]['headerText']);
											}
										}
									}
									
									message += ' 중 적어도 1개는 필수 항목입니다.';
									that.messageBox({type: 'warning', width: '400', height: '145', html: message});
								}, 40);
								
								return;
							}
						} else if(actionToken == 'grid') {
							param = AUIGrid.getGridData(that.grid[index]);
						} else if(actionToken == 'checkedGrid') {
							var checkedItems = AUIGrid.getCheckedRowItems(that.grid[index],true);
							if(checkedItems.length < 1) {
								that.messageBox({type:'warning', width:'400', height: '145', html: Language.lang['MESSAGES11610']}); // 20200617
																																		// /
																																		// pyj
																																		// /
																																		// 다국어
																																		// 적용
								return;
							} else if(checkedItems.length > 1) {
								that.messageBox({type:'warning', width:'400', height: '145', html: Language.lang['MESSAGES11605']});
								return;
							}
							
							param = AUIGrid.getCheckedRowItems(that.grid[index],true)[0]['item'];
						} else if(actionToken == 'selectedGrid') {
							param = AUIGrid.getSelectedItems(that.grid[index])[0]['item'];
							if(param.length < 1) {
								that.messageBox({type:'warning', width:'400', height: '145', html: Language.lang['MESSAGES11610']}); // 20200617
																																		// /
																																		// pyj
																																		// /
																																		// 다국어
																																		// 적용
								return;
							}
						} else if(actionToken.indexOf('param') >= 0 && your[actionFirstToken[2]] != undefined) {
							param = your[actionToken];
						}
						
						var newIndex = 2;
						indexInfoList[i]['index'] = index;
						indexInfoList[i]['row'] = i;
						indexInfoList[i]['sequence'] = 1;
						indexInfoList[i]['newIndex'] = newIndex;
						
						that.findBtnClicked(index, true, param, undefined, indexInfoList[i], your);
						
						$('#listPop' + (index + 1)).momModal('show');
						if(your != undefined && your.currentEnterKeyIndex != undefined) {
							your.currentEnterKeyIndex = index;
						}
						AUIGrid.resize(that.grid[newIndex]);
					});
				}
				
				continue;
			}
			
			const actionBtnId = that.processTran[index][i]['dataField'] + (index + 1);
			var isExist = document.getElementById(actionBtnId);		
			if(isExist == undefined) {
				indexInfoList[i]['index'] = index;
				indexInfoList[i]['row'] = i;
				indexInfoList[i]['sequence'] = 1;
				
				const actions = that.processTran[index][i]['dropDown'];
				const actionList = actions.split(',');
				const actionFirstToken = actionList[0].split('#');
				
				if(actionFirstToken.length == 4 && actionFirstToken[0] == 'R' && actionFirstToken[1] == 'CC') {
					AUIGrid.setProp(that.grid[index], 'exportURL' , '0');
					AUIGrid.bind(that.grid[index], 'cellClick', function(e) {
						that.firstPageFlag = true;
						if(that.gridProperty[index].checkId == 'singleRow' || that.gridProperty[index].checkId == 'multipleRows') {
							var current = parseInt(AUIGrid.getProp(that.grid[index], 'exportURL'));
							AUIGrid.setProp(that.grid[index], 'exportURL' , '' + (current + 1));
							
							setTimeout(function() {
								if(AUIGrid.getProp(that.grid[index], 'exportURL') != '1') { 
									AUIGrid.setProp(that.grid[index], 'exportURL' , '0');
									return;
								}
								
								AUIGrid.setProp(that.grid[index], 'exportURL' , '0');
								
								const item = e.item;
								const rowIdField = AUIGrid.getProp(e.pid, 'rowIdField');
								const rowId = item[rowIdField];
								if (that.singleRowIndex[index] == rowId || AUIGrid.isCheckedRowById(e.pid, rowId)) {
									AUIGrid.addUncheckedRowsByIds(e.pid, rowId);
									that.singleRowIndex[index] = undefined;
								} else {
									if (that.gridProperty[index].checkId == 'singleRow' && that.singleRowIndex[index] != undefined) {
										AUIGrid.addUncheckedRowsByIds(e.pid, that.singleRowIndex[index]);
									}

									AUIGrid.addCheckedRowsByIds(e.pid, rowId);
									that.singleRowIndex[index] = rowId;
								}

								if (your != undefined && your.cellClickCallBack != undefined) {
									your.cellClickCallBack(index,rowIndex,target,e);
								}
							}, 400);
						}
							
						var param = {};
						if(actionFirstToken[2] == 'form') {
							param = that.createParam4Form(index, '#form');
							if(param <= 0) {
								setTimeout(function() {
									// that.messageBox({type:'warning',
									// width:'400', height: '145',
									// html:that.searchFilter[index][param *
									// -1]['headerText'] + ' 은(는) 필수 항목입니다.'});
									if(that.searchFilter[index][param * -1]['sortIndex'] == undefined || that.searchFilter[index][param * -1]['sortIndex'] == '') {
										that.messageBox({type: 'warning', width: '400', height: '145', html: that.searchFilter[index][param * -1]['headerText'] +' '+ multiLang.transText('MESSAGE','MSG00043')});
										return;
									}
									
									var message = '';
									var sortIndex = that.searchFilter[index][param * -1]['sortIndex'];
									for(var i = 0; i < that.searchFilter[index].length; i++) {
										if(that.searchFilter[index][i]['sortIndex'] != undefined && that.searchFilter[index][i]['sortIndex'] == sortIndex) {
											if(message == '') {
												message = that.searchFilter[index][i]['headerText'];
											} else {
												message += (', ' + that.searchFilter[index][i]['headerText']);
											}
										}
									}
									
									message += ' 중 적어도 1개는 필수 항목입니다.';
									that.messageBox({type: 'warning', width: '400', height: '145', html: message});
								}, 40);
								
								return;
							}
						} else if(actionFirstToken[2] == 'grid') {
							param = AUIGrid.getGridData(that.grid[index]);
						} else if(actionFirstToken[2] == 'selectedGrid') {
							param = AUIGrid.getSelectedItems(that.grid[index])[0]['item'];
							// 재고입출고이력 상단 그리드 row 클릭 시 검색조건 파라미터 값 추가히기
							var searchParam = that.createParam4Form(index, '#form');
							if(your.menuId == 'MOMCE004_1' && searchParam != undefined) {
								param.fromDate = searchParam.fromDate;
								param.toDate = searchParam.toDate;
								param.ioType = searchParam.ioType;
							}
						} else if(actionFirstToken[2].indexOf('param') >= 0 && your[actionFirstToken[2]] != undefined) {
							param = your[actionFirstToken[2]];
						}
						
						var newIndex = parseInt(actionFirstToken[3].substring(actionFirstToken[3].indexOf('grid')+4)) - 1;
						if(newIndex != index) {
							indexInfoList[i]['newIndex'] = newIndex;
						}
						if(that.firstPageFlag){
							that.findBtnClicked(index, true, param, that.processTranCallBack, indexInfoList[i], your);
						}
						
						/*
						 * modify hists 20191115_001 / pyj / cellClick시
						 * callback실행하는 위치 수정
						 */
						/* start 20191115_001 */
						if(your != undefined && your.cellClickCallBack != undefined) {
							your.cellClickCallBack(index,rowIndex,target,e);
						}
						/* end 20191115_001 */
					});
					
					continue;
				} else if(actionFirstToken.length == 4 && actionFirstToken[0] == 'R' && actionFirstToken[1] == 'CD') {
					AUIGrid.setProp(that.grid[index], 'exportURL' , '0');
					AUIGrid.bind(that.grid[index], 'cellDoubleClick', function(e) {
						that.firstPageFlag = true;
						if(that.gridProperty[index].checkId == 'singleRow' || that.gridProperty[index].checkId == 'multipleRows') {
							var current = parseInt(AUIGrid.getProp(that.grid[index], 'exportURL'));
							AUIGrid.setProp(that.grid[index], 'exportURL' , '' + (current + 1));
							
							setTimeout(function() {
								if(AUIGrid.getProp(that.grid[index], 'exportURL') != '1') { 
									AUIGrid.setProp(that.grid[index], 'exportURL' , '0');
									return;
								}
								
								AUIGrid.setProp(that.grid[index], 'exportURL' , '0');
								
								const item = e.item;
								const rowIdField = AUIGrid.getProp(e.pid, 'rowIdField');
								const rowId = item[rowIdField];
								if (that.singleRowIndex[index] == rowId || AUIGrid.isCheckedRowById(e.pid, rowId)) {
									AUIGrid.addUncheckedRowsByIds(e.pid, rowId);
									that.singleRowIndex[index] = undefined;
								} else {
									if (that.gridProperty[index].checkId == 'singleRow' && that.singleRowIndex[index] != undefined) {
										AUIGrid.addUncheckedRowsByIds(e.pid, that.singleRowIndex[index]);
									}

									AUIGrid.addCheckedRowsByIds(e.pid, rowId);
									that.singleRowIndex[index] = rowId;
								}

								if (your != undefined && your.cellClickCallBack != undefined) {
									your.cellClickCallBack(index,rowIndex,target,e);
								}
							}, 400);
						}
						
						var param = {};
						if(actionFirstToken[2] == 'form') {
							param = that.createParam4Form(index, '#form');
							if(param <= 0) {
								setTimeout(function() {
									// that.messageBox({type:'warning',
									// width:'400', height: '145',
									// html:that.searchFilter[index][param *
									// -1]['headerText'] + ' 은(는) 필수 항목입니다.'});
									if(that.searchFilter[index][param * -1]['sortIndex'] == undefined || that.searchFilter[index][param * -1]['sortIndex'] == '') {
										that.messageBox({type: 'warning', width: '400', height: '145', html: that.searchFilter[index][param * -1]['headerText'] +' '+ multiLang.transText('MESSAGE','MSG00043')});
										return;
									}
									
									var message = '';
									var sortIndex = that.searchFilter[index][param * -1]['sortIndex'];
									for(var i = 0; i < that.searchFilter[index].length; i++) {
										if(that.searchFilter[index][i]['sortIndex'] != undefined && that.searchFilter[index][i]['sortIndex'] == sortIndex) {
											if(message == '') {
												message = that.searchFilter[index][i]['headerText'];
											} else {
												message += (', ' + that.searchFilter[index][i]['headerText']);
											}
										}
									}
									
									message += ' 중 적어도 1개는 필수 항목입니다.';
									that.messageBox({type: 'warning', width: '400', height: '145', html: message});
								}, 40);
								
								return;
							}
						} else if(actionFirstToken[2] == 'grid') {
							param = AUIGrid.getGridData(that.grid[index]);
						} else if(actionFirstToken[2] == 'selectedGrid') {
							param = AUIGrid.getSelectedItems(that.grid[index])[0]['item'];
							// 재고입출고이력 상단 그리드 row 클릭 시 검색조건 파라미터 값 추가히기
							var searchParam = that.createParam4Form(index, '#form');
							if(your.menuId == 'MOMCE004_1' && searchParam != undefined) {
								param.fromDate = searchParam.fromDate;
								param.toDate = searchParam.toDate;
								param.ioType = searchParam.ioType;
							}
						} else if(actionFirstToken[2].indexOf('param') >= 0 && your[actionFirstToken[2]] != undefined) {
							param = your[actionFirstToken[2]];
						}
						
						var newIndex = parseInt(actionFirstToken[3].substring(actionFirstToken[3].indexOf('grid')+4)) - 1;
						if(newIndex != index) {
							indexInfoList[i]['newIndex'] = newIndex;
						}
						
						if(that.firstPageFlag){
							that.findBtnClicked(index, true, param, that.processTranCallBack, indexInfoList[i], your);
						}
				
						/*
						 * modify hists 20191115_001 / pyj / cellClick시
						 * callback실행하는 위치 수정
						 */
						/* start 20191115_001 */
						if(your != undefined && your.cellClickCallBack != undefined) {
							your.cellClickCallBack(index,rowIndex,target,e);
						}
						/* end 20191115_001 */
					});
					
					continue;
				}
			}
			
			const actions = that.processTran[index][i]['dropDown'];
			const actionList = actions.split(',');
			if(actionList == undefined || actionList.length < 1) {
				return;
			}
			
			const actionFirstToken = actionList[0].split('#');
			
			$(document).on('click', '#' + actionBtnId, function(e) {
				that.firstPageFlag = true;
				indexInfoList[i]['index'] = index;
				indexInfoList[i]['row'] = i;
				indexInfoList[i]['sequence'] = 1;
				delete indexInfoList[i]['newIndex'];
				
				if(actionFirstToken.length == 1) {
					that.findBtnClicked(index, true, {}, that.processTranCallBack, indexInfoList[i], your);
				} else if(actionFirstToken.length == 2) {
					var param = {};
					if(actionFirstToken[1] == 'form') {
						param = that.createParam4Form(index, '#form');
						if(param <= 0) {
							setTimeout(function() {
								// that.messageBox({type:'warning', width:'400',
								// height: '145',
								// html:that.searchFilter[index][param *
								// -1]['headerText'] + ' 은(는) 필수 항목입니다.'});
								if(that.searchFilter[index][param * -1]['sortIndex'] == undefined || that.searchFilter[index][param * -1]['sortIndex'] == '') {
									that.messageBox({type: 'warning', width: '400', height: '145', html: that.searchFilter[index][param * -1]['headerText'] +' '+ multiLang.transText('MESSAGE','MSG00043')});
									return;
								}
								
								var message = '';
								var sortIndex = that.searchFilter[index][param * -1]['sortIndex'];
								for(var i = 0; i < that.searchFilter[index].length; i++) {
									if(that.searchFilter[index][i]['sortIndex'] != undefined && that.searchFilter[index][i]['sortIndex'] == sortIndex) {
										if(message == '') {
											message = that.searchFilter[index][i]['headerText'];
										} else {
											message += (', ' + that.searchFilter[index][i]['headerText']);
										}
									}
								}
								
								message += ' 중 적어도 1개는 필수 항목입니다.';
								that.messageBox({type: 'warning', width: '400', height: '145', html: message});
							}, 40);
							
							return;
						}
					} else if(actionFirstToken[1] == 'grid') {
						param = AUIGrid.getGridData(that.grid[index]);
					} else if(actionFirstToken[1] == 'checkedGrid') {
						param = AUIGrid.getCheckedRowItems(that.grid[index],true)[0]['item'];
						if(param.length < 1) {
							that.messageBox({type:'warning', width:'400', height: '145', html: Language.lang['MESSAGES11610']});							
							return;
						}
					} else if(actionFirstToken[1] == 'selectedGrid') {
						param = AUIGrid.getSelectedItems(that.grid[index])[0]['item'];
						if(param.length < 1) {
							that.messageBox({type:'warning', width:'400', height: '145', html: Language.lang['MESSAGES11610']});							
							return;
						}
					} else if(actionFirstToken[1].indexOf('param') >= 0 && your[actionFirstToken[1]] != undefined) {
						param = your[actionFirstToken[1]];
					}
					
					that.findBtnClicked(index, true, param, that.processTranCallBack, indexInfoList[i], your);
				} else if(actionFirstToken.length == 3) {	
					if(actionFirstToken[1].indexOf('grid') < 0) {	// R#queryId#param
						if(actionFirstToken[1].indexOf('.') > 0) {
							var param = {};
							// var method = 'POST';
							if(actionFirstToken[2].indexOf('=') > 0) {
								// method = 'GET';
								actionFirstToken[1] += ('?' + actionFirstToken[2]);
							} else if(actionFirstToken[2] == 'form') {
								param = that.createParam4Form(indexInfoList[i]['index'], '#form');
								if(param <= 0) {
									setTimeout(function() {
										// that.messageBox({type:'warning',
										// width:'400', height: '145',
										// html:that.searchFilter[index][param *
										// -1]['headerText'] + ' 은(는) 필수
										// 항목입니다.'});
										if(that.searchFilter[index][param * -1]['sortIndex'] == undefined || that.searchFilter[index][param * -1]['sortIndex'] == '') {
											that.messageBox({type: 'warning', width: '400', height: '145', html: that.searchFilter[index][param * -1]['headerText'] +' '+ multiLang.transText('MESSAGE','MSG00043')});
											return;
										}
										
										var message = '';
										var sortIndex = that.searchFilter[index][param * -1]['sortIndex'];
										for(var i = 0; i < that.searchFilter[index].length; i++) {
											if(that.searchFilter[index][i]['sortIndex'] != undefined && that.searchFilter[index][i]['sortIndex'] == sortIndex) {
												if(message == '') {
													message = that.searchFilter[index][i]['headerText'];
												} else {
													message += (', ' + that.searchFilter[index][i]['headerText']);
												}
											}
										}
										
										message += ' 중 적어도 1개는 필수 항목입니다.';
										that.messageBox({type: 'warning', width: '400', height: '145', html: message});
									}, 40);
									
									return;
								}
							} else if(actionFirstToken[2] == 'grid') {
								param = AUIGrid.getGridData(that.grid[currentGridIndex])[0];
							} else if(actionFirstToken[2] == 'checkedGrid') {
								param = AUIGrid.getCheckedRowItems(that.grid[currentGridIndex],true)[0]['item'];
								if(param.length < 1) {
									that.messageBox({type:'warning', width:'400', height: '145', html: Language.lang['MESSAGES11610']});									
									return;
								}
							} else if(actionFirstToken[2] == 'selectedGrid') {
								param = AUIGrid.getSelectedItems(that.grid[currentGridIndex])[0]['item'];
								if(param.length < 1) {
									that.messageBox({type:'warning', width:'400', height: '145', html: Language.lang['MESSAGES11610']});									
									return;
								}
							} else if(actionFirstToken[2] == 'data') {
								param = data[0];
							} /*
								 * else if(actionFirstToken[2] == 'callBack') {
								 * param = callBackParam[0]; }
								 */ else if(actionFirstToken[2].indexOf('param') >= 0 && your[actionFirstToken[2]] != undefined) {
								param = your[actionFirstToken[2]];
							}
		
							var paramPair = {param : param, callBackParam : undefined};
							var message = that.procCallInit(index, actionFirstToken[0], paramPair, indexInfoList[i], your);
							if(message != 'SUCCESS') {
								that.splashHide();
								that.messageBox({type:'warning', width:'400', height: '145',  html: message});
								
								return;
							}
							
							param = paramPair['param'];
							// mom_ajax('R', actionFirstToken[1], param,
							// that.processTranCallBack, '', indexInfo, your);
							// 확실하지 않지만.., 변환
							that.findBtnClicked(index, true, param, that.processTranCallBack, indexInfoList[i], your);
						} 
					} else {
						var param = {};							// R#gridN#param
						var newIndex = parseInt(actionFirstToken[1].substring(actionFirstToken[1].indexOf('grid') + 'grid'.length)) - 1;
						if(newIndex != index) {
							indexInfoList[i]['newIndex'] = newIndex;
						}
						
						if(actionFirstToken[2] == 'form') {
							param = that.createParam4Form(index, '#form');
							if(param <= 0) {
								setTimeout(function() {
									// that.messageBox({type:'warning',
									// width:'400', height: '145',
									// html:that.searchFilter[index][param *
									// -1]['headerText'] + ' 은(는) 필수 항목입니다.'});
									if(that.searchFilter[index][param * -1]['sortIndex'] == undefined || that.searchFilter[index][param * -1]['sortIndex'] == '') {
										that.messageBox({type: 'warning', width: '400', height: '145', html: that.searchFilter[index][param * -1]['headerText'] +' '+ multiLang.transText('MESSAGE','MSG00043')});
										return;
									}
									
									var message = '';
									var sortIndex = that.searchFilter[index][param * -1]['sortIndex'];
									for(var i = 0; i < that.searchFilter[index].length; i++) {
										if(that.searchFilter[index][i]['sortIndex'] != undefined && that.searchFilter[index][i]['sortIndex'] == sortIndex) {
											if(message == '') {
												message = that.searchFilter[index][i]['headerText'];
											} else {
												message += (', ' + that.searchFilter[index][i]['headerText']);
											}
										}
									}
									
									message += ' 중 적어도 1개는 필수 항목입니다.';
									that.messageBox({type: 'warning', width: '400', height: '145', html: message});
								}, 40);
								
								return;
							}
						} else if(actionFirstToken[2] == 'grid') {
							param = AUIGrid.getGridData(that.grid[index])[0];
						} else if(actionFirstToken[2] == 'checkedGrid') {
							checkRowItems = AUIGrid.getCheckedRowItems(that.grid[index],true);
							if(checkRowItems.length < 1) {
								that.messageBox({type:'warning', width:'400', height: '145', html: Language.lang['MESSAGES11610']});								
								return;
							} else {
								param = AUIGrid.getCheckedRowItems(that.grid[index],true)[0]['item'];
								var searchParam = that.createParam4Form(index, '#form');
								if(searchParam.fromDate != '' && searchParam.toDate != '') {
									param.fromDate = searchParam.fromDate;
									param.toDate = searchParam.toDate;
								}
							}
						} else if(actionFirstToken[2] == 'selectedGrid') {
							param = AUIGrid.getSelectedItems(that.grid[index])[0]['item'];
							if(param.length < 1) {
								that.messageBox({type:'warning', width:'400', height: '145', html: Language.lang['MESSAGES11610']});								
								return;
							}
						} else if(actionFirstToken[2] == 'data') {
							param = data[0];
						} /*
							 * else if(actionFirstToken[2] == 'callBack') {
							 * param = callBackParam[0]; }
							 */ else if(actionFirstToken[2].indexOf('param') >= 0 && your[actionFirstToken[2]] != undefined) {
							param = your[actionFirstToken[2]];
						}
						
						that.findBtnClicked(index == newIndex ? index : newIndex, false, param, that.processTranCallBack, indexInfoList[i], your);
					}
				} else if(actionFirstToken.length == 4) {		
					if(actionFirstToken[0] == 'E') { // E#queryId#pageId#param
						var file_id = document.getElementById('file' + (indexInfoList[i]['index'] + 1));
						var param = {}
						
						if(actionFirstToken[3].indexOf('param') >= 0 && your[actionFirstToken[3]] != undefined) {
							param = your[actionFirstToken[3]];
						}
						
						var paramPair = {param : param, callBackParam : undefined};
						var message = that.procCallInit(index, actionFirstToken[0], paramPair, indexInfoList[i], your);
						if(message != 'SUCCESS') {
							that.splashHide();
							that.messageBox({type:'warning', width:'400', height: '145',  html: message});
							
							return;
						}
						
						param = paramPair['param'];
						excel_upload(file_id, actionFirstToken[1], actionFirstToken[2], that.grid[indexInfoList[i]['index']], JSON.stringify(param), that.processTranCallBack, callBackParam, indexInfoList[i], your);
						
						return;
					}
					
					var param = [];
					if(actionFirstToken[2] == 'form') {
						var tmp = that.createParam4Form(index, '#form');
						if(tmp <= 0) {
							setTimeout(function() {
								// that.messageBox({type:'warning', width:'400',
								// height: '145',
								// html:that.searchFilter[index][tmp *
								// -1]['headerText'] + ' 은(는) 필수 항목입니다.'});
								if(that.searchFilter[index][param * -1]['sortIndex'] == undefined || that.searchFilter[index][param * -1]['sortIndex'] == '') {
									that.messageBox({type: 'warning', width: '400', height: '145', html: that.searchFilter[index][param * -1]['headerText'] +' '+ multiLang.transText('MESSAGE','MSG00043')});
									return;
								}
								
								var message = '';
								var sortIndex = that.searchFilter[index][param * -1]['sortIndex'];
								for(var i = 0; i < that.searchFilter[index].length; i++) {
									if(that.searchFilter[index][i]['sortIndex'] != undefined && that.searchFilter[index][i]['sortIndex'] == sortIndex) {
										if(message == '') {
											message = that.searchFilter[index][i]['headerText'];
										} else {
											message += (', ' + that.searchFilter[index][i]['headerText']);
										}
									}
								}
								
								message += ' 중 적어도 1개는 필수 항목입니다.';
								that.messageBox({type: 'warning', width: '400', height: '145', html: message});
							}, 40);
							
							return;
						}
						
						param[0] = tmp;
					} else if(actionFirstToken[2] == 'grid') {
						param = AUIGrid.getGridData(that.grid[index]);
					} else if(actionFirstToken[2] == 'checkedGrid') {
						var param1 = AUIGrid.getCheckedRowItems(that.grid[index],true);
						if(param1.length < 1) {
							that.messageBox({type:'warning', width:'400', height: '145', html: Language.lang['MESSAGES11610']});
							
							return;
						}
						
						for(var j = 0; j < param1.length; j++) {
							param[j] = param1[j]['item'];
						}
					} else if(actionFirstToken[2] == 'selectedGrid') {
						var param1 = AUIGrid.getSelectedItems(that.grid[index]);
						if(param1.length < 1) {
							that.messageBox({type:'warning', width:'400', height: '145', html: Language.lang['MESSAGES11610']});
							
							return;
						}
						
						for(var j = 0; j < param1.length; j++) {
							param[j] = param1[j]['item'];
						}
					} else if(actionFirstToken[2].indexOf('checkedGrid') >= 0) {
						var currentGridIndex = parseInt(actionFirstToken[2].substring(actionFirstToken[2].indexOf('checkedGrid') + 'checkedGrid'.length)) - 1;
						var param1 = AUIGrid.getCheckedRowItems(that.grid[currentGridIndex],true);
						if(param1.length < 1) {
							that.messageBox({type:'warning', width:'400', height: '145', html: Language.lang['MESSAGES11610']});
							
							return;
						}
						
						for(var j = 0; j < param1.length; j++) {
							param[j] = param1[j]['item'];
						}
					} else if(actionFirstToken[2].indexOf('selectedGrid') >= 0) {
						var currentGridIndex = parseInt(actionFirstToken[2].substring(actionFirstToken[2].indexOf('selectedGrid') + 'selectedGrid'.length)) - 1;
						var param1 = AUIGrid.getSelectedItems(that.grid[currentGridIndex]);
						if(param1.length < 1) {
							that.messageBox({type:'warning', width:'400', height: '145', html: Language.lang['MESSAGES11610']});
							
							return;
						}
						
						for(var j = 0; j < param1.length; j++) {
							param[j] = param1[j]['item'];
						}
					} else if(actionFirstToken[2].indexOf('param') >= 0 && your[actionFirstToken[2]] != undefined) {
						param = your[actionFirstToken[2]];
					}
					
					if(actionFirstToken[0] == 'R' || actionFirstToken[0] == 'C' || actionFirstToken[0] == 'D' || actionFirstToken[0] == 'U') {
						if(param.length > 0) {
							param = param[0];
						} else {
							param = {};
						}
					} 
					
					var callBackParam = [];
					if(actionFirstToken[3] == 'form') {
						callBackParam = that.createParam4Form(index, '#form');
						if(callBackParam == -1) {
							callBackParam = [];
						}
					} else if(actionFirstToken[3] == 'grid') {
						callBackParam = AUIGrid.getGridData(that.grid[index]);
					} else if(actionFirstToken[3] == 'checkedGrid') {
						var callBackParam1 = AUIGrid.getCheckedRowItems(that.grid[index],true);
						for(var j = 0; j < callBackParam1.length; j++) {
							callBackParam[j] = callBackParam1[j]['item'];
						}
					} else if(actionFirstToken[3] == 'selectedGrid') {
						var callBackParam1 = AUIGrid.getSelectedItems(that.grid[index]);
						for(var j = 0; j < callBackParam1.length; j++) {
							callBackParam[j] = callBackParam1[j]['item'];
						}
					} else if(actionFirstToken[3].indexOf('param') >= 0 && your[actionFirstToken[3]] != undefined) {
						callBackParam = your[actionFirstToken[3]];
					}
					
					if(that.processTran[index][i]['filter']) {
						// ///////////////////////////////////////////////////////////
						var paramPair = {param : param, callBackParam : callBackParam};
						var message = that.procCallInitTran(index, actionFirstToken[0], paramPair, indexInfoList[i], your);
						var ioMonth;
						if(message == 'BREAK') {
							return;
						} else if(message != 'SUCCESS') {
							that.messageBox({type:'warning', width:'400', height: '145',  html: message});						
							return;
						}
						
						param = paramPair['param'];
						callBackParam = paramPair['callBackParam'];
						// XMOMH28 / ljw / 월수불마감에서 일괄취소 시 검색조건에서 선택한 마감월 값 추가
						if(param.yyyymm != undefined) {
							ioMonth = param.yyyymm + " ";
						} else {
							ioMonth = '';
						}
						// ///////////////////////////////////////////////////////////
						if(Array.isArray(param[0])) { // XMOME28 / pyj / 중복 배열  거르기
							param = param[0];
						}
						if(your != undefined && your.groupDelMsg != undefined) {
							that.messageBox({type:'info', width:'400', height: '145', html: your.groupDelMsg + that.processTran[index][i]['headerText'] + ' 하시겠습니까?', closeButton:{text:'Close'}, okButton:{text:'OK', after:function() {
								that.splashShow();
								if(actionFirstToken[0] == 'R') {
									mom_ajax(actionFirstToken[0], actionFirstToken[1], param, that.processTranCallBack, callBackParam, indexInfoList[i], your);
								} else {
									mom_ajax(actionFirstToken[0], actionFirstToken[1], JSON.stringify(param), that.processTranCallBack, callBackParam, indexInfoList[i], your);
								}
							}}});
						} else {
							that.messageBox({type:'info', width:'400', height: '145', html: ioMonth + that.processTran[index][i]['headerText'] + ' 하시겠습니까?', closeButton:{text:'Close'}, okButton:{text:'OK', after:function() {
// that.messageBox({type:'info', width:'400', height: '145', html: ioMonth +
// your.confirmMessage, closeButton:{text:'Close'}, okButton:{text:'OK',
// after:function() { //데모임시
								that.splashShow();
								if(actionFirstToken[0] == 'R') {
									mom_ajax(actionFirstToken[0], actionFirstToken[1], param, that.processTranCallBack, callBackParam, indexInfoList[i], your);
								} else {
									mom_ajax(actionFirstToken[0], actionFirstToken[1], JSON.stringify(param), that.processTranCallBack, callBackParam, indexInfoList[i], your);
								}
							}}});
						}
					} else {
						var paramPair = {param : param, callBackParam : callBackParam};
						var message = that.procCallInit(index, actionFirstToken[0], paramPair, indexInfoList[i], your);
						if(message == 'BREAK') {
							return;
						} else if(message != 'SUCCESS') {
							that.splashHide();
							that.messageBox({type:'warning', width:'400', height: '145',  html: message});
							
							return;
						}
						
						param = paramPair['param'];
						callBackParam = paramPair['callBackParam'];
						if(Array.isArray(param[0])) { // XMOME28 / pyj / 중복 배열  거르기
							param = param[0];
						}
						// that.messageBox({type:'info', width:'400', height:
						// '145', html:that.processTran[index][i]['headerText']
						// + ' 하시겠습니까?', closeButton:{text:'Close'},
						// okButton:{text:'OK', after:function() {
							that.splashShow();
							if(actionFirstToken[0] == 'R') {
								mom_ajax(actionFirstToken[0], actionFirstToken[1], param, that.processTranCallBack, callBackParam, indexInfoList[i], your);
							} else {
								mom_ajax(actionFirstToken[0], actionFirstToken[1], JSON.stringify(param), that.processTranCallBack, callBackParam, indexInfoList[i], your);
							}
						// }}});
					}
				} else if(actionFirstToken.length == 5) {		
					if(actionFirstToken[0] == 'R' && actionFirstToken[1] == 'CS') {
						var param = {};
						if(actionFirstToken[2] == 'form') {
							param = that.createParam4Form(index, '#form');
							if(param <= 0) {
								setTimeout(function() {
									// that.messageBox({type:'warning',
									// width:'400', height: '145',
									// html:that.searchFilter[index][param *
									// -1]['headerText'] + ' 은(는) 필수 항목입니다.'});
									if(that.searchFilter[index][param * -1]['sortIndex'] == undefined || that.searchFilter[index][param * -1]['sortIndex'] == '') {
										that.messageBox({type: 'warning', width: '400', height: '145', html: that.searchFilter[index][param * -1]['headerText'] +' '+ multiLang.transText('MESSAGE','MSG00043')});
										return;
									}
									
									var message = '';
									var sortIndex = that.searchFilter[index][param * -1]['sortIndex'];
									for(var i = 0; i < that.searchFilter[index].length; i++) {
										if(that.searchFilter[index][i]['sortIndex'] != undefined && that.searchFilter[index][i]['sortIndex'] == sortIndex) {
											if(message == '') {
												message = that.searchFilter[index][i]['headerText'];
											} else {
												message += (', ' + that.searchFilter[index][i]['headerText']);
											}
										}
									}
									
									message += ' 중 적어도 1개는 필수 항목입니다.';
									that.messageBox({type: 'warning', width: '400', height: '145', html: message});
								}, 40);
								
								return;
							}
						} else if(actionFirstToken[2] == 'grid') {
							param = AUIGrid.getGridData(that.grid[index]);
						} else if(actionFirstToken[2] == 'checkedGrid') {
							var checkedItems = AUIGrid.getCheckedRowItems(that.grid[index],true);
							if(checkedItems == undefined || checkedItems.length < 1) {
								that.messageBox({type:'warning', width:'400', height: '145', html:Language.lang['MESSAGES11335']});								
								return;
							}
							param = AUIGrid.getCheckedRowItems(that.grid[index],true)[0]['item'];
						} else if(actionFirstToken[2] == 'selectedGrid') {
							param = AUIGrid.getSelectedItems(that.grid[index])[0]['item'];
						} else if(actionFirstToken[2].indexOf('param') >= 0 && your[actionFirstToken[2]] != undefined) {
							param = your[actionFirstToken[2]];
						}
						
						var callBackParam = [];
						if(actionFirstToken[3] == 'form') {
							callBackParam = that.createParam4Form(index, '#form');
							if(callBackParam == -1) {
								callBackParam = [];
							}
						} else if(actionFirstToken[3] == 'grid') {
							callBackParam = AUIGrid.getGridData(that.grid[index]);
						} else if(actionFirstToken[3] == 'checkedGrid') {
							var callBackParam1 = AUIGrid.getCheckedRowItems(that.grid[index],true);
							for(var j = 0; j < callBackParam1.length; j++) {
								callBackParam[j] = callBackParam1[j]['item'];
							}
						} else if(actionFirstToken[3] == 'selectedGrid') {
							var callBackParam1 = AUIGrid.getSelectedItems(that.grid[index]);
							for(var j = 0; j < callBackParam1.length; j++) {
								callBackParam[j] = callBackParam1[j]['item'];
							}
						} else if(actionFirstToken[3].indexOf('param') >= 0 && your[actionFirstToken[3]] != undefined) {
							callBackParam = your[actionFirstToken[3]];
						}
						
						var queryId = that.gridProperty[index]['queryId'];
						var newIndex = parseInt(actionFirstToken[4].substring(actionFirstToken[4].indexOf('grid')+4)) - 1;
						if(newIndex != index) {
							indexInfoList[i]['newIndex'] = newIndex;
							queryId = that.gridProperty[newIndex]['queryId'];
						}

						var paramPair = {param : param, callBackParam : callBackParam};
						var message = that.procCallInit(index, actionFirstToken[0], paramPair, indexInfoList[i], your);
						if(message == 'BREAK') {
							return;
						} else if(message != 'SUCCESS') {
							that.messageBox({type:'warning', width:'400', height: '145',  html: message});							
							return;
						}
						
						param = paramPair['param'];
						callBackParam = paramPair['callBackParam'];
						
						that.splashShow();
						mom_ajax(actionFirstToken[0], queryId, param, that.processTranCallBack, callBackParam, indexInfoList[i], your);
						
						return;
					}
				}
			});
		}
	},
	
	// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 트랜잭션 처리 콜백 함수 관련
	// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 트랜잭션 처리 콜백 함수 관련
	
			
	
	
	isInitGrid: function(index, initCallBack, your) {
		var that = this.grid == undefined ? this.momWidget : this;
		
		setTimeout(function(index, initCallBack, your) {
			if(that.grid[index] == undefined) {
				that.isInitGrid(index, initCallBack, your);
			} else if(your != undefined && your.initColSize == -1) {
				that.isInitGrid(index, initCallBack, your);
			} else {
				if(initCallBack != undefined) {
					initCallBack();
				}
				
				return;
			}
			
		}, 40, index, initCallBack, your);
	},

	// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Global 함수 관련
	// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Global 함수, 메시지 박스
	messageBox: function(options) {
        if($('.momMessageBoxSet').next().attr('class') == 'mm-backdrop fade in mm-stack') {
            $('.mm-backdrop.fade.in.mm-stack').remove();
        }
        
        $('.momMessageBoxSet').remove();
        if(options) {
            if(typeof options == 'string') {
                options = JSON.parse(options);
            } 
            
            if(options.id == null) {
                options.id = '';
            }
            
            var popWidth = (typeof options.width == undefined ? 400 : options.width) + 'px';
            var popHeight = (typeof options.height == undefined ? 200 : options.height) + 'px';
            var popLeft = ($(window).width() / 2) - (popWidth.replace('px', '') / 2) + 'px';
            var popTop = ($(window).height() / 2) - (popHeight.replace('px', '') / 2) + 'px';
            var popType = (typeof options.type == undefined ? 'panel-' + 'primary' : 'panel-' + options.type);
            var warningType = options.type == undefined ? 'success' : options.type;
            // from. 김대성
            var fadeStr = '';
            if(null == options.isFade || options.isFade) {
                fadeStr = ' fade';// 앞에 공백 한칸 꼭 주세요
            }

            $('body').append($('<div/>', {
                'class': 'momMessageBoxSet modal fade' + fadeStr,
                'id': options.id,
                'data-draggable': true
            }));
            $('.momMessageBoxSet').append($('<div/>', {
                'class': 'momMessageBox panel ' + popType,
                style: 'width:' + popWidth + '; height:' + popHeight + '; ' 
            }));
            $('.momMessageBox').append($('<div/>', {
                'class': 'panel-heading w-clearfix'
            }));
            $('.momMessageBox .panel-heading').append($('<div/>', {
                'class': 'pop-h1',
                style: ' display: inline-block; margin-top: 5px; font-size: 15px;',
                html: options.title == null ? 'Message' : options.title
            })).append($('<a/>', {
                href: '#',
                'class': 'w-inline-block close-btn',
                style: 'width: 23px; height: 23px; margin-top: 3px; margin-right: 5px; float: right; border: 2px solid white; border-radius: 50%; color: white; font-size: 10px; line-height: 20px; text-align: center; top:0px; right:0px; padding:0px; background-color: transparent;'
            }));
            $('.momMessageBox .panel-heading .close-btn').append($('<div/>', {
                class: 'w-icon fa fa-times close-icon',
                style: 'margin-top: 0px; margin-right: 0px; display: inline-block;'
            }));
            
            if(options.subTitle != null) {
                $('.momMessageBox').append($('<div/>', {
                    'class': 'panel-toolbar'
                }));
                $('.momMessageBox .panel-toolbar').append($('<div/>', {
                    class: 'pop-tool',
                    style: 'display: block; height: 32px; padding-left: 10px; color: #7d7d7d; line-height: 32px;'
                }));
                $('.momMessageBox .panel-toolbar .pop-tool').append($('<div/>', {
                    class: 'w-icon fa fa-exclamation-triangle'
                })).append($('<div/>', {
                    class: 'pop-txt',
                    style: 'display: inline-block;',
                    html: options.subTitle
                }));
            }
            
            $('.momMessageBox').append($('<div/>', {
                'class': 'panel-body'
            }));
           
            
      
          
            $('.momMessageBox .panel-body').append($('<div/>', {
                'class': 'pop-body',
                style: 'padding: 10px;'
            }));
            var successImg = '<span class="alert-pop-img">'
                + '<svg xmlns="http://www.w3.org/2000/svg" height="60" width="60" viewBox="0 0 24 24">'
                +   '<path fill="#13bfa6" d="M10.3125,16.09375a.99676.99676,0,0,1-.707-.293L6.793,12.98828A.99989.99989,0,0,1,8.207,11.57422l2.10547,2.10547L15.793,8.19922A.99989.99989,0,0,1,17.207,9.61328l-6.1875,6.1875A.99676.99676,0,0,1,10.3125,16.09375Z" opacity=".99"></path><path fill="#71d8c9" d="M12,2A10,10,0,1,0,22,12,10.01146,10.01146,0,0,0,12,2Zm5.207,7.61328-6.1875,6.1875a.99963.99963,0,0,1-1.41406,0L6.793,12.98828A.99989.99989,0,0,1,8.207,11.57422l2.10547,2.10547L15.793,8.19922A.99989.99989,0,0,1,17.207,9.61328Z">'
                +   '</path>'
                + '</svg>'
                +' </span>';
            var dangerImg = '<span class="alert-pop-img">'
                + '<svg xmlns="http://www.w3.org/2000/svg" height="60" width="60" viewBox="0 0 24 24">'
                +   '<path fill="#f07f8f" d="M20.05713,22H3.94287A3.02288,3.02288,0,0,1,1.3252,17.46631L9.38232,3.51123a3.02272,3.02272,0,0,1,5.23536,0L22.6748,17.46631A3.02288,3.02288,0,0,1,20.05713,22Z">'
                +   '</path>'
                +   '<circle cx="12" cy="17" r="1" fill="#e62a45">'
                +   '</circle>'
                +   '<path fill="#e62a45" d="M12,14a1,1,0,0,1-1-1V9a1,1,0,0,1,2,0v4A1,1,0,0,1,12,14Z">'
                +   '</path>'
                + '</svg>'
                + '</span>';
            var warningImg = '<span class="alert-pop-img">'
                + '<svg xmlns="http://www.w3.org/2000/svg" height="60" width="60" viewBox="0 0 24 24">'
				+   '<path fill="#fad383" d="M15.728,22H8.272a1.00014,1.00014,0,0,1-.707-.293l-5.272-5.272A1.00014,1.00014,0,0,1,2,15.728V8.272a1.00014,1.00014,0,0,1,.293-.707l5.272-5.272A1.00014,1.00014,0,0,1,8.272,2H15.728a1.00014,1.00014,0,0,1,.707.293l5.272,5.272A1.00014,1.00014,0,0,1,22,8.272V15.728a1.00014,1.00014,0,0,1-.293.707l-5.272,5.272A1.00014,1.00014,0,0,1,15.728,22Z">'
				+   '</path>'
				+   '<circle cx="12" cy="16" r="1" fill="#f7b731">'
				+   '</circle>'
				+   '<path fill="#f7b731" d="M12,13a1,1,0,0,1-1-1V8a1,1,0,0,1,2,0v4A1,1,0,0,1,12,13Z">'
				+   '</path>'
				+   '</svg>'
				+ '</span>';     
         if(warningType == 'success'){
        	 $('.momMessageBox .panel-body .pop-body').append(successImg);
         }
         else if(warningType == 'danger'){
        	 $('.momMessageBox .panel-body .pop-body').append(dangerImg);
         }
          else if(warningType == 'warning'){
        	 $('.momMessageBox .panel-body .pop-body').append(warningImg);
         }
         else{
        	 $('.momMessageBox .panel-body .pop-body').append(successImg);
         }
           
            $('.momMessageBox .panel-body .pop-body').append($('<div/>', {
                'class': 'w-form',
                style: 'overflow-y: auto;text-align: center;',
                html: options.html
            }));
            $('.momMessageBox').append($('<div/>', {
                'class': 'panel-footer',
                style: 'position: absolute;bottom: 0;width: 100%;'
            }));
            $('.momMessageBox .panel-footer').append($('<div/>', {
                'class': 'pop-footer',
                style: 'height: 35px; line-height: 35px; text-align: center;'
            }));
            
            if(typeof options.okButton != 'undefined') {
                $('.momMessageBox .panel-footer .pop-footer').append($('<a/>', {
                    'class': 'w-inline-block pop-btn btn-ok ' + 'btn-' + options.type,
                    href: '#',
                    style: ' width: 100px; height: 25px; margin-top: 5px; margin-right: 5px; margin-left: 5px; line-height: 27px;;'
                }));
                $('.momMessageBox .panel-footer .btn-ok').append($('<div/>', {
                    class: 'w-icon fa fa-pencil icon',
                    style: 'margin-top: 0px; margin-right: 5px; font-size: 12px;'
                })).append($('<div/>', {
                    class: 'pop-txt',
                    html: typeof options.okButton.text == 'undefined' ? 'OK' : options.okButton.text,
                    style: 'display: inline-block;'
                }));
                
                if(typeof options.okButton.after != 'undefined') {
                    $('.momMessageBoxSet .momMessageBox .panel-footer .pop-footer .btn-ok').click(function (e) {
                        options.okButton.after(e);                       
                        $('.momMessageBoxSet').momModal('hide');
                        e.stopProgation();	
                    });
                }
            }

            if(options.closeButton == null) {
                options.closeButton = {};
            }
            
            $('.momMessageBoxSet .momMessageBox .panel-footer .pop-footer').append($('<a/>', {
                'class': 'w-inline-block btn-cancel '+warningType,
                href: '#',
                style: ''
            }));
            $('.momMessageBox .panel-footer .btn-cancel').append($('<div/>', {
                class: 'w-icon fa fa-close',
                style: 'margin-top: 0px; margin-right: 5px; font-size: 12px;'
            })).append($('<div/>', {
                class: 'pop-txt',
                html: typeof options.closeButton.text == 'undefined' ? 'Close' : options.closeButton.text,
                style: 'display: inline-block;'
            }));
            $('.momMessageBox .panel-heading .close-btn').click(function () { 
            	$('.momMessageBoxSet').momModal('hide');
            	if(options.focusId != undefined) {
            		if(options.focusType == 'inputBox') {
                		$(options.focusId).focus();
                	} else {
                		$(options.focusId).jqxComboBox('focus');
                	}
            	}
            });            
            $('.momMessageBox .panel-footer .btn-cancel').click(function () { 
            	$('.momMessageBoxSet').momModal('hide');
            	if(options.focusId != undefined) {
	            	if(options.focusType == 'inputBox') {
	            		$(options.focusId).focus();
	            	} else {
	            		$(options.focusId).jqxComboBox('focus');
	            	}
            	}
            });
            
            if(typeof options.closeButton.after != 'undefined') {
                $('.momMessageBox .panel-heading .close-btn, .momMessageBox .panel-footer .btn-cancel').click(function (e) {
                    options.closeButton.after(e);
                });
            }
        }
        
        $('.momMessageBoxSet').momModal('show');
        
        $('.momMessageBoxSet').css('z-index', 99999999);
        
        $('.btn-ok').focus();
        
    },
    
    // Global 함수, 폼데이터 생성
    getSearchParam: function(index, rootHtml,searchItems) {
    	var result = [];
    	
    		for(var i = 0 ;i< searchItems.length; i++){
    			result[0][searchItems[0][i]] = $('#'+searchItems[0][i]).val();
    		}
    	return result;
    },
    
    procGridWidget: function(index, pageId) {
		var that = this;

		var simpleWidgetFlag = "";
		
		if(sessionStorage.parameters != null ){
			var parameters = JSON.parse(sessionStorage.parameters);
			simpleWidgetFlag = parameters.simpleWidgetFlag;
		}
		
		if(simpleWidgetFlag == "Y") {
			$('#grid' + (index + 1)).parent().siblings('.cardheard').prepend('<a id="gridWidgetSetBtn' + (index + 1) +'" href="#" class="gridWidgetSetBtns w-inline-block btntool floatr"><div class="w-icon fa fa-cog icon"></div><div class="textblock"></div></a>');
			$(document).on('click', '#gridWidgetSetBtn' + (index + 1), function() {
				if($(this).closest('.card').find('.w-widget-auigrid')) {
					window.open('/TU_Platform/admin/MOMXX011.html?pageId=' + pageId + (index + 1), 'Widget Setup', 'width=1600,height=800');
				}
			});
			
			var btns = $('.gridWidgetSetBtns')
			for(var i = 0; i < btns.length; i++) {
				if($(btns[i]).closest('.card, .wcalc320').find('.w-widget-auigrid').length < 1) {
					$(btns[i]).hide();
				};
			}
		}
	},
	
	createDropDown: function(id, data, width1, height1) {
		var width = $('#' + id).width() + 26;
		if(width1 != undefined) {
			width = width1;
		}
		
		var height = $('#' + id).height() + 4 < 24 ? 24 : $('#' + id).height() + 4;
		if(height1 != undefined) {
			height = height1;
		}
		
		$('#' + id).jqxComboBox({width : width, height : height, dropDownHeight : 250, autoDropDownHeight : false, searchMode : 'containsignorecase', autoComplete : true, selectedIndex : 0});
		$('#' + id).removeClass('w-select');
			
		var items = [];
		for(var i = 0; i < data.length; i++) {
			items.push({ label: data[i]['name'], value: data[i]['code'] });
		}
		
		$('#' + id).jqxComboBox('source', items);
		$('#' + id).find('input').attr('readonly', false);
	}, 
	
	dropDownPost: function(index, columnStyle, filter_callback, column_callback, your) {
		var that = this.grid == undefined ? this.momWidget : this;
		
		if(that.searchFilter[index] != undefined) {
			for(var loop = 0; loop < that.searchFilter[index].length; loop++) {
				if(that.searchFilter[index][loop]['dropDown'] != undefined && that.searchFilter[index][loop]['dropDown'].length > 0 && that.searchFilter[index][loop]['dropDown'].indexOf('#') > 0) {
					const i = loop;
					var tokens = that.searchFilter[index][i]['dropDown'].split('#');
					var drop_down = tokens[0];
					var isExit = false;
					for(var j = 1; j < tokens.length; j++) {
						if(j % 2  == 1) {
							if(your[tokens[j]] == undefined) {
								isExist = true;
								continue;
							}
							
							var isJSON = true;
							var seq = 0;
							try {
								isJSON = JSON.stringify(your[tokens[j]]).indexOf('{') >= 0 ? true : false;
							} catch(e) {
								isJSON = false;
							}
							
							if(isJSON) {
								var json = your[tokens[j]];
								var k = 0;
								for(key in json) {
									if(k == 0) {
										if(drop_down.indexOf('?') > 0) {
											drop_down = drop_down.substring(0, drop_down.indexOf('?') + 1);
										}
										drop_down += (key + '=' + json[key]);
										k++;
									} else {
										drop_down += ('&' + key + '=' + json[key]);
									}
								}
							} else {
								drop_down += your[tokens[j]];
							}
						} else {
							drop_down += tokens[j];
						}
					}
					
					if(isExit) {
						continue;
					}
					
					mom_ajax('R', drop_down, {}, function(result, data) {
						if(result != 'SUCCESS' || data.length < 1) {
							return;
						}
						
						// that.dropDownMap.set(that.searchFilter[index][i]['dropDown'],
						// data);
						that.dropDownMap.set(drop_down, data);
						that.createDropDown(that.searchFilter[index][i]['dataField'], data, undefined, that.searchFilter[index][i]['width']);
						
						if(filter_callback != undefined) {
							filter_callback(result, data);
						}
					});
				}
			}
		}
		
		if(that.indexColumn[index] != undefined) {
			for(var loop = 0; loop < that.indexColumn[index].length; loop++) {
				const i = loop;
				//20210217 / pyj / 드롭박스 타입 위젯 옵션으로 변경(input/not input)
				if(that.indexColumn[index][i]['popUp'] != undefined && (that.indexColumn[index][i]['popUp'] == 'DROPDOWN' || that.indexColumn[index][i]['popUp'] == 'DROPDOWN_FIX')) {
					const INDEX = that.indexColumn[index][i]['INDEX'];
					var comboType = '';
					if(that.indexColumn[index][i]['popUp'] == 'DROPDOWN_FIX') {
						comboType = 'DropDownListRenderer';
					} else {
						comboType = 'ComboBoxRenderer';
					}
					if(that.columnProperty[index][INDEX]['dropDown'].indexOf('#') > 0) {
						var tokens = that.columnProperty[index][INDEX]['dropDown'].split('#');
						const data_field = that.columnProperty[index][INDEX]['dataField'];
						var drop_down = tokens[0];
						var isExit = false;
						for(var j = 1; j < tokens.length; j++) {
							if(j % 2  == 1) {
								if(your[tokens[j]] == undefined) {
									isExist = true;
									continue;
								}
								
								var isJSON = true;
								var seq = 0;
								try {
									isJSON = JSON.stringify(your[tokens[j]]).indexOf('{') >= 0 ? true : false;
								} catch(e) {
									isJSON = false;
								}
								
								if(isJSON) {
									var json = your[tokens[j]];
									var k = 0;
									for(key in json) {
										if(k == 0) {
											drop_down += (key + '=' + json[key]);
											k++;
										} else {
											drop_down += ('&' + key + '=' + json[key]);
										}
									}
								} else {
									drop_down += your[tokens[j]];
								}
							} else {
								drop_down += tokens[j];
							}
						}
						
						if(isExit) {
							continue;
						}
						
						const columnStyle1 = columnStyle == undefined ? undefined : (columnStyle == 'RESERVED' ? 'columnStyle' + (index + '' + INDEX) : columnStyle);
						if(that.indexColumn[index][i]['color'] != undefined) {
							that.design(index, INDEX, that.columnProperty[index][INDEX]['color'], that.columnProperty[index][INDEX]['style']);
						} else {
							that.design(index, INDEX, undefined, that.columnProperty[index][INDEX]['style']);
						}
						
						mom_ajax('R', drop_down, {}, function(result, data) {
							if(result != 'SUCCESS' || data.length < 1) {
								return;
							}
							
							// that.dropDownMap.set(that.columnProperty[index][INDEX]['dropDown'],
							// data);
							that.dropDownMap.set(drop_down, data);
							AUIGrid.setColumnPropByDataField(that.grid[index], data_field, {
								style: columnStyle1,
								labelFunction: function(rowIndex, columnIndex, value, item) { 
									var retStr = value;
									for(var i = 0, len = data.length; i < len; i++) {
										if(data[i]['code'] == value) {
											retStr = data[i]['name'];
											break;
										}
									}
									
									return retStr;
								}, editRenderer : {
									type: comboType,
									autoCompleteMode : true, // 자동완성 모드 설정
									matchFromFirst : false, // 처음부터 매치가 아닌 단순 포함되는 자동완성
									autoEasyMode : true, // 자동완성 모드일 때 자동 선택할지 여부 (기본값 : false)
									showEditorBtnOver: true, 
									list: data, 
									keyField: 'code', 
									valueField: 'name',
									validator: function(oldValue, newValue, item, dataField, isClipboard) {
										var valid = false;
										var message = Language.lang['MESSAGES12636'];
										for(var i = 0, len = data.length; i < len; i++) {
											if(isClipboard) {
												if(newValue == data[i]['code']) {
													valid = true;
												}
											} else {
												if(newValue == data[i]['code'] || newValue == data[i]['name']) {
													valid = true;
												} 
											}
										}
										if(newValue == undefined || newValue == '') {
											valid = true;
										} 
										if(isClipboard && !valid) {
											setTimeout(function() {
												showToastMsg(index, item, dataField, Language.lang['MESSAGES12639']);
											},16);
										} 
										
										return  {'validate' : valid, 'message'  : message};
									}
								}
						 	});
							
							if(column_callback != undefined) {
								column_callback(result, data);
							}
						});
					}
				}
			}
		}
	},
	
	dropDownPosPost: function(index, dataField, columnStyle, your) {
		var that = this.grid == undefined ? this.momWidget : this;
		
		if(this.indexColumn[index] != undefined) {
			for(var loop = 0; loop < this.indexColumn[index].length; loop++) {
				const i = loop;
				//20210217 / pyj / 드롭박스 타입 위젯 옵션으로 변경(input/not input)
				if(this.indexColumn[index][i]['popUp'] != undefined && (this.indexColumn[index][i]['popUp'] == 'DROPDOWN' || this.indexColumn[index][i]['popUp'] == 'DROPDOWN_FIX') && this.indexColumn[index][i]['dataField'] == dataField) {
					var INDEX = this.indexColumn[index][i]['INDEX'];
					var comboType = '';
					if(this.indexColumn[index][i]['popUp'] == 'DROPDOWN_FIX') {
						comboType = 'DropDownListRenderer';
					} else {
						comboType = 'ComboBoxRenderer';
					}
					if(this.columnProperty[index][INDEX]['dropDown'].indexOf('#') > 0) {
						var tokens = this.columnProperty[index][INDEX]['dropDown'].split('#');
						const data_field = this.columnProperty[index][INDEX]['dataField'];
						var drop_down = tokens[0];
						var isExit = false;
						for(var j = 1; j < tokens.length; j++) {
							if(j % 2  == 1) {
								if(your[tokens[j]] == undefined) {
									isExist = true;
									continue;
								}
								
								var isJSON = true;
								var seq = 0;
								try {
									isJSON = JSON.stringify(your[tokens[j]]).indexOf('{') >= 0 ? true : false;
								} catch(e) {
									isJSON = false;
								}
								
								if(isJSON) {
									var json = your[tokens[j]];
									var k = 0;
									for(key in json) {
										if(k == 0) {
											drop_down += (key + '=' + json[key]);
											k++;
										} else {
											drop_down += ('&' + key + '=' + json[key]);
										}
									}
								} else {
									drop_down += your[tokens[j]];
								}
							} else {
								drop_down += tokens[j];
							}
						}
						
						if(isExit) {
							continue;
						}
						
						var columnStyle1 = columnStyle == undefined ? undefined : (columnStyle == 'RESERVED' ? 'columnStyle' + (index + '' + INDEX) : columnStyle);
						if(that.indexColumn[index][i]['color'] != undefined) {
							that.design(index, INDEX, that.columnProperty[index][INDEX]['color'], that.columnProperty[index][INDEX]['style']);
						} else {
							that.design(index, INDEX, undefined, that.columnProperty[index][INDEX]['style']);
						}
						mom_ajax('R', drop_down, {}, function(result, data) {
							if(result != 'SUCCESS' || data.length < 1) {
								return;
							}
							
							AUIGrid.setColumnPropByDataField(that.grid[index], data_field, {
								style: columnStyle1,
								labelFunction: function(rowIndex, columnIndex, value, item) { 
									var retStr = value;
									for(var i = 0, len = data.length; i < len; i++) {
										if(data[i]['code'] == value) {
											retStr = data[i]['name'];
											break;
										}
									}
									
									return retStr;
								}, editRenderer: {
									type: comboType,
									autoCompleteMode : true, // 자동완성 모드 설정
									matchFromFirst : false, // 처음부터 매치가 아닌 단순 포함되는 자동완성
									autoEasyMode : true, // 자동완성 모드일 때 자동 선택할지 여부 (기본값 : false)
									showEditorBtnOver: true, // 마우스 오버 시 에디터버턴 보이기
									list: data, 
									keyField: 'code', 
									valueField: 'name',
									validator: function(oldValue, newValue, item, dataField, isClipboard) {
										var valid = false;
										var message = Language.lang['MESSAGES12636'];
										for(var i = 0, len = data.length; i < len; i++) {
											if(isClipboard) {
												if(newValue == data[i]['code']) {
													valid = true;
												}
											} else {
												if(newValue == data[i]['code'] || newValue == data[i]['name']) {
													valid = true;
												} 
											}
										}
										if(newValue == undefined || newValue == '') {
											valid = true;
										} 
										if(isClipboard && !valid) {
											setTimeout(function() {
												showToastMsg(index, item, dataField, Language.lang['MESSAGES12639']);
											},16);
										} 
										
										return  {'validate' : valid, 'message'  : message};
									}
										
								}
						 	});
						}, undefined, undefined, your, 'sync');
					}
				}
			}
		}
	},
	
	setFilterPropByDropDown: function(id, url, data1, call_back) {
		if(url != undefined) {
			mom_ajax('R', url, data1, function(result, data) {				
				if(result != 'SUCCESS' || data.length < 1) {
					return;
				}
				
				var items = []; 
				for(var j = 0; j < data.length; j++) {
					items.push({label: data[j]['name'], value: data[j]['code']});
				}
				
				$('#' + id).jqxComboBox('source', items);
				
				if(call_back != undefined) {
					call_back(result, data);
				}
			}, undefined, undefined, this, 'sync');
		} else {
			$('#' + id).jqxComboBox('clear');
			
			var items = []; 
			for(var j = 0; j < data1.length; j++) {
				items.push({label: data1[j]['name'], value: data1[j]['code']});
			}
			
			$('#' + id).jqxComboBox('source', items);
	
			if(call_back != undefined) {
				call_back();
			}
		}	
	},
	
	setColumnPropByDropDown: function(index, data_field, url, data1, call_back) {
		var that = this;
		//20210217 / pyj / 드롭박스 타입 위젯 옵션으로 변경(input/not input)
		var comboType = 'ComboBoxRenderer';
		if(that.indexColumn[index] != undefined) {
			for(var loop = 0; loop < that.indexColumn[index].length; loop++) {
				const i = loop;
				var INDEX = that.indexColumn[index][i]['INDEX'];
				if(that.columnProperty[index][INDEX]['dataField'] == data_field) {
					if(that.columnProperty[index][INDEX]['popUp'] == 'DROPDOWN_FIX') {
						comboType = 'DropDownListRenderer';
					}
				}
			}
		}
		if(url != undefined) {
			mom_ajax('R', url, data1, function(result, data) {
				if(result != 'SUCCESS' || data.length < 1) {
					if(call_back != undefined) {
						call_back(result, data);
					}
					
					return;
				}
				
				AUIGrid.setColumnPropByDataField(that.grid[index], data_field, {
					labelFunction: function( rowIndex, columnIndex, value, headerText, item ) { 
						var retStr = value;
						for(var i = 0, len = data.length; i < len; i++) {
							if(data[i]['code'] == value) {
								retStr = data[i]['name'];
								break;
							}
						}
						
						return retStr;
					}, editRenderer : {
						type: comboType,
						autoCompleteMode : true, // 자동완성 모드 설정
						matchFromFirst : false, // 처음부터 매치가 아닌 단순 포함되는 자동완성
						autoEasyMode : true, // 자동완성 모드일 때 자동 선택할지 여부 (기본값 : false)
						showEditorBtnOver: true,
						list: data, 
						keyField: 'code', 
						valueField: 'name',
						validator: function(oldValue, newValue, item, dataField, isClipboard) {
							var valid = false;
							var message = Language.lang['MESSAGES12636'];
							for(var i = 0, len = data.length; i < len; i++) {
								if(isClipboard) {
									if(newValue == data[i]['code']) {
										valid = true;
									}
								} else {
									if(newValue == data[i]['code'] || newValue == data[i]['name']) {
										valid = true;
									} 
								}
							}
							if(newValue == undefined || newValue == '') {
								valid = true;
							} 
							if(isClipboard && !valid) {
								setTimeout(function() {
									showToastMsg(index, item, dataField, Language.lang['MESSAGES12639']);
								},16);
							} 
							
							return  {'validate' : valid, 'message'  : message};
						}
					}
			 	});
				
				if(call_back != undefined) {
					call_back(result, data);
				}
			}, undefined, undefined, this, 'sync');
		} else {
			AUIGrid.setColumnPropByDataField(that.grid[index], data_field, {
				editable: true,
				labelFunction: function( rowIndex, columnIndex, value, headerText, item ) { 
					var retStr = value;
					for(var i = 0, len = data1.length; i < len; i++) {
						if(data1[i]['code'] == value) {
							retStr = data1[i]['name'];
							break;
						} 
					}
					return retStr;
				}, editRenderer: {
					type: comboType,
					autoCompleteMode : true, // 자동완성 모드 설정
					matchFromFirst : false, // 처음부터 매치가 아닌 단순 포함되는 자동완성
					autoEasyMode : true, // 자동완성 모드일 때 자동 선택할지 여부 (기본값 : false)
					showEditorBtnOver: true,
					list: data1, 
					keyField: 'code', 
					valueField: 'name',
					validator: function(oldValue, newValue, item, dataField, isClipboard) {
						var valid = false;
						var message = Language.lang['MESSAGES12636'];
						for(var i = 0, len = data1.length; i < len; i++) {
							if(isClipboard) {
								if(newValue == data1[i]['code']) {
									valid = true;
								}
							} else {
								if(newValue == data1[i]['code'] || newValue == data1[i]['name']) {
									valid = true;
								} 
							}
						}
						if(newValue == undefined || newValue == '') {
							valid = true;
						} 
						if(isClipboard && !valid) {
							setTimeout(function() {
								showToastMsg(index, item, dataField, Language.lang['MESSAGES12639']);
							},16);
						} 
						
						return  {'validate' : valid, 'message'  : message};
					}
				}
		 	});
			
			if(call_back != undefined) {
				call_back();
			}
		}
	},
	
	setColumnPropByCalendar: function(index, data_field) {
		AUIGrid.setColumnPropByDataField(this.grid[index], data_field, {
			editable: true,
			dataType: 'date',
			formatString: 'yyyy-mm-dd',
			editRenderer: {
				type: 'CalendarRenderer',
				openDirectly: true,
				onlyCalendar: false,
				showEditorBtn : true,
				showEditorBtnOver: true,
				onlyNumeric : true
			}
		});
	},
	
	setPlanIdDate: function(mode) {
    	var that = this;
    	
		if($('#planId').val() == '') {
			return;
		}
		/*
		 * modify hists XMOMD10 / 20191105 / pyj / PlanId로 PlanDate mapping하는 쿼리
		 * 공통으로 수정(정규발주제외). mode3까지 있던 부분 mode1까지로 줄임.
		 */
		/* start XMOMD10 */
		var queryId = 'plan.demand.demandPlan.planId_date';
		if(mode != undefined && mode == 1) {
			queryId = 'purchase.purchasing.regularOrder.planId_date';
		} 
		
		mom_ajax('R', queryId, {planId: $('#planId').val()}, function(result, data) {
			if(result == 'SUCCESS') {
				if(mode != undefined && mode == 1) {
					$("#fromDate").val(to_date_yyyy_mm_dd(data[0].planDate));
					$("#toDate").val(get_date_diff2(to_date_yyyy_mm_dd(data[0].planDate), 30));
				} else {
					$('#fromDate').val(to_date_yyyy_mm_dd(data[0].fromDate));
					$('#toDate').val(to_date_yyyy_mm_dd(data[0].toPlanDate));
				}
					
				// if(mode != undefined && mode == 3) {
					
				/*
				 * } else {
				 * $('#fromDate').val(to_date_yyyy_mm_dd(data[0].planDate));
				 * $('#toDate').val(to_date_yyyy_mm_dd(data[data.length
				 * -1].planDate)); }
				 */
				/* end XMOMD10 */
			}
		});
	}, 
	
    getDiff: function(sDate, eDate, mode, param1, param2) {
    	var FORMAT = '-';
		var pivot = '';

        var start_dt = sDate.split(FORMAT);
        var end_dt = eDate.split(FORMAT);
        start_dt[1] = (Number(start_dt[1]) - 1) + '';
        end_dt[1] = (Number(end_dt[1]) - 1) + '';
        var from_dt = new Date(start_dt[0], start_dt[1], start_dt[2], '00', '00');
        var to_dt = new Date(end_dt[0], end_dt[1], end_dt[2], '00', '00');
        var compareDay = (to_dt.getTime() - from_dt.getTime()) / 1000 / 60 / 60 / 24 + 1;
        for(var i = 0; i < compareDay; i++) {
            var newDay = new Date(sDate);
            newDay.setDate(newDay.getDate() + i);
            var changeDay = new Date(newDay);
            var changeFY = changeDay.getFullYear();
            var changeHY = changeFY + '';
            var changeHY = changeHY.substring(2, 4);
            var changeM = changeDay.getMonth() + 1;
            var changeD = changeDay.getDate() + 0;
            
            if(changeM < 10) {
                changeM = '0' + changeM;
            } else {
            	changeM = '' + changeM;
            }
            
            if(changeD < 10) {
                changeD = '0' + changeD;
            } else {
            	changeD = '' + changeD;
            }
            
            var lastDay = changeFY + changeM + changeD;
            var lastDisplayDay = changeHY + '/' + changeM + '/' + changeD;            
            if(mode == 0) {
            	if(param1 == undefined && param2 == undefined) {
		            if(i == 0) {
		            	pivot =  "'" + lastDay  +"' AS \"" + lastDisplayDay +"\"";
		            } else {
		            	pivot +=  ", '" + lastDay  +"' AS \"" + lastDisplayDay +"\"";
		            }
            	} else {
            		if(i == 0) {
		            	pivot =  " " + param1 + ", '" + lastDay  +"' , " + param2 + " AS \"" + lastDisplayDay +"\"";
		            } else {
		            	pivot +=  ", " + param1 + ", '" + lastDay  +"' , " + param2 + " AS \"" + lastDisplayDay +"\"";
		            }
            	}
            } else if(mode == 1) {
            	if(param1 == undefined && param2 == undefined) {
            		pivot +=  ", '" + lastDay  +"' AS \"" + lastDisplayDay +"\"";
            	} else {
        			pivot +=  ", " + param1 + ", '" + lastDay  +"' , " + param2 + " AS \"" + lastDisplayDay +"\"";	
            	}
            } else if(mode == 2) {
            	if(param1 == undefined && param2 == undefined) {
		        } else {
            		if(i == 0) {
		            	pivot =  " " + param1 + "('" + lastDay  +"' , '" + param2 + "') AS \"" + lastDisplayDay +"\"";
		            } else {
		            	pivot +=  ", " + param1 + "('" + lastDay  +"' , '" + param2 + "') AS \"" + lastDisplayDay +"\"";
		            }
            	}
            } else if(mode == 3) {
            	if(param1 == undefined && param2 == undefined) {
		        } else {
	            	pivot +=  ", " + param1 + ", '" + lastDay  +"' , " + param2 + " AS \"" + lastDisplayDay +"\"";
            	}
            }
        } 
        
        return pivot;
	},
	
	getDiff2: function(sDate, mode, param, cnt) {
		var pivot = '';
		var changeDay = new Date(sDate);
		var changeM = changeDay.getMonth() + 1;
		var param1 = param;
		var dayOfWeek = changeDay.getDay();
		var date1 = new Date(sDate);
		var firDay = new Date();
		var weekNm = Math.ceil(date1.getDate() / 7);
		var minusDay = 0;
		
		if(mode == 1) {
			for(var i = 0; i < 3; i++) {
				changeM = changeDay.getMonth() + 1
	        	param1 = param.replace(/#/gi, i + 1);
				if(mode == 1) {
					if(i == 0) {
						changeM = changeM - 3;
					} else if(i == 1) {
						changeM = changeM - 2;
					} 
					
					if(changeM < 0) {
						changeM = 13 + changeM;
					} else if(changeM == 0) {
						changeM = changeM + 1;
					} else if(changeM > 0 && i != 2) {
						changeM += 1;
					}
					
					var displayMonth = changeM + 'M';
					pivot += "," + param1 + " AS \"" + displayMonth +"\"";
				} 
			}
			
		} else if(mode == 2) {
			if(dayOfWeek == 0 && weekNm != 1) {
				weekNm -= 1;
			}
			
			if(cnt != '' && cnt != null && cnt != undefined) {
				weekNm = cnt;
			}
			
			for(var i = 0; i < weekNm; i++) {
				if(i > 0) {
					minusDay -= 7;
				}
			}
			
			for(var i = 0; i < weekNm; i++) {
				param1 = param.replace(/#/gi, i + 1);
				
				if(i == 0) {
					switch(dayOfWeek) {
						case 0 : firDay = date1.setDate(date1.getDate() - 6 + minusDay); break; // SUN
						case 1 : firDay = date1.setDate(date1.getDate() - 7 + minusDay); break;  // MON
						case 2 : firDay = date1.setDate(date1.getDate() - 1 + minusDay); break; // TUE
						case 3 : firDay = date1.setDate(date1.getDate() - 2 + minusDay); break; // WED
						case 4 : firDay = date1.setDate(date1.getDate() - 3 + minusDay); break; // THU
						case 5 : firDay = date1.setDate(date1.getDate() - 4 + minusDay); break; // FRI
						case 6 : firDay = date1.setDate(date1.getDate() - 5 + minusDay); break; // SAT
						default : firDay = date1.setDate(date1.getDate()) // MON
					}
					
					if(dayOfWeek == 0) {
						firDay = date1.setDate(date1.getDate() - 7);
					}
				} 
				
				if(i != 0 || dayOfWeek == 0 || dayOfWeek == 1) {
					firDay = date1.setDate(date1.getDate() + 7);
				}
				
				firDay = (date1.getMonth() + 1) + '/' + date1.getDate();
				pivot += "," + param1 + " AS \"" + firDay + 'W\"';
			}
			
		} else if(mode == 3) {
			for(var i = 0; i < 7; i++) {
				param1 = param.replace(/#/gi, i + 1);
				if(i == 0) {
					switch(dayOfWeek) {
						case 0 : firDay = date1.setDate(date1.getDate() - 6); break; // SUN
						case 1 : firDay = date1.setDate(date1.getDate() - 7); break;  // MON
						case 2 : firDay = date1.setDate(date1.getDate() - 1); break; // TUE
						case 3 : firDay = date1.setDate(date1.getDate() - 2); break; // WED
						case 4 : firDay = date1.setDate(date1.getDate() - 3); break; // THU
						case 5 : firDay = date1.setDate(date1.getDate() - 4); break; // FRI
						case 6 : firDay = date1.setDate(date1.getDate() - 5); break; // SAT
						default : firDay = date1.setDate(date1.getDate()) // MON
					}
					
					if(dayOfWeek == 1) {
						date1.setDate(date1.getDate() + 7);
					}
				} else {
					date1.setDate(date1.getDate() + 1);
				}
				
				firDay = (date1.getMonth() + 1) + '/' + date1.getDate();
				
				pivot += "," + param1 + " AS \"" + firDay +'\"';
			} 
		}
        return pivot;
        
	},
	
	
	/*
	 * modify hists XMOMC20 / 20191107 / pyj / 확정생산계획업로드, psi pivot 생성 분기 mode
	 * 수정
	 */
	setColDate : function(index, mode, callBack, your) {
		var that = this;
		
		var columnLayout = AUIGrid.getColumnLayout(this.grid[index]);
		if(columnLayout != undefined && your.initColSize != -1 && columnLayout.length > your.initColSize) {
			for(var i = columnLayout.length - 1; i >= your.initColSize; i--) {
				AUIGrid.removeColumn(this.grid[index], i);
			}
		}
		
		var queryId = 'plan.plan.salesOrderUpload.getDueDate';
		
		if(mode == 1 || mode == 2) {
			var productionPlanId = your.planId;
			$.ajax({
				url  		: that.contextPath() + '/mom/request/com.thirautech.mom.plan.plan.productionPlan.productionPlanId.dummy',
				type 		: 'GET',
				data 		: {planDate:$('#planDate').val()},
				async		: false,
				timeout 	: 30000000,
				dataType 	: 'json',
				contentType : 'application/json; charset=UTF-8',
				success 	: function(data) {
					if(data.length > 0) {
						productionPlanId = data[0]['planId'];
					} else {
						return;
					}
				},
				error		: function(data) {},
				fail 		: function(data) {}
			});
			
			your.initParam['planId'] = productionPlanId;
		}
		if(mode == 1) {
			queryId = 'plan.plan.productionPlan.planId_date';
		} else if(mode == 2 || mode == 3) { // XMOMC20
			queryId = 'plan.plan.productionPlan.planId_days';
		} 
		
		mom_ajax('R', queryId, your.initParam, function(result, data) {
			var dueDateList = [];
			var dueDayList  = [];
			var colDateList = [];
			
			if(mode == 0) {
				your.colDate = '';
			}
			if(data.length > 0) {
				if(mode == 1 || mode == 2) { // XMOMC20
					your.fromDate = data[0].planDate;
					your.toDate = data[data.length - 1].planDate;
				}
				
				for(var i = 0; i < data.length; i++) {
					if(mode == 0) {
						dueDateList[i] = data[i]['dueDate'];
					} else {
						dueDateList[i] = data[i]['planDate'];
					}
					
					if(mode != 3) {
						dueDayList[i] = data[i]['eday'];
						colDateList[i] = dueDateList[i] + dueDayList[i];
					}
					
					if(mode == 0) {
						if(i == 0) {
							your.colDate = "TO_CHAR(SUM(DECODE(TO_CHAR(DUE_DATE, 'YYYYMMDD'), '" + colDateList[0].substring(0, 8) + "', QTY, 0))) AS \"" + colDateList[0].substring(4, 6) + "/" + colDateList[0].substring(6, 8) + "(" + colDateList[0].substring(8, 11).toLowerCase() + ")"+ "\"";
						} else {
							your.colDate += ", TO_CHAR(SUM(DECODE(TO_CHAR(DUE_DATE, 'YYYYMMDD'), '" + colDateList[i].substring(0, 8) + "', QTY, 0))) AS \"" + colDateList[i].substring(4, 6) + "/" + colDateList[i].substring(6, 8) + "(" + colDateList[i].substring(8, 11).toLowerCase() + ")"+ "\"";
						}
					}

					var key = '';
					var columnObj = undefined;
					if(mode == 0) {
						key = colDateList[i].substring(4, 6) + '/' + colDateList[i].substring(6, 8) + '(' + colDateList[i].substring(8, 11).toLowerCase() + ')';
						columnObj = {dataField : key, dataType : 'numeric', formatString : '#,###'};
					} else if(mode == 1) {
						key = colDateList[i].substring(2, 4) + "/" + colDateList[i].substring(4, 6) + "/" + colDateList[i].substring(6, 8);
						columnObj = {dataField : key, dataType : 'numeric', formatString : '#,###', excelTemplateHide : 2};
					} /* start XMOMC20 */
					else if(mode == 2) {
						key = dueDateList[i].substring(2, 4) + "/" + dueDateList[i].substring(4, 6) + "/" + dueDateList[i].substring(6, 8);
						columnObj = {dataField : key, dataType : 'numeric', formatString : '#,###'};
					 /* end XMOMC20 */
					} else if(mode == 3) {
						key = dueDateList[i].substring(2, 4) + "/" + dueDateList[i].substring(4, 6) + "/" + dueDateList[i].substring(6, 8);
						columnObj = { 
							dataField: key, 
							dataType: 'numeric', 
							formatString: '#,###', 
							styleFunction:  function(rowIndex, columnIndex, value, headerText, item, dataField) {
								if(item.category.match('BALANCE')) {
									if(parseInt(value) < 0) {
										return 'redStyle';
									}
									
									return null;
								}
								
								return null;
							}, excelHide: true
						};
						
						if(i == 0) {
							your.pivot = '\'' + dueDateList[i] + '\' AS "' + dueDateList[i].substring(2,4) + '/' + dueDateList[i].substring(4,6) + '/' + dueDateList[i].substr(6,8) + '"';
						} else {
							your.pivot += ', \'' + dueDateList[i] + '\' AS "' + dueDateList[i].substring(2,4) + '/' + dueDateList[i].substring(4,6) + '/' + dueDateList[i].substr(6,8) + '"';
						}
					} 
					
					AUIGrid.addColumn(that.grid[index], columnObj, 'last');
				}
			}
			callBack(); // 20200630 / pyj / 조회된 데이터 없을경우 callback 호출 안해서 위치 변경
		}, undefined, undefined, this, 'sync');		
	}, 
	
	// Deprecated -> date2StringData19 in TU_MOM.common.js
	setDueDate: function(index) {
		var that = this.grid == undefined ? this.momWidget : this;
		
		AUIGrid.setColumnPropByDataField(that.grid[index], 'dueDate', {
			  style: 'columnStyle'
			, labelFunction: function(rowIndex, columnIndex, value, item) { 
					if(value.length > 12) {
						var day = value.substring(0, 10);
						if(parseInt(value.substring(11, 13)) > 0) {
							var new_day = get_date_diff2(day, 1); 
							return new_day;
						} else {
							return day;
						}
					}
					
					return value;
			}, editRenderer: {
				type: 'InputEditRenderer'
			}
		});
	}, 
	
	setEndPeriod: function(menuId, your) {
		mom_ajax('R', 'common.comEndPeriod', {menuId: menuId}, function(result, data) {
			if(result == 'SUCCESS' && data.length > 0) {
				your.endPeriod = data[0]['endPeriod'];
			}
		}, undefined, undefined, this, 'sync');
	},
	

	
	exportToXlsx: function(index, fileName, data, your) {
		if(data == undefined) {
			AUIGrid.exportToXlsx(this.grid[index], {fileName: fileName + '_' + get_current_date("yyyy-mm-dd")});
			return;
		}
		
		var that = this;
		
		if(this.specExcelGrid[index] == undefined) {
			$('body').append('<div id="temp_div4_' + (index + 1) + '" style="width:100%; position:fixed; height:100%; z-index: -999; top:0px"><div id="specExcelGrid' + (index + 1)  + '"></div></div>');
			
			var excelProperty = JSON.parse(JSON.stringify(AUIGrid.getColumnLayout(this.grid[index])));
			
			if(your != undefined && your['specExcelDownCallInit'] != undefined) {
				your.specExcelDownCallInit(index, undefined, undefined, undefined);
			}
			if(your != undefined && your['specExcelDownParam'] != undefined) {
				excelProperty = JSON.parse(JSON.stringify(your.specExcelDownParam));
			}
			
			for(var i = excelProperty.length - 1; i >= 0 ; i--) {
				if(!excelProperty[i]['excelHide']) {
					excelProperty.splice(i, 1);
				} else if(excelProperty[i]['visible'] == undefined || !excelProperty[i]['visible']) {
					excelProperty[i]['visible'] = true;
				}
			}
			
			this.specExcelGrid[index] = AUIGrid.create('#specExcelGrid' + (index + 1), excelProperty, {showRowNumColumn: false});
		} 
		
		AUIGrid.setGridData(this.specExcelGrid[index], data);	
		
		var option = {fileName : fileName};
		option.afterRequestCallback = function() { // 엑셀 만들고 호출되는 콜백함수
			$('.aui-grid-export-progress-modal').remove();
			that.splashHide();
			
			$('#temp_div4_' + (index + 1)).remove();
			AUIGrid.destroy(that.specExcelGrid[index]);
		}
		
		option.progressBar = true;
		
		AUIGrid.exportToXlsx(this.specExcelGrid[index], option);
		
		$('.aui-grid-export-progress-modal').height('100%');
		$('#grid' + (index + 1)).children().append($('.aui-grid-export-progress-modal'));
	},
	
	postSetGridData: function(index) {
		for(var i = 0; i < this.indexColumn[index].length; i++) {
			if(this.indexColumn[index][i]['formatString'] != undefined && this.indexColumn[index][i]['formatString'] != '') {
				const INDEX = this.indexColumn[index][i]['INDEX'];
				const type = (this.columnProperty[index][INDEX]['popUp'] != undefined && this.columnProperty[index][INDEX]['popUp'] == 'CALENDAR') ? 'CalendarRenderer' : 'InputEditRenderer';
				if(this.indexColumn[index][i]['formatString'].toUpperCase() == 'YYYY-MM-DD' && this.indexColumn[index][i]['formatString'].length >= 10) {										
					const data_field = this.columnProperty[index][INDEX]['dataField']; 
					AUIGrid.setColumnPropByDataField(this.grid[index], data_field, {
						labelFunction: function(rowIndex, columnIndex, value, item) { 
							if(value != undefined) {
								value = value.replace(/-/gi,'').replace(/\//gi,'').replace(/ /gi,'').replace(/:/gi,'');
								return value.substring(0,4) + '-' + value.substring(4,6) + '-' + value.substring(6,8);
							}
						}, editRenderer: {
							type: type,
							formatString: 'yyyy-mm-dd',
							openDirectly: true,
							onlyCalendar: false,
							showEditorBtn : true,
							showEditorBtnOver : true,
							onlyNumeric : true
						}
				 	});
				} else if(this.indexColumn[index][i]['formatString'].toUpperCase().indexOf('YYYY-MM-DD HH') >= 0 && this.indexColumn[index][i]['formatString'].length >= 19) {										
					const data_field = this.columnProperty[index][INDEX]['dataField']; 
					AUIGrid.setColumnPropByDataField(this.grid[index], data_field, {
						labelFunction: function(rowIndex, columnIndex, value, item) { 
							value = value.replace(/-/gi,'').replace(/\//gi,'').replace(/ /gi,'').replace(/:/gi,'');
							return value.substring(0,4) + '-' + value.substring(4,6) + '-' + value.substring(6,8) + ' ' + (value.substring(8,10) == '' ? '00' : value.substring(8,10)) + ':' + (value.substring(8,10) == '' ? '00' : value.substring(10,12)) + ':' + (value.substring(8,10) == '' ? '00' : value.substring(12,14));
						}, editRenderer: {
							type: type,
							formatString: 'yyyy-mm-dd hh24:mi:ss',
							openDirectly: true,
							onlyCalendar: false,
							onlyNumeric : true
						}
				 	});
				}
			}
		}
		
		if(this.sortParam[index] != undefined && this.sortParam[index].length > 0) {
			AUIGrid.setSorting(this.grid[index], this.sortParam[index]);
		}
	},
	
	addFileColumn: function(index1, index2, pos, pageId, id, your) {
		var that = this.grid == undefined ? this.momWidget : this;
		
		$('#fileBtn' + (index2 + 1)).remove(); 
		$('#fileUpload' + (index2 + 1)).removeClass('w-input').css('margin-bottom', 0).attr('type', 'file');
		$('#filePop' + (index2 + 1) + ' .searcharea form').append('<input name="attach' + (index2 + 1) + '" id="attach' + (index2 + 1) + '" type="file" accept=".jpg, .jpeg" style="width:100%; display:none;">');
		
		var fileColumn = {
			'headerText':'File', 'dataField':'File', 'width':40, 'visible':true
			,  renderer : { 
				type : 'TemplateRenderer'
			}, labelFunction : function (rowIndex, columnIndex, value, headerText, item ) { 
				return '<div class="grid2FileBtn w-icon fa fa-folder-open-o icon" style="cursor: pointer; font-size: 20px; line-height: 28px;" row-index =' + rowIndex + '> </div>';
			}
		};
			
		AUIGrid.addColumn(that.grid[index1], fileColumn, pos);
		
		var that = this;
		var depId;
		
		$(document).on('click', '.grid2FileBtn', function() {
			AUIGrid.resize(that.grid[index2], $(window).width() * 0.4 - 48, 150);
			var rowIndex = $(this).attr('row-index') != undefined ? $(this).attr('row-index') : your.rowIndex;
			var item = AUIGrid.getItemByRowIndex(that.grid[index1], rowIndex);
			depId = item[id];
			$('#fileUpload' + (index2 + 1)).val('');
			
			var param = { 
				entityName: pageId,
				entityId : depId
			}
			
			that.findBtnClicked(index2, false, param, function(result, data) {
				if(result != 'SUCCESS') {
					return;
				}
				
				AUIGrid.setGridData(that.grid[index2], data);
				$('#filePop' + (index2 + 1)).momModal('show');
				AUIGrid.resize(that.grid[index2]);
			});
		});
		
		var isExist = document.getElementById('fileUploadBtn' + (index2 + 1));
		if(isExist != undefined) {
			$(document).on('click', '#fileUploadBtn' + (index2 + 1), function() {
				if($('#fileUpload' + (index2 + 1)).val() == '') {
					that.messageBox({type:'warning', width:'400', height: '145', html:Language.lang['MESSAGES10347']});
					return;
				}
				
				if(depId == undefined) {
					that.messageBox({type:'warning', width:'400', height: '145', html:Language.lang['MESSAGES10113']});
					return;
				}
				
				/*
				 * 20200522 / pyj / 파일첨부시 init함수 추가
				 */
				
				if(your != undefined && your.fileCallInit != undefined) {
					your.fileCallInit(index1, undefined, undefined, {'index' : index1, 'op' : 'fileUploadBtn'+ (index2 + 1)});
					if(your['initMessage'] != undefined) {
						var err = your['initMessage'];
						that.messageBox({type:'warning', width:'400', height: '145',  html: err});	
						your['initMessage'] = undefined;
						return;
					}
				}
				/* 20200522 end */
				
				var attach = document.getElementById('fileUpload' + (index2 + 1));
				attach_upload(attach, pageId, depId, '{}', function(result, data) {
					if(result == 'SUCCESS') {
						var param = {
							entityId   : depId,
							entityName : pageId
						};
						
						that.findBtnClicked(index2, false, param, function(result, data) {
							if(result != 'SUCCESS') {
								return;
							}
							
							AUIGrid.setGridData(that.grid[index2], data);
						});
					}
				});
			});
		}
		
		isExist = document.getElementById('fileDelBtn' + (index2 + 1));
		if(isExist != undefined) {
			$(document).on('click', '#fileDelBtn' + (index2 + 1), function() {
				var items = AUIGrid.getCheckedRowItems(that.grid[index2]);
				if(items.length == 0) {
					that.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10584']});
					return;
				}
				
				/*
				 * 20200522 / pyj / 파일첨부시 init함수 추가 start
				 */
				if(your != undefined && your.fileCallInit != undefined) {
					your.fileCallInit(index1, undefined, undefined, {'index' : index1, 'op' : 'fileDelBtn'+ (index2 + 1)});
					if(your['initMessage'] != undefined) {
						var err = your['initMessage'];
						that.messageBox({type:'warning', width:'400', height: '145',  html: err});	
						your['initMessage'] = undefined;
						return;
					}
				}
				/* 20200522 end */
				
				var param = [];
				for(var i = 0; i < items.length; i++) {
					param[i] =  {fileId: items[i].item['fileId']};
				}
								
				mom_ajax('LD', 'common.file', JSON.stringify(param), function(result, data) {
					if(result == 'SUCCESS') {
						var param = {
							entityId   : depId,
							entityName : pageId
						}
						
						that.findBtnClicked(index2, false, param, function(result, data) {
							if(result != 'SUCCESS') {
								return;
							}
							
							AUIGrid.setGridData(that.grid[index2], data);
						});
					}
				});
			});
		}
	
		isExist = document.getElementById('fileDownBtn' + (index2 + 1));
		if(isExist != undefined) {
			$(document).on('click', '#fileDownBtn' + (index2 + 1), function() {
				var items = AUIGrid.getCheckedRowItems(that.grid[index2]);
				for(var i = 0; i < items.length; i++) {
					attach_download(depId, pageId, items[i].item.oldFileName);	
				}
			});
		}
		
		$(document).on('click', '.bntpopclose, #fileCloseBtn' + (index2 + 1), function() {
			$('#filePop' + (index2 + 1)).momModal('hide');
		});
	}, 
	
	/*
	 * modify hists 20191116 / pyj / 웹 엑셀 등록 후 취소 할 경우 라인 그어지고 데이터 안없어지는 현상 수정
	 */
	clickCancelBtn2: function(index, your) {
		var that = this.grid == undefined ? this.momWidget : this;
		$(document).on('click', '#cancelCellBtn' + (index + 1), function() {
			var checkedItems = AUIGrid.getCheckedRowItems(that.grid[index],true);
			if(checkedItems.length <= 0) {
				that.messageBox({type:'warning', width:'400', height: '145', html: Language.lang['MESSAGES10585']});
				return;
			}
			
			if(your != undefined && your.cancelCallInit != undefined) {
				your.cancelCallInit(index, checkedItems, undefined, {'index' : index, 'op' : 'cancelCellBtn'+ (index + 1)});
				if(your['initMessage'] != undefined) {
					var err = your['initMessage'];
					that.messageBox({type:'warning', width:'400', height: '145',  html: err});	
					your['initMessage'] = undefined;
					return;
				}
			}
			
			AUIGrid.removeCheckedRows(that.grid[index]); 
			AUIGrid.removeSoftRows(that.grid[index]); // 20191116 / 추가
// AUIGrid.setAllCheckedRows(that.grid[index], true);
			if(your != undefined && your.cancelCallBack != undefined) {
				your.cancelCallBack(index, checkedItems, undefined, {'index' : index, 'op' : 'cancelBtn'+ (index + 1)});
			}
		});
	},
	
	clickAllCancelBtn: function(index) {
		var that = this.grid == undefined ? this.momWidget : this;
		$(document).on('click', '#allCancelBtn' + (index + 1), function() {
			var gridData = AUIGrid.getGridData(that.grid[index]);
			if(gridData.length <= 0) {
				that.messageBox({type:'warning', width:'400', height: '145', html: Language.lang['MESSAGES10328']});
				return;
			}
			
			AUIGrid.clearGridData(that.grid[index]);
		});
	},
	
	/*
	 * modify hist 20191114_001 / pyj / 명세서 출력 함수 인자 추가 및 파라미터명 일부 수정 20200526 /
	 * pyj / 넘기는 인자의 값(queryId1)이 없을 경우 조건 추가
	 */
	specPrint: function(pageId, queryId1, queryId2, id, menuCode1, menuCode2, param1, message, locale) {// 20191114_001
		var that = this.grid == undefined ? this.momWidget : this;
		
		var reportUrl = "";
		mom_ajax('R', 'common.comParameter', {}, function(result, data) {
			if(result != 'SUCCESS' || data == undefined || data.length < 1) {
				return;
			}
			
			reportUrl = data[0].reportApplicationUrl;
		}, undefined, undefined, undefined, 'sync');
		
		var ids = "";
		var cnt = 0;
		var param = {};
		if(queryId1 == 'ALL') {
			param = param1;
		} else {
			for(var i = 0; i < param1.length; i++) {
				if(i == 0) {
					ids += "'" + param1[i]['' + id] + "'";
				} else {
					ids += ",'" + param1[i]['' + id] + "'";
				}
			}
			param[id + 's'] = ids;
		}
		
		
		/*
		 * 20200526 / pyj / 넘기는 인자의 값(queryId1)이 없을 경우 조건 추가 20200618 / pyj /
		 * 취소수량 있을 경우 메세지 나타나면서 발주서도 같이 출력되는 부분 cnt로 조건 추가 수정 start
		 */
		if(queryId1 != undefined && queryId1 != '') {
			if(queryId1 != 'ALL') {
				mom_ajax('R', queryId1, param, function(result, data) {
					if(data.length > 0) {
						cnt = data[0].rowCount;
					}
				},undefined, undefined, this, false);
				
				if(locale == undefined || locale == '') {
					locale = 'KR';
				}
			}
		} 
		if(queryId2 != undefined && queryId2 != '') {
			mom_ajax('R', queryId2, param, function(result, data) {
				if(data.length > 0) {
					cnt++;
				}
			},undefined, undefined, this, false);
			
			if(locale == undefined || locale == '') {
				locale = 'KR';
			}
		} 
		/* 20200526 end */
		if(cnt <= 0) {
			that.messageBox({type:'warning', width:'400', height:'145', html:message});	
		} else {
			var idsUrl = ids.replace("/'/gi","");
			
			var param1 = 'divisionCd='+ sessionStorage.getItem('') + '&companyCd=' + sessionStorage.getItem('companyCd') + '&excelId=' + pageId;
			var param2 = 'divisionCd='+ sessionStorage.getItem('divisionCd') + '&companyCd=' + sessionStorage.getItem('companyCd') + '&locale=' + locale + '&' + menuCode1 + '=' + menuCode2 + '&excelId=' + pageId + '&pId=' + pageId;
			if(queryId1 == 'ALL') {
				param2 += '&' + param;
			} else {
				param2 += '&' + id + 's=' + idsUrl;
			}
			
			
			var jsonStr1 = {'URL': 'http://' + window.location.host + common.contextPath() + '/mom/request/com.thirautech.mom.common.excelPrintForm.dummy?' + param1};
			var jsonStr2 = {'URL': 'http://' + window.location.host + common.contextPath() + '/mom/request/com.thirautech.mom.' + queryId2 + '.dummy?' + param2}; // 20191114_001
			
			var jsonList = [];
			
			jsonList.push(jsonStr1);
			jsonList.push(jsonStr2);
			
			var new_popup = window.open(reportUrl + JSON.stringify(jsonList),'_blank', 'width=10, height=10, left=0, top=0 toolbar=no, menubar=no, scrollbars=no, resizable=yes');
			setTimeout(function () {
				new_popup.close();
			}, 400);
		}
	},
	/*
	 * 20201008 / pyj / itemFcst 동적 컬럼 함수 추가
	 */
	grid2CallInit: function(index, url, initParam) {
		var that = this;
		dateForm = initParam['dateForm'];
		param = initParam;
		mom_ajax('R', url, param, function(result, data) {
			var columnLayout = AUIGrid.getColumnLayout(that.grid[index]);
			var column = {width:120,visible:true};
			if(data.length > 0) {
				for(var i = columnLayout.length - 1; i >= 0; i--) {
					if(columnLayout[i].dataField.indexOf('Qty') > -1) {
						if(data[0][columnLayout[i].dataField] != undefined) {
							columnLayout[i].visible = true;
							columnLayout[i].excelHide = true;
							if(columnLayout[i].dataField.indexOf('m') > -1) {
								if(dateForm == 'W') {
									columnLayout[i].visible = false;
									columnLayout[i].excelHide = false;
								}
								columnLayout[i].headerText = data[0][columnLayout[i].dataField].toString().substr(0,6);
							} else {
								if(columnLayout[i].dataField.indexOf('w') > -1 && dateForm == 'M') {
									columnLayout[i].visible = false;
									columnLayout[i].excelHide = false;
								}
								columnLayout[i].headerText = data[0][columnLayout[i].dataField];
							}
						} else {
							columnLayout[i].visible = false;
							columnLayout[i].excelHide = false;
						}
					}
				}
				AUIGrid.changeColumnLayout(that.grid[index], columnLayout);
			}
			
			that.splashHide('load');								
			return;
		});
	},	
/*
 * }
 * 
 * var momSplash = {
 */
	splitterI: 0,
    splitter: function($el, orientation, size, collapsible) {
		$el = $($el);
		var splitterI = this.splitterI++;
		var className = $el.attr('class');
		if(collapsible == undefined || collapsible == null) {
			collapsible = true;
		}
		$el.append($('<div id="splitter' + splitterI + '" class="' + className + '"></div>'));
		$el.children().css('background', 'inherit');
		$el.children(':eq(1)').css('padding-left', '0px');
		$('#splitter' + splitterI).append($el.children(':eq(0)'));
		$('#splitter' + splitterI).append($el.children(':eq(0)'));
		$('#splitter' + splitterI).jqxSplitter({width: 'calc(100% - 2px)', height:'calc(100% - 2px)', orientation: orientation, panels: [{ size: size, collapsible: collapsible }]});
		$('#splitter' + splitterI).css('border', 'none');
		
		$(window).resize();
		
		$(window).resize(
			function() {
				AUIGrid.resize(momWidget.grid[0]); 
				AUIGrid.resize(momWidget.grid[1]); 
				AUIGrid.resize(momWidget.grid[2]); 
			}
		);
	},
	parentIdHierarchy: function(data, parentKey, childKey) {
		parentKey = parentKey || 'parentId';
		childKey = childKey || 'child';
		var result = [];
		var nameSeq = {};
		
		var keyValueObj = this.keyValueSet({key : 'id', data:data});
		
		for(var key in keyValueObj) {
			var obj = keyValueObj[key];
			var parentId = obj[parentKey];
			if(parentId == 'root') {
				result.push(obj);
			} else {
				if(keyValueObj[parentId]) {
					if(keyValueObj[parentId][childKey] == null) {
						keyValueObj[parentId][childKey] = [];
					} 
					keyValueObj[parentId][childKey].push(obj);
				}
			}
		}
		result.sort(function (a, b) {
			return a.displayOrder - b.displayOrder
		});
		return result;
	},
	keyValueSet: function (options) {
        // options : key, data[]
        // [{col1:"1",col2:"2" },{col1:"11", col2:"22"}]
        // key col1
        // {1: {col1:"1", col2:"2"}, 11: {col1:"11", col2:"22"}}
        // toLowerCase : true -> key 무조건 소문자
        // type : obj, array
        // 배열 오브젝트를 키 오브젝트로 바꿔준다.

        var data = options.data;
        var key = options.key;
        var type = options.type || 'obj';
        var toLowerCase = options.toLowerCase;

        var result = {};
        $.each(data, function (i, v) {
            if (key) {
                var resultKey = v[key];
                if (toLowerCase) {
                    resultKey = resultKey.toLowerCase();
                }
                if (type == 'array') {
                    if (result[resultKey] == null) {
                        result[resultKey] = [];
                    }
                    result[resultKey].push(v);
                } else {
                    result[resultKey] = v;
                }
            } else {
                var resultKey = v;
                if (toLowerCase) {
                    resultKey = resultKey.toLowerCase();
                }
                if (type == 'array') {
                    if (result[resultKey] == null) {
                        result[resultKey] = [];
                    }
                    result[resultKey].push(v);
                } else {
                    result[resultKey] = v;
                }
            }
        });
        return result;
    },
	splash: undefined,
	splash1: undefined,
	splash2: undefined,
    splashName1: 'spinner1_',
    splashName2: 'spinner2_',
    splashIds: [],
    splashInitFlag: true,
    
    splashInit: function() {
    	if(this.splashInitFlag) {
            var that = this;
            $(window).resize(function() {
                // for(var i in that.splashIds) {
                    that.splashResize('#' + that.splashIds[0], 'load');
                    that.splashResize('#' + that.splashIds[1]);
                // }
            });

            this.splashInitFlag = false;
        }
    },
    
    splashSet: function(options) {
    	options = options || {};
    	this.splashInit();
        
        var el = $('body');
        el = $(el);
        el.uniqueId();
        
        // var id = $('body').attr('id');
        this.splashIds.push(el.attr('id'));
        var fontSize = options.fontSize || '50px';
        var background = options.background || 'rgba(0, 0, 0, 0.2)'
        var html = 	 '<div id="#{id}" style="display:none; position: fixed; top:#{top}; text-align: center;font-size: #{fontSize};z-index: 99999999999;background: #{background}; color:white;">' 
                	+	'<div class="w-icon fa fa-spinner fa-spin" style="position: fixed;"></div>';
        
        html += (options['load'] != undefined ? '<br /><br /><br /><div>Loading...</div>' : '');
        html += '</div>';
        
        if(options['load'] != undefined) {
        	el.find('#' + this.splashName2 + el.attr('id')).remove();
        	el.prepend(html.replace(/#{id}/gi, this.splashName1 + el.attr('id')).replace(/#{fontSize}/gi, fontSize).replace(/#{background}/gi, background).replace(/#{top}/gi, el.offset().top + 'px'));
        } else {
        	el.find('#' + this.splashName2 + el.attr('id')).remove();
        	el.prepend(html.replace(/#{id}/gi, this.splashName2 + el.attr('id')).replace(/#{fontSize}/gi, fontSize).replace(/#{background}/gi, background).replace(/#{top}/gi, el.offset().top + 'px'));
        }
        
        for(var i in this.splashIds) {
        	this.splashResize('#' + this.splashIds[i], options['load']);
        }
        
        if(options != undefined) {
        	return '#' + this.splashName1 + el.attr('id');
        }
        
        return '#' + this.splashName2 + el.attr('id');
    },
    
    splashResize: function(el, load) {
        var height = $(el).height();
        var width = $(el).width();
        var spinner = undefined;
        if(load != undefined) {
        	spinner = $('#' + this.splashName1 + $(el).attr('id'));
        } else {
        	spinner = $('#' + this.splashName2 + $(el).attr('id'));
        }
        
        spinner.width(width);
        spinner.height(height);
        spinner.find('.fa').css('line-height', height + 'px');
    },
    
    splashShow: function(load) {
    	if(load != undefined) {
	        if(this.splash1 == undefined && this.splashIds[0] == undefined) {
	            var ret = this.splashSet({load:load});
	        }
	       
	        $('#' + this.splashName1 + this.splashIds[0]).show();
	    } else {
    		if(this.splash2 == undefined && this.splashIds[1] == undefined) {
    			var ret = this.splashSet();
	        }
	       
	        $('#' + this.splashName2 + this.splashIds[1]).show();
    	}
    },
    
    splashHide: function(load) {
    	if(load != undefined) {
    		$('#' + this.splashName1 + this.splashIds[0]).hide();
    	} else {
    		$('#' + this.splashName2 + this.splashIds[1]).hide();
    	}
    },
    
    contextPath: function() {
		return '/TU_Platform';
	},
	
	// 품질관리 하단 그리드(grid2) 셀 배경색 스타일 동적 표시 / 200512 / ljw
	grid2CustomStyle: function(data, param, indexInfo) {
		if(indexInfo != undefined) {
			var index = (indexInfo != undefined && indexInfo['newIndex'] != undefined && indexInfo['newIndex'] != indexInfo['index']) ? indexInfo['newIndex'] : indexInfo['index'];
		}
		
		var that = this;
		var itemValue = [];
		var detailSampleCnt = 0;

		if(param['qty'] != undefined) {
			that.checkCnt = param['qty'];
		}
		
		for(var i = 0; i < data.length; i++) {
			if((data[i].measureType == "PQC" && data[i].state == "SAVE") || data[i].measureType == "IQC" || data[i].measureType == "SIR") {
				detailSampleCnt = data[i].sampleCnt;
				
				if(detailSampleCnt > that.checkCnt) {
					detailSampleCnt = that.checkCnt;
				}
				
				for(var j = 1; j <= detailSampleCnt; j++) {
					itemValue[j] = 'itemValue' + j;
					AUIGrid.setColumnPropByDataField(momWidget.grid[1], itemValue[j], {
						styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
							var number = Number(dataField.replace('itemValue', ''));
							var realSampleCnt;
							if(item.sampleCnt > that.checkCnt) {
								realSampleCnt = that.checkCnt;
							} else {
								realSampleCnt = item.sampleCnt;
							}
							if(itemValue.includes(dataField) && realSampleCnt >= number && ((item.measureType == "PQC" && item.state == "SAVE") || item.measureType == "IQC" || item.measureType == "SIR")) {
								return 'columnStyle';
							}
						}
					});
				}
			}
		}
		
		AUIGrid.setGridData(momWidget.grid[index], data);
		momWidget.splashHide();
	},
	comboBoxSearchCall: function(el, comboOptions, options) {
		var that = this;
		// option
		// - url : 호출할 url
		// - keyName : 검색조건을 보낼 키이름 비우면 key 로 보냄
		// - minLength : 최소 검색 글자수
		var minLength = options.minLength || 4;
		options.local = [];
		options.readonly = false;
		var url = JSON.parse(JSON.stringify(options.url));
		delete options.url;
		var keyName = options.keyName;
		var param = options.param;
		comboOptions = JSON.parse(JSON.stringify(comboOptions));
		comboOptions.remoteAutoComplete = true;
		
		comboOptions.search = function(search) {
// if(search == "") {
// options.local = [];
// micaCommon.comboBox.set(el, comboOptions, options);
// } else {
// if(search.length < minLength) { return; }
// param[keyName] = search;
// $.get(url, param, function(data) {
// options.local = data;
// micaCommon.comboBox.set(el, comboOptions, options);
// $(el).val(search);
// });
// }
		}
		
		momWidget.setComboBox.set(el ,comboOptions, options);
		$(el).find('.jqx-combobox-input').attr('placeholder', 'input over ' + minLength);
		$(el).find('.jqx-combobox-input').on('keyup', function(e) {
			if(e.keyCode == 13) {
				
				var boxId = this.parentElement.id.replace('dropdownlistContent', '');
				var search = $.trim($('#' +boxId).find(":input").val());
				if(search == '') {
					options.local = [];
					momWidget.setComboBox.set(el, comboOptions, options);
				} else {
					if(search.length < minLength) {
						$(el).find('.jqx-combobox-input').attr('placeholder', 'input over ' + minLength);
						return;
					}
					param[keyName] = search;
					$.get(url, param, function(data) {
						options.local = data;
						momWidget.setComboBox.set(el, comboOptions, options);
						$(el).val(search);
						if(data.length < 1) {
							$(el).find('.jqx-combobox-input').attr('placeholder', 'no data');
							$(el).val('');
						}
					});
				}
			}
		});
	},
	setComboBox: {
        list: {},
        reserveDropDownCount: 5,
        set: function (el, comboOptions, options, callBack) {
            // options : url, textName, valueName, hierarchy
            // options : local[] = [{text:"", value:""}]
            // options : readonly (true) // autocomplete 기능.
            // callBack : before(function), after(function)
            el = typeof el == "string" ? $(el) : el;
            
        	if (el.length < 1 ) return; // 동적콤보 없을 때 제외 처리
            el.removeClass("w-select");
            comboOptions = comboOptions || {};
            options = options || {};
            callBack = callBack || {};
            momWidget.fncS.initialized(el, false);
            var checkedIndex;
            if (typeof comboOptions.checkedIndex != "undefined" && comboOptions.checkedIndex != null) {
                checkedIndex = comboOptions.checkedIndex;
                // comboOptions에 checkedIndex항목이 존재시 오류발생 by.ohky
                delete comboOptions.checkedIndex;
            }
            var reserveDropDownHeightFlag = false;
            if (typeof comboOptions.reserveDropDownHeight == "undefined" || comboOptions.reserveDropDownHeight) {
                reserveDropDownHeightFlag = true;
                delete comboOptions.dropDownHeight;
                delete comboOptions.autoDropDownHeight;
                delete comboOptions.reserveDropDownHeight;
            }
            // option 위치 변경 by.joon
            el.jqxComboBox(comboOptions);
            var readonly = options.readonly == null ? true : options.readonly;
            $("#" + el.attr("name")).find("input").attr("readonly", readonly);
            var data = options.data || {};
            this.clear(el);
            if (options.allText) {
            	momWidget.setComboBox.add(el, [{ label: options.allText, value: "" }], { textName: "label", valueName: "value" });
            }
            /*
			 * if (typeof comboOptions.checkboxes != "undefined" &&
			 * comboOptions.checkboxes) { // 중복실행 방지용 변수설정
			 * micaCommon.comboBox.handleCheckChange[el.attr("id")] = true;
			 * 
			 * el.on('checkChange', function (event) { // 실행중이면 return if
			 * (!micaCommon.comboBox.handleCheckChange[event.owner.element.id])
			 * return;
			 * 
			 * micaCommon.comboBox.handleCheckChange[event.owner.element.id] =
			 * false;
			 * 
			 * if (options.allText) { if (event.args.label == options.allText &&
			 * event.args.value == "" && event.args.item.index == 0) { if
			 * (event.args.item.checked) { el.jqxComboBox('uncheckAll');
			 * el.jqxComboBox('checkIndex', 0); } else {
			 * el.jqxComboBox('uncheckAll'); } } else { if
			 * ((el.jqxComboBox('getCheckedItems').length + 1) ==
			 * el.jqxComboBox('getItems').length) {
			 * el.jqxComboBox('uncheckAll'); el.jqxComboBox('checkIndex', 0); }
			 * else if (el.jqxComboBox('getCheckedItems').length > 1) {
			 * el.jqxComboBox('uncheckIndex', 0); } } }
			 * 
			 * micaCommon.comboBox.handleCheckChange[event.owner.element.id] =
			 * true;
			 *  // checkBox 컨트롤 후 "change" 이벤트 발생시킴 el.trigger("change"); }); }
			 */
            if (options.url) {

                var mtype = options.mtype || "POST";
                if (mtype == "get") {
                    ajaxService.setAuth();
                    $.get(options.url, data).done(function (data) {
                        if (typeof (data) == "string") {
                            data = JSON.parse(data);
                        }
                        momWidget.fncS.callBackExec(callBack.before, data, comboOptions, options);
                        var dataObj = momWidget.fncS.hierarchyReturn(data, options.rowsName);
                        momWidget.setComboBox.list[el.attr("id")] = momWidget.fncS.keyValueSet({ data: dataObj, key: options.valueName });
                        momWidget.setComboBox.add(el, dataObj, options);
                        if (comboOptions.searchMode == "none") {
                        }
                        momWidget.setComboBox.selectedIndex(el, comboOptions);
                        if (typeof comboOptions.checkboxes != "undefined" && comboOptions.checkboxes) {
                        	momWidget.setComboBox.checkedIndex(el, checkedIndex);
                        }
                        momWidget.fncS.callBackExec(callBack.after, data, comboOptions, options);
                        momWidget.setComboBox.allCheckFnc(el, comboOptions, options);
                        if (reserveDropDownHeightFlag) {
                        	momWidget.setComboBox.reserveDropDownHeight(el);
                        }
                        momWidget.fncS.initialized(el, true);
                    });
                } else {
                    ajaxService(data, options.url, null, mtype).done(function (data) {
                    	momWidget.fncS.callBackExec(callBack.before, data, comboOptions, options);
                        var dataObj = momWidget.fncS.hierarchyReturn(data, options.rowsName);
                        if (dataObj == null) {
                            if (callBack.exception) {
                            	momWidget.fncS.callBackExec(callBack.exception, data, comboOptions, options);
                            } else {
                                notication.open("warning", "No Data");
                            }
                            return;
                        }
                        momWidget.setComboBox.list[el.attr("id")] = momWidget.fncS.keyValueSet({ data: dataObj, key: options.valueName });
                        momWidget.setComboBox.add(el, dataObj, options);
                        momWidget.setComboBox.selectedIndex(el, comboOptions);
                        if (typeof comboOptions.checkboxes != "undefined" && comboOptions.checkboxes) {
                        	momWidget.setComboBox.checkedIndex(el, checkedIndex);
                        }
                        momWidget.fncS.callBackExec(callBack.after, data, comboOptions, options);
                        momWidget.setComboBox.allCheckFnc(el, comboOptions, options);
                        if (reserveDropDownHeightFlag) {
                        	momWidget.setComboBox.reserveDropDownHeight(el);
                        }
                        momWidget.fncS.initialized(el, true);
                    });
                }
                // (data, url, successFn, method, errorFn, options)
            } else {

                var dataObj = options.local;
                data = options.local;
                if (dataObj != null) {
                	momWidget.setComboBox.list[el.attr("id")] = momWidget.fncS.keyValueSet({ data: dataObj, key: options.valueName });
                	momWidget.fncS.callBackExec(callBack.before, data, comboOptions, options);
                    momWidget.setComboBox.add(el, dataObj, options);
                    momWidget.setComboBox.selectedIndex(el, comboOptions);
                    if (typeof comboOptions.checkboxes != "undefined" && comboOptions.checkboxes) {
                    	momWidget.setComboBox.checkedIndex(el, checkedIndex);
                    }
                    momWidget.fncS.callBackExec(callBack.after, data, comboOptions, options);
                    momWidget.setComboBox.allCheckFnc(el, comboOptions, options);
                    if (reserveDropDownHeightFlag) {
                    	momWidget.setComboBox.reserveDropDownHeight(el);
                    }
                    momWidget.fncS.initialized(el, true);
                }
            }
            if (el.jqxComboBox("dropDownHeight") < 1) { el.jqxComboBox({ dropDownHeight: 250 }); };
            // $("#" + el.attr("name")).find("input").attr("readonly", true);
            el.jqxComboBox(comboOptions);
            if (typeof comboOptions.checkboxes != "undefined" && comboOptions.checkboxes) {
            	momWidget.setComboBox.checkedIndex(el, checkedIndex);
            }
            el.parent().find("#" + (el.attr("id")).replace("_jqxComboBox", "").replace(/_/g, "-")).find("input").attr("readonly", readonly);
        },
        add: function (el, obj, options) {
            // obj : [{label, value}],
            // options : textName, valueName
            obj = obj || {};
            options = options || {};
            el = typeof el == "string" ? $(el) : el;
            if (el.jqxComboBox("dropDownHeight") < 1) { el.jqxComboBox({ dropDownHeight: 250 }); };
            var textName = options.textName || "label";
            var valueName = options.valueName || "value";
            // $.each(obj, function (i, data) {
            // el.jqxComboBox("addItem", { label: data[textName], value:
			// data[valueName] });
            // });
            var items = [];
            items = JSON.parse(JSON.stringify(el.jqxComboBox("source")));
            $.each(obj, function (i, data) {
                items.push({ label: data[textName], value: data[valueName] });
            });
            el.jqxComboBox("source", items);
        },
        clear: function (el) {
            el = typeof el == "string" ? $(el) : el;
            // var num = el.jqxComboBox("getItems").length;
            // for (var i = 0; i < num; i++) {
            // el.jqxComboBox("removeAt", 0);
            // }
            el.jqxComboBox("clear");
            el.jqxComboBox("source", []);
        },
        value: function (el) {
            el = typeof el == "string" ? $(el) : el;
            var values = el.jqxComboBox("getCheckedItems") || el.jqxComboBox("getSelectedItems");
            var result = [];
            if (values.length < 1) {
                var val = $(el.find("input")[0]).attr("value");
                if (val != "") {
                    values = [el.jqxComboBox("getSelectedItem")];
                }
            }

            $.each(values, function (i, value) {
                result.push({ label: value.label, value: value.value });
            });
            // value = $(el.find("input")[0]).attr("value")
            return result;
        },
        checkItem: function (el, obj) {
            // obj: array
            el = typeof el == "string" ? $(el) : el;
            $.each(obj, function (i, v) {
                el.jqxComboBox("checkItem", v);
            });
        },
        selectItem: function (el, obj) {
            // obj: array
            el = typeof el == "string" ? $(el) : el;
            $.each(obj, function (i, v) {
                el.jqxComboBox("selectItem", v);
            });
        },
        selectedIndex: function (el, indexObj) {
            el = $(el);
            var objType = typeof indexObj;

            switch (objType) {
                case "number":
                    el.jqxComboBox("selectIndex", indexObj);
                    break;
                case "object":
                    if (indexObj.selectedIndex != null) {
                        if (Array.isArray(indexObj.selectedIndex)) {
                            $.each(indexObj.selectedIndex, function (idx, item) {
                                el.jqxComboBox("selectIndex", indexObj.selectedIndex[idx]);
                            });
                        } else {
                            el.jqxComboBox("selectIndex", indexObj.selectedIndex);
                        }
                    } else if (Array.isArray(indexObj)) {
                        $.each(indexObj, function (idx, item) {
                            el.jqxComboBox("selectIndex", indexObj[idx]);
                        });
                    }
                    break;
            }
        },
        checkedIndex: function (el, indexObj) {
            el = $(el);
            var objType = typeof indexObj;

            switch (objType) {
                case "number":
                    el.jqxComboBox("checkIndex", indexObj);
                    break;
                case "string":
                    if (indexObj.toUpperCase() == "ALL") {
                        el.jqxComboBox("checkAll");
                    }
                    break;
                case "object":
                    if (indexObj.checkedIndex != null) {
                        if (typeof indexObj.checkedIndex == "number") {
                            el.jqxComboBox("checkIndex", indexObj.checkedIndex);
                        } else if (typeof indexObj.checkedIndex == "string" && indexObj.checkedIndex.toUpperCase() == "ALL") {
                            el.jqxComboBox("checkAll");
                        } else if (Array.isArray(indexObj.checkedIndex)) {
                            $.each(indexObj.checkedIndex, function (idx, item) {
                                el.jqxComboBox("checkIndex", indexObj.checkedIndex[idx]);
                            });
                        }
                    } else if (Array.isArray(indexObj)) {
                        $.each(indexObj, function (idx, item) {
                            el.jqxComboBox("checkIndex", indexObj[idx]);
                        });
                    }
                    break;
            }
        },
        reserveDropDownHeight: function (el) {
            el = $(el);
            if (el.jqxComboBox("getItems").length >= momWidget.setComboBox.reserveDropDownCount) {
                el.jqxComboBox({ autoDropDownHeight: false, dropDownHeight: (momWidget.setComboBox.reserveDropDownCount * 31) });
            } else {
                el.jqxComboBox({ autoDropDownHeight: true });
            }
        },
        allCheckFnc: function (el, comboOptions, options) {
            el.unbind("checkChange");
            var allText = options.allText;
            if (allText && comboOptions.checkboxes) {
                var id = "#" + el.attr("id").replace(/_jqxComboBox/gi, "");
                $(id).on('checkChange', function (event) {
                    if (event.args) {
                        var item = event.args.item;
                        var value = item.value;
                        var label = item.label;
                        var checked = item.checked;
                        if (allText == label) {
                            console.log("==");
                        }
                        var checkList = $(this).jqxComboBox('getCheckedItems');
                        var list = $(this).jqxComboBox("getItems");
                        // var checkedItems =
						// $("#jqxComboBox").jqxComboBox('getCheckedItems');
                    }
                });
            }
        },
        initialized: function (el) {
            return momWidget.fncS.initialized(el);
        }
    },
    fncS: {
        callBackExec: function (callBack, data, elOptions, options) {
            switch (typeof callBack) {
                case "function":
                    callBack(data, elOptions, options);
                    break;
                case "object":
                    $.each(callBack, function (i, value) {
                        value(data, elOptions, options);
                    });
                    break;
            }
        },
        hierarchyReturn: function (data, hierarchy) {
            if (hierarchy == null) {
                return data;
            }
            var hierarchys = [];
            if (typeof hierarchy == "string") {
                hierarchys = hierarchy.split(".");
            } else {
                hierarchys = hierarchy;
            }

            var nowHierarachy = hierarchys.shift();
            // 위치고민 1
            data = data[nowHierarachy];
            if (data == null) { // sjjo data null 부분 위치 고민 2
                return data;
            }

            if (hierarchys.length > 0) {
                data = this.hierarchyReturn(data, hierarchys);
            }
            return data;
        },
        fncMerge: function (callBack, callBack2, position) {
            // position : merge 시킬 위치. ex : 1 > callBack 1 번째 다음 (순서임) , 0 >
			// 맨처음.
            // position : 비어있을시 callback 마지막 다음.
            // function을 merge시켜 배열로 리턴.
            var result = [];
            if (callBack != null) { result = this.fncMergeOF(result, callBack) };
            if (callBack2 != null) { result = this.fncMergeOF(result, callBack2, position) };
            return result;
        },
        fncMergeOF: function (result, data, position) {
            result = result || [];
            var tmpPosition = position || result.length;
            switch (typeof data) {
                case "object":
                    $.each(data, function (i, v) {
                        try {
                            Number(i);
                            // result.push(v);
                            result.splice(tmpPosition++, 0, v);
                        }
                        catch (e) {
                            console.error("fncMerge : function or array");
                        }
                    });
                    break;
                case "function":
                    result.splice(tmpPosition++, 0, data);
                    // result.push(data);
                    break;
            }
            return result;
        },
        keyValueSet: function (options) {
            // options : key, data[]
            // [{col1:"1",col2:"2" },{col1:"11", col2:"22"}]
            // key col1
            // {1: {col1:"1", col2:"2"}, 11: {col1:"11", col2:"22"}}
            // toLowerCase : true -> key 무조건 소문자
            // type : obj, array
            // 배열 오브젝트를 키 오브젝트로 바꿔준다.

            var data = options.data;
            var key = options.key;
            var type = options.type || "obj";
            var toLowerCase = options.toLowerCase;

            var result = {};
            $.each(data, function (i, v) {
                if (key) {
                    var resultKey = v[key];
                    if (toLowerCase) {
                        resultKey = resultKey.toLowerCase();
                    }
                    if (type == "array") {
                        if (result[resultKey] == null) {
                            result[resultKey] = [];
                        }
                        result[resultKey].push(v);
                    } else {
                        result[resultKey] = v;
                    }
                } else {
                    var resultKey = v;
                    if (toLowerCase) {
                        resultKey = resultKey.toLowerCase();
                    }
                    if (type == "array") {
                        if (result[resultKey] == null) {
                            result[resultKey] = [];
                        }
                        result[resultKey].push(v);
                    } else {
                        result[resultKey] = v;
                    }
                }
            });
            return result;
        },
        keyValueCancel: function (options) { // keyvalueReturn 을 배열로 해제하여
												// 보내준다.
            var data = options.data;
            var key = options.key;
            var result = [];
            for (var i in data) {
                var dataI = data[i];
                if (key) {
                    dataI[key] = i;
                }
                result.push(dataI);
            }
            return result;
        },
        elObj: function (el) {
            return typeof el == "string" ? $(el) : el;
        },
        randomNum: function (num, end) {
            // num : not null
            // end : null -> num:end. ex:5 -> 0~4
            // end : 5 -> num ~ end(5) , num(start), end(end)
            if (num == null) { return Math.random(); }
            var start = end == null || end < num ? 0 : num;

            end = end + 1 || num * 2;

            var range = end - num;

            var result = Math.floor(Math.random() * range) + start;
            return result;
        },
        rangeNum: function (data) {
            // data : [1,2,3,4,7,8];
            // return : ["1~4", "7~8"];

            data = data.sort(function (a, b) { return a - b; });
            var results = [];
            var result = "";
            var tmp;
            function resultsPush(results, result, tmp) {
                result = result + tmp;
                var resultArray = result.split("~");
                if (resultArray[0] == resultArray[1]) {
                    result = resultArray[0];
                }
                results.push(result);
            }
            $.each(data, function (i, v) {
                if (tmp != v - 1) {
                    if (result.indexOf("~") > -1) {
                        resultsPush(results, result, tmp);
                    }
                    result = v + "~";
                }
                tmp = v;
                if (data.length == i + 1) {
                    resultsPush(results, result, tmp);
                }
            });
            return results;
        },
        byteUnit: function (data) {
            // data(string) : 10MB or 10.3MB ... KB, MB, GB, TB, PB
            // return(number) : 10.3MB -> 10 * 1024 * 1024
            var byte = 1024;
            var byteArray = ["", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
            var pattern = /KB|MB|GB|PB/gi;

            data = data + "";
            var unit = data.match(pattern);
            if (unit) {
                unit = unit[0];
                byte = Math.pow(byte, byteArray.indexOf(unit.toUpperCase()));
                data = Number(data.replace(unit, ""));
                data = data * byte;
            } else {
                data = Number(data);
            }
            if (isNaN(data)) {
                // console.log("Byte Error");
                return -1;
            }
            return data;
        },
        maxUnitByte: function (data, unit) {
            // data(number) : 1023
            // unit(string) : 선택, KB, GB .. PB
            data = Number(data);
            var byte = 1024;
            var byteArray = ["", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
            if (unit == null) {
                var unitNum = data;
                var byteNum = 0;
                while (unitNum > byte - 1) {
                    unitNum = Math.floor(unitNum / byte);
                    byteNum++;
                }
                unit = byteArray[byteNum];
            }
            unit = unit.toUpperCase();
            var unitNum = Math.pow(byte, byteArray.indexOf(unit));
            data = data / unitNum;
            data += "";

            var dataArray = data.split(".");
            if (dataArray.length > 1) {
                var index = dataArray[1].search(/1|2|3|4|5|6|7|8|9/);
                index += 2;
                data = Number(data).toFixed(index);
            }
            data = data + unit;
            return data;
        },
        initialized: function (el, flag) {
            var id = $(el).attr("id");
            if (this.initialized.list == null) {
                this.initialized.list = {};
            }
            if (flag == null) {
                return this.initialized.list[id];
            } else {
                this.initialized.list[id] = flag;
            }
        },
        cssStyleGet: function (cssName, styleName, property) {
            // attribute 내에 정의된 스타일이 아닌 css파일로 정의된 스타일 정보를 가져올수 있다. (실제로 %로
			// 지정되어있는 값도 가능)

            // cssName : css파일 이름
            // styleName : 정의된 스타일의 선택자 -> "div" or ".class"
            // property : 정의된 스타일 이름 - > "width" or "margin-top" ... .. .

            if (cssName == null) {
                return null;
            }
            cssName = cssName.replace(/ /gi, "");
            if (fncS.cssStyleGet.cssObj == null) {
                fncS.cssStyleGet.cssObj = {};
                var styleSheets = document.styleSheets;
                $.each(styleSheets, function (i, v) {
                    if (v.href != null) {
                        var csSName = v.href.split("/");
                        csSName = csSName[csSName.length - 1];
                        csSName = csSName.substr(0, csSName.length - 4).replace(/%20/gi, "");
                        micaCommon.fncS.cssStyleGet.cssObj[csSName] = {};
                        $.each(v.rules, function (ii, vv) {
                            clasSName = vv.selectorText;
                            fncS.cssStyleGet.cssObj[csSName][clasSName] = vv.style;
                        });
                    }
                });
            }
            var result = fncS.cssStyleGet.cssObj;
            if (cssName) {
                result = result[cssName];
                if (styleName && result) {
                    result = result[styleName];
                    if (property && result) {
                        result = result.getPropertyValue(property);
                    } else {
                        result = null;
                    }
                }
            }
            // micaCommon.fncS.cssStyleGet.cssObj[cssName][styleName].getPropertyValue(property);
            return result;
        },
        leadingZeros: function (n, digits) {
            // 숫자 앞에 0을 붙혀줌.
            var zero = '';

            n = n.toString();

            if (n.length < digits) {
                for (i = 0; i < digits - n.length; i++) {
                    zero += '0';
                }
            }

            return zero + n;
        },
        formatNumber: function (text) {
            text = typeof text == "number" ? text + "" : text;
            return text.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
        },
        animateNumber: function (el, options) {
            options = options || {};
            var floorNum = options.floorNum || 0;
            var floorNumUnit = Math.pow(10, floorNum);
            var appendStr = options.appendStr || "";
            var value = options.value;
            var elem = $(el);
            var current = Number(elem.html().replace(appendStr, "").replace(",", "")) || 0;
            $({ count: current }).animate({ count: value }, {
                duration: 500,
                step: function (now, fx) {
                    if (floorNumUnit == 1) {
                        elem.text(momWidget.fncS.formatNumber(String(Math.round(now))) + appendStr);
                    } else {
                        elem.text(momWidget.fncS.formatNumber(String((Math.floor(now * floorNumUnit) / floorNumUnit).toFixed(floorNum))) + appendStr);
                    }
                }
            });
        }, dateFormat: function (format, date) {
            var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
            var d = date || new Date();
            String.prototype.string = function (len) { var s = '', i = 0; while (i++ < len) { s += this; } return s; };
            String.prototype.zf = function (len) { return "0".string(len - this.length) + this; };
            Number.prototype.zf = function (len) { return this.toString().zf(len); };

            return format.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function ($1) {
                switch ($1) {
                    case "yyyy": return d.getFullYear();
                    case "yy": return (d.getFullYear() % 1000).zf(2);
                    case "MM": return (d.getMonth() + 1).zf(2);
                    case "dd": return d.getDate().zf(2);
                    case "E": return weekName[d.getDay()];
                    case "HH": return d.getHours().zf(2);
                    case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
                    case "mm": return d.getMinutes().zf(2);
                    case "ss": return d.getSeconds().zf(2);
                    case "a/p": return d.getHours() < 12 ? "오전" : "오후";
                    default: return $1;
                }
            });
        }
    },
};

(function ($) {
    'use strict';

    // MODAL CLASS DEFINITION
    // ======================
    var momModal = function (element, options) {
    	this.options = options;
        this.$body = $(document.body);
        this.$element = $(element);
        this.$dialog = this.$element.find('.panel');
        this.$backdrop = null;
        this.isShown = null;
        this.originalBodyPad = null;
        this.scrollbarWidth = 0;
        this.ignoreBackdropClick = false;
        if(this.options.remote) {
            this.$element
              .find('.mm-content')
              .load(this.options.remote, $.proxy(function () {
                  this.$element.trigger('loaded.bs.momModal')
              }, this));
        }
    };

    momModal.VERSION = '3.3.6';

    momModal.TRANSITION_DURATION = 300;
    momModal.BACKDROP_TRANSITION_DURATION = 150;

    momModal.DEFAULTS = {
        backdrop: 'static',
        keyboard: true,
        show: true,
        draggable: true,
        width: false,
        resizable: false,
        paramObject: {}
    };

    momModal.prototype.getParamObject = function () {
        return momModal.DEFAULTS.paramObject;
    };

    momModal.prototype.toggle = function (_relatedTarget) {
        return this.isShown ? this.hide() : this.show(_relatedTarget)
    };

    momModal.prototype.show = function (_relatedTarget) {
    	var that = this;
        var e = $.Event('show.bs.momModal', { relatedTarget: _relatedTarget });
        this.$element.trigger(e);
        if(this.isShown || e.isDefaultPrevented()) {
        	return;
        }

        this.isShown = true;

        this.checkScrollbar();
        this.setScrollbar();
        this.$body.addClass('mm-open');

        this.escape();
        this.resize();
        this.$element.on('click.dismiss.bs.momModal', '[data-dismiss="momModal"]', $.proxy(this.hide, this));

        this.$dialog.on('mousedown.dismiss.bs.momModal', function () {
            that.$element.one('mouseup.dismiss.bs.momModal', function (e) {
                if($(e.target).is(that.$element)) that.ignoreBackdropClick = true;
            })
        });

        this.backdrop(function () {
            var transition = $.support.transition && that.$element.hasClass('fade');
            if(!that.$element.parent().length) {
                that.$element.appendTo(that.$body) // don't move modals dom
													// position
            }

            that.$element.show().scrollTop(0);
            that.adjustDialog();
            if(transition) {
                that.$element[0].offsetWidth; // force reflow
            }

            that.$element.addClass('in');
            that.enforceFocus();
            var e = $.Event('shown.bs.momModal', { relatedTarget: _relatedTarget });

            transition 
            	? that.$dialog 
            			.one('bsTransitionEnd', function () {
            				that.$element.trigger('focus').trigger(e)
            			})
            			.emulateTransitionEnd(momModal.TRANSITION_DURATION) 
            	: that.$element.trigger('focus').trigger(e);
        });
        
        if(that.options.draggable) {
            that.$element.children().first().draggable({
                //handle: '.panel-heading'
                handle: '.modal-dialog'
            });
        }

        if(that.options.width) {
            that.$dialog.css({
                width: that.options.width,
                height: 'auto',
                'max-height': '100%'
            });
        }

        var zIndex = 1040 + (10 * $('.modal:visible').length);
        that.$element.css({
            'z-index': zIndex,
            position: 'fixed'
        });
        
        $('.mm-backdrop').not('.mm-stack').css('z-index', zIndex - 1).addClass('mm-stack');

        that.$element.css('display', 'block');
        that.$dialog.css('margin-top', Math.max(0, ($(window).height() - that.$dialog.height()) / 2));
        if(that.$element.parents('[splitter=col]').length > 0) {
            var colHeight = that.$element.parents('[splitter=col]').height();
            that.$element.parents('[splitter=col]').height('initial');
            setTimeout(function () {
                that.$element.parents('[splitter=col]').height('');
                that.$element.parents('[splitter=col]').height(colHeight);
            });
        }

        if(that.options.resizable) {
            that.$dialog.css({
                overflow: 'hidden'
            });
            
            var resizable = {};
            if(typeof that.options.resizable == 'boolean') {
                resizable = {
                    minHeight: that.$dialog.height(),
                    maxHeight: that.$dialog.height(),
                    minWidth: that.$dialog.width()
                }
            } else {
                resizable = that.options.resizable;
            }
            
            that.$dialog.resizable(resizable);
        }
        
        var grid = $(this.$element.find('.cardcontent').find('div')).attr('id');
        if(grid != undefined && grid.length > 4 && grid.indexOf('grid') >= 0) {
        	AUIGrid.resize(momWidget.grid[parseInt(grid.substring(4,5)) - 1]);
        }
    };

    momModal.prototype.hide = function (e) {
        /*
		 * if(e) { //e.preventDefault(); }
		 */

        e = $.Event('hide.bs.momModal');

        this.$element.trigger(e);

        if(!this.isShown || e.isDefaultPrevented()) {
            return;
        }
        
        this.isShown = false;

        this.escape();
        this.resize();

        $(document).off('focusin.bs.momModal');

        this.$element
        	.removeClass('in')
        	.off('click.dismiss.bs.momModal')
        	.off('mouseup.dismiss.bs.momModal');

        this.$dialog.off('mousedown.dismiss.bs.momModal');

        $.support.transition && this.$element.hasClass('fade') 
        	? this.$element
        		.one('bsTransitionEnd', $.proxy(this.hideModal, this))
        		.emulateTransitionEnd(momModal.TRANSITION_DURATION) 
        	: this.hideModal();
    };

    momModal.prototype.enforceFocus = function () {
        $(document)
        	.off('focusin.bs.momModal') // guard against infinite focus loop
        	.on('focusin.bs.momModal', $.proxy(function (e) {
        		if(this.$element[0] !== e.target && !this.$element.has(e.target).length) {
        			this.$element.trigger('focus');
        		}
        	}, this));
    };

    momModal.prototype.escape = function () {
        if(this.isShown && this.options.keyboard) {
            this.$element.on('keydown.dismiss.bs.momModal', $.proxy(function (e) {
                e.which == 27 && this.hide();
            }, this));
        } else if(!this.isShown) {
            this.$element.off('keydown.dismiss.bs.momModal');
        }
    };

    momModal.prototype.resize = function () {
        if(this.isShown) {
            $(window).on('resize.bs.momModal', $.proxy(this.handleUpdate, this));
        } else {
            $(window).off('resize.bs.momModal');
        }
    };

    momModal.prototype.hideModal = function () {
        var that = this;
        this.$element.hide();
        this.backdrop(function () {
        	that.$body.removeClass('mm-open');
        	that.resetAdjustments();
        	that.resetScrollbar();
        	that.$element.trigger('hidden.bs.momModal');
        });
    };

    momModal.prototype.removeBackdrop = function () {
        this.$backdrop && this.$backdrop.remove();
        this.$backdrop = null;
    };

    momModal.prototype.backdrop = function (callback) {
        var that = this;
        var animate = this.$element.hasClass('fade') ? 'fade' : '';
        if(this.isShown && this.options.backdrop) {
            var doAnimate = $.support.transition && animate;
            this.$backdrop = $(document.createElement('div')).addClass('mm-backdrop ' + animate).appendTo(this.$body);
            this.$element.on('click.dismiss.bs.momModal', $.proxy(function (e) {
                if(this.ignoreBackdropClick) {
                    this.ignoreBackdropClick = false;                    
                    return;
                }
                
                if(e.target !== e.currentTarget) {
                	return;
                }
                
                this.options.backdrop == 'static'
                	? this.$element[0].focus()
                	: this.hide();
            }, this));

            if(doAnimate) {
            	this.$backdrop[0].offsetWidth; // force reflow
            }

            this.$backdrop.addClass('in');
            if(!callback) {
            	return;
            }
            
            doAnimate 
            	? this.$backdrop
            		  .one('bsTransitionEnd', callback)
                	  .emulateTransitionEnd(momModal.BACKDROP_TRANSITION_DURATION) 
                : callback();
        } else if(!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass('in');

            var callbackRemove = function () {
                that.removeBackdrop();
                callback && callback();
            };
            
            $.support.transition && this.$element.hasClass('fade') 
            	? this.$backdrop
            		  .one('bsTransitionEnd', callbackRemove)
            		  .emulateTransitionEnd(momModal.BACKDROP_TRANSITION_DURATION) 
            	: callbackRemove();
        } else if(callback) {
            callback();
        }
    };

    // these following methods are used to handle overflowing modals
    momModal.prototype.handleUpdate = function () {
        this.adjustDialog();
    };

    momModal.prototype.adjustDialog = function () {
        var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight;

        this.$element.css({
        	paddingLeft: !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
        	paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
        });
    };

    momModal.prototype.resetAdjustments = function () {
        this.$element.css({
        	paddingLeft: '',
        	paddingRight: ''
        });
    };

    momModal.prototype.checkScrollbar = function () {
        var fullWindowWidth = window.innerWidth;
        if(!fullWindowWidth) { // workaround for missing window.innerWidth in
								// IE8
            var documentElementRect = document.documentElement.getBoundingClientRect();
            fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
        }
        
        this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth;
        this.scrollbarWidth = this.measureScrollbar();
    };

    momModal.prototype.setScrollbar = function () {
        var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10);
        this.originalBodyPad = document.body.style.paddingRight || '';
        if(this.bodyIsOverflowing) {
        	this.$body.css('padding-right', bodyPad + this.scrollbarWidth);
        }
    };

    momModal.prototype.resetScrollbar = function () {
        this.$body.css('padding-right', this.originalBodyPad);
    };

    momModal.prototype.measureScrollbar = function () { // thx walsh
        var scrollDiv = document.createElement('div');
        scrollDiv.className = 'mm-scrollbar-measure';
        this.$body.append(scrollDiv);
        var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        this.$body[0].removeChild(scrollDiv);
        
        return scrollbarWidth;
    };

    momModal.prototype.confirm = function (option) {
        /*
		 * option : Confirm Modal 설정 옵션 { title : 타이틀 msg : 메세지 yesTxt : yes 버튼
		 * Text noTxt : no 버튼 text yesCallBack : yes 버튼 콜백 함수 noCallBack : no버튼
		 * 콜백 함수 }
		 */
        var defaults = {
            title: 'Confirmation',
            msg: 'Are you sure?',
            yesTxt: 'Yes',
            noTxt: 'No',
            width: '600px',
            backdrop: 'static',
            yesCallBack: false,
            noCallBack: false
        };
        var options = $.extend({}, defaults, typeof option == 'object' && option);

        // confirm modal 수정
        var modalTop = $('<div/>', {
            class: 'modal fade'
        });
        $('body').append(modalTop);
        
        var dialog = $('<div/>', {
            class: 'panel'
        });
        modalTop.append(dialog);
        
        // modal header
        var header = $('<div/>', {
            class: 'panel-heading'
        });
        dialog.append(header);
        
        var headerIcon = $('<a/>', {
            href: '#',
            class: 'w-inline-block close-btn',
            'data-dismiss': 'momModal'
        });
        header.append(headerIcon);
        
        var headercloseIcon = $('<div/>', {
            class: 'w-icon fa fa-times close-icon'
        });
        headerIcon.append(headercloseIcon);
        
        var headerTitle = $('<div/>', {
            class: 'pop-h1',
            text: options.title
        });
        header.append(headerTitle);

        // modal body
        var body = $('<div/>', {
            class: 'panel-body'
        });
        dialog.append(body);
        
        var bodyPop = $('<div/>', {
            class: 'pop-body'
        });
        body.append(bodyPop);
        
        var bodyMsg = $('<div/>', {
            class: 'pop-txt',
            text: options.msg
        });
        bodyPop.append(bodyMsg);

        // modal footer
        var footer = $('<div/>', {
            class: 'panel-footer'
        });
        dialog.append(footer);
        
        var popFooter = $('<div/>', {
            class: 'pop-footer'
        });
        footer.append(popFooter);
        
        var yesBtn = $('<a/>', {
            class: 'w-inline-block pop-btn'
        });
        popFooter.append(yesBtn);
        
        var yesBtnIcon = $('<div/>', {
            class: 'w-icon fa fa-check icon'
        });
        yesBtn.append(yesBtnIcon);
        
        var yesBtnTxt = $('<div/>', {
            class: 'pop-txt',
            text: options.yesTxt
        });
        yesBtn.append(yesBtnTxt);
        
        var noBtn = $('<a/>', {
            class: 'w-inline-block pop-btn grey-btn'
        });
        popFooter.append(noBtn);
        
        var noBtnIcon = $('<div/>', {
            class: 'w-icon fa fa-close icon'
        });
        noBtn.append(noBtnIcon);
        
        var noBtnTxt = $('<div/>', {
            class: 'pop-txt',
            text: options.noTxt
        });
        noBtn.append(noBtnTxt);
        // yes click event
        yesBtn.on('click', function () {
            if(options.yesCallBack && $.isFunction(options.yesCallBack)) {
                options.yesCallBack.call(this, true);
            }
            
            $(modalTop).momModal('hide');

            setTimeout(function () {
                $(modalTop).remove();
            }, 400);
        });

        // no click event
        noBtn.on('click', function () {
            if(options.noCallBack && $.isFunction(options.noCallBack)) {
                options.noCallBack.call(this, false);
            }
            
            $(modalTop).momModal('hide');

            setTimeout(function () {
                $(modalTop).remove();
            }, 400);
        });

        $(modalTop).momModal({
            backdrop: options.backdrop,
            keyboard: false,
            width: options.width
        });
    };

    // MODAL PLUGIN DEFINITION
    // =======================
    function Plugin(option, _relatedTarget) {
        // MODAL에 parameter를 등록 해서 사용 한다.
        if(typeof option == 'string' && option == 'getParams') {
            return $(this).data('params');
        }

        return this.each(function () {
            var $this = $(this);
            if(typeof option.params !== 'undefined') {
                $this.data('params', option.params);
            }
            
            var data = $this.data('bs.momModal');
            var options = $.extend({}, momModal.DEFAULTS, $this.data(), typeof option == 'object' && option);
            $this.attr('tabindex', -1);
            if(!data) {
            	$this.data('bs.momModal', (data = new momModal(this, options)));
            }
            
            if(typeof option == 'string') {
                data[option](_relatedTarget);
            } else if(options.show) {
            	data.show(_relatedTarget);
            }
        });
    };

    var old = $.fn.momModal;

    $.fn.momModal = Plugin;
    $.fn.momModal.Constructor = momModal;

    // MODAL NO CONFLICT
    // =================
    $.fn.momModal.noConflict = function () {
        $.fn.momModal = old;
        
        return this;
    };

    // MODAL DATA-API
    // ==============
 
})(jQuery);

function newFunction(callInitResult, fromIndex, toIndex, that) {
    param = Object.assign(param, callInitResult['param']);
    fromIndex = param.fromIndex;
    toIndex = param.toIndex;
    isCheckCol = that.gridProperty[fromIndex][0]['showRowCheckColumn'];;
    if (isCheckCol == tr) {
        targetItem = that.getCheckedRowItems(that.grid[targetIndex]);
        if (targetItem.length == 0) {
            targetItem = {};
            /* momWidget.messageBox({type:'warning', width:'400', height: '145', html: multiLang.transText('MESSAGE','MSG00034')});
             momWidget.splashHide();
             return;*/
        }
        else {
            targetItem = targetItem[0];
        }

    }
    else {
        fromItem = AUIGrid.getSelectedItems(that.grid[fromIndex])[0];
        if (fromItem == undefined) {
            fromItem = {};
            /* momWidget.messageBox({type:'warning', width:'400', height: '145', html: multiLang.transText('MESSAGE','MSG00052')});
             momWidget.splashHide();
             return;*/
        }
        else {
            fromItem = fromItem['item'];
        }
    }
    return { fromIndex, toIndex };
}
