/*!
* amCharts - Live Editor - handler
* CORE; GUI PROCESSOR
* Copyright (c) 2014 amCharts
* Licensed MIT
* http://amcharts.com/
* v1.0.0-beta.1
*/

if ( !AmCharts.Editor ) {
    AmCharts.Editor = {};
}

AmCharts.Editor.dataProvider          = [];

AmCharts.Editor.init = function( config ) {
    AmCharts.Editor.makeEditor(config);
}

AmCharts.Editor.processData = function( data ) {
    AmCharts.Editor.changedData(data,true);
    if ( jQuery.inArray('editor',AmCharts.Editor.current.rendered) != -1 ) {
        jQuery(AmCharts.Editor.SELECTORS.table).handsontable({
            data    : data,
            columns : jQuery(AmCharts.Editor.dataFields).map(function() {
                return {data: this}
            })
        });
    }
}

AmCharts.Editor.makeEditor = function( preConfig ) {
    var className    = AmCharts.Editor.MAPPING.chartClassMap[preConfig.type];
    var classConfig  = AmCharts.Editor.MAPPING.classMap[className];
    var editorConfig = {};

    AmCharts.Editor.preConfig    = preConfig;
    AmCharts.Editor.chartType    = preConfig.type;
    AmCharts.Editor.editorConfig = {};

    // GET FIELDS; MAKE CONFIG
    AmCharts.Editor.getFields(preConfig.dataProvider);
    AmCharts.Editor.itemIds = {};
    AmCharts.Editor.makeEditorConfig(className, editorConfig, preConfig);

    if ( preConfig.theme ) {
        if ( AmCharts.themes[preConfig.theme] ) {
            AmCharts.Editor.changeDefaults(className, editorConfig, AmCharts.themes[preConfig.theme]);
        }
    }

    AmCharts.Editor.editorConfig[className] = editorConfig;
    AmCharts.Editor.pickGraphColors();
    AmCharts.Editor.prepareTree(editorConfig);
    AmCharts.Editor.processData(preConfig.dataProvider);
    AmCharts.Editor.changedConfig(true);
}

AmCharts.Editor.prepareTree = function( editorItemConfig) {
    var treeData = AmCharts.Editor.makeTreeConfig(editorItemConfig, []);
    treeData.sort(AmCharts.Editor.dynamicSortMultiple("type", "-title"));
    treeData.reverse();

    AmCharts.Editor.treeConfig = treeData;
    AmCharts.Editor.haveSelected = false;
    AmCharts.Editor.buildTree(treeData, jQuery(AmCharts.Editor.SELECTORS.groups));
    if ( !AmCharts.Editor.haveSelected ) {
        AmCharts.Editor.selectMenuItem(treeData[0].treeItemLink);
    }
    AmCharts.Editor.createChartConfig();
}

AmCharts.Editor.buildTree = function( treeData, container) {
    container.html("");
    for (var i = 0; i < treeData.length; i++) {
        var treeItemConfig   = treeData[i];
        var editorItemConfig = treeItemConfig.editorItemConfig;
        var type             = treeItemConfig.type;
        var title            = treeItemConfig.title;
        var treeItemLi       = jQuery('<li class="menu-item menu-item-'+ treeItemConfig.type +'"></li>').appendTo(container).data('treeItemConfig', treeItemConfig);
        var treeItemLink     = jQuery('<a href="#"></a>').data('treeItemConfig', treeItemConfig).appendTo(treeItemLi);
        var treeItemTitle    = jQuery("<span></span>").text(title).appendTo(treeItemLink);
        var parentTree       = treeItemConfig.parentTree;
        var children         = treeItemConfig.children;
        var btn              = null;

        // CATCH SIBLING TITLE; HUMANIZE
        try {
            title = editorItemConfig.properties.id.value;
            if ( editorItemConfig.properties.id ) {
                editorItemConfig.alsoUpdate = treeItemTitle;
            }
        } catch(err) {}
        treeItemTitle.html(AmCharts.Editor.capitalize(title));

        // PARENT
        if ( parentTree ) {
            if ( parentTree.editorItemConfig.isArray ) {
                // DRAG BUTTON
                btn = jQuery('<i class="menu-item-handle"></i>').data('treeItemConfig', treeItemConfig).appendTo(treeItemLink).tooltip({
                    title: AmCharts.Editor.getMSG('tooltip_drag_item')
                });

                // BULLET
                if ( editorItemConfig.itemColor !== undefined ) {
                    var bullet = jQuery('<i class="menu-item-bullet"></i>').css("backgroundColor", editorItemConfig.itemColor).appendTo(treeItemLink);
                    editorItemConfig.menuBullet = bullet;
                }
                // REMOVE BUTTON
                btn = jQuery('<i class="menu-item-remove"></i>').data('treeItemConfig', treeItemConfig).appendTo(treeItemLink).on('click',function(e) {
                    e.preventDefault();

                    if ( confirm(AmCharts.Editor.getMSG('alert_confirm_delete')) ) {
                        AmCharts.Editor.deleteItem(jQuery(this).data('treeItemConfig'));
                    }
                }).tooltip({
                    title: AmCharts.Editor.getMSG('tooltip_remove_item'),
                    placement: 'left'
                });
            }
        }
        treeItemConfig.treeItemLi   = treeItemLi;
        treeItemConfig.treeItemLink = treeItemLink;

        // ADD BUTTON TO FOLDER
        if (editorItemConfig.isArray) {
            btn = jQuery('<i class="menu-item-add"></i>').appendTo(treeItemLink).data('treeItemConfig', treeItemConfig).on('click',function(e) {
                e.preventDefault();
                AmCharts.Editor.addItem(jQuery(this).data('treeItemConfig'));
            }).tooltip({
                title: AmCharts.Editor.getMSG('tooltip_add_item'),
                placement: 'left'
            });

            // DISABLED
            if ( !children || !children.length ) {
                treeItemLi.addClass('disabled');
            }
        }

        // SWITCHABLE
        if (type == 'class menu-item-switchable') {
            btn = jQuery('<i class="menu-item-check"></i>').appendTo(treeItemLink).data('treeItemConfig', treeItemConfig).on('click',function(e) {
                e.preventDefault();
                var editorItemConfig = jQuery(this).data('treeItemConfig').editorItemConfig;
                editorItemConfig.enabled = !editorItemConfig.enabled;
                jQuery(this).parents('li')[editorItemConfig.enabled?'addClass':'removeClass']("selected active");
                jQuery(this).parents('li')[!editorItemConfig.enabled?'addClass':'removeClass']("disabled");
                if ( !editorItemConfig.enabled ) {
                    jQuery(AmCharts.Editor.SELECTORS.props).html("");
                }
                jQuery(this).tooltip('destroy').tooltip({
                    title: editorItemConfig.enabled?AmCharts.Editor.getMSG('tooltip_check_item'):AmCharts.Editor.getMSG('tooltip_uncheck_item'),
                    placement: 'left'
                });
                AmCharts.Editor.createChartConfig();
            }).tooltip({
                title: editorItemConfig.enabled?AmCharts.Editor.getMSG('tooltip_check_item'):AmCharts.Editor.getMSG('tooltip_uncheck_item'),
                placement: 'left',
                placement: 'left'
            });

            // DISABLED
            if ( !editorItemConfig.enabled ) {
                treeItemLi.addClass('disabled');
            }
        }

        if (children) {
            if (children.length > 0) {
                var childrenContainer = jQuery('<ul class="nav nav-stacked sub-tree"></ul>').appendTo(treeItemLi);
                AmCharts.Editor.buildTree(children, childrenContainer);
            }
        }

        // Assign active state to menu item
        if ( editorItemConfig.enabled  ) {
            treeItemLi.addClass("selected");
        }

        treeItemLink.on('click',function(e) {
            e.preventDefault();
            AmCharts.Editor.selectMenuItem(jQuery(this));
        })

        if ( editorItemConfig == AmCharts.Editor.selectedItem ) {
            AmCharts.Editor.selectMenuItem(treeItemLink);
            AmCharts.Editor.haveSelected = true;
        }
    }
}

