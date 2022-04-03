/*!
* amCharts - Live Editor
* CORE; GUI SECTION SHARE
* Copyright (c) 2014 amCharts
* Licensed MIT
* http://amcharts.com/
* v1.0.0-beta.1
*/

// OBSERVE SECTION CHANGE
jQuery(window).on('changed.am.section',function(e,section) {
	// CHECK
	if ( jQuery.inArray(AmCharts.Editor.current.section,['publish','share']) == -1 ) {
		return;
	}

	// LOAD
	if ( AmCharts.Editor.current.section == 'share' && !jQuery(section).data('loaded') ) {
		AmCharts.Editor.log('info','load section share');
		jQuery(section).load(AmCharts.Editor.CONSTANT.URL_BASE + 'static/tpl/section-share.tpl?' + AmCharts.Editor.CONSTANT.RND_KEY,function() {
			jQuery(section).data('loaded',true);
			AmCharts.Editor.updateSection('share');
			AmCharts.Editor.getUser();
		});

	// PROCESS
	} else {
		AmCharts.Editor.log('info','process section share');

		/*
		** DRAW FUNCTION
		*/
		var timer = 0;
	    AmCharts.Editor.drawCSS = function(trigger) {
			var cloneCSS	= jQuery.extend({},AmCharts.Editor.current.css);
			var rgb			= cloneCSS['backgroundRGBA'];
			var alpha		= cloneCSS['backgroundAlpha'] / 100;

			// RESET
			jQuery('.am-share-chart div + div').css({height: ''});

	    	// ADAPTIONS BEFORE APPLYING
	    	cloneCSS['width'] += '%';
	    	cloneCSS['height'] += '%';
	    	cloneCSS['backgroundColor'] = 'rgba('+rgb.r+','+rgb.g+','+rgb.b+','+alpha+')';

	    	if ( trigger == 'init' || trigger == 'backgroundImageShow' ) {
				jQuery('.app-section-share').css({
					backgroundImage: cloneCSS['backgroundImageShow']?'url('+cloneCSS['backgroundImage']+')':''
				});
			}
			
			jQuery('.am-share-modal .modal-content').css(cloneCSS);
	    	jQuery('.am-share-modal .modal-content')[AmCharts.Editor.current.css['boxShadow']?'removeClass':'addClass']('less-shadow');

			if ( trigger != 'spectrum' ) {
				jQuery('.app-section-share .ui-control-color input').spectrum('set',AmCharts.Editor.current.css.backgroundColor.toUpperCase());
			}

			// ONLY FOR EDITOR; SAVE CSS
			if ( AmCharts.Editor.current.section == 'share' ) {
				// INIT CHART
				if ( trigger == 'init' ) {
					AmCharts.Editor.init(AmCharts.Editor.current.cfg);

				// DRAW
				} else if ( AmCharts.Editor.chart.invalidateSize ) {
					AmCharts.Editor.chart.invalidateSize();
					clearTimeout(timer);
					if ( trigger != 'dontsave' ) {
						timer = setTimeout(function() {
							AmCharts.Editor.saveCSS();
						},1000);
					}
				}
			}
	    }

	    /*
	    ** CUSTOMIZER
	    */
	    if ( AmCharts.Editor.current.section == 'share' ) {
			// THEMES
			jQuery('.am-editor-themes li a').off().on('click',function(e) {
				e.preventDefault();
				var theme = jQuery(this).parent().data('theme');

				jQuery('.am-editor-themes li').each(function() {
					jQuery(this)[theme == jQuery(this).data('theme')?'addClass':'removeClass']('active');
				});

				AmCharts.Editor.applyTheme(theme);
				AmCharts.Editor.current.css.backgroundColor	= AmCharts.Editor.chart.backgroundColor;
				AmCharts.Editor.current.css.backgroundRGBA	= AmCharts.Editor.hexToRgb(AmCharts.Editor.current.css.backgroundColor);

				// DRAW / SAVE CSS
				if ( AmCharts.Editor.current.section == 'share' ) {
					AmCharts.Editor.drawCSS();
				}
			}).tooltip({
				title: function() {
					return AmCharts.Editor.getMSG('tooltip_set_theme').replace('[[theme]]',jQuery(this).parent().data('theme'));
				}
			});

    		// SLIDER
		    jQuery('.app-section-share ' + ' .ui-control-slider').each(function() {
				var propertyName	= jQuery(this).data('prop');
				var propertyConfig	= {
					min: 0,
					max: 100,
					val: AmCharts.Editor.current.css[propertyName]
				};

				if ( propertyName == 'width' || propertyName == 'height' ) {
					propertyConfig.min = 20;
				}

		        jQuery(this).find('div').slider({
					min		: propertyConfig.min,
					max		: propertyConfig.max,
					value	: propertyConfig.val,
					step	: (propertyConfig.max - propertyConfig.min) / 100,
					slide	: function( event, ui) {
						AmCharts.Editor.current.css[propertyName] = ui.value;
						AmCharts.Editor.drawCSS();
					}
		        });
		    });

		    // COLOR
			jQuery('.app-section-share .ui-control-color').each(function() {
				jQuery(this).find('input').val(AmCharts.Editor.current.css.backgroundColor).spectrum({
					allowEmpty      : false,
					showPalette     : true,
					showButtons     : false,
					preferredFormat : 'hex',
					localStorageKey : 'ameditor.colors',
					move            : function( color ) {
            			this.value = color.toHexString().toUpperCase();
						AmCharts.Editor.current.css['backgroundColor'] = this.value;
						AmCharts.Editor.current.css['backgroundRGBA'] = color.toRgb();
						AmCharts.Editor.drawCSS('spectrum');
					}
				}).on('blur',function() {
					AmCharts.Editor.current.css['backgroundColor'] = this.value.toUpperCase();
					AmCharts.Editor.current.css['backgroundRGBA'] = AmCharts.Editor.hexToRgb(this.value);
					AmCharts.Editor.drawCSS();
				});
			});

			// GET IMAGES
			var offset = 0;
			var amount = 30;
			function getImages(o,a) {
				jQuery.ajax({
					dataType	: 'json',
					url			: AmCharts.Editor.CONSTANT.URL_BASE + 'images/',
					data		: {
						o	: o,
						a	: a,
					},
					complete: function(transport) {
						var response	= transport.responseJSON || { error: true };
						var bgList		= jQuery('.menu-item-background ul');
						var path		= AmCharts.Editor.CONSTANT.URL_CDN;

						if ( !response.error ) {
							path += response.path;
							jQuery(response.photos).each(function(id) {
								var tmpItem			= jQuery('<li></li>').appendTo(bgList);
								var tmpLink			= jQuery('<a></a>').appendTo(tmpItem);
								var tmpThumbnail	= path + 'tn/' + this;
								var tmpBackground	= path + 'bg/' + this;

								tmpLink.data('src',tmpBackground).css({
									backgroundImage: 'url(' + tmpThumbnail + ')'
								}).on('click',function(e) {
									var that = this;
									e.preventDefault();

									// PRELOAD
									if ( AmCharts.Editor.current.css.backgroundImageShow ) {
										AmCharts.Editor.current.css.backgroundImage = jQuery(this).data("src");
										jQuery(that).addClass('loading');
										jQuery('<img>').attr('src',AmCharts.Editor.current.css.backgroundImage).on('load',function() {
											jQuery(that).removeClass('loading');
											jQuery('.app-section-share').css({
												backgroundImage: 'url('+AmCharts.Editor.current.css.backgroundImage+')'
											});
										});
										AmCharts.Editor.saveCSS();
									}
								}).addClass('loading').css({
									backgroundColor: '#EFEFEF'
								});

								// PRELOAD THUMBNAIL
								jQuery('<img>').attr('src',tmpThumbnail).on('load',function() {
									jQuery(tmpLink).removeClass('loading').css({
										backgroundColor: ''
									});
								});
							});
							
							// INCREASE
							offset += amount;

							// MESSAGE
							if ( !response.photos.length || response.photos.length < amount ) {
								var tmpItem = jQuery('<li>').appendTo(bgList.parents('ul.menu-group-items'));
								jQuery('<div>').addClass('alert alert-info').text(AmCharts.Editor.getMSG('message_share_images_limit')).appendTo(tmpItem);

							// OBSERVE SCROLL
							} else {
								jQuery('.menu-group-customize > div').off().on('scroll',function() {
									var height		= jQuery('.navbar-share-customize').off().height();
									var scrollTop	= jQuery(this).scrollTop();

									if ( height - jQuery(window).height() <= scrollTop  ) {
										jQuery('.menu-group-customize > div').off();
										getImages(offset,amount);
									}
								});
							}
						}

						// ASSIGN RANDOM IMAGE
						if ( !AmCharts.Editor.current.css['backgroundImage'] ) {
							jQuery(jQuery('.menu-item-background ul li a')[Math.floor(Math.random() * (amount - 0 + 1))]).trigger('click');
						}
					}
				});
			}
			getImages(offset,amount);

			// OBSERVE BOX SHADOW
		    jQuery('.app-section-share .menu-item-boolean')[AmCharts.Editor.current.css.boxShadow?'addClass':'removeClass']('selected');
		    jQuery('.app-section-share .menu-item-boolean .menu-item-check').on('click',function() {
		    	AmCharts.Editor.current.css['boxShadow'] = jQuery('.app-section-share .menu-item-boolean .menu-item-check').parents('.menu-item').toggleClass('selected').is('.selected');
		    	AmCharts.Editor.drawCSS('boxShadow');
		    });

			// OBSERVE BG IMAGE
		    jQuery('.app-section-share .menu-item-background')[AmCharts.Editor.current.css.backgroundImageShow?'addClass':'removeClass']('selected');
		    jQuery('.app-section-share .menu-item-background .menu-item-check').on('click',function() {
		    	AmCharts.Editor.current.css['backgroundImageShow'] = jQuery(this).parents('.menu-item').toggleClass('selected').is('.selected');
		    	AmCharts.Editor.drawCSS('backgroundImageShow');
		    });

			/* NEW */
			jQuery('.app-section-share .am-menu-new a').off().on('click',function(e) {
				e.preventDefault();
				jQuery.router.go('/new/');
			});
			/* EDIT */
			jQuery('.app-section-share .am-menu-edit a').off().on('click',function(e) {
				e.preventDefault();
				jQuery.router.go('/' + AmCharts.Editor.current.chart.chart_id + '/edit/');
			});
			/* LOGIN */
			jQuery('.app-section-share .am-menu-user, .app-section-share .am-menu-signin').off().on('show.bs.dropdown hide.bs.dropdown',function(e) {
				if ( e.type == 'show' ) {
					jQuery(document.body).addClass('modal-open');
					jQuery('<div class="modal-backdrop modal-backdrop-login fade"></div>').appendTo(document.body).one(jQuery.support.transition.end, function() {
						jQuery(this).addClass('in');
					}).emulateTransitionEnd(0);

					if ( !jQuery('.app-section-share .navbar-signin .dropdown-menu iframe').data('loaded') ) {
						jQuery('.app-section-share .navbar-signin .dropdown-menu iframe').attr('src',AmCharts.Editor.CONSTANT.URL_AMCHARTS + 'sign-in/editor/?redirect_to=' + location.protocol + AmCharts.Editor.CONSTANT.URL_BASE + 'auth/done/?' + AmCharts.Editor.CONSTANT.RND_KEY).data('loaded',true);
					}
				} else {
					jQuery(document.body).removeClass('modal-open');
					jQuery('.modal-backdrop-login').removeClass('in').one(jQuery.support.transition.end, function() {
						jQuery(this).remove();
					}).emulateTransitionEnd(300);
				}
			});
		}

		// CLIPBOARD
		jQuery('.app-section-share .copyCat').each(function() {

			// CLIPBOARD; THROWS AN ERROR BUT IT WORKS
			new ZeroClipboard(this).off().on('mouseover mouseout',function(e) {
				jQuery(e.target).attr('aria-label',AmCharts.Editor.getMSG('tooltip_clipboard_copy'))[e.type=='mouseover'?'addClass':'removeClass']('cssTooltip');
			}).on('copy',function(e) {
				jQuery(e.target).attr('aria-label',AmCharts.Editor.getMSG('tooltip_clipboard_copied'));
			});
		});

	    /*
	    ** SHARE
	    */
	    jQuery('.app-section-share .app-menu, .global-zeroclipboard-container').off().on('click',function(e) {
			e.stopPropagation();
	    });
		jQuery('.app-section-share .app-menu > ul > li > a').off().on('click',function(e) {
			var that = this;
			e.preventDefault();
			e.stopPropagation();

			if ( jQuery(this).parent().hasClass('menu-group-publish') ) {
				ga('send', {
					'hitType'		: 'event',
					'eventCategory'	: 'Buttons',
					'eventAction'	: 'Click',
					'eventLabel'	: 'Share and Publish',
				});
			}

			jQuery('.app-section-share .app-menu > ul > li > a').each(function(id,tab) {
				if ( that != tab ) {
					jQuery(this).parent().removeClass('active');
				} else {
					jQuery(this).parent().toggleClass('active');
				}
			});
			jQuery('.app-section-share .app-menu')[jQuery('.app-section-share .app-menu > ul > li.active').length?'addClass':'removeClass']('active');

			stWidget.buttonClicked = jQuery(this).parent().hasClass('active');
		});

		// SEND MAIL
		jQuery('.btn-send-email').off().on('click',function(e) {
			jQuery('.app-section-share fieldset').attr('disabled',true);
			jQuery.ajax({
				url: '/view.php',
				data: {
					chart_id: AmCharts.Editor.current.chart.chart_id,
					email: jQuery('#am-share-email').val()
				},
				complete: function(transport) {
					jQuery('.app-section-share fieldset').attr('disabled',false);
				}
			});
		});

		// FULFILL INPUTS
		var url = (location.protocol?location.protocol:'http:') + AmCharts.Editor.CONSTANT.URL_BASE + AmCharts.Editor.current.chart.chart_id + '/';
	    jQuery('.am-share-link').val(url);
	    jQuery('.am-share-embed').val('<iframe width=\"600\" height=\"400\" src=\"'+ url + 'embed/\" frameborder=\"0\"></iframe>');

	    // DRAW CFG
	    AmCharts.Editor.drawCSS('init');
	}

	// SHARE ASYNC
	var script = jQuery('<script>').attr({
		type: 'text/javascript',
		src: 'http://w.sharethis.com/button/buttons.js'
	}).appendTo(document.body).on('load',function() {
		stLight.options({
			publisher: "728b61c1-7024-4fbf-93bb-64905f2e11ad",
			shorten: false,
			doNotHash: true
		});
	});
});

// UPDATE ON DOC CLICK
jQuery(document).on('click',function() {
	jQuery('.app-section-share .app-menu, .app-section-share .menu-group').removeClass('active');
});

// OBSERVE USER BADGE CHANGE
jQuery(window).on('changed.am.user.badge',function() {
	if ( AmCharts.Editor.current.section == 'share' ) {
		//
	}
});