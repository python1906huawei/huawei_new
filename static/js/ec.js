ec.debug = false;
ol.load.define("jquery", [{
    mark: "jquery",
    uri: "base/jquery-1.4.4.min.js",
    type: "js"
}]);
ol.load.define("jquery.form", ["jquery", {
    mark: "jquery.form",
    uri: "base/jquery.form-2.49.js",
    type: "js",
    charset: "utf-8",
    depend: true
}]);
ol.load.define("jquery.bgiframe", [{
    mark: "jquery.bgiframe",
    uri: "base/jquery.bgiframe.min.js",
    type: "js",
    charset: "utf-8",
    depend: true,
    loadType: "lazy"
}]);
ol.load.define("jquery.autocomplete", [{
    mark: "jquery.autocomplete",
    uri: "https://res9.vmallres.com/shopdc/cdn/modules/nav-home/pc/js/jquery.autocomplete.hack-min.js",
    type: "js",
    charset: "utf-8",
    depend: true
}]);
ol.load.define("My97DatePicker", [{
    mark: "My97DatePicker",
    uri: "My97DatePicker/WdatePicker.js",
    type: "js",
    charset: "utf-8",
    depend: false,
    onload: function() {
        WdatePicker()
    }
}]);
ol.load.define("jquery.movebar", [{
    uri: "jquery.movebar/movebar.min.js",
    type: "js"
}]);
ol.load.define("ec.aes", [{
    uri: "aes/aes.js",
    type: "js",
    depend: true
}, {
    uri: "aes/aesUtil.js",
    type: "js",
    depend: true
}, {
    uri: "aes/pbkdf2.js",
    type: "js",
    depend: true
}]);
ol.load.define("ec.dh", [{
    uri: "dh/bigInt.min.js",
    type: "js",
    depend: true
}]);
ol.load.define("ec.rc4", [{
    uri: "crypt/rc4.js",
    type: "js",
    depend: true
}]);
ol.load.define("uploadify", ["jquery", "swfobject", {
    uri: "uploadify/jquery.uploadify.v2.1.4.min.js",
    type: "js",
    depend: true
}, {
    uri: "uploadify/uploadify.customize.css",
    type: "css"
}]);
ol.load.define("ec.pager", ["jquery", {
    uri: "ec.pager/pager-min.js",
    type: "js",
    charset: "gbk",
    depend: true
}]);
ol.load.define("ajax", ["jquery.form", {
    mark: "ajax",
    uri: "base/ajax.js",
    type: "js",
    charset: "utf-8",
    depend: true
}]);
ol.load.define("ajaxcdr", ["jquery.form", {
    mark: "ajaxcdr",
    uri: "base/ajaxcdr.js?20121031",
    type: "js",
    charset: "utf-8",
    depend: true
}]);
ol.load.define("ec.box", ["jquery", {
    mark: "jquery.bgiframe",
    uri: "base/jquery.bgiframe.min.js",
    type: "js",
    charset: "utf-8",
    depend: true,
    loadType: null
}, {
    uri: "ec.box/box-min.js",
    type: "js",
    depend: true
}]);
ol.load.define("ec.tab", ["jquery", {
    uri: "ec.tab/tab-min.js",
    type: "js",
    charset: "utf-8",
    depend: true
}]);
ol.load.define("jquery.float", ["jquery", {
    uri: "jquery.float/float.min.js",
    type: "js",
    charset: "gbk",
    depend: true
}]);
ol.load.define("cloud-zoom", [{
    uri: "cloud-zoom.1.0.2/cloud-zoom.1.0.2-hack-min.js",
    type: "js"
}]);
ol.load.define("jqzoom", ["jquery", {
    uri: "jqzoom-2.3/js/jquery.jqzoom-core.js",
    type: "js",
    depend: true
}, {
    uri: "jqzoom-2.3/css/jquery.jqzoom.css",
    type: "css"
}]);
ol.load.define("RaterStar", [{
    uri: "RaterStar/rater-star.js",
    type: "js"
}]);
ol.load.define("ec.slider", [{
    uri: "ec.slider/slider-min.js",
    type: "js"
}]);
ol.load.define("ec.linkSelect.region", ["jquery", {
    uri: "linkSelect/region-min.js?20161011",
    type: "js",
    charset: "utf-8",
    depend: true
}]);
ol.load.define("ec.md5", [{
    uri: "md5/md5-min.js",
    type: "js"
}]);
ol.load.define("jquery.rotate", ["jquery", {
    uri: "jquery.rotate/jQueryRotate-min.js",
    type: "js"
}]);
ol.load.define("jquery.fixed", ["jquery", {
    uri: "jquery.fixed/fixed.js",
    type: "js"
}]);
ol.load.define("ec.XSSUtils", [{
    uri: "/aes/XSSUtils.min.js",
    type: "js",
    charset: "utf-8",
    depend: true,
    loadType: null
}, {
    uri: "/aes/esapi.js",
    type: "js",
    charset: "utf-8",
    depend: true,
    loadType: null
}, {
    uri: "/aes/resources/Base.esapi.properties.min.js",
    type: "js",
    charset: "utf-8",
    depend: true,
    loadType: null
}]);
if (jQuery) {
    ol._setLoadStatus("jquery", "complete")
}
window._gaq = window._gaq || [];
_gaq.push(["_setAccount", (ec.debug ? "" : "UA-28046633-2"), "t1"]);
var _hmt = _hmt || [];
var _paq = _paq || [];
var _zpq = _zpq || [];
var bindBox;
window._bd_share_config = {};
ec.code = {
    addShare: function(options) {
        options = $.extend({
            jsUrl: scriptPath + "/static/api/js/share.js?v=89860593.js"
        }, options);
        window._bd_share_config = options;
        ec.ready(function() {
            with(document) {
                0[(getElementsByTagName("head")[0] || body).appendChild(createElement("script")).src = options.jsUrl]
            }
        })
    },
    addAnalytics: function(c) {
        c = c || {
            google: true,
            cnzz: true,
            baidu: true,
            click99: true,
            hicloud: true,
            suning: true,
            operate: false,
            dmp: false
        };
        var f = ["/payment/alipay/returnURL", "/order/feedBack"],
            b = location.href;
        for (var d = 0; d < f.length; d += 1) {
            if (b.indexOf(f[d]) > 0) {
                return
            }
        }
        _gaq.push(["_trackPageview"]);
        _gaq.push(["_trackPageLoadTime"]);
        _gaq.push(["_addOrganic", "baidu", "word"]);
        _gaq.push(["_addOrganic", "baidu", "kw"]);
        _gaq.push(["_addOrganic", "opendata.baidu", "wd"]);
        _gaq.push(["_addOrganic", "zhidao.baidu", "word"]);
        _gaq.push(["_addOrganic", "news.baidu", "word"]);
        _gaq.push(["_addOrganic", "post.baidu", "kw"]);
        _gaq.push(["_addOrganic", "tieba.baidu", "kw"]);
        _gaq.push(["_addOrganic", "mp3.baidu", "word"]);
        _gaq.push(["_addOrganic", "image.baidu", "word"]);
        _gaq.push(["_addOrganic", "top.baidu", "word"]);
        _gaq.push(["_addOrganic", "news.google", "q"]);
        _gaq.push(["_addOrganic", "soso", "w"]);
        _gaq.push(["_addOrganic", "image.soso", "w"]);
        _gaq.push(["_addOrganic", "music.soso", "w"]);
        _gaq.push(["_addOrganic", "post.soso", "kw"]);
        _gaq.push(["_addOrganic", "wenwen.soso", "sp"]);
        _gaq.push(["_addOrganic", "post.soso", "kw"]);
        _gaq.push(["_addOrganic", "3721", "name"]);
        _gaq.push(["_addOrganic", "114", "kw"]);
        _gaq.push(["_addOrganic", "youdao", "q"]);
        _gaq.push(["_addOrganic", "vnet", "kw"]);
        _gaq.push(["_addOrganic", "sogou", "query"]);
        _gaq.push(["_addOrganic", "news.sogou", "query"]);
        _gaq.push(["_addOrganic", "mp3.sogou", "query"]);
        _gaq.push(["_addOrganic", "pic.sogou", "query"]);
        _gaq.push(["_addOrganic", "blogsearch.sogou", "query"]);
        _gaq.push(["_addOrganic", "gougou", "search"]);
        var g = (b.indexOf("/product/678.html") > 0) ? true : false;
        _zpq.push(["_setPageID", (!g) ? "100" : "101"]);
        _zpq.push(["_setPageType", (!g) ? "home" : "honor3"]);
        _zpq.push(["_setParams", ""]);
        _zpq.push(["_setAccount", "95"]);
        if (c.google) {
            ec.load({
                url: "https://www.google-analytics.com/ga.js",
                type: "js",
                loadType: "lazy"
            })
        }
        if (c.baidu) {
            ec.load({
                url: "https://hm.baidu.com/h.js?a08b68724dd89d23017170634e85acd8",
                type: "js",
                loadType: "lazy"
            })
        }
        if (c.cnzz) {
            ec.load({
                url: "https://s95.cnzz.com/stat.php?id=4754392&web_id=4754392",
                type: "js",
                loadType: "lazy"
            })
        }
        if (c.suning) {
            ec.load({
                url: "https://cdn.zampda.net/s.js",
                type: "js",
                loadType: "lazy"
            })
        }
        if (c.hicloud) {
            _paq.push(["setTrackerUrl", "https://datacollect.vmall.com:18443/webv1"]);
            var a = ((ec.order && ec.order.orderCode) ? ec.order.orderCode : "") + "";
            _paq.push(["setSiteId", "www.vmall.com"]);
            _paq.push(["setCustomVariable", 1, "cid", (ec.util.cookie.get("cps_id") || ""), "page"]);
            _paq.push(["setCustomVariable", 2, "direct", (ec.util.cookie.get("cps_direct") || ""), "page"]);
            _paq.push(["setCustomVariable", 3, "orderid", a, "page"]);
            _paq.push(["setCustomVariable", 4, "wi", (ec.util.cookie.get("cps_wi") || ""), "page"]);
            _paq.push(["setCustomVariable", 1, "uid", ((ec.util.cookie.get("uid") ? ec.util.cookie.get("uid") : "") || ""), "visit"]);
            _paq.push(["setCustomVariable", 10, "uid", ((ec.util.cookie.get("uid") ? ec.util.cookie.get("uid") : "") || ""), "visit"]);
            _paq.push(["trackPageView"]);
            ec.load({
                url: "https://res.vmallres.com/bi/hianalytics.js",
                type: "js",
                loadType: "lazy"
            });
            ec.util.cookie.set("cps_direct", null, {
                expires: -1,
                domain: ".vmall.com"
            })
        }
        if (c.operate) {
            _paq.push(["setTrackerUrl", "https://datacollect.vmall.com:18443/webv1"]);
            var a = ((ec.order && ec.order.orderCode) ? ec.order.orderCode : "") + "";
            _paq.push(["setSiteId", "www.vmall.com"]);
            _paq.push(["setCustomVariable", 1, "cid", (ec.util.cookie.get("cps_id") || ""), "page"]);
            _paq.push(["setCustomVariable", 2, "direct", (ec.util.cookie.get("cps_direct") || ""), "page"]);
            _paq.push(["setCustomVariable", 3, "orderid", a, "page"]);
            _paq.push(["setCustomVariable", 4, "wi", (ec.util.cookie.get("cps_wi") || ""), "page"]);
            _paq.push(["setCustomVariable", 1, "uid", ((ec.util.cookie.get("uid") ? ec.util.cookie.get("uid") : "") || ""), "visit"]);
            _paq.push(["setCustomVariable", 10, "uid", ((ec.util.cookie.get("uid") ? ec.util.cookie.get("uid") : "") || ""), "visit"]);
            var e = "";
            e = ec.code.convertFormat(c.optype, c.skuIds, c.bundleIds, c.custSkuIds, c.custBundleIds);
            _paq.push(["setCustomVariable", 10, "cart", e, "page"]);
            _paq.push(["trackGoal", 1])
        }
        if (c.dmp) {
            ec.load({
                url: "https://nebula-collector.huawei.com/api/2.0/vmallcn-min.js",
                type: "js",
                loadType: "lazy"
            })
        }
    }
};
ec.code.convertFormat = function(i, g, c, d, b) {
    var f = "";
    var j = [];
    var a = [];
    var e = [];
    var h = [];
    if (ec.util.isArray(g)) {
        j = $.map(g, function(k) {
            return "1_" + k
        })
    }
    if (ec.util.isArray(c)) {
        a = $.map(c, function(k) {
            return "0_" + k
        })
    }
    if (ec.util.isArray(d)) {
        e = $.map(d, function(k) {
            return "3_" + k
        })
    }
    if (ec.util.isArray(b)) {
        h = $.map(b, function(k) {
            return "2_" + k
        })
    }
    j = a.concat(j, h, e);
    f = i + "," + j.join(":");
    return f
};
ec.code.saveCpsInfoToCookie = function() {
    var c = ec.code.getCPSInfoFromUrlRegex(location.href, "cid");
    var b = ec.code.getCPSInfoFromUrlRegex(location.href, "wi");
    if (c.length < 0 || c.lenght > 11) {
        return
    }
    var a = /^\d+$/;
    if (!a.test(c)) {
        return
    }
    ec.util.cookie.set("cps_wi", null, {
        expires: -1,
        domain: ".vmall.com"
    });
    ec.util.cookie.set("cps_id", c, {
        expires: 1,
        domain: ".vmall.com"
    });
    ec.util.cookie.set("cps_direct", "1", {
        expires: 1,
        domain: ".vmall.com"
    });
    if (b.length > 0 && b.length < 200) {
        ec.util.cookie.set("cps_wi", b, {
            expires: 1,
            domain: ".vmall.com"
        })
    }
};
ec.code.getCPSInfoFromUrlRegex = function(c, b) {
    var d = new RegExp("(^|&)" + b + "=([^&]*)(&|$)", "i");
    var c = window.location.href;
    var e;
    if (c.indexOf("#") != -1) {
        e = c.substr(c.indexOf("#"))
    } else {
        e = window.location.search
    }
    var a = e.substr(1).match(d);
    if (a != null) {
        return unescape(a[2])
    }
    return ""
};
ec.code.getCPSInfoFromUrl = function(b, c) {
    if (b.indexOf("#") == -1 || b.indexOf(c + "=") == -1) {
        return ""
    }
    var a = b.substring(b.indexOf("#") + 1);
    var k = a.split("#");
    for (var f = 0; f < k.length; f++) {
        var m = k[f];
        var l = m.split("&");
        var h, g, d;
        for (var e = 0; e < l.length; e++) {
            h = l[e].indexOf("=");
            if (h == -1) {
                continue
            }
            g = l[e].substring(0, h);
            d = l[e].substring(h + 1);
            if (g == c) {
                return unescape(d.replace(/\+/g, " "))
            }
        }
    }
    return ""
};
ec.code.addService = function(a) {
    ec.load("jquery.float", {
        loadType: "lazy",
        callback: function() {
            if (a.showService) {
                var f = window.location.href;
                var e = f.indexOf("/product/");
                var d = "";
                var c = "";
                if (e > 0) {
                    d = f.substring(e + 9, f.length);
                    if (d.length > 1) {
                        var h = d.split(".html", 2);
                        if (h.length > 1) {
                            c = h[0];
                            var i = h[1];
                            if (i.indexOf("#") >= 0) {
                                var g = i.split("#", 2)[1];
                                var b = (g.length > 0) ? (g.split(",", 2)[0] || 0) : 0;
                                if (b != 0) {
                                    c = c + "," + b
                                }
                            }
                        }
                    }
                }
                $("#tools-nav-service-robotim").attr("href", a.live800Url4Web + "\x26enterurl\x3d" + encodeURIComponent(window.location.href) + "\x26k\x3d1\x26remark\x3d" + encodeURIComponent(c)).css("display", "block");
                $("#tools-nav-service-robotim-button").attr("href", a.live800Url4Web + "\x26enterurl\x3d" + encodeURIComponent(window.location.href) + "\x26k\x3d1\x26remark\x3d" + encodeURIComponent(c)).css("display", "block")
            }
            if (a.showTools) {
                $("#tools-nav-survery").css("display", "block")
            }
            if (a.showService || a.showTools) {
                $("#tools-nav").css("bottom", "10px").show()
            }
        }
    })
};
(function() {
    ec.code.saveCpsInfoToCookie();
    var a, b = function() {
        if (a) {
            return a
        }
        a = _gat._createTracker((ec.debug ? "" : "UA-28046633-3"), "t2");
        return a
    };
    ec.track = function(e, d) {
        d = d || 3;
        try {
            if (window._gat && window._gat._createTracker) {
                if ("[object Array]" == Object.prototype.toString.apply(e)) {
                    e = e.join("/")
                }
                b()._trackPageview(e);
                log("Track", e)
            } else {
                if (d > 0) {
                    setTimeout(function() {
                        ec.track(e, d - 1)
                    }, 1000)
                }
            }
        } catch (f) {
            throw f
        }
    };
    ec.trackEvent = function(f, g, e, i, d) {
        d = d || 3;
        try {
            if (window._gat && window._gat._createTracker) {
                b()._trackEvent(f, g, e, i);
                log("TrackEvent", f + " : " + g)
            } else {
                if (d > 0) {
                    setTimeout(function() {
                        ec.trackEvent(f, g, e, i, d - 1)
                    }, 1000)
                }
            }
        } catch (h) {
            throw h
        }
    }
})();
(function() {
    var b = ec.util.cookie.get("cps_source"),
        a = ec.util.cookie.get("cps_channel"),
        c = ec.util.cookie.get("cps_direct");
    ec.trackCPS = function(d, e) {
        if (b && a) {
            ec.track(["/cps/event", d, b + "/" + a, e])
        }
    };
    if (b && a && c) {
        ec.ready(function() {
            ec.track("/cps/pv/" + b + "/" + a + location.pathname)
        })
    }
})();
ec.track99click = function(b) {
    var d;
    if (typeof(b) == "string") {
        d = b
    } else {
        var e = [],
            a;
        for (var c in b) {
            a = b[c];
            e.push(c + "=" + (ec.util.isArray(a) ? a.join(";") : a))
        }
        d = e.join("&")
    }
    ec.track99click._ozuid = ec.account.id;
    ec.track99click._ozprm = d
};
ec.pkg("ec.binding");
ec.binding.login = function() {
    var a = ec.util.cookie.get("optBanding");
    if (a == 0) {
        $.ajax({
            url: domainMain + "/account/isBindedTelephoneOrEmail.json",
            type: "get",
            dataType: "json",
            success: function(b) {
                if (!b.isLogin) {
                    return false
                }
                ec.util.cookie.set("optBanding", 1);
                if (!b.success) {
                    ec.load("ec.box", function() {
                        ec.binding.requestUrl = domainMain + "/account/isBindedTelephoneOrEmail.json?t=" + new Date().getTime();
                        ec.binding.upCenterUrl = b.upUserCenter;
                        ec.Cache.get("ecBindingPhone", function() {
                            return new ec.box($("#ec-binding-phone").val(), {
                                boxid: "bindingBox",
                                boxclass: "ol_box_4",
                                showButton: false,
                                onopen: function(c) {
                                    ec.ui.loading.hide();
                                    $("#ec-binding-phone-1").show();
                                    $("#ec-binding-phone-url-1").attr("href", ec.binding.upCenterUrl);
                                    c.setPosition()
                                }
                            })
                        }).open()
                    })
                }
            }
        })
    }
};
ec.binding.cart = function(a) {
    ec.binding.callback = a;
    if (a) {
        ec.ui.loading.show()
    }
    $.ajax({
        url: domainMain + "/account/isBindedTelephoneOrEmailDomain.json?callback=?&t=" + new Date().getTime(),
        async: false,
        dataType: "jsonp",
        jsonp: "callback",
        timeout: "60000",
        success: function(b) {
            if (!b.isLogin) {
                if (a) {
                    a()
                }
                return
            }
            ec.util.cookie.set("optBanding", 1);
            if (!b.success) {
                ec.load("ec.box", function() {
                    ec.binding.requestUrl = domainMain + "/account/isBindedTelephoneOrEmailDomain.json?callback=?&t=" + new Date().getTime();
                    ec.binding.upCenterUrl = b.upUserCenter;
                    ec.Cache.get("ecBindingPhone", function() {
                        return new ec.box($("#ec-binding-phone").val(), {
                            boxid: "bindingBox",
                            boxclass: "ol_box_4",
                            showButton: false,
                            onopen: function(c) {
                                ec.ui.loading.hide();
                                $("#ec-binding-phone-1").show();
                                $("#ec-binding-phone-url-1").attr("href", ec.binding.upCenterUrl);
                                c.setPosition()
                            }
                        })
                    }).open()
                })
            } else {
                if (a) {
                    a()
                }
            }
        }
    })
};
ec.binding.cart.withPhone = function(a) {
    ec.binding.callback = a;
    if (a) {
        ec.ui.loading.show()
    }
    $.ajax({
        url: domainMain + "/account/isBindedPhoneCrossDomain.json?callback=?&t=" + new Date().getTime(),
        async: false,
        dataType: "jsonp",
        jsonp: "callback",
        timeout: "60000",
        success: function(b) {
            if (!b.isLogin) {
                if (a) {
                    a()
                }
                return
            }
            ec.util.cookie.set("optBanding", 1);
            if (!b.success) {
                ec.load("ec.box", function() {
                    ec.binding.requestUrl = domainMain + "/account/isBindedPhoneCrossDomain.json?callback=?&t=" + new Date().getTime();
                    var c = window.location.href;
                    c = c.replace(/\\?isSuccess=0/g, "");
                    ec.binding.upCenterUrl = b.upUserCenter + "&redirect_uri=" + c;
                    ec.binding.upCenterUrl = encodeURI(ec.binding.upCenterUrl);
                    var d = b.state;
                    if (null == d) {
                        alert("\u83b7\u53d6\u670d\u52a1\u5668\u6570\u636e\u5931\u8d25\uff0c\u8bf7\u5237\u65b0\u91cd\u8bd5\uff01");
                        return
                    }
                    if (d == 4) {
                        bindBox = new ec.box($("#ec-binding-phone").val(), {
                            boxid: "bindingBox",
                            boxclass: "ol_box_4",
                            showButton: false,
                            onopen: function(e) {
                                ec.ui.loading.hide();
                                $("#ec-binding-phone-" + d).show();
                                $("#bindEndDate4State4").html(b.upBindEndDate);
                                if (d == 1 || d == 4) {
                                    $("#ec-binding-phone-url-" + d).attr("href", ec.binding.upCenterUrl)
                                }
                                e.setPosition()
                            },
                            onclose: function(e) {
                                if (a) {
                                    a()
                                }
                            }
                        });
                        bindBox.open()
                    } else {
                        bindBox = new ec.box($("#ec-binding-phone").val(), {
                            boxid: "bindingBox",
                            boxclass: "ol_box_4",
                            showButton: false,
                            onopen: function(e) {
                                ec.ui.loading.hide();
                                $("#ec-binding-phone-" + d).show();
                                if (d == 1) {
                                    $("#ec-binding-phone-url-1").attr("href", ec.binding.upCenterUrl)
                                }
                                e.setPosition()
                            }
                        });
                        bindBox.open()
                    }
                })
            } else {
                if (a) {
                    a()
                }
            }
        }
    })
};
ec.binding.isBindedMobileOrEnterpriseUser = function(a) {
    ec.binding.callback = a;
    ec.ui.loading.show();
    $.ajax({
        url: domainMain + "/account/isBindedTelephoneOrEmail.json",
        type: "get",
        dataType: "json",
        success: function(b) {
            if (!b.isLogin) {
                if (a) {
                    a()
                }
                return
            }
            if (!b.success) {
                ec.load("ec.box", function() {
                    ec.binding.requestUrl = domainMain + "/account/isBindedTelephoneOrEmail.json?t=" + new Date().getTime();
                    ec.binding.upCenterUrl = b.upUserCenter;
                    ec.Cache.get("ecBindingPhone", function() {
                        return new ec.box($("#ec-binding-phone").val(), {
                            boxid: "bindingBox",
                            boxclass: "ol_box_4",
                            showButton: false,
                            onopen: function(c) {
                                ec.ui.loading.hide();
                                $("#ec-binding-phone-1").show();
                                $("#ec-binding-phone-url-1").attr("href", ec.binding.upCenterUrl);
                                c.setPosition()
                            }
                        })
                    }).open()
                })
            } else {
                if (a) {
                    a()
                }
            }
        }
    })
};
ec.binding.closeState4 = function() {
    if (null != bindBox) {
        bindBox.close()
    }
};
ec.binding.showOk = function() {
    $(".ec-binding-phone-box").hide();
    $("#ec-binding-phone-2").show();
    $("#ec-binding-phone-url-2").attr("href", ec.binding.upCenterUrl);
    $("#ec-binding-phone-url-3").attr("href", ec.binding.upCenterUrl);
    bindBox.setPosition()
};
ec.binding.resetShow = function() {
    var c = ec.binding.callback;
    var a = window.location.href.match(/\/cart\/cart\.html/g);
    var b = {
        url: ec.binding.requestUrl,
        type: "get",
        async: "false",
        dataType: "json",
        success: function(d) {
            if (!d.success) {
                $("#ec-binding-phone-2").hide();
                $("#ec-binding-phone-3").show();
                ec.Cache.get("ecBindingPhone").setPosition()
            } else {
                ec.Cache.get("ecBindingPhone").close();
                if (c) {
                    c();
                    c = null
                }
            }
        }
    };
    if (a) {
        b.dataType = "jsonp";
        b.jsonp = "callback";
        b.timeout = "60000"
    }
    $.ajax(b)
};
ec.binding.allCount = function() {
    var a = ec.util.cookie.get("vmallOrderCount");
    if (a == 0) {
        $("#li-order span").html("\u6211\u7684\u8ba2\u5355")
    } else {
        if (a > 0) {
            $("#li-order span").html("\u6211\u7684\u8ba2\u5355<em>(" + a + ")</em>")
        } else {
            $("#li-order span").html("\u6211\u7684\u8ba2\u5355<em class='hide'>(0)</em>");
            $.ajax({
                type: "get",
                url: domainMain + "/member/orderCount.json?t=" + new Date().getTime(),
                dataType: "json",
                async: true,
                timeout: 10000,
                success: function(c) {
                    if (!c.success) {
                        return
                    }
                    var b = parseInt(c.orderCount.unpaidOrderCount) + parseInt(c.orderCount.unreceiptOrderCount);
                    b = b ? b : 0;
                    var e = $("#li-order span em").text();
                    var d = e.substring(1, e.length - 1);
                    b = b + parseInt(d);
                    $("#li-order span em").text("(" + b + ")");
                    $("#li-order span em").removeClass("hide");
                    ec.util.cookie.set("vmallOrderCount", b)
                }
            });
            $.ajax({
                type: "get",
                url: domainRemark + "/remark/queryNotRemarkCount.json?queryHis=1&t=" + new Date().getTime(),
                dataType: "jsonp",
                timeout: 10000,
                async: true,
                data: {
                    tab: "nocomment"
                },
                success: function(b) {
                    if (!b.success) {
                        return
                    }
                    var c = parseInt(b.notRemarkCount) + parseInt(b.hisNotRemarkCount);
                    c = c ? c : 0;
                    var e = $("#li-order span em").text();
                    var d = e.substring(1, e.length - 1);
                    c = c + parseInt(d);
                    if (c > 0) {
                        $("#li-order span em").text("(" + c + ")");
                        $("#li-order span em").removeClass("hide")
                    } else {
                        $("#li-order span").text("\u6211\u7684\u8ba2\u5355")
                    }
                    ec.util.cookie.set("vmallOrderCount", c)
                }
            })
        }
    }
};
bindCartResult = function(c) {
    var a = window.location.href;
    a = a.replace(/\?isSuccess=0/g, "").replace(/&isSuccess=0/g, "");
    var b = upBindPhoneAddr.replace(/&amp;/g, "&");
    ec.load("ec.box", function() {
        bindBox = new ec.box($("#" + c).val(), {
            boxid: "bindingBox",
            boxclass: "ol_box_4",
            showButton: false,
            onopen: function(e) {
                ec.ui.loading.hide();
                $("#ec-binding-phone-1").hide();
                $("#ec-binding-phone-2").hide();
                $("#ec-binding-phone-3").hide();
                $("#ec-binding-phone-4").hide();
                $("#ec-binding-phone-5").show();
                $("#ec-binding-phone-url-5").attr("href", b + "&redirect_uri=" + a);
                var d = domainMain + "/member/cartBind/result/logout?url=" + $("#ec-binding-phone-reLogin-5").attr("href") + "?url=" + a;
                $("#ec-binding-phone-reLogin-5").attr("href", encodeURI(d));
                e.setPosition()
            }
        });
        bindBox.open()
    })
};
getUrlParaMap4CartBinding = function() {
    var c = decodeURIComponent(window.location.search);
    var a = {};
    if (c) {
        var d;
        c = c.substring(1).split("&");
        for (var b = 0; b < c.length; b++) {
            d = c[b].split("=");
            if (d.length == 2) {
                a[d[0]] = d[1].escapeHTML4CartBinding()
            }
        }
    }
    return a
};
String.prototype.escapeHTML4CartBinding = function() {
    return this.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;")
};
ec.ready(function() {
    if (window.location.href.match(/\/cart\/cart\.html/g)) {
        ec.binding.cart();
        return
    }
    ec.binding.login();
    if ((window.location.href.match(/\/member/g) && !window.location.href.match(/\/member\/order/g)) || window.location.href.match(/\/member\/order-/g) || window.location.href.match(/\/authmember/g)) {
        ec.binding.allCount();
        return
    }
});