AmCharts.Editor.selectMenuItem = function( treeItemLink ) {
    var treeItemLi       = treeItemLink.parent();
    var treeItemConfig   = treeItemLink.data('treeItemConfig') || {};
    var editorItemConfig = treeItemConfig.editorItemConfig || {};
    var treeItemClass    = 'active';

    // TOGGLE PARENT
    if ( editorItemConfig.isArray && treeItemLi.hasClass('selected') ) {
        treeItemLi.removeClass('selected');
        return;
    }

    if ( editorItemConfig.enabled !== false ) {
        if ( treeItemConfig.type == 'array' ) {
            if ( !treeItemConfig.children || !treeItemConfig.children.length ) {
                return false;
            }
            treeItemClass = 'selected';
        }

        // DESELECT PREVIOUS
        jQuery(AmCharts.Editor.SELECTORS.groups + ' .menu-item').removeClass('active');
        jQuery(AmCharts.Editor.SELECTORS.groups + ' .menu-item-array').removeClass('selected');

        // SELECT CURRENT PLUS PARENTS
        treeItemLi.addClass(treeItemClass);
        treeItemLink.parents('.menu-item-array').addClass('selected');

        AmCharts.Editor.hasSubgroups = false;
        AmCharts.Editor.createClassProperties(treeItemConfig);
    }
}

AmCharts.Editor.addItem = function( treeItemConfig) {
    var editorItemConfig = treeItemConfig.editorItemConfig;
    if (!editorItemConfig.values) {
        editorItemConfig.values = [];
    }
    var type = editorItemConfig.type;
    var newEditorItemConfig = {
        type: type,
        def: type
    };

    AmCharts.Editor.selectedItem = newEditorItemConfig;

    AmCharts.Editor.makeEditorConfig(type, newEditorItemConfig);
    editorItemConfig.values.push(newEditorItemConfig);


    if(type == "AmGraph"){
        newEditorItemConfig.properties.title.value = "graph " + AmCharts.Editor.itemIds["AmGraph"];
    }

    var className = AmCharts.Editor.MAPPING.chartClassMap[AmCharts.Editor.chartType];
    setTimeout(function() {
        AmCharts.Editor.prepareTree(AmCharts.Editor.editorConfig[className]);
    }, 10);

    AmCharts.Editor.pickGraphColors();

    return newEditorItemConfig;
}

AmCharts.Editor.deleteItem = function( treeItemConfig ) {
    var parentTree = treeItemConfig.parentTree;
    var parentEditor = parentTree.editorItemConfig;

    var values = parentEditor.values;
    if ( values ) {
        for(var i = values.length - 1; i >= 0; i-- ) {
            if ( values[i] == treeItemConfig.editorItemConfig ) {
                values.splice(i, 1);
            }
        }
    }

    var className = AmCharts.Editor.MAPPING.chartClassMap[AmCharts.Editor.chartType];
    AmCharts.Editor.prepareTree(AmCharts.Editor.editorConfig[className]);
}

