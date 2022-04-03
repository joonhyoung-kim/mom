/*!
* amCharts - Live Editor - handler
* CORE; GUI HANDLER
* Copyright (c) 2014 amCharts
* Licensed MIT
* http://amcharts.com/
* v1.0.0-beta.1
*/

AmCharts.Editor.hexToRgb = function(hex,alpha) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
        a: alpha || 1
    } : null;
}

/*
** MODAL HANDLER TO USE BOOTSTRAP MODALS MULTIPLE TIMES
*/
AmCharts.Editor.modal = function(options) {
    // RESET TO RELOAD
    if ( typeof options === 'object' || options == 'show' ) {
        jQuery(AmCharts.Editor.SELECTORS.modal).data('bs.modal',false).find('.modal-content').html('');
    }
    jQuery('.modal-backdrop').remove();
    jQuery(AmCharts.Editor.SELECTORS.modal).modal(options);
}

/*
** CUSTOM LOG FUNCTION
*/
AmCharts.Editor.log = function(type,msg) {
    if ( AmCharts.Editor.DEBUG === true ) {
        console[type=='info'||type=='error'?type:'error']('AmEditor',msg);
    }
}

/*
** GET MSG
*/
AmCharts.Editor.getMSG = function(key,lang) {
    return AmCharts.Editor.I18N[key] || 'Undefined message: ' + key;
}


/*
** LOAD CHART
*/

/*
** SAVE CHART DRAFT

/*
** UPDATE USER NAV
*/
AmCharts.Editor.updateUserNav = function() {
    jQuery(AmCharts.Editor.SELECTORS.menu).find('li').each(function() {
        var disabled = false;

        // Require login
        if ( jQuery(this).is('.am-menu-save, .am-menu-save-draft, .am-menu-fork, .am-menu-share') ) {
            disabled = AmCharts.Editor.current.user.error || AmCharts.Editor.current.user.login_url;
            if ( jQuery(this).is('.am-menu-save-draft') ) {
                jQuery(this)[!disabled&&AmCharts.Editor.current.chart.chart_id&&AmCharts.Editor.current.user.changedConfig?'removeClass':'addClass']('disabled');
            } else if ( jQuery(this).is('.am-menu-fork, .am-menu-share') ) {
                jQuery(this)[!disabled&&AmCharts.Editor.current.chart.chart_id?'removeClass':'addClass']('disabled');
            } else {
                jQuery(this)[disabled?'addClass':'removeClass']('disabled');
            }
        }
    });

    jQuery(window).trigger('changed.am.user.nav');
}

/*
** UPDATE USER BADGE
*/
AmCharts.Editor.updateUserBadge = function() {
    var msg        = 'You have '+AmCharts.Editor.current.list.total_count+' saved chart';
    var username   = jQuery('.am-user-name');
    var usercharts = jQuery('.am-user-charts');

    jQuery(username).html(AmCharts.Editor.current.user.name || '');

    // USER CHARTS
    if ( AmCharts.Editor.current.list.total_count > 0 ) {
        jQuery(usercharts).text(AmCharts.Editor.current.list.total_count || '0');
        jQuery(usercharts).each(function() {
            jQuery(this).parent().off().tooltip('destroy').addClass('btn-usercharts');
            if ( !jQuery(this).parents('.modal').length ) {
                jQuery(usercharts).parent().on('click',function(e) {
                    e.stopPropagation();
                    e.preventDefault();
                    AmCharts.Editor.current.user.showChartList = true;
                    AmCharts.Editor.modal({
                        remote      : AmCharts.Editor.CONSTANT.URL_BASE + 'static/tpl/modal-chart-new.tpl?' + AmCharts.Editor.CONSTANT.RND_KEY
                    });
                });
                jQuery(this).parent().tooltip({
                    title     : AmCharts.Editor.current.list.total_count==1?msg:msg+'s',
                    placement : 'bottom'
                });
            } 
        });
    }

 
    jQuery(window).trigger('changed.am.user.badge');
}


/*
** PAGINATION
*/
AmCharts.Editor.updateIframe = function(css) {
    jQuery('.am-menu-signin').removeClass('loading').removeClass('loading-dark');
    jQuery('iframe').css(css);
}

