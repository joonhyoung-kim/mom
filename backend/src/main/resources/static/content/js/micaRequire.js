// 2016.09.01 .by.joon
// require js 를 사용 하여
// javascript를 정리

//requireJS 기본 설정 부분
requirejs.config({
    /*
        baseUrl:
        JavaScript 파일이 있는 기본 경로를 설정한다.
        만약 data-main 속성이 사용되었다면, 그 경로가 baseUrl이 된다.
        data-main 속성은 require.js를 위한 특별한 속성으로 require.js는 스크립트 로딩을 시작하기 위해 이 부분을 체크한다.
    */
    baseUrl: '/Content', // 'js' 라는 폴더를 기본 폴더로 설정한다. 

    /*
        paths: 
        path는 baseUrl 아래에서 직접적으로 찾을 수 없는 모듈명들을 위해 경로를 매핑해주는 속성이다.
        "/"로 시작하거나 "http" 등으로 시작하지 않으면, 기본적으로는 baseUrl에 상대적으로 설정하게 된다.
    
        paths: {
            "exam": "aaaa/bbbb"
        }
    
        의 형태로 설정한 뒤에, define에서 "exam/module" 로 불러오게 되면, 스크립트 태그에서는 실제로는 src="aaaa/bbbb/module.js" 로 잡을 것이다.
        path는 또한 아래와 같이 특정 라이브러리 경로 선언을 위해 사용될 수 있는데, path 매핑 코드는 자동적으로 .js 확장자를 붙여서 모듈명을 매핑한다.
    */
    paths: {

        //뒤에 js 확장자는 생략한다.
        'jquery': 'js/jquery.min-1.11.1',
        'jquery-ui': 'js/jquery-ui.min',
        'jquery-normalize': 'js/normalize',

        'bootstrap': 'theme/js/plugins/bootstrap/bootstrap.min',

        'amcharts': 'amcharts/amcharts',
        'amcharts-serial': 'amcharts/serial',

        'jqGrid': 'theme/js/plugins/jqGrid/jquery.jqGrid.min',
        'jqGrid-i18n': 'theme/js/plugins/jqGrid/i18n/grid.locale-en',

        'select2': 'theme/js/plugins/select2/select2.min',
        'datetimepicker': 'theme/js/plugins/datetimepicker/jquery.datetimepicker.full',

        'jqwidgets-jqxcore': 'jqwidgets/jqxcore',
        'jqwidgets-jqxlistbox': 'jqwidgets/jqxlistbox',
        'jqwidgets-jqxcombobox': 'jqwidgets/jqxcombobox',
        'jqwidgets-jqxexpander': 'jqwidgets/jqxexpander',
        'jqwidgets-jqxsplitter': 'jqwidgets/jqxsplitter',
        'jqwidgets-jqxbuttons': 'jqwidgets/jqxbuttons',
        'jqwidgets-jqxscrollbar': 'jqwidgets/jqxscrollbar',
        'jqwidgets-jqxdata': 'jqwidgets/jqxdata',
        'jqwidgets-jqxmenu': 'jqwidgets/jqxmenu',
        'jqwidgets-jqxtree': 'jqwidgets/jqxtree',
        'jqwidgets-jqxpanel': 'jqwidgets/jqxpanel',
        'jqwidgets-jqxnotification': 'jqwidgets/jqxpanel',

        'mica-common-display' : 'js/common',
        'mica-js': 'js/mica',
        'mica-export' : 'js/mica/export',
        'mica-common' : 'js/mica/mica.common',
        'mica-regional': 'js/regional'

    }
});

//requireJS를 활용하여 모듈 로드
requirejs([
        'jquery',
        'jquery-ui',
        'jquery-normalize',

        'bootstrap',

        'amcharts',
        'amcharts-serial',

        'select2',
        'datetimepicker',

        'jqwidgets-jqxcore',
        'jqwidgets-jqxlistbox',
        'jqwidgets-jqxcombobox',
        'jqwidgets-jqxexpander',
        'jqwidgets-jqxsplitter',
        'jqwidgets-jqxbuttons',
        'jqwidgets-jqxscrollbar',
        'jqwidgets-jqxdata',
        'jqwidgets-jqxmenu',
        'jqwidgets-jqxtree',
        'jqwidgets-jqxpanel',
        'jqwidgets-jqxnotification',

        'jqGrid',
        'jqGrid-i18n',

        'mica-common-display',
        'mica-js',
        'mica-export',
        'mica-common',
        'mica-regional'
]);


//<script src='/Content/js/jquery.min-1.11.1.js'></script>
//<script src='/Content/js/jquery-ui.min.js'></script>
//<script src='/Content/js/normalize.js'></script>
//<script src='/Content/amcharts/amcharts.js'></script>
//<script src='/Content/amcharts/serial.js'></script>

//<script src='/Content/theme/js/plugins/jqGrid/jquery.jqGrid.min.js'></script>
//<script src='/Content/theme/js/plugins/jqGrid/i18n/grid.locale-en.js'></script>
//<script src='/Content/theme/js/plugins/bootstrap/bootstrap.min.js'></script>
//<script src='/Content/theme/js/plugins/select2/select2.min.js'></script>
//<script src="/Content/theme/js/plugins/datetimepicker/jquery.datetimepicker.full.js"></script>
//<script src='/Content/jqwidgets/jqxcore.js'></script>
//<script src='/Content/jqwidgets/jqxlistbox.js'></script>
//<script src='/Content/jqwidgets/jqxcombobox.js'></script>
//<script src='/Content/jqwidgets/jqxexpander.js'></script>
//<script src='/Content/jqwidgets/jqxsplitter.js'></script>
//<script src='/Content/jqwidgets/jqxbuttons.js'></script>
//<script src='/Content/jqwidgets/jqxscrollbar.js'></script>
//<script src='/Content/jqwidgets/jqxdata.js'></script>
//<script src="/Content/jqwidgets/jqxmenu.js"></script>
//<script src='/Content/jqwidgets/jqxtree.js'></script>
//<script src='/Content/jqwidgets/jqxpanel.js'></script>
//<script src="/Content/jqwidgets/jqxnotification.js"></script>


//<script src="/Content/js/common.js"></script>
//<script src='/Content/js/mica.js'></script>
//<script src="/Content/js/mica/export.js"></script>
//<script src="/Content/js/mica/mica.common.js"></script>

//<!-- 다국어 -->
//<script src="/Content/js/regional.js"></script>