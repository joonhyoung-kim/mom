/** drop target **/
var _target = document.getElementById('drop');

/** Spinner **/
var spinner;

var _workstart = function() { spinner = new Spinner().spin(_target); }
var _workend = function() { spinner.stop(); }

/** Alerts **/
var _badfile = function() {
  alertify.alert('This file does not appear to be a valid Excel file.  If we made a mistake, please send this file to <a href="mailto:dev@sheetjs.com?subject=I+broke+your+stuff">dev@sheetjs.com</a> so we can take a look.', function(){});
};

var _pending = function() {
  alertify.alert('Please wait until the current file is processed.', function(){});
};

var _large = function(len, cb) {
  alertify.confirm("This file is " + len + " bytes and may take a few moments.  Your browser may lock up during this process.  Shall we play?", cb);
};

var _failed = function(e) {
  console.log(e, e.stack);
  alertify.alert('We unfortunately dropped the ball here.  We noticed some issues with the grid recently, so please test the file using the direct parsers for <a href="/js-xls/">XLS</a> and <a href="/js-xlsx/">XLSX</a> files.  If there are issues with the direct parsers, please send this file to <a href="mailto:dev@sheetjs.com?subject=I+broke+your+stuff">dev@sheetjs.com</a> so we can make things right.', function(){});
};

/** Handsontable magic **/
var boldRenderer = function (instance, td, row, col, prop, value, cellProperties) {
  Handsontable.TextCell.renderer.apply(this, arguments);
  $(td).css({'font-weight': 'bold'});
};

var $container, $parent, $window, availableWidth, availableHeight;
var calculateSize = function () {
  var offset = $container.offset();
  availableWidth = Math.max($window.width() - 50,600);
  availableHeight = Math.max($window.height() - 50, 400); //khp 250 -> 10
};

$(document).ready(function() {
  $container = $("#hot"); $parent = $container.parent();
  $window = $(window);
  $window.on('resize', calculateSize);
});

