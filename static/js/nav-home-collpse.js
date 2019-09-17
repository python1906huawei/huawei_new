/**
 * PC专区导航下拉列表{"version":"1.3.10","time":"2018.05.30 14:39:17","author":"Guojun"}
 */
(function(window, $) {
    var flag = $('.naver').data('flag');

    // 如果关闭了子导航功能返回
    if (flag === false) {
        return false;
    }

    var $navs = $('.naver li');
    var $naverSubs = $('.naver-sub');
    var navLen = $navs.length;
    var navWidth = $navs.width();
    var navListCount = null;
    var openItem = null;
    var timer = null;
    var currIndex = null;
    var currNaverSubEl = null;

    $navs.on({
        'mouseenter': function(e) {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }

            currIndex = $(this).index();
            setCurrentClass($(this)); // 设置当前导航项为高亮
            currNaverSubEl = $naverSubs.children().eq(currIndex);
            var gridList = currNaverSubEl.find('.grid-list');
            var subNavs = currNaverSubEl.find('.s2').children('a');

            // 如果没有子菜单则收起已经展开的 然后返回
            if (!currNaverSubEl.length || !subNavs.length) {
                slideUp($naverSubs.children(), 200);
                return false;
            }

            if ($naverSubs.css('display') == 'none') {
                $naverSubs.show();
            }

            $naverSubs.children().each(function() {
                if ($(this).css('display') == 'block') {
                    openItem = true;
                }
            });

            if (openItem) {
                $naverSubs.children().hide().off('mouseenter').mouseleave(function(e) {
                    itemsLeave.call(this, e, currNaverSubEl);
                });
                $naverSubs.children().eq(currIndex).show();
                openItem = null;
            } else {
                timer = setTimeout(function() {
                    timer && clearTimeout(timer);
                    timer = null;
                    $naverSubs.children().hide().eq(currIndex).slideDown(200).mouseleave(function(e) {
                        itemsLeave.call(this, e, currNaverSubEl);
                    });
                }, 200);
            }

        },
        'mouseleave': function(e) {
            var $target = $(e.target),
                eX = e.pageX,
                eY = e.pageY,
                oX = $target.offset().left,
                oY = $target.offset().top,
                yy = oY - eY,
                xx = oX - eX,
                xx2 = eX - (oX + navWidth);

            if (timer) clearTimeout(timer);

            currNaverSubEl && currNaverSubEl.mouseenter(function() {
                if (timer) clearTimeout(timer);
            });

            // 确认上划，第一个左滑动时，最后一个右滑动时
            if (yy <= 10 && yy > 0 || (xx <= 10 && xx > 0 && currIndex == 0) || (xx2 <= 10 && xx2 > 0 && currIndex == navLen - 1)) {
                currNaverSubEl && currNaverSubEl.off('mouseleave');
                slideUp($naverSubs.children(), 300);
            } else {
                timer = setTimeout(function() {
                    currNaverSubEl && currNaverSubEl.off('mouseenter');
                    slideUp($naverSubs.children(), 300);
                }, 200);
            }
        }
    });

    function slideUp($el, speed) {
        $el.slideUp(speed, function() {
            // 删除当前导航高亮状态
            setCurrentClass($navs.eq(currIndex), true);
            $naverSubs.hide();
        });
    }

    function setCurrentClass($el, flag) {
        if (!flag) {
            $el.find('a').addClass('current').end().siblings().find('a').removeClass('current');
        } else {
            $el.parents('.naver').find('a').removeClass('current');
        }

    }

    function itemsLeave(e, obj) {
        var $target = $(e.target),
            eX = e.pageX,
            eY = e.pageY,
            oX = $target.offset().left,
            oY = $target.offset().top,
            _this = $(this);

        clearTimeout(timer);

        // 确认上划 并保证上划区域排除logo区域
        if ((oY - eY) <= 10 && (oY - eY) > 0 && (eX - oX) > 300) {
            _this.show();
        } else {
            timer = setTimeout(function() {
                slideUp(_this, 200);
            }, 200)
        }
    }
})(window, jQuery);