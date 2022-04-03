AmCharts.Editor.MAPPING = {};
AmCharts.Editor.MAPPING.inheritance = {
    "AmSerialChart": ["AmChart", "AmCoordinateChart", "AmRectangularChart"],
};
AmCharts.Editor.MAPPING.chartClassMap = {
    "serial": "AmSerialChart"
};
AmCharts.Editor.MAPPING.comboboxData  ={
	"number" :["###0","####","#,##0","#,###","#,##0.0","#,##0.#","#,##0.00","#,##0.0#","# ##0,00" ,"#,##0.000","#,##0.00#","# ##0,000" ,"#,##0.0000","#,##0.000#","# ##0,0000","#,##0.0000#"],
	"date" :["yyyy-mm-dd","yyyy/mm/dd","yy년 m월 d일(ddd)","yyyymmdd","yyyy. mm. dd t hh:MM","yyyy-mm-dd hh:MM:ss","yy년 m월 d일 (ddd) HH시 MM분"],
	"aggregateFnc" : ["SUM","AVG","COUNT","MAX","MIN"],
	"selectionMode" : ["singleCell", "singleRow", "multipleCells", "multipleRows", "none"],
	"align" : ["left","right"],
	"popupType" : ["input", "select", "textarea", "calendar"],
	"rendererType" : ["DropDownListRenderer"],
	"editRendererType" : ["CalendarRenderer","DropDownListRenderer"]
};
AmCharts.Editor.MAPPING.userModeHide = [
	"datasetId", "connect", "description", "gridName", "popupSetting",
	"showSelectionBorder", "showStateColumn", "showRowAllCheckBox", "rowCheckToRadio", "showHeader",
	"columnUneditable", "popupType", "filterEanble",  "filterShowIcon",
	"showFooter", "footerPosition",
	"footerString", "groupingFields", "groupingSummary", "groupingSummarySetStyle", "columnDelete", "addColumn",
	"rendererType", "editRendererType",
]
AmCharts.Editor.MAPPING.userModeDelete = [
	"ready", "selectionChange", "cellClick", "cellDoubleClick", "headerClick", "footerClick"
]
AmCharts.Editor.MAPPING.userModeSubgroupHide = [
	"WIDGET", "FOOTER", "EDIT RENDERER"
]

