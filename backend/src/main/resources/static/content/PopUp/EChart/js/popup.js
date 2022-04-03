jQuery(document).ready(function(){
  ex.init();
});

var ex = {

  init:function() {
    this.modal();
  },
  gridData:{},
  bindData:{
    data:{},
    chart:{},
    chartType:{}
  },
  resize:function() {
	  

	if(jQuery(window).width() <= 960) {
    	jQuery(".menuBox").hide();
    } else {
    	jQuery(".menuBox").show();
    }
	  
    if(jQuery(window).width() <= 860){
    	jQuery(".menu-Content").hide();
    } else {
    	jQuery(".menu-Content").show();
    } 
    
    if (typeof this.gridData !== "undefined") { AUIGrid.resize(this.gridData); }

  },
  chartMapping:function(type, bindSetValue, cht, bindPaser) {
	  
      var num       = 0;
      var cnt       = 0;
      var label     = 0;
      var status    = false;
      var legendBox = [];
      var keyValue  = "";

      var recursive = function(obj){ // 프로퍼티 변경
    	  for(var k in obj) {
    	    if(type == "A-Type") {
    	      if(k == "markLine" || k == "markPoint") { // 해당키의 "data" 옵션이 포함될때
    	        return;
    	      }
    	      if(k == "name" && keyValue == "series" && status) {
    	          obj[k] = legendBox[cnt]; cnt++;
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

      if(type == "B-Type") {

        legendBox[0] = [];
        legendBox[1] = [];

        for(a=0; a<bindSetValue.length; a++) {
          if(bindSetValue[a].group > cnt) {
            cnt = bindSetValue[a].group;
          }
        }

        for(var b=0; b<cnt; b++) { bindPaser[b] = []; }

        for(var e=0; e<bindSetValue.length; e++) {
          legendBox[0].push(bindSetValue[e].name);
          num = (bindSetValue[e].group - 1);
          bindPaser[num].push(bindSetValue[e]);
        }

        jQuery.each(legendBox[0], function(k, v){ // 중복제거
          if(jQuery.inArray(v, legendBox[1]) === -1) legendBox[1].push(v);
        });

        if(cht.legend != undefined) {
            cht.legend.data = legendBox[1];
        }
        
        if(cnt > cht.series.length) {
            var three = cnt - cht.series.length;
            for(var x=0; x<three; x++) {
              cht.series.push(this.parser(3, cht.series[0]));
            }
        } else if(cnt == cht.series.length) {
        	
        } else {
	        for(var f=(cnt+1); f>0; f--) {
	          if(f > cnt) {
	            cht.series.pop();
	          }
	        }
        }
        
        num = 0;
        recursive(cht.series);
        this.bindData.chart = cht;

      } else if(type == "C-Type") {
    	  
    	  for(var o in bindSetValue[0]) {
    		  num++;
    		  if(num % 2 == 0) {
    			  bindPaser[cnt] = [];
    			  cnt++;
    		  }
          }
    	  
    	  for(j=0; j<bindSetValue.length; j++) {
    		  num = 0;
    		  var arr = Object.values(bindSetValue[j]);
    		  for(n=0; n<arr.length; n=n+2) {
    			 var err = [];
 				 err.push(arr[n]);
 				 err.push(arr[n+1]);
 				 bindPaser[num].push(err);
 				 num++;
    		  }
    	  }
    	  
    	  if((bindPaser.length) > cht.series.length) {
              var two = (bindPaser.length) - cht.series.length;
              for(var r=0; r<two; r++) {
                cht.series.push(this.parser(3, cht.series[0]));
              }
	      } else if((bindPaser.length) == cht.series.length){
	      
	      }  else {
	      
	          for(var t=cht.series.length; t>0; t--) {
	            if(t > bindPaser.length) {
	              cht.series.pop();
	            }
	          }
	          
	      }
    	  
    	  num = 0;
    	  recursive(cht.series);
    	  this.bindData.chart = cht;
    	  
      } else {

        for(var c in bindSetValue[0]) {
          if(num != 0 ) { legendBox.push(c); }
          bindPaser[num] = [];
          num++;
        }
        
        for(var i=0; i<bindSetValue.length; i++) {
          num = 0;
          for(var k in bindSetValue[i]) {
            bindPaser[num].push(bindSetValue[i][k]);
            num++;
          }
        }
        
        if(cht.hasOwnProperty("legend")) {
          status = true;
          cht.legend.data = legendBox;
        } else if(cht.series[0].name != undefined) {
          status = true;
        }
        
        if((bindPaser.length-1) > cht.series.length) {
          var one = (bindPaser.length-1) - cht.series.length;
          for(var x=0; x<one; x++) {
            cht.series.push(this.parser(3, cht.series[0]));
          }
        } else {
          for(var y=cht.series.length; y>0; y--) {
            if(y > bindPaser.length-1) {
              cht.series.pop();
            }
          }
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
        this.bindData.chart = cht;
      }

  },
  dataMapper:function(type, bindSet, cht) {

    var gridMappingCheck = function(bool) {

      var alignment = function(obj) {
        for(var k in obj) {
          if(k == "data" && Array.isArray(obj[k])) { // 더이상 재귀로 쪼개어지지않을때
            if(typeof obj[k][0] != "object") { // value filter
              bindSample.value[count] = [];
              bindSample.value[count] = obj[k];
              count++;
            } else if(type == "B-Type"){ // B-type filter
              lengths = lengths + obj[k].length;
              bindSample.value.push(obj[k]);
            } else if(type == "C-Type" && Array.isArray(obj[k][0])) { // [['value1','value2'],['value1','value2']] filter
                if(typeof obj[k][0][0] != "object") {
                	bindSample.value[count] = [];
                    bindSample.value[count] = obj[k];
                    count++;
                }
            }
          } else {
            if(typeof obj[k] == "object") { alignment(obj[k]); }
            else { }
          }
        }
      };
      
      var sortGrid3 = function(array) {
          
    	  var obj = [];
    	  
    	  for(var x=0; x<array[0].length; x++) { obj[x] = {}; }
    	  
    	  for(var i=0; i<array.length; i++) {
    		  count = 0;
    		  for(j=0; j<array[i].length; j++) {
    			  if(i == 0) {
    				  obj[count].x = array[i][j][0];
        			  obj[count].y = array[i][j][1];
        			  count++;  
    			  } else {
    				  obj[count]['x' + i] = array[i][j][0];
        			  obj[count]['y' + i] = array[i][j][1];
        			  count++;
    			  }
    		  }
    	  }
    	  
          return obj;
      };
      
      var sortGrid2 = function(array) {
        var obj = [];
        count   = 0;
        for(var x=0; x<lengths; x++) { obj[x] = {}; }

        if(bool) {
          for(var a=0; a<array.length; a++) {
            for(var key in array[a]) {
              if(key == "group") {
                obj[count].group = array[a][key];
              } else if(key == "name") {
                obj[count].name = array[a][key];
              } else if(key == "value") {
                obj[count].value = array[a][key];
                count++;
              }
            }
          }
        } else {
          for(var i=0; i<array.length; i++) {
            for(var j=0; j<array[i].length; j++) {
              for(var k in array[i][j]) {
                if(k == "name") {
                  obj[count].group = (i+1);
                  obj[count].name = array[i][j][k];
                } else if(k == "value") {
                  obj[count].value = array[i][j][k];
                  count++;
                }
              }
            }
          }
        }
        return obj;
      };

      var sortGrid = function(array) {
        var obj = [];
        var idxData = ["label"];
        for(var x=0; x<array[0].length; x++) { obj[x] = {}; }
        if(cht.legend != undefined) {
          idxData = idxData.concat(cht.legend.data);
          for(var a=0; a<array.length; a++) {
            for(var b=0; b<array[a].length; b++) {
                if(a == 0) {
                    obj[b].label = array[a][b];
                } else {
                    obj[b][idxData[a]] = array[a][b];
                }
            }
          }
        } else {
          for(var i=0; i<array.length; i++) {
            for(var j=0; j<array[i].length; j++) {
                if(i == 0) {
                    obj[j].label = array[i][j];
                } else {
                    obj[j]['data' + i] = array[i][j];
                }
            }
          }
        }
        return obj;
      };


      var bindSample = { key:"" , value:[]};
      var bindOption = {};
      var gridID     = that.gridData;
      var count      = 0;
      var lengths    = 0;

      if(bool) {

        if(type == "B-Type") {

          alignment(cht.series);
          bindSet.value = sortGrid2(bindSet.value);
          bindOption = _grid.gridPropDiffer;
        } else if(type == "C-Type") {
          bindOption = _grid.gridProp;	
        } else {
          bindOption = _grid.gridProp;
        }
        
        AUIGrid.destroy("#grid-container");
        gridID = AUIGrid.create("#grid-container", _grid.colSet(bindSet.value[0]), bindOption);
        AUIGrid.setGridData(gridID, bindSet.value);
        that.gridData = gridID;

      } else {

        for(var key in sample) {
          switch(key) {
            case "angleAxis":
              alignment(sample[key]);
              break;
            case "radiusAxis":
              alignment(sample[key]);
              break;
            case "xAxis":
              alignment(sample[key]);
              break;
            case "yAxis":
              alignment(sample[key]);
              break;
            case "series": alignment(sample[key]); break;
          }
        }

        if(type == "B-Type") {
          bindSample.value = sortGrid2(bindSample.value);
          bindSample.key = type;
          bindOption = _grid.gridPropDiffer;
        } else if(type == "C-Type") {
          bindSample.value = sortGrid3(bindSample.value)
          bindSample.key = type;
          bindOption = _grid.gridProp;
        } else {
          bindSample.value = sortGrid(bindSample.value);
          bindSample.key = type;
          bindOption = _grid.gridProp;
        }

        that.bindData.data = bindSample;
        AUIGrid.destroy("#grid-container");
        gridID = AUIGrid.create("#grid-container", _grid.colSet(bindSample.value[0]), bindOption);
        AUIGrid.setGridData(gridID, bindSample.value);
        that.gridData = gridID;

      }
    };

    var that      = this;
    var bindPaser = [];
    var sample    = that.parser(3, cht);
    var status    = jQuery(".switch2 > input").prop("checked");
    
    status = status == undefined ? true : status; 
    
    try {

      if(bindSet != undefined && status) {
          that.bindData.data = bindSet;
          that.chartMapping(type, bindSet.value, cht, bindPaser);
      } else {
          gridMappingCheck(false);
          return sample;
      }

      var test = document.getElementById('exceptionCheck');
      var myTest = echarts.init(test);
      myTest.setOption(cht);
      jQuery(".test-box").empty().append("<div id='exceptionCheck'></div>");

      if(bindSet.key == type) {
        gridMappingCheck(true);
        return cht;
      }
      else {
        alert("현재의 바인딩형식이 샘플차트정보와 맵핑되지 않으므로\n샘플 편집모드로 전환합니다.");
        gridMappingCheck(false);
        return sample;
      }

    } catch(ex) {
    	console.log(ex);
    	jQuery(".test-box").empty().append("<div id='exceptionCheck'></div>");
    	alert("현재의 바인딩형식이 샘플차트정보와 맵핑되지 않으므로\n샘플 편집모드로 전환합니다.");
    	gridMappingCheck(false);
    	return sample;
    }
    
  },
  groupType:function(map) {
      var type = map.split("-")[0];
      var group = "";
      if(type == "pie" || type == "funnel") { 
    	  group = "B-Type"; 
      } else if(type == "scatter") {
    	  group = "C-Type";  
      } else { 
    	  group = "A-Type"; 
      }
      return { "group" : group, "type" : type, "name" : map };
  },
  chartTypeModel:function(){
	  
	  if(window.windowParam.editMode == "Create") {
		  jQuery(".ListBox").css("display","block");
	  }
	  
	  jQuery(document).off("click", ".switch2 > input");
	  jQuery("#left-chart-nav > ul").html("");
	  jQuery(".chart-list-panel").html("");
	  jQuery(".setBind").remove();
	  jQuery(".switch2").remove();
	  
	  var that = this;
	  var element   = {};
	  var child     = {};
	  var chartType = _charts.dataMap;
	  
	  for(var k in chartType) {
          element = jQuery("<li></li>").prop("class","p-0");
          child   = jQuery("<a></a>").prop("class","chart-a");
          child   = child.prop("id","left-chart-nav-" + k);
          child   = child.prop("href","#chart-type-" + k);
          child   = child.append("<div class='chart-icon'></div>");
          child   = child.append("<div class='chart-name'>" + k + "</div>");
          if(that.groupType(k).group == that.bindData.data.key) {
        	  child = child.append("<i class='bind fa fa-cube' style='color:rgb(33, 150, 243);'></i>");  
          }
          element = element.append(child);
          jQuery("#left-chart-nav > ul").append(element);
          jQuery(".chart-list-panel").append("<h3 class='chart-type-head' id='chart-type-" + k + "'>" + k + "</h3>");
          element = jQuery("<div class='row'></div>").prop("id","row-chart-type-" + k);
          for(var i=0; i<chartType[k].length; i++) {
        	if(that.checked == false) {
        		child = jQuery("<a class='chart-link' href='#' type='" + k + "' data-map='" + chartType[k][i] + "'></a>");
                child = child.append("<h4 class='chart-title'>" + chartType[k][i] + "</h4>");
                child = child.append("<img class='chart-area' src='/micaweb/PopUp/EChart/data/" + chartType[k][i] + ".png' style='display: inline;'>");
        	} else {
            	if((that.groupType(chartType[k][i])).group == that.bindData.data.key) {
            		child = jQuery("<a class='chart-link' href='#' type='" + k + "' data-map='" + chartType[k][i] + "'></a>");
                    child = child.append("<h4 class='chart-title'>" + chartType[k][i] + "</h4>");
                    child = child.append("<img class='chart-area' src='/micaweb/PopUp/EChart/data/" + chartType[k][i] + ".png' style='display: inline;'>");
            	} else {
            		child = jQuery("<a class='chart-link non-select' href='#' type='" + k + "' data-map='" + chartType[k][i] + "'></a>");
                    child = child.append("<h4 class='chart-title'>" + chartType[k][i] + "</h4>");
                    child = child.append("<img class='chart-area' src='/micaweb/PopUp/EChart/data/" + chartType[k][i] + ".png' style='display: inline;'>");
                    child = child.append("<div class='non-back'><div class='non'><span>Disabled</span></div></div>");
            	}
        	}
        	child = jQuery("<div class='chart'></div>").append(child);
            child = jQuery("<div></div>").prop("class","col-xl-3 col-lg-3 col-md-4 col-sm-6").append(child);
            element.append(child);
            jQuery(".chart-list-panel").append(element);
          }
      }
	  
	  if(window.windowParam.editMode == "Create") {
		  element = jQuery("<label></label>").prop("class","setBind").text("DataSet-Option");
	      child   = jQuery("<label></label>").prop("class","switch2");
	      child   = that.bindData.data.value.length != 0 ? child.append("<input type='checkbox' checked>") : child.append("<input type='checkbox' disabled>");
	      child   = child.append("<span class='slider round'></span>");
	      jQuery(".menu-Content").append(element);
	      jQuery(".menu-Content").append(child);  
	      
	      if(that.checked == undefined) {
	    	  jQuery(document).on("click", ".switch2 > input", function(){
		          that.checked = jQuery(this).prop("checked");
		          if(that.checked) {
		            that.chartTypeModel();
		          } else {
		            that.chartTypeModel();
		          }
		      });
	      } else {    
    		  if(that.checked){
    			jQuery(".switch2 > input").prop("checked", true);
    			jQuery(".bind").css("color","#2196F3");
    		  } else {
    			jQuery(".switch2 > input").prop("checked", false);
    			jQuery(".bind").css("color","#cccccc");
    		  }
    		  jQuery(document).on("click", ".switch2 > input", function(){
		          that.checked = jQuery(this).prop("checked");
		          if(that.checked) {
		            that.chartTypeModel();
		          } else {
		            that.chartTypeModel();
		          }
		      });
	      }
	  } else {
		  element = jQuery("<label></label>").prop("class","setBind").text("DataSet-Status");
	      child   = jQuery("<label></label>").prop("class","switch2").text(that.bindData.datasetId);
	      jQuery(".menu-Content").append(element);
	      jQuery(".menu-Content").append(child);
	  }
	  
	  that.chartTypeEvent();
	  
  },
  chartTypeEvent:function(){
      
	  var that = this;
	  
	  if(window.windowParam.editMode == "Edit") {
		  jQuery(".setBind").remove();
		  jQuery(".switch2").remove();
		  var element = jQuery("<label></label>").prop("class","setBind").text("DataSet-Status");
	      var child   = jQuery("<label></label>").prop("class","switch2").text(that.bindData.datasetId);
	      jQuery(".menu-Content").append(element);
	      jQuery(".menu-Content").append(child);  
	  }
      
      jQuery(document).off("click",".chart-link");
	  
	  jQuery(document).on("click",".chart-link",function(){
		  
		  if(jQuery(this).hasClass("non-select")) {
			  return false;
		  }
		  
          var map = jQuery(this).attr("data-map");
          var setChart = {};
          that.bindData.chartType = that.groupType(map);
          if(_charts.sample[map] == undefined) {
            console.log("Not Chart Sample Data");
            return false;
          }
          if(window.windowParam.editMode == "Create") {
        	  that.bindData.datasetId = $("#setDataInfo").val() == undefined ? window.windowParam.datasetId : $("#setDataInfo").val();  
          }
          that.bindData.widgetName = that.bindData.widgetName == undefined ? "" : that.bindData.widgetName;
      	  that.description = that.description;
          that.bindData.chart = that.dataMapper(that.bindData.chartType.group, that.bindData.data, that.parser(3,_charts.sample[map]));
          that.gridMenu(that.bindData.data.key);
          that.render();
      	  that.event();
      	  window.windowParam.options = that.bindData; 	  
      	  jQuery(".ListBox").css("display","none");
      });  
	  
  },
  modal:function(){
	
	var onType = function(obj){
		for(var k in obj) {
			if(typeof obj[k] == "number") {
				
			} else {
				return false;
			}
			return true;
		}
	};
	  
    var that      = this;
    var bindSet   = {};
    var idx       = 0;
    var getData   = window.windowParam.options;
    var projectId = window.windowParam.projectId;
    	
	$.ajax({
		
	        url: "/micaweb/mica/projects/"+projectId+"/datasets",
	        method: "GET",
	        contentType: "application/json; charset=UTF-8",
	        success: function(result){
	        	
	        	that.selectObj = result;
	        	
	        	if(result.length != 0) {
	        		
	        		for(var e=0; e<result.length; e++) { 		        			
	        			bindSet.value = that.parser(1, result[e].datas);
        				if(bindSet.value[0].group == undefined) {
        					if(onType(bindSet.value[0])) {
        						bindSet.key = "C-Type";
        					} else {
        						bindSet.key = "A-Type";
        					}
		            	} else {
		            		bindSet.key = "B-Type";
		            	}
        				result[e].datas = bindSet;
        				bindSet = {}; 
        				
	        			if(result[e].id.datasetId == window.windowParam.datasetId) { 		        				
	        				idx = e;
	        			}       			
	        		}
	        	}
	        	
	        	if(typeof window.windowParam.editMode == "undefined") {
	        		
	        		that.bindData.datasetId = window.windowParam.datasetId;
    	        	that.bindData.widgetName = getData.widgetName;
    	        	that.description = window.windowParam.description;
    	            that.bindData.chartType = that.groupType(getData.chartType.name);
    	            that.bindData.chart = that.dataMapper(that.bindData.chartType.group, that.selectObj[idx].datas, getData.chart);
    	            that.gridMenu(getData.data.key);
    	            that.render();
    	        	that.event();
	        		
	        	} else {
	        		
	        		if(window.windowParam.editMode == "Edit") {
	        			
	        			that.bindData.datasetId = window.windowParam.datasetId;
        	        	that.bindData.widgetName = getData.widgetName;
        	        	that.description = window.windowParam.description;
        	            that.bindData.chartType = that.groupType(getData.chartType.name);
        	            that.bindData.chart = that.dataMapper(that.bindData.chartType.group, that.selectObj[idx].datas, getData.chart);
        	            that.gridMenu(getData.data.key);
        	            that.render();
        	        	that.event();
	        			
	        		} else {
	        			
	        			var selectSet = that.selectObj;
	        			var select = jQuery("<select></select>").prop("id","setDataInfo").prop("class","form-control");
	        			
	        			for(var x=0; x<selectSet.length; x++) {
	        				if(x == 0) {
	        					that.bindData.data = selectSet[x].datas;
	        				}
	        				select.append("<option value='" + selectSet[x].id.datasetId + "'>" + (selectSet[x].id.datasetId.length > 15 ? selectSet[x].id.datasetId.substring(0,14).concat("...") : selectSet[x].id.datasetId)   + "</option");
	        			}
	        			jQuery(".dataList").append(select);
	        			
	        			jQuery("#setDataInfo").change(function(){
				        	var dataSet = jQuery(this).val();
				        	for(var y=0; y<result.length; y++) {
				        		if(dataSet == result[y].id.datasetId) {
				        			that.bindData.data = result[y].datas;
				        			that.chartTypeModel();
				        		}
				        	}
				        });
	        			
	        		}
	        		
	        	}
	        	
	        	that.chartTypeModel();
	        	
	        }
	});
  
    
	jQuery("#colClose").click(function(){
		jQuery(".colNameBox").hide();
	});

    jQuery("#insert").click(function(){
    	var colName = jQuery("#colData").val();
    	var message = jQuery(".message");
    	var bind = that.bindData.data.value[0];
    	if(colName.length == 0) {
    		message.text("컬럼값이 지정되지 않았습니다.");
    	} else {
    		for(var k in bind) {
    			if(k == colName) {
    				message.text("중복된 컬럼명 입니다.");
    				return false;
    			}
    		}
    		message.text("　");
    		that.columnSetUpdate("1", colName);
    		jQuery(".colNameBox").hide();
       }
       jQuery("#colData").val("");
    });

    jQuery(window).resize(function(){ // windows Resize
    	that.resize();
    });
     
    jQuery(".m-close").click(function(){
    	if(window.windowParam.editMode == "Create") {
    		window.close();
    	} else {
    		jQuery(".ListBox").hide(); 
    	}
    });
  
  },
  gridMenu:function(data){
	  
	jQuery(".tab-container > ul").html("");
	
    if(data == "A-Type" || data == "C-Type") {
        jQuery(".tab-container > ul").append(
          "<li class='n tab-li'><a href='#' class='row-a' get-data='1'><i class='fa fa-plus'></i><span>Row</span></a></li>"  +
          "<li class='n tab-li'><a href='#' class='row-a' get-data='0'><i class='fa fa-minus'></i><span>Row</span></a></li>" +
          "<li class='n tab-li'><a href='#' class='col-a' get-data='1'><i class='fa fa-plus'></i><span>Col</span></a></li>"  +
          "<li class='n tab-li'><a href='#' class='col-a' get-data='0'><i class='fa fa-minus'></i><span>Col</span></a></li>" +
          "<li class='tab-li'><a href='#' class='diver' get-data='0'><i class='fa fa-retweet'></i><span>Diversion</span></a></li>" + 
          "<li class='tab-li'><a href='#' class='btn_apply' style='color:#0ea8ff;'><i class='fa fa-check'></i><span>저장</span></a></li>"
        );
    } else {
        jQuery(".tab-container > ul").append(
          "<li class='n tab-li'><a href='#' class='row-b' get-data='1'><i class='fa fa-plus'></i><span>Row</span></a></li>" +
          "<li class='n tab-li'><a href='#' class='row-b' get-data='0'><i class='fa fa-minus'></i><span>Row</span></a></li>" + 
          "<li class='tab-li'><a href='#' class='btn_apply' style='color:#0ea8ff;'><i class='fa fa-check'></i><span>저장</span></a></li>"
        );
    }
  },
  render:function(){

    var that       = this;
    var map        = _charts.classMap; // data-chart-map.js menuBox mapData
    var cht        = that.bindData.chart;
    var status     = map.__level - map.__level;
    var el         = "";
    var single     = "";
    var disablekey = "";
    var markData   = "";
    var name       = "option";
    var tPoint     = [];

    jQuery("#optionA").html("");
    jQuery("#optionB").html("");


    var hasKey = function(obj, key) {
      for(var k in obj) {
      	if(k == key){ return true; }
      }
      return false;
    };

    var codetxt = function (obj) {
      if(typeof obj === "string") {
        return obj;
      } else {
        return that.parser(2, obj);
      }
    };

    var box = function(s, o, k, p, t) {
        var e = "";

        if(s > 1) {
          p = p === "Not porperty" ? "" : p;
          t = " data-lv='" + t + "' ";

          if(Object.keys(o).length != 0 && !(Array.isArray(o))) {
            if(k.indexOf(".") != -1) {
              k = k.split(".")[0];
            }
            e = "<li class='treebox p-10 lilv-" + s + "' lv-" + s + "=" + k + ">" +
                "<label class='col-12 col-form-label upper'><i class='fs fa fa-plus' aria-hidden='true'></i>" + k  +
                "</label></li>";
            return e;
          } else {
            var io = "";
            var col = "col-7";

            if(typeof o == "string") {
              if(typeof p == "function") {
                io = "<textarea class='form-control' rows='14' placeholder='ex - { } / {\"key\":\"value\"}' " + t + "disabled>" + p + "</textarea>";
                col = "col-12";
              } else {
                if(k.toLowerCase().indexOf("color") != -1) { // color
                  io = "<div class='colorful input-group colorpicker-component'>" +
                       "<input type='text' class='form-control' placeholder='color' value='" + p + "' " + t + ">" +
                       "<span class='input-group-addon'><i></i></span></div>";
                } else {
                  io = "<input type='text' class='form-control' placeholder='ex - value' value='" + p +"' " + t + ">";
                }
              }
            }
            if(typeof o == "object") {
              if(typeof p == "number") {
            	  io = "" + p;
              } else if(typeof p == "boolean") {
            	  io = p == true ? "true" : "false";  
              } else {
            	  io = that.parser(2, p);
            	  io = io == "{}" ? "{}" : (io == "\"\"") ? "" : io;
              }
              io = "<textarea class='form-control' placeholder='ex - { } / {\"key\":\"value\"}' " + t + ">" + io + "</textarea>";
              col = "col-12";
            }
            if(typeof o == "number") {
              io = "<input type='Number' class='form-control' placeholder='" + o + "' value='" + p +"' " + t + ">";
            }
            if(typeof o == "boolean") {              
              io = "<label class='switch'>" +
                   "<input type='checkbox' " + t + (p === true ? "checked" : (typeof p == "boolean" ? "" : (o == true ? "checked" : ""))) + ">" +
                   "<span class='slider round'></span>" +
                   "</label>";
            }
            if(!(Array.isArray(o))) {
              e = "<li class='p-10 lilv-" + s + "' lv-" + s + "=" + k + ">" +
                  "<label class='col-5 col-form-label help'>" + k + "</label>" +
                  "<div class='d-ib " + col + "'>" + io + "</div></li>";
              return e;
            } else {
              if(k == "data") {
            	var n = "";
                p  = codetxt(p);
                if(disablekey.length != 0) {
                	t = t;
                } else if(markData.length != 0) {
                	t = t;
                } else {
                	t = t + "disabled";
                	n = "n";
                }
                io = 'ex - [\"Object\" / \"StringValue\" / IntegerValue]';
                e  = "<li class='" + n + " p-10 lilv-" + s + "' lv-" + s + "=" + k + ">" +
                     "<label class='col-5 col-form-label help'>" + k + "</label><div class='col-12'>" +
                     "<textarea class='form-control' placeholder='" + io + "' " + t + ">"+ p + "</textarea>" +
                     "</div></li>";
                return e;
              } else if(o[0] === "multiple") {
                p  = codetxt(p);
                io = 'ex - ["value","value"]';
                e  = "<li class='p-10 lilv-" + s + "' lv-" + s + "=" + k + ">" +
                     "<label class='col-5 col-form-label help'>" + k + "</label><div class='col-12'>" +
                     "<textarea class='form-control' placeholder='" + io + "' " + t + ">"+ p + "</textarea>" +
                     "</div></li>";
                return e;
              }
              else {
            	var getType = function(text) {
              		if(text == "pie" || text == "funnel"){
              			return "B-Type";
              		} else if(text == "scatter") {
              			return "C-Type";
              		} else if(text == "bar" || text == "line"){
              			if(that.bindData.data.key == "C-Type") {
              				return "C-Type";
              			} 
              			return "A-Type";
              		} else {
              			return "";
              		}
              	}
            	  
                e = "<li class='p-10 lilv-" + s + "' lv-" + s + "=" + k + ">" +
                    "<label class='col-5 col-form-label help'>" + k + "</label>" +
                    "<div class='d-ib col-7'><select class='form-control' name='" + k +"' " + t + ">";
                for(var i=0; i<o.length; i++) {
                  io = p == o[i] ? "selected" : that.bindData.data.key == (io = getType(o[i])) ? "" : io == "" ? "" : "style='color:#e4e7ea;' disabled"; 
                  e += "<option value='" + o[i] + "' " + io + ">" + o[i] + "</option>";
                }
                e += "</select></div></li>";
                return e;
              }
            }
          }
        } else {
          return "";
        }
    };

    var elnumber = function (s, o, k, p) {

          if(s == 1) {
            tPoint[0] = k;
            el += box(s, o, k, p, tPoint[0]);
          }
          if(s == 2) {
            tPoint[1] = tPoint[0] + "." + k;
            el += box(s, o, k, p, tPoint[1]);
          }
          if(s == 3) {
            tPoint[2] = tPoint[1] + "." + k;
            el += box(s, o, k, p, tPoint[2]);
          }
          if(s == 4) {
            tPoint[3] = tPoint[2] + "." + k;
            el += box(s, o, k, p, tPoint[3]);
          }
          if(s == 5) {
            tPoint[4] = tPoint[3] + "." + k;
            el += box(s, o, k, p, tPoint[4]);
          }
    };

    var elementMenu = function(obj, cht) {

      var top = {};
      var arr = {};
      var txt = "&nbsp;&nbsp;&nbsp";

      for(var key in obj) {
        if(key != "__level") {
          if(cht[key] != undefined) {
            top = jQuery("<li></li>").attr("key-menu", key).prop("class", "menu");
            arr = jQuery("<a></a>").prop("href", "#").prop("class","nav-link");
          } else {
            top = jQuery("<li></li>").attr("key-menu", key).prop("class", "disabled");
            arr = jQuery("<a></a>").prop("href", "#").prop("class","nav-link disabled");
          }
          arr = arr.append("<span class='upper'>" + key + "</span>");
          switch(key) {
            case "polar":      break;
            case "angleAxis":  break;
            case "radiusAxis": break;
            case "xAxis":      break;
            case "yAxis":      break;
            case "series":     break;
            default: arr = arr.append("<i class='ck fa fa-check'></i>");
          }
          if(Array.isArray(cht[key]) && cht[key].length > 1) {
        	  top = top.prop("class", "plus");
        	  arr = arr.append("<i class='cp fa fa-plus'></i>");
          } else {
        	  arr = arr;
          }
          top = top.append(arr);
          jQuery("#optionA").append(top);
        }
        if(Array.isArray(cht[key]) && cht[key].length > 1) {
          
          top = jQuery("<div></div>").attr("key-menu2", key + "Arr").prop("class", "menu arr");
          for(var i=0; i<cht[key].length; i++) {
            arr = jQuery("<li></li>").attr("data-arr", key + "-" + i);
            arr = arr.append("<a href='#' class='nav-link upper'>" + txt + "data"  + "[" + (i+1) + "]</a>");
            top = top.append(arr);
          }
          jQuery("#optionA").append(top);
        }
      }
      
    };

    var elementMenu2 = function(obj, cht) {

      status++;
      single = "<div class='itm-none lv-" + status +"' key-info='" + name + "'>";
      el += single;

      for(var key in obj) {
        var properties;

        if(key != "__level") {
          try {
        	  
            name = key;
            properties = hasKey(cht, key) ? cht[key] : "Not porperty";
            if(key == "legend") { disablekey = key; }
            if(key == "markLine" || key == "markPoint") { markData = key; }

            if(Array.isArray(obj[key])) {// data-map.js [array] 객체

              elnumber(status, obj[key], key, properties);

            } else {// data-map.js 일반 객체 값 등등
              if(Array.isArray(properties)) { // 배열객체일때의 파싱레벨
                if(typeof properties[0] == "object") {
                  for(var a=0; a<properties.length; a++) {
                    name = key;
                    elnumber(status, obj[key], (key + "." + a), properties[a]); //
                    elementMenu2(obj[key], properties[a]);
                    status--;
                    el += "</div>";
                    single += "</div>";
                    el = el.replace(single, "");
                  }
                }
              } else {
                elnumber(status, obj[key], key, properties);
                elementMenu2(obj[key], properties);
                if(key == "legend") { disablekey = ""; }
                if(key == "markLine" || key == "markPoint") { markData = ""; }
                status--;
                el += "</div>";
                single += "</div>";
                el = el.replace(single, "");
              }
            }

          } catch(e) {
            console.log(e);
          }
        }
      }
    };
    
    var elementWidget = function(){
    	
    	var top = {};
    	var arr = {};
    	var setType = "";
    	var selectData = that.selectObj;
    	top = jQuery("<li></li>").attr("key-menu", "widgetInfo").prop("class", "menu leave");
        arr = jQuery("<a></a>").prop("href", "#").prop("class","nav-link");
        arr = arr.append("<span class='upper'>Widget-Data</span>");
        top.append(arr);
        jQuery("#optionA").prepend(top);
        
        if(jQuery("#setDataInfo").val() != undefined) {
        	window.windowParam.datasetId = jQuery("#setDataInfo").val();
        	jQuery(".dataList").html("");
        }
        
        el = "<div class='itm-none lv-2' key-info='widgetInfo'>" +
				"<li class='p-10 lilv-2' lv-2='widgetInfo'>" + 
		    		"<label class='col-5 col-form-label'>WidgetName</label>" +
					"<div class='d-ib col-7'>" +
						"<input type='text' class='form-control' widget-set='name' value='" + (that.bindData.widgetName == undefined ? "" : that.bindData.widgetName) + "'>" +
					"</div>" +
				"</li>" + 
				"<li class='p-10 lilv-2' lv-2='description'>" + 
		    		"<label class='col-5 col-form-label'>Description</label>" +
					"<div class='d-ib col-7'>" +
						"<input type='text' class='form-control' widget-set='des' value='" + (that.description == undefined ? "" : that.description) + "'>" +
					"</div>" +
				"</li>";
		        if(window.windowParam.editMode != undefined) {
		        	el  +=  "<li class='p-10 lilv-2' lv-2='dataSetEdit'>" + 
							"<label class='col-5 col-form-label'>DataSetEdit</label>" +
							"<div class='d-ib col-7'>" +
							"<select id='dataSetEdit' class='form-control'>";
				    		for(var i=0; i<selectData.length; i++) {
				    			if(ex.bindData.chartType.group == selectData[i].datas.key) {
				    				if(window.windowParam.datasetId == selectData[i].id.datasetId) {
				    					el += "<option value='" + selectData[i].id.datasetId + "' selected>" + (selectData[i].id.datasetId.length > 13 ? selectData[i].id.datasetId.substring(0,12).concat("...") : selectData[i].id.datasetId) + "</option>";
				    				} else {
				    					el += "<option value='" + selectData[i].id.datasetId + "'>" + (selectData[i].id.datasetId.length > 13 ? selectData[i].id.datasetId.substring(0,12).concat("...") : selectData[i].id.datasetId) + "</option>";
				    				}
				    			} else {
				    				el += "<option value='" + selectData[i].id.datasetId + "' style='color:#e4e7ea;' disabled>" + (selectData[i].id.datasetId.length > 13 ? selectData[i].id.datasetId.substring(0,12).concat("...") : selectData[i].id.datasetId) + "</option>";
				    			}
				    		}
			    	el	+=	"</select></div></li>" + 
							"<li class='p-10 lilv-2' lv-2='DataSetApply'>" + 
								"<label class='col-5 col-form-label'>DataSetApply</label>" +
								"<div class='d-ib col-7'>" +
									"<a href='#' class='setChange edit-btn'><i class='fa fa-refresh'></i><span>DataSet-Apply</span></a>" + 
								"</div>" + 
							"</li>";
		        } 
	    el +=   "<li class='p-10 lilv-2' lv-2='ChartEdit'>" + 
		    		"<label class='col-5 col-form-label'>ChartEdit</label>" +
		    		"<div class='d-ib col-7'>" +
		    			"<a href='#' class='chartSet edit-btn'><i class='fa fa-area-chart'></i><span>Chart-Change</span></a>" + 
		    		"</div>" + 
				"</li>" + 
			 "</div>";
	    jQuery(".lv-1").prepend(el);
    };

    elementMenu(map, cht);
    elementMenu2(map, cht);
    jQuery("#optionB").append(el);
    elementWidget();
    jQuery("div[key-info='widgetInfo']").toggleClass("itm-none");
    jQuery('.colorful').colorpicker();
    this.echartRender(cht);

  },
  event:function(){

    jQuery(document).off("click");

    var that       = this;
    var target     = 0;
    var focusData  = "";
    var cStatus    = true;

    var propcheck = function(key, prop) {
      if(typeof prop == "boolean") {
        return prop;
      }
      if(typeof prop == "number") {
        var confirm = isNaN(prop) ? "" : prop;
        return confirm;
      }
      if(typeof prop == "string") {

        if(key == "formatter") {
          return prop;
        }

        if(prop[0] === "{") {
          prop = that.parser(1, prop);
          return prop;
        } else if(prop[0] === "[") {
          var result = [];
          result = that.parser(1, prop);
          if(jQuery.isNumeric(result[0])) {
            for(var j=0; j<result.length; j++) {
              result[j] = Number(result[j]);
            }
            return result;
          } else {
            return result;
          }
        } else {
          
          if(prop == "true" || prop == "false") {
        	var bool = prop == "true" ? true : false;
        	return bool;
          } 
        	
          return prop;
        }
      }
    };

    var chartUpdate = function(data, point) { // a : dataset /// b : tree-info
      var status = -1;
      var option = that.bindData.chart;
      var arr = point.split("."); // key.key.key

      var addProp = function(option, arr) {

        var on = NaN;
        var obj = {};
        var value = 0;
        obj = option;

        var propAddLevel = function(i) {
          if(i == 0) {
            obj = option[arr[i]];
            on = 0;
          }
          if(i == 1) {
            obj = option[arr[i-i]][arr[i]];
            on = 1;
          }
          if(i == 2) {
            obj = option[arr[i-i]][arr[i-1]][arr[i]];
            on = 2;
          }
          if(i == 3) {
            obj = option[arr[i-i]][arr[i-2]][arr[i-1]][arr[i]];
            on = 3;
          }
          if(i == 4) {
            obj = option[arr[i-i]][arr[i-3]][arr[i-2]][arr[i-1]][arr[i]];
            on = 4;
          }
        };

        for(var i=0; i<arr.length; i++) {
          if(obj.hasOwnProperty(arr[i])) {
            propAddLevel(i);
          } else {
            if(i == arr.length-1) {
              if(on == 0) {
                obj[arr[i]] = data;
                option[arr[0]] = obj;
              }
              if(on == 1) {
                obj[arr[i]] = data;
                option[arr[1]] = obj;
                delete option[arr[1]];
              }
              if(on == 2) {
                obj[arr[i]] = data;
                option[arr[2]] = obj;
                delete option[arr[2]];
              }
              if(on == 3) {
                obj[arr[i]] = data;
                option[arr[3]] = obj;
                delete option[arr[3]];
              }
              if(on == 4) {
                obj[arr[i]] = data;
                option[arr[4]] = obj;
                delete option[arr[4]];
              }
              if(isNaN(on)) {
                obj[arr[i]] = data;
                option[arr[3]] = obj;
                delete option[arr[3]];
              }
            } else {
                obj[arr[i]] = {};
                propAddLevel(i);
            }
          }
        }
      };

      var updateProp = function(obj) {
        status++;
        for(var key in obj) {
          if(key == arr[status]) {
            // 같으면 프로퍼티의 깊이를 탐색하여 값을 추가
            if(arr.length-1 == status) {
              var result;
              result = propcheck(key, data); // [], {}, "", true 체크
              if(result.length == 0) {
                obj[key] = undefined;
                delete obj[key];
              } else {
                obj[key] = result; // 프로퍼티 변경
              }
            } else {
              updateProp(obj[key]);
              status--;
            }
          } else {

          }
        }
      };

      // var countProp = function(obj) {
      //   for(var k in obj) {
      //     if(Object.keys(obj[k]).length == 0) {
      //       delete obj[k];
      //     }
      //   }
      // };

      addProp(option, arr);
      updateProp(option);
      // countProp(option);
      that.echartRender(option);

    };

    var propDisabledClear = function(access) {
      var option = that.bindData.chart;
      delete option[access];
      that.echartRender(option);
      jQuery("div[key-info=" + access + "]").addClass("itm-none");
      jQuery("div[key-info=" + access + "]").find("div[key-info]").addClass("itm-none")
      jQuery("div[key-info=" + access + "]").find(".input-group-addon > i").removeAttr("style");
      jQuery("div[key-info=" + access + "]").find("input").val("");
      jQuery("div[key-info=" + access + "]").find("textarea").val("");
      jQuery("div[key-info=" + access + "]").find("select").val("");
      jQuery("div[key-info=" + access + "]").find(".fa").prop("class","fs fa fa-plus");
    };
    
    var applyDataClear = function(obj){
    	
        for(var k in obj) {
          if(k == "markLine" || k == "markPoint") { return; }
          if(k == "data" && Array.isArray(obj[k])) {
            obj[k] = [];
          } else {
            if(typeof obj[k] == "object") { applyDataClear(obj[k]); }
          }
        }
        
    };

    jQuery(document).on("click","li[key-menu]",function(){
      
      jQuery("li[key-menu]").removeClass("leave");
      var dis = jQuery(this).attr("class");
      var get = jQuery(this).attr("key-menu");
      
      if(dis == "disabled") {
        return false;
      }
      
      if(dis == "plus") {
    	  jQuery(this).attr("class","minus");
    	  jQuery(this).find("i").attr("class","cp fa fa-minus");
      }
      if(dis == "minus") {
    	  jQuery(this).attr("class","plus");
    	  jQuery(this).find("i").attr("class","cp fa fa-plus");
      }
      
      jQuery(this).addClass("leave");
      jQuery(".lv-2").addClass("itm-none");
      if(jQuery(this).next().attr("key-menu2") == (get + "Arr")) {
        jQuery(this).next().toggleClass("arr");
        jQuery("div[key-info=" + get + "]").eq(target).toggleClass("itm-none");
      } else {
        jQuery("div[key-info=" + get + "]").toggleClass("itm-none");
      }
    });

    jQuery(document).on("click",".fa-check",function(){
      var get  = jQuery(this).parent();
      var get2 = get.parent();
      if(get2.attr("class") === "disabled") {
        get2.toggleClass("disabled").toggleClass("menu");
        get.toggleClass("disabled");
      } else {
        get2.toggleClass("disabled").toggleClass("menu");
        get.toggleClass("disabled");
        propDisabledClear(get2.attr("key-menu"));
      }
    });

    jQuery(document).on("click","li[data-arr]",function(){
      jQuery(".lv-2").addClass("itm-none");
      var get = jQuery(this).attr("data-arr");
      var arr = get.split("-");
      target = parseInt(arr[1]);
      jQuery("div[key-info=" + arr[0] + "]").eq(target).toggleClass("itm-none");
    });

    jQuery(document).on("click","li[lv-2]",function(){
      var get = jQuery(this);
      var el = get.next().attr("key-info");
      get.children().children("i").toggleClass("fa-plus").toggleClass("fa-minus");
      if(get.attr("lv-2") == el) {
        get.next().toggleClass("itm-none");
      }
    });

    jQuery(document).on("click","li[lv-3]",function(){
      var get = jQuery(this);
      var el = get.next().attr("key-info");
      get.children().children("i").toggleClass("fa-plus").toggleClass("fa-minus");
      if(get.attr("lv-3") == el) {
        get.next().toggleClass("itm-none");
      }
    });

    jQuery(document).on("click","li[lv-4]",function(){
      var get = jQuery(this);
      var el = get.next().attr("key-info");
      get.children().children("i").toggleClass("fa-plus").toggleClass("fa-minus");
      if(get.attr("lv-4") == el) {
        get.next().toggleClass("itm-none");
      }
    });


    // grid menu control
    jQuery(document).on("click", ".row-a", function(){
      var get = jQuery(this).attr("get-data");
      that.rowSetUpdate(get);
    });

    jQuery(document).on("click", ".col-a", function(){
      var get = jQuery(this).attr("get-data");
      if(get == "0") {
        that.columnSetUpdate(get, "");
      } else {
        jQuery(".colNameBox").show();
      }
    });

    jQuery(document).on("click", ".row-b", function(){
      var get = jQuery(this).attr("get-data");
      that.rowSetUpdate2(get);
    });

    jQuery(document).on("click", ".diver", function(){
      var get = jQuery(this).attr("get-data");
      that.diversion(get);
    });

    jQuery(document).on("click", function(event){
      if(jQuery(event.target).has(".col-Content").length) {
        jQuery(".colNameBox").hide();
      }
    });

    // data input chart rendering
    jQuery(".menu-2").scroll(function(){
      jQuery(".colorpicker").removeClass("colorpicker-visible");
    });

    jQuery(document).on("hidePicker", ".colorful", function(){
      var inColor = jQuery(this).children();
      var change = inColor.val();
      var target = inColor.attr("data-lv");
      if(focus == change) {
        return false;
      }
      chartUpdate(change, target);
    });

    jQuery("input[type=text]").blur(function(){
    
	  if($(this).attr("widget-set") != undefined) {
		
		  if($(this).attr("widget-set") == "name") {
			  that.bindData.widgetName = $(this).val();
		  } else {
			  that.description = $(this).val();
		  }
		  
      } else {
    	  if(jQuery(this).prop("id") === "colData") {
	        return false;
	      }

	      var change = jQuery(this).val();
	      var target = jQuery(this).attr("data-lv");
	      if(focus == change) {
	        return false;
	      }
	      chartUpdate(change, target);  
      } 
    });

    jQuery("input[type=Number]").blur(function(){
      var change = jQuery(this).val();
      var target = jQuery(this).attr("data-lv");
      if(focus == change) {
        return false;
      }
      chartUpdate(Number(change), target);
    });

    jQuery("input[type=checkbox]").click(function(){
      var change;
      var target = {};
      if(this.checked) {
        change = true;
        target = jQuery(this).attr("data-lv");
        chartUpdate(change, target);
      } else {
        change = false;
        target = jQuery(this).attr("data-lv");
        chartUpdate(change, target);
      }
    });

    jQuery("textarea").blur(function(){
      var change = jQuery(this).val();
      var target = jQuery(this).attr("data-lv");
      if(focus == change) {
        return false;
      }
      chartUpdate(change, target);
    });

    jQuery("select").change(function(){
    	
    	if(jQuery(this).prop("id") == "dataSetEdit") {
    		return false;
    	}
    	
        var change = jQuery(this).val();
        var target = jQuery(this).attr("data-lv");
        chartUpdate(change, target);
    });

    jQuery("textarea").focus(function(){
      focus = jQuery(this).val();
    });

    jQuery("input").focus(function(){
      focus = jQuery(this).val();
    });
    
    AUIGrid.bind(this.gridData, "cellEditEnd", function(e) {
      that.cellSetUpdate(e.rowIndex, e.columnIndex, e.value);
    });
    
    jQuery(document).on("click",".btn_apply",function(e){
    	if(that.bindData.datasetId === undefined){
    		alert("Dataset ID is null");
    		return;
    	}
    		
    	if(window.windowParam.projectId === undefined){
    		alert("project ID is null");
    		return;
    	}
        opener.options2 = $.extend(true, {}, ex.bindData);
        opener.widgetId = window.windowParam.widgetId;
        
        var options = that.bindData.chart;
        for(var key in options) {
        	switch(key) {
        		case "legend": applyDataClear(options[key]); break;
        		case "angleAxis": applyDataClear(options[key]); break;
        		case "radiusAxis": applyDataClear(options[key]); break;
        		case "xAxis": applyDataClear(options[key]); break;
        		case "yAxis": applyDataClear(options[key]); break;
        		case "series": applyDataClear(options[key]); break;
        	}
        }
        
        var params = {
        	"setting" :ex.bindData,
        	"datasetId":  that.bindData.datasetId,
        	"widgetName": that.bindData.widgetName,
        	"widgetType" : "echart",
        	"projectId" : window.windowParam.projectId,
        	"description" : that.description
        };
        
        if(window.windowParam.widgetId != "") {
        	params.widgetId = window.windowParam.widgetId;
        }
    	$.ajax({
    		url: "/micaweb/mica/projects/" + window.windowParam.projectId + "/widgets" + (window.windowParam.widgetId == "" ? "" : "/" + window.windowParam.widgetId),
    		method: window.windowParam.widgetId == "" ? "POST" : "PUT",
    		dataType : "JSON", 
    		contentType: "application/json; charset=UTF-8",
    		data: JSON.stringify(params), 
    		success: function(result){
    			if(typeof opener.getList == "function")
    				opener.getList();
    			window.close();
    		}
    	});
    });
    
    jQuery(document).on("click",".setChange",function(){
    	
    	jQuery(".switch2 > input").prop("checked", true);
    	that.checked = true;
    	
    	var idx = $("#dataSetEdit")[0].selectedIndex;
    	var bindSet = that.selectObj[idx].datas;
    	var getData = window.windowParam.options
    	
    	window.windowParam.editMode = "Edit";
    	window.windowParam.datasetId = $("#dataSetEdit").val();
		that.bindData.datasetId = $("#dataSetEdit").val();
    	that.bindData.widgetName = getData.widgetName;
    	that.description = that.description;
    	that.bindData.chartType = that.groupType(getData.chartType.name);
    	that.bindData.chart = that.dataMapper(that.bindData.chartType.group, bindSet, getData.chart);
    	that.gridMenu(getData.data.key);
    	
    	that.render();
    	that.event();
    	
    	window.windowParam.options = that.bindData;
    	
    	that.chartTypeModel();
    });
    
    jQuery(document).on("click",".chartSet",function(){
    	if(window.windowParam.editMode != undefined) {
    		window.windowParam.editMode = "Edit";
    	}
    	jQuery(".dataList").html("");
    	jQuery(".ListBox").css("display","block");
    	that.chartTypeEvent();
    });
    
    jQuery(document).on("click",".help",function(){
    	
    	if(cStatus == false) {
    		return false;
    	}
    	
    	var check = function(obj){
    		var result;
    		if((result = obj.find("input").attr("data-lv")) != undefined){
    			return result;
    		}
    		if((result = obj.find("select").attr("data-lv")) != undefined) {
    			return result;
    		}
    		if((result = obj.find("textarea").attr("data-lv")) != undefined) {
    			return result;
    		}
    	}
    	
    	var get = jQuery(this);
    	var adr = check(get.next());
    	var obj = that.helpEvent(adr);
    	cStatus = false;
    	if(obj.last == "rich") {
    		get.append("<span class='helpText' style='text-align:left;'>" + obj.text + "</span>");
    	} else {
    		get.append("<span class='helpText' style='text-align:center;'>" + obj.text + "</span>");
    	}
    	
    });
    
    jQuery(document).on("mouseleave",".help",function(){
    	jQuery(".helpText").remove();
    	cStatus = true;
    });
    
  },
  helpEvent:function(adr){
	  var arr  = adr.split(".");
	  var obj  = _tooltip;
	  
	  for(var i=0; i<arr.length; i++) {
		  if(!(jQuery.isNumeric(arr[i]))) {
	  		if(typeof obj == "object") {
	  			obj = this.parser(3,obj[arr[i]]);
	  		} 
		  }
	  }
	  
	  return {text:obj, last:arr[arr.length-1]};

  },
  diversion:function(status){

    var copy = {};
    var copy2 = {};
    var cht = this.bindData.chart;
    var change = jQuery(".diver");

    if(cht.xAxis != undefined) {
      if(status === "0") { change.attr("get-data", "1"); }
      else { change.attr("get-data", "0"); }
      copy = this.parser(3, cht.xAxis);
      copy2 = this.parser(3, cht.yAxis);
      cht.xAxis = copy2;
      cht.yAxis = copy;
    } else {
      if(status === "0") { change.attr("get-data", "1"); }
      else { change.attr("get-data", "0"); }
      copy = this.parser(3, cht.angleAxis);
      copy2 = this.parser(3, cht.radiusAxis);
      cht.angleAxis = copy2;
      cht.radiusAxis = copy;
    }

    this.chartMapping(this.bindData.chartType, this.bindData.data.value, this.parser(3, this.bindData.chart), []);
    this.render();
    this.event();

  },
  cellSetUpdate:function(rowIndex, colIndex, value){

    var rows = this.bindData.data.value;
    var count = 0;
    var newValue;

    for (var key in rows[rowIndex]) {
      if(count == colIndex) {
          newValue = jQuery.isNumeric(value) ? parseInt(value) : value;
          rows[rowIndex][key] = newValue;
      }
      count++;
    }
    this.chartMapping(this.bindData.chartType.group, this.bindData.data.value, this.parser(3, this.bindData.chart), []);
    this.render();
    this.event();

  },
  rowSetUpdate2:function(state){
    var rows = this.bindData.data.value;
    var target = [];
    var row  = {};
    var rowIndex  = 0;

    try {
      if(state == "1") {

        row.group = 1;
        row.name = "Text";
        row.value = 0;
        AUIGrid.addRow(this.gridData, row, "last");
        this.bindData.data.value.push(row);

      } else {
        rowIndex = AUIGrid.getSelectedItems(this.gridData, "selectedIndex")[0].rowIndex;
        rows.splice(rowIndex, 1);
        AUIGrid.removeRow(this.gridData, "selectedIndex");
        AUIGrid.removeSoftRows(this.gridData);
      }
      this.chartMapping(this.bindData.chartType.group, this.bindData.data.value, this.parser(3, this.bindData.chart), []);
      this.render();
      this.event();
    } catch(ex) {
      console.log(ex);
      alert("삭제할 Row의 Cell을 선택해주십시오");
    }


  },
  rowSetUpdate:function(state){

    var rows = this.bindData.data.value;
    var target = [];
    var row  = {};
    var rowIndex  = 0;

    try {
      if(state == "1") {
        row = this.parser(3, rows[0]);
        for(var k in row) {
          if(rowIndex == 0) {
            row[k] = "addRow" + (rows.length + 1);
            rowIndex++;
          }
          else { row[k] = 0; }
        }
        AUIGrid.addRow(this.gridData, row, "last");
        this.bindData.data.value.push(row);
      } else {
        rowIndex = AUIGrid.getSelectedItems(this.gridData, "selectedIndex")[0].rowIndex;
        rows.splice(rowIndex, 1);
        AUIGrid.removeRow(this.gridData, "selectedIndex");
        AUIGrid.removeSoftRows(this.gridData);
      }
      this.chartMapping(this.bindData.chartType, this.bindData.data.value, this.parser(3, this.bindData.chart), []);
      this.render();
      this.event();
    } catch(ex) {
      console.log(ex);
      alert("삭제할 Row의 Cell을 선택해주십시오");
    }

  },
  columnSetUpdate:function(state, name) {

    var rows     = this.bindData.data.value;
    var colIndex = 0;
    var colMax   = 0;
    var colCopy  = [];
    var data     = "";

    try {
      if(state == "1") {

        colCopy = AUIGrid.getColumnInfoList(this.gridData);
        for(var i=0; i<rows.length; i++) { rows[i][name] = 0; }
        var col = {
          dataField:name,
          headerText:name,
          width:_grid.colSize,
          defaultValue: 0,
          minWidth : 50
        };
        AUIGrid.addColumn(this.gridData, col, "last");

      } else {
        colIndex = AUIGrid.getSelectedItems(this.gridData, "selectedIndex")[0].columnIndex;
        data = AUIGrid.getSelectedItems(this.gridData,"selectedIndex")[0].dataField;

        if(colIndex == 0) { alert("label영역은 제거할 수 없습니다"); return false; }
        for(var j=0; j<rows.length; j++) {
          delete rows[j][data];
        }
        AUIGrid.removeColumn(this.gridData, "selectedIndex");
      }
      this.chartMapping(this.bindData.chartType, this.bindData.data.value, this.parser(3, this.bindData.chart), []);
      this.render();
      this.event();
    } catch(ex) {
      console.log(ex);
      alert("삭제할 Column의 Cell을 선택해주십시오");
    }

  },
  echartRender:function(option){
      var element = jQuery("<div></div>").prop("id","chart-panel").prop("class","right-panel");
      jQuery(".chart-container").empty().append(element);

      var chart = document.getElementById('chart-panel');
      var myChart = echarts.init(chart);
      myChart.setOption(option);

      window.onresize = function(){
        myChart.resize();
      };
  },
  parser:function(x, obj){
    if(x == 1) { return JSON.parse(obj); }
    if(x == 2) { return JSON.stringify(obj); }
    if(x == 3) { return JSON.parse(JSON.stringify(obj)); }
  }

};
