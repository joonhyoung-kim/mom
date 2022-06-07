var grid1 = undefined;
var grid2 = undefined;
var grid1Data = undefined;
var clickedMenuId = 'root';
var clickedPmId = '';
var displayDepth = undefined;
var XUSM2010 = {
	initParam		:  undefined,
	columnProperty1	: undefined,
	createdFlag		: undefined,
	init: function() {
		var that = this;
	     $('head').append('<style type="text/css">.my-column-style-edit {background:#c7e8fd;color:black;font-weight:bold;}.aui-grid-edit-column-left{background:#c7e8fd;color:black;text-align: left;}.aui-grid-edit-column-center{background:#c7e8fd;color:black;text-align: center;}.aui-grid-edit-column-right {background:#c7e8fd;color:black;text-align: right;}.aui-grid-default-column-center{background-color:rgb(250 250 250);text-align: center;font-size: 1em;cursor: default;}.aui-grid-default-column-left {background-color:rgb(250 250 250);text-align: left;font-size: 1em;cursor: default;}.aui-grid-default-column-right {background-color:rgb(250 250 250);text-align: right;font-size: 1em;cursor: default;}.excel-upload-danger{background:#eeb55e;font-weight:bold:color:#22741C;}</style>');
	     $('head').append('<style type="text/css">.aui-grid-default-header {background: linear-gradient(to bottom, #f8f8f8, #eee) !important;text-align: center;font-weight: bold;font-size: 1.1em;cursor: pointer;color: black;}</style>');          	
		               that.setGrid();		
		               that.setGridEvent();	
			           that.setComboBox();
			           that.setPopUpEvent();
			           
			           var langOptions  = {local: [{'value':'KR','label':'한국어'},{'value':'ENG','label':'영어'},{'value':'CN','label':'중국어'}],textName : "label", valueName : "value", readonly : false, selectedIndex : 0}; 
		
		
	}, 	
	setPopUpEvent: function() {
		$(document).on('click', '#saveBtnPop1' , function(e) {			
			// var columnLayout = AUIGrid.getColumnLayout(that.grid[index]);
			momWidget.splashShow();
			clickedMenuId    = $('#menuId-popUp').val();
			clickedPmId      = $('#parentMenuId-popUp').val();
			var parentMenuId = $('#parentMenuId-popUp').val();
			var menuId       = $('#menuId-popUp').val();
			var programId    = $('#programId-popUp').val();
			var menuNm       = $('#menuNm-popUp').val();
			var menuType     = $('#menuType-popUp').val();
			var url          = $('#url-popUp').val();
			var menuSeq      = $('#menuSeq-popUp').val();
			var param        = $('#menuParam-popUp').val();
			var icon         = $('#icon-popUp').val();
			var useYn        = $('#useYn-popUp').val();
			var actType      = $('#actType-popUp').val();
			var description  = $('#descript-popUp').val();
			var count        = 0;
			
			param = [{ menuId     : menuId
					, menuNm      : menuNm
					, menuType    : menuType
					, parentMenuId: parentMenuId
					, programId   : programId
					, url         : url
					, sortNo     : menuSeq 
					, param       : param
					, icon        : icon
					, useYn       : useYn
					, description : description}];
								
			if(parentMenuId == '' || menuId == '' || url == '' || menuNm == ''){
				  momWidget.messageBox({type:'warning', width:'400', height: '145', html: '필수값 미입력!'});
				  momWidget.splashHide();	
				  return;
				
			}			
			for(var i = 0; i < grid1Data.length; i++) {	
				if(grid1Data[i].id == menuId){
					 count ++;
		        }										
			}					
			if(count > 0 && actType == 'C'){
				 momWidget.messageBox({type:'warning', width:'400', height: '145', html: '메뉴아이디 중복!'});
				 momWidget.splashHide();	
				 return;
			}
			else if (count == 0 && actType == 'U'){
				      momWidget.messageBox({type:'warning', width:'400', height: '145', html: '존재하지 않는 메뉴 아이디!'});
				      momWidget.splashHide();	
				      return;
			}
			else {
				    mom_ajax(actType, 'XUSM2010.menu', param, function(result, data) {
				      if(result != 'SUCCESS') {
				    	  momWidget.messageBox({type:'danger', width:'400', height: '145', html: '실패하였습니다!'});			     
					      momWidget.splashHide();
					      return;
				      }
				         
						  mom_ajax('R', 'XUSM2010.menuTree', {}, function(result, data) {
							      if(result != 'SUCCESS') {
							    	  momWidget.splashHide();
								      return;							     
							      }			
							        var treeGridData1 = AUIGrid.getOrgGridData('#grid1');
							        for(var i =0;i<treeGridData1;i++){
							        	treeGridData1[0]['children'][i].id;
							      }
							    	  
							       // data[0].parent = '-';
							        grid1Data =  data;
							        AUIGrid.setGridData('#grid1', data);
							        displayDepth = AUIGrid.getDepthByRowId('#grid1',clickedMenuId);
							        //AUIGrid.showItemsOnDepth('#grid1', displayDepth);
							        AUIGrid.addUncheckedRowsByIds('#grid1', clickedMenuId);
									AUIGrid.expandItemByRowId('#grid1',   clickedPmId,true);						
									AUIGrid.selectRowsByRowId('#grid1',   clickedMenuId);
							        AUIGrid.setCheckedRowsByIds('#grid1', clickedMenuId);
							        $("#actType-popUp").jqxComboBox('selectIndex',0);
							        $("#menuType-popUp").jqxComboBox('selectIndex',0);
							        $("#programId-popUp").jqxComboBox('selectIndex',0);
									momWidget.messageBox({type:'success', width:'400', height: '145', html: '성공하였습니다!'});
									momWidget.splashHide();
								    return;

						}, undefined, undefined, this, false);		
						
			}, undefined, undefined, this, false);	
			}

		});
		$(document).on('click', '#resetBtnPop1' , function(e) {					
			//$('#parentMenuId-popUp').val('');
			$('#menuId-popUp').val('');
			$('#programId-popUp').val('');
			$('#menuNm-popUp').val('');
			$('#menuType-popUp').val('');
			$('#url-popUp').val('');
			$('#menuSeq-popUp').val('');
			$('#menuParam-popUp').val('');
			$('#icon-popUp').val('');
			$('#useYn-popUp').val('');
			$('#actType-popUp').val('');
			$('#descript-popUp').val('');
		});
		$(document).on('click', '#deleteBtnPop1' , function(e) { 	
			clickedMenuId    = $('#menuId-popUp').val();
			clickedPmId      = $('#parentMenuId-popUp').val();
			var parentMenuId = $('#parentMenuId-popUp').val();
			var menuId       = $('#menuId-popUp').val();

			param = [{ menuId       : menuId
				     , parentMenuId : parentMenuId }];
			
			mom_ajax('D', 'XUSM2010.menu', param, function(result, data) {
			      if(result != 'SUCCESS') {
			    	  momWidget.messageBox({type:'danger', width:'400', height: '145', html: '실패하였습니다!'});			     
				      momWidget.splashHide();
				      return;
			      }
			         
					  mom_ajax('R', 'XUSM2010.menuTree', {}, function(result, data) {
						      if(result != 'SUCCESS') {
						    	  momWidget.splashHide();
							      return;							     
						      }						        
						       // data[0].parent = '-';
						        grid1Data =  data;
						        AUIGrid.setGridData('#grid1', data);
						        displayDepth = AUIGrid.getDepthByRowId('#grid1',clickedPmId);
						        //AUIGrid.showItemsOnDepth('#grid1', displayDepth);
						        AUIGrid.addUncheckedRowsByIds('#grid1', menuId);
						        
								AUIGrid.expandItemByRowId('#grid1',   clickedPmId,true);						
								AUIGrid.selectRowsByRowId('#grid1',   clickedPmId);
						        AUIGrid.setCheckedRowsByIds('#grid1', clickedPmId);
						        $("#actType-popUp").jqxComboBox('selectIndex',0);
						        $("#menuType-popUp").jqxComboBox('selectIndex',0);
								momWidget.messageBox({type:'success', width:'400', height: '145', html: '성공하였습니다!'});
								momWidget.splashHide();
							    return;

					}, undefined, undefined, this, false);		
					
		}, undefined, undefined, this, false);	
		});
		
		$(document).on('change', '#actType-popUp', function() {
			   // var checkedItem = AUIGrid.getCheckedRowItems('#grid1')[0].item;
			   var checkedItem =  AUIGrid.getSelectedItems('#grid1')[0]['item'];
                if($('#actType-popUp').val() == 'C'){		
                	
					$("#menuId-popUp").removeAttr("readonly");
				    $('#menuType-popUp').val('P');
					$('#parentMenuId-popUp').val(checkedItem.id == undefined ? '' : checkedItem.id);
					$('#menuId-popUp').val('');
					$('#programId-popUp').val('');
					$('#menuNm-popUp').val('');
					$('#url-popUp').val('');
					$('#menuSeq-popUp').val('');
					$('#menuParam-popUp').val('');
					$('#icon-popUp').val('');
					$('#descript-popUp').val('');
					$('#useYn-popUp').val('Y');
							
			}
			else{				  
				    $('#menuId-popUp').attr("readonly",true);
				    $('#menuType-popUp').val('M');
					$('#parentMenuId-popUp').val(checkedItem.parent == undefined ? '' : checkedItem.parent);
					$('#menuId-popUp').val(checkedItem.id == undefined ? '' : checkedItem.id);
					$('#programId-popUp').val(checkedItem.programId == undefined ? '' : checkedItem.programId);
					$('#menuNm-popUp').val(checkedItem.menuNm == undefined ? '' : checkedItem.menuNm);
					$('#url-popUp').val(checkedItem.url == undefined ? '' : checkedItem.url);
					$('#menuSeq-popUp').val(checkedItem.sortNo == undefined ? '' : checkedItem.sortNo);
					$('#menuParam-popUp').val(checkedItem.param == undefined ? '' : checkedItem.param);
					$('#icon-popUp').val(checkedItem.icon == undefined ? '' : checkedItem.icon);
					$('#useYn-popUp').val(checkedItem.useYn  == undefined ? '' : (checkedItem.useYn == '' ? 'Y' : checkedItem.useYn));
					$('#descript-popUp').val(checkedItem.description  == undefined ? '' : (checkedItem.description == '' ? '' : checkedItem.description));
				
		
			}
		});
				
	},
	setGridEvent: function() {	
		// 셀클릭 이벤트 바인딩
		AUIGrid.bind('#grid1', "cellClick", function(e) {
			$("#actType-popUp").jqxComboBox('selectIndex',0);
			$("#menuType-popUp").jqxComboBox('selectIndex',0);
			var item = e.item;
			var rowIdField;
			var rowId;
			/*if(item.product == "LG G3") { // 제품이 LG G3 인 경우 체크박스 disabeld 처리함
				return;
			}*/			
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
				  
				    $('#menuId-popUp').attr("readonly",true);
                                                                                                 
					$('#parentMenuId-popUp').val(item.parent == undefined ? '' : item.parent);
					$('#menuId-popUp').val(item.id == undefined ? '' : item.id);
					$('#programId-popUp').val(item.programId == undefined ? '' : item.programId);
					$('#menuNm-popUp').val(item.menuNm == undefined ? '' : item.menuNm);
					$('#menuType-popUp').val(item.menuType == undefined ? '' : item.menuType);
					$('#url-popUp').val(item.url == undefined ? '' : item.url);
					$('#menuSeq-popUp').val(item.sortNo == undefined ? '' : item.sortNo);
					$('#menuParam-popUp').val(item.param == undefined ? '' : item.param);
					$('#icon-popUp').val(item.icon == undefined ? '' : item.icon);
					$('#descript-popUp').val(item.description == undefined ? '' : item.description);
					$('#useYn-popUp').val(item.useYn  == undefined ? '' : (item.useYn == '' ? 'Y' : item.useYn));
					clickedMenuId = $('#menuId-popUp').val();
					clickedPmId   = $('#parentMenuId-popUp').val();
		});		

		$(document).on('click', '#upBtn1', function() {
			AUIGrid.moveRowsToUp("#grid1");
		});
		
		$(document).on('click', '#downBtn1', function() {
			AUIGrid.moveRowsToDown("#grid1");
		});	
		
	},
	setGrid: function() {
		var   columnProperty1 = [{
			  dataField 	: 'menuNm'
			, headerText 	: '메뉴명'
			, width			: 220
		},		
		{
			  dataField 	: 'parent' 
		    , headerText 	: '부모메뉴ID'
		    , style			: 'left-column'
		    , width		    : 120
		},
		{
			  dataField 	: 'id' 
			, headerText 	: '메뉴아이디'
			, style			: 'left-column'
			, width		    : 120
		},
		{
			  dataField 	: 'url' 
			, headerText 	: '메뉴경로'
			, style			: 'left-column'
			, width		    : 150
		},{
			  dataField 	: 'programId' 
			, headerText 	: '프로그램아이디'
			, style			: 'left-column'
			, width		    : 120
		},
		{
			  dataField 	: 'menuTypeNm'
			, headerText 	: '메뉴타입'
			, width			: 60
		},
		{
			  dataField 	: 'icon' 
			, headerText 	: '아이콘'
			, width			: 120
		},{
			  dataField 	: 'sortNo' 
			, headerText 	: '순서'
			, width			: 50
		},{
			  dataField 	: 'useYn' 
			, headerText 	: '사용여부'
			, width			: 60
		},{
			  dataField 	: 'param' 
			, headerText 	: '파라미터'
		    , style			: 'left-column'
		}
	];
		

	var gridProperty1 = {	
		   'rowIdField'           :'id'
		,  'editable'             : false		
		, 'selectionMode'         : "singleRow"
		, 'displayTreeOpen'       : false
		, 'treeColumnIndex'       : 0
		, 'showRowCheckColumn'    : true
		, 'rowCheckDependingTree' : false
		, 'flat2tree'             : true
		//, 'rowIdField'          : 'id'
		, 'treeIdField'           : 'id'
		, 'treeIdRefField'        : 'parent'	
		/*, 'auiGridProps.displayTreeOpen' : false*/
		// 드래깅 행 이동 가능 여부 (기본값 : false)
		, 'enableDrag' : true
		// 다수의 행을 한번에 이동 가능 여부(기본값 : true)
		, 'enableMultipleDrag' : true
		// 셀에서 바로  드래깅 해 이동 가능 여부 (기본값 : false) - enableDrag=true 설정이 선행 
		, 'enableDragByCellDrag' : true
		// 드랍 가능 여부 (기본값 : true)
		, 'enableDrop' : true
		, 'showRowNumColumn': false
					
	};

		grid1 = AUIGrid.create('#grid1', columnProperty1, gridProperty1);
		momWidget.splashShow();
		mom_ajax('R', 'XUSM2010.menuTree', {}, function(result, data) {
		      if(result != 'SUCCESS') {
			      return;
			      momWidget.splashHide();
		      }
		        
		       // data[0].parent = '-';
		        grid1Data =  data;
		        AUIGrid.setGridData('#grid1', data);
				AUIGrid.expandItemByRowId('#grid1', clickedMenuId,true);						
				AUIGrid.selectRowsByRowId('#grid1', clickedMenuId);
		        AUIGrid.setCheckedRowsByIds('#grid1', clickedMenuId);
				//AUIGrid.setSelectionByIndex('#grid1', 0);
				
				$('#parentMenuId-popUp').val('-');
				$('#menuId-popUp').val('root');
				$('#programId-popUp').val('');
				$('#menuNm-popUp').val('최상단');
				$('#menuType-popUp').val('M');
				$('#url-popUp').val('');
				$('#menuSeq-popUp').val('0');
				$('#menuParam-popUp').val('');
				$('#icon-popUp').val('');
				$('#useYn-popUp').val('Y');
				clickedMenuId = $('#menuId-popUp').val();
				clickedPmId   = $('#parentMenuId-popUp').val();
				// id 가 root 인 행 열기		
				momWidget.splashHide();

	}, undefined, undefined, this, false);		
		
		
	}, 
	setComboBox: function() {
		   mom_ajax('R', 'DD.DD00006', {programType:'UI'}, function(result3, data3) {
						                 if(result3 != 'SUCCESS') {
						    	            momWidget.splashHide();
							                return;							     
						                 }	
						       		var comboBoxOpt1  = {local: [{'value':'Y','label':'사용'},{'value':'N','label':'미사용'}],textName : "label", valueName : "value", readonly : false, selectedIndex : 0}; 
		var comboBoxOpt2  = {local: [{'value':'U','label':'수정'},{'value':'C','label':'신규등록'}],textName : "label", valueName : "value", readonly : false, selectedIndex : 0}; 
		var comboBoxOpt3  = {local: [{'value':'P','label':'프로그램'},{'value':'M','label':'메뉴'}],textName : "label", valueName : "value", readonly : false, selectedIndex : 0};
		var comboBoxOpt4  = {local: data3,textName : "label", valueName : "code", readonly : false, selectedIndex : 0};
		momWidget.setComboBox.set("#useYn-popUp"  , {width : 250, dropDownHeight : '200px', autoDropDownHeight : false, searchMode : 'containsignorecase', autoComplete : true, selectedIndex : 0}, comboBoxOpt1);
		momWidget.setComboBox.set("#actType-popUp", {width : 250, dropDownHeight : '200px', autoDropDownHeight : false, searchMode : 'containsignorecase', autoComplete : true, selectedIndex : 0}, comboBoxOpt2);
		momWidget.setComboBox.set("#menuType-popUp", {width : 250, dropDownHeight : '200px', autoDropDownHeight : false, searchMode : 'containsignorecase', autoComplete : true, selectedIndex : 0}, comboBoxOpt3);   
		momWidget.setComboBox.set("#programId-popUp", {width : 250, dropDownHeight : '200px', autoDropDownHeight : false, searchMode : 'containsignorecase', autoComplete : true, selectedIndex : 0}, comboBoxOpt4);         
										
		}, undefined, undefined, this, false);

		//var iconItem = [{title:'공장',url:},{},{}]
/*		for(var i=0;i<3;i++){
			
		}
        var html = "<div style='padding: 0px; margin: 0px; height: 95px; float: left;'><img width='60' style='float: left; margin-top: 4px; margin-right: 15px;' src='../../images/" + url + "'/><div style='margin-top: 10px; font-size: 13px;'>"
        + "<b>Title</b><div>" + title + "</div><div style='margin-top: 10px;'><b>Year</b><div>" + year.toString() + "</div></div></div>";
        var source = [{html:,title:'공장'},{html:,title:'톱니바퀴'},{html:,title:'트럭'}];		
        $("#jqxWidget").jqxComboBox({ source: source, selectedIndex: 0, width: '250', height: '30px'});*/
		
		$('#parentMenuId-popUp').css('background-color','#d6dae1');
		
     },
 	createMenuTree: function(index,data) {
	     var gridProp         = momWidget.gridProperty[index];
		 var gridColumnLayout = momWidget.columnProperty[index];
//		 gridProp["editId"] = true;	
//		 gridProp["flat2tree"] = true;
//		 gridProp["treeIdRefField"] = "parent";
//		 gridProp["treeIdField"] = "id";
//		 gridProp["treeColumnIndex"] = 6;
		 
		//data[0].parent = '-';
		AUIGrid.destroy(momWidget.grid[index]);
		AUIGrid.create(momWidget.grid[index], gridColumnLayout, gridProp);
		AUIGrid.setGridData(momWidget.grid[index], data);
	}
};

$(document).ready(function(event){
	//momWidget.init(1, 'XUSM2010', XUSM2010);
	//momWidget.init(99, 'XUSM2010', XUSM2010,'excelUpload');
	XUSM2010.init();
});