AmCharts.Editor.makeTreeConfig = function( editorItemConfig, treeConfigArray) {
    var groups = {};
    var properties = editorItemConfig.properties;
    var propertyName;
    // do properties first
    if (properties) {
        for (var propertyName in properties) {
            // check group
            var prop = properties[propertyName];
            // IF it's a
            var group = prop.group;
            if (group) {
                group = group.toLowerCase();
                // check if not exist
                if (!groups[group]) {
                    groups[group] = true;

                    var treeObj = {
                        editorItemConfig: editorItemConfig,
                        title: AmCharts.Editor.normalizeName(group),
                        type: "group",
                        group: group
                    }

                    treeConfigArray.push(treeObj);
                }
            }
        }
    }

    // properties which are classes
    for (var propertyName in editorItemConfig) {

        var childConfig = editorItemConfig[propertyName];
        var childClassName = childConfig.type;
        // IF its a class
        var childClassConfig = AmCharts.Editor.MAPPING.classMap[childClassName];

        if (childClassConfig) {

            var title = propertyName;

            if ( childConfig.title ) {
                title = childConfig.title;
            }

            // if it's array
            var treeItemConfig = {
                editorItemConfig: childConfig,
                title: AmCharts.Editor.normalizeName(title)
            };

            if (childConfig.isArray) {
                treeItemConfig.type = "array";

                if (childConfig.values) {
                    treeItemConfig.children = [];

                    for (var i = 0; i < childConfig.values.length; i++) {

                        var newChildConfig = childConfig.values[i];
                        var newTreeConfig = [];
                        AmCharts.Editor.makeTreeConfig(newChildConfig, newTreeConfig);

                        var treeObj2 = {
                            editorItemConfig: newChildConfig,
                            title: AmCharts.Editor.normalizeName(childConfig.type),
                            type: "class",
                            children: newTreeConfig,
                            parentTree:treeItemConfig
                        };

                        newChildConfig.treeObj = treeObj2;

                        treeItemConfig.children.push(treeObj2);
                    }
                }

            // if it's not array
            } else {
                // if no default (like scrollbar, disable)
                if (childConfig.def == undefined) {
                    treeItemConfig.type = "class menu-item-switchable"; // seperated class; since
                } else {
                    treeItemConfig.type = "class";
                }
            }
            treeConfigArray.push(treeItemConfig);
        }
    }
    return treeConfigArray;
}

AmCharts.Editor.setTheme = function( themeName ) {
    var theme = AmCharts.themes[themeName];
    var className = AmCharts.Editor.MAPPING.chartClassMap[AmCharts.Editor.chartType];
    var editorConfig = AmCharts.Editor.editorConfig[className];
    editorConfig.properties.theme.value = themeName;
    AmCharts.Editor.changeDefaults(className, editorConfig, theme);
    AmCharts.Editor.pickGraphColors();
    AmCharts.Editor.processData();
    AmCharts.Editor.createClassProperties(AmCharts.Editor.selectedTreeItem);
}

AmCharts.Editor.applyTheme = function( themeName ) {
    AmCharts.Editor.setTheme(themeName);
    AmCharts.Editor.createChartConfig();
}

AmCharts.Editor.changeDefaults = function( className, editorConfig, theme ) {
    var classConfig = AmCharts.Editor.MAPPING.classMap[className];

    var properties = editorConfig.properties;
    var property;
    var def;
    var type;

    for (propertyName in properties) {

        property = properties[propertyName];

        var classes = AmCharts.Editor.MAPPING.inheritance[className];
        if ( !classes ) {
            classes = [];
        }
        classes.push(className);
        // set initial default first
        property.def = AmCharts.Editor.MAPPING.classMap[className][propertyName].def;

        for(var i = 0; i < classes.length; i++ ) {
            if ( theme ) {
                var inheritedClassName = classes[i];

                if ( theme[inheritedClassName] ) {


                    if ( theme[inheritedClassName][propertyName] !== undefined ) {
                        property.def = theme[inheritedClassName][propertyName];
                    }
                }
            }
        }
    }

    // classes
    for (var classPropertyName in editorConfig) {

        var editorItemConfig = editorConfig[classPropertyName];
        def = editorItemConfig.def;
        type = editorItemConfig.type;
        if (AmCharts.Editor.MAPPING.classMap[type]) {
            if (editorItemConfig.isArray) {

                var values = editorItemConfig.values;
                if ( values ) {
                    for(var v = 0; v < values.length; v++ ) {
                        AmCharts.Editor.changeDefaults(type, values[v], theme);
                    }
                }
            }
            else{
                AmCharts.Editor.changeDefaults(type, editorItemConfig, theme);
            }
        }
    }
}


AmCharts.Editor.makeEditorConfig = function( className, configObject, preConfig) {
    var classConfig = AmCharts.Editor.MAPPING.classMap[className];
    configObject.properties = {};

    for (var propertyName in classConfig) {
        var prop = classConfig[propertyName];
        var preProp;
        if ( preConfig ) {
            preProp = preConfig[propertyName];
        }

        // if it's a class
        var childClassConfig = AmCharts.Editor.MAPPING.classMap[prop.type];
        if (childClassConfig && !prop.is_id && prop.editor_menu == true) {
            if (!configObject[propertyName]) {
                configObject[propertyName] = jQuery.extend({}, prop);
            }

            if (prop.isArray) {
                if ( preProp ) {
                    configObject[propertyName].values = [];

                    for(var i = 0; i < preProp.length; i++ ) {
                        var newInstance = {};
                        AmCharts.Editor.makeEditorConfig(prop.type, newInstance, preProp[i])
                        configObject[propertyName].values.push(newInstance);
                    }
                }
                else{
                    // if there is one in array, like ValueAxis
                    if (prop.def == prop.type) {
                        if (!configObject[propertyName].values) {
                            var instance = {};
                            AmCharts.Editor.makeEditorConfig(prop.type, instance);
                            configObject[propertyName].values = [instance];
                        }
                    }
                }
            } else {
                AmCharts.Editor.makeEditorConfig(prop.type, configObject[propertyName], preProp);

                if (prop.def === undefined && !preProp) {
                    configObject[propertyName].enabled = false;
                }
                else{
                    configObject[propertyName].enabled = true;
                }
            }
        } else {
            var newProp = jQuery.extend({}, prop);
            if ( preProp !== undefined ) {
                newProp.value = preProp;
            }

            configObject.properties[propertyName] = newProp;

            if ( propertyName == "id") {
                if ( !AmCharts.Editor.itemIds[className] ) {
                    AmCharts.Editor.itemIds[className] = 1;
                }
                else{
                    AmCharts.Editor.itemIds[className]++;
                }
                if(preProp === undefined){
                    newProp.value = className + "-" + AmCharts.Editor.itemIds[className];
                }
            }
        }
        // save prop name too
        if (configObject[propertyName]) {
            configObject[propertyName]["propName"] = propertyName;
        }
    }
}

