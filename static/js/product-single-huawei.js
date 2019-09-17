/**
 * PC华为专区单商品
 * 优化：鼠标移入时背景色反转{"version":"1.3.10","time":"2018.06.12 09:53:55","author":"Ben"}
 * 增加：模板一的动画效果{"version":"1.3.12","time":"2018.06.21 11:14:16","author":"Ben"}
 */
(function(window, $, undefined) {
    var $getCoupon = $('.mod-product-single-huawei .get-coupon');

    $getCoupon.on("click", function(event) {
        utils.getCouponMulti(event, this);
    });
    // 鼠标移入时背景色反转
    $getCoupon.on("mouseover", function(event) {
            var $target = $(this);
            var color = $target.css('borderTopColor');
            $target.css({
                backgroundColor: color,
                color: color == 'rgb(255, 255, 255)' ? '#900' : '#fff'
            });
        }).on("mouseout", function(event) {
            var $target = $(this);
            var color = $target.css('borderTopColor');
            $target.css({
                backgroundColor: 'transparent',
                color: color
            });
        })
       

    // 横线动画效果
    var $tpls = $('.mod-product-single-huawei.tpl-1,.mod-product-single-huawei.tpl-6,.mod-product-single-huawei.tpl-7');
    $tpls.on("mouseenter", function(event) {
            $(this).toggleClass('current');
        }).on("mouseleave", function(event) {
            $(this).toggleClass('current');
        })      
})(window, jQuery);