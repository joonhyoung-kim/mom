/*!
* amCharts - Live Editor
* CORE; GUI SECTION LANDING
* Copyright (c) 2014 amCharts
* Licensed MIT
* http://amcharts.com/
* v1.0.0-beta.1
*/

// OBSERVE SECTION CHANGE
jQuery(window).on('changed.am.section',function() {
	if ( AmCharts.Editor.current.section == 'landing' && jQuery.inArray('landing',AmCharts.Editor.current.rendered) == -1 ) {

		// OLDIES
		if ( BrowserDetect.browser == 'Explorer' && BrowserDetect.version < 9 ) {
			jQuery('.app-landing-header .btn-makechart').remove();
			jQuery('.app-section').each(function() {
				if ( !jQuery(this).hasClass('app-section-landing') ) {
					jQuery(this).remove();
				}
			});
			jQuery('.app-nav .navbar-nav').remove();

			jQuery('.btn-upgrade').removeClass('hidden').off().on('click',function(e) {
				e.preventDefault();
				AmCharts.Editor.modal({
					remote: AmCharts.Editor.CONSTANT.URL_BASE + 'static/tpl/modal-upgrade.tpl?' + AmCharts.Editor.CONSTANT.RND_KEY
				});
			});

		// MODERN
		} else {
			jQuery('.app-landing-header .btn-makechart').off().on('click',function(e) {
				e.preventDefault();
				jQuery.router.go('/new/');
				ga('send', {
					'hitType'		: 'event',
					'eventCategory'	: 'Buttons',
					'eventAction'	: 'Click',
					'eventLabel'	: 'Make a Chart',
				});
			});
			jQuery('.btn-upgrade').remove();
		}

		// LOGIN
		jQuery('.app-section-landing .am-menu-user, .app-section-landing .am-menu-signin').off().on('show.bs.dropdown hide.bs.dropdown',function(e) {
			if ( e.type == 'show' ) {
				jQuery(document.body).addClass('modal-open');
				jQuery('<div class="modal-backdrop modal-backdrop-login fade"></div>').appendTo(document.body).one(jQuery.support.transition.end, function() {
					jQuery(this).addClass('in');
				}).emulateTransitionEnd(0);

				if ( !jQuery('.app-section-landing .navbar-signin .dropdown-menu iframe').data('loaded') ) {
					jQuery('.app-section-landing .navbar-signin .dropdown-menu iframe').attr('src',AmCharts.Editor.CONSTANT.URL_AMCHARTS + 'sign-in/editor/?redirect_to=' + location.protocol + AmCharts.Editor.CONSTANT.URL_BASE + 'auth/done/?' + AmCharts.Editor.CONSTANT.RND_KEY).data('loaded',true);
				}
			} else {
				jQuery(document.body).removeClass('modal-open');
				jQuery('.modal-backdrop-login').removeClass('in').one(jQuery.support.transition.end, function() {
					jQuery(this).remove();
				}).emulateTransitionEnd(300);
			}
		});

		// PUBLIC CHARTS
		jQuery('.app-landing-publiccharts').load(AmCharts.Editor.CONSTANT.URL_BASE + 'static/tpl/landing-public-charts.php?' + AmCharts.Editor.CONSTANT.RND_KEY);

		// ADD TO QUEUE
		AmCharts.Editor.current.rendered.push('landing');
	}
});

// OBSERVE USER BADGE CHANGE
jQuery(window).on('changed.am.user.badge',function() {
	if ( AmCharts.Editor.current.section == 'landing' ) {


	}
});

// OBSERVE USER CHARTS CHANGE
jQuery(window).on('changed.am.user.charts',function() {
	if ( AmCharts.Editor.current.section == 'landing' ) {
		// LOGGED OUT
		if ( !AmCharts.Editor.current.user.name ) {
			jQuery('.app-landing-usercharts').html('');
		}
	}
});