AmCharts.Editor.pickGraphColors = function() {

    var className = AmCharts.Editor.MAPPING.chartClassMap[AmCharts.Editor.chartType];
    var editorConfig = AmCharts.Editor.editorConfig[className];

    if ( editorConfig.graphs ) {
        if ( editorConfig.graphs.values ) {
            for(var i = 0; i < editorConfig.graphs.values.length; i++ ) {
                var graphEditorConfig = editorConfig.graphs.values[i];
                var colorsValue = editorConfig.properties.colors.value;

                var graphColor = graphEditorConfig.properties.lineColor.value;
                if ( graphColor === undefined ) {

                    if ( colorsValue ) {
                        if ( colorsValue[i] ) {
                            graphColor = colorsValue[i];
                        }
                    }
                    else{
                        var defaultColors = AmCharts.Editor.editorConfig[className].properties.colors.def;
                        if ( defaultColors ) {
                            if ( defaultColors[i] ) {
                                graphColor = defaultColors[i];
                            }
                            else{
                                graphColor = AmCharts.randomColor();
                            }
                        }
                    }
                }
                graphEditorConfig.itemColor = graphColor;
                // change in the menu if exists
                if ( graphEditorConfig.menuBullet ) {
                    graphEditorConfig.menuBullet.css("backgroundColor", graphColor)
                }
                // change in data if exists
                /*
                if (graphEditorConfig.dataBullet) {
                    graphEditorConfig.dataBullet.css({
                        color: graphColor,
                        backgroundColor: graphColor
                    });
                }*/
            }
        }
    }
}
AmCharts.Editor.createClassProperties = function( treeItemConfig) {
    AmCharts.Editor.selectedTreeItem = treeItemConfig;
    var propertiesPanel              = jQuery(AmCharts.Editor.SELECTORS.props).html("");
    var group                        = treeItemConfig.group;
    var properties                   = (treeItemConfig.editorItemConfig || {}).properties || {};

    // DESTROY PREVIOUS
    jQuery(AmCharts.Editor.SELECTORS.props + ' .ui-control-color input').spectrum('destroy');

    // CREATE PROPS
    for (var propName in properties) {
        var property = properties[propName];
        var propertyGroup = property.group;

        if (property.advanced ) {
            // void
        }
        else{
            if (group ) {
                if ( propertyGroup ) {
                    if (group == propertyGroup.toLowerCase()) {
                        AmCharts.Editor.makeProperty(properties[propName], propName, treeItemConfig.title);
                    }
                }
            } else {
                var title = treeItemConfig.title;

                try{
                    title = treeItemConfig.editorItemConfig.properties.id.value;
                }
                catch(err ) {

                }
                AmCharts.Editor.makeProperty(properties[propName], propName, title);
            }
        }
    }

    // SELECT
    jQuery(AmCharts.Editor.SELECTORS.props + ' .ui-control-select select').chosen({
        disable_search: true,
        width: '100%'
    }).on('chosen:showing_dropdown',function() {
        jQuery(this).parents('.ui-control').addClass('ui-control-active');
    }).on('chosen:hiding_dropdown',function() {
        jQuery(this).parents('.ui-control').removeClass('ui-control-active');
    });

    // COLOR
    jQuery(AmCharts.Editor.SELECTORS.props + ' .ui-control-color').each(function() {
        jQuery(this).find('input').spectrum({
            allowEmpty      : true,
            showPalette     : true,
            showButtons     : false,
            preferredFormat : 'hex',
            localStorageKey : 'ameditor.colors',
            move            : function( color ) {
                this.value = color.toHexString().toUpperCase();
                jQuery(this).data('propertyConfig').value = this.value;
                clearTimeout(AmCharts.Editor.timer);
                AmCharts.Editor.timer = setTimeout(function() {
                    AmCharts.Editor.createChartConfig();
                },150)
            },
            beforeShow      : function( color ) {
                jQuery(this).parent().removeClass('ui-control-color-undefined');
                jQuery(this).parents('.ui-control').addClass('ui-control-active');
            },
            hide            : function( color ) {
                jQuery(this).parent()[color?'removeClass':'addClass']('ui-control-color-undefined');
                jQuery(this).parents('.ui-control').removeClass('ui-control-active');
            }
        });
    });

    // SPINNER
    jQuery(AmCharts.Editor.SELECTORS.props + ' .ui-control-spinner').each(function() {
        var propertyConfig = jQuery(this).data('propertyConfig');
        var spinnerCFG = {
            min: propertyConfig.min,
            max: propertyConfig.max,
            step: 1,
            spin: function( event, ui) {
                propertyConfig.value = ui.value;
                AmCharts.Editor.createChartConfig();
            },
            change: function( event, ui) {
                propertyConfig.value = Number(event.currentTarget.value);
                AmCharts.Editor.createChartConfig();
            }
        }
        if ( spinnerCFG.min === undefined ) {
            delete spinnerCFG.min;
        }
        if ( spinnerCFG.max === undefined ) {
            delete spinnerCFG.max;
        }
        var spinner = jQuery(this).find('input').spinner(spinnerCFG);
        spinner.on('blur', function(event){
            if(event.currentTarget.value == ""){
                propertyConfig.value = undefined;
                AmCharts.Editor.createChartConfig();
            }
        })
    });

    // SPINNER / SELECT
    jQuery(AmCharts.Editor.SELECTORS.props + ' .menu-item-numberstring .ui-control-spinner').each(function() {
        var propertyConfig = jQuery(this).data('propertyConfig');
        var spinnerCFG = {
            min: propertyConfig.min,
            max: propertyConfig.max,
            step: 1,
            spin: function( event, ui) {
                propertyConfig.value = ui.value;

                if (propertyConfig.unit == "%" && !isNaN(ui.value)) {
                    propertyConfig.value = propertyConfig.value + "%";
                }
                AmCharts.Editor.createChartConfig();
            },
            change: function( event, ui) {
                propertyConfig.value = Number(event.currentTarget.value);
                if ( propertyConfig.unit == "%" && !isNaN(propertyConfig.value)) {
                    propertyConfig.value = propertyConfig.value + "%";
                }

                AmCharts.Editor.createChartConfig();
            }
        }
        if ( spinnerCFG.min === undefined ) {
            delete spinnerCFG.min;
        }
        if ( spinnerCFG.max === undefined ) {
            delete spinnerCFG.max;
        }
        jQuery(this).find('input').spinner(spinnerCFG);

        // SELECT
        jQuery(this).find('select').chosen({
            disable_search: true,
            width: '30%'
        });
    });

    // SLIDER
    jQuery(AmCharts.Editor.SELECTORS.props + ' .ui-control-slider').each(function() {
        var propertyConfig = jQuery(this).data('propertyConfig');
        var sliderValue = propertyConfig.value;
        if ( sliderValue === undefined ) {
            sliderValue = propertyConfig.def;
        }

        jQuery(this).find('div').slider({
            min: propertyConfig.min,
            max: propertyConfig.max,
            value: sliderValue,
            step: (propertyConfig.max - propertyConfig.min) / 100,
            slide: function( event, ui) {
                propertyConfig.value = ui.value;
                AmCharts.Editor.createChartConfig();
            }
        });
    });

    // TOGGLE GROUPS
    var autoSelect = jQuery(AmCharts.Editor.SELECTORS.props + ' .menu-group.menu-group-autoselect');

    if ( autoSelect.length > 0 ) {
        jQuery(AmCharts.Editor.SELECTORS.props).prepend(autoSelect);
        autoSelect.addClass('active');
    } else {
        jQuery(AmCharts.Editor.SELECTORS.props + ' .menu-group').first().addClass('active');
    }

    // BIND TOGGLE
    jQuery(AmCharts.Editor.SELECTORS.props + ' .menu-group a').on('click',function(e) {
        e.preventDefault();
        jQuery(this).parent().toggleClass('active');
    });

    // BIND SORTABLES
    jQuery(AmCharts.Editor.SELECTORS.groups + ' ul.sub-tree').sortable({
        axis    : 'y',
        opacity : .8,
        handle  : '.menu-item-handle',
        change  : AmCharts.Editor.sortGraph, /* being called while dragging */
        update  : AmCharts.Editor.sortGraph  /* being called at the end */
    });
}

