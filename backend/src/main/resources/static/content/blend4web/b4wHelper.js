"use strict"

// register the application module
b4w.register("b4wHelper", function (exports, require) {

    // import modules used by the app

    var m_scenes = require("scenes");
    var m_main = require("main");
    var m_obj = require("objects");
    var m_app = require("app");
    var m_anchors = require("anchors");
    var m_tex = require("textures");
    var m_container = require("container");
    var m_animation = require("animation");
    var m_material = require("material");
    var m_preloader = require("preloader");
    var m_data = require("data");
    var m_cam = b4w.require("camera");

    var anchor_name;

    // init canvas
    var canvasElementId = null, jsonFileUrl = null, callBackFunction = null, preloaderOptions = null;
    exports.Init = function (pCanvasElementId, pJsonFileUrl, pCallBackFunction, pPreloaderOptions) {
        canvasElementId = pCanvasElementId;
        jsonFileUrl = pJsonFileUrl;
        callBackFunction = pCallBackFunction;
        preloaderOptions = pPreloaderOptions;

        m_app.init({
            canvas_container_id: pCanvasElementId,
            callback: fn_InitCallBack,
            physics_enabled: false,
            show_fps: false,
            alpha: false,
            autoresize: true,
            console_verbose: true
        });
    }

    function fn_InitCallBack(canvas_elem, success) {

        if (!success) {
            console.log("b4w init failure");
            return;
        }

        fn_SetPreloader();

        fn_Load();
    }

    function fn_SetPreloader() {
        $("#" + canvasElementId).before('<div id="background_image_container"></div>');
        var loadingDivTop = $("#" + canvasElementId).offset().top + $("#" + canvasElementId).height() * 6 / 7;
        var loadingDivLeft = $("#" + canvasElementId).offset().left + $("#" + canvasElementId).width() / 2;

        $("head").append('<style type="text/css">'
            + '#background_image_container {'
            + 'position: absolute;'
            + 'z-index: 4;'
            + 'width: 100%;'
            + 'height: 100%;'
            + 'overflow: hidden;'
            + 'background: url(' + preloaderOptions.imgUrl + ') 100% 100% no-repeat;'
            + 'background-position: center;'
            + 'background-size: cover;'
            + '}'
            + 'div#simple_preloader_container > div { top: ' + loadingDivTop + 'px !important; left:' + loadingDivLeft + 'px !important; height:28px !important;}'
            + '</style>');

        m_preloader.create_simple_preloader({
            bg_color: "#00000000",
            bar_color: "#FFF",
            background_container_id: "background_image_container",
            canvas_container_id: "canvas",
            preloader_fadeout: true
        });
    }

    function fn_Load() {
        m_data.load(jsonFileUrl, callBackFunction, fn_PreloaderCallBack);
    }

    function fn_PreloaderCallBack(percentage) {
        m_preloader.update_preloader(percentage);
    }


    //-------------- show, hide an object ---------------------
    exports.ShowObj = function (objName, groupName) {
        var obj = fn_GetObject(objName, groupName);
        m_scenes.show_object(obj);
    }

    exports.HideObj = function (objName, groupName) {
        var obj = fn_GetObject(objName, groupName);
        m_scenes.hide_object(obj);
    }

    //-------------- pause, resume engine ---------------------

    exports.Pause = function () {
        m_main.pause();
    }

    exports.Resume = function () {
        m_main.resume();

    }

    exports.Resize = function () {
        m_container.resize(1, 1);
    };



    //-------------- change an object color by rgb ---------------------
    // node editor에서 RGB mix color 작업을 전제로 함
    // rgbColor: [1,0,1]
    exports.ChangeObjColor = function (objName, materialName, rgbColor) {
        fn_ChangeObjColorByRgb(objName, materialName, rgbColor);
    }

    function fn_ChangeObjColorByRgb(objName, materialName, rgbColor) {
        var obj = m_scenes.get_object_by_name(objName);
        if (obj) {
            m_obj.set_nodemat_rgb(obj, [materialName, "RGB"], rgbColor[0], rgbColor[1], rgbColor[2]);
        } else console.log("Object " + objName + "Not Found!");
    }

    exports.setDiffuseColor = function (objName, materialName, rgbColor) {
        var obj = m_scenes.get_object_by_name(objName);
        fn_ChangeObjDiffuseColor(obj, materialName, rgbColor);
    }
    //-------------- change an object diffuse color ---------------------
    // rgbColor: [1,0,1]
    exports.ChangeObjDiffuseColor = function (objName, materialName, rgbColor, groupName) {
        var obj = fn_GetObject(objName, groupName);
        if (obj) {
            fn_ChangeObjDiffuseColor(obj, materialName, rgbColor);
        }
    }

    function fn_ChangeObjDiffuseColor(obj, materialName, rgbColor) {
        m_material.set_diffuse_color(obj, materialName, rgbColor);
    }

    //-------------- change an object texture image ---------------------
    exports.ChangeObjImage = function (objName, imagePath) {
        var textureName = "Texture_" + objName;
        fn_ChangeObjColorByImg(objName, textureName, imagePath);
    }


    // 무늬가 있을 경우, 두개의 Texture로 Control.. 
    exports.ChangeObjImage2 = function (objName, texture1_imagePath, texture2_imagePath) {
        var textureName1 = "Texture_" + objName;
        var textureName2 = "Texture_" + objName + "_2";
        fn_ChangeObjColorByImg(objName, textureName1, texture1_imagePath);
        fn_ChangeObjColorByImg(objName, textureName2, texture2_imagePath);
    }

    function fn_ChangeObjColorByImg(objName, textureName, imagePath) {
        var obj = m_scenes.get_object_by_name(objName);
        if (obj) {
            var ctx_image = m_tex.get_canvas_ctx(obj, textureName);
            if (ctx_image) {
                var img = new Image();
                img.src = imagePath;
                img.onload = function () {
                    ctx_image.drawImage(img, 0, 0, ctx_image.canvas.width,
                        ctx_image.canvas.height);
                    m_tex.update_canvas_ctx(obj, textureName);
                }
            }
        }

    }

    //-------------- highlight by texture image ---------------------
    var HighlightIDs = [];
    exports.SetObjHighlightByImg = function (objName, imagePath, highlightImagePath) {
        if (HighlightIDs[objName]) {
            return;
        }
        var textureName = "Texture_" + objName;
        HighlightIDs[objName] = setInterval(function () {
            fn_ChangeObjColorByImg(objName, textureName, highlightImagePath);
            setTimeout(function () {
                fn_ChangeObjColorByImg(objName, textureName, imagePath);
            }, 400);
        }, 800);
    }


    exports.SetObjHighlightByImg2 = function (objName, texture1_imagePath, texture2_imagePath, highlightImagePath) {
        if (HighlightIDs[objName]) {
            return;
        }
        var textureName1 = "Texture_" + objName;
        var textureName2 = "Texture_" + objName + "_2";
        HighlightIDs[objName] = setInterval(function () {
            fn_ChangeObjColorByImg(objName, textureName1, highlightImagePath);
            fn_ChangeObjColorByImg(objName, textureName2, highlightImagePath);
            setTimeout(function () {
                fn_ChangeObjColorByImg(objName, textureName1, texture1_imagePath);
                fn_ChangeObjColorByImg(objName, textureName2, texture2_imagePath);
            }, 400);
        }, 800);
    }


    //-------------- highlight by RGB Color ---------------------
    exports.SetObjHighlightByRgb = function (objName, materialName, rgbColor, highlightRgbColor) {
        if (HighlightIDs[objName]) {
            return;
        }
        HighlightIDs[objName] = setInterval(function () {
            fn_ChangeObjColorByRgb(objName, materialName, highlightRgbColor);
            setTimeout(function () {
                fn_ChangeObjColorByRgb(objName, materialName, rgbColor);
            }, 400);
        }, 800);
    }


    //-------------- highlight by Diffuse Color ---------------------
    exports.SetObjHighlightByDiffuseColor = function (objName, materialName, rgbColor, highlightRgbColor, groupName) {
        var intervalId = groupName ? groupName : objName;

        if (HighlightIDs[intervalId]) {
            return;
        }

        var obj = fn_GetObject(objName, groupName);
        if (obj) {
            HighlightIDs[intervalId] = setInterval(function () {
                fn_ChangeObjDiffuseColor(obj, materialName, highlightRgbColor);
                setTimeout(function () {
                    fn_ChangeObjDiffuseColor(obj, materialName, rgbColor);
                }, 400);
            }, 800);
        }
    }

    //-------------- highlight by Flashing ---------------------
    exports.SetObjHighlightByFlashing = function (objName, groupName) {
        var intervalId = groupName ? groupName : objName;

        if (HighlightIDs[intervalId]) {
            return;
        }

        var obj = fn_GetObject(objName, groupName);
        if (obj) {
            HighlightIDs[intervalId] = setInterval(function () {
                m_scenes.show_object(obj);
                setTimeout(function () {
                    m_scenes.hide_object(obj);
                }, 400);
            }, 800);
        }
    }


    exports.ClearObjHighlight = function (objName, groupName) {
        var intervalId = groupName ? groupName : objName;

        if (HighlightIDs[intervalId]) {
            clearInterval(HighlightIDs[intervalId]);
            HighlightIDs[intervalId] = null;
        }
    }

    function fn_GetObject(objName, groupName) {
        var obj;
        if (groupName) {
            obj = m_scenes.get_object_by_dupli_name(groupName, objName);
        }
        else {
            obj = m_scenes.get_object_by_name(objName);
        }
        if (obj) return obj;
        else console.log("Object " + objName + "Not Found!");
        return obj;
    }

    //-------------- set, clear outline ---------------------
    // rgbColor: [255,0,255] -> 모든 Object의 Outline에 일괄 적용됨
    exports.SetOutline = function (objName, groupName) {
        var obj = fn_GetObject(objName, groupName);
        if (obj) {
            m_scenes.set_outline_color([1, 0, 0]);
            m_scenes.apply_outline_anim(obj, 1, 1, 0);
        }
    }

    exports.ClearOutline = function (objName, groupName) {
        var obj = fn_GetObject(objName, groupName);
        if (obj) m_scenes.clear_outline_anim(obj);
    }

    //-------------anchor 관련내용-------------------------

    // show DOM anchors
    exports.ShowAllAnchors = function () {
        var b4w_anchors = document.querySelectorAll("div.b4w_anchor");

        for (var i = b4w_anchors.length; i--;)
            b4w_anchors[i].className = "b4w_anchor";
        exports.Resize();
    }

    // hide DOM anchors
    exports.HideAllAnchors = function () {
        var b4w_anchors = document.querySelectorAll("div.b4w_anchor");

        for (var i = b4w_anchors.length; i--;)
            b4w_anchors[i].className = "b4w_anchor hidden";

        fn_HideOpenedAnchorsDescr();
    }

    // show annotation of an object
    exports.ShowAnnotation = function (objName, descHtml) {
        var annotationElemId = "Annotation_" + objName;
        document.getElementById(annotationElemId).className = "b4w_anchor";

        if (descHtml) {
            $("#" + annotationElemId).find("div span p").html(descHtml);
        }
        exports.Resize();
    }

    // hide annotation of an object
    exports.HideAnnotation = function (objName) {
        var annotationElemId = "Annotation_" + objName;
        document.getElementById(annotationElemId).className = "b4w_anchor hidden";
    }

    // create anchors
    exports.CreateAnchors = function (defaultDescHtml, options, optionalAnchorList) {

        var empty_objs = m_scenes.get_all_objects("EMPTY");

        var width = options.width;
        var height = options.height;
        for (var i = empty_objs.length; i--;) {
            var empty_obj = empty_objs[i];

            if (m_anchors.is_anchor(empty_obj)) {
                var elem_id = m_anchors.get_element_id(empty_obj);
                var elem = document.getElementById(elem_id);

                if (elem && elem.className == "b4w_anchor hidden") {
                    elem.setAttribute("group", m_scenes.get_object_name_hierarchy(empty_obj)[0]);

                    // elem contains anchor name
                    var anch_span_text = document.createElement("span");
                    elem.appendChild(anch_span_text);

                    // elem contains anchor description
                    var anch_div = document.createElement("div");
                    // elem contains anchor description text
                    var anch_desc_span_text = document.createElement("span");

                    if (optionalAnchorList) {
                        var defaultAnchorBoolean = true;
                        $.each(optionalAnchorList, function (i, v) {

                            if (v.name == elem_id) {
                                anch_desc_span_text.appendChild(fn_GenerateAnnotation(v.descHtml));
                                defaultAnchorBoolean = false;
                                return false;
                            }
                        });
                        if (defaultAnchorBoolean) {
                            anch_desc_span_text.appendChild(fn_GenerateAnnotation(defaultDescHtml));
                        }
                    }
                    else anch_desc_span_text.appendChild(fn_GenerateAnnotation(defaultDescHtml));

                    anch_div.appendChild(anch_desc_span_text);
                    elem.appendChild(anch_div);

                    elem.addEventListener("click", function (e) {
                        e.stopPropagation();
                        anchor_name = e.currentTarget.id;
                        var opened_anch_desc = document.querySelectorAll("div.b4w_anchor>div[style]");

                        for (var i = opened_anch_desc.length; i--;) {
                            var opened_anch_desc_item = opened_anch_desc[i];
                            var item_parent = opened_anch_desc_item.parentNode;

                            if (item_parent != this) {
                                item_parent.style.backgroundColor = "rgba(0, 107, 202, 0.7)";
                                item_parent.style.zIndex = 0;
                                item_parent.firstElementChild.style.display = "";
                                opened_anch_desc_item.style.display = "";
                            }
                        }

                        var parent = this;
                        var first_child = parent.firstElementChild;
                        var last_child = parent.lastElementChild;

                        if (last_child.style.display == "block") {
                            parent.style.backgroundColor = "rgba(0, 107, 202, 0.7)";
                            parent.style.zIndex = 0;

                            first_child.style.display = "";
                            last_child.style.display = "";

                            $(document).trigger("anchor_hide");
                        } else {
                            last_child.style.visibility = "hidden";
                            last_child.style.display = "block";
                            first_child.style.display = "none";
                            parent.style.backgroundColor = "rgba(0, 107, 202, 0.0)";

                            var child_rect = last_child.getBoundingClientRect();
                            var parent_rect = parent.getBoundingClientRect();

                            $(last_child).width("");
                            $(last_child).height("");
                            last_child.style.visibility = "";
                            //var tempVisibility = last_child.style.visibility;
                            var child_child = last_child.firstElementChild;

                            //child_child.style.visibility = "hidden";
                            var optionalHeight = checkAnchorName(anchor_name);
                            if (optionalHeight) {
                                m_app.css_animate(last_child, "width",
                                    parent_rect.width,
                                    width || $(last_child).width() + 30,
                                    200, "", "px");
                                m_app.css_animate(last_child, "height",
                                    parent_rect.height,
                                    optionalHeight || $(last_child).height() + Number($(last_child).css("padding-top").replace("px", ""))
                                    + Number($(last_child).css("padding-bottom").replace("px", "")),
                                    200, "", "px", function () {
                                        child_child.style.display = "";

                                    });
                            }
                            else {
                                m_app.css_animate(last_child, "width",
                                    parent_rect.width,
                                    //child_rect.width - 30,
                                    //300,
                                    width || $(last_child).width() + 30,
                                    200, "", "px");
                                m_app.css_animate(last_child, "height",
                                    parent_rect.height,
                                    //child_rect.height - 30,
                                    //100,
                                    height || $(last_child).height() + Number($(last_child).css("padding-top").replace("px", ""))
                                    + Number($(last_child).css("padding-bottom").replace("px", "")),
                                    200, "", "px", function () {
                                        //child_child.style.visibility = "";
                                        child_child.style.display = "";

                                    });


                            }
                            child_child.style.display = "none";
                            parent.style.zIndex = 10;
                            //debugger;
                            //$(window).resize();

                            $(document).trigger("anchor_click", [anchor_name]);

                            AnchorCameraAnimation(anchor_name);
                        }
                    })
                }
            }
        }

        document.removeEventListener("click", fn_HideOpenedAnchorsDescr);
        document.addEventListener("click", fn_HideOpenedAnchorsDescr);
    }

    exports.CreateDescAnchors = function (name, options) {
        options = options || {};
        var defaultDescHtml = options.defaultDescHtml || "";
        var width = options.width || "";
        var height = options.height || "";
        var padding = options.padding || "";
        var empty_objs = null;
        if (name == null) {
            empty_objs = m_scenes.get_all_objects("EMPTY");
        } else {
            empty_objs = m_scenes.get_object_by_name(name);
        }
        for (var i = empty_objs.length; i--;) {
            var empty_obj = empty_objs[i];

            if (m_anchors.is_anchor(empty_obj)) {
                var elem_id = m_anchors.get_element_id(empty_obj);
                var elem = document.getElementById(elem_id);

                if (elem && elem.className == "b4w_anchor hidden") {
                    elem.setAttribute("group", m_scenes.get_object_name_hierarchy(empty_obj)[0]);

                    // elem contains anchor name
                    //var anch_span_text = document.createElement("span");
                    //elem.appendChild(anch_span_text);

                    // elem contains anchor description
                    var anch_div = document.createElement("div");
                    // elem contains anchor description text
                    var anch_desc_span_text = document.createElement("span");
                    anch_desc_span_text.appendChild(fn_GenerateAnnotation(defaultDescHtml));
                    anch_div.appendChild(anch_desc_span_text);
                    elem.appendChild(anch_div);
                    $(anch_div).height(height);
                    $(anch_div).width(width);
                    $(anch_div).css("padding", padding);
                    $(anch_div).show();
                }
            }
        }

    }

    // generate annotation for the equipment
    function fn_GenerateAnnotation(descHtml) {
        var docfrag = document.createDocumentFragment();
        var p = document.createElement("p");
        p.innerHTML = descHtml;
        docfrag.appendChild(p);
        return docfrag;
    }

    // hide opened anchor description
    function fn_HideOpenedAnchorsDescr() {
        $(document).trigger("anchor_hide");

        var opened_anch_desc = document.querySelectorAll("div.b4w_anchor>div[style]");

        for (var i = opened_anch_desc.length; i--;) {
            var parent = opened_anch_desc[i].parentNode;

            parent.style.backgroundColor = "rgba(0, 107, 202, 0.7)";
            parent.style.zIndex = "0";

            parent.firstElementChild.style.display = "";

            opened_anch_desc[i].style.display = "";
        }
    }
    //-------------anchor 관련내용 end-------------------------

    //-------------- play, stop animation ---------------------
    exports.AnimationPlay = function (objName, groupName) {
        var obj = fn_GetObject(objName, groupName);
        if (obj) {
            m_animation.play(obj);
        }
    }

    exports.AnimationStop = function (objName, groupName) {
        var obj = fn_GetObject(objName, groupName);
        if (obj) {
            m_animation.stop(obj);
        }
    }

    //--------------- camera setting ---------------------------

    exports.SetCamera = function (cameraSettingValue) { // 기본 카메라 설정
        m_app.enable_camera_controls();

        var camobj = m_scenes.get_active_camera();
        m_cam.target_set_trans_pivot(camobj, cameraSettingValue.default_position, cameraSettingValue.default_pivot);
        m_cam.target_set_distance_limits(camobj, cameraSettingValue.default_distance_limits);
        m_cam.target_set_horizontal_limits(camobj, cameraSettingValue.default_horizontal_limits);
        m_cam.target_set_vertical_limits(camobj, cameraSettingValue.default_vertical_limits);
    }

    exports.CurrentCamera = function () {
        var dest = new Float32Array(3);
        var dest2 = new Float32Array(3);
        var camobj = m_scenes.get_active_camera();
        m_cam.get_translation(camobj, dest);
        m_cam.target_get_pivot(camobj, dest2);
        console.log("Position [" + dest[0] + ", " + dest[1] + ", " + dest[2] + "]");
        console.log("Pivot [" + dest2[0] + ", " + dest2[1] + ", " + dest2[2] + "]");
    }



    //--------------------------------Anchor Camera Animation----------------
    function AnchorCameraAnimation(anchorName) {
        if (typeof anchorCameraAnimation == "function") {
            anchorCameraAnimation(anchorName);
        }
    }

    function checkAnchorName(anchorName) {
        if (typeof checkOptionalAnchor == "function") {
            return checkOptionalAnchor(anchorName);
        }
        return null;
    }


});
window.B4W_Helper = b4w.require("b4wHelper");