/**
 * PC轮播图
 * 优化：用JS的方式获取第一张图片的高度{"version":"1.2.20","time":"2017.12.01 11:46:51","author":"Ling"}
 * 修复：焦点会有两个重叠的，需要删除多余的初始化{"version":"1.2.16","time":"2018.07.11 15:42:47","author":"Ling"}
 */
(function(window, $, utils, undefined) {
    // 幻灯片插件
    $.fn.slider = function(options) {
        var defaults = {
                auto: false, //　自动播放
                speed: 500, //　速度; 越小越快
                pause: 4000, //　此4000代表自动播放的间隔，单位：毫秒
                style: 1, //　1为显示分页按钮，2为只显示前后两个按钮, 3两种都显示
                // width: 0, //　必须
                // height: 0, //　必须
                sliderType: "filter", //  滚动方向，left || top || filter
                btnPrevClassName: 'button-slider-prev',
                btnNextClassName: 'button-slider-next',
                minWidth: 1000 //页面最小宽度
            },
            options = $.extend(defaults, options),

            obj = $(this),
            len = $("li", obj).length, //获取焦点图个数

            //显示图片函数，根据接收的index值显示相应的内容
            showPics = function(i) {
                switch (options.sliderType) {
                    case 'top': //向上滚动
                        var nowTop = -i * options.height;
                        $("ul", obj).stop(true, false).animate({ "top": nowTop }, options.speed);
                        break;
                    case 'filter': //滤镜效果

                        $("li", obj).eq(_preIndex).fadeOut(options.speed).end().eq(i).fadeIn(options.speed);
                        break;
                    case 'left': //向左滚动
                    default:
                        var nowLeft = -i * options.width;
                        $("ul", obj).stop(true, false).animate({ "left": nowLeft }, options.speed);
                        break;
                }
                if (options.style == 2) return;
                $(".ec-slider-nav span", obj).removeClass("current").eq(i).addClass('current');

            },
            _preIndex = 0;

        //重置宽度
        if (options.width == '100%') {
            $(window).resize(function() {
                var w = $(window).width();
                if (w < options.minWidth) w = options.minWidth;
                obj.width(w);
                $("ul, li", obj).width(w);
            });
            options.width = $(window).width();
            if (options.width < options.minWidth) {
                options.width = options.minWidth;
            } else {
                options.width = '100%';
            }
        }

        obj.width(options.width);
        obj.height(options.height);
        $("ul, li", obj).width(options.width).height(options.height);
        if (len <= 1) return;

        this.each(function() {
            var index = 0,
                picTimer,
                pre = options.btnPrevClassName,
                next = options.btnNextClassName,
                $pre,
                $next,
                preAndNext,
                _setTimeout = function() {
                    clearInterval(picTimer);
                    if (!options.auto) return;
                    picTimer = setInterval(function() {
                        _preIndex = index;
                        index += 1;
                        if (index == (len)) { index = 0; }
                        showPics(index);
                    }, options.pause);
                },

                //以下代码添加数字按钮和按钮后的半透明条，还有上一页、下一页两个按钮
                btn = '<div class="ec-slider-nav">';

            for (var i = 0; i < len; i++) {
                if (i == 0) {
                    btn += '<span class="current"></span>';
                } else {
                    btn += '<span></span>';
                }
            }
            btn += '</div>';

            btn += '<a class="' + pre + '" href="javascript:;"></a>';
            btn += '<a class="' + next + '" href="javascript:;"></a>';
            obj.append(btn);


            //$(".btnBg", obj).css({"opacity":0.5, "width": options.width + 'px'});

            //为小按钮添加鼠标滑入事件，以显示相应的内容
            $(".ec-slider-nav span", obj).on('mouseenter', function() {
                _preIndex = index;
                index = $(this).index();
                showPics(index);
            });

            //上一页、下一页按钮透明度处理
            preAndNext = $('.' + pre + ',.' + next, obj);
            $pre = $('.' + pre, obj);
            $next = $('.' + next, obj);
            var _preAndNextHover = function() {

                // $(obj).hover(function() {
                //     $pre.addClass(pre + '-high');
                //     $next.addClass(next + '-high');
                // }, function() {
                //     $pre.removeClass(pre + '-high');
                //     $next.removeClass(next + '-high');
                // });
                $(obj).on("mouseover mouseout", function(event) {
                    if (event.type == "mouseover") {
                        //鼠标悬浮
                        $pre.addClass(pre + '-high');
                        $next.addClass(next + '-high');
                    } else if (event.type == "mouseout") {
                        //鼠标离开
                        $pre.removeClass(pre + '-high');
                        $next.removeClass(next + '-high');
                    }
                })
            };



            //上一页按钮
            $('.' + pre, obj).on('click', function() {
                _preIndex = index;
                index -= 1;
                if (index == -1) { index = len - 1; }
                showPics(index);
            });

            //下一页按钮
            $('.' + next, obj).on('click', function() {
                _preIndex = index;
                index += 1;
                if (index == len) { index = 0; }
                showPics(index);
            });

            //本例为左右滚动，即所有li元素都是在同一排向左浮动，所以这里需要计算出外围ul元素的宽度
            switch (options.sliderType) {
                case 'top':
                    $("ul", obj).css("height", options.height * (len));
                    $("ul li", obj).css('float', 'none');
                    break;
                case 'filter': //滤镜效果
                    $("ul li", obj).css({ "display": "none", "position": "absolute" }).eq(0).show();
                    break;
                case 'left':
                default:
                    $("ul", obj).css("width", options.width * (len));
                    break;
            }


            //鼠标滑上焦点图时停止自动播放，滑出时开始自动播放
            // obj.hover(function() {
            //     clearInterval(picTimer);
            // }, _setTimeout);

            $(obj).on("mouseover mouseout", function(event) {
                if (event.type == "mouseover") {
                    //鼠标悬浮
                    clearInterval(picTimer);
                } else if (event.type == "mouseout") {
                    //鼠标离开
                    _setTimeout();
                }
            });



            if (options.auto) { //是否自动播放
                _setTimeout();
            }
            switch (parseInt(options.style)) {
                case 1:
                    preAndNext.hide();
                    break;
                case 2:
                    $(".ec-slider-nav", obj).hide();
                    _preAndNextHover();
                    break;
                default:
                    _preAndNextHover();
                    break;
            }


        });
    }

    $(window).on('load', function() {
        function init() {
            $('.mod-floatslider').each(function() {
                var $sliderObj = $(this).find('.ec-slider');
                var $fristImg = $sliderObj.find('img').eq(0);
            })
        }
        init();
    });

    var initial = {
        init: function(dom) {
            $(dom).each(function() {
                var $sliderObj = $(this).find('.ec-slider');
                var $fristImg = $sliderObj.find('img').eq(0);
                $sliderObj.slider({
                    width: $fristImg.width() || 1200, //　必须图片宽度
                    height: $fristImg.height(), //　必须图片高度
                    style: 1, //　1显示分页，2只显示左右箭头,3两者都显示
                    pause: 5000, //间隔时间
                    auto: true
                })
            })
        }
    }
    DC.defineModule('slider-scroll', initial);
    initial.init('.mod21-banner');
})(window, jQuery, utils);
