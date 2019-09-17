/**
 * PC端：pic领券
 * 优化：没上传状态图时用弹窗提示用户
 * 优化：正常状态或者没有上传状态图的情况下才调用领券接口{"version":"1.2.16","time":"2017.10.18 11:53:45","author":"Ben"}
 * 修改：多时间段领券提示优化及1:N国际化支持{"version":"1.3.6","time":"2018.04.18 18:40:59","author":"Ben"}
 * 修复：多时间段领券1：N国际化时间展示错误 {"time":"2018.08.22 17:37:37","author":"Ling"}
 * 修复：考虑页面中存在多个相同券的情况，需要判断showStatusPicture{"time":"2018.08.31 14:36:28","author":"Ben"}
 * 需求：一键领券{"time":"2018.09.28 10:58:25","author":"Ben"}
 */
(function(window, $, undefined) {
    var i18n = window.locale.couponPic;
    var arrCouponParam = [];
    var $couponEl;

    // 查询所有券链接的状态
    $('a[data-couponpicconfig]').each(function(index, el) {
        var $el = $(el);
        // 链接的配置数据
        var anchorConfig = $el.data('couponpicconfig');
        // 模块的配置数据
        var modConfig = $el.parents('.mod-coupons').data('couponpicbgconfig');
        var item = {};

        // 如果开启了领券状态的开关
        if (modConfig.showStatusPicture) {
            item = {
                activityCode: anchorConfig.activityCode,
                batchCode: anchorConfig.batchCode
            };
            arrCouponParam.push(item);
        }
    });
    arrCouponParam.length && utils.queryCouponState(arrCouponParam, handleCouponState);

    // 处理券链接的显示状态
    function handleCouponState(data) {
        // 考虑接口返回字符串的场景
        var $aEls = $('a[data-couponpicconfig=\'{"anchorType":"coupon","activityCode":"' + data.activityCode + '","batchCode":"' + data.batchCode + '"}\']');
        var stateText = ''; // 领券状态文字
        var receiveStartTime = ''; // 下一场时间
        var textLineNumber = 1; // 默认是1行文本

        $aEls.each(function(index, el) {
            var $aEl = $(this);
            var $mod = $aEl.parents('.J_mod');
            var showStatusPicture = $mod.data('couponpicbgconfig').showStatusPicture;
            data.receiveStartTime = Number(data.receiveStartTime);

            // 只有水印选择样式1时才会显示下一场时间,showStatusPicture 1不显示 2显示样式1 3显示样式2
            if (showStatusPicture == 1) {
                if (data.receiveStartTime) {
                    var nextHours = new Date(data.receiveStartTime).getHours();
                    var nextMinutes = new Date(data.receiveStartTime).getMinutes();
                    nextMinutes = nextMinutes < 10 ? '0' + nextMinutes : nextMinutes;
                    // 国内才显示“下一场”
                    if (window.pageConfig.locale == 'zh-CN') {
                        receiveStartTime = ' 下一场' + nextHours + ':' + nextMinutes;
                    } else {
                        receiveStartTime = ' ' + nextHours + ':' + nextMinutes;
                    }
                    textLineNumber = 1;
                }
            } else {
                receiveStartTime = '';
            }

            if (data.receiveStates == -1) { // 已领完
                //修改状态文字
                stateText = i18n['empty'] + receiveStartTime;
            } else if (data.receiveStates == 1) { // 正常状态不操作
                return false; // 正常状态不操作
            } else if (data.receiveStates == 2) {
                //自营优惠券，领取后按钮为去使用，逻辑不变
                if (data.reviceType == 1) {
                    if ($aEls.hasClass('CN')) { //只改国内组件，不动海外，海外不支持
                        //已领取状态修改为去使用状态
                        stateText = i18n['toUse'];
                    } else {
                        stateText = i18n['received']; // 已领取
                    }
                } else {
                    //第三方券和优购码，优惠券上状态为“已领取”
                    stateText = i18n['received']; // 已领取
                }
            } else if (data.receiveStates == 3) { // 未开始
                stateText = i18n['notStart'] + receiveStartTime;
            } else if (data.receiveStates == 4) { // 已结束
                stateText = i18n['over'];
            }

            // 考虑页面中存在多个相同券的情况，需要判断showStatusPicture
            if ($mod.data('couponpicbgconfig').showStatusPicture) {
                // 计算paddingTop达到垂直居中的效果
                if (data.receiveStates == 2) {
                    $aEl.html(stateText).addClass('toUse').css('paddingTop', '').css({ paddingTop: $aEl.height() / 2 - parseFloat($aEl.css('fontSize')) * textLineNumber / 2 });
                } else if (data.receiveStates == 1) {
                    $aEl.removeClass('state-disable').html("");
                } else {
                    $aEl.html(stateText).addClass('state-disable').css('paddingTop', '').css({ paddingTop: $aEl.height() / 2 - parseFloat($aEl.css('fontSize')) * textLineNumber / 2 });
                }
            }
        });
    }
    // 事件委托所有券链接的点击事件
    $('.mod-coupons').on('click', '[data-couponpicconfig]', function(event) {
        // 领券超链接对象
        var $target = $(this);
        // 链接配置
        var anchorConfig = $target.data('couponpicconfig');
        // 模块配置
        var modConfig = $target.parents('.mod-coupons').data('couponpicbgconfig');

        // 点击后，正常状态下才调用领券接口
        if ($target.hasClass('state-disable')) {
            return false;
        } else if ($target.hasClass('CN toUse')) {
            //只有去使用状态的优惠券才可以跳转
            window.location.href = window.domainMain + "/product/coupon/queryPrdForCoupon-" + anchorConfig.batchCode;
        } else if (anchorConfig.anchorType == 'onekeyCoupon') { // 一键领券
            // 一键领券表单配置的券码
            var onekeycouponListArr = [];
            var $mod = $target.parents('.mod-coupons');
            var receiveCouponArr = $mod.find("input[name='onekeyCouponInput']");

            // 兼容现网一键领券数据，为防止现网券码数据丢失，当表单一键领券数据为空时，使用热区配置的券码
            if (receiveCouponArr.length > 0) {
                var length = receiveCouponArr.length > 20 ? 20 : receiveCouponArr.length; // 接口只支持领券20张券码，兼容配置20张券码以上，也只领券前20张券码

                for (var i = 0; i < length; i++) {
                    var onekeycoupon = {};
                    onekeycoupon.activityCode = receiveCouponArr[i].getAttribute("onekeycouponcode");
                    onekeycoupon.batchCode = receiveCouponArr[i].getAttribute("onekeycouponbatch");
                    onekeycouponListArr.push(onekeycoupon);
                }
            } else {
                $target.closest('.mod-coupons').find('a[data-type="coupon"]').each(function(index, el) {
                    var item = $(el).data('couponpicconfig');
                    onekeycouponListArr.push(item);
                });
            }

            var data = { 'listReceiveCoupon': JSON.stringify(onekeycouponListArr) };

            utils.ajaxOpenAPI({
                type: 'POST',
                url: '/ams/coupon/batchReceiveCoupons',
                data: data,
                success: function(ret) {
                    var text = '',
                        opts = {
                            boxclass: 'ol_box_4',
                            showTitle: false,
                            faceType: 'success',
                            okBtnName: i18n["btn.confirm"],
                            showCancel: false
                        };

                    if (ret && ret.success) {
                        text = i18n['successClaim'] + ret.listCouponReceived.length + i18n['coupons'] + '<div style="margin-top:20px;font-size:12px;color:#999;">' + ret.listCouponReceived.join(',') + '</div>';
                        arrCouponParam.length && utils.queryCouponState(arrCouponParam, handleCouponState);
                    } else {
                        opts.faceType = 'failed';
                        switch (Number(ret.code)) {
                            case 9200: // 领取失败
                                text = i18n['failed'];
                                break;
                            case 9206: // 用户未登录
                                text = ret.errorTip || ret.msg ;
                                utils.handleCode.unLogin(opts); // 未登录
                                break;
                            default: // 无符合条件可领取优惠券
                                text = i18n['uncondition'];
                                break;
                        }
                    }

                    new utils.box(text, opts).open();
                },
                error: function(XMLHttpRequest, textStatus, errorThrown, data) {}
            });
        } else if (anchorConfig.anchorType == 'coupon') { // 券链接
            var pointChangeTip = $target.parent().find('.pointChangeTip').data('pointchangetip');
            // 积分兑换确认开关开启
            if (pointChangeTip) {
                // 调券码活动查询接口，满足消耗积分条件，获取兑换消耗积分数，弹出弹框，点击确认按钮此时再去调用领券接口
                utils.ajaxOpenAPI({
                    type: 'GET',
                    url: '/ams/coupon/queryCouponActivityDetailInfo',
                    data: {
                        activityCouponBeanList: JSON.stringify({ activityCode: $target.data('couponpicconfig').activityCode, couponBatchCodeList: $target.data('couponpicconfig').batchCode })
                    },
                    success: function(json) {
                        // 只有请求接口成功后，接口返回领券该券码需要消耗积分（PS：如若需要消耗积分，积分数必定大于0，ams限制）时弹出积分兑换确认框
                        if (json.success && json.couponActivityInfoList[0] && json.couponActivityInfoList[0].couponAvtivityRuleInfo.receiveExpendType && json.couponActivityInfoList[0].activityCouponList[0]) {
                            var expendValue = json.couponActivityInfoList[0].activityCouponList[0].expendValue;
                            var text = '<p>' + i18n['changePrice'] + expendValue + i18n['point'] + '<i class="faceIcon"></i></p>'; // 兑换价

                            new utils.box(text, {
                                boxid: "couponPic",
                                boxclass: 'ol_box_4',
                                title: i18n['changeTip'],
                                okBtnName: i18n['confirm'],
                                onok: function() {
                                    utils.getCoupon(anchorConfig, handleCouponState, true);
                                    $('#couponPic').hide();
                                    $('.ol_box_mask').hide();
                                }
                            }).open();
                        } else { // 不满足积分兑换条件直接调领券接口
                            utils.getCoupon(anchorConfig, handleCouponState, true);
                        }
                    },
                    errorFunction: function() {
                        alert(i18n['error']);
                    }
                });

            } else {
                utils.getCoupon(anchorConfig, handleCouponState, true);
            }
        }
    });
})(window, jQuery);
