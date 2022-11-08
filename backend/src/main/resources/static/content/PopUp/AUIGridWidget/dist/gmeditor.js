/*!
* amCharts - Live Editor - handler
* CORE; GUI PROCESSOR
* Copyright (c) 2014 amCharts
* Licensed MIT
* http://amcharts.com/
* v1.0.0-beta.1
*/

if (!AmCharts.Editor) {
    AmCharts.Editor = {};
    var auigridOptions = {};
    var formal = {};
    var accept = {};
    var groupingSummary  = {dataFields : []};
    var groupingFields = [];
    var dataset = -1;
	var proejctID;
    var doit;
}

AmCharts.Editor.dataProvider = [];

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

function resizedw(){
	AUIGrid.resize("#auigrid-list",$(".app-editor-2-2-1").width(),$(".app-editor-2-2-1").height()) 
}
function cboColumnReset(){
	$("#cbo-column").children().remove();
	
	var availableFields = auigridOptions.colModel;
	jQuery('<option value="">Not Set</option>').appendTo($("#cbo-column"));
	
	AmCharts.Editor.dataFields = [];

	for (var i = 0; i < availableFields.length; i++) {
		jQuery('<option>' + availableFields[i].dataField + '</option>').appendTo($("#cbo-column"));
		AmCharts.Editor.dataFields[i] = availableFields[i].dataField;
	}
}
function columninfoClear(){
	var config = AmCharts.Editor.editorConfig[AmCharts.Editor.MAPPING.chartClassMap[AmCharts.Editor.chartType]];		
	config.properties.column.value = jQuery("#cbo-column").val();
    jQuery("#txt-columnWidth").val("");
    jQuery("#txt-columnName").val("");
    jQuery("#txt-columnTempleteData").val("");
    jQuery("#chk-columnHide").closest('li').removeClass('selected');
    jQuery("#chk-require").closest('li').removeClass('selected');
    jQuery("#chk-excelHide").closest('li').removeClass('selected');
    jQuery("#chk-excelTempleteHide").closest('li').removeClass('selected');
    jQuery("#chk-columnUneditable").closest('li').removeClass('selected');
    jQuery("#chk-filterEanble").closest('li').removeClass('selected');
    jQuery("#chk-filterShowIcon").closest('li').removeClass('selected');
    jQuery("#chk-groupingFields").closest('li').removeClass('selected');
    jQuery("#txt-columnSequence").val("");
    jQuery("#chk-numberFormatting").closest('li').removeClass('selected');
    jQuery("#chk-dateFormatting").closest('li').removeClass('selected');
    jQuery("#chk-groupingFields").closest('li').removeClass('selected');
    jQuery("#chk-groupingSummary").closest('li').removeClass('selected');
    jQuery('#cbo-footerType').val("");
    jQuery('#cbo-footerType').trigger("chosen:updated");
    jQuery("#txt-footerString").val("");
    jQuery('#cbo-formattingString').val("");
    jQuery("#cbo-formattingString").children().remove();
    jQuery('#cbo-formattingString').trigger("chosen:updated");
}
function columnSelected(colModel){
	var config = AmCharts.Editor.editorConfig[AmCharts.Editor.MAPPING.chartClassMap[AmCharts.Editor.chartType]];
	var i = auigridOptions.colModel.map(function (item) { return item.dataField; }).indexOf(colModel.dataField);
	
	//for (var i = 0; i < auigridOptions.colModel.length; i++) {
        if (colModel.dataField == jQuery("#cbo-column").val()) {
            config.properties.column.value = jQuery("#cbo-column").val();
        	config.properties.columnSequence .value = i;
            config.properties.columnWidth.value = colModel.width;
            config.properties.columnName.value = colModel.headerText;
            config.properties.columnTempleteData.value = colModel.columnTempleteData;

            if (colModel.hide)
                $("#chk-columnHide").closest('li').addClass('selected');
            else
                $("#chk-columnHide").closest('li').removeClass('selected');
            
            if (colModel.require)
                $("#chk-require").closest('li').addClass('selected');
            else
                $("#chk-require").closest('li').removeClass('selected');
            
            if (colModel.excelHide || colModel.excelHide == null)
            	$("#chk-excelHide").closest('li').removeClass('selected');
            else
            	$("#chk-excelHide").closest('li').addClass('selected');
            
            if (colModel.excelTempleteHide || colModel.excelTempleteHide == null)
            	$("#chk-excelTempleteHide").closest('li').removeClass('selected');
            else
            	$("#chk-excelTempleteHide").closest('li').addClass('selected');
            
            if (colModel.editable || colModel.editable == null)
            	$("#chk-columnUneditable").closest('li').removeClass('selected');
            else
            	$("#chk-columnUneditable").closest('li').addClass('selected');

            if (colModel.filter != null && colModel.filter.eanble)
            	$("#chk-filterEanble").closest('li').addClass('selected');
            else
            	$("#chk-filterEanble").closest('li').removeClass('selected');

            if (colModel.filter != null && colModel.filter.showIcon)
            	$("#chk-filterShowIcon").closest('li').addClass('selected');
            else
            	$("#chk-filterShowIcon").closest('li').removeClass('selected');
            
            if (groupingFields.indexOf(colModel.dataField) != -1)
                $("#chk-groupingFields").closest('li').addClass('selected');
            else
                $("#chk-groupingFields").closest('li').removeClass('selected');
            
            if(groupingSummary.dataFields.indexOf(colModel.dataField) != -1)
            	$("#chk-groupingSummary").closest('li').addClass('selected');
            else
            	$("#chk-groupingSummary").closest('li').removeClass('selected');
            
            jQuery("#txt-columnWidth").val(config.properties.columnWidth.value);
            jQuery("#txt-columnName").val(config.properties.columnName.value);
            jQuery("#txt-columnTempleteData").val(config.properties.columnTempleteData.value);
            jQuery("#txt-columnSequence").val(i);
            var removeIndex = auigridOptions.footerData.map(function (item) { return item.positionField; }).indexOf(config.properties.column.value);
            if (removeIndex != -1) {
            	if(typeof auigridOptions.footerData[removeIndex].operation != "undefined"){
            		$('#cbo-footerType').val(auigridOptions.footerData[removeIndex].operation);
            		$('#cbo-footerType').trigger("chosen:updated");
            	}
            	else{
            		$('#txt-footerString').val(auigridOptions.footerData[removeIndex].labelText);
            		$('#txt-footerString').trigger("chosen:updated");
            	}
            }
            else{
                $('#cbo-footerType').val("");
                $('#cbo-footerType').trigger("chosen:updated");
                $('#txt-footerString').val("");
            }
            jQuery('<option value="">Not Set</option>').appendTo($("#cbo-formattingString"));
            
            if(colModel.dataType == "numeric"){
            	$("#chk-numberFormatting").closest('li').addClass('selected');
            	config.properties.numberFormatting.value = true;
            	
            	config.properties.dateFormatting.value = false;
            	$("#chk-dateFormatting").closest('li').removeClass('selected');
            	
            	var format = AmCharts.Editor.MAPPING.comboboxData.number;
                for(var k = 0;k<format.length;k++){
                	jQuery('<option>'+format[k]+'</option>').appendTo($("#cbo-formattingString"));	
                }
                
                $("#cbo-formattingString").val(colModel.formatString);
                $('#cbo-formattingString').trigger("chosen:updated");
        	}
            else if(colModel.dataType == "date"){
            	$("#chk-dateFormatting").closest('li').addClass('selected');
            	config.properties.dateFormatting.value = true;
            	
            	config.properties.numberFormatting.value = false;
            	$("#chk-numberFormatting").closest('li').removeClass('selected');

        		var format = AmCharts.Editor.MAPPING.comboboxData.date;
                for(var k = 0;k<format.length;k++){
                	jQuery('<option>'+format[k]+'</option>').appendTo($("#cbo-formattingString"));	
                }
                
                $("#cbo-formattingString").val(colModel.formatString);
                $('#cbo-formattingString').trigger("chosen:updated");
            }
            else{
                jQuery("#chk-numberFormatting").closest('li').removeClass('selected');
                jQuery("#chk-dateFormatting").closest('li').removeClass('selected');

            	$('#cbo-formattingString').val("");
                $("#cbo-formattingString").children().remove();
                $('#cbo-formattingString').trigger("chosen:updated");
            }
            if(typeof colModel.style != "undefined"){
            	$("#cbo-columnAlign").val(colModel.style);
        	}
            else
            	$("#cbo-columnAlign").val("");
        	$("#cbo-columnAlign").trigger("chosen:updated");
        	
            if(typeof colModel.popupType != "undefined"){
            	$("#cbo-popupType").val(colModel.popupType);
        	}
            else
            	$("#cbo-popupType").val("");
        	$("#cbo-popupType").trigger("chosen:updated");
        	
            if(colModel.editRenderer != null && colModel.editRenderer.type != null){
            	$("#cbo-editRendererType").val(colModel.editRenderer.type);
        	}
            else
            	$("#cbo-editRendererType").val("");
        	$("#cbo-editRendererType").trigger("chosen:updated");
        	
            if(colModel.renderer != null && colModel.renderer.type != null){
            	$("#cbo-renderer").val(colModel.renderer.type);
        	}
            else
            	$("#cbo-renderer").val("");
        	$("#cbo-renderer").trigger("chosen:updated");
        }
    
}
window.onresize = function(){
  clearTimeout(doit);
  doit = setTimeout(resizedw, 300);
};

