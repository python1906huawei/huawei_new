/**
 * Liguojun 2018.11.30 优化
 */
(function() {
    // 语言类型
    var lanType = (window.pageConfig.locale || 'zh-CN').split('-')[0];

    // 多国语言
    var i18n = window.locale.sign;

    // 多国语言单复数规则
    var rules = {
        rule1: {
            "one": function(num) {
                // 俄罗斯规则：1.21.31等，排除11
                return num % 10 == 1 && num % 100 != 11;
            },
            "few": function(num) {
                // 俄罗斯规则дня：尾数的个位数是2、3、4并且11、12、13这个三个数
                return /(2|3|4)/.test(num % 10) && !/(12|13|14)/.test(num % 100);
            },
            "many": function(num) {
                return num % 10 == 0 || /(5|6|7|8|9)/.test(num % 10) || /(11|12|13|14)/.test(num % 100);
            }
        },
        rule2: {
            "one": function(num) {
                // 只有数字1
                return num == 1;
            },
            "few": function(num) {
                // 只有数字2、3、4
                return /(2|3|4)/.test(num);
            }
        },
        rule3: {
            // 只有数字1
            "one": function(num) {
                return num == 1;
            }
        },
        rule4: {
            // 只有数字1和0
            "one": function(num) {
                return num == 1 || num == 0;
            }
        }
    };

    // 单位“天”
    var units = {
        "ru": {
            "one": i18n['day'],
            "few": i18n['days'].split('|')[1],
            "many": i18n['days'].split('|')[0],
            "others": i18n['days'].split('|')[1]
        },
        "cz": {
            "one": i18n['day'],
            "few": i18n['days'].split('|')[1],
            "others": i18n['days'].split('|')[0]
        },
        "de": {
            "one": i18n['day'],
            "others": i18n['days']
        },
        "es": {
            "one": i18n['day'],
            "others": i18n['days']
        },
        "fr": {
            "one": i18n['day'],
            "others": i18n['days']
        },
        "it": {
            "one": i18n['day'],
            "others": i18n['days']
        },
        "pl": {
            "one": i18n['day'],
            "others": i18n['days']
        },
        "en": {
            "one": i18n['day'],
            "others": i18n['days']
        },
        "zh": {
            "one": i18n['day'],
            "others": i18n['days']
        },
        "nl": {
            "one": i18n['day'],
            "others": i18n['days']
        }
    }

    // 不同国家对应的规则
    var mapRules = {
        "ru": rules.rule1,
        "cz": rules.rule2,
        "de": rules.rule3,
        "es": rules.rule3,
        "fr": rules.rule4,
        "it": rules.rule3,
        "pl": rules.rule3,
        "en": rules.rule3,
        "zh": rules.rule3,
        "nl": rules.rule3
    };

    // 根据不同国家查对应的规则
    function getType(rules, num) {
        for (var type in rules) {
            if (rules[type](num)) {
                // 返回值是one,few,many
                return type;
            }
        }
        // 否则,返回值是others
        return "others"
    }

    // 根据不同国家规则找到对应的单复数单位
    function localeUnit(lanType, num) {

        var type = getType(mapRules[lanType], num);
        return units[lanType][type];
    }

    $('.mod-sign').addClass('mod-sign-' + lanType);
    var Sign = $('.mod-sign').data('signconfig');

    // 获取当月的天数
    function getDays(t) {
        //构造当前日期对象
        var date = new Date(t);

        //获取年份
        var year = date.getFullYear();

        //获取当前月份
        var month = date.getMonth() + 1;

        //定义当月的天数；
        var days;

        //当月份为二月时，根据闰年还是非闰年判断天数
        if (month == 2) {
            days = ((year % 4) == 0 && (year % 100) != 0 || (year % 400) == 0) ? 29 : 28;

        } else if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
            //月份为：1,3,5,7,8,10,12 时，为大月.则天数为31；
            days = 31;
        } else {
            //其他月份，天数为：30.
            days = 30;
        }
        return days;
    }

    //2019-03-28 变为 Tue Mar 12 2019 00:00:00 GMT+0800 (中国标准时间)
    function parseISO8601(dateString) {
        var isoExp = /^\s*(\d{4})-(\d\d)-(\d\d)\s*$/,
            date = new Date(NaN),
            month,
            parts = isoExp.exec(dateString);

        if (parts) {
            month = +parts[2];
            date.setFullYear(parts[1], month - 1, parts[3]);
            if (month != date.getMonth() + 1) {
                date.setTime(NaN);
            }
        }
        return date;
    }

    // 展示内容为：2019-03-28 取毫秒数
    function formatDate(t) {
        var oDate = new Date(t),
            year = oDate.getFullYear(),
            month = oDate.getMonth() + 1,
            date = oDate.getDate();
        return parseISO8601(year + "-" + isZero(month) + "-" + isZero(date)).getTime();
    }

    //参数：内容 时间 数值  求出对应的毫秒数日期数组
    function creatArray(a, date, b) {
        var array = [],
            i, dateString, day,
            year = new Date(date).getFullYear(),
            month = new Date(date).getMonth() + 1 + b;
        for (i = 0; i < a.length; i++) {
            day = a.eq(i).html();
            dateString = year + '-' + isZero(month) + '-' + isZero(day);
            array.push(parseISO8601(dateString).getTime());
        }
        // console.log(array);
        return array;
    }

    // 在0至10内的月份数字前面加“0”
    function isZero(num) {
        return 0 <= num && num < 10 ? '0' + num : num;
    }

    // 样式1：日历展示
    function Mycalendar(el, date) {
        this.el = el;
        this.date = date;
        this.signBtn = this.el.parents('.mod-sign-wrap').find('.sign-btn');
        this.signContentText = this.el.parents('.mod-sign-wrap').find('.sign-content-text');
        this.signSchedule = this.el.parents('.mod-sign-wrap').find('.sign-schedule ul');
        this.config = this.el.parents('.mod-sign').data('signconfig') || {};
        // 根据签到类型显示 您已累积签到 或者 您已连续签到
        this.signText = this.config.signType === "total" ? i18n['content.accumulative'] : i18n['content.consecutive'];
        this.init();
        this.bind();
        this.querySign(date);
    }
    Mycalendar.prototype = {
        init: function() {
            var unit = localeUnit(lanType, 0);
            this.signContentText.html(this.signText(0, unit));
            this.btnSign();
            this.container = $('<div class="calendar-container"></div>').appendTo(this.el);
            var data = this.getData(this.date);
            var dom = this.getDom(data);
            this.container.html(dom);
        },
        btnSign: function(isSigned) { //签到按钮展示内容
            // 已签到
            if (isSigned) {
                if (!this.signBtn.hasClass('sign-success')) {
                    this.signBtn.addClass('sign-success');
                    this.signBtn.html(i18n['btn.signed']);
                }
                return;
            }
            // 未签到
            this.signBtn.removeClass('sign-success');
            this.signBtn.html(i18n['btn.signing']);
        },
        getData: function(data) { //日历展示内容的信息汇总
            var now = new Date(data),
                year = now.getFullYear(),
                month = now.getMonth() + 1;
            //获取当前月1号是星期几
            var t = new Date(year + '/' + month + '/' + 1).getDay();
            //获取当月天数
            var days = getDays(now);
            //获取上月的天数
            var prev_month = month - 1,
                prev_year = year;
            if (prev_month < 1) {
                prev_year = prev_year - 1;
                prev_month = 12;
            }
            var prev_month_days = getDays(prev_year + '/' + prev_month + '/' + 1);

            var weekArr = []; //存一周的数据
            var dateArr = []; //存可视月的数据
            var i = 0,
                j = 1,
                k = 1,
                ii = 1,
                obj = {};

            // t=0代表当月是从周日开始，所以先从上月取最后一周的日历
            if (t == 0) {
                for (; i < 7; i++) {
                    obj = {
                        data: prev_month_days,
                        type: 'last'
                    };
                    weekArr.unshift(obj);
                    prev_month_days--;
                }
            } else { //t !=0 就表示从周日开始到有几天是上月的日历
                // 获取第一周上月的日历
                for (; i < t; i++) {
                    obj = {
                        data: prev_month_days,
                        type: 'last'
                    };
                    weekArr.unshift(obj);
                    prev_month_days--;
                }
                // 获取第一周当前月的日历
                for (; t < 7; t++) {
                    obj = {
                        data: j,
                        type: 'cur'
                    };
                    weekArr.push(obj);
                    j++;
                }
            }
            // 把第一周的数据放入到日历数组中
            dateArr.push(weekArr);
            // 当前展示六周，所以判断条件用了<=5
            for (; k <= 5; k++) {
                var tem_arr = [];
                for (i = 0; i < 7; i++) {
                    // 如果j超过了当前日历的最后一天，就继续从1开始取下月的日历
                    if (j > days) {
                        obj = {
                            data: ii,
                            type: 'next'
                        };
                        tem_arr.push(obj);
                        ii++;
                    } else {
                        obj = {
                            data: j,
                            type: 'cur'
                        };
                        tem_arr.push(obj);
                        j++;
                    }
                }
                dateArr.push(tem_arr);
            }
            var data = {
                cur_year: now.getFullYear(),
                cur_month: now.getMonth() + 1,
                cur_day: new Date().getDate(),
                list: dateArr,
                week: i18n["calendar.week"],
                today_year: new Date().getFullYear(),
                today_month: new Date().getMonth() + 1
            };
            // console.log(data);
            return data;
        },
        getDom: function(data) { //日历中展示的内容dom
            var today = formatDate(new Date());
            var head = '<table class="myCal-btn"><tbody><tr class="myCal-row btn-row"><td class="myCal-row-btn prev-year"></td>' +
                '<td class="myCal-row-btn myCal-row-lastMonth prev-month">&lt;</td>' +
                '<td class="myCal-row-btn myCal-row-thisMonth current-month" data-month=' + data.cur_month + '>' + i18n["calendar.month"][data.cur_month + ""] + '</td>' +
                '<td class="myCal-row-btn myCal-row-thisYear current-year">' + data.cur_year + i18n["calendar.year"] + '</td>' +
                '<td class="myCal-row-btn myCal-row-nextMonth next-month">&gt;</td>' +
                '<td class="myCal-row-btn next-year"></td></tr></tbody></table>';
            var body = '<table class="myCalendar" cellspacing="0"><thead><tr class="myCal-row day-row">';
            for (var a = 0, b = data.week.length; a < b; a++) {
                body += '<td class="myCal-row-day">' + data.week[a] + '</td>';
            }
            body += '</tr></thead><tbody>';
            var str = '',
                t;
            for (var m = 0, n = data.list.length; m < n; m++) {
                str += '<tr class="myCal-row">';
                for (var ii = 0, jj = data.list[m].length; ii < jj; ii++) {
                    if (data.list[m][ii].type == 'last') {
                        t = formatDate(data.cur_year + '/' + isZero(data.cur_month - 1) + '/' + isZero(data.list[m][ii].data));
                        if (today == t) {
                            str += '<td class="myCal-row-date last today">' + data.list[m][ii].data + '</td>';
                        } else {
                            str += '<td class="myCal-row-date last">' + data.list[m][ii].data + '</td>';
                        }
                    } else if (data.list[m][ii].type == 'next') {
                        t = formatDate(data.cur_year + '/' + isZero(data.cur_month + 1) + '/' + isZero(data.list[m][ii].data));
                        if (today == t) {
                            str += '<td class="myCal-row-date next today">' + data.list[m][ii].data + '</td>';
                        } else {
                            str += '<td class="myCal-row-date next">' + data.list[m][ii].data + '</td>';
                        }
                    } else {
                        t = formatDate(data.cur_year + '/' + isZero(data.cur_month) + '/' + isZero(data.list[m][ii].data));
                        if (today == t) {
                            str += '<td class="myCal-row-date cur today">' + data.list[m][ii].data + '</td>';
                        } else {
                            str += '<td class="myCal-row-date cur">' + data.list[m][ii].data + '</td>';
                        }
                    }
                }
                str += '</tr>';
            }
            body += str;
            body += '</tbody></table>';
            return head + body;
        },
        querySign: function(date) { //查询日历全部日期展示信息
            var self = this;
            var data = { activityCode: self.config.activityCode };

            utils.ajaxOpenAPI({
                type: 'GET',
                url: "/ams/signIn/querySignInActivityInfo",
                data: data,
                success: function(data) {
                    if (data && data.success) {
                        var signInfo = data.signinInfo,
                            signTime = [], //保存签到记录时间戳
                            i,
                            t = new Date().getTime(),
                            sTime = formatDate(signInfo[0].startTime),
                            eTime = formatDate(signInfo[0].endTime),
                            curTime = formatDate(t),
                            curArray = creatArray($('.cur'), date, 0),
                            lastArray = creatArray($('.last'), date, -1),
                            nextArray = creatArray($('.next'), date, 1);
                        var tableArray = [];
                        for (i = 0; i < lastArray.length; i++) {
                            tableArray.push(lastArray[i]);
                        }
                        for (i = 0; i < curArray.length; i++) {
                            tableArray.push(curArray[i]);
                        }
                        for (i = 0; i < nextArray.length; i++) {
                            tableArray.push(nextArray[i]);
                        }
                        for (i = 0; i < signInfo.length; i++) {
                            signTime.push(formatDate(signInfo[i].signinTime));
                        }
                        // console.log(tableArray);
                        // console.log(signTime);
                        for (i = 0; i < tableArray.length; i++) {
                            if (tableArray[i] >= sTime && tableArray[i] <= eTime && tableArray[i] <= curTime) {
                                if ($.inArray(tableArray[i], signTime) != -1) {
                                    $('.myCal-row-date').eq(i).addClass('signed').removeClass('today');
                                } else {
                                    $('.myCal-row-date').eq(i).addClass('no_signed');
                                }
                            }
                        }
                        //查询当天有没有签到
                        if ($.inArray(curTime, signTime) != -1) {
                            // 已签到
                            self.btnSign(true);
                            $('.today').addClass('signed').removeClass('today no_signed');
                        } else {
                            $('.today').removeClass('no_signed');
                        }

                        var num;
                        // 累积签到天数
                        if (self.config.signType === "total") {
                            num = parseInt(data.accumulativeRecord) || 0;
                        }
                        // 连续签到天数
                        if (self.config.signType === "continuous") {
                            num = parseInt(data.serialRecord) || 0;
                        }
                        var unit = localeUnit(lanType, num);
                        self.signContentText.html(self.signText(num, unit));

                    }
                }
            });
        },
        query: function() { //查询出签到天数更新按钮‘下方’的文字内容[点击查询]
            var self = this;
            var data = { activityCode: self.config.activityCode };
            utils.ajaxOpenAPI({
                type: 'GET',
                url: "/ams/signIn/querySignInActivityInfo",
                data: data,
                success: function(data) {
                    var num;
                    // 累积签到天数
                    if (self.config.signType === "total") {
                        num = parseInt(data.accumulativeRecord) || 0;
                    }
                    // 连续签到天数
                    if (self.config.signType === "continuous") {
                        num = parseInt(data.serialRecord) || 0;
                    }
                    var unit = localeUnit(lanType, num);
                    self.signContentText.html(self.signText(num, unit));
                }
            });
        },
        bind: function() { //日历上的左右按钮、签到按钮的'点击'事件
            var self = this;
            var lastMonth = this.el.find('.prev-month'),
                nextMOnth = this.el.find('.next-month');
            lastMonth.on('click', function() {
                changeMonth(this, -1);
            });
            nextMOnth.on('click', function() {
                changeMonth(this, 1);
            });

            this.signBtn.on('click', function() {
                if (self.signBtn.hasClass('sign-success')) {
                    return false;
                }
                var _callback = function(json) {
                    var text = null,
                        data = null,
                        icon = '<i></i>',
                        _class = 'dialog-button-yes',
                        btn = i18n["btn.confirm"];
                    if (json && json.success) {
                        text = i18n["prompt.sign.sucess"];
                        // 已签到
                        // 签到按钮、下方文字、日历上的标识变化
                        self.btnSign(true);
                        $('.today').addClass('signed').removeClass('today');
                        self.query();
                    } else {
                        icon = '<s></s>';
                        data = messageTip(json.code);
                        text = data.text;
                        btn = data.btn;
                        _class = data._class;
                    }
                    Tool.pcTipShow(icon, text, _class, btn);
                };

                utils.ajaxOpenAPI({
                    type: 'POST',
                    url: "/ams/signIn/signIn",
                    data: { 'activityCode': self.config.activityCode },
                    success: _callback
                });
            });

            function changeMonth(el, i) { //左右按钮点击事情，并加载最新日历内容
                var year = parseInt($(el).siblings('.current-year').html()),
                    month = parseInt($(el).siblings('.current-month').data('month'));
                month = Number(month) + i;
                if (month > 12) {
                    year = Number(year) + 1;
                    month = 1;
                } else if (month < 1) {
                    year = Number(year) - 1;
                    month = 12;
                }
                var date = year + '/' + isZero(month) + '/01';
                self.reload(date, $(el));
            }
        },
        reload: function(date, el) { //页面加载
            var data = this.getData(date);
            var dom = this.getDom(data);
            el.parents('.calendar-container').html(dom);
            this.bind();
            this.querySign(date);
        }
    };

    // 分享
    Md.sign = {};
    Md.sign.share = function() {
        var str = 'http://service.weibo.com/share/share.php?title=';
        str += ('' + encodeURIComponent(Sign.shareContent));
        str += ('&pic=' + encodeURIComponent(Sign.sharePic));
        str += ('&url=' + encodeURIComponent(Sign.shareUrl) + '&appkey=23431084');
        window.open(str);
    };

    // 根据报错信息，展示文本内容
    function messageTip(code) {
        var data = {
            text: '',
            btn: i18n["btn.confirm"],
            _class: 'dialog-button-ok'
        };
        switch (Number(code)) {
            case 9100:
            case 9101:
            case 9102:
                data.text = i18n["prompt.wait"];
                break;
            case 9103:
            case 9104:
                data.text = i18n["prompt.begin"];
                break;
            case 9105:
                data.text = i18n["prompt.over"];
                break;
            case 9106:
                data.text = i18n["prompt.login"];
                data.btn = i18n["btn.login"];
                data._class = 'dialog-button-ver';
                break;
            case 9107:
                data.text = i18n["prompt.condition"];
                break;
            case 9108:
                data.text = i18n["prompt.phone"];
                data.btn = i18n["btn.verification"];
                data._class = 'dialog-button-ver';
                break;
            case 9109:
                data.text = i18n["prompt.data"];
                break;
            case 9110:
                data.text = i18n["prompt.authentication"];
                data.btn = i18n["btn.authentication"];
                data._class = 'dialog-button-ver';
                break;
            case 9117:
                data.text = i18n["prompt.signed"];
                break;
        }
        return data;
    }

    // 样式2：进度展示
    function Schedule(el) {
        this.dom = el;
        this.signBtn = this.dom.find('.sign-btn');
        this.signContentText = this.dom.find('.sign-content-text');
        this.signSchedule = this.dom.find('.sign-schedule ul');
        this.config = this.dom.parents('.mod-sign').data('signconfig') || {};
        // 根据签到类型显示 您已累积签到 或者 您已连续签到
        this.signText = this.config.signType === "total" ? i18n['content.accumulative'] : i18n['content.consecutive'];
        this.rangeDaysLen = 7;
        this.accumulative = 0; // 累计签到
        this.consecutive = 0; // 连续签到
        this.tableSigntype = this.config.signType === "total" ? 0 : 1; //类型
        // console.log(this.tableSigntype);
    }

    Schedule.prototype.init = function() {
        // 按钮显示签到，可以点击签到
        this.btnSign();
        // 初始化进度图及签到信息
        var data = {
            accumulative: this.accumulative,
            consecutive: this.consecutive
        };
        // 更新及初始化签到天数，及进度
        this.update(data);
        // 从ams获取签到信息
        this.getSignInfo();
        this.bindEvent();
    };

    // 获取签到信息并初始化
    Schedule.prototype.getSignInfo = function() {
        var self = this;
        var data = { activityCode: this.config.activityCode };
        utils.ajaxOpenAPI({
            type: 'GET',
            url: "/ams/signIn/querySignInActivityInfo",
            data: data,
            success: function(res) {
                if (res && res.success) {
                    // 连续签到
                    if (res.serialRecord !== undefined) {
                        self.consecutive = parseInt(res.serialRecord);
                    }
                    // 累计签到
                    if (res.accumulativeRecord !== undefined) {
                        self.accumulative = parseInt(res.accumulativeRecord);
                    }
                    var signinInfo = res.signinInfo || [];
                    //保存签到记录时间戳
                    var signTime = [];
                    var t = new Date().getTime();
                    // 求当前时间毫秒数
                    var curTime = formatDate(t);
                    // 把接口中的签到时间保存到数组中
                    signinInfo.forEach(function(item) {
                        signTime.push(formatDate(item.signinTime));
                    });

                    // 记录奖励规则和类型
                    var rewardList = res.signInRewardRule.rewardList || [];
                    var signType = res.signInRewardRule.signType;

                    //查询当天有没有签到
                    if ($.inArray(curTime, signTime) != -1) {
                        // 按钮显示已签到，不能点击
                        self.btnSign(true);
                    } else {
                        // 按钮显示签到，可以点击签到
                        self.btnSign();
                    }
                    var data = {
                        accumulative: self.accumulative,
                        consecutive: self.consecutive,
                        rewardList: rewardList,
                        rewardsignType: signType
                    };
                    self.update(data);
                } else if (res.signInRewardRule && !res.success) {
                    // 连续签到
                    if (res.serialRecord == undefined) {
                        self.consecutive = 0;
                    }
                    // 累计签到
                    if (res.accumulativeRecord == undefined) {
                        self.accumulative = 0;
                    }

                    // 记录奖励规则和类型
                    var rewardList = res.signInRewardRule.rewardList || [];
                    var signType = res.signInRewardRule.signType;
                    var data = {
                        accumulative: self.accumulative,
                        consecutive: self.consecutive,
                        rewardList: rewardList,
                        rewardsignType: signType
                    };
                    self.update(data);
                }
            }
        });
    };

    // 更新及初始化签到天数，及进度
    Schedule.prototype.update = function(data) {
        var self = this;
        var daysRange = null;
        var num;
        // 累积签到天数
        if (self.config.signType === "total") {
            num = parseInt(data.accumulative);
        }
        // 连续签到天数
        if (self.config.signType === "continuous") {
            num = parseInt(data.consecutive);
        }
        daysRange = self.getRangeDays(self.rangeDaysLen, num, data.rewardList, data.rewardsignType);
        if (!daysRange) {
            return;
        }
        self.renderDom(daysRange);
    };
    // 签到按钮点击事件
    Schedule.prototype.bindEvent = function() {
        var self = this;
        this.signBtn.on('click', function() {
            if (self.signBtn.hasClass('sign-success')) {
                return false;
            }
            self.signHandler(function() {
                self.getSignInfo();
            });

        });
    };

    // 签到
    Schedule.prototype.signHandler = function(callback) {
        var self = this;
        var data = {
            activityCode: self.config.activityCode
        }
        utils.ajaxOpenAPI({
            type: 'POST',
            url: "/ams/signIn/signIn",
            data: data,
            success: function(res) {
                if (res && res.success) {
                    // 按钮显示已签到
                    self.btnSign(true);
                    // 弹窗提示签到成功
                    self.tipShow(true);
                    if (typeof callback === 'function') {
                        callback();
                    }
                } else {
                    // 提示未登录，已签到等信息
                    self.tipShow(false, res.code);
                }
            },
            error: function() {

            }
        });
    };

    // 改变按钮签到状态
    Schedule.prototype.btnSign = function(isSigned) {
        // 已签到
        if (isSigned) {
            if (!this.signBtn.hasClass('sign-success')) {
                this.signBtn.addClass('sign-success');
                this.signBtn.html(i18n['btn.signed']);
            }
            return;
        }
        // 未签到
        this.signBtn.removeClass('sign-success');
        this.signBtn.html(i18n['btn.signing']);
    };

    // 弹窗
    Schedule.prototype.tipShow = function(flag, code) {
        var icon, _class, btn, text, data = null;
        if (flag) {
            icon = '<i></i>'; // 弹出笑脸
            _class = 'dialog-button-yes';
            btn = i18n["btn.confirm"];
            text = i18n["prompt.sign.sucess"];
        } else {
            icon = '<s></s>'; // 悲伤图标
            data = messageTip(code);
            text = data.text;
            btn = data.btn;
            _class = data._class;
        }

        Tool.pcTipShow(icon, text, _class, btn);
    };

    // 渲染
    Schedule.prototype.renderDom = function(obj) {
        // console.log(obj);
        if (!obj) {
            return false;
        }
        var rangeDays = obj.rangeDays || [];
        var currentIndex = obj.currentIndex;
        var signDays = currentIndex === undefined ? 0 : rangeDays[currentIndex - 1].day;
        var html = '';
        var unit = localeUnit(lanType, signDays);
        // 签到类型 0:累计签到|1:连续签到(每天奖积分)|2:连续签到(当天奖积分)
        // console.log("ams配置" + obj.winningtype);
        // console.log("shopdc表单配置" + this.tableSigntype);
        if (!rangeDays.length) {
            return false;
        }

        rangeDays.forEach(function(item, i) {
            console.log(item)
            item.vlues === undefined || item.vlues === 0 ? vlues = "" : vlues = '+' + item.vlues;
            if (i + 1 <= currentIndex) {
                html += '<li class="selected"><div class="dic"><span class="day">' + item.day + ' ' + localeUnit(lanType, item) + '</span><span class="num" style="display:none">' + vlues + '</span></div></li>';
            } else {
                html += '<li><div class="dic"><span class="day">' + item.day + ' ' + localeUnit(lanType, item) + '</span><span class="num" style="display:none">' + vlues + '</span></div></li>';
            }
        });

        this.signSchedule.html(html);
        this.signContentText.html(this.signText(signDays, unit));
    };

    // len:页面显示长度, num：接口返回天数
    // 返回 显示当前页面天数区间及num的索引
    Schedule.prototype.getRangeDays = function(len, num, arr, type) {
        // console.log('/' + len + '/' + num + '/' + arr + '/' + type);
        if (!len || num === undefined) {
            return false;
        }
        if (num < 0) {
            num = 0;
        }

        var days = [];
        var data = [];
        var index;
        var reward = [];

        // 取到首位数字
        if (num === 0 || num % len) {
            days[0] = Math.floor(num / len) * len + 1;
        } else {
            days[0] = Math.floor((num - 1) / len) * len + 1;
        }
        if (days[0] === num) {
            index = 0;
        }

        if (!arr) {
            // console.log("不展示");
            for (var i = 0; i < len; i++) {
                data[i] = {
                    day: days[0] + i,
                    vlues: 0
                }
                if (num == data[i].day) {
                    index = i + 1;
                }
            }
        } else {
            // console.log("展示");
            if (type == 1 || type == 0) { //连续签到(每天奖积分)1  累计签到0
                // console.log("连续签到(每天奖积分)   累计签到");

                function arrSort(arr, day) {
                    for (var i = 0; i < arr.length; i++) {
                        if (arr[i].signInDays <= day) {
                            if (i + 1 < arr.length) {
                                if (arr[i + 1].signInDays > day) {
                                    return arr[i].rewardValue;
                                }
                            } else {
                                return arr[i].rewardValue;
                            }
                        }
                    }
                    return 0;
                }

                for (var i = 0; i < len; i++) {
                    data[i] = {
                        day: days[0] + i,
                        vlues: arrSort(arr, days[0] + i)
                    }
                    if (num == data[i].day) {
                        index = i + 1;
                    }
                }
            } else if (type == 2) { //连续签到(当天奖积分)
                // console.log("连续签到(当天奖积分)");
                arr.forEach(function(item) {
                    reward[item.signInDays - 1] = item.rewardValue;
                })

                for (var i = 0; i < len; i++) {
                    var vlues;
                    var value = (days[0] + i) % (reward.length);

                    if (value) {
                        vlues = reward[value - 1];
                    } else {
                        vlues = reward[reward.length - 1];
                    }

                    data[i] = {
                        day: days[0] + i,
                        vlues: vlues
                    }
                    if (num == data[i].day) {
                        index = i + 1;
                    }
                }
            }
        }

        return {
            rangeDays: data,
            currentIndex: index,
            winningtype: type
        }
    };

    DC.defineModule('sign', {
        init: function(dom) {
            Sign = $('.mod-sign').data('signconfig');
            if (Sign.style === "style-1") {
                var container = $(dom).find('.j-calendar');
                new Mycalendar(container, new Date());
                return;
            }
            // 进度图
            var schedule = new Schedule($(dom).find('.mod-sign-pc'));
            schedule.init();
        }
    });

    $('.mod-sign').each(function() {
        if (Sign.style === "style-1") {
            new Mycalendar($(this).find('.j-calendar'), new Date());
        } else {
            var schedule = new Schedule($(this).find('.mod-sign-pc'));
            schedule.init();
        }
    });
})();