/*
** PAGINATION
*/
AmCharts.Editor.updatePagination = function() {
    var tmpList = jQuery('.am-charts-pagination').html('');
    var badges  = Math.ceil(AmCharts.Editor.current.list.total_count / AmCharts.Editor.current.list.number);

    if ( badges > 1 ) {
        // SCROLLTOP
        jQuery('.app-section, .modal-body').animate({
            scrollTop: 0
        },{
            duration: 250
        });

        // PREV   
        var tmpItem   = jQuery('<li></li>').appendTo(tmpList);
        var tmpLink   = jQuery('<a></a>').attr('href','#').appendTo(tmpItem);
        var tmpTitle  = jQuery('<i></i>').addClass('ui-icon ui-icon-triangle-1-w');

        tmpLink.html(tmpTitle);
        tmpItem.data('offset',AmCharts.Editor.current.list.offset-AmCharts.Editor.current.list.number);

        if ( !AmCharts.Editor.current.list.offset ) {
            tmpItem.addClass('disabled');
        }
        tmpLink.on('click',function(e) {
            e.preventDefault();
            if ( !jQuery(this).parent().hasClass('disabled') ) {
                AmCharts.Editor.getUserCharts({
                    offset: jQuery(this).parent().data('offset')
                });
            }
        });

        // LIST
        for(var badge = 0; badge < badges; badge++) {
            var tmpItem   = jQuery('<li></li>').appendTo(tmpList);
            var tmpLink   = jQuery('<a></a>').attr('href','#').appendTo(tmpItem);
            var tmpTitle  = badge+1;

            tmpItem.data('offset',badge*AmCharts.Editor.current.list.number);
            tmpLink.text(tmpTitle).on('click',function(e) {
                e.preventDefault();
                AmCharts.Editor.getUserCharts({
                    offset: jQuery(this).parent().data('offset')
                });
            });

            // Active
            if ( AmCharts.Editor.current.list.offset == badge * AmCharts.Editor.current.list.number ) {
                tmpItem.addClass('active');
            }
        };

        // NEXT   
        var tmpItem   = jQuery('<li></li>').appendTo(tmpList);
        var tmpLink   = jQuery('<a></a>').attr('href','#').appendTo(tmpItem);
        var tmpTitle  = jQuery('<i></i>').addClass('ui-icon ui-icon-triangle-1-e');

        tmpLink.html(tmpTitle);
        tmpItem.data('offset',AmCharts.Editor.current.list.offset+AmCharts.Editor.current.list.number);
        
        if ( AmCharts.Editor.current.list.offset+AmCharts.Editor.current.list.number > AmCharts.Editor.current.list.total_count ) {
            tmpItem.addClass('disabled');
        }
        tmpLink.on('click',function(e) {
            e.preventDefault();
            if ( !jQuery(this).parent().hasClass('disabled') ) {
                AmCharts.Editor.getUserCharts({
                    offset: jQuery(this).parent().data('offset')
                });
            }
        });
    }
}

/*
** SECTION SWITCHER
*/
AmCharts.Editor.updateSection = function(name) {
	var section = jQuery('.app-section-' + name);

    // Toggle class
    jQuery(document.body).removeClass (function (index, css) {
        return (css.match (/\bbody-\S+/g) || []).join(' ');
    }).addClass('body-'+name);

	if ( section.length ) {
        AmCharts.Editor.current.section = name;
		jQuery('.app-section').addClass('hidden');
		jQuery(section).removeClass('hidden');
        jQuery(window).trigger('changed.am.section',section);
	} else {
		AmCharts.Editor.log('error','no such section have been found');
	}
}

/*
** DEFAULTS
*/
AmCharts.Editor.backToDefaults = function() {
    AmCharts.Editor.log('info','back to defaults');
    AmCharts.Editor.chart         = {};
    AmCharts.Editor.cfg           = {};
    AmCharts.Editor.dataProvider  = [];
    AmCharts.Editor.dataFields    = [];
    
    AmCharts.Editor.DEFAULTS.current.chart = {};
    AmCharts.Editor.DEFAULTS.current.cfg   = {};

    // Simple overwrite; TODO need to figure out what overwrites the DEFAULTS
    jQuery.extend(AmCharts.Editor.current,jQuery.extend({},AmCharts.Editor.DEFAULTS.current));
}

/*
** PARSE JSON; STRIPSLASHES
*/
AmCharts.Editor.parseJSON = function(jsonString) {
    jsonString = jsonString.replace(/\\(?!\\[a-zA-Z"']+)/g,"");
    jsonString = JSON.parse(jsonString);
    
    return jsonString;
}

AmCharts.Editor.avoidCaching = function() {
    window.clearTimeout(window.lala);
    window.lala = setInterval(function() {
        AmCharts.Editor.CONSTANT.RND_KEY = Number(new Date());
    },1000);
}