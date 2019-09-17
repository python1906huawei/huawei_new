/**
 * PC收缩广告
 * 转侧
 */
(function(window, $) {
        function Adcollapse($el) {
            var options = {
                dom: $el,
                speed: 1000,
                delay: 8000,
                isOpen: true // 页面加载时是否展开广告，默认展开
            };
            var params = $.extend({}, options);
            this.timer = null;
            this.params = params;
            this.dom = this.params.dom;
            this.speed = this.params.speed;
            this.delay = this.params.delay;
            this.isOpen = this.params.isOpen;
            this.adCollapseBox = this.dom.find('.ad-collapse');
            this.bannerBox = this.dom.find('.banner-min');
            this.btnUp = this.dom.find('.btn-up'); // 收起
            this.btnClose = this.dom.find('.btn-close'); // 关闭
            this.instance = null;
            this.init();
        }
        Adcollapse.prototype.init = function() {
            // 装修时不展开大图，显示关闭按钮
            if (window.shopdcmode == "DESIGN") {
                this.btnClose.show();
                return false;
            }

            if (this.isOpen) {
                this.open();
            } else {
                this.adCollapseBox.hide();
                this.bannerBox.show();
            }

            this.attachEvents();
        };

        Adcollapse.prototype.open = function() {
            var self = this;
            if (self.timer) {
                return false;
            }
            var $adCollapseBox = this.adCollapseBox;
            var $bannerBox = this.bannerBox;
            var $btnUp = this.btnUp;
            var $btnClose = this.btnClose;

            // 大图不存在时，不执行广告收起事件
            if ($adCollapseBox.length == 0) {
                return false;
            }

            $btnUp.show();
            this.btnClose.hide();
            $adCollapseBox.show();
            $bannerBox.hide();


            self.timer = setTimeout(function() {
                // 触发广告收起事件
                $('body').trigger('advertisingup');

                self.timer && clearTimeout(self.timer);
                self.timer = null;
                $adCollapseBox.slideUp(self.speed, function() {
                    $bannerBox.show();
                    $btnUp.hide();
                    $btnClose.show();

                    // 触发广告已收起事件
                    $('body').trigger('advertisinguped');
                });
            }, self.delay);
        };

        Adcollapse.prototype.bindEvent = function() {
            var self = this;
            var $adCollapseBox = this.adCollapseBox;
            var $bannerBox = this.bannerBox;
            var $adWrapper = this.dom;
            var $btnUp = this.btnUp;
            var $btnClose = this.btnClose;

            // 收起广告
            function advertisingUp() {
                if ($adCollapseBox[0].style.display === 'none') {
                    return false;
                }
                $('body').trigger('advertisingup');
                self.timer && clearTimeout(self.timer);
                $adCollapseBox.slideUp(self.speed, function() {
                    $bannerBox.show();
                    $btnUp.hide();
                    $btnClose.show();
                    $('body').trigger('advertisinguped');
                });
            }

            // 关闭广告
            function advertisingClose() {
                self.timer && clearTimeout(self.timer);
                self.detachEvents();
                $adWrapper.remove();
            }

            // 绑定事件
            var attachEvents = function(detach) {
                var action = detach ? "off" : "on";
                $btnUp[action]('click', advertisingUp);
                $btnClose[action]('click', advertisingClose);
            };

            return attachEvents;
        };

        // 绑定事件
        Adcollapse.prototype.attachEvents = function() {
            var attachEvents = this.bindEvent();
            attachEvents();
        };

        // 取消绑定
        Adcollapse.prototype.detachEvents = function() {
            var attachEvents = this.bindEvent();
            attachEvents(true);
        };

    // 置顶
    function setTophandler(){
        var initObj = {
            init: function(el) {
                var $modAdCollapseEl = $('.J_mod.mod-ad-collapse');
                 $modAdCollapseEl.parent().prepend(el);
                 $modAdCollapseEl.find('.btn-close').show();
            }
        };

        DC.defineModule('ad-collapse', initObj);

        // 已存在dom初始化
        initObj.init($('.mod-ad-collapse'));
    }

    $('body').ready(function() {
        var $modAdCollapseEl = $('.J_mod.mod-ad-collapse');

         setTophandler();
        // 实例化广告
        $modAdCollapseEl.each(function() {
            new Adcollapse($(this));
        });
    });
})(window, jQuery);
