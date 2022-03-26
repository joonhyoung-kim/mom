
var openMes = {
    CONDITION: "DATASET.TABLE1",
    COLUMNNAME: "DATASET.Table1.Columns",
    ROWSNAME: "DATASET.Table1.Rows",
    PARAMNAME: "HASHTABLE",
    url: "",
    uploadUrl: "",
    downloadUrl: "",
    siteId: "U-TECH",
    command: "RuleInquiry",
    classId: "MES",
    commandType: "StoredQuery",
    version: "001",
    id: "GETSTOREDQUERYLIST",
    menuType: "",
    user: (function (args) {
        var f = function (obj1, obj2) {
            //get 
            //openMes.user();
            //openMes.user("");
            //set
            //openMes.user("", "");
            //openMes.user("", {});
            //openMes.user({});

            var flag = obj1 == null ? "get" : typeof obj1 == "object" ? "set" : obj2 != null ? "set" : "get";
            var result = {};
            switch (flag) {
                case "get":
                    result = openMes.user.get(obj1);
                    break;
                case "set":
                    result = openMes.user.set(obj1, obj2);
                    break;
            }
            return result;
        };

        for (i in args) {
            f[i] = args[i];
        }
        return f;
    }
        ({
            result: {},
            resetFlag: true,
            resultParse: function () {
                var result = openMes.user.result;
                $.each(result, function (i, v) {
                    if (v != null) {
                        if (v[0] == "{" || v[0] == "[") {
                            openMes.user.result[i] = JSON.parse(v);
                        }
                    }
                });
            },
            get: function (obj1) {
                var result = {};
                if (openMes.user.resetFlag) {
                    openMes.user.result.SITEID = sessionStorage.getItem("SITEID");
                    openMes.user.result.USERID = sessionStorage.getItem("USERID");
                    openMes.user.result.USERNAME = sessionStorage.getItem("USERNAME");
                    openMes.user.result.LANGUAGE = sessionStorage.getItem("LANGUAGE");
                    openMes.user.result.USERCLASSID = sessionStorage.getItem("USERCLASSID");
                    openMes.user.resultParse();
                }
                result = openMes.user.result;
                if (typeof obj1 == "string") {
                    result = result[obj1];
                }
                openMes.user.resetFlag = false;
                return result;
            },
            set: function (obj1, obj2) {
                if (obj2) {
                    if (typeof obj2 == "object") {
                        obj2 = JSON.stringify(obj2);
                    }
                    sessionStorage.setItem(obj1, obj2);
                } else {
                    $.each(obj1, function (i, v) {
                        if (typeof v == "object") {
                            v = JSON.stringify(v);
                        }
                        sessionStorage.setItem(i, v);
                    });
                }
                openMes.user.resetFlag = true;
            }
        }))
    ,
    lang: (function (args) {
        var f = function (str) {
            var result = openMes.lang.list[str];
            if (result == undefined) {
                openMes.langSet();
            }
            result = result ? result[sessionStorage.LANGUAGE || "KR"] : str;
            result = result || str;
            return result;
        };

        for (i in args) {
            f[i] = args[i];
        }
        return f;
    }
        ({
            list: {}
        }))
    ,
    langSet: function (flag) {
        // flag : true 일시 무조건 다시 리프레쉬 (sessionStorage에서 가져옴)
        if (flag || openMes.lang.list.length == null) {
            if (sessionStorage.MENUDATA != null) {
                openMes.lang.list = micaCommon.fncS.keyValueSet({ data: openMes.colRowSet(JSON.parse(sessionStorage.MENUDATA), "Table3"), key: "ID" });
            }
        }
    },
    setHostURL: function () {
        if (openMes.url == "") {
            $.ajax({ type: "get", url: "/api/dataset/host", async: false }).done(function (data) { openMes.url = data; });
        }
    },
    grid: {
        langFormOptions: function (options) {

            //$.jgrid.regional["en"].edit.msg.required = "DSSS"
            //options.msg.required = openMes.lang("MU0002");
            //options.required = openMes.lang("MU0002");
            $.jgrid.regional["en"].edit.msg.required = openMes.lang("MU0002");
            $.jgrid.regional["en"].edit.msg.number = openMes.lang("MU0003");
            $.jgrid.regional["en"].edit.msg.minValue = openMes.lang("MU0004");
            $.jgrid.regional["en"].edit.msg.maxValue = openMes.lang("MU0005");
            $.jgrid.regional["en"].edit.msg.email = openMes.lang("MU0006");
            $.jgrid.regional["en"].edit.msg.integer = openMes.lang("MU0007");
            $.jgrid.regional["en"].edit.msg.date = openMes.lang("MU0008");
            $.jgrid.regional["en"].edit.msg.url = openMes.lang("MU0009");
            $.jgrid.regional["en"].edit.msg.nodefined = openMes.lang("MU0010");
            $.jgrid.regional["en"].edit.msg.novalue = openMes.lang("MU0011");
            $.jgrid.regional["en"].edit.msg.customarray = openMes.lang("MU0012");
            $.jgrid.regional["en"].edit.msg.customfcheck = openMes.lang("MU0013");
            //edit = {
            //        addCaption: "Add Record",
            //        editCaption: "Edit Record",
            //        bSubmit: "Submit",
            //        bCancel: "Cancel",
            //        bClose: "Close",
            //        saveData: "Data has been changed! Save changes?",
            //        bYes : "Yes",
            //        bNo : "No",
            //        bExit : "Cancel",
            // form
            options.addCaption = openMes.lang("ADDRECORD");
            options.editCaption = openMes.lang("EDITRECORD");
            options.bSubmit = openMes.lang("SUBMIT");
            options.bCancel = openMes.lang("CANCEL");
            options.bClose = openMes.lang("CLOSE");
            options.saveData = openMes.lang("MU0014");
            options.bYes = openMes.lang("YES");
            options.bNo = openMes.lang("NO");
            options.bExit = openMes.lang("CANCEL");
            options.delMsg = options.delMsg || openMes.lang("MU0015"); // del MSG;
            options.msg = openMes.lang("MU0015"); // del MSG;
            //options.msg = openMes.lang("MU0015");// del MSG;
            options.delChildMsg = openMes.lang("MU0016"); // del MSG;
            options.caption = openMes.lang("DELETERECORD"); // del 레코드 추가.

            options.selMsg = openMes.lang("MU0001");
            if (options.msg == null) {
                options.msg = {};
            }
            //form
            return options
        },
        addForm: function (grid, options) {
            //afterComplete : data add after
            var url = options.url || openMes.url;
            options.type = "CREATE";
            micaCommon.grid.ajaxSetup();
            options.colModel = micaCommon.grid.get(grid, "getGridParam", "colModel");
            var gridOptions = options;
            gridOptions.serializeEditData = openMes.crudSerializeDataFnc(options);
            gridOptions = this.langFormOptions(gridOptions);
            micaCommon.grid.addForm(grid, url, "post", gridOptions);
        },
        editForm: function (grid, options) {
            var url = options.url || openMes.url;
            options.type = "UPDATE";
            micaCommon.grid.ajaxSetup();
            options.colModel = micaCommon.grid.get(grid, "getGridParam", "colModel");
            var gridOptions = options;
            gridOptions.serializeEditData = openMes.crudSerializeDataFnc(options);
            gridOptions = this.langFormOptions(gridOptions);
            micaCommon.grid.editForm(grid, url, "post", gridOptions);
        },
        delForm: function (grid, options) {
            var url = options.url || openMes.url;
            options.type = "DELETE";
            micaCommon.grid.ajaxSetup();
            options.colModel = micaCommon.grid.get(grid, "getGridParam", "colModel");
            var gridOptions = options;
            gridOptions.serializeDelData = openMes.crudSerializeDataFnc(options);
            gridOptions = this.langFormOptions(gridOptions);
            micaCommon.grid.delForm(grid, url, "post", gridOptions);
        },
        set: function (grid, gridOptions, options, callBack) {
            // gridOptions : jqGrid options
            // options : siteId , classId ,command, param
            // callBack : before(function) , after(function) -> param = data, gridOptions, options
            callBack = callBack || {};
            gridOptions = gridOptions || {};
            openMes.setHostURL();
            options = options || {};

            callBack.exception = callBack.exception || openMes.exceptionSet;
            if (gridOptions.data == null) {
                mtype = options.mtype || "post";
                options.url = options.url || openMes.url;
                var data = openMes.RdataSet(options, options.postData);
                if (callBack.before) {
                    callBack.before = [openMes.beforGridSet, openMes.grid.langGridSet, callBack.before];
                } else {
                    callBack.before = [openMes.beforGridSet, openMes.grid.langGridSet];
                }
                micaCommon.grid.set(grid, gridOptions, { url: options.url, mtype: mtype, rowsName: openMes.ROWSNAME, data: JSON.stringify(data) }, callBack);
            } else {
                gridOptions = gridOptions || {};
                if (callBack.before) {
                    callBack.before = [openMes.grid.langGridSet, callBack.before];
                } else {
                    callBack.before = [openMes.grid.langGridSet];
                }
                micaCommon.grid.set(grid, gridOptions, options, callBack);
            }
        },
        get: micaCommon.grid.get,
        submit: function (grid) {
            // ...
        },
        langGridSet: function (data, gridOptions, options) {
            openMes.langSet();
            $.each(gridOptions.colModel, function (i, v) {
                //var str = openMes.lang.list[v.name];
                var str = openMes.lang(v.name);
                if (str) {
                    //str = str[sessionStorage.LANGUAGE];
                    gridOptions.colModel[i].label = str;
                }
            });
        }
    },
    pivotGrid: {
        set: function (grid, pivotOptions, gridOptions, options, callBack) {
            // pivotOptions : jqPivot options
            // gridOptions : jqGrid options
            // options : siteId , classId ,command, param
            // callBack : before(function) , after(function) -> param = data, gridOptions, options
            callBack = callBack || {};
            gridOptions = gridOptions || {};
            openMes.setHostURL();
            options.url = options.url || openMes.url;
            mtype = options.mtype || "post";
            callBack.exception = callBack.exception || openMes.exceptionSet;
            if (gridOptions.data == null) {
                var data = openMes.RdataSet(options, options.postData);
                if (callBack.before) {
                    callBack.before = [this.beforeSet, callBack.before];
                } else {
                    callBack.before = [this.beforeSet];
                }
                micaCommon.pivotGrid.set(grid, pivotOptions, gridOptions, { url: options.url, mtype: mtype, rowsName: openMes.ROWSNAME, data: JSON.stringify(data) }, callBack);
            } else {
                gridOptions = gridOptions || {};
                if (callBack.before) {
                    callBack.before = [callBack.before];
                } else {
                    callBack.before = [];
                }
                micaCommon.pivotGrid.set(grid, pivotOptions, gridOptions, options, callBack);
            }
        },
        get: micaCommon.grid.get,
        langGridSet: function (data, gridOptions, options) {
            openMes.langSet();
            $.each(gridOptions.colModel, function (i, v) {
                //var str = openMes.lang.list[v.name];
                var str = openMes.lang(v.name);
                if (str) {
                    //str = str[sessionStorage.LANGUAGE];
                    gridOptions.colModel[i].label = str;
                }
            });
        },
        beforeSet: function (data, elOptions, options) {
            pivotData = openMes.colRowSet(data);
        },
    },
    treeGrid: {
        addForm: function (grid, options) {
            //afterComplete : data add after
            var url = options.url || openMes.url;
            options.type = "CREATE";
            micaCommon.grid.ajaxSetup();
            options.colModel = micaCommon.grid.get(grid, "getGridParam", "colModel");
            // tree 부분 추가
            var selDatas = micaCommon.grid.get.selData(grid);
            if (selDatas.length > 0) {
                var originId = micaCommon.grid.get("#gridTable", "getGridParam").jsonReader.originId;
                var parentIdField = micaCommon.grid.get("#gridTable", "getGridParam").treeReader.originParent_id_field;
                var levelField = micaCommon.grid.get("#gridTable", "getGridParam").treeReader.originLevel_field;

                parentIdField = parentIdField.split("_origin")[0];
                levelField = levelField.split("_origin")[0];
                var colModel = micaCommon.grid.get("#gridTable", "getGridParam", "colModel");
                $.each(colModel, function (i, v) {
                    if (v.name == parentIdField) {
                        if (colModel[i]["editoptions"] == null) {
                            colModel[i]["editoptions"] = {};
                        }
                        colModel[i]["editoptions"]["defaultValue"] = selDatas[0][originId];
                    } else if (v.name == levelField) {
                        if (colModel[i]["editoptions"] == null) {
                            colModel[i]["editoptions"] = {};
                        }
                        //console.log(selDatas[0][levelField]);
                        colModel[i]["editoptions"]["defaultValue"] = Number(selDatas[0][levelField]) + 1;
                    }
                });
                //editoptions: { defaultValue: 'aValue' }
                $(grid).setGridParam({ colModel: colModel });
            }
            //.trigger('reloadGrid');
            // /tree 부분 추가

            var gridOptions = options;
            gridOptions.serializeEditData = openMes.crudSerializeDataFnc(options);
            gridOptions = openMes.grid.langFormOptions(gridOptions);
            micaCommon.treeGrid.addForm(grid, url, "post", gridOptions);
        },
        editForm: function (grid, options) {
            openMes.grid.editForm(grid, options);
        },
        delForm: function (grid, options) {
            var url = options.url || openMes.url;
            options.type = "DELETE";
            micaCommon.grid.ajaxSetup();
            options.colModel = micaCommon.grid.get(grid, "getGridParam", "colModel");
            var gridOptions = options;
            gridOptions.serializeDelData = openMes.crudSerializeDataFnc(options);
            gridOptions = openMes.grid.langFormOptions(gridOptions);
            //micaCommon.treeGrid.delForm(grid, url, "post", { delMsg: options.delMsg, delChildMsg: options.delChildMsg, serializeDelData: openMes.crudSerializeDataFnc(options), afterComplete: options.afterComplete });
            micaCommon.treeGrid.delForm(grid, url, "post", gridOptions);
        },
        set: function (grid, gridOptions, options, callBack) {
            // gridOptions : jqGrid options
            // options : siteId , classId ,command, param
            // callBack : before(function) , after(function) -> param = data, gridOptions, options
            callBack = callBack || {};
            openMes.setHostURL();
            //var data = openMes.postDataSet({ siteId: options.siteId, classId: options.classId, command: options.command });
            var data = openMes.RdataSet(options, options.postData);
            gridOptions = gridOptions || {};
            if (callBack.before) {
                callBack.before = [openMes.beforGridSet, openMes.grid.langGridSet, callBack.before];
            } else {
                callBack.before = [openMes.beforGridSet, openMes.grid.langGridSet];
            }
            micaCommon.treeGrid.set(grid, gridOptions, { url: openMes.url, mtype: "post", rowsName: openMes.ROWSNAME, data: JSON.stringify(data) }, callBack);
        },
    },
    chart: {
        set: function (el, elOptions, options, callBack) {
            callBack = callBack || {};
            if (callBack.before) {
                callBack.before = [this.beforSet, callBack.before];
            } else {
                callBack.before = [this.beforSet];
            }
            micaCommon.chart.set(el, elOptions, options, callBack);

        },
        beforSet: function (data, elOptions, options) {
            var column = micaCommon.restFul.hierarchyReturn(data, openMes.COLUMNNAME);
            column = micaCommon.restFul.column(column, "ColumnName", "Alias");
            var rows = micaCommon.restFul.hierarchyReturn(data, openMes.ROWSNAME);
            rows = micaCommon.restFul.rowsSet(rows, column);
            elOptions.dataProvider = rows;
        },
    },
    comboBox: {
        set: function (el, comboOptions, options, callBack) {
            // options 필수 textName, valueName 필수.
            callBack = callBack || {};
            openMes.setHostURL();
            options.url = options.url || openMes.url;
            options.url;
            options.rowsName = "rows";
            callBack.exception = callBack.exception || openMes.exceptionSet;
            if (callBack.before) {
                callBack.before = [openMes.beforComboBoxSet, callBack.before];
            } else {
                callBack.before = openMes.beforComboBoxSet;
            }
            options.data = JSON.stringify(openMes.RdataSet(options, options.postData));
            micaCommon.comboBox.set(el, comboOptions, options, callBack);
        },
        checkedIndex: function (el, indexObj) {
            micaCommon.comboBox.checkedIndex(el, indexObj);
        },
        selectedIndex: function (el, indexObj) {
            micaCommon.comboBox.selectedIndex(el, indexObj);
        },
        value: function (el) {
            return micaCommon.comboBox.value(el);
        }
    },
    topMenu: {
        topMenuStorage: null,
        set: function (el, key, storageFlag) {
            //el : element
            el = el == null ? $(".w-container").last() : el;
            el = typeof el == "string" ? $(el) : el;

            if (storageFlag && "LOCAL" == storageFlag) {
                openMes.topMenu.topMenuStorage = localStorage;
            } else {
                openMes.topMenu.topMenuStorage = sessionStorage;
            }

            if (openMes.topMenu.topMenuStorage.getItem(key) == null) {
                micaCommon.notication.open("error", "메뉴정보가 없습니다 다시 로그인하세요");
                return;
            }
            var data = JSON.parse(openMes.topMenu.topMenuStorage.getItem(key));
            var source =
            {
                datatype: "json",
                localdata: data,
                id: 'id'
            };

            var dataAdapter = new $.jqx.dataAdapter(source);
            dataAdapter.dataBind();
            var records = dataAdapter.getRecordsHierarchy('MENUID', 'PARENTID', 'items', [{ name: 'MENUNAME', map: 'text' }, { name: 'VIEWID', map: 'HREF' }]);

            //데이터 정렬
            records = micaCommon.topMenu.dataSort("SEQUENCE", records);
            //메뉴 생성 
            openMes.menuType = "TOP";
            micaCommon.topMenu.makeMenu($(el), records);
        }
    },
    leftMenu: {
        set: function (el) {
            //el : element
            el = el == null ? $(".w-container").last() : el;
            el = typeof el == "string" ? $(el) : el;

            if (sessionStorage.getItem("MENUDATA") == null) {
                micaCommon.notication.open("error", "메뉴정보가 없습니다 다시 로그인하세요");
                return;
            }
            var data = openMes.colRowSet(JSON.parse(sessionStorage.getItem("MENUDATA")), "Table2");
            var source =
            {
                datatype: "json",
                localdata: data,
                id: 'id'
            };

            var dataAdapter = new $.jqx.dataAdapter(source);
            dataAdapter.dataBind();
            var records = dataAdapter.getRecordsHierarchy('MENUID', 'PARENTID', 'items', [{ name: 'MENUNAME', map: 'text' }, { name: 'VIEWID', map: 'HREF' }]);

            //데이터 정렬
            records = micaCommon.leftMenu.dataSort("SEQUENCE", records);
            //메뉴 생성 
            openMes.menuType = "LEFT";
            micaCommon.leftMenu.makeMenu($(el), records);
        },
        setTab: function (el, tabEl, tabContentEl, mainTabSource) {
            /*
            el : 메뉴 element
            tabEl : 탭이 위치할 element
            tabContentEl : Content가 위치할 element
            mainTabSource (옵션) : 첫 매인 탭을 위한 정보 
              {
                 tabId(필수) : 매인 탭의 ID 
                ,tabTitle(필수) : 탭 타이틀
                ,tabUrl(필수)  : 탭 URL
              }
            */

            //첫 탭
            //mainTabSource
            if (null != mainTabSource) {
                micaCommon.tab.nonDelTab(tabEl, tabContentEl, mainTabSource.tabId, mainTabSource.tabTitle, mainTabSource.tabUrl);
            }


            //메뉴 탭 설정
            micaCommon.leftMenu.linkType = "tab";
            micaCommon.leftMenu.tabEl = tabEl;
            micaCommon.leftMenu.tabContentEl = tabContentEl;
            openMes.leftMenu.set(el);
        }
    },
    menuSet: function (el) {
        //el : element
        el = el == null ? $(".w-container").last() : el;
        el = typeof el == "string" ? $(el) : el;

        if (sessionStorage.getItem("MENUDATA") == null) {
            micaCommon.notication.open("error", "메뉴정보가 없습니다 다시 로그인하세요");
            return;
        }
        var data = openMes.colRowSet(JSON.parse(sessionStorage.getItem("MENUDATA")), "Table2");
        var source =
        {
            datatype: "json",
            localdata: data,
            id: 'id'
        };

        var dataAdapter = new $.jqx.dataAdapter(source);
        dataAdapter.dataBind();
        var records = dataAdapter.getRecordsHierarchy('MENUID', 'PARENTID', 'items', [{ name: 'MENUNAME', map: 'text' }, { name: 'VIEWID', map: 'HREF' }]);

        //데이터 정렬
        records = micaCommon.leftMenu.dataSort("SEQUENCE", records);
        //메뉴 생성 
        openMes.menuType = "LEFT";
        micaCommon.leftMenu.makeMenu($(el), records);
    },
    page: {
        getCurrentPageInfo: function (key, separator) {
            /*           
            key : 메뉴정보가 들어 있는 세션의 key
            separator : split 구분자 ex) '/','#'
            */
            key = key || "MENUDATA";
            separator = separator || "/";
            if (sessionStorage.getItem(key) == null) {
                micaCommon.notication.open("error", "메뉴정보가 없습니다 다시 로그인하세요");
                return;
            }
            var data = null;
            if ("MENUDATA" == key) {
                data = openMes.colRowSet(JSON.parse(sessionStorage.getItem("MENUDATA")), "Table2");
            } else {
                data = JSON.parse(sessionStorage.getItem(key));
            }

            var source =
            {
                datatype: "json",
                localdata: data,
                id: 'id'
            };

            var dataAdapter = new $.jqx.dataAdapter(source);
            dataAdapter.dataBind();
            var records = dataAdapter.getRecordsHierarchy('MENUID', 'PARENTID', 'items', [{ name: 'MENUNAME', map: 'text' }, { name: 'VIEWID', map: 'HREF' }]);
            var locUrl = micaCommon.pageUrl || location.href.split(separator).pop().split("?")[0].split("#")[0];
            var tempUrl = null;
            var sameVal = null;
            //1레벨 같은 URL 체크
            $.each(records, function (index, level1) {
                tempUrl = level1.HREF && level1.HREF.split(separator).pop();
                if (locUrl == tempUrl) {
                    sameVal = level1;
                    return false;
                }

                if (typeof level1.items != 'undefined' && level1.items.length > 0) {
                    //2레벨 같은 URL 체크
                    $.each(level1.items, function (index, level2) {
                        tempUrl = level2.HREF && level2.HREF.split(separator).pop();
                        if (locUrl == tempUrl) {
                            sameVal = level2;
                            return false;
                        }

                        if (typeof level2.items != 'undefined' && level2.items.length > 0) {
                            //3레벨 같은 URL 체크
                            $.each(level2.items, function (index, level3) {
                                tempUrl = level3.HREF && level3.HREF.split(separator).pop();
                                if (locUrl == tempUrl) {
                                    sameVal = level3;
                                    return false;
                                }
                            });
                        }
                    });
                }
            });
            var pageInfo = null;
            if (null != sameVal) {
                pageInfo = sameVal;
            }

            return pageInfo;

        },
        getCurrentNavigationString: function (seperator, menuItem) {
            var sepString = seperator || ">";
            var curMenuItem = menuItem || openMes.page.getCurrentPageInfo();
            var navString = curMenuItem.MENUNAME;
            if (curMenuItem.parent) {
                navString = openMes.page.getNavigationString(sepString, curMenuItem.parent) + " " + sepString + " " + navString;
            }
            return navString;
        }
    },
    getNavigationLink: function () {
        var rtnString = "";
        if (openMes.menuType == "TOP") {
            if ("TAB" == micaCommon.topMenu.linkType) {
                $.each(micaCommon.topMenu.navArray, function (idx, item) {
                    if (idx == 0) {
                        rtnString += "<div class='w-icon fa fa-home icon' /><a href='javascript:return false;' class='w-inline-block txt-link'><div>" + item.MENUNAME + "</div></a>";
                    } else {
                        rtnString += "<div class='w-icon fa fa-angle-right icon' /><a href='javascript:return false;' class='w-inline-block txt-link'><div>" + item.MENUNAME + "</div></a>";
                    }
                });
            } else {
                $.each(micaCommon.topMenu.navArray, function (idx, item) {
                    if (idx == 0) {
                        rtnString += "<div class='w-icon fa fa-home icon' /><a href='" + item.HREF + "' class='w-inline-block txt-link'><div>" + item.MENUNAME + "</div></a>";
                    } else {
                        rtnString += "<div class='w-icon fa fa-angle-right icon' /><a href='" + item.HREF + "' class='w-inline-block txt-link'><div>" + item.MENUNAME + "</div></a>";
                    }
                });
            }
        } else if (openMes.menuType == "LEFT") {
            if ("TAB" == micaCommon.topMenu.linkType) {
                $.each(micaCommon.topMenu.navArray, function (idx, item) {
                    if (idx == 0) {
                        rtnString += "<div class='w-icon fa fa-home icon' /><a href='javascript:return false;' class='w-inline-block txt-link'><div>" + item.MENUNAME + "</div></a>";
                    } else {
                        rtnString += "<div class='w-icon fa fa-angle-right icon' /><a href='javascript:return false;' class='w-inline-block txt-link'><div>" + item.MENUNAME + "</div></a>";
                    }
                });
            } else {
                $.each(micaCommon.leftMenu.navArray, function (idx, item) {
                    if (idx == 0) {
                        rtnString += "<div class='w-icon fa fa-home icon' /><a href='" + item.HREF + "' class='w-inline-block txt-link'><div>" + item.MENUNAME + "</div></a>";
                    } else {
                        rtnString += "<div class='w-icon fa fa-angle-right icon' /><a href='" + item.HREF + "' class='w-inline-block txt-link'><div>" + item.MENUNAME + "</div></a>";
                    }
                });
            }
        } else {
            rtnString = "<div class='w-icon fa fa-home icon' />";
        }
        return rtnString;
    },
    getNavigationString: function () {
        return openMes.menuType == "TOP" ? micaCommon.topMenu.navString : openMes.menuType == "LEFT" ? micaCommon.leftMenu.navString : "";
    },
    autoComplete: {
        menu: (function (args) {
            var f = function (el, options) {
                options = options || {};
                options.hrefName = "urlZ";
                //var options = {
                //    source: [{ id: "test1", value: "TEST1", url: "../04.Plan/workorderbatch.html" }, { id: "test2", value: "TEST2", url: "../04.Plan/workorderbatch.html" }],
                //    //select: function(e, data){
                //    //    location.href = data.item.url;
                //    //}
                //}
                options.source = openMes.autoComplete.menu.menuDataSet();
                //console.log(options);
                micaCommon.autoComplete.menu(el, options);
            };

            for (i in args) {
                f[i] = args[i];
            }
            return f;
        }
        ({
            dataKeySet: function () {
                var data = openMes.colRowSet(JSON.parse(sessionStorage.MENUDATA), "Table2");
                var result = { view: {}, parent: {} };

                $.each(data, function (i, v) {
                    var obj = {};
                    if (v.VIEWID) {
                        result.view[v.MENUID] = v;
                    } else {
                        result.parent[v.MENUID] = v;
                    }
                });

                return result;
            },
            menuDataSet: function () {
                // value , id , href
                var data = this.dataKeySet();
                var parent = data.parent;
                var view = data.view;
                var results = [];
                $.each(view, function (i, v) {
                    var name = openMes.autoComplete.menu.menuNameSet(v.MENUNAME, v.PARENTID, parent);
                    var result = {
                        id: v.MENUID,
                        value: name,
                        href: v.VIEWID
                    };
                    results.push(result);
                });
                return results;
            },
            menuNameSet: function (name, parentId, data) {
                var names = this.menuNameArraySet(name, parentId, data);
                var result = "";
                var length = names.length;
                for (var i = 0; i < length; i++) {
                    result += names.pop();
                    if (names.length > 0) {
                        result += " > ";
                    }
                }
                return result;
            },
            menuNameArraySet: function (name, parentId, data) {
                name = name || [];
                name = typeof name == "string" ? [name] : name;
                //PARENTID
                if (parentId) {
                    var tmp = data[parentId];
                    if (tmp == null) {
                        return name;
                    }
                    name.push(tmp.MENUNAME);
                    return this.menuNameArraySet(name, tmp.PARENTID, data);
                } else {
                    return name;
                }
            }
        }))
    },
    exceptionSet: function (data, gridOptions, options) {
        if (openMes.lang(data.MESSAGE)) {
            micaCommon.notication.open("warning", openMes.lang(data.MESSAGE));
        }
    },

    tree: {
        set: function (id, dataOptions, treeOptions, callBack) {
            id = typeof id == "string" ? $(id) : id;
            dataOptions = dataOptions || {};
            treeOptions = treeOptions || {};
            openMes.setHostURL();
            dataOptions.url = dataOptions.url || openMes.url;
            var record = [];
            dataOptions.data = JSON.stringify(openMes.RdataSet(dataOptions, dataOptions.postData));
            micaCommon.tree.set(id, dataOptions, treeOptions, callBack);
        }
    },
    callBackMerge: function (callBack, callBack2) {
        var result = [];
        if (callBack != null) { result.push(callBack) };
        if (callBack2 != null) { result.push(callBack2) };
        return result;
    },
    beforGridSet: function (data, gridOptions, options) {
        var column = micaCommon.restFul.hierarchyReturn(data, openMes.COLUMNNAME);
        column = micaCommon.restFul.column(column, "ColumnName", "Alias");

        if (gridOptions.colModel == null) {
            var colModel = [];
            $.each(column, function (i, row) {
                colModel[i] = {};
                col = colModel[i];
                col.name = row;
                col.editable = true;
                if (row == "QUERYSTRING") {
                    col.edittype = "textarea";
                }
                //col.width = "100%"
            });
            gridOptions.colModel = colModel;
        }

        var rows = micaCommon.restFul.hierarchyReturn(data, openMes.ROWSNAME);
        rows = micaCommon.restFul.rowsSet(rows, column);

        gridOptions.data = rows;
    },
    beforComboBoxSet: function (data, gridOptions, options) {
        var column = micaCommon.restFul.hierarchyReturn(data, openMes.COLUMNNAME);
        if (column == null) {
            return data.rows = [];
        }
        column = micaCommon.restFul.column(column, "ColumnName", "Alias");

        var colModel = [];
        $.each(column, function (i, row) {
            colModel[i] = {};
            col = colModel[i];
            col.name = row;
            col.editable = true;
            if (row == "QUERYSTRING") {
                col.edittype = "textarea";
            }
            //col.width = "100%"
        });
        var rows = micaCommon.restFul.hierarchyReturn(data, openMes.ROWSNAME);

        if (rows == null || column == null) {
            //micaCommon.notication.open("warning", "No Data");
            return;
        }
        rows = micaCommon.restFul.rowsSet(rows, column);
        data.rows = rows;
    },

    crudSerializeDataFnc: function (options) { //grid 
        options = options || {};
        var type = options.type;
        var command = options.command;
        openMes.CUDdataSet(options, options.postData);
        return function (postdata) {
            // postdata = 그리드내 데이터들.
            $.each(options.colModel, function (i, v) {
                //v.edittype;
                $.each(postdata, function (j, vv) {
                    if (j == v.name) {
                        if (v.formatter == "number" || v.formatter == "integer") {
                            if (vv != null) {
                                postdata[j] = Number(vv);
                            }
                        }
                    }

                });
            });
            options.data = postdata;
            postdata = openMes.CUDdataSet(options);
            postdata = JSON.stringify(postdata);
            return postdata;
        }
    },

    RdataSet: function (options, postData) {
        // options : siteId , classId, command, hashtable;
        postData = postData || {};
        options = options || {};
        var siteId = options.siteId || this.siteId, classId = options.classId || this.classId, command = options.command || this.command,
            commandType = options.commandType || this.commandType, version = options.version || this.version, id = options.id || this.id,
            paramName = options.paramName || this.PARAMNAME,
            data = options.data || { "FROMDATE": "2015-01-01 00:00:00", "TODATE": "2015-01-02 00:00:00" };
        var result = {
            "COMMAND": command,
            "SITEID": siteId,
            "USERID": null,
            "STOREDQUERY": {
                "CLASSID": classId,
                "ID": id,
                "VERSION": version,
                "COMMANDTYPE": commandType
            },
            "HASHTABLE": {},
            "DATASET": {
            },
            "ISSUCCESS": false,
            "MESSAGE": null,
            "EXCEPTIONMESSAGE": null
        };
        result[paramName] = data;

        $.each(postData, function (name, value) {
            result[name] = value;
        });
        // 클라이언트 세션에서 siteId Get.
        result.SITEID = sessionStorage.getItem("SITEID") || openMes.siteId;
        result.USERID = sessionStorage.getItem("USERID");
        return result;
    },
    CUDdataSet: function (options, postData) {
        postData = postData || {};

        var siteId = options.siteId || this.siteId;
        var data = options.data;
        var type = options.type;
        var command = options.command;
        var result = {
            COMMAND: command,
            SITEID: siteId,
            USERID: null,
            REQUESTTYPE: type,
            DATASET: {
                TABLE1: [
                ]
            },
            ISSUCCESS: false,
            MESSAGE: null,
            EXCEPTIONMESSAGE: null,
        };
        //post.DATASET.TABLE1.push(postdata);
        if (data != null) {
            micaCommon.fncS.hierarchyReturn(result, this.CONDITION).push(data);
        }

        $.each(postData, function (name, value) {
            result[name] = value;
        });
        result.SITEID = sessionStorage.getItem("SITEID");
        return result;
    },
    colRowSet: function (data, tbName) {
        // COLUMNAME , ROWSNAME이 바뀔시 openMes.COLUMNNAME, openMes.ROWSNAME 을 바꾸면 됨.
        try {

            var colNm = openMes.COLUMNNAME;
            var rowNm = openMes.ROWSNAME;
            if (null != tbName && typeof tbName != 'undefined' && tbName.length > 0) {
                colNm = "DATASET." + tbName + ".Columns";
                rowNm = "DATASET." + tbName + ".Rows";
            }

            var column = micaCommon.restFul.hierarchyReturn(data, colNm);
            column = micaCommon.restFul.column(column, "ColumnName", "Alias");
            var rows = micaCommon.restFul.hierarchyReturn(data, rowNm);
            rows = micaCommon.restFul.rowsSet(rows, column);
            return rows;
        } catch (e) {
            console.error(e);
            return [];
        }
    },
    /* 
    ajaxService: function (options, type, postData) {
        // options : data, url, method, successFn, errorFn, command, siteId, classId
        // type : c, u, d, r
        // postData(선택) : 보낼 프로토콜 수정 
        // return -> ajaxService
        type = type || "";
        type = type.toLowerCase();
        var url = options.url || openMes.url;
        var data = {};
        options.type = type == "u" ? "UPDATE" : type == "c" ? "CREATE" : type == "d" ? "DELETE" : "READ";
        switch (type) {
            case "c":
            case "u":
            case "d":
                data = this.CUDdataSet(options, postData);
                break;
            case "r":
                data = this.RdataSet(options, postData);
                break;
            default:
                return console.error("Type : c, r, u, d");
                break;
        }
        return ajaxService(JSON.stringify(data), url, null, "POST", null);
    }
    */
    ajaxService: function (data, options) {
        // data : 보낼 데이터 
        // options : function(data) -> success, fail, error  
        //          success -> 성공.
        //          fail -> 통신은 성공 로직적 에러.
        //          error -> 400, 500 서버 터짐.
        // return -> ajaxService
        options = options || {};

        var success = options.success || function (data) { console.log("openMes _ success") };
        //var fail = options.fail || function (data) { console.error("openMes _ fail : " + data.EXCEPTIONMESSAGE); alert("openMes _ fail : " + data.EXCEPTIONMESSAGE) }
        //var error = options.error || function (data) { console.error("openMes _ error : 관리자에게 문의"); alert("openMes _ error : 관리자에게 문의") }
        var fail = options.fail || function (data) { console.error("openMes _ fail : " + data.EXCEPTIONMESSAGE); micaCommon.notication.open("warning", "openMes _ fail : " + data.EXCEPTIONMESSAGE); };
        var error = options.error || function (data) { console.error("openMes _ error : 관리자에게 문의"); micaCommon.notication.open("error", "openMes _ error : 관리자에게 문의"); };
        var successFn = function (data) {
            if (data.ISSUCCESS) {
                success(data);
            } else {
                fail(data);
            }
        };
        var errorFn = function (data) {
            error(data);
        };
        //var async = options.async || null;
        data = JSON.stringify(this.RdataSet(null, JSON.parse(data)));
        return ajaxService(data, openMes.url + "?STOREDQUERY.ID=" + JSON.parse(data).STOREDQUERY.ID, successFn, "POST", errorFn, options);
    },
    fileDownload: function (fileName, errorFunc, type) {
        var error = errorFunc || function (data) { console.error("openMes _ error : 관리자에게 문의"); micaCommon.notication.open("error", "openMes _ error : 관리자에게 문의"); };
        var attachType = typeof type == "undefined" || null == type ? "" : "&attachType=" + type;
        if (typeof openMes.downloadUrl != "undefined" && null != openMes.downloadUrl && "" != openMes.downloadUrl) {
            $.ajax({
                url: openMes.downloadUrl,
                type: "POST",
                data: "downloadFileChk=" + encodeURIComponent(fileName) + attachType,
                success: function (data) {
                    window.location.href = openMes.downloadUrl + "?downloadFile=" + encodeURIComponent(fileName) + attachType;
                },
                error: function (data) {
                    error(data);
                }
            });
        } else {
            console.error("openMes _ error : Download URL Not Found");
        }
    },
    excelForDB: function (postData) {
        postData.REQUESTTYPE = "EXCEL";
        var options = {
            success: function (data) {
                if (typeof data.DATASET.EXCELFILENAME != "undefined" && null != data.DATASET.EXCELFILENAME && "" != data.DATASET.EXCELFILENAME) {
                    openMes.fileDownload(data.DATASET.EXCELFILENAME, null, "excel");
                } else {
                    console.error("openMes _ error : Excel Filename Not Found ");
                }
            }
        };
        openMes.ajaxService(JSON.stringify(postData), options);
    },
    setGridRowSearchSelect: function (el, searchKey, searchValue) {
        el = typeof el == "string" ? $(el) : el;
        $.each(el.getRowData(), function (idx, item) {
            if (item[searchKey] == searchValue) {
                el.jqGrid('setSelection', el.jqGrid("getDataIDs")[idx]);
                return false;
            }
        });
    },
    imageToSvg: function ($el) {
        //imageToSvg($('div.mright img'))
        $el.each(function () {
            var $img = jQuery(this);
            var imgID = $img.attr('id');
            var imgClass = $img.attr('class');
            var imgURL = $img.attr('src') || $img.css('background-image').replace('url("', '').replace('")').replace('undefined', '');
            jQuery.get(imgURL, function (data) {
                // Get the SVG tag, ignore the rest
                var $svg = jQuery(data).find('svg');

                // Add replaced image's ID to the new SVG
                if (typeof imgID !== 'undefined') {
                    $svg = $svg.attr('id', imgID);
                }
                // Add replaced image's classes to the new SVG
                if (typeof imgClass !== 'undefined') {
                    $svg = $svg.attr('class', imgClass + ' replaced-svg');
                }

                // Remove any invalid XML tags as per http://validator.w3.org
                $svg = $svg.removeAttr('xmlns:a');

                // Replace image with new SVG
                $img.replaceWith($svg);

                $svg.css({ 'height': '100%', 'width': '100%' });
            }, 'xml');

        });

    }
};