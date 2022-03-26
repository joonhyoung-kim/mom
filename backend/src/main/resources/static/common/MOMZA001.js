var comItemPopgrid = undefined;

var columnProperty1 = [
	{
		dataField 	: 'code', 
		headerText 	: '품목',
		style		: 'left-column'
	},{
		dataField 	: 'name', 
		headerText 	: '품명',
		style		: 'left-column'
	}
];

var gridProperty1 = {
		'showRowNumColumn':true,
		'showSelectionBorder':false,
		'editable':false,				
		'enableSorting':true,	
		'showRowCheckColumn':false,	
		'enableFilter':true,
		'copySingleCellOnRowMode':true,
		'softRemoveRowMode': false,
		'showPageButtonCount':10,
		'pageRowCount':100,
		'usePaging':true
	};

var MOMZA001 = {
	init: function() {
		var that = this;
		that.event();
		Language.init(function() {
			that.comItemPopgrid();
		});
//		mCommon.splitter(".h01-h", "vertical", 400);
	}, 
	grid: function(grid) { 
		//복잡한 그리드에 대한 자바스크립트 설정은 아래와 같이 사용할 수 있다.  
		var that = this; 
		
		// 그리드내의 Edit 버튼 컬럼 및 로우를 생성해주는 function 이다.
		that.editColumnSet(grid);
		
		//그리드 세팅
		if(grid == "comItemPopgrid"){
			AUIGrid.bind(grid, "cellClick", function(e) {
				alert(e.codeType);
				
			});
		}
	}, 
	event: function() {
		var that = this; // MOMJA001 내부 변수 사용을 위해서 선언.
		
		// 두개의 팝업 닫기 취소 버튼
		// 쉼표로 여러개를 선택할수 있다.
		$(document).on("click", "#commonItemPopCloseBtn ", function() {
			$("#commonItemsPop").micaModal("hide");
		});
		
		// 공통품목 팝업창 오픈
		$(document).on("click", "#itemSearchBtn", function(){
			$("#commonItemsPop").micaModal("show");
			AUIGrid.resize("#comItemPopgrid");
		});
		
		// 공통품목 팝업창 조회
		$(document).on("click", "#comFindItemPopBtn", function(){
			var param = {};
			
			if($.trim($('#commonItemPop').val()) != '') {
				param['key'] = $.trim($('#commonItemPop').val());
			} 
			
			url = '/mom/request/com.thirautech.mom.common.comItem.dummy';
			$.get(tuCommon.contextPath() + url, param, function(data) {
				micaCommon.splash.hide();
				if(!data || data == undefined) {
					console.log('error');
					return;
				}	
				
				AUIGrid.setGridData(comItemPopgrid, data);
				
			});
		});
		
		
		
	}, 
	editColumnSet : function(grid) {// grid 아이디값을 받아 구분한다.
		// 기본적인 그리드 컬럼세팅을 해준다.
		var editColumn = {"headerText":"Edit","dataField":"Edit","width":30,"visible":true,
			renderer : { type : "TemplateRenderer"}, // renderer를 설정 해줘야 아래 labelFunction이 호출된다.
			labelFunction : function (rowIndex, columnIndex, value, headerText, item ) { // 각 Row를 그릴때마다 labelFunction이 호출된다.
				// return 값으로 HTML을 입력해주면 된다.
				// class 명을 gridID + EditBtn 으로 구분했다.
				// attr의 row-index 는 edit 버튼을 클릭했을 때 쉽게 선택된 row 값이 무엇인지 알수 있다. 
				return '<div class="' + grid + 'EditBtn w-icon fa fa-edit icon" style="cursor: pointer; font-size: 20px; line-height: 28px;" row-index =' + rowIndex + '> </div>';
			}
		}
		// 해당그리의 MICA에서 한번 세팅 된 컬럼정보를 가져온다. array.
		var columnLayout = AUIGrid.getColumnLayout(grid);
		// 순서대로 column이 그려지기 때문에 배열 reverse를 해준다. 
		// reverse는 javascript array 기본 함수다.
		columnLayout.reverse();
		// 위에서 세팅된 editColumn 값을 넣어준다.
		columnLayout.push(editColumn);
		// 다시 reverse를 해줘서 정상적인 순서로 바꾼다.
		columnLayout.reverse();
		// 그리드의 변경된 정보를 바꿔준다.
		AUIGrid.changeColumnLayout(grid, columnLayout);
	}, 
	comItemPopgrid: function() {
		var that = this;
		
		if(comItemPopgrid != undefined) {
			AUIGrid.clearGridData(comItemPopgrid);
			AUIGrid.destroy(comItemPopgrid);
		}
		
		comItemPopgrid = AUIGrid.create('#comItemPopgrid', columnProperty1, gridProperty1);
		var comboOptions = {selectedIndex: 0, searchMode:'containsignorecase', autoComplete:true};
		var options = {local: "", textName : "name", valueName : "code", readonly : false};
		
		AUIGrid.bind(comItemPopgrid, "cellClick", function(e) {
//			$("#itemIdModal").val(e.item.code);
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comItem.dummy", // 호출 URL
					{key:e.item.code}, // 파라미터
					function(data) {
						options.local = data;
						micaCommon.comboBox.set("#itemIdModal",comboOptions, options);
					}
				);
			$("#commonItemsPop").micaModal("hide");
			
		});
	}, 
};
$(document).ready(function(event){
	MOMZA001.init();
});