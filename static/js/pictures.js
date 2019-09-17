/**
 * PC端：图模块
 * 需求：图模块支持配置CID参数{"time":"2018.11.30 14:25:57","author":"Ben"}
 */
(function(window, $, undefined) {
    window.addEventListener('pageshow', function(event) {
        // 部分浏览器的后退操作会读取缓存，则强制刷新
        if (event.persisted) {
            location.reload();
        }
    });

    function Picture($mod) {
        var config = $mod.data('config');
        var popupconfig = $mod.data('popupconfig');
        var country = $mod.find('.anchor-picPopup').data('country');
        var popupStyle = $mod.find('.anchor-picPopup').data('popuptype');
        var content = '<div id=' + 'contentscroll' + '>' + $mod.find('#popup-content').html() + '</div>';
        var cid = $mod.data('cid');

        // 招行图模块（登录页隐藏支付宝、QQ等第三方快登）
        if (config.moduleType == 'cmb') {
            $mod.on('click', 'a', function(event) {
                utils.cookie.set('thirdLoginFlag', 0);
            });
        }

        // 优先级低于URL参数中的cid参数
        if (cid && !utils.getUrlParams('cid')) {
            utils.cookie.set('cps_id', cid);
        }

        // 判断选用哪种形式的弹框，style-1普通弹框，否则活动弹框
        if (popupStyle === 'style-1') {
            $mod.find('.anchor-picPopup').on('click', function() {
                new utils.box(content || '', {
                    boxid: "picPopup",
                    boxclass: "ol_box_4",
                    title: popupconfig.title,
                    showButton: true,
                    showCancel: false
                }).open();
                $('#picPopup .box-title').css('height','27px');
            });
        } else {
            $mod.find('.anchor-picPopup').on('click', function() {
                new utils.box(content || '', {
                    boxid: "style-popup",
                    boxclass: "ol_box_4",
                    title: popupconfig.title,
                    showButton: true,
                    showCancel: false
                }).open();
                if (country === 'CN') {
                    $('#style-popup').find('.box-header').addClass('cn')
                }
                $('#style-popup .box-title').css('height','58px');
                $("#style-popup .box-content").niceScroll("#contentscroll",{cursorcolor:"#FE9B4C",cursorwidth: "10px",cursoropacitymax:1,boxzoom:true,autohidemode: false});
            });
        }
    }

    // 调用定义组件的函数
    $('.mod-pic').each(function() {
        new Picture($(this));
    });
})(window, jQuery);

