var language = undefined;
var locale = sessionStorage.getItem('locale');
var targetTab = undefined;
var totalTabWidth = 0; 
var homeFlag = undefined;
var tabChange = undefined;
var isClickMenu = undefined;

var mCommon= {
	charts:[],
	datasets:{},
	
	init: function() {		

	
	},
	contextPath: function() {
		//return $("html").attr("contextPath");
		return '/mom';
	},

leftMenuAuth: function(el,params) {
		var that = this;
//		$.get($("html").attr("contextPath") + "/mom/request/com.thirautech.mom.admin.micaMenu.dummy", function(menuListData) {
//			
//			var param = {divisionCd : sessionStorage.getItem("divisionCd"), companyCd : sessionStorage.getItem("companyCd"), id : "0000"}
//			
//			$.get($("html").attr("contextPath") + "/mom/request/com.thirautech.mom.admin.micaAuthGroup.dummy", param, function(authList) {
//				var authMenuList = JSON.parse(authList[0].menuList);
				var loginMenuList = JSON.parse(sessionStorage.getItem("loginMenuList"));
				var bookMarkList = JSON.parse(params.bookMarkList);
				var displayOrderList = JSON.parse(params.displayOrder);
				var searchMenuList   = JSON.parse(params.searchMenu);
				var menuList = [];
				var searchCount = 1;
				if(loginMenuList == null || loginMenuList == '' || loginMenuList == undefined) {
					    localStorage.removeItem("token");
					    sessionStorage.removeItem("siteInfo");
					    sessionStorage.removeItem("userInfo");
					    sessionStorage.removeItem("loginMenuList");	
						location.href = mCommon.contextPath() + "/login.html";
						return;
				}
				if(params.menuBarId=='btnMomGo'){
					for(var i = 0, max = loginMenuList.length; i < max; i++) {
						var loginMenu = loginMenuList[i];
						if(params.searchFlag=="Y"){
								 for(var j=0;j<searchMenuList.length;j++){ 
							    		if((loginMenu.menuNm.trim().indexOf(searchMenuList[j]) > -1 && loginMenu.icon == null && loginMenu.url != null) || loginMenu.menuId=="MAIN"){
							    			loginMenu.parentId = "root";
							    			if(loginMenu.menuId== "" || loginMenu.menuId== "MAIN"){
							    				loginMenu.sortNo = 0;
								    			searchCount++;
							    			}
							    			else{
							    				  loginMenu.sortNo = searchCount;
								    			  searchCount++;
							    			}							    			
							    			       menuList.push(loginMenu);
							    		}
							     }
							  
						}
						else{
							  
								  menuList.push(loginMenu);
							  
						}						
				    }
				}
				else {
					  for(var i = 0, max = loginMenuList.length; i < max; i++) {
						  var loginMenu = loginMenuList[i];
						      loginMenu.parentId = "root";
						       if(displayOrderList!=undefined && displayOrderList.length>0){
						    	     for(var j=0;j<displayOrderList.length;j++){
							    		if(loginMenu.id == displayOrderList[j].menuId){
							    			loginMenu.sortNo = displayOrderList[j].displayOrder;
							    		}
							    	}
						       }						       
							    menuList.push(loginMenu);						    
				      }										
					
				}
				

				
				// 권한 관리 부분 메뉴 순서
//				if(authMenuList) {
//					menuList.sort(function(a, b) {
//						var aIndex = authMenuList.indexOf(a.id);
//						var bIndex = authMenuList.indexOf(b.id);
//						aIndex = aIndex < 0 ? 999999 : aIndex;
//						bIndex = bIndex < 0 ? 999999 : bIndex;
//						
//						return aIndex - bIndex;
//					});
//				}
				var menuList = mCommon.parentIdHierarchy(menuList, "parentMenuId", "child");

				that.leftMenuHtmlSet2(el, menuList,params.menuBarId);
				if(params.initFlag =="Y"&&params.menuBarId=='btnMomGo'){
					that.leftMenuEventSet();
				}
			
				
//			});
//		});
	},
	leftMenuHtmlSet2: function(el, dataset,eventArea) {
		var leftMenuTopLv1 = '';
		var leftMenuTopLv2 = '';
		var leftMenuTopLv3 = '';
		var leftMenuTop = '<div class="sticky is-expanded" style="margin-bottom: -73.9773px;">'+
		'<div class="app-sidebar__overlay active" data-bs-toggle="sidebar"></div>'+
		  '<div class="app-sidebar  open">'+
			'<div class="side-header">'+
				'<a class="header-brand1" href="index.html"> <img src="/mom/content/css/sash-bootstrap5/HTML/sash/assets/images/brand/logo.png" class="header-brand-img desktop-logo" alt="logo">'+
				  '<img src="/mom/content/css/sash-bootstrap5/HTML/sash/assets/images/brand/logo-1.png" class="header-brand-img toggle-logo" alt="logo">'+
		          '<img src="/mom/content/css/sash-bootstrap5/HTML/sash/assets/images/brand/logo-2.png" class="header-brand-img light-logo" alt="logo">'+
		          '<img src="/mom/content/css/sash-bootstrap5/HTML/sash/assets/images/brand/logo-3.png" class="header-brand-img light-logo1" alt="logo">'+
				 '</a>'+
			'</div>'+
		   '<div class="main-sidemenu is-expanded left-side-menu">'+
			 '<div class="slide-left disabled active is-expanded" id="slide-left">'+
					'<svg xmlns="http://www.w3.org/2000/svg" fill="#7b8191" width="24" height="24" viewBox="0 0 24 24">'+
			         '<path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path>'+
					'</svg>'+
			 '</div>'+
			 '<ul class="side-menu open" style="margin-right: 0px;">'+
			   '<li class="sub-category">'+
			    '<h3>Main</h3>'+
			   '</li>'+
			   '<li class="slide is-expanded">'+
			    '<a class="side-menu__item" data-bs-toggle="slide" href="main.html">'+
			     '<i class="side-menu__icon fe fe-home"></i>'+
			     '<span class="side-menu__label">HOME</span>'+
			    '</a>'+
			   '</li>';
		
		
			   for(var i=0;i<dataset.length;i++){
				    if(dataset[i]['child'] != undefined){
					 leftMenuTopLv1 += '<li class="slide">'+
									     '<a  class="side-menu__item" data-bs-toggle="slide" href="javascript:void(0)">'+
								           '<i class="side-menu__icon '+dataset[i]['icon']+'"></i>'+
									       '<span class="side-menu__label">'+dataset[i]['menuNm']+'</span>'+
									       '<i class="angle fe fe-chevron-right"></i>'+
									     '</a>'+
										'<ul class="slide-menu">'+
										  '<li class="side-menu-label1">'+
							      			'<a href="javascript:void(0)">'+dataset[i]['menuNm']+'</a>'+
								  		  '</li>';
				  		 
					   for(var j=0;j<dataset[i]['child'].length;j++){
						   var item = dataset[i]['child'][j];
						    if(dataset[i]['child'][j]['child']!= undefined){
							
						    }
						    else{
							      leftMenuTopLv1 += '<li>'+
				                                      '<a id='+item['menuId']+' href=#'+item['menuId']+' name="'+item['menuNm']+'" data-path='+item['url']+' class="slide-item">'+item['menuNm']+'</a>'+
				 					                '</li>';	
						}						
										 					  					    
					   }
					   leftMenuTopLv1 += '</ul>';	
					   
					 }
				   else{
						leftMenuTopLv1 +=	'<li>'+
											 '<a class="side-menu__item" href="widgets.html">'+
											  '<i class="side-menu__icon fe fe-grid"></i>'+
											  '<span class="side-menu__label">'+dataset[i]['menuNm']+'</span>'+
											 '</a>'+
											'</li>';
				   }
				   if(i == dataset.length-1){
					   leftMenuTopLv1 += '</ul>';
				     }
				   }
			   leftMenuTopLv2 ='<div class="slide-right" id="slide-right">'+
				                '<svg xmlns="http://www.w3.org/2000/svg" fill="#7b8191" width="24" height="24" viewBox="0 0 24 24"> <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path></svg>'+
			                   '</div>'+
		                  '</div>'+
		                    '<div class="ps__rail-x" style="left: 0px; bottom: 0px;">'+
							  '<div class="ps__thumb-x" tabindex="0" style="left: 0px; width: 0px;"></div>'+
						  '</div>'+
						  '<div class="ps__rail-y" style="top: 0px; right: 0px;">'+
							'<div class="ps__thumb-y" tabindex="0" style="top: 0px; height: 0px;"></div>'+
						  '</div>'+
					    '</div>'+		
				      '</div>'+
				      '<div id = "jump1" class="jumps-prevent" style="padding-top: 74px;"></div>';
				  $('#jump1').after(leftMenuTop+leftMenuTopLv1+leftMenuTopLv2);  
				   
			   },
			  /* '<li class="sub-category"><h3>화면</h3></li>'+*/
				/*	'<li class="slide">'+
			           '<a class="side-menu__item" data-bs-toggle="slide" href="javascript:void(0)">'+
			             '<i class="side-menu__icon fe fe-package"></i>'+
			              '<span class="side-menu__label">Bootstrap</span>'+
			             '<i class="angle fe fe-chevron-right"></i>'+
			           '</a>'+
					    '<ul class="slide-menu">'+
							'<li class="side-menu-label1"><a href="javascript:void(0)">Bootstrap</a></li>'+
							'<li><a href="alerts.html" class="slide-item"> Alerts</a></li>'+
							'<li><a href="buttons.html" class="slide-item"> Buttons</a></li>'+
							'<li><a href="colors.html" class="slide-item"> Colors</a></li>'+
							'<li class="sub-slide">'+
							 '<a class="sub-side-menu__item" data-bs-toggle="sub-slide" href="javascript:void(0)">'+
							   '<span class="sub-side-menu__label">Avatars</span>'+
							    '<i class="sub-angle fe fe-chevron-right"></i>'+
							  '</a>'+
							   '<ul class="sub-slide-menu">'+
									'<li><a href="avatarsquare.html" class="sub-slide-item">  Avatar-Square</a></li>'+
									'<li><a href="avatar-round.html" class="sub-slide-item">  Avatar-Rounded</a></li>'+
									'<li><a href="avatar-radius.html" class="sub-slide-item"> Avatar-Radius</a></li>'+
							   '</ul>'+
							'</li>'+*/
							
			   /*<li class="sub-category">
						<h3>Pre-build Pages</h3>
					</li>
					<li class="slide"><a class="side-menu__item"
						data-bs-toggle="slide" href="javascript:void(0)"><i
							class="side-menu__icon fe fe-layers"></i><span
							class="side-menu__label">Pages</span><i
							class="angle fe fe-chevron-right"></i></a>
						<ul class="slide-menu">
							<li class="side-menu-label1"><a href="javascript:void(0)">Pages</a></li>
							<li><a href="profile.html" class="slide-item">
									Profile</a></li>
							<li><a href="editprofile.html" class="slide-item">
									Edit Profile</a></li>
							<li><a href="notify-list.html" class="slide-item">
									Notifications List</a></li>
							<li><a href="email-compose.html" class="slide-item">
									Mail-Compose</a></li>
							<li><a href="email-inbox.html" class="slide-item">
									Mail-Inbox</a></li>
							<li><a href="email-read.html" class="slide-item">
									Mail-Read</a></li>
							<li><a href="gallery.html" class="slide-item">
									Gallery</a></li>
							<li class="sub-slide"><a class="sub-side-menu__item"
								data-bs-toggle="sub-slide" href="javascript:void(0)"><span
									class="sub-side-menu__label">Forms</span><i
									class="sub-angle fe fe-chevron-right"></i></a>
								<ul class="sub-slide-menu">
									<li><a href="form-elements.html" class="sub-slide-item">
											Form Elements</a></li>
									<li><a href="form-layouts.html" class="sub-slide-item">
											Form Layouts</a></li>
									<li><a href="form-advanced.html" class="sub-slide-item">
											Form Advanced</a></li>
									<li><a href="form-editor.html" class="sub-slide-item">
											Form Editor</a></li>
									<li><a href="form-wizard.html" class="sub-slide-item">
											Form Wizard</a></li>
									<li><a href="form-validation.html"
										class="sub-slide-item"> Form Validation</a></li>
								</ul></li>
							<li class="sub-slide"><a class="sub-side-menu__item"
								data-bs-toggle="sub-slide" href="javascript:void(0)"><span
									class="sub-side-menu__label">Tables</span><i
									class="sub-angle fe fe-chevron-right"></i></a>
								<ul class="sub-slide-menu">
									<li><a href="tables.html" class="sub-slide-item">Default
											table</a></li>
									<li><a href="datatable.html" class="sub-slide-item">
											Data Tables</a></li>
									<li><a href="edit-table.html" class="sub-slide-item">
											Edit Tables</a></li>
								</ul></li>
							<li class="sub-slide"><a class="sub-side-menu__item"
								data-bs-toggle="sub-slide" href="javascript:void(0)"><span
									class="sub-side-menu__label">Extension</span><i
									class="sub-angle fe fe-chevron-right"></i></a>
								<ul class="sub-slide-menu">
									<li><a href="about.html" class="sub-slide-item">
											About Company</a></li>
									<li><a href="services.html" class="sub-slide-item">
											Services</a></li>
									<li><a href="faq.html" class="sub-slide-item"> FAQS</a></li>
									<li><a href="terms.html" class="sub-slide-item">
											Terms</a></li>
									<li><a href="invoice.html" class="sub-slide-item">
											Invoice</a></li>
									<li><a href="pricing.html" class="sub-slide-item">
											Pricing Tables</a></li>
									<li><a href="settings.html" class="sub-slide-item">
											Settings</a></li>
									<li><a href="blog.html" class="sub-slide-item">
											Blog</a></li>
									<li><a href="blog-details.html" class="sub-slide-item">
											Blog Details</a></li>
									<li><a href="blog-post.html" class="sub-slide-item">
											Blog Post</a></li>
									<li><a href="empty.html" class="sub-slide-item">
											Empty Page</a></li>
									<li><a href="construction.html" class="sub-slide-item">
											Under Construction</a></li>
								</ul></li>
							<li class="sub-slide"><a class="sub-side-menu__item"
								data-bs-toggle="sub-slide" href="javascript:void(0)"><span
									class="sub-side-menu__label">Switcher</span><i
									class="sub-angle fe fe-chevron-right"></i></a>
								<ul class="sub-slide-menu">
									<li><a class="sub-slide-item" href="switcher-1.html">Switcher
											Style 1</a></li>
									<li><a class="sub-slide-item" href="switcher-2.html">Switcher
											Style 2</a></li>
								</ul></li>
						</ul></li>
					<li class="slide"><a class="side-menu__item"
						data-bs-toggle="slide" href="javascript:void(0)"><i
							class="side-menu__icon fe fe-shopping-bag"></i><span
							class="side-menu__label">E-Commerce</span><i
							class="angle fe fe-chevron-right"></i></a>
						<ul class="slide-menu">
							<li class="side-menu-label1"><a href="javascript:void(0)">E-Commerce</a></li>
							<li><a href="shop.html" class="slide-item"> Shop</a></li>
							<li><a href="shop-description.html" class="slide-item">
									Product Details</a></li>
							<li><a href="cart.html" class="slide-item"> Shopping
									Cart</a></li>
							<li><a href="add-product.html" class="slide-item">
									Add Product</a></li>
							<li><a href="wishlist.html" class="slide-item">
									Wishlist</a></li>
							<li><a href="checkout.html" class="slide-item">
									Checkout</a></li>
						</ul></li>
					<li class="slide"><a class="side-menu__item"
						data-bs-toggle="slide" href="javascript:void(0)"><i
							class="side-menu__icon fe fe-folder"></i><span
							class="side-menu__label">File Manager</span><span
							class="badge bg-pink side-badge">4</span><i
							class="angle fe fe-chevron-right hor-angle"></i></a>
						<ul class="slide-menu">
							<li class="side-menu-label1"><a href="javascript:void(0)">File
									Manager</a></li>
							<li><a href="file-manager.html" class="slide-item">
									File Manager</a></li>
							<li><a href="filemanager-list.html" class="slide-item">
									File Manager List</a></li>
							<li><a href="filemanager-details.html" class="slide-item">
									File Details</a></li>
							<li><a href="file-attachments.html" class="slide-item">
									File Attachments</a></li>
						</ul></li>
					<li class="sub-category">
						<h3>Misc Pages</h3>
					</li>
					<li class="slide"><a class="side-menu__item"
						data-bs-toggle="slide" href="javascript:void(0)"><i
							class="side-menu__icon fe fe-users"></i><span
							class="side-menu__label">Authentication</span><i
							class="angle fe fe-chevron-right"></i></a>
						<ul class="slide-menu">
							<li class="side-menu-label1"><a href="javascript:void(0)">Authentication</a></li>
							<li><a href="login.html" class="slide-item"> Login</a></li>
							<li><a href="register.html" class="slide-item">
									Register</a></li>
							<li><a href="forgot-password.html" class="slide-item">
									Forgot Password</a></li>
							<li><a href="lockscreen.html" class="slide-item">
									Lock screen</a></li>
							<li class="sub-slide"><a class="sub-side-menu__item"
								data-bs-toggle="sub-slide" href="javascript:void(0)"><span
									class="sub-side-menu__label">Error Pages</span><i
									class="sub-angle fe fe-chevron-right"></i></a>
								<ul class="sub-slide-menu">
									<li><a href="400.html" class="sub-slide-item"> 400</a></li>
									<li><a href="401.html" class="sub-slide-item"> 401</a></li>
									<li><a href="403.html" class="sub-slide-item"> 403</a></li>
									<li><a href="404.html" class="sub-slide-item"> 404</a></li>
									<li><a href="500.html" class="sub-slide-item"> 500</a></li>
									<li><a href="503.html" class="sub-slide-item"> 503</a></li>
								</ul></li>
						</ul></li>
					<li class="slide"><a class="side-menu__item"
						data-bs-toggle="slide" href="javascript:void(0)"> <i
							class="side-menu__icon fe fe-cpu"></i> <span
							class="side-menu__label">Submenu items</span><i
							class="angle fe fe-chevron-right"></i></a>
						<ul class="slide-menu">
							<li class="side-menu-label1"><a href="javascript:void(0)">Submenu
									items</a></li>
							<li><a href="javascript:void(0)" class="slide-item">Submenu-1</a></li>
							<li class="sub-slide"><a class="sub-side-menu__item"
								data-bs-toggle="sub-slide" href="javascript:void(0)"><span
									class="sub-side-menu__label">Submenu-2</span><i
									class="sub-angle fe fe-chevron-right"></i></a>
								<ul class="sub-slide-menu">
									<li><a class="sub-slide-item" href="javascript:void(0)">Submenu-2.1</a></li>
									<li><a class="sub-slide-item" href="javascript:void(0)">Submenu-2.2</a></li>
									<li class="sub-slide2"><a class="sub-side-menu__item2"
										href="javascript:void(0)" data-bs-toggle="sub-slide2"><span
											class="sub-side-menu__label2">Submenu-2.3</span><i
											class="sub-angle2 fe fe-chevron-right"></i></a>
										<ul class="sub-slide-menu2">
											<li><a href="javascript:void(0)"
												class="sub-slide-item2">Submenu-2.3.1</a></li>
											<li><a href="javascript:void(0)"
												class="sub-slide-item2">Submenu-2.3.2</a></li>
											<li><a href="javascript:void(0)"
												class="sub-slide-item2">Submenu-2.3.3</a></li>
										</ul></li>
									<li><a class="sub-slide-item" href="javascript:void(0)">Submenu-2.4</a></li>
									<li><a class="sub-slide-item" href="javascript:void(0)">Submenu-2.5</a></li>
								</ul></li>
						</ul></li>
					<li class="sub-category">
						<h3>General</h3>
					</li>
					<li>
					<a class="side-menu__item" href="widgets.html">
					<i class="side-menu__icon fe fe-grid"></i>
					<span class="side-menu__label">Widgets</span>
					</a>
					</li>
					<li class="slide"><a class="side-menu__item"
						data-bs-toggle="slide" href="javascript:void(0)"><i
							class="side-menu__icon fe fe-map-pin"></i><span
							class="side-menu__label">Maps</span><i
							class="angle fe fe-chevron-right"></i></a>
						<ul class="slide-menu">
							<li class="side-menu-label1"><a href="javascript:void(0)">Maps</a></li>
							<li><a href="maps1.html" class="slide-item">Leaflet
									Maps</a></li>
							<li><a href="maps2.html" class="slide-item">Mapel
									Maps</a></li>
							<li><a href="maps.html" class="slide-item">Vector
									Maps</a></li>
						</ul></li>
					<li class="slide"><a class="side-menu__item"
						data-bs-toggle="slide" href="javascript:void(0)"><i
							class="side-menu__icon fe fe-bar-chart-2"></i><span
							class="side-menu__label">Charts</span><span
							class="badge bg-secondary side-badge">6</span><i
							class="angle fe fe-chevron-right hor-angle"></i></a>
						<ul class="slide-menu">
							<li class="side-menu-label1"><a href="javascript:void(0)">Charts</a></li>
							<li><a href="chart-chartist.html" class="slide-item">Chart
									Js</a></li>
							<li><a href="chart-flot.html" class="slide-item">
									Flot Charts</a></li>
							<li><a href="chart-echart.html" class="slide-item">
									ECharts</a></li>
							<li><a href="chart-morris.html" class="slide-item">
									Morris Charts</a></li>
							<li><a href="chart-nvd3.html" class="slide-item">
									Nvd3 Charts</a></li>
							<li><a href="charts.html" class="slide-item"> C3 Bar
									Charts</a></li>
							<li><a href="chart-line.html" class="slide-item"> C3
									Line Charts</a></li>
							<li><a href="chart-donut.html" class="slide-item"> C3
									Donut Charts</a></li>
							<li><a href="chart-pie.html" class="slide-item"> C3
									Pie charts</a></li>
						</ul></li>*/
				
			/*	'<div class="slide-right" id="slide-right">'+
					'<svg xmlns="http://www.w3.org/2000/svg" fill="#7b8191" width="24" height="24" viewBox="0 0 24 24"> <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path></svg>'+
				'</div>'+
			'</div>'+
			'<div class="ps__rail-x" style="left: 0px; bottom: 0px;">'+
				'<div class="ps__thumb-x" tabindex="0" style="left: 0px; width: 0px;"></div>'+
			'</div>'+
			'<div class="ps__rail-y" style="top: 0px; right: 0px;">'+
				'<div class="ps__thumb-y" tabindex="0" style="top: 0px; height: 0px;"></div>'+
			'</div>'+
		'</div>'+		
	'</div>';*/

	
	leftMenuHtmlSet: function(el, dataset,eventArea) {
		if(eventArea == "btnFomGo"){
			var depth1 = '<li class="depth1-menu nav"style="background:#e9ecef;margin-top: 1px;width: 98%;"> <a style="width:90%;background-color: #e9ecef; color: black; border: #e9ecef;"href="##{id}" data-path="#{htmlPath}" data-param="#{param}" name="#{name}" class="w-inline-block navlink active"><div class="w-icon fa #{icon} icon"></div><div class="textarea"><div class="textblock">#{name}</div></div></a><a class="close-img2"style="left: -3%;top: 14px;"></a><div></div></li>';
		}
		else{
			var depth1 = '<li class="depth1-menu nav"style="margin-top: 1px;width: 98%;"> <a style="background-color: #e9ecef; color: black; border: #e9ecef;"href="##{id}" data-path="#{htmlPath}" data-param="#{param}" name="#{name}" class="w-inline-block navlink active"><div class="w-icon fa #{icon} icon"></div><div class="textarea"><div class="textblock">#{name}</div></div></a> </li>';
		}
		var depth1_parent = '<li class="depth1-menu w210">'+
								'<div class="w-dropdown menu-sam-width dropdownmenu" style="max-width: 100%;">'+
									'<div id="#{id}" class="lv1Menu w-dropdown-toggle menu-sam-width navlink">'+
										'<div class="textblock dptext">#{name}</div>'+
										'<div class="w-icon fa fa-angle-down icon right"></div>'+
										'<div class="w-icon fa #{icon} icon left"></div>'+
									'</div>'+
									'<nav class="lv1MenuList w-dropdown-list header-nav dropdownlist">'+
										'<ul class="depth2 depth1 menusub depth2">'+
										
										'</ul>'+
									'</nav>'+
								'</div>'+
							'</li>';
		var depth1_child = '<li class="navitem">'+
								'<a href="##{id}" data-path="#{htmlPath}" data-param="#{param}" name="#{name}" class="w-inline-block navitemlink"><div class="textblock">#{name}</div></a>'+
							'</li>';
		var depth2_parent = 
			'<li class="w210">'+
				'<div class="w-dropdown menu-sam-width dropdownbox" style="max-width: 100%;">'+
					'<div id="#{id}" class="lv2Menu w-dropdown-toggle menu-sam-width navlink dpmenu" style="padding-top:5px;">'+
						'<div class="textblock top8">#{name}</div>'+
						'<div class="menuicon">'+
							'<div class="line5"></div>'+
							'<div class="line6"></div>'+
						'</div>'+
					'</div>'+
					'<nav class="lv2MenuList w-dropdown-list header-nav dropdownlist">'+
						'<ul class="depth2 depth2 depth1" style="position: relative;">'+
								// 리스트 추가 부분
						'</ul>'+
					'</nav>'+
				'</div>'+
			'</li>';
		
		var depth2_child = 
			'<li class="w210">'+
				'<a href="##{id}" data-path="#{htmlPath}" data-param="#{param}" name="#{name}" class="w-clearfix w-inline-block navitemlink grey">'+
					'<div class="w-clearfix lineicon">'+
						'<div class="line1"></div>'+
						'<div class="line2 first"></div>'+
						'<div class="line2"></div>'+
					'</div>'+
					'<div class="textblock">#{name}</div>'+
				'</a>'+
			'</li>';
		// 1레벨만, 1레벨 하위
		
		var $el = $(el).find("ul.depth1");
		$el.html("");
		for(var i = 0; i < dataset.length; i++) {
			var data = dataset[i];
			if(data.hide) { continue; }
			data.child = data.child || [];
			if(data.child == null || data.child.length < 1) {
				var tmp = depth1.replace(/#{id}/gi, data.menuId);
//				tmp = tmp.replace(/#{url}/gi, data.url + (data.param ? "?" + data.param : ""));
//				tmp = tmp.replace(/#{url}/gi, data.id);
				tmp = tmp.replace(/#{htmlPath}/gi, data.url);
				tmp = tmp.replace(/#{param}/gi, data.param ? "?" + data.param : "");
				tmp = tmp.replace(/#{icon}/gi, data.icon);
				tmp = tmp.replace(/#{name}/gi, data.menuNm);
				$el.append(tmp);
			} else {
				var tmp = depth1_parent.replace(/#{id}/gi, data.menuId);
				tmp = tmp.replace(/#{icon}/gi, data.icon);
				tmp = tmp.replace(/#{name}/gi, data.menuNm);
				var $tmp = $(tmp);
				for(var j = 0; j < data.child.length; j++) {
					var dataChild = data.child[j];
					if(dataChild.hide) { continue; }
					if(dataChild.child == null || dataChild.child.length < 1) {
						var tmp_child = depth1_child.replace(/#{id}/gi, dataChild.menuId);
//						tmp_child = tmp_child.replace(/#{url}/gi, dataChild.url + (dataChild.param ? "?" + dataChild.param : ""));
//						tmp_child = tmp_child.replace(/#{url}/gi, dataChild.id);
						tmp_child = tmp_child.replace(/#{htmlPath}/gi, dataChild.url);
						tmp_child = tmp_child.replace(/#{param}/gi, dataChild.param ? "?" + dataChild.param : "");
						tmp_child = tmp_child.replace(/#{name}/gi, dataChild.menuNm);
						$tmp.find(".depth2.depth1.menusub").append(tmp_child);
					} else {
						var tmp_depth2 = depth2_parent.replace(/#{id}/gi, dataChild.menuId);
						tmp_depth2 = tmp_depth2.replace(/#{name}/gi, dataChild.menuNm);
						var $tmp_depth2 = $(tmp_depth2);
						for(var k = 0; k < dataChild.child.length; k++) {
							var dataChild2 = dataChild.child[k];
							if(dataChild2.hide) { continue; }
							var tmp_depth2_child = depth2_child.replace(/#{id}/gi, dataChild2.menuId);
//							tmp_depth2_child = tmp_depth2_child.replace(/#{url}/gi, dataChild2.url + (dataChild2.param ? "?" + dataChild2.param : ""));
//							tmp_depth2_child = tmp_depth2_child.replace(/#{url}/gi, dataChild2.id);
							tmp_depth2_child = tmp_depth2_child.replace(/#{htmlPath}/gi, dataChild2.url);
							tmp_depth2_child = tmp_depth2_child.replace(/#{param}/gi, dataChild2.param ? "?" + dataChild2.param : "");
							tmp_depth2_child = tmp_depth2_child.replace(/#{name}/gi, dataChild2.menuNm);
							$tmp_depth2.find(".dropdownbox .depth2.depth1").append(tmp_depth2_child);
						}
						$tmp.find(".depth2.depth1.menusub").append($tmp_depth2);
					}
				}
				$el.append($tmp);
			}
		}
	},

	leftMenuEventSet: function() {
		$("a.navlink, a.navitemlink").removeClass("active");

		// 좌측 1레벨 버튼
		$(document).on("click", ".lv1Menu", function(e) {
			//e.stopPropagation();
			
			if($(this).next().is(":visible")) {
				$(".is-show").removeClass("is-show");
				$(".active").removeClass("active");
				$(this).find(".fa-angle-up").removeClass("fa-angle-up").addClass("fa-angle-down");
			} else {
				$(".is-show").removeClass("is-show");
				$(".active").removeClass("active");
				$(".fa-angle-up").removeClass("fa-angle-up").addClass("fa-angle-down");
				
				$(this).find(".fa-angle-down").removeClass("fa-angle-down").addClass("fa-angle-up");
				$(this).parent().find(".lv1MenuList").addClass("is-show");
				$(this).addClass("active");
				$(".line6").show();
			}
			

			
		});
		
		// 좌측 2레벨 버튼
		$(document).on("click", ".lv2Menu", function() {

			if($(this).next().is(":visible")) {
				$(".lv2MenuList.is-show").removeClass("is-show");
				$(".line6").show();
			} else {
				$(".lv2MenuList.is-show").removeClass("is-show");
				$(".line6").show();
				$(this).parent().find(".lv2MenuList").addClass("is-show");
				$(this).find(".line6").hide();
			}
			
		});
		// 텝선택
		$(document).on("click", ".main-header-tab-item", function(e) {
			var menuId    = $('#'+e.target.id).attr("href").slice(1);
			var dataParam = $('#'+e.target.id).attr("data-param");
			var url       = $('#'+e.target.id).attr("data-path");
			
			   $('.tabpane').hide();
			   $(".main-tab").removeClass('active'); 
			   $('#'+e.target.id).addClass('active');
			   window.location.hash = '#'+ menuId;
			   $("#"+menuId).attr('src',url+".html?" + dataParam); 
			   $('#tabContentID_'+menuId).show();
			/* if($('#'+e.target.id).hasClass("active") === true){		 
				 
			 }
			 else{
				   $('.tabpane').hide();
				   $(".main-tab").removeClass('active'); 
				   $('#'+e.target.id).addClass('active');
				   window.location.hash = '#'+ menuId;
				   $("#"+menuId).attr('src',url+".html?" + dataParam); 
				   $('#tabContentID_'+menuId).show();
				   
			      //$('#'+e.target.id.split('_')[1])[0].click();
			 }*/
						 
		});
/*		// 해쉬태그 이동(탭이동)
		$(window).bind('hashchange', function (e) {
			var topMenuTab = $("#tabgroup").children();
			var hash = window.location.hash.slice(1);//새탭에서 새로운 메뉴 클릭시 현재url 
			if (hash == undefined || hash == ""){
				window.location.hash = "MAIN";
			}
			if(tabChange=="Y" && isClickMenu=="N"){
				hash = sessionStorage.getItem("preLocation"); 						
				tabChange = "N";				
			}
			else if($("#btnTabReset").hasClass("active")){
				        hash = "MAIN";
				       $("#btnTabReset").removeClass('active');         	
			}
			else if($("#notiConfirmBtn").hasClass("disabled")){
				         hash = sessionStorage.getItem("preLocation"); 
				         $("#notiConfirmBtn").removeClass('disabled');  
		    }
			else{
				       hash = window.location.hash.slice(1);
			}
				  
					    
//			hash = hash.replace(/\//gi, "___");
			
		    $(".footernav").html("");
		    if(hash != "undefined"){
			    var lev1 = $(".w-nav a[href='#"+hash+"']").closest(".w-dropdown").find(".w-dropdown-toggle .textblock").text();
			    var lev2 = $(".w-nav a[href='#"+hash+"']").find(".textblock").text();
			    $(".footernav").append('<a href="#" class="w-inline-block btnnav"><div class="textblock">' + lev1 + '</div><div class="w-icon fa fa-angle-right icon l3"></div></a>');
			    $(".footernav").append('<a href="#" class="w-inline-block btnnav"><div class="textblock">' + lev2 + '</div><div class="w-icon fa fa-angle-right icon l3"></div></a>');
		    }
		    
		    hash = hash.replace("#", "");
		    $(".tabcontent .tabpane").hide();
		    $(".tabcontent .tabpane").addClass("none");
		    
		    $("[id='tabContentID_" + hash + "']").show();
		    $("[id='tabContentID_" + hash + "']").removeClass("none");
		    
		    $(".w-tab-menu .tablink").removeClass("w--current").removeClass("first");
		    
		    $(".w-tab-menu a[href='#"+hash+"']").addClass("w--current").addClass("first");
		    menuColor();
		    if($("#tabgroup").height() > 30 && $("#tabID_" + hash).position().top > 30) {
		    	for(var i = 0; i < 999; i++ ) {
		    		if($("#tabID_" + hash).position().top < 30) {
		    			break;
		    		}
		    		$("#btnTabLeft")[0].click();
//		    		$("#tabgroup").prepend($("#tabID_" + hash));
//		    		$("#tabgroup").prepend($("#tabID_MAIN"));
		    	}
			}
		    if($("[id='tabContentID_" + hash + "'] iframe").get(0) != undefined){
		    	$($("[id='tabContentID_" + hash + "'] iframe").get(0).contentWindow).resize();
		    }
		    
		});*/
		// 메뉴 선택
		$(document).on("click", ".slide-item", function(e) {
			/*if($('#mainPageContent').children() != undefined){
				$('#mainPageContent').children().remove();	
			}*/
			var menuId   = $(this).attr("href").slice(1);	
			isClickMenu = "Y";
			var tabHead =      '<li class="main-header-tab-item">'+
				                 '<a id="tabID_#{id}" href="##{id}" data-path="#{data-path}" data-param="#{data-param}" class="main-tab active" data-bs-toggle="tab">'+
				                   '<span>'+
				                   '</span>#{name}<i id="closeTabMain" class="fe fe-x me-1"></i></a>'+
							    '</li>';
							
			var tabContent = '<div id="tabContentID_#{id}" data-w-tab="Tab#{id}" class="w-tab-pane w--tab-active tabpane">'
				+'<iframe id ='+menuId+' src="#{url}" style="width:100%; height:100%; border:0px;"></iframe>'
				+'</div>';
			
			var name     = $(this).attr("name");
			var id       = $(this).attr("href").replace("#", "");
			
			var dataParam = $(this).attr("data-param");
			var param = $(this).attr("data-param");
			var realDate = "&n=" + new Date().getTime();
			param = param == "" ? "?id=" + id + realDate : param + "&id=" + id + realDate;

			var href= $(this).attr("data-path");
			
			if($("[id='tabID_" + id + "']").length < 1 ) { //탭없으면 
				$('.tabpane').hide();
				if($("#mainPageTabContent").children()[1]==undefined ){
					targetTab = 'MAIN';
				}
				
				else{
					  targetTab = $("#mainPageTabContent").children()[1].id.replace('tabID_',"");
				}
				
			/*	if(75<=((totalTabWidth+$("[id='tabID_" + targetTab + "']").width())/$("#tabgroup").width())*100){	
					totalTabWidth = totalTabWidth - $("[id='tabID_" + targetTab + "']").width();
					$("[id='tabID_" + targetTab + "'], [id='tabContentID_" + targetTab + "']").remove();				

				}*/
				$('.main-tab').removeClass('active');
				$("#mainPageTabContent").append(tabHead.replace(/#{id}/gi, id).replace(/#{name}/gi, name).replace(/#{data-path}/gi, href).replace(/#{data-param}/gi, dataParam));
				totalTabWidth = totalTabWidth+$("[id='tabID_" + id + "']").width();
/*				console.log("더한화면:"+id);
				console.log("더한 너비:"+$("[id='tabID_" + id + "']").width());
				console.log("더하고 너비:"+totalTabWidth);*/
				//var publishSrc = "";
				//$("iframe").attr('src',publishSrc + href + ".html" + param);
//				if(location.href.indexOf("publish") > -1) {
//					publishSrc =location.href.split("publish")[0] + "publish/";
//				}
				
		
					$("#mainPageContent").append(tabContent.replace(/#{id}/gi, id).replace(/#{url}/gi, href+".html "));
					 if(($('#mainPageTab').width() - $('#mainPageTabContent').width())<20){
						$('#mainPageTabContent').children().first().remove();
					}
					$("[id='tabContentID_" + id + "'] iframe").on("load", function(){
						$($("[id='tabContentID_" + id + "'] iframe")[0].contentDocument).find("body").css("background", "inherit");
						
					});
				
			/*		 $("iframe").attr('src',href+".html?" + dataParam); //경로리로드
*/			}
			else{ //텝있으면
				 if($("[id='tabID_" + id + "']").hasClass("active") === true){
						// $("#btnTabReset").removeClass('active');  
						 //$('#mainPageContent').children().remove();		
					     //$('#tabContentID_'+menuId).show();
						// $("iframe").attr('src',href+".html?" + dataParam); //경로리로드
					 }
					 else{
						 $('.tabpane').hide();
						 $(".main-tab").removeClass('active'); 
						 $("[id='tabID_" + id + "']").addClass('active');
						 window.location.hash = '#'+ menuId;	
						 $("#"+menuId).attr('src',href+".html?" + dataParam); 						 
						 $('#tabContentID_'+menuId).show();
						 //$('#mainPageContent').children().remove();		
						// $("iframe").attr('src',href+".html?" + dataParam); //경로리로드
						

					 }
				
				//$("[id='tabID_" + id + "']").click();
			}
				
		});
	
		// 메뉴 선택
		$(document).on("click", "a.navlink, a.navitemlink", function() {
			isClickMenu = "Y";
			var tabHead = '<a id="tabID_#{id}" href="##{id}" data-path="#{data-path}" data-param="#{data-param}" data-w-tab="Tab 1" class="w-tab-link w-inline-block tablink">'+
				'<div class="textblock">#{name}</div>'+
				'<div class="close-img"></div>'+
			'</a>';
			var tabContent = '<div id="tabContentID_#{id}" data-w-tab="Tab#{id}" class="w-tab-pane w--tab-active tabpane">'
				+'<iframe src="#{url}" style="width:100%; height:100%; border:0px;"></iframe>'
				+'</div>';
			
//			var id = $(this).attr("id");
			var name = $(this).attr("name");
			var id = $(this).attr("href").replace("#", "");
			
			var dataParam = $(this).attr("data-param");
			var param = $(this).attr("data-param");
			var realDate = "&n=" + new Date().getTime();
			param = param == "" ? "?id=" + id + realDate : param + "&id=" + id + realDate;
//			var param = id.split("?");
//			var href = param[0];
			var href= $(this).attr("data-path");
//			param = param[1] ? "?" + param[1] : "";
//			href = href.replace(/\//gi, "___");
			
			if($("[id='tabID_" + id + "']").length < 1 ) {
				if($("#tabgroup").children()[1]==undefined ){
					targetTab = 'MAIN';
				}
				
				else{
					  targetTab = $("#tabgroup").children()[1].id.replace('tabID_',"");
				}
				 
				if(75<=((totalTabWidth+$("[id='tabID_" + targetTab + "']").width())/$("#tabgroup").width())*100){	
					totalTabWidth = totalTabWidth - $("[id='tabID_" + targetTab + "']").width();
					$("[id='tabID_" + targetTab + "'], [id='tabContentID_" + targetTab + "']").remove();				
/*					console.log("지운화면:"+targetTab);
					console.log("지운 너비:"+$("[id='tabID_" + targetTab + "']").width());
					console.log("지우고 너비:"+totalTabWidth);*/
				}
				$("#tabgroup").append(tabHead.replace(/#{id}/gi, id).replace(/#{name}/gi, name).replace(/#{data-path}/gi, href).replace(/#{data-param}/gi, dataParam));
				totalTabWidth = totalTabWidth+$("[id='tabID_" + id + "']").width();
/*				console.log("더한화면:"+id);
				console.log("더한 너비:"+$("[id='tabID_" + id + "']").width());
				console.log("더하고 너비:"+totalTabWidth);*/
				var publishSrc = "";
				//$("iframe").attr('src',publishSrc + href + ".html" + param);
//				if(location.href.indexOf("publish") > -1) {
//					publishSrc =location.href.split("publish")[0] + "publish/";
//				}
				
				$(".tabcontent").append(tabContent.replace(/#{id}/gi, id).replace(/#{url}/gi, publishSrc + href + ".html" + param));
				$("[id='tabContentID_" + id + "'] iframe").on("load", function(){
					$($("[id='tabContentID_" + id + "'] iframe")[0].contentDocument).find("body").css("background", "inherit");
				});
				/*$(".tabcontent").append(tabContent.replace(/#{id}/gi, id));
				window.open(publishSrc + href + ".html" + param);*/
				
			}
		});
		$($(".arrowbutton")[0]).attr("id", "btnTabLeft");
		$($(".arrowbutton")[1]).attr("id", "btnTabRight");
		$(".arrowbutton").on("click", function() {
			if($("#tabgroup").height() < 30) {
				return;
			}
			var id = $(this).attr("id");
			switch(id) {
				case "btnTabLeft":
					$("#tabgroup").append($("a.tablink:not(#tabID_MAIN):first"));
					break;
				case "btnTabRight":
					$("#tabgroup").prepend($("a.tablink:not(#tabID_MAIN):last"));
					$("#tabgroup").prepend($("#tabID_MAIN"));
					break;
			}
		});
		$(".tabsmenu .w-tab-link").remove();
		//$(".tabsmenu").append('<div id="tabgroup"></div>');
		var tabGroup = '<div class="tab-menu-heading">'+
		  '<div class="tabs-menu">'+ 
		   '<ul id ="mainPageTabContent" class="nav panel-tabs panel-info"></ul>'+
		   '</div>'+
		   '</div>';
		$("#mainPageTab").append(tabGroup); 
		//$(".mainPageTab").append('<div id="tabgroup"></div>');		
		$(".tabcontent").html("");

		// 좌측 숨기기
		$(document).on("click", ".navicon-left", function() {
			var toggle = $(this).attr("toggle") || "false";
			if(toggle == "true"){
				$(".contentarea").width("");
				$(".w-nav").show();
				toggle = "false";
				$(".navicon-left .fa-play").addClass("fa-rotate-180");
			} else {
				$(".contentarea").width("calc(100% - 30px)");
				$(".w-nav").hide();
				toggle = "true";
				$(".navicon-left .fa-play").removeClass("fa-rotate-180");
			}
			$(this).attr("toggle", toggle);
		});
		$(".navicon-left .fa-play").addClass("fa-rotate-180");
		// 탭닫기 버튼
		$(document).on("click", "#closeTabMain", function(e){
			e.preventDefault();
			var hash = $(this).closest(".main-tab").attr("href");
			hash = hash.replace("#", "");
			if(!$("[id='tabContentID_" + hash + "']").hasClass("none")) {
//				$(".navlink:first")[0].click();
				if($(this).parent().parent().prev().children()[0] == undefined){
					if($(this).parent().parent().next().children()[0] == undefined){
						
					}
					else{
						  $(this).parent().parent().next().children()[0].click();
					}
					
				}
				else{
					$(this).parent().parent().prev().children()[0].click();
				}
				
			}
			totalTabWidth = totalTabWidth - $("[id='tabID_" + hash + "']").width();
/*			console.log("지운페이지 너비:"+$("[id='tabID_" + hash + "']").width());
			console.log("현재 너비:"+totalTabWidth);*/
			$("[id='tabID_" + hash + "']").parent().remove();
			$("[id='tabContentID_" + hash + "']").remove();
			e.stopPropagation();
			
		});
		// 탭닫기 버튼
		$(document).on("click", ".close-img", function(e){
			e.preventDefault();
			var hash = $(this).closest(".tablink").attr("href");
			hash = hash.replace("#", "");
			if(!$("[id='tabContentID_" + hash + "']").hasClass("none")) {
//				$(".navlink:first")[0].click();
				$(this).parent().prev()[0].click();
			}
			totalTabWidth = totalTabWidth - $("[id='tabID_" + hash + "']").width();
/*			console.log("지운페이지 너비:"+$("[id='tabID_" + hash + "']").width());
			console.log("현재 너비:"+totalTabWidth);*/
			$("[id='tabID_" + hash + "'], [id='tabContentID_" + hash + "']").remove();
			
		});
	/*	// 북마크 삭제 버튼
		$(document).on("click", ".close-img2", function(e){
			e.preventDefault();
			$(this).parent().remove();
			
		
			
		});*/
		// 첫메뉴 열기
		if($(".navlink:first")[0] == null) {
			return;
		}
		$(".navlink:first")[0].click();
		menuColor();
		$(window).trigger("hashchange");
		$(".close-img").remove();
		$(".w-tab-link").prepend('<div class="fa fa-home" style="font-size: 13px; padding-right: 3px;"></div>');
		
		function menuColor() {
			var hash = window.location.hash.slice(1);
//			hash = hash.replace(/\//gi, "___");
			var parentLev1 = $(".w-nav a[href='#"+hash+"']").closest(".w-dropdown");
//			console.log($(".w-nav a[href=#"+hash+"]"));
			var menuATag = $(".w-nav a[href='#"+hash+"']");
			$(".focused").removeClass("focused");
			menuATag.addClass("focused");
//			$(".is-show").removeClass("is-show");
//			$(".active").removeClass("active");
//			menuATag.closest(".depth1-menu").find(".lv1MenuList").addClass("is-show");
//			menuATag.closest(".depth1-menu").find(".lv1Menu").addClass("is-show");
////			$(this).parent().find(".lv1MenuList").addClass("is-show");
////			$(this).addClass("active");
//							
//			$(".lv2MenuList.is-show").removeClass("is-show");
//			$(".line6").show();
//			
//			$(this).parent().find(".lv2MenuList").addClass("is-show");
//			$(this).find(".line6").hide();
			
//			focused 
		}
	},



	gridPopupHtml: {
		modal : function() {
			//var locale = sessionStorage.getItem('locale');
			var html = 
			    '<div id="#{modalId}" class="modal gridPopup">'+
			    '    <div id="panel" class="panel messagebox col2">'+
			    '        <div class="panel-body panel-body">'+
			    '            <div class="panelbody">'+
			    '                <div class="w-clearfix panelheader panel-heading">'+
			    '                    <div tmpTabId="two" data-undefined="fa-edit" class="w-icon fa fa-edit icon r5"></div>'+
			    '                    <div class="textblock">#{modalTitle}</div>'+
			    '                    <a href="#" class="w-inline-block bntpopclose pop-close-Btn"></a>'+
			    '                </div>'+
			    '                <div class="searcharea pop">'+
			    '                    <div class="w-form">'+
			    '                        <form name="form" id="form#{modalId}" class="form-inline" data-name="Form">'+
			    '#{context}'+
			    '                        </form>'+
			    '                    </div>'+
			    '                </div>'+
			    '            </div>'+
			    '            <div class="panelfooter">'+
			    '                <a id="#{modalId}SaveBtn" href="#" class="w-inline-block btnpop pop-save-Btn">'+
			    '                    <div class="textblock">' + (locale == 'KR' ? '저장' : language.getValueFromKorean('저장')) + '</div>'+
			    '                </a>'+
			    '                <a id="#{modalId}CancelBtn" href="#" class="w-inline-block btnpop grey pop-close-Btn">'+
			    '                    <div class="textblock">' + (locale == 'KR' ? '취소' : language.getValueFromKorean('취소')) + '</div>'+
			    '                </a>'+
			    '            </div>'+
			    '        </div>'+
			    '        <div panelFooter="n" class="panel-footer hide" data-panelFooter="n"></div>'+
			    '    </div>'+
			    '</div>';
			return html;
		},
		row: function() {
			var html = 
				'<div class="b5">'+
				'    <div class="w-row">'+
				'        '+
				'    </div>'+
				'</div>';
			return html;
		},
		col1: function() {
			var html = 
				'<ul class="w-list-unstyled">'+
				'   <li>'+
				'       <div>'+
				'           <div id="#{labelId}" class="col1-label labelbox" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">'+
				'               <div class="circle #{circle_require}"></div>'+
				'               <div class="textblock #{textblock_require}" title="#{headerText}">#{headerText}</div>'+
				'           </div>'+
				'       	#{editBox}'+
				'       </div>'+
				'   </li>'+
				'</ul>';
			return html;
		},
		col2: function() {
			var html = 
				'<div class="w-col w-col-6">'+
				'    <div class="w-clearfix listitem">'+
				'	    <div class="w-col w-col-4">'+
				'   	     <div id="#{labelId}" class="labelbox" style="width:100%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">'+
				'	            <div class="circle #{circle_require}"></div>'+
				'	            <div class="textblock #{textblock_require}" title="#{headerText}">#{headerText}</div>'+
				'	        </div>'+
				'       </div>'+
				'	    <div class="w-col w-col-7">'+
				'       	#{editBox}'+
				'       </div>'+
				'    </div>'+
				'</div>';
			return html;
		},
		col3: function() {
			var html =
				'<div class="w-col w-col-4">'+
				'    <div class="w-clearfix listitem">'+
				'	    <div class="w-col w-col-5">'+
				'   	     <div id="#{labelId}" class="labelbox" style="width:100%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">'+
				'	            <div class="circle #{circle_require}"></div>'+
				'	            <div class="textblock #{textblock_require}" title="#{headerText}">#{headerText}</div>'+
				'	        </div>'+
				'       </div>'+
				'	    <div class="w-col w-col-6">'+
				'       	#{editBox}'+
				'       </div>'+
				'    </div>'+
				'</div>'
			return html;
		},
		input: function() {
			var html = '<input style="float:right;" maxlength="256" id="#{id}" input-type="text" type="text" class="w-input fieldbox #{wSize}" autocomplete="off"></input>';
			return html;
		},
		textarea: function() {
			var html = '<textarea style="resize: none;" id="#{id}" type="text" class="w-input textbox w490px"></textarea>';
			return html;
		},
		select: function() {
			var html = '<select style="float:right;" id="#{id}" class="w-select fieldbox #{wSize}"></select>';
			return html;
		},
		calendar: function() {
			var html = '<input style="float:right;" maxlength="256" id="#{id}" input-type="datepicker" date-format="date" class="w-input fieldbox #{wSize}" autocomplete="off"></input>';
			return html;
		}
		
	},

	parentIdHierarchy: function(data, parentKey, childKey, keyId) {
		parentKey = parentKey || "parentMenuId";
		childKey = childKey || "child";
		keyId = keyId || "menuId";
		var result = [];
		var tmp =[];
		var nameSeq = {};
		
		var keyValueObj = this.keyValueSet({key : keyId, data:data});		
		for(var key in keyValueObj) {
			var obj = keyValueObj[key];
		
			var parentId = obj[parentKey];
			var itemLevel = obj["sortNo"];
			
			if(parentId == "root" || itemLevel == '1') {
				result.push(obj);
			}
			else { 
				if(keyValueObj[parentId]) {
					if(keyValueObj[parentId][childKey] == null) {
						keyValueObj[parentId][childKey] = [];
					} 
					keyValueObj[parentId][childKey].push(obj);
					tmp.length = 0;
					tmp.push(keyValueObj[parentId][childKey]);
					tmp[0].sort(function (a, b) {						
						return a.sortNo - b.sortNo
					});
				}
			}
		}
		result.sort(function (a, b) {
			return a.sortNo - b.sortNo
		});
		return result;
	},
	authElement : function() {
		var pageId = this.getSearchParam().id;
		var json = sessionStorage.getItem("authGroupMenuElement");
		if(json == null) {
			return;
		}
		var authGroupMenuElement = JSON.parse(sessionStorage.getItem("authGroupMenuElement"));
		var authElement = authGroupMenuElement[pageId];
		if(authElement == null) {
//			return;
			authElement = {};
		}
		var authElementIds = JSON.parse(authElement.list || "[]");
		
		var displayOrderList = [];
		$.ajax({
			url : mCommon.contextPath() + "/mica/widgets/W201808241655314001002S9JKjGqIsjy/data?menuId=" + pageId,
			type : "GET",
			data : {planId:$("#planId").val()},
			async: false,
			success: function (data) {
				for(var i = 0; i < data.length; i++) {
					if(data[i].useFlag == 'Y') {
						displayOrderList.push(data[i].elementId);	
					} else {
						authElementIds.push(data[i].elementId);
					}
				}
			}
		});
		
		if(authElement.displayOrderList != null){
			displayOrderList = JSON.parse(authElement.displayOrderList);
		}
	
		for(var i = displayOrderList.length - 1; i > -1; i--) {
			var eleId = displayOrderList[i];
			var $ele = $("#" + eleId);
			if($ele.css("float") == "right" || $ele.parent().css("float") == "right"){
				$ele.parent().append($ele);
			} else {
				$ele.parent().prepend($ele);
			}
		}
		for(var i = 0; i < authElementIds.length; i++) {
			var eleId = authElementIds[i];
			$("#" + eleId).hide();
		}
	},
	widgetPopupSetting: function(id) {
		var widget = mCommon.datasets[id];
	    if(typeof new_window != "undefined"){
	    	self.opener = self;
         	new_window.close()
         	new_window = null;
        }
	    window.open("about:blank","widgetEditor").close();
	    var openDialog = function(uri, name, options, closeCallback) {
	    	var win = window.open(uri, name, options);
	    	var interval = window.setInterval(function() {
	    		try {
	    			if (win == null || win.closed) {
	    				window.clearInterval(interval);
	    				closeCallback(win);
	    			}
	    		}
	    		catch (e) {
	    		}
	    	}, 1000);
	    	return win;
	    };
	    var menu = this.keyValueSet({key:"id", data:JSON.parse(sessionStorage.menuList)})[parent.location.hash.replace("#", "")] || {};
	    menu.id;
	    menu.name;
	    new_window = openDialog($("html").attr("contextPath") + "/Content/PopUp/AUIGrid/AUIGrid.html", 'widgetEditor', 'width=1300 height=650 top=200 left=200 resizable=no', function(win) {
	    	location.reload();
	    });
//	    new_window = window.open($("html").attr("contextPath") + "/Content/PopUp/AUIGrid/AUIGrid.html", 'widgetEditor', 'width=1300 height=650 top=200 left=200 resizable=no');
	    var windowParam = {
    		"widgetName" : widget.name,
        	"type" : widget.widgetType,
        	"datasetId" : widget.dataset.name,
        	"widgetId" : widget.id,
        	"description" : widget.description,
        	"options" : widget.setting,
        	"editMode" : "Edit",
        	"gridData" : AUIGrid.getGridData(id),
        	mode : "user",
        	menuId : menu.id,
        	menuName : menu.name,
        	deptCds : this.deptCds
	    }
	    new_window.windowParam = windowParam;
	    
	},
	deptCds : [],
	gridWidgetShow: function(deptCds) {
		var that = this;
		deptCds = deptCds || [];
		this.deptCds = deptCds;
		var empAuthority = sessionStorage.empAuthority || "";
		var simpleWidgetFlag = "";
		
		if(sessionStorage.parameters != null ){
			var parameters = JSON.parse(sessionStorage.parameters);
			simpleWidgetFlag = parameters.simpleWidgetFlag;
		}
		
	/*	if(simpleWidgetFlag == "Y") {
			$(".cardheard").prepend('<a id="gridWidgetSetBtn" href="#" class="gridWidgetSetBtns w-inline-block btntool floatr"><div class="w-icon fa fa-cog icon"></div><div class="textblock"></div></a>');
			$(document).on("click", ".gridWidgetSetBtns", function() {
				if($(this).closest(".card").find(".w-widget-auigrid")) {
					that.widgetPopupSetting($(this).closest(".card, .wcalc320").find(".w-widget-auigrid").attr("id"));
				}
			});
			var btns = $(".gridWidgetSetBtns")
			for(var i = 0; i < btns.length; i++) {
				if($(btns[i]).closest(".card, .wcalc320").find(".w-widget-auigrid").length < 1) {
					$(btns[i]).hide();
				};
			}
		}*/
	},
	sha256Set: function(str) {
		// str 이 64자면 안함.
		if(!this.sha256js) {
			$("head").append('<script src="' + $("html").attr("contextPath") + '/Content/js/sha256.js"></script>');
			this.sha256js = true;
		}
		if(str.length == 64) {
			return str;
		}
		return sha256.hmac("tu", str);
		
	},
	setCookie: function(cName, cValue, cDay){
	    var expire = new Date();
	    expire.setDate(expire.getDate() + cDay);
	    cookies = cName + '=' + escape(cValue) + '; path=/ '; // 한글 깨짐을 막기위해 escape(cValue)를 합니다.
	    if(typeof cDay != 'undefined') cookies += ';expires=' + expire.toGMTString() + ';';
	    document.cookie = cookies;
	},
	// 쿠키 가져오기
	getCookie: function(cName) {
	    cName = cName + '=';
	    var cookieData = document.cookie;
	    var start = cookieData.indexOf(cName);
	    var cValue = '';
	    if(start != -1){
	        start += cName.length;
	        var end = cookieData.indexOf(';', start);
	        if(end == -1)end = cookieData.length;
	        cValue = cookieData.substring(start, end);
	    }
	    return unescape(cValue);
	},
	splitterI: 0,
	splitter: function($el, orientation, size) {
		$el = $($el);
		var splitterI = this.splitterI++;
		// ELEMENT, ORIENTATION, SIZE
		//vertical , horizontal
		var className = $el.attr("class");
		$el.append($('<div id="splitter' + splitterI + '" class="' + className + '"></div>'));
		$el.children().css("background", "inherit");
		$el.children(":eq(1)").css("padding-left", "0px");
		$("#splitter" + splitterI).append($el.children(":eq(0)"));
		$("#splitter" + splitterI).append($el.children(":eq(0)"));
		$("#splitter" + splitterI).jqxSplitter({width: "calc(100% - 2px)", height:"calc(100% - 2px)", orientation: orientation, panels: [{ size: size }]});
		$("#splitter" + splitterI).css("border", "none");
		$(window).resize();
	},
 keyValueSet: function (options) {
        // options : key, data[]
        // [{col1:"1",col2:"2" },{col1:"11", col2:"22"}]
        // key col1
        // {1: {col1:"1", col2:"2"}, 11: {col1:"11", col2:"22"}}
        // toLowerCase : true -> key 무조건 소문자
        // type : obj, array
        // 배열 오브젝트를 키 오브젝트로 바꿔준다.

        var data = options.data;
        var key = options.key;
        var type = options.type || "obj";
        var toLowerCase = options.toLowerCase;

        var result = {};
        $.each(data, function (i, v) {
            if (key) {
                var resultKey = v[key];
                if (toLowerCase) {
                    resultKey = resultKey.toLowerCase();
                }
                if (type == "array") {
                    if (result[resultKey] == null) {
                        result[resultKey] = [];
                    }
                    result[resultKey].push(v);
                } else {
                    result[resultKey] = v;
                }
            } else {
                var resultKey = v;
                if (toLowerCase) {
                    resultKey = resultKey.toLowerCase();
                }
                if (type == "array") {
                    if (result[resultKey] == null) {
                        result[resultKey] = [];
                    }
                    result[resultKey].push(v);
                } else {
                    result[resultKey] = v;
                }
            }
        });
        return result;
    }
}



function mom_ajax(type, url, param, call_back, call_back_param, index_info, your, async,commitYn,actionMode) {	
	var siteInfo = JSON.parse(sessionStorage.getItem('siteInfo'));	
	var userInfo = undefined;
	var jsonString = JSON.stringify(param);
    var excelUpYn = 'N';
    var sessionId = '';
    var interval = undefined;
    var paramSize = param.length;
    if(index_info != undefined && index_info != null && momWidget.pageProperty[index_info]['param'] != undefined){
		 var menuParam = JSON.parse(momWidget.pageProperty[index_info]['param']);
         var keys = Object.keys(menuParam); 
	  
	   
    }

	if(actionMode == undefined || actionMode == ''){
		actionMode = type;
	}
	if(type == 'R'){
		url = mCommon.contextPath() + '/request/com.mom.' + url+'/'+type;
		if(sessionStorage.getItem('userInfo') != undefined && sessionStorage.getItem('userInfo') != null){
			userInfo = JSON.parse(sessionStorage.getItem('userInfo'))[0];
		}
		else{
			userInfo = {userNo:'super'}; 
		}
		type = 'GET';
		if(jsonString.indexOf('[')>=0){
				param[0].divisionCd = siteInfo.divisionCd;
				param[0].companyCd  = siteInfo.companyCd;
				param[0].langCd     = siteInfo.languageCd;
				param[0].p_err_code  = '';
				param[0].p_err_msg   = '';
				param[0].actionMode  = actionMode;
				param  = param[0];
			
			
		}
		else{
			param.divisionCd  = siteInfo.divisionCd;
			param.companyCd   = siteInfo.companyCd;
			param.langCd      = siteInfo.languageCd;
			param.userId      = param.userId == undefined ? userInfo.userNo: param.userId;
			param.actionMode  = actionMode;
			param.p_err_code  = '';
			param.p_err_msg   = '';
		}

	}
	else if(type =='P'){
	    url = mCommon.contextPath() + '/request/com.mom.' + url+'/'+type;
		userInfo = JSON.parse(sessionStorage.getItem('userInfo'))[0];
		type = 'POST';	
		excelUpYn = param[0] == undefined ? 'N':param[0].excelUpYn;
		sessionId = param[0] == undefined ? '':param[0].sessionId;
	
		if(jsonString.indexOf('[')>=0){
					if(param.length==0){
				param.push({divisionCd:siteInfo.divisionCd,companyCd:siteInfo.companyCd,langCd:siteInfo.languageCd,userId:userInfo.userNo,commitYn:commitYn,p_err_code:'',p_err_msg:'',actionMode:actionMode});
			    param = JSON.stringify(param);
		}
				else{
						for(var i = 0;i<param.length;i++){
							param[i].divisionCd  = siteInfo.divisionCd;
							param[i].companyCd   = siteInfo.companyCd;
							param[i].langCd      = siteInfo.languageCd;
							param[i].userId      = userInfo.userNo;
							param[i].commitYn    = commitYn == undefined ? 'Y':commitYn;
							param[i].actionMode  = actionMode;
							param[i].p_err_code  = '';
							param[i].p_err_msg   = '';
							
						}
						    param = JSON.stringify(param);
				}
			
			
		}
		else{
			param.divisionCd  = siteInfo.divisionCd;
			param.companyCd   = siteInfo.companyCd;
			param.langCd      = siteInfo.languageCd;
			param.userId      = param.userId == undefined ? userInfo.userNo: param.userId;
			param.actionMode  = actionMode;
			param.p_err_code  = '';
			param.p_err_msg   = '';
		}
	
			
		/*if(param.userId == '' || param.userId == undefined){
			param.userId = siteInfo.userId;
		}*/
	}
	else if (type == 'C' || type == 'CU' || type=='CP'){
		url = mCommon.contextPath() + '/request/com.mom.' + url+'/'+type;
		userInfo = JSON.parse(sessionStorage.getItem('userInfo'))[0];
		type = 'POST';	
		if(param.length==0){
				excelUpYn = param[0] == undefined ? 'N':param[0].excelUpYn;
		        sessionId = param[0] == undefined ? '':param[0].sessionId;
				param.push({divisionCd:siteInfo.divisionCd,companyCd:siteInfo.companyCd,langCd:siteInfo.languageCd,userId:userInfo.userNo,commitYn:commitYn,p_err_code:'',p_err_msg:'',requestType:requestType});
			    param = JSON.stringify(param);
		}
		else{
			excelUpYn = param[0].excelUpYn == undefined ? 'N':param[0].excelUpYn;
		    sessionId = param[0].sessionId == undefined ? '':param[0].sessionId;
			for(var i = 0;i<param.length;i++){
				param[i].divisionCd  = siteInfo.divisionCd;
				param[i].companyCd   = siteInfo.companyCd;
				param[i].langCd      = siteInfo.languageCd;
				param[i].userId      = userInfo.userNo;
				param[i].commitYn    = commitYn == undefined ? 'Y':commitYn;
				param[i].actionMode = actionMode;
				param[i].p_err_code  = '';
				param[i].p_err_msg   = '';
				if(index_info != undefined && index_info != null && momWidget.pageProperty[index_info]['param'] != undefined){
					   for(var k=0,max=keys.length;k<max;k++){
					   param[i][keys[k]] = menuParam[keys[k]];
				       }
				}

			}
			    param = JSON.stringify(param);
		}
			
		/*if(param.userId == '' || param.userId == undefined){
			param.userId = siteInfo.userId;
		}*/
		
	}
	else if (type == 'U'){
		url = mCommon.contextPath() + '/request/com.mom.' + url+'/'+type;
		userInfo = JSON.parse(sessionStorage.getItem('userInfo'))[0];
		type = 'PUT';
		if(param.length==0){
			param.push({divisionCd:siteInfo.divisionCd,companyCd:siteInfo.companyCd,langCd:siteInfo.languageCd,userId:userInfo.userNo,commitYn:commitYn,p_err_code:'',p_err_msg:''});
		    param = JSON.stringify(param);
	  }else{
			for(var i = 0;i<param.length;i++){
				param[i].divisionCd  = siteInfo.divisionCd;
				param[i].companyCd   = siteInfo.companyCd;
				param[i].langCd      = siteInfo.languageCd;
				param[i].userId      = userInfo.userNo;
				param[i].actionMode  = actionMode;
				param[i].p_err_code  = '';
				param[i].p_err_msg   = '';
					if(index_info != undefined && index_info != null && momWidget.pageProperty[index_info]['param'] != undefined){
					   for(var k=0,max=keys.length;k<max;k++){
					   param[i][keys[k]] = menuParam[keys[k]];
				       }
				}
				
			}
			param = JSON.stringify(param);
	  }
	
		
	}
	else if (type == 'D'){
		//url = mCommon.contextPath() + '/request/com.mom.' + url+'/'+type+'/'+$.param(param[0]);
		url = mCommon.contextPath() + '/request/com.mom.' + url+'/'+type;
		userInfo = JSON.parse(sessionStorage.getItem('userInfo'))[0];
		type = 'DELETE';
		if(param.length==0){
			param.push({divisionCd:siteInfo.divisionCd,companyCd:siteInfo.companyCd,langCd:siteInfo.languageCd,userId:userInfo.userNo,commitYn:commitYn,p_err_code:'',p_err_msg:''});
		    param = JSON.stringify(param);
	  }else{
			for(var i = 0;i<param.length;i++){
				param[i].divisionCd  = siteInfo.divisionCd;
				param[i].companyCd   = siteInfo.companyCd;
				param[i].langCd      = siteInfo.languageCd;
				param[i].userId      = userInfo.userNo;
				param[i].actionMode  = actionMode;
				param[i].p_err_code  = '';
				param[i].p_err_msg   = '';
				if(index_info != undefined && index_info != null && momWidget.pageProperty[index_info]['param'] != undefined){
					   for(var k=0,max=keys.length;k<max;k++){
					   param[i][keys[k]] = menuParam[keys[k]];
				       }
				}
				
			}
			param = JSON.stringify(param);
	  }
	}
	
	else{
		  momWidget.messageBox({type:'warning', width:'400', height: '145', html: 'C,R,U,D 범위에서 가능합니다!'});
		  momWidget.splashHide();	
		  return;		
	}	
	  /* progressbar 정보 */
    var bar = $('.bar');
    var percent = $('.percent');
    var status = $('#status');
    //var sessionId = Math.floor(Math.random() * 10000000000000001);
	//type == 'U'? '' : (type == 'D' ? undefined : param),	
	$.ajax({
		type 		: type,
		url  		: url,
		data 		: param,
		async		: async,
		timeout 	: 30000000,
		dataType 	: type == 'U'? 'text' : (type == 'D' ? 'json' : 'json'),
		contentType : type == 'U'? 'application/json; charset=UTF-8' : (type == 'D' ? 'application/json; charset=UTF-8' : 'application/json; charset=UTF-8'),
		//contentType : type == 'U'? 'application/json; charset=UTF-8' : (type == 'D' ? 'application/x-www-form-urlencoded; charset=UTF-8' : 'application/json; charset=UTF-8'),
	/*	xhr: function() { //XMLHttpRequest 재정의 가능
					var xhr = $.ajaxSettings.xhr();
					xhr.upload.onprogress = function(e) { 
					
					};
					return xhr;
					},*/
		beforeSend: function (xhr) {
	              xhr.setRequestHeader("Authorization","Bearer " + localStorage.getItem('token'));
	            if(excelUpYn =='Y'&&param.length>=1000){
	            	 bar.width('0%');
                     percent.html('0%');
                      console.log("프로그래스최초");
	            	 // progress Modal 열기
	            	   interval = setInterval(function() {
	            			$.ajax({
	            				url:mCommon.contextPath() + '/progressBar',
	            				method: "get",
	            				contentType: 'application/json',
	            				data : {sessionId:sessionId,type:'excelUpload'},
	            				success: function(data){
		                            if(data.percent==0){
			                               console.log("프로그래스0=");
			                               return;
									}
	            					console.log("프로그래스리턴="+data.percent);
	            					var percentComplete = Math.floor((data.percent / paramSize) * 100);
	  	            		            
		                        
		                            var percentVal = percentComplete + '%';
		                            bar.width(percentVal);
		                            percent.html(percentVal+' '+paramSize+'/'+data.percent);
	            				},
	            				error: function(e) {
	            					if(e.responseJSON.status == 401){
	            						that.showVaildationMessage('D','CHECK ID OR PASSWORD!'); 
	            						 momWidget.splashHide();
	            						 return;
	            					}
	            					else{
		                                  bar.width('0%');
		                                  percent.text('0%');  
		                                  console.log("프로그래스에러");
	            						  momWidget.splashHide();
	            						  return;
	            					}
	            					
	            					
	            				}
	            			});	            				            		      
	            		}, 100);	            	   
	

	            }
	             


	    },		 
/*	    complete:function(){
	    	 if(excelUpYn =='Y'){
            // progress Modal 닫기
            $("#pleaseWaitDialog").modal('hide');
            }

        },*/
	
		success     : function(data) {
			clearInterval(interval);
			if(call_back != undefined) {
			/*	if(data['result'] == 'success') {
					call_back('SUCCESS', data, param, call_back_param, index_info, your);
				} else {
					call_back('FAIL', data, param, call_back_param, index_info, your);
				}*/
				call_back('SUCCESS', data, param, call_back_param, index_info, your);
			}
		}, error	: function(error) {
			clearInterval(interval);
			if(call_back != undefined) {
				if(error.getResponseHeader('token-expired') == 'Y'){
					//momWidget.messageBox({type:'warning', width:'400', height: '145', html: '세션 유효시간만료!'});
					alert('세션 유효시간만료!');
					momWidget.splashHide();
					top.location.href = mCommon.contextPath() + "/login.html";
					return;
				}
			
				
				call_back('ERROR', error, param, call_back_param, index_info, your);
			}
		}, fail		: function(fail) {
			clearInterval(interval);
			if(call_back != undefined) {
				call_back('FAIL', fail, param, call_back_param, index_info, your);
			}
		}
	});
}

function excel_upload(file_id, url, page, grid, param, call_back, callBackParam, indexInfo, your) {
	var files = file_id.files;
    if(files.length === 0) {
    	try {
    		momWidget.splashHide();
    	} catch(e) {
    		try {
    			micaCommon.splash.hide();
    		} catch(e1) {
    		}
    	}
    	
        alert('선택된 파일이 없습니다.')
        return;
    }
    
    if(url.indexOf('dummy') >= 0) {
    	url = mCommon.contextPath() + '/file/excel/com.thirautech.mom.' + url;				// AS-IS Version
    } else {	
    	url = mCommon.contextPath() + '/file/excel/com.thirautech.mom.' + url + '.dummy';	// Current Version
    }
    
    var formData = new FormData();
    formData.append('file', files[0]);
    formData.append('page', page);
    
    var headerInfo = {};
    var neccesityInfo = {};
    var grid_column_origin = AUIGrid.getColumnLayout(grid);
    if(page.indexOf('MOM') < 0) {
    	for(var i = 0; i < grid_column_origin.length; i++) {
    		var key = grid_column_origin[i].headerText;
        	var value = grid_column_origin[i].dataField;
        	headerInfo[key] = value;
	    }
    } else {
    	var index = 0;
    	
    	var mode = 'MICA';
    	for(var i = 0; i < grid_column_origin.length; i++) {
    		if(grid_column_origin[i]['excelTemplateHide'] != undefined) {
    			mode = 'XMOM';
    			break;
    		}
    	}
    	
    	for(var i = 0; i < grid_column_origin.length; i++) {
    		var excelTemplateHide = undefined;
    		if(mode == 'MICA') {
    			excelTemplateHide = (typeof grid_column_origin[i].excelTempleteHide == 'undefined') ? true : grid_column_origin[i].excelTempleteHide; 
    		} else {
    			excelTemplateHide = grid_column_origin[i]['excelTemplateHide'];
    		}
    		if(excelTemplateHide && excelTemplateHide != 0) {
	    		if(grid_column_origin[i].dataField == 'Edit') {
	    			continue;
	    		}
		    	var key = index.toString();
		    	var value = grid_column_origin[i].dataField;
	    		if(page == 'MOMBA004' && value == 'demandId') {
			    	headerInfo[grid_column_origin.length - 1] = value;
	    		} else {
	    			headerInfo[key] = value;
	    		}
		    	if(mode == 'XMOM' && excelTemplateHide == true){
		    	    excelTemplateHide = 1;
		        }		    	
		    	neccesityInfo[key] = mode == 'MICA' ? (grid_column_origin[i].require ? 1 : 2) : excelTemplateHide;
		    	index++;
	    	} 
	    }
    }
    
    formData.append('headerInfo', encodeURIComponent(JSON.stringify(headerInfo)));
    formData.append('neccesityInfo', encodeURIComponent(JSON.stringify(neccesityInfo)));
    
    if(your != undefined && your['excelParam'] != undefined) {
    	param = JSON.stringify(your['excelParam']);
    }
    
    formData.append('param', encodeURIComponent(param));

    var xhr = new XMLHttpRequest(); 
    xhr.open('POST', url); 
    xhr.onload = function() {
    	try {
    		momWidget.splashHide();
    	} catch(e) {
    		try {
    			micaCommon.splash.hide();
    		} catch(e1) {
    		}
    	}
    	
        if(JSON.parse(xhr.responseText)['result'] == 'success') {
        	if(call_back != undefined){
				call_back('SUCCESS', JSON.parse(xhr.responseText), param, callBackParam, indexInfo, your);
			}
        } else {
        	if(call_back != undefined){
				call_back('FAIL', JSON.parse(xhr.responseText), param, callBackParam, indexInfo, your);
			}
        }
    }
    
    xhr.send(formData);    
    //event.preventDefault();
}
//엑셀파일을 서버에 전송하지 않고, 그리드에 넣기
function excelUploadGrid(file, grid) {
	var excelData = [];
	var reader = new FileReader();
    reader.onload = function() {
        var fileData = reader.result;
        var wb = XLSX.read(fileData, {type : 'binary'});
        wb.SheetNames.forEach(function(sheetName) {
	        var rowObj =XLSX.utils.sheet_to_row_object_array(wb.Sheets[sheetName]);
	     if(rowObj.length>100000){
		   // momWidget.splashHide();
			momWidget.messageBox({type:'warning', width:'400', height: '145', html: '10만건 이하로 업로드 해주세요(현재크기:'+rowObj.length+')'});
	        return;
		 }
	        var reRowObj = JSON.stringify(rowObj); 
	        if(reRowObj.indexOf('<![CDATA') > -1) {
	        	reRowObj = reRowObj.replaceAll('<![CDATA[','').replaceAll(']]>','');
	        }
	        reRowObj = JSON.parse(reRowObj);
	        for(var i = 0; i < reRowObj.length; i++) {
	        	excelData.push(reRowObj[i]);
	        }
	       
        });
        
        
    	var headerInfo = [];
    	var columnInfo = [];
        var grid_column_origin = AUIGrid.getColumnLayout(grid);
        for(var i = 0; i < grid_column_origin.length; i++) {
    		var key = grid_column_origin[i].headerText;
        	var value = grid_column_origin[i].dataField;
        	var format = grid_column_origin[i].dataType == undefined ? "string" : grid_column_origin[i].dataType;
        	headerInfo[key] = value;
            columnInfo[key] = format;

        }
      
        for(var i = 0; i < excelData.length; i++) {
        	for(var key in excelData[i]) {
        		if(headerInfo[key] != undefined) {
        			if(columnInfo[key] == "string"){
	                    if(isNaN(excelData[i][key])==false){
		                        excelData[i][key] = excelData[i][key]+''.replace(/^\s+|\s+$/g,'').replace(/\,/g,'').replace(/\./g,'');
	                   }
	                   else{
								excelData[i][key] = excelData[i][key].replace(/^\s+|\s+$/g,'').replace(/\,/g,'').trim();
	                   }
        				
        			}
        			excelData[i][headerInfo[key]] = excelData[i][key];
        			excelData[i]['NEW'] = 'Y';			
        			delete excelData[i][key];
        		}
        	}
        }
        
        var refreshFlag = true;
        var index = Number(grid.replace('#grid', '')) - 1;
        if(momWidget.your[index] != undefined) {   	 
        	if(momWidget.your[index].initParam != undefined) {
        		if(momWidget.your[index].initParam.refreshFlag != undefined && !momWidget.your[index].initParam.refreshFlag) {
        			refreshFlag = false;
        		}
        	}
        }
        if(refreshFlag) {
        	AUIGrid.setGridData(grid, excelData);
        	AUIGrid.updateRowBlockToValue(grid, 0, excelData.length, "validateYn", "N");
        	
        } else {
        	AUIGrid.addRow(grid, excelData, 'last') //20210305 / pyj /웹 엑셀 업로드시 초기화 아닌 기존 row에 대한 add
        	
        }
//        AUIGrid.setGridData(grid, data);
        AUIGrid.setSelectionMode(grid, 'none');
        var pageRowCount = AUIGrid.getProp(grid, 'pageRowCount');
        if(pageRowCount == 1) {
        	AUIGrid.setPageRowCount(grid, 100);
        }
    	
       // excel_upload_new_run(grid, excelData, call_back);
    };
 /*     if(file.files[0]['size']>100000){
			momWidget.messageBox({type:'warning', width:'400', height: '145', html: '10만건 이하로 업로드 해주세요(현재크기:'+file.files[0]['size']+')'});
	        return;
		}*/
    reader.readAsBinaryString(file.files[0]);
}
///////////////////////////////////////////////////////////////////////////////////////////////////////

function excel_upload_new_run(grid, data, call_back) {
	var headerInfo = [];
	var columnInfo = [];
    var grid_column_origin = AUIGrid.getColumnLayout(grid);
    for(var i = 0; i < grid_column_origin.length; i++) {
		var key = grid_column_origin[i].headerText;
    	var value = grid_column_origin[i].dataField;
    	var format = grid_column_origin[i].formatString == undefined ? "VARCHAR" : grid_column_origin[i].formatString;
    	headerInfo[key] = value;
        columnInfo[key] = format;

    }
    
    for(var i = 0; i < data.length; i++) {
    	for(var key in data[i]) {
    		if(headerInfo[key] != undefined) {
    			if(columnInfo[key] != "VARCHAR"){
    				data[i][key] = data[i][key].replace(/^\s+|\s+$/g,'').replace(/\,/g,'').replace(/\./g,'');
    			}
    			data[i][headerInfo[key]] = data[i][key];
    			data[i]['NEW'] = 'Y';			
    			delete data[i][key];
    		}
    	}
    }
    
    var refreshFlag = true;
    var index = Number(grid.replace('#grid', '')) - 1;
    if(momWidget.your[index] != undefined) {   	 
    	if(momWidget.your[index].initParam != undefined) {
    		if(momWidget.your[index].initParam.refreshFlag != undefined && !momWidget.your[index].initParam.refreshFlag) {
    			refreshFlag = false;
    		}
    	}
    }
    if(refreshFlag) {
    	AUIGrid.setGridData(grid, data);
    } else {
    	AUIGrid.addRow(grid, data, 'last') //20210305 / pyj /웹 엑셀 업로드시 초기화 아닌 기존 row에 대한 add
    }
//    AUIGrid.setGridData(grid, data);
    AUIGrid.setSelectionMode(grid, 'none');
    var pageRowCount = AUIGrid.getProp(grid, 'pageRowCount');
    if(pageRowCount == 1) {
    	AUIGrid.setPageRowCount(grid, 100);
    }
    
    call_back();
}
///////////////////////////////////////////////////////////////////////////////////////////////////////

function attach_upload(file, entity_name, entity_id, param, call_back) {
	var files = file.files;
    if(files.length === 0) {
        alert('선택된 파일이 없습니다.')
        return;
    }
    
    url = mCommon.contextPath() + '/file/attach/com.thirautech.mom.common.file.dummy';
    
    var formData = new FormData();
    formData.append('file'       , files[0], encodeURIComponent(files[0].name));
    formData.append('entityName' , entity_name);
    formData.append('entityId'   , entity_id);
    
    if(param != undefined) {
    	 var param = JSON.parse(param);
    	    keys = Object.keys(param);
    	    for(var i = 0; i < keys.length; i++) {
    	    	formData.append(keys[i] , param[keys[i]]);
    	    }
    }
   
    var xhr = new XMLHttpRequest(); 
    xhr.open('POST', url); 

    xhr.onload = function() {
    	try {
    		momWidget.splashHide();
    	} catch(e) {
    		try {
    			micaCommon.splash.hide();
    		} catch(e1) {
    		}
    	}
    	
        if(JSON.parse(xhr.responseText)['result'] == 'success') {
    		//alert('Upload Success');
        	if(call_back != undefined){
				call_back('SUCCESS', JSON.parse(xhr.responseText));
			}
    	} else {
    		//alert('Upload Fail');
    		if(call_back != undefined){
				call_back('FAIL', JSON.parse(xhr.responseText));
			}
    	}
        
        /*if(xhr.status == 200) {
        	if(call_back != undefined){
				call_back('SUCCESS', JSON.parse(xhr.responseText));
			}
        } else {
        	if(call_back != undefined){
				call_back('FAIL', JSON.parse(xhr.responseText));
			}
        }*/
    }
    
    xhr.send(formData);    
    //event.preventDefault();
}

function attach_download(entityId, entityName, fileName) {
	var url = mCommon.contextPath() + '/file/download/com.thirautech.mom.common.file.dummy?entityId='+entityId+'&entityName='+entityName;
	if(fileName != null && fileName != undefined) {
		url += ('&fileName='+fileName);
	}
	
	location.href = url;
}

function attach_download2(query, param, call_back) {
	var url = mCommon.contextPath() + '/file/download/' + query + '.dummy';
    var xhr = new XMLHttpRequest(); 
    xhr.open('GET', url, true); 

    xhr.onload = function() {
    	try {
    		momWidget.splashHide();
    	} catch(e) {
    		try {
    			micaCommon.splash.hide();
    		} catch(e1) {
    		}
    	}
    	
        if(xhr.status == 200) {
        	if(call_back != undefined) {
				call_back('SUCCESS', JSON.parse(xhr.responseText));
			}
        } else {
        	if(call_back != undefined){
				call_back('FAIL', JSON.parse(xhr.responseText));
			}
        }
    }
    
    xhr.send(null);    
    //event.preventDefault();
}

function fn_b2bi_upload(query, param, call_back) {
	var url = mCommon.contextPath() + '/file/B2BIXml/' + query + '.dummy';
	try {
		momWidget.splashShow();
	} catch(e) {
		try {
			micaCommon.splash.show();
		} catch(e1) {
		}
	}
	
	$.post(url, param, call_back);
}

function fn_report_upload( files, param, call_back){
    url = mCommon.contextPath() + '/file/report/com.thirautech.mom.common.excelPrintForm.dummy';
    
    var formData = new FormData();
    formData.append('file' , files );
    formData.append('param', param);

    var xhr = new XMLHttpRequest(); 
    xhr.open('POST', url); 
    
    xhr.onload = function() {
    	try {
    		momWidget.splashHide();
    	} catch(e) {
    		try {
    			micaCommon.splash.hide();
    		} catch(e1) {
    		}
    	}
    	
        if(JSON.parse(xhr.responseText)['result'] == 'success') {
    		call_back('SUCCESS', JSON.parse(xhr.responseText));
    	} else {
    		call_back('FAIL', JSON.parse(xhr.responseText));
    	}
    }
    
    xhr.send(formData);    
    //event.preventDefault();
}

function file_upload(file_id, query, param, call_back_param, call_back){
	var files = file_id.files;
    if(files.length === 0) {
    	call_back('SUCCESS', JSON.parse(param), '', call_back_param);
    	
        return;
    }
    
	url = mCommon.contextPath() + '/file/file/com.thirautech.mom.' + query +'.dummy';
    
    var formData = new FormData();
    formData.append('file'	, files[0]);
    formData.append('query'	, query);
    formData.append('param'	, encodeURIComponent(param));
    
    var xhr = new XMLHttpRequest(); 
    xhr.open('POST', url); 

    xhr.onload = function() {
    	if(xhr.status == 200) {
        	if(call_back != undefined) {
				call_back('SUCCESS', JSON.parse(xhr.responseText), '', call_back_param);
			}
        } else {
        	if(call_back != undefined) {
				call_back('FAIL', JSON.parse(xhr.responseText), '', call_back_param);
			}
        }
    }
    
    xhr.send(formData);    
    //event.preventDefault();
}

function item_download(itemId, key){
	var url = mCommon.contextPath() + '/file/download/item/com.thirautech.mom.reference.itemInfo.item.file.dummy?itemId='+itemId+'&key='+key;
	
	location.href = url;
}

function file_download(resourceCd, itemId, attachSeq, attachName, key){
	var url = mCommon.contextPath() + '/file/attach/item/com.thirautech.mom.reference.document.workingManual.workingManualFile.dummy?resourceCd='+resourceCd+'&itemId='+itemId+'&attachSeq='+attachSeq+'&attachName='+attachName+'&key='+key;
	
	location.href = url;
}

function report_download(excelId){
	var url = mCommon.contextPath() + '/file/attach/report/com.thirautech.mom.common.comExcelReportFile.dummy?excelId='+excelId;
	
	location.href = url;
}

/*
 * by hyjeong
 * 
 * Common 날자 형식 지원을 위한 함수
 * 
 * Return Value : 'YYYY-MM-DD'
 * 
 * Parameter
 * date  : 비정규형 날짜 포맷 'YYYY/MM/DD', 'YYYY:MM:DD', 'YYYY.MM.DD', 'YYYY MM DD', 'YYYYMMDD'
 */
function to_date_yyyy_mm_dd(date){
	if(date == undefined || date == '') {
		return '';
	}
	
	var delimiter = '';	
	var ret_date = '';
	
	if(date.indexOf('/') > 0) {
		delimiter = '/';
	} else if(date.indexOf(':') > 0) {
		delimiter = ':';
	} else if(date.indexOf('.') > 0) {
		delimiter = '.';
	} else if(date.indexOf(' ') > 0) {
		delimiter = ' ';
	} else if(date.indexOf('-') > 0) {
		delimiter = '-';
	} 
	
	if(delimiter == '') {
		if(date.length > 7) {
			return date.substring(0,4)+'-'+date.substring(4,6)+'-'+date.substring(6,8);
		} else {
			return '0000-00-00';
		}
	}
	
	var tokens = date.split(delimiter);
	var year = tokens[0];
	var month, day;	
	if(parseInt(tokens[1]) < 10) {
		month = '0' + parseInt(tokens[1]).toString();
	} else {
		month = parseInt(tokens[1]).toString();
	}
	
	if(parseInt(tokens[2]) < 10) {
		day = '0' + parseInt(tokens[2]).toString();
	} else {
		day = parseInt(tokens[2]).toString();
	}
	
	ret_date = year + '-' + month + '-' + day;
	
	return ret_date;
}

/*
 * by hyjeong
 * 
 * 현재날짜, 현재 시간을 구하는 함수
 * 
 * Return Value : 'YYYY-MM-DD', 'YYYY-MM-DD HH24:MI:SS' 
 * 
 * Parameter
 * mode : 'YYYY-MM-DD', 'yyyy-mm-dd', 'YYYY-MM-DD HH24:MI:SS', 'yyyy-mm-dd hh24:mi:ss'
 */
function get_current_date(mode) {
	var current = new Date();
	var ret_date = '';
	
	if(mode == 'yyyy-mm-dd' || mode == 'YYYY-MM-DD') {
		ret_date = current.getFullYear() 																		   + '-' + 
		 (parseInt(current.getMonth() + 1) < 10 ? '0' + parseInt(current.getMonth() + 1) : current.getMonth() + 1) + '-' + 
			      (current.getDate()       < 10 ? '0' +          current.getDate()        : current.getDate());
		
		return ret_date;
	}
	
	ret_date = 		current.getFullYear() 																			+ '-' + 
		  (parseInt(current.getMonth() + 1) < 10 ? '0' + parseInt(current.getMonth() + 1) : current.getMonth() + 1) + '-' + 
			       (current.getDate()       < 10 ? '0' + 		  current.getDate()       : current.getDate())      + ' ' +
				   (current.getHours()      < 10 ? '0' + 		  current.getHours()      : current.getHours())     + ':' + 
				   (current.getMinutes()    < 10 ? '0' + 		  current.getMinutes()    : current.getMinutes())   + ':' +
				   (current.getSeconds()    < 10 ? '0' + 		  current.getSeconds()    : current.getSeconds());
	
	return ret_date;
}

/*
 * by hyjeong
 * 
 * 현재날짜로 부터 +diff, -diif 날짜를 구하는 함수
 * 
 * Return Value : 'YYYY-MM-DD'
 * 
 * Parameter
 * mode : 7 - 7일 후, -6 - 6일 전
 */
function get_date_diff(diff) {
	var date = new Date();
	var ret_date = '';
	
	date.setDate(date.getDate() + diff);
	ret_date = 		date.getFullYear() 																	   + '-' + 
	 	  (parseInt(date.getMonth() + 1) < 10 ? '0' + parseInt(date.getMonth() + 1) : date.getMonth() + 1) + '-' + 
	  	      	   (date.getDate()       < 10 ? '0' +          date.getDate()       : date.getDate());
	
	return ret_date;
}

function get_date_diff2(day, diff) {
	var date = new Date(day);
	var ret_date = '';
	
	date.setDate(date.getDate() + diff);
	ret_date = 		date.getFullYear() 																	   + '-' + 
	 	  (parseInt(date.getMonth() + 1) < 10 ? '0' + parseInt(date.getMonth() + 1) : date.getMonth() + 1) + '-' + 
	  	      	   (date.getDate()       < 10 ? '0' +          date.getDate()       : date.getDate());
	
	return ret_date;
}

//숫자만 입력 되도록
function onlyNum() {
	var keycode = window.event.keyCode;

	if ((keycode == 8 || (keycode >= 35 && keycode <= 40)
			|| (keycode >= 46 && keycode <= 57)
			|| (keycode >= 96 && keycode <= 105)
			|| keycode == 109 || keycode == 110
			|| keycode == 189 || keycode == 190 || keycode == 9)
		&& !event.shiftKey ) {
	    window.event.returnValue = true;
		return;
	} else {
		//event.preventDefault();	//IE 사용할 경우
		window.event.returnValue = false;
		return;
	}
}

function date2String19(grid, columns) {
	if(grid == undefined || columns == undefined) {
		return;
	}
	
	for(var idx = 0; idx < columns.length; idx++) {
		const i = idx;
		AUIGrid.setColumnPropByDataField(grid, columns[i], {
			//dataField : columns[i],
			labelFunction: function(row_index, column_index, value, item) { 
				if(value != undefined && value.length > 19) {
					return value.replace('T', ' ').substring(0, 19);
				}
				
				return value;
			}
		});
	}
}

function date2StringData19(datas, colums) {
	if(datas == undefined) {
		return;
	}
	
	for(var idx = 0; idx < datas.length; idx++) {
		const i = idx;
		for(key in datas[i]) {
			var value = datas[i][key];
			if(value == undefined || value.length == undefined || value.length < 19) {
				continue;
			}
			
			if(value.indexOf('-') == 4 && value.indexOf('T') == 10) {
				var day = value.substring(0, 10);
				var hour = parseInt(value.substring(11, 13)) + 9;
				if(hour >= 24) {
					datas[i][key] = get_date_diff2(day, 1) + ' 0' + (hour - 24) + value.substring(13); 
				} else {
					datas[i][key] = get_date_diff2(day, 0) + (hour < 10 ? ' 0' + hour : hour) + value.substring(13); 
				}
			}
		}
	}	
		
	return datas;
}

function date2StringData10(datas, colums) {
	if(datas == undefined) {
		return;
	}
	
	for(var idx = 0; idx < datas.length; idx++) {
		const i = idx;
		for(key in datas[i]) {
			var value = datas[i][key];
			if(value == undefined || value.length == undefined || value.length < 19) {
				continue;
			}
			
			if(value.indexOf('-') == 4 && value.indexOf('T') == 10) {
				var day = value.substring(0, 10);
				var hour = parseInt(value.substring(11, 13)) + 9;
				if(hour >= 24) {
					datas[i][key] = get_date_diff2(day, 1);// + ' 0' + (hour - 24) + value.substring(13); 
				} else {
					datas[i][key] = get_date_diff2(day, 0);// + (hour < 10 ? ' 0' + hour : hour) + value.substring(13); 
				}
			}
		}
	}	
		
	return datas;
}

function get_time_check(time){
	var pattern = /^([01][0-9]|2[0-3])([0-5][0-9])([0-5][0-9])$/;
	
	return pattern.test(time);
}

function digit_check(e) {
    var code = e.which?e.which:event.keyCode;
    if(code < 48 || code > 57) {
    	window.event.returnValue = false;
    	return;
    }
}

function number_filter(str_value) {
	return str_value.replace(/[^\.|^0(0)+|^0-9\.]/g, ""); //210406 / pyj / 숫자만-> 소수점 포함 숫자만
}

function getChosung(src) {
	var choStr = '';
	for(var i = 0; i < src.length; i++) {
		var index = ((src.charCodeAt(i) - 44032) /28) / 21;
		if(index >= 0) {
			choStr += String.fromCharCode(index + 4352);
		} 
	}
	
	return choStr;
}

function getJoongsung(src) {
	var joongStr = '';
	for(var i = 0; i < src.length; i++) {
		var index = ((src.charCodeAt(i)- 44032) / 28) % 21;
	    if(index >= 0) {
	    	joongStr += String.fromCharCode(index + 4449);
	    }
	}
	
	return joongStr;
}

function getJongsung(src) {
	var jongStr = '';
	for(var i = 0; i < src.length; i++) {
		var index = (src.charCodeAt(i) - 44032) % 28;
	    if(index > 0) {
	      jongStr += String.fromCharCode(index + 4519);
	    }
	}
	
	return jongStr;
}

function getHangul(src) {
	var str = '', ch, code, index1, index2, index3;
	for(var i = 0; i < src.length; i++) {
		ch = src[i];
		code = src.charCodeAt(i);
		index1 = ((code - 44032) / 28) / 21;
		index2 = ((code - 44032) / 28) % 21;
		index3 = (code - 44032) % 28;
	    if(index1 > 0 || index2 > 0 || index3 > 0) {
	    	var ch = String.fromCharCode(index1 + 4352)
	    	if(ch != 'ᆧ') {
	    		str += (ch + ' ');
	    	} 
	    	ch = String.fromCharCode(index2 + 4449)
	    	if(ch != 'ᆧ') {
	    		str += (ch + ' ');
	    	}
	    	ch = String.fromCharCode(index3 + 4519)
	    	if(ch != 'ᆧ') {
	    		str += (ch + ' ');
	    	}
	    } else {
	    	str += (src[i] + ' ');
	    }
	}
	
	return str;
}

/* 
 * 20200506 / pyj / 비밀번호 validation 생성
 * 20200526 / pyj / 이전 비밀번호, 비밀번호 확인 인자 추가
 * 20200610 / pyj / 코드관리 비밀번호 셋팅 가져오는 부분 공통화 but 비밀번호 input박스 change이벤트마다 불러와서 주석처리
 */
function pwCheck(pw, prevPw, confPw, url, param, pwCol) { 
	// pw: 새로운 비밀번호, prevPw: 이전 비밀번호, confPw: 비밀번호 확인, <<url: 비밀번호 확인 url, param: 파라미터, pwCol: 비밀번호 컬럼 -- url, param, pwCol 한 세트>>
	var that = this;
	var msg = '';
	var realPw;
	var num = pw.search(/[0-9]/g);
	var eng = pw.search(/[a-z]/ig);
	var spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);
	
	//아직 로그인 안된 상태에서 필요한 정보(login화면)
	var divisionCd = sessionStorage.divisionCd;
	var companyCd = sessionStorage.companyCd;
	
	if(prevPw != undefined && confPw != undefined) {
		prevPw = sha256Set(prevPw);
		confPw = sha256Set(confPw);
	}

	/* 선택 벨리데이션 */
	$.ajax({
		type 		: 'GET',
		url  		: mCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comCode.dummy',
		data 		: {divisionCd: divisionCd, companyCd: companyCd, codeClassId: 'SITE_SETUP', codeId: 'PW_VAL_YN', attribute2: 'Y'},
		async		: false,
		timeout 	: 30000000,
		dataType 	: 'json',
		contentType : 'application/json; charset=UTF-8',
		success     : function(data) {
			if(data.length != 0) {
				if(pw.length < 8) {
					msg = 'MESSAGES12478';
					return msg;
				}
				if(num < 0 || eng < 0 || spe < 0) {
					msg = 'MESSAGES12479';
					return msg;
				}
				
			}
		}, error	: function(error) {}
		, fail		: function(fail) {}
	});
	
	/*  공통 벨리데이션 */
	if(url != undefined && url != '') {
		$.ajax({
			type 		: 'GET',
			url  		: mCommon.contextPath() + '/mom/request/com.thirautech.mom.' + url + '.dummy',
			data 		: param,
			async		: false,
			timeout 	: 30000000,
			dataType 	: 'json',
			contentType : 'application/json; charset=UTF-8',
			success     : function(data) {
				if(data.length != 0) {
					realPw = data[0][pwCol];
				}
			}, error	: function(error) {}
			, fail		: function(fail) {}
		});
		
		if(prevPw != realPw) {
			msg = 'MESSAGES11767'
				return msg;
		}
	}
	pw = sha256Set(pw);
	if(prevPw != undefined && prevPw != '') {
		if(pw == prevPw) {
			msg = 'MESSAGES12482';
			return msg;
		}
	}
	if(confPw != undefined && confPw != '') {
		if(pw != confPw) {
			msg = 'MESSAGES11765';
			return msg;
		} 
	}
	
	return msg;
}

function sha256Set(str) { // sha256 암호화 함수 추가 
	// str 이 64자면 안함.
	if(!this.sha256js) {
		$("head").append('<script src="' + mCommon.contextPath() + '/Content/js/sha256.js"></script>');
		this.sha256js = true;
	}
	if(str.length == 64) {
		return str;
	}
	return sha256.hmac('tu', str);
	
}

//20210218 / pyj / 토스트 메세지 출력하기 
function showToastMsg(index, item, dataField, message) {
	var rowIdField = AUIGrid.getProp(momWidget.grid[index], 'rowIdField');
	var rowIndex = AUIGrid.rowIdToIndex(momWidget.grid[index], item[rowIdField]); // 행인덱스 얻기
	var columnIndex = AUIGrid.getColumnIndexByDataField(momWidget.grid[index], dataField); // 열인덱스 얻기
	// 토스트 메세지 띄우기
	AUIGrid.showToastMessage(momWidget.grid[index], rowIndex, columnIndex, message);
}
//2020.04.12 jhkim start
function base64toBlob(base64Data, contentType) {
    contentType = contentType || '';
    var sliceSize = 1024;
    var byteCharacters = atob(base64Data);
    var bytesLength = byteCharacters.length;
    var slicesCount = Math.ceil(bytesLength / sliceSize);
    var byteArrays = new Array(slicesCount);

    for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
        var begin = sliceIndex * sliceSize;
        var end = Math.min(begin + sliceSize, bytesLength);

        var bytes = new Array(end - begin);
        for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
            bytes[i] = byteCharacters[offset].charCodeAt(0);
        }
        byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: contentType });
}
//2020.04.12 jhkim end
// 2020.04.12 hyjeong begin
(function( $ ) {
	$.fn.replaceTag = function(newTag) {
	    var originalElement = this[0]
	    , originalTag = originalElement.tagName
	    , startRX = new RegExp('^<'+originalTag, 'i')
	    , endRX = new RegExp(originalTag+'>$', 'i')
	    , startSubst = '<'+newTag
	    , endSubst = newTag+'>'
	    , newHTML = originalElement.outerHTML
	    .replace(startRX, startSubst)
	    .replace(endRX, endSubst);
	    this.replaceWith(newHTML);
	};
})(jQuery);
// 2020.04.12 hyjeong end

