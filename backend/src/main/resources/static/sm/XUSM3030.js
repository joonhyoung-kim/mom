var grid1 = undefined;
var grid2 = undefined;
var grid9 = undefined;
var gridProp = [];
var columnProp = [];
var searchProp = [];
var popupProp = [];
var prevMenuId = '';
var buttonProp = [];
var tmpComboItem  = undefined;
var chooseTab = 'grid';
var preCombo  = [];
var preCombo2 = undefined;
var tmpCombo1 = undefined;
var tmpCombo2 = undefined;
var initPageLoad = true;
var searchComboItems = [];
var preComboItems = [];
var addBtn  = '<a id="addBtn" href="#" class="w-inline-block btntool widget-btn1"><div tmpTabId="five" class="w-icon fa fa-copy icon widget-btn1-icon"></div><div multi-lang="" class="textblock widget-btn1-text">행추가</div></a>';
var delBtn  = '<a id="delBtn" href="#" class="w-inline-block btntool widget-btn1"><div tmpTabId="five" class="w-icon fa fa-trash-o icon widget-btn1-icon"></div><div multi-lang="" class="textblock widget-btn1-text">삭제</div></a>';
var saveBtn = '<a id="saveBtn" href="#" class="w-inline-block btntool widget-btn1"><div tmpTabId="five" class="w-icon fa fa-pencil icon widget-btn1-icon"></div><div multi-lang="" class="textblock widget-btn1-text">저장</div></a>';
var newBtn  = '<a id="newBtn" href="#" class="w-inline-block btntool widget-btn1"><div tmpTabId="five" class="w-icon fa fa-file-excel-o icon widget-btn1-icon"></div><div multi-lang="" class="textblock widget-btn1-text">신규</div></a>';
var excelUpBtn   = '<a id="excelUpBtn" href="#" class="w-inline-block btntool widget-btn1"><div tmpTabId="five" class="w-icon fa fa-cloud-upload icon widget-btn1-icon"></div><div multi-lang="" class="textblock widget-btn1-text">엑셀업로드</div></a>';
var excelDownBtn = '<a id="excelDownBtn" href="#" class="w-inline-block btntool widget-btn1"><div tmpTabId="five" class="w-icon fa fa-file-excel-o icon widget-btn1-icon"></div><div multi-lang="" class="textblock widget-btn1-text">엑셀다운</div></a>';
var downBtn      = '<a id="downBtn" href="#" class="w-inline-block btntool widget-btn1"><div tmpTabId="three" class="w-icon fa fa-arrow-down icon widget-btn1-icon"></div></a>';
var upBtn        = '<a id="upBtn" href="#" class="w-inline-block btntool widget-btn1"><div tmpTabId="six" class="w-icon fa fa-arrow-up icon widget-btn1-icon"></div></a>';

var INFINITE = 100000000;


