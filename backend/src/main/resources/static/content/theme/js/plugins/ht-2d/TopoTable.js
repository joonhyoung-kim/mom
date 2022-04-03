function TopoTableViewInteractor(tableView) {
    TopoTableViewInteractor.superClass.constructor.call(this, tableView);
}
ht.Default.def(TopoTableViewInteractor, ht.ui.Interactor, {
    handle_mousedown: function (e) {
        var self = this,
            tableView = self.getComponent(),
            column = tableView.getColumnAt(e);
        if (column && column.a('isConnection')) {
            self._startData = TopoTableView.superClass.getDataAt.call(tableView, e);
            ht.Default.startDragging(self);
        }
    },
    handleWindowMouseMove: function (e) {
        var self = this,
            tableView = self.getComponent(),
            point = tableView.lp(e);
        self._endPoint = point;
        tableView.iv();
    },
    handleWindowMouseUp: function (e) {
        var self = this,
            tableView = self.getComponent();

        var endData = TopoTableView.superClass.getDataAt.call(tableView, e);
        var startData = self._startData;
        var connection = tableView.getConnections();
        connection.push([startData.getTag(), endData.getTag()]);

        delete self._startData;
        delete self._endPoint;
        tableView.iv();
    }
});

function TopoTableView(dataModel) {
    var self = this;
    TopoTableView.superClass.constructor.call(self, dataModel);
    self.addTopPainter(function (g) {
        // 清除右侧区域
        var width = self.getColumnWidth();

        g.clearRect(-self.tx() + width, -self.ty(), self.getContentWidth() - width, self.getContentHeight());

        // 绘制连接线
        var connections = self.getConnections();
        if (connections && connections.length > 0) {
            var dm = self.dm(),
                width = self.getColumnWidth(),
                rowHeight = self.getRowHeight(),
                halfRowHeight = rowHeight / 2;

            for (var i = 0; i < connections.length; i++) {
                var connection = connections[i],
                    d1 = dm.getDataByTag(connection[0]),
                    d2 = dm.getDataByTag(connection[1]),
                    d1Y = self.getRowIndex(d1) * rowHeight,
                    d2Y = self.getRowIndex(d2) * rowHeight;
                g.beginPath();
                g.strokeStyle = '#a0a0a0';
                g.moveTo(width, d1Y + halfRowHeight);
                g.lineTo(width + 120, d1Y + halfRowHeight);
                g.lineTo(width + 120, d2Y + halfRowHeight);
                g.lineTo(width, d2Y + halfRowHeight);
                g.stroke();
            }


            var topoInteractor = self._topoInteractor,
                startData = topoInteractor._startData,
                endPoint = topoInteractor._endPoint;
            if (startData && endPoint) {
                var startY = self.getRowIndex(startData) * rowHeight;
                g.beginPath();
                g.strokeStyle = '#a0a0a0';
                g.moveTo(width, startY + halfRowHeight);
                g.lineTo(width + 120, startY + halfRowHeight);
                g.lineTo(width + 120, endPoint.y);
                g.lineTo(width, endPoint.y);
                g.stroke();
            }

        }
    });

}
ht.Default.def(TopoTableView, ht.ui.TableView, {
    ms_ac: ['connections'],
    getColumnWidth: function () {
        var self = this,
            columns = self.getColumnModel().getRoots(),
            columnWidth = 0,
            size = columns.size();
        for (var i = 0; i < size; i++) {
            var column = columns.get(i);
            columnWidth += column.getWidth();
        }
        return columnWidth;
    },
    setUpInteractors: function () {
        var self = this;
        TopoTableView.superClass.setUpInteractors.call(self);
        if (!self._topoInteractor) {
            var topoInteractor = self._topoInteractor = new TopoTableViewInteractor(self);
            topoInteractor.addListeners();
        }
    },
    //getDataAt: function (e) {
    //    var column = this.getColumnAt(e);
    //    if (column) {
    //        var name = column.getName();
    //        if (name === 'id' || name === 'name') {
    //            return TopoTableView.superClass.getDataAt.call(this, e);
    //        }
    //    }
    //},
    createDragImage: function (data, selection) {
        var self = this,
            width = self.getColumnWidth(),
            height = self.getRowHeight();

        var canvas = TopoTableView.superClass.createDragImage.call(self, data, selection);
        var newCanvas = document.createElement('canvas');
        var devicePixelRatio = ht.Default.devicePixelRatio;

        ht.Default.setCanvas(newCanvas, width, height);
        var g = ht.Default.initContext(newCanvas);
        ht.Default.translateAndScale(g, 0, 0, 1);
        g.beginPath();
        g.drawImage(canvas, 0, 0, width * devicePixelRatio, height * devicePixelRatio, 0, 0, width, height);
        return newCanvas;
    },
    drawDropLine: function (g, x, y, width, height, refType, refData, dropLineY) {
        var self = this,
            columnWidth = self.getColumnWidth();

        TopoTableView.superClass.drawDropLine.call(self, g, x, y, columnWidth, height, refType, refData, dropLineY);
    }
});