AmCharts.Editor.sortGraph = function(e) {
    console.log(arguments);
}


AmCharts.Editor.capitalize = function( str ) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

AmCharts.Editor.makeProperty = function( propertyConfig, name, parentName) {

    var value = propertyConfig.value;
    if (value === undefined) {
        value = propertyConfig.def;
    }

    // if it's subgroup, check if we have a div for it
    var container = AmCharts.Editor.SELECTORS.props;
    var subgroup = propertyConfig.subgroup;

    if ( !subgroup ) {
        subgroup = parentName;
    }

    if (subgroup) {
        var subgroupId = "navbar-" + subgroup.split(" ").join("-").toLowerCase();
        subgroupId     = subgroupId.split(",").join("")
        container      = jQuery("." + subgroupId);
        if (container.length == 0) {
            var header = jQuery("<li class='menu-group'><a href='#' class='menu-group-title'><i class='menu-item-toggle pull-left'></i>"+subgroup+"</a></li>").appendTo(AmCharts.Editor.SELECTORS.props);
            container = jQuery("<ul class='menu-group-items nav navbar-stacked " + subgroupId + "'></ul>").appendTo(header);

            if ( AmCharts.Editor.variableizeName(subgroup) == 'generalsettings' ) {
                header.addClass('menu-group-autoselect');
            }
            header.next().hide();

            AmCharts.Editor.hasSubgroups = true;
        }
    }
    if ( propertyConfig.title ) {
        name = propertyConfig.title;
    }
    var wrapper,control;
    var normalizedName    = name.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase();
    normalizedName        = AmCharts.Editor.capitalize(normalizedName);
    var type              = propertyConfig.type.toLowerCase();
    var propertyHTML      = jQuery('<li class="menu-item menu-item-'+AmCharts.Editor.variableizeName(type)+' clearfix"></li>');
    var propertyNameHTML  = jQuery('<div class="menu-item-name"></div>');
    var propertyTitleHTML = jQuery('<span title="">'+ normalizedName +'</span>').appendTo(propertyNameHTML);
    var controlHTML       = jQuery('<div class="menu-item-control"></div>');

    propertyHTML.append(propertyNameHTML);
    propertyHTML.append(controlHTML);

    // TOOLTIP
    if ( propertyConfig.description ) {
        propertyTitleHTML.tooltip({
            title: propertyConfig.description,
            html: true,
            trigger: 'hover focus click',
            delay: {
                show: 500,
                hide: 1000
            },
            placement: 'right'
        }).addClass('menu-item-tooltip');
    }

    // TEXTAREA
    if (propertyConfig.isArray) {
        propertyHTML.addClass('menu-item-stacked');
        wrapper = jQuery('<div class="ui-control ui-control-textarea"></div>');
        var strVal = JSON.stringify(value);
        if(!strVal){
            strVal = "";
        }
        else{
            strVal = strVal.substring(1, strVal.length-1);
        }
        control = jQuery('<textarea rows="5">' + strVal + '</textarea>').on('input', function(event) {
                try{
                    propertyConfig.value = JSON.parse("[" + jQuery(this).val() + "]");
                    AmCharts.Editor.createChartConfig();
                    wrapper.removeClass("ui-control-error");
                }
                catch(err){
                    wrapper.addClass("ui-control-error");
                }
            }).appendTo(wrapper);

        controlHTML.append(wrapper);

    // IF IT'S ID (LIKE GRAPH.VALUEAXIS)
    } else if (  propertyConfig.is_id ) {
        var wrapper = jQuery('<div class="ui-control ui-control-select"></div>');
        var control = jQuery('<select></select>').on('change', function( event ) {
            propertyConfig.value = jQuery(this).find(":selected").text();
            AmCharts.Editor.createChartConfig();
        }).appendTo(wrapper);

        var itemsArray = AmCharts.Editor.editorConfig[AmCharts.Editor.MAPPING.chartClassMap[AmCharts.Editor.chartType]][propertyConfig.is_id].values;

        jQuery('<option>Not set</option>').appendTo(control);
        if(itemsArray){
            for(var i = 0; i < itemsArray.length; i++ ) {
                var id = itemsArray[i].properties.id.value;

                var selected = false;
                if ( value == id ) {
                    selected = true;
                }
                jQuery('<option>'+id+'</option>').appendTo(control);
            }
        }
        control.val(value);
        controlHTML.append(wrapper);

    // BOOLEAN /////////////////////////////
    } else if (type == "boolean") {
        var uid = AmCharts.getUniqueId();
        control = jQuery('<i class="menu-item-check"></i>').on('click',function() {
            jQuery(this).parents('.menu-item').toggleClass('selected');
            propertyConfig.value = jQuery(this).parents('.menu-item').hasClass('selected');
            AmCharts.Editor.createChartConfig();
        });
        jQuery(propertyHTML)[value?'addClass':'removeClass']('selected');
        controlHTML.append(control);

    // NUMBER /////////////////////////////
    } else if ( type == "number" ) {
        // slider
        if (!isNaN(propertyConfig.min) && !isNaN(propertyConfig.max)) {
            wrapper = jQuery('<div class="ui-control ui-control-slider"><div></div></div>');
        }
        // spinner
        else {

            if (value === undefined) {
                value = "";
            }
            wrapper = jQuery('<div class="ui-control ui-control-spinner"></div>');
            control = jQuery('<input type="text" value="' + value + '">').appendTo(wrapper);
        }
        wrapper.data('propertyConfig',propertyConfig);
        controlHTML.append(wrapper);

    // NUMBER / STRING ////////////////////
    } else if ( type == "number/string" ) {

        if (value === undefined) {
            value = "";
        }
        else{
            var unit = "px";
            if(isNaN(value)){
                if ( value.indexOf("%") != -1 ) {
                    unit = "%";
                    value = Number(value.substring(0, value.length - 1));
                }
            }
        }

        propertyConfig.unit = unit;

        // SPINNER
        wrapper = jQuery('<div class="ui-control ui-control-spinner"></div>');
        control = jQuery('<input type="text" value="' + value + '">').appendTo(wrapper);
        wrapper.data('propertyConfig',propertyConfig);
        controlHTML.append(wrapper);

        // SELECT
        wrapper        = jQuery('<div class="ui-control ui-control-select"></div>');
        var unitSelect = jQuery('<select></select>').on('change', function( event ) {
            propertyConfig.unit = jQuery(this).find(":selected").text();
            if ( propertyConfig.unit == "%" ) {
                propertyConfig.value = propertyConfig.control.val() + "%";
            }
            else{
                propertyConfig.value = Number(propertyConfig.control.val());
            }
            AmCharts.Editor.createChartConfig();
        }).appendTo(wrapper);

        jQuery('<option>px</option>').appendTo(unitSelect);
        jQuery('<option>%</option>').appendTo(unitSelect);
        unitSelect.val(unit);

        wrapper.data('propertyConfig',propertyConfig);
        controlHTML.append(wrapper);


    // COLOR //////////////////////////////////
    } else if ( type == "color" ) {
        if ( value === undefined ) {
            value = "";
        }
        wrapper = jQuery('<div class="ui-control ui-control-color"></div>');
        control = jQuery('<input type="text" value="' + value + '">').on('input', function(event) {
            propertyConfig.value = jQuery(this).val(); AmCharts.Editor.processData
            AmCharts.Editor.createChartConfig();
        }).on('blur',function() {
            propertyConfig.value = jQuery(this).val().toUpperCase();
            jQuery(this).spectrum('set',propertyConfig.value);
            AmCharts.Editor.createChartConfig();
        }).appendTo(wrapper);

        if ( !value ) {
            jQuery(wrapper).addClass('ui-control-color-undefined');
        }
        controlHTML.append(wrapper);

    // STRING ////////////////////////////////
    } if ( type == "string" || type == "date") {
        if ( value === undefined ) {
            value = "";
        }

        if ( propertyConfig.is_field ) {
            var availableFields = AmCharts.Editor.dataFields;

            wrapper = jQuery('<div class="ui-control ui-control-select"></div>');
            control = jQuery('<select id="category"></select>').on('change', function (event) {
                propertyConfig.value = jQuery(this).find(":selected").text();
                AmCharts.Editor.processData(AmCharts.Editor.dataProvider);
                AmCharts.Editor.createChartConfig();
            }).appendTo(wrapper);

            jQuery('<option>Not set</option>').appendTo(control);

            for(var i = 0; i < availableFields.length; i++ ) {
                var field = availableFields[i];
                var selected = false;
                if ( value == field ) {
                    selected = true;
                }
                jQuery('<option>'+field+'</option>').appendTo(control);
            }
            control.val(value);
        } else {
            var allowedValuesStr = propertyConfig.allowed_values;
            if ( allowedValuesStr ) {
                var allowedValues = allowedValuesStr.split(",");
                // dropdown
                if ( allowedValues.length > 2 ) {
                    var wrapper = jQuery('<div class="ui-control ui-control-select"></div>');
                    var control = jQuery('<select></select>').on('change', function( event ) {
                        propertyConfig.value = jQuery(this).find(":selected").text();
                        // exception for theme
                        if ( name == "theme" ) {
                            if ( AmCharts.Editor.selectedTheme != propertyConfig.value ) {
                                AmCharts.Editor.setTheme(propertyConfig.value);
                            }
                        }

                        AmCharts.Editor.createChartConfig();
                    }).appendTo(wrapper);

                    for(var i = 0; i < allowedValues.length; i++ ) {
                        var allowedValue = allowedValues[i];
                        var selected = false;
                        if ( value == allowedValue ) {
                            selected = true;
                        }
                        jQuery('<option>'+allowedValue+'</option>').appendTo(control);
                    }
                    control.val(value);

                    // exception for theme
                    if ( name == "theme" ) {
                        AmCharts.Editor.selectedTheme = value;
                    }

                //radio
                } else {
                    wrapper = jQuery('<div class="ui-control ui-control-radio"></div>');
                    for(var i = 0; i < allowedValues.length; i++ ) {
                        var allowedValue   = allowedValues[i];
                        var normalizedName = name.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase();
                        normalizedName     = AmCharts.Editor.capitalize(allowedValue);
                        var checked        = "";
                        if ( value == allowedValue ) {
                            checked = "selected";
                        }

                        jQuery('<label class="'+checked+'"><i class="menu-item-check"></i>'+normalizedName+'</label>').on('click',function() {
                            jQuery(this).parent().find('label').removeClass('selected');
                            jQuery(this).addClass('selected');
                            propertyConfig.value = jQuery(this).data('value');
                            AmCharts.Editor.createChartConfig();
                        }).appendTo(wrapper).data('value',allowedValue);
                    }
                }
            } else {
                wrapper = jQuery('<div class="ui-control ui-control-text"></div>');
                control = jQuery('<input type="text" value="' + value + '">').on('input', function( event) {
                    propertyConfig.value = jQuery(this).val();
                    if ( propertyConfig.alsoUpdate ) {
                        propertyConfig.alsoUpdate.html(propertyConfig.value);
                    }
                    AmCharts.Editor.createChartConfig();
                }).appendTo(wrapper);
            }
        }

        controlHTML.append(wrapper);
    }

    // BIND FOCUS / BLUR
    if ( control ) {
        jQuery(control).data('propertyConfig',propertyConfig).on('focus blur',function(e) {
            jQuery(this).parents('.ui-control')[e.type=='focus'?'addClass':'removeClass']('ui-control-active');
        });
    }

    propertyConfig.control = control;
    container.append(propertyHTML);
}


