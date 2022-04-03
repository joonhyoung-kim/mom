<i class="am am-remove" data-dismiss="modal"></i>
<div class="modal-body modal-body-templates less-padding">
	<div class="app-menu app-menu-dark">
		<ul class="nav nav-stacked"></ul>
	</div>
	<div class="tab-content" ></div>
</div>

<script type="text/javascript">


  (function() {
  var containerTabs = jQuery(AmCharts.Editor.SELECTORS.modal + ' .nav');
  var containerHTML = jQuery(AmCharts.Editor.SELECTORS.modal + ' .tab-content');

  // APPLY WIDTH
  jQuery(AmCharts.Editor.SELECTORS.modalContent).removeClass(AmCharts.Editor.SELECTORS.modalClasses);
  jQuery(AmCharts.Editor.SELECTORS.modalContent).addClass('modal-lg');

  // STICKY MENU
  jQuery(AmCharts.Editor.SELECTORS.modal + ' .modal-body').off().on('scroll',function() {
  jQuery(AmCharts.Editor.SELECTORS.modal + ' .app-menu').css({
  top: this.scrollTop
  });
  });

  // GET USER DATA

  // WALK THROUGH TEMPLATES

          })(jQuery);

          //console.error("url");
          //AmCharts.Editor.current.tpl ={"name":"clustered","srcs":["http://cdn.amcharts.com/lib/3/serial.js"],"img":"/static/samples/column/clustered.png","tpl":"'/TU_Platform/Content/PopUp/AUIGridWidget/static/samples/column/clustered.js","group":{"name":"Column","img":"/static/img/landing/col.png"},"loaded":false};

          var options;
          AmCharts.Editor.modal('hide');
         // console.log('jquery route execute !!!');
          jQuery.router.go('/TU_Platform/Content/PopUp/AUIGridWidget/edit/');
        </script>