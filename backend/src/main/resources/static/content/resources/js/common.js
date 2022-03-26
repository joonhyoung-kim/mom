var language = undefined;
var locale = sessionStorage.getItem('locale');
var targetTab = undefined;
var totalTabWidth = 0; 
var homeFlag = undefined;
var tabChange = undefined;
var isClickMenu = undefined;

var mCommon = {
	projectId: undefined,
	pageId: undefined,
	charts:[],
	datasets:{},
	
	//language: undefined,
	/** 그리드 초기화 **/
	
	init: function(target, widgetId, options, callBack, _language) {
		language = _language;
		
		var that = this;
		
		this.projectId = $("html").attr("project-id");
		this.pageId = $("html").attr("page-id");
		var initCallBack = function(dataset) {
			dataset.setting.pageDivSet = false;
			that.datasets[target] = dataset;
			if(typeof options !== "undefined") {
				$.extend(dataset.setting.gridProps, options);
			}
			
			if(dataset.widgetType == 'auigrid') {
				AUIGrid.destroy(target);
				
				//lhs grouping summary style 적용
				dataset.setting.gridProps.selectionMode = "singleRow";
				dataset.setting.gridProps.showSelectionBorder = false;
				
			    if(dataset.setting.gridProps != null && dataset.setting.gridProps["groupingSummarySetStyle"]) {
			    	dataset.setting.gridProps["rowStyleFunction"] = function(rowIndex, item) {
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
			   	}
			    dataset.setting.gridProps.copySingleCellOnRowMode = true;
				var colModel = [];
//				colModel = dataset.setting.colModel;
				var sortingInfo = []; // 정렬 아래 쪽
				
				//﻿﻿﻿var locale = sessionStorage.getItem('locale');
				for(var i = 0; i < dataset.setting.colModel.length; i++) {
					var col = dataset.setting.colModel[i];
					if(col.hide == null || !col.hide || col.excelHide == null || col.excelHide || col.excelTempleteHide == null || col.excelTempleteHide) {
						if(locale != 'KR') {
							/*if(col['headerText'] == '수정자') {
								console.log(col['headerText']);
								col['headerText'] = '정호영'; //language.getValueFromKorean(col['headerText']);
								console.log(col['headerText']);
							} else {*/
								col['headerText'] = (language == undefined ? col['headerText'] : language.getValueFromKorean(col['headerText'])); ////////////
							//}
						} 
						
						colModel.push(col);
						if(col.sort != null && col.sort != "") {
//							sortingInfo.push(col);
							sortingInfo.push({dataField : col.dataField, sortType : col.sortType == "ASC" ? 1 : -1, sort : col.sort});
						}
					} else {
						if(locale != 'KR') {
							col['headerText'] = (language == undefined ? col['headerText'] : language.getValueFromKorean(col['headerText'])); ////////////
						}
					}
				}
				//console.time("그리드 생성");
//				delete dataset.setting.gridProps.pageRowCount;
				dataset.setting.gridProps.pageRowCountInit = dataset.setting.gridProps.pageRowCount + ""; 
				dataset.setting.gridProps.pageRowCount = 1;
//				dataset.setting.gridProps.lazyGenRowsMode = true;
				dataset.setting.gridProps.pagingMode = "default";
//				dataset.setting.gridProps.usePaging = false;
				AUIGrid.create(target, colModel, dataset.setting.gridProps);
				dataset.setting.gridProps.pageRowCount = dataset.setting.gridProps.pageRowCountInit;
				//console.timeEnd("그리드 생성");
				if(dataset.setting.gridProps["showFooter"])
					AUIGrid.setFooter(target, dataset.setting.footerData);
	
				// column hide
				var hideColumn = [];
				for (var i = 0; i <  dataset.setting.colModel.length; i++) {
					if (dataset.setting.colModel[i].hide)
						hideColumn.push(dataset.setting.colModel[i].dataField)
				}
				AUIGrid.hideColumnByDataField(target, hideColumn)
				// column fixed
				AUIGrid.setFixedColumnCount(target,dataset.setting.columnFixed);
				
				for (var fnc in dataset.setting.gridEvent) {
					AUIGrid.bind(target, fnc, function(event){
						return new Function(event, eval(dataset.setting.gridEvent[event.type]));
					});
				}
				
				// 정렬
//				sortingInfo[0] = { dataField : "country", sortType : 1 }; // 오름차순 1 asc
//				sortingInfo[1] = { dataField : "name", sortType : -1 }; // 내림 차순 -1 desc
				if(sortingInfo.length > 0) {
					sortingInfo.sort(function(a, b) {
						return a.sort - b.sort;
					});
					AUIGrid.setSorting(target, sortingInfo);
					that.datasets[target].sortingInfo = sortingInfo;
				}
			} else {
	            
			}
			that.resize();
		}
		var callBacks = [initCallBack];
		if(callBack != null) {
			callBacks = callBacks.concat(callBack);
		}
		var dataset = this.getInitDataset(widgetId, {divisionCd: sessionStorage.divisionCd, companyCd : sessionStorage.companyCd}, null, callBacks);
	},
	initCallBack: function(target, widgetId, options, callBack, dataset) {
		this.datasets[target] = dataset;
		if(typeof options !== "undefined") {
			$.extend(dataset.setting.gridProps, options);
		}
		
		if(dataset.widgetType == 'auigrid') {
			AUIGrid.destroy(target);
			
			//lhs grouping summary style 적용
			dataset.setting.gridProps.selectionMode = "singleRow";
			dataset.setting.gridProps.showSelectionBorder = false;
			
		    if(dataset.setting.gridProps != null && dataset.setting.gridProps["groupingSummarySetStyle"]) {
		    	dataset.setting.gridProps["rowStyleFunction"] = function(rowIndex, item) {
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
		   	}
		    dataset.setting.gridProps.copySingleCellOnRowMode = true;
			var colModel = [];
			for(var i = 0; i < dataset.setting.colModel.length; i++) {
				var col = dataset.setting.colModel[i];
				if(col.hide == null || !col.hide || col.excelTempleteHide == null || col.excelTempleteHide) {
					colModel.push(col);
				}
			}
			AUIGrid.create(target, colModel, dataset.setting.gridProps);
			if(dataset.setting.gridProps["showFooter"])
				AUIGrid.setFooter(target, dataset.setting.footerData);

			// column hide
			var hideColumn = [];
			for (var i = 0; i <  dataset.setting.colModel.length; i++) {
				if (dataset.setting.colModel[i].hide)
					hideColumn.push(dataset.setting.colModel[i].dataField)
			}
			AUIGrid.hideColumnByDataField(target, hideColumn)
			// column fixed
			AUIGrid.setFixedColumnCount(target,dataset.setting.columnFixed);
			
			for (var fnc in dataset.setting.gridEvent) {
				AUIGrid.bind(target, fnc, function(event){
					return new Function(event, eval(dataset.setting.gridEvent[event.type]));
				});
			}
		} else {
            
		}
		this.resize();
	},
	timer:0,
	resize:function() {
		var that = this;
		// 리사이즈 그리드
		$(window).resize(function() {
			clearTimeout( that.timer );
		    that.timer = setTimeout( resize, 300 );
		});
		function resize() {
			var auigrid = $(".w-widget-auigrid");
			for(var i =0; i < auigrid.length; i++) {
				AUIGrid.resize($(auigrid[i]).attr("id"));
			}
			for(var i =0; i < that.charts.length; i++) {
				that.charts[i].resize();
			}
		}
	},
	/** 그리드 데이터 그리기 **/
	render: function(target, widgetId, params, callBack) {
		var that = this;
//		$(window).resize();
		that.widgetId = widgetId;
		AUIGrid.resize(widgetId);
		var dataset = that.datasets[target];
		if(dataset.setting.gridProps.pageRowCountInit) {
			AUIGrid.setPageRowCount(target, Number(dataset.setting.gridProps.pageRowCountInit));
//			AUIGrid.setPageRowCount(target, 100);
			dataset.setting.gridProps.pageRowCount = dataset.setting.gridProps.pageRowCountInit;
			delete dataset.setting.gridProps.pageRowCountInit;
		}
//		var dataset = that.getDataset(widgetId, params);
		var renderCallBack = function(datas) {
			if(datas[0] != null && datas[0].session == "no") {
//			if(datas.length <= 0) {
				that.fnLoginCheck();
//				alert("Session lost.");
//				top.location.href = common.contextPath() + "/login.html";
			}
//			var dataset = that.datasets[target];
			if(typeof options !== "undefined") {
				$.extend(dataset.setting.gridProps, options);
			}
			
			if(dataset.widgetType == "auigrid") {
				var isSort = AUIGrid.isSortedGrid(target);
				AUIGrid.setGridData(target, datas);
				if(isSort && that.datasets[target].sortingInfo != null) {
					AUIGrid.setSorting(target, that.datasets[target].sortingInfo);
				}
			} else {
				var chart = document.getElementById(target);
				var myChart = echarts.init(chart);
				dataset.setting.data.value = datas;
				dataset.setting.chart = that.chartDataParser(dataset.setting);
				myChart.setOption(dataset.setting.chart);
				that.charts.push(myChart);
			}
		}

		var callBacks = [renderCallBack];
		if(callBack != null) {
			callBacks = callBacks.concat(callBack);
		}
		this.getDataset(widgetId + "/data", params, null, callBacks);
	},
	renderMockChart : function(target, widget, language) {
		var that = this;
		$.get($("html").attr("contextPath") + "/mica/widgets/" + widget, function(datas) {
			if(locale != 'KR') {
				/*var strDatas = JSON.stringify(datas).replace(/전일/gi, language.getValueFromKorean('전일') == undefined ? 'missing 전일' : language.getValueFromKorean('전일'))
													.replace(/당일/gi, language.getValueFromKorean('당일') == undefined ? 'missing 당일' : language.getValueFromKorean('당일'))
													.replace(/비율/gi, language.getValueFromKorean('비율') == undefined ? 'missing 비율' : language.getValueFromKorean('비율'))
													.replace(/출발/gi, language.getValueFromKorean('출발') == undefined ? 'missing 출발' : language.getValueFromKorean('출발'))
													.replace(/입고/gi, language.getValueFromKorean('입고') == undefined ? 'missing 입고' : language.getValueFromKorean('입고'));*/
				var strDatas = JSON.stringify(datas).replace(/전일/gi, language.getValueFromKorean('전일'))
													.replace(/당일/gi, language.getValueFromKorean('당일'))
													.replace(/비율/gi, language.getValueFromKorean('비율'))
													.replace(/출발/gi, language.getValueFromKorean('출발'))
													.replace(/입고/gi, language.getValueFromKorean('입고'))
													.replace(/매출/gi, language.getValueFromKorean('매출'))
													.replace(/매입율/gi, language.getValueFromKorean('매입율'))
													.replace(/매입/gi, language.getValueFromKorean('매입'))
													.replace('단위(천원)', language.getValueFromKorean('단위(천원)'));
				datas = JSON.parse(strDatas);
			}
			
			datas = datas.dataset.datas
			var dataset = that.datasets[target];
			var chart = document.getElementById(target);
			var myChart = echarts.init(chart);
			dataset.setting.data.value = datas;
			if(locale != 'KR') {
				/*var strSetting = JSON.stringify(dataset.setting).replace(/전일/gi, language.getValueFromKorean('전일') == undefined ? 'missing 전일' : language.getValueFromKorean('전일'))
																.replace(/당일/gi, language.getValueFromKorean('당일') == undefined ? 'missing 당일' : language.getValueFromKorean('당일'))
																.replace(/비율/gi, language.getValueFromKorean('비율') == undefined ? 'missing 비율' : language.getValueFromKorean('비율'))
																.replace(/출발/gi, language.getValueFromKorean('출발') == undefined ? 'missing 출발' : language.getValueFromKorean('출발'))
																.replace(/입고/gi, language.getValueFromKorean('입고') == undefined ? 'missing 입고' : language.getValueFromKorean('입고'));*/
				var strSetting = JSON.stringify(dataset.setting).replace(/전일/gi, language.getValueFromKorean('전일'))
																.replace(/당일/gi, language.getValueFromKorean('당일'))
																.replace(/비율/gi, language.getValueFromKorean('비율'))
																.replace(/출발/gi, language.getValueFromKorean('출발'))
																.replace(/입고/gi, language.getValueFromKorean('입고'))
																.replace(/매출/gi, language.getValueFromKorean('매출'))
																.replace(/매입율/gi, language.getValueFromKorean('매입율'))
																.replace(/매입/gi, language.getValueFromKorean('매입'))																
																.replace('단위(천원)', language.getValueFromKorean('단위(천원)'));
				dataset.setting = JSON.parse(strSetting);
			}
			
			dataset.setting.chart = that.chartDataParser(dataset.setting);
			myChart.setOption(dataset.setting.chart);
			that.charts.push(myChart);
		});
	},
	pageRender: function(target, widgetId, params, callBack, totalRowCountId) {
		params = params || {};
		var that = this;
		$(window).resize();
		that.widgetId = widgetId;
		
		var dataset = that.datasets[target];
		
		that.datasets[target].pagerRenderMode = true;
		that.datasets[target].pagerRenderParams = params;
		
		if(dataset.setting.gridProps.usePaging) {
			var column = AUIGrid.getColumnLayout(target);
			that.datasets[target].setting.gridProps.usePaging = false;
			AUIGrid.destroy(target);
			AUIGrid.create(target, column, dataset.setting.gridProps);
		}
		
		if(dataset.setting.gridProps.pageRowCountInit) {
			dataset.setting.gridProps.pageRowCount = dataset.setting.gridProps.pageRowCountInit + "";
//			dataset.setting.gridProps.pageRowCount = "100";
			AUIGrid.setPageRowCount(target, Number(dataset.setting.gridProps.pageRowCount));
			delete dataset.setting.gridProps.pageRowCountInit;
		}
		
		var rowCount = dataset.setting.gridProps.pageRowCount;
		if(!that.datasets[target].setting.pageDivSet) {
			that.datasets[target].setting.pageDivSet = true;
			$("#" + target.replace("#", "")).css("min-height", "inherit");
			$("#" + target.replace("#", "")).css("height", "calc(100% - 34px)");
			$("#" + target.replace("#", "")).parent().append('<div class="aui-grid-paging-panel" style="position: absolute; width: 100%; height: 34px; left: 0px; bottom: 0px;"></div>');
		}
		
		
		if(params.startPage == null) {
			params.startPage = 1;
		}
		if(params.endPage == null) {
			params.endPage = rowCount;
			dataset.nowPage = 1;
		}
		
		var renderCallBack = function(datas) {
			if(typeof options !== "undefined") {
				$.extend(dataset.setting.gridProps, options);
			}
			if(datas.length < 1) {
				maxFlag = true;
			}
			if(dataset.widgetType == "auigrid") {
				var isSort = AUIGrid.isSortedGrid(target);
				if(datas.length > 0) {
					if(datas[0].ROW_COUNT != undefined) {
						dataset.setting.gridProps.totalRowCount = datas[0].ROW_COUNT;
					}
					if(datas[0].rowCount != undefined) {
						dataset.setting.gridProps.totalRowCount = datas[0].rowCount;
					}
				} else {
					dataset.setting.gridProps.totalRowCount = 0;
				}
				var maxFlag = false;
				var totalRowCount = dataset.setting.gridProps.totalRowCount;
				var totalPage = Math.ceil(totalRowCount / rowCount);
				var flag = false;
				if(flag) {
					$(".aui-grid-paging-panel").html('<span id="grid-prev-btn" class="aui-grid-paging-number aui-grid-paging-prev" style="">&lt;</span><span id="grid-now-page" class="aui-grid-paging-number-simple-text" style=""> ' 
							+ dataset.nowPage + " / " + totalPage + ' </span><span id="grid-next-btn" class="aui-grid-paging-number aui-grid-paging-next" style="">&gt;</span>' 
							+ ' <select id="page_row_select" style="margin-bottom:3px;"><option value="20">20</option><option value="40">40</option><option value="60">60</option><option value="100">100</option><option value="200">200</option></select>'
							+ '<span class="aui-grid-paging-info-text">'
							+ params.startPage + " ~ " + (params.endPage < totalRowCount ? params.endPage : totalRowCount) + " of " + totalRowCount + ' rows</span>');
					$("#page_row_select").val(rowCount);
					$("#grid-prev-btn, #grid-next-btn").on("click", function() {
						var nowPage = dataset.nowPage;
						switch($(this).attr("id")) {
							case "grid-prev-btn":
								nowPage--;
								break;
							case "grid-next-btn":
								nowPage++;
								if(maxFlag) return;
								break;
						}
						if(nowPage < 1) {
							return;
						}
						
						$("#grid-now-page").html(" " + nowPage + " ");
						dataset.nowPage = nowPage;
						params.startPage = (nowPage - 1) * rowCount + 1;
						params.endPage = nowPage * rowCount;
			
						if(params.endPage > params.total) {
							maxFlag = true;
						}
						that.pageRender(target, widgetId, params, callBack);
					});
					$("#page_row_select").on("change", function() {
						$(this).val();
						dataset.nowPage = 1;
						rowCount = dataset.setting.gridProps.pageRowCount = Number($(this).val());

						params.startPage = (nowPage - 1) * rowCount + 1;
						params.endPage = nowPage * rowCount;
			
						if(params.endPage > params.total) {
							maxFlag = true;
						}
						that.pageRender(target, widgetId, params, callBack);
					});
				} else {
					var prevBtnHtml = '<span class="aui-grid-paging-number aui-grid-paging-first">&lt;&lt;</span>' + 
					'<span class="aui-grid-paging-number aui-grid-paging-prev">&lt;</span>';
					
					var numBtnHtml = '<span class="aui-grid-paging-number #{selected}" style="">#{number}</span>';
					
					var nextBtnHtml = '<span class="aui-grid-paging-number aui-grid-paging-next">&gt;</span>' +
					'<span class="aui-grid-paging-number aui-grid-paging-last">&gt;&gt;</span>';
					
					var pagingAppendHTML = "";
					var nowPage = dataset.nowPage;
					totalPage;
					var startPage = 0;
					var endPage = 0;
					if((nowPage-1).toString().length < 2) {
						startPage = 1;
					} else {
						startPage = (nowPage-1).toString().substring(0, (nowPage-1).toString().length - 1) + "1";
					}
					startPage = Number(startPage);
					endPage = startPage + 9 < totalPage ? startPage + 9 : totalPage; 
					if(startPage > 1 && totalPage > 10) {
						pagingAppendHTML = prevBtnHtml;
					}
					for(var i = startPage; i < endPage + 1; i++) {
						pagingAppendHTML += numBtnHtml.replace(/#{number}/gi, i);
						if(i == nowPage) {
							pagingAppendHTML = pagingAppendHTML.replace(/#{selected}/gi, "aui-grid-paging-number-selected");
						} else {
							pagingAppendHTML = pagingAppendHTML.replace(/#{selected}/gi, "");
						}
					}
					if(endPage < totalPage) {
						pagingAppendHTML += nextBtnHtml;
					}
					var pagingPanelHtml = "";
					if(dataset.setting.gridProps.totalRowCount == 0) {
						pagingPanelHtml = '<span class="aui-grid-paging-info-text">'
							+ 0 + " ~ " + 0 + " of " + totalRowCount + ' rows</span>';
					} else {
						pagingPanelHtml = pagingAppendHTML
						+ ' <select class="page_row_select" style="margin-bottom:3px;"><option value="20">20</option><option value="40">40</option><option value="60">60</option><option value="100">100</option><option value="200">200</option></select>'
						+ '<span class="aui-grid-paging-info-text">'
						+ params.startPage + " ~ " + (params.endPage < totalRowCount ? params.endPage : totalRowCount) + " of " + totalRowCount + ' rows</span>'
					}
					$("#" + target).parent().find(".aui-grid-paging-panel").html(pagingPanelHtml);
					$("#" + target).parent().find(".page_row_select").val(rowCount);
					$("#" + target).parent().find(".aui-grid-paging-number").on("click", function() {
						var classType = $(this).attr("class").replace("aui-grid-paging-number", "").replace(" ", "");
						var nowPage = dataset.nowPage;
						var tenNumber = Number((nowPage-1).toString().substring(0, (nowPage-1).toString().length - 1));
						switch(classType) {
							case "aui-grid-paging-first":
								nowPage = 1;
								break;
							case "aui-grid-paging-prev":
								nowPage = (tenNumber - 1) * 10 + 1;
								break;
							case "aui-grid-paging-next":
								nowPage = (tenNumber + 1) * 10 + 1;
								break;
							case "aui-grid-paging-last":
								nowPage = totalPage;
								break;
							default:
								nowPage = Number($(this).html());
								break;
						}

						dataset.nowPage = nowPage;
						params.startPage = (nowPage - 1) * rowCount + 1;
						params.endPage = nowPage * rowCount;
						that.pageRender(target, widgetId, params, callBack);
					});
					
					$("#" + target).parent().find(".page_row_select").on("change", function() {
						dataset.nowPage = 1;
						rowCount = dataset.setting.gridProps.pageRowCount = Number($(this).val());

						params.startPage = (nowPage - 1) * rowCount + 1;
						params.endPage = nowPage * rowCount;
						that.pageRender(target, widgetId, params, callBack);
					});
				}
				AUIGrid.setGridData(target, datas);
				if(isSort && that.datasets[target].sortingInfo != null) {
					AUIGrid.setSorting(target, that.datasets[target].sortingInfo);
				}
			}
			if(datas.length < dataset.setting.gridProps.pageRowCount) {
				maxFlag = true;
//				return;
			}
		}

		var callBacks = [renderCallBack];
		if(callBack != null) {
			callBacks = callBacks.concat(callBack);
		}
		this.getDataset(widgetId + "/data", params, null, callBacks);
	},
	pageScrollRender: function(target, widgetId, params, callBack) {
		params = params || {};
		var that = this;
		$(window).resize();
		that.widgetId = widgetId;
		
		var dataset = that.datasets[target];
		dataset.setting.gridProps.pageMax = dataset.setting.gridProps.pageMax ? dataset.setting.gridProps.pageMax : dataset.setting.gridProps.pageRowCount;
		var rowCount = dataset.setting.gridProps.pageMax;
		if(params.startPage == null) {
			params.startPage = 1;
		}
		
		if(params.endPage == null) {
			params.endPage = rowCount;
			dataset.nowPage = 1;
			dataset.isSetGridData = false// 최초 그리드 데이터 호출 여부
			dataset.setting.gridProps.usePaging = false;
//			dataset.setting.gridProps.pageRowCount = 999;
//			AUIGrid.setProp(target, {pageRowCount: 99999999});
			that.initCallBack(target, widgetId, params, null, dataset);
		}
		
		var maxFlag = false;
		// 스크롤 체인지 이벤트 바인딩
		if(!dataset.vScrollBindFlag) {
//			$(".aui-grid-paging-panel").html('<span id="grid-now-page" class="aui-grid-paging-number-simple-text" style=""> ' + dataset.nowPage + ' </span>');
			dataset.vScrollBindFlag = true;
			AUIGrid.bind(target, "vScrollChange", function(event) {
				if(event.position == event.maxPosition) {
					if(maxFlag) { return; }

					var nowPage = dataset.nowPage;
					nowPage++;
					dataset.nowPage = nowPage;
					params.startPage = (nowPage - 1) * rowCount + 1;
					params.endPage = nowPage * rowCount;
					if(params.endPage > params.total) {
						maxFlag = true;
					}
					$("#grid-now-page").html(" " + nowPage + " ");
					that.pageScrollRender(target, widgetId, params, callBack);
				}
			});
		}
		var renderCallBack = function(datas) {
			if(typeof options !== "undefined") {
				$.extend(dataset.setting.gridProps, options);
			}
			if(datas.length < 1) {
				maxFlag = true;
				return;
			}
			if(dataset.widgetType == "auigrid") {
				if(dataset.isSetGridData) {
					AUIGrid.appendData(target, datas);
				} else {
					dataset.isSetGridData = true;
					AUIGrid.setGridData(target, datas);
				}
			}
		}

		var callBacks = [renderCallBack];
		if(callBack != null) {
			callBacks = callBacks.concat(callBack);
		}
		this.getDataset(widgetId + "/data", params, null, callBacks);
	},
	/** 그리드 데이터 그리기 **/
	process: function(target, widgetId, params, method) {
		var that = this;
		$(window).resize();
		setTimeout(function() {
			micaCommon.splash.show();
			setTimeout(function() {
				try{
					that.widgetId = widgetId;
					var dataset = that.getDataset(widgetId, params, method);
					delete params.method;
					mCommon.render(target, widgetId, params)
				} finally{
					micaCommon.splash.hide();
				}
			},10);
		},100);
		
	},
	renderForm: function(target, widgetId, form) {
		var paramMap = {};
		$(form).serializeArray().forEach(function(map, index){
			if(map['value'] != "") {
				paramMap[map['name']] = map['value'];
			}
		});
		this.render(target, widgetId, paramMap);
	},
	/** dataset 데이터 가져오기 **/
	getDataset: function(target, params, method, callBacks) {
		callBacks = callBacks || [function(){}];
		
		var async = callBacks.length > 1;
		
		if(typeof callBacks == "function") {
			callBacks = [callBacks];
			async = true;
		}
		var sProjectId = this.projectId;
		var sPageId = this.pageId;
		var dataset = {};
		
		if(method != null) {
			params["method"] = method;
		}

		micaCommon.splash.show();
		$.ajax({
			async: async,
//				url: "http://mom.thirautech.com:8100/micaweb/mica/projects/" + sProjectId + "/widgets/" + target,
			url: $("html").attr("contextPath") + "/mica/widgets/" + target,
			method: "get",
			contentType: "application/json; charset=UTF-8",
			data : (params == null ? "" : $.param(params)),
			success: function(result) {
				dataset = result;
				$(callBacks).each(function(index, callBack) {
					callBack(dataset);
				})
			},
			error: function(){
				mCommon.messageBox({
					type: "danger",
					width:"400",
					height: "145",
//					html:"getDataSet", 
					html:Language.lang['MESSAGES12193'] + '<br>' + Language.lang['MESSAGES40084'],//mica_dataset이 없을 경우
					closeButton:{text:"Close"}
				});
			},
			complete: function() {
				micaCommon.splash.hide();
			}
		});
		
		return dataset;
	},
	getInitDataset: function(target, params, method, callBacks) {
		callBacks = callBacks || [function(){}];
		
		var async = callBacks.length > 1;
		
		if(typeof callBacks == "function") {
			callBacks = [callBacks];
			async = true;
		}
		var sProjectId = this.projectId;
		var sPageId = this.pageId;
		var dataset = {};
		
		if(method != null) {
			params["method"] = method;
		}
		$.ajax({
			async: async,
//				url: "http://mom.thirautech.com:8100/micaweb/mica/projects/" + sProjectId + "/widgets/" + target,
			url: $("html").attr("contextPath") + "/mica/widgets/" + target,
			method: "get",
			contentType: "application/json; charset=UTF-8",
			data : (params == null ? "" : $.param(params)),
			success: function(result) {
				dataset = result;
				$(callBacks).each(function(index, callBack) {
					callBack(dataset);
				})
			},
			error: function(){
				mCommon.messageBox({
					type: "danger",
					width:"400",
					height: "145",
//					html:"getInitDataset",
					html:Language.lang['MESSAGES12193'] + '<br>' + Language.lang['MESSAGES40084'], ////mica_dataset의 포트 등이 잘못 설정돼있을 경우
					closeButton:{text:"Close"}
				});
			},
			complete: function() {
				micaCommon.splash.hide();
			}
		});
		
		return dataset;
	},
	leftMenu: function(el, widgetId, params) { //현재 미사용인듯
		if(location.href.indexOf("Mbox/design") > 0) {
			return;
		}
		
		searchFlag  = params.searchFlag;
		homeFlag    = params.homeFlag;
		tabChange   = params.tabChange;
		isClickMenu = "N";      
		this.leftMenuAuth(el,params);
		return;
		
		var sPageId = this.pageId;
		var dataset = {};
		var that = this;

	},
	leftMenuAuth: function(el,params) {
		var that = this;
//		$.get($("html").attr("contextPath") + "/mom/request/com.thirautech.mom.admin.micaMenu.dummy", function(menuListData) {
//			
//			var param = {divisionCd : sessionStorage.getItem("divisionCd"), companyCd : sessionStorage.getItem("companyCd"), id : "0000"}
//			
//			$.get($("html").attr("contextPath") + "/mom/request/com.thirautech.mom.admin.micaAuthGroup.dummy", param, function(authList) {
//				var authMenuList = JSON.parse(authList[0].menuList);
				var loginMenuList = JSON.parse(sessionStorage.getItem("loginMenuList"));
				var bookMarkList = JSON.parse(params.bookMarkList);
				var displayOrderList = JSON.parse(params.displayOrder);
				var searchMenuList   = JSON.parse(params.searchMenu);
				var menuList = [];
				var searchCount = 1;
				if(loginMenuList == null || loginMenuList == '' || loginMenuList == undefined) {
					    localStorage.removeItem("token");
					    sessionStorage.removeItem("siteInfo");
					    sessionStorage.removeItem("userInfo");
					    sessionStorage.removeItem("loginMenuList");	
						location.href = common.contextPath() + "/login.html";
						return;
				}
				if(params.menuBarId=='btnMomGo'){
					for(var i = 0, max = loginMenuList.length; i < max; i++) {
						var loginMenu = loginMenuList[i];
						if(params.searchFlag=="Y"){
								 for(var j=0;j<searchMenuList.length;j++){ 
							    		if((loginMenu.menuNm.trim().indexOf(searchMenuList[j]) > -1 && loginMenu.icon == null && loginMenu.url != null) || loginMenu.menuId=="MAIN"){
							    			loginMenu.parentId = "root";
							    			if(loginMenu.menuId== "" || loginMenu.menuId== "MAIN"){
							    				loginMenu.sortNo = 0;
								    			searchCount++;
							    			}
							    			else{
							    				  loginMenu.sortNo = searchCount;
								    			  searchCount++;
							    			}							    			
							    			       menuList.push(loginMenu);
							    		}
							     }
							  
						}
						else{
							  
								  menuList.push(loginMenu);
							  
						}						
				    }
				}
				else {
					  for(var i = 0, max = loginMenuList.length; i < max; i++) {
						  var loginMenu = loginMenuList[i];
						      loginMenu.parentId = "root";
						       if(displayOrderList!=undefined && displayOrderList.length>0){
						    	     for(var j=0;j<displayOrderList.length;j++){
							    		if(loginMenu.id == displayOrderList[j].menuId){
							    			loginMenu.sortNo = displayOrderList[j].displayOrder;
							    		}
							    	}
						       }						       
							    menuList.push(loginMenu);						    
				      }										
					
				}
				

				
				// 권한 관리 부분 메뉴 순서
//				if(authMenuList) {
//					menuList.sort(function(a, b) {
//						var aIndex = authMenuList.indexOf(a.id);
//						var bIndex = authMenuList.indexOf(b.id);
//						aIndex = aIndex < 0 ? 999999 : aIndex;
//						bIndex = bIndex < 0 ? 999999 : bIndex;
//						
//						return aIndex - bIndex;
//					});
//				}
				var menuList = mCommon.parentIdHierarchy(menuList, "parentMenuId", "child");

				that.leftMenuHtmlSet2(el, menuList,params.menuBarId);
				if(params.initFlag =="Y"&&params.menuBarId=='btnMomGo'){
					that.leftMenuEventSet();
				}
			
				
//			});
//		});
	},
	leftMenuHtmlSet2: function(el, dataset,eventArea) {
		var leftMenuTopLv1 = '';
		var leftMenuTopLv2 = '';
		var leftMenuTopLv3 = '';
		var leftMenuTop = '<div class="sticky is-expanded" style="margin-bottom: -73.9773px;">'+
		'<div class="app-sidebar__overlay active" data-bs-toggle="sidebar"></div>'+
		  '<div class="app-sidebar ps open">'+
			'<div class="side-header">'+
				'<a class="header-brand1" href="index.html"> <img src="/mom/content/css/sash-bootstrap5/HTML/sash/assets/images/brand/logo.png" class="header-brand-img desktop-logo" alt="logo">'+
				  '<img src="/mom/content/css/sash-bootstrap5/HTML/sash/assets/images/brand/logo-1.png" class="header-brand-img toggle-logo" alt="logo">'+
		          '<img src="/mom/content/css/sash-bootstrap5/HTML/sash/assets/images/brand/logo-2.png" class="header-brand-img light-logo" alt="logo">'+
		          '<img src="/mom/content/css/sash-bootstrap5/HTML/sash/assets/images/brand/logo-3.png" class="header-brand-img light-logo1" alt="logo">'+
				 '</a>'+
			'</div>'+
		   '<div class="main-sidemenu is-expanded">'+
			 '<div class="slide-left disabled active is-expanded" id="slide-left">'+
					'<svg xmlns="http://www.w3.org/2000/svg" fill="#7b8191" width="24" height="24" viewBox="0 0 24 24">'+
			         '<path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path>'+
					'</svg>'+
			 '</div>'+
			 '<ul class="side-menu open" style="margin-right: 0px;">'+
			   '<li class="sub-category">'+
			    '<h3>Main</h3>'+
			   '</li>'+
			   '<li class="slide is-expanded">'+
			    '<a class="side-menu__item" data-bs-toggle="slide" href="index.html">'+
			     '<i class="side-menu__icon fe fe-home"></i>'+
			     '<span class="side-menu__label">Dashboard</span>'+
			    '</a>'+
			   '</li>';
		
			   for(var i=0;i<dataset.length;i++){
				    if(dataset[i]['child'] != undefined){
					 leftMenuTopLv1 += '<li class="slide">'+
									     '<a  class="side-menu__item" data-bs-toggle="slide" href="javascript:void(0)">'+
								           '<i class="side-menu__icon '+dataset[i]['icon']+'"></i>'+
									       '<span class="side-menu__label">'+dataset[i]['menuNm']+'</span>'+
									       '<i class="angle fe fe-chevron-right"></i>'+
									     '</a>'+
										'<ul class="slide-menu">'+
										  '<li class="side-menu-label1">'+
							      			'<a href="javascript:void(0)">'+dataset[i]['menuNm']+'</a>'+
								  		  '</li>';
				  		 
					   for(var j=0;j<dataset[i]['child'].length;j++){
						   var item = dataset[i]['child'][j];
						    if(dataset[i]['child'][j]['child']!= undefined){
							
						    }
						    else{
							      leftMenuTopLv1 += '<li>'+
				                                      '<a id='+item['menuId']+' href=#'+item['menuId']+' name='+item['menuNm']+' data-path='+item['url']+' class="slide-item">'+item['menuNm']+'</a>'+
				 					                '</li>';	
						}						
										 					  					    
					   }
					   leftMenuTopLv1 += '</ul>';	
					   
					 }
				   else{
						leftMenuTopLv1 +=	'<li>'+
											 '<a class="side-menu__item" href="widgets.html">'+
											  '<i class="side-menu__icon fe fe-grid"></i>'+
											  '<span class="side-menu__label">'+dataset[i]['menuNm']+'</span>'+
											 '</a>'+
											'</li>';
				   }
				   if(i == dataset.length-1){
					   leftMenuTopLv1 += '</ul>';
				     }
				   }
			   leftMenuTopLv2 ='<div class="slide-right" id="slide-right">'+
				                '<svg xmlns="http://www.w3.org/2000/svg" fill="#7b8191" width="24" height="24" viewBox="0 0 24 24"> <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path></svg>'+
			                   '</div>'+
		                  '</div>'+
		                    '<div class="ps__rail-x" style="left: 0px; bottom: 0px;">'+
							  '<div class="ps__thumb-x" tabindex="0" style="left: 0px; width: 0px;"></div>'+
						  '</div>'+
						  '<div class="ps__rail-y" style="top: 0px; right: 0px;">'+
							'<div class="ps__thumb-y" tabindex="0" style="top: 0px; height: 0px;"></div>'+
						  '</div>'+
					    '</div>'+		
				      '</div>'+
				      '<div id = "jump1" class="jumps-prevent" style="padding-top: 74px;"></div>';
				  $('#jump1').after(leftMenuTop+leftMenuTopLv1+leftMenuTopLv2);  
				   
			   },
			  /* '<li class="sub-category"><h3>화면</h3></li>'+*/
				/*	'<li class="slide">'+
			           '<a class="side-menu__item" data-bs-toggle="slide" href="javascript:void(0)">'+
			             '<i class="side-menu__icon fe fe-package"></i>'+
			              '<span class="side-menu__label">Bootstrap</span>'+
			             '<i class="angle fe fe-chevron-right"></i>'+
			           '</a>'+
					    '<ul class="slide-menu">'+
							'<li class="side-menu-label1"><a href="javascript:void(0)">Bootstrap</a></li>'+
							'<li><a href="alerts.html" class="slide-item"> Alerts</a></li>'+
							'<li><a href="buttons.html" class="slide-item"> Buttons</a></li>'+
							'<li><a href="colors.html" class="slide-item"> Colors</a></li>'+
							'<li class="sub-slide">'+
							 '<a class="sub-side-menu__item" data-bs-toggle="sub-slide" href="javascript:void(0)">'+
							   '<span class="sub-side-menu__label">Avatars</span>'+
							    '<i class="sub-angle fe fe-chevron-right"></i>'+
							  '</a>'+
							   '<ul class="sub-slide-menu">'+
									'<li><a href="avatarsquare.html" class="sub-slide-item">  Avatar-Square</a></li>'+
									'<li><a href="avatar-round.html" class="sub-slide-item">  Avatar-Rounded</a></li>'+
									'<li><a href="avatar-radius.html" class="sub-slide-item"> Avatar-Radius</a></li>'+
							   '</ul>'+
							'</li>'+*/
							
			   /*<li class="sub-category">
						<h3>Pre-build Pages</h3>
					</li>
					<li class="slide"><a class="side-menu__item"
						data-bs-toggle="slide" href="javascript:void(0)"><i
							class="side-menu__icon fe fe-layers"></i><span
							class="side-menu__label">Pages</span><i
							class="angle fe fe-chevron-right"></i></a>
						<ul class="slide-menu">
							<li class="side-menu-label1"><a href="javascript:void(0)">Pages</a></li>
							<li><a href="profile.html" class="slide-item">
									Profile</a></li>
							<li><a href="editprofile.html" class="slide-item">
									Edit Profile</a></li>
							<li><a href="notify-list.html" class="slide-item">
									Notifications List</a></li>
							<li><a href="email-compose.html" class="slide-item">
									Mail-Compose</a></li>
							<li><a href="email-inbox.html" class="slide-item">
									Mail-Inbox</a></li>
							<li><a href="email-read.html" class="slide-item">
									Mail-Read</a></li>
							<li><a href="gallery.html" class="slide-item">
									Gallery</a></li>
							<li class="sub-slide"><a class="sub-side-menu__item"
								data-bs-toggle="sub-slide" href="javascript:void(0)"><span
									class="sub-side-menu__label">Forms</span><i
									class="sub-angle fe fe-chevron-right"></i></a>
								<ul class="sub-slide-menu">
									<li><a href="form-elements.html" class="sub-slide-item">
											Form Elements</a></li>
									<li><a href="form-layouts.html" class="sub-slide-item">
											Form Layouts</a></li>
									<li><a href="form-advanced.html" class="sub-slide-item">
											Form Advanced</a></li>
									<li><a href="form-editor.html" class="sub-slide-item">
											Form Editor</a></li>
									<li><a href="form-wizard.html" class="sub-slide-item">
											Form Wizard</a></li>
									<li><a href="form-validation.html"
										class="sub-slide-item"> Form Validation</a></li>
								</ul></li>
							<li class="sub-slide"><a class="sub-side-menu__item"
								data-bs-toggle="sub-slide" href="javascript:void(0)"><span
									class="sub-side-menu__label">Tables</span><i
									class="sub-angle fe fe-chevron-right"></i></a>
								<ul class="sub-slide-menu">
									<li><a href="tables.html" class="sub-slide-item">Default
											table</a></li>
									<li><a href="datatable.html" class="sub-slide-item">
											Data Tables</a></li>
									<li><a href="edit-table.html" class="sub-slide-item">
											Edit Tables</a></li>
								</ul></li>
							<li class="sub-slide"><a class="sub-side-menu__item"
								data-bs-toggle="sub-slide" href="javascript:void(0)"><span
									class="sub-side-menu__label">Extension</span><i
									class="sub-angle fe fe-chevron-right"></i></a>
								<ul class="sub-slide-menu">
									<li><a href="about.html" class="sub-slide-item">
											About Company</a></li>
									<li><a href="services.html" class="sub-slide-item">
											Services</a></li>
									<li><a href="faq.html" class="sub-slide-item"> FAQS</a></li>
									<li><a href="terms.html" class="sub-slide-item">
											Terms</a></li>
									<li><a href="invoice.html" class="sub-slide-item">
											Invoice</a></li>
									<li><a href="pricing.html" class="sub-slide-item">
											Pricing Tables</a></li>
									<li><a href="settings.html" class="sub-slide-item">
											Settings</a></li>
									<li><a href="blog.html" class="sub-slide-item">
											Blog</a></li>
									<li><a href="blog-details.html" class="sub-slide-item">
											Blog Details</a></li>
									<li><a href="blog-post.html" class="sub-slide-item">
											Blog Post</a></li>
									<li><a href="empty.html" class="sub-slide-item">
											Empty Page</a></li>
									<li><a href="construction.html" class="sub-slide-item">
											Under Construction</a></li>
								</ul></li>
							<li class="sub-slide"><a class="sub-side-menu__item"
								data-bs-toggle="sub-slide" href="javascript:void(0)"><span
									class="sub-side-menu__label">Switcher</span><i
									class="sub-angle fe fe-chevron-right"></i></a>
								<ul class="sub-slide-menu">
									<li><a class="sub-slide-item" href="switcher-1.html">Switcher
											Style 1</a></li>
									<li><a class="sub-slide-item" href="switcher-2.html">Switcher
											Style 2</a></li>
								</ul></li>
						</ul></li>
					<li class="slide"><a class="side-menu__item"
						data-bs-toggle="slide" href="javascript:void(0)"><i
							class="side-menu__icon fe fe-shopping-bag"></i><span
							class="side-menu__label">E-Commerce</span><i
							class="angle fe fe-chevron-right"></i></a>
						<ul class="slide-menu">
							<li class="side-menu-label1"><a href="javascript:void(0)">E-Commerce</a></li>
							<li><a href="shop.html" class="slide-item"> Shop</a></li>
							<li><a href="shop-description.html" class="slide-item">
									Product Details</a></li>
							<li><a href="cart.html" class="slide-item"> Shopping
									Cart</a></li>
							<li><a href="add-product.html" class="slide-item">
									Add Product</a></li>
							<li><a href="wishlist.html" class="slide-item">
									Wishlist</a></li>
							<li><a href="checkout.html" class="slide-item">
									Checkout</a></li>
						</ul></li>
					<li class="slide"><a class="side-menu__item"
						data-bs-toggle="slide" href="javascript:void(0)"><i
							class="side-menu__icon fe fe-folder"></i><span
							class="side-menu__label">File Manager</span><span
							class="badge bg-pink side-badge">4</span><i
							class="angle fe fe-chevron-right hor-angle"></i></a>
						<ul class="slide-menu">
							<li class="side-menu-label1"><a href="javascript:void(0)">File
									Manager</a></li>
							<li><a href="file-manager.html" class="slide-item">
									File Manager</a></li>
							<li><a href="filemanager-list.html" class="slide-item">
									File Manager List</a></li>
							<li><a href="filemanager-details.html" class="slide-item">
									File Details</a></li>
							<li><a href="file-attachments.html" class="slide-item">
									File Attachments</a></li>
						</ul></li>
					<li class="sub-category">
						<h3>Misc Pages</h3>
					</li>
					<li class="slide"><a class="side-menu__item"
						data-bs-toggle="slide" href="javascript:void(0)"><i
							class="side-menu__icon fe fe-users"></i><span
							class="side-menu__label">Authentication</span><i
							class="angle fe fe-chevron-right"></i></a>
						<ul class="slide-menu">
							<li class="side-menu-label1"><a href="javascript:void(0)">Authentication</a></li>
							<li><a href="login.html" class="slide-item"> Login</a></li>
							<li><a href="register.html" class="slide-item">
									Register</a></li>
							<li><a href="forgot-password.html" class="slide-item">
									Forgot Password</a></li>
							<li><a href="lockscreen.html" class="slide-item">
									Lock screen</a></li>
							<li class="sub-slide"><a class="sub-side-menu__item"
								data-bs-toggle="sub-slide" href="javascript:void(0)"><span
									class="sub-side-menu__label">Error Pages</span><i
									class="sub-angle fe fe-chevron-right"></i></a>
								<ul class="sub-slide-menu">
									<li><a href="400.html" class="sub-slide-item"> 400</a></li>
									<li><a href="401.html" class="sub-slide-item"> 401</a></li>
									<li><a href="403.html" class="sub-slide-item"> 403</a></li>
									<li><a href="404.html" class="sub-slide-item"> 404</a></li>
									<li><a href="500.html" class="sub-slide-item"> 500</a></li>
									<li><a href="503.html" class="sub-slide-item"> 503</a></li>
								</ul></li>
						</ul></li>
					<li class="slide"><a class="side-menu__item"
						data-bs-toggle="slide" href="javascript:void(0)"> <i
							class="side-menu__icon fe fe-cpu"></i> <span
							class="side-menu__label">Submenu items</span><i
							class="angle fe fe-chevron-right"></i></a>
						<ul class="slide-menu">
							<li class="side-menu-label1"><a href="javascript:void(0)">Submenu
									items</a></li>
							<li><a href="javascript:void(0)" class="slide-item">Submenu-1</a></li>
							<li class="sub-slide"><a class="sub-side-menu__item"
								data-bs-toggle="sub-slide" href="javascript:void(0)"><span
									class="sub-side-menu__label">Submenu-2</span><i
									class="sub-angle fe fe-chevron-right"></i></a>
								<ul class="sub-slide-menu">
									<li><a class="sub-slide-item" href="javascript:void(0)">Submenu-2.1</a></li>
									<li><a class="sub-slide-item" href="javascript:void(0)">Submenu-2.2</a></li>
									<li class="sub-slide2"><a class="sub-side-menu__item2"
										href="javascript:void(0)" data-bs-toggle="sub-slide2"><span
											class="sub-side-menu__label2">Submenu-2.3</span><i
											class="sub-angle2 fe fe-chevron-right"></i></a>
										<ul class="sub-slide-menu2">
											<li><a href="javascript:void(0)"
												class="sub-slide-item2">Submenu-2.3.1</a></li>
											<li><a href="javascript:void(0)"
												class="sub-slide-item2">Submenu-2.3.2</a></li>
											<li><a href="javascript:void(0)"
												class="sub-slide-item2">Submenu-2.3.3</a></li>
										</ul></li>
									<li><a class="sub-slide-item" href="javascript:void(0)">Submenu-2.4</a></li>
									<li><a class="sub-slide-item" href="javascript:void(0)">Submenu-2.5</a></li>
								</ul></li>
						</ul></li>
					<li class="sub-category">
						<h3>General</h3>
					</li>
					<li>
					<a class="side-menu__item" href="widgets.html">
					<i class="side-menu__icon fe fe-grid"></i>
					<span class="side-menu__label">Widgets</span>
					</a>
					</li>
					<li class="slide"><a class="side-menu__item"
						data-bs-toggle="slide" href="javascript:void(0)"><i
							class="side-menu__icon fe fe-map-pin"></i><span
							class="side-menu__label">Maps</span><i
							class="angle fe fe-chevron-right"></i></a>
						<ul class="slide-menu">
							<li class="side-menu-label1"><a href="javascript:void(0)">Maps</a></li>
							<li><a href="maps1.html" class="slide-item">Leaflet
									Maps</a></li>
							<li><a href="maps2.html" class="slide-item">Mapel
									Maps</a></li>
							<li><a href="maps.html" class="slide-item">Vector
									Maps</a></li>
						</ul></li>
					<li class="slide"><a class="side-menu__item"
						data-bs-toggle="slide" href="javascript:void(0)"><i
							class="side-menu__icon fe fe-bar-chart-2"></i><span
							class="side-menu__label">Charts</span><span
							class="badge bg-secondary side-badge">6</span><i
							class="angle fe fe-chevron-right hor-angle"></i></a>
						<ul class="slide-menu">
							<li class="side-menu-label1"><a href="javascript:void(0)">Charts</a></li>
							<li><a href="chart-chartist.html" class="slide-item">Chart
									Js</a></li>
							<li><a href="chart-flot.html" class="slide-item">
									Flot Charts</a></li>
							<li><a href="chart-echart.html" class="slide-item">
									ECharts</a></li>
							<li><a href="chart-morris.html" class="slide-item">
									Morris Charts</a></li>
							<li><a href="chart-nvd3.html" class="slide-item">
									Nvd3 Charts</a></li>
							<li><a href="charts.html" class="slide-item"> C3 Bar
									Charts</a></li>
							<li><a href="chart-line.html" class="slide-item"> C3
									Line Charts</a></li>
							<li><a href="chart-donut.html" class="slide-item"> C3
									Donut Charts</a></li>
							<li><a href="chart-pie.html" class="slide-item"> C3
									Pie charts</a></li>
						</ul></li>*/
				
			/*	'<div class="slide-right" id="slide-right">'+
					'<svg xmlns="http://www.w3.org/2000/svg" fill="#7b8191" width="24" height="24" viewBox="0 0 24 24"> <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path></svg>'+
				'</div>'+
			'</div>'+
			'<div class="ps__rail-x" style="left: 0px; bottom: 0px;">'+
				'<div class="ps__thumb-x" tabindex="0" style="left: 0px; width: 0px;"></div>'+
			'</div>'+
			'<div class="ps__rail-y" style="top: 0px; right: 0px;">'+
				'<div class="ps__thumb-y" tabindex="0" style="top: 0px; height: 0px;"></div>'+
			'</div>'+
		'</div>'+		
	'</div>';*/

	
	leftMenuHtmlSet: function(el, dataset,eventArea) {
		if(eventArea == "btnFomGo"){
			var depth1 = '<li class="depth1-menu nav"style="background:#e9ecef;margin-top: 1px;width: 98%;"> <a style="width:90%;background-color: #e9ecef; color: black; border: #e9ecef;"href="##{id}" data-path="#{htmlPath}" data-param="#{param}" name="#{name}" class="w-inline-block navlink active"><div class="w-icon fa #{icon} icon"></div><div class="textarea"><div class="textblock">#{name}</div></div></a><a class="close-img2"style="left: -3%;top: 14px;"></a><div></div></li>';
		}
		else{
			var depth1 = '<li class="depth1-menu nav"style="margin-top: 1px;width: 98%;"> <a style="background-color: #e9ecef; color: black; border: #e9ecef;"href="##{id}" data-path="#{htmlPath}" data-param="#{param}" name="#{name}" class="w-inline-block navlink active"><div class="w-icon fa #{icon} icon"></div><div class="textarea"><div class="textblock">#{name}</div></div></a> </li>';
		}
		var depth1_parent = '<li class="depth1-menu w210">'+
								'<div class="w-dropdown menu-sam-width dropdownmenu" style="max-width: 100%;">'+
									'<div id="#{id}" class="lv1Menu w-dropdown-toggle menu-sam-width navlink">'+
										'<div class="textblock dptext">#{name}</div>'+
										'<div class="w-icon fa fa-angle-down icon right"></div>'+
										'<div class="w-icon fa #{icon} icon left"></div>'+
									'</div>'+
									'<nav class="lv1MenuList w-dropdown-list header-nav dropdownlist">'+
										'<ul class="depth2 depth1 menusub depth2">'+
										
										'</ul>'+
									'</nav>'+
								'</div>'+
							'</li>';
		var depth1_child = '<li class="navitem">'+
								'<a href="##{id}" data-path="#{htmlPath}" data-param="#{param}" name="#{name}" class="w-inline-block navitemlink"><div class="textblock">#{name}</div></a>'+
							'</li>';
		var depth2_parent = 
			'<li class="w210">'+
				'<div class="w-dropdown menu-sam-width dropdownbox" style="max-width: 100%;">'+
					'<div id="#{id}" class="lv2Menu w-dropdown-toggle menu-sam-width navlink dpmenu" style="padding-top:5px;">'+
						'<div class="textblock top8">#{name}</div>'+
						'<div class="menuicon">'+
							'<div class="line5"></div>'+
							'<div class="line6"></div>'+
						'</div>'+
					'</div>'+
					'<nav class="lv2MenuList w-dropdown-list header-nav dropdownlist">'+
						'<ul class="depth2 depth2 depth1" style="position: relative;">'+
								// 리스트 추가 부분
						'</ul>'+
					'</nav>'+
				'</div>'+
			'</li>';
		
		var depth2_child = 
			'<li class="w210">'+
				'<a href="##{id}" data-path="#{htmlPath}" data-param="#{param}" name="#{name}" class="w-clearfix w-inline-block navitemlink grey">'+
					'<div class="w-clearfix lineicon">'+
						'<div class="line1"></div>'+
						'<div class="line2 first"></div>'+
						'<div class="line2"></div>'+
					'</div>'+
					'<div class="textblock">#{name}</div>'+
				'</a>'+
			'</li>';
		// 1레벨만, 1레벨 하위
		
		var $el = $(el).find("ul.depth1");
		$el.html("");
		for(var i = 0; i < dataset.length; i++) {
			var data = dataset[i];
			if(data.hide) { continue; }
			data.child = data.child || [];
			if(data.child == null || data.child.length < 1) {
				var tmp = depth1.replace(/#{id}/gi, data.menuId);
//				tmp = tmp.replace(/#{url}/gi, data.url + (data.param ? "?" + data.param : ""));
//				tmp = tmp.replace(/#{url}/gi, data.id);
				tmp = tmp.replace(/#{htmlPath}/gi, data.url);
				tmp = tmp.replace(/#{param}/gi, data.param ? "?" + data.param : "");
				tmp = tmp.replace(/#{icon}/gi, data.icon);
				tmp = tmp.replace(/#{name}/gi, data.menuNm);
				$el.append(tmp);
			} else {
				var tmp = depth1_parent.replace(/#{id}/gi, data.menuId);
				tmp = tmp.replace(/#{icon}/gi, data.icon);
				tmp = tmp.replace(/#{name}/gi, data.menuNm);
				var $tmp = $(tmp);
				for(var j = 0; j < data.child.length; j++) {
					var dataChild = data.child[j];
					if(dataChild.hide) { continue; }
					if(dataChild.child == null || dataChild.child.length < 1) {
						var tmp_child = depth1_child.replace(/#{id}/gi, dataChild.menuId);
//						tmp_child = tmp_child.replace(/#{url}/gi, dataChild.url + (dataChild.param ? "?" + dataChild.param : ""));
//						tmp_child = tmp_child.replace(/#{url}/gi, dataChild.id);
						tmp_child = tmp_child.replace(/#{htmlPath}/gi, dataChild.url);
						tmp_child = tmp_child.replace(/#{param}/gi, dataChild.param ? "?" + dataChild.param : "");
						tmp_child = tmp_child.replace(/#{name}/gi, dataChild.menuNm);
						$tmp.find(".depth2.depth1.menusub").append(tmp_child);
					} else {
						var tmp_depth2 = depth2_parent.replace(/#{id}/gi, dataChild.menuId);
						tmp_depth2 = tmp_depth2.replace(/#{name}/gi, dataChild.menuNm);
						var $tmp_depth2 = $(tmp_depth2);
						for(var k = 0; k < dataChild.child.length; k++) {
							var dataChild2 = dataChild.child[k];
							if(dataChild2.hide) { continue; }
							var tmp_depth2_child = depth2_child.replace(/#{id}/gi, dataChild2.menuId);
//							tmp_depth2_child = tmp_depth2_child.replace(/#{url}/gi, dataChild2.url + (dataChild2.param ? "?" + dataChild2.param : ""));
//							tmp_depth2_child = tmp_depth2_child.replace(/#{url}/gi, dataChild2.id);
							tmp_depth2_child = tmp_depth2_child.replace(/#{htmlPath}/gi, dataChild2.url);
							tmp_depth2_child = tmp_depth2_child.replace(/#{param}/gi, dataChild2.param ? "?" + dataChild2.param : "");
							tmp_depth2_child = tmp_depth2_child.replace(/#{name}/gi, dataChild2.menuNm);
							$tmp_depth2.find(".dropdownbox .depth2.depth1").append(tmp_depth2_child);
						}
						$tmp.find(".depth2.depth1.menusub").append($tmp_depth2);
					}
				}
				$el.append($tmp);
			}
		}
	},

	leftMenuEventSet: function() {
		$("a.navlink, a.navitemlink").removeClass("active");

		// 좌측 1레벨 버튼
		$(document).on("click", ".lv1Menu", function(e) {
			//e.stopPropagation();
			
			if($(this).next().is(":visible")) {
				$(".is-show").removeClass("is-show");
				$(".active").removeClass("active");
				$(this).find(".fa-angle-up").removeClass("fa-angle-up").addClass("fa-angle-down");
			} else {
				$(".is-show").removeClass("is-show");
				$(".active").removeClass("active");
				$(".fa-angle-up").removeClass("fa-angle-up").addClass("fa-angle-down");
				
				$(this).find(".fa-angle-down").removeClass("fa-angle-down").addClass("fa-angle-up");
				$(this).parent().find(".lv1MenuList").addClass("is-show");
				$(this).addClass("active");
				$(".line6").show();
			}
			

			
		});
		
		// 좌측 2레벨 버튼
		$(document).on("click", ".lv2Menu", function() {

			if($(this).next().is(":visible")) {
				$(".lv2MenuList.is-show").removeClass("is-show");
				$(".line6").show();
			} else {
				$(".lv2MenuList.is-show").removeClass("is-show");
				$(".line6").show();
				$(this).parent().find(".lv2MenuList").addClass("is-show");
				$(this).find(".line6").hide();
			}
			
		});
		// 텝선택
		$(document).on("click", ".main-header-tab-item", function(e) {
			var menuId    = $('#'+e.target.id).attr("href").slice(1);
			var dataParam = $('#'+e.target.id).attr("data-param");
			var url       = $('#'+e.target.id).attr("data-path");
			
			   $('.tabpane').hide();
			   $(".main-tab").removeClass('active'); 
			   $('#'+e.target.id).addClass('active');
			   window.location.hash = '#'+ menuId;
			   $("#"+menuId).attr('src',url+".html?" + dataParam); 
			   $('#tabContentID_'+menuId).show();
			/* if($('#'+e.target.id).hasClass("active") === true){		 
				 
			 }
			 else{
				   $('.tabpane').hide();
				   $(".main-tab").removeClass('active'); 
				   $('#'+e.target.id).addClass('active');
				   window.location.hash = '#'+ menuId;
				   $("#"+menuId).attr('src',url+".html?" + dataParam); 
				   $('#tabContentID_'+menuId).show();
				   
			      //$('#'+e.target.id.split('_')[1])[0].click();
			 }*/
						 
		});
/*		// 해쉬태그 이동(탭이동)
		$(window).bind('hashchange', function (e) {
			var topMenuTab = $("#tabgroup").children();
			var hash = window.location.hash.slice(1);//새탭에서 새로운 메뉴 클릭시 현재url 
			if (hash == undefined || hash == ""){
				window.location.hash = "MAIN";
			}
			if(tabChange=="Y" && isClickMenu=="N"){
				hash = sessionStorage.getItem("preLocation"); 						
				tabChange = "N";				
			}
			else if($("#btnTabReset").hasClass("active")){
				        hash = "MAIN";
				       $("#btnTabReset").removeClass('active');         	
			}
			else if($("#notiConfirmBtn").hasClass("disabled")){
				         hash = sessionStorage.getItem("preLocation"); 
				         $("#notiConfirmBtn").removeClass('disabled');  
		    }
			else{
				       hash = window.location.hash.slice(1);
			}
				  
					    
//			hash = hash.replace(/\//gi, "___");
			
		    $(".footernav").html("");
		    if(hash != "undefined"){
			    var lev1 = $(".w-nav a[href='#"+hash+"']").closest(".w-dropdown").find(".w-dropdown-toggle .textblock").text();
			    var lev2 = $(".w-nav a[href='#"+hash+"']").find(".textblock").text();
			    $(".footernav").append('<a href="#" class="w-inline-block btnnav"><div class="textblock">' + lev1 + '</div><div class="w-icon fa fa-angle-right icon l3"></div></a>');
			    $(".footernav").append('<a href="#" class="w-inline-block btnnav"><div class="textblock">' + lev2 + '</div><div class="w-icon fa fa-angle-right icon l3"></div></a>');
		    }
		    
		    hash = hash.replace("#", "");
		    $(".tabcontent .tabpane").hide();
		    $(".tabcontent .tabpane").addClass("none");
		    
		    $("[id='tabContentID_" + hash + "']").show();
		    $("[id='tabContentID_" + hash + "']").removeClass("none");
		    
		    $(".w-tab-menu .tablink").removeClass("w--current").removeClass("first");
		    
		    $(".w-tab-menu a[href='#"+hash+"']").addClass("w--current").addClass("first");
		    menuColor();
		    if($("#tabgroup").height() > 30 && $("#tabID_" + hash).position().top > 30) {
		    	for(var i = 0; i < 999; i++ ) {
		    		if($("#tabID_" + hash).position().top < 30) {
		    			break;
		    		}
		    		$("#btnTabLeft")[0].click();
//		    		$("#tabgroup").prepend($("#tabID_" + hash));
//		    		$("#tabgroup").prepend($("#tabID_MAIN"));
		    	}
			}
		    if($("[id='tabContentID_" + hash + "'] iframe").get(0) != undefined){
		    	$($("[id='tabContentID_" + hash + "'] iframe").get(0).contentWindow).resize();
		    }
		    
		});*/
		// 메뉴 선택
		$(document).on("click", ".slide-item", function(e) {
			/*if($('#mainPageContent').children() != undefined){
				$('#mainPageContent').children().remove();	
			}*/
			var menuId   = $(this).attr("href").slice(1);	
			isClickMenu = "Y";
			var tabHead =      '<li class="main-header-tab-item">'+
				                 '<a id="tabID_#{id}" href="##{id}" data-path="#{data-path}" data-param="#{data-param}" class="main-tab active" data-bs-toggle="tab">'+
				                   '<span>'+
				                   '</span>#{name}<i id="closeTabMain" class="fe fe-x me-1"></i></a>'+
							    '</li>';
							
			var tabContent = '<div id="tabContentID_#{id}" data-w-tab="Tab#{id}" class="w-tab-pane w--tab-active tabpane">'
				+'<iframe id ='+menuId+' src="#{url}" style="width:100%; height:100%; border:0px;"></iframe>'
				+'</div>';
			
			var name     = $(this).attr("name");
			var id       = $(this).attr("href").replace("#", "");
			
			var dataParam = $(this).attr("data-param");
			var param = $(this).attr("data-param");
			var realDate = "&n=" + new Date().getTime();
			param = param == "" ? "?id=" + id + realDate : param + "&id=" + id + realDate;

			var href= $(this).attr("data-path");
			
			if($("[id='tabID_" + id + "']").length < 1 ) { //탭없으면 
				$('.tabpane').hide();
				if($("#mainPageTabContent").children()[1]==undefined ){
					targetTab = 'MAIN';
				}
				
				else{
					  targetTab = $("#mainPageTabContent").children()[1].id.replace('tabID_',"");
				}
				 
				if(75<=((totalTabWidth+$("[id='tabID_" + targetTab + "']").width())/$("#tabgroup").width())*100){	
					totalTabWidth = totalTabWidth - $("[id='tabID_" + targetTab + "']").width();
					$("[id='tabID_" + targetTab + "'], [id='tabContentID_" + targetTab + "']").remove();				

				}
				$('.main-tab').removeClass('active');
				$("#mainPageTabContent").append(tabHead.replace(/#{id}/gi, id).replace(/#{name}/gi, name).replace(/#{data-path}/gi, href).replace(/#{data-param}/gi, dataParam));
				totalTabWidth = totalTabWidth+$("[id='tabID_" + id + "']").width();
/*				console.log("더한화면:"+id);
				console.log("더한 너비:"+$("[id='tabID_" + id + "']").width());
				console.log("더하고 너비:"+totalTabWidth);*/
				//var publishSrc = "";
				//$("iframe").attr('src',publishSrc + href + ".html" + param);
//				if(location.href.indexOf("publish") > -1) {
//					publishSrc =location.href.split("publish")[0] + "publish/";
//				}
				
		
					$("#mainPageContent").append(tabContent.replace(/#{id}/gi, id).replace(/#{url}/gi, href+".html "));
					$("[id='tabContentID_" + id + "'] iframe").on("load", function(){
						$($("[id='tabContentID_" + id + "'] iframe")[0].contentDocument).find("body").css("background", "inherit");
						
					});
				
			/*		 $("iframe").attr('src',href+".html?" + dataParam); //경로리로드
*/			}
			else{ //텝있으면
				 if($("[id='tabID_" + id + "']").hasClass("active") === true){
						// $("#btnTabReset").removeClass('active');  
						 //$('#mainPageContent').children().remove();		
					     //$('#tabContentID_'+menuId).show();
						// $("iframe").attr('src',href+".html?" + dataParam); //경로리로드
					 }
					 else{
						 $('.tabpane').hide();
						 $(".main-tab").removeClass('active'); 
						 $("[id='tabID_" + id + "']").addClass('active');
						 window.location.hash = '#'+ menuId;	
						 $("#"+menuId).attr('src',href+".html?" + dataParam); 						 
						 $('#tabContentID_'+menuId).show();
						 //$('#mainPageContent').children().remove();		
						// $("iframe").attr('src',href+".html?" + dataParam); //경로리로드
						

					 }
				
				//$("[id='tabID_" + id + "']").click();
			}
				
		});
	
		// 메뉴 선택
		$(document).on("click", "a.navlink, a.navitemlink", function() {
			isClickMenu = "Y";
			var tabHead = '<a id="tabID_#{id}" href="##{id}" data-path="#{data-path}" data-param="#{data-param}" data-w-tab="Tab 1" class="w-tab-link w-inline-block tablink">'+
				'<div class="textblock">#{name}</div>'+
				'<div class="close-img"></div>'+
			'</a>';
			var tabContent = '<div id="tabContentID_#{id}" data-w-tab="Tab#{id}" class="w-tab-pane w--tab-active tabpane">'
				+'<iframe src="#{url}" style="width:100%; height:100%; border:0px;"></iframe>'
				+'</div>';
			
//			var id = $(this).attr("id");
			var name = $(this).attr("name");
			var id = $(this).attr("href").replace("#", "");
			
			var dataParam = $(this).attr("data-param");
			var param = $(this).attr("data-param");
			var realDate = "&n=" + new Date().getTime();
			param = param == "" ? "?id=" + id + realDate : param + "&id=" + id + realDate;
//			var param = id.split("?");
//			var href = param[0];
			var href= $(this).attr("data-path");
//			param = param[1] ? "?" + param[1] : "";
//			href = href.replace(/\//gi, "___");
			
			if($("[id='tabID_" + id + "']").length < 1 ) {
				if($("#tabgroup").children()[1]==undefined ){
					targetTab = 'MAIN';
				}
				
				else{
					  targetTab = $("#tabgroup").children()[1].id.replace('tabID_',"");
				}
				 
				if(75<=((totalTabWidth+$("[id='tabID_" + targetTab + "']").width())/$("#tabgroup").width())*100){	
					totalTabWidth = totalTabWidth - $("[id='tabID_" + targetTab + "']").width();
					$("[id='tabID_" + targetTab + "'], [id='tabContentID_" + targetTab + "']").remove();				
/*					console.log("지운화면:"+targetTab);
					console.log("지운 너비:"+$("[id='tabID_" + targetTab + "']").width());
					console.log("지우고 너비:"+totalTabWidth);*/
				}
				$("#tabgroup").append(tabHead.replace(/#{id}/gi, id).replace(/#{name}/gi, name).replace(/#{data-path}/gi, href).replace(/#{data-param}/gi, dataParam));
				totalTabWidth = totalTabWidth+$("[id='tabID_" + id + "']").width();
/*				console.log("더한화면:"+id);
				console.log("더한 너비:"+$("[id='tabID_" + id + "']").width());
				console.log("더하고 너비:"+totalTabWidth);*/
				var publishSrc = "";
				//$("iframe").attr('src',publishSrc + href + ".html" + param);
//				if(location.href.indexOf("publish") > -1) {
//					publishSrc =location.href.split("publish")[0] + "publish/";
//				}
				
				$(".tabcontent").append(tabContent.replace(/#{id}/gi, id).replace(/#{url}/gi, publishSrc + href + ".html" + param));
				$("[id='tabContentID_" + id + "'] iframe").on("load", function(){
					$($("[id='tabContentID_" + id + "'] iframe")[0].contentDocument).find("body").css("background", "inherit");
				});
				/*$(".tabcontent").append(tabContent.replace(/#{id}/gi, id));
				window.open(publishSrc + href + ".html" + param);*/
				
			}
		});
		$($(".arrowbutton")[0]).attr("id", "btnTabLeft");
		$($(".arrowbutton")[1]).attr("id", "btnTabRight");
		$(".arrowbutton").on("click", function() {
			if($("#tabgroup").height() < 30) {
				return;
			}
			var id = $(this).attr("id");
			switch(id) {
				case "btnTabLeft":
					$("#tabgroup").append($("a.tablink:not(#tabID_MAIN):first"));
					break;
				case "btnTabRight":
					$("#tabgroup").prepend($("a.tablink:not(#tabID_MAIN):last"));
					$("#tabgroup").prepend($("#tabID_MAIN"));
					break;
			}
		});
		$(".tabsmenu .w-tab-link").remove();
		//$(".tabsmenu").append('<div id="tabgroup"></div>');
		var tabGroup = '<div class="tab-menu-heading">'+
		  '<div class="tabs-menu">'+ 
		   '<ul id ="mainPageTabContent" class="nav panel-tabs panel-info"></ul>'+
		   '</div>'+
		   '</div>';
		$("#mainPageTab").append(tabGroup); 
		//$(".mainPageTab").append('<div id="tabgroup"></div>');		
		$(".tabcontent").html("");

		// 좌측 숨기기
		$(document).on("click", ".navicon-left", function() {
			var toggle = $(this).attr("toggle") || "false";
			if(toggle == "true"){
				$(".contentarea").width("");
				$(".w-nav").show();
				toggle = "false";
				$(".navicon-left .fa-play").addClass("fa-rotate-180");
			} else {
				$(".contentarea").width("calc(100% - 30px)");
				$(".w-nav").hide();
				toggle = "true";
				$(".navicon-left .fa-play").removeClass("fa-rotate-180");
			}
			$(this).attr("toggle", toggle);
		});
		$(".navicon-left .fa-play").addClass("fa-rotate-180");
		// 탭닫기 버튼
		$(document).on("click", "#closeTabMain", function(e){
			e.preventDefault();
			var hash = $(this).closest(".main-tab").attr("href");
			hash = hash.replace("#", "");
			if(!$("[id='tabContentID_" + hash + "']").hasClass("none")) {
//				$(".navlink:first")[0].click();
				if($(this).parent().parent().prev().children()[0] == undefined){
					if($(this).parent().parent().next().children()[0] == undefined){
						
					}
					else{
						  $(this).parent().parent().next().children()[0].click();
					}
					
				}
				else{
					$(this).parent().parent().prev().children()[0].click();
				}
				
			}
			totalTabWidth = totalTabWidth - $("[id='tabID_" + hash + "']").width();
/*			console.log("지운페이지 너비:"+$("[id='tabID_" + hash + "']").width());
			console.log("현재 너비:"+totalTabWidth);*/
			$("[id='tabID_" + hash + "']").parent().remove();
			$("[id='tabContentID_" + hash + "']").remove();
			e.stopPropagation();
			
		});
		// 탭닫기 버튼
		$(document).on("click", ".close-img", function(e){
			e.preventDefault();
			var hash = $(this).closest(".tablink").attr("href");
			hash = hash.replace("#", "");
			if(!$("[id='tabContentID_" + hash + "']").hasClass("none")) {
//				$(".navlink:first")[0].click();
				$(this).parent().prev()[0].click();
			}
			totalTabWidth = totalTabWidth - $("[id='tabID_" + hash + "']").width();
/*			console.log("지운페이지 너비:"+$("[id='tabID_" + hash + "']").width());
			console.log("현재 너비:"+totalTabWidth);*/
			$("[id='tabID_" + hash + "'], [id='tabContentID_" + hash + "']").remove();
			
		});
	/*	// 북마크 삭제 버튼
		$(document).on("click", ".close-img2", function(e){
			e.preventDefault();
			$(this).parent().remove();
			
		
			
		});*/
		// 첫메뉴 열기
		if($(".navlink:first")[0] == null) {
			return;
		}
		$(".navlink:first")[0].click();
		menuColor();
		$(window).trigger("hashchange");
		$(".close-img").remove();
		$(".w-tab-link").prepend('<div class="fa fa-home" style="font-size: 13px; padding-right: 3px;"></div>');
		
		function menuColor() {
			var hash = window.location.hash.slice(1);
//			hash = hash.replace(/\//gi, "___");
			var parentLev1 = $(".w-nav a[href='#"+hash+"']").closest(".w-dropdown");
//			console.log($(".w-nav a[href=#"+hash+"]"));
			var menuATag = $(".w-nav a[href='#"+hash+"']");
			$(".focused").removeClass("focused");
			menuATag.addClass("focused");
//			$(".is-show").removeClass("is-show");
//			$(".active").removeClass("active");
//			menuATag.closest(".depth1-menu").find(".lv1MenuList").addClass("is-show");
//			menuATag.closest(".depth1-menu").find(".lv1Menu").addClass("is-show");
////			$(this).parent().find(".lv1MenuList").addClass("is-show");
////			$(this).addClass("active");
//							
//			$(".lv2MenuList.is-show").removeClass("is-show");
//			$(".line6").show();
//			
//			$(this).parent().find(".lv2MenuList").addClass("is-show");
//			$(this).find(".line6").hide();
			
//			focused 
		}
	},
	dataObjConvert:function(array) {
		var obj = [];
		for(var i=0; i<array.length; i++) {
			obj.push(array[i].cols);	  
		}
		  
		return obj; 
	},
	dataSetOnOff:function(bind) {

		  if(bind.on == undefined) {
			  return bind.value;
		  }
		  
		  var array = this.dataObjConvert(bind.on);
		  var arr = [];
		  var objected = {};
		  
		  for(var i=0; i<bind.value.length; i++) {
			  objected = {}
			  for(var j=0; j<array.length; j++) {
				  objected[array[j]] = bind.value[i][array[j]];
			  }
			  arr.push(objected);
		  }
		  
		  //console.log(arr);
		  
		  return arr;
	},
	chartDataParser:function(getData){
		
		var recursive = function(obj){
    	  for(var k in obj) {
    	    if(type == "A-Type") {
    	      if(k == "markLine" || k == "markPoint") {
    	        return;
    	      }
    	      if(k == "name" && keyValue == "series" && status) {
    	          // obj[k] = legendBox[cnt]; cnt++;
    	    	  if(obj[k].length != 0) {
    	    		  legendBox[cnt] = obj[k];
    	    	  } else {
    	    		  obj[k] = legendBox[cnt];
    	    	  }
    	    	  cnt++;
    	      }
    	    }
    	    if(k == "data" && Array.isArray(obj[k])) {
    	      if(bindPaser[num] != undefined) {
    	        if(type == "A-Type") {	
    	          if(label == 1) {
    	            obj[k] = bindPaser[num]; num++;
    	            label = 2;
    	          } else if(label == 0){
    	            obj[k] = bindPaser[num]; num++;
    	          } else {

    	          }
    	        } else {
    	          if(bindPaser[num] != undefined) {
    	             obj[k] = bindPaser[num];
    	             num++;
    	          } else {
    	        	  
    	          }
    	        }
    	      }
    	    } else {
    	        if(typeof obj[k] == "object") { recursive(obj[k]); }
    	    }
    	  }
	    };
		
	    var num       = 0;
	    var cnt       = 0;
	    var label     = 0;
	    var status    = false;
	    var legendBox = [];
	    var bindPaser = [];
	    var keyValue  = "";
		var datas     = this.dataSetOnOff(getData.data);
		var type      = getData.data.key;
		var cht       = getData.chart;
	    
	    if(type == "A-Type") {

	    	for(var c in datas[0]) {
	            if(num != 0 ) { legendBox.push(c); }
	            bindPaser[num] = [];
	            num++;
	        }
	        for(var i=0; i<datas.length; i++) {
	            num = 0;
	            for(var k in datas[i]) {
	            	bindPaser[num].push(datas[i][k]);
	            	num++;
	            }
	        }
	        if(cht.hasOwnProperty("legend")) {
	        	status = true;
	        	cht.legend.data = legendBox;
	        } else if(cht.series[0].name != undefined) {
	        	status = true;
	        }
	        
	        num = 0;
	        for(var key in cht) {
	          switch(key) {
	            case "angleAxis": label = 1; recursive(cht[key]); break;
	            case "radiusAxis": label = 1; recursive(cht[key]); break;
	            case "xAxis": label = 1; recursive(cht[key]); break;
	            case "yAxis": label = 1; recursive(cht[key]); break;
	            case "series": label = 0; keyValue = key; recursive(cht[key]); break;
	          }
	        }

	    } else if(type == "B-Type") {
	    	
	    	legendBox[0] = [];
	        legendBox[1] = [];

	        for(a=0; a<datas.length; a++) {
	          if(datas[a].group > cnt) {
	            cnt = datas[a].group;
	          }
	        }

	        for(var b=0; b<cnt; b++) { bindPaser[b] = []; }

	        for(var e=0; e<datas.length; e++) {
	          legendBox[0].push(datas[e].name);
	          num = (datas[e].group - 1);
	          bindPaser[num].push(datas[e]);
	        }

	        jQuery.each(legendBox[0], function(k, v){ // 중복제거
	          if(jQuery.inArray(v, legendBox[1]) === -1) legendBox[1].push(v);
	        });

	        if(cht.legend != undefined) {
	            cht.legend.data = legendBox[1];
	        }
	        
	        num = 0;
	        recursive(cht.series);
	    	
	    } else {
	    	
	    	for(var o in datas[0]) {
    		  num++;
    		  if(num % 2 == 0) {
    			  bindPaser[cnt] = [];
    			  cnt++;
    		  }
	        }
	    	  
	    	for(j=0; j<datas.length; j++) {
    		  num = 0;
    		  var arr = Object.values(datas[j]);
    		  for(n=0; n<arr.length; n=n+2) {
    			 var err = [];
 				 err.push(arr[n]);
 				 err.push(arr[n+1]);
 				 bindPaser[num].push(err);
 				 num++;
    		  }
	    	}
	    	
	    	num = 0;
	    	recursive(cht.series);
	    	
	    }
	    
	    return cht;
	},
	gridNumberCount: 0,
	auiGridExcelExport: function(id, option, type) {
		option = option || {};
		var grid_id = 'temp_excel_grid' + id;
		if (type == 'templete') {
			grid_id = 'temp_excel_template_grid' + id;
		}
		grid_id += this.gridNumberCount++;
		$("body").append('<div id="temp_div_div" style="width:100%; position:fixed; height:100%; z-index: -999; top:0px"><div id="' + grid_id + '"></div></div>');
		
		//var column = $.extend(true, {}, AUIGrid.getColumnLayout(id));
		var column = option.column || AUIGrid.getColumnLayout(id);
		//var column = JSON.parse(JSON.stringify(AUIGrid.getColumnLayout(id)));
		var data = option.data || AUIGrid.getGridData(id);
		
		if(this.datasets[id] != undefined) {
			if(this.datasets[id].pagerRenderMode && option.allData) { // allData 옵션이 true이고 페이지 렌더일때 호출.
				var params = JSON.parse(JSON.stringify(this.datasets[id].pagerRenderParams));
				delete params.startPage;
				delete params.endPage;
				var datasetUrl = "/TU_Platform" + mCommon.datasets[id].dataset.url.split("TU_Platform")[1]; 
//				$.ajax({
//					url: datasetUrl,
//					data: {orderSeq: params.orderSeq, fromDate: params.fromDate, toDate: params.toDate, organizationCode: params.organizationCode, scheduleGroupCode: params.scheduleGroupCode},
//					method: "get",
//					async: false,
//					success: function(datas) {
//						data = datas;
//					}
//				});
				data = this.getDataset(mCommon.datasets[id].id + "/data", params);
			}
		}
		option.afterRequestCallback = function() { // 엑셀 만들고 호출되는 콜백함수
			//보이게 했던 칼럼들 다시 히든 처리
			$("#temp_div_div").remove();
			$(".aui-grid-export-progress-modal").remove();
			AUIGrid.destroy(grid_id);
		}
		option.progressBar = true;
		
		var columnTempleteData = {};
		column = this.excelColumnSet(column, type, columnTempleteData);
		if(type != "templete") {
			AUIGrid.create(grid_id, column, {showRowNumColumn: false});
			AUIGrid.setGridData(grid_id, data);
		} else {
			if(this.datasets[id].setting.templeteData != null && this.datasets[id].setting.templeteData.length > 50000) {
	            micaCommon.splash.hide();
	            micaCommon.messageBox({type:'warning', width:'400', height: '145',  html: '데이터의 건수가 50,000건 이상입니다.<br />다운로드를 지원하지 않습니다.'});               
	            return;
	         }
			AUIGrid.create(grid_id, JSON.parse(JSON.stringify(column)),  {showRowNumColumn: false});
			AUIGrid.clearGridData(grid_id);
			if(this.datasets[id].setting.templeteData != null && this.datasets[id].setting.templeteData.length > 0) {
				try{
					var templeteData = new Array;
					var templeteDataObj = {};
					for(var name in columnTempleteData) {
						if(columnTempleteData[name] != null && columnTempleteData[name] != "") {
							templeteDataObj[name] = columnTempleteData[name];
						}
					}
					templeteData.push(templeteDataObj);
					AUIGrid.setGridData(grid_id, templeteData);
				} catch(e) {
					console.log("templeteData 데이터형식 오류");
				}
			}
		}
		micaCommon.splash.hide();
		AUIGrid.exportToXlsx(grid_id, option);
		$(".aui-grid-export-progress-modal").height("100%");
		$("#" + id).children().append($(".aui-grid-export-progress-modal"));
	},
	excelColumnSet: function(columns, type, columnTempleteData) {
		var exportColumns = [];
		
		$("head").append("<style>.back-red{background-color: #ff8000;}</style>");
		
		for(var i = 0; i < columns.length; i++) {
			if (columns[i].dataField != "Edit") {
				if(type != "templete") {
					if ((typeof columns[i].excelHide == 'undefined') ? true : columns[i].excelHide) { // HIDE가 true일때 보여줌, false일때 안보여줌 반대임.
						columns[i].visible = true;
						exportColumns.push(columns[i]);
					}
				} else {
					if ((typeof columns[i].excelTempleteHide == 'undefined') ? true : columns[i].excelTempleteHide) {
						if(columns[i].excelTempleteHide != false) {
							columns[i].visible = true;
							if(columns[i].require) {
								columns[i].headerStyle = "back-red";
							}
							exportColumns.push(columns[i]);
							columnTempleteData[columns[i].dataField] = columns[i].columnTempleteData;
						}
					}
				}
			}
		}
		return exportColumns;
	},
	comboBoxClickCall: function(el, callFnc) {
		// 클릭 했을때 뒤 callFnc를 호출한다.
		$(el).on('click', function() {
			var that = this;
			$(that).val("Loading...");
			callFnc(function() {
				$(that).val("");
				if($(that)["0"].attributes["aria-disabled"] != true) {
					$(that).jqxComboBox("open");
				}
			});
			$(el).off("click");
		});
	},
	comboBoxSearchCall: function(el, comboOptions, options) {
		el = $(el);
//		var options = {local: "", textName : "name", valueName : "code", readonly : false};
//		options.url = "";
//		options.keyName = "key";
//		options.minLength = 4; 
		// option
		// 	- url : 호출할 url
		//  - keyName : 검색조건을 보낼 키이름 비우면 key 로 보냄
		//  - minLength : 최소 검색 글자수
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
//			if(search == "") {
//				options.local = [];
//				micaCommon.comboBox.set(el, comboOptions, options);
//			} else {
//				if(search.length < minLength) { return; }
//				param[keyName] = search;
//				$.get(url, param, function(data) {
//					options.local = data;
//					micaCommon.comboBox.set(el, comboOptions, options);
//					$(el).val(search);
//				});
//			}
		}
		
		micaCommon.comboBox.set(el ,comboOptions, options);
		$(el).find(".jqx-combobox-input").attr("placeholder", "input over " + minLength);
		$(el).find(".jqx-combobox-input").on("keyup", function(e) {
			if(e.keyCode == 13) {
				var search = $(this).val();
				if(search == "") {
					options.local = [];
					micaCommon.comboBox.set(el, comboOptions, options);
				} else {
					if(search.length < minLength) {
						$(el).find(".jqx-combobox-input").attr("placeholder", "input over " + minLength);
						return;
					}
					param[keyName] = search;
					$.get(url, param, function(data) {
						options.local = data;
						micaCommon.comboBox.set(el, comboOptions, options);
						$(el).val(search);
						if(data.length < 1) {
							$(el).find(".jqx-combobox-input").attr("placeholder", "no data");
							$(el).val("");
						}
					});
				}
			}
		});
	},
	messageBoxSet: function() {
		var html = 
			'<div id="MOMmessageBox" class="modal">'+
				'<div class="panel messagebox w500 modal-dialog" style="height: inherit; float: inherit;">'+
					'<div data-panelheader="n" panelheader="n" class="panel-heading hide">'+
					'	<h5>Panel</h5>'+
					'</div>'+
					'<div data-paneltoolbar="n" paneltoolbar="n" class="panel-toolbar hide"></div>'+
					'<div class="panel-body panel-body">'+
					'	<div class="panelbody">'+
					'		<div class="w-clearfix panelheader panel-heading modal-type">'+
					'			<div tmptabid="one" data-undefined="fa-ban" class="w-icon fa fa-ban icon r5"></div>'+
					'			<div class="textblock titleText">#{title}</div>'+
					'			<a href="#" class="w-inline-block bntpopclose"></a>'+
					'		</div>'+
					'		<div class="searcharea pop">'+
					'			<div class="message html">#{html}</div>'+
					'		</div>'+
					'	</div>'+
					'	<div class="panelfooter">'+
					'		<a id="pCancelBtn" href="#" class="w-inline-block btnpop modal-type ">'+
					'			<div class="textblock">확인</div>'+
					'		</a>'+
					'	</div>'+
					'</div>'+
					'<div panelfooter="n" class="panel-footer hide" data-panelfooter="n"></div>'+
				'</div>'+
			'</div>';
		
		$("body").append(html);
		$("#MOMmessageBox #pCancelBtn, #MOMmessageBox .bntpopclose").click(function() {
			$("#MOMmessageBox").micaModal("hide");
		})
	},
	messageBox: function(options) { 
		// ({width:500, height:145, type:"success, warning, fail", subTitle:"Sub Title", title : "Title", html : "가나다라마바사", okButton : { text: "ok", after : function(){ alert('ok'); }  }});
		if(!this.messageSetFlag) { this.messageBoxSet(); this.messageSetFlag = true }
		options = options || {};
		var width = options.width;
		var hieght = options.height;
		var type = options.type;
		var title = options.title;
		var html = options.html;
		var after = options.after;

		$("#MOMmessageBox .titleText").html(title || type);
		$("#MOMmessageBox .html").html(html);
		$("#MOMmessageBox").micaModal("show");
		$("#MOMmessageBox").css("z-index", 999999999999);
	},
	gridPopupHtml: {
		modal : function() {
			//var locale = sessionStorage.getItem('locale');
			var html = 
			    '<div id="#{modalId}" class="modal gridPopup">'+
			    '    <div id="panel" class="panel messagebox col2">'+
			    '        <div class="panel-body panel-body">'+
			    '            <div class="panelbody">'+
			    '                <div class="w-clearfix panelheader panel-heading">'+
			    '                    <div tmpTabId="two" data-undefined="fa-edit" class="w-icon fa fa-edit icon r5"></div>'+
			    '                    <div class="textblock">#{modalTitle}</div>'+
			    '                    <a href="#" class="w-inline-block bntpopclose pop-close-Btn"></a>'+
			    '                </div>'+
			    '                <div class="searcharea pop">'+
			    '                    <div class="w-form">'+
			    '                        <form name="form" id="form#{modalId}" class="form-inline" data-name="Form">'+
			    '#{context}'+
			    '                        </form>'+
			    '                    </div>'+
			    '                </div>'+
			    '            </div>'+
			    '            <div class="panelfooter">'+
			    '                <a id="#{modalId}SaveBtn" href="#" class="w-inline-block btnpop pop-save-Btn">'+
			    '                    <div class="textblock">' + (locale == 'KR' ? '저장' : language.getValueFromKorean('저장')) + '</div>'+
			    '                </a>'+
			    '                <a id="#{modalId}CancelBtn" href="#" class="w-inline-block btnpop grey pop-close-Btn">'+
			    '                    <div class="textblock">' + (locale == 'KR' ? '취소' : language.getValueFromKorean('취소')) + '</div>'+
			    '                </a>'+
			    '            </div>'+
			    '        </div>'+
			    '        <div panelFooter="n" class="panel-footer hide" data-panelFooter="n"></div>'+
			    '    </div>'+
			    '</div>';
			return html;
		},
		row: function() {
			var html = 
				'<div class="b5">'+
				'    <div class="w-row">'+
				'        '+
				'    </div>'+
				'</div>';
			return html;
		},
		col1: function() {
			var html = 
				'<ul class="w-list-unstyled">'+
				'   <li>'+
				'       <div>'+
				'           <div id="#{labelId}" class="col1-label labelbox" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">'+
				'               <div class="circle #{circle_require}"></div>'+
				'               <div class="textblock #{textblock_require}" title="#{headerText}">#{headerText}</div>'+
				'           </div>'+
				'       	#{editBox}'+
				'       </div>'+
				'   </li>'+
				'</ul>';
			return html;
		},
		col2: function() {
			var html = 
				'<div class="w-col w-col-6">'+
				'    <div class="w-clearfix listitem">'+
				'	    <div class="w-col w-col-4">'+
				'   	     <div id="#{labelId}" class="labelbox" style="width:100%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">'+
				'	            <div class="circle #{circle_require}"></div>'+
				'	            <div class="textblock #{textblock_require}" title="#{headerText}">#{headerText}</div>'+
				'	        </div>'+
				'       </div>'+
				'	    <div class="w-col w-col-7">'+
				'       	#{editBox}'+
				'       </div>'+
				'    </div>'+
				'</div>';
			return html;
		},
		col3: function() {
			var html =
				'<div class="w-col w-col-4">'+
				'    <div class="w-clearfix listitem">'+
				'	    <div class="w-col w-col-5">'+
				'   	     <div id="#{labelId}" class="labelbox" style="width:100%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">'+
				'	            <div class="circle #{circle_require}"></div>'+
				'	            <div class="textblock #{textblock_require}" title="#{headerText}">#{headerText}</div>'+
				'	        </div>'+
				'       </div>'+
				'	    <div class="w-col w-col-6">'+
				'       	#{editBox}'+
				'       </div>'+
				'    </div>'+
				'</div>'
			return html;
		},
		input: function() {
			var html = '<input style="float:right;" maxlength="256" id="#{id}" input-type="text" type="text" class="w-input fieldbox #{wSize}" autocomplete="off"></input>';
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
		}
		
	},
	gridPopupSet: function(id, option, gridColumns) {
		var widthSizes = {1 : 400, 2 : 700, 3 : 776};
		var wSizeClass = {1 : "w190", 2 : "w190", 3 : "w120"}
		var colCount = option.colCount || 2;
		var width = option.width || widthSizes[colCount];
		var wSize = wSizeClass[colCount];
		
		//console.log('option.title = ' + option.title);
		var modalTitle = option.title || "input Title";
		var modalId = id + "ModalPop";
		var modal = this.gridPopupHtml.modal();
		
		modal = modal.replace(/#{modalId}/gi, modalId).replace("#{modalTitle}", modalTitle);
		var rowColCount = 0;
		
		var rowHtml = "";
		var $row = null;
		var col1TextArea = "";
		for(var i = 0; i < gridColumns.length; i++) {
			var column = gridColumns[i];
			if(column.popupType) {
				if(rowColCount == 0) {
					$row = $(this.gridPopupHtml.row());
				}
				
				if(column.headerText == undefined) {
					column.headerText = column.dataField;
				}
				
				var col = this.gridPopupHtml["col" + colCount]().replace(/#{headerText}/gi, column.headerText.replace(/<br>/gi, "")).replace(/#{labelId}/gi, column.dataField + "Label");
				if(column.require) {
					col = col.replace(/#{circle_require}/gi, "bg-orange").replace(/#{textblock_require}/gi, "orange");
				} else {
					col = col.replace(/#{circle_require}/gi, "").replace(/#{textblock_require}/gi, "");
				}
				var editBoxHtml = ""; 
				switch(column.popupType) {
					case "input":
						editBoxHtml = this.gridPopupHtml.input().replace("#{wSize}", wSize);
						col = col.replace("#{editBox}", editBoxHtml.replace("#{id}", column.dataField + "Modal"));
						$row.find(".w-row").append(col);
						rowColCount++;
						break;
					case "select":
						editBoxHtml = this.gridPopupHtml.select().replace("#{wSize}", wSize);;
						col = col.replace("#{editBox}", editBoxHtml.replace("#{id}", column.dataField + "Modal"));
						$row.find(".w-row").append(col);
						rowColCount++;

						break;
					case "textarea":
						var col1 = this.gridPopupHtml["col1"]().replace(/#{headerText}/gi, column.headerText.replace(/<br>/gi, "")).replace(/#{labelId}/gi, column.dataField + "Label");
						col1TextArea += col1.replace("#{editBox}", this.gridPopupHtml.textarea().replace("#{id}", column.dataField + "Modal"));
						break;
					case "calendar":
						editBoxHtml = this.gridPopupHtml.calendar().replace("#{wSize}", wSize);
						col = col.replace("#{editBox}", editBoxHtml.replace("#{id}", column.dataField + "Modal"));
						$row.find(".w-row").append(col);
						rowColCount++;
						break;
				}
				if(rowColCount == colCount) {
					rowColCount = 0;
					rowHtml += $row[0].outerHTML;
					$row = null;
				}
			}
		}
		if($row) {
			rowHtml += $row[0].outerHTML;
		}
		rowHtml += col1TextArea;
		modal = modal.replace("#{context}", rowHtml);
		$("body").append(modal);
		
		$("#" + modalId).find(".panel").width(width || "");
		var select = $("#" + modalId).find("select");
		for(var i = 0; i < select.length; i++) {
			$select = $(select[i]);
			var comboOption = {width: Number($select.css("width").replace("px","")) - 2, height: Number($select.css("height").replace("px", "")) - 2};
			$select.removeClass("w-select").css("float", "right");
//			$select.jqxComboBox(option);
			micaCommon.comboGridBox.set($select, comboOption, {local: []})
		}
		$("#" + modalId).find(".jqx-combobox").css("float", "right");
		
		var calendar = $("#" + modalId).find("[input-type=datepicker]");
		calendar.datetimepicker({
			timepicker:false, 
			format:'Y-m-d'
		});
		return modalId; 
	},
	gridPopupSizeSet: function(id) {
		var $popup = $("#" + id);
		var labelWidth = $popup.find(".listitem .w-col.w-col-4, .listitem .w-col.w-col-5").width();
		var col1Size = $popup.find(".listitem .w-col.w-col-4").width() / 4;
		col1Size = col1Size < 1 ?  $popup.find(".listitem .w-col.w-col-5").width() / 5 : col1Size;
		$popup.find(".col1-label").width(labelWidth);
		$popup.find("textarea").width("calc(100% - " + (labelWidth + col1Size) + "px)");
	},
	gridModalId: {},
	gridPopCreat: function(id, option) {
		var gridOption = this.datasets[id].setting;
		var gridColumns = gridOption.colModel;
		if(!gridOption.gridProps.popupSetting) {
			console.log("Widget PopupSetting 필요");
			return;
		}
		
		var modalId = this.gridModalId[id];
		if(modalId == null) {
			if(option == null) { return alert("option null"); }
			modalId = this.gridPopupSet(id, option, gridColumns);
			this.gridModalId[id] = modalId;
			this.gridPopEvent(modalId);
		}
		//mCommon.authElement();
		return modalId;
	},
	gridPopClear: function(id){
		var modalId = this.gridModalId[id];
		$("#" + modalId).remove();
	},
	gridPopAdd: function(id, option) {
		var modalId = this.gridPopCreat(id, option);
		this.gridPopDataSet(modalId, {});
		$("#" + modalId).micaModal("show");
		this.gridPopupSizeSet(modalId);
		return modalId;
	},
	gridPopEdit: function(id, option) {
		// option
		//    - rowNum : 수정할 row 번호, 비었으면 선택된 rowNum, 단 멀티선택은 안됨.
		option = option || {};
		var modalId = this.gridPopCreat(id, option);
		var rowNum = option.rowNum;
		var selectItems = [];
		if(rowNum != null) {
			selectItems[0] = {item: AUIGrid.getItemByRowIndex(id, rowNum)};
		} else {
			selectItems = AUIGrid.getSelectedItems(id); // 배열
		}
		
		if(selectItems.length == 1) {
			this.gridPopDataSet(modalId, selectItems[0].item);
			$("#" + modalId).micaModal("show");
			this.gridPopupSizeSet(modalId);
		}
		return modalId;
	},
	gridPopHide: function(id) {
		var modalId = this.gridModalId[id];
		$("#" + modalId).micaModal("hide");
	},
	gridFormGetParam: function(id) {
		var modalId = this.gridModalId[id];
		var $modal = $("#" + modalId);
		var $objs = $modal.find("input[id], div.jqx-combobox, textarea[id]");
		var result = {};
		for (var i = 0; i < $objs.length; i++) {
			var $obj = $($objs[i]);
			var id  = $obj.attr("id");
			result[id.substr(0, id.length-5)] = $obj.val();
		}
		return result;
	},
	gridPopDataSet: function(modalId, item) {
		var $objs = $("#" + modalId).find("input[id], div.jqx-combobox, textarea[id]");
		for(var i = 0; i < $objs.length; i++) {
			var $obj = $($objs[i]);
			var key = $obj.attr("id").replace("Modal", "");
			$obj.val(item[key] || "");
			if($obj.hasClass("jqx-combobox") && item[key] == null) {
				$obj.jqxComboBox("clearSelection");
			}
		}
	},
	gridPopEvent: function(modalId) {
		$("#" + modalId).find(".pop-close-Btn").on("click", function() {
			$("#" + modalId).micaModal("hide");
		});
		
//		$("#" + modalId).find(".pop-save-Btn").on("click", function() {
//			$("#" + modalId).micaModal("hide");
//		});
	},
	getSearchParam: function() {
		var param = location.search.replace("?","");
		if(param == "") { return {}; }
		eval("var search = {" + param.replace(/=/gi, ':"').replace(/&/gi, '",') + '"' + "}");
		return search;
	},
	formGetParam: function(form) {
		var $form = $(form);
		var $objs = $form.find("input[id], div.jqx-combobox, textarea[id]");
		var result = {};
		for (var i = 0; i < $objs.length; i++) {
			var $obj = $($objs[i]);
			result[$obj.attr("id")] = $obj.val();
		}
		return result;
	},
	parentIdHierarchy: function(data, parentKey, childKey, keyId) {
		parentKey = parentKey || "parentMenuId";
		childKey = childKey || "child";
		keyId = keyId || "menuId";
		var result = [];
		var tmp =[];
		var nameSeq = {};
		
		var keyValueObj = this.keyValueSet({key : keyId, data:data});		
		for(var key in keyValueObj) {
			var obj = keyValueObj[key];
		
			var parentId = obj[parentKey];
			var itemLevel = obj["sortNo"];
			
			if(parentId == "root" || itemLevel == '1') {
				result.push(obj);
			}
			else { 
				if(keyValueObj[parentId]) {
					if(keyValueObj[parentId][childKey] == null) {
						keyValueObj[parentId][childKey] = [];
					} 
					keyValueObj[parentId][childKey].push(obj);
					tmp.length = 0;
					tmp.push(keyValueObj[parentId][childKey]);
					tmp[0].sort(function (a, b) {						
						return a.sortNo - b.sortNo
					});
				}
			}
		}
		result.sort(function (a, b) {
			return a.sortNo - b.sortNo
		});
		return result;
	},
	authElement : function() {
		var pageId = this.getSearchParam().id;
		var json = sessionStorage.getItem("authGroupMenuElement");
		if(json == null) {
			return;
		}
		var authGroupMenuElement = JSON.parse(sessionStorage.getItem("authGroupMenuElement"));
		var authElement = authGroupMenuElement[pageId];
		if(authElement == null) {
//			return;
			authElement = {};
		}
		var authElementIds = JSON.parse(authElement.list || "[]");
		
		var displayOrderList = [];
		$.ajax({
			url : common.contextPath() + "/mica/widgets/W201808241655314001002S9JKjGqIsjy/data?menuId=" + pageId,
			type : "GET",
			data : {planId:$("#planId").val()},
			async: false,
			success: function (data) {
				for(var i = 0; i < data.length; i++) {
					if(data[i].useFlag == 'Y') {
						displayOrderList.push(data[i].elementId);	
					} else {
						authElementIds.push(data[i].elementId);
					}
				}
			}
		});
		
		if(authElement.displayOrderList != null){
			displayOrderList = JSON.parse(authElement.displayOrderList);
		}
	
		for(var i = displayOrderList.length - 1; i > -1; i--) {
			var eleId = displayOrderList[i];
			var $ele = $("#" + eleId);
			if($ele.css("float") == "right" || $ele.parent().css("float") == "right"){
				$ele.parent().append($ele);
			} else {
				$ele.parent().prepend($ele);
			}
		}
		for(var i = 0; i < authElementIds.length; i++) {
			var eleId = authElementIds[i];
			$("#" + eleId).hide();
		}
	},
	widgetPopupSetting: function(id) {
		var widget = mCommon.datasets[id];
	    if(typeof new_window != "undefined"){
	    	self.opener = self;
         	new_window.close()
         	new_window = null;
        }
	    window.open("about:blank","widgetEditor").close();
	    var openDialog = function(uri, name, options, closeCallback) {
	    	var win = window.open(uri, name, options);
	    	var interval = window.setInterval(function() {
	    		try {
	    			if (win == null || win.closed) {
	    				window.clearInterval(interval);
	    				closeCallback(win);
	    			}
	    		}
	    		catch (e) {
	    		}
	    	}, 1000);
	    	return win;
	    };
	    var menu = this.keyValueSet({key:"id", data:JSON.parse(sessionStorage.menuList)})[parent.location.hash.replace("#", "")] || {};
	    menu.id;
	    menu.name;
	    new_window = openDialog($("html").attr("contextPath") + "/Content/PopUp/AUIGrid/AUIGrid.html", 'widgetEditor', 'width=1300 height=650 top=200 left=200 resizable=no', function(win) {
	    	location.reload();
	    });
//	    new_window = window.open($("html").attr("contextPath") + "/Content/PopUp/AUIGrid/AUIGrid.html", 'widgetEditor', 'width=1300 height=650 top=200 left=200 resizable=no');
	    var windowParam = {
    		"widgetName" : widget.name,
        	"type" : widget.widgetType,
        	"datasetId" : widget.dataset.name,
        	"widgetId" : widget.id,
        	"description" : widget.description,
        	"options" : widget.setting,
        	"editMode" : "Edit",
        	"gridData" : AUIGrid.getGridData(id),
        	mode : "user",
        	menuId : menu.id,
        	menuName : menu.name,
        	deptCds : this.deptCds
	    }
	    new_window.windowParam = windowParam;
	    
	},
	deptCds : [],
	gridWidgetShow: function(deptCds) {
		var that = this;
		deptCds = deptCds || [];
		this.deptCds = deptCds;
		var empAuthority = sessionStorage.empAuthority || "";
		var simpleWidgetFlag = "";
		
		if(sessionStorage.parameters != null ){
			var parameters = JSON.parse(sessionStorage.parameters);
			simpleWidgetFlag = parameters.simpleWidgetFlag;
		}
		
	/*	if(simpleWidgetFlag == "Y") {
			$(".cardheard").prepend('<a id="gridWidgetSetBtn" href="#" class="gridWidgetSetBtns w-inline-block btntool floatr"><div class="w-icon fa fa-cog icon"></div><div class="textblock"></div></a>');
			$(document).on("click", ".gridWidgetSetBtns", function() {
				if($(this).closest(".card").find(".w-widget-auigrid")) {
					that.widgetPopupSetting($(this).closest(".card, .wcalc320").find(".w-widget-auigrid").attr("id"));
				}
			});
			var btns = $(".gridWidgetSetBtns")
			for(var i = 0; i < btns.length; i++) {
				if($(btns[i]).closest(".card, .wcalc320").find(".w-widget-auigrid").length < 1) {
					$(btns[i]).hide();
				};
			}
		}*/
	},
	sha256Set: function(str) {
		// str 이 64자면 안함.
		if(!this.sha256js) {
			$("head").append('<script src="' + $("html").attr("contextPath") + '/Content/js/sha256.js"></script>');
			this.sha256js = true;
		}
		if(str.length == 64) {
			return str;
		}
		return sha256.hmac("tu", str);
		
	},
	setCookie: function(cName, cValue, cDay){
	    var expire = new Date();
	    expire.setDate(expire.getDate() + cDay);
	    cookies = cName + '=' + escape(cValue) + '; path=/ '; // 한글 깨짐을 막기위해 escape(cValue)를 합니다.
	    if(typeof cDay != 'undefined') cookies += ';expires=' + expire.toGMTString() + ';';
	    document.cookie = cookies;
	},
	// 쿠키 가져오기
	getCookie: function(cName) {
	    cName = cName + '=';
	    var cookieData = document.cookie;
	    var start = cookieData.indexOf(cName);
	    var cValue = '';
	    if(start != -1){
	        start += cName.length;
	        var end = cookieData.indexOf(';', start);
	        if(end == -1)end = cookieData.length;
	        cValue = cookieData.substring(start, end);
	    }
	    return unescape(cValue);
	},
	splitterI: 0,
	splitter: function($el, orientation, size) {
		$el = $($el);
		var splitterI = this.splitterI++;
		// ELEMENT, ORIENTATION, SIZE
		//vertical , horizontal
		var className = $el.attr("class");
		$el.append($('<div id="splitter' + splitterI + '" class="' + className + '"></div>'));
		$el.children().css("background", "inherit");
		$el.children(":eq(1)").css("padding-left", "0px");
		$("#splitter" + splitterI).append($el.children(":eq(0)"));
		$("#splitter" + splitterI).append($el.children(":eq(0)"));
		$("#splitter" + splitterI).jqxSplitter({width: "calc(100% - 2px)", height:"calc(100% - 2px)", orientation: orientation, panels: [{ size: size }]});
		$("#splitter" + splitterI).css("border", "none");
		$(window).resize();
	},
	fnLoginCheck: function() {
		$.get(common.contextPath() + "/system/loginCheck", function (result) {
			if (!result) {
				$.get(common.contextPath() + '/system/postLogout/' + companyCd + divisionCd + locale, function(result) {
					sessionStorage.setItem("userId", '');
					sessionStorage.setItem("divisionCd", '');
					sessionStorage.setItem("companyCd", '');
					sessionStorage.setItem("locale", '');
					
					alert("Session lost.");
//					micaCommon.messageBox({type:"danger", width:"400", height: "145", html: "Session lost."}); 
					common.logout()
				});
			}
		});
	}, keyValueSet: function (options) {
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
    }
};

function refreshPage() {
	window.location.reload(true);
}