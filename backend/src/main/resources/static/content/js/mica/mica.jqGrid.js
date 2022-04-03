micaJqGrid = {
    addForm: function (grid, url, mtype) {
        grid = typeof grid == "string" ? $(grid) : grid;
        var rowId = "new";
        grid.jqGrid("editGridRow", rowId, {
            width: "100%", height: "100%", url: url + rowId, mtype: mtype,
            afterComplete: function (response, postdata, formid) {
                Mica.require('dataSet').request('all');
            }
        });
    },
    editForm: function (grid, url, mtype) {
        grid = typeof grid == "string" ? $(grid) : grid;
        var rowId = grid.jqGrid('getGridParam', "selrow");
        grid.jqGrid("editGridRow", rowId, {
            width: "100%", height: "100%", url: url + rowId, mtype: mtype,
            afterComplete: function (response, postdata, formid) {
                Mica.require('dataSet').request('all');
            }
        });
    },
    dellForm: function (grid, url, mtype) {
        grid = typeof grid == "string" ? $(grid) : grid;
        var rowId = grid.jqGrid('getGridParam', "selrow");
        grid.jqGrid("delGridRow", rowId, {
            width: "100%", height: "100%", url: url + rowId, mtype: mtype,
            afterComplete: function (response, postdata, formid) {
                Mica.require('dataSet').request('all');
            }
        });
    }
}