AmCharts.Editor.MAPPING.classMap = {
    "AmSerialChart": {
        //"gridTheme":{
        //    "type": "combobox",
        //    "def": "Default",
        //    "group": "1. grids",
        //    "subgroup": "General Settings",
        //    "description": "",
        //    "editor_menu": true,
        //    "value": "Default"
        //},
        //"gridDataType": {
        //    "type": "combobox",
        //    "def": "JSON",
        //    "group": "1. grids",
        //    "subgroup": "General Settings",
        //    "description": "",
        //    "editor_menu": true,
        //    "value": "JSON"
        //},
//    	"datasetId": {
//            "type": "combobox",
//            "group": "1. grids",
//            "subgroup": "Widget",
//            "description": "Select a Dataset ID.",
//            "value": ""
//        },
//        "connect": {
//            "type": "button",
//            "group": "1. grids",
//            "subgroup": "Widget",
//            "description": "Click the button to import the dataset.",
//            "text" : "OK",
//            "value": 0
//        },
        "description": {
            "type": "textbox",
            "group": "1. grids",
            "subgroup": "Widget",
            "description": "Dataset description.",
            "value": ""
        },
        "gridName": {
            "type": "textbox",
            "group": "1. grids",
            "subgroup": "Widget",
            "description": "Specifies the name of the grid.",
            "value": ""
        },
        "templeteData": {
        	"type": "textbox",
        	"group": "1. grids",
        	"subgroup": "Widget",
        	"description": "TempleteData.",
        	"value": ""
        },
     	"selectionMode": {
            "type": "combobox",
            "group": "1. grids",
            "subgroup": "General Settings",
            "description": "Selects the cell selection mode.",
            "value": ""
        }, 
       	"showSelectionBorder": {
            "type": "checkbox",
            "group": "1. grids",
            "subgroup": "General Settings",
            "description": "Indicates whether to mark the border on the selected cell when a cell is selected.",
            "value": "",
            "gridProps" : true
        },
        "editable": {
            "type": "checkbox",
            "group": "1. grids",
            "subgroup": "General Settings",
            "description": "Specifies whether or not to edit.",
            "value": false,
            "gridProps" : true
        },
        "wordWrap": {
            "type": "checkbox",
            "group": "1. grids",
            "subgroup": "General Settings",
            "description": "Automatic word-wrapp occurs when this property value is true.",
            "value": false,
            "gridProps" : true
        },
        "fillColumnSizeMode": {
            "type": "checkbox",
            "group": "1. grids",
            "subgroup": "General Settings",
            "description": "Outputs the columns with a percentage calculation so that the defined column layout is filled in the current grid area without horizontal scrolling. \nIf this property is set to true, no horizontal scrolling is created under any circumstances. And the width of all columns is calculated and applied as a percentage.",
            "value": true,
            "gridProps" : true
        },
        "enableFilter": {
            "type": "checkbox",
            "group": "1. grids",
            "subgroup": "General Settings",
            "description": "Specifies whether or not column field filtering is enabled.",
            "value": false,
            "gridProps" : true
        },
        "enableMovingColumn": {
            "type": "checkbox",
            "group": "1. grids",
            "subgroup": "General Settings",
            "description": "Specifies the activation of the ability to move the column header into drag and drop.",
            "value": false,
            "gridProps" : true
        },
        "showStateColumn": {
            "type": "checkbox",
            "group": "1. grids",
            "subgroup": "General Settings",
            "description": "Determine whether to output a column to indicate the status of the row on the left side of the grid.\n When editable is set to true, this column is printed with information about deletion, modification, and additional rows. \n If editable is set to false, when showStateColumn=true is set, information about the selection is printed as icons.",
            "value": true,
            "gridProps" : true
        },
        "showRowCheckColumn": {
            "class":"showRowCheckColumn",
            "type": "checkbox",
            "group": "1. grids",
            "subgroup": "General Settings",
            "description": "Specifies whether extra row checkbox is output.\nIf this property value is true, a checkbox column is created on the leftmost side.",
            "value": false,
            "gridProps" : true
        },
        "showRowAllCheckBox": {
            "class": "showRowCheckColumn",
            "type": "checkbox_sub",
            "group": "1. grids",
            "subgroup": "General Settings",
            "description": "If checkbox is set, specify whether or not the full checkbox selection is displayed in the header area.",
            "value": false,
            "gridProps" : true
        },
//        "rowCheckToRadio": {
//            "class":"showRowCheckColumn",
//            "type": "checkbox_sub",
//            "group": "1. grids",
//            "subgroup": "General Settings",
//            "description": "Specifies whether to convert to a group of radio buttons and output instead of an extra row check box.",
//            "value": false,
//            "gridProps" : true
//        },
        "showRowNumColumn": {
            "type": "checkbox",
            "group": "1. grids",
            "subgroup": "General Settings",
            "description": "Specifies whether or not the row numbers column should be output.\n If the property value is true, a column with the row number is created on the far left.",
            "value": true,
            "gridProps" : true
        },
        "enableSorting": {
            "type": "checkbox",
            "group": "1. grids",
            "subgroup": "General Settings",
            "description": "Specifies whether alignment is possible.",
            "value": false,
            "gridProps" : true
        },
        "popupSetting": {
            "type": "checkbox",
            "group": "1. grids",
            "subgroup": "General Settings",
            "description": "mCommon을 호출하면 가변적으로 팝업에디트창을 띄울수있다. 체크를 하면 모든 컬럼을 팝업타입을 input으로 초기화해준다.",
            "value": false,
            "gridProps" : true
        },
        "showHeader": {
            "type": "checkbox",
            "group": "1. grids",
            "subgroup": "General Settings",
            "description": "Specifies whether or not the header is output.",
            "value": true,
            "gridProps" : true
        },
        /*
        "liveVScrolling" : {
            "type": "checkbox",
            "group": "1. grids",
            "subgroup": "General Settings",
            "description": "If a vertical scroll is created in the grid, dragging the mouse over the thumb in the scroll causes the row or column in the grid to respond immediately.\nOn the other hand, you can hold the thumb of the scroll and move the mouse if the grid has a mouse-up rather than an immediate response.",
            "value": true,
            "gridProps" : true
        },
        "liveHScrolling": {
            "type": "checkbox",
            "group": "1. grids",
            "subgroup": "General Settings",
            "description": "If horizontal scrolling is created for the grid, rows or columns on the grid react immediately by holding the thumb of the scroll and moving the mouse.\nConversely, when holding the thumb of the scroll and moving the mouse, you can have the grid respond to an immediate mouse-up, rather than to an immediate reaction.",
            "value": true,
            "gridProps" : true
        },
        */
        "usePaging": {
            "class": "usePaging",
            "type": "checkbox",
            "group": "1. grids",
            "subgroup": "Pager",
            "description": "Indicates whether paging is enabled or disabled.",
            "value": false,
            "gridProps" : true
        },
        "pageRowCount": {
            "class": "usePaging",
            "type": "textbox_num",
            "group": "1. grids",
            "subgroup": "Pager",
            "description": "Specifies the number of rows that are output on one page when paging is enabled.",
            "value": 20,
            "gridProps" : true
        },
        "pagingMode": {
            "class": "usePaging",
            "type": "checkbox_sub",
            "group": "1. grids",
            "subgroup": "Pager",
            "description": "If you are using paging, you specify the way the paging should behave.\m When set to Simplemode, only the previous, next button and the current pageall page are printed.",
            "value": "default",
            "gridProps" : true
        },
        "showFooter": {
            "type": "checkbox",
            "group": "1. grids",
            "subgroup": "Footer",
            "description": "Specifies whether or not the footer is output.",
            "value": false,
            "gridProps" : true
        },
        "footerPosition": {
            "type": "checkbox",
            "group": "1. grids",
            "subgroup": "Footer",
            "description": "Place the footer on top.",
            "value": false,
            "gridProps" : true
        },
        //------------------------------------------------------------------------------------------------------------
        "column" : {
            "type": "combobox",
            "group": "2. header and column",
            "subgroup": "column setting",
            "description": "Select the column you want to modify.",
        },
        "columnWidth": {
            "type": "textbox_num",
            "group": "2. header and column",
            "subgroup": "column setting",
            "description": "Specifies the horizontal size of the column in pixels.",
            "value": ""
        },
        "columnName": {
            "type": "textbox",
            "group": "2. header and column",
            "subgroup": "column setting",
            "description": "Specifies the name of the column.",
            "value": ""
        },
        "columnSequence": {
            "type": "textbox_num",
            "group": "2. header and column",
            "subgroup": "column setting",
            "description": "You can change the column order.",
            "value": ""
        },
        "columnTempleteData": {
            "type": "textbox",
            "group": "2. header and column",
            "subgroup": "column setting",
            "description": "1 value Templete Data",
            "value": ""
        },
        "columnAlign" : {
            "type": "combobox",
            "group": "2. header and column",
            "subgroup": "column setting",
            "description": "Specifies column alignment. The default is Centralization.",
        },
        "columnHide": {
            "type": "checkbox",
            "group": "2. header and column",
            "subgroup": "column setting",
            "description": "Specifies that the grid column is not visible.",
            "value": ""
        },
        
        "excelHide": {
            "type": "checkbox",
            "group": "2. header and column",
            "subgroup": "column setting",
            "description": "Specifies that the grid column is not visible.",
            "value": ""
        },
        "excelTempleteHide": {
            "type": "checkbox",
            "group": "2. header and column",
            "subgroup": "column setting",
            "description": "Specifies that the grid column is not visible.",
            "value": ""
        },
        
        "columnUneditable": {
            "type": "checkbox",
            "group": "2. header and column",
            "subgroup": "column setting",
            "description": "Specifies that the grid column is Uneditable.",
            "value": ""
        },
        "require": {
            "type": "checkbox",
            "group": "2. header and column",
            "subgroup": "column setting",
            "description": "require",
            "value": ""
        },
        "popupType": {
            "type": "combobox",
            "group": "2. header and column",
            "subgroup": "column setting",
            "description": "그리드의 팝업 에디트 타입을 설정한다.",
            "value": ""
        },
        "filterEanble": {
            "type": "checkbox",
            "group": "2. header and column",
            "subgroup": "column setting",
            "description": "Specifies that the grid column is FilterEanble.",
            "value": ""
        },
        "filterShowIcon": {
            "type": "checkbox",
            "group": "2. header and column",
            "subgroup": "column setting",
            "description": "Specifies that the grid column is FilterShowIcon.",
            "value": ""
        },
        "footerType": {
            "type": "combobox",
            "group": "2. header and column",
            "subgroup": "column setting",
            "description": "Specifies the operator.\n The supported Footer operations are SUM, AVG, MIN, MAX, and COUNT.",
            "value": ""
        },
        "footerString": {
            "type": "textbox",
            "group": "2. header and column",
            "subgroup": "column setting",
            "description": "In Putter, enter a string. String does not apply when footerType is selected.",
            "value": ""
        },    
        "numberFormatting": {
            "type": "checkbox",
            "class":"numberFormatting",
            "group": "2. header and column",
            "subgroup": "column setting",
            "description": "Specifies the number format for the data.",
            "value": false
        },
        "dateFormatting": {
            "type": "checkbox",
            "group": "2. header and column",
            "subgroup": "column setting",
            "description": "Specifies the date format for the data.",
            "value": false
        },
        "formattingString": {
            "type": "combobox",
            "group": "2. header and column",
            "subgroup": "column setting",
            "description": "Specifies the format string.",
            "value": ""
        },
        "groupingFields": {
            "type": "checkbox",
            "group": "2. header and column",
            "subgroup": "column setting",
            "description": "Runs the teaming with the Data column field.",
            "value": ""
        },    
        "groupingSummary": {
            "type": "checkbox",
            "group": "2. header and column",
            "class" : "summary",
            "subgroup": "column setting",
            "options": true,
            "description": "The Sum field is valid only if the column's dataType is 'numeric'.",
            "value": ""
        },
        "groupingSummarySetStyle": {
            "type": "checkbox",
            "group": "2. header and column",
            "subgroup": "column setting",
            "options": true,
            "description": "Use style by depth when using groupingSummary.",
            "value": "",
            "gridProps" : true
        },
        "columnFixed": {
            "type": "textbox_num",
            "group": "2. header and column",
            "subgroup": "column setting",
            "description": "Specifies the number of fixed columns (FixedColumn) that are not affected by scrolling.",
            "value": 0
        },
        "columnDelete": {
            "type": "button",
            "group": "2. header and column",
            "text" : "Delete",
            "subgroup": "column setting",
            "description": "Allows you to delete a column. Does not apply to dataset.",
            "value": 0
        },
        "addColumn": {
            "type": "checkbox",
            "class":"addColumn",
            "group": "2. header and column",
            "subgroup": "column setting",
            "description": "Add a column. Does not apply to datasets.",
            "options": true,
            "value": ""
        },
        "addColumnId": {
            "type": "textbox",
            "class":"addColumn",
            "group": "2. header and column",
            "subgroup": "column setting",
            "description": "Specifies the column ID to add.",
            "value": ""
        },
        "columnType" : {
            "type": "combobox",
            "class":"addColumn",
            "group": "2. header and column",
            "description" : "Specifies the type of column to add.",
            "subgroup": "column setting",
            "value": ""
        },
        "columnCreate": {
            "type": "button",
            "class":"addColumn",
            "group": "2. header and column",
            "text" : "OK",
            "subgroup": "column setting",
            "description": "",
            "value": 0
        },
        
        "rendererType": {
        	"type": "combobox",
        	"group": "2. header and column",
        	"subgroup": "edit Renderer",
        	"description": "Specifies the format string.",
        	"value": ""
        },
        "editRendererType": {
        	"type": "combobox",
        	"group": "2. header and column",
        	"subgroup": "edit Renderer",
        	"description": "Specifies the format string.",
        	"value": ""
        },
        /* 
         // 에디트 렌더러
        
        "showEditorBtnOver": {
            "type": "checkbox",
            "group": "2. header and column",
            "subgroup": "edit Renderer",
            "description": "Specifies the date format for the data.",
            "value": false
        },
        "onlyCalendar": {
            "type": "checkbox",
            "group": "2. header and column",
            "subgroup": "edit Renderer",
            "description": "Specifies the date format for the data.",
            "value": false
        },
        "showExtraDays": {
            "type": "checkbox",
            "group": "2. header and column",
            "subgroup": "edit Renderer",
            "description": "Specifies the date format for the data.",
            "value": false
        },
        "showTodayBtn": {
            "type": "checkbox",
            "group": "2. header and column",
            "subgroup": "edit Renderer",
            "description": "Specifies the date format for the data.",
            "value": false
        },
        "showUncheckDateBtn": {
            "type": "checkbox",
            "group": "2. header and column",
            "subgroup": "edit Renderer",
            "description": "Specifies the date format for the data.",
            "value": false
        },
        "todayText": {
            "type": "textbox",
            "class":"todayText",
            "group": "2. header and column",
            "subgroup": "edit Renderer",
            "description": "Specifies the column ID to add.",
            "value": ""
        },
        "uncheckDateText": {
            "type": "textbox",
            "class":"uncheckDateText",
            "group": "2. header and column",
            "subgroup": "edit Renderer",
            "description": "Specifies the column ID to add.",
            "value": ""
        },
        "uncheckDateValue": {
            "type": "textbox",
            "class":"uncheckDateValue",
            "group": "2. header and column",
            "subgroup": "edit Renderer",
            "description": "Specifies the column ID to add.",
            "value": ""
        },
        */
        
        "headerHeight": {
            "type": "textbox_num",
            "group": "2. header and column",
            "text" : "OK",
            "subgroup": "header setting",
            "description": "Specifies the height of the header.",
            "value": 24,
            "default" : 24
        },
        "headerGrouping": {
            "type": "button",
            "class":"addColumn",
            "group": "2. header and column",
            "text" : "Header Grouping",
            "subgroup": "Grouping Options",
            "description": "Group or ungroup the headers.",
            "value": 0
        },
        "useGroupingPanel": {
            "type": "checkbox",
            "group": "2. header and column",
            "subgroup": "Grouping Options",
            "description": "Specifies whether or not to use a teamed panel at the top of the grid.\n If this property is true, you can drag and drop the column header into the Teaming panel to enable the teaming.",
            "value": false ,
            "gridProps" : true
        },
        "enableCellMerge": {
            "type": "checkbox",
            "group": "2. header and column",
            "subgroup": "Grouping Options",
            "description": "Column cell Specifies whether to merge.\n Note : When setting up paging mode (Pager=true), sel coalescing functionality is ignored.",
            "value": false,
            "gridProps" : true
        },
        "showBranchOnGrouping": {
            "type": "checkbox",
            "group": "2. header and column",
            "subgroup": "Grouping Options",
            "description": "Specifies whether or not the row is output corresponding to the branch during grouping. This property is only valid if teaming and teaming are applied together.",
            "value": false,
            "gridProps" : true
        },
     
        //------------------------------------------------------------------------------------------------------------
        "ready": {
            "class": "ready",
            "type": "checkbox_fnc",
            "group": "3. functions",
            "subgroup": "functions",
            "description": "The Ready event will occur when the grid is created and everything is ready. It is possible after this Ready event when you want to modify or access the grid dynamically.",
            "value": false,
            "gridevent" : true
        },
        "readyCode": {
            "class": "ready",
            "type": "eventselect",
            "def": 'alert(event.type)',
            "group": "3. functions",
            "subgroup": "functions",
            "description": "",
            "value": 'alert(event.type)',
            "gridevent" : true
        },
        "selectionChange": {
            "class": "selectionChange",
            "type": "checkbox_fnc",
            "group": "3. functions",
            "subgroup": "functions",
            "description": "SelectionChange events occur when a selection cell is changed by a user, such as a keyboard, touch, or mouse.",
            "value": false,
            "gridevent" : true
        },
        "selectionChangeCode": {
            "class": "selectionChange",
            "type": "eventselect",
            "def": 'alert(event.type)',
            "group": "3. functions",
            "subgroup": "functions",
            "description": "",
            "value": 'alert(event.type)',
            "gridevent" : true
        },
        "cellClick": {
            "class": "cellClick",
            "type": "checkbox_fnc",
            "group": "3. functions",
            "subgroup": "functions",
            "description": "This event is fired when a cell is clicked.",
            "value": false,
            "gridevent" : true
        },
        "cellClickCode": {
            "class": "cellClick",
            "type": "eventselect",
            "def": 'alert(" ( " + event.rowIndex + ", " + event.columnIndex + ") :  " + event.value + " clicked!!");',
            "group": "3. functions",
            "subgroup": "functions",
            "description": "",
            "value": 'alert(" ( " + event.rowIndex + ", " + event.columnIndex + ") :  " + event.value + " clicked!!");',
            "gridevent" : true
        },
        "cellDoubleClick": {
            "class": "cellDoubleClick",
            "type": "checkbox_fnc",
            "group": "3. functions",
            "subgroup": "functions",
            "description": "This event is fired when a cell is double clicked.",
            "value": false,
            "gridevent" : true
        },
        "cellDoubleClickCode": {
            "class": "cellDoubleClick",
            "type": "eventselect",
            "def": 'alert(" ( " + event.rowIndex + ", " + event.columnIndex + ") :  " + event.value + " double clicked!!");',
            "group": "3. functions",
            "subgroup": "functions",
            "description": "",
            "value": 'alert(" ( " + event.rowIndex + ", " + event.columnIndex + ") :  " + event.value + " double clicked!!");',
            "gridevent" : true
        },
        "headerClick": {
            "class": "headerClick",
            "type": "checkbox_fnc",
            "group": "3. functions",
            "subgroup": "functions",
            "description": "An event that occurs when the header is clicked.",
            "value": false,
            "gridevent" : true
        },
        "headerClickCode": {
            "class": "headerClick",
            "type": "eventselect",
            "def": 'alert(event.type + " : " + event.headerText + ", dataField : " + event.dataField+ ", index : " + event.columnIndex + ", depth : " + event.item.depth);',
            "group": "3. functions",
            "subgroup": "functions",
            "description": "",
            "value": 'alert(event.type + " : " + event.headerText + ", dataField : " + event.dataField+ ", index : " + event.columnIndex + ", depth : " + event.item.depth);',
            "gridevent" : true
        },
        "footerClick": {
            "class": "footerClick",
            "type": "checkbox_fnc",
            "group": "3. functions",
            "subgroup": "functions",
            "description": "An event that occurs when the footer is clicked.",
            "value": false,
            "gridevent" : true
        },
        "footerClickCode": {
            "class": "footerClick",
            "type": "eventselect",
            "def": 'alert(event.type + ",  footerIndex : " + event.footerIndex + ", footerText : " + event.footerText + ", footerValue : " + event.footerValue);',
            "group": "3. functions",
            "subgroup": "functions",
            "description": "",
            "value": 'alert(event.type + ",  footerIndex : " + event.footerIndex + ", footerText : " + event.footerText + ", footerValue : " + event.footerValue);',
            "gridevent" : true
        }
  }

};