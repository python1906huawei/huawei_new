/**
 * PC页头文字链
 * 开始转测{"version":"1.3.2","time":"2018.01.24 15:30:28","author":"Ben"}
 */

(function(window, $, undefined) {
    
    var microCarTtpl = '\
    <!--#macro microCartList data-->\
    <!--#list data.itemInfos as item-->\
    <!--#var classChoose="";-->\
    <!--#var skuId="#"+item.skuId;-->\
    <!--#if (item.subItems && item.subItems.length > 0)-->\
    <!--#list item.subItems as sub-->\
    <!--#if ((classChoose) && (classChoose != "true")  )-->\
    <!--#var  classChoose="false";-->\
    <!--/#if-->\
    <!--#if (sub.itemType == "S1" || sub.itemType == "S6" || sub.itemType == "S15")-->\
    <!--#var  classChoose="true";-->\
    <!--#else-->\
    <!--/#if-->\
    <!--#if (sub.itemType == "G" )-->\
    <!--#var gGift="true";-->\
    <!--/#if-->\
    <!--#if (sub.itemType == "J" )-->\
    <!--#var jBuy="true";-->\
    <!--/#if-->\
    <!--/#list-->\
    <!--/#if-->\
    <!--#if (classChoose == "true" )-->\
    <li class="minicart-pro-item minicart-pro-item-suit <!--#if ( (item.show))-->disabled<!--/#if-->">\
    <!--#else-->\
    <li class="minicart-pro-item <!--#if ( (item.show)) -->disabled<!--/#if-->">\
    <!--/#if-->\
        <div class="pro-info clearfix">\
            <!--#if (item.itemType=="B")-->\
            <!--#if (item.invalidCauseReason == 0) -->\
            <div class="p-choose"><i class="<!--#if (item.selected)-->icon-choose<!--#else-->icon-choose-normal<!--/#if-->" id="icon-choose-{#item.itemkd}" onclick="ec.minicart.click(this)" value="{#item.itemCode}" type="{#item.itemType}" data-itemId="{#item.itemId}"></i></div>\
            <input class="hide" id="checkbox-{#item.itemkd}" name="bundleIds" value="{#item.itemCode}" data-itemId="{#item.itemId}" type="checkbox" <!--#if (item.selected)-->checked="checked"<!--/#if--> />\
            <input class="hide" id="quantity-{#item.itemCode}" value="{#item.qty}" data-type="{#item.itemType}" type="text" <!--#if (item.selected)-->checked="checked"<!--/#if--> />\
            <!--#elseif ((item.invalidCauseReason == 7)&&( !item.numblimit   )&&(!item.show) )-->\
            <div class="p-choose"><i class="<!--#if (item.selected)-->icon-choose<!--#else-->icon-choose-normal<!--/#if-->" id="icon-choose-{#item.itemkd}" onclick="ec.minicart.click(this)" value="{#item.itemCode}" type="{#item.itemType}" data-itemId="{#item.itemId}"></i></div>\
            <input class="hide" id="checkbox-{#item.itemkd}" name="bundleIds" value="{#item.itemCode}" data-itemId="{#item.itemId}" type="checkbox" <!--#if (item.selected)-->checked="checked"<!--/#if--> />\
            <input class="hide" id="quantity-{#item.itemCode}" value="{#item.qty}" data-type="{#item.itemType}" type="text" <!--#if (item.selected)-->checked="checked"<!--/#if--> />\
            <!--#else-->\
            <div class="p-choose"><i class="icon-choose-normal" id="icon-choose-{#item.itemCode}"></i></div>\
            <input class="hide" id="checkbox-{#item.itemCode}" name="bundleIds" value="{#item.itemCode}" type="checkbox" />\
            <input class="hide" id="quantity-{#item.itemCode}" value="{#item.qty}" data-type="{#item.itemType}" type="text" />\
            <!--/#if-->\
            <div class="p-img">\
                <a href="/product/{#item.photoId}.html{#skuId}" title="" target="_blank" onclick = "pushCartProMsg("{#skuId}","/product/{#item.photoId}.html{#skuId}","{#item_index+1}")">\
                    <img src="https://res.vmallres.com/pimages/{#item.photoPath}78_78_{#item.photoName}" alt="{#item.itemName}" />\
                </a>\
            </div>\
            <div class="p-name">\
                <a href="/product/{#item.photoId}.html{#skuId}" title="{#item.itemName}" target="_blank" onclick = "pushCartProMsg("{#skuId}","/product/{#item.photoId}.html{#skuId}","{#item_index+1}")">{#item.itemName}</a>\
            </div>\
            <!--#else-->\
            <!--#if ((item.invalidCauseReason == 0) &&(!item.bnumblimit) &&(!item.numblimit)) -->\
            <div class="p-choose">\
            <!--#if (item.itemType == "P") -->\
                <i class="<!--#if (item.selected) -->icon-choose<!--#else-->icon-choose-normal<!--/#if-->" id="icon-choose-{#item.itemkd}" onclick="ec.minicart.click(this)" value="{#item.skuId}" type="{#item.itemType}" data-itemId="{#item.itemId}"></i>\
                <input class="hide" name="skuIds" id="checkbox-{#item.itemkd}" value="{#item.skuId}" data-scode="{#item.itemCode}" data-itemId="{#item.itemId}" type="checkbox" <!--#if (item.selected)-->checked="checked"<!--/#if-->>\
                <!--#else-->\
                <i class="<!--#if (item.selected) -->icon-choose<!--#else-->icon-choose-normal<!--/#if-->" id="icon-choose-{#item.itemkd}" onclick="ec.minicart.click(this)" value="{#item.skuId}" type="{#item.itemType}" data-itemId="{#item.itemId}"></i>\
                <input class="hide" name="skuIds" id="checkbox-{#item.itemkd}" value="{#item.skuId}" data-scode="{#item.itemCode}" data-itemId="{#item.itemId}" type="checkbox" <!--#if (item.selected)-->checked="checked"<!--/#if-->>\
            <!--/#if-->\
            </div>\
            <input class="hide" id="quantity-{#item.skuId}" value="{#item.qty}" data-type="{#item.itemType}" type="text" <!--#if (item.selected)-->checked="checked"<!--/#if--> />\
            <!--#elseif ((item.invalidCauseReason == 7)&&( !item.numblimit  )&&(!item.show) )-->\
            <div class="p-choose">\
            <!--#if (item.itemType == "P") -->\
                <i class="<!--#if (item.selected) -->icon-choose<!--#else-->icon-choose-normal<!--/#if-->" id="icon-choose-{#item.itemkd}" onclick="ec.minicart.click(this)" value="{#item.skuId}" type="{#item.itemType}" data-itemId="{#item.itemId}"></i>\
                <input class="hide" name="skuIds" id="checkbox-{#item.itemkd}" value="{#item.skuId}" data-scode="{#item.itemCode}" data-itemId="{#item.itemId}" type="checkbox" <!--#if (item.selected)-->checked="checked"<!--/#if-->>\
            <!--#else-->\
                <i class="<!--#if (item.selected) -->icon-choose<!--#else-->icon-choose-normal<!--/#if-->" id="icon-choose-{#item.itemkd}" onclick="ec.minicart.click(this)" value="{#item.skuId}" type="{#item.itemType}" data-itemId="{#item.itemId}"></i>\
                <input class="hide" name="skuIds" id="checkbox-{#item.itemkd}" value="{#item.skuId}" data-scode="{#item.itemCode}" data-itemId="{#item.itemId}" type="checkbox" <!--#if (item.selected)-->checked="checked"<!--/#if-->>\
            <!--/#if-->\
            </div>\
            <input class="hide" id="quantity-{#item.skuId}" value="{#item.qty}" data-type="{#item.itemType}" type="text" <!--#if (item.selected)-->checked="checked"<!--/#if--> />\
            <!--#else-->\
            <div class="p-choose"><i class="icon-choose-normal" id="icon-choose-{#item.skuId}"></i></div>\
                <input class="hide" name="skuIds" id="checkbox-{#item.skuId}" value="{#item.skuId}" type="checkbox" />\
                <input class="hide" id="quantity-{#item.skuId}" value="{#item.qty}" data-type="{#item.itemType}" type="text" />\
                <!--/#if-->\
                <!--#if ((item.attrsMap)&&(item.attrsMap.package_code)) -->\
                <input class="hide" name="newBundle" id="bundle-{#item.itemkd}" value="{#item.attrsMap.package_code}" data-scode="<!--#list item.subItems as sku--><!--#if ((sku.itemType=="B")||(sku.itemType=="P"))-->{#sku.itemCode},<!--/#if--><!--/#list-->" type="checkbox" />\
                <!--/#if-->\
                <!--#if ((item.attrsMap)&&(item.attrsMap.dp_package_code)) -->\
                <input class="hide" name="dpPackage" id="dpPackage-{#item.itemkd}" data-dpcode="{#item.attrsMap.dp_package_code}" value="<!--#list item.subItems as sku--><!--#if (sku.itemType=="DP")-->{#sku.itemCode},{#sku.attrsMap.dp_group}|<!--/#if--><!--/#list-->" type="hidden"/>\
                <!--/#if-->\
                <div class="p-img">\
                    <a href="/product/{#item.productId}.html{#skuId}" title="" target="_blank" onclick = "pushCartProMsg("{#skuId}","/product/{#item.productId}.html{#skuId}","{#item_index+1}")">\
                        <img src="https://res.vmallres.com/pimages/{#item.photoPath}78_78_{#item.photoName}" alt="{#item.itemName}" />\
                    </a>\
                </div>\
                <div class="p-name">\
                    <a href="/product/{#item.productId}.html{#skuId}" title="{#item.itemName}" target="_blank" onclick = "pushCartProMsg("{#skuId}","/product/{#item.productId}.html{#skuId}","{#item_index+1}")">{#item.itemName}</a>\
                </div>\
                <!--/#if-->\
                <div class="p-dec">\
                    <span class="p-slogan">\
                    </span>\
                </div>\
                <div class="p-status">\
                <!--#if (gGift == "true") -->\
                <!--#list item.subItems as gif-->\
                <!--#if (gif.itemType=="G")-->\
                    <input type="checkbox" name="giftId" class="hide" value="{#gif.itemCode}" />\
                <!--/#if-->\
                <!--/#list-->\
                <!--/#if-->\
                <!--#if (   (item.showP)&&( (item.invalidCauseReason==0) ||  ( (item.invalidCauseReason==7)  && (  !item.numblimit  )  )  )    ) -->\
                <div class="p-tags">此商品已失效</div>\
                <!--#else-->\
                <!--#if (item.invalidCauseReason == 1) -->\
                <div class="p-tags">此商品已失效</div>\
                <!--#elseif (item.invalidCauseReason == 2) -->\
                <div class="p-tags">此商品已失效 </div>\
                <!--#elseif (item.invalidCauseReason == 3) -->\
                <div class="p-tags">此商品已失效 </div>\
                <!--#elseif (item.invalidCauseReason == 4) -->\
                <div class="p-tags">此商品已失效 </div>\
                <!--#elseif (item.invalidCauseReason == 5) -->\
                <div class="p-tags">此商品暂不可购买 </div>\
                <!--#elseif (item.invalidCauseReason == 6) -->\
                <div class="p-tags">此商品暂时缺货 </div>\
                <!--#elseif (item.invalidCauseReason == 7) -->\
                <div class="p-tags">此商品限购{#item.invalidCauseLeftValue}件</div>\
                <!--#elseif (item.invalidCauseReason == 8) -->\
                <div class="p-tags">超过内购限额 </div>\
                <!--#elseif (item.invalidCauseReason == 9) -->\
                <div class="p-tags">此商品不在本渠道销售</div>\
                <!--#elseif (item.invalidCauseReason == 10) -->\
                <div class="p-tags">此商品已失效 </div>\
                <!--#elseif (item.invalidCauseReason == 101) -->\
                <div class="p-tags">此套餐已失效 </div>\
                <!--#elseif (item.invalidCauseReason == 106) -->\
                <div class="p-tags">此套餐暂时缺货 </div>\
                <!--/#if-->\
                <!--/#if-->\
                <div class="p-price">\
                <!--#if (item.salePrice != item.originalPrice) --><s>&yen;&nbsp;{#item.originalPrice.toFixed(2)}</s>&nbsp;&nbsp;<!--/#if-->\
                <b>&yen;&nbsp;{#item.salePrice.toFixed(2)}</b><strong><em>x</em><span>{#item.qty}</span></strong>\
                </div>\
            </div>\
        </div>\
        <!--#if ((item.itemType=="B")||(item.itemType=="P"))-->\
        <div class="p-pack <!--#if (item.show) -->disabled<!--/#if-->">\
            <span class="p-mini-tag-suit">套餐</span>\
            <a href="javascript:;" title="<!--#list item.subItems as sku--><!--#if ((sku.itemType=="B")||(sku.itemType=="P"))-->{#sku.itemName}x{#sku.qty}<!--/#if--><!--/#list-->">\
                <!--#list item.subItems as sku-->\
                <!--#if ((sku.itemType=="B")||(sku.itemType=="P"))-->\
                <span>\
                {#sku.itemName}<em>x{#sku.qty}</em>\
                </span>\
                <!--/#if-->\
                <!--/#list-->\
            </a>\
        </div>\
        <!--/#if-->\
        <!--#if (classChoose=="true")-->\
        <div class="pro-other clearfix" id={#classChoose}>\
            <ol>\
            <!--#list item.subItems as sub-->\
            <!--#if (sub.itemType == "S1") -->\
                <li class="<!--#if (sub.invalidCauseReason != 0) -->disabled<!--/#if-->">\
                    <div class="p-title">\
                        <span class="p-mini-tag-long">延保</span>{#sub.itemName}\
                    </div>\
                    <input class="hide" name="extendIds" value="{#sub.skuId}" data-scode="{#sub.itemCode}" type="checkbox" data-id="{#sub.itemId}" />\
                    <div class="p-price"><b>&yen;&nbsp;{#sub.salePrice.toFixed(2)}</b><strong><em>x</em><span>{#item.qty}</span></strong></div>\
                </li>\
            <!--/#if-->\
            <!--/#list-->\
            <!--#list item.subItems as sub-->\
            <!--#if (sub.itemType == "S6") -->\
                <li class="<!--#if (sub.invalidCauseReason != 0) -->disabled<!--/#if-->">\
                    <div class="p-title">\
                        <span class="p-mini-tag-extend">碎屏保</span>{#sub.itemName}\
                    </div>\
                    <input class="hide" name="accidentIds" value="{#sub.skuId}" data-scode="{#sub.itemCode}" data-id="{#sub.itemId}" type="checkbox" />\
                    <div class="p-price"><b>&yen;&nbsp;{#sub.salePrice.toFixed(2)}</b><strong><em>x</em><span>{#item.qty}</span></strong></div>\
                </li>\
            <!--/#if-->\
            <!--/#list-->\
            <!--#list item.subItems as sub-->\
            <!--#if (sub.itemType == "S15") -->\
                <li class="<!--#if (sub.invalidCauseReason != 0) -->disabled<!--/#if-->">\
                    <div class="p-title">\
                        <span class="p-mini-tag-extend">无忧服务</span>{#sub.itemName}\
                    </div>\
                    <input class="hide" name="ucareIds" value="{#sub.skuId}" data-scode="{#sub.itemCode}" data-id="{#sub.itemId}" type="checkbox" />\
                    <div class="p-price"><b>&yen;&nbsp;{#sub.salePrice.toFixed(2)}</b><strong><em>x</em><span>{#item.qty}</span></strong></div>\
                </li>\
            <!--/#if-->\
            <!--/#list-->\
            </ol>\
        </div>\
        <!--/#if-->\
        <!--#if (gGift=="true")-->\
        <input type="hidden" id="gift_sbomCodes_{#item.skuId}" value="<!--#list item.subItems as gift--><!--#if (gift.itemType == "G") -->{#gift.skuId},<!--/#if--><!--/#list-->" />\
        <div class="p-pack">\
            <span class="p-mini-tag-suit">配</span>\
            <a href="javascript:;" style="cursor: default;" title="<!--#list item.subItems as gift--><!--#if (gift.itemType == "G") -->{#gift.itemName}x{#gift.qty*item.qty},<!--/#if--><!--/#list-->">\
                <!--#list item.subItems as gift--><!--#if (gift.itemType == "G") -->\
                <span class="<!--#if (gift.invalidCauseReason != 0) -->disabled<!--/#if-->">\
                    {#gift.itemName}<em>x{#gift.qty*item.qty}</em>\
                </span>\
                <!--/#if-->\
                <!--/#list-->\
            </a>\
        </div>\
        <!--/#if-->\
        <!--#if (item.itemType=="DP")-->\
        <div class="pro-other clearfix">\
            <ol>\
            <!--#list item.subItems as sub-->\
            <!--#if (sub.itemType == "DP") -->\
                <li class="<!--#if ((sub.Jlost)||(sub.invalidCauseReason!=0)) -->disabled<!--/#if-->">\
                    <div class="p-title p-add">\
                        <span class="p-mini-tag-suit">搭配</span>{#sub.itemName}\
                    </div>\
                    <div class="p-price">\
                        <!--#if (sub.salePrice != sub.originalPrice) --><s>&yen;&nbsp;{#sub.originalPrice.toFixed(2)}</s>&nbsp;&nbsp;<!--/#if-->\
                        <b>&yen;&nbsp;{#sub.salePrice.toFixed(2)}</b><strong><em>x</em><span>{#sub.qty}</span></strong>\
                    </div>\
                </li>\
            <!--/#if-->\
            <!--/#list-->\
            </ol>\
        </div>\
        <!--/#if-->\
        <!--#if (jBuy=="true")-->\
        <div class="pro-other clearfix">\
            <ol>\
            <!--#if (jBuy=="true")-->\
            <input type="hidden" id="preferIds_{#item.skuId}" value="<!--#list item.subItems as ea--><!--#if (ea.itemType == "J") -->{#ea.itemCode},<!--/#if--><!--/#list-->" skuids="<!--#list item.subItems as ea--><!--#if (ea.itemType == "J") -->{#ea.skuId},<!--/#if--><!--/#list-->" newId="<!--#list item.subItems as ea--><!--#if (ea.itemType == "J") -->{#ea.itemId},<!--/#if--><!--/#list-->" />\
            <!--/#if-->\
            <!--#list item.subItems as sub-->\
            <!--#if (sub.itemType == "J") -->\
                <li class="<!--#if ((sub.Jlost)||(sub.invalidCauseReason!=0)) -->disabled<!--/#if-->">\
                    <div class="p-title p-add">\
                        <span class="p-mini-tag-extend">加价购</span>{#sub.itemName}\
                    </div>\
                    <div class="p-price">\
                        <!--#if (sub.salePrice != sub.originalPrice) --><s>&yen;&nbsp;{#sub.originalPrice.toFixed(2)}</s>&nbsp;&nbsp;<!--/#if-->\
                        <b>&yen;&nbsp;{#sub.salePrice.toFixed(2)}</b><strong><em>x</em><span>{#sub.qty}</span></strong>\
                    </div>\
                </li>\
            <!--/#if-->\
            <!--/#list-->\
            </ol>\
        </div>\
        <!--/#if-->\
    </li>\
    <!--/#list-->\
    <!--/#macro-->';
    
    
    ec.minicart.readyContent();

    ec.minicart.microCartTpl = new ec.template(microCarTtpl);

    // 优先取Cookie中的企业用户标记
    var isEnterpriseUser = ec.util.cookie.get("isEnterpriseUser");

    if ("true" == isEnterpriseUser) {
        $("#li-enterprise-preferential").html('<a href="' + domainMain + '/member/enterprise" onclick = "pushHeaderMsg(\'优惠内购\',\'' + domainMain + '/member/enterprise\')"><span>优惠内购</span></a>').show();
    }

    var $miniCart = $('#header-toolbar-minicart-content');

    // 购物车
    $('#header-toolbar-minicart').on("mouseover mouseout",function(event){
        if (event.type == "mouseover"){
            if (ec.checkBrowerIE()) {
                var act = document.activeElement.id;
                if (act == 'search-kw') {
                    $("#search-kw").blur();
                }
            }
            $(this).unbind("mouseenter");
            ec.minicart.content();
        } else if (event.type == "mouseout"){
            $(this).on("mouseenter", function() {
                if (ec.checkBrowerIE()) {
                    var act = document.activeElement.id;
                    if (act == 'search-kw') {
                        $("#search-kw").blur();
                    }
                }
    
                $(this).off("mouseenter");
                ec.minicart.content();
            });
        }

    });
    

    //自调用一次 为刷新购物车的数量显示
    ec.minicart.content();
    
    // 登录名
    $('#up_loginName-hover').on("mouseover mouseout",function(event){
        if (event.type == "mouseover"){
            if (ec.checkBrowerIE()) {
                var act = document.activeElement.id;
                if (act == 'search-kw') {
                    $("#search-kw").blur();
                }
            }
            $(this).off("mouseenter");
        } else if (event.type == "mouseout"){
            $(this).on("mouseenter", function() {
                if (ec.checkBrowerIE()) {
                    var act = document.activeElement.id;
                    if (act == 'search-kw') {
                        $("#search-kw").blur();
                    }
                }
                $(this).off("mouseenter");
            });
        }
    });


    // 获取代金券余额
    ec.account.getBalanceAmount();

})(window, jQuery);

