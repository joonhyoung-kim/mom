
/*/!* amCharts - Live Editor
* CORE; GUI SECTION EDITOR
* Copyright (c) 2014 amCharts
* Licensed MIT
* http://amcharts.com/
* v1.0.1-beta.1
*/

// OBSERVE SECTION CHANGE
jQuery(window).on('changed.am.section', function (e, section) {
    // CHECK

    if (AmCharts.Editor.current.section != 'editor') {
        return;
    }

    // LOAD 
    if (!jQuery(section).data('loaded')) {
        AmCharts.Editor.log('info', 'load section editor');
        jQuery(section).load(AmCharts.Editor.CONSTANT.URL_BASE + 'static/tpl/section-editor2.tpl', function () {
            jQuery(section).data('loaded', true);
            AmCharts.Editor.updateSection('editor');
        });

        // PROCESS; JUST ONCE
    } else if (jQuery.inArray('editor', AmCharts.Editor.current.rendered) == -1) {
        AmCharts.Editor.log('info', 'process section editor');
        var datanum = 0;
        /*
		** BUILD LAYOUT
		*/
        var layoutOption = 
		{
            center__paneSelector: ".app-editor-2",
            west__paneSelector: ".app-editor-1",
            west__size: 60,
            spacing_open: 0,
            spacing_closed: 0,
            center__childOptions: {
                center__paneSelector: ".app-editor-2-2",
                center__minSize: 300,
                west__paneSelector: ".app-editor-2-1",
                west__size: 250,
                west__minSize: 250,
                spacing_open: 12,
                spacing_closed: 12,
                livePaneResizing: true,
                onresize_end: function () {
                    jQuery(AmCharts.Editor.SELECTORS.table).handsontable('render');
//                    AmCharts.Editor.chart.invalidateSize();
                	AUIGrid.resize("#auigrid-list",$(".app-editor-2-2-1").width(),$(".app-editor-2-2-1").height()) 
                },
                
            }
        }
        // sjjo user 일때 숨기기
        if(windowParam.mode == "user") {
	        $(".app-editor-2-2-1").height("100%");
	        $(".app-editor-2-2-2").hide();
	        $(window).resize();
        } else {
        	layoutOption.center__childOptions.center__childOptions = {
        		center__paneSelector: ".app-editor-2-2-1",
        		south__paneSelector: ".app-editor-2-2-2",
        		south__size: "47%",
        		south__minSize: 39,
        		spacing_open: 12,
        		spacing_closed: 12,
        		livePaneResizing: true,
        		onresize_end: function () {
        			jQuery(AmCharts.Editor.SELECTORS.table).handsontable('render');
//                    AmCharts.Editor.chart.invalidateSize();
        			AUIGrid.resize("#auigrid-list",$(".app-editor-2-2-1").width(),$(".app-editor-2-2-1").height()) 
        		}
        	}
        }
        jQuery('.app-editor').layout(layoutOption);
        
        /*
		** TABLE; INIT
		*/
        jQuery(AmCharts.Editor.SELECTORS.table).handsontable({
            data: [],
            startRows: 5,
            readOnly : true,
            startCols: 3,
            minSpareRows: 0,
            stretchH: 'all',
            colWidths: 100,
            removeRowPlugin: false,
            colHeaders: function (col) {
                var output = "";
                var button = null;
                var fieldname = AmCharts.Editor.dataFields[col];

                // ADD TITLE
                output += '<input class="am-data-input-col" type="text" value="' + AmCharts.Editor.dataFields[col] + '" style="padding-left: 10px;" disabled>';
                return output;
            },
            afterChange: function () {
                AmCharts.Editor.changedData(AmCharts.Editor.dataProvider);
            },
            afterRemoveRow: function () {
                AmCharts.Editor.changedData(AmCharts.Editor.dataProvider);
            },
            afterRender: function () {
                this.rootElement.find('.am-data-input-col').each(function (col) {
                    jQuery(this).on('keyup', function () {
                        var fieldname = AmCharts.Editor.dataFields[col];
                        var graph = AmCharts.Editor.getGraphByField(fieldname);
                        AmCharts.Editor.changeColTitle(graph, fieldname, this.value);
                    }).on('focus', function () {
                        jQuery(this).tooltip('hide').parent().parent().addClass('active');
                    }).on('blur', function () {
                        jQuery(this).parent().parent().removeClass('active');
                    }).tooltip({
                        //title: AmCharts.Editor.getMSG('tooltip_rename_col'),
                        placement: 'bottom',
                        container: 'body'
                    });
                });
                this.rootElement.find('.am-data-assign-col').each(function (col) {
                    jQuery(this).on('click', function () {
                        var fieldname = jQuery(this).data('name');
                        var graph = AmCharts.Editor.getGraphByField(fieldname);

                        if (jQuery(this).hasClass('selected')) {
                            AmCharts.Editor.openGraph(graph);
                        } else {
                            jQuery(AmCharts.Editor.SELECTORS.modal).data('tmp', {
                                fieldname: fieldname
                            });
                            AmCharts.Editor.modal({
                                remote: AmCharts.Editor.CONSTANT.URL_BASE + 'static/tpl/modal-data-assign-col.tpl?' + AmCharts.Editor.CONSTANT.RND_KEY
                            });
                        }
                    }).tooltip({
                        title: AmCharts.Editor.getMSG(jQuery(this).hasClass('selected') ? 'tooltip_edit_col' : 'tooltip_assign_col'),
                        container: 'body'
                    });
                });
                this.rootElement.find('.am-data-remove-col').each(function (col) {
                    jQuery(this).on('click', function () {
                        // REMOVE BODY
                        for (var i = 0; i < AmCharts.Editor.dataProvider.length; i++) {
                            delete AmCharts.Editor.dataProvider[i][AmCharts.Editor.dataFields[col]];
                        }
                        // REMOVE HEADER
                        AmCharts.Editor.dataFields.splice(col, 1);
                        AmCharts.Editor.processData(AmCharts.Editor.dataProvider);
                    }).tooltip({
                        title: AmCharts.Editor.getMSG('tooltip_remove_col'),
                        container: 'body'
                    });
                });
            }
        });
        $("#editPop").hide();
        var container = document.getElementById("jsonEditor");
        var options = {modes : ["tree", "code"]};
        var editor = new JSONEditor(container, options);
        
        var temp = null;
        jQuery("#btnEdit").off().on("click", function(e){
        	e.preventDefault();
        	$("#editPop").show();

            // set json
            
            var json = JSON.parse(JSON.stringify(auigridOptions));
            temp = JSON.parse(JSON.stringify(auigridOptions));
            delete json.data;
            editor.set(json);

            // get json
//            var json = editor.get();
        });
        jQuery("#btnEditSave").off().on("click", function(e){
        	// 저장했을때 예외처리 해야함. 오류
        	e.preventDefault();
        	var json = {};
        	try {
        		json = editor.get();
        	} catch(e) {
        		console.log(e);
        		alert("JSON 형태 오류");
        	}
        	
        	try {
        		json.data = temp.data;
        		auigridDraw(json);
        		$(".menu-item a:eq(0)").trigger("click");
        	} catch(e) {
        		console.log(e);
        		alert("수정된 JSON이 그리드 포맷에 맞지 않습니다.");

//        		auigridOptions = temp;
        		auigridDraw(temp);
        		return;
        	}
        	
        	$("#editPop").hide();
        });
        jQuery("#btnEditCancel").off().on("click", function(e){
        	e.preventDefault();
    		foraml = temp;
    		auigridDraw();
        	$("#editPop").hide();
        });
        
        
        //Apply버튼 클릭시 DB저장
        jQuery("#btnSave").off().on('click', function (e) {
//        	if(formal.datasetId === undefined){
//        		alert("Dataset ID is null"); 
//        		return;
//        	}
//        	debugger;
        		
//        	if(windowParam.projectId === undefined && windowParam.mode != "user"){
//        		alert("project ID is null");
//    			return;
//        	}
        	
            e.preventDefault();
            var datasetId = windowParam.datasetId;
            
//            delete formal.datasetId;
            
            opener.options2 = $.extend(true, {}, formal);
            opener.widgetId = windowParam.widgetId;
            formal.data = formal.data.slice(0,10);
            var setting = JSON.parse(JSON.stringify(formal));
            delete setting.datasetId;
            delete setting.description;
            
//            obj.dataset = {};
//			obj.dataset.id = dataSetId;
            var params = {
            	"setting" :setting,
				dataset : {id : datasetId},
//            	"datasetId": datasetId,
            	"name": opener.options2.gridName,
            	"widgetType" : "auigrid",
//            	"projectId" : windowParam.projectId,
            	"description" : opener.options2.description,
            	divisionCd : sessionStorage.divisionCd,
            	companyCd : sessionStorage.companyCd
            };
            
            if(windowParam.widgetId != "") {
            	params.widgetId = windowParam.widgetId;
            }
            
            
        	var url = "/TU_Platform/mica/widgets/";
        	var method = "put";
			url += windowParam.widgetId;
//			return;
    		$.ajax({
    			url: url,
    			method: method,
    			data : JSON.stringify(params),
    			contentType: 'application/json; charset=UTF-8',
    			success: function(rtn) {
					if(rtn){
						alert("위젯 저장 성공");
					} else {
						alert("실패" + rtn);
					}
    			},
    			error: function(e){
    				alert("실패" + e);
    			}
    		});
//            delete formal.description;
            
//            var url = "/micaweb/mica/projects/" + windowParam.projectId + "/widgets/" + (windowParam.widgetId == "" ? "" : windowParam.widgetId);
//           
//            if(windowParam.mode == "user") {
//				transferUpdate(params);
//			} else {
//	        	$.ajax({
//	        		url: url,
//	        		method: windowParam.widgetId == "" ? "POST" : "PUT",
//	        		dataType : "JSON", 
//	        		contentType: "application/json; charset=UTF-8",
//	        		data: JSON.stringify(params), 
//	        		success: function(result){
//	        			if(typeof opener.getList == "function")
//	        				opener.getList();
//	//        			alert('성공');
//	        			
//	        		}
//	        	});
//			}
        });
        

        //Apply버튼 클릭시 DB저장
        jQuery("#btnClose").off().on('click', function (e) {
        	if(typeof opener.refreshPage == "function")
				opener.refreshPage();
			window.close();
        });
        
        // ADD TO QUEUE
        AmCharts.Editor.current.rendered.push('editor');
    }
});

function transferUpdate(item) {
	var url = "/TU_Platform/mica/widgets/";
//	if(!confirm("TU_Platform에 업데이트 하시겠습니까?")) {
//		return;
//	}
	var data = item;
	debugger;
	$.getJSON("/TU_Platform/mica/datasets?name=" + data.datasetId, function(datas) {
		debugger;
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
			divisionCd : sessionStorage.divisionCd || "TUKR",
			companyCd : sessionStorage.companyCd|| "THIRAUTECH"
		}
		obj.divisionCd = param.divisionCd;
		obj.companyCd = param.companyCd;
		$.get("/TU_Platform/mica/widgets/" + obj.id, param, function(result) {
			if(result != "") {
				url += obj.id;
				method = "put";
			}
			$.ajax({
				url: url,
				method: method,
				data : JSON.stringify(obj),
				contentType: 'application/json; charset=UTF-8',
				success: function(rtn) {
					if(rtn){
						alert(method + "성공");
					} else {
						alert("실패" + rtn);
					}
				},
				error: function(e){
					alert("실패" + e);
				}
			});
		});
	});
}