AmCharts.Editor.createChartConfig = function(output,tabstop) {
    var chartConfig = {};
    var className   = AmCharts.Editor.MAPPING.chartClassMap[AmCharts.Editor.chartType];
    if ( AmCharts.Editor.editorConfig ) {
        var config                  = AmCharts.Editor.editorConfig[className];
        chartConfig.type            = AmCharts.Editor.preConfig.type;
        chartConfig.pathToImages    = "//cdn.amcharts.com/lib/3/images/";
        AmCharts.Editor.chartConfig = AmCharts.Editor.makeChartConfig(config, chartConfig);

        // data
        if ( AmCharts.Editor.chartType != "stock" && AmCharts.Editor.chartType != "map" && AmCharts.Editor.chartType != "gauge") {
            AmCharts.Editor.chartConfig.dataProvider = AmCharts.Editor.dataProvider;
        }

        // Deep CC for latter comparison
        AmCharts.Editor.current.cfg = jQuery.extend(true,{},AmCharts.Editor.chartConfig);

        // return; output
        if ( output == 'json' ) {
            return JSON.stringify(chartConfig, undefined, tabstop?tabstop:0);
        } else if ( output == 'object' ) {
            return chartConfig;
        } else if ( !AmCharts.Editor.isEditing ) {
            jQuery(AmCharts.Editor.SELECTORS.config).val(JSON.stringify(chartConfig, undefined, '\t'));
           
        }

        // path to images
        // TODO: change it to the real hosting path later?
        AmCharts.Editor.chartConfig.pathToImages = "//cdn.amcharts.com/lib/3/images/";
        AmCharts.Editor.changedConfig();
        AmCharts.Editor.makeChart("am-" + AmCharts.Editor.current.section + "-chart");
      
    }
}