// 选择地区
(function(window, $, undefined) {
    ec.load("ec.box", { loadType: "lazy" });

    /**
     * 功能：给鼠标移动到s-dropdown上面的时候，记得给他多添加一个hover类样式
     * 目的是兼容ie6
     */
    $(function() {
        $(".s-dropdown").on("mouseover mouseout",function(event){
            if (event.type == "mouseover"){
                $(this).addClass("hover");
            } else if (event.type == "mouseout"){
                $(this).removeClass("hover");
            }
        });
        var maxcolor = $('.top-banner-max').find('p').children('a').css("background-color");
        var mincolor = $('.top-banner-min').find('p').children('a').css("background-color");

        $('.top-banner-max').css({ "background-color": maxcolor, overflow: "hidden" });
        $('.top-banner-min').css({ "background-color": mincolor, overflow: "hidden" });
    });

    // 显示全球导航选择层
    $('#showSelectRegion').on("click",function(event) {
        var box = new ec.box($("#selectRegion-tips").val(), {
            boxid: "region-select-box",
            boxclass: "ol_box_4",
            title: "Please select your country or region.",
            width: 940,
            showButton: false,
            autoPosition: false,
            onopen: function(box) {},
            onok: function(box) {},
            oncancel: function(box) {
                box.close();
                $(".ol_box_mask").remove();
            },
            onclose: function(box) {
                $(".ol_box_mask").remove();
            }
        });

        box.open();

        $(".box-title").css("font-size", "28px").css("font-weight", "normal");
        $("#region-select-box").css("height", "auto");
        $(".ol_box_mask").on("click",function() { box.close(); });

        $(".box-header").off("mousemove");
        $(".box-header").off("mousedown");

        var divTop = document.getElementById("region-select-box").offsetTop;
        $("#region-select-box").on("mousedown",function(e) {
            var e = e || window.event;
            var region = document.getElementById("region-select-box");

            var leftX = e.clientX - region.offsetLeft;
            var topY = e.clientY - region.offsetTop;
            $("#region-select-box").on("mousemove",function(event) {
                var e = event || window.event;
                var left = e.clientX - leftX;
                var top = e.clientY - topY;

                if (e.clientX - leftX < 20 - region.offsetWidth) {
                    left = 20 - region.offsetWidth;
                }
                if (e.clientY - topY < 20 - region.offsetHeight) {
                    top = 20 - region.offsetHeight;
                }

                if (e.clientY - topY + 20 >= $(window).height()) {
                    top = $(window).height() - 20;
                }
                if (e.clientX - leftX + 20 >= $(window).width()) {
                    left = $(window).width() - 20;
                }
                $("#region-select-box").css({ "left": left, "top": top });
                divTop = top;

            });
        });
        $("#region-select-box").on("mouseup",function() {
            $("#region-select-box").off("mousemove");
        });
        $(window).on("scroll",function() {
            $("#region-select-box").offset({ top: divTop });
        });
    });
})(window, jQuery);
