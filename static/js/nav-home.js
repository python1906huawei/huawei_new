/**
 * PC首页导航
 * 转测{"version":"1.2.18","time":"2017.10.30 10:43:38","author":"Kun"}
 * update{"version":"1.3.10","time":"2018.6.5 9:55:38","author":"guojun"}
 */
(function(window, $, undefined) {
    $('.searchBar-key a').each(function() {
        var keywords = $.trim($(this).html());
        $(this).prop('href', "/search?keyword=" + encodeURIComponent(keywords.replace(/\s/g, "+")));
    });

    // $('#naver-list li').hover(function() {
    //     $(this).addClass('hover');
    // }, function() {
    //     $(this).removeClass('hover');
    // });

    $('#naver-list li').on({
        mouseenter: function() {
            $(this).addClass('hover');
        },
        mouseleave: function() {
            $(this).removeClass('hover');
        }
    });

    var $search = $("#nav-search-kw");
    $search.autocomplete({
        serviceUrl: "/search_keywords",
        minChars: 1,
        maxHeight: 400,
        deferRequestBy: 100,
        fnFormatResult: function(value, data, currentValue) {
            return value.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
        }
    });

    (function() {
        var autocompleteWarpper = $('.autocomplete-w1').parent();
        $('body').on('advertisingup', function() {
            if (autocompleteWarpper[0].style.display === 'none') {
                return false;
            }
            autocompleteWarpper.hide();
        });

        $('body').on('advertisinguped', function() {
            var updateTop = $('#searchBar-area').offset().top;

            var h = $('#searchBar-area').height();
            autocompleteWarpper.css({
                'position': 'absolute',
                'top': (updateTop + h - 1) + 'px',
            }).show();
        });
    })();

    $search.on({
        focus: function() {
            $("#search-bar-key").hide();
            //隐藏搜索历史
            $("#search-history").hide();

            if ($("#nav-search-kw").val().trim() == '') {
                //查询用户搜索历史
            }
        },
        blur: function() {
            if ($("#nav-search-kw").val().trim() == '') {
                $("#search-bar-key").show();
            } else {
                $("#search-bar-key").hide();
            }
            //隐藏搜索历史
            $("#search-history").hide();
        }
    });


    window.navsearch = function(c) {
        var b = $(c).find("#nav-search-kw").val();
        if (!b) {
            return false;
        }
        b = $.trim(b);
        window.location.href = "/search?keyword=" + encodeURIComponent(b);
        return false;
    };
})(window, jQuery);