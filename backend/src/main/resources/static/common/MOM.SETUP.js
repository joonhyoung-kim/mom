
var momSetup= {
 init: function() {
               // auiGrid 
		/*	  $('head').prepend('<link href="/mom/content/AUIGrid/AUIGrid_style.css" rel="stylesheet" type="text/css">');
			  $('head').prepend('<link href="/mom/content/css/auigridEditor.css" rel="stylesheet">');
			  $('head').prepend('<script src="/mom/content/AUIGrid/AUIGridLicense.js"></script>');
			  $('head').prepend('<script src="/mom/content/AUIGrid/AUIGrid.js"></script>');*/
			  //common css
			/*  $('head').prepend('<link rel="stylesheet" type="text/css" href="/mom/content/css/site.css">'); 
              $('head').prepend('<link rel="stylesheet" type="text/css" href="/mom/common/MOM.css">');*/
             
           
 			  //jquery js
		/*	  $('head').prepend('<script src="/webjars/jquery/3.6.1/dist/jquery.min.js"></script>');
			  $('head').prepend('<script src="/webjars/jquery/3.6.1/dist/jquery.js"></script>');
			  $('head').prepend('<script src="/mom/content/jquery-ui/jquery-ui.min.js"></script>');		*/			
			  //material icon css
			  //spiner
			  $('head').prepend('<script src="https://cdnjs.cloudflare.com/ajax/libs/spin.js/2.3.2/spin.js"></script>');
              $('head').prepend('<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/@mdi/font@6.5.95/css/materialdesignicons.min.css">');
			  //sash js
			  $('head').append('<script src="/mom/content/css/sash-bootstrap5/HTML/sash/assets/js/custom.js"></script>');
			  $('head').append('<script src="/mom/content/css/sash-bootstrap5/HTML/sash/assets/js/sticky.js"></script>');
			  $('head').append('<script src="/mom/content/css/sash-bootstrap5/HTML/sash/assets/plugins/bootstrap/js/popper.min.js"></script>'); 
			  $('head').append('<script src="/mom/content/css/sash-bootstrap5/HTML/sash/assets/plugins/bootstrap/js/bootstrap.min.js"></script>');
			  $('head').append('<script src="/mom/content/css/sash-bootstrap5/HTML/sash/assets/plugins/fancyuploder/jquery.ui.widget.js"></script>');
			  $('head').append('<script src="/mom/content/css/sash-bootstrap5/HTML/sash/assets/plugins/fancyuploder/jquery.fileupload.js"></script>'); 
			  $('head').append('<script src="/mom/content/css/sash-bootstrap5/HTML/sash/assets/plugins/fancyuploder/jquery.iframe-transport.js"></script>'); 
			  $('head').append('<script src="/mom/content/css/sash-bootstrap5/HTML/sash/assets/plugins/fancyuploder/jquery.fileupload.js"></script>'); 
			  $('head').append('<script src="/mom/content/css/sash-bootstrap5/HTML/sash/assets/plugins/fancyuploder/jquery.fancy-fileupload.js"></script>'); 
			  $('head').append('<script src="/mom/content/css/sash-bootstrap5/HTML/sash/assets/plugins/fancyuploder/fancy-uploader.js"></script>'); 	 
			  // jqwidget js
			  $('head').append('<script src="/mom/content/jqwidgets/jqxcore.js"></script>');
			  $('head').append('<script src="/mom/content/jqwidgets/jqxbuttons.js"></script>');
			  $('head').append('<script src="/mom/content/jqwidgets/jqxscrollbar.js"></script>');
			  $('head').append('<script src="/mom/content/jqwidgets/jqxlistbox.js"></script>');
			  $('head').append('<script src="/mom/content/jqwidgets/jqxcombobox.js"></script>');
			  $('head').append('<script src="/mom/content/jqwidgets/jqxexpander.js"></script>');
			  $('head').append('<script src="/mom/content/jqwidgets/jqxsplitter.js"></script>');
			  $('head').append('<script src="/mom/content/jqwidgets/jqxdata.js"></script>');
			  $('head').append('<script src="/mom/content/jqwidgets/jqxmenu.js"></script>');
			  $('head').append('<script src="/mom/content/jqwidgets/jqxtree.js"></script>');
			  $('head').append('<script src="/mom/content/jqwidgets/jqxpanel.js"></script>');
			  $('head').append('<script src="/mom/content/jqwidgets/jqxnotification.js"></script>');
			  $('head').append('<script  src="/mom/content/jqwidgets/jqxtooltip.js"></script>');
			  $('head').append('<script  src="/mom/content/jqwidgets/globalization/globalize.js"></script>');
			  $('head').append('<script src="/mom/content/jqwidgets/jqxdatetimeinput.js"></script>');
			  $('head').append('<script  src="/mom/content/jqwidgets/jqxcalendar.js"></script>');
			  //custom style css
			  $('head').append('<style type="text/css">.aui-grid-default-header {background: linear-gradient(to bottom, #f8f8f8, #eee) !important;text-align: center;font-weight: bold;font-size: 1.1em;cursor: pointer;color: black;}</style>');
			  $('head').append('<style type="text/css">.my-column-style-edit {background:#c7e8fd;color:black;font-weight:bold;}.aui-grid-edit-column-left{background:#c7e8fd !important;color:black;text-align: left;}.aui-grid-edit-column-center{background:#c7e8fd;color:black;text-align: center;}.aui-grid-edit-column-right {background:#c7e8fd !important;color:black;text-align: right;}.aui-grid-default-column-center{background-color:rgb(250 250 250);text-align: center;font-size: 1em;cursor: default;}.aui-grid-default-column-left {background-color:rgb(250 250 250);text-align: left;font-size: 1em;cursor: default;}.aui-grid-default-column-right {background-color:rgb(250 250 250);text-align: right;font-size: 1em;cursor: default;}.excel-upload-danger{background:#fff62c;font-weight:bold:color:#22741C;}.my-header-style-require {background:#ffcd00 !important;font-weight: bold;color:#000000;position:relative}.my-header-style-default {background:#eee !important;font-weight: bold;color:#000000;position:relative}</style>');
			   //calenDar
              $('head').prepend('<script src="/mom/content/time/moment.js"></script>');
            

			  //sash css
			  $('head').prepend('<link href="/mom/content/css/sash-bootstrap5/HTML/sash/assets/css/style.css" rel="stylesheet">');
			  $('head').prepend('<link href="/mom/content/css/sash-bootstrap5/HTML/sash/assets/css/dark-style.css" rel="stylesheet">');
			  $('head').prepend('<link href="/mom/content/css/sash-bootstrap5/HTML/sash/assets/css/transparent-style.css" rel="stylesheet">');
			  $('head').prepend('<link href="/mom/content/css/sash-bootstrap5/HTML/sash/assets/css/skin-modes.css" rel="stylesheet">');
              $('head').prepend('<link href="/mom/content/css/sash-bootstrap5/HTML/sash/assets/css/icons.css" rel="stylesheet">');
              $('head').prepend('<link id="theme" rel="stylesheet" type="text/css" media="all" href="/mom/content/css/sash-bootstrap5/HTML/sash/assets/colors/color1.css">');
              $('head').prepend('<link href="/mom/content/css/sash-bootstrap5/HTML/sash/assets/switcher/css/switcher.css" rel="stylesheet">');
              $('head').prepend('<link href="/mom/content/css/sash-bootstrap5/HTML/sash/assets/switcher/demo.css" rel="stylesheet">');
              	
			  //bootStrap css
			 /* $('head').prepend('<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
<!-- SPINNER-->
<script src="https://cdnjs.cloudflare.com/ajax/libs/spin.js/2.3.2/spin.js"></script>');*/
			  //favicon ico
		      $('head').prepend('<link rel="shortcut icon" type="image/x-icon" href="/mom/content/css/sash-bootstrap5/HTML/sash/assets/images/brand/favicon.ico">');
			
 }
		
}