auigridOptionsconfig = function () {
	// auigridOptions.gridProps에 따른 값 config.properties에 적용
    var config = AmCharts.Editor.editorConfig[AmCharts.Editor.MAPPING.chartClassMap[AmCharts.Editor.chartType]];
    var mydata = AmCharts.Editor.dataProvider;
    if(auigridOptions.gridProps == null)
    	return;
    if(auigridOptions.groupingFields){
    	groupingFields = auigridOptions.gridProps.groupingFields;
    }
    if (auigridOptions.gridProps["usePaging"]) {
        config.properties.usePaging.value = true;
    }
    else {
    	delete auigridOptions.gridProps["usePaging"];
    	config.properties.usePaging.value = false;
    }
    if (auigridOptions.gridProps["editable"]) {
        config.properties.editable.value = true;
    }
    else {
        delete auigridOptions.gridProps["editable"];
        config.properties.editable.value = false;
    }
    if (auigridOptions.gridProps["popupSetting"]) {
        config.properties.popupSetting.value = true;
    }
    else {
        delete auigridOptions.gridProps["popupSetting"];
        config.properties.popupSetting.value = false;
    }
    if (auigridOptions.gridProps["showRowCheckColumn"]) {
        config.properties.showRowCheckColumn.value = true;
    }
    else {
        delete auigridOptions.gridProps["showRowCheckColumn"];
        config.properties.showRowCheckColumn.value = false;
    }
    if (auigridOptions.gridProps["showRowAllCheckBox"]) {
        config.properties.showRowAllCheckBox.value = true;
    }
    else {
        config.properties.showRowAllCheckBox.value = false;
    }
    if (auigridOptions.gridProps["showFooter"]) {
        config.properties.showFooter.value = true;
    }
    else {
        delete auigridOptions.gridProps["showFooter"];
        config.properties.showFooter.value = false;
    }
    if (auigridOptions.gridProps["footerPosition"]) {
        auigridOptions.gridProps["footerPosition"] = "top";
        config.properties.footerPosition.value = true;
    }
    else {
        delete auigridOptions.gridProps["footerPosition"];
        config.properties.footerPosition.value = false;
    }
    if (auigridOptions.gridProps["showRowNumColumn"]) {
        config.properties.showRowNumColumn.value = true;
    }
    else {
    	auigridOptions.gridProps["showRowNumColumn"] = false;
        config.properties.showRowNumColumn.value = false;
    }
    if (auigridOptions.gridProps["enableSorting"]) {
        config.properties.enableSorting.value = true;
    }
    else {
    	auigridOptions.gridProps["enableSorting"] = false;
        config.properties.enableSorting.value = false;
    }
    if (auigridOptions.gridProps["showHeader"]) {
        config.properties.showHeader.value = true;
    }
    else {
        config.properties.showHeader.value = false;
    }
    if (auigridOptions.gridProps["enableFilter"]) {
        config.properties.enableFilter.value = true;
    }
    else {
        config.properties.enableFilter.value = false;
    } 
    if (auigridOptions.gridProps["showSelectionBorder"]) {
        config.properties.showSelectionBorder.value = true;
    }
    else {
    	auigridOptions.gridProps["showSelectionBorder"] = false;
        config.properties.showSelectionBorder.value = false;
    } 
    if (auigridOptions.gridProps["selectionMode"]) {
        config.properties.selectionMode.value = auigridOptions.gridProps["selectionMode"];
    }
    else {
        config.properties.selectionMode.value = "";
    } 
    if (auigridOptions.gridProps["groupingSummarySetStyle"]) {
    	auigridOptions.gridProps["rowStyleFunction"] =  function(rowIndex, item) {
			
			if(item._$isGroupSumField) {
				switch(item._$depth) {  
				case 2:
					return "aui-grid-row-depth1-style";
				case 3:
					return "aui-grid-row-depth2-style";
				case 4:
					return "aui-grid-row-depth3-style";
				default:
					return "aui-grid-row-depth-default-style";
				}
			}
			return null;
		};
        config.properties.groupingSummarySetStyle.value = true;
    }
    else {
    	if(auigridOptions.gridProps["rowStyleFunction"])
    		delete auigridOptions.gridProps["rowStyleFunction"];
        config.properties.groupingSummarySetStyle.value = false;
    }
    if (auigridOptions.gridProps["wordWrap"]) {
        config.properties.wordWrap.value = true;
    }
    else {
        config.properties.wordWrap.value = false;
    }
    if(groupingSummary.dataFields.length > 0){
    	auigridOptions.gridProps["groupingSummary"] =  groupingSummary;
    }
    else{
    	delete auigridOptions.gridProps["groupingSummary"]
	}

    if (groupingFields.length > 0) {
        auigridOptions.gridProps["groupingFields"] = groupingFields;
    }
    else {
    	auigridOptions.gridProps["groupingFields"] = groupingFields;
        config.properties.groupingFields.value = false;
    }
    if (auigridOptions.gridProps["useGroupingPanel"]) {
        config.properties.useGroupingPanel.value = true;
    }
    else {
    	delete auigridOptions.gridProps["useGroupingPanel"];
        config.properties.useGroupingPanel.value = false;
    }
    if (auigridOptions.gridProps["showBranchOnGrouping"]) {
        config.properties.showBranchOnGrouping.value = true;
    }
    else {
    	auigridOptions.gridProps["showBranchOnGrouping"] = false;
        config.properties.showBranchOnGrouping.value = false;
    }
    if (auigridOptions.gridProps["enableCellMerge"]) {
        config.properties.enableCellMerge.value = true;
    }
    else {
    	delete auigridOptions.gridProps["enableCellMerge"];
        config.properties.enableCellMerge.value = false;
    }
    if (auigridOptions.gridProps["pagingMode"]) {
        auigridOptions.gridProps["pagingMode"] = "simple";
        config.properties.pagingMode.value = true;
    }
    else {
        auigridOptions.gridProps["pagingMode"] = "default";
        config.properties.pagingMode.value = false;
    }

    if (auigridOptions.gridProps["showStateColumn"]) {
        config.properties.showStateColumn.value = true;
    }
    else {
    	delete auigridOptions.gridProps["showStateColumn"];
        config.properties.showStateColumn.value = false;
    }
    if (auigridOptions.gridProps["fillColumnSizeMode"]) {
        config.properties.fillColumnSizeMode.value = true;
    }
    else {
    	delete auigridOptions.gridProps["fillColumnSizeMode"];
        config.properties.fillColumnSizeMode.value = false;
    }
    if (auigridOptions.gridProps["enableMovingColumn"]) {
        config.properties.enableMovingColumn.value = true;
    }
    else {
    	delete auigridOptions.gridProps["enableMovingColumn"];
        config.properties.enableMovingColumn.value = false;
    }
    if (auigridOptions.columnFixed) {
        config.properties.columnFixed.value = auigridOptions.columnFixed;
    }
    else {
        config.properties.columnFixed.value = 0;
    }
    if(config.properties.pageRowCount.value !== ""){
    	auigridOptions.gridProps["pageRowCount"] = config.properties.pageRowCount.value;
	}
    else{
    	delete auigridOptions.gridProps["pageRowCount"];
	}
    if (auigridOptions.gridName) {
        config.properties.gridName.value = auigridOptions.gridName;
    }
    else {
        config.properties.gridName.value = "";
    }
    if (auigridOptions.description) {
        config.properties.description.value = auigridOptions.description;
    }
    else {
        config.properties.description.value = "";
    }
    if (auigridOptions.templeteData) {
        config.properties.templeteData.value = auigridOptions.templeteData;
    }
    else {
        config.properties.templeteData.value = "";
    }
    if(auigridOptions.gridProps["headerHeight"]){
    	config.properties.headerHeight.value = Number(auigridOptions.gridProps["headerHeight"]);
	}
    else {
    	delete auigridOptions.gridProps["headerHeight"];
    }
}

