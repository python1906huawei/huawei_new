// 修改过的
window.ec || (window.ec = {});
ol.pkg = function(j, h, g) {
    var b, d, u;
    if (arguments.length == 3) {
        b = j;
        d = h;
        u = g
    } else {
        b = window;
        d = j;
        u = h
    }
    if (!d || !d.length) {
        return null
    }
    var m = d.split(".");
    for (var l = b, k = 0; k < m.length - 1; k++) {
        l[m[k]] || (l[m[k]] = {});
        l = l[m[k]]
    }
    l = (l[m[m.length - 1]] = u || l[m[m.length - 1]] || {});
    return l
};
ol.define = function(y, n, m) {
    var l = window,
        k, h;
    if (arguments.length == 3) {
        l = y;
        k = n;
        h = m
    } else {
        k = y;
        h = n
    }
    var g = k.split("."),
        b, j;
    for (var d = l, a = 0; a < g.length - 1; a++) {
        d[g[a]] || (d[g[a]] = {});
        d = d[g[a]]
    }
    j = g[g.length - 1];
    b = d[j];
    if (!b) {
        b = d[j] = function() {
            var f = arguments.callee,
                q = f._define,
                c;
            for (var p = arguments.length, o = p + 10; p < o; p++) {
                c = q[j + "_" + p];
                if (c) {
                    q[j + "_" + arguments.length] = q[j + "_" + p];
                    break
                }
            }
            if (!c) {
                c = q[j + "_0"]
            }
            if (!c) {
                if (logger && logger.error) {
                    logger.error(k, "function is undefined.")
                }
                return
            }
            c.apply(f, arguments)
        };
        b._define = {}
    }
    b._define[j + "_" + h.length] = h
};
ol.Cache = {
    _cache: {},
    _size: 0,
    set: function(b, a) {
        if (!ol.Cache.contains(b)) {
            ol.Cache._size++
        }
        ol.Cache._cache[b] = a;
        return a
    },
    get: function(b, c) {
        var d = ol.Cache;
        var a = d._cache[b];
        if (a) {
            return a
        }
        if (typeof(c) == "function") {
            a = c();
            d._cache[b] = a
        } else {
            if (c) {
                a = c;
                d._cache[b] = a
            } else {
                a = jQuery(b);
                d._cache[b] = a
            }
        }
        d._size++;
        return a
    },
    remove: function(a) {
        ol.Cache._size--;
        ol.Cache._cache[a] = null
    },
    contains: function(a) {
        return ol.Cache._cache[a]
    }
};
ol.Plugin = {
    if_jquery: function(c, d) {
        try {
            var a = arguments.callee;
            d = d || 2;
            if (typeof(jQuery) != "undefined") {
                c(jQuery)
            } else {
                if (d == 0) {
                    return
                }
                setTimeout(function() {
                    a(c, d - 1)
                }, 1000)
            }
        } catch (b) {
            if (ol.debug) {
                throw b
            }
        }
    },
    if_jsapi: function(a) {
        try {
            if (typeof(ol) != "undefined" && typeof(ol.ready) != "undefined") {
                a(ol)
            }
        } catch (b) {
            if (ol.debug) {
                throw b
            }
        }
    }
};
if (ol.isIE6 || ol.isIE7) {
    document.nativeGetElementById = document.getElementById;
    document.getElementById = function(a) {
        var c = document.nativeGetElementById(a);
        if (c) {
            if (c.attributes.id.value == a) {
                return c
            } else {
                for (var b = 1; b < document.all[a].length; b++) {
                    if (document.all[a][b].attributes.id.value == a) {
                        return document.all[a][b]
                    }
                }
            }
        }
        return null
    }
}
if (ol.isIE6) {
    try {
        document.execCommand("BackgroundImageCache", false, true)
    } catch (e) {}
}
ol.pkg("ol.ui");
(function() {
    var b = function() {
        var c = {};
        c.width = ol.ui.masker._bwidth;
        c.height = ol.ui.masker._bheight;
        ol.Cache.get("ec_mask").css(c)
    };
    var a = {
        css: {
            opacity: 0.2,
            background: "#000"
        }
    };
    ol.ui.masker = {
        isShown: false,
        mask: function(j) {
            var d = jQuery;
            var c = ol.ui.masker;
            if (c.isShown) {
                return
            }
            j = d.extend(true, {}, a, j);
            var f = ol.Cache.get("ec_mask", function() {
                d(window).resize(function() {
                    if (ol.ui.masker.isShown) {
                        return
                    }
                    ol.Cache.get("ec_mask").css({
                        width: c._bwidth(),
                        height: c._bheight()
                    })
                });
                return d("<div id='ec_mask' class='ec_mask'></div>").appendTo("body").bgiframe()
            });
            c.isShown = true;
            j.css.width = c._bwidth();
            j.css.height = c._bheight();
            j.css.visibility = "visible";
            f.css(j.css);
            d(window).bind("resize", b)
        },
        unmask: function() {
            ol.ui.masker.isShown = false;
            ol.Cache.get("ec_mask").css({
                visibility: "hidden",
                width: 0,
                height: 0
            });
            jQuery(window).unbind("resize", b)
        },
        _bheight: function() {
            var d = jQuery;
            if (d.browser.msie && d.browser.version < 7) {
                var c = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
                var g = Math.max(document.documentElement.offsetHeight, document.body.offsetHeight);
                if (c < g) {
                    return d(window).height()
                } else {
                    return c
                }
            } else {
                return d(document).height()
            }
        },
        _bwidth: function() {
            var d = jQuery;
            if (d.browser.msie && d.browser.version < 7) {
                var g = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
                var c = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth);
                if (g < c) {
                    return d(window).width()
                } else {
                    return g
                }
            } else {
                return d(document).width()
            }
        }
    }
})();
(function() {
    var a = {
        event: "hover",
        menu: null
    };
    ol.ui.dropdown = function(b, d) {
        var c = this;
        c.hideTimer = null;
        c._objItem;
        c._menuItem;
        c._onMenu = false;
        c._events = {};
        c._isShow = false;
        c._hideMenu = function() {
            c.hideTimer = setTimeout(c.hide, 100)
        };
        c.init = function() {
            var f = jQuery;
            d = f.extend({}, a, d);
            if (d.event == "hover") {
                d.event = "mouseover"
            } else {
                d.event = "click"
            }
            c._objItem = f(b);
            c._menuItem = d.menu ? f(d.menu) : c._objItem.next();
            c._objItem.unbind(d.event).bind(d.event, function(g) {
                clearTimeout(c.hideTimer);
                c.show()
            });
            c._menuItem.find(".dropdown_item").bind("click", function() {
                setTimeout(c.hide)
            })
        };
        c.bind = function(f, j, g) {
            c._menuItem.find(f).bind(j, g)
        };
        c.show = function() {
            switch (d.event) {
                case "mouseover":
                    c._objItem.unbind("mouseout").bind("mouseout", function(f) {
                        c._hideMenu();
                        c._objItem.addClass("hover")
                    });
                    c._menuItem.unbind("mouseover").bind("mouseover", function() {
                        clearTimeout(c.hideTimer);
                        c._menuItem.css("display", "block")
                    }).unbind("mouseout").bind("mouseout", function() {
                        c._hideMenu()
                    });
                    break;
                case "click":
                    if (c._isShow) {
                        c.hide();
                        return
                    } else {
                        c._events.menu_click = function() {
                            c._onMenu = true
                        };
                        c._events.document_click = function(f) {
                            if (f.button != 0) {
                                return true
                            }
                            if (c._onMenu === false) {
                                c.hide()
                            }
                            c._onMenu = false
                        };
                        setTimeout(function() {
                            c._menuItem.bind("click", c._events.menu_click);
                            jQuery(document).bind("click", c._events.document_click)
                        }, 1)
                    }
                    break
            }
            c._objItem.addClass("hover");
            c._menuItem.css("display", "block");
            c._isShow = true
        };
        c.hide = function() {
            if (c._events.document_click) {
                jQuery(document).unbind("click", c._events.document_click)
            }
            if (c._events.menu_click) {
                c._menuItem.unbind("click", c._events.menu_click)
            }
            c._objItem.removeClass("hover");
            c._menuItem.hide();
            c._isShow = false;
            c._onMenu = false
        };
        this.init()
    }
})();
ol.ui.scrollTo = function(b, g) {
    g = g || {
        offsetY: 45
    };
    if (typeof(b) != "object") {
        var d = b.toString().substr(0, 1);
        if (!(d == "#" || d == ".")) {
            b = "#" + b
        }
        b = jQuery(b)
    }
    if (b.length == 0) {
        return
    }
    var p = b.offset().top;
    var a = (document.documentElement && !/webkit/ig.test(navigator.userAgent) ? document.documentElement : document.body);
    var h = jQuery(window).height();
    var f = a.scrollTop;
    if (!(f < p && p < f + h)) {
        a.scrollTop = p - g.offsetY
    }
};
(function() {
    var b = {
        white: {
            opacity: 0.55,
            background: "#fff"
        },
        black: {
            opacity: 0.2,
            background: "#000"
        }
    };
    var a = {
        selector: "#ec_ui_loading",
        css: null,
        modal: true,
        maskConfig: null
    };
    ol.ui.loading = {
        options: null,
        show: function(g) {
            var n = ol.ui.loading;
            if (typeof(g) == "string") {
                g = {
                    maskConfig: {
                        css: b[g]
                    }
                }
            }
            n.options = jQuery.extend(true, {}, a, g);
            if (n.options.modal) {
                ol.ui.masker.mask(n.options.maskConfig)
            }
            var d = jQuery(n.options.selector);
            if (d.length == 0) {
                d = jQuery('<div id="ec_ui_loading" class="ec_ui_loading"></div>').appendTo("body")
            }
            d.css(n.options.css);
            if (ol.isIE6 || ol.isIE && document.compatMode === "BackCompat") {
                var c = jQuery(window),
                    f = c.scrollTop(),
                    h = c.scrollLeft();
                f += (c.height() - d.height()) / 2;
                h += (c.width() - d.width()) / 2;
                d.css({
                    top: f,
                    left: h
                })
            }
            d.show();
            d = null;
            n = null
        },
        hide: function() {
            var c = ol.ui.loading.options;
            if (c) {
                if (c.modal) {
                    ol.ui.masker.unmask()
                }
                jQuery(c.selector).hide()
            }
        }
    }
})();
(function() {
    var a = {
        row: "tr",
        colors: ["#fff", "#f7f7f7"],
        hover: "#e3f3bf",
        index: 1,
        remain: 0,
        alterNum: 1
    };
    ol.ui.alternation = function(b, c) {
        var d = jQuery;

        function j(h, g) {
            var f = this;
            this.container = d(h);
            this.data = {};
            this.rows = null;
            this.init = function() {
                this.rows = this.container.find(g.row);
                var k;
                var p;
                for (var l = 0; l < this.rows.length; l++) {
                    k = this.rows[l];
                    k.setAttribute("alternation", l);
                    p = k.getAttribute("group");
                    this.data[l] = {
                        group: p,
                        backgroundColor: ""
                    }
                }
            };
            this.bindColor = function() {
                if (!g.colors) {
                    return
                }
                var k = this.rows.length - g.remain;
                for (var m = g.index; m < k;) {
                    for (var l = 0; l < g.colors.length && m < k; l++) {
                        row = this.rows[m];
                        row.style.backgroundColor = g.colors[l];
                        this.data[m].backgroundColor = g.colors[l];
                        m = m + g.alterNum
                    }
                }
            };
            this.bindEvent = function() {
                this.rows.unbind("mouseover").bind("mouseover", function() {
                    var k = d(this);
                    var p = k.attr("alternation");
                    var o = f.data[p];
                    if (g.hover) {
                        k.css("backgroundColor", g.hover)
                    }
                    if (o.group) {
                        f.container.find(g.row + "[group=" + o.group + "]").addClass("hover")
                    }
                }).unbind("mouseout").bind("mouseout", function() {
                    var k = d(this);
                    var p = k.attr("alternation");
                    var o = f.data[p];
                    if (g.hover) {
                        k.css("backgroundColor", o.backgroundColor)
                    }
                    if (o.group) {
                        f.container.find(g.row + "[group=" + o.group + "]").removeClass("hover")
                    }
                })
            };
            this.init();
            this.bindColor();
            this.bindEvent()
        }
        c = d.extend({}, a, c);
        d(b).each(function() {
            new j(this, c)
        })
    }
})();
(function() {
    var a = function(u, k, h, g) {
        if (u.nodeType === 3) {
            var d = u.data.match(k);
            if (d) {
                var b = document.createElement(h || "span");
                b.className = g || "ec_ui_highlight highlight";
                var j = u.splitText(d.index);
                j.splitText(d[0].length);
                var f = j.cloneNode(true);
                b.appendChild(f);
                j.parentNode.replaceChild(b, j);
                return 1
            }
        } else {
            if ((u.nodeType === 1 && u.childNodes) && !/(script|style)/i.test(u.tagName) && !(u.tagName === h.toUpperCase() && u.className === g)) {
                for (var c = 0; c < u.childNodes.length; c++) {
                    c += a(u.childNodes[c], k, h, g)
                }
            }
        }
        return 0
    };
    ol.ui.highlight = function(b, h, u) {
        var c = {
            className: null,
            element: "span",
            caseSensitive: false,
            wordsOnly: false
        };
        jQuery.extend(c, u);
        if (h.constructor === String) {
            h = [h]
        }
        h = jQuery.grep(h, function(l, k) {
            return l != ""
        });
        if (h.length == 0) {
            return this
        }
        var j = h.join("|");
        j = j.replace(/([\\\$\{\}\(\)\[\]\+\?\-\>\<\^\!\.\*])/g, "\\$1");
        var g = c.caseSensitive ? "" : "i";
        var f = "(" + j + ")";
        if (c.wordsOnly) {
            f = "\\b" + f + "\\b"
        }
        var t = new RegExp(f, g);
        var d = b;
        if (typeof(b) == "string") {
            d = ol.Cache.get(b)
        }
        return d.each(function() {
            a(this, t, c.element, c.className)
        })
    }
})();
(function() {
    var a = {
        _ec_ui_alert: {
            _default: {
                title: "\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\u02be",
                zIndex: 399,
                showCancel: false,
                modal: false,
                draggable: false,
                focus: ".box-ok:first",
                width: 300,
                clickOut: function(d) {
                    d.close()
                }
            }
        },
        _ec_ui_info: {},
        _ec_ui_warn: {},
        _ec_ui_error: {}
    };

    function c(f, g, d) {
        var l = ol.Cache.get;
        var h = l(g.boxid, function() {
            return new ol.box(null, g)
        });
        h.open(f);
        if (d.timeout) {
            if (a[g.boxid].timer) {
                clearTimeout(a[g.boxid].timer)
            }
            a[g.boxid].timer = setTimeout(function() {
                if (ol.isIE6) {
                    h.close()
                } else {
                    h.fadeOut(800)
                }
            }, d.timeout);
            l("#" + g.boxid).unbind("mouseover").bind("mouseover", function() {
                clearTimeout(a[g.boxid].timer)
            }).unbind("mouseout").bind("mouseout", function() {
                a[g.boxid].timer = setTimeout(function() {
                    if (ol.isIE6) {
                        h.close()
                    } else {
                        h.fadeOut(800)
                    }
                }, d.timeout / 2)
            })
        }
    }
    var b = {
        title: "\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\u02be",
        zIndex: 399,
        showButton: false,
        modal: false,
        draggable: false,
        focus: ".box-close",
        width: 300
    };
    ol.ui.warn = function(f, g) {
        g = jQuery.extend({}, b, g);
        g.boxid = "_ec_ui_warn";
        g.boxclass = "ec_ui_warn";
        var d = {
            timeout: g.timeout
        };
        delete g.timeout;
        c(f, g, d)
    };
    ol.ui.info = function(f, g) {
        g = jQuery.extend({}, b, g);
        g.boxid = "_ec_ui_info";
        g.boxclass = "ec_ui_info";
        var d = {
            timeout: g.timeout
        };
        delete g.timeout;
        c(f, g, d)
    };
    ol.ui.error = function(f, g) {
        g = jQuery.extend({}, b, g);
        g.boxid = "_ec_ui_error";
        g.boxclass = "ec_ui_error";
        var d = {
            timeout: g.timeout
        };
        delete g.timeout;
        c(f, g, d)
    };
    ol.ui.alert = function(f, g) {
        g = jQuery.extend({}, a._ec_ui_alert._default, g);
        g.boxid = "_ec_ui_alert";
        g.boxclass = "ec_ui_alert";
        var d = ol.Cache.get(g.boxid, function() {
            return new ol.box(null, g)
        });
        d.setTitle(g.title);
        d.open(f)
    }
})();
(function() {
    var a = {
            style: "style1",
            offsetX: 0,
            offsetY: 0
        },
        b = '<div class="ec_ui_ballon"><div id="ballon_header"></div><div id="ballon_body"></div><div id="ballon_footer"></div></div>';
    ol.ui.ballon = function(d, g, f) {
        f = jQuery.extend({}, a, f);
        var n = jQuery(d);
        var c = jQuery(b);
        var h;
        c.find("#ballon_body").html(g || "");
        n.mouseover(function() {
            h = setTimeout(function() {
                var m = f.offsetX || 0;
                var l = f.offsetY || 0;
                var k = n.offset().top + n.height();
                var j = n.offset().left;
                j = Math.max(j + m, 0);
                k = Math.max(k + l, 0);
                c.css({
                    display: "block",
                    top: k,
                    left: j
                }).addClass(f.style);
                c.appendTo("body").bgiframe()
            }, 250)
        }).mouseout(function() {
            clearTimeout(h);
            c.remove()
        });
        return ol.ui
    }
})();
(function() {
    var a = {
        css: null,
        captureInput: false
    };
    ol.ui.hover = function(c, b) {
        var d = jQuery;
        b = d.extend(true, {}, a, b);
        d(c).each(function() {
            var p = null;
            var f = false;
            var o = false;
            var j = d(this);
            var g = function() {
                if (f || o) {
                    return
                }
                if (b.css) {
                    p = j.attr("style");
                    j.css(b.css)
                } else {
                    j.addClass("hover")
                }
            };
            var h = function() {
                if (f || o) {
                    return
                }
                if (b.css) {
                    j.attr("style", p)
                } else {
                    j.removeClass("hover")
                }
            };
            j.mouseover(function() {
                g();
                o = true
            }).mouseout(function() {
                o = false;
                h()
            });
            if (this.tagName == "INPUT" || this.tagName == "TEXTAREA") {
                j.focus(function() {
                    g();
                    f = true
                }).blur(function() {
                    f = false;
                    h()
                })
            } else {
                if (b.captureInput) {
                    j.find("input[type=text],textarea").bind("focus", function() {
                        g();
                        f = true
                    }).bind("blur", function() {
                        f = false;
                        h()
                    })
                }
            }
        });
        return ol.ui
    }
})();
ol.pkg("ol.lang");
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(p, c) {
        if (!ol.util.isArray(this)) {
            return -1
        }
        var h, f, b = "\0";
        if (c != null) {
            h = this.slice(c);
            f = c
        } else {
            h = this;
            f = 0
        }
        var a = b + h.join(b) + b,
            g = a.indexOf(b + p + b);
        if (g == -1) {
            return -1
        }
        f += a.slice(0, g).replace(/[^\0]/g, "").length;
        return f
    }
}
Array.prototype.clone = function() {
    return this.slice(0)
};
String.prototype.endWith = function(a) {
    if (a == null || a == "" || this.length == 0 || a.length > this.length) {
        return false
    }
    if (this.substring(this.length - a.length) == a) {
        return true
    } else {
        return false
    }
    return true
};
String.prototype.startWith = function(a) {
    if (a == null || a == "" || this.length == 0 || a.length > this.length) {
        return false
    }
    if (this.substr(0, a.length) == a) {
        return true
    } else {
        return false
    }
    return true
};
if (!String.prototype.trim) {
    String.prototype.trim = function() {
        return this.replace(/^\s+/, "").replace(/\s+$/, "")
    }
}