AmCharts.Editor.makeChart = function( containerName ) {
    AmCharts.Editor.chart = AmCharts.makeChart(containerName, AmCharts.Editor.chartConfig);
    
    // background
    jQuery(AmCharts.Editor.SELECTORS.chart).css("background-color", AmCharts.Editor.chart.backgroundColor);
}


AmCharts.Editor.makeChartConfig = function( editorConfig, chartConfig) {
    var properties = editorConfig.properties;
    var property;
    var def;
    var type;

    for (propertyName in properties) {
        property = properties[propertyName];
        var value = property.value;
        def = property.def;

        if (value !== undefined) {
            if (value !== def) {
                chartConfig[propertyName] = value;
            }
        }
    }

    // classes
    for (var classPropertyName in editorConfig) {

        var editorItemConfig = editorConfig[classPropertyName];
        def = editorItemConfig.def;
        type = editorItemConfig.type;
        if (AmCharts.Editor.MAPPING.classMap[type]) {

            // if it's included
            if (def == type) {
                if (editorItemConfig.isArray) {
                    chartConfig[classPropertyName] = [];
                    var values = editorItemConfig.values;
                    if (values) {
                        for (var i = 0; i < values.length; i++) {
                            var value = values[i];
                            var newItem = {};
                            AmCharts.Editor.makeChartConfig(value, newItem);
                            chartConfig[classPropertyName].push(newItem);
                        }
                    }
                } else {
                    chartConfig[classPropertyName] = {};
                    AmCharts.Editor.makeChartConfig(editorItemConfig, chartConfig[classPropertyName]);
                }
            } else {
                if (editorItemConfig.enabled) {
                    chartConfig[classPropertyName] = {};
                    AmCharts.Editor.makeChartConfig(editorItemConfig, chartConfig[classPropertyName]);
                }

                if (editorItemConfig.isArray) {
                    chartConfig[classPropertyName] = [];
                    var values = editorItemConfig.values;
                    if (values) {
                        for (var i = 0; i < values.length; i++) {
                            var value = values[i];
                            var newItem = {};
                            AmCharts.Editor.makeChartConfig(value, newItem);
                            chartConfig[classPropertyName].push(newItem);
                        }
                    }
                }
            }
        }
    }
    return chartConfig;
}

