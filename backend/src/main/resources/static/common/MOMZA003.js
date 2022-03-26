var MOMZA003 = {
	initMessage			: undefined,
	initParam			: undefined,	
	facilityType 		: undefined,
	
	init: function() {
		$("#fromDate").datetimepicker({maxDate : new Date()});
		
		var that = this;
		Language.init(function() {
			momWidget.isInitGrid(0, function() {
				momWidget.isInitGrid(2, function() {
					that.grid();
					that.event();
					momWidget.dropDownPost(0, undefined, undefined, undefined, that);
				});
			});
		});
		var facilityType = momWidget.getSearchParam()['facilityType'];
	}, retrieveCallInit: function(index, param, callBackParam, indexInfo) {
		var that = this;
		this.initMessage = undefined;
		
		if(index == 0) {
			this.initParam = {sysDateFlag : $('#fromDate').val() == get_date_diff(0) ? 'Y' : 'N'};
		} else {
			if(indexInfo != undefined) {
				/*
				 * 20200604 / pyj / 이력조회 팝업 오픈시 팝업 딜레이 줄이기 위해 이력조회 검색조건 데이터 매핑 callback으로 옮김
				 */
				if(indexInfo['op'] == 'histBtn1') {
					$('#moItem').val(param['itemId']);
					$('#moItem').attr('readonly','readonly');
					that.initParam = {moFromDate : $('#moFromDate').val(), moToDate : $('#moToDate').val(), moItem : param['itemId'], moLocation : param['locationCd']};
				}
				if(indexInfo['op'] == 'findBtn3') {
					this.initParam = undefined;
				}
			}
		}
	}, retrieveCallBack: function(result, data, param, callBackParam, indexInfo) {
		if(indexInfo != undefined) {
			if(indexInfo['op'] == 'findBtn'+ (indexInfo.index + 1)) {
				AUIGrid.setGridData(momWidget.grid[indexInfo.index], data);
				momWidget.splashHide();
			}
			if(indexInfo['op'] == 'histBtn1') {
				$('#moItem').val(param['itemId']);
				$('#moLocation').val(param['locationCd']);
				
				AUIGrid.setGridData(momWidget.grid[2], data);
				momWidget.splashHide();
			}
		}
	}, grid: function() {
		var that = this;
		
		var data = $('#facilityType').jqxComboBox('source');
		if(data == undefined || data.length < 1) {
			setTimeout(that.grid, 40);
			return;
		}
		
		$('#facilityType').jqxComboBox('checkIndex', 0);
		$('#facilityType').jqxComboBox('checkIndex', 1);
		$('#facilityType').jqxComboBox('checkIndex', 2);
		$('#facilityType').jqxComboBox('checkIndex', 4);
	}, event: function() {
		$(document).on('change', '#moFromDate', function() {
			if(get_date_diff(-180) > $('#moFromDate').val()){
				momWidget.messageBox({type: 'warning', width: '400', height: '145', html: Language.getLang('MESSAGES12767@' + Language.lang['MESSAGES10790'] + '@' + get_date_diff(-180) ) });
				return $('#moFromDate').val(get_date_diff(-180)); 
			}
		});
	}
};
 
$(document).ready(function(event){
	momWidget.init(1, 'MOMZA003', MOMZA003);
	momWidget.init(3, 'MOMZA003', MOMZA003);
	MOMZA003.init();
});