/* make the buttons for the sheets */
var make_buttons = function(sheetnames, cb) {
  var $buttons = $('#buttons');
  $buttons.html("");
  sheetnames.forEach(function(s,idx) {
    var button= $('<button/>').attr({ type:'button', name:'btn' +idx, text:s });
    button.append('<h3>' + s + '</h3>');
    button.click(function() { cb(idx); });
    $buttons.append(button);
    $buttons.append('<br/>');
  });
};
var json_cols;
var json_data;
var _onsheet = function(json, cols, sheetnames, select_sheet_cb) {
    $(".xlsLoading").show();
    $(".xlsDrop").hide();
  //$('#footnote').hide();

    //$("#hot").handsontable('getData');
    //데이터 가져오기.


  //make_buttons(sheetnames, select_sheet_cb);
  calculateSize();

  /* add header row for table */
    if (!json) json = [];
    json_cols = cols;
    json_data = json;
  json.unshift(function(head){var o = {}; for(i=0;i!=head.length;++i) o[head[i]] = head[i]; return o;}(cols));
  calculateSize();
  /* showtime! */
  $("#hot").handsontable({
      data: json,

      startRows: 5,
      startCols: 3,
      minSpareRows: 0,
      stretchH: 'all',
      //colWidths: 100,
      removeRowPlugin: true,

    //startRows: 5,
    //startCols: 3,
    //fixedRowsTop: 1,
    //stretchH: 'all',
      rowHeaders: true,

    columns: cols.map(function(x) { return {data:x}; }),
    //colHeaders: cols.map(function(x,i) { return XLS.utils.encode_col(i); }),
    cells: function (r,c,p) {
      if(r === 0) this.renderer = boldRenderer;
    },
    width: function () { return availableWidth; },
    height: function () { return availableHeight; },
    stretchH: 'all'
      ,
    colHeaders: function (col) {
        var output = "";
        var button = null;
        var fieldname = json_cols[col];
        //var fieldname = AmCharts.Editor.dataFields[col];
        //var graph = AmCharts.Editor.getGraphByField(fieldname);

        // ADD BTN
        if (jQuery.inArray("serial", ['serial', 'xy', 'radar']) != -1) {
            button = jQuery('<i></i>').attr('data-name', fieldname);
            //button.addClass('am-data-assign-col am am-add');

            //if (graph && graph.itemColor !== 'undefined') {
            //    button.css({
            //        color: graph.itemColor,
            //        backgroundColor: graph.itemColor
            //    }).addClass('selected');
            //}

            //output += jQuery('<div></div>').append(button).html();
        }

        // ADD REMOVE BATN
        button = jQuery('<i></i>').attr('fieldname', fieldname);
        button.addClass('am-data-remove-col am am-remove');
        output += jQuery('<div></div>').append(button).html();

        // ADD TITLE
        //output += '<input class="am-data-input-col" type="text" value="' + fieldname + '" style="padding:0px;">';
        output += XLS.utils.encode_col(col);
        return output;
    //},afterRemoveRow: function (data) {
    //    //AmCharts.Editor.changedData(AmCharts.Editor.dataProvider);
    //    //alert(data);
    },afterRender: function () {
      //this.rootElement.find('.am-data-input-col').each(function (col) {
      //    jQuery(this).on('keyup', function () {
      //        var fieldname = AmCharts.Editor.dataFields[col];
      //        var graph = AmCharts.Editor.getGraphByField(fieldname);
      //        AmCharts.Editor.changeColTitle(graph, fieldname, this.value);
      //    }).on('focus', function () {
      //        jQuery(this).tooltip('hide').parent().parent().addClass('active');
      //    }).on('blur', function () {
      //        jQuery(this).parent().parent().removeClass('active');
      //    }).tooltip({
      //        title: AmCharts.Editor.getMSG('tooltip_rename_col'),
      //        placement: 'bottom',
      //        container: 'body'
      //    });
      //});
      //this.rootElement.find('.am-data-assign-col').each(function (col) {
      //    jQuery(this).on('click', function () {
      //        var fieldname = jQuery(this).data('name');
      //        var graph = AmCharts.Editor.getGraphByField(fieldname);

      //        if (jQuery(this).hasClass('selected')) {
      //            AmCharts.Editor.openGraph(graph);
      //        } else {
      //            jQuery(AmCharts.Editor.SELECTORS.modal).data('tmp', {
      //                fieldname: fieldname
      //            });
      //            AmCharts.Editor.modal({
      //                remote: AmCharts.Editor.CONSTANT.URL_BASE + 'static/tpl/modal-data-assign-col.tpl?' + AmCharts.Editor.CONSTANT.RND_KEY
      //            });
      //        }
      //    }).tooltip({
      //        title: AmCharts.Editor.getMSG(jQuery(this).hasClass('selected') ? 'tooltip_edit_col' : 'tooltip_assign_col'),
      //        container: 'body'
      //    });
      //});
        this.rootElement.find('.am-data-remove-col').each(function (col) {
            $(this).off('click');
          jQuery(this).on('click', function () {
              //alert(col);
              // REMOVE BODY
              //for (var i = 0; i < AmCharts.Editor.dataProvider.length; i++) {
              //    delete AmCharts.Editor.dataProvider[i][AmCharts.Editor.dataFields[col]];
              //}
              for (var i = 0; i < json_data.length; i++) {
                  delete (json_data[i][json_cols[col]]);
              }
              json_cols.splice(col, 1);
              //_onsheet(json_data, json_cols);
              $("#hot").handsontable({
                  data: json_data,
                  columns: json_cols.map(function (x) { return { data: x }; })
                  //columns: jQuery(AmCharts.Editor.dataFields).map(function () {
                  //    return { data: this }
                  //})
              });
              console.debug("1");
              // REMOVE HEADER
              //AmCharts.Editor.dataFields.splice(col, 1);
              //AmCharts.Editor.processData(AmCharts.Editor.dataProvider);
          });
          //    .tooltip({
          //    title: AmCharts.Editor.getMSG('tooltip_remove_col'),
          //    container: 'body'
          //});
        });
  }
  });
  //$("#hot").handsontable({
  //    data: json,
  //    startRows: 5,
  //    startCols: 3,
  //    fixedRowsTop: 1,
  //    stretchH: 'all',
  //    rowHeaders: true,
  //    columns: cols.map(function(x) { return {data:x}; }),
  //    colHeaders: cols.map(function(x,i) { return XLS.utils.encode_col(i); }),
  //    cells: function (r,c,p) {
  //        if(r === 0) this.renderer = boldRenderer;
  //    },
  //    width: function () { return availableWidth; },
  //    height: function () { return availableHeight; },
  //    stretchH: 'all'
  //});
};

/** Drop it like it's hot **/
DropSheet({
  drop: _target,
  on: {
    workstart: _workstart,
    workend: _workend,
    sheet: _onsheet,
    foo: 'bar'
  },
  errors: {
    badfile: _badfile,
    pending: _pending,
    failed: _failed,
    large: _large,
    foo: 'bar'
  }
})