var hideColumns = [];
dataRefresh = false;
auigridCreateFlag = false;
auigridDraw = function (editorJson) {
	if(editorJson != null) {auigridCreateFlag = false; dataRefresh = true;}
	// Editor의 AUI Grid Draw
    var config = AmCharts.Editor.editorConfig[AmCharts.Editor.MAPPING.chartClassMap[AmCharts.Editor.chartType]];
    
    var mydata = AmCharts.Editor.dataProvider;

    // AUI Grid Event 적용
    if (config) {
        var properties = config.properties;
        for (var name in properties) {
            if (properties[name].type == "checkbox_fnc") {
                if (properties[name].value) {

                    if (auigridOptions.gridEvent[name] == undefined) {
                        auigridOptions.gridEvent[name] = {};
                    }
                    accept[name] = [];
                    accept[name] = properties[name + "Code"].value;

                    auigridOptions.gridEvent[name] = [];
                    auigridOptions.gridEvent[name].push(accept[name]);

                } else {
                    delete (accept[name]);
                	delete (auigridOptions.gridEvent[name]);
                }
            }
        }
    }
    if(auigridOptions != null){
    	auigridOptions.data = mydata;
    	auigridOptionsconfig();
    	
    	for (var name in accept) {
    		auigridOptions.gridEvent[name] = accept[name];
    	}
    	if(editorJson !=null ) {
    		auigridOptions = editorJson;
    	}
    	formal = auigridOptions;
    	
    	if(!auigridCreateFlag) {
    		auigridCreateFlag = true;
	        AUIGrid.destroy("#auigrid-list");
	    	// AUIGrid Create
			AUIGrid.create("#auigrid-list", auigridOptions.colModel, auigridOptions.gridProps);
			AUIGrid.bind("#auigrid-list", "headerClick", function(event) {
				if(event.depth >1){
					for(var idx in auigridOptions.colModel){
						if(typeof auigridOptions.colModel[idx].children !="undefined"){
							for(var childIdx in auigridOptions.colModel[idx].children){
								if(auigridOptions.colModel[idx].children[childIdx].dataField == event.item.dataField){
									AmCharts.Editor.selectMenuItem($(".menu-item-1"));
									$(".menu-item-1").addClass("active");
									config.properties.column.value = auigridOptions.colModel[idx].dataField;
									$('#cbo-column').val(auigridOptions.colModel[idx].dataField);
									$('#cbo-column').trigger("chosen:updated");
									columnSelected(auigridOptions.colModel[idx]);
									auigridOptionsconfig();
									break;
								}
							}
						}
					}
				}
				else{
					AmCharts.Editor.selectMenuItem($(".menu-item-1"));
					$(".menu-item-1").addClass("active");
					config.properties.column.value = event.item.dataField;
					$('#cbo-column').val(event.item.dataField);
					$('#cbo-column').trigger("chosen:updated");
					var idx = auigridOptions.colModel.map(function (item) { return item.dataField; }).indexOf(event.item.dataField);
					columnSelected(auigridOptions.colModel[idx]);
					auigridOptionsconfig();
				}
			});
			AUIGrid.bind("#auigrid-list","columnStateChange",function(event) {
				var index = auigridOptions.colModel.map(function (item) { return item.dataField; }).indexOf(event.dataField);
				if(index == -1)
					return;
				if(event.property == "width"){
					auigridOptions.colModel[index].width = event.current;
				}
				else if(event.property == "columnIndex"){
	        		var change_seq = event.current;
	        		var origin_seq = index;
	        		
	    			var temp = auigridOptions.colModel.splice(origin_seq,1);
	    			auigridOptions.colModel.splice(change_seq,0,temp[0]);
	    			index = change_seq;
					cboColumnReset();
					jQuery("#cbo-column").val(auigridOptions.colModel[index].dataField);
	    	        AmCharts.Editor.processData(AmCharts.Editor.dataProvider);
	    	        jQuery(AmCharts.Editor.SELECTORS.table).handsontable('render');
					$("#cbo-column").trigger("chosen:updated");
				}
				config.properties.column.value = event.dataField;
				$("#cbo-column").val(auigridOptions.colModel[index].dataField);
				$('#cbo-column').trigger("chosen:updated");
				columnSelected(auigridOptions.colModel[index]);
			});
    	}
    	// AUIGrid Footer적용
    	if (auigridOptions.gridProps != null)
    		if(auigridOptions.gridProps["showFooter"])
    			AUIGrid.setFooter("#auigrid-list", auigridOptions.footerData);
    	// AUIGrid Data 삽입
    	AUIGrid.changeColumnLayout("#auigrid-list", auigridOptions.colModel);
    	AUIGrid.setProp("#auigrid-list", auigridOptions.gridProps);
    	
    	if(dataRefresh) {
    		auigridOptions.data.splice(10);
    		AUIGrid.setGridData("#auigrid-list", auigridOptions.data);
    		dataRefresh = false;
    	}
//    	auigridOptions.gridProps
    	
    	// column hide
    	hideColumns = [];
    	if(auigridOptions.colModel != undefined){
    		for (var i = 0; i < auigridOptions.colModel.length; i++) {
    			if (auigridOptions.colModel[i].hide)
    				hideColumns.push(auigridOptions.colModel[i].dataField)
    		}
    	}
    	AUIGrid.hideColumnByDataField("#auigrid-list", hideColumns)
    	// column fixed
    	AUIGrid.setFixedColumnCount("#auigrid-list", config.properties.columnFixed.value);
    	
    	// auigrid Event bind
    	for (var fnc in auigridOptions.gridEvent) {
    		AUIGrid.bind("#auigrid-list", fnc, function(event){
    			return new Function(event, eval( auigridOptions.gridEvent[event.type]));
    		});
    	}

    	if(editorJson !=null ) {
    		formal = editorJson;
			auigridOptions = editorJson;
    	}
     }
}
AmCharts.Editor.init = function (config) {
    AmCharts.Editor.makeEditor(config);

    if(typeof windowParam.editMode !== "undefined"){
//    	auigridOptions.data = windowParam.gridData
//		AmCharts.Editor.dataProvider = auigridOptions.data;
//    	AmCharts.Editor.processData(AmCharts.Editor.dataProvider);
//    	auigridDraw();
    	
    	$.ajax({
    		url: "/TU_Platform/mica/widgets/" + windowParam.widgetId + "/data",
    		method: "get",
//    		async: false,
    		success: function(data) {
    			var tempGridProps =[];
				var tempColModel = [];
				if(auigridOptions != null){
					tempGridProps = auigridOptions.gridProps;
					tempColModel  = auigridOptions.colModel;
				}
				else{
					auigridOptions = {};
				}
    			// ajax 호출
//				var targetData = JSON.parse(data);
				debugger;
				var targetData = data;
				if(targetData.length < 1) { return; }
    			auigridOptions.data = Array.isArray(targetData) ? targetData : [targetData];
    			auigridOptions.gridProps = tempGridProps;
    			auigridOptions.colModel = [];
    			
    			var mergeColModel = [];
    			var colindex = 0;
    			
    			for(var coldata in auigridOptions.data[0]){
    				mergeColModel[colindex] = {"headerText" : coldata,"dataField" : coldata, "width": 80}
    				colindex++;
				}
    			var  mergeColModel2 = $.extend(true, [] , mergeColModel);
    			//tempColModel = 사용자 정의 colModel(+)
    			//mergeColModel = 조회 결과 colModel(-)
    			
    			if(typeof tempColModel != "undefined" && tempColModel.length > 0){
	    			tempColModel.forEach(function (item,idx){
	    				var removeIndex = -1;
	    				mergeColModel2.forEach(function (obj,index){
	    					if(item.dataField === obj.dataField)
	    						removeIndex = idx;
	    				})
	    				if (removeIndex == -1) {
	    					tempColModel.splice(idx, 1);
	    				}
	    			});
	    			tempColModel.forEach(function(obj, index){
	    				var target;
	    				mergeColModel.forEach(function(item, idx) {
	    				     if(obj.dataField === item.dataField){
	    				    	 target = idx;
	    				     }
	    				});
	    				if(typeof target != "undefined")
	    					mergeColModel.splice(target, 1);
	    			});
	    			
	    			auigridOptions.colModel = tempColModel.concat(mergeColModel);
    			} else {
    				auigridOptions.colModel = mergeColModel; 
    			}
    
    			if(auigridOptions.footerData === undefined)
    				auigridOptions["footerData"] = [];
    			
      			if(auigridOptions.gridEvent === undefined)
    				auigridOptions["gridEvent"] = {};
      			
				AmCharts.Editor.dataFields = [];
				for (var i = 0; i < auigridOptions.colModel.length; i++) {
				    AmCharts.Editor.dataFields[i] = auigridOptions.colModel[i].dataField;
				}
    	        AmCharts.Editor.dataProvider = auigridOptions.data;
    	        AmCharts.Editor.processData(AmCharts.Editor.dataProvider);
    	        jQuery(AmCharts.Editor.SELECTORS.table).handsontable('render');
    	        auigridDraw();
    		}
    	});
    	
    	return ;
    	
    	
    	
    	$.ajax({
    		url: "/micaweb/mica/projects/"+windowParam.projectId+"/datasets",
    		method: "GET",
    		contentType: "application/json; charset=UTF-8",
    		success: function(result){
    			dataset = {};
    			for(var i = 0; i <result.length ; i++){
    				dataset[result[i].id.datasetId] = result[i].id.datasetId;
    			}
        		$("#cbo-datasetId").children().remove();
    			
    			jQuery('<option value="">Not Set</option>').appendTo($("#cbo-datasetId"));
    			for (var datasetid in dataset) {
    				jQuery('<option value="'+datasetid+'">' + datasetid + '</option>').appendTo($("#cbo-datasetId"));
    			}
    			$('#cbo-datasetId').trigger("chosen:updated");
    			var option = AmCharts.Editor.editorConfig[AmCharts.Editor.MAPPING.chartClassMap[AmCharts.Editor.chartType]];
    		    if(option.properties.datasetId.value !== "") {
					auigridOptions.datasetId = option.properties.datasetId.value;
    	        	$("#cbo-datasetId").val(option.properties.datasetId.value);
    	        	$('#cbo-datasetId').trigger("chosen:updated");
    	        	if(windowParam.gridData != null) {
//    	        		"gridData" : AUIGrid.getGridData(id)
//    		        	mode : "user"
    	        		auigridOptions.data = windowParam.gridData
    	        		AmCharts.Editor.dataProvider = auigridOptions.data;
	    	        	AmCharts.Editor.processData(AmCharts.Editor.dataProvider);
	    	        	auigridDraw();
	    	        	return;
    	        	}
	    	        
    		    	$.ajax({
        				url: "/micaweb/mica/projects/"+windowParam.projectId+"/datasets/"+option.properties.datasetId.value+"/datas",
        				method: "get",
        				contentType: "application/json; charset=UTF-8",
        				success: function(data){
        					var tempGridProps =[];
        					var tempColModel = [];
        					if(auigridOptions != null){
        						tempGridProps = auigridOptions.gridProps;
        						tempColModel  = auigridOptions.colModel;
        					}
        					else{
        						auigridOptions = {};
        					}
        	    			// ajax 호출
        					var targetData = JSON.parse(data);
        					if(targetData.length < 1) { return; }
        	    			auigridOptions.data = Array.isArray(targetData) ? targetData : [targetData];
        	    			auigridOptions.gridProps = tempGridProps;
        	    			auigridOptions.colModel = [];
        	    			
        	    			var mergeColModel = [];
        	    			var colindex = 0;
        	    			
        	    			for(var coldata in auigridOptions.data[0]){
        	    				mergeColModel[colindex] = {"headerText" : coldata,"dataField" : coldata, "width": 80}
        	    				colindex++;
            				}
        	    			var  mergeColModel2 = $.extend(true, [] , mergeColModel);
        	    			//tempColModel = 사용자 정의 colModel(+)
        	    			//mergeColModel = 조회 결과 colModel(-)
        	    			
        	    			if(typeof tempColModel != "undefined" && tempColModel.length > 0){
	        	    			tempColModel.forEach(function (item,idx){
	        	    				var removeIndex = -1;
	        	    				mergeColModel2.forEach(function (obj,index){
	        	    					if(item.dataField === obj.dataField)
	        	    						removeIndex = idx;
	        	    				})
	        	    				if (removeIndex == -1) {
	        	    					tempColModel.splice(idx, 1);
	        	    				}
	        	    			});
	        	    			tempColModel.forEach(function(obj, index){
	        	    				var target;
	        	    				mergeColModel.forEach(function(item, idx) {
		    	    				     if(obj.dataField === item.dataField){
		    	    				    	 target = idx;
		    	    				     }
		    	    				});
	        	    				if(typeof target != "undefined")
	        	    					mergeColModel.splice(target, 1);
	        	    			});
	        	    			
	        	    			auigridOptions.colModel = tempColModel.concat(mergeColModel);
        	    			} else {
        	    				auigridOptions.colModel = mergeColModel; 
        	    			}
        	    
        	    			if(auigridOptions.footerData === undefined)
        	    				auigridOptions["footerData"] = [];
        	    			
        	      			if(auigridOptions.gridEvent === undefined)
        	    				auigridOptions["gridEvent"] = {};
        	      			
        					AmCharts.Editor.dataFields = [];
        					for (var i = 0; i < auigridOptions.colModel.length; i++) {
        					    AmCharts.Editor.dataFields[i] = auigridOptions.colModel[i].dataField;
        					}
        	    	        AmCharts.Editor.dataProvider = auigridOptions.data;
        	    	        AmCharts.Editor.processData(AmCharts.Editor.dataProvider);
        	    	        jQuery(AmCharts.Editor.SELECTORS.table).handsontable('render');
        	    	        auigridDraw();
        				}
        			});
    		    }

    		}
    	});
    }
}

AmCharts.Editor.processData = function (data) {
	// 하단 Grid 데이터 업데이트
    AmCharts.Editor.changedData(data, true);
    return;
    if (jQuery.inArray('editor', AmCharts.Editor.current.rendered) != -1) {
        jQuery(AmCharts.Editor.SELECTORS.table).handsontable({
            data: data,
            columns: jQuery(AmCharts.Editor.dataFields).map(function () {
                return { data: this }
            })
        });
    }
}

AmCharts.Editor.makeEditor = function (preConfig) {
    var className = AmCharts.Editor.MAPPING.chartClassMap[preConfig.type];
    var classConfig = AmCharts.Editor.MAPPING.classMap[className];
    var editorConfig = {};

    AmCharts.Editor.preConfig = preConfig;
    AmCharts.Editor.chartType = preConfig.type;
    AmCharts.Editor.editorConfig = {};

    // GET FIELDS; MAKE CONFIG
    AmCharts.Editor.getFields(preConfig.dataProvider);
    AmCharts.Editor.itemIds = {};
    AmCharts.Editor.makeEditorConfig(className, editorConfig, preConfig);

    AmCharts.Editor.editorConfig[className] = editorConfig;
    AmCharts.Editor.prepareTree(editorConfig);
    AmCharts.Editor.processData(preConfig.dataProvider);
}

