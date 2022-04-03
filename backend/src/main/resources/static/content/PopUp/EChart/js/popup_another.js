jQuery(document).ready(function(){
  ex.init();
});

var ex = {

  init:function() {
    this.modal();
  },
  chartData:{},
  gridData:{},
  bindData:{},
  chartTypeData:{},
  resize:function() {

    if(jQuery(window).width() <= 800) {
      jQuery(".menu-Content").hide();
    } else {
      jQuery(".menu-Content").show();
    }

    if (typeof this.gridData !== "undefined") { AUIGrid.resize(this.gridData); }

  },
  chartMapping:function(type, bindSetValue, cht, bindPaser) {

      var num       = 0;
      var cnt       = 0;
      var status    = false;
      var legendBox = [];
      var bindBox   = [];
      var keyValue  = "";

      if(type == "B-Type") {

        var recursive2 = function(obj) {
          for(var q in obj) {
            if(q == "data" && Array.isArray(obj[q])) {
              if(bindBox[num] != undefined) {
                obj[q] = bindBox[num];
                num++;
              } else {
                obj[q] = [];
              }
            } else {
              if(typeof obj[q] == "object") { recursive2(obj[q]); }
            }
          }
        };

        legendBox[0] = [];
        legendBox[1] = [];

        for(a=0; a<bindSetValue.length; a++) {
          if(bindSetValue[a].group > cnt) {
            cnt = bindSetValue[a].group;
          }
        }

        for(var b=0; b<cnt; b++) { bindBox[b] = []; }

        for(var e=0; e<bindSetValue.length; e++) {
          legendBox[0].push(bindSetValue[e].name);
          cnt = (bindSetValue[e].group - 1);
          bindBox[cnt].push(bindSetValue[e]);
        }

        jQuery.each(legendBox[0], function(k, v){ // 중복제거
          if(jQuery.inArray(v, legendBox[1]) === -1) legendBox[1].push(v);
        });

        if(cht.legend != undefined) {
            cht.legend.data = legendBox[1];
        }
        recursive2(cht.series);
        this.chartData = cht;

      } else {

        var recursive = function(obj){ // 프로퍼티 변경
          for(var k in obj) {
            if(k == "markLine" || k == "markPoint") { // 해당키의 "data" 옵션이 포함될때
              return;
            }
            if(k == "data" && Array.isArray(obj[k])) {
                if(bindPaser[num] != undefined) { obj[k] = bindPaser[num]; num++; }
                else { obj[k] = []; }
            } else if(k == "name" && keyValue == "series" && status) {
                obj[k] = legendBox[cnt]; cnt++;
            } else {
                if(typeof obj[k] == "object") { recursive(obj[k]); }
            }
          }
        };

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
            case "angleAxis": recursive(cht[key]); break;
            case "radiusAxis": recursive(cht[key]); break;
            case "xAxis": recursive(cht[key]); break;
            case "yAxis": recursive(cht[key]); break;
            case "series": keyValue = key; recursive(cht[key]); break;
          }
        }
        this.chartData = cht;
      }

  },
  dataAlignment:function(binding){

    // var series = false;
    // var

    // var alignment = function(obj) {
    //   for(var k in obj) {
    //     if(k == "data" && Array.isArray(obj[k])) { // 더이상 재귀로 쪼개어지지않을때
    //       if(typeof obj[k][0] != "object") { // value filter
    //         bindSample.value[count] = [];
    //         bindSample.value[count] = obj[k];
    //         count++;
    //       } else if(type == "B-Type"){ // B-type filter
    //         lengths = lengths + obj[k].length;
    //         bindSample.value.push(obj[k]);
    //       } else if(confirm && Array.isArray(obj[k][0])) { // [['value1','value2'],['value1','value2']] filter
    //           if(typeof obj[k][0][0] != "object") {
    //             for(var i=0; i<obj[k].length; i++) {
    //               bindSample.value[count] = [];
    //               bindSample.value[count] = obj[k][i];
    //               count++;
    //             }
    //           }
    //       }
    //     } else {
    //       if(typeof obj[k] == "object") { alignment(obj[k]); }
    //       else { }
    //     }
    //   }
    // };
    //
    // for(var key in binding) {
    //   switch(key) {
    //     case "angleAxis":
    //       confirm = Object.keys(binding[key]).length == 0 ? true : (confirm || false);
    //       alignment(binding[key]);
    //       break;
    //     case "radiusAxis":
    //       confirm = Object.keys(binding[key]).length == 0 ? true : (confirm || false);
    //       alignment(binding[key]);
    //       break;
    //     case "xAxis":
    //       confirm = Object.keys(binding[key]).length == 0 ? true : (confirm || false);
    //       alignment(binding[key]);
    //       break;
    //     case "yAxis":
    //       confirm = Object.keys(binding[key]).length == 0 ? true : (confirm || false);
    //       alignment(binding[key]);
    //       break;
    //     case "series": alignment(binding[key]); break;
    //   }
    // }


    return {};
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
            } else if(confirm && Array.isArray(obj[k][0])) { // [['value1','value2'],['value1','value2']] filter
                if(typeof obj[k][0][0] != "object") {
                  for(var i=0; i<obj[k].length; i++) {
                    bindSample.value[count] = [];
                    bindSample.value[count] = obj[k][i];
                    count++;
                  }
                }
            }
          } else {
            if(typeof obj[k] == "object") { alignment(obj[k]); }
            else { }
          }
        }
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
                    if(confirm) {
                        obj[j]['data' + i] = array[i][j];
                    } else {
                        obj[j].label = array[i][j];
                    }
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
      var confirm    = false;

      if(bool) {

        if(type == "B-Type") {

          alignment(cht.series);
          bindSet.value = sortGrid2(bindSet.value);
          bindOption = _grid.gridPropDiffer;
        } else {
          bindOption = _grid.gridProp;
        }

        gridID = AUIGrid.create("#grid-container", _grid.colSet(bindSet.value[0]), bindOption);
        AUIGrid.setGridData(gridID, bindSet.value);
        that.gridData = gridID;

      } else {

        for(var key in sample) {
          switch(key) {
            case "angleAxis":
              confirm = Object.keys(sample[key]).length == 0 ? true : (confirm || false);
              alignment(sample[key]);
              break;
            case "radiusAxis":
              confirm = Object.keys(sample[key]).length == 0 ? true : (confirm || false);
              alignment(sample[key]);
              break;
            case "xAxis":
              confirm = Object.keys(sample[key]).length == 0 ? true : (confirm || false);
              alignment(sample[key]);
              break;
            case "yAxis":
              confirm = Object.keys(sample[key]).length == 0 ? true : (confirm || false);
              alignment(sample[key]);
              break;
            case "series": alignment(sample[key]); break;
          }
        }

        if(type == "B-Type") {
          bindSample.value = sortGrid2(bindSample.value);
          bindSample.key = type;
          bindOption = _grid.gridPropDiffer;
        } else {
          bindSample.value = sortGrid(bindSample.value);
          bindSample.key = type;
          bindOption = _grid.gridProp;
        }

        that.bindData = bindSample;
        gridID = AUIGrid.create("#grid-container", _grid.colSet(bindSample.value[0]), bindOption);
        AUIGrid.setGridData(gridID, bindSample.value);
        that.gridData = gridID;

      }
    };

    var that      = this;
    var bindPaser = [];
    var sample    = that.parser(3, cht);
    var status    = jQuery(".switch2 > input").prop("checked");

    try {

      if(bindSet != undefined && status) {
          that.bindData = bindSet;
          that.chartMapping(type, bindSet.value, cht, bindPaser);
      } else {
          gridMappingCheck(false);
          return sample;
      }

      var test = document.getElementById('exceptionCheck');
      var myTest = echarts.init(test);
      myTest.setOption(cht);
      jQuery(".test-box").empty();

      if(bindSet.key == type) {
        gridMappingCheck(true);
        return cht;
      }
      else {
        alert("바인딩형식이 샘플차트정보와 맵핑되지 않으므로\n샘플 편집모드로 전환합니다.");
        gridMappingCheck(false);
        return sample;
      }

    } catch(ex) {
      console.log(ex);
      jQuery(".test-box").empty();
      alert("바인딩형식이 샘플차트정보와 맵핑되지 않으므로\n샘플 편집모드로 전환합니다.");
      gridMappingCheck(false);
      return sample;
    }

  },
  modal:function(){

    var that      = this;
    var element   = {};
    var child     = {};
    var grouInfo = {};
    var chartType = _charts.dataMap;

    var groupType = function(type) {
      var info = "";
      if(type == "pie" || type == "funnel") { info = "B-Type"; }
      else { info = "A-Type"; }
      return { "info" : info, "type" : type };
    };


    var Data = {
        "xAxis": {
          "type": "category",
          "boundaryGap": true,
          "data": [
            "A-class",
            "B-class",
            "C-class",
            "D-class"
          ]
        },
        "yAxis": {
          "type": "value"
        },
        "series": [
          {
            "data": [
              77,
              111,
              77,
              88
            ],
            "type": "line",
            "areaStyle": {}
          },
          {
            "data": [
              33,
              33,
              44,
              44
            ],
            "type": "line",
            "areaStyle": {}
          },
          {
            "data": [
              11,
              25,
              33,
              33
            ],
            "type": "line",
            "areaStyle": {}
          }
        ]
    };

    var bindSet = this.dataAlignment(bindSet);


    // var bindSet  = {
    //   key:"A-Type",
    //   value:[
    //     {"lable":"A-class","apple":77,"grape":33,"space":11},
    //     {"lable":"B-class","apple":111,"grape":33,"space":25},
    //     {"lable":"C-class","apple":77,"grape":44,"space":33},
    //     {"lable":"D-class","apple":88,"grape":44,"space":33}
    //   ]
    // };

    // var bindSet = {
    //   key:"B-Type",
    //   value:[
    //       {"group":1, "name":'광고1', "value":25},
    //       {"group":1, "name":'제품', "value":50},
    //       {"group":1, "name":'검색엔진', "value":75},
    //       {"group":1, "name":'검색정보', "value":100},
    //       // {"group":2, "name":'직행', "value":335},
    //       // {"group":2, "name":'메일광고', "value":310},
    //       // {"group":2, "name":'제휴광고', "value":234},
    //       // {"group":2, "name":'영상광고', "value":135},
    //       // {"group":2, "name":'Baidu', "value":1048},
    //       // {"group":2, "name":'Google', "value":251},
    //       // {"group":2, "name":'Bing', "value":147},
    //       // {"group":2, "name":'기타', "value":102}
    //   ]
    // };



    for(var k in chartType) {
        grouInfo = groupType(k);
        element = jQuery("<li></li>").prop("class","p-0");
        child   = jQuery("<a></a>").prop("class","chart-a");
        child   = child.prop("id","left-chart-nav-" + k);
        child   = child.prop("href","#chart-type-" + k);
        child   = child.append("<div class='chart-icon'></div>");
        child   = child.append("<div class='chart-name'>" + k + "</div>");
        if(grouInfo.info == bindSet.key) {
          child = child.append("<i class='bind fa fa-cube' style='color:rgb(21, 121, 199);'></i>");
        }
        element = element.append(child);
        jQuery("#left-chart-nav > ul").append(element);

        jQuery(".chart-list-panel").append("<h3 class='chart-type-head' id='chart-type-" + k + "'>" + k + "</h3>");
        element = jQuery("<div class='row'></div>").prop("id","chart-type-" + k);
        for(var i=0; i<chartType[k].length; i++) {
          child = jQuery("<a class='chart-link' href='#' data-map='" + chartType[k][i] + "'></a>");
          child = child.append("<h4 class='chart-title'>" + chartType[k][i] + "</h4>");
          child = child.append("<img class='chart-area' src='data/" + chartType[k][i] + ".png' style='display: inline;'>");
          child = jQuery("<div class='chart'></div>").append(child);
          child = jQuery("<div></div>").prop("class","col-xl-3 col-lg-3 col-md-4 col-sm-6").append(child);
          element.append(child);
          jQuery(".chart-list-panel").append(element);
        }
    }

    element = jQuery("<label></label>").prop("class","setBind").text("DataSet-Option");
    child   = jQuery("<label></label>").prop("class","switch2");
    child   = Object.keys(bindSet).length != 0 ? child.append("<input type='checkbox' checked>") : child.append("<input type='checkbox' disabled>");
    child   = child.append("<span class='slider round'></span>");
    jQuery(".menu-Content").append(element);
    jQuery(".menu-Content").append(child);

    jQuery(document).on("click",".chart-link",function(){
      var map  = jQuery(this).attr("data-map");
      that.chartTypeData = groupType(map.split("-")[0]);
      if(_charts.sample[map] == undefined) {
        console.log("Not Chart Sample Data");
        return false;
      }
      that.chartData = that.dataMapper(that.chartTypeData.info, bindSet, _charts.sample[map]);
      that.gridMenu(that.bindData.key);
      that.rander();
  	  that.event();
      jQuery(".ListBox").hide();
    });

    jQuery(document).on("click", ".switch2 > input", function(){
      var checked = jQuery(this).prop("checked");
      if(checked) {
        jQuery(".bind").css("color","#1579c7");
      } else {
        jQuery(".bind").css("color","#cccccc");
      }
    });

    jQuery("#colClose").click(function(){
      jQuery(".colNameBox").hide();
    });

    jQuery("#insert").click(function(){
      var colName = jQuery("#colData").val();
      var message = jQuery(".message");
      var bind = that.bindData.value[0];
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

  },
  gridMenu:function(data){
    if(data == "A-Type") {
        jQuery(".tab-container > ul").append(
          "<li class='tab-li'><a href='#' class='row-a' get-data='1'><i class='fa fa-plus'></i><span>Row</span></a></li>"  +
          "<li class='tab-li'><a href='#' class='row-a' get-data='0'><i class='fa fa-minus'></i><span>Row</span></a></li>" +
          "<li class='tab-li'><a href='#' class='col-a' get-data='1'><i class='fa fa-plus'></i><span>Col</span></a></li>"  +
          "<li class='tab-li'><a href='#' class='col-a' get-data='0'><i class='fa fa-minus'></i><span>Col</span></a></li>" +
          "<li class='tab-li'><a href='#' class='diver' get-data='0'><i class='fa fa-retweet'></i><span>Diversion</span></a></li>"
        );
    } else {
        jQuery(".tab-container > ul").append(
          "<li class='tab-li'><a href='#' class='row-b' get-data='1'><i class='fa fa-plus'></i><span>Row</span></a></li>" +
          "<li class='tab-li'><a href='#' class='row-b' get-data='0'><i class='fa fa-minus'></i><span>Row</span></a></li>"
        );
    }
  },
  rander:function(){

    var that    = this;
    var map     = _charts.classMap; // data-map.j s menuBox mapData
    var cht     = this.chartData;
    var status  = map.__level - map.__level;
    var el      = "";
    var single  = "";
    var setMenu = "";
    var disablekey  = "";
    var name    = "option";
    var tPoint  = [];

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
        var jsn = "[";
        if(obj.length == 0) return "";
        for(var j=0; j<obj.length; j++) {
          if(typeof obj[j] === "string")
            jsn += "\"" + obj[j] + "\", ";
          else
            jsn += obj[j] + ", ";
        }
        jsn = jsn.substr(0, jsn.lastIndexOf(", "));
        return jsn + "]";
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
            e = "<li class='p-10 lilv-" + s + "' lv-" + s + "=" + k + ">" +
                "<label class='col-12 col-form-label'><i class='fs fa fa-plus' aria-hidden='true'></i>" + k  +
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
              io = that.parser(2, p) == "{}" ? "{}" : "";
              io = "<textarea class='form-control' placeholder='ex - { } / {\"key\":\"value\"}' " + t + ">" + io + "</textarea>";
              col = "col-12";
            }
            if(typeof o == "number") {
              io = "<input type='Number' class='form-control' placeholder='" + o + "' value='" + p +"' " + t + ">";
            }
            if(typeof o == "boolean") {
              io = "<label class='switch'>" +
                   "<input type='checkbox' " + t + (p === true ? "checked" : "") + ">" +
                   "<span class='slider round'></span>" +
                   "</label>";
            }

            if(!(Array.isArray(o))) {
              e = "<li class='p-10 lilv-" + s + "' lv-" + s + "=" + k + ">" +
                  "<label class='col-5 col-form-label'>" + k + "</label>" +
                  "<div class='d-ib " + col + "'>" + io + "</div></li>";
              return e;
            } else {
              if(k == "data") {
                p  = codetxt(p);
                t  = disablekey.length != 0 ? t : t + "disabled";
                io = 'ex - [\"StringValue\" / IntegerValue]';
                e  = "<li class='p-10 lilv-" + s + "' lv-" + s + "=" + k + ">" +
                     "<label class='col-5 col-form-label'>" + k + "</label><div class='col-12'>" +
                     "<textarea class='form-control' placeholder='" + io + "' " + t + ">"+ p + "</textarea>" +
                     "</div></li>";
                return e;
              } else if(o[0] === "multiple") {
                p  = codetxt(p);
                io = 'ex - ["value","value"]';
                e  = "<li class='p-10 lilv-" + s + "' lv-" + s + "=" + k + ">" +
                     "<label class='col-5 col-form-label'>" + k + "</label><div class='col-12'>" +
                     "<textarea class='form-control' placeholder='" + io + "' " + t + ">"+ p + "</textarea>" +
                     "</div></li>";
                return e;
              }
              else {
                e = "<li class='p-10 lilv-" + s + "' lv-" + s + "=" + k + ">" +
                    "<label class='col-5 col-form-label'>" + k + "</label>" +
                    "<div class='d-ib col-7'><select class='form-control' name='" + k +"' " + t + ">";
                for(var i=0; i<o.length; i++) {
                  io = p == o[i] ? "selected" : "";
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
      var cnt = 0;

      for(var key in obj) {
        if(key != "__level") {
          if(cht[key] != undefined) {
            if(cnt == 0) { setMenu = key; } cnt++;
            top = jQuery("<li></li>").attr("key-menu", key).prop("class", "menu");
            arr = jQuery("<a></a>").prop("href", "#").prop("class","nav-link");
          } else {
            top = jQuery("<li></li>").attr("key-menu", key).prop("class", "disabled");
            arr = jQuery("<a></a>").prop("href", "#").prop("class","nav-link disabled");
          }
          arr = arr.append("<span>" + key + "</span>");
          switch(key) {
            case "polar":      break;
            case "angleAxis":  break;
            case "radiusAxis": break;
            case "xAxis":      break;
            case "yAxis":      break;
            case "series":     break;
            default: arr = arr.append("<i class='ck fa fa-check'></i>");
          }
          top = top.append(arr);
          jQuery("#optionA").append(top);
        }
        if(Array.isArray(cht[key]) && cht[key].length > 1) {
          top = jQuery("<div></div>").attr("key-menu2", key + "Arr").prop("class", "menu arr");
          for(var i=0; i<cht[key].length; i++) {
            arr = jQuery("<li></li>").attr("data-arr", key + "-" + i);
            arr = arr.append("<a href='#' class='nav-link'>" + txt + "data"  + "[" + (i+1) + "]</a>");
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

    elementMenu(map, cht);
    elementMenu2(map, cht);
    jQuery("#optionB").append(el);
    jQuery("div[key-info=" + setMenu + "]").toggleClass("itm-none");
    jQuery('.colorful').colorpicker();
    this.echartRander(cht);

  },
  event:function(){

    jQuery(document).off("click");

    var that       = this;
    var target     = 0;
    var focusData  = "";

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
          prop = prop.substr(1, prop.length-2);
          prop = prop.replace(/\"|(\s*)/gi, "");
          result = prop.split(",");
          if(jQuery.isNumeric(result[0])) {
            for(var j=0; j<result.length; j++) {
              result[j] = parseInt(result[j]);
            }
            return result;
          } else {
            return result;
          }
        } else {
          return prop;
        }
      }
    };

    var chartUpdate = function(data, point) { // a : dataset /// b : tree-info
      var status = -1;
      var option = that.chartData;
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
      that.echartRander(option);

    };

    var propDisabled = function(access) {
      var option = that.chartData;
      for(var k in option) {
        if(k == access) {
          delete option[k];
        }
      }
      that.echartRander(option);
      jQuery("div[key-info=" + access + "]").find("input").val("");
      jQuery("div[key-info=" + access + "]").find("textarea").val("");
      jQuery("div[key-info=" + access + "]").find("select").val("");
      jQuery("div[key-info=" + access + "]").find("i").prop("class","fs fa fa-plus");
    };

    jQuery(document).on("click","li[key-menu]",function(){

      var dis = jQuery(this).attr("class");
      var get = jQuery(this).attr("key-menu");
      if(dis == "disabled") {
        return false;
      }

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
        jQuery("div[key-info]").addClass("itm-none");
        propDisabled(get2.attr("key-menu"));
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

    // data input chart randering
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

      if(jQuery(this).prop("id") === "colData") {
        return false;
      }

      var change = jQuery(this).val();
      var target = jQuery(this).attr("data-lv");
      if(focus == change) {
        return false;
      }
      chartUpdate(change, target);
    });

    jQuery("input[type=Number]").blur(function(){
      var change = jQuery(this).val();
      var target = jQuery(this).attr("data-lv");
      if(focus == change) {
        return false;
      }
      chartUpdate(parseInt(change), target);
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

  },
  diversion:function(status){

    var copy = {};
    var copy2 = {};
    var cht = this.chartData;
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

    this.chartMapping(this.chartTypeData, this.bindData.value, this.parser(3, this.chartData), []);
    this.rander();
    this.event();

  },
  cellSetUpdate:function(rowIndex, colIndex, value){

    var rows = this.bindData.value;
    var count = 0;
    var newValue;

    for (var key in rows[rowIndex]) {
      if(count == colIndex) {
          newValue = jQuery.isNumeric(value) ? parseInt(value) : value;
          rows[rowIndex][key] = newValue;
      }
      count++;
    }
    this.chartMapping(this.chartTypeData.info, this.bindData.value, this.parser(3, this.chartData), []);
    this.rander();
    this.event();

  },
  rowSetUpdate2:function(state){
    var rows = this.bindData.value;
    var target = [];
    var row  = {};
    var rowIndex  = 0;

    try {
      if(state == "1") {

        row.group = 1;
        row.name = "Text";
        row.value = 0;
        AUIGrid.addRow(this.gridData, row, "last");
        this.bindData.value.push(row);

      } else {
        rowIndex = AUIGrid.getSelectedItems(this.gridData, "selectedIndex")[0].rowIndex;
        rows.splice(rowIndex, 1);
        AUIGrid.removeRow(this.gridData, "selectedIndex");
        AUIGrid.removeSoftRows(this.gridData);
      }
      this.chartMapping(this.chartTypeData.info, this.bindData.value, this.parser(3, this.chartData), []);
      this.rander();
      this.event();
    } catch(ex) {
      console.log(ex);
      alert("삭제할 Row의 Cell을 선택해주십시오");
    }


  },
  rowSetUpdate:function(state){

    var rows = this.bindData.value;
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
        this.bindData.value.push(row);
      } else {
        rowIndex = AUIGrid.getSelectedItems(this.gridData, "selectedIndex")[0].rowIndex;
        rows.splice(rowIndex, 1);
        AUIGrid.removeRow(this.gridData, "selectedIndex");
        AUIGrid.removeSoftRows(this.gridData);
      }
      this.chartMapping(this.chartTypeData, this.bindData.value, this.parser(3, this.chartData), []);
      this.rander();
      this.event();
    } catch(ex) {
      console.log(ex);
      alert("삭제할 Row의 Cell을 선택해주십시오");
    }

  },
  columnSetUpdate:function(state, name) {

    var rows     = this.bindData.value;
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
      this.chartMapping(this.chartTypeData, this.bindData.value, this.parser(3, this.chartData), []);
      this.rander();
      this.event();
    } catch(ex) {
      console.log(ex);
      alert("삭제할 Column의 Cell을 선택해주십시오");
    }

  },
  echartRander:function(option){
      var element = jQuery("<div></div>").prop("id","chart-panel").prop("class","right-panel");
      jQuery(".chart-container").empty().append(element);

      var chart = document.getElementById('chart-panel');
      var myChart = echarts.init(chart);
      myChart.setOption(option);

      console.log(option);
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