// 2020.04.12 hyjeong begins
var singleRowIndex = undefined; 
// 2020.04.12 hyjeong end
var XUSM3030 = {
	initParam		:  undefined,
	searchParam		:  [['menuId','gridId']],
	init: function() {			
		var that = this;
		 $("#gridId").jqxComboBox({ disabled: true }); 
		 searchComboItems[0] = {};
	     $('head').append('<style type="text/css">.my-column-style-edit {background:#c7e8fd;color:black;font-weight:bold;}.aui-grid-edit-column-left{background:#c7e8fd;color:black;text-align: left;}.aui-grid-edit-column-center{background:#c7e8fd;color:black;text-align: center;}.aui-grid-edit-column-right {background:#c7e8fd;color:black;text-align: right;}.aui-grid-default-column-center{background-color:rgb(250 250 250);text-align: center;font-size: 1em;cursor: default;}.aui-grid-default-column-left {background-color:rgb(250 250 250);text-align: left;font-size: 1em;cursor: default;}.aui-grid-default-column-right {background-color:rgb(250 250 250);text-align: right;font-size: 1em;cursor: default;}.excel-upload-danger{background:#eeb55e;font-weight:bold:color:#22741C;}</style>');
	     $('head').append('<style type="text/css">.aui-grid-default-header {background: linear-gradient(to bottom, #f8f8f8, #eee) !important;text-align: center;font-weight: bold;font-size: 1.1em;cursor: pointer;color: black;}</style>');
		that.removeAllBtn();
		$('.widget-box3').append(newBtn);
		$('.widget-box3').append(saveBtn);
		$('.widget-box3').append(excelDownBtn);
		$('.widget-box3').append(excelUpBtn);
		
	
		$('#gridBtn1').css('background'  ,'#0753a1');
		$('#columnBtn1').css('background','#666666');
		$('#searchBtn1').css('background','#666666');
		$('#popupBtn1').css('background' ,'#666666');
		$('#buttonBtn1').css('background','#666666');
		that.setComboBox();
		that.gridGrid('gridInfo');		
		that.event();
		that.gridEvent();
		$('#gridBtn1').css('background'  ,'#0753a1');
		$('#columnBtn1').css('background','#666666');
		$('#searchBtn1').css('background','#666666');
		$('#popupBtn1').css('background' ,'#666666');
		$('#buttonBtn1').css('background','#666666');
		//this.fileInpuSet();
	}, 

	design: function(idx, color, align) {
		if(color.indexOf('H') >= 0) {
			color = color.replace(/H/gi, '#');
			$('head').append('<style>.headerStyle' + idx + '{background:' + color + ';}</style>');
		} else {
			if(align != undefined && align.indexOf('-') > 0) {
				$('head').append('<style>.columnStyle' + idx + '{background:' + color + '; text-align:' + align.substr(0, align.indexOf('-')) + '}</style>');
			} else {
				$('head').append('<style>.columnStyle' + idx + '{background:' + color + '; text-align:center}</style>');
			}
		}
	},
	// 2020.04.12 hyjeong end
	
	
	gridGrid: function(queryId) {
		var that = this;
		if(prevMenuId==''){
				prevMenuId = $('#menuId').val();
		}
		  mom_ajax('R', 'XUSM3030.'+queryId, {menuId:prevMenuId,gridId:$('#gridId').val()}, function(result2, data2) {
	    	  if(result2 != 'SUCCESS') {
			      return;
			      momWidget.splashHide();
		      }
	    	
	    	  var gridValidString = '';					      
		      for(var i=0 ;i<data2.length;i++){					    	  
		    	   if(data2[i].validValue != undefined && data2[i].validValue !='' && data2[i].validValue.length > 4 && data2[i].validValue.substring(1,3) == '[{'){
		    			  gridValidString      = data2[i].validValue.substr(1);
				    	  gridValidString      = gridValidString.substr(0,  gridValidString.length-1);							    	  
				    	  data2[i].validValue  = JSON.parse(gridValidString);	
		    	   }
		    							    	 					    	   			          
		      }					
	           gridProp   = data2;
	     	  var gridValidString = '';					      
		      for(var i=0 ;i<data2.length;i++){	
		    	          data2[i].validItem   = data2[i].validValue;
				    	  data2[i].validValue  =  data2[i].propertyValue;	
				    	  
		      }	
	    	var columnProperty = [{
	  			  dataField 	: 'category' 
	  			, headerText 	: '카테고리'
	  			, width			: 100
	  		},{
	  			  dataField 	: 'propertyName' 
	  			, headerText 	: '속성명'
	  			, width			: 200
	  			, style			: 'left-column'
	  		},{
	  			  dataField 	: 'description' 
	  			, headerText 	: '설명'
	  			, style			: 'left-column'
	  		},{
	  			  dataField 	: 'defaultValue' 
	  			, headerText 	: '기본값'
	  			, width			: 100
	  		},
	  		{
	  			  dataField 	: 'dataType' 
	  			, headerText 	: '자료형'
	  			, width			: 100
	  		},
  		    {
	  			  dataField 	: 'validValue' 
	  			, headerText 	: '유효값'
	  			, width			: 180			
	  			, style: "my-column-style-edit"		
	  		    ,'editable': true
	  		    , labelFunction: function(rowIndex, columnIndex, value, item) { 
	            	var retStr = "";
	            	var comboList = undefined;
	            	if(typeof(value)=='string'){
	            		if(preCombo[rowIndex] == '' || preCombo[rowIndex] == undefined){
		            		for(var i =0; i<gridProp[rowIndex]['validItem'].length ;i++){
			            		if(gridProp[rowIndex]['validItem'][i]['code'] == value) {
			            			return  gridProp[rowIndex]['validItem'][i]["value"];  			            		
			    				} 
			            	}
	            			
	            		}
	            		else{
	            			 comboList = preCombo[rowIndex];
	            		}
	            	 if(comboList != '' && comboList != undefined){	
	            		for(var i =0; i<comboList.length ;i++){
		            		if(comboList[i]["code"] == value) {
		    					retStr = comboList[i]["value"];   				 
		    				} 
		            	}
	            	 }
	            	}
	            	else{
	            		 //var comboList =  value;	            		
	            	}	            				    					    	
	    			return retStr == "" ? value : retStr;	               
				},
				editRenderer : {
					type: 'ComboBoxRenderer',
					autoCompleteMode : true, // 자동완성 모드 설정
					matchFromFirst : false, // 처음부터 매치가 아닌 단순 포함되는 자동완성
					autoEasyMode : false, // 자동완성 모드일 때 자동 선택할지 여부 (기본값 : false)
					showEditorBtnOver: true, 
					/*list: gridProp[0]['validValue'], */
					keyField: 'code', 
					valueField: 'value',
					listFunction : function(rowIndex, columnIndex, item, dataField) {
					    if(typeof(item['validItem'])=='object'){
					    	preCombo[rowIndex] = item['validItem'];					    	
				        	   return item['validItem']; 
				        	   
				        }
				        else{
				        	   return preCombo[rowIndex];
				      /*  	   mom_ajax('R', 'XUSM3030.gridInfo', {menuId:$('#menuId').val(),gridId:$('#gridId').val()}, function(result2, data2) {
							    	  if(result2 != 'SUCCESS') {
									      return;
									      momWidget.splashHide();
								      }
							    	  var gridValidString = '';					      
								      for(var i=0 ;i<data2.length;i++){					    	  
								    	   if(data2[i].validValue != undefined && data2[i].validValue !='' && data2[i].validValue.length > 4 && data2[i].validValue.substring(1,3) == '[{'){
								    			  gridValidString      = data2[i].validValue.substr(1);
										    	  gridValidString      = gridValidString.substr(0,  gridValidString.length-1);							    	  
										    	  data2[i].validValue  = JSON.parse(gridValidString);	
								    	   }
								    							    	 					    	   			          
								      }					
							           gridProp   = data2;
							       
							        	   return data2[rowIndex]['validValue']; 
							           
							          
								  }, undefined, undefined, this, false);*/
				        }
						
						          
				      }
				}
  		}];
			var gridProperty = {
					  'rowIdField' : "propertyName"
					, 'showRowNumColumn': true
					, 'showSelectionBorder': false
					, 'editable': true			
					, 'enableSorting': true	
					, 'showRowCheckColumn': true
					//, 'rowCheckToRadio': true
					, 'enableFilter': true
					, 'filterLayoutWidth': 200
					, 'filterLayoutHeight': 300
					, 'selectionMode': 'multipleRows'
					, 'copySingleCellOnRowMode': true
					, 'softRemoveRowMode': false
					// 그룹핑 후 셀 병합 실행
					, enableCellMerge : true			
					// 브랜치에 해당되는 행을 출력 여부
					, showBranchOnGrouping : false
					// 그룹핑 패널 사용
					, useGroupingPanel : false		
					// 차례로 country, product 순으로 그룹핑을 합니다.
					, groupingFields : ["category"]
			
				};
			
			 AUIGrid.destroy('#grid1', columnProperty, gridProperty);	
			 AUIGrid.create('#grid1', columnProperty, gridProperty); 
			 that.gridEvent();
		     AUIGrid.setGridData('#grid1', data2);
             momWidget.splashHide();
		      	momWidget.splashHide();
	      }, undefined, undefined, this, false,'Y');
	

	}, 
	columnGrid: function(queryId) {
		var that = this;
		var cellAlignList = [{"code":"LEFT","value":"좌측"},{"code":"CENTER","value":"중앙"},{"code":"RIGHT","value":"우측"}];
		var dataTypeList  = [{"code":"string","value":"문자"},{"code":"numeric","value":"숫자"},{"code":"date","value":"날짜"},{"code":"boolean","value":"참/거짓"}];
		var columnTypeList  = [{"code":"T","value":"텍스트"},{"code":"S","value":"싱글-드롭다운"},{"code":"M","value":"멀티-드롭다운"},{"code":"CK","value":"체크박스"},{"code":"C","value":"캘린더"},{"code":"G","value":"그룹핑"}];
		var sortMethod    = [{"code":"ASC","value":"오름차순"},{"code":"DESC","value":"내림차순"},{"code":"NONE","value":"사용안함"}];
		  mom_ajax('R', 'XUSM3030.'+queryId, {menuId:prevMenuId,gridId:$('#gridId').val(),programId:''}, function(result, data) {
			  if(result != 'SUCCESS') {
			      return;
			      momWidget.splashHide();
		      } 
		   mom_ajax('R', 'XUSM3030.dropDownList', {}, function(result1, data1) {
		var columnProperty = [{
			  dataField 	: 'columnId'
			, headerText 	: '컬럼아이디'
			, width			: 150
			, style			: 'my-column-style-edit2'
		},{
			  dataField 	: 'columnNm' 
			, headerText 	: '컬럼명'
			, width			: 200
			, style			: 'my-column-style-edit2'
		
		},{
			  dataField 	: 'dataType' 
			, headerText 	: '데이터타입'
			, width			: 150
			, style			: 'my-column-style-edit3'
			, labelFunction: function(rowIndex, columnIndex, value, item) { 
            	var retStr = "";
            	var comboList = dataTypeList;
    			for(var i=0,len=comboList.length; i<len; i++) {
    					  if(comboList[i]["code"] == value) {
        					retStr = comboList[i]["value"];
        					break;
        				} 				    				
    			}
    			return retStr == "" ? value : retStr;
               
			}
			,editRenderer : {
				type: 'ComboBoxRenderer',
				autoCompleteMode : false, // 자동완성 모드 설정
				matchFromFirst : false, // 처음부터 매치가 아닌 단순 포함되는 자동완성
				autoEasyMode : false, // 자동완성 모드일 때 자동 선택할지 여부 (기본값 : false)
				showEditorBtnOver: true, 
				list: dataTypeList, 
				keyField: 'code', 
				valueField: 'value'
			}
		},{
			  dataField 	: 'columnType' 
					, headerText 	: '컬럼타입'
					, width			: 150
					, style			: 'my-column-style-edit3'
					, labelFunction: function(rowIndex, columnIndex, value, item) { 
		            	var retStr = "";
		            	var comboList = columnTypeList;
		    			for(var i=0,len=comboList.length; i<len; i++) {
		    					  if(comboList[i]["code"] == value) {
		        					retStr = comboList[i]["value"];
		        					break;
		        				} 				    				
		    			}
		    			return retStr == "" ? value : retStr;
		               
					}
					,editRenderer : {
						type: 'ComboBoxRenderer',
						autoCompleteMode : true, // 자동완성 모드 설정
						matchFromFirst : false, // 처음부터 매치가 아닌 단순 포함되는 자동완성
						autoEasyMode : true, // 자동완성 모드일 때 자동 선택할지 여부 (기본값 : false)
						showEditorBtnOver: true, 
						list: columnTypeList, 
						keyField: 'code', 
						valueField: 'value'
					}
				},
				{
			  dataField 	: 'columnRequire' 
			, headerText 	: '컬럼필수'
			, style			: 'my-column-style-edit'
			, width			: 80
			, renderer 		: {
				  type 		: 'CheckBoxEditRenderer'
				, editable	: true
				,checkValue : 'Y' 
				,unCheckValue : 'N'
			}
		},
				{
			  dataField 	: 'dataFormat' 
			, headerText 	: '데이터서식'
			, width			: 150
			, style			: 'my-column-style-edit2'
		},			
		{
			  dataField 	: 'columnAlign' 
			, headerText 	: '셀정렬'
			, width			: 100	
			, style			: 'my-column-style-edit3'
			, labelFunction: function(rowIndex, columnIndex, value, item) { 
            	var retStr = "";
            	var comboList = cellAlignList;
    			for(var i=0,len=comboList.length; i<len; i++) {
    					  if(comboList[i]["code"] == value) {
        					retStr = comboList[i]["value"];
        					break;
        				} 				    				
    			}
    			return retStr == "" ? value : retStr;
               
			}
			,editRenderer : {
				type: 'ComboBoxRenderer',
				autoCompleteMode : true, // 자동완성 모드 설정
				matchFromFirst : false, // 처음부터 매치가 아닌 단순 포함되는 자동완성
				autoEasyMode : true, // 자동완성 모드일 때 자동 선택할지 여부 (기본값 : false)
				showEditorBtnOver: true, 
				list: cellAlignList, 
				keyField: 'code', 
				valueField: 'value'
			}
		},
		{
			  dataField 	: 'sortNo' 
			, headerText 	: '정렬순서'
			, width			: 80
			, style         : 'my-column-style-edit3'
		},{
			  dataField 	: 'sortMethod' 
			, headerText 	: '정렬방법'
			, width			: 80
			, style			: 'my-column-style-edit3'
			, labelFunction: function(rowIndex, columnIndex, value, item) { 
            	var retStr = "";
            	var comboList = sortMethod;
    			for(var i=0,len=comboList.length; i<len; i++) {
    					  if(comboList[i]["code"] == value) {
        					retStr = comboList[i]["value"];
        					break;
        				} 				    				
    			}
    			return retStr == "" ? value : retStr;
               
			}
			,editRenderer : {
				type: 'ComboBoxRenderer',
				autoCompleteMode : true, // 자동완성 모드 설정
				matchFromFirst : false, // 처음부터 매치가 아닌 단순 포함되는 자동완성
				autoEasyMode : true, // 자동완성 모드일 때 자동 선택할지 여부 (기본값 : false)
				showEditorBtnOver: true, 
				list: sortMethod, 
				keyField: 'code', 
				valueField: 'value'
			}
		},{
			  dataField 	: 'columnWidth' 
			, headerText 	: '열너비'
			, width			: 80
			, style			: 'my-column-style-edit3'
		},
		
		{
			  dataField 	: 'dropdownId' 
			, headerText 	: '드롭다운 Lv1'
			, width			: 200
			, style         : 'my-column-style-edit'
			, labelFunction: function(rowIndex, columnIndex, value, item) { 
	            	var retStr = "";
	            	var comboList = data1;
	    			for(var i=0,len=comboList.length; i<len; i++) { 
	    					  if(comboList[i]["code"] == value) {
	        					  retStr = comboList[i]["label"];
	        					  break;
	        				  } 				    				
	    			}		    			
	    			return retStr == "" ? value : retStr;	               
				}
				, editRenderer : {
					type: 'ComboBoxRenderer', 
					autoCompleteMode : true, // 자동완성 모드 설정 
					matchFromFirst : false, //  처음부터 매치가 아닌 단순 포함되는 자동완성
					autoEasyMode : true,    //  자동완성 모드일 때 자동 선택할지 여부 (기본값 : false)
					showEditorBtnOver: true,  
					list: data1, 
					keyField:   'code', 
					valueField: 'label'
				}
				
				
		},{
			          dataField 	: 'dropdownDetail' 
					, headerText 	: '드롭다운 Lv2'
					, width			: 200
					, style         : 'my-column-style-edit'
					, labelFunction: function(rowIndex, columnIndex, value, item) { 
						    if(tmpCombo1 == undefined || tmpCombo1 == ''){
						    	return '';
						    }
			            	var retStr = "";
			            	var comboList = tmpCombo1;
			    			for(var i=0,len=comboList.length; i<len; i++) { 
			    					  if(comboList[i]["code"] == value) {
			        					  retStr = comboList[i]["label"];
			        					  break;
			        				  } 				    				
			    			}		    			
			    			return retStr == "" ? value : retStr;	               
						}
						, editRenderer : {
							type: 'ComboBoxRenderer', 
							autoCompleteMode : true, // 자동완성 모드 설정 
							matchFromFirst : false, //  처음부터 매치가 아닌 단순 포함되는 자동완성
							autoEasyMode : true,    //  자동완성 모드일 때 자동 선택할지 여부 (기본값 : false)
							showEditorBtnOver: true,  
							/*list: data2, */
							keyField:   'code', 
							valueField: 'label',
							listFunction : function(rowIndex, columnIndex, item, dataField) {
								 mom_ajax('R', 'XUSM3030.dropDownDetailList', {dropdownId:item.dropdownId}, function(result2, data2) {
									 return tmpCombo1 = data2;
									 
								 }, undefined, undefined, this, false);	
								 return tmpCombo1;
								 }
							                                                        
						    }
				},{
			  dataField 	: 'dropdownParam' 
			, headerText 	: '드롭다운파람'
			, width			:  150
			, style			: 'my-column-style-edit2'	
		},
		{
			  dataField 	: 'groupingColumn' 
			, headerText 	: '그룹핑컬럼'
			, width			:  150
			, style			: 'my-column-style-edit2'	
		},
		{
			  dataField 	: 'columnEditable' 
			, headerText 	: '셀편집'
			, style			: 'my-column-style-edit'
			, width			: 80
			, renderer 		: {
				  type 		: 'CheckBoxEditRenderer'
				, editable	: true
				,checkValue : 'Y' 
				,unCheckValue : 'N'
			}
		},
		  {
			  dataField 	: 'columnShow' 
			, headerText 	: '화면보이기'
			, style			: 'my-column-style-edit'
			, width			: 80
			, renderer 		: {
				  type 		: 'CheckBoxEditRenderer'
				, editable	: true
				,checkValue : 'Y' 
				,unCheckValue : 'N'
			}
		},{
			  dataField 	: 'excelShow' 
			, headerText 	: '엑셀보이기'
			, style			: 'my-column-style-edit'	
			, width			: 80
			, renderer 		: {
				  type 		: 'CheckBoxEditRenderer'
				, editable	: true
				,checkValue : 'Y' 
				,unCheckValue : 'N'
			}
		},{
			  dataField 	: 'excelTemplateShow'
			, headerText 	: '엑셀양식보이기'
			, style			: 'my-column-style-edit'	
			, width			: 80
			, renderer 		: {
				  type 		: 'CheckBoxEditRenderer'
				, editable: true
				,checkValue : 'Y' 
				,unCheckValue : 'N'
			}
		},{
			  dataField 	: 'filterEnable' 
			, headerText 	: '필터사용'
			, style			: 'my-column-style-edit'		
			, width			: 80
			, renderer 		: {
				  type 		: 'CheckBoxEditRenderer'
				, editable: true
				,checkValue : 'Y' 
				,unCheckValue : 'N'
			}
		},{
			  dataField 	: 'filterIconShow'
			, headerText 	: '필터아이콘'
			, style			: 'my-column-style-edit'	
			, width			: 100
			, renderer 		: {
				  type 		: 'CheckBoxEditRenderer'
				, editable: true
				,checkValue : 'Y' 
				,unCheckValue : 'N'
			}
		},{
			  dataField 	: 'cellColor'
			, headerText 	: '배경색'
			, style			: 'my-column-style-edit2'
		
		}
		];

		var gridProperty = {
			/*  'rowIdField' : "columnId"*/
			  'showRowNumColumn': true
			, 'showSelectionBorder': false
			, 'editable': true			
			, 'enableSorting': true		
			, 'showRowCheckColumn': true			
			//, 'rowCheckToRadio': true
			, 'enableFilter': true
			, 'filterLayoutWidth': 200
			, 'filterLayoutHeight': 300
			, 'selectionMode': 'multipleRows'
			, 'copySingleCellOnRowMode': true
			, 'softRemoveRowMode': false
			// 드래깅 행 이동 가능 여부 (기본값 : false)
			, 'enableDrag' : true
			// 다수의 행을 한번에 이동 가능 여부(기본값 : true)
			, 'enableMultipleDrag' : true
			// 셀에서 바로  드래깅 해 이동 가능 여부 (기본값 : false) - enableDrag=true 설정이 선행 
			, 'enableDragByCellDrag' : true
			// 드랍 가능 여부 (기본값 : true)
			, 'enableDrop' : true
			, fixedColumnCount : 2
			, editableOnFixedCell: true
			, resetHScroll: false
		};
		 columnProp = data;
		 AUIGrid.destroy('#grid1', columnProperty, gridProperty);
		 AUIGrid.create('#grid1', columnProperty, gridProperty);
		 that.gridEvent();
		 AUIGrid.setGridData('#grid1', columnProp);
		 momWidget.splashHide();
		   }, undefined, undefined, this, false,'Y');	
		  }, undefined, undefined, this, false,'Y');	
		 
		 
	}, 
	
	searchGrid: function(queryId) {
		var that = this;
		var searchTypeList     = [{"code":"T","value":"텍스트"},{"code":"S","value":"드롭다운싱글"},{"code":"SS","value":"드롭다운싱글(검색)"},{"code":"MS","value":"드롭다운멀티(검색)"},{"code":"M","value":"드롭다운멀티"},{"code":"C","value":"캘린더"},{"code":"CP","value":"캘린더(기간)"}];
		var headerTypeList     = [{"code":"T","value":"텍스트"},{"code":"S","value":"드롭다운싱글"},{"code":"M","value":"드롭다운멀티"},{"code":"C","value":"캘린더"}];
		  mom_ajax('R', 'XUSM3030.'+queryId, {menuId:prevMenuId,gridId:$('#gridId').val(),programId:''}, function(result, data) {
			  if(result != 'SUCCESS') {
			      return;
			      momWidget.splashHide();
		      } 
		      mom_ajax('R', 'XUSM3030.dropDownList', {}, function(result1, data1) {
			  if(result1 != 'SUCCESS') {
			      return;
			      momWidget.splashHide();
		      } 
			
			 var columnProperty = [{
				  dataField 	: 'searchId' 
				, headerText 	: '검색ID'
				, width			:  200
				, style			: 'my-column-style-edit2'
			},{
				  dataField 	: 'searchNm' 
				, headerText 	: '검색명'
				, width			:  150
				, style			: 'my-column-style-edit2'	
			},{
				  dataField 	: 'searchType' 
				, headerText 	: '검색유형'
				, width			: 150
				, style			: 'my-column-style-edit2'
				, labelFunction: function(rowIndex, columnIndex, value, item) { 
		            	var retStr = "";
		            	var comboList = searchTypeList;
		    			for(var i=0,len=comboList.length; i<len; i++) { 
		    					  if(comboList[i]["code"] == value) {
		        					  retStr = comboList[i]["value"];
		        					  break;
		        				  } 				    				
		    			}
		    			
		    			return retStr == "" ? value : retStr;	               
					}
					, editRenderer : {
						type: 'ComboBoxRenderer', 
						autoCompleteMode : true, // 자동완성 모드 설정 
						matchFromFirst : false, //  처음부터 매치가 아닌 단순 포함되는 자동완성
						autoEasyMode : true,    //  자동완성 모드일 때 자동 선택할지 여부 (기본값 : false)
						showEditorBtnOver: true,  
						list: searchTypeList, 
						keyField:   'code', 
						valueField: 'value'
					}
			}, 
			{
				  dataField 	: 'columnRequire' 
				, headerText 	: '필수여부'
				, width			:  150
				, style			: 'my-column-style-edit3'	
				, renderer 		: {
						  type 		: 'CheckBoxEditRenderer'
						, editable	: true
						,checkValue : 'Y' 
						,unCheckValue : 'N'
					}
			},
				{
				  dataField 	: 'defaultValue' 
				, headerText 	: '초기값'	
				, style			: 'my-column-style-edit3'
			    , headerTooltip : { 
				  show : true,
				  tooltipHtml : '<div style="width:300px;"><p>초기값 지정(디폴트는 입력값)</p><p>CHECK_ALL : 콤보박스-멀티 인경우에 전체체크</P><P>INDEX+N: 싱글/멀티 콤보박스에서 지정 인덱스 선택</p><P>캘린더:  조합법:TODAY/INIT/LAST(+/-)정수*(D/M)</p><P>캘린더(기간): 조합법:주차수*W(+/-)정수*(D/M)</p></div>'
		        }
			},		
			{
				  dataField 	: 'dropdownId' 
				, headerText 	: '드롭다운 Lv1'
				, width			: 200
				, style         : 'my-column-style-edit'
				, labelFunction: function(rowIndex, columnIndex, value, item) { 
		            	var retStr = "";
		            	var comboList = data1;
		    			for(var i=0,len=comboList.length; i<len; i++) { 
		    					  if(comboList[i]["code"] == value) {
		        					  retStr = comboList[i]["label"];
		        					  break;
		        				  } 				    				
		    			}		    			
		    			return retStr == "" ? value : retStr;	               
					}
					, editRenderer : {
						type: 'ComboBoxRenderer', 
						autoCompleteMode : true, // 자동완성 모드 설정 
						matchFromFirst : false, //  처음부터 매치가 아닌 단순 포함되는 자동완성
						autoEasyMode : true,    //  자동완성 모드일 때 자동 선택할지 여부 (기본값 : false)
						showEditorBtnOver: true,  
						list: data1, 
						keyField:   'code', 
						valueField: 'label'
					}
					
					
			},{
				          dataField 	: 'dropdownDetail' 
						, headerText 	: '드롭다운 Lv2'
						, width			: 200
						, style         : 'my-column-style-edit'
						, labelFunction: function(rowIndex, columnIndex, value, item) { 
							    if(tmpCombo1 == undefined || tmpCombo1 == ''){
							    	return '';
							    }
				            	var retStr = "";
				            	var comboList = tmpCombo1;
				    			for(var i=0,len=comboList.length; i<len; i++) { 
				    					  if(comboList[i]["code"] == value) {
				        					  retStr = comboList[i]["label"];
				        					  break;
				        				  } 				    				
				    			}		    			
				    			return retStr == "" ? value : retStr;	               
							}
							, editRenderer : {
								type: 'ComboBoxRenderer', 
								autoCompleteMode : true, // 자동완성 모드 설정 
								matchFromFirst : false, //  처음부터 매치가 아닌 단순 포함되는 자동완성
								autoEasyMode : true,    //  자동완성 모드일 때 자동 선택할지 여부 (기본값 : false)
								showEditorBtnOver: true,  
								/*list: data2, */
								keyField:   'code', 
								valueField: 'label',
								listFunction : function(rowIndex, columnIndex, item, dataField) {
									 mom_ajax('R', 'XUSM3030.dropDownDetailList', {dropdownId:item.dropdownId}, function(result2, data2) {
										 return tmpCombo1 = data2;
										 
									 }, undefined, undefined, this, false);	
									 return tmpCombo1;
									 }
								                                                        
							    }
					},{
				  dataField 	: 'dropdownParam' 
				, headerText 	: '드롭다운파람'
				, width			:  150
				, style			: 'my-column-style-edit2'	
			},
			{
				  dataField 	: 'headerType' 
				, headerText 	: '헤더유형'
				, width			: 80
				, editRenderer : {
					type: 'ComboBoxRenderer',
					autoCompleteMode : true, // 자동완성 모드 설정
					matchFromFirst : false, // 처음부터 매치가 아닌 단순 포함되는 자동완성
					autoEasyMode : true, // 자동완성 모드일 때 자동 선택할지 여부 (기본값 : false)
					showEditorBtnOver: true, 
					list: headerTypeList, 
					keyField: 'code', 
					valueField: 'value'
				}
			},{
				  dataField 	: 'headerDropdownId' 
				, headerText 	: '헤더드롭다운 Lv1'
				, width			: 200
				, style			: 'my-column-style-edit'	
				, labelFunction: function(rowIndex, columnIndex, value, item) { 
		            	var retStr = "";
		            	var comboList = data1;
		    			for(var i=0,len=comboList.length; i<len; i++) { 
		    					  if(comboList[i]["code"] == value) {
		        					  retStr = comboList[i]["label"];
		        					  break;
		        				  } 				    				
		    			}		    			
		    			return retStr == "" ? value : retStr;	               
					}
				,editRenderer : {
						type: 'ComboBoxRenderer',
						autoCompleteMode : true, // 자동완성 모드 설정
						matchFromFirst : false, // 처음부터 매치가 아닌 단순 포함되는 자동완성
						autoEasyMode : true, // 자동완성 모드일 때 자동 선택할지 여부 (기본값 : false)
						showEditorBtnOver: true, 
						list: data1, 
						keyField: 'code', 
						valueField: 'label'
					}
			},
			{
		          dataField 	: 'headerDropdownDetail' 
				, headerText 	: '헤더드롭다운 Lv2'
				, width			: 200
				, style         : 'my-column-style-edit'
				, labelFunction: function(rowIndex, columnIndex, value, item) { 
					    if(tmpCombo2 == undefined || tmpCombo2 == ''){
					    	return '';
					    }
		            	var retStr = "";
		            	var comboList = tmpCombo2;
		    			for(var i=0,len=comboList.length; i<len; i++) { 
		    					  if(comboList[i]["code"] == value) {
		        					  retStr = comboList[i]["label"];
		        					  break;
		        				  } 				    				
		    			}		    			
		    			return retStr == "" ? value : retStr;	               
					}
					, editRenderer : {
						type: 'ComboBoxRenderer', 
						autoCompleteMode : true, // 자동완성 모드 설정 
						matchFromFirst : false, //  처음부터 매치가 아닌 단순 포함되는 자동완성
						autoEasyMode : true,    //  자동완성 모드일 때 자동 선택할지 여부 (기본값 : false)
						showEditorBtnOver: true,  
						/*list: data2, */
						keyField:   'code', 
						valueField: 'label',
						listFunction : function(rowIndex, columnIndex, item, dataField) {
							 mom_ajax('R', 'XUSM3030.dropDownDetailList', {dropdownId:item.headerDropdownId}, function(result2, data2) {
								 return tmpCombo2 = data2;
								 
							 }, undefined, undefined, this, false);	
							 return tmpCombo2;
							 }
						                                                        
					    }				
			},
			{
				  dataField 	: 'headerDropdownParam' 
				, headerText 	: '헤더드롭다운파람'
				, width			:  150
				, style			: 'my-column-style-edit2'	
			}		
			];

			var gridProperty = {
				//  'rowIdField' : "searchId"
				 'showRowNumColumn': true
				, 'showSelectionBorder': false
				, 'editable': true			
				, 'enableSorting': true		
				, 'showRowCheckColumn': true			
				//, 'rowCheckToRadio': true
				, 'enableFilter': true
				, 'filterLayoutWidth': 200
				, 'filterLayoutHeight': 300
				, 'selectionMode': 'multipleRows'
				, 'copySingleCellOnRowMode': true
				, 'softRemoveRowMode': false
				// 드래깅 행 이동 가능 여부 (기본값 : false)
				, 'enableDrag' : true
				// 다수의 행을 한번에 이동 가능 여부(기본값 : true)
				, 'enableMultipleDrag' : true
				// 셀에서 바로  드래깅 해 이동 가능 여부 (기본값 : false) - enableDrag=true 설정이 선행 
				, 'enableDragByCellDrag' : true
				// 드랍 가능 여부 (기본값 : true)
				, 'enableDrop' : true
			};
			 searchProp = data;
			 AUIGrid.destroy('#grid1', columnProperty, gridProperty);
			 AUIGrid.create('#grid1', columnProperty, gridProperty);
			 that.gridEvent();
			 searchProp.sort(function(a,b){ return a.searchSeq-b.searchSeq});
			 AUIGrid.setGridData('#grid1', searchProp);	
			 momWidget.splashHide();
		 }, undefined, undefined, this, false,'Y');	
		  }, undefined, undefined, this, false,'Y');	
		
	}, 
	popupGrid: function(queryId) {
		var that = this;
		var searchTypeList  = [{"code":"T","value":"텍스트"},{"code":"I","value":"정수"},{"code":"D","value":"소수점"},{"code":"S","value":"드롭다운싱글"},{"code":"SS","value":"드롭다운싱글(검색)"},{"code":"M","value":"드롭다운멀티"},{"code":"MS","value":"드롭다운멀티(검색)"},{"code":"C","value":"캘린더"},{"code":"C-HM","value":"시분"},{"code":"P","value":"비밀번호"},{"code":"G","value":"그리드"},{"code":"DG","value":"드롭다운그리드"},{"code":"DS","value":"비고"}];
		mom_ajax('R', 'XUSM3030.'+queryId, {menuId:prevMenuId,gridId:$('#gridId').val(),programId:''}, function(result, data) {
			  if(result != 'SUCCESS') {
			      return;
			      momWidget.splashHide();
		      } 
		 mom_ajax('R', 'XUSM3030.dropDownList', {}, function(result1, data1) {			
			  if(result1 != 'SUCCESS') {
			      return;
			      momWidget.splashHide();
		      } 
			 
			 var columnProperty = [
			{
				  dataField 	: 'popupId' 
				, headerText 	: '컬럼ID'
				, width			:  200
				, style			: 'my-column-style-edit2'
			},{
				  dataField 	: 'popupNm' 
				, headerText 	: '컬럼명'
				, width			:  150
				, style			: 'my-column-style-edit2'	
			},{
				  dataField 	: 'popupType' 
				, headerText 	: '컬럼유형'
				, width			: 150
				, style			: 'my-column-style-edit2'
				, labelFunction: function(rowIndex, columnIndex, value, item) { 
		            	var retStr = "";
		            	var comboList = searchTypeList;
		    			for(var i=0,len=comboList.length; i<len; i++) { 
		    					  if(comboList[i]["code"] == value) {
		        					  retStr = comboList[i]["value"];
		        					  break;
		        				  } 				    				
		    			}
		    			
		    			return retStr == "" ? value : retStr;	               
					}
					, editRenderer : {
						type: 'ComboBoxRenderer', 
						autoCompleteMode : true, // 자동완성 모드 설정 
						matchFromFirst : false, //  처음부터 매치가 아닌 단순 포함되는 자동완성
						autoEasyMode : true,    //  자동완성 모드일 때 자동 선택할지 여부 (기본값 : false)
						showEditorBtnOver: true,  
						list: searchTypeList, 
						keyField:   'code', 
						valueField: 'value'
					}
			}, 
			{
				  dataField 	: 'columnRequire' 
				, headerText 	: '필수여부'
				, width			: 70
				, style			: 'my-column-style-edit'
				, renderer 		: {
						  type 		: 'CheckBoxEditRenderer'
						, editable	: true
						,checkValue : 'Y' 
						,unCheckValue : 'N'
				  }
			},
				{
				  dataField 	: 'defaultValue' 
				, headerText 	: '기본값'
				, width			:  120
				, style			: 'my-column-style-edit2'	
			},
			{
				  dataField 	: 'insertEditFlag' 
				, headerText 	: '등록'
				, width			: 50
				, style			: 'my-column-style-edit'
				, renderer 		: {
						  type 		: 'CheckBoxEditRenderer'
						, editable	: true
						,checkValue : 'Y' 
						,unCheckValue : 'N'
				  }
			}, 
			{
				  dataField 	: 'updateEditFlag' 
				, headerText 	: '수정'
				, width			: 50
				, style			: 'my-column-style-edit'
				, renderer 		: {
						  type 		: 'CheckBoxEditRenderer'
						, editable	: true
						,checkValue : 'Y' 
						,unCheckValue : 'N'
				  }
			},
			{
				  dataField 	: 'upsertEditFlag' 
				, headerText 	: '등록&수정'
				, width			: 80
				, style			: 'my-column-style-edit'
				, renderer 		: {
						  type 		: 'CheckBoxEditRenderer'
						, editable	: true
						,checkValue : 'Y' 
						,unCheckValue : 'N'
				  }
			},
		
		
			{
				  dataField 	: 'dropdownId' 
				, headerText 	: '드롭다운 Lv1'
				, width			: 200
				, style         : 'my-column-style-edit'
				, labelFunction: function(rowIndex, columnIndex, value, item) { 
		            	var retStr = "";
		            	var comboList = data1;
		    			for(var i=0,len=comboList.length; i<len; i++) { 
		    					  if(comboList[i]["code"] == value) {
		        					  retStr = comboList[i]["label"];
		        					  break;
		        				  } 				    				
		    			}		    			
		    			return retStr == "" ? value : retStr;	               
					}
					, editRenderer : {
						type: 'ComboBoxRenderer', 
						autoCompleteMode : true, // 자동완성 모드 설정 
						matchFromFirst : false, //  처음부터 매치가 아닌 단순 포함되는 자동완성
						autoEasyMode : true,    //  자동완성 모드일 때 자동 선택할지 여부 (기본값 : false)
						showEditorBtnOver: true,  
						list: data1, 
						keyField:   'code', 
						valueField: 'label'
					}
					
					
			},
			{
				  dataField 	: 'dropdownDetail' 
				, headerText 	: '드롭다운 Lv2'
				, width			: 200
				, style         : 'my-column-style-edit'
				, labelFunction: function(rowIndex, columnIndex, value, item) { 
					    if(tmpCombo1 == undefined || tmpCombo1 == ''){
					    	return '';
					    }
		            	var retStr = "";
		            	var comboList = tmpCombo1;
		    			for(var i=0,len=comboList.length; i<len; i++) { 
		    					  if(comboList[i]["code"] == value) {
		        					  retStr = comboList[i]["label"];
		        					  break;
		        				  } 				    				
		    			}		    			
		    			return retStr == "" ? value : retStr;	               
					}
					, editRenderer : {
						type: 'ComboBoxRenderer', 
						autoCompleteMode : true, // 자동완성 모드 설정 
						matchFromFirst : false, //  처음부터 매치가 아닌 단순 포함되는 자동완성
						autoEasyMode : true,    //  자동완성 모드일 때 자동 선택할지 여부 (기본값 : false)
						showEditorBtnOver: true,  
						/*list: data2, */
						keyField:   'code', 
						valueField: 'label',
						listFunction : function(rowIndex, columnIndex, item, dataField) {
							 mom_ajax('R', 'XUSM3030.dropDownDetailList', {dropdownId:item.dropdownId}, function(result2, data2) {
								 return tmpCombo1 = data2;
								 
							 }, undefined, undefined, this, false);	
							 return tmpCombo1;
							 }
						                                                        
					    }
					
					
					
			},
			{
				  dataField 	: 'dropdownParam' 
				, headerText 	: '드롭다운파람'
				, style			: 'my-column-style-edit2'	
			},
		    {
				  dataField 	: 'dropdownGridList' 
				, headerText 	: '드롭다운그리드ID'
				, width			:  150
				, style			: 'my-column-style-edit2'	
			}
			];

			var gridProperty = {
				/*  'rowIdField' : "popupId"*/
				 'showRowNumColumn': true
				, 'showSelectionBorder': false
				, 'editable': true			
				, 'enableSorting': true		
				, 'showRowCheckColumn': true			
				//, 'rowCheckToRadio': true
				, 'enableFilter': true
				, 'filterLayoutWidth': 200
				, 'filterLayoutHeight': 300
				, 'selectionMode': 'multipleRows'
				, 'copySingleCellOnRowMode': true
				, 'softRemoveRowMode': false
				// 드래깅 행 이동 가능 여부 (기본값 : false)
				, 'enableDrag' : true
				// 다수의 행을 한번에 이동 가능 여부(기본값 : true)
				, 'enableMultipleDrag' : true
				// 셀에서 바로  드래깅 해 이동 가능 여부 (기본값 : false) - enableDrag=true 설정이 선행 
				, 'enableDragByCellDrag' : true
				// 드랍 가능 여부 (기본값 : true)
				, 'enableDrop' : true
			};
			 popupProp = data;
			 AUIGrid.destroy('#grid1', columnProperty, gridProperty);
			 AUIGrid.create('#grid1', columnProperty, gridProperty);
			 that.gridEvent();
			 AUIGrid.setGridData('#grid1', popupProp);	
		     momWidget.splashHide();
		 }, undefined, undefined, this, false,'Y');	
		}, undefined, undefined, this, false,'Y');	
		
	}, 
	buttonGrid: function(queryId) {
		var that = this;
		var buttonTypeList  = [{"code":"createBtn","value":"등록"},{"code":"editBtn","value":"수정"},{"code":"copyBtn","value":"복사"},{"code":"delBtn","value":"삭제"},{"code":"excelDownBtn","value":"엑셀다운"},{"code":"excelTmpBtn","value":"엑셀양식다운"},{"code":"excelUpBtn","value":"엑셀업로드"},{"code":"addBtn","value":"행추가"},{"code":"saveBtn","value":"저장"}];
		var searchTypeList  = [{"code":"C","value":"등록"},{"code":"CV","value":"등록(검사)"},{"code":"CP","value":"복사"},{"code":"CPV","value":"복사(검사)"},{"code":"U","value":"수정"},{"code":"UV","value":"수정(검사)"},{"code":"CU","value":"저장"},{"code":"CU","value":"엑셀업로드"},{"code":"EV","value":"엑셀업로드(검사)"},{"code":"D","value":"삭제"},{"code":"R","value":"조회"},{"code":"P","value":"프로시저호출"},{"code":"NONE","value":"없음"}];
		mom_ajax('R', 'XUSM3030.'+queryId, {menuId:prevMenuId,gridId:$('#gridId').val(),programId:''}, function(result, data) {
			  if(result != 'SUCCESS') {
			      return;
			      momWidget.splashHide();
		      } 
		 mom_ajax('R', 'XUSM3030.dropDown', {groupCd:"SM0007"}, function(result1, data1) {
			  if(result1 != 'SUCCESS') {
			      return;
			      momWidget.splashHide();
		      } 
			
			 var columnProperty = [
			{
				  dataField 	: 'buttonId' 
				, headerText 	: '버튼아이디'
				, width			: 200
				, style			: 'my-column-style-edit2'
				, labelFunction: function(rowIndex, columnIndex, value, item) { 
		            	var retStr = "";
		            	var comboList = buttonTypeList;
		    			for(var i=0,len=comboList.length; i<len; i++) { 
		    					  if(comboList[i]["code"] == value) {
		        					  retStr = comboList[i]["value"];
		        					  break;
		        				  } 				    				
		    			}
		    			
		    			return retStr == "" ? value : retStr;	               
					}
					, editRenderer : {
						type: 'ComboBoxRenderer', 
						autoCompleteMode : true, // 자동완성 모드 설정 
						matchFromFirst : false, //  처음부터 매치가 아닌 단순 포함되는 자동완성
						autoEasyMode : true,    //  자동완성 모드일 때 자동 선택할지 여부 (기본값 : false)
						showEditorBtnOver: true,  
						list: buttonTypeList, 
						keyField:   'code', 
						valueField: 'value'
					}
			}, {
				  dataField 	: 'buttonNm' 
				, headerText 	: '버튼명'
				, width			:  150
				, style			: 'my-column-style-edit2'	
			},{
				  dataField 	: 'eventType' 
				, headerText 	: '이벤트유형'
				, width			: 150
				, style			: 'my-column-style-edit2'
				, labelFunction: function(rowIndex, columnIndex, value, item) { 
		            	var retStr = "";
		            	var comboList = searchTypeList;
		    			for(var i=0,len=comboList.length; i<len; i++) { 
		    					  if(comboList[i]["code"] == value) {
		        					  retStr = comboList[i]["value"];
		        					  break;
		        				  } 				    				
		    			}
		    			
		    			return retStr == "" ? value : retStr;	               
					}
					, editRenderer : {
						type: 'ComboBoxRenderer', 
						autoCompleteMode : true, // 자동완성 모드 설정 
						matchFromFirst : false, //  처음부터 매치가 아닌 단순 포함되는 자동완성
						autoEasyMode : true,    //  자동완성 모드일 때 자동 선택할지 여부 (기본값 : false)
						showEditorBtnOver: true,  
						list: searchTypeList, 
						keyField:   'code', 
						valueField: 'value'
					}
			}, 
			{
				  dataField 	: 'popupGridId' 
				, headerText 	: '그리드ID(팝업)'
				, width			:  150
				, style			: 'my-column-style-edit2'	
				, headerTooltip : { 
				  show : true,
				  tooltipHtml : '<div style="width:250px;"><p>커스텀팝업 연결시에 사용(연결할 팝업 그리드ID 입력)</p></div>'
		        }
			},
		    {
				  dataField 	: 'buttonParameter' 
				, headerText 	: '파라미터'
				, style			: 'my-column-style-edit'	
				, headerTooltip : { 
				  show : true,
				  tooltipHtml : "<div style='width:300px;'><p>버튼 이벤트시 별도로 담고싶은 파라미터 세팅</p><p>예시: [{'key1':'value1','key2':'value2'}]</P></div>"
		        }
			},
		
			{
				  dataField 	: 'buttonIcon' 
				, headerText 	: '버튼아이콘'
				, style			: 'my-column-style-edit'	
			},
			{
				  dataField 	: 'refindFlag' 
				, headerText 	: '재조회'
				, style			: 'my-column-style-edit'	
			},	
			{
				  dataField 	: 'checkType' 
				, headerText 	: '파라미터대상'
				, style			: 'my-column-style-edit'	
				, headerTooltip : { 
				  show : true,
				  tooltipHtml : '<div style="width:300px;"><p>버튼 이벤트시 자동으로 세팅할 파라미터</p><p>GRID_CHECK : 그리드에서 체크된 레코드</P><P>GRID_SELECT: 그리드에서 선택된 레코드</p><P>GRID_ALL: 그리드 전체</p></div>'
		        }
			}];

			var gridProperty = {
				  /*'rowIdField' : "buttonId"*/
				 'showRowNumColumn': true
				, 'showSelectionBorder': false
				, 'editable': true			
				, 'enableSorting': true		
				, 'showRowCheckColumn': true			
				//, 'rowCheckToRadio': true
				, 'enableFilter': true
				, 'filterLayoutWidth': 200
				, 'filterLayoutHeight': 300
				, 'selectionMode': 'multipleRows'
				, 'copySingleCellOnRowMode': true
				, 'softRemoveRowMode': false
				// 드래깅 행 이동 가능 여부 (기본값 : false)
				, 'enableDrag' : true
				// 다수의 행을 한번에 이동 가능 여부(기본값 : true)
				, 'enableMultipleDrag' : true
				// 셀에서 바로  드래깅 해 이동 가능 여부 (기본값 : false) - enableDrag=true 설정이 선행 
				, 'enableDragByCellDrag' : true
				// 드랍 가능 여부 (기본값 : true)
				, 'enableDrop' : true
			};
			 buttonProp = data;
			 AUIGrid.destroy('#grid1', columnProperty, gridProperty);
			 AUIGrid.create('#grid1', columnProperty, gridProperty);
			 that.gridEvent();
			 AUIGrid.setGridData('#grid1', buttonProp);	
			 momWidget.splashHide();
		}, undefined, undefined, this, false,'Y');	
		 }, undefined, undefined, this, false,'Y');	
		
	}, 
	removeAllBtn: function() {
		$('#addBtn').remove();
		$('#saveBtn').remove();
		$('#newBtn').remove();
		$('#delBtn').remove();
		$('#excelDownBtn').remove();
		$('#excelUpBtn').remove();
		$('#downBtn').remove();
		$('#upBtn').remove();
	},
	appendAllBtn: function() {
		$('.widget-box3').append(downBtn);
		$('.widget-box3').append(upBtn);	
		$('.widget-box3').append(addBtn);
		$('.widget-box3').append(saveBtn);
		$('.widget-box3').append(delBtn);
		$('.widget-box3').append(excelDownBtn);
		$('.widget-box3').append(excelUpBtn);
		//$('.widget-box3').append(newBtn);
	
	
		
		
	},
	    gridEvent:function() {
		var that = this;	
		// 셀클릭 이벤트 바인딩
/*		AUIGrid.bind('#grid1', 'cellEditEnd', function(e) {
			if(e.dataField == 'dropdownDetail') {
				AUIGrid.setCellValue('#grid1', e.rowIndex, 'dropdownParam', e.item['dropdownDetail'] );
			}
		});*/
		AUIGrid.bind('#grid1', "cellClick", function(e) {
			var item = e.item;		
			var rowIdField;
			var rowId;
	
			rowIdField = AUIGrid.getProp(e.pid, "rowIdField"); // rowIdField 얻기
			rowId = item[rowIdField];

			AUIGrid.setCheckedRowsByIds(e.pid, rowId);
			/*// 이미 체크 선택되었는지 검사
			if(AUIGrid.isCheckedRowById(e.pid, rowId)) {
				// 엑스트라 체크박스 체크해제 추가
				AUIGrid.addUncheckedRowsByIds(e.pid, rowId);
			} else {
				// 엑스트라 체크박스 체크 추가
				AUIGrid.setCheckedRowsByIds(e.pid, rowId);
			}*/			

		});	
		AUIGrid.bind('#grid1', "cellEditEnd", function(e) {
			var buttonNmText = '';
			var buttonEvent  = '';
			if(e.dataField == 'dropdownDetail') {
				var dropDownParam ='';
				if(e.item['dropdownId']=='DD00001'){
					dropDownParam = 'groupCd='+	e.item['dropdownDetail'];			
				}
				else{
					dropDownParam = e.item['dropdownDetail'];		
				}
				AUIGrid.setCellValue('#grid1', e.rowIndex, 'dropdownParam', dropDownParam);
			}
			else if (e.dataField == 'headerDropdownDetail'){
				var dropDownParam ='';
				if(e.item['headerDropdownId']=='DD00001'){
					dropDownParam = 'groupCd='+	e.item['headerDropdownDetail'];			
				}
				else{
					dropDownParam = e.item['headerDropdownDetail'];		
				}
				AUIGrid.setCellValue('#grid1', e.rowIndex, 'headerDropdownParam', dropDownParam);
			}
			if(chooseTab =='button' && e.dataField=='buttonId'){
				  if(e.value == 'createBtn'){
					     buttonNmText ='등록';
					     buttonEvent  = 'C';
				 }
				 else if(e.value == 'editBtn'){
					     buttonNmText ='수정';
					     buttonEvent  = 'U';
				 }	
				 else if(e.value == 'copyBtn'){
					     buttonNmText ='복사';
					     buttonEvent  = 'CP';
				 }			
				 else if(e.value == 'delBtn'){
					     buttonNmText ='삭제';
					      buttonEvent  = 'D';
				 }				
				 else if(e.value == 'excelDownBtn'){
					     buttonNmText ='엑셀';
					     buttonEvent  = 'NONE';
				 }
				 else if(e.value == 'excelTmpBtn'){
					buttonNmText ='업로드양식';
					buttonEvent  = 'NONE';
				 }
				 else if(e.value == 'excelUpBtn'){
					buttonNmText ='업로드';
				    buttonEvent  = 'CU';
				 }
				  AUIGrid.setCellValue('#grid1', e.rowIndex, "buttonNm", buttonNmText);
				  AUIGrid.setCellValue('#grid1', e.rowIndex, "eventType", buttonEvent);
			}
		});
	
	},
	event: function() {
		var that = this;	
	
	
		$(document).on('select', '#menuId', function(e) {
		
			  if($('#gridId').val()!=''){
				  momWidget.splashShow();
				   prevMenuId = $('#menuId').val().trim();
				    var gridId = '1';
				    //gridId = $('#gridId').val() == '' ? '1':$('#gridId').val();
					var queryId = 'gridProp';
					
					if(chooseTab == 'grid'){
						
						queryId = 'gridInfo';
					}
					else if(chooseTab == 'column'){
						queryId = 'columnInfo';
					}
					else if(chooseTab == 'search'){
						queryId = 'searchInfo';
					}
					else if(chooseTab == 'popup'){
						queryId = 'popupInfo';
					}
					else if(chooseTab == 'button'){
						queryId = 'buttonInfo';
					}
					else{
						
					}
					 if(chooseTab == 'grid'){
						                  that.gridGrid('gridInfo');
					    					
								for(var i=0,max=gridProp.length;i<max;i++){		
									AUIGrid.setCellValue('#grid1', i, "validValue", gridProp[i]['propertyValue']);
								}
							}
							else if(chooseTab == 'column'){
								that.columnGrid('columnInfo');
			
							} 
							else if(chooseTab == 'search'){
								that.searchGrid('searchInfo');
								
							}
							else if (chooseTab == 'popup'){
								that.popupGrid('popupInfo');
							}
							else if (chooseTab == 'button'){
								that.buttonGrid('buttonInfo');
							}
							else {
								that.gridGrid('gridInfo');
							}

					  	
						
					      	
					      
			  }
			  if($('#menuId').jqxComboBox('getSelectedItem')!=null && $('#menuId').jqxComboBox('getSelectedItem')!=''){
				  mom_ajax('R', 'DD.DD00006', {menuId:$("#menuId").val()}, function(result5, data5) {
						      if(result5 != 'SUCCESS') {
						    	  momWidget.splashHide();
							      return;							     
						      }	 		
						    					       
							  	$('#gridId').jqxComboBox("clear");	
							 if(data5.length == 0){
										momWidget.messageBox({type: 'warning', width: '400', height: '145', html: '그리드등록필수!'});
										//momWidget.splashHide();
										return;
								   //$('#gridId').jqxComboBox('source',[{code:'1',name:'1'}]);
								  
							 }
							 else{
								   $('#gridId').jqxComboBox('source',data5);	
								   $("#gridId").jqxComboBox('selectItem', '1');
								   $("#gridId").jqxComboBox({ disabled: false }); 
								   $('#widgetTitle').text($('#menuId').jqxComboBox('getSelectedItem').label+'-'+$("#gridId").val());
								   	const menuIdStr =  $("#menuId").jqxComboBox('getItemByValue', $('#menuId').val().trim()); 
								   	prevMenuId = menuIdStr.value;
									    $('#menuId').jqxComboBox('clearSelection'); 
									      setTimeout(function() {
						                   $('#menuId').val(menuIdStr.label);
					    					},300);
							 }
							/* if(gridId>data5.length){
								 AUIGrid.clearGridData('#grid1');
								 $('#widgetTitle').text($('#menuId').jqxComboBox('getSelectedItem').label);
							 }*/

							momWidget.splashHide();
							    return;

					}, undefined, undefined, this, false,'Y','crud');
			}
			  
			  //AUIGrid.clearGridData('#grid1');
			/*  mom_ajax('R', 'XUSM3030.gridList', {menuId:$("#menuId").val()}, function(result5, data5) {
			      if(result5 != 'SUCCESS') {
			    	  momWidget.splashHide();
				      return;							     
			      }									       
				  	$('#gridId').jqxComboBox("clear");	
				 if(data5.length == 0){
					   $('#gridId').jqxComboBox('source',[{code:'1',name:'1'}]);	
				 }
				 else{
					   $('#gridId').jqxComboBox('source',data5);	
				 }
									
					$("#gridId").jqxComboBox({ disabled: false }); 
					$("#gridId").jqxComboBox('selectIndex', 0 );
					const menuIdStr =  $("#menuId").jqxComboBox('getItemByValue', $('#menuId').val().trim()); 
				    $('#menuId').jqxComboBox('clearSelection'); 
				      setTimeout(function() {
	                   $('#menuId').val(menuIdStr.label);
    					},300);
				    
				    return;

		}, undefined, undefined, this, false,'Y','crud');*/
	
	});
		$(document).on('change', '#gridId', function() {
			if($('#menuId').val() == ''){
				momWidget.messageBox({type: 'warning', width: '400', height: '145', html: '메뉴ID 입력필수!'});
				momWidget.splashHide();
				return;
			}
			if($('#gridId').val() == ''){
				momWidget.messageBox({type: 'warning', width: '400', height: '145', html: '그리드ID 입력필수!!'});
				momWidget.splashHide();
				return;
			}
			momWidget.splashShow();
			var queryId = 'gridProp';
		
			if(chooseTab == 'grid'){
				queryId = 'gridInfo';
			}
			else if(chooseTab == 'column'){
				queryId = 'columnInfo';
			}
			else if(chooseTab == 'search'){
				queryId = 'searchInfo';
			}
			else if(chooseTab == 'popup'){
				queryId = 'popupInfo';
			}
			else if(chooseTab == 'button'){
				queryId = 'buttonInfo';
			}
			else{
				
			}
			      	if(chooseTab == 'grid'){
			      		that.gridGrid('gridInfo');
						for(var i=0,max=gridProp.length;i<max;i++){		
							AUIGrid.setCellValue('#grid1', i, "validValue", gridProp[i]['propertyValue']);
						}
					}
					else if(chooseTab == 'column'){
						that.columnGrid('columnInfo');
					/*	AUIGrid.setGridData('#grid1', columnProp);
						for(var i=0,max=gridProp.length;i<max;i++){		
							AUIGrid.setCellValue('#grid1', i, "validValue", gridProp[i]['propertyValue']);
						}*/
					} 
					else if(chooseTab == 'search'){
						that.searchGrid('searchInfo');
						
					}
					else if (chooseTab == 'popup'){
						that.popupGrid('popupInfo');
					}
					else if (chooseTab == 'button'){
						that.buttonGrid('buttonInfo');
					}
					else {
						that.gridGrid('gridInfo');
					}
					
			      	$('#widgetTitle').text($('#menuId').val()+'-'+$('#gridId').val());
			      	momWidget.splashHide();
		
	
	});
			
		$(document).on('click', '#gridBtn1', function() {
			chooseTab = 'grid';
			that.removeAllBtn();
							
			$('.widget-box3').append(newBtn);
			$('.widget-box3').append(saveBtn);
			$('.widget-box3').append(excelDownBtn);
			$('.widget-box3').append(excelUpBtn);
			
			$('#gridBtn1').css('background'  ,'#0753a1');
			$('#columnBtn1').css('background','#666666');
			$('#searchBtn1').css('background','#666666');
			$('#popupBtn1').css('background' ,'#666666');
			$('#buttonBtn1').css('background','#666666');
			
			that.gridGrid('gridInfo');
			
		});
		$(document).on('click', '#columnBtn1', function() {
			chooseTab = 'column';
			that.removeAllBtn();
			that.appendAllBtn();
			
			
			$('#gridBtn1').css('background'  ,'#666666');
			$('#columnBtn1').css('background','#0753a1');
			$('#searchBtn1').css('background','#666666');
			$('#popupBtn1').css('background' ,'#666666');
			$('#buttonBtn1').css('background','#666666');
			that.columnGrid('columnInfo');
			
		});
		$(document).on('click', '#searchBtn1', function() {
			chooseTab = 'search';
			that.removeAllBtn();
			that.appendAllBtn();

			$('#gridBtn1').css('background'  ,'#666666');
			$('#columnBtn1').css('background','#666666');
			$('#searchBtn1').css('background','#0753a1');
			$('#popupBtn1').css('background' ,'#666666');
			$('#buttonBtn1').css('background','#666666');
			that.searchGrid('searchInfo');
			
		
		});
		$(document).on('click', '#popupBtn1', function() {
			chooseTab = 'popup';
			that.removeAllBtn();
			that.appendAllBtn();
			$('#gridBtn1').css('background'  ,'#666666');
			$('#columnBtn1').css('background','#666666');
			$('#searchBtn1').css('background','#666666');
			$('#popupBtn1').css('background' ,'#0753a1');
			$('#buttonBtn1').css('background','#666666');
			that.popupGrid('popupInfo');
		});
		$(document).on('click', '#buttonBtn1', function() {
			chooseTab = 'button';
			that.removeAllBtn();
			that.appendAllBtn();
			$('#gridBtn1').css('background'  ,'#666666');
			$('#columnBtn1').css('background','#666666');
			$('#searchBtn1').css('background','#666666');
			$('#popupBtn1').css('background' ,'#666666');
			$('#buttonBtn1').css('background','#0753a1');
			that.buttonGrid('buttonInfo');
		});
		// 조회 버튼
		$(document).on('click', '#findBtn1', function() {
			momWidget.splashShow();						
	/*		momWidget.findBtnClicked(1, [], true, 'findBtn1', 'PGIDXX002', XUSM3030, function(result, data) {
				momWidget.messageBox({type: 'success', width: '400', height: '145', html: '조회성공!'});
				momWidget.splashHide();
			});*/			
				if($('#menuId').val() == ''){
					momWidget.messageBox({type: 'warning', width: '400', height: '145', html: '메뉴ID 입력필수!'});
					momWidget.splashHide();
					return;
				}
				
				if($('#gridId').val() == ''){
					momWidget.messageBox({type: 'warning', width: '400', height: '145', html: '그리드ID 입력필수!!'});
					momWidget.splashHide();
					return;
				}
				var queryId = 'gridProp';
				
				if(chooseTab == 'grid'){
					queryId = 'gridInfo';
				}
				else if(chooseTab == 'column'){
					queryId = 'columnInfo';
				}
				else if(chooseTab == 'search'){
					queryId = 'searchInfo';
				}
				else if(chooseTab == 'popup'){
					queryId = 'popupInfo';
				}
				else if(chooseTab == 'button'){
					queryId = 'buttonInfo';
				}
				else{
					
				}
				      	if(chooseTab == 'grid'){
				      		that.gridGrid('gridInfo');
							for(var i=0,max=gridProp.length;i<max;i++){		
								AUIGrid.setCellValue('#grid1', i, "validValue", gridProp[i]['propertyValue']);
							}
						}
						else if(chooseTab == 'column'){
							that.columnGrid('columnInfo');
						/*	AUIGrid.setGridData('#grid1', columnProp);
							for(var i=0,max=gridProp.length;i<max;i++){		
								AUIGrid.setCellValue('#grid1', i, "validValue", gridProp[i]['propertyValue']);
							}*/
						} 
						else if(chooseTab == 'search'){
							that.searchGrid('searchInfo');
							
						}
						else if (chooseTab == 'popup'){
							that.popupGrid('popupInfo');
						}
						else if (chooseTab == 'button'){
							that.buttonGrid('buttonInfo');
						}
						else {
							that.gridGrid('gridInfo');
						}

				      	momWidget.splashHide();
			     	
			
		});
		$(document).on('click', '#excelDownBtn', function() {
			//momWidget.splashShow();
			
			    var excelDownOpt = {fileName: "위젯관리-"+chooseTab ,
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
					  AUIGrid.exportToXlsx("#grid1", excelDownOpt);
					  $('.aui-grid-export-progress-modal').height('100%');
				$('#grid1').children().append($('.aui-grid-export-progress-modal'));
				//momWidget.splashShow();
		
		});
		$(document).on('click', '#saveBtn', function() {
			momWidget.splashShow();
			//var checkedItems = AUIGrid.getCheckedRowItems('#grid1');
			var checkedItems = AUIGrid.getGridData('#grid1');
			var mapList = [];
			var queryId = 'gridProp';
			var queryId2 = 'gridInfo';
			for(var i=0,max=checkedItems.length;i<max;i++){	
				//mapList[i] = checkedItems[i]['item'];
				mapList[i] = checkedItems[i];
				mapList[i].menuId       = prevMenuId;
				mapList[i].gridId       = $('#gridId').val();
				mapList[i].actionType   ='CU';
				
				
			}
			if(chooseTab == 'grid'){
				queryId = 'gridProp';
				queryId2 = 'gridInfo';
			}
			else if(chooseTab == 'column'){
				queryId = 'columnProp';
				queryId2 = 'columnInfo';
			}
			else if(chooseTab == 'search'){
				queryId = 'searchProp';
				queryId2 = 'searchInfo';
			}
			else if(chooseTab == 'popup'){
				queryId = 'popupProp';
				queryId2 = 'popupInfo';
			}
			else if(chooseTab == 'button'){
				queryId = 'buttonProp';
				queryId2 = 'buttonInfo';
			}
			else{
				
			}
				 mom_ajax('C', 'XUSM3030.'+queryId, mapList, function(result, data) {
					   if(result != 'SUCCESS') {
					    	  momWidget.messageBox({type:'danger', width:'400', height: '145', html: '실패하였습니다!'});			     
						      momWidget.splashHide();
						      return;
					      }
					   mom_ajax('P', 'XUSM3030.'+queryId, [], function(result2, data2) {
						   if(result2 != 'SUCCESS') {
						    	  momWidget.messageBox({type:'danger', width:'400', height: '145', html: '실패하였습니다!'});			     
							      momWidget.splashHide();
							      return;
						      } 
						   momWidget.messageBox({type:'success', width:'400', height: '145', html: '성공하였습니다!'});		
						   //$("#findBtn1").trigger("click");
							if(chooseTab == 'grid'){
								that.gridGrid(queryId2);
							}
							else if(chooseTab == 'column'){
								that.columnGrid(queryId2);
							}
							else if(chooseTab == 'search'){
								that.searchGrid(queryId2);
							}
							else if(chooseTab == 'popup'){
								that.popupGrid(queryId2);
							}
							else if(chooseTab == 'button'){
								that.buttonGrid(queryId2);
							}
					   }, undefined, undefined, this, false,'Y','proc');
					   
				 }, undefined, undefined, this, false,'Y','crud');
			
		
		});
		$(document).on('click', '#delBtn', function() {
			momWidget.splashShow();
			var checkedItems = AUIGrid.getCheckedRowItems('#grid1');
			var mapList = [];
			var queryId = 'gridProp';
			var queryId2 = 'gridInfo';
			for(var i=0,max=checkedItems.length;i<max;i++){	
				mapList[i] = checkedItems[i]['item'];
				mapList[i].menuId       = prevMenuId;
				mapList[i].gridId       = $('#gridId').val();
				mapList[i].actionType   ='D';
			}
		   if(chooseTab == 'grid'){
				queryId = 'gridProp';
				queryId2 = 'gridInfo';
			}
			else if(chooseTab == 'column'){
				queryId = 'columnProp';
				queryId2 = 'columnInfo';
			}
			else if(chooseTab == 'search'){
				queryId = 'searchProp';
				queryId2 = 'searchInfo';
			}
			else if(chooseTab == 'popup'){
				queryId = 'popupProp';
				queryId2 = 'popupInfo';
			}
			else if(chooseTab == 'button'){
				queryId = 'buttonProp';
				queryId2 = 'buttonInfo';
			}
			else{
				
			}
			
			 mom_ajax('C', 'XUSM3030.'+queryId, mapList, function(result, data) {
				   if(result != 'SUCCESS') {
				    	  momWidget.messageBox({type:'danger', width:'400', height: '145', html: '실패하였습니다!'});			     
					      momWidget.splashHide();
					      return;
				      }
				   mom_ajax('P', 'XUSM3030.'+queryId, [], function(result2, data2) {
					   if(result2 != 'SUCCESS') {
					    	  momWidget.messageBox({type:'danger', width:'400', height: '145', html: '실패하였습니다!'});			     
						      momWidget.splashHide();
						      return;
					      } 
					       momWidget.messageBox({type:'success', width:'400', height: '145', html: '성공하였습니다!'});		
					  // $("#findBtn1").trigger("click");
					  	if(chooseTab == 'grid'){
								that.gridGrid(queryId2);
							}
							else if(chooseTab == 'column'){
								that.columnGrid(queryId2);
							}
							else if(chooseTab == 'search'){
								that.searchGrid(queryId2);
							}
							else if(chooseTab == 'popup'){
								that.popupGrid(queryId2);
							}
							else if(chooseTab == 'button'){
								that.buttonGrid(queryId2);
							}
				   }, undefined, undefined, this, false,'Y');				   
			 }, undefined, undefined, this, false,'Y');
		});
		$(document).on('click', '#upBtn', function() {
			AUIGrid.moveRowsToUp("#grid1");
		});
		
		$(document).on('click', '#downBtn', function() {
			AUIGrid.moveRowsToDown("#grid1");
		});
		$(document).on('click', '#addBtn', function() {
			var item = undefined;
			var rowCnt = AUIGrid.getRowCount('#grid1');
			if(chooseTab=='grid'){
				
			
/*			    item = {dataType: "",
			    		defaultValue: "",
			    		description: "",
			    		propertyName: "",
			    		propertyValue: "",
			    		validItem: "",
			    		validValue: ""
			    		};*/
			}
			else if (chooseTab=='column'){
				 item = {   columnAlign: "",
							columnColor: "",
							columnEditable: 'Y',
							columnHeight: "24",
							columnId: "",
							columnNm: "컬럼명",
							columnRequire: 'N',
							columnSeq: rowCnt+1,
							columnShow: 'N',
							columnWidth: 150,
							dataFormat: "",
							dataType: "string",
							excelShow: 'Y',
							excelTemplateShow: 'Y',
							filterEnable: 'N',
							filterIconShow: 'N',
							sortMethod: "NONE",
							sortNo: ""
		            }
			}
			else if (chooseTab=='search'){
				    item = {columnRequire:        "N",
						    defaultValue:         "",
						    dropdownId:           "",
						    dropdownParam:        "",
						    headerDropdownId:     "",
						    headerType:           "T",
						    hearderDropdownParam: "",
						    searchId:             "",
						    searchNm:             "",
						    searchSeq:            rowCnt+1+"",
						    searchType:           "T"
						    };
			}
			else if (chooseTab=='popup'){
		    item = {columnRequire: "N",
		    	    defaultValue: "",
		    		dropdownId: "",
		    		dropdownParam: "",
		    		insertEditFlag: "Y",
		    		popupId: "",
		    		popupNm: "",
		    		popupType: "T",
		    		updateEditFlag: "Y",
		    		upsertEditFlag: "Y",
		    		popupSeq: rowCnt+1		    			
		    		};
            }
			else if (chooseTab=='button'){
				 item = {
					buttonIcon: "",
					buttonId: "",
					buttonNm: "",
					buttonParameter: "",
					buttonSeq: rowCnt+1	,
					callbackParameter: "",
					eventType: "C"
				 };		
            }
			else{
				
			}
			AUIGrid.addRow("#grid1", item, "last");
		});
		$(document).on('click', '#newBtn', function() {
	        if(chooseTab =='grid'){
	        	  that.gridGrid('initGridInfo');
	     /*       mom_ajax('R', 'XUSM3030.gridInfoNew', {}, function(result2, data2) {
			    	  if(result2 != 'SUCCESS') {
					      return;
					      momWidget.splashHide();
				      } 					    	  
				              gridProp = data2;
							  AUIGrid.setGridData('#grid1', gridProp);
							  for(var i=0,max=gridProp.length;i<max;i++){		
								AUIGrid.setCellValue('#grid1', i, "validValue", gridProp[i]['propertyValue']);
							  }
	
			        	      AUIGrid.setColumnPropByDataField('#grid1', 'validValue', {
							  labelFunction: function(rowIndex, columnIndex, value, item) { 
								if(gridProp[rowIndex]['validValue'] == '' || gridProp[rowIndex]['validValue'] == undefined){
									return '';
								}
                          	var retStr = "";
                          	var comboList = gridProp[rowIndex]['validValue'];
                          	var type = typeof(gridProp[rowIndex]['validValue'][0]['code']) == 'boolean' ? 'boolean': 'string';
                  			for(var i=0,len=comboList.length; i<len; i++) {
                  				if(type == 'boolean'){
                  					if(comboList[i]["code"].toString() == value) {
                      					retStr = comboList[i]["value"];
                      					break;
                      				}
                  				}
                  				else{
                  					  if(comboList[i]["code"] == value) {
                      					retStr = comboList[i]["value"];
                      					break;
                      				}
                  				}
                  				
                  			}
                  			return retStr == "" ? value : retStr;
                             
							},
							editRenderer : {
								type: 'ComboBoxRenderer',
								showEditorBtnOver: true, 
								list: gridProp[0].validValue, 
								keyField: 'code', 
								valueField: 'value',
									listFunction : function(rowIndex, columnIndex, item, dataField) {
											  return gridProp[rowIndex]['validValue'] ;
										                                                        
									}

							}
							
					 	});
				      	momWidget.splashHide();
			      }, undefined, undefined, this, false,'Y');	 */   
	        	
	        	
			}
	   

		});
		
		
	
	
	},
	setComboBox: function() {
		$('#menuId').jqxComboBox({source:[], displayMember: "name", valueMember: "code", width: 250, height: 20,dropDownHeight: 120,searchMode: 'none',remoteAutoComplete: false});	
		$('#gridId').jqxComboBox({source: [], displayMember: "name", valueMember: "code", width: 200, height: 20,dropDownHeight: 120,dropDownWidth: 220});	
			      	$('#menuId').on('keyup', function (e) {
				
				        if(e.keyCode==16){
					
					  			//$('#menuId').jqxComboBox('clearSelection'); 						  				  
      					// let items = $('#'+searchId+'SP'+(index+1)).jqxComboBox('getItems');
      					   if($('#'+e.currentTarget.id).val() =='' ||searchComboItems[0][e.currentTarget.id] == undefined || searchComboItems[0][e.currentTarget.id] == ''){
							$('#'+e.currentTarget.id).jqxComboBox('source',preComboItems);	
			  		        $('#'+e.currentTarget.id).jqxComboBox('open');
	          				return;
						} 
							
						//$('#'+e.currentTarget.id).val('');
						let searchStr = $('#'+e.currentTarget.id).val();
						//$('#'+e.currentTarget.id).jqxComboBox('clear');
      					let oldItems = searchComboItems[0][e.currentTarget.id];
      					if(preComboItems.length==0){
	 						preComboItems = oldItems;
						}
      					    
      					let newItems = [];
              			for(var i=0,popupLen=oldItems.length; i<popupLen;i++){					
				 			if(oldItems[i]['name'].toUpperCase().indexOf($('#'+e.currentTarget.id).val().toUpperCase()) >=0){
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
			  		    	//prevMenuId =  $('#menuId').val();
			  		    	 $('#'+e.currentTarget.id).val(searchStr);
						}
			
			  		    	//const menuIdStr =  $("#menuId").jqxComboBox('getItemByValue', $('#menuId').val().trim()); 
				     /*   $('#menuId').jqxComboBox('clearSelection'); 
				        setTimeout(function() {
	                    $('#menuId').val(menuIdStr.label);
    					},300);*/
     					
}
				    	
			      });
			      	$('#gridId').on('keydown', function (e) {
				 		$("#gridId").jqxComboBox({ disabled: true }); 
						// momWidget.messageBox({type:'danger', width:'400', height: '145', html: '포커스!'});	
				         // return;
				    });
		  mom_ajax('R', 'XUSM3030.menuList', {}, function(result, data) {
		      if(result != 'SUCCESS') {
		    	  momWidget.splashHide();
			      return;							     
		      }					       
			  	 $('#menuId').jqxComboBox("clear");			
			  	 searchComboItems[0]['menuId'] = data;
			  	 $('#menuId').jqxComboBox("source",data);	
			 	 //$("#menuId").jqxComboBox('selectIndex', 0 ); 
			 	 //$('#gridId').val('1');
				//momWidget.messageBox({type:'success', width:'400', height: '145', html: '성공하였습니다!'});
				//momWidget.splashHide();
			    return;

	}, undefined, undefined, this, false,'Y');	

		/*  mom_ajax('R', 'XUSM3030.programList', {}, function(result, data) {
		      if(result != 'SUCCESS') {
		    	  momWidget.splashHide();
			      return;							     
		      }			

		 
				 $('#programId').jqxComboBox("clear");			
			  	 $('#programId').jqxComboBox("source",data);	
				//momWidget.messageBox({type:'success', width:'400', height: '145', html: '성공하였습니다!'});
				momWidget.splashHide();
			    return;

	}, undefined, undefined, this, true,'Y');	*/	  
				
	
	},


};

$(document).ready(function(event) {
   //momWidget.init(1, 'XUSM3030', XUSM3030,undefined);
   XUSM3030.init();
});