String.prototype.len = function() {
    return this.replace(/[^\x00-\xff]/g, "aa").length
};
String.prototype.replaceAll = function(b, a) {
    return this.replace(new RegExp(b, "gm"), a)
};
String.prototype.parseDate = function(g) {
    var m = {
        "\\.": {
            v: "\\."
        },
        "\\?": {
            v: "\\?"
        },
        "M+": {
            v: "(0[1-9]|1[0-2]|[1-9])",
            k: "MM"
        },
        "d+": {
            v: "(3[01]|[12][0-9]|0[1-9]|[1-9])",
            k: "dd"
        },
        "y+": {
            v: "(\\d{4})",
            k: "yyyy"
        },
        "H+": {
            v: "(2[0-3]|[01][0-9]|[0-9])",
            k: "HH"
        },
        "m+": {
            v: "([0-5][0-9]|[0-9])",
            k: "mm"
        },
        "s+": {
            v: "([0-5][0-9]|[0-9])",
            k: "ss"
        },
        S: {
            v: "(\\d+)",
            k: "S"
        }
    };
    var c = [];
    var n = g;
    var l;
    var a;
    for (var y in m) {
        if ((l = g.search(new RegExp("(" + y + ")"))) != -1) {
            a = m[y];
            n = n.replace(RegExp.$1, a.v);
            if (a.k) {
                c.push({
                    n: a.k,
                    order: l
                })
            }
        }
    }
    c.sort(function(k, d) {
        return k.order - d.order
    });
    a = {};
    for (var b = 0; b < c.length; b++) {
        a[c[b].n] = b + 1
    }
    var j = this.match(new RegExp(n));
    if (!j) {
        throw "Invalid String for parse to Date!"
    }
    var f = new Date();
    if (a.yyyy) {
        f.setFullYear(j[a.yyyy])
    }
    if (a.dd) {
        var h = j[a.dd];
        f.setDate(h);
        f.setDate(h)
    } else {
        f.setDate(1);
        f.setDate(1)
    }
    if (a.MM) {
        f.setMonth(j[a.MM] - 1)
    }
    if (a.HH) {
        f.setHours(j[a.HH])
    } else {
        f.setHours(0)
    }
    if (a.mm) {
        f.setMinutes(j[a.mm])
    } else {
        f.setMinutes(0)
    }
    if (a.ss) {
        f.setSeconds(j[a.ss])
    } else {
        f.setSeconds(0)
    }
    if (a.S) {
        f.setMilliseconds(j[a.S])
    } else {
        f.setMilliseconds(0)
    }
    return f
};
Date.prototype.format = function(c) {
    var b = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12,
        "H+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        S: this.getMilliseconds()
    };
    var a = {
        "0": "\u65e5",
        "1": "\u4e00",
        "2": "\u4e8c",
        "3": "\u4e09",
        "4": "\u56db",
        "5": "\u4e94",
        "6": "\u516d"
    };
    if (/(y+)/.test(c)) {
        c = c.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length))
    }
    if (/(E+)/.test(c)) {
        c = c.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f" : "\u5468") : "") + a[this.getDay() + ""])
    }
    for (var d in b) {
        if (new RegExp("(" + d + ")").test(c)) {
            c = c.replace(RegExp.$1, (RegExp.$1.length == 1) ? (b[d]) : (("00" + b[d]).substr(("" + b[d]).length)))
        }
    }
    return c
};
if (! /*@cc_on!@*/
    0 && window.JSON && window.JSON.parse && window.JSON.stringify) {
    ol.lang.json = (function() {
        var a = /___$/;
        return {
            parse: function(c) {
                try {
                    return window.JSON.parse(c)
                } catch (b) {
                    return false
                }
            },
            stringify: function(c) {
                try {
                    return window.JSON.stringify(c, function(d, g) {
                        return !a.test(d) ? g : null
                    })
                } catch (b) {
                    return null
                }
            }
        }
    })()
} else {
    ol.lang.json = function() {
        function f(n) {
            return n < 10 ? "0" + n : n
        }
        Date.prototype.toJSON = function() {
            return [this.getUTCFullYear(), "-", f(this.getUTCMonth() + 1), "-", f(this.getUTCDate()), "T", f(this.getUTCHours()), ":", f(this.getUTCMinutes()), ":", f(this.getUTCSeconds()), "Z"].join("")
        };
        var m = {
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        };

        function stringify(value) {
            var a, i, k, l, r = /["\\\x00-\x1f\x7f-\x9f]/g,
                v;
            switch (typeof value) {
                case "string":
                    return r.test(value) ? '"' + value.replace(r, function(a) {
                        var c = m[a];
                        if (c) {
                            return c
                        }
                        c = a.charCodeAt();
                        return "\\u00" + Math.floor(c / 16).toString(16) + (c % 16).toString(16)
                    }) + '"' : '"' + value + '"';
                case "number":
                    return isFinite(value) ? String(value) : "null";
                case "boolean":
                case "null":
                    return String(value);
                case "object":
                    if (!value) {
                        return "null"
                    }
                    a = [];
                    if (typeof value.length === "number" && !value.propertyIsEnumerable("length")) {
                        l = value.length;
                        for (i = 0; i < l; i += 1) {
                            a.push(stringify(value[i]) || "null")
                        }
                        return "[" + a.join(",") + "]"
                    }
                    for (k in value) {
                        if (k.match("___$")) {
                            continue
                        }
                        if (value.hasOwnProperty(k)) {
                            if (typeof k === "string") {
                                v = stringify(value[k]);
                                if (v) {
                                    a.push(stringify(k) + ":" + v)
                                }
                            }
                        }
                    }
                    return "{" + a.join(",") + "}"
            }
        }
        return {
            stringify: stringify,
            parse: function(text) {
                if (/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/b-u]/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
                    return eval("(" + text + ")")
                }
                return false
            }
        }
    }()
}
ol.pkg("ol.util");
ol.util.trim = function(a) {
    if (a == null) {
        return ""
    }
    if (typeof(a) != "string") {
        return a
    }
    return a.trim()
};
ol.util.left = function(b, d, a) {
    if (b.len() < d) {
        return b
    }
    var c = 0;
    for (var l = 0; l < b.length; l++) {
        if (b.charCodeAt(l) > 128) {
            c = c + 2
        } else {
            c = c + 1
        }
        if (c > d) {
            return b.substring(0, l) + (a ? a : "")
        }
    }
    return b
};
ol.util.isEmpty = function(a) {
    if (ol.util.trim(a) == "") {
        return true
    }
    return false
};
ol.util.isDate = function(a) {
    if (a == null || a == "") {
        return false
    }
    re = /\d{4}-{1}\d{2}-{1}\d{2}$/;
    return a.match(re)
};
ol.util.isNumeric = function(a) {
    strRef = "1234567890";
    if (a == "") {
        return false
    }
    for (i = 0; i < a.length; i++) {
        tempChar = a.substring(i, i + 1);
        if (strRef.indexOf(tempChar, 0) == -1) {
            return false
        }
    }
    return true
};
ol.util.isFloat = function(b) {
    var a = /^[0-9]+.?[0-9]*$/;
    return a.test(s)
};
ol.util.isEmail = function(c, d) {
    if (!c) {
        return false
    }
    var a = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/i;
    var b = new RegExp(a);
    var f;
    if (d) {
        f = c.split(d)
    } else {
        f = [c]
    }
    for (var n = 0; n < f.length; n++) {
        if (f[n].match(b) == null) {
            return false
        }
    }
    return true
};
ol.util.escapeHtml = function(a) {
    if (typeof(a) != "string") {
        return a
    }
    if (ol.util.isEmpty(a)) {
        return ""
    }
    a = a.replaceAll("&", "&amp;");
    a = a.replaceAll('"', "&quot;");
    a = a.replaceAll(" ", "&nbsp;");
    a = a.replaceAll("<", "&lt;");
    a = a.replaceAll(">", "&gt;");
    a = a.replaceAll("'", "&#039;");
    a = a.replaceAll("\r\n", "<br/>");
    a = a.replaceAll("\n", "<br/>");
    a = a.replaceAll("\r", "<br/>");
    return a
};
ol.util.unescapeHtml = function(a) {
    if (typeof(a) != "string") {
        return a
    }
    if (ol.util.isEmpty(a)) {
        return ""
    }
    a = a.replaceAll("&quot;", '"');
    a = a.replaceAll("&nbsp;", " ");
    a = a.replaceAll("&lt;", "<");
    a = a.replaceAll("&gt;", ">");
    a = a.replaceAll("&#039;", "'");
    a = a.replaceAll("<br>", "\n");
    a = a.replaceAll("<br/>", "\n");
    a = a.replaceAll("&#61;", "=");
    a = a.replaceAll("&amp;", "&");
    return a
};
ol.util.isFunction = function(a) {
    if (!a) {
        return false
    }
    return Object.prototype.toString.call(a) === "[object Function]"
};
ol.util.isArray = function(a) {
    if (!a) {
        return false
    }
    return Object.prototype.toString.call(a) === "[object Array]"
};
ol.util.isObject = function(a) {
    if (!a) {
        return false
    }
    return Object.prototype.toString.call(a) === "[object Object]"
};
ol.util.cookie = {
    get: function(f) {
        var d = null;
        if (document.cookie && document.cookie != "") {
            var b = document.cookie.split(";");
            for (var a = 0; a < b.length; a++) {
                var n = (b[a] || "").replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, "");
                if (n.substring(0, f.length + 1) == (f + "=")) {
                    var c = function(h) {
                        h = h.replace(/\+/g, " ");
                        var g = '()<>@,;:\\"/[]?={}';
                        for (var j = 0; j < g.length; j++) {
                            if (h.indexOf(g.charAt(j)) != -1) {
                                if (h.startWith('"')) {
                                    h = h.substring(1)
                                }
                                if (h.endWith('"')) {
                                    h = h.substring(0, h.length - 1)
                                }
                                break
                            }
                        }
                        return decodeURIComponent(h)
                    };
                    d = c(n.substring(f.length + 1));
                    break
                }
            }
        }
        return d
    },
    set: function(g, r, f) {
        f = f || {};
        if (r === null) {
            r = "";
            f.expires = -1
        }
        var c = "";
        if (f.expires && (typeof f.expires == "number" || f.expires.toUTCString)) {
            var d;
            if (typeof f.expires == "number") {
                d = new Date();
                d.setTime(d.getTime() + (f.expires * 24 * 60 * 60 * 1000))
            } else {
                d = f.expires
            }
            c = "; expires=" + d.toUTCString()
        }
        var b = "; path=" + (f.path || "/");
        var h = f.domain ? "; domain=" + (f.domain) : "";
        var a = f.secure ? "; secure" : "";
        document.cookie = [g, "=", encodeURIComponent(r), c, b, h, a].join("")
    },
    remove: function(a) {
        this.set(a, null)
    }
};
ol.Plugin.if_jquery(function(a) {
    ol.Plugin.if_jsapi(function(c) {
        ol._setLoadStatus("jquery.bgiframe", "complete")
    });
    a.fn.bgiframe = (a.browser.msie && /msie 6\.0/i.test(navigator.userAgent) ? function(d) {
            d = a.extend({
                top: "auto",
                left: "auto",
                width: "auto",
                height: "auto",
                opacity: true,
                src: "javascript:false;"
            }, d);
            var c = '<iframe class="bgiframe"frameborder="0"tabindex="-1"src="' + d.src + '"style="display:block;position:absolute;z-index:-1;' + (d.opacity !== false ? "filter:Alpha(Opacity='0');" : "") + "top:" + (d.top == "auto" ? "expression(((parseInt(this.parentNode.currentStyle.borderTopWidth)||0)*-1)+'px')" : b(d.top)) + ";left:" + (d.left == "auto" ? "expression(((parseInt(this.parentNode.currentStyle.borderLeftWidth)||0)*-1)+'px')" : b(d.left)) + ";width:" + (d.width == "auto" ? "expression(this.parentNode.offsetWidth+'px')" : b(d.width)) + ";height:" + (d.height == "auto" ? "expression(this.parentNode.offsetHeight+'px')" : b(d.height)) + ';"/>';
            return this.each(function() {
                if (a(this).children("iframe.bgiframe").length === 0) {
                    this.insertBefore(document.createElement(c), this.firstChild)
                }
            })
        } :
        function() {
            return this
        }
    );
    a.fn.bgIframe = a.fn.bgiframe;

    function b(c) {
        return c && c.constructor === Number ? c + "px" : c
    }
});
ol.Plugin.if_jquery(function(a) {
    a.fn.check = function(b) {
        switch (b) {
            case true:
                return this.each(function() {
                    this.checked = true
                });
                break;
            case false:
                return this.each(function() {
                    this.checked = false
                });
                break;
            default:
                return this.each(function() {
                    this.checked = !this.checked
                })
        }
    };
    a.fn.select = function(b) {
        return this.each(function() {
            a(this).val(b)
        })
    }
});
ol.pkg("ol.form.input");
(function() {
    var a = 0;
    ol.form.input.label = function(b, j, c) {
        if (!j) {
            throw ("Please set label text!");
            return ol.form.input
        }
        var d = jQuery;
        c = d.extend({}, ol.form.input.label.defaults, c);
        d(b).each(function() {
            var p = d(this)
              , g = p.attr("id")
              , q = Number(p.css("z-index")) || 1
              , B = parseInt(p.css("margin-top"), 10) + parseInt(p.css("border-top-width"), 10)
              , m = parseInt(p.css("margin-left"), 10) + parseInt(p.css("border-left-width"), 10)
              , f = d('<label style="display:none;position:absolute;cursor:text;float:left;z-index:' + (q + 1) + '">' + j + "</label>").attr("class", p.attr("class"))
              , h = d('<input style="border:none;background:transparent;cursor:text;margin:0;" value="' + j + '" tabindex=-1 readonly>');
            if ("TEXTAREA" == p.attr("tagName")) {
                h.css("height", "auto")
            }
            if (!g && c.autoId) {
                g = "input_label_" + (a++);
                p.attr("id", g)
            }
            var n = {
                color: c.color
            };
            f.attr("for", g).css(n);
            p.css("z-index", q).before(f);
            var o = p.parents("form");
            if (o.length > 0) {
                o.bind("reset", function() {
                    setTimeout(function() {
                        l()
                    }, 150)
                })
            }
            var l = function() {
                if (p.attr("value").length == 0) {
                    f.css("display", "block")
                }
            }
              , k = function() {
                f.css("display", "none")
            };
            p.bind("blur", l).bind("focus", k);
            if (document.activeElement != p[0]) {
                l()
            }
        });
        return ol.form.input
    }
}
)();
ol.form.input.label.defaults = {
    color: "#999",
    autoId: true
};
(function() {
    var b = {
            max: Number.MAX_VALUE,
            exceedCallback: null
        },
        a = function(d) {
            var j = d.length,
                c = d.replace(/[^\x00-\xff]/g, "").length,
                f = (c % 2 == 0 ? c / 2 : parseInt(c / 2) + 1) + (j - c);
            return f
        };
    ol.form.input.wordCount = function(g, c) {
        var d = jQuery;
        opt = d.extend({}, b, c);
        d(g).each(function(k) {
            if (typeof(opt.callback) == "function") {
                var f = a(this.value);
                opt.callback.call(this, f);
                if (f > opt.max && opt.exceedCallback) {
                    opt.exceedCallback.call(this, f)
                }
            }
            d(this).bind("keyup", function() {
                var h = a(this.value);
                if (typeof(opt.callback) == "function") {
                    opt.callback.call(this, h)
                }
                if (h > opt.max && opt.exceedCallback) {
                    opt.exceedCallback.call(this, h)
                }
            })
        })
    }
})();
ol.pkg("ol.form.validator");
(function() {
    var y = function(m, l) {
            if (logger && logger.warn) {
                logger.warn(m, l)
            }
        },
        h = function(m, l) {
            if (logger && logger.error) {
                logger.error(m, l)
            }
        },
        d = {
            trim: true,
            validOnChange: false,
            allowEmpty: true,
            async: true,
            errorClass: null,
            successFunction: null,
            errorFunction: null
        };
    var j = {};
    var f = {};
    var g = function(q, t, m, n, r, l) {
        jQuery.extend(l, m);
        if (n) {
            r = f[n];
            if (!r) {
                y(n + " rule is undefined!");
                return true
            }
        }
        var o;
        if (n) {
            l.type = n
        }
        if (r.length == 3) {
            o = r(q, t, l)
        } else {
            o = r(q, l)
        }
        if (!o) {
            if (l.errorFunction) {
                var p = function() {
                    if (m.errorClass && t) {
                        t.addClass(m.errorClass)
                    }
                    l.errorFunction(t || q, l)
                };
                if (m.async) {
                    setTimeout(p, 1)
                } else {
                    p()
                }
            }
            return false
        }
        return true
    };
    var k = function(q, r, n, l) {
        if (!n.type) {
            if (!g(q, r, n, null, n.rule, l)) {
                return false
            }
        } else {
            var o = n.type;
            if (typeof(n.type) == "string") {
                o = [n.type]
            }
            var p = {};
            for (var m = 0; m < o.length; m++) {
                if (!p[o[m]]) {
                    if (!g(q, r, n, o[m], null, l)) {
                        return false
                    }
                    p[o[m]] = 1
                }
            }
        }
        return true
    };
    var a = function(p) {
        var u = p.attr("validator");
        if (!u) {
            return true
        }
        var o = j[u];
        var m;
        switch (p.attr("tagName")) {
            case "SELECT":
                m = p.val();
                break;
            default:
                m = p[0].value
        }
        var t = {};
        var w = [];
        for (var q = 0; q < o.length; q++) {
            var v = {};
            if (o[q].trim) {
                m = $.trim(m)
            }
            if (!k(m, p, o[q], v)) {
                return false
            }
            w.push(v)
        }
        for (var q = 0; q < o.length; q++) {
            var l = o[q];
            if (l.successFunction) {
                var n = w[q];
                var r = function() {
                    if (l.errorClass && p) {
                        p.removeClass(l.errorClass)
                    }
                    l.successFunction(p || m, n)
                };
                if (l.async) {
                    setTimeout(r, 1)
                } else {
                    r()
                }
            }
        }
        return true
    };
    ol.form.validator = function(r, p) {
        if (typeof(p) == "object") {
            var t = {};
            if (k(r, null, p, t) && p.successFunction) {
                if (p.async) {
                    setTimeout(function() {
                        p.successFunction(r, t)
                    }, 1)
                } else {
                    p.successFunction(r, t)
                }
            }
            return
        }
        var n = r,
            q = p;
        var l = jQuery(n);
        var m = l.attr("tagName");
        q = (typeof(q) == "boolean" ? q : true);
        switch (m) {
            case "SELECT":
            case "INPUT":
            case "TEXTAREA":
                return a(l)
        }
        var v = l.find("select[validator],input[validator],textarea[validator]");
        var u = true;
        for (var o = 0; o < v.length; o++) {
            if (!a(jQuery(v[o]))) {
                if (q) {
                    return false
                } else {
                    u = false
                }
            }
        }
        return u
    };
    ol.form.validator.register = function(m, l) {
        f[m] = l
    };
    ol.form.validator.get = function(l) {
        return f[l]
    };
    var x = 0;
    ol.form.validator.bind = function(m, o) {
        var n = [];
        var r = jQuery(m);
        o = jQuery.extend({}, d, o);
        if (o.validOnChange) {
            r.change(function() {
                ol.form.validator(this, true)
            })
        }
        for (var p = 0; p < r.length; p++) {
            var q = jQuery(r[p]);
            var l = q.attr("validator");
            if (!l) {
                l = "validator" + (++x) + (new Date()).getTime();
                q.attr("validator", l)
            }
            if (!j[l]) {
                j[l] = []
            }
            j[l].push(o);
            n.push(l)
        }
        return n
    };
    ol.form.validator.defaults = d;
    var c = ol.form.validator,
        b = function(m, l) {
            return !m
        };
    c.register("regex", function(m, l) {
        if (l.allowEmpty && b(m)) {
            return true
        }
        if (!l.regex) {
            h("regex", "need parameter of 'regex'!");
            return false
        }
        return l.regex.test(m)
    });
    c.register("require", function(m, l) {
        l.allowEmpty = false;
        return !b(m)
    });
    c.register("email", function(m, l) {
        if (l.allowEmpty && b(m)) {
            return true
        }
        var n = null;
        if (l.separater) {
            n = l.separater
        }
        return ol.util.isEmail(m, n)
    });
    c.register("eq", function(o, l) {
        if (!l.compareTo) {
            h("eq", "need parameter of 'compareTo'!");
            return false
        }
        var m = jQuery(l.compareTo).val();
        if (!l.format) {
            return o == m
        }
        var n = c.get("date");
        if (!(n(o, l) && n(m, l))) {
            return false
        }
        return o.parseDate(l.format).getTime() == m.parseDate(l.format).getTime()
    });
    c.register("lt", function(p, m) {
        if (m.allowEmpty && b(p)) {
            return true
        }
        if (!m.compareTo) {
            h("lt", "need parameter of 'compareTo'!");
            return false
        }
        var n = jQuery(m.compareTo).val();
        if (!m.format) {
            m.negative = true;
            var l = c.get("float");
            if (!l(p, m)) {
                return false
            }
            if (!l(n, m)) {
                return false
            }
            p = parseFloat(p);
            n = parseFloat(n);
            return p < n
        }
        var o = c.get("date");
        if (!(o(p, m) && o(n, m))) {
            return false
        }
        return p.parseDate(m.format) < n.parseDate(m.format)
    });
    c.register("le", function(o, n) {
        var m = c.get("eq");
        var l = c.get("lt");
        return m(o, n) || l(o, n)
    });
    c.register("gt", function(p, m) {
        if (m.allowEmpty && b(p)) {
            return true
        }
        if (!m.compareTo) {
            h("gt", "need parameter of 'compareTo'!");
            return false
        }
        var n = jQuery(m.compareTo).val();
        if (!m.format) {
            m.negative = true;
            var l = c.get("float");
            if (!l(p, m)) {
                return false
            }
            if (!l(n, m)) {
                return false
            }
            p = parseFloat(p);
            n = parseFloat(n);
            return p > n
        }
        var o = c.get("date");
        if (!(o(p, m) && o(n, m))) {
            return false
        }
        return p.parseDate(m.format) > n.parseDate(m.format)
    });
    c.register("ge", function(o, n) {
        var l = c.get("eq");
        var m = c.get("gt");
        return l(o, n) || m(o, n)
    });
    c.register("length", function(n, m) {
        if (m.allowEmpty && b(n)) {
            return true
        }
        if (!(m.min || m.max)) {
            h("length", "need parameter of 'min' or 'max'!");
            return false
        }
        var l = n.len();
        if (m.min && l < m.min) {
            return false
        }
        if (m.max && l > m.max) {
            return false
        }
        return true
    });
    c.register("range", function(o, n) {
        if (n.allowEmpty && b(o)) {
            return true
        }
        if (!(n.min || n.max)) {
            h("range", "need parameter of 'min' or 'max'!");
            return false
        }
        n.negative = true;
        var m = c.get("float");
        if (!m(o, n)) {
            return false
        }
        var l = parseFloat(o);
        if (n.min && l < n.min) {
            return false
        }
        if (n.max && l > n.max) {
            return false
        }
        return true
    });
    c.register("chinese", function(m, l) {
        if (l.allowEmpty && b(m)) {
            return true
        }
        l.regex = /^[\u4E00-\u9FA5]$/;
        return c.get("regex")(m, l)
    });
    c.register("int", function(m, l) {
        if (l.allowEmpty && b(m)) {
            return true
        }
        if (l.negative) {
            l.regex = /^[-]?\d+$/
        } else {
            l.regex = /^\d+$/
        }
        return c.get("regex")(m, l)
    });
    c.register("float", function(m, l) {
        if (l.allowEmpty && b(m)) {
            return true
        }
        if (l.negative) {
            l.regex = /^[-]?\d+(\.\d+)?$/
        } else {
            l.regex = /^\d+(\.\d+)?$/
        }
        return c.get("regex")(m, l)
    });
    c.register("date", function(p, n) {
        if (n.allowEmpty && b(p)) {
            return true
        }
        if (!n.format) {
            y("date", "need parameter of 'format'!");
            return false
        }
        var o = {
            "\\.": "\\.",
            "M+": "(0[1-9]|[1-9]|1[0-2])",
            "d+": "(0[1-9]|[1-9]|[12][0-9]|3[01])",
            "y+": "(\\d{4})",
            "H+": "([0-9]|[01][0-9]|2[0-3])",
            "m+": "([0-9]|[0-5][0-9])",
            "s+": "([0-9]|[0-5][0-9])",
            S: "(\\d+)"
        };
        var l = n.format;
        for (var m in o) {
            if (new RegExp("(" + m + ")").test(n.format)) {
                l = l.replace(RegExp.$1, o[m])
            }
        }
        n.regex = new RegExp("^" + l + "$");
        if (!c.get("regex")(p, n)) {
            return false
        }
        return p == p.parseDate(n.format).format(n.format)
    });
    c.register("url", function(m, l) {
        if (l.allowEmpty && b(m)) {
            return true
        }
        if (m.startWith("http://")) {
            m = m.substring(7)
        } else {
            if (m.startWith("https://")) {
                m = m.substring(8)
            } else {
                if (l.requireProtocol) {
                    return false
                }
            }
        }
        if (!m) {
            return false
        }
        l.regex = /^[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/;
        return c.get("regex")(m, l)
    })
})();
(function() {
    var g = ol.template = function(j) {
        this.init = function() {
            j = f(j);
            var k;
            for (var l = 0; l < j.length; l++) {
                k = r(j[l]);
                a[k[0]] = c(k)
            }
        };
        this.parse = function(l, k) {
            if (!l || !(l = a[l])) {
                return ""
            }
            return h(l, k)
        };
        this.init()
    };
    g.parse = function(j, k) {
        var l = h(c(r(j)), k);
        return l
    };
    g.startDelimiter = "<!--";
    g.endDelimiter = "-->";
    var a = {},
        b = new RegExp(g.startDelimiter + "#macro \\S+\\s*\\w*" + g.endDelimiter + "[\\s\\S]*?" + g.startDelimiter + "/#macro" + g.endDelimiter, "g"),
        f = function(j) {
            return j.match(b)
        },
        d = new RegExp("(" + g.startDelimiter + "(/?)#([\\s\\S]*?)" + g.endDelimiter + ")|(')|([\r\n\t])|({#([^}]*?)})", "g"),
        r = function(o) {
            var u = o.replace(d, function(w, J, z, L, K, C, x, t) {
                if (J) {
                    return "\n" + (z ? "-" : "+") + L.replace(/[\r\n\t]/g, "") + "\n"
                }
                if (K) {
                    return "\\'"
                }
                if (C) {
                    return ""
                }
                if (x) {
                    var y = t.indexOf("?");
                    if (y != 0) {
                        switch (t.substring(y + 1)) {
                            case "html":
                                t = "ol.util.escapeHtml(" + t.substring(0, y) + ")";
                                break;
                            case "js_string":
                                t = t.replace(/\"/g, '\\"').replace(/\r\n/g, "\\r\\n").replace(/\n/g, "\\n");
                                break
                        }
                    }
                    t = t.replace(/\'/g, "\\'");
                    return "'+(" + t + ")+'"
                }
            });
            u = u.split(/\n/);
            var q, k, B, v, A, l = ["var f=[];"];
            for (var j = 0; j < u.length; j++) {
                q = u[j];
                if (!q) {
                    continue
                }
                k = q.charAt(0);
                if (k !== "+" && k !== "-") {
                    l.push("f.push('" + q + "');");
                    continue
                }
                B = q.split(/\s/);
                switch (B[0]) {
                    case "+macro":
                        v = B[1];
                        A = B[2];
                        l.push('f.push("<!--' + v + ' start-->");');
                        break;
                    case "-macro":
                        l.push('f.push("<!--' + v + ' end-->");');
                        break;
                    case "+elseif":
                        B.splice(0, 1);
                        l.push("}else if" + B.join(" ") + "{");
                        break;
                    case "+else":
                        l.push("}else{");
                        break;
                    case "+if":
                    case "+for":
                    case "+switch":
                        B[0] = B[0].substr(1);
                        l.push(B.join(" ") + "{");
                        break;
                    case "+case":
                    case "+default":
                        B[0] = B[0].substr(1);
                        l.push(B.join(" ") + ":");
                        break;
                    case "-switch":
                    case "-for":
                    case "-if":
                        l.push("}");
                        break;
                    case "+list":
                        if (B.length != 4) {
                            throw v + ": list command error!"
                        }
                        var p = B[3] + "_index",
                            m = B[3] + "_length",
                            n = B[3] + "_num";
                        l.push("if(" + B[1] + ".constructor === Array){");
                        l.push("var " + B[3] + ";");
                        l.push("var " + m + "=" + B[1] + ".length;");
                        l.push("var " + p + ";");
                        l.push("for(var " + n + "=" + m + ";" + n + "--;){");
                        l.push(p + "=" + m + "-" + n + "-1;");
                        l.push(B[3] + "=" + B[1] + "[" + p + "];");
                        break;
                    case "-list":
                        l.push("}}");
                        break;
                    case "+break":
                        l.push("break;");
                        break;
                    case "-list":
                        l.push("}}}");
                        break;
                    case "+eval":
                        B.splice(0, 1);
                        l.push(B.join(" "));
                        break;
                    case "+var":
                        B[0] = B[0].substr(1);
                        l.push(B.join(" ") + ";");
                        break;
                    default:
                        break
                }
            }
            l.push("return f.join('');");
            return [v, A || "data", l.join("")]
        },
        c = function(j) {
            try {
                return new Function(j[1], j[2])
            } catch (k) {
                logger.error("template:" + j[0], k)
            }
        },
        h = function(j, k) {
            return j(k)
        }
})();
