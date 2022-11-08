
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
        jQuery(section).load(AmCharts.Editor.CONSTANT.URL_BASE + 'static/tpl/section-editor.tpl?' + AmCharts.Editor.CONSTANT.RND_KEY, function () {
            jQuery(section).data('loaded', true);
            AmCharts.Editor.updateSection('editor');
            AmCharts.Editor.getUser();
        });

        // PROCESS; JUST ONCE
    } else if (jQuery.inArray('editor', AmCharts.Editor.current.rendered) == -1) {
        AmCharts.Editor.log('info', 'process section editor');

        /*
		** BUILD LAYOUT
		*/
        jQuery('.app-editor').layout({
            center__paneSelector: ".app-editor-2",
            west__paneSelector: ".app-editor-1",
            west__size: 200,
            spacing_open: 0,
            spacing_closed: 0,
            center__childOptions: {
                center__paneSelector: ".app-editor-2-2",
                center__minSize: 300,
                west__paneSelector: ".app-editor-2-1",
                west__size: 300,
                west__minSize: 300,
                spacing_open: 12,
                spacing_closed: 12,
                livePaneResizing: true,
                onresize_end: function () {
                    jQuery(AmCharts.Editor.SELECTORS.table).handsontable('render');
                    AmCharts.Editor.chart.invalidateSize();
                },
                center__childOptions: {
                    center__paneSelector: ".app-editor-2-2-1",
                    south__paneSelector: ".app-editor-2-2-2",
                    south__size: "50%",
                    south__minSize: 39,
                    spacing_open: 12,
                    spacing_closed: 12,
                    livePaneResizing: true,
                    onresize_end: function () {
                        jQuery(AmCharts.Editor.SELECTORS.table).handsontable('render');
                        AmCharts.Editor.chart.invalidateSize();
                    }
                }
            }
        });

        /*
		** TABLE; INIT
		*/
        jQuery(AmCharts.Editor.SELECTORS.table).handsontable({
            data: [],
            startRows: 5,
            startCols: 3,
            minSpareRows: 0,
            stretchH: 'all',
            colWidths: 100,
            removeRowPlugin: true,
            colHeaders: function (col) {
                var output = "";
                var button = null;
                var fieldname = AmCharts.Editor.dataFields[col];
                var graph = AmCharts.Editor.getGraphByField(fieldname);

                // ADD BTN
                if (jQuery.inArray(AmCharts.Editor.chartType, ['serial', 'xy', 'radar']) != -1) {
                    button = jQuery('<i></i>').attr('data-name', fieldname);
                    button.addClass('am-data-assign-col am am-add');

                    if (graph && graph.itemColor !== 'undefined') {
                        button.css({
                            color: graph.itemColor,
                            backgroundColor: graph.itemColor
                        }).addClass('selected');
                    }
                    output += jQuery('<div></div>').append(button).html();
                }

                // ADD REMOVE BATN
                button = jQuery('<i></i>').attr('fieldname', fieldname);
                button.addClass('am-data-remove-col am am-remove');
                output += jQuery('<div></div>').append(button).html();

                // ADD TITLE
                output += '<input class="am-data-input-col" type="text" value="' + AmCharts.Editor.dataFields[col] + '">';
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
                        title: AmCharts.Editor.getMSG('tooltip_rename_col'),
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

        /*
		** BETA TOOLTIP
		*/
        var betaTimer = 0;
        var betaShow = false;
        jQuery('.navbar-header-title .beta').tooltip({
            title: "Yip beta ;)",
            placement: "bottom"
        });
        function betaToggle() {
            clearTimeout(betaTimer);
            betaTimer = setTimeout(function () {
                jQuery('.navbar-header-title .beta').tooltip(betaShow ? 'show' : 'hide');
            }, 250);
        }
        jQuery('.navbar-header-title, .navbar-header-title span').off().on('mouseenter mouseleave', function (e) {
            betaShow = e.type == 'mouseenter';
            betaToggle();
        });

        jQuery('.navbar-header-title').off().on('click', function (e) {
            e.preventDefault();
            jQuery.router.go('/');
        });

        /*
		** BUTTONS
		*/

        // SAVE
        jQuery('.app-section-editor .am-menu-save a').off().on('click', function (e) {
            e.preventDefault();
            if (!jQuery(this).parent().is('.disabled')) {
                AmCharts.Editor.modal({
                    remote: AmCharts.Editor.CONSTANT.URL_BASE + 'static/tpl/modal-chart-save.tpl?' + AmCharts.Editor.CONSTANT.RND_KEY,
                });
            }
        });

        // SAVE DRAFT
        jQuery('.app-section-editor .am-menu-save-draft a').off().on('click', function (e) {
            e.preventDefault();
            if (!jQuery(this).parent().is('.disabled')) {
                AmCharts.Editor.modal({
                    remote: AmCharts.Editor.CONSTANT.URL_BASE + 'static/tpl/modal-chart-save-draft.tpl?' + AmCharts.Editor.CONSTANT.RND_KEY,
                });
            }
        }).tooltip({
            title: AmCharts.Editor.getMSG('tooltip_save_draft'),
            placement: 'bottom'
        });

        // FORK
        jQuery('.app-section-editor .am-menu-fork a').off().on('click', function (e) {
            e.preventDefault();
            if (!jQuery(this).parent().is('.disabled')) {
                AmCharts.Editor.modal({
                    remote: AmCharts.Editor.CONSTANT.URL_BASE + 'static/tpl/modal-chart-fork.tpl?' + AmCharts.Editor.CONSTANT.RND_KEY,
                });
            }
        }).tooltip({
            title: AmCharts.Editor.getMSG('tooltip_fork_chart'),
            placement: 'bottom'
        });

        // NEW
        jQuery('.app-section-editor .am-menu-new a').off().on('click', function (e) {
            e.preventDefault();
            jQuery.router.go('/new/');
        });

        // SHARE
        jQuery('.app-section-editor .am-menu-share a').off().on('click', function (e) {
            e.preventDefault();
            if (!jQuery(this).parent().is('.disabled')) {
                jQuery.router.go('/' + AmCharts.Editor.current.chart.chart_id + '/');
            }
        });

        // LOGIN
        jQuery('.app-section-editor .am-menu-user, .app-section-editor .am-menu-signin').off().on('show.bs.dropdown hide.bs.dropdown', function (e) {
            if (e.type == 'show') {
                jQuery(document.body).addClass('modal-open');
                jQuery('<div class="modal-backdrop modal-backdrop-login fade"></div>').appendTo(document.body).one(jQuery.support.transition.end, function () {
                    jQuery(this).addClass('in');
                }).emulateTransitionEnd(0);

                if (!jQuery('.app-section-editor .navbar-signin .dropdown-menu iframe').data('loaded')) {
                    jQuery('.app-section-editor .navbar-signin .dropdown-menu iframe').attr('src', AmCharts.Editor.CONSTANT.URL_AMCHARTS + 'sign-in/editor/?redirect_to=' + location.protocol + AmCharts.Editor.CONSTANT.URL_BASE + 'auth/done/?' + AmCharts.Editor.CONSTANT.RND_KEY).data('loaded', true);
                }
            } else {
                jQuery(document.body).removeClass('modal-open');
                jQuery('.modal-backdrop-login').removeClass('in').one(jQuery.support.transition.end, function () {
                    jQuery(this).remove();
                }).emulateTransitionEnd(300);
            }
        });

        /*
		** TABLE; BIND BUTTONS, INPUTS
		*/

        // TABS
        jQuery('.nav-tabs li a').off().on('shown.bs.tab', function () {
            jQuery(AmCharts.Editor.SELECTORS.table).handsontable('render');
        });

        // ADD ROW
        jQuery(".am-data-add-row").off().on('click', function (e) {
            e.preventDefault();
            jQuery(AmCharts.Editor.SELECTORS.table).handsontable('alter', 'insert_row');
        });

        // ADD COL
        jQuery(".am-data-add-col").off().on('click', function (e) {
            e.preventDefault();

            AmCharts.Editor.modal({
                remote: AmCharts.Editor.CONSTANT.URL_BASE + 'static/tpl/modal-data-add-col.tpl?' + AmCharts.Editor.CONSTANT.RND_KEY
            });
        });

        // IMPORT
        jQuery(".am-data-import").off().on('click', function (e) {
            e.preventDefault();
            AmCharts.Editor.modal({
                remote: AmCharts.Editor.CONSTANT.URL_BASE + 'static/tpl/modal-data-import.tpl?' + AmCharts.Editor.CONSTANT.RND_KEY
            });
        });
        // IMPORT

        // IMPORT; DRAGOVER
        jQuery(".app-section-editor").off('dragover').on('dragover', function (e) {
            e.preventDefault();
            e.stopPropagation();
            AmCharts.Editor.modal({
                remote: AmCharts.Editor.CONSTANT.URL_BASE + 'static/tpl/modal-data-import.tpl?' + AmCharts.Editor.CONSTANT.RND_KEY
            });
        });

        // CODE TEXTAREA 
        jQuery('.am-editor-config').off().on('input', function (event) {
            AmCharts.Editor.parseConfig(true);
        }).on('blur', function () {
            AmCharts.Editor.isEditing = false;
            AmCharts.Editor.parseConfig();
        });
        // ADD COL
        jQuery(".am-data-add-config").off().on('click', function (e) {
            e.preventDefault();
            var chartConfig = {};

            var config = AmCharts.Editor.editorConfig[AmCharts.Editor.MAPPING.chartClassMap[AmCharts.Editor.chartType]];
            chartConfig.type = AmCharts.Editor.preConfig.type;
            chartConfig.pathToImages = "//cdn.amcharts.com/lib/3/images/";
            AmCharts.Editor.chartConfig = AmCharts.Editor.makeChartConfig(config, chartConfig);
            // AmCharts.Editor.chartConfig.categoryField; //캐티고리필드
            AmCharts.Editor.chartConfig.dataProvider = "dataProvider";
            jQuery(".am-editor-config1").val(JSON.stringify(chartConfig, undefined, '\t'));
        });

        jQuery(".am-data-add-page").off().on('click', function (e) {
            e.preventDefault();
            var imgname = window.opener.options;
            var chartConfig = {};
            var imgname2 = window.opener.options2;
            var config = AmCharts.Editor.editorConfig[AmCharts.Editor.MAPPING.chartClassMap[AmCharts.Editor.chartType]];
            chartConfig.type = AmCharts.Editor.preConfig.type;
            chartConfig.pathToImages = "//cdn.amcharts.com/lib/3/images/";
            AmCharts.Editor.chartConfig = AmCharts.Editor.makeChartConfig(config, chartConfig);
            AmCharts.Editor.chartConfig.dataProvider = AmCharts.Editor.dataProvider;
            // AmCharts.Editor.chartConfig.categoryField; //캐티고리필드

            opener.options2 = imgname2 = JSON.stringify(AmCharts.Editor.chartConfig, undefined, '\t');
            opener.options = opener.options2;

            window.close();
        });

        jQuery('.am-editor-config1').off().on('click', function (event) {
            var chartConfig = {};

            var config = AmCharts.Editor.editorConfig[AmCharts.Editor.MAPPING.chartClassMap[AmCharts.Editor.chartType]];
            chartConfig.type = AmCharts.Editor.preConfig.type;
            chartConfig.pathToImages = "//cdn.amcharts.com/lib/3/images/";
            config.graphs.values[0].properties.valueField.value = "column-3"; // 칼럼벨류 
            config.titles.values[0].properties.text.value = "player";// 차트 타이틀
            AmCharts.Editor.chartConfig = AmCharts.Editor.makeChartConfig(config, chartConfig);
            AmCharts.Editor.chartConfig.categoryField; //캐티고리필드
            AmCharts.Editor.chartConfig.dataProvider = "dataProvider";
            jQuery(".am-editor-config1").val(JSON.stringify(chartConfig, undefined, '\t'));
        }).on('blur', function () {
            var chartConfig = {};

            var config = AmCharts.Editor.editorConfig[AmCharts.Editor.MAPPING.chartClassMap[AmCharts.Editor.chartType]];
            chartConfig.type = AmCharts.Editor.preConfig.type;
            chartConfig.pathToImages = "//cdn.amcharts.com/lib/3/images/";
            config.graphs.values[0].properties.valueField.value = "column-3"; // 칼럼벨류 
            config.titles.values[0].properties.text.value = "player";// 차트 타이틀
            AmCharts.Editor.chartConfig = AmCharts.Editor.makeChartConfig(config, chartConfig);
            AmCharts.Editor.chartConfig.categoryField; //캐티고리필드
            AmCharts.Editor.chartConfig.dataProvider = dataProvider;
        });

        // THEMES
        jQuery('.am-editor-themes li a').off().on('click', function (e) {
            e.preventDefault();
            var theme = jQuery(this).parent().data('theme');

            jQuery('.am-editor-themes li').each(function () {
                jQuery(this)[theme == jQuery(this).data('theme') ? 'addClass' : 'removeClass']('active');
            });

            AmCharts.Editor.applyTheme(theme);
            AmCharts.Editor.current.css.backgroundColor = AmCharts.Editor.chart.backgroundColor;
            AmCharts.Editor.current.css.backgroundRGBA = AmCharts.Editor.hexToRgb(AmCharts.Editor.current.css.backgroundColor);

            // DRAW / SAVE CSS
            if (AmCharts.Editor.current.section == 'share') {
                AmCharts.Editor.drawCSS();
            }
        }).tooltip({
            title: function () {
                return AmCharts.Editor.getMSG('tooltip_set_theme').replace('[[theme]]', jQuery(this).parent().data('theme'));
            }
        });

        // EXPORT
        jQuery(".am-data-export").off().on('click', function (e) {
            e.preventDefault();
            AmCharts.Editor.modal({
                remote: AmCharts.Editor.CONSTANT.URL_BASE + 'static/tpl/modal-data-export.tpl?' + AmCharts.Editor.CONSTANT.RND_KEY
            });
        });

        // ADD TO QUEUE
        AmCharts.Editor.current.rendered.push('editor');

    }

    // INIT CHART
    if (AmCharts.Editor.current.chart.chart_id && AmCharts.Editor.current.tpl.loaded) {
        AmCharts.Editor.init(AmCharts.Editor.current.cfg);
    }
});

// OBSERVE USER BADGE CHANGE
jQuery(window).on('changed.am.user.badge', function () {
    if (AmCharts.Editor.current.section == 'editor') {
        //
    }
});