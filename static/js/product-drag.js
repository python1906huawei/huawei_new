/**
 * PC端左右拖动商品
 * 优化：没有左右边框展示问题{"version":"1.3.10","time":"2018.06.04 11:48:09","author":"Ling"}
 * 优化：支持多国{"version":"1.3.12","time":"2018.07.03 17:16:13","author":"Ben"}
 * 优化：增加hover效果表单配置{"version":"1.2.16","time":"2018.07.20 17:27:06","author":"Ling"}
 */
(function(window, $, undefined) {
    var $mod = $('.mod-productDrag');
    var isSuspend = $mod.data('hoverconfig').isSuspend;

    // 鼠标hover上去效果切换
    $mod.on('mouseover', 'li', function(e) {
        if (isSuspend) {
            $(this).addClass('current');
            $(this).siblings().removeClass('current');
        } else {
            $(this).addClass('active');
            $(this).siblings().removeClass('active');
        }
    });

    $mod.on('mouseout', 'li', function(e) {
        if (isSuspend) {
            $(this).removeClass('current');
        } else {
            $(this).removeClass('active');
        }
    });

    $mod.find('.coupon').on('click', function(event) {
        utils.getCouponMulti(event, this);
    });

    var initObj = {
        init: function($el) {
            // 初始化，第五个及五的倍数个商品设置右边距
            function Init(el) {
                this.$lis = el.find('.drag-items');
                this.getStyle();
            }

            Init.prototype.getStyle = function() {
                self = this;
                self.$lis.each(function() {
                    var index = $(this).index() + 1;
                    if (index % 5 == 0) {
                        $(this).css('border-right', "1px solid #eaeaea");
                    }
                });
            };

            $('.mod-productDrag').each(function() {
                // 实例化每一个el
                new Init($(this));
            });

            // 拖动、左右切换
            var mySwiper = new Swiper('.mod-productDrag .swiper-container', {
                slidesPerView: 5,
                slidesPerGroup: 5,
                direction: 'horizontal',
                loop: false,
                preventClicks: false, //默认true
                // 如果需要前进后退按钮
                prevButton: '.swiper-button-prev',
                nextButton: '.swiper-button-next'
            });
        }
    };

    DC.defineModule('product-drag', initObj);

    // 已存在dom初始化
    initObj.init('.mod-productDrag')
})(window, jQuery);
