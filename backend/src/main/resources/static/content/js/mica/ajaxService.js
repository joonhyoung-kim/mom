var ajaxService = function (data, url, successFn, method, errorFn, options) {
    // token
    ajaxService.setAuth();

    method = method || "POST";
    options = options || {};

    var async = options.async != null ? options.async : true;
    var contentType = options.contentType != null ? options.contentType : "application/json; charset=utf-8";
    var processData = options.processData != null ? options.processData : false;
    var dataType = options.dataType != null ? options.dataType : "json";
    var data = method == "GET" ? data : JSON.stringify(data);
    return $.ajax({
        method: method,
        //type: method,
        url: url,
        cache: false,
        data: data,
        async: async,
        contentType: contentType,
        processData: processData,
        dataType: dataType,
        success: ajaxServiceProcess.ajaxSuccess(successFn, url),
        error: function (xhr, stauts, ex) {
            if (xhr.status == 401) {
                alert('Due to the problems session, go to the login page.');
                window.location = "/?ReturnUrl=" + window.location.pathname;
                return;
            }
            var resultFn = ajaxServiceProcess.ajaxError(errorFn, url)
            resultFn(xhr, stauts);
        },
        //beforeSend: function (request) {
        //    var accesstoken = sessionStorage.getItem('accessToken');
        //    request.setRequestHeader("Authorization", "Bearer " + accesstoken);
        //}
    });
}

ajaxService.setAuth = function () {

    var authorization = ajaxService.setAuthToken();
    if (authorization != "") {
        $.ajaxSetup({
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", authorization);
            },
            global: true
        });
    }
}

ajaxService.clearAuth = function () {

    var authorization = ajaxService.setAuthToken();
    if (authorization != "") {
        $.ajaxSetup({
            beforeSend: function (xhr) {
            },
            global: true
        });
    }
}

ajaxService.setAuthToken = function () {
    var authorization = "";

    if (sessionStorage.getItem('authorization')) {
        var auth = JSON.parse(sessionStorage.getItem('authorization'));
        authorization = auth.token_type + " " + auth.access_token;
    }
    return authorization;
}

var ajaxServiceProcess = {
    ajaxSuccess: function (successFn, url) {
        if (successFn != null) {
            return successFn;
        } else {
            //console.log("NotSuccessFn url : " + url);
        }
    },
    ajaxError: function (errorFn, url) {
        if (errorFn != null) {
            return errorFn;
        } else {
            //console.log("NotErrorFn url : " + url);
            return function () { };
        }
    }
}

ajaxService.post = function (url, data, successFn, errorFn, options) {
    ajaxService(data, url, successFn, "POST", errorFn, options);
};

ajaxService.get = function (url, data, successFn, errorFn, options) {
    ajaxService(data, url, successFn, "GET", errorFn, options);
};

ajaxService.put = function (url, data, successFn, errorFn, options) {
    ajaxService(data, url, successFn, "PUT", errorFn, options);
};

ajaxService.delete = function (url, data, successFn, errorFn, options) {
    ajaxService(data, url, successFn, "DELETE", errorFn, options);
};


ajaxService.file = {};

ajaxService.file.download = function () {

};
/*
    FILE UPLOAD
    html : 
        <form id="frm"  enctype="multipart/form-data" action="" method="post">
        <input type="file" name="uploadfile" />
        <input type="file" name="uploadfile" />
        <input type="button" id="uploadbutton" value="클릭" />
        </form>
    script : 
    $("#uploadbutton").click(function(){
        ajaxService.file.upload($('form'), "/fileupload", function(){ console.log("Success File Upload"); });
    });
*/
ajaxService.file.upload = function ($frm, url, successFn, errorFn) {

    ajaxService.setAuth();

    var form = $frm[0];
    var formData = new FormData(form);
    $.ajax({
        url: url,
        processData: false,
        contentType: false,
        data: formData,
        type: 'POST',
        success: function (result) {
            //alert("업로드 성공!!");
            console.log("Success File Upload");
            if (typeof successFn === "function")
                succenFn();
        },
        error: function (request, status, error) {
            console.log("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
            if (typeof errorFn === "function")
                succenFn();
        }
    });
};