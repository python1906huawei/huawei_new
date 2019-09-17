var decodeXSS = function(input) {
    if ("string" === typeof input && input.indexOf("&") > -1) {
        var tmp = document.createElement("textarea");
        tmp.innerHTML = input;
        input = tmp.value
    }
    return input
};
var htmlspecialchars = function(input) {
    if ("string" === typeof input) {
        input = input.replaceAll("&", "&amp;");
        input = input.replaceAll("<", "&lt;");
        input = input.replaceAll(">", "&gt;");
        input = input.replaceAll('"', "&quot;");
        input = input.replaceAll("'", "&#x27;");
        input = input.replaceAll("\\(", "&#x28;");
        input = input.replaceAll("\\)", "&#x29;");
        input = input.replaceAll("\\[", "&#x5b;");
        input = input.replaceAll("\\]", "&#x5d;");
        input = input.replaceAll("\\{", "&#x7b;");
        input = input.replaceAll("\\}", "&#x7d;")
    }
    return input
};
var htmlspecialcharsOnce = function(input) { return htmlspecialchars(decodeXSS(input)) };


jQuery.fn.textS = function(value) { if ("undefined" === typeof value) { return this.text() } return this.text(decodeXSS(value)) };
jQuery.fn.valS = function(value) { if ("undefined" === typeof value) { return this.val() } return this.val(decodeXSS(value)) };
jQuery.fn.attrS = function(k, v) { if ("string" === typeof v) { return this.attr(k, decodeXSS(v)) } return this.attr(k, v) };
(function() {
    var reEscape = new RegExp("(\\" + ["/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\"].join("|\\") + ")", "g");

    function fnFormatResult(value, data, currentValue) {
        var value = unescape(value);
        var pattern = "(" + currentValue.replace(reEscape, "\\$1") + ")";
        return value.replace(new RegExp(pattern, "gi"), "$1")
    }

    function unescape(a) {
        a = "" + a;
        return a.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&apos;/g, "'")
    }

    function escape(str) {
        str = "" + str;
        return str.replaceAll("&lt;", "").replaceAll("&gt;", "").replaceAll("/", "").replaceAll("<", "").replaceAll(">", "").replaceAll("em", "").replaceAll("&#x2f;", "")
    }

    function Autocomplete(el, options) {
        this.el = $(el);
        this.el.attr("autocomplete", "off");
        this.suggestions = [];
        this.data = [];
        this.badQueries = [];
        this.selectedIndex = -1;
        this.currentValue = this.el.val();
        this.intervalId = 0;
        this.cachedResponse = [];
        this.onChangeInterval = null;
        this.ignoreValueChange = false;
        this.serviceUrl = options.serviceUrl;
        this.isLocal = false;
        this.options = {
            caseSensitive: false,
            autoSubmit: false,
            minChars: 1,
            maxHeight: 300,
            deferRequestBy: 0,
            width: 0,
            highlight: true,
            params: {},
            fnFormatResult: fnFormatResult,
            delimiter: null
        };
        this.initialize();
        this.setOptions(options)
    }
    $.fn.autocomplete = function(options) {
        return new Autocomplete(this.get(0) || $("<input />"), options)
    };
    Autocomplete.prototype = {
        killerFn: null,
        initialize: function() {
            var me, uid, autocompleteElId;
            me = this;
            uid = Math.floor(Math.random() * 1048576).toString(16);
            autocompleteElId = "Autocomplete_" + uid;
            this.killerFn = function(e) {
                var obj = e.target || e.srcElement;
                if ($(obj).closest(".search-bar").find(".autocomplete").size() === 0) {
                    me.killSuggestions();
                    me.disableKillerFn()
                }
            };
            if (!this.options.width) {
                this.options.width = this.el.width()
            }
            this.mainContainerId = "AutocompleteContainter_" + uid;
            $('<div id="' + this.mainContainerId + '""><div class="autocomplete-w1"><div class="autocomplete" id="' + autocompleteElId + '" style="display:none; width:300px;"></div></div></div>').appendTo("#searchBar-area");
            this.container = $("#" + autocompleteElId);
            this.fixPosition();
            if (window.opera) {
                this.el.keypress(function(e) {
                    me.onKeyPress(e)
                })
            } else {
                this.el.keydown(function(e) {
                    me.onKeyPress(e)
                })
            }
            this.el.keyup(function(e) {
                me.onKeyUp(e)
            });
            this.el.blur(function() {
                me.enableKillerFn()
            });
            this.el.focus(function(e) {
                me.fixPosition();
                me.onFocus(e)
            })
        },
        setOptions: function(options) {
            var o = this.options;
            $.extend(o, options);
            if (o.lookup) {
                this.isLocal = true;
                if ($.isArray(o.lookup)) {
                    o.lookup = {
                        suggestions: o.lookup,
                        data: []
                    }
                }
            }
            $("#" + this.mainContainerId).css({
                zIndex: o.zIndex
            });
            this.container.css({
                maxHeight: o.maxHeight + "px",
                width: o.width
            })
        },
        clearCache: function() {
            this.cachedResponse = [];
            this.badQueries = []
        },
        disable: function() {
            this.disabled = true
        },
        enable: function() {
            this.disabled = false
        },
        fixPosition: function() {
            var offset = this.el.offset();
            $("#" + this.mainContainerId).css({
                top: offset.top + this.el.innerHeight() + "px",
                left: offset.left + "px"
            })
        },
        fixStyle: function() {
            if ($("#search-history").is(":visible") || $(".autocomplete").is(":visible")) {
                $("#search-bar-form").addClass("hover")
            } else {
                $("#search-bar-form").removeClass("hover")
            }
        },
        enableKillerFn: function() {
            var me = this;
            $(document).bind("click", me.killerFn)
        },
        disableKillerFn: function() {
            var me = this;
            $(document).unbind("click", me.killerFn)
        },
        killSuggestions: function() {
            var me = this;
            this.stopKillSuggestions();
            this.intervalId = window.setInterval(function() {
                me.hide();
                me.stopKillSuggestions()
            }, 50)
        },
        stopKillSuggestions: function() {
            window.clearInterval(this.intervalId)
        },
        onKeyPress: function(e) {
            if (this.disabled || !this.enabled) {
                return
            }
            switch (e.keyCode) {
                case 27:
                    this.el.valS(escape(this.currentValue));
                    this.hide();
                    break;
                case 9:
                case 13:
                    if (this.selectedIndex === -1) {
                        this.hide();
                        return
                    }
                    this.select(this.selectedIndex);
                    if (e.keyCode === 9) {
                        return
                    }
                    break;
                case 38:
                    this.moveUp();
                    break;
                case 40:
                    this.moveDown();
                    break;
                default:
                    return
            }
            e.stopImmediatePropagation();
            e.preventDefault()
        },
        onKeyUp: function(e) {
            if (this.disabled) {
                return
            }
            switch (e.keyCode) {
                case 38:
                case 40:
                    return
            }
            clearInterval(this.onChangeInterval);
            if (this.currentValue !== this.el.val()) {
                if (this.options.deferRequestBy > 0) {
                    var me = this;
                    this.onChangeInterval = setInterval(function() {
                        me.onValueChange()
                    }, this.options.deferRequestBy)
                } else {
                    this.onValueChange()
                }
            }
        },
        onFocus: function(e) {
            clearInterval(this.onChangeInterval);
            if ($.trim(this.currentValue) != "") {
                var me = this;
                this.onChangeInterval = setInterval(function() {
                    me.onValueChange()
                }, this.options.deferRequestBy)
            }
        },
        onValueChange: function() {
            clearInterval(this.onChangeInterval);
            this.currentValue = this.el.val();
            var q = this.getQuery(this.currentValue);
            this.selectedIndex = -1;
            if (this.ignoreValueChange) {
                this.ignoreValueChange = false;
                return
            }
            if (q === "" || q.length < this.options.minChars) {
                this.hide()
            } else {
                this.getSuggestions(q)
            }
        },
        getQuery: function(val) {
            var d, arr;
            d = this.options.delimiter;
            if (!d) {
                return $.trim(val)
            }
            arr = val.split(d);
            return $.trim(arr[arr.length - 1])
        },
        getSuggestionsLocal: function(q) {
            var ret, arr, len, val, i;
            arr = this.options.lookup;
            len = arr.suggestions.length;
            ret = {
                suggestions: [],
                data: []
            };
            q = q.toLowerCase();
            for (i = 0; i < len; i++) {
                val = arr.suggestions[i];
                if (val.toLowerCase().indexOf(q) === 0) {
                    ret.suggestions.push(val);
                    ret.data.push(arr.data[i])
                }
            }
            return ret
        },
        getSuggestions: function(q) {
            var cr, me;
            cr = this.isLocal ? this.getSuggestionsLocal(q) : this.cachedResponse[this.options.caseSensitive ? q : q.toLowerCase()];
            if (cr && $.isArray(cr.suggestions)) {
                this.suggestions = cr.suggestions;
                this.data = cr.data;
                this.suggest()
            } else if (!this.isBadQuery(q)) {
                me = this;
                me.options.params.query = q;
                $.post(this.serviceUrl, me.options.params, function(txt) {
                    me.processResponse(txt)
                }, "text")
            }
        },
        isBadQuery: function(q) {
            var i = this.badQueries.length;
            while (i--) {
                if (q.trim() === this.badQueries[i].trim()) {
                    return true
                }
            }
            return false
        },
        hide: function() {
            this.enabled = false;
            this.selectedIndex = -1;
            this.container.hide();
            this.fixStyle()
        },
        suggest: function() {
            if (this.suggestions.length === 0) {
                this.hide();
                return
            }
            var me, len, div, f, v, i, s, mOver, mClick;
            me = this;
            len = this.suggestions.length;
            f = this.options.fnFormatResult;
            v = this.getQuery(this.currentValue);
            mOver = function(xi) {
                return function() {
                    me.activate(xi)
                }
            };
            mClick = function(xi) {
                return function() {
                    me.select(xi)
                }
            };
            this.container.hide().empty();
            for (i = 0; i < len; i++) {
                s = this.suggestions[i];
                s = s.transHtmlAttribute();
                div = $((me.selectedIndex === i ? '<div class="selected"' : "<div") + ">" + f(s, this.data[i], v) + "</div>");
                div.click(mClick(i));
                this.container.append(div);
                var val = div.text();
                div.attr("title", val)
            }
            this.enabled = true;
            this.container.show();
            this.fixStyle()
        },
        processResponse: function(text) {
            var response;
            try {
                response = eval("(" + text + ")")
            } catch (err) {
                return
            }
            if (!$.isArray(response.data)) {
                response.data = []
            }
            if (!this.options.noCache) {
                this.cachedResponse[this.options.caseSensitive ? response.query : response.query.toLowerCase()] = response;
                if (response.suggestions.length === 0) {
                    this.badQueries.push(response.query)
                }
            }
            if (response.query.transHtmlAttribute() === this.getQuery(this.currentValue)) {
                this.suggestions = response.suggestions;
                this.data = response.data;
                this.suggest()
            }
        },
        activate: function(index) {
            var divs, activeItem;
            divs = this.container.children();
            if (this.selectedIndex !== -1 && divs.length > this.selectedIndex) {
                $(divs.get(this.selectedIndex)).removeClass()
            }
            this.selectedIndex = index;
            if (this.selectedIndex !== -1 && divs.length > this.selectedIndex) {
                activeItem = divs.get(this.selectedIndex);
                $(activeItem).addClass("selected")
            }
            return activeItem
        },
        deactivate: function(div, index) {
            div.className = "";
            if (this.selectedIndex === index) {
                this.selectedIndex = -1
            }
        },
        select: function(i) {
            var selectedValue, f;
            selectedValue = this.suggestions[i];
            selectedValue = escape(selectedValue);
            if (selectedValue) {
                this.el.valS(selectedValue);
                if (this.options.autoSubmit) {
                    f = this.el.parents("form");
                    if (f.length > 0) {
                        f.get(0).submit()
                    }
                }
                this.ignoreValueChange = true;
                this.hide();
                this.onSelect(i);
                this.doSearch(i)
            }
        },
        moveUp: function() {
            if (this.selectedIndex === -1) {
                return
            }
            if (this.selectedIndex === 0) {
                this.container.children().get(0).className = "";
                this.selectedIndex = -1;
                this.el.valS(escape(this.currentValue));
                return
            }
            this.adjustScroll(this.selectedIndex - 1)
        },
        moveDown: function() {
            if (this.selectedIndex === this.suggestions.length - 1) {
                return
            }
            this.adjustScroll(this.selectedIndex + 1)
        },
        adjustScroll: function(i) {
            var activeItem, offsetTop, upperBound, lowerBound;
            activeItem = this.activate(i);
            offsetTop = activeItem.offsetTop;
            upperBound = this.container.scrollTop();
            lowerBound = upperBound + this.options.maxHeight - 25;
            if (offsetTop < upperBound) {
                this.container.scrollTop(offsetTop)
            } else if (offsetTop > lowerBound) {
                this.container.scrollTop(offsetTop - this.options.maxHeight + 25)
            }
            this.el.valS(this.getValue(escape(this.suggestions[i])))
        },
        onSelect: function(i) {
            var me, fn, s, d;
            me = this;
            fn = me.options.onSelect;
            s = me.suggestions[i];
            d = me.data[i];
            me.el.valS(me.getValue(escape(s)));
            if ($.isFunction(fn)) {
                fn(s, d, me.el)
            }
        },
        getValue: function(value) {
            var del, currVal, arr, me;
            me = this;
            del = me.options.delimiter;
            if (!del) {
                return value
            }
            currVal = me.currentValue;
            arr = currVal.split(del);
            if (arr.length === 1) {
                return value
            }
            return currVal.substr(0, currVal.length - arr[arr.length - 1].length) + value
        },
        doSearch: function(i) {
            var me, d, v;
            me = this;
            s = me.suggestions[i];
            s = s.transHtmlAttribute();
            s = escape(s);
            v = $.trim(s);
            // pushMsgAssociationalWord(v);
            //var sctUrl = ec.base.findSearchHotWordUrl(v);
            // if (sctUrl == null || sctUrl == "") {
            ec.openWindow("/search?keyword=" + encodeURIComponent(v))
                //} else {
                //ec.openWindow(sctUrl)
                // }
            return false
        }
    }
})();