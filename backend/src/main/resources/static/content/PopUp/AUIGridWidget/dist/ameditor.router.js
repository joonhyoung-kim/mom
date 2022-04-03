/*!
* amCharts - Live Editor
* CORE; GUI ROUTER
* Copyright (c) 2014 amCharts
* Licensed MIT
* http://amcharts.com/
* v1.0.0-beta.1
*/

/*
** LANDING
*/


jQuery.router.add('/TU_Platform/Content/PopUp/AUIGridWidget/', '/TU_Platform/Content/PopUp/AUIGridWidget/', function (data) {
    AmCharts.Editor.log('info', 'route new chart');
    AmCharts.Editor.updateSection('editor');
    AmCharts.Editor.modal({
        remote: AmCharts.Editor.CONSTANT.URL_BASE + 'static/tpl/grid-chart-new.tpl?__=' + AmCharts.Editor.CONSTANT.RND_KEY
    });
});


jQuery.router.add('/TU_Platform/Content/PopUp/AUIGridWidget/edit/', '/TU_Platform/Content/PopUp/AUIGridWidget/edit/', function (data) {
    AmCharts.Editor.log('info', 'route new chart edit');

    AmCharts.Editor.updateSection('editor');
    AmCharts.Editor.current.user.loading = true;
      
    var response = {type:"serial"};

    AmCharts.Editor.current.user.loading = false;
    AmCharts.Editor.current.tpl.loaded = true;

    // APPLY THEME
    jQuery('.nav-themes li').each(function () {
        jQuery(this)[jQuery(this).data('theme') == 'default' ? 'addClass' : 'removeClass']('active');
    });

    // TOGGLE DATA TAB
    jQuery('.am-tab-data').hide();
    jQuery('.am-tab-code a').tab('show');
   
    // INIT CHART; HIDE MODAL
    response.dataProvider = [];
    if(windowParam.options != null){
    	for (var a in windowParam.options.data) {
    		var onetimeuse = {};
    		for (var b in windowParam.options.colModel) {
    			var dataField = windowParam.options.colModel[b].dataField;
    			onetimeuse[dataField] = windowParam.options.data[a][dataField];
    			
    			if(typeof windowParam.options.colModel[b].children != "undefined"){
    				for(var childIndex in windowParam.options.colModel[b].children){
    					var dataField = windowParam.options.colModel[b].children[childIndex].dataField;
            			onetimeuse[dataField] = windowParam.options.data[a][dataField];
					}
    			}
    		}
    		response.dataProvider[a] = onetimeuse;
    	}
	}
    jQuery(".am-tab-code").addClass('hidden');
    jQuery(".am-tab-code1").addClass('hidden');
    jQuery(".am-data-add-config").addClass('hidden');
    jQuery(".navbar-amcharts").addClass('hidden');
    jQuery(".am-editor-themes").addClass('hidden');
        AmCharts.Editor.init(response);
        var config = AmCharts.Editor.editorConfig[AmCharts.Editor.MAPPING.chartClassMap[AmCharts.Editor.chartType]];
   
        $("#category").trigger('change');
    $("#appler").trigger('change');
    if(windowParam.options !== undefined )
    	auigridOptions = JSON.parse(JSON.stringify(windowParam.options));
    else
    	auigridOptions = {};
    if(auigridOptions.gridEvent == undefined)
    	auigridOptions.gridEvent = {};
    
//    config.properties.datasetId.value = windowParam.datasetId;
    
    auigridOptions.widgetName = windowParam.widgetName;
	auigridOptions.description = typeof windowParam.description == "undefined" ? "" : windowParam.description;
	
    if(typeof auigridOptions.gridProps  == "undefined")
    	auigridOptions.gridProps = {};
    if(typeof windowParam.editMode == "undefined"){
    	auigridOptions.datasetId = windowParam.datasetId; 
    }
    if(typeof auigridOptions.gridProps["groupingSummary"] != "undefined")
    	groupingSummary =  auigridOptions.gridProps["groupingSummary"];
    
    for (var name in config.properties) {
    	if(windowParam.options != null){
    		if ((config.properties[name]).type == "checkbox_fnc") {
    			if (auigridOptions.gridEvent[name] != null ) {
    				if (windowParam.options.gridEvent[name].length != 0) {
    					config.properties[name].value = true;
    					config.properties[name + "Code"].value = auigridOptions.gridEvent[name];
    				}
    			}
    		}  
    		if ((config.properties[name]).type == "textbox_num" && (config.properties[name]).gridProps) {
    			if (auigridOptions.gridProps[name] != null && windowParam.options != null) {
    				config.properties[name].value = auigridOptions.gridProps[name];
    			}
			}    
    	}
    }
    auigridDraw();
    jQuery(AmCharts.Editor.SELECTORS.table).handsontable('render');
    AmCharts.Editor.modal('hide');
    AmCharts.Editor.selectMenuItem($($(".menu-item-group")[0].children));
});

routeCallback = function (data) {
    AmCharts.Editor.log('info', 'route share chart');

    if (AmCharts.Editor.current.user.loading) {
        return false;
    }

    // SIMPLY SHOW SECTION
    if (AmCharts.Editor.current.chart.chart_id) {
        AmCharts.Editor.updateSection('share');
        AmCharts.Editor.modal('hide');

        // LOAD FIRST
    } else {
        AmCharts.Editor.log('info', 'LOAD share chart');
        AmCharts.Editor.current.user.loading = true;
        AmCharts.Editor.ajax({
            data: {
                action: 'amcharts_editor_get_chart',
                chart_id: data.chart_id
            },
            complete: function (transport) {
                var response = transport.responseJSON || { error: true };

                AmCharts.Editor.current.user.loading = false;

                jQuery.extend(AmCharts.Editor.current.chart, response);

                if (!response.error) {
                    var chartCFG = AmCharts.Editor.parseJSON(response.code);
                    var chartTPL = AmCharts.Editor.parseJSON(response.template);
                    var chartCSS = AmCharts.Editor.parseJSON((response.css || '{}'));

                    jQuery.extend(AmCharts.Editor.current.cfg, chartCFG || {});
                    jQuery.extend(AmCharts.Editor.current.tpl, chartTPL || {});
                    jQuery.extend(AmCharts.Editor.current.css, chartCSS || {});

                    // APPLY THEME
                    jQuery('.nav-themes li').each(function () {
                        jQuery(this)[jQuery(this).data('theme') == chartCFG.theme ? 'addClass' : 'removeClass']('active');
                    });

                    // SHOW SECTION; HIDE MODAL
                    AmCharts.Editor.dataProvider = chartCFG.dataProvider || [];
                    AmCharts.Editor.updateSection('share');
                    AmCharts.Editor.modal('hide');
                } else {
                    jQuery.router.go('/');
                    AmCharts.Editor.log('error', 'receiving chart: ' + data.chart_id);
                }
            }
        });
    }
}
/*
** INIT
*/
jQuery(document).ready(function () {
    jQuery.router.go(location.hash.slice(1));

    // GET USER

    // HIDE INIT BACKDROP
    setTimeout(function () {
        jQuery('body').removeClass('glamorize');
        jQuery('.modal-backdrop-init').removeClass('in').one($.support.transition.end, function () {
            jQuery(this).remove();
        }).emulateTransitionEnd(300);
    }, 1000);
});