AmCharts.Editor.prepareTree = function (editorItemConfig) {
    var treeData = AmCharts.Editor.makeTreeConfig(editorItemConfig, []);
    treeData.sort(AmCharts.Editor.dynamicSortMultiple("type", "-title"));
    treeData.reverse();

    AmCharts.Editor.treeConfig = treeData;
    AmCharts.Editor.haveSelected = false;
    AmCharts.Editor.buildTree(treeData, jQuery(AmCharts.Editor.SELECTORS.groups));
    if (!AmCharts.Editor.haveSelected) {
        AmCharts.Editor.selectMenuItem(treeData[0].treeItemLink);
    }
}

AmCharts.Editor.buildTree = function (treeData, container) {
    container.html("");
    for (var i = 0; i < treeData.length; i++) {
        var treeItemConfig = treeData[i];
        var editorItemConfig = treeItemConfig.editorItemConfig;
        var type = treeItemConfig.type;
        var title = treeItemConfig.title;
        var treeItemLi = jQuery('<li class="menu-item menu-item-' + treeItemConfig.type + ' menu-item-' + treeItemConfig.class + '"></li>').appendTo(container).data('treeItemConfig', treeItemConfig);
        var treeItemLink = jQuery('<a href="#"></a>').data('treeItemConfig', treeItemConfig).appendTo(treeItemLi);
        var treeItemTitle = jQuery("<span></span>").text(title).appendTo(treeItemLink);
        var parentTree = treeItemConfig.parentTree;
        var children = treeItemConfig.children;
        var btn = null;

        // CATCH SIBLING TITLE; HUMANIZE
        try {
            title = editorItemConfig.properties.id.value;
            if (editorItemConfig.properties.id) {
                editorItemConfig.alsoUpdate = treeItemTitle;
            }
        } catch (err) { }
        treeItemTitle.html(AmCharts.Editor.capitalize(title));

        treeItemConfig.treeItemLi = treeItemLi;
        treeItemConfig.treeItemLink = treeItemLink;

        treeItemLink.on('click', function (e) {
            e.preventDefault();
            AmCharts.Editor.selectMenuItem(jQuery(this));
        })
    }
}

AmCharts.Editor.selectMenuItem = function (treeItemLink) {
    var treeItemLi = treeItemLink.parent();
    var treeItemConfig = treeItemLink.data('treeItemConfig') || {};
    var editorItemConfig = treeItemConfig.editorItemConfig || {};
    var treeItemClass = 'active';

    // TOGGLE PARENT
    if (editorItemConfig.isArray && treeItemLi.hasClass('selected')) {
        treeItemLi.removeClass('selected');
        return;
    }

    if (editorItemConfig.enabled !== false) {
        if (treeItemConfig.type == 'array') {
            if (!treeItemConfig.children || !treeItemConfig.children.length) {
                return false;
            }
            treeItemClass = 'selected';
        }

        // DESELECT PREVIOUS
        jQuery(AmCharts.Editor.SELECTORS.groups + ' .menu-item').removeClass('active');
        jQuery(AmCharts.Editor.SELECTORS.groups + ' .menu-item-array').removeClass('selected');

        // SELECT CURRENT PLUS PARENTS
        treeItemLi.addClass(treeItemClass);
        treeItemLink.parents('.menu-item-array').addClass('selected');

        AmCharts.Editor.hasSubgroups = false;
        AmCharts.Editor.createClassProperties(treeItemConfig);
        
        // Grid Function일 경우 Editor 하단 Grid hidden후 소스 입력 창 생성
    	if(treeItemConfig.group == "3. functions")
		{
    		$(".am-editor-table").addClass('hidden');
    		
    		if($(".function-textbox").length == 0 ){
    			
        		var container = jQuery('#am-editor-data');
        		
        	    var propertyHTML = jQuery('<li class="function-textbox" style="width:100%;height:90%; list-style: none; margin-top: 30px;"></li>');
        	    var controlHTML = jQuery('<div class="function-textbox-control" style="width:95%;height:90%; margin-left: 20px; margin-right:20px; margin-bottom:20px"></div>');
        	    
        	    propertyHTML.append(propertyHTML);
        	    propertyHTML.append(controlHTML);
        		
                wrapper = jQuery('<div class="ui-control ui-control-textarea" style="width:100%;height:100%;"></div>');
                control = jQuery('<textarea id = "txt_code" style="width:100%;height:100%;"></textarea>').on('input', function (event) {
                }).on('blur', function () {
                	if(jQuery(this).val() == "")
                		return;
                	var config = AmCharts.Editor.editorConfig[AmCharts.Editor.MAPPING.chartClassMap[AmCharts.Editor.chartType]];

                	config.properties[$("#txt_code").prop("name")].value = jQuery(this).val();
                    auigridDraw();
                }).appendTo(wrapper);
                
                controlHTML.append(wrapper);
                container.append(propertyHTML);
    		}
		}
    	else{
    		$(".am-editor-table").removeClass('hidden'); 
    		$(".function-textbox").remove()
    	}
    }
}

AmCharts.Editor.makeTreeConfig = function (editorItemConfig, treeConfigArray) {
    var groups = {};
    var properties = editorItemConfig.properties;
    var propertyName;
    // do properties first
    if (properties) {
        for (var propertyName in properties) {
            // check group
            var prop = properties[propertyName];
            // IF it's a
            var group = prop.group;
            if (group) {
                group = group.toLowerCase();
                // check if not exist
                if (!groups[group]) {
                    groups[group] = true;

                    var treeObj = {
                        editorItemConfig: editorItemConfig,
                        title: AmCharts.Editor.normalizeName(group),
                        type: "group",
                        class : treeConfigArray.length,
                        group: group
                    }
                    treeConfigArray.push(treeObj);
                }
            }
        }
    }
    return treeConfigArray;
}

AmCharts.Editor.makeEditorConfig = function (className, configObject, preConfig) {
    var classConfig = AmCharts.Editor.MAPPING.classMap[className];
    configObject.properties = {};

    for (var propertyName in classConfig) {
        var prop = classConfig[propertyName];
        var preProp;
        if (preConfig) {
            preProp = preConfig[propertyName];
        }

        var newProp = jQuery.extend({}, prop);

        configObject.properties[propertyName] = newProp;
        if (configObject[propertyName]) {
            configObject[propertyName]["propName"] = propertyName;
        }
    }
}

AmCharts.Editor.createClassProperties = function (treeItemConfig) {
    AmCharts.Editor.selectedTreeItem = treeItemConfig;
    var propertiesPanel = jQuery(AmCharts.Editor.SELECTORS.props).html("");
    var group = treeItemConfig.group;
    var properties = (treeItemConfig.editorItemConfig || {}).properties || {};

    // DESTROY PREVIOUS
    jQuery(AmCharts.Editor.SELECTORS.props + ' .ui-control-color input').spectrum('destroy');

    // CREATE PROPS
    for (var propName in properties) {
        var property = properties[propName];
        var propertyGroup = property.group;
        if (group) {
            if (propertyGroup) {
                if (group == propertyGroup.toLowerCase()) {
                    AmCharts.Editor.makeProperty(properties[propName], propName, treeItemConfig.title);
                }
            }
        }
    }
    jQuery(AmCharts.Editor.SELECTORS.props + ' .ui-control-select select').chosen({
        disable_search: true,
        width: '100%'
    }).on('chosen:showing_dropdown', function () {
        jQuery(this).parents('.ui-control').addClass('ui-control-active');
    }).on('chosen:hiding_dropdown', function () {
        jQuery(this).parents('.ui-control').removeClass('ui-control-active');
    });
    
    $("#cbo-column").on("chosen:showing_dropdown",function() {
    	var li = $("#cbo_column_chosen ul li");
    	for(var i = 0; i < li.length; i++) {
    		var $lii = $(li[i]);
    		if(hideColumns.indexOf($lii.html()) > -1){
    			$lii.css("background", "#ddd");
    		}
    		if($("#cbo-column").val() == $lii.html() || $("#cbo-column").val() == "" && $lii.html() == "Not Set") {
    			$lii.css("color", "red");
    		}
    	}
    	console.log("cbo-column:showing_dropdown");
	});

    // TOGGLE GROUPS
    var autoSelect = jQuery(AmCharts.Editor.SELECTORS.props + ' .menu-group.menu-group-autoselect');

    if (autoSelect.length > 0) {
        jQuery(AmCharts.Editor.SELECTORS.props).prepend(autoSelect);
        autoSelect.addClass('active');
    } else {
        jQuery(AmCharts.Editor.SELECTORS.props + ' .menu-group').first().addClass('active');
    }

    // BIND TOGGLE
    jQuery(AmCharts.Editor.SELECTORS.props + ' .menu-group a').on('click', function (e) {
        e.preventDefault();
        jQuery(this).parent().toggleClass('active');
    });
    

    // sjjo user 일때 숨기기
    if(windowParam.mode == "user") {
    	for(var i = 0; i < AmCharts.Editor.MAPPING.userModeHide.length; i++) {
    		//cbo-
    		//btn-
    		//txt-
//			"type": "combobox"
//			"type": "button"
//			"type": "textbox"
    		
    		var name = AmCharts.Editor.MAPPING.userModeHide[i];
			var sett = AmCharts.Editor.MAPPING.classMap.AmSerialChart[name];
			var id = sett.type == "combobox" ? "cbo-" : sett.type == "button" ? "btn-" : sett.type == "checkbox" ? "chk-" : "txt-";
			id += name;
			$("#" + id).closest(".menu-item").hide();
    	}
    	AmCharts.Editor.MAPPING.userModeSubgroupHide
    	var titles = $("a.menu-group-title");
    	for(var i = 0; i < titles.length; i++) {
    		if(AmCharts.Editor.MAPPING.userModeSubgroupHide.indexOf($(titles[i]).text().toUpperCase()) > -1) {
    			$(titles[i]).parent().hide();
    		}
    	}
    	
    	$(".menu-item.menu-item-group.menu-item-2").hide();
    	$("#btnEdit").hide();
    }
}
AmCharts.Editor.capitalize = function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

