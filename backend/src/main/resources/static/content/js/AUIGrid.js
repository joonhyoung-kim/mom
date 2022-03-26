$(document).ready(function() {
	index.init()
});

var colModelData = [];
var hdieColumn = ["require", "popupType", "edit", "excelTempleteHide", "columnTempleteData", "sort", "sortType"];
var index = {
	init: function() {
		var that = this;
		Language.init(function() {
			var colModel = windowParam.options.colModel;
			var options = windowParam.options;
			that.event();
			that.columnGridSet(colModel);
			that.generalGridSet(options);
			that.resize();
			that.title();
//			$("#columnSetBtn").text("Column Setting");
//			$("#generalSetBtn").text("Grid Setting");
//			$("#cloumnSetTxt").text("※ Column moving is Shift + Alt + (Arrow)");
//			$("#saveBtn").text("Save");
//			$("#closeBtn").text("Close");
		});
	},
	resize: function() {
		$(window).resize(function() {
			AUIGrid.resize("#columnGrid");
		});
	},
	event: function() {
		var that = this;
		$(document).on("click", "#saveBtn", function() {
			that.save();
		});
		$(document).on("click", "#closeBtn", function() {
			window.close();
		});
		
		$(document).on("click", "#columnSetBtn", function() {
			$("#columnGrid").show();
			$("#generalGrid").hide();
			$(this).css("background", "#ff7800");
			$("#generalSetBtn").css("background", "#0866c6");
			$("#cloumnSetTxt").show();
			AUIGrid.resize("#columnGrid");
		});
		
		$(document).on("click", "#generalSetBtn", function() {
			$("#columnGrid").hide();
			$("#generalGrid").show();
			$(this).css("background", "#ff7800");
			$("#columnSetBtn").css("background", "#0866c6");
			$("#cloumnSetTxt").hide();
			AUIGrid.resize("#generalGrid");
		});
	},
	auth: function() {
		if((windowParam.deptCds || []).indexOf(sessionStorage.empAuthority) < 0) {
//		if(sessionStorage.empAuthority != "99") {
			$("#generalSetBtn").hide();
			AUIGrid.hideColumnByDataField("#columnGrid", hdieColumn);
		}
	},
	title: function() {
		var title = windowParam.menuId + "(" + windowParam.menuName + ")";
		document.title = title;
	},
	columnGridSet: function(colModel) {
		var gridPros = {
			editable : true,
			rowIdField : "dataField",
			selectionMode : "multipleCells",
			enableSorting : false,
			fillColumnSizeMode: true
		};
		var columnLayout = [ {
			dataField : "dataField",
			headerText : "ID",
			style: "left-column",
			width: 90
		},
		{
			dataField : "headerText",
			headerText : Language.lang['MESSAGES11000'],
			style: "left-column",
			width: 90
		},
		{
			dataField : "width",
			headerText : Language.lang['MESSAGES12110'],
			style: "right-column",
			width: 40
		},
		{
			dataField : "require",
			headerText : Language.lang['MESSAGES12111'],
			width: 40,
			renderer : {
				type : "CheckBoxEditRenderer",
				showLabel : false, // 참, 거짓 텍스트 출력여부( 기본값 false )
				editable : true // 체크박스 편집 활성화 여부(기본값 : false)
			}
		},
		{
			dataField : "popupType",
			headerText : Language.lang['MESSAGES12112'],
			style: "left-column",
			width: 60,
			editRenderer : {
				type : "DropDownListRenderer",
				showEditorBtnOver : true,
				list : ["", "input", "select", "textarea", "calendar"]
			}
		},
		{
			dataField : "dataType",
			headerText : Language.lang['MESSAGES12113'],
			style: "left-column",
			width: 60,
			editRenderer : {
				type : "DropDownListRenderer",
				showEditorBtnOver : true,
				list : ["", "string", "numeric", "date", "boolean"]
			}
		},
		{
			dataField : "formatString",
			headerText : Language.lang['MESSAGES12113'],
			width: 60
		},
		{
			dataField : "edit",
			headerText : Language.lang['MESSAGES10742'],
			width: 30,
			renderer : {
				type : "CheckBoxEditRenderer",
				showLabel : false, // 참, 거짓 텍스트 출력여부( 기본값 false )
				editable : true // 체크박스 편집 활성화 여부(기본값 : false)
			}
		},
		{
			dataField : "style",
			headerText : "Align",
			style: "left-column",
			width: 60,
			editRenderer : {
				type : "DropDownListRenderer",
				showEditorBtnOver : true,
				list : ["", "left-column", "right-column"]
			}
		},
		{
			dataField : "hide",
			headerText : Language.lang['MESSAGES12114'],
//			style: "left-column",
			width: 30,
			renderer : {
				type : "CheckBoxEditRenderer",
				showLabel : false, // 참, 거짓 텍스트 출력여부( 기본값 false )
				editable : true // 체크박스 편집 활성화 여부(기본값 : false)
			}
		},
		{
			dataField : "excelHide",
			headerText : Language.lang['MESSAGES12115'],
			width: 40,
			renderer : {
				type : "CheckBoxEditRenderer",
				showLabel : false, // 참, 거짓 텍스트 출력여부( 기본값 false )
				editable : true // 체크박스 편집 활성화 여부(기본값 : false)
			}
		},
		{
			dataField : "excelTempleteHide",
			headerText : Language.lang['MESSAGES12116'],
			width: 60,
			renderer : {
				type : "CheckBoxEditRenderer",
				showLabel : false, // 참, 거짓 텍스트 출력여부( 기본값 false )
				editable : true // 체크박스 편집 활성화 여부(기본값 : false)
			}
		},
		{
			dataField : "columnTempleteData",
			headerText : Language.lang['MESSAGES12117'],
			width: 60,
			style: "left-column"
		},
		{
			dataField : "sort",
			headerText : Language.lang['MESSAGES11211'],
			width: 40
		},
		{
			dataField : "sortType",
			headerText : Language.lang['MESSAGES12118'],
			width: 40,
			editRenderer : {
				type : "DropDownListRenderer",
				showEditorBtnOver : true,
				list : ["DESC", "ASC"]
			}
		}
		];
		// 실제로 #columnGrid_wrap 에 그리드 생성
		myGridID = AUIGrid.create("#columnGrid", columnLayout, gridPros);
		this.auth(); // 권한
		colModel = this.hideReverse(colModel);
		AUIGrid.setGridData(myGridID, colModel);
		AUIGrid.bind(myGridID, "cellEditBegin", function( event ) {
			if(event.dataField == "sortType" && event.item.sort == null || event.dataField == "sortType" && event.item.sort == "") {
				return false;
			}
		});
		AUIGrid.bind(myGridID, "cellEditEndBefore", function(event) {
			if(event.dataField == "sort") {
				var value = Number(event.value);
				if(event.value == "" || isNaN(value)) {
					event.item.sortType = "";
					return "";
				}
				
				sortCheck(value);
			}
			
			return event.value;
		});
		function sortCheck (value) {
			var index = AUIGrid.getRowIndexesByValue(myGridID, "sort", value)[0];
			if(index != null) {
				value++;				
				sortCheck(Number(value));
				AUIGrid.setCellValue(myGridID, index, "sort", value);
				
			}
		}
	},
	generalGridSet: function(options){
		// 조건부 에디트렌더러 출력할 editRenderer 정의 1
//		var dropDownListRenderer = {
//		      type : "DropDownListRenderer",
//		      list : posList
//		};
		var inputRenderer = {
	          type : "InputEditRenderer",
	          onlyNumeric : true, // 0~9 까지만 허용
	          allowPoint : true // onlyNumeric 인 경우 소수점(.) 도 허용
	    }
		var checkBoxRenderer = {
		      type : "DropDownListRenderer",
		      list : [{name : "false", value:false}, {name : "true", value:true}],
		      list : [false, true]
		}
		
		var gridPros = {
			editable : true,
			rowIdField : "dataField",
			enableSorting : false,
			fillColumnSizeMode: true
		};
		var columnLayout = [ {
			dataField : "id",
			headerText : "ID",
			style: "left-column",
			width: 90,
			editable : false
		}, {
			dataField : "name",
			headerText : Language.lang['MESSAGES11000'],
			style: "left-column",
			width: 90,
			editable : false
		}, 
		{
			dataField : "value",
			headerText : "Value",
			width :90,
		    editRenderer : { // 조건에 따라 editRenderer 사용하기.
		    	type : "ConditionRenderer", 
		    	conditionFunction : function(rowIndex, columnIndex, value, item, dataField) {
		    		// 특정 조건에 따라 미리 정의한 editRenderer 반환.
		    		if(item.type == "checkbox") {
	                     return checkBoxRenderer;
			    	}
			     }
		    }
		}
		];

		var setData = [];
		var setPropsList = {
			fillColumnSizeMode : {name : "Fill Column Size Mode", type: "checkbox"},
			showRowCheckColumn : {name : "Show Row Check Column", type: "checkbox"},
			showRowAllCheckBox : {name : "Show Row All CheckBox", type: "checkbox"},
			showRowNumColumn : {name : "Show Row Num Column", type: "checkbox"},
			enableSorting : {name : "Enable Sorting", type: "checkbox"},
			usePaging : {name : "Use Paging", type: "checkbox"},
			pageRowCount : {name : "Page Row Count"}
		}
		setData.push({id : "templeteData", name : "Templete data", value : options.templeteData });
		setData.push({id : "columnFixed", name : "Fixed Column", value : options.columnFixed });
		var gridProps = options.gridProps;
		for(var id in setPropsList) {
			setData.push({id : id, name : setPropsList[id].name, value : gridProps[id], type : setPropsList[id].type});
		}
		
		// 실제로 #columnGrid_wrap 에 그리드 생성
		myGridID = AUIGrid.create("#generalGrid", columnLayout, gridPros);
		AUIGrid.setGridData(myGridID, setData);
	},
	save: function() {
		windowParam.options.colModel = AUIGrid.getGridData("#columnGrid");
		var generalData = AUIGrid.getGridData("#generalGrid");
		for(var i = 0; i < generalData.length; i++) {
			var dataI = generalData[i];
			if(dataI.id == "templeteData") {
				windowParam.options.templeteData = dataI.value;
			} else if (dataI.id == "columnFixed") {
				windowParam.options.columnFixed = dataI.value;
			} else {
				var value = dataI.value;
				if(dataI.type == "checkbox") {
					if(value == "true" || value == "false") {
						value = JSON.parse(value);
					}
				}
				windowParam.options.gridProps[dataI.id] = value;
			}
		}
		windowParam.options.colModel = this.hideReverse(windowParam.options.colModel);
		
		for(var i = 0; i < windowParam.options.colModel.length; i++) {
			//console.log(i + " : " + windowParam.options.colModel[i].headerText + " == " + Language.getKoreanFromLang(windowParam.options.colModel[i].headerText));
		}
		
		var params = {
        	"setting" : windowParam.options,
        	"datasetId": windowParam.datasetId,
        	"widgetName": windowParam.widgetName,
        	"widgetType" : "auigrid",
        	"description" : windowParam.description,
        	widgetId : windowParam.widgetId
        };
		transferUpdate(params);
	},
	hideReverse: function(colModel) {
		colModel = JSON.parse(JSON.stringify(colModel));
		for(var i = 0; i < colModel.length; i++) {
			if(colModel[i].excelHide == false) { // false 일때만 true
				colModel[i].excelHide = true;
			} else {
				colModel[i].excelHide = false;
			}

			if(colModel[i].excelTempleteHide == false) { // false 일때만 true
				colModel[i].excelTempleteHide = true;
			} else {
				colModel[i].excelTempleteHide = false;
			}
			
			if(colModel[i].popupType == "") {
				delete colModel[i].popupType;
			}
			if(colModel[i].dataType == "") {
				delete colModel[i].dataType;
			} else if(colModel[i].dataType == "numeric" && colModel[i].formatString == null) {
				colModel[i].formatString = "###0";
			}
			
		}
		return colModel;
	}
}

