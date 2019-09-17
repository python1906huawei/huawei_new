/**
 * PC商品预约、PC单商品预约
 * 兼容：支持单商品预约{"version":"1.3.1","time":"2017.12.25 14:31:20","author":"Ben"}
 * 优化：开售前不需要显示倒计时，但是要通过倒计时自动刷新按钮状态{"version":"1.3.1","time":"2018.01.10 15:55:31","author":"Ben"}
 * 优化：注释调试代码{"version":"1.2.16","time":"2018.01.25 14:11:51","author":"Ling"}
 * 优化：新增购买意向选择功能{"version":"1.2.16","time":"2018.04.25 17:00:59","author":"Ling"}
 * 修复：登录预约提交gladsku字段的代码被注释，登录预约用户已经预约不再弹出意向购买{"version":"1.2.16","time":"2018.05.04 11:52:14","author":"Ling"}
 * 优化：根据业务要求将意向选择弹窗的选中颜色没有对应的版本由原来的隐藏不展示改成置灰效果{"version":"1.2.16","time":"2018.05.11 15:57:34","author":"Ling"}
 * 优化：影响性能的正则{"version":"1.3.10","time":"2018.06.26 11:12:34","author":"Ben"}
 * 废弃：永久删除手机号码预约，仅保留登录预约{"time":"2018.09.06 10:58:30","author":"Ben"}
 * 优化：预约信息查询接口改造 {"time":"2018.11.03 10:56:28","author":"Ling"}
 * 优化：倒计时时间超过24小时显示天数 {"time":"2018.11.07 14:33:56","author":"Ling"}
 */
