var _grid = {};

_grid.colSize = "";

_grid.colSet = function(bind) {

    var size = 100 / Object.keys(bind).length;
    var col  = [];
    for(var k in bind) {
      col.push({
        dataField:k,
        headerText:k,
        width:size + "%",
        minWidth : 50
      });
    }

    _grid.colSize = size + "%";

    return col;
};

_grid.gridProp = {
  editable : true,
  selectionMode : "multipleCells",
  enableFilter : true,
  enableColumnResize : false,
  softRemovePolicy : "exceptNew",
  fillColumnSizeMode : true
};

_grid.gridPropDiffer = {
  enableCellMerge : true,
  showBranchOnGrouping : false,
  editable : true,
  selectionMode : "multipleCells",
  enableFilter : true,
  enableColumnResize : false,
  softRemovePolicy : "exceptNew",
  fillColumnSizeMode : true
};



// {
// 	"dataField" : "id",
// 	"headerText" : "ID",
// 	"width" : 120
// },
// {
// 	"dataField" : "flag",
// 	"headerText" : "Flag IMG",
// 	"editable" : false,
// 	"prefix" : "./assets/",
// 	"renderer" : {
// 		"type" : "ImageRenderer",
// 		"imgHeight" : 20,
// 		"altField" : "country"
// 	},
// 	"width" : 100
// },
// {
// 	"dataField" : "price",
// 	"headerText" : "Price",
// 	"dataType" : "numeric",
// 	"style" : "my-column",
// 	"width" : 120,
// 	"editRenderer" : {
// 		"type" : "InputEditRenderer",
// 		"onlyNumeric" : true, // 0~9만 입력가능
// 		"textAlign" : "right", // 오른쪽 정렬로 입력되도록 설정
// 		"autoThousandSeparator" : true // 천단위 구분자 삽입 여부
// 	}
// },
// {
// 	"dataField" : "date",
// 	"headerText" : "Date"
// }

// ===================================================================== //

// // 편집 가능 여부 (기본값 : false)
// "editable" : true,
// // 엔터키가 다음 행이 아닌 다음 칼럼으로 이동할지 여부 (기본값 : false)
// "enterKeyColumnBase" : true,
// // 셀 선택모드 (기본값: singleCell)
// "selectionMode" : "multipleCells",
// // 컨텍스트 메뉴 사용 여부 (기본값 : false)
// "useContextMenu" : true,
// // 필터 사용 여부 (기본값 : false)
// "enableFilter" : true,
// // 그룹핑 패널 사용
// "useGroupingPanel" : false,
// // 상태 칼럼 사용
// "showStateColumn" : true,
// // 그룹핑 또는 트리로 만들었을 때 펼쳐지게 할지 여부 (기본값 : false)
// "displayTreeOpen" : true,
// "noDataMessage" : "출력할 데이터가 없습니다.",
// "groupingMessage" : "여기에 칼럼을 드래그하면 그룹핑이 됩니다."