AmCharts.Editor.makeProperty = function (propertyConfig, name, parentName) {
    var value = propertyConfig.value;

    // if it's subgroup, check if we have a div for it
    var container = AmCharts.Editor.SELECTORS.props;
    var subgroup = propertyConfig.subgroup;

    if (!subgroup) {
        subgroup = parentName;
    }

    if (subgroup) {
        var subgroupId = "navbar-" + subgroup.split(" ").join("-").toLowerCase();
        subgroupId = subgroupId.split(",").join("")
        container = jQuery("." + subgroupId);
        if (container.length == 0) {
            var header = jQuery("<li class='menu-group'><a href='#' class='menu-group-title'><i class='menu-item-toggle pull-left'></i>" + subgroup + "</a></li>").appendTo(AmCharts.Editor.SELECTORS.props);
            container = jQuery("<ul class='menu-group-items nav navbar-stacked " + subgroupId + "'></ul>").appendTo(header);

            if (AmCharts.Editor.variableizeName(subgroup) == 'dataset') {
                header.addClass('menu-group-autoselect');
            }
            header.next().hide();

            AmCharts.Editor.hasSubgroups = true;
        }
    }
    if (propertyConfig.title) {
        name = propertyConfig.title;
    }
    var wrapper, control;
    var normalizedName = name.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase();
    normalizedName = AmCharts.Editor.capitalize(normalizedName);
    var type = propertyConfig.type.toLowerCase();
    var classs = "null";
    if (propertyConfig.class != null) {
        classs = propertyConfig.class;
    }
    if(type == "eventselect")
    	return;
    var propertyHTML = jQuery('<li class="menu-item menu-item-' + AmCharts.Editor.variableizeName(type) + ' menu-item-' + classs + ' clearfix"></li>');
    
    // grid Event checkbox일 경우 txt_code의 disable속성 변경
    if(type != "checkbox_fnc")
    	var propertyNameHTML = jQuery('<div class="menu-item-name"></div>');
    else{
    	var propertyNameHTML = jQuery('<div class="menu-item-name"></div>').on('click', function () {
    		propertyConfig.value = jQuery(this).parents('.menu-item').hasClass('selected');
    		var config = AmCharts.Editor.editorConfig[AmCharts.Editor.MAPPING.chartClassMap[AmCharts.Editor.chartType]];
    		
			$("#txt_code").val(config.properties[propertyConfig.class+"Code"].value);
    		if(config.properties[propertyConfig.class].value){
    			$("#txt_code").prop("disabled",false);
    			$("#txt_code").prop("name", propertyConfig.class + "Code");
    		}
    		else{
    			$("#txt_code").prop("disabled",true);
    			$("#txt_code").prop("name", propertyConfig.class + "Code");
    		}
    	});    	
    }
    var propertyTitleHTML = jQuery('<span title="">' + normalizedName + '</span>').appendTo(propertyNameHTML);
    var controlHTML = jQuery('<div class="menu-item-control"></div>');

    propertyHTML.append(propertyNameHTML);
    propertyHTML.append(controlHTML);

    // TOOLTIP
    if (propertyConfig.description) {
        propertyTitleHTML.tooltip({
            title: propertyConfig.description,
            html: true,
            trigger: 'hover focus click',
            delay: {
                show: 500,
                hide: 1000
            },
            placement: 'right'
        }).addClass('menu-item-tooltip');
    }
    if (type == "combobox") {
        var config = AmCharts.Editor.editorConfig[AmCharts.Editor.MAPPING.chartClassMap[AmCharts.Editor.chartType]];
        if (name == "footerType" && !config.properties.showFooter.value)
            return;
        else if (name == "columnType") {
            if (config.properties.addColumn.value)
                propertyHTML.removeClass('hidden');
            else
                propertyHTML.addClass('hidden');
        }
        else if (name == "datasetId") {
            if ((typeof windowParam.datasetId == "undefined" || windowParam.datasetId == "" ) || typeof windowParam.editMode !== "undefined" )
                propertyHTML.removeClass('hidden');
            else
                propertyHTML.addClass('hidden');
        }
    	wrapper = jQuery('<div class="ui-control ui-control-select"></div>');

        control = jQuery('<select id="cbo-' + name + '"></select>').on('change', function (event) {
    		propertyConfig.value = jQuery(this).find(":selected").val();
        	
            if (name == "column") {
                // column combobox가 null일 경우
                if (jQuery("#cbo-column").val() == "") {
                	columninfoClear();
                }
                else{
    				var idx = auigridOptions.colModel.map(function (item) { return item.dataField; }).indexOf(jQuery("#cbo-column").val());
    				columnSelected(auigridOptions.colModel[idx]);
                }
            }
            else if (name == "selectionMode"){
            	 if (jQuery("#cbo-selectionMode").val() != "") {
            		 auigridOptions.gridProps["selectionMode"] = jQuery("#cbo-selectionMode").val();
            	 }
            	 else
            		 delete auigridOptions.gridProps["selectionMode"] 
            }
            else if (name == "footerType") {
                var removeIndex = auigridOptions.footerData.map(function (item) { return item.dataField; }).indexOf(config.properties.column.value);
                if (removeIndex != -1) {
                    auigridOptions.footerData.splice(removeIndex, 1);
                }
                var formatting = "";
                if (propertyConfig.value == "SUM" || propertyConfig.value == "MAX" || propertyConfig.value == "MIN")
                    formatting = "#,##0";
                if(propertyConfig.value != ""){
                	auigridOptions.footerData.push({
                		dataField: config.properties.column.value,
                		positionField: config.properties.column.value,
                		operation: propertyConfig.value,
                		formatString: formatting
                	});
                }
            }
            else if (name == "formattingString") {
            	for (var i = 0; i < auigridOptions.colModel.length; i++) {
                    if (auigridOptions.colModel[i].dataField == jQuery("#cbo-column").val()) {
                    	if(config.properties.numberFormatting.value){
                    		auigridOptions.colModel[i].dataType = "numeric";
                    		auigridOptions.colModel[i].formatString = $("#cbo-formattingString").val();
                		}
                    	else if(config.properties.dateFormatting.value){
                    		auigridOptions.colModel[i].dataType = "date";
                    		auigridOptions.colModel[i].formatString = $("#cbo-formattingString").val();
                    	}
                    	else{
                    		auigridOptions.colModel[i].dataType ="";
                    		auigridOptions.colModel[i].formatString = "";
                    	}
                    	break;
                    }
            	}
            }
            else if (name == "columnAlign") {
            	for (var i = 0; i < auigridOptions.colModel.length; i++) {
                    if (auigridOptions.colModel[i].dataField == jQuery("#cbo-column").val()) {
                    	if($("#cbo-columnAlign").val() != ""){
                    		auigridOptions.colModel[i].style = $("#cbo-columnAlign").val();
                    	}
                    	else{
                    		delete auigridOptions.colModel[i].style;
                    	}
                    	break;
                    }
            	}
            }
            else if (name == "popupType") {
            	for (var i = 0; i < auigridOptions.colModel.length; i++) {
                    if (auigridOptions.colModel[i].dataField == jQuery("#cbo-column").val()) {
                    	if($("#cbo-popupType").val() != ""){
                    		auigridOptions.colModel[i].popupType = $("#cbo-popupType").val();
                    	}
                    	else{
                    		delete auigridOptions.colModel[i].popupType;
                    	}
                    	break;
                    }
            	}
            }
            else if (name == "editRendererType") {
            	for (var i = 0; i < auigridOptions.colModel.length; i++) {
                    if (auigridOptions.colModel[i].dataField == jQuery("#cbo-column").val()) {
                    	if($("#cbo-editRendererType").val() != "") {
                    		if(auigridOptions.colModel[i].editRenderer == null) {auigridOptions.colModel[i].editRenderer = {}}
                    		auigridOptions.colModel[i].editRenderer.type = $("#cbo-editRendererType").val();
                    	}
                    	else{
                    		delete auigridOptions.colModel[i].editRenderer;
                    	}
                    	break;
                    }
            	}
            }
            else if (name == "rendererType") {
            	for (var i = 0; i < auigridOptions.colModel.length; i++) {
                    if (auigridOptions.colModel[i].dataField == jQuery("#cbo-column").val()) {
                    	if($("#cbo-rendererType").val() != "") {
                    		if(auigridOptions.colModel[i].renderer == null) {auigridOptions.colModel[i].renderer = {}}
                    		auigridOptions.colModel[i].renderer.type = $("#cbo-rendererType").val();
                    	}
                    	else{
                    		delete auigridOptions.colModel[i].renderer;
                    	}
                    	break;
                    }
            	}
            }
            auigridDraw();

        }).appendTo(wrapper);
        if (name == "datasetId"){
            if(dataset != -1)
        	{
    			for (var datasetid in dataset) {
    				jQuery('<option>' + dataset[datasetid] + '</option>').appendTo(control);
    			}
        	}
        }
        else if (name == "selectionMode"){
        	jQuery('<option value="">Not Set</option>').appendTo(control);
        	var format = AmCharts.Editor.MAPPING.comboboxData.selectionMode;
			for(var i = 0;i<format.length;i++){
				jQuery('<option value="'+format[i]+'">'+format[i]+'</option>').appendTo(control);
			}
        }
        else if (name == "gridTheme") {
            jQuery('<option value="Default">Default</option>').appendTo(control);
            jQuery('<option value="Dark">Dark</option>').appendTo(control);
            jQuery('<option value="Blue">Blue</option>').appendTo(control);
            jQuery('<option value="Modern">Modern</option>').appendTo(control);
            jQuery('<option value="Classic">Classic</option>').appendTo(control);
        }
        else if (name == "gridDataType") {
            jQuery('<option value="JSON">JSON</option>').appendTo(control);
            jQuery('<option value="XML">XML</option>').appendTo(control);
            jQuery('<option value="CSV">CSV</option>').appendTo(control);
            jQuery('<option value="JSARRAY">JS Array</option>').appendTo(control);
        }
        else if (name == "column") {
            var availableFields = auigridOptions.colModel;
            jQuery('<option value="">Not Set</option>').appendTo(control);

            for (var i = 0; i < availableFields.length; i++) {
                jQuery('<option>' + availableFields[i].dataField + '</option>').appendTo(control);
            }
        }
        else if (name == "footerType" || name == "columnType") {
        	jQuery('<option value="">Not Set</option>').appendTo(control);
            var format = AmCharts.Editor.MAPPING.comboboxData.aggregateFnc;
            for(var i = 0;i<format.length;i++){
            	if(format[i] == "COUNT" && name == "columnType")
            		continue;
            	
    			jQuery('<option value='+format[i]+'>'+format[i]+'</option>').appendTo(control);
            }
        }
        else if (name == "columnAlign") {
        	jQuery('<option value="">Not Set</option>').appendTo(control);
            var format = AmCharts.Editor.MAPPING.comboboxData.align;
            for(var i = 0;i<format.length;i++){
    			jQuery('<option value="'+format[i]+'-column">'+format[i]+'</option>').appendTo(control);
            }
        }
        else if (name == "popupType") {
        	jQuery('<option value="">Not Set</option>').appendTo(control);
            var format = AmCharts.Editor.MAPPING.comboboxData.popupType;
            for(var i = 0;i<format.length;i++){
    			jQuery('<option value="'+format[i]+ '">'+format[i]+'</option>').appendTo(control);
            }
        }
        else if (name == "editRendererType") {
        	jQuery('<option value="">Not Set</option>').appendTo(control);
            var format = AmCharts.Editor.MAPPING.comboboxData.editRendererType;
            for(var i = 0;i<format.length;i++){
    			jQuery('<option value="'+format[i]+ '">'+format[i]+'</option>').appendTo(control);
            }
        }
        else if (name == "rendererType") {
        	jQuery('<option value="">Not Set</option>').appendTo(control);
            var format = AmCharts.Editor.MAPPING.comboboxData.rendererType;
            for(var i = 0;i<format.length;i++){
    			jQuery('<option value="'+format[i]+ '">'+format[i]+'</option>').appendTo(control);
            }
        }
        else if(name == "formattingString"){
        
            if(config.properties.numberFormatting.value){
                jQuery('<option value="">Not Set</option>').appendTo(control);
                var format = AmCharts.Editor.MAPPING.comboboxData.number;
                for(var i = 0;i<format.length;i++){
                	jQuery('<option>'+format[i]+'</option>').appendTo(control);	
                }
            }
            else if(config.properties.dateFormatting.value)
        	{
                jQuery('<option value="">Not Set</option>').appendTo(control);
                var format = AmCharts.Editor.MAPPING.comboboxData.date;
                for(var i = 0;i<format.length;i++){
                	jQuery('<option>'+format[i]+'</option>').appendTo(control);	
                }
        	}
        }
        wrapper.data('propertyConfig', propertyConfig);
        $(wrapper).find("select").val(value);
        controlHTML.append(wrapper);
    }
    else if (type == "checkbox") {
        var config = AmCharts.Editor.editorConfig[AmCharts.Editor.MAPPING.chartClassMap[AmCharts.Editor.chartType]];
        if (name == "showRowAllCheckBox") {
            if (config.properties.showRowCheckColumn.value)
                propertyHTML.removeClass('hidden');
            else
                propertyHTML.addClass('hidden');
        }
        else if (name == "pagingMode") {
            if (config.properties.usePaging.value)
                propertyHTML.removeClass('hidden');
            else
                propertyHTML.addClass('hidden');
        }

        control = jQuery('<i class="menu-item-check" id="chk-' + name + '"></i>').on('click', function () {
        	if((name == "dateFormatting" && config.properties.numberFormatting.value) || (name == "numberFormatting" && config.properties.dateFormatting.value))
        		return;
        	else if (name == "showBranchOnGrouping" && !config.properties.enableCellMerge.value)
                return;
            
            jQuery(this).parents('.menu-item').toggleClass('selected');
            propertyConfig.value = jQuery(this).parents('.menu-item').hasClass('selected');

            if (name == "columnHide") {
                for (var i = 0; i < auigridOptions.colModel.length; i++) {
                    if (auigridOptions.colModel[i].dataField == config.properties.column.value) {
                        auigridOptions.colModel[i].hide = propertyConfig.value;
                        break;
                    }
                }
            } else if (name == "excelHide") {
                for (var i = 0; i < auigridOptions.colModel.length; i++) {
                    if (auigridOptions.colModel[i].dataField == config.properties.column.value) {
                        auigridOptions.colModel[i].excelHide = !propertyConfig.value;
                        break;
                    }
                }
            } else if (name == "excelTempleteHide") {
                for (var i = 0; i < auigridOptions.colModel.length; i++) {
                    if (auigridOptions.colModel[i].dataField == config.properties.column.value) {
                        auigridOptions.colModel[i].excelTempleteHide = !propertyConfig.value;
                        break;
                    }
                }
            } else if (name == "require") {
                for (var i = 0; i < auigridOptions.colModel.length; i++) {
                    if (auigridOptions.colModel[i].dataField == config.properties.column.value) {
                        auigridOptions.colModel[i].require = propertyConfig.value;
                        break;
                    }
                }
            } else if (name == "columnUneditable") {
                for (var i = 0; i < auigridOptions.colModel.length; i++) {
                    if (auigridOptions.colModel[i].dataField == config.properties.column.value) {
                        auigridOptions.colModel[i].editable = !propertyConfig.value;
                        break;
                    }
                }
            } else if (name == "filterEanble") {
                for (var i = 0; i < auigridOptions.colModel.length; i++) {
                    if (auigridOptions.colModel[i].dataField == config.properties.column.value) {
                    	if(auigridOptions.colModel[i].filter == null) {
                    		auigridOptions.colModel[i].filter = {};
                    	}
                        auigridOptions.colModel[i].filter.eanble = propertyConfig.value;
                        break;
                    }
                }
            } else if (name == "filterShowIcon") {
                for (var i = 0; i < auigridOptions.colModel.length; i++) {
                    if (auigridOptions.colModel[i].dataField == config.properties.column.value) {
                    	if(auigridOptions.colModel[i].filter == null) {
                    		auigridOptions.colModel[i].filter = {};
                    	}
                        auigridOptions.colModel[i].filter.showIcon = propertyConfig.value;
                        break;
                    }
                }
            }
            else if (name == "numberFormatting") {
                if (propertyConfig.value) {
                    $("#cbo-formattingString").children().remove();
                    
                	jQuery('<option value="">Not Set</option>').appendTo($("#cbo-formattingString"));
                    var format = AmCharts.Editor.MAPPING.comboboxData.number;
                    for(var i = 0;i<format.length;i++){
                    	jQuery('<option>'+format[i]+'</option>').appendTo($("#cbo-formattingString"));	
                    }
                    for (var i = 0; i < auigridOptions.colModel.length; i++) {
                        if (auigridOptions.colModel[i].dataField == config.properties.column.value) {
                        	if(auigridOptions.colModel[i].formatString != undefined && auigridOptions.colModel[i].dataType == "numeric"){
                        		jQuery("#cbo-formattingString").val(auigridOptions.colModel[i].formatString);
                        		break;
                        	}
                        	else{
                        		jQuery("#cbo-formattingString").val("");
                    		}
                        }
                    }
					$("#cbo-formattingString").trigger("chosen:updated");
                    
                } else {
                	if(config.properties.column.value != ""){
                		for(var i = 0; i<auigridOptions.colModel.length;i++){
                			if(config.properties.column.value == auigridOptions.colModel[i].dataField){
                				auigridOptions.colModel[i].dataType ="";
                				auigridOptions.colModel[i].formatString = "";
                				break;
                			}
                		}
                	}
                    $("#cbo-formattingString").children().remove();
        			$("#cbo-formattingString").trigger("chosen:updated");
                }
            }
            else if (name == "dateFormatting") {
                if (propertyConfig.value) {
                    $("#cbo-formattingString").children().remove();
                    
                	jQuery('<option value="">Not Set</option>').appendTo($("#cbo-formattingString"));
                    var format = AmCharts.Editor.MAPPING.comboboxData.date;
                    for(var i = 0;i<format.length;i++){
                    	jQuery('<option>'+format[i]+'</option>').appendTo($("#cbo-formattingString"));	
                    }
					jQuery("#cbo-formattingString").val("");
					$("#cbo-formattingString").trigger("chosen:updated");
                    
                } else {
                  	if(config.properties.column.value != ""){
                		for(var i = 0; i<auigridOptions.colModel.length;i++){
                			if(config.properties.column.value == auigridOptions.colModel[i].dataField){
                				auigridOptions.colModel[i].dataType ="";
                				auigridOptions.colModel[i].formatString = "";
                				break;
                			}
                		}
                	}
                	$("#cbo-formattingString").children().remove();
        			$("#cbo-formattingString").trigger("chosen:updated");
                }
            }
            else {
                if (name == "usePaging") {
                    if (propertyConfig.value) {
                        $(".menu-item-textbox_num.menu-item-" + propertyConfig.class).removeClass("hidden");
                        $(".menu-item-checkbox_sub.menu-item-" + propertyConfig.class).removeClass("hidden");
                    } else {
                        $(".menu-item-textbox_num.menu-item-" + propertyConfig.class).addClass("hidden");
                        $(".menu-item-checkbox_sub.menu-item-" + propertyConfig.class).addClass("hidden");
                    }
                }
                else if (name == "showRowCheckColumn") {
                    if (propertyConfig.value) {
                        $(".menu-item-checkbox_sub.menu-item-" + propertyConfig.class).removeClass("hidden");
                    } else {
                        $(".menu-item-checkbox_sub.menu-item-" + propertyConfig.class).addClass("hidden");
                    }
                }
                else if (name == "addColumn"){
                	   if (propertyConfig.value) {
                           $(".menu-item-textbox.menu-item-" + propertyConfig.class).removeClass("hidden");
                           $(".menu-item-button.menu-item-" + propertyConfig.class).removeClass("hidden");
                           $(".menu-item-combobox.menu-item-" + propertyConfig.class).removeClass("hidden");
                       } else {
                           $(".menu-item-textbox.menu-item-" + propertyConfig.class).addClass("hidden");
                           $(".menu-item-button.menu-item-" + propertyConfig.class).addClass("hidden");
                           $(".menu-item-combobox.menu-item-" + propertyConfig.class).addClass("hidden");
                       }
                }
                else if (name == "groupingFields") {
                    if (propertyConfig.value) {
                        groupingFields.push(config.properties.column.value);
                    }
                    else {
                        groupingFields.splice(groupingFields.indexOf(config.properties.column.value), 1);
                    }
                }
                else if (name == "enableCellMerge" && !propertyConfig.value) {
                    auigridOptions.gridProps["showBranchOnGrouping"] = false;
                    $("#chk-showBranchOnGrouping").closest('li').removeClass('selected');
                }
//                else if (name == "editable" && propertyConfig.value) {
//                	for(var i = 0; i<auigridOptions.colModel.length; i++){
//        				auigridOptions.colModel[i].editable = false;
//            		}
//                }
                else if (name == "popupSetting" && propertyConfig.value) {
	            	for(var i = 0; i<auigridOptions.colModel.length; i++){
//	    				auigridOptions.colModel[i].popupType = "input";
	        		}
	            }
                if(propertyConfig.gridProps)
                	auigridOptions.gridProps[name] = propertyConfig.value;
                else if(propertyConfig.gridevent)
                	auigridOptions.gridEvent[name] = propertyConfig.value;
                else if(name == "groupingSummary"){
            		for(var index in groupingSummary.dataFields){
            			if(groupingSummary.dataFields[index] == config.properties.column.value)
            				groupingSummary.dataFields.splice(index,1);
            		}
            		if(propertyConfig.value)
            			groupingSummary.dataFields.push(config.properties.column.value);
                }
                else
                	auigridOptions[name] = propertyConfig.value;
            }

            auigridDraw();
        });

        jQuery(propertyHTML)[value ? 'addClass' : 'removeClass']('selected');
        controlHTML.append(control);

    }
    else if (type == "checkbox_sub") {
        var config = AmCharts.Editor.editorConfig[AmCharts.Editor.MAPPING.chartClassMap[AmCharts.Editor.chartType]];
        if (name == "showRowAllCheckBox") {
            if (config.properties.showRowCheckColumn.value)
                propertyHTML.removeClass('hidden');
            else
                propertyHTML.addClass('hidden');
        }
        else if (name == "pagingMode") {
            if (config.properties.usePaging.value)
                propertyHTML.removeClass('hidden');
            else
                propertyHTML.addClass('hidden');
        }
        control = jQuery('<i class="menu-item-check" id="chk-' + name + '"></i>').on('click', function () {
            jQuery(this).parents('.menu-item').toggleClass('selected');
            propertyConfig.value = jQuery(this).parents('.menu-item').hasClass('selected');

            if(propertyConfig.gridProps)
            	auigridOptions.gridProps[name] = propertyConfig.value;
            else
            	auigridOptions[name] = propertyConfig.value;

            auigridDraw();
        });
        jQuery(propertyHTML)[value ? 'addClass' : 'removeClass']('selected');
        controlHTML.append(control);

    }
    else if (type == "checkbox_fnc") {
        control = jQuery('<i class="menu-item-check"></i>').on('click', function () {
            jQuery(this).parents('.menu-item').toggleClass('selected');
            propertyConfig.value = jQuery(this).parents('.menu-item').hasClass('selected');
            var config = AmCharts.Editor.editorConfig[AmCharts.Editor.MAPPING.chartClassMap[AmCharts.Editor.chartType]];
            
            if (propertyConfig.value) {
            	$("#txt_code").val(config.properties[propertyConfig.class+"Code"].value);
          		$("#txt_code").prop("disabled",false);
          		$("#txt_code").prop("name", propertyConfig.class + "Code");
            } 
            else {
            	$("#txt_code").val("");
            	$("#txt_code").prop("disabled",true);
            	$("#txt_code").prop("name", "");
            }

            auigridOptions.gridEvent[name] = propertyConfig.value;
            auigridDraw();
        });
        jQuery(propertyHTML)[value ? 'addClass' : 'removeClass']('selected');
        controlHTML.append(control);
    }
    else if (type == "textbox_num") {
        var config = AmCharts.Editor.editorConfig[AmCharts.Editor.MAPPING.chartClassMap[AmCharts.Editor.chartType]];
    	if (name == "pageRowCount") {
            if (config.properties.usePaging.value)
                propertyHTML.removeClass('hidden');
            else
                propertyHTML.addClass('hidden');
        }
        wrapper = jQuery('<div class="ui-control ui-control-text"></div>');
        control = jQuery('<input type="text" id="txt-' + name + '" value="' + value + '"onkeypress="return isNumberKey(event)">').on('input', function (event) {
        }).on('blur', function () {
            if (name == "columnWidth") {
                for (var i = 0; i < auigridOptions.colModel.length; i++) {
                    if (auigridOptions.colModel[i].dataField == config.properties.column.value) {
                        auigridOptions.colModel[i].width = Number(jQuery(this).val());
                        propertyConfig.value = jQuery(this).val();
                        break;
                    }
                }
            }
            else {
            	if (name == "columnFixed") {
                    if (jQuery(this).val() > auigridOptions.colModel.length) {
                        alert("The maximum number of currently fixed columns is set to " + auigridOptions.colModel.length + ". \r \nPlease try again " + auigridOptions.colModel.length + " or less.");
                        jQuery(this).val("");
                        return;
                    }
                    auigridOptions.columnFixed = jQuery(this).val();
                	propertyConfig.value = jQuery(this).val();
                }
            	else if (name == "columnSequence"){
            		if(config.properties.column.value === undefined || config.properties.column.value === "")
            			return;
            		var colmodelLength = auigridOptions.colModel.length-1;
        			if (jQuery(this).val() > colmodelLength) {
						alert("The maximum number of column sequence that can be changed is  " + colmodelLength + ". \r \nPlease try " + colmodelLength + " or less again.");
				
						jQuery(this).val("");
						return;
					}
            		var change_seq = jQuery(this).val();
            		var origin_seq;
            		for (var i = 0; i < auigridOptions.colModel.length; i++) {
                        if (auigridOptions.colModel[i].dataField == config.properties.column.value) {
                        	origin_seq = i;
                        	  
                        	if(change_seq==origin_seq)
                        		return;
                        	  
                        	break;
                        }
            		}
        			var temp = auigridOptions.colModel.splice(origin_seq,1);
        			auigridOptions.colModel.splice(change_seq,0,temp[0]);
      
					cboColumnReset();
					jQuery("#cbo-column").val(auigridOptions.colModel[change_seq].dataField);
	    	        AmCharts.Editor.processData(AmCharts.Editor.dataProvider);
	    	        jQuery(AmCharts.Editor.SELECTORS.table).handsontable('render');
					$("#cbo-column").trigger("chosen:updated");
            	}
            	else if(name == "headerHeight"){
            		auigridOptions.gridProps[name] = Number(jQuery(this).val());
            	}
            	else{
            		propertyConfig.value = jQuery(this).val();
            	}
            }

            auigridDraw();
        }).appendTo(wrapper);

        controlHTML.append(wrapper);
    }
    else if (type == "textbox") {
        var config = AmCharts.Editor.editorConfig[AmCharts.Editor.MAPPING.chartClassMap[AmCharts.Editor.chartType]];

        if (name == "addColumnId") {
            if (config.properties.addColumn.value)
                propertyHTML.removeClass('hidden');
            else
                propertyHTML.addClass('hidden');
        }
        
        wrapper = jQuery('<div class="ui-control ui-control-text"></div>');
        control = jQuery('<input type="text" id="txt-' + name + '"' + " value='" + value + "'>").on('input', function (event) {
        }).on('blur', function () {
            if (name == "columnName") {
                for (var i = 0; i < auigridOptions.colModel.length; i++) {
                    if (auigridOptions.colModel[i].dataField == config.properties.column.value) {
                        auigridOptions.colModel[i].headerText = jQuery(this).val();
                    }
                }
            } 
            else if (name == "columnTempleteData") {
                for (var i = 0; i < auigridOptions.colModel.length; i++) {
                    if (auigridOptions.colModel[i].dataField == config.properties.column.value) {
                        auigridOptions.colModel[i].columnTempleteData = jQuery(this).val();
                    }
                }
            }
            else if(name == "addColumnId"){
            	propertyConfig.value = jQuery(this).val();
            }
            else if(name == "gridName"){
            	auigridOptions.gridName = jQuery(this).val();
            }
            else if(name == "description"){
            	auigridOptions.description = jQuery(this).val();
            }
            else if(name == "templeteData"){
            	auigridOptions.templeteData = jQuery(this).val();
            }
            else if (name == "footerString") {
                var removeIndex = auigridOptions.footerData.map(function (item) { return item.positionField; }).indexOf(config.properties.column.value);
                if (removeIndex != -1) {
                    auigridOptions.footerData.splice(removeIndex, 1);
                }
                if($("#txt-footerString").val() != ""){
                	  auigridOptions.footerData.push({
                          positionField: config.properties.column.value,
                          labelText : jQuery(this).val()
                      });
                }
            }
            auigridDraw();
        }).appendTo(wrapper);

        controlHTML.append(wrapper);
    }
    else if (type == "button") {
        var config = AmCharts.Editor.editorConfig[AmCharts.Editor.MAPPING.chartClassMap[AmCharts.Editor.chartType]];
        if (name == "columnCreate") {
            if (config.properties.addColumn.value)
                propertyHTML.removeClass('hidden');
            else
                propertyHTML.addClass('hidden');
        }
        else if (name == "connect") {
        	if ((typeof windowParam.datasetId == "undefined" || windowParam.datasetId == "" ) || typeof windowParam.editMode !== "undefined" )
                propertyHTML.removeClass('hidden');
            else
                propertyHTML.addClass('hidden');
        }
        var tag = '';
        if(name == "headerGrouping")
        	tag = '<button type="button" class="editorButton" id="btn-' + name + '" data-toggle="modal" data-target="#headerGrouping">'+propertyConfig.text+'</button>'
    	else
    		tag = '<button type="button" class="editorButton" id="btn-' + name + '">'+propertyConfig.text+'</button>'
        control = jQuery(tag).on('click', function (event) {
        	if(name == "columnCreate"){
        		if(config.properties.addColumn.value && config.properties.addColumnId.value != "" && config.properties.columnType.value != ""){
        			var columndata = {headerText: config.properties.addColumnId.value, dataField: config.properties.addColumnId.value};
        			
        			auigridOptions.colModel[auigridOptions.colModel.length] = columndata;
        
        			cboColumnReset();
        			$("#cbo-column").trigger("chosen:updated");
        			
        			if(config.properties.columnType.value == "SUM" || config.properties.columnType.value == "AVG"){
        				
        				for (var i = 0; i< AmCharts.Editor.dataProvider.length ; i++){
        					var sum = 0;
            				var rowdata = AUIGrid.getItemByRowIndex("#auigrid-list",i);
    						for(var j = 0; j< auigridOptions.colModel.length-1;j++){
								var number = Number(rowdata[auigridOptions.colModel[j].dataField]);
								if(!isNaN(number))
									sum += number;
    						}
    						
    						if(config.properties.columnType.value == "SUM" )
    							AmCharts.Editor.dataProvider[i][config.properties.addColumnId.value] = sum;
    						else if(config.properties.columnType.value == "AVG" )
    							AmCharts.Editor.dataProvider[i][config.properties.addColumnId.value] = sum/(auigridOptions.colModel.length-1);
            			}
        			}
        			else if(config.properties.columnType.value == "MAX" || config.properties.columnType.value == "MIN"){
        				for (var i = 0; i< AmCharts.Editor.dataProvider.length ; i++){
        					var data = undefined;
            				var rowdata = AUIGrid.getItemByRowIndex("#auigrid-list",i);
    						for(var j = 0; j< auigridOptions.colModel.length-1;j++){
    							var number = Number(rowdata[auigridOptions.colModel[j].dataField]);
    							if(!isNaN(number)){
    								if(data == undefined)
    									data =  number;
    								if(config.properties.columnType.value == "MAX"){
    									if(data < number)
    										data = number;
    								}
    								else{
    									if(data > number)
    										data = number;
    								}
								}
    							AmCharts.Editor.dataProvider[i][config.properties.addColumnId.value] = data;
    						}
            			}
        			}
        			AmCharts.Editor.processData(AmCharts.Editor.dataProvider);
        	        jQuery(AmCharts.Editor.SELECTORS.table).handsontable('render');
        			$("#cbo-column").trigger("chosen:updated");
        		}
           		else{
    				alert("Enter column ID, type");
        		}
    		} 
        	else if(name == "connect"){
        		if(config.properties.datasetId.value != ""){
        			dataRefresh = true;
        			$.ajax({
        				url: "/micaweb/mica/projects/"+windowParam.projectId+"/datasets/"+config.properties.datasetId.value+"/datas",
        				method: "get",
        				contentType: "application/json; charset=UTF-8",
        				success: function(data){
        					var tempGridProps =[];
        					var tempColModel = [];
        					if(auigridOptions != null){
        						tempGridProps = auigridOptions.gridProps;
        						tempColModel  = auigridOptions.colModel;
        					}
        					else{
        						auigridOptions = {};
        					}
        	    			// ajax 호출
        					var targetData = JSON.parse(data);
        					if(targetData.length < 1) { return; } // 데이터 없으면 리턴
        	    			auigridOptions.data = Array.isArray(targetData) ? targetData : [targetData];
        	    			auigridOptions.gridProps = tempGridProps;
        	    			auigridOptions.colModel = [];
        	    			
        	    			var mergeColModel = [];
        	    			var colindex = 0;
        	    			
        	    			for(var coldata in auigridOptions.data[0]){
        	    				mergeColModel[colindex] = {"headerText" : coldata,"dataField" : coldata, "width": 80}
        	    				colindex++;
            				}
        	    			var  mergeColModel2 = $.extend(true, [] , mergeColModel);
        	    			//tempColModel = 사용자 정의 colModel(+)
        	    			//mergeColModel = 조회 결과 colModel(-)
        	    			
        	    			if(typeof tempColModel != "undefined" && tempColModel.length > 0){
	        	    			tempColModel.forEach(function (item,idx){
	        	    				var removeIndex = -1;
	        	    				mergeColModel2.forEach(function (obj,index){
	        	    					if(item.dataField === obj.dataField)
	        	    						removeIndex = idx;
	        	    				})
	        	    				if (removeIndex == -1) {
	        	    					tempColModel.splice(idx, 1);
	        	    				}
	        	    			});
	        	    			tempColModel.forEach(function(obj, index){
	        	    				var target;
	        	    				mergeColModel.forEach(function(item, idx) {
		    	    				     if(obj.dataField === item.dataField){
		    	    				    	 target = idx;
		    	    				     }
		    	    				});
	        	    				if(typeof target != "undefined")
	        	    					mergeColModel.splice(target, 1);
	        	    			});
	        	    			
	        	    			auigridOptions.colModel = tempColModel.concat(mergeColModel);
        	    			} else {
        	    				auigridOptions.colModel = mergeColModel; 
        	    			}
        	    			
        	    			if(auigridOptions.footerData === undefined)
        	    				auigridOptions["footerData"] = [];
        	    			
        	      			if(auigridOptions.gridEvent === undefined)
        	    				auigridOptions["gridEvent"] = {};
        	    			
        	      			
        					AmCharts.Editor.dataFields = [];
        					for (var i = 0; i < auigridOptions.colModel.length; i++) {
        					    AmCharts.Editor.dataFields[i] = auigridOptions.colModel[i].dataField;
        					}
        					auigridOptions.datasetId = config.properties.datasetId.value;
        	    	        AmCharts.Editor.dataProvider = auigridOptions.data;
        	    	        AmCharts.Editor.processData(AmCharts.Editor.dataProvider);
        	    	        jQuery(AmCharts.Editor.SELECTORS.table).handsontable('render');
        	    	        auigridDraw();
        				}
        			});
        		}
        		else{
        			alert("Enter Data Set URL");
        		}
    		}
        	else if(name == "columnDelete"){
        		if(config.properties.column.value != "" && config.properties.column.value !== undefined){
        			var columndata = config.properties.column.value;
        			for(var i = 0 ; i<auigridOptions.colModel.length; i++){
        				if(columndata == auigridOptions.colModel[i].dataField){
        					auigridOptions.colModel.splice(i,1);
        					AmCharts.Editor.dataFields.splice(i,1);
                			
                 			for(var j = 0; j<auigridOptions.data.length; j++){
                				delete auigridOptions.data[j][columndata];
            				}
                 		     var removeIndex = auigridOptions.footerData.map(function (item) { return item.dataField; }).indexOf(columndata);
                             if (removeIndex != -1) {
                                 auigridOptions.footerData.splice(removeIndex, 1);
                             }
                         	cboColumnReset();
                			$("#cbo-column").trigger("chosen:updated");
                			
            				columninfoClear();
        	    	        AmCharts.Editor.processData(AmCharts.Editor.dataProvider);
        	    	        jQuery(AmCharts.Editor.SELECTORS.table).handsontable('render');
                			break;
        				}
        			}
        		}
        		else{
        			alert("Specifies column");
        		}
    		}
        	else if(name == "headerGrouping"){
        		$(".navbar-headerGrouping").children().remove();
        		$("#txt_headerId").val("");
        		$("#txt_headerName").val("");
        		for(var item in auigridOptions.colModel){
        			var propertyHTML = jQuery('<li class="menu-item menu-item-combobox clearfix"></li>');
        			var itemHTML = jQuery('<div class="columnname" style="line-height: 28px;float: left;width: 70%;"></div>');
        			itemHTML.append('<input type="checkbox" id ="'+auigridOptions.colModel[item].dataField +'" style="margin-left:5px;"/>');
        			itemHTML.append('<label style="margin-left: 5px;font-size:14px"for="'+auigridOptions.colModel[item].dataField+'">'+auigridOptions.colModel[item].dataField+'</label>')
        			propertyHTML.append(itemHTML);
        			if(typeof auigridOptions.colModel[item].children != "undefined"){
        				var buttonHTML = jQuery('<div class ="menu-item-control" style="line-height: 28px;margin: 0 0 0 70%;"></div>')
        				buttonHTML.append('<button class="btn btnungrouping" id ="btn_unGrouping">Ungrouping</button>');
        				propertyHTML.append(buttonHTML);
        			}
        			propertyHTML.appendTo($(".navbar-headerGrouping"));
        		}
        		$('#headerGrouping').on('hidden.bs.modal', function (e) {
        			e.preventDefault();
        			cboColumnReset();
        			$("#cbo-column").val("");
        			$("#cbo-column").trigger("chosen:updated");
        			columninfoClear();
                   
        			
        			$("#txt_headerId").val("");
        			$("#txt_headerName").val("");
        			
        			$(this).off('hidden.bs.modal');
    				
    				
	    	        AmCharts.Editor.processData(AmCharts.Editor.dataProvider);
	    	        jQuery(AmCharts.Editor.SELECTORS.table).handsontable('render');
	    	        
    				auigridDraw();
        		})
        		$(document).on('click', '.btnungrouping', function (e) {
        			e.preventDefault();
        			var idx = auigridOptions.colModel.map(function (item) { return item.dataField; }).indexOf($(this).parent().siblings('.columnname').children('label').text());
        			
        			if(idx != -1){
        				for(var item in auigridOptions.colModel[idx].children){
        					auigridOptions.colModel[auigridOptions.colModel.length] = auigridOptions.colModel[idx].children[item];
        				}
        				auigridOptions.colModel.splice(idx,1);
        				
        				$("#headerGrouping").modal('hide');
        				$(this).off('click');
        			}
        		});
        		$(document).on('click', '#btn_groupingOK', function (e) {
        			e.preventDefault();
        			if($("#txt_headerName").val() != "" && $("#txt_headerId").val() != ""){
        				var groupingList = [];
        				for(var item in auigridOptions.colModel){
        					if($($("ul.navbar-headerGrouping > li > div > input")[item]).prop('checked')){
        						groupingList.push($($("ul.navbar-headerGrouping > li > div > input")[item]).siblings('label').text());
        					}
        				}
        				if(groupingList.length >0){
        					var listIndex = [];
        					for(var item in groupingList){
        						if(auigridOptions.colModel.map(function (item) { return item.dataField; }).indexOf(groupingList[item]) != -1);
        							listIndex.push(auigridOptions.colModel.map(function (item) { return item.dataField; }).indexOf(groupingList[item]));
							}
        					if(listIndex.length > 0){
        						var tempString = '';
        						
        						for(var item in listIndex){
        							if(tempString != '')
        								tempString += ",";
        							tempString += JSON.stringify(auigridOptions.colModel[listIndex[item] - item]); 
    								auigridOptions.colModel.splice(listIndex[item] - item, 1); 
        						}
        						auigridOptions.colModel[auigridOptions.colModel.length] = {"dataField" : $("#txt_headerId").val(),
        																				   "headerText" : $("#txt_headerName").val(),
        																				   "children":  JSON.parse("[" +tempString+"]")  };
        						$("#headerGrouping").modal('hide');
        						$(this).off('click');
        					}
        				}
        			}
        			else{
        				alert("Please enter header ID and Name.")
        			}
        		});
        		$(document).on('click', '#btn_groupingCancel', function () {
        			e.preventDefault();
        			$("#headerGrouping").modal('hide')
        		});
        	}
        	auigridDraw();
        });
        controlHTML.append(control);
    }
     
    if (control) {
        jQuery(control).data('propertyConfig', propertyConfig).on('focus blur', function (e) {
            jQuery(this).parents('.ui-control')[e.type == 'focus' ? 'addClass' : 'removeClass']('ui-control-active');
        });
    }
    propertyConfig.control = control;
    container.append(propertyHTML);
}

