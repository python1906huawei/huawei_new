/**
 * PC端：固定导航
 * 修复：滚动时定位不准确的问题{"version":"1.2.16","time":"2017.10.19 14:52:13","author":"Ben"}
 * 优化：固定导航在图片加载之前就能点击{"time":"2018.11.06 15:42:44","author":"Ben"}
 */
(function(window, $, undefined) {
    var $nav = $('.mod27-nav-wrp');

    // 必须等图片资源加载完成之后才开始计算，所以要用load
    $(window).on('load', function() {
        var navOffsetTop = $nav.offset().top;
        var navHeight = $nav.height();
        var arrLi = [];
        var ulDom = $nav.find('ul');
        var count = $nav.find('li').length;
        var clickHandler = function(event) {
            var moveHeight = event.data.moveHeight;
            var _this = this;
            $('html,body').animate({ scrollTop: moveHeight }, 50);
            setTimeout(function() {
                $(_this).siblings().removeClass("current");
                $(_this).addClass("current");
            }, 100);
        };

        // 用一个对象来保存每个导航栏中每个锚点对应文档中的高度，并把对象存入数组中，并做好升序
        for (var i = 0; i < count; i++) {
            var liDom = ulDom.find('li:eq(' + i + ')'),
                href = liDom.find('a').attr('href'),
                top = 0;

            // 如果是锚点，并且配置了锚点，并且对应的模块存在
            if (href.length > 0 && !/^http/.test(href) && $(href).length > 0) {
                top = Math.floor($(href).offset().top);
                if (top > 0 && navOffsetTop <= top) {
                    var item = {
                        id: href,
                        top: top,
                        dom: liDom,
                        moveHeight: 0
                    };
                    if (top > (navOffsetTop + navHeight)) {
                        item.moveHeight = top - navHeight;
                    } else {
                        item.moveHeight = top - navHeight;
                    }
                    // 存入数组
                    arrLi.push(item);
                    // 绑定滚动事件
                    liDom.on("click", { moveHeight: item.moveHeight }, clickHandler);
                }
            }
        }

        // 升序，依据元素的在文档的位置高度
        arrLi.sort(function(item1, item2) {
            return item1.height >= item2.height;
        });

        // 根据滚动高度设置相关样式
        var setStyle = function() {
            var _scrollTop = $(this).scrollTop();
            if (_scrollTop > navOffsetTop) {
                $nav.css({
                    position: 'fixed',
                    top: 0
                });
                var length = arrLi.length;
                if (length > 0) {
                    for (var i = length - 1; i >= 0; i--) {
                        if (_scrollTop >= (arrLi[i].top - navHeight)) {
                            ulDom.find("li").removeClass("current");
                            arrLi[i].dom.addClass("current");
                            break;
                        }
                    }
                }
            } else {
                $nav.css("position", "relative");
                ulDom.find("li").removeClass("current");
                ulDom.find("li:eq(0)").addClass("current");
            }
        }

        // 给窗口添加滚动事件
        $(window).on("scroll", function() {
            setStyle();
        });

        // 防止刷新页面的时候看不到导航条
        setStyle();
    });
})(window, jQuery);