AmCharts.Editor.createGraph = function( columnName ) {
    var treeConfig = AmCharts.Editor.treeConfig;
    for(var i = 0; i < treeConfig.length; i++ ) {
        if ( treeConfig[i].editorItemConfig.type == "AmGraph" ) {
            var newEditorItemConfig = AmCharts.Editor.addItem(treeConfig[i]);
            newEditorItemConfig.properties.valueField.value = columnName;
            newEditorItemConfig.properties.title.value = "graph " + AmCharts.Editor.itemIds["AmGraph"];
        }
    }
}
AmCharts.Editor.variableizeName = function( name ) {
    return name.replace(/\W/g, '').toLowerCase();
}
AmCharts.Editor.normalizeName = function( name ) {
    return name.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase();
}

AmCharts.Editor.dynamicSortMultiple = function() {
    var props = arguments;
    return function( obj1, obj2) {
        var i = 0,
            result = 0,
            numberOfProperties = props.length;
        while (result === 0 && i < numberOfProperties) {
            result = AmCharts.Editor.dynamicSort(props[i])(obj1, obj2);
            i++;
        }
        return result;
    }
}

AmCharts.Editor.dynamicSort = function( property) {
    var sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function( a, b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

AmCharts.Editor.parseConfig = function( isEditing ) {
    var editorConfigArea = jQuery(AmCharts.Editor.SELECTORS.config);
    var editorConfigTab = jQuery('.am-tab-code');
    try {
        var configJSON = editorConfigArea.val();// 코드 입력 값
        var config = jsonlite.parse(configJSON);
        am-editor-code(config);
        AmCharts.Editor.isEditing = isEditing;
        editorConfigArea.removeClass("ui-control-error");
        editorConfigTab.removeClass("am-tab-error");
        editorConfigTab.tooltip('destroy');

    } catch(err) {
        editorConfigArea.addClass("ui-control-error");
        editorConfigTab.addClass("am-tab-error");
        editorConfigTab.tooltip({
            title: AmCharts.Editor.getMSG('tooltip_error_tab_code')
        });
    }
}

AmCharts.Editor.openGraph = function(graphEditorConfig){
    try{
        AmCharts.Editor.selectMenuItem(graphEditorConfig.treeObj.treeItemLink);
       
    }
    catch(err){

    }
}

AmCharts.Editor.getGraphByField = function( field ) {

    if ( AmCharts.Editor.treeConfig ) {
        var className = AmCharts.Editor.MAPPING.chartClassMap[AmCharts.Editor.chartType];
        if(AmCharts.Editor.editorConfig[className].graphs){
            var graphs = AmCharts.Editor.editorConfig[className].graphs.values;

            for(var i = 0; i < graphs.length; i++ ) {
                var properties = graphs[i].properties;
                for(var p in properties ) {
                    if ( properties[p].is_field ) {
                        if ( properties[p].value == field ) {
                            return graphs[i];
                        }
                    }
                }
            }
        }
    }
}

AmCharts.Editor.changeColTitle = function( graph, oldFieldName, newFieldName ) {
    if(oldFieldName != newFieldName){
        if ( AmCharts.Editor.treeConfig ) {
            var className = AmCharts.Editor.MAPPING.chartClassMap[AmCharts.Editor.chartType];
            var graphs = AmCharts.Editor.editorConfig[className].graphs.values;

            for(var i = 0; i < graphs.length; i++ ) {
                var properties = graphs[i].properties;
                for(var p in properties ) {
                    if ( properties[p].is_field ) {
                        if ( properties[p].value == oldFieldName ) {
                            properties[p].value = newFieldName;
                        }
                    }
                }
            }
            AmCharts.Editor.changeFieldNameInData(oldFieldName, newFieldName);
        }
    }
}

AmCharts.Editor.changeFieldNameInData = function( oldFieldName, newFieldName ) {
    var dataProvider = AmCharts.Editor.dataProvider;

    for(var i = 0; i < dataProvider.length; i++ ) {
        dataProvider[i][newFieldName] = dataProvider[i][oldFieldName];
        delete(dataProvider[i][oldFieldName]);
    }

    var dataFields = AmCharts.Editor.dataFields;
    var index = dataFields.indexOf(oldFieldName);

    if (index !== -1) {
        dataFields[index] = newFieldName;
    }

    AmCharts.Editor.createChartConfig();
}

AmCharts.Editor.getFields = function( data ) {
    if(data){
        var oldFields = AmCharts.Editor.dataFields;
        if ( !oldFields ) {
            oldFields = [];
        }
        var newDataFields = [];
        var tempFields = [];

        for(var d = 0; d < data.length; d++){
            var dataItem = data[d];
            for(var field in dataItem ) {
                if ( oldFields.indexOf(field) !== -1 ) {
                    tempFields[oldFields.indexOf(field)] = field;
                }
                else{
                    if(newDataFields.indexOf(field) == -1){
                        newDataFields.push(field);
                    }
                }
            }
        }

        if ( tempFields.length > 0 ) {
            for(var i = tempFields.length - 1; i >= 0 ; i-- ) {
                newDataFields.unshift(tempFields[i]);
            }
        }

        AmCharts.Editor.dataFields = newDataFields;
    }
}

AmCharts.Editor.changedData = function( data, skipConfig ) {
    if ( data ) {
        AmCharts.Editor.getFields(data);
        AmCharts.Editor.dataProvider = data;

        if ( !skipConfig ) {
            AmCharts.Editor.createChartConfig();
        }

        jQuery(window).trigger('changed.am.data',data);
    }
}
AmCharts.Editor.changedConfig = function(update) {
    var equalivient = false;
    if ( update ) {
        AmCharts.Editor.current.user.cfg = jQuery.extend({},AmCharts.Editor.current.cfg);
    }
    equalivient = Object.equals(AmCharts.Editor.current.cfg,AmCharts.Editor.current.user.cfg);
    AmCharts.Editor.current.user.changedConfig = !equalivient;

    jQuery(window).trigger('changed.am.config',equalivient);

    return equalivient;
}