AmCharts.Editor.variableizeName = function (name) {
    return name.replace(/\W/g, '').toLowerCase();
}
AmCharts.Editor.normalizeName = function (name) {
    return name.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase();
}

AmCharts.Editor.dynamicSortMultiple = function () {
    var props = arguments;
    return function (obj1, obj2) {
        var i = 0,
            result = 0,
            numberOfProperties = props.length;
        while (result === 0 && i < numberOfProperties) {
            result = AmCharts.Editor.dynamicSort(props[i])(obj1, obj2);
            i++;
        }
        return result;
    }
}

AmCharts.Editor.dynamicSort = function (property) {
    var sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a, b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

AmCharts.Editor.getFields = function (data) {
    if (data) {
        var oldFields = AmCharts.Editor.dataFields;
        if (!oldFields) {
            oldFields = [];
        }
        var newDataFields = [];
        var tempFields = [];

        for (var d = 0; d < data.length; d++) {
            var dataItem = data[d];
            for (var field in dataItem) {
                if (oldFields.indexOf(field) !== -1) {
                    tempFields[oldFields.indexOf(field)] = field;
                }
                else {
                    if (newDataFields.indexOf(field) == -1) {
                        newDataFields.push(field);
                    }
                }
            }
        }
        if (tempFields.length > 0) {
            for (var i = tempFields.length - 1; i >= 0 ; i--) {
                newDataFields.unshift(tempFields[i]);
            }
        }
        AmCharts.Editor.dataFields = newDataFields;
    }
}

AmCharts.Editor.changedData = function (data, skipConfig) {
    if (data) {
        AmCharts.Editor.getFields(data);
        AmCharts.Editor.dataProvider = data;
        
        if(auigridOptions.gridProps == undefined)
        	return ;
        else {
        	auigridCreateFlag = false;
        	dataRefresh = true;
        	auigridDraw();
        }
    }
}
