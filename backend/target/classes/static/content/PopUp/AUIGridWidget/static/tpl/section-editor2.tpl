<header class="app-header">
	<nav class="app-nav navbar navbar-amcharts" role="navigation">
		<a class="navbar-header navbar-header-title" href="/">
			<span>LIVE EDITOR</span><span class="beta">&beta;</span>
		</a>
		<ul class="nav navbar-nav navbar-left">
			<li class="am-menu-save">
				<a href="/save/"><span>Save</span><i class="am am-save"></i></a>
			</li>
			<li class="am-menu-save-draft">
				<a href="/save/draft/"><span>Save Draft</span><i class="am am-save-draft"></i></a>
			</li>
			<li class="am-menu-fork">
				<a href="/fork/"><span>Fork</span><i class="am am-fork"></i></a>
			</li>
			<li class="am-menu-new">
				<a href="/new/"><span>New</span><i class="am am-new"></i></a>
			</li>
			<li class="am-menu-share">
				<a href="/share/"><span>Publish &amp; Share</span><i class="am am-share"></i></a>
			</li>
		</ul>
		<ul class="nav navbar-nav navbar-right navbar-signin" style="margin: 0 26px 0 0;">
			<li class="am-login-label hidden">
				<span>Want to see your saved charts?</span>
			</li>
			<li class="am-menu-signin dropdown">
				<a href="/signin/" class="dropdown-toggle" data-toggle="dropdown">
					<span class="btn btn-flat btn-lightblue">
						<span>Sign In</span>
					</span>
				</a>
				<ul class="dropdown-menu dropdown-menu-left"></ul>
			</li>
		</ul>
		<ul class="nav navbar-nav navbar-right navbar-user hidden">
			<li class="am-menu-user dropdown">
				<a href="/user/" class="dropdown-toggle" data-toggle="dropdown">
					<i class="am am-login"></i>
					<span class="am-user-name">Unknown</span>
					<span class="btn btn-flat btn-lightblue btn-usercharts">
						<span class="am-user-charts">0</span>
					</span>
				</a>
				<ul class="dropdown-menu dropdown-menu-left"></ul>
			</li>
		</ul>
		<a class="navbar-header navbar-header-brand" href="http://www.amcharts.com">
			<img src="//live.amcharts.com/static/img/page/logo_light.png" title="JavaScript charts and maps" alt="" />
		</a>
	</nav>
</header>

<div class="app-body app-editor fx-all-250">
	<div class="app-editor-1">
		<div class="app-menu app-menu-dark">
			<ul class="am-editor-groups nav nav-stacked"></ul>
      		  <a id ="btnEdit" class="am-data-add-page w-inline-block searchbutton" href="#" style="position: absolute; left : 12px;  bottom : 108px">
              	<div class="textblock"><!--<i class="fa fa-check" aria-hidden="true"></i>-->Edit</div>
              </a>
      		  <a id ="btnSave" class="am-data-add-page w-inline-block searchbutton" href="#" style="position: absolute; left : 9px;  bottom : 70px">
              	<div class="textblock"><!--<i class="fa fa-check" aria-hidden="true"></i>-->Save</div>
              </a>
      		  <a id="btnClose" class="am-data-add-page w-inline-block searchbutton" href="#" style="position: absolute; left : 6px;  bottom : 30px">
              	<div class="textblock">Close</div>
              </a>
		</div>
	</div>
	<div class="app-editor-2">
		<div class="app-editor-2-1">
			<div class="app-menu app-menu-light">
				<ul class="am-editor-props nav nav-stacked"></ul>
			</div>
		</div>
		<div class="app-editor-2-2">
			<div class="app-editor-2-2-1">
        <table id="auigrid-list" style="width:100%;height:100%"></table>
        <div id="pager"></div>
			</div>
			<div class="app-editor-2-2-2">
				
				<div class="tab-content">
					<div class="tab-pane active" id="am-editor-data">
					<!--
						<ul class="nav navbar-nav navbar-buttons navbar-left">
							<li>
								<a class="am-data-add-row" href="#"><span>Add Row</span><i class="am am-add-row"></i></a>
							</li>
							<li class="active">
								<a class="am-data-add-col" href="#"><span>Add Column</span><i class="am am-add-col"></i></a>
							</li>
						</ul>-->
						<ul class="nav navbar-nav navbar-buttons navbar-right">
							<li class="active">
								<a class="am-data-import" href="#"><span>Import</span><i class="am am-import"></i></a>
							</li>
						</ul>
						<div class="am-editor-table" id="am-editor-table"></div>
					</div>
					<div class="tab-pane" id="am-editor-code">
						<textarea class="am-editor-config" id="am-editor-config" rows="3"></textarea>
					</div>
          <div class="tab-pane" id="am-editor-code1">
            <textarea class="am-editor-config1" id="am-editor-config1" rows="3"></textarea>
          </div>
				</div>
			</div>
		</div>
	</div>
</div>