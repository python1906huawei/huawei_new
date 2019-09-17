/**
 * PC端：翻牌抽奖
 * 准备转测{"time":"2019.1.2 11:30:00","author":"Zhu"}
 * 优化：支持消耗积分{"time":"2019.2.25 11:30:00","author":"Zhu"}
 */
(function(window, $, undefined) {
    var initial = {
        init: function(mods) {
            $(mods).each(function(index, el) {
                // 国际化
                var i18n = window.locale.prizeFlipCards;
                window.isFlip = true;

                // 翻牌构造函数
                function FlipCard($el) {
                    this.$mod = $el;
                    this.config = $el.data("config");
                    this.prizeList = $el.data("prizeList");

                    // 如果没有抽奖数据，则返回
                    if (this.prizeList == false) {
                        return false;
                    }

                    this.activityCode = this.prizeList[0].activityCode;
                    this.box = {};
                    this.clickFlag = true; // 抽奖按钮是否可以点击
                    this.$bntstart = $el.find(".selectBox .face"); //开始翻牌按钮
                    // 分享
                    this.shareData = {
                        activityCode: this.activityCode,
                        shareMap: {
                            title: this.config.shareMap.title,
                            content: this.config.shareMap.content,
                            pic: this.config.shareMap.pic,
                            url: this.config.shareMap.url
                        }
                    };
                    this.PRIZE_INFO = {
                        minLevel: '', // 最低等级，返回V~
                        unitPrizeTime: null, // 基础抽奖次数
                        expendPointValue: 0, // 消耗积分值
                        isSupportShare: 0, // 是否支持分享0：否 1：是
                        shareExtra: 0, // 每次分享成功，增加几次抽奖机会
                        price: 0 // 0初始化失败 1存在 2提示活动已结束 3提示 太热情
                    };
                    this.isUsePoint = 0; // 是否使用积分，0:不使用，1:使用
                    this.isUsetipPrize = false; // 是否每次提示用户使用积分抽奖

                    Tool.share.shareType = this.shareData;

                    // 查询中奖名单
                    this.getPrizeList();
                    // 初始化奖品
                    this.initPrize();
                    // 初始化翻牌
                    this.initFlip();
                    // 查询活动信息
                    this.queryRuleInfo(this.activityCode);
                    // 点击洗牌
                    this.handleClick();
                    // 活动规则内容
                    var ruleList=$(".prize-content").html();
                    console.log(ruleList);

                    var lengthHtml = $("#Flip-content").height();
                    var lengthHtml2 = $(".prize-content").height();
                    if (lengthHtml2 > lengthHtml) {
                        $('.prize-content').height(136).css({ "display": "-webkit-box", "-webkit-line-clamp": "6", "-webkit-box-orient": "vertical", "word-break": "break-word", "overflow": "hidden", 'text-overflow': 'ellipsis' });
                        $(".v-rule").html(i18n["prompt.LearnMore"] + "<span>&gt;</span></span>");
                    }

                    // 活动规则弹出框
                    $(".mod-prize-flip-cards").on('click', '.v-rule', function(event) {
                        new utils.box(ruleList || '', {
                            boxid: "flipCards",
                            boxclass: "ol_box_4",
                            title: i18n["content.desc"],
                            showButton: true,
                            showCancel: false
                        }).open();
                    });

                    if (this.activityCode) {
                        var self = this;
                        // 每隔5分钟轮询最新中奖名单
                        setInterval(function() {
                            self.getPrizeList();
                        }, 3 * 60 * 1000);
                    }
                    this.contentHtml = $('.mod-prize-flip-cards #allParent').html();
                }

                // 查询活动信息，以便于进行消耗积分使用
                FlipCard.prototype.queryRuleInfo = function(activityCode) {
                    var self = this;
                    utils.ajaxOpenAPI({
                        type: 'GET',
                        url: '/ams/prize/queryRuleInfo',
                        data: { 'activityCode': activityCode, 't': new Date().getTime() },
                        success: function(json) {
                            if (json.success) {
                                // 如果是纯积分抽奖，每次都提示扣除积分
                                // //基础抽奖次数         消耗积分值
                                if (json.unitPrizeTime == 0 && json.expendPointValue > 0) {
                                    self.isUsePoint = 1; //使用积分
                                    self.isUsetipPrize = true; //提示用户使用积分抽奖
                                }
                                self.PRIZE_INFO.unitPrizeTime = json.unitPrizeTime; // 基础抽奖次数
                                self.PRIZE_INFO.expendPointValue = json.expendPointValue; // 消耗积分值
                                self.PRIZE_INFO.minLevel = json.minLevel; // 抽奖的等级条件
                                self.PRIZE_INFO.isSupportShare = json.isSupportShare; // 是否支持分享0：否 1：是
                                self.PRIZE_INFO.shareExtra = json.shareExtra; // 每次分享成功，增加几次抽奖机会
                                self.PRIZE_INFO.price = 1; // 初始化结果
                            } else {
                                if (json.code == '9000' || json.code == '9001') {
                                    self.PRIZE_INFO.price = 3;
                                } else if (json.code == '9002') {
                                    self.PRIZE_INFO.price = 2;
                                }
                            }

                        },
                        error: function() {
                            self.PRIZE_INFO.price = 0; // 初始化失败

                        }
                    });
                }
                // 中奖名单
                FlipCard.prototype.getPrizeList = function() {
                    var self = this;
                    utils.ajaxOpenAPI({
                        type: "GET",
                        url: "/ams/prize/queryPrizeResult",
                        data: { "activityCode": self.activityCode },
                        success: function(res) {
                            var s = '';
                            var list;
                            var len;
                            len = res.prizeResult && res.prizeResult.length;
                            if (len > 0) {
                                for (var i = 0; i < len; i += 1) {
                                    list = res.prizeResult[i];
                                    s += '<li class="clearfix"><div class="text-left">' + list.custLoginName + '</div><div class="text-right">' + i18n["tip.win"] + ' ' + list.prizeName + '</div></li>';
                                }
                            } else {
                                s = '<li>' + i18n["not.yet"] + '</li>';
                            }

                            $(".mod-prize-flip-cards #prizeList").html(s);
                        },
                        error: function() {}
                    });
                };

                // 初始化翻牌
                FlipCard.prototype.initFlip = function() {
                    var self = this;
                    // 初始化翻牌
                    self.rotateObj = $("#allParent").rotateEx({
                        getPrize: function(fnFlip) {
                            self.getPrize(fnFlip);
                        }
                    });
                };

                // 初始奖品
                FlipCard.prototype.initPrize = function() {
                    var self = this;
                    var prizeListShow = [];
                    var items = '';
                    var textHtml = '';

                    // 数组内的值交换
                    function swapArray(arr, index1, index2) {
                        arr[index1] = arr.splice(index2, 1, arr[index1])[0];
                        return arr;
                    }

                    if (self.prizeList.length < 5) { // 奖品小于5个
                        var ii = 0;
                        for (var i = 0; i < 8; i++) {
                            if (i % 2 != 0 || i >= self.prizeList.length * 2) {
                                prizeListShow.push({ "prizeName": "谢谢参与", "prizePic": self.config.thanksPic });
                            } else {
                                prizeListShow.push(self.prizeList[ii]);
                                ii++;
                            }
                        }
                        // 交换牌位
                        if (self.prizeList.length == 3) {
                            swapArray(prizeListShow, 4, 7)
                        } else if (self.prizeList.length == 4) {
                            swapArray(prizeListShow, 4, 5);
                            swapArray(prizeListShow, 6, 7);
                        }
                    } else if (self.prizeList.length < 8) { // 奖品等于或者大于5个 且小于8个
                        var ii = 0;
                        for (var i = 0; i < 8; i++) {
                            if (i % 2 != 0 && i < (8 - self.prizeList.length) * 2) {
                                prizeListShow.push({ "prizeName": "谢谢参与", "prizePic": self.config.thanksPic });
                            } else {
                                prizeListShow.push(self.prizeList[ii]);
                                ii++;
                            }
                        }
                        // 交换牌位
                        if (self.prizeList.length == 5) {
                            swapArray(prizeListShow, 3, 4);
                            swapArray(prizeListShow, 5, 6);
                        } else if (self.prizeList.length == 6) {
                            swapArray(prizeListShow, 3, 4);
                        }
                    } else if (self.prizeList.length == 7) {
                        var ii = 0;
                        for (var i = 0; i < 8; i++) {
                            if (i == 1) {
                                prizeListShow.push({ "prizeName": "谢谢参与", "prizePic": self.config.thanksPic });
                            } else {
                                prizeListShow.push(self.prizeList[ii]);
                                ii++;
                            }
                        }
                    } else { // 奖品等于或者大于8个
                        var ii = 0;
                        for (var i = 0; i < 8; i++) {
                            if (i == 7) {
                                prizeListShow.push({ "prizeName": "更多奖品", "prizePic": self.config.morePrizes });
                            } else if (i == 1) {
                                prizeListShow.push({ "prizeName": "谢谢参与", "prizePic": self.config.thanksPic });
                            } else {
                                prizeListShow.push(self.prizeList[ii]);
                                ii++;
                            }
                        }
                    }

                    $.each(prizeListShow, function(index, val) {

                        items += '<div class="item i' + Number(index + 1) + '">';
                        items += '<div class="parent">';
                        if (!val.prizePic) {
                            items += '<div class="face" style="background:#eadcdc;font-size:20px;line-height:8;text-align:center">' + i18n["prompt.massage"] + '</div>';
                        } else {
                            items += '<div class="face" style="background:url(' + val.prizePic + ') no-repeat center center #eadcdc;"></div>';
                        }
                        items += '<div class="back"><img src="' + self.config.bgPic + '" style="width: 100%;height: 100%"></div>';
                        items += '</div>'
                        items += '</div>';
                    });

                    $('#allParent').prepend(items);
                };

                // 点击开始洗牌,返回键
                FlipCard.prototype.handleClick = function() {
                    var self = this;
                    self.$bntstart.click(function() {
                        if (self.clickFlag) {
                            self.clickFlag = false;
                            // 开始洗牌
                            var $tapEle = self.$mod.find("#allParent");
                            $tapEle.on('click', '.selectBox .face', function() {
                                $tapEle.find(".parent").addClass("active");
                                self.rotateObj.toBack();
                            });
                            $tapEle.on('click', '.selectBox .back', function() {
                                $tapEle.find(".parent").removeClass("active");
                                self.rotateObj.toallFace();
                                self.$mod.find("#allParent").empty().html(self.contentHtml);
                                self.initFlip();
                            })
                        }
                    });
                };

                // 抽奖方法
                FlipCard.prototype.getPrize = function(fnFlip) {
                    var self = this;
                    var thanksPic = self.config.thanksPic;
                    var flipPic;
                    var data = {
                        text: '',
                        btn: i18n["btn.confirm"],
                        _class: 'dialog-button-yes',
                        notRedBag: false
                    };

                    var Prize = function() {
                        var _callback = function(res) {
                            // 接口调用成功，可以抽奖
                            if (res && res.success) {
                                // 抽奖次数为0时，不显示还有多少次机会
                                if (res.limit > 0) {
                                    var key = utils.getLanguageKey(res.limit, 'prompt.chance');
                                    self.box.text = (res.pcPrizeTip || res.pcNotPrizeTip || '') + i18n["prompt.have"] + res.limit + i18n[key];
                                } else {
                                    self.box.text = res.pcPrizeTip || res.pcNotPrizeTip || '';
                                }

                                if (("pcNotPrizeTip" in res)) {
                                    self.box.icon = '<s></s>';
                                } else {
                                    self.box.icon = '<i></i>';
                                }

                                self.box.btn = i18n["btn.confirm"];
                                self.box._class = 'dialog-button-yes';
                                Tool.pcTipShow(self.box.icon, self.box.text, self.box._class, self.box.btn);

                                // 弹出窗口点击关闭纸牌恢复原样
                                $('#dialog-btn, .box-close').one('click', function(event) {
                                    self.rotateObj.alldiffer();
                                });

                                self.clickFlag = !self.clickFlag; //按钮不可点击
                                var result = true;
                                // 点击翻牌，内容为接口奖品图片
                                $.each(self.prizeList, function(index, val) {
                                    var self = this;
                                    flipPic = thanksPic;
                                    if (val.prizeName == res.name) {
                                        flipPic = val.prizePic;
                                        result = false;
                                        return false;
                                    }
                                });
                                fnFlip(flipPic);
                                if (!result) { return false };
                            } else {
                                if (res.code == "9013") {
                                    if (res.isSupportShare == 0 || (res.isShareTimesUsedUp == true && res.isShared == 1)) {
                                        // 是否支持积分抽奖(0否 1是)
                                        if (res.isSupportPointPrize == 1) {
                                            // 噢，你的抽奖机会用完啦~别捉急，使用积分可以继续抽奖哦~温馨提示：每次抽奖将消耗${ruleInfo. expendPointValue }个积分
                                            data.text = i18n['prompt.point.prize'] + "<br>" + i18n['prompt.reminder'] + self.PRIZE_INFO.expendPointValue + i18n['tip.point'];
                                            self.isUsePoint = 1; //使用积分
                                            self.isUsetipPrize = true; //提示用户使用积分抽奖
                                        } else if (res.isSupportPointPrize == 0) {
                                            // 噢，你的抽奖机会用完，去看看其它活动吧~
                                            data.text = i18n["prompt.empty"];
                                            data.notRedBag = true;
                                        }
                                    } else if (res.isShareTimesUsedUp == false && res.isSupportShare == 1) {
                                        // 今天抽奖次数已用完啦，分享活动可再获得抽奖机会哦，立即分享~
                                        data.text = i18n["prompt.share"];
                                        data.btn = i18n["btn.share"];
                                        data._class = 'dialog-button-ver';
                                    }
                                } else if (res.code == "9026" && window.pageConfig.locale != "zh-CN") {
                                    data.btn = i18n["btn.confirm"];
                                    data.text = i18n['prompt.earn.point.a'] + self.PRIZE_INFO.expendPointValue + i18n['prompt.earn.point.b'];
                                } else if (res.code == "9027" && window.pageConfig.locale != "zh-CN") {
                                    data.btn = i18n["btn.confirm"];
                                    data.text = i18n['prompt.earn.point.a'] + self.PRIZE_INFO.expendPointValue + i18n['prompt.earn.point.b'];
                                } else {
                                    data = Md.prize.messageTip(res.code, res.msg, res.isSupportShare, res.isShareTimesUsedUp, self.PRIZE_INFO.expendPointValue);
                                }
                                self.box.icon = '<s></s>';
                                self.box.text = data.text;
                                self.box.btn = data.btn;
                                self.box._class = data._class;
                                Tool.pcTipShow(self.box.icon, self.box.text, self.box._class, self.box.btn);
                            }
                        };
                        ams.commonNewPrize({ activityCode: self.activityCode, isUsePoint: self.isUsePoint }, _callback);
                    };
                    // 是否支持消耗积分
                    if (self.isUsePoint && self.isUsetipPrize) {
                        // 每次提醒扣除积分
                        self.box.icon = '<s></s>';
                        self.box.text = i18n['prompt.consume'] + self.PRIZE_INFO.expendPointValue + i18n['tip.point'];
                        self.box.btn = i18n["btn.continue"];
                        self.box._class = data._class;
                        Tool.pcTipShow(self.box.icon, self.box.text, self.box._class, self.box.btn);
                        self.clickFlag = !self.clickFlag;
                        $('#dialog-btn').one('click', Prize);
                        $('.box-close').click(function(event) {
                            $('#dialog-btn').off('click', Prize);
                        });
                    } else {
                        self.clickFlag = !self.clickFlag;
                        Prize();
                    }
                };

                // 调用定义组件的函数
                $('.mod-prize-flip-cards').each(function() {
                    // 实例化每一个el
                    new FlipCard($(this));
                });
            });
        }
    };
    DC.defineModule('prize-flip-cards', initial);
    initial.init('.mod-prize-flip-cards');

})(window, jQuery);
