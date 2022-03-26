var monster = {
        set: function(a, b, c, d, e) {
            var f = new Date,
                g = "",
                h = typeof b,
                i = "",
                j = "";
            if (d = d || "/", c && (f.setTime(f.getTime() + 1e3 * 60 * 60 * 24 * c), g = "; expires=" + f.toUTCString()), "object" === h && "undefined" !== h) {
                if (!("JSON" in window)) throw "Bummer, your browser doesn't support JSON parsing.";
                i = JSON.stringify({
                    v: b
                })
            } else i = encodeURIComponent(b);
            e && (j = "; secure"), document.cookie = a + "=" + i + g + "; path=" + d + j
        },
        get: function(a) {
            for (var b = a + "=", c = document.cookie.split(";"), d = "", e = "", f = {}, g = 0; g < c.length; g++) {
                for (var h = c[g];
                    " " == h.charAt(0);) h = h.substring(1, h.length);
                if (0 === h.indexOf(b)) return d = h.substring(b.length, h.length), e = d.substring(0, 1), "{" == e && (f = JSON.parse(d), "v" in f) ? f.v : "undefined" == d ? void 0 : decodeURIComponent(d)
            }
            return null
        },
        remove: function(a) {
            this.set(a, "", -1)
        },
        increment: function(a, b) {
            var c = this.get(a) || 0;
            this.set(a, parseInt(c, 10) + 1, b)
        },
        decrement: function(a, b) {
            var c = this.get(a) || 0;
            this.set(a, parseInt(c, 10) - 1, b)
        }
    },
    Environment = function() {
        "use strict";
        var a = {},
            b = 32,
            c = 7,
            d = window,
            e = d.navigator,
            f = e.userAgent.toLowerCase(),
            g = e.appVersion.toLowerCase(),
            h = e.platform,
            i = d.chrome || /chrome/.test(f),
            j = i ? parseInt(g.match(/chrome\/(\d+)\./)[1], 10) : null,
            k = !i && f.indexOf("firefox") >= 0,
            l = !k && !i && Object.prototype.toString.call(d.HTMLElement).indexOf("Constructor") > 0,
            m = l ? parseInt(g.match(/version\/(\d+)\./)[1], 10) : null;
        a.LOCAL = d.location.hostname.indexOf("local") >= 0, a.STAGING = d.location.hostname.indexOf("micatest.com") >= 0, a.OSX = /mac os x/.test(f) || "MacIntel" == h, a.WINDOWS = 0 === h.indexOf("Win"), a.OLD_CHROME = i && b > j, a.SAFARI_7 = l && m >= c, a.WEBKIT = i || a.SAFARI_7, a.FIX_CHROME_CSSOM = j >= 33, a.SUPPORTED = a.WEBKIT;
        var n = function() {
            var a = document.body;
            if (!a) return 0;
            var b = document.createElement("div"),
                c = document.createElement("div"),
                d = [b, c],
                e = !1,
                f = 0;
            return d.forEach(function(d) {
                var g = d.style;
                g.position = "absolute", g.width = "100px", g.height = "100px", g.overflow = "scroll", g.top = "-9999px", d === c && (d.className = "kit-scrollbar"), a.appendChild(d);
                var h = d.offsetWidth - d.clientWidth;
                d === b && h > 0 ? e = !0 : d === c && (f = h), a.removeChild(d)
            }), {
                visible: e,
                width: f
            }
        }();
        return a.SCROLLBAR_WIDTH = n.width, a.SCROLLBAR_VISIBLE = n.visible, a.PREFIX_TRANSFORM = function() {
            var a = document.createElement("div"),
                b = a.style,
                c = "scale(1.1)";
            return b.cssText = "-webkit-transform: " + c + "; transform: " + c + ";", "" + b.transform == c ? !1 : "" + b.webkitTransform == c
        }(), a.DETAILS = {
            chrome: i,
            chromeV: j,
            firefox: k,
            safari: l,
            safariV: m,
            userAgent: f,
            appVersion: g
        }, a.isZoomed = function() {
            var a = d.outerWidth,
                b = d.innerWidth;
            if (1 === b) return !1;
            var c = a / b;
            return c > 1.07 || .93 > c
        }, a
    }(),
    Preloader = function() {
        "use strict";

        function a(a) {
            return document.getElementById(a)
        }

        function b() {
            var a = parseInt(monster.get(i) || -1, 10) + 1;
            return a >= l.length ? a = c(0, l.length - 1) : monster.set(i, a, 365), l[a]
        }

        function c(a, b) {
            return null == b && (b = a, a = 0), a + Math.floor(Math.random() * (b - a + 1))
        }
        var d, e, f, module = {}, h = "preloader", i = "wf_protip", j = "pro", k = "fun";

        module.init = function () {
        	document.documentElement.setAttribute('data-siteid', sessionStorage.getItem('projectId'));
        	document.documentElement.setAttribute('data-sitename', sessionStorage.getItem('projectName'));
        	document.documentElement.setAttribute('data-pageid', sessionStorage.getItem('pageId'));

            d = a(h), e = a(h + "-message"), f = a(h + "-bar")
        };
        module.update = function (a, b) {
            f && (f.style.width = a + "%", b && (e.innerHTML = b))
        };
        module.destroy = function () {
            var a = $(d);
            a.addClass("inactive"), tram(a).add("opacity 0.6s ease-out").start({
                opacity: 0
            }).then(function () {
                a.addClass("hidden"), _.defer(function () {
                    a.remove()
                }, 5e3)
            })
        };
        module.nextProtip = function () {
            var c = b(),
                d = c.type == k,
                e = c.msg,
                f = Environment.OSX;
            e = e.replace(/\{\{Cmd\}\}/g, f ? "Command" : "Ctrl").replace(/\{\{Alt\}\}/g, f ? "Option" : "Alt"), a("protip-intro").innerHTML = d ? "Fun Fact" : "Pro Tip", a("protip-message").innerHTML = e
        };
        var l = [{
            type: j,
            msg: "You can easily delete elements on the page by pressing the <kbd>Delete</kbd> key on your keyboard."
        }, {
            type: j,
            msg: "You can unselect an element by pressing the <kbd>Esc</kbd> key on your keyboard."
        }, {
            type: j,
            msg: "You can navigate between elements using the arrow keys. Press <kbd>��</kbd> to select the parent element, <kbd>��</kbd> to move down to the first child, and <kbd>��</kbd> <kbd>��</kbd> to move between siblings."
        }, {
            type: j,
            msg: "You can copy and paste elements in Mica by using the keyboard shortcuts <kbd>{{Cmd}}</kbd><kbd>C</kbd> (to copy) and <kbd>{{Cmd}}</kbd><kbd>V</kbd> (to paste)."
        }, {
            type: j,
            msg: "You can easily switch between Mica panels by pressing <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd> <kbd>F</kbd> <kbd>G</kbd> on your keyboard."
        }, {
            type: j,
            msg: "The forms that you build in Mica work end-to-end. We��ll capture and store them for you so you don��t have to."
        }, {
            type: j,
            msg: "Mica will save versions automatically for you, but you can also initiate a Save manually by pressing <kbd>{{Cmd}}</kbd><kbd>S</kbd>."
        }, {
            type: j,
            msg: "You can save a new version with a specific name by pressing <kbd>{{Cmd}}</kbd><kbd>Shift</kbd><kbd>S</kbd>."
        }, {
            type: j,
            msg: "By holding <kbd>{{Alt}}</kbd> when editing margin/padding, you can affect opposite sides at the same time (top/bottom or left/right)."
        }, {
            type: j,
            msg: "By holding <kbd>Shift</kbd> when editing margin/padding, you can affect all sides equally at the same time (top/bottom/left/right)."
        }, {
            type: k,
            msg: "Mica has more than 30 premium templates in the Template Marketplace. Check them out!"
        }, {
            type: k,
            msg: "The entire Mica.com website was made entirely in Mica. Same goes for all of our other support and marketing pages!"
        }, {
            type: k,
            msg: 'Your site can be featured on our Gallery page by tweeting <a href="https://twitter.com/home?status=Check" target="_blank">#MadeInmica</a> with your website link.'
        }, {
            type: j,
            msg: "You can collaborate with your colleagues with the Mica Team Plans."
        }, {
            type: j,
            msg: 'Creating a <a href="http://help.mica.com/sharing-your-public-mica-site-link" target="_blank">Public Link</a> is the best way to get feedback and support on your site from the Mica community.'
        }, {
            type: j,
            msg: "You can link to different parts of your page by adding a Unique ID to your section in the Settings Panel."
        }, {
            type: j,
            msg: "You can add labels to your separate forms to differentiate them when you receive form submissions."
        }, {
            type: j,
            msg: "You can add any font from Google Webfonts to be used on your Mica site. Just go to your site��s settings page to configure it."
        }, {
            type: j,
            msg: "Host your site for free on the Mica subdomain. Publish once, and it will work everywhere."
        }, {
            type: j,
            msg: "You can add custom fonts in seconds. Just upload them in the site settings and start designing with your favorite typeface."
        }];
        return module;
    }();
Preloader.init();