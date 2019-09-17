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
              , f = d('<label style="display:none;position:absolute;cursor:text;float:left;color:#dedede;z-index:' + (q + 1) + '">' + j + "</label>").attr("class", p.attr("class"))
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
                if (p.val().length == 0) {
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


    //自调用一次 为刷新购物车的数量显示
    ec.minicart.content();
})();