(function(window, $, utils, undefined) {
    var i18n = window.locale.reserve;
    /**
     * 将时间戳差值转成天时分秒
     * @param  {Int} timestamp     [时间戳差值]
     * @param  {String} connectSymbol [连字符]
     * @return {String}               [转成后的字符串]
     */

    function formatTimestamp(timestamp, connectSymbol) {
        var ta = [86400000, 3600000, 60000, 1000],
            day = '';
        ret = [];
        for (var i = 0; i < 4; i++) {
            var times = Math.floor(timestamp / ta[i]);
            timestamp = timestamp - ta[i] * times;
            if (i === 0) {
                if (times != 0) {
                    day = times > 1 ? times + i18n["reserve.days"] : times + i18n["reserve.day"];
                }
            } else {
                ret.push(times < 10 ? "0" + times : times);
            }
        }
        return day + ret.join(connectSymbol || ':');
    }

    /**
     * 获取时间戳
     * getTimestamp(1509618346167)
     * getTimestamp("1509618346167")
     * getTimestamp("2017-11-02 10:20:20")
     * getTimestamp(new Date())
     * @param  {Number|String|Date} time 需要转换的时间
     * @return {Number}      [返回时间戳。如果传入time不能正确的转成日期格式，将返回false]
     */
    function getTimestamp(time) {
        if (typeof time == 'number') {
            time += "";
        }
        if (typeof time === 'string') {
            if (/^\d+$/.test(time)) {
                time = parseInt(time, 10);
            } else {
                // IE:new Date('2017-10-30 10:20:20')不兼容
                // 兼容版本('2017/10/30 10:20:20')
                time = time.replace(/-/g, '/');
            }
            time = new Date(time);
        }
        if (Object.prototype.toString.call(time) == '[object Date]') {
            return time.getTime();
        } else {
            return false;
        }
    }

    // 去重
    function unique(arr) {
        var res = [];
        for (var i = 0; i < arr.length; i++) {
            if (res.indexOf(arr[i]) == -1) {
                res.push(arr[i]);
            }
        }
        return res;
    }

    var proto = {
        getServerInfo: function() {
            var self = this;
            var dtd = $.Deferred(),
                defaults = {};

            $.ajax({
                type: 'GET',
                dataType: 'json',
                url: window.openapiDomain + "/ams/prebook/queryReservationActivityInfo",
                data: {
                    activityCode: this.activityId
                },
                timeout: 5000,
                beforeSend: function(xhr) {
                    xhr.withCredentials = true;
                    try {
                        xhr.setRequestHeader("CsrfToken", csrftoken); // GET请求里面是否还需要这个参数
                    } catch (e) {

                    }
                },
                xhrFields: {
                    withCredentials: true
                },
                success: 'callback'
            }).done(function(res) {
                dtd.resolve(res);
            }).fail(function() {
                dtd.resolve(defaults);
                alert(i18n["try.again"])
            });
            return dtd;
        },
        checkStatus: function() {
            var status = this.status; // 0=>即将开始，1=>立即预约，2=>等待开售，3=>去抢购
            var now = this.now,
                beginT = this.startTime,
                endT = this.stopTime,
                saleT = this.buyTime;

            if (now < beginT) status = 0;
            else if (now >= beginT && now < endT) status = 1
            else if (now >= endT && now < saleT) status = 2;
            else if (now >= saleT) status = 3;
            this.status = status;
        },
        changeStatus: function(step) {
            if (step) {
                if (step == this.status) return false;
                this.status = step;
            }
            if (step == void 0) {
                step = this.status;
            }
            this.$btns.find('.step-' + step).css('display', 'block').siblings().hide();
            // 显示预约人数
            if (step !== 0) {
                this.showNumber();
            }
            this['step' + step] && this['step' + step]();
        },
        showNumber: function() {
            var number = this.number.toString();
            // 显示倒计时和人数用的一个元素
            if (!(this.isShowNum - 0)) {
                this.$countdown && this.$countdown.remove();
                return false
            }

            if (!this.$countdown) {
                this.$countdown = $('<div class="yy-countdown"></div>').appendTo(this.$el.find('.yy-wrapper'));
            }

            while (number.length < 8) {
                number = '0' + number;
            }

            // 区分单复数
            if (number != '00000000' && number != '00000001') {
                this.$countdown.html('<span class="yy-number">' + number + '</span>' + i18n["reserve.counts"]);
            } else {
                this.$countdown.html('<span class="yy-number">' + number + '</span>' + i18n["reserve.count"]);
            }

            return true;
        },
        // 即将开始
        step0: function() {
            // 倒计时
            var self = this,
                cdTime = self.startTime - self.now;

            // 不显示倒计时
            if (!(self.isShowCountDown - 0)) {
                (function countdown(timestamp) {
                    // 这里可能出现300毫秒这种情况
                    if (timestamp < 1000) {
                        self.timer && clearTimeout(self.timer);
                        if (timestamp > 0) {
                            setTimeout(function() {
                                self.now = self.startTime;
                                self.changeStatus(1);
                            }, timestamp);
                        } else {
                            self.now = self.startTime;
                            self.changeStatus(1);
                        }
                        return;
                    }

                    self.timer = setTimeout(function() {
                        countdown(timestamp - 1000);
                    }, 1000);
                })(cdTime);
                return;
            }

            // 显示倒计时
            this.$countdown = $('<div class="yy-countdown"><span class="yy-text">' + i18n["reserve.distance"] + '</span> <span class="yy-cd"></span></div>').appendTo(this.$el.find('.yy-wrapper'));
            var $displayEl = this.$countdown.find('.yy-cd');

            (function countdown(timestamp) {
                // 这里可能出现300毫秒这种情况
                if (timestamp < 1000) {
                    self.timer && clearTimeout(self.timer);
                    if (timestamp > 0) {
                        setTimeout(function() {
                            self.now = self.startTime;
                            self.changeStatus(1);
                        }, timestamp);
                    } else {
                        self.now = self.startTime;
                        self.changeStatus(1);
                    }
                    return;
                }

                $displayEl.html(formatTimestamp(timestamp));

                self.timer = setTimeout(function() {
                    countdown(timestamp - 1000);
                }, 1000);
            })(cdTime);
        },
        //立即预约
        step1: function() {
            var self = this,
                oBtn = self.$btns.find('.step-1'),
                // 颜色、版本选择联动
                handleSelect = function() {
                    var $aliColor = $('#reserve-purpose').find('.itemColor a');
                    var $aliVersion = $('#reserve-purpose').find('.itemVersion a');
                    var $inviteError = $('#reserve-purpose').find('.invite-error');

                    // 选择颜色
                    $aliColor.on('click', function() {
                        $aliColor.removeClass('active');
                        $(this).addClass('active');
                        $inviteError.hide();
                        self.selectColor = $(this).find('span').text();
                        self.relateSelect(self.selectColor);
                    });

                    // 选择版本
                    $aliVersion.on('click', function() {
                        if ($(this).parent().parent().attr('class').indexOf('disabled') !== -1) {
                            return false;
                        } else {
                            $aliVersion.removeClass('active');
                            $(this).addClass('active');
                            $inviteError.hide();
                            self.selectVersion = $(this).find('span').text();
                        }
                    });
                };
            // 登录预约
            oBtn.on('click', function() {
                function handleLoginReserve() {
                    var loginReserveAll = utils.cookie.get("reserveUid_" + self.activityId) || ';';
                    var uid = utils.cookie.get("uid");

                    if (loginReserveAll.indexOf(";" + uid + ";") != -1) {
                        self.loginReserveApi();
                    } else {
                        self.inviteBox = new utils.box(self.getPurpose(), {
                            boxid: "reserve-purpose",
                            boxclass: 'reserve-modal',
                            title: i18n["purchase.intention"],
                            onclose: function() {
                                // 每次点击清空被选择的颜色、版本
                                self.selectColor = '';
                                self.selectVersion = '';
                            }
                        });
                        self.inviteBox.open();

                        // 处理弹框内交互
                        handleSelect();

                        // 点击提交，校验颜色、版本是否都被选择
                        $('.submit-btn').on("click",function() {
                            var $inviteError = $('#reserve-purpose').find('.invite-error');

                            if (self.selectColor && self.selectVersion) {
                                // 通过颜色、版本确定sku
                                $(self.configproductlist).each(function(item) {
                                    if (self.configproductlist[item].addItems.color == self.selectColor && 　self.configproductlist[item].addItems.version == self.selectVersion) {
                                        skuCode = self.configproductlist[item].sbomCode;
                                    }
                                });

                                // 每次点击清空被选择的颜色、版本
                                self.selectColor = '';
                                self.selectVersion = '';
                                self.inviteBox.close();
                                // 调用登录预约接口
                                self.loginReserveApi(skuCode);
                            } else if (self.selectColor && (self.selectVersion == undefined || self.selectVersion == '')) {
                                $inviteError.show();
                                $inviteError.text(i18n["storage.tip"]);
                            } else if ((self.selectColor == undefined || self.selectColor == '') && self.selectVersion) {
                                $inviteError.show();
                                $inviteError.text(i18n["color.tip"]);
                            } else {
                                $inviteError.show();
                                $inviteError.text(i18n["storageColor.tip"]);
                            }
                        });

                        // 点击跳过，对数据不做处理，直接请求接口
                        $('.jump-btn').on('click', function(e) {
                            // 每次点击清空被选择的颜色、版本
                            self.selectColor = '';
                            self.selectVersion = '';
                            self.inviteBox.close();
                            skuCode = '';
                            // 调用登录预约接口
                            self.loginReserveApi();
                        });
                    }
                }

                // 判断用户是否登录
                if (utils.isLogin()) {
                    if (self.skuLength > 0) {
                        handleLoginReserve();
                    } else {
                        self.loginReserveApi();
                    }
                } else {
                    if (window.pageConfig.locale == 'zh-CN') {
                        utils.upLogin(function() {
                            if (self.skuLength > 0) {
                                handleLoginReserve();
                            } else {
                                self.loginReserveApi();
                            }
                        });
                    } else {
                        utils.goLogin();
                    }
                }
            });
        },
        // 等待开售
        step2: function() {
            var self = this;
            // 开售剩余的秒数
            var s = parseInt((self.buyTime - self.now) / 1000, 10);
            self.$btns.find('.step-2').attr('href', self.webBuyUrl);

            self.timer = setInterval(function() {
                if (s > 1) {
                    s -= 1;
                    // console.log('抢购开售倒计时：' + s)
                } else {
                    clearInterval(self.timer);
                    self.changeStatus(3);
                }
            }, 1000);
        },
        // 去抢购
        step3: function() {
            this.$btns.find('.step-3').attr('href', this.webBuyUrl);
        },
        // 登录预约接口
        loginReserveApi: function(skuCode) {
            var self = this;
            // 处理skuCode值为空的情况
            var skuCode = skuCode || '';
            var data = {
                'activityCode': self.activityId,
                'cid': utils.getUrlParams('cid'),
                'wi': utils.getUrlParams('wi'),
                'cpsSource': utils.getUrlParams('cpsSource'),
                'cpsChannel': utils.getUrlParams('cpsChannel'),
                'gladSku': skuCode
            };

            utils.ajaxOpenAPI({
                type: 'POST',
                url: "/ams/prebook/loginAppointment",
                data: data,
                success: function(data) {
                    var loginReserveAll = utils.cookie.get("reserveUid_" + self.activityId) || ';';
                    var uid = utils.cookie.get('uid');

                    if (data.success) {
                        // 记录登录预约用户防止重复预约
                        utils.cookie.set("reserveUid_" + self.activityId, loginReserveAll + uid + ";", {
                            expires: 10
                        });
                        self.handleReserveSuccess();
                    } else if (data.code == 9606) {
                        utils.goLogin();
                    } else {
                        // 优化提示
                        if (data.code == 9607) {
                            data.msg = i18n["reserved.repeat"];
                        }
                        new utils.box('<div style="text-align:center;"><img style="width:100px;margin-right:20px;vertical-align:middle;" src="https://res.vmallres.com/pimages//sale/2018-04/20180417172833695.png" />' + data.msg + '</div>', {
                            boxid: "reserveResult",
                            boxclass: 'ol_box_4',
                            title: i18n["pop.tip"],
                            showButton: true
                        }).open();

                        // 记录登录预约用户防止重复预约
                        utils.cookie.set("reserveUid_" + self.activityId, loginReserveAll + uid + ";", {
                            expires: 10
                        });
                    }
                },
                error: function(XMLHttpRequest, textStatus, errorThrown, data) {
                    alert(i18n["try.again"]);
                }
            });
        },
        // 处理预约成功
        handleReserveSuccess: function() {
            var self = this;

            var shareBox = new utils.box(self.$el.find('.yy-success-w').html(), {
                boxid: "reserve-success",
                boxclass: 'reserve-modal',
                title: i18n["success.wish"],
                showButton: false
            }).open();
            //分享
            $(shareBox.getBox()).find('.btn-share').on('click', function() {
                var target = this,
                    o = {
                        activityCode: 0,
                        shareMap: {
                            url: $(target).data('url'),
                            title: $(target).data('title'),
                            pic: $(target).data('img')
                        },
                        isTrueShare: false
                    };
                try {
                    Tool.share.shareSina(o);
                } catch (e) {
                    self.throwError('分享失败');
                }
            });
        },
        throwError: function(msg) {
            console.log('预约活动ID为' + this.activityId + msg);
        },
        // 初始化购买意向弹框
        getPurpose: function() {
            var self = this;
            var arrColor = []; // 表单配置的所有颜色、版本
            var arrVersion = [];
            var arrUniqueColor = []; // 去重后的颜色、版本
            var arrUniqueVersion = [];

            // 遍历
            $(self.configproductlist).each(function(item) {
                arrColor.push($(this)[0].addItems.color);
            });

            $(self.configproductlist).each(function(item) {
                arrVersion.push($(this)[0].addItems.version);
            });

            arrUniqueColor = unique(arrColor);
            arrUniqueVersion = unique(arrVersion);

            self.chtml = '';

            $(arrUniqueColor).each(function(item) {
                self.chtml += '<li class="itemColor"><div><a href="javascript:;"><span>' + arrUniqueColor[item] + '</span></a></div></li>';
            });

            self.vhtml = '';

            $(arrUniqueVersion).each(function(item) {
                self.vhtml += '<li class="itemVersion"><div><a href="javascript:;"><span>' + arrUniqueVersion[item] + '</span></a></div></li>';
            });

            return '<div class="reserve-purpose">\
            <dl class="product-color clearfix">\
            <label>' + i18n["select.color"] + '</label>\
            <div class="product-color-detail">\
            <ul>' + this.chtml + '</ul></div></dl>\
            <dl class="product-version clearfix">\
            <label>' + i18n["select.storage"] + '</label>\
            <div class="product-version-detail">\
            <ul>' + this.vhtml + '\
            </ul></div></dl>\
            </div>\
            <span class="invite-error" style="display:none ;"></span>\
            <div class="text-center">\
            <a class="jump-btn" href="javascript:;">' + i18n["intention.jump"] + '</a>\
            <a class="submit-btn" href="javascript:;">' + i18n["intention.submit"] + '</a>\
            </div>\
            <div class="form-tips">' + i18n["kindly.Reminder"] + '</div>';
        },
        relateSelect: function(el) {
            var self = this;
            var arrSelectColor = [];
            var arrSelectVersion = [];
            var arrShowColor = [];
            var arrShowVersion = [];
            var $liVersion = $('#reserve-purpose').find('.itemVersion');
            var $liColor = $('#reserve-purpose').find('.itemColor');

            // 选择颜色后，显示关联的版本，不关联的版本隐藏
            $(self.configproductlist).each(function(item) {
                if (self.configproductlist[item].addItems.color == el) {
                    arrSelectVersion.push(self.configproductlist[item].addItems.version);
                }
            });

            var arrShowVersion = unique(arrSelectVersion); // 去重
            $liVersion.addClass('disabled');
            $liVersion.find('span').each(function(item) {
                for (var i = 0; i < arrShowVersion.length; i++) {
                    if ($(this).text() == arrShowVersion[i]) {
                        $(this).parent().parent().parent().removeClass('disabled');
                    }
                }
            });

            // 已选版本不在颜色关联版本内，清空被选版本和被选中状态
            if (arrShowVersion.indexOf(self.selectVersion) == -1) {
                $liVersion.find('span').each(function() {
                    if ($(this).text() == self.selectVersion) {
                        $(this).parent().removeClass('active');
                    }
                });
                self.selectVersion = '';
            }
        }
    };

    // 预约对象.mod-reverse
    function Reserve(el) {
        var $el = $(el),
            id = $el.data('id');

        this.$el = $el;
        this.activityId = id;
        this.status = 0;
        this.$btns = $el.find('.yy-action');
        this.configproductlist = this.$el.data('configproductlist');
        this.skuLength = this.configproductlist.length;
        // 被选择的颜色、版本
        this.selectColor;
        this.selectVersion;
        // 颜色、版本list弹框拼接
        this.chtml = '';
        this.vhtml = '';
        // 购买意向弹框
        this.inviteBox;
        this.timer = null;

        var self = this;
        this.getServerInfo().then(function(res) {
            // 判断参数返回值
            if (res.success && res.reservationInfo) {
                // 接口数据缓存
                var data = {
                    name: res.reservationInfo.disPrdName, // 活动名称
                    startTime: res.reservationInfo.reservationStartTime, // 预约开始时间
                    stopTime: res.reservationInfo.reservationStopTime, // 预约结束时间
                    buyTime: res.reservationInfo.buyTime, // 抢购时间
                    now: getTimestamp(res.reservationInfo.serverTime || +new Date()), // 服务器时间
                    number: res.reservationInfo.reservationNumber, // 预约人数
                    isShowNum: res.reservationInfo.isShowNum, // 是否展示预约人数，1 展示 0 隐藏
                    isShowCountDown: res.reservationInfo.isShowCountDown, // 是否显示倒计时 1 显示 0 隐藏
                    webBuyUrl: res.reservationInfo.webBuyUrl, //pc端抢购url
                };

                $.extend(self, data);

                // 处理不同国家月份展示
                function setMouth(m) {
                    monthsArr = [i18n["month.Jan"], i18n["month.Feb"], i18n["month.Mar"], i18n["month.Apr"], i18n["month.May"], i18n["month.Jun"], i18n["month.Jul"], i18n["month.Aug"], i18n["month.Sep"], i18n["month.Oct"], i18n["month.Nov"], i18n["month.Dec"]];
                    return monthsArr[m];
                }

                // 格式化日期，格式：10月17日 10:08
                function formatTime(t) {
                    var d = new Date(t);
                    var isFillZero = function(v) {
                        return v < 10 ? '0' + v : v;
                    };

                    // 不同国家月日展示顺序不同，做国际化的时候要注意修改此处
                    var locale = window.pageConfig.locale;
                    if (locale == 'zh-CN' || locale == 'en-GB' || locale == 'en-IN' || locale == 'en-MY' || locale == 'en-MYHW' || locale == 'en-US' || locale == 'it-IT') { // 月 日
                        return setMouth(d.getMonth()) + i18n["reserve.month"] + d.getDate() + i18n["reserve.data"] + isFillZero(d.getHours()) + ':' + isFillZero(d.getMinutes());
                    } else { // 日 月
                        return d.getDate() + i18n["reserve.data"] + setMouth(d.getMonth()) + i18n["reserve.month"] + isFillZero(d.getHours()) + ':' + isFillZero(d.getMinutes());
                    }
                }

                // 单商品预约：显示预约和开售时间
                self.$el.find('.reserve-text').text(i18n["reserve.label"] + formatTime(self.startTime) + ' - ' + formatTime(self.stopTime));
                self.$el.find('.buy-text').text(i18n["sale.label"] + formatTime(self.buyTime));

                self.checkStatus();
                self.changeStatus();

            } else {
                self.$el.find('#remark').show();
                return false;
            }
        });
    }

    Reserve.prototype = proto;
    Reserve.constructor = Reserve;

    // 判断页面中是否存在单商品预约或者多商品预约
    if ($('.mod-reserve').length && $('.mod-reserve-single').length) {
        var hasMultiReserve = true;
        var hasSingleReserve = true;
    } else if ($('.mod-reserve-single').length) {
        var hasSingleReserve = true;
    } else if ($('.mod-reserve').length) {
        var hasMultiReserve = true;
    }

    var initial = {
        init: function(el) {
            var $el = $(el);
            $el.each(function() {
                new Reserve(this);
            });

            // 单商品预约：置顶效果
            if ($el.selector == '.mod-reserve-single') {
                // 判断国家，按钮文案过长做样式调整
                if (window.pageConfig.locale == 'cz-CZHW' && 　$el.find('.yy-deposit').length >= 1) {
                    $el.find('.yy-btns a').css('font-size', '12px');
                }

                $(window).on('load', function() {
                    // 装修时不执行
                    if (window.shopdcmode == "DESIGN") {
                        return false;
                    }

                    var offsetTop;
                    var $bd = $el.find('.bd');

                    $(window).scroll(function() {
                        // 滚动时实时获取组件距离顶部的高度
                        offsetTop = $el.offset().top;

                        // 判断时候滑动到窗口顶部
                        if ($(document).scrollTop() > offsetTop) {
                            $bd.css({
                                position: 'fixed',
                                top: 0
                            });
                        } else {
                            $bd.css("position", "relative");
                        }
                    });
                });
            }
        }
    };

    try {
        if (hasMultiReserve) {
            DC.defineModule('reserve', initial);
        }
        if (hasSingleReserve) {
            DC.defineModule('reserve-single', initial);
        }
    } catch (e) {}

    // 初始页面模块
    $(function() {
        if (hasMultiReserve && hasSingleReserve) {
            initial.init(".mod-reserve");
            initial.init(".mod-reserve-single");
        } else if (hasMultiReserve) {
            initial.init(".mod-reserve");
        } else if (hasSingleReserve) {
            initial.init(".mod-reserve-single");
        }
    });

    // 设置居中
    var width = $('.mod-reserve-single  .yy-btns').width() / 2;
    $('.mod-reserve-single  .radius-one').css({ 'margin-left': -width, 'left': '50%' });

})(window, jQuery, utils);