var sortTypeRenderer = {
		type : "DropDownListRenderer",
		list : ["DESC", "ASC"]
};

function moveRowsToUp() {
	AUIGrid.moveRowsToUp(myGridID);
};

// 선택 행들 아래로 한 단계 올림
function moveRowsToDown() {
	AUIGrid.moveRowsToDown(myGridID);
};

function transferUpdate(item) {
	var url = "/TU_Platform/mica/widgets/";
//	if(!confirm("TU_Platform에 업데이트 하시겠습니까?")) {
//		return;
//	}
	var data = item;
	$.getJSON("/TU_Platform/mica/datasets?name=" + data.datasetId, function(datas) {
		if(datas.length < 1) {
			alert("TU_Platform에 데이터셋이 없습니다.\nDataset으로 가서 Deploy를 눌러 주세요.")
			return; 
		}
		
		
//		var dataSetId = datasets[data.datasetId];
		var dataSetId = datas[0].id
		var method = "post";
		var obj = {};
		obj.id = data.widgetId;
		obj.name = data.widgetName;
		obj.widgetType = data.widgetType;
		obj.dataset = {};
		obj.dataset.id = dataSetId;
		obj.description = data.description;
		obj.setting = data.setting;
		
//		debugger;
		sessionStorage.companyCd
		sessionStorage.divisionCd
		var param  = {
//			divisionCd : sessionStorage.divisionCd || "TUKR",
//			companyCd : sessionStorage.companyCd|| "THIRAUTECH"
			divisionCd : sessionStorage.divisionCd,
			companyCd : sessionStorage.companyCd
		}
		obj.divisionCd = param.divisionCd;
		obj.companyCd = param.companyCd;
		url += obj.id;
		method = "put";
		$.ajax({
			url: url,
			method: method,
			data : JSON.stringify(obj),
			contentType: 'application/json; charset=UTF-8',
			success: function(rtn) {
				if(rtn){
					alert("저장되었습니다.");
				} else {
					alert("실패" + rtn);
				}
			},
			error: function(e){
				alert("실패" + e);